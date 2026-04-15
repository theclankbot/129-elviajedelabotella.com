import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CardLugar from '@/components/CardLugar'
import LugarArticleBody from '@/components/LugarArticleBody'
import { getLugarBySlug, getLugaresByPilar, pilarLabel } from '@/lib/utils'
import { lugares } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return lugares
    .filter((l) => l.pilar === 'lugares-raros')
    .map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lugar = getLugarBySlug(slug)
  if (!lugar) return {}
  return {
    title: lugar.titulo,
    description: lugar.descripcion,
  }
}

export default async function LugarRaroPage({ params }: Props) {
  const { slug } = await params
  const lugar = getLugarBySlug(slug)
  if (!lugar) notFound()

  const relacionados = getLugaresByPilar(lugar.pilar)
    .filter((l) => l.slug !== slug)
    .slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="bg-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-stone-950 to-stone-900" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-6">
            <Link href="/" className="hover:text-stone-300 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/lugares-raros" className="hover:text-stone-300 transition-colors">Lugares raros</Link>
            <span>/</span>
            <span className="text-stone-400 truncate max-w-[180px]">{lugar.titulo}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full">
              {pilarLabel(lugar.pilar)}
            </span>
            <span className="bg-stone-700/50 text-stone-300 text-xs px-3 py-1 rounded-full">
              {lugar.estado}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {lugar.titulo}
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl">
            {lugar.descripcion}
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <LugarArticleBody lugar={lugar} infoBoxClassName="bg-purple-50 border-purple-100" />

      {/* RELACIONADOS */}
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
