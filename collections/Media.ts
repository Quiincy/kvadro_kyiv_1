import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { revalidateAfterChange, revalidateAfterDelete } from '../lib/revalidate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Фото / Медіафайл',
    plural: 'Медіабібліотека (Фото)',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
   upload: {
    staticDir: path.resolve(dirname, '../public/media'),
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
    // Automatically convert any uploaded image (JPEG, PNG, etc.) to optimized WebP
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Альтернативний текст (Alt / Опис)',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Підпис',
    },
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
    afterRead: [
      ({ doc }) => {
        if (doc && doc.filename) {
          doc.url = `/media/${doc.filename}`
        }
        return doc
      },
    ],
  },
}
