import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedDatabase } from '@/lib/seed'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const force = searchParams.get('force') === 'true'

    const payload = await getPayload({ config })
    const results = await seedDatabase(payload, force)

    return NextResponse.json({
      success: true,
      message: 'Базу даних Payload CMS успішно наповнено даними фронтенду',
      results,
    })
  } catch (err: any) {
    console.error('Seed API error:', err)
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  return GET(req)
}
