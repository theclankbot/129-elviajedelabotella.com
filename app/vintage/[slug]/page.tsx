import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CardColeccion from '@/components/CardColeccion'
import CardLugar from '@/components/CardLugar'
import LugarArticleBody from '@/components/LugarArticleBody'
import { lugares } from '@/lib/data'
import { Coleccion, Lugar } from '@/lib/types'
import { getColeccionBySlug, getLugarBySlug, getLugaresByPilar } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

interface HubPageConfig {
  titulo: string
  descripcion: string
  intro: string
  icon: string
  lugares: string[]
  colecciones?: string[]
}

const topicPages: Record<string, HubPageConfig> = {
  'thrift-stores': {
    titulo: 'Thrift stores en USA',
    descripcion: 'Tiendas de segunda mano con personalidad, contexto local y hallazgos que sí justifican el viaje.',
    intro:
      'Esta sección no pretende listar cualquier thrift store. Solo las que tienen color local, una escena alrededor o un valor claro para quien disfruta buscar con criterio.',
    icon: '👗',
    lugares: ['thrift-stores-delaware', 'thrift-stores-iowa', 'thrift-stores-carolina-del-sur'],
    colecciones: ['rutas-thrift-nueva-jersey'],
  },
  antiguedades: {
    titulo: 'Antigüedades y muebles en USA',
    descripcion: 'Tiendas, mercados y espacios donde los objetos antiguos merecen la parada.',
    intro:
      'Queremos abrir esta línea con piezas que mezclen decoración, hallazgo y cultura local, no con un directorio sin alma de anticuarios.',
    icon: '🪑',
    lugares: [],
  },
  librerias: {
    titulo: 'Librerías de segunda mano en USA',
    descripcion: 'Librerías con carácter, secciones raras y ambientes que invitan a perder una tarde.',
    intro:
      'La categoría encaja perfectamente con la marca, pero todavía no tiene suficientes piezas publicadas como para prometer una guía sólida.',
    icon: '📚',
    lugares: [],
  },
  vinilos: {
    titulo: 'Vinilos y música en USA',
    descripcion: 'Record stores y tiendas con valor cultural real, más allá de la nostalgia de escaparate.',
    intro:
      'Estamos trabajando esta sección con un enfoque de descubrimiento local: tiendas con comunidad, especialización y un motivo claro para desviarse.',
    icon: '💿',
    lugares: [],
  },
  mercados: {
    titulo: 'Mercados y ferias vintage en USA',
    descripcion: 'Mercados de pulgas y ferias donde todavía pueden aparecer hallazgos reales.',
    intro:
      'Todavía no hay suficientes piezas publicadas para abrir una guía de mercados y ferias con el nivel de selección que buscamos.',
    icon: '🛍️',
    lugares: [],
  },
  rutas: {
    titulo: 'Rutas vintage en USA',
    descripcion: 'Itinerarios para encadenar thrift stores, mercados y tiendas con historia.',
    intro:
      'Las rutas funcionan muy bien para esta marca porque convierten el hallazgo en escapada. Abrimos la categoría con colecciones editoriales antes que con listados pobres.',
    icon: '🗺️',
    lugares: [],
    colecciones: ['rutas-thrift-nueva-jersey'],
  },
}

function resolveHubLugares(slugs: string[]): Lugar[] {
  return slugs
    .map((slug) => getLugarBySlug(slug))
    .filter((item): item is Lugar => Boolean(item))
}

function resolveHubColecciones(slugs: string[]): Coleccion[] {
  return slugs
    .map((slug) => getColeccionBySlug(slug))
    .filter((item): item is Coleccion => Boolean(item))
}

function topicPageHasContent(topicPage: HubPageConfig) {
  return (
    resolveHubLugares(topicPage.lugares).length > 0 ||
    resolveHubColecciones(topicPage.colecciones ?? []).length > 0
  )
}

export async function generateStaticParams() {
  const articleSlugs = lugares
    .filter((lugar) => lugar.pilar === 'vintage')
    .map((lugar) => ({ slug: lugar.slug }))

  return [...Object.keys(topicPages).map((slug) => ({ slug })), ...articleSlugs]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topicPage = topicPages[slug]

  if (topicPage) {
    return {
      title: topicPage.titulo,
      description: topicPage.descripcion,
      robots: topicPageHasContent(topicPage) ? undefined : { index: false, follow: true },
    }
  }

  const lugar = getLugarBySlug(slug)
  if (!lugar) return {}

  return { title: lugar.titulo, description: lugar.descripcion }
}

export default async function VintageItemPage({ params }: Props) {
  const { slug } = await params
  const topicPage = topicPages[slug]

  if (topicPage) {
    const lugaresTema = resolveHubLugares(topicPage.lugares)
    const coleccionesTema = resolveHubColecciones(topicPage.colecciones ?? [])

    return (
      <>
        <section className="bg-gradient-to-br from-rose-950 to-stone-950 relative overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
              <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/vintage" className="hover:text-stone-300 transition-colors">Vintage & thrift</Link>
              <span>/</span>
              <span className="text-stone-300">{topicPage.titulo}</span>
            </nav>
            <span className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm px-3 py-1 rounded-full mb-4">
              <span>{topicPage.icon}</span>
              Vintage & thrift
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              {topicPage.titulo}
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-3xl">{topicPage.descripcion}</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 mb-10">
            <p className="text-stone-600 leading-relaxed">{topicPage.intro}</p>
          </div>

          {lugaresTema.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Artículos y guías</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {lugaresTema.map((lugar) => (
                  <CardLugar key={lugar.slug} lugar={lugar} size="md" />
                ))}
              </div>
            </section>
          )}

          {coleccionesTema.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Colecciones relacionadas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {coleccionesTema.map((coleccion) => (
                  <CardColeccion key={coleccion.slug} coleccion={coleccion} />
                ))}
              </div>
            </section>
          )}

          {lugaresTema.length === 0 && coleccionesTema.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">{topicPage.icon}</div>
              <h2 className="text-xl font-semibold text-stone-700 mb-2">Contenido en preparación</h2>
              <p className="text-stone-500 mb-6">
                Todavía no hay suficiente contenido publicado para abrir esta temática sin caer en el relleno.
              </p>
              <Link href="/vintage" className="text-amber-600 hover:text-amber-700 font-medium">
                ← Ver todo el contenido vintage
              </Link>
            </div>
          )}
        </div>
      </>
    )
  }

  const lugar = getLugarBySlug(slug)
  if (!lugar) notFound()

  const relacionados = getLugaresByPilar('vintage')
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <section className="bg-gradient-to-br from-rose-950 to-stone-950 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/vintage" className="hover:text-stone-300 transition-colors">Vintage & thrift</Link>
            <span>/</span>
            <span className="text-stone-400 truncate max-w-[180px]">{lugar.titulo}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-3 py-1 rounded-full">
              Vintage & thrift
            </span>
            <span className="bg-stone-700/50 text-stone-300 text-xs px-3 py-1 rounded-full">{lugar.estado}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">{lugar.titulo}</h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">{lugar.descripcion}</p>
        </div>
      </section>

      <LugarArticleBody
        lugar={lugar}
        categoryLabel="Vintage & thrift"
        infoBoxClassName="bg-rose-50 border-rose-100"
      />

      {relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="border-t border-stone-100 pt-10">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">También puede interesarte</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relacionados.map((item) => (
                <CardLugar key={item.slug} lugar={item} size="md" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
