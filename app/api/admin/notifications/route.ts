import { NextResponse } from 'next/server'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    if (!user) {
      return NextResponse.json(
        { count: 0, bookings: [], authenticated: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch unhandled new bookings for authenticated admin user
    const result = await payload.find({
      collection: 'bookings',
      where: {
        status: {
          equals: 'new',
        },
      },
      sort: '-createdAt',
      limit: 10,
    })

    return NextResponse.json({
      authenticated: true,
      count: result.totalDocs,
      bookings: result.docs.map((doc: any) => ({
        id: doc.id,
        clientName: doc.clientName || 'Клієнт',
        clientPhone: doc.clientPhone || '',
        vehicleType: doc.vehicleType || 'Квадроцикли',
        duration: doc.duration || '1 година',
        calculatedTotal: doc.calculatedTotal || 0,
        bookingType: doc.bookingType || 'standard',
        createdAt: doc.createdAt,
      })),
    })
  } catch (error) {
    console.error('Error fetching admin notifications:', error)
    return NextResponse.json({ count: 0, bookings: [], authenticated: false }, { status: 401 })
  }
}
