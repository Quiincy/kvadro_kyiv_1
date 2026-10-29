import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '../lib/revalidate'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Відгук клієнта',
    plural: 'Відгуки клієнтів',
  },
  lockDocuments: false,
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'rating', 'verified', 'date'],
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      label: "Ім'я клієнта",
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 5,
      min: 1,
      max: 5,
      label: 'Оцінка (1-5 зірок)',
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Текст відгуку',
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: true,
      label: 'Підтверджений клієнт',
    },
    {
      name: 'date',
      type: 'text',
      label: 'Дата (напр. Жовтень 2026)',
    },
  ],
}
