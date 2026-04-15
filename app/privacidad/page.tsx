import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de privacidad — El Viaje de la Botella',
  description: 'Política de privacidad de elviajedelabotella.com.',
}

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-stone-700 transition-colors">Inicio</Link>
        <span>/</span>
        <span>Privacidad</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">Política de privacidad</h1>
      <p className="text-sm text-stone-500 mb-10">Última actualización: abril 2025</p>

      <div className="space-y-8 text-stone-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">1. Quiénes somos</h2>
          <p>
            El Viaje de la Botella (<em>elviajedelabotella.com</em>) es una guía editorial en español
            sobre planes, lugares y experiencias en Estados Unidos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">2. Datos que recopilamos</h2>
          <p className="mb-3">Recopilamos datos en las siguientes situaciones:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Formulario de contacto:</strong> nombre y email para responder tu mensaje</li>
            <li><strong>Analítica web:</strong> datos agregados y anónimos de navegación para mejorar el contenido</li>
            <li><strong>Cookies técnicas:</strong> necesarias para el funcionamiento del sitio</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">3. Cómo usamos los datos</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Para responder mensajes recibidos a través del formulario de contacto</li>
            <li>Para mejorar el contenido y la experiencia del sitio mediante analítica agregada</li>
            <li>No vendemos datos a terceros</li>
            <li>No usamos los datos para publicidad personalizada</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">4. Tus derechos</h2>
          <p>
            Tienes derecho a acceder, rectificar o eliminar los datos personales que hayamos
            recopilado. Contáctanos para ejercer estos derechos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">5. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política ocasionalmente. Los cambios se publicarán en esta página
            con la fecha de actualización.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-stone-800 mb-3">6. Contacto</h2>
          <p>
            Para cualquier pregunta sobre privacidad, usa nuestro{' '}
            <Link href="/contacto" className="text-amber-600 hover:text-amber-700 font-medium">
              formulario de contacto
            </Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
