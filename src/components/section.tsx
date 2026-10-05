import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export type Tono = "ciruela" | "mantequilla";

/** sección tipo brandbook: alterna ciruela (texto hoja) y mantequilla (texto café). */
export function Section({
  id,
  tono,
  titulo,
  numero,
  children,
  className,
}: {
  id: string;
  tono: Tono;
  titulo: string;
  numero: string;
  children: React.ReactNode;
  className?: string;
}) {
  const headingId = `${id}-titulo`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "relative isolate overflow-hidden px-5 py-20 sm:px-8 md:py-28",
        tono === "ciruela" ? "tono-ciruela bg-ciruela text-hoja" : "tono-mantequilla bg-mantequilla text-cafe",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-baseline gap-4 md:mb-14">
          <span
            className={cn(
              "font-mono text-xs tracking-[0.1em] sm:text-sm",
              tono === "ciruela" ? "text-mantequilla" : "text-ciruela",
            )}
          >
            {numero}
          </span>
          <h2 id={headingId} className="font-doodle text-4xl leading-none sm:text-5xl md:text-6xl">
            {titulo}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}

/** aparece suave al entrar en pantalla (nada si se pide reducir movimiento). */
export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Etiqueta({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("font-mono text-xs tracking-[0.06em] sm:text-sm", className)}>{children}</p>;
}
