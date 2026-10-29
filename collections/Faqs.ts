import type { CollectionConfig } from 'payload'
import { revalidateCollectionAfterChange, revalidateCollectionAfterDelete } from '@/lib/revalidate'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'Питання та відповідь (FAQ)',
    plural: 'Питання та відповіді (FAQ)',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollectionAfterChange],
    afterDelete: [revalidateCollectionAfterDelete],
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'order', 'isArticle'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Питання / Заголовок статті',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Відповідь / Текст статті',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 1,
      label: 'Порядок сортування',
    },
    {
      name: 'isArticle',
      type: 'checkbox',
      defaultValue: false,
      label: 'Показувати в блоці корисних статей (десктоп)',
    },
    {
      name: 'articleBadge',
      type: 'text',
      label: 'Бейдж статті (напр. ГІД ДЛЯ ПОЧАТКІВЦІВ, БЕЗПЕКА ТА ЕКІП)',
    },
  ],
}
