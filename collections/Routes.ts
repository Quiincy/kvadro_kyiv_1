import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '../lib/revalidate'

export const Routes: CollectionConfig = {
  slug: 'routes',
  labels: {
    singular: 'Маршрут / Фото',
    plural: 'Маршрути та Галерея',
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
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва локації або траси',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Категорія',
      options: [
        { label: 'Групові заїзди', value: 'group' },
        { label: 'Ендуро мото треки', value: 'enduro' },
        { label: 'Баггі експедиції', value: 'buggy' },
        { label: 'Корпоративи та свята', value: 'corporate' },
        { label: 'Фотозони на схилах', value: 'photo_zone' },
      ],
    },
    {
      name: 'categoryLabel',
      type: 'text',
      label: 'Підпис категорії (напр. ГРУПОВІ ЗАЇЗДИ)',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Короткий опис',
    },
    {
      name: 'imageMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото з Медіабібліотеки (завантажити з ПК або вибрати з галереї)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      required: false,
      label: 'Або прямий шлях / посилання до фото (наприклад /assets/gallery/1p.png)',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 1,
      label: 'Порядок відображення',
    },
  ],
}
