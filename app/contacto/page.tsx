import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contacto - El Viaje de la Botella',
  description: 'Contacta con El Viaje de la Botella. Sugerencias, errores, colaboraciones o preguntas.',
}

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <nav className="mb-8 flex items-center gap-2 text-sm text-stone-500">
        <Link href="/" className="transition-colors hover:text-stone-700">
          Inicio
        </Link>
        <span>/</span>
        <span>Contacto</span>
      </nav>

      <h1 className="mb-4 text-3xl font-bold text-stone-900 sm:text-4xl">Contacto</h1>
      <p className="mb-10 text-lg leading-relaxed text-stone-600">
        Tienes una sugerencia, encontraste un error o quieres colaborar. Escribenos.
      </p>

      <div className="mb-10 space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <h3 className="mb-1 font-semibold text-stone-800">Sugerir un lugar o experiencia</h3>
          <p className="text-sm text-stone-500">
            Conoces un sitio raro, una tienda thrift que merece atencion o un plan que no esta en ninguna guia.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <h3 className="mb-1 font-semibold text-stone-800">Reportar un error</h3>
          <p className="text-sm text-stone-500">
            Informacion desactualizada, horarios incorrectos o cualquier dato que no cuadre.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <h3 className="mb-1 font-semibold text-stone-800">Colaborar editorialmente</h3>
          <p className="text-sm text-stone-500">
            Si vives en USA, conoces bien tu estado y quieres contribuir con guias locales.
          </p>
        </div>
      </div>

      <ContactForm />
    </div>
  )
}
