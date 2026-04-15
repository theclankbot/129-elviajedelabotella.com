import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fuentes de datos y criterios editoriales — El Viaje de la Botella',
  description:
    'Cómo seleccionamos los lugares y actividades. Criterios editoriales, fuentes de información y límites de actualización.',
}

export default function FuentesDatosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-stone-700 transition-colors">Inicio</Link>
        <span>/</span>
        <span>Fuentes de datos</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
        Fuentes de datos y criterios editoriales
      </h1>

      <div className="space-y-8 text-stone-600 leading-relaxed">
        <p className="text-lg">
          Transparencia total sobre cómo trabajamos: qué fuentes usamos, cómo seleccionamos
          el contenido y cuáles son los límites de lo que publicamos.
        </p>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">Cómo seleccionamos lugares y actividades</h2>
          <p className="mb-3">
            No publicamos todo lo que existe. Aplicamos un filtro editorial que prioriza:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Lugares con ángulo diferencial: historia, rareza, valor cultural o experiencial</li>
            <li>Actividades que generan planes reales y memorables</li>
            <li>Sitios que se diferencian de la oferta turística genérica</li>
            <li>Experiencias que merecen el desvío</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">Fuentes de información</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Sitios web oficiales de los lugares (cuando existen)</li>
            <li>Webs de turismo estatales y municipales de Estados Unidos</li>
            <li>Mapas públicos: Google Maps, OpenStreetMap</li>
            <li>Fuentes históricas y culturales públicas (bibliotecas, archivos estatales)</li>
            <li>Medios locales de referencia en cada estado</li>
            <li>Datos de búsqueda pública (Google Search Console, Bing) para identificar qué busca la comunidad hispanohablante en USA</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">Qué NO hacemos</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>No aceptamos pagos por inclusión o posicionamiento</li>
            <li>No publicamos reseñas patrocinadas sin indicarlo</li>
            <li>No listamos negocios solo porque existen</li>
            <li>No garantizamos disponibilidad, horarios ni precios actualizados</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">Límites de actualización</h2>
          <p>
            Los datos de negocios, horarios y precios cambian constantemente.
            Recomendamos siempre verificar la información directamente con el lugar o negocio
            antes de visitar. Si detectas información desactualizada, escríbenos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">Contenido de folklore y leyendas</h2>
          <p>
            Las leyendas, mitos y folklore que publicamos son tradiciones orales documentadas
            en fuentes históricas o culturales. No afirmamos que sean verdaderos.
            Son parte del patrimonio cultural local de cada estado.
          </p>
        </section>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
          <h3 className="font-bold text-stone-800 mb-2">¿Detectas un error?</h3>
          <p className="text-stone-600 mb-3">
            Si encuentras información incorrecta, desactualizada o que no cumple nuestros criterios, cuéntanoslo.
          </p>
          <Link href="/contacto" className="text-amber-600 hover:text-amber-700 font-medium">
            Reportar un error →
          </Link>
        </div>
      </div>
    </div>
  )
}
