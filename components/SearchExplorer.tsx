'use client'

import Link from 'next/link'
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
  type FormEvent,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CardColeccion from '@/components/CardColeccion'
import CardEstado from '@/components/CardEstado'
import CardLugar from '@/components/CardLugar'
import { colecciones, estados, lugares } from '@/lib/data'

const quickSearches = [
  'apple picking Virginia',
  'leyendas urbanas Ohio',
  'thrift stores Delaware',
  'paint and wine Nueva York',
  'cumpleanos ninos Ohio',
  'invierno Michigan',
]

const sectionLinks = [
  { label: 'Lugares raros', href: '/lugares-raros' },
  { label: 'Temporadas', href: '/temporada' },
  { label: 'Experiencias', href: '/experiencias' },
  { label: 'Con ninos', href: '/familias' },
  { label: 'Vintage', href: '/vintage' },
  { label: 'Destinos', href: '/destinos' },
]

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

function getTerms(value: string) {
  return normalizeText(value)
    .split(/\s+/)
    .filter(Boolean)
}

function scoreMatch(
  terms: string[],
  fullQuery: string,
  fields: { primary: string[]; secondary?: string[] }
) {
  if (terms.length === 0) {
    return 0
  }

  const primary = fields.primary.map(normalizeText)
  const secondary = (fields.secondary ?? []).map(normalizeText)
  const searchable = primary.concat(secondary).join(' ')

  if (!terms.every((term) => searchable.includes(term))) {
    return 0
  }

  let score = 0

  for (const field of primary) {
    if (field.includes(fullQuery)) score += 8
  }

  for (const field of secondary) {
    if (field.includes(fullQuery)) score += 4
  }

  for (const term of terms) {
    if (primary.some((field) => field.includes(term))) score += 3
    if (secondary.some((field) => field.includes(term))) score += 1
  }

  return score
}

