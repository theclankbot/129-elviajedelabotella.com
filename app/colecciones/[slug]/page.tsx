import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ColeccionArticleBody from '@/components/ColeccionArticleBody'
import { getColeccionBySlug, getLugarBySlug } from '@/lib/utils'
import { colecciones } from '@/lib/data'
import { Lugar } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return colecciones.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const col = getColeccionBySlug(slug)
  if (!col) return {}
  return { title: col.titulo, description: col.descripcion }
}

export default async function ColeccionPage({ params }: Props) {
  const { slug } = await params
  const coleccion = getColeccionBySlug(slug)
  if (!coleccion) notFound()

  const lugaresColeccion = coleccion.lugares
    .map((s) => getLugarBySlug(s))
    .filter((item): item is Lugar => Boolean(item))

  return (
    <>
      <section className="bg-gradient-to-br from-stone-900 to-stone-950 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/colecciones" className="hover:text-stone-300 transition-colors">Colecciones</Link>
            <span>/</span>
            <span className="text-stone-400 truncate max-w-[200px]">{coleccion.titulo}</span>
          </nav>
          {coleccion.estado && (
            <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full mb-4">
              {coleccion.estado}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {coleccion.titulo}
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">{coleccion.descripcion}</p>
        </div>
      </section>

      <ColeccionArticleBody coleccion={coleccion} lugaresColeccion={lugaresColeccion} />

      {/* Back */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <Link href="/colecciones" className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Ver todas las colecciones
        </Link>
      </div>
    </>
  )
}
