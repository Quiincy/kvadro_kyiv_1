import { NextResponse } from 'next/server'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedDatabase } from '@/lib/seed'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const force = searchParams.get('force') === 'true'
    const secret = searchParams.get('secret')

    const payload = await getPayload({ config })
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    const expectedSecret = process.env.PAYLOAD_SECRET
    const hasValidSecret = Boolean(expectedSecret && secret === expectedSecret)

    // Check if the database is completely empty for initial bootstrap
    const { totalDocs: fleetCount } = await payload.count({
      collection: 'fleet',
      overrideAccess: true,
    })

    const isInitialBootstrap = fleetCount === 0 && !force

    if (!user && !hasValidSecret && !isInitialBootstrap) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized. Для запуску seed необхідна авторизація в адмін-панелі або валідний секретний ключ.',
        },
        { status: 401 }
      )
    }

    const results = await seedDatabase(payload, force)

    return NextResponse.json({
      success: true,
      message: 'Базу даних Payload CMS успішно наповнено даними фронтенду',
      results,
    })
  } catch (err: any) {
    console.error('Seed API error:', err)
    return NextResponse.json(
      { success: false, error: 'Внутрішня помилка при наповненні бази даних' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  return GET(req)
}
