import type { Metadata } from 'next'
import Link from 'next/link'
import CardLugar from '@/components/CardLugar'
import { getLugaresByPilar } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Vintage & thrift en USA — Tiendas de segunda mano y hallazgos',
  description:
    'Guía de tiendas thrift, rutas vintage y hallazgos con historia en Estados Unidos. Segunda mano con criterio editorial.',
}

const tiposVintage = [
  { icon: '👗', label: 'Thrift stores', desc: 'Las mejores tiendas de ropa de segunda mano', href: '/vintage/thrift-stores' },
  { icon: '🗺️', label: 'Rutas vintage', desc: 'Rutas por zonas con concentración vintage', href: '/vintage/rutas' },
]

export default function VintagePage() {
  const lugares = getLugaresByPilar('vintage')

  return (
    <>
      <section className="bg-gradient-to-br from-rose-950 to-stone-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-300 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-stone-300">Vintage & thrift</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-3 py-1 rounded-full mb-4">
              Segunda mano & hallazgos
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Vintage, thrift y hallazgos locales en USA
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
              Tiendas de segunda mano con personalidad, rutas vintage y hallazgos
              con contexto local. No vale cualquier comercio: solo lo que tiene historia y criterio.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Qué encontrarás aquí</h2>
          <p className="text-stone-500 mb-6">
            No listamos cualquier tienda de segunda mano. Solo la que tiene color, historia y algo que hace que valga la pena el desvío.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiposVintage.map((tipo) => (
              <Link
                key={tipo.href}
                href={tipo.href}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors group"
              >
                <span className="text-2xl shrink-0">{tipo.icon}</span>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-rose-700 transition-colors">{tipo.label}</h3>
                  <p className="text-sm text-stone-500 mt-0.5">{tipo.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {lugares.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Artículos y guías</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lugares.map((lugar) => (
                <CardLugar key={lugar.slug} lugar={lugar} size="md" />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
