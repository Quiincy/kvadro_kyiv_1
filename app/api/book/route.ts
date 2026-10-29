import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendTelegramBookingNotification } from '@/lib/telegram'
import { defaultFleet, defaultSettings, FleetItem } from '@/lib/defaultData'

// Lightweight sliding-window rate limiter per IP (max 10 bookings per 60s)
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 10
const ipRequestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = ipRequestLog.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestLog.set(ip, recent)
    return true
  }
  recent.push(now)
  ipRequestLog.set(ip, recent)

  // Periodic cleanup to prevent memory growth
  if (ipRequestLog.size > 500) {
    for (const [key, times] of ipRequestLog.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        ipRequestLog.delete(key)
      }
    }
  }
  return false
}

function parseHoursFromDuration(durationStr: string): number {
  const match = durationStr.match(/(\d+)/)
  if (!match) return 1
  const h = Number(match[1])
  return h >= 1 && h <= 3 ? h : 1
}

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown'

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Забагато запитів. Будь ласка, зачекайте хвилину або зателефонуйте нам напряму.' },
        { status: 429 }
      )
    }

    const body = await req.json()

    // Anti-bot honeypot check
    if (body.website || body.honeypot) {
      return NextResponse.json({
        success: true,
        message: 'Заявку успішно прийнято!',
      })
    }

    const {
      clientName,
      clientPhone,
      vehicleType,
      duration,
      hasPassenger,
      isIndividual,
      calculatedTotal,
      preferredDate,
      notes,
    } = body

    const isOneClick = body.isOneClick === true || body.bookingType === 'one_click'
    const finalPhone = clientPhone ? String(clientPhone).trim().slice(0, 30) : ''
    const digitsOnly = finalPhone.replace(/\D/g, '')

    if (!finalPhone || digitsOnly.length < 9) {
      return NextResponse.json(
        { error: 'Будь ласка, вкажіть коректний контактний номер телефону' },
        { status: 400 }
      )
    }

    const finalName = (clientName ? String(clientName).trim() : '').slice(0, 100) || (isOneClick ? 'Швидке замовлення (1-клік)' : '')
    if (!isOneClick && !finalName) {
      return NextResponse.json(
        { error: "Будь ласка, вкажіть ваше ім'я" },
        { status: 400 }
      )
    }

    const finalVehicleType = String(
      vehicleType || (isOneClick ? 'Будь-яка / Уточнюється телефоном' : 'Квадро прогулянка')
    ).slice(0, 150)
    const finalDuration = String(duration || (isOneClick ? 'Уточнюється' : '1 година')).slice(0, 60)
    const finalBookingType = isOneClick ? 'one_click' : 'standard'
    const finalPreferredDate = String(
      preferredDate || (isOneClick ? 'Найближчий зручний час' : 'Якнайшвидше')
    ).slice(0, 60)
    const finalNotes = String(
      notes || (isOneClick ? `Швидке бронювання в 1 клік через попап` : '')
    ).slice(0, 1000)

    let customToken = process.env.TELEGRAM_BOT_TOKEN
    let customChatId = process.env.TELEGRAM_CHAT_ID
    let activeFleet: FleetItem[] = defaultFleet
    let individualSurchargeRate = defaultSettings.individualSurchargePerHour

    let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

    // 1. Try initializing Payload and fetching live settings & tariffs
    try {
      payloadInstance = await getPayload({ config })
      const [settingsRes, fleetRes] = await Promise.allSettled([
        payloadInstance.findGlobal({ slug: 'site-settings', overrideAccess: true }),
        payloadInstance.find({ collection: 'fleet', limit: 50, overrideAccess: true }),
      ])

      if (settingsRes.status === 'fulfilled' && settingsRes.value) {
        const s = settingsRes.value as any
        if (s.telegramBotToken) customToken = String(s.telegramBotToken)
        if (s.telegramChatId) customChatId = String(s.telegramChatId)
        if (typeof s.individualSurchargePerHour === 'number') {
          individualSurchargeRate = s.individualSurchargePerHour
        }
      }

      if (fleetRes.status === 'fulfilled' && fleetRes.value?.docs?.length > 0) {
        activeFleet = fleetRes.value.docs.map((doc: any) => ({
          id: doc.slug || String(doc.id),
          title: doc.title,
          badge: doc.badge || '',
          description: doc.description || '',
          price1h: doc.price1h ?? undefined,
          price2h: doc.price2h,
          price3h: doc.price3h ?? undefined,
          passengerPrice: doc.passengerPrice ?? undefined,
          features: [],
          specs: [],
          icon: doc.icon || 'Compass',
        }))
      }
    } catch (initErr) {
      console.warn('Payload init/settings fetch fallback:', initErr)
    }

    // 2. Server-side price verification & recalculation
    let verifiedTotal = Math.max(0, Math.min(100_000, Number(calculatedTotal) || 0))
    if (!isOneClick) {
      const matchedVehicle = activeFleet.find(
        (v) =>
          v.title.toLowerCase() === finalVehicleType.toLowerCase() ||
          v.id.toLowerCase() === finalVehicleType.toLowerCase()
      )
      if (matchedVehicle) {
        const hours = parseHoursFromDuration(finalDuration)
        const rates: Record<number, number | undefined> = {
          1: matchedVehicle.price1h,
          2: matchedVehicle.price2h,
          3: matchedVehicle.price3h,
        }
        const validHours = rates[hours] ? hours : rates[1] ? 1 : rates[2] ? 2 : 3
        const basePrice = rates[validHours] || matchedVehicle.price2h || 1400
        const passengerAdd =
          Boolean(hasPassenger) && matchedVehicle.passengerPrice
            ? matchedVehicle.passengerPrice * validHours
            : 0
        const individualAdd = Boolean(isIndividual) ? individualSurchargeRate * validHours : 0
        verifiedTotal = basePrice + passengerAdd + individualAdd
      }
    } else if (finalVehicleType.toLowerCase().includes('сертифікат') && verifiedTotal === 0) {
      // Extract nominal from certificate string like "Подарунковий сертифікат на 3 000 ₴"
      const nominalMatch = finalVehicleType.replace(/\s+/g, '').match(/(\d{3,6})/)
      if (nominalMatch) {
        verifiedTotal = Number(nominalMatch[1]) || 0
      }
    }

    // 3. Independently save to Payload CMS database
    let createdBookingId: string | number | undefined
    let dbSaved = false
    if (payloadInstance) {
      try {
        const createdBooking = await payloadInstance.create({
          collection: 'bookings',
          overrideAccess: true,
          data: {
            clientName: finalName,
            clientPhone: finalPhone,
            bookingType: finalBookingType,
            vehicleType: finalVehicleType,
            duration: finalDuration,
            hasPassenger: Boolean(hasPassenger),
            isIndividual: Boolean(isIndividual),
            calculatedTotal: verifiedTotal,
            preferredDate: finalPreferredDate,
            notes: finalNotes,
            status: 'new',
          },
        })
        createdBookingId = createdBooking?.id
        dbSaved = true
      } catch (dbErr) {
        console.error('Payload CMS booking create error:', dbErr)
      }
    }

    // 4. Independently dispatch Telegram notification (always runs even if DB save failed!)
    const telegramRes = await sendTelegramBookingNotification(
      {
        id: createdBookingId,
        clientName: finalName,
        clientPhone: finalPhone,
        bookingType: finalBookingType,
        vehicleType: finalVehicleType,
        duration: finalDuration,
        hasPassenger: Boolean(hasPassenger),
        isIndividual: Boolean(isIndividual),
        calculatedTotal: verifiedTotal,
        preferredDate: finalPreferredDate,
        notes: finalNotes,
        dbFallback: !dbSaved,
      },
      customToken,
      customChatId
    )

    // If neither DB nor Telegram succeeded, report an honest error so the client never loses a lead silently
    if (!dbSaved && !telegramRes.success) {
      return NextResponse.json(
        {
          error:
            'Сервер тимчасово перевантажений. Будь ласка, напишіть нам у Telegram або зателефонуйте напряму!',
        },
        { status: 503 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Заявку успішно прийнято! Наш менеджер зателефонує вам найближчим часом.',
      data: {
        id: createdBookingId,
        clientName: finalName,
        clientPhone: finalPhone,
        bookingType: finalBookingType,
        vehicleType: finalVehicleType,
        duration: finalDuration,
        calculatedTotal: verifiedTotal,
      },
    })
  } catch (err: unknown) {
    console.error('Booking API error:', err)
    return NextResponse.json(
      { error: 'Помилка при збереженні заявки. Спробуйте зателефонувати нам.' },
      { status: 500 }
    )
  }
}
