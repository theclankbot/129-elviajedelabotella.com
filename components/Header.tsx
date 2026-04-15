'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { label: 'Lugares raros', href: '/lugares-raros' },
  { label: 'Temporadas', href: '/temporada' },
  { label: 'Experiencias', href: '/experiencias' },
  { label: 'Con niños', href: '/familias' },
  { label: 'Vintage & thrift', href: '/vintage' },
  { label: 'Destinos', href: '/destinos' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-amber-500 text-xl">🧭</span>
            <span className="font-bold text-lg tracking-tight">
              el viaje de la botella
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-stone-300 hover:text-amber-400 hover:bg-stone-800 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search + mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/buscar"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Buscar</span>
            </Link>

            <button
              className="lg:hidden p-2 rounded-md text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="lg:hidden pb-4 border-t border-stone-800 mt-1 pt-3">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-sm text-stone-300 hover:text-amber-400 hover:bg-stone-800 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/buscar"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm text-stone-300 hover:text-amber-400 hover:bg-stone-800 rounded-md transition-colors"
              >
                🔍 Buscar
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
