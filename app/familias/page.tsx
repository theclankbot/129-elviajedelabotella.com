import type { Metadata } from 'next'
import Link from 'next/link'
import CardLugar from '@/components/CardLugar'
import { getLugaresByPilar } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Planes con niños en USA — Centros de juego, cumpleaños y familias',
  description:
    'Guía de planes familiares en Estados Unidos: centros de juego, lugares para cumpleaños infantiles, actividades con niños y escapadas en familia.',
}

const tiposFamilia = [
  { icon: '🎮', label: 'Centros de juego', desc: 'Los mejores parques de juego para niños por estado', href: '/familias/centros-de-juego' },
  { icon: '🎂', label: 'Cumpleaños', desc: 'Lugares para fiestas de cumpleaños infantiles', href: '/familias/cumpleanos' },
]

export default function FamiliasPage() {
  const lugares = getLugaresByPilar('familias')

  return (
    <>
      <section className="bg-gradient-to-br from-blue-950 to-stone-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-300 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-stone-300">Con niños</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm px-3 py-1 rounded-full mb-4">
              Planes familiares
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Planes con niños que no son los de siempre
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
              Centros de juego originales, los mejores lugares para cumpleaños infantiles,
              aventuras en familia y actividades que tanto padres como hijos recuerdan.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Por tipo de plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiposFamilia.map((tipo) => (
              <Link
                key={tipo.href}
                href={tipo.href}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group"
              >
                <span className="text-2xl shrink-0">{tipo.icon}</span>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-blue-700 transition-colors">{tipo.label}</h3>
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
