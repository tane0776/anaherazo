import { Hero } from "@/components/ui/hero";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { persona, ui } from "@/lib/content";

export function HeroSection() {
  return (
    <Hero id="inicio">
      <p className="font-mono text-xs tracking-[0.06em] text-hoja/90 sm:text-sm">{persona.linea}</p>
      <h1 className="mt-5 font-doodle text-6xl leading-[0.9] text-hoja sm:text-7xl md:text-8xl">{persona.nombre}</h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <LiquidButton href="#contacto" tone="mantequilla" size="lg" className="h-auto min-h-12 max-w-full whitespace-normal py-3 text-left leading-snug">
          {persona.cta}
        </LiquidButton>
        <LiquidButton href="#destacados" tone="hoja" size="lg">
          {ui.ver_proyectos}
        </LiquidButton>
      </div>
    </Hero>
  );
}
