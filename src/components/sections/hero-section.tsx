import { Hero, PortraitRing } from "@/components/ui/hero";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { DoodleToDone } from "@/components/doodle-to-done";
import { persona, ui } from "@/lib/content";

const avatar = `${import.meta.env.BASE_URL}img/avatar.png`;

export function HeroSection() {
  return (
    <Hero
      id="inicio"
      aside={<PortraitRing src={avatar} alt={persona.nombre} circularText={ui.texto_circular} />}
    >
      <p className="font-mono text-xs tracking-[0.06em] text-hoja/90 sm:text-sm">{persona.linea}</p>
      <h1 className="mt-5 font-doodle text-6xl leading-[0.9] text-hoja sm:text-7xl md:text-8xl">{persona.nombre}</h1>
      <DoodleToDone text={persona.frase} className="mt-6 max-w-xl text-2xl text-hoja sm:text-3xl" />
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
