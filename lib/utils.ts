import { Lugar, Coleccion, Estado } from '@/lib/types'
import { lugares } from '@/lib/data/lugares'
import { colecciones } from '@/lib/data/colecciones'
import { estados } from '@/lib/data/estados'

export function getLugaresByPilar(pilar: string): Lugar[] {
  return lugares.filter((l) => l.pilar === pilar)
}

export function getLugaresByEstado(estadoSlug: string): Lugar[] {
  return lugares.filter((l) => l.estadoSlug === estadoSlug)
}

export function getLugaresByTemporada(temporada: string): Lugar[] {
  return lugares.filter((l) => l.temporadas?.includes(temporada as never))
}

export function getLugarBySlug(slug: string): Lugar | undefined {
  return lugares.find((l) => l.slug === slug)
}

export function getLugarHref(lugar: Lugar): string {
  if (lugar.pilar === 'destinos') {
    return `/destinos/${lugar.estadoSlug}/${lugar.slug}`
  }

  return `/${lugar.pilar}/${lugar.slug}`
}

export function getColeccionesByPilar(pilar: string): Coleccion[] {
  return colecciones.filter((c) => c.pilar === pilar)
}

export function getColeccionBySlug(slug: string): Coleccion | undefined {
  return colecciones.find((c) => c.slug === slug)
}

export function getEstadoBySlug(estadoSlug: string): Estado | undefined {
  return estados.find((estado) => estado.slug === estadoSlug)
}

export function getLugaresDestacados(): Lugar[] {
  return lugares.filter((l) => l.destacado)
}

export function pilarLabel(pilar: string): string {
  const labels: Record<string, string> = {
    'lugares-raros': 'Lugares Raros',
    temporada: 'Temporadas',
    experiencias: 'Experiencias',
    familias: 'Con Niños',
    vintage: 'Vintage & Thrift',
    destinos: 'Destinos',
    colecciones: 'Colecciones',
  }
  return labels[pilar] ?? pilar
}

export function temporadaLabel(temporada: string): string {
  const labels: Record<string, string> = {
    primavera: 'Primavera',
    verano: 'Verano',
    otono: 'Otoño',
    invierno: 'Invierno',
    'apple-picking': 'Apple picking',
    'pumpkin-picking': 'Pumpkin picking',
    camping: 'Camping',
    'ano-nuevo': 'Año Nuevo',
  }
  return labels[temporada] ?? temporada
}
