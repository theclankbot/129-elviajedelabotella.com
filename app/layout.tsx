import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'El Viaje de la Botella - Descubre lugares raros y planes curiosos en USA',
    template: '%s | El Viaje de la Botella',
  },
  description:
    'Guia editorial en espanol para descubrir planes curiosos, lugares raros, experiencias locales y escapadas en Estados Unidos.',
  openGraph: {
    siteName: 'El Viaje de la Botella',
    locale: 'es_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8781821876227840"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col bg-stone-50 text-stone-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
