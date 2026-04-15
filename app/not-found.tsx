import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Página no encontrada | El Viaje de la Botella',
  description: 'La página que buscas no está disponible en El Viaje de la Botella.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center gap-6 px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">404</p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
        Esta ruta ya no está disponible.
      </h1>
      <p className="max-w-2xl text-lg text-stone-600">
        Puede que el plan, la colección o el destino que buscabas se haya movido o que el enlace esté incompleto.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-700">
          Volver al inicio
        </Link>
        <Link href="/destinos" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-500 hover:bg-stone-100">
          Explorar destinos
        </Link>
      </div>
    </main>
  )
}
