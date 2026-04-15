import Link from 'next/link'

interface Props {
  titulo: string
  descripcion?: string
  verTodo?: { href: string; label?: string }
}

export default function SectionHeader({ titulo, descripcion, verTodo }: Props) {
  return (
    <div className="flex items-end justify-between mb-6 gap-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 tracking-tight">{titulo}</h2>
        {descripcion && <p className="text-stone-500 mt-1 text-sm sm:text-base">{descripcion}</p>}
      </div>
      {verTodo && (
        <Link
          href={verTodo.href}
          className="shrink-0 text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
        >
          {verTodo.label ?? 'Ver todo'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      )}
    </div>
  )
}
