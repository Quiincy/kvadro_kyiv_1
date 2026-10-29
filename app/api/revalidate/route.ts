import { NextRequest, NextResponse } from 'next/server'
import { headers as getHeaders } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

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

  const validSecret = process.env.PAYLOAD_SECRET
  const hasValidSecret = Boolean(validSecret && secret === validSecret)

  let isAuthenticatedAdmin = false
  if (!hasValidSecret) {
    try {
      const payload = await getPayload({ config })
      const headers = await getHeaders()
      const { user } = await payload.auth({ headers })
      isAuthenticatedAdmin = Boolean(user)
    } catch {
      isAuthenticatedAdmin = false
    }
  }

  if (!hasValidSecret && !isAuthenticatedAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized. Необхідна авторизація адміністратора або валідний токен.' },
      { status: 401 }
    )
  }

  try {
    revalidatePath('/')
    revalidatePath('/', 'layout')

    // Only allow safe internal relative redirects (prevent Open Redirect vulnerability)
    if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
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
