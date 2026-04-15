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
  'centros-de-juego': {
    titulo: 'Centros de juego para niños en USA',
    descripcion: 'Parques de juego interiores y espacios familiares que aportan algo más que trampolines en serie.',
    intro:
      'Cuando cubrimos ocio infantil buscamos originalidad, practicidad y sitios que de verdad faciliten un buen plan familiar, no solo una actividad para matar la tarde.',
    icon: '🎮',
    lugares: ['centros-juego-ninos-utah'],
  },
  cumpleanos: {
    titulo: 'Cumpleaños infantiles en USA',
    descripcion: 'Lugares que ayudan a montar fiestas memorables sin caer en la plantilla de siempre.',
    intro:
      'La categoría de cumpleaños funciona cuando el sitio tiene algo distintivo: museos, aventura, juego libre o una propuesta que justifique reunir a toda la familia.',
    icon: '🎂',
    lugares: ['cumpleanos-ninos-ohio'],
  },
  'zoos-naturaleza': {
    titulo: 'Zoos y naturaleza con niños en USA',
    descripcion: 'Escapadas familiares con animales, granjas y naturaleza accesible.',
    intro:
      'Estamos preparando esta temática con el mismo criterio del resto del proyecto: solo sitios con contexto, personalidad y una razón clara para recomendarse.',
    icon: '🦁',
    lugares: [],
  },
  parques: {
    titulo: 'Parques y atracciones para familias en USA',
    descripcion: 'Parques, atracciones y espacios de juego donde la experiencia familiar tiene sentido.',
    intro:
      'No queremos convertir esta sección en un directorio infinito de atracciones genéricas. Entrarán solo piezas con un ángulo fuerte y útil.',
    icon: '🎡',
    lugares: [],
  },
  cultura: {
    titulo: 'Cultura para niños en USA',
    descripcion: 'Museos, teatros y experiencias culturales pensadas para familias curiosas.',
    intro:
      'Esta es una línea editorial natural para la marca, pero todavía no tiene suficiente inventario propio como para abrirla con criterio.',
    icon: '🎭',
    lugares: [],
  },
  camping: {
    titulo: 'Camping familiar en USA',
    descripcion: 'Campamentos y parques donde una escapada con niños de verdad funciona.',
    intro:
      'El camping familiar tendrá hueco en el proyecto cuando tengamos recomendaciones con foco real en familias: accesibilidad, servicios y entorno que compense el viaje.',
    icon: '🏕️',
    lugares: [],
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
    .filter((lugar) => lugar.pilar === 'familias')
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

export default async function FamiliaPage({ params }: Props) {
  const { slug } = await params
  const topicPage = topicPages[slug]

  if (topicPage) {
    const lugaresTema = resolveHubLugares(topicPage.lugares)
    const coleccionesTema = resolveHubColecciones(topicPage.colecciones ?? [])

    return (
      <>
        <section className="bg-gradient-to-br from-blue-950 to-stone-950 relative overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
              <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/familias" className="hover:text-stone-300 transition-colors">Con niños</Link>
              <span>/</span>
              <span className="text-stone-300">{topicPage.titulo}</span>
            </nav>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full mb-4">
              <span>{topicPage.icon}</span>
              Con niños
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              {topicPage.titulo}
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-3xl">{topicPage.descripcion}</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
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
                Todavía no hay suficiente contenido publicado para abrir esta guía familiar con el nivel editorial que buscamos.
              </p>
              <Link href="/familias" className="text-amber-600 hover:text-amber-700 font-medium">
                ← Ver todos los planes familiares
              </Link>
            </div>
          )}
        </div>
      </>
    )
  }

  const lugar = getLugarBySlug(slug)
  if (!lugar) notFound()

  const relacionados = getLugaresByPilar('familias')
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <section className="bg-gradient-to-br from-blue-950 to-stone-950 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/familias" className="hover:text-stone-300 transition-colors">Con niños</Link>
            <span>/</span>
            <span className="text-stone-400 truncate max-w-[180px]">{lugar.titulo}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">
              Con niños
            </span>
            <span className="bg-stone-700/50 text-stone-300 text-xs px-3 py-1 rounded-full">{lugar.estado}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">{lugar.titulo}</h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">{lugar.descripcion}</p>
        </div>
      </section>

      <LugarArticleBody
        lugar={lugar}
        categoryLabel="Planes con niños"
        infoBoxClassName="bg-blue-50 border-blue-100"
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
