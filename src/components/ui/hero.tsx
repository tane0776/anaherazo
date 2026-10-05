/**
 * Hero con shaders · basado en el "shader hero" de 21st.dev
 * (MeshGradient + PulsingBorder de @paper-design/shaders-react, framer-motion),
 * adaptado a la marca: solo ciruela / hoja / mantequilla / café, sin demo copy.
 *
 * - fondo: MeshGradient lento + una capa suave de acento.
 * - anillo: PulsingBorder alrededor de un retrato, con texto circular que gira.
 * - prefers-reduced-motion: gradiente estático, sin rotación.
 */
import * as React from "react";
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const BRAND = {
  ciruela: "#655A7C",
  hoja: "#FDF1E2",
  mantequilla: "#FEDF85",
  cafe: "#3F2B24",
};

export function ShaderBackground({ className, speed = 0.12 }: { className?: string; speed?: number }) {
  const reduced = usePrefersReducedMotion();
  const s = reduced ? 0 : speed;
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={[BRAND.ciruela, BRAND.cafe, BRAND.ciruela, BRAND.cafe]}
        distortion={0.8}
        swirl={0.25}
        speed={s}
        frame={reduced ? 4000 : 0}
      />
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-[0.16]"
        colors={[BRAND.ciruela, BRAND.mantequilla, BRAND.ciruela, BRAND.hoja]}
        distortion={0.6}
        swirl={0.1}
        speed={s * 0.7}
        frame={reduced ? 9000 : 0}
      />
    </div>
  );
}

export function PortraitRing({
  src,
  alt,
  circularText,
  className,
}: {
  src: string;
  alt: string;
  circularText: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const id = React.useId().replace(/:/g, "");
  // repite el texto para que llene la circunferencia
  const ring = circularText.repeat(Math.max(1, Math.ceil(60 / Math.max(1, circularText.length))));

  return (
    <div className={cn("relative aspect-square w-[min(78vw,340px)]", className)}>
      {/* anillo de luz */}
      <PulsingBorder
        aria-hidden
        className="absolute inset-[9%] rounded-full"
        colors={[BRAND.mantequilla, BRAND.hoja, BRAND.mantequilla]}
        colorBack="#00000000"
        roundness={1}
        thickness={0.08}
        softness={0.75}
        intensity={0.35}
        bloom={0.4}
        spots={3}
        spotSize={0.4}
        pulse={reduced ? 0 : 0.35}
        smoke={0.6}
        smokeSize={0.4}
        aspectRatio="square"
        scale={0.86}
        speed={reduced ? 0 : 0.8}
        frame={reduced ? 2000 : 0}
      />
      {/* retrato: nunca más grande que su tamaño real (389px) */}
      <img
        src={src}
        alt={alt}
        width={389}
        height={389}
        className="absolute left-1/2 top-1/2 aspect-square w-[58%] max-w-[389px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hoja object-cover"
        fetchPriority="high"
      />
      {/* texto circular */}
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={reduced ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id={`circle-${id}`} d="M 50,50 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-hoja font-mono" style={{ fontSize: "5.2px", letterSpacing: "0.12em" }}>
          <textPath href={`#circle-${id}`} textLength={276} lengthAdjust="spacingAndGlyphs">
            {ring}
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
}

export function Hero({
  id,
  children,
  aside,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-ciruela", className)}
    >
      <ShaderBackground className="-z-20" />
      {/* velo para asegurar contraste del texto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-cafe/30 md:bg-transparent md:bg-gradient-to-r md:from-cafe/50 md:via-cafe/20 md:to-transparent"
      />
      <div className={cn("mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 md:gap-6 md:py-24", aside && "md:grid-cols-[1.25fr_1fr]")}>
        <div className="min-w-0">{children}</div>
        {aside ? <div className="flex justify-center md:justify-end">{aside}</div> : null}
      </div>
    </section>
  );
}
