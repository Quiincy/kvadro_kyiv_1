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

const rawDbUri = process.env.DATABASE_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/kvadro'
// Strip ?sslmode=require from query params to allow pg ssl config to handle self-signed Supabase pooler certificates
let cleanDbUri = rawDbUri.replace(/[?&]sslmode=[^&]+/g, '').replace(/\?$/, '')

// Automatically switch Supabase pooler from Session mode (:5432, max 15 clients) to Transaction mode (:6543)
// for serverless environments (Vercel) to completely prevent EMAXCONNSESSION
if (cleanDbUri.includes('pooler.supabase.com') && cleanDbUri.includes(':5432')) {
  cleanDbUri = cleanDbUri.replace(':5432', ':6543')
}

const isRemoteDb = Boolean(
  cleanDbUri &&
  !cleanDbUri.includes('127.0.0.1') &&
  !cleanDbUri.includes('localhost')
)

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
      connectionString: cleanDbUri,
      max: isRemoteDb ? 2 : 10,
      idleTimeoutMillis: 8000,
      connectionTimeoutMillis: 6000,
      ...(isRemoteDb ? { ssl: { rejectUnauthorized: false } } : {}),
    },
    push: false,
  }),
})

