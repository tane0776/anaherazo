import { Section, Reveal, Etiqueta } from "@/components/section";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Isotipo } from "@/components/isotipo";
import { realEmail, recomendaciones, ui } from "@/lib/content";

function BotonRecomendacion() {
  const email = realEmail();
  if (email) {
    const href = `mailto:${email}?subject=${encodeURIComponent(ui.recomendaciones_asunto)}`;
    return (
      <LiquidButton href={href} tone="cafe" size="lg">
        {ui.recomendaciones_boton}
      </LiquidButton>
    );
  }
  return (
    <div className="flex flex-col items-start gap-2">
      <LiquidButton tone="cafe" size="lg" disabled aria-describedby="reco-nota">
        {ui.recomendaciones_boton}
      </LiquidButton>
      <p id="reco-nota" className="font-mono text-xs tracking-[0.04em] text-cafe">
        {ui.recomendaciones_sin_email}
      </p>
    </div>
  );
}

export function Recomendaciones() {
  const base = import.meta.env.BASE_URL;
  return (
    <Section id="recomendaciones" tono="mantequilla" titulo={ui.titulos.recomendaciones} numero="05">
      {recomendaciones.length ? (
        <>
          <ul className="grid gap-6 md:grid-cols-2">
            {recomendaciones.map((r, i) => (
              <li key={`${r.nombre}-${i}`}>
                <Reveal delay={i * 0.05} className="h-full">
                  <figure className="flex h-full flex-col rounded-[2rem] bg-hoja p-7">
                    <blockquote className="flex-1 text-lg leading-relaxed">{r.texto}</blockquote>
                    <figcaption className="mt-6 flex items-center gap-4">
                      {r.foto ? (
                        <img
                          src={/^https?:/.test(r.foto) ? r.foto : `${base}${r.foto.replace(/^\//, "")}`}
                          alt=""
                          loading="lazy"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : null}
                      <div>
                        <p className="font-doodle text-2xl leading-none">{r.nombre}</p>
                        <Etiqueta className="mt-1 text-ciruela">
                          {r.rol}
                          {r.relacion ? ` · ${r.relacion}` : ""}
                        </Etiqueta>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <BotonRecomendacion />
          </div>
        </>
      ) : (
        <Reveal>
          <div className="flex flex-col items-start gap-8 rounded-[2rem] border-2 border-dashed border-cafe/35 p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <Isotipo trazo="cafe" className="mt-1 h-10 w-20 shrink-0" />
              <p className="max-w-xl font-doodle text-3xl leading-tight sm:text-4xl">{ui.recomendaciones_vacio}</p>
            </div>
            <BotonRecomendacion />
          </div>
        </Reveal>
      )}
    </Section>
  );
}
