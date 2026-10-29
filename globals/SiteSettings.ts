import type { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '@/lib/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Налаштування сайту та Контакти',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+380 (98) 432-71-79',
      label: 'Основний телефон / Viber',
    },
    {
      name: 'phoneRaw',
      type: 'text',
      defaultValue: '+380984327179',
      label: 'Телефон для посилань tel:',
    },
    {
      name: 'telegram',
      type: 'text',
      defaultValue: 'https://t.me/Kvadro_kyiv1',
      label: 'Посилання на Telegram',
    },
    {
      name: 'telegramUsername',
      type: 'text',
      defaultValue: '@Kvadro_kyiv1',
      label: 'Нікнейм Telegram (для відображення)',
    },
    {
      name: 'instagram',
      type: 'text',
      defaultValue: 'https://www.instagram.com/kvadro_kyiv1',
      label: 'Посилання на Instagram',
    },
    {
      name: 'instagramUsername',
      type: 'text',
      defaultValue: 'kvadro_kyiv1',
      label: 'Нікнейм Instagram (для відображення)',
    },
    {
      name: 'address',
      type: 'text',
      defaultValue: 'м. Київ, Дарницький р-н, вул. Лісова 76К (Бортничі)',
      label: 'Адреса локації (повна)',
    },
    {
      name: 'addressShort',
      type: 'text',
      defaultValue: 'Київ, вул. Лісова 76К (Бортничі)',
      label: 'Адреса локації (коротка)',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      defaultValue: "https://www.google.com/maps/place/50%C2%B023'06.7%22N+30%C2%B042'48.5%22E/@50.3851944,30.7134722,17z/data=!3m1!4b1!4m4!3m3!8m2!3d50.3851944!4d30.7134722?entry=ttu",
      label: 'Посилання на Google Maps',
    },
    {
      name: 'workingHours',
      type: 'text',
      defaultValue: 'Щодня: 09:00 — 20:00 (за попереднім записом)',
      label: 'Графік роботи',
    },
    {
      name: 'individualSurchargePerHour',
      type: 'number',
      defaultValue: 1000,
      label: 'Доплата за індивідуальний тур (грн / 1 год)',
    },
    {
      name: 'freeDrinksText',
      type: 'text',
      defaultValue: 'Безкоштовні напої після заїзду (кава, чай, вода)',
      label: 'Текст бонусу на фініші',
    },
    {
      name: 'telegramBotToken',
      type: 'text',
      admin: {
        description: 'Токен бота від @BotFather для миттєвих сповіщень про нові заявки (напр. 7123456789:AAH...)',
      },
      label: 'Telegram Bot Token (для сповіщень)',
    },
    {
      name: 'telegramChatId',
      type: 'text',
      admin: {
        description: 'ID чату або групи (отримати через @userinfobot або додати бота в групу та надіслати повідомлення)',
      },
      label: 'Telegram Chat ID (куди надсилати заявки)',
    },
  ],
}
