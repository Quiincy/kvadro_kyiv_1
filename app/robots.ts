import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const rawUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const baseUrl =
    rawUrl && !rawUrl.includes('localhost') && !rawUrl.includes('kvadro-kyiv-1.vercel.app')
      ? rawUrl
      : 'https://kvadrokyiv1-lake.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
