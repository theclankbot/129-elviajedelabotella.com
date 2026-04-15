import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CardLugar from '@/components/CardLugar'
import LugarArticleBody from '@/components/LugarArticleBody'
import { getLugarBySlug, getLugaresByPilar, getLugaresByTemporada, temporadaLabel } from '@/lib/utils'
import { lugares } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

const temporadaInfo: Record<string, { titulo: string; descripcion: string; icon: string }> = {
  otono: {
    titulo: 'Planes de otoño en USA',
    descripcion: 'Apple picking, pumpkin patches, colores en las montañas y festivales de cosecha en Estados Unidos.',
    icon: '🍁',
  },
  invierno: {
    titulo: 'Planes de invierno en USA',
    descripcion: 'Esquí, festivales de hielo, ciudades iluminadas y escapadas que convierten el frío en una ventaja.',
    icon: '❄️',
  },
  primavera: {
    titulo: 'Planes de primavera en USA',
    descripcion: 'Senderismo, festivales de flores, granjas activas y naturaleza que despierta en todo el país.',
    icon: '🌸',
  },
  verano: {
    titulo: 'Planes de verano en USA',
    descripcion: 'Playas, camping, festivales al aire libre y la naturaleza de Estados Unidos en su mejor momento.',
    icon: '☀️',
  },
  'apple-picking': {
    titulo: 'Apple picking en USA: los mejores huertos',
    descripcion: 'Guía completa de apple picking por estado. Los mejores huertos de manzanas en Virginia, Wisconsin, Kentucky y más.',
    icon: '🍎',
  },
  'pumpkin-picking': {
    titulo: 'Pumpkin picking en USA: campos de calabazas',
    descripcion: 'Los mejores campos de calabazas y festivales de Halloween por estado. Guía de pumpkin picking en otoño.',
    icon: '🎃',
  },
  camping: {
    titulo: 'Camping en USA: parques y campamentos',
    descripcion: 'Los mejores lugares para acampar en Estados Unidos por estado. Parques estatales, campamentos y naturaleza.',
    icon: '⛺',
  },
  'ano-nuevo': {
    titulo: 'Planes de Año Nuevo en USA',
    descripcion: 'Escapadas, luces, celebraciones urbanas y planes especiales para despedir el año en Estados Unidos.',
    icon: '🎆',
  },
}

function getTemporadaResults(slug: string) {
  const temporadaKey =
    slug === 'apple-picking' || slug === 'pumpkin-picking' || slug === 'camping'
      ? null
      : slug

  return temporadaKey
    ? getLugaresByTemporada(temporadaKey)
    : getLugaresByPilar('temporada').filter((l) =>
        l.tags.some((t) => t.toLowerCase().includes(slug.replace('-', ' ')))
      )
}

export async function generateStaticParams() {
  const slugsTemporada = ['otono', 'invierno', 'primavera', 'verano', 'apple-picking', 'pumpkin-picking', 'camping', 'ano-nuevo']
  const slugsLugares = lugares
    .filter((l) => l.pilar === 'temporada')
    .map((l) => ({ slug: l.slug }))
  return [...slugsTemporada.map((s) => ({ slug: s })), ...slugsLugares]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (temporadaInfo[slug]) {
    const lugaresResultado = getTemporadaResults(slug)
    return {
      title: temporadaInfo[slug].titulo,
      description: temporadaInfo[slug].descripcion,
      robots: lugaresResultado.length > 0 ? undefined : { index: false, follow: true },
    }
  }
  const lugar = getLugarBySlug(slug)
  if (lugar) return { title: lugar.titulo, description: lugar.descripcion }
  return {}
}

export default async function TemporadaSlugPage({ params }: Props) {
  const { slug } = await params

  // Si es una temporada conocida
  if (temporadaInfo[slug]) {
    const info = temporadaInfo[slug]
    const lugaresResultado = getTemporadaResults(slug)

    return (
      <>
        <section className="bg-gradient-to-br from-amber-950 to-stone-950 relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
              <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/temporada" className="hover:text-stone-300 transition-colors">Temporadas</Link>
              <span>/</span>
              <span className="text-stone-300">{info.icon} {temporadaLabel(slug) || slug}</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              {info.icon} {info.titulo}
            </h1>
            <p className="text-stone-400 text-lg max-w-2xl leading-relaxed">{info.descripcion}</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {lugaresResultado.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lugaresResultado.map((lugar) => (
                <CardLugar key={lugar.slug} lugar={lugar} size="md" />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">{info.icon}</div>
              <h2 className="text-xl font-semibold text-stone-700 mb-2">Contenido en camino</h2>
              <p className="text-stone-500">Estamos preparando la guía de {info.titulo.toLowerCase()}. Vuelve pronto.</p>
              <Link href="/temporada" className="mt-6 inline-flex text-amber-600 hover:text-amber-700 font-medium">
                ← Ver todos los planes estacionales
              </Link>
            </div>
          )}
        </div>
      </>
    )
  }

  // Si es un slug de lugar individual
  const lugar = getLugarBySlug(slug)
  if (!lugar) notFound()

  const relacionados = getLugaresByPilar(lugar.pilar)
    .filter((l) => l.slug !== slug)
    .slice(0, 3)

  return (
    <>
      <section className="bg-gradient-to-br from-amber-950 to-stone-950 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/temporada" className="hover:text-stone-300 transition-colors">Temporadas</Link>
            <span>/</span>
            <span className="text-stone-400 truncate max-w-[180px]">{lugar.titulo}</span>
          </nav>
          <span className="inline-block bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full mb-4">
            {lugar.estado}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {lugar.titulo}
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">{lugar.descripcion}</p>
        </div>
      </section>

      <LugarArticleBody lugar={lugar} infoBoxClassName="bg-amber-50 border-amber-100" />

      {relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="border-t border-stone-100 pt-10">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">También puede interesarte</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relacionados.map((l) => (
                <CardLugar key={l.slug} lugar={l} size="md" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
