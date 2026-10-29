export interface BookingNotificationData {
  id?: string | number
  clientName: string
  clientPhone: string
  bookingType?: string
  vehicleType: string
  duration: string
  calculatedTotal?: number
  preferredDate?: string
  notes?: string
  hasPassenger?: boolean
  isIndividual?: boolean
  dbFallback?: boolean
}

/**
 * Sends an instant rich notification to a Telegram Chat / Group via Telegram Bot API
 */
export async function sendTelegramBookingNotification(
  data: BookingNotificationData,
  customToken?: string,
  customChatId?: string
): Promise<{ success: boolean; error?: string; reason?: string }> {
  try {
    const token = customToken || process.env.TELEGRAM_BOT_TOKEN
    const chatId = customChatId || process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      console.log('[Telegram Bot] Skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in .env')
      return { success: false, reason: 'unconfigured' }
    }

    const isOneClick = data.bookingType === 'one_click'
    const title = isOneClick ? '⚡️ ШВИДКА ЗАЯВКА В 1 КЛІК' : '🏍 НОВА БРОНЬ НА ПРОКАТ'
    const cleanPhone = data.clientPhone.replace(/\D/g, '').replace(/^(380)+/, '380')
    const fullInternationalPhone = cleanPhone.startsWith('380')
      ? cleanPhone.slice(0, 12)
      : cleanPhone.startsWith('80')
      ? ('3' + cleanPhone).slice(0, 12)
      : cleanPhone.startsWith('0')
      ? ('38' + cleanPhone).slice(0, 12)
      : ('380' + cleanPhone).slice(0, 12)
    const directPhone = fullInternationalPhone.length >= 10 ? `+${fullInternationalPhone}` : data.clientPhone

    const kyivTime = new Date().toLocaleString('uk-UA', {
      timeZone: 'Europe/Kyiv',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })

    const lines = [
      `<b>${title}</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      data.id ? `🔢 <b>Заявка:</b> #${escapeHtml(String(data.id))}` : null,
      `👤 <b>Клієнт:</b> ${escapeHtml(data.clientName || 'Без імені')}`,
      `📞 <b>Телефон:</b> ${escapeHtml(directPhone)}`,
      `🛵 <b>Техніка:</b> ${escapeHtml(data.vehicleType)}`,
      `⏱ <b>Тривалість:</b> ${escapeHtml(data.duration)}`,
      data.calculatedTotal
        ? `💰 <b>Розрахункова вартість:</b> <b>${data.calculatedTotal.toLocaleString('uk-UA')} ₴</b>`
        : null,
      data.hasPassenger ? `👥 <b>Пасажир:</b> Так (+ доплата)` : null,
      data.isIndividual ? `👑 <b>Формат:</b> VIP Індивідуальний тур` : null,
      data.preferredDate ? `📅 <b>Бажаний час:</b> ${escapeHtml(data.preferredDate)}` : null,
      data.notes ? `💬 <b>Коментар:</b> <i>${escapeHtml(data.notes)}</i>` : null,
      data.dbFallback ? `⚠️ <i>Доставлено резервним каналом (БД тимчасово оновлюється)</i>` : null,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🕒 <i>Київ: ${kyivTime} • KVADRO KYIV 1</i>`,
    ].filter(Boolean)

    const messageText = lines.join('\n')

    const replyMarkup =
      fullInternationalPhone.length >= 10
        ? {
            inline_keyboard: [
              [
                {
                  text: `💬 Написати в Telegram`,
                  url: `https://t.me/+${fullInternationalPhone}`,
                },
                {
                  text: `📞 Дзвінок в Telegram`,
                  url: `tg://call?phone=+${fullInternationalPhone}`,
                },
              ],
            ],
          }
        : undefined

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
      }),
    })

    const result = await response.json()
    if (!result.ok) {
      console.error('[Telegram Bot] Telegram API error:', result)
      return { success: false, error: result.description }
    }

    console.log('[Telegram Bot] Notification sent successfully to chat:', chatId)
    return { success: true }
  } catch (err) {
    console.error('[Telegram Bot] Network request failed:', err)
    return { success: false, error: String(err) }
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
