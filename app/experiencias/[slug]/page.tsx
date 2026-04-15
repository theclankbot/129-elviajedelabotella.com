import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CardColeccion from '@/components/CardColeccion'
import CardLugar from '@/components/CardLugar'
import LugarArticleBody from '@/components/LugarArticleBody'
import { colecciones, lugares } from '@/lib/data'
import { Coleccion, Lugar } from '@/lib/types'
import {
  getColeccionBySlug,
  getLugarBySlug,
  getLugaresByPilar,
  pilarLabel,
} from '@/lib/utils'

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
  'paint-and-wine': {
    titulo: 'Paint & wine en USA',
    descripcion: 'Talleres creativos, estudios independientes y sesiones con vino que merecen el desvío.',
    intro:
      'No buscamos franquicias clónicas. Aquí reunimos talleres y guías con personalidad para quienes quieren una experiencia más editorial que corporativa.',
    icon: '🎨',
    lugares: ['pintura-vino-nueva-york'],
    colecciones: colecciones
      .filter((coleccion) => coleccion.titulo.toLowerCase().includes('paint & wine'))
      .map((coleccion) => coleccion.slug),
  },
  patinaje: {
    titulo: 'Patinaje sobre hielo en USA',
    descripcion: 'Pistas cubiertas y al aire libre, escapadas de invierno y rinks con carácter local.',
    intro:
      'El buen patinaje no es solo una pista. También importa la atmósfera, el contexto del lugar y si la experiencia merece de verdad una tarde o una escapada.',
    icon: '⛸️',
    lugares: ['pistas-patinaje-connecticut'],
  },
  minigolf: {
    titulo: 'Minigolf en USA',
    descripcion: 'Rutas y campos temáticos para quien busca algo más raro que el minigolf de siempre.',
    intro:
      'Estamos preparando una selección editorial de minigolfs temáticos, retro y aventureros para planes de pareja o grupo.',
    icon: '⛳',
    lugares: [],
  },
  'escape-rooms': {
    titulo: 'Escape rooms en USA',
    descripcion: 'Experiencias inmersivas y salas con más imaginación que puro ruido.',
    intro:
      'La categoría tiene sentido para la marca, pero todavía no vamos a publicar listados vacíos. Preferimos llegar con criterio antes que llegar rápido.',
    icon: '🎭',
    lugares: [],
  },
  catas: {
    titulo: 'Catas y bodegas en USA',
    descripcion: 'Bodegas, sidrerías y planes de degustación con contexto local.',
    intro:
      'Estamos armando esta capa editorial alrededor de bodegas, sidrerías y degustaciones que merezcan el viaje, no solo una reserva cualquiera.',
    icon: '🍷',
    lugares: [],
  },
  aventura: {
    titulo: 'Escalada y aventura en USA',
    descripcion: 'Tirolinas, rocódromos y planes físicos para salir de la rutina.',
    intro:
      'La aventura urbana y de fin de semana tiene hueco en el proyecto, pero todavía estamos reuniendo piezas que tengan ángulo real y no relleno.',
    icon: '🧗',
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
    .filter((lugar) => lugar.pilar === 'experiencias')
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

export default async function ExperienciaPage({ params }: Props) {
  const { slug } = await params
  const topicPage = topicPages[slug]

  if (topicPage) {
    const lugaresTema = resolveHubLugares(topicPage.lugares)
    const coleccionesTema = resolveHubColecciones(topicPage.colecciones ?? [])

    return (
      <>
        <section className="bg-gradient-to-br from-teal-950 to-stone-950 relative overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
              <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/experiencias" className="hover:text-stone-300 transition-colors">Experiencias</Link>
              <span>/</span>
              <span className="text-stone-300">{topicPage.titulo}</span>
            </nav>
            <span className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm px-3 py-1 rounded-full mb-4">
              <span>{topicPage.icon}</span>
              Experiencias
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              {topicPage.titulo}
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-3xl">{topicPage.descripcion}</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 mb-10">
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
                Esta temática encaja con la marca, pero todavía no tiene suficientes piezas publicadas para abrir una guía fuerte.
              </p>
              <Link href="/experiencias" className="text-amber-600 hover:text-amber-700 font-medium">
                ← Ver todas las experiencias
              </Link>
            </div>
          )}
        </div>
      </>
    )
  }

  const lugar = getLugarBySlug(slug)
  if (!lugar) notFound()

  const relacionados = getLugaresByPilar(lugar.pilar)
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <section className="bg-gradient-to-br from-teal-950 to-stone-950 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/experiencias" className="hover:text-stone-300 transition-colors">Experiencias</Link>
            <span>/</span>
            <span className="text-stone-400 truncate max-w-[180px]">{lugar.titulo}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs px-3 py-1 rounded-full">
              {pilarLabel(lugar.pilar)}
            </span>
            <span className="bg-stone-700/50 text-stone-300 text-xs px-3 py-1 rounded-full">{lugar.estado}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">{lugar.titulo}</h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">{lugar.descripcion}</p>
        </div>
      </section>

      <LugarArticleBody lugar={lugar} infoBoxClassName="bg-teal-50 border-teal-100" />

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
