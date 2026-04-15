import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos de uso — El Viaje de la Botella',
  description: 'Términos de uso de elviajedelabotella.com.',
}

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-stone-700 transition-colors">Inicio</Link>
        <span>/</span>
        <span>Términos de uso</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">Términos de uso</h1>
      <p className="text-sm text-stone-500 mb-10">Última actualización: abril 2025</p>

      <div className="space-y-8 text-stone-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">1. Uso del sitio</h2>
          <p>
            Al usar <em>elviajedelabotella.com</em> aceptas estos términos.
            El sitio es para uso personal e informativo.
            No puedes reproducir el contenido sin autorización.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">2. Precisión del contenido</h2>
          <p>
            Nos esforzamos por publicar información precisa y actualizada.
            Sin embargo, no garantizamos que toda la información sea correcta o esté al día.
            Los horarios, precios y disponibilidad de lugares pueden cambiar.
            Verifica siempre directamente con el negocio o lugar antes de visitar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">3. Contenido de terceros</h2>
          <p>
            Algunos enlaces llevan a sitios externos. No somos responsables del contenido
            ni de las prácticas de privacidad de esos sitios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">4. Contenido de folklore y leyendas</h2>
          <p>
            Las leyendas urbanas, mitos y folklore son tradiciones culturales documentadas.
            No afirmamos la veracidad de los hechos sobrenaturales descritos.
            Son patrimonio cultural local con valor histórico y antropológico.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">5. Propiedad intelectual</h2>
          <p>
            El contenido editorial (textos, selecciones, guías) es propiedad de elviajedelabotella.com.
            Puedes compartir enlaces al sitio pero no reproducir el contenido sin permiso.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">6. Contacto</h2>
          <p>
            Para consultas sobre los términos, usa nuestro{' '}
            <Link href="/contacto" className="text-amber-600 hover:text-amber-700 font-medium">
              formulario de contacto
            </Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
