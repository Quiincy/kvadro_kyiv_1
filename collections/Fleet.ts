import type { CollectionConfig } from 'payload'

export const Fleet: CollectionConfig = {
  slug: 'fleet',
  labels: {
    singular: 'Техніка та тариф',
    plural: 'Техніка та тарифи',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price1h', 'price2h', 'badge', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва техніки / прогулянки',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Бейдж (напр. ХІТ ПРОКАТУ, ПОТУЖНИЙ ЗВІР 500СС)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис техніки',
    },
    {
      name: 'imageMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото техніки з Медіабібліотеки (завантажити з ПК або вибрати)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Або пряме посилання / шлях до фото',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 1,
      label: 'Порядок сортування',
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      defaultValue: false,
      label: 'Популярний вибір (виділити рамкою)',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price1h',
          type: 'number',
          label: 'Ціна за 1 годину (грн)',
        },
        {
          name: 'price2h',
          type: 'number',
          label: 'Ціна за 2 години (грн)',
        },
        {
          name: 'price3h',
          type: 'number',
          label: 'Ціна за 3 години (грн)',
        },
        {
          name: 'passengerPrice',
          type: 'number',
          label: 'Доплата за пасажира (грн/год)',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      label: 'ID / Слаг (напр. quad-250, quad-500, moto-enduro, buggy)',
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'Compass',
      label: 'Іконка',
      options: [
        { label: 'Компас (Квадро прогулянка)', value: 'Compass' },
        { label: 'Вогонь (500сс Звір)', value: 'Flame' },
        { label: 'Блискавка (Мото Ендуро)', value: 'Zap' },
        { label: 'Щит (Баггі)', value: 'Shield' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Що включено / особливості',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Пункт',
        },
      ],
    },
    {
      name: 'specs',
      type: 'array',
      label: 'Технічні характеристики',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Характеристика',
        },
      ],
    },
  ],
}
