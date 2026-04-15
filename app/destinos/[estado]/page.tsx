import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CardLugar from '@/components/CardLugar'
import CardColeccion from '@/components/CardColeccion'
import { getLugaresByEstado } from '@/lib/utils'
import { estados, colecciones } from '@/lib/data'

interface Props {
  params: Promise<{ estado: string }>
}

export async function generateStaticParams() {
  return estados.map((e) => ({ estado: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { estado: estadoSlug } = await params
  const estado = estados.find((e) => e.slug === estadoSlug)
  if (!estado) return {}
  return {
    title: `Qué hacer en ${estado.nombre} — Guía de planes y experiencias`,
    description: estado.descripcion,
  }
}

export default async function EstadoPage({ params }: Props) {
  const { estado: estadoSlug } = await params
  const estado = estados.find((e) => e.slug === estadoSlug)
  if (!estado) notFound()

  const lugaresEstado = getLugaresByEstado(estadoSlug)
  const coleccionesEstado = colecciones.filter((c) => c.estadoSlug === estadoSlug)

  return (
    <>
      <section className="bg-gradient-to-br from-orange-950 to-stone-950 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/destinos" className="hover:text-stone-300 transition-colors">Destinos</Link>
            <span>/</span>
            <span className="text-stone-300">{estado.nombre}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            {estado.nombre}
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl leading-relaxed mb-6">
            {estado.descripcion}
          </p>
          <div className="flex flex-wrap gap-2">
            {estado.highlights.map((h) => (
              <span key={h} className="text-sm bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1 rounded-full">
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {coleccionesEstado.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Colecciones sobre {estado.nombre}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {coleccionesEstado.map((col) => (
                <CardColeccion key={col.slug} coleccion={col} />
              ))}
            </div>
          </section>
        )}

        {lugaresEstado.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Artículos y guías de {estado.nombre}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lugaresEstado.map((lugar) => (
                <CardLugar key={lugar.slug} lugar={lugar} size="md" />
              ))}
            </div>
          </section>
        )}

        {lugaresEstado.length === 0 && coleccionesEstado.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🗺️</div>
            <h2 className="text-xl font-semibold text-stone-700 mb-2">Contenido en preparación</h2>
            <p className="text-stone-500 mb-6">Estamos preparando contenido editorial sobre {estado.nombre}. Vuelve pronto.</p>
            <Link href="/destinos" className="text-amber-600 hover:text-amber-700 font-medium">
              ← Ver todos los destinos
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
