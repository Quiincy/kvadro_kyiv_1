import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const rawUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const baseUrl =
    rawUrl && !rawUrl.includes('localhost') && !rawUrl.includes('kvadro-kyiv-1.vercel.app')
      ? rawUrl
      : 'https://kvadrokyiv1-lake.vercel.app'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]
}
