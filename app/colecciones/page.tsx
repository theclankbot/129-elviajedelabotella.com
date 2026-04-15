import type { Metadata } from 'next'
import Link from 'next/link'
import CardColeccion from '@/components/CardColeccion'
import { colecciones } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Colecciones editoriales — Guías curadas sobre USA',
  description:
    'Colecciones editoriales sobre lugares raros, planes estacionales, thrift, experiencias y destinos en Estados Unidos. Curadas con criterio.',
}

export default function ColeccionesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-stone-900 to-stone-950 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-stone-300">Colecciones</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-stone-700/50 border border-stone-600/30 text-stone-300 text-sm px-3 py-1 rounded-full mb-4">
              Curación editorial
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Colecciones editoriales
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
              Guías curadas que van más allá del listado genérico. Cada colección tiene un ángulo,
              un criterio y una perspectiva que la hace diferente.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {colecciones.map((col) => (
            <CardColeccion key={col.slug} coleccion={col} />
          ))}
        </div>
      </div>
    </>
  )
}
