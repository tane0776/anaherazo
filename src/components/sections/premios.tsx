import { Section, Reveal } from "@/components/section";
import { premios, ui } from "@/lib/content";

export function Premios() {
  return (
    <Section id="premios" tono="ciruela" titulo={ui.titulos.premios} numero="04">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {premios.map((p, i) => {
          const [titulo, ...resto] = p.split(" · ");
          return (
            <li key={p}>
              <Reveal delay={i * 0.04} className="h-full">
                <div className="flex h-full items-start gap-4 rounded-3xl border-2 border-hoja/20 bg-hoja/[0.06] p-5">
                  <svg aria-hidden viewBox="0 0 80 80" className="mt-1 h-7 w-7 shrink-0" fill="none">
                    <circle cx="40" cy="40" r="34" stroke="#FEDF85" strokeWidth={6} />
                    <path d="M24 42 L35 53 L57 27" stroke="#FEDF85" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="text-lg font-bold leading-snug">{titulo}</p>
                    {resto.length ? <p className="mt-1 font-mono text-sm text-mantequilla">{resto.join(" · ")}</p> : null}
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
