import { cn } from "@/lib/utils";

/**
 * recurso firma "doodle to done": la frase pasa de Doodle Hand → Figtree itálica light → Figtree bold.
 * se usa en UN solo lugar (el tagline del hero).
 * reparte el texto así: primera oración a mano; del resto, todo menos la última palabra en itálica light
 * y la última palabra en bold. si es una sola oración, la divide en tercios.
 */
export function splitDoodleToDone(text: string): [string, string, string] {
  const t = text.trim();
  const sentences = t.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [t];
  if (sentences.length >= 2) {
    const first = sentences[0];
    const restWords = sentences.slice(1).join(" ").split(/\s+/);
    const last = restWords.pop() ?? "";
    return [first, restWords.join(" "), last];
  }
  const words = t.split(/\s+/);
  const a = Math.max(1, Math.round(words.length / 3));
  const b = Math.max(a + 1, Math.round((2 * words.length) / 3));
  return [words.slice(0, a).join(" "), words.slice(a, b).join(" "), words.slice(b).join(" ")];
}

export function DoodleToDone({ text, className }: { text: string; className?: string }) {
  const [doodle, middle, done] = splitDoodleToDone(text);
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-[0.35em] leading-tight", className)}>
      <span className="font-doodle text-[1.25em] text-mantequilla">{doodle}</span>
      {middle ? <span className="font-sans font-light italic">{middle}</span> : null}
      {done ? <span className="font-sans font-bold">{done}</span> : null}
    </p>
  );
}
