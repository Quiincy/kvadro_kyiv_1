import type { CollectionConfig } from 'payload'

export const Steps: CollectionConfig = {
  slug: 'steps',
  labels: {
    singular: 'Етап прогулянки',
    plural: 'Етапи прогулянки',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['stepNumber', 'title', 'badge'],
  },
  fields: [
    {
      name: 'stepNumber',
      type: 'text',
      required: true,
      label: 'Номер етапу (01, 02...)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва етапу',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Опис етапу',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Бейдж (напр. КРОК 1 • ФІКСАЦІЯ ЧАСУ)',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Назва іконки (Calendar, MapPin, Shield, Compass, Flag...)',
    },
  ],
}
