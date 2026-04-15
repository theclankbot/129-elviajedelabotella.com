# elviajedelabotella.com

Web editorial en espanol sobre descubrimiento local en Estados Unidos.

## Documentos clave

- `PROMPT.md`: posicionamiento, tono y direccion del proyecto
- `PROJECT-BRIEF.md`: objetivo, foco editorial y clusters prioritarios

## Estado actual

- Arquitectura publica y navegacion principal ya montadas
- 18 lugares semilla
- 6 colecciones
- 15 estados
- 18 fichas de lugar con cuerpo editorial largo
- 6 colecciones desarrolladas con intro, criterio y desarrollo editorial
- Contacto, `robots.txt` y `sitemap.xml` ya implementados

La web ya se puede considerar una beta editorial publicable.
Todavia no es un lanzamiento editorial fuerte: faltan fuentes visibles por pieza, imagenes con criterio y una capa extra de verificacion factual.

## Rutas principales

- `/`
- `/lugares-raros`
- `/temporada`
- `/experiencias`
- `/familias`
- `/vintage`
- `/destinos`
- `/colecciones`
- `/buscar`
- `/contacto`

## Desarrollo

```bash
npm run dev
```

## Validacion

```bash
npm run build
node ./node_modules/typescript/bin/tsc --noEmit --incremental false
node ./node_modules/eslint/bin/eslint.js app components lib
```

## Estructura de datos

- `lib/data/lugares.ts`
- `lib/data/colecciones.ts`
- `lib/data/estados.ts`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS

## Prioridad inmediata

- reforzar fuentes y verificaciones por pieza
- sustituir placeholders por imagenes con criterio editorial
- decidir si las rutas vacias restantes se dejan en beta o se eliminan del build publico

La beta ya sale; el lanzamiento editorial completo todavia no.
