import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CardColeccion from '@/components/CardColeccion'
import CardLugar from '@/components/CardLugar'
import LugarArticleBody from '@/components/LugarArticleBody'
import { colecciones, lugares } from '@/lib/data'
import { getEstadoBySlug, getLugarBySlug, getLugaresByEstado } from '@/lib/utils'

interface Props {
  params: Promise<{ estado: string; slug: string }>
}

export async function generateStaticParams() {
  return lugares
    .filter((lugar) => lugar.pilar === 'destinos')
    .map((lugar) => ({ estado: lugar.estadoSlug, slug: lugar.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { estado, slug } = await params
  const lugar = getLugarBySlug(slug)

  if (!lugar || lugar.pilar !== 'destinos' || lugar.estadoSlug !== estado) {
    return {}
  }

  return {
    title: lugar.titulo,
    description: lugar.descripcion,
  }
}

export default async function DestinoArticlePage({ params }: Props) {
  const { estado: estadoSlug, slug } = await params
  const estado = getEstadoBySlug(estadoSlug)
  const lugar = getLugarBySlug(slug)

  if (!lugar || lugar.pilar !== 'destinos' || lugar.estadoSlug !== estadoSlug) {
    notFound()
  }

  const relacionados = getLugaresByEstado(estadoSlug)
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
  const coleccionesEstado = colecciones
    .filter((coleccion) => coleccion.estadoSlug === estadoSlug)
    .slice(0, 3)

  return (
    <>
      <section className="bg-gradient-to-br from-orange-950 to-stone-950 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/destinos" className="hover:text-stone-300 transition-colors">Destinos</Link>
            <span>/</span>
            {estado ? (
              <>
                <Link href={`/destinos/${estadoSlug}`} className="hover:text-stone-300 transition-colors">
                  {estado.nombre}
                </Link>
                <span>/</span>
              </>
            ) : null}
            <span className="text-stone-400 truncate max-w-[180px]">{lugar.titulo}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs px-3 py-1 rounded-full">
              Destinos
            </span>
            <span className="bg-stone-700/50 text-stone-300 text-xs px-3 py-1 rounded-full">{lugar.estado}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {lugar.titulo}
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">{lugar.descripcion}</p>
        </div>
      </section>

      <LugarArticleBody
        lugar={lugar}
        categoryLabel="Guía por destino con ángulo editorial"
        infoBoxClassName="bg-orange-50 border-orange-100"
      />

      {(relacionados.length > 0 || coleccionesEstado.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="border-t border-stone-100 pt-10 space-y-10">
            {relacionados.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-stone-800 mb-6">Más ideas en {lugar.estado}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {relacionados.map((item) => (
                    <CardLugar key={item.slug} lugar={item} size="md" />
                  ))}
                </div>
              </div>
            )}

            {coleccionesEstado.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-stone-800 mb-6">Colecciones relacionadas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {coleccionesEstado.map((coleccion) => (
                    <CardColeccion key={coleccion.slug} coleccion={coleccion} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
