import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import sharp from 'sharp'

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Fleet } from './collections/Fleet'
import { Steps } from './collections/Steps'
import { Routes } from './collections/Routes'
import { Reviews } from './collections/Reviews'
import { Bookings } from './collections/Bookings'
import { Faqs } from './collections/Faqs'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  sharp,
  collections: [
    Media,
    Users,
    Fleet,
    Steps,
    Routes,
    Reviews,
    Bookings,
    Faqs,
  ],
  globals: [
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'kvadro-kyiv-secret-key-2026-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/kvadro',
    },
    push: true,
  }),
})

