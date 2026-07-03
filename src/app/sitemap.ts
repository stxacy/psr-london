import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const BASE_URL = 'https://psr-london.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/vehicles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/sell`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/how-it-works`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'vehicles',
      where: { status: { equals: 'live' } },
      limit: 500,
    })

    const vehicleRoutes: MetadataRoute.Sitemap = docs.map((v) => ({
      url: `${BASE_URL}/vehicles/${v.slug}`,
      lastModified: new Date(v.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticRoutes, ...vehicleRoutes]
  } catch {
    return staticRoutes
  }
}
