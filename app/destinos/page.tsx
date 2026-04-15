import type { Metadata } from 'next'
import Link from 'next/link'
import CardEstado from '@/components/CardEstado'
import { estados } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Destinos en USA — Guías por estado con criterio editorial',
  description:
    'Guías de destinos en Estados Unidos con ángulo editorial. No plantillas vacías: solo estados con contenido real, planes curiosos y experiencias con criterio.',
}

export default function DestinosPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-orange-950 to-stone-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-300 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-stone-300">Destinos</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm px-3 py-1 rounded-full mb-4">
              Guías por destino
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Destinos en USA con ángulo
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
              No hacemos páginas vacías por estado. Solo destinos con contenido real:
              leyendas, planes estacionales, experiencias locales y guías que dan ganas de ir.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-10">
          <p className="text-stone-600 text-sm leading-relaxed">
            <strong>Criterio editorial:</strong> Solo publicamos guías de destinos cuando tenemos contenido propio sobre ese estado.
            No encontrarás páginas vacías con listas genéricas. Si un destino aparece aquí, es porque hay algo real que contar.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-stone-800 mb-6">Estados con contenido editorial</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {estados.map((estado) => (
            <CardEstado key={estado.slug} estado={estado} />
          ))}
        </div>
      </div>
    </>
  )
}
