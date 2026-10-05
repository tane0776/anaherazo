import { Section, Reveal, Etiqueta } from "@/components/section";
import { Isotipo } from "@/components/isotipo";
import { persona, ui } from "@/lib/content";

const firma = `${import.meta.env.BASE_URL}img/firma.svg`;

export function SobreMi() {
  return (
    <Section id="sobre-mi" tono="mantequilla" titulo={ui.titulos.sobre_mi} numero="01">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <Reveal>
          <p className="text-xl leading-relaxed sm:text-2xl">{persona.sobre_mi}</p>
          <img src={firma} alt="" aria-hidden loading="lazy" className="mt-8 h-20 w-auto opacity-90" />
        </Reveal>
        <Reveal delay={0.1} className="space-y-8">
          <div className="rounded-3xl border-2 border-cafe/15 bg-hoja p-6">
            <Isotipo trazo="cafe" className="mb-4 h-8 w-16" />
            <p className="text-lg font-bold leading-snug">{persona.titulo}</p>
          </div>
          <div>
            <Etiqueta className="mb-3 text-ciruela">{ui.titulos.idiomas}</Etiqueta>
            <ul className="flex flex-wrap gap-2">
              {persona.idiomas.map((idioma) => (
                <li key={idioma} className="rounded-full border-2 border-cafe/25 px-4 py-1.5 text-base">
                  {idioma}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
