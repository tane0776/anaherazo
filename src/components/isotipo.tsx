import { cn } from "@/lib/utils";

/** isotipo: garabato que termina en chulo. */
export function Isotipo({
  className,
  trazo = "hoja",
  title,
}: {
  className?: string;
  /** "hoja": garabato hoja + chulo mantequilla (fondos oscuros). "cafe": garabato café + chulo ciruela (fondos claros). */
  trazo?: "hoja" | "cafe";
  title?: string;
}) {
  const garabato = trazo === "hoja" ? "#FDF1E2" : "#3F2B24";
  const chulo = trazo === "hoja" ? "#FEDF85" : "#655A7C";
  return (
    <svg
      viewBox="0 0 240 120"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("block", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M12 78 C22 40, 38 98, 52 62 S76 26, 86 66 S110 96, 118 58 S140 34, 148 70"
        stroke={garabato}
        strokeWidth={10}
      />
      <path d="M148 70 L166 90 L226 18" stroke={chulo} strokeWidth={10} />
    </svg>
  );
}
