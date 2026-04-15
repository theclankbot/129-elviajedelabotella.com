import CardLugar from '@/components/CardLugar'
import { Coleccion, Lugar } from '@/lib/types'

interface Props {
  coleccion: Coleccion
  lugaresColeccion: Lugar[]
}

export default function ColeccionArticleBody({ coleccion, lugaresColeccion }: Props) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <p className="text-xl text-stone-600 leading-relaxed mb-8 font-medium border-l-4 border-amber-400 pl-5">
        {coleccion.extracto}
      </p>

      {coleccion.intro && coleccion.intro.length > 0 && (
        <section className="space-y-4 text-stone-600 leading-relaxed mb-10">
          {coleccion.intro.map((parrafo, index) => (
            <p key={`intro-${index}`}>{parrafo}</p>
          ))}
        </section>
      )}

      {coleccion.criterios && coleccion.criterios.length > 0 && (
        <section className="mb-10 rounded-2xl border border-amber-100 bg-amber-50 p-6">
          <h2 className="text-xl font-bold text-stone-800 mb-4">Criterio editorial</h2>
          <ul className="space-y-2 text-stone-600">
            {coleccion.criterios.map((criterio, index) => (
              <li key={`criterio-${index}`}>{criterio}</li>
            ))}
          </ul>
        </section>
      )}

      {coleccion.entradas && coleccion.entradas.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-stone-800 mb-5">Ideas clave de esta colección</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coleccion.entradas.map((entrada, index) => (
              <div key={`${entrada.titulo}-${index}`} className="rounded-2xl border border-stone-200 bg-white p-5">
                <h3 className="font-semibold text-stone-800 mb-2">{entrada.titulo}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{entrada.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {lugaresColeccion.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-stone-800 mb-5">Piezas relacionadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {lugaresColeccion.map((lugar) => (
              <CardLugar key={lugar.slug} lugar={lugar} size="md" />
            ))}
          </div>
        </section>
      )}

      {coleccion.secciones && coleccion.secciones.length > 0 && (
        <div className="space-y-10">
          {coleccion.secciones.map((seccion, sectionIndex) => (
            <section key={`${seccion.titulo}-${sectionIndex}`}>
              <h2 className="text-2xl font-bold text-stone-800 mb-4">{seccion.titulo}</h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                {seccion.parrafos.map((parrafo, paragraphIndex) => (
                  <p key={`${sectionIndex}-${paragraphIndex}`}>{parrafo}</p>
                ))}
              </div>
              {seccion.puntos && seccion.puntos.length > 0 && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-600">
                  {seccion.puntos.map((punto, bulletIndex) => (
                    <li key={`${sectionIndex}-bullet-${bulletIndex}`}>{punto}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}

      {coleccion.cierre && coleccion.cierre.length > 0 && (
        <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="text-xl font-bold text-stone-800 mb-4">Cómo aprovechar esta colección</h2>
          <div className="space-y-4 text-stone-600 leading-relaxed">
            {coleccion.cierre.map((parrafo, index) => (
              <p key={`cierre-${index}`}>{parrafo}</p>
            ))}
          </div>
        </section>
      )}

      {coleccion.notaVerificacion && (
        <p className="mt-6 text-sm leading-relaxed text-stone-500">
          {coleccion.notaVerificacion}
        </p>
      )}

      <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-stone-100">
        {coleccion.tags.map((tag) => (
          <span key={tag} className="text-sm bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
