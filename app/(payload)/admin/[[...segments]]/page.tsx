import type { Metadata } from 'next'
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = async ({ params, searchParams }: Args) => {
  try {
    return await RootPage({ config, params, searchParams, importMap })
  } catch (err: any) {
    if (err?.digest?.startsWith?.('NEXT_REDIRECT') || err?.digest?.startsWith?.('NEXT_NOT_FOUND')) {
      throw err
    }
    console.error('Payload Admin RootPage error:', err)
    return (
      <div style={{ padding: 40, fontFamily: 'monospace', color: '#ff5555', background: '#0e1117', minHeight: '100vh' }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Payload Admin RootPage Error</h2>
        <p style={{ color: '#aaa', marginBottom: 16 }}>Сталася помилка при завантаженні сторінки адмін-панелі:</p>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#1c212e', padding: 20, borderRadius: 8, color: '#ffaaaa' }}>
          {err?.stack || err?.message || String(err)}
        </pre>
      </div>
    )
  }
}

export default Page
