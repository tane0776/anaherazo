/**
 * LiquidButton · basado en el componente "liquid glass button" de 21st.dev
 * (svg feDisplacementMap como backdrop-filter), adaptado a la marca:
 * solo ciruela / hoja / mantequilla / café, sin demo copy.
 *
 * - renderiza <a> cuando recibe href, <button> en otro caso (siempre elementos reales).
 * - <GlassFilter /> se monta UNA vez en la app (ids únicos).
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidButtonVariants = cva(
  "relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-medium lowercase transition-[transform,box-shadow,background-color] duration-300 motion-safe:hover:scale-[1.04] aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      tone: {
        // sobre fondos ciruela / café / shader
        hoja: "bg-hoja/10 text-hoja hover:bg-hoja/20",
        // sobre fondos mantequilla / hoja
        cafe: "bg-cafe/[0.06] text-cafe hover:bg-cafe/[0.12]",
        // pill destacada
        mantequilla: "bg-mantequilla text-cafe hover:bg-mantequilla/90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-base",
        lg: "h-12 px-7 text-base sm:text-lg",
      },
    },
    defaultVariants: { tone: "hoja", size: "default" },
  },
);

const shadowFor = {
  hoja: "shadow-[0_0_6px_rgba(63,43,36,0.06),0_2px_8px_rgba(63,43,36,0.18),inset_3px_3px_0.5px_-3px_rgba(253,241,226,0.9),inset_-3px_-3px_0.5px_-3px_rgba(253,241,226,0.85),inset_1px_1px_1px_-0.5px_rgba(253,241,226,0.6),inset_-1px_-1px_1px_-0.5px_rgba(253,241,226,0.6),inset_0_0_6px_6px_rgba(253,241,226,0.10),inset_0_0_2px_2px_rgba(253,241,226,0.06),0_0_12px_rgba(63,43,36,0.12)]",
  cafe: "shadow-[0_0_6px_rgba(63,43,36,0.04),0_2px_6px_rgba(63,43,36,0.10),inset_3px_3px_0.5px_-3px_rgba(63,43,36,0.85),inset_-3px_-3px_0.5px_-3px_rgba(63,43,36,0.8),inset_1px_1px_1px_-0.5px_rgba(63,43,36,0.5),inset_-1px_-1px_1px_-0.5px_rgba(63,43,36,0.5),inset_0_0_6px_6px_rgba(63,43,36,0.08),inset_0_0_2px_2px_rgba(63,43,36,0.05),0_0_12px_rgba(253,241,226,0.25)]",
  mantequilla:
    "shadow-[0_2px_10px_rgba(63,43,36,0.22),inset_3px_3px_0.5px_-3px_rgba(63,43,36,0.6),inset_-3px_-3px_0.5px_-3px_rgba(63,43,36,0.55),inset_0_0_6px_6px_rgba(253,241,226,0.25)]",
} as const;

type Common = VariantProps<typeof liquidButtonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type AsButton = Common & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Common & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type LiquidButtonProps = AsButton | AsLink;

function Layers({ tone }: { tone: keyof typeof shadowFor }) {
  return (
    <>
      <span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 z-0 rounded-full transition-all", shadowFor[tone])}
      />
      <span
        aria-hidden
        className="glass-fallback glass-filter pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full"
      />
    </>
  );
}

export function LiquidButton(props: LiquidButtonProps) {
  const { className, tone, size, children, ...rest } = props;
  const t = tone ?? "hoja";
  const classes = cn(liquidButtonVariants({ tone: t, size }), className);
  const inner = (
    <>
      <Layers tone={t} />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (typeof (rest as AsLink).href === "string") {
    const linkProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a data-slot="button" className={classes} {...linkProps}>
        {inner}
      </a>
    );
  }
  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button data-slot="button" type="button" className={classes} {...buttonProps}>
      {inner}
    </button>
  );
}

/** filtro svg del vidrio líquido. montar una sola vez. */
export function GlassFilter() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves={1} seed={1} result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation={2} result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale={70}
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation={4} result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export { liquidButtonVariants };
