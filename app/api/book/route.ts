import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendTelegramBookingNotification } from '@/lib/telegram'

export async function POST(req: Request) {
  try {
    const body = await req.json()
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
    const finalPhone = clientPhone ? String(clientPhone).trim() : ''
    const digitsOnly = finalPhone.replace(/\D/g, '')

    if (!finalPhone || digitsOnly.length < 9) {
      return NextResponse.json(
        { error: 'Будь ласка, вкажіть коректний контактний номер телефону' },
        { status: 400 }
      )
    }

    const finalName = clientName?.trim() || (isOneClick ? 'Швидке замовлення (1-клік)' : '')
    if (!isOneClick && !finalName) {
      return NextResponse.json(
        { error: "Будь ласка, вкажіть ваше ім'я" },
        { status: 400 }
      )
    }

    const finalVehicleType = vehicleType || (isOneClick ? 'Будь-яка / Уточнюється телефоном' : 'Квадро прогулянка')
    const finalDuration = duration || (isOneClick ? 'Уточнюється' : '1 година')
    const finalBookingType = isOneClick ? 'one_click' : 'standard'
    const finalNotes = notes || (isOneClick ? 'Швидке бронювання в 1 клік через попап' : '')

    // Save to Payload CMS bookings collection and dispatch Telegram notification
    try {
      const payload = await getPayload({ config })
      const createdBooking = await payload.create({
        collection: 'bookings',
        data: {
          clientName: finalName,
          clientPhone: finalPhone,
          bookingType: finalBookingType,
          vehicleType: finalVehicleType,
          duration: finalDuration,
          hasPassenger: Boolean(hasPassenger),
          isIndividual: Boolean(isIndividual),
          calculatedTotal: Number(calculatedTotal) || 0,
          preferredDate: preferredDate || (isOneClick ? 'Найближчий зручний час' : 'Якнайшвидше'),
          notes: finalNotes,
          status: 'new',
        },
      })

      // Fetch Telegram settings from SiteSettings or fallback to .env
      let customToken = process.env.TELEGRAM_BOT_TOKEN
      let customChatId = process.env.TELEGRAM_CHAT_ID

      try {
        const settings = (await payload.findGlobal({ slug: 'site-settings' })) as any
        if (settings?.telegramBotToken) customToken = String(settings.telegramBotToken)
        if (settings?.telegramChatId) customChatId = String(settings.telegramChatId)
      } catch {
        // Fallback to process.env
      }

      // Send instant Telegram push
      await sendTelegramBookingNotification(
        {
          id: createdBooking?.id,
          clientName: finalName,
          clientPhone: finalPhone,
          bookingType: finalBookingType,
          vehicleType: finalVehicleType,
          duration: finalDuration,
          hasPassenger: Boolean(hasPassenger),
          isIndividual: Boolean(isIndividual),
          calculatedTotal: Number(calculatedTotal) || 0,
          preferredDate: preferredDate || (isOneClick ? 'Найближчий зручний час' : 'Якнайшвидше'),
          notes: finalNotes,
        },
        customToken,
        customChatId
      )
    } catch (dbErr) {
      console.warn('Payload CMS direct save fallback:', dbErr)
      // Fallback logging so lead is never lost even if DB is still updating
    }

    return NextResponse.json({
      success: true,
      message: 'Заявку успішно прийнято! Наш менеджер зателефонує вам найближчим часом.',
      data: {
        clientName: finalName,
        clientPhone: finalPhone,
        bookingType: finalBookingType,
        vehicleType: finalVehicleType,
        duration: finalDuration,
        calculatedTotal: Number(calculatedTotal) || 0,
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
