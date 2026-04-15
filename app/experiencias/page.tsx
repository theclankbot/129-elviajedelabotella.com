import type { Metadata } from 'next'
import Link from 'next/link'
import CardLugar from '@/components/CardLugar'
import { getLugaresByPilar } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Experiencias locales en USA — Paint & wine, patinaje y más',
  description:
    'Guía de experiencias locales en Estados Unidos: paint and wine, pistas de patinaje y planes originales para parejas y grupos.',
}

const tiposExperiencias = [
  { icon: '🎨', label: 'Paint & wine', desc: 'Talleres de pintura con copa en mano', href: '/experiencias/paint-and-wine' },
  { icon: '⛸️', label: 'Patinaje sobre hielo', desc: 'Pistas cubiertas y al aire libre', href: '/experiencias/patinaje' },
]

export default function ExperienciasPage() {
  const lugares = getLugaresByPilar('experiencias')

  return (
    <>
      <section className="bg-gradient-to-br from-teal-950 to-stone-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-300 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-stone-300">Experiencias</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm px-3 py-1 rounded-full mb-4">
              Actividades con criterio
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Experiencias que sí merecen salir de casa
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
              Paint & wine, patinaje y planes locales con personalidad para parejas,
              amigos o grupos que buscan algo más que una cena cualquiera.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Tipos de experiencia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiposExperiencias.map((tipo) => (
              <Link
                key={tipo.href}
                href={tipo.href}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-100 hover:border-teal-200 hover:bg-teal-50/30 transition-colors group"
              >
                <span className="text-2xl shrink-0">{tipo.icon}</span>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">{tipo.label}</h3>
                  <p className="text-sm text-stone-500 mt-0.5">{tipo.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {lugares.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Artículos destacados</h2>
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
