import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Fetch unhandled new bookings
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
    return NextResponse.json({ count: 0, bookings: [] })
  }
}
