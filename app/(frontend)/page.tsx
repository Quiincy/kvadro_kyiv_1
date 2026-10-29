import { getSiteData } from '@/lib/getSiteData'
import { HomePageClient } from '@/components/HomePageClient'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const data = await getSiteData()

  return <HomePageClient data={data} />
}
