import { Isotipo } from "@/components/isotipo";
import { ui } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-cafe px-5 py-10 text-hoja sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Isotipo className="h-8 w-16" />
        <p className="font-mono text-xs tracking-[0.06em] sm:text-sm">{ui.footer}</p>
      </div>
    </footer>
  );
}
