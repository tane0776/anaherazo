import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Isotipo } from "@/components/isotipo";
import { persona, ui } from "@/lib/content";

const ORDEN = ["sobre_mi", "destacados", "trayectoria", "premios", "recomendaciones", "contacto"] as const;
const IDS: Record<(typeof ORDEN)[number], string> = {
  sobre_mi: "sobre-mi",
  destacados: "destacados",
  trayectoria: "trayectoria",
  premios: "premios",
  recomendaciones: "recomendaciones",
  contacto: "contacto",
};

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hoja/10 bg-ciruela/80 backdrop-blur-md supports-[backdrop-filter]:bg-ciruela/65">
      <a
        href="#contenido"
        className="sr-only-focusable absolute left-3 top-3 z-50 rounded-full bg-mantequilla px-4 py-2 text-sm text-cafe"
      >
        {ui.saltar}
      </a>
      <nav aria-label="secciones" className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-3 sm:px-6">
        <a href="#inicio" className="flex shrink-0 items-center gap-2 rounded-full p-1" aria-label={persona.nombre}>
          <Isotipo className="h-7 w-14" />
          <span className="hidden font-doodle text-xl leading-none lg:inline">{persona.nombre}</span>
        </a>
        <ul className="-my-2 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-2 pl-1 pr-1 [scrollbar-width:none] md:justify-end [&::-webkit-scrollbar]:hidden">
          {ORDEN.map((k) => (
            <li key={k} className="shrink-0">
              <LiquidButton href={`#${IDS[k]}`} size="sm" tone={k === "contacto" ? "mantequilla" : "hoja"}>
                {ui.nav[k]}
              </LiquidButton>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
