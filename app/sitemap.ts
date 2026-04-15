import type { MetadataRoute } from 'next'
import { colecciones, estados, lugares } from '@/lib/data'
import { siteConfig } from '@/lib/site'

const BASE_URL = siteConfig.siteUrl

const staticRoutes = [
  '',
  '/lugares-raros',
  '/temporada',
  '/experiencias',
  '/familias',
  '/vintage',
  '/destinos',
  '/colecciones',
  '/sobre-nosotros',
  '/fuentes-de-datos',
  '/contacto',
  '/privacidad',
  '/terminos',
]

const contentfulExperienceTopics = ['/experiencias/paint-and-wine', '/experiencias/patinaje']
const contentfulFamilyTopics = ['/familias/centros-de-juego', '/familias/cumpleanos']
const contentfulVintageTopics = ['/vintage/thrift-stores', '/vintage/rutas']
const contentfulSeasonTopics = [
  '/temporada/otono',
  '/temporada/invierno',
  '/temporada/primavera',
  '/temporada/verano',
  '/temporada/apple-picking',
  '/temporada/camping',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
    })),
    ...contentfulExperienceTopics.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
    })),
    ...contentfulFamilyTopics.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
    })),
    ...contentfulVintageTopics.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
    })),
    ...contentfulSeasonTopics.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
    })),
    ...colecciones.map((item) => ({
      url: `${BASE_URL}/colecciones/${item.slug}`,
      lastModified: now,
    })),
    ...estados.map((item) => ({
      url: `${BASE_URL}/destinos/${item.slug}`,
      lastModified: now,
    })),
    ...lugares.map((item) => {
      if (item.pilar === 'destinos') {
        return {
          url: `${BASE_URL}/destinos/${item.estadoSlug}/${item.slug}`,
          lastModified: now,
        }
      }

      return {
        url: `${BASE_URL}/${item.pilar}/${item.slug}`,
        lastModified: now,
      }
    }),
  ]
}
