import Link from 'next/link'
import { Lugar } from '@/lib/types'
import { getLugarHref, pilarLabel } from '@/lib/utils'

interface Props {
  lugar: Lugar
  size?: 'sm' | 'md' | 'lg'
}

const pilarColors: Record<string, string> = {
  'lugares-raros': 'bg-purple-900/80 text-purple-200',
  temporada: 'bg-amber-900/80 text-amber-200',
  experiencias: 'bg-teal-900/80 text-teal-200',
  familias: 'bg-blue-900/80 text-blue-200',
  vintage: 'bg-rose-900/80 text-rose-200',
  destinos: 'bg-orange-900/80 text-orange-200',
  colecciones: 'bg-stone-800/80 text-stone-200',
}

export default function CardLugar({ lugar, size = 'md' }: Props) {
  const href = getLugarHref(lugar)

  if (size === 'lg') {
    return (
      <Link href={href} className="card-editorial group block relative overflow-hidden rounded-2xl bg-stone-900 aspect-[4/3] sm:aspect-[16/9]">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-900">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400 to-transparent" />
        </div>
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${pilarColors[lugar.pilar] ?? 'bg-stone-800 text-stone-200'}`}>
            {pilarLabel(lugar.pilar)}
          </span>
          <h3 className="text-white text-xl sm:text-2xl font-bold leading-tight mb-2 group-hover:text-amber-300 transition-colors">
            {lugar.titulo}
          </h3>
          <p className="text-stone-300 text-sm line-clamp-2">{lugar.extracto}</p>
          <div className="mt-3 text-amber-400 text-sm font-medium flex items-center gap-1">
            <span>{lugar.estado}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    )
  }

  if (size === 'sm') {
    return (
      <Link href={href} className="card-editorial group flex gap-3 p-3 rounded-xl bg-white border border-stone-100 hover:border-amber-200">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-stone-200 to-stone-300 shrink-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-stone-200" />
        </div>
        <div className="min-w-0">
          <span className="text-xs text-amber-600 font-medium">{lugar.estado}</span>
          <h4 className="text-sm font-semibold text-stone-800 line-clamp-2 leading-tight group-hover:text-amber-700 transition-colors">
            {lugar.titulo}
          </h4>
        </div>
      </Link>
    )
  }

  // md (default)
  return (
    <Link href={href} className="card-editorial group block rounded-2xl overflow-hidden bg-white border border-stone-100 hover:border-amber-200">
      <div className="aspect-[16/10] bg-gradient-to-br from-stone-200 to-stone-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-stone-300" />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${pilarColors[lugar.pilar] ?? 'bg-stone-800 text-stone-200'}`}>
          {pilarLabel(lugar.pilar)}
        </span>
      </div>
      <div className="p-4">
        <div className="text-xs text-amber-600 font-medium mb-1">{lugar.estado}</div>
        <h3 className="font-semibold text-stone-800 leading-snug mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {lugar.titulo}
        </h3>
        <p className="text-sm text-stone-500 line-clamp-2">{lugar.extracto}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {lugar.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
