import type { Metadata } from 'next'
import Link from 'next/link'
import CardLugar from '@/components/CardLugar'
import CardColeccion from '@/components/CardColeccion'
import { getColeccionesByPilar, getEstadoBySlug, getLugaresByPilar } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Lugares raros, folklore y leyendas urbanas en USA',
  description:
    'Mitos, leyendas urbanas, sitios extraños y folklore local por estado. La guía en español de los lugares más peculiares de Estados Unidos.',
}

export default function LugaresRarosPage() {
  const lugares = getLugaresByPilar('lugares-raros')
  const colecciones = getColeccionesByPilar('lugares-raros')
  const estadosConLeyendas = lugares
    .map((lugar) => {
      const estado = getEstadoBySlug(lugar.estadoSlug)
      if (!estado) return null

      return {
        estado: lugar.estado,
        slug: lugar.estadoSlug,
        desc: lugar.extracto,
      }
    })
    .filter((item): item is { estado: string; slug: string; desc: string } => Boolean(item))
    .filter((item, index, array) => array.findIndex((candidate) => candidate.slug === item.slug) === index)

  return (
    <>
      {/* HERO */}
      <section className="bg-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-stone-950 to-stone-900" />
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-stone-300">Lugares raros</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm px-3 py-1 rounded-full mb-4">
              Folklore & misterio
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Lugares raros, leyendas y folklore en USA
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
              Cada estado tiene sus propias historias. Criaturas, casas embrujadas, mitos con siglos de antigüedad y lugares que
              no figuran en ninguna guía turística. Esto es el lado oscuro y curioso de Estados Unidos.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Intro editorial */}
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-10">
          <h2 className="font-bold text-stone-800 text-lg mb-2">Por qué este contenido importa</h2>
          <p className="text-stone-600 leading-relaxed">
            El folklore local es una de las formas más auténticas de conocer un lugar. No hablamos de atracciones turísticas diseñadas
            para asustarte. Hablamos de las historias que las comunidades llevan generaciones contando: criaturas de los bosques,
            sitios marcados por tragedias, leyendas que explican la identidad de cada región.
          </p>
        </div>

        {/* Artículos */}
        {lugares.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Artículos recientes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lugares.map((lugar) => (
                <CardLugar key={lugar.slug} lugar={lugar} size="md" />
              ))}
            </div>
          </section>
        )}

        {/* Colecciones */}
        {colecciones.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Colecciones</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {colecciones.map((col) => (
                <CardColeccion key={col.slug} coleccion={col} />
              ))}
            </div>
          </section>
        )}

        {/* Por estado */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Folklore por estado</h2>
          <p className="text-stone-500 mb-6">Explora las leyendas y misterios de cada estado</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {estadosConLeyendas.map((item) => (
              <Link
                key={item.slug}
                href={`/destinos/${item.slug}`}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-100 hover:border-purple-200 hover:bg-purple-50/30 transition-colors group"
              >
                <span className="text-2xl shrink-0">🌙</span>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-purple-700 transition-colors">{item.estado}</h3>
                  <p className="text-sm text-stone-500 mt-0.5">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
