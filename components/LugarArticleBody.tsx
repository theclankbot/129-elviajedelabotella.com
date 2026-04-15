import { Lugar } from '@/lib/types'
import { pilarLabel, temporadaLabel } from '@/lib/utils'

interface Props {
  lugar: Lugar
  categoryLabel?: string
  infoBoxClassName?: string
}

export default function LugarArticleBody({
  lugar,
  categoryLabel,
  infoBoxClassName = 'bg-amber-50 border-amber-100',
}: Props) {
  const tipo = categoryLabel ?? pilarLabel(lugar.pilar)

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <p className="text-xl text-stone-600 leading-relaxed mb-6 font-medium">
        {lugar.extracto}
      </p>

      <div className="space-y-4 text-stone-600 leading-relaxed">
        <p>{lugar.descripcion}</p>
      </div>

      {lugar.secciones && lugar.secciones.length > 0 && (
        <div className="mt-10 space-y-10">
          {lugar.secciones.map((seccion, sectionIndex) => (
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

      <div className={`my-10 rounded-2xl border p-6 ${infoBoxClassName}`}>
        <h2 className="font-bold text-stone-800 mb-3">Información práctica</h2>
        <ul className="space-y-2 text-stone-600">
          <li>
            <strong>Estado:</strong> {lugar.estado}
          </li>
          <li>
            <strong>Tipo:</strong> {tipo}
          </li>
          {lugar.temporadas && lugar.temporadas.length > 0 && (
            <li>
              <strong>Temporada:</strong> {lugar.temporadas.map(temporadaLabel).join(', ')}
            </li>
          )}
        </ul>
      </div>

      {lugar.antesDeIr && lugar.antesDeIr.length > 0 && (
        <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="text-xl font-bold text-stone-800 mb-4">Antes de ir</h2>
          <ul className="space-y-2 text-stone-600">
            {lugar.antesDeIr.map((item, index) => (
              <li key={`before-${index}`}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {lugar.notaVerificacion && (
        <p className="mt-6 text-sm leading-relaxed text-stone-500">
          {lugar.notaVerificacion}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-stone-100">
        {lugar.tags.map((tag) => (
          <span key={tag} className="text-sm bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
