import Link from 'next/link'
import { Estado } from '@/lib/types'

interface Props {
  estado: Estado
}

export default function CardEstado({ estado }: Props) {
  return (
    <Link
      href={`/destinos/${estado.slug}`}
      className="card-editorial group block rounded-2xl overflow-hidden bg-white border border-stone-100 hover:border-amber-200 p-4"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-bold text-stone-800 text-base group-hover:text-amber-700 transition-colors">
          {estado.nombre}
        </h3>
        <svg
          className="w-5 h-5 text-stone-300 group-hover:text-amber-500 shrink-0 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
      <p className="text-sm text-stone-500 mb-3 line-clamp-2">{estado.descripcion}</p>
      <div className="flex flex-wrap gap-1.5">
        {estado.highlights.map((h) => (
          <span key={h} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">
            {h}
          </span>
        ))}
      </div>
    </Link>
  )
}
