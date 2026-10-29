import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Заявка на бронювання',
    plural: 'Заявки на бронювання (Ліди)',
  },
  lockDocuments: false,
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'clientPhone',
    defaultColumns: ['clientPhone', 'clientName', 'bookingType', 'vehicleType', 'status', 'createdAt'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'clientPhone',
          type: 'text',
          required: true,
          label: 'Номер телефону',
        },
        {
          name: 'clientName',
          type: 'text',
          label: "Ім'я клієнта",
          defaultValue: 'Клієнт (1-клік)',
        },
      ],
    },
    {
      name: 'bookingType',
      type: 'select',
      defaultValue: 'standard',
      label: 'Тип бронювання',
      options: [
        { label: 'Калькулятор на сайті 📝', value: 'standard' },
        { label: 'Швидке в 1 клік ⚡', value: 'one_click' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'vehicleType',
          type: 'text',
          label: 'Обрана техніка',
          defaultValue: 'Уточнюється (1-клік)',
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Тривалість',
          defaultValue: '1 година',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'hasPassenger',
          type: 'checkbox',
          label: 'З пасажиром (+доплата)',
        },
        {
          name: 'isIndividual',
          type: 'checkbox',
          label: 'Індивідуальний тур без групи (+1000 грн/год)',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'calculatedTotal',
          type: 'number',
          label: 'Розрахована сума (грн)',
        },
        {
          name: 'preferredDate',
          type: 'text',
          label: 'Бажана дата і час',
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Коментар / побажання',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Статус замовлення',
      options: [
        { label: 'Нова заявка 🟡', value: 'new' },
        { label: 'Взято в роботу / Дзвінок 🔵', value: 'contacted' },
        { label: 'Підтверджено / Бронь 🟢', value: 'confirmed' },
        { label: 'Завершено 🏁', value: 'completed' },
        { label: 'Скасовано 🔴', value: 'cancelled' },
      ],
    },
  ],
}
