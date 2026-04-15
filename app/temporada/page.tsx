import type { Metadata } from 'next'
import Link from 'next/link'
import CardLugar from '@/components/CardLugar'
import { getLugaresByPilar } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Planes estacionales en USA — Apple picking, otoño, invierno y más',
  description:
    'Guía de planes y escapadas por temporada en Estados Unidos. Apple picking en otoño, actividades de invierno, camping de verano y más.',
}

const temporadasItems = [
  {
    slug: 'otono',
    label: 'Otoño',
    icon: '🍁',
    desc: 'Apple picking, pumpkin patches, colores en las montañas y festivales de cosecha',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    slug: 'invierno',
    label: 'Invierno',
    icon: '❄️',
    desc: 'Esquí, festivales de hielo, ciudades con luces y escapadas de temporada fría',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    slug: 'primavera',
    label: 'Primavera',
    icon: '🌸',
    desc: 'Senderismo, festivales de flores, granjas y naturaleza que despierta',
    color: 'bg-green-50 border-green-200',
  },
  {
    slug: 'verano',
    label: 'Verano',
    icon: '☀️',
    desc: 'Playas, camping, festivales al aire libre y naturaleza en su mejor momento',
    color: 'bg-yellow-50 border-yellow-200',
  },
]

const planesEspeciales = [
  { label: 'Apple picking', icon: '🍎', href: '/temporada/apple-picking', desc: 'Los mejores huertos de manzanas por estado' },
  { label: 'Camping', icon: '⛺', href: '/temporada/camping', desc: 'Parques estatales y campamentos que merecen el viaje' },
]

export default function TemporadaPage() {
  const lugaresTemporada = getLugaresByPilar('temporada')

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-amber-950 to-stone-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-300 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-stone-300">Temporadas</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm px-3 py-1 rounded-full mb-4">
              Planes estacionales
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Planes y escapadas por temporada en USA
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
              Apple picking en otoño, festivales de invierno, senderismo de primavera, camping de verano.
              Cada época del año tiene sus mejores planes en Estados Unidos.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Temporadas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Por temporada</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {temporadasItems.map((t) => (
              <Link
                key={t.slug}
                href={`/temporada/${t.slug}`}
                className={`block p-5 rounded-2xl border-2 transition-all hover:shadow-md ${t.color} group`}
              >
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-bold text-stone-800 text-lg mb-1 group-hover:text-amber-700 transition-colors">
                  {t.label}
                </h3>
                <p className="text-sm text-stone-500 leading-snug">{t.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Planes especiales */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Planes especiales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {planesEspeciales.map((plan) => (
              <Link
                key={plan.href}
                href={plan.href}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-100 hover:border-amber-200 hover:bg-amber-50/30 transition-colors group"
              >
                <span className="text-2xl shrink-0">{plan.icon}</span>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors">{plan.label}</h3>
                  <p className="text-sm text-stone-500 mt-0.5">{plan.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Artículos */}
        {lugaresTemporada.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Artículos y guías</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lugaresTemporada.map((lugar) => (
                <CardLugar key={lugar.slug} lugar={lugar} size="md" />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
