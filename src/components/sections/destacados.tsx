import { Section, Reveal, Etiqueta } from "@/components/section";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import {
  articuloHref,
  articulos,
  destacadoHref,
  destacados,
  fechaCorta,
  ui,
  type Articulo,
  type Destacado,
} from "@/lib/content";
import { cn } from "@/lib/utils";

function Logros({ logros }: { logros: string[] }) {
  return (
    <div>
      <Etiqueta className="mb-3 text-ciruela">{ui.titulos.logros}</Etiqueta>
      <ul className="grid gap-3 sm:grid-cols-2">
        {logros.map((l) => (
          <li key={l} className="flex gap-3 rounded-2xl bg-mantequilla/60 p-4 text-base leading-snug">
            <svg aria-hidden viewBox="0 0 80 80" className="mt-0.5 h-5 w-5 shrink-0" fill="none">
              <path d="M10 44 L30 64 L70 14" stroke="#655A7C" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArticuloCard({ a }: { a: Articulo }) {
  const href = articuloHref(a);
  const body = (
    <>
      <Etiqueta className="text-ciruela">
        {a.medio}
        {a.fecha ? ` · ${fechaCorta(a.fecha)}` : ""}
      </Etiqueta>
      <p className="mt-3 text-lg font-bold leading-snug">{a.titulo}</p>
      {href ? <p className="mt-4 font-mono text-xs tracking-[0.06em] text-ciruela">{ui.titulos.leer}</p> : null}
    </>
  );
  const base = "flex h-full flex-col rounded-2xl border-2 border-cafe/15 bg-hoja p-5";
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, "transition-transform motion-safe:hover:-translate-y-1 hover:border-ciruela focus-visible:rounded-2xl")}
    >
      {body}
    </a>
  ) : (
    <div className={base}>{body}</div>
  );
}

function Tarjeta({ d, grande }: { d: Destacado; grande?: boolean }) {
  const lista = articulos(d);
  const link = destacadoHref(d);
  return (
    <article
      aria-labelledby={`d-${d.id}`}
      className={cn(
        "rounded-[2rem] bg-hoja p-6 text-cafe shadow-[0_20px_60px_-30px_rgba(63,43,36,0.6)] sm:p-10",
        grande && "md:p-12",
      )}
    >
      <Etiqueta className="text-ciruela">{d.rol}</Etiqueta>
      <h3 id={`d-${d.id}`} className="mt-3 font-doodle text-4xl leading-none sm:text-5xl md:text-6xl">
        {d.nombre}
      </h3>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">{d.resumen}</p>

      {d.lema ? (
        <p className="mt-6 inline-block rounded-2xl bg-ciruela px-5 py-3 font-doodle text-2xl text-hoja sm:text-3xl">
          {d.lema}
        </p>
      ) : null}

      {d.logros?.length ? (
        <div className="mt-8">
          <Logros logros={d.logros} />
        </div>
      ) : null}

      {d.medios?.length ? (
        <div className="mt-8">
          <Etiqueta className="mb-3 text-ciruela">{ui.titulos.medios}</Etiqueta>
          <ul className="flex flex-wrap gap-2">
            {d.medios.map((m) => (
              <li key={m} className="rounded-full bg-ciruela px-4 py-1.5 text-sm text-hoja sm:text-base">
                {m}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {lista.length ? (
        <div className="mt-8">
          <Etiqueta className="mb-3 text-ciruela">{ui.titulos.articulos}</Etiqueta>
          <ul className="grid gap-4 md:grid-cols-3">
            {lista.map((a) => (
              <li key={a.titulo}>
                <ArticuloCard a={a} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {link ? (
        <div className="mt-8">
          <LiquidButton href={link} target="_blank" rel="noopener noreferrer" tone="cafe" size="sm">
            {d.link_label || d.nombre} ↗
          </LiquidButton>
        </div>
      ) : null}
    </article>
  );
}

export function Destacados() {
  return (
    <Section id="destacados" tono="ciruela" titulo={ui.titulos.destacados} numero="02" className="md:py-32">
      <div className="space-y-8 md:space-y-12">
        {destacados.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.05}>
            <Tarjeta d={d} grande={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
