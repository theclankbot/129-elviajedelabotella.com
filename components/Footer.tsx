import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-amber-500 text-xl">🧭</span>
              <span className="font-bold text-white text-base">el viaje de la botella</span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500 max-w-xs">
              Descubre lugares raros, planes locales y experiencias que sí merecen salir de casa en Estados Unidos. En español.
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Explorar</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Lugares raros', href: '/lugares-raros' },
                { label: 'Temporadas', href: '/temporada' },
                { label: 'Experiencias', href: '/experiencias' },
                { label: 'Con niños', href: '/familias' },
                { label: 'Vintage & thrift', href: '/vintage' },
                { label: 'Destinos', href: '/destinos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Temporadas */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Temporadas</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Otoño', href: '/temporada/otono' },
                { label: 'Invierno', href: '/temporada/invierno' },
                { label: 'Primavera', href: '/temporada/primavera' },
                { label: 'Verano', href: '/temporada/verano' },
                { label: 'Apple picking', href: '/temporada/apple-picking' },
                { label: 'Camping', href: '/temporada/camping' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Info</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Sobre nosotros', href: '/sobre-nosotros' },
                { label: 'Fuentes de datos', href: '/fuentes-de-datos' },
                { label: 'Contacto', href: '/contacto' },
                { label: 'Privacidad', href: '/privacidad' },
                { label: 'Términos de uso', href: '/terminos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} elviajedelabotella.com — Contenido editorial en español sobre USA
          </p>
          <p className="text-xs text-stone-600">
            Guía de planes, experiencias y lugares curiosos en Estados Unidos
          </p>
        </div>
      </div>
    </footer>
  )
}
