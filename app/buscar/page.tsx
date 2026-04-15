import type { Metadata } from 'next'
import { Suspense } from 'react'
import SearchExplorer from '@/components/SearchExplorer'

export const metadata: Metadata = {
  title: 'Buscar - El Viaje de la Botella',
  description: 'Busca planes, lugares raros, experiencias y escapadas en Estados Unidos.',
}

export default function BuscarPage() {
  return (
    <Suspense fallback={null}>
      <SearchExplorer />
    </Suspense>
  )
}