export default function SearchExplorer() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const normalizedQuery = normalizeText(deferredQuery)
  const terms = getTerms(deferredQuery)
  const hasQuery = terms.length > 0

  const featured = lugares.filter((item) => item.destacado).slice(0, 6)

  const placeResults = hasQuery
    ? lugares
        .map((item) => ({
          item,
          score: scoreMatch(terms, normalizedQuery, {
            primary: [item.titulo, item.extracto, item.estado],
            secondary: [item.descripcion, ...item.tags],
          }),
        }))
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((result) => result.item)
    : []

  const collectionResults = hasQuery
    ? colecciones
        .map((item) => ({
          item,
          score: scoreMatch(terms, normalizedQuery, {
            primary: [item.titulo, item.extracto, item.estado ?? ''],
            secondary: [item.descripcion, ...item.tags],
          }),
        }))
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((result) => result.item)
    : []

  const stateResults = hasQuery
    ? estados
        .map((item) => ({
          item,
          score: scoreMatch(terms, normalizedQuery, {
            primary: [item.nombre],
            secondary: [item.descripcion, ...item.highlights],
          }),
        }))
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((result) => result.item)
    : []

  const totalResults =
    placeResults.length + collectionResults.length + stateResults.length

  function updateUrl(nextQuery: string) {
    const params = new URLSearchParams(searchParams.toString())
    const trimmed = nextQuery.trim()

    if (trimmed) {
      params.set('q', trimmed)
    } else {
      params.delete('q')
    }

    const nextUrl = params.toString() ? `${pathname}?${params}` : pathname

    startTransition(() => {
      router.replace(nextUrl, { scroll: false })
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateUrl(query)
  }

  function applyQuickSearch(nextQuery: string) {
    setQuery(nextQuery)
    updateUrl(nextQuery)
  }

  return (
    <>
      <section className="bg-stone-950 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Que quieres descubrir?
          </h1>
          <p className="mb-8 text-stone-400">
            Busca por destino, tipo de experiencia, temporada o actividad
          </p>

          <form onSubmit={handleSubmit} className="relative">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ej: apple picking Virginia, leyendas urbanas Ohio, thrift stores..."
              className="w-full rounded-2xl border border-stone-700 bg-stone-800 px-5 py-4 pr-14 text-base text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-amber-500 p-2.5 text-stone-950 transition-colors hover:bg-amber-400"
              aria-label="Buscar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-stone-700">Busquedas populares</h2>
            {hasQuery && (
              <button
                type="button"
                onClick={() => applyQuickSearch('')}
                className="text-sm font-medium text-amber-700 hover:text-amber-800"
              >
                Limpiar busqueda
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {quickSearches.map((quickSearch) => (
              <button
                key={quickSearch}
                type="button"
                onClick={() => applyQuickSearch(quickSearch)}
                className="rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-sm text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700"
              >
                {quickSearch}
              </button>
            ))}
          </div>
        </section>

        {hasQuery ? (
          <>
            <section className="mb-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-1 text-sm font-medium text-amber-700">Resultados</p>
                  <h2 className="text-2xl font-bold text-stone-800">
                    {totalResults > 0
                      ? `${totalResults} resultados para "${query.trim()}"`
                      : `Sin resultados para "${query.trim()}"`}
                  </h2>
                </div>
                <p className="max-w-xl text-sm text-stone-500">
                  Buscamos en articulos, colecciones editoriales y destinos con contenido real.
                </p>
              </div>
            </section>

            {totalResults === 0 ? (
              <section className="rounded-3xl border border-stone-200 bg-stone-50 p-8 text-center sm:p-10">
                <h3 className="mb-2 text-xl font-semibold text-stone-800">
                  No hemos encontrado una coincidencia clara
                </h3>
                <p className="mx-auto mb-6 max-w-2xl text-stone-500">
                  Prueba con un estado, una actividad o una temporada. Por ejemplo:
                  &quot;Ohio&quot;, &quot;apple picking&quot;, &quot;thrift&quot; o
                  &quot;invierno&quot;.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {quickSearches.slice(0, 4).map((quickSearch) => (
                    <button
                      key={quickSearch}
                      type="button"
                      onClick={() => applyQuickSearch(quickSearch)}
                      className="rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-sm text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700"
                    >
                      {quickSearch}
                    </button>
                  ))}
                </div>
              </section>
            ) : (
              <div className="space-y-12">
                {placeResults.length > 0 && (
                  <section>
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-bold text-stone-800">Articulos y guias</h3>
                      <span className="text-sm text-stone-500">{placeResults.length} encontrados</span>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {placeResults.map((item) => (
                        <CardLugar key={item.slug} lugar={item} size="md" />
                      ))}
                    </div>
                  </section>
                )}

                {collectionResults.length > 0 && (
                  <section>
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-bold text-stone-800">Colecciones editoriales</h3>
                      <span className="text-sm text-stone-500">
                        {collectionResults.length} encontradas
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {collectionResults.map((item) => (
                        <CardColeccion key={item.slug} coleccion={item} />
                      ))}
                    </div>
                  </section>
                )}

                {stateResults.length > 0 && (
                  <section>
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-bold text-stone-800">Destinos</h3>
                      <span className="text-sm text-stone-500">{stateResults.length} encontrados</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {stateResults.map((item) => (
                        <CardEstado key={item.slug} estado={item} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-stone-800">Contenido destacado</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((item) => (
                  <CardLugar key={item.slug} lugar={item} size="md" />
                ))}
              </div>
            </section>

            <section className="border-t border-stone-100 pt-10">
              <h2 className="mb-6 text-2xl font-bold text-stone-800">Explorar por seccion</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {sectionLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center gap-2 rounded-xl border border-stone-100 bg-white p-4 text-center transition-colors hover:border-amber-200 hover:bg-amber-50/30"
                  >
                    <span className="text-xs font-medium text-stone-600">{item.label}</span>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  )
}
