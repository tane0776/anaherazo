import { Section, Reveal, Etiqueta } from "@/components/section";
import { trayectoria, ui } from "@/lib/content";

export function Trayectoria() {
  return (
    <Section id="trayectoria" tono="mantequilla" titulo={ui.titulos.trayectoria} numero="03">
      <ol className="relative border-l-2 border-dashed border-cafe/30 pl-6 sm:pl-10">
        {trayectoria.map((h, i) => (
          <li key={h.nombre} className="relative pb-12 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[calc(1.5rem+9px)] top-1.5 h-4 w-4 rounded-full border-2 border-cafe bg-ciruela sm:-left-[calc(2.5rem+9px)]"
            />
            <Reveal delay={Math.min(i, 3) * 0.04}>
              <Etiqueta className="text-ciruela">{h.rol}</Etiqueta>
              <h3 className="mt-2 font-doodle text-3xl leading-tight sm:text-4xl">{h.nombre}</h3>
              <p className="mt-3 max-w-3xl text-lg leading-relaxed">{h.detalle}</p>
              {h.logros?.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {h.logros.map((l) => (
                    <li key={l} className="rounded-full bg-cafe px-4 py-1.5 text-sm text-mantequilla">
                      {l}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
