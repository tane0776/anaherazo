import { Section, Reveal } from "@/components/section";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ShaderBackground } from "@/components/ui/hero";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { persona, realLinks, ui } from "@/lib/content";

export function Contacto() {
  const links = realLinks();
  // el shader de esta sección solo se monta cuando se acerca al viewport
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref} className="relative">
      <Section id="contacto" tono="ciruela" titulo={ui.titulos.contacto} numero="06" className="bg-transparent">
        {inView ? <ShaderBackground className="-z-20" speed={0.08} /> : null}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-cafe/30" />
        <Reveal>
          <p className="max-w-3xl font-doodle text-4xl leading-tight sm:text-5xl md:text-6xl">{persona.cta}</p>
          {links.length ? (
            <ul className="mt-10 flex flex-wrap gap-3">
              {links.map((l) => (
                <li key={l.key}>
                  <LiquidButton
                    href={l.href}
                    tone={l.key === "email" ? "mantequilla" : "hoja"}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                    {l.external ? " ↗" : ""}
                  </LiquidButton>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </Section>
    </div>
  );
}
