import { GlassFilter } from "@/components/ui/liquid-glass-button";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { SobreMi } from "@/components/sections/sobre-mi";
import { Destacados } from "@/components/sections/destacados";
import { Trayectoria } from "@/components/sections/trayectoria";
import { Premios } from "@/components/sections/premios";
import { Recomendaciones } from "@/components/sections/recomendaciones";
import { Contacto } from "@/components/sections/contacto";

export default function App() {
  return (
    <>
      <GlassFilter />
      <Nav />
      <main id="contenido">
        <HeroSection />
        <SobreMi />
        <Destacados />
        <Trayectoria />
        <Premios />
        <Recomendaciones />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
