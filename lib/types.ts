export type Pilar =
  | 'lugares-raros'
  | 'temporada'
  | 'experiencias'
  | 'familias'
  | 'vintage'
  | 'destinos'
  | 'colecciones'

export type Temporada = 'primavera' | 'verano' | 'otono' | 'invierno'

export interface EditorialSection {
  titulo: string
  parrafos: string[]
  puntos?: string[]
}

export interface EditorialEntry {
  titulo: string
  descripcion: string
}

export interface Lugar {
  slug: string
  titulo: string
  descripcion: string
  estado: string
  estadoSlug: string
  pilar: Pilar
  temporadas?: Temporada[]
  imagen: string
  imagenAlt: string
  destacado?: boolean
  tags: string[]
  extracto: string
  secciones?: EditorialSection[]
  antesDeIr?: string[]
  notaVerificacion?: string
}

export interface Coleccion {
  slug: string
  titulo: string
  descripcion: string
  imagen: string
  imagenAlt: string
  pilar: Pilar
  estado?: string
  estadoSlug?: string
  temporada?: Temporada
  lugares: string[] // slugs de Lugar
  extracto: string
  tags: string[]
  intro?: string[]
  criterios?: string[]
  entradas?: EditorialEntry[]
  secciones?: EditorialSection[]
  cierre?: string[]
  notaVerificacion?: string
}

export interface PaginaTemática {
  slug: string
  pilar: Pilar
  titulo: string
  subtitulo: string
  descripcion: string
  imagen: string
  imagenAlt: string
  intro: string
  colecciones: string[] // slugs
  lugares: string[] // slugs destacados
}

export interface Estado {
  nombre: string
  slug: string
  descripcion: string
  imagen: string
  highlights: string[]
}
