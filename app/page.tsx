import Link from 'next/link'
import CardLugar from '@/components/CardLugar'
import CardColeccion from '@/components/CardColeccion'
import CardEstado from '@/components/CardEstado'
import SectionHeader from '@/components/SectionHeader'
import { getColeccionesByPilar, getLugarHref, getLugaresByPilar } from '@/lib/utils'
import { estados } from '@/lib/data'

const pilaresNav = [
  {
    icon: '👻',
    label: 'Lugares raros',
    desc: 'Folklore, leyendas y sitios que no figuran en ninguna guía',
    href: '/lugares-raros',
    color: 'bg-purple-50 border-purple-100 hover:border-purple-300',
    iconBg: 'bg-purple-100',
  },
  {
    icon: '🍂',
    label: 'Temporadas',
    desc: 'Apple picking, invierno, camping y escapadas estacionales',
    href: '/temporada',
    color: 'bg-amber-50 border-amber-100 hover:border-amber-300',
    iconBg: 'bg-amber-100',
  },
  {
    icon: '🎨',
    label: 'Experiencias',
    desc: 'Paint & wine, patinaje y planes de pareja o grupo',
    href: '/experiencias',
    color: 'bg-teal-50 border-teal-100 hover:border-teal-300',
    iconBg: 'bg-teal-100',
  },
  {
    icon: '🧒',
    label: 'Con niños',
    desc: 'Centros de juego, cumpleaños y planes familiares',
    href: '/familias',
    color: 'bg-blue-50 border-blue-100 hover:border-blue-300',
    iconBg: 'bg-blue-100',
  },
  {
    icon: '🪡',
    label: 'Vintage & thrift',
    desc: 'Tiendas de segunda mano, mercados y hallazgos con historia',
    href: '/vintage',
    color: 'bg-rose-50 border-rose-100 hover:border-rose-300',
    iconBg: 'bg-rose-100',
  },
  {
    icon: '🗺️',
    label: 'Destinos',
    desc: 'Guías por estado con ángulo y criterio editorial',
    href: '/destinos',
    color: 'bg-orange-50 border-orange-100 hover:border-orange-300',
    iconBg: 'bg-orange-100',
  },
]

const temporadasNav = [
  { label: 'Otoño', icon: '🍁', href: '/temporada/otono' },
  { label: 'Invierno', icon: '❄️', href: '/temporada/invierno' },
  { label: 'Primavera', icon: '🌸', href: '/temporada/primavera' },
  { label: 'Verano', icon: '☀️', href: '/temporada/verano' },
  { label: 'Apple picking', icon: '🍎', href: '/temporada/apple-picking' },
  { label: 'Camping', icon: '⛺', href: '/temporada/camping' },
  { label: 'Mitos y leyendas', icon: '🌙', href: '/lugares-raros' },
]

