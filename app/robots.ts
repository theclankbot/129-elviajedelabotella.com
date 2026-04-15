import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

const BASE_URL = siteConfig.siteUrl

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/buscar'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
