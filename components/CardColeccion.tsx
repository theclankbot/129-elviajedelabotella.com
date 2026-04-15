import Link from 'next/link'
import { Coleccion } from '@/lib/types'

interface Props {
  coleccion: Coleccion
}

export default function CardColeccion({ coleccion }: Props) {
  const href = `/colecciones/${coleccion.slug}`

  return (
    <Link href={href} className="card-editorial group block rounded-2xl overflow-hidden bg-white border border-stone-100 hover:border-amber-200">
      <div className="aspect-[16/9] bg-gradient-to-br from-stone-800 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-stone-900" />
        <div className="absolute inset-0 flex items-end p-4">
          {coleccion.estado && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 backdrop-blur-sm">
              {coleccion.estado}
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-stone-800 leading-snug mb-2 group-hover:text-amber-700 transition-colors">
          {coleccion.titulo}
        </h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-3">{coleccion.extracto}</p>
        <div className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
          <span>Ver colección</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
