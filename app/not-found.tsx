import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">🧭</div>
        <h1 className="text-3xl font-bold text-stone-800 mb-3">Página no encontrada</h1>
        <p className="text-stone-500 text-lg mb-8 leading-relaxed">
          Parece que esta página se ha perdido en el camino.
          Vuelve al inicio a descubrir planes y lugares curiosos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            href="/lugares-raros"
            className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            👻 Lugares raros
          </Link>
        </div>
      </div>
    </div>
  )
}