export default function HomePage() {
  const lugaresRaros = getLugaresByPilar('lugares-raros').slice(0, 3)
  const lugaresVintage = getLugaresByPilar('vintage').slice(0, 3)
  const lugaresTemporada = getLugaresByPilar('temporada').slice(0, 3)
  const lugaresExperiencias = getLugaresByPilar('experiencias').slice(0, 2)
  const lugaresFamilias = getLugaresByPilar('familias').slice(0, 2)
  const coleccionesDestacadas = getColeccionesByPilar('temporada')
    .concat(getColeccionesByPilar('lugares-raros'))
    .slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative bg-stone-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900" />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400 via-amber-600 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 opacity-5 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-400 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-amber-400 text-sm font-medium">Guía editorial en español sobre USA</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Descubre planes curiosos,{' '}
              <span className="text-amber-400">lugares raros</span>{' '}
              y experiencias que sí merecen salir de casa.
            </h1>
            <p className="text-stone-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Una guía editorial en español sobre lo mejor y más peculiar de Estados Unidos.
              Sin directorios infinitos. Con criterio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/lugares-raros"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <span>👻</span>
                Explorar lugares raros
              </Link>
              <Link
                href="/temporada"
                className="inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <span>🍂</span>
                Planes estacionales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA DE NAVEGACIÓN RÁPIDA */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            {temporadasNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 shrink-0 px-3.5 py-2 text-sm text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-colors whitespace-nowrap"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* PILARES DE CONTENIDO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeader
          titulo="¿Qué quieres descubrir?"
          descripcion="Elige tu tipo de plan o experiencia"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pilaresNav.map((pilar) => (
            <Link
              key={pilar.href}
              href={pilar.href}
              className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-colors ${pilar.color}`}
            >
              <div className={`${pilar.iconBg} w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0`}>
                {pilar.icon}
              </div>
              <div>
                <h3 className="font-semibold text-stone-800 mb-0.5">{pilar.label}</h3>
                <p className="text-sm text-stone-500 leading-snug">{pilar.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LUGARES RAROS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 rounded-3xl p-6 sm:p-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400 to-transparent pointer-events-none" />
          <div className="flex items-end justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">👻 Lugares raros y folklore</h2>
              <p className="text-stone-400 mt-1 text-sm sm:text-base">Leyendas, misterios y sitios que no figuran en ninguna guía turística</p>
            </div>
            <Link href="/lugares-raros" className="shrink-0 text-sm font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
              Ver todos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lugaresRaros.map((lugar) => (
              <Link
                key={lugar.slug}
                href={getLugarHref(lugar)}
                className="card-editorial group block bg-stone-800/50 hover:bg-stone-800 border border-stone-700/50 hover:border-purple-500/30 rounded-2xl p-4 transition-all"
              >
                <div className="text-xs text-purple-400 font-medium mb-2">{lugar.estado}</div>
                <h3 className="font-semibold text-white leading-snug mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                  {lugar.titulo}
                </h3>
                <p className="text-sm text-stone-400 line-clamp-2">{lugar.extracto}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES ESTACIONALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <SectionHeader
          titulo="🍂 Planes estacionales"
          descripcion="Apple picking, otoño, invierno y escapadas que tienen su momento"
          verTodo={{ href: '/temporada' }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lugaresTemporada.map((lugar) => (
            <CardLugar key={lugar.slug} lugar={lugar} size="md" />
          ))}
        </div>
      </section>

      {/* COLECCIONES EDITORIALES */}
      {coleccionesDestacadas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <SectionHeader
            titulo="📖 Colecciones editoriales"
            descripcion="Guías curadas con criterio sobre experiencias y destinos"
            verTodo={{ href: '/colecciones' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coleccionesDestacadas.map((col) => (
              <CardColeccion key={col.slug} coleccion={col} />
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCIAS + CON NIÑOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <SectionHeader titulo="🎨 Experiencias" verTodo={{ href: '/experiencias' }} />
            <div className="flex flex-col gap-4">
              {lugaresExperiencias.map((lugar) => (
                <CardLugar key={lugar.slug} lugar={lugar} size="sm" />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader titulo="🧒 Con niños" verTodo={{ href: '/familias' }} />
            <div className="flex flex-col gap-4">
              {lugaresFamilias.map((lugar) => (
                <CardLugar key={lugar.slug} lugar={lugar} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VINTAGE & THRIFT */}
      <section className="bg-rose-50/50 border-y border-rose-100/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            titulo="🪡 Vintage & thrift"
            descripcion="Tiendas de segunda mano y hallazgos con historia en USA"
            verTodo={{ href: '/vintage' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lugaresVintage.map((lugar) => (
              <CardLugar key={lugar.slug} lugar={lugar} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* DESTINOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeader
          titulo="🗺️ Destinos"
          descripcion="Estados con contenido editorial propio, no plantillas vacías"
          verTodo={{ href: '/destinos' }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {estados.slice(0, 8).map((estado) => (
            <CardEstado key={estado.slug} estado={estado} />
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-stone-950 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6">
          <div className="text-4xl mb-4">🧭</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Una web para descubrir, no para buscar en listas
          </h2>
          <p className="text-stone-400 text-lg mb-8">
            Lugares raros, escapadas con criterio y experiencias que sí merecen el viaje.
            Todo en español, todo sobre Estados Unidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/colecciones"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Ver colecciones editoriales
            </Link>
            <Link
              href="/sobre-nosotros"
              className="inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Sobre el proyecto
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
