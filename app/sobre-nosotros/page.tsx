import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre nosotros — El Viaje de la Botella',
  description:
    'Qué es El Viaje de la Botella: una guía editorial en español sobre lugares raros, planes curiosos y experiencias locales en Estados Unidos.',
}

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-stone-700 transition-colors">Inicio</Link>
        <span>/</span>
        <span>Sobre nosotros</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
        Sobre El Viaje de la Botella
      </h1>

      <div className="prose prose-stone max-w-none space-y-6 text-stone-600 leading-relaxed">
        <p className="text-lg">
          <strong>El Viaje de la Botella</strong> es una guía editorial en español para descubrir
          planes curiosos, lugares raros y experiencias locales en Estados Unidos.
        </p>

        <p>
          No somos un directorio. No intentamos tener todo. Intentamos tener lo que merece la pena.
        </p>

        <h2 className="text-xl font-bold text-stone-800 mt-8 mb-3">Por qué existe esta web</h2>
        <p>
          Hay millones de recursos sobre qué hacer en Estados Unidos. La mayoría en inglés.
          La mayoría enfocados en los grandes destinos turísticos. La mayoría sin criterio editorial real.
        </p>
        <p>
          Nosotros queremos algo diferente: una guía en español que ayude a planear
          salidas y escapadas reales, con selección, contexto y personalidad.
          No un Yelp traducido. No un listado de negocios sin alma.
          Una publicación de descubrimiento local.
        </p>

        <h2 className="text-xl font-bold text-stone-800 mt-8 mb-3">Qué cubrimos</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Lugares raros, folklore y leyendas urbanas por estado</li>
          <li>Planes estacionales: apple picking, pumpkin patches, invierno, camping</li>
          <li>Experiencias locales: paint & wine, patinaje, planes originales</li>
          <li>Planes con niños: centros de juego, cumpleaños, aventuras familiares</li>
          <li>Vintage y thrift: tiendas de segunda mano y mercados con carácter</li>
          <li>Guías por destino con ángulo editorial, no plantillas vacías</li>
        </ul>

        <h2 className="text-xl font-bold text-stone-800 mt-8 mb-3">Qué no cubrimos</h2>
        <p>
          No listamos ferreterías, dentistas, tiendas de mascotas genéricas ni restaurantes sin ángulo.
          No hacemos cientos de páginas vacías por estado. No publicamos sin criterio.
        </p>

        <h2 className="text-xl font-bold text-stone-800 mt-8 mb-3">Criterio editorial</h2>
        <p>
          Cada publicación pasa por un criterio: ¿tiene algo propio que contar?
          ¿Aporta valor a quien busca planear una salida diferente?
          ¿Se diferencia de lo que ya hay? Si la respuesta es sí, lo publicamos.
          Si no, no.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-stone-800 mb-2">¿Quieres colaborar o tienes sugerencias?</h3>
          <p className="text-stone-600 mb-3">
            Si conoces un lugar raro, una tienda thrift que merece atención o un plan que no está en ninguna guía, escríbenos.
          </p>
          <Link href="/contacto" className="text-amber-600 hover:text-amber-700 font-medium">
            Contactar →
          </Link>
        </div>
      </div>
    </div>
  )
}
