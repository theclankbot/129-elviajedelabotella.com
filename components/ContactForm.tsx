'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { siteConfig } from '@/lib/site'

const CONTACT_EMAIL = siteConfig.contactEmail

const reasonOptions = [
  'Sugerir un lugar o experiencia',
  'Reportar un error',
  'Colaborar editorialmente',
  'Otro',
]

function buildMailtoUrl(params: {
  name: string
  email: string
  reason: string
  message: string
}) {
  const subject = `[${params.reason}] ${params.name}`
  const body = [
    `Nombre: ${params.name}`,
    `Email: ${params.email}`,
    `Motivo: ${params.reason}`,
    '',
    params.message,
  ].join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState(reasonOptions[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'ready'>('idle')

  const isValid = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      email.trim().length >= 5 &&
      email.includes('@') &&
      message.trim().length >= 20
    )
  }, [email, message, name])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isValid) {
      return
    }

    const mailtoUrl = buildMailtoUrl({
      name: name.trim(),
      email: email.trim(),
      reason,
      message: message.trim(),
    })

    setStatus('ready')
    window.location.href = mailtoUrl
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-stone-700">
            Nombre
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            placeholder="Tu nombre"
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-stone-700">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            placeholder="tu@email.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="contact-reason" className="mb-1.5 block text-sm font-medium text-stone-700">
            Motivo
          </label>
          <select
            id="contact-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          >
            {reasonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-stone-700">
            Mensaje
          </label>
          <textarea
            id="contact-message"
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full resize-none rounded-xl border border-stone-300 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            placeholder="Cuentanos que tienes en mente..."
            required
          />
          <p className="mt-1.5 text-xs text-stone-500">
            Escribe al menos 20 caracteres para que el mensaje tenga contexto util.
          </p>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-xl bg-amber-500 px-6 py-3 font-semibold text-stone-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
        >
          Abrir email preparado
        </button>
      </form>

      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
        <p className="font-medium text-stone-800">Como funciona</p>
        <p className="mt-1">
          El formulario abre tu cliente de correo con el asunto y el mensaje ya preparados.
          Si no se abre automaticamente, puedes escribir a{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-amber-700 hover:text-amber-800">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        {status === 'ready' && (
          <p className="mt-2 text-stone-500">
            Si tu dispositivo no tiene cliente de correo configurado, usa el enlace manual.
          </p>
        )}
      </div>
    </div>
  )
}
