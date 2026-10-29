import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  return handleRevalidate(req)
}

export async function POST(req: NextRequest) {
  return handleRevalidate(req)
}

async function handleRevalidate(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const redirect = searchParams.get('redirect')

  const validSecret = process.env.PAYLOAD_SECRET || 'kvadro2026'

  // Allow with secret token or fallback token
  if (secret !== validSecret && secret !== 'kvadro2026') {
    return NextResponse.json(
      { error: 'Invalid secret token. Provide ?secret=...' },
      { status: 401 }
    )
  }

  try {
    revalidatePath('/')
    revalidatePath('/', 'layout')

    if (redirect) {
      return NextResponse.redirect(new URL(redirect, req.url))
    }

    return NextResponse.json({
      revalidated: true,
      path: '/',
      timestamp: new Date().toISOString(),
      message: 'Кеш сайту успішно оновлено! Усі нові ціни та налаштування вже активні на головній сторінці.',
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Error revalidating', details: err?.message },
      { status: 500 }
    )
  }
}
