/**
 * capa de contenido: todo sale de content/portfolio.json.
 *
 * reglas de visibilidad (se aplican solas cuando ana edita el json):
 * - un objeto con la llave "confirmar" no se muestra (ej. la tarjeta de no big deal).
 * - "articulos_por_confirmar_byline" nunca se muestra; para publicar un artículo,
 *   muévelo a "articulos_confirmados".
 * - un link cuyo valor empieza por "[confirmar" (o está vacío) no se muestra.
 */
import raw from "@content/portfolio.json";

export type Articulo = { titulo: string; medio: string; fecha?: string; url?: string; confirmar?: string };

export type Destacado = {
  id: string;
  nombre: string;
  rol: string;
  resumen: string;
  logros?: string[];
  lema?: string;
  medios?: string[];
  articulos_confirmados?: Articulo[];
  /** link opcional de la tarjeta (se muestra como pill si es una url real) */
  link?: string;
  link_label?: string;
  /** varios links de la tarjeta (se muestran como pills) */
  links?: { url: string; label: string }[];
  /** caja aparte para explicar una plataforma o sistema */
  plataforma?: { titulo: string; resumen?: string; items: { nombre: string; detalle: string }[] };
  confirmar?: string;
};

export type Hito = { nombre: string; rol: string; detalle: string; logros?: string[]; confirmar?: string };

export type Recomendacion = {
  nombre: string;
  rol: string;
  relacion: string;
  texto: string;
  foto?: string;
  confirmar?: string;
};

type Ui = (typeof raw)["ui"];

type Portfolio = {
  persona: {
    nombre: string;
    titulo: string;
    linea: string;
    frase: string;
    sobre_mi: string;
    idiomas: string[];
    links: Record<string, string>;
    cta: string;
  };
  destacados: Destacado[];
  trayectoria: Hito[];
  premios: string[];
  recomendaciones: Recomendacion[];
  ui: Ui;
};

const data = raw as unknown as Portfolio;

/** un valor "por confirmar": vacío o que empieza con "[confirmar". */
export function isPending(value: unknown): boolean {
  if (typeof value !== "string") return true;
  const v = value.trim();
  return v === "" || v.toLowerCase().startsWith("[confirmar");
}

/** quita cualquier objeto que todavía tenga la llave "confirmar". */
export function visible<T extends object>(items: T[] | undefined): T[] {
  return (items ?? []).filter((item) => !(item && typeof item === "object" && "confirmar" in item));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function realEmail(): string | null {
  const email = data.persona.links.email;
  if (isPending(email)) return null;
  const clean = email.trim().replace(/^mailto:/i, "");
  return EMAIL_RE.test(clean) ? clean : null;
}

export type SocialLink = { key: string; label: string; href: string; external: boolean };

const LABELS: Record<string, string> = {
  linkedin: "linkedin",
  instagram: "instagram",
  x: "x",
  substack: "substack",
  email: "correo",
};

/** convierte lo que ana escriba (url completa, @usuario o usuario) en un href real. */
function toHref(key: string, value: string): string | null {
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  const handle = v.replace(/^@/, "");
  if (!/^[\w.-]+$/.test(handle)) return null;
  switch (key) {
    case "instagram":
      return `https://www.instagram.com/${handle}/`;
    case "x":
      return `https://x.com/${handle}`;
    case "substack":
      return `https://${handle}.substack.com`;
    case "linkedin":
      return `https://www.linkedin.com/in/${handle}/`;
    default:
      return null;
  }
}

export function realLinks(): SocialLink[] {
  const out: SocialLink[] = [];
  for (const [key, value] of Object.entries(data.persona.links)) {
    if (isPending(value)) continue;
    if (key === "email") {
      const email = realEmail();
      if (email) out.push({ key, label: LABELS[key] ?? key, href: `mailto:${email}`, external: false });
      continue;
    }
    const href = toHref(key, value);
    if (href) out.push({ key, label: LABELS[key] ?? key, href, external: true });
  }
  return out;
}

export const persona = data.persona;
export const ui = data.ui;
export const destacados = visible(data.destacados);
export const trayectoria = visible(data.trayectoria);
export const premios = (data.premios ?? []).filter((p) => !isPending(p));
export const recomendaciones = visible(data.recomendaciones).filter((r) => r.nombre && r.texto);

/** artículos publicables de un destacado: solo los confirmados, sin "confirmar". */
export function articulos(d: Destacado): Articulo[] {
  return visible(d.articulos_confirmados);
}

/** link de un artículo, solo si es una url real. */
export function articuloHref(a: Articulo): string | null {
  return a.url && !isPending(a.url) && /^https?:\/\//i.test(a.url) ? a.url : null;
}

/** link de una tarjeta destacada, solo si es una url real. */
export function destacadoHref(d: Destacado): string | null {
  return d.link && !isPending(d.link) && /^https?:\/\//i.test(d.link) ? d.link : null;
}

/** todos los links reales de una tarjeta destacada. */
export function destacadoLinks(d: Destacado): { url: string; label: string }[] {
  const uno = destacadoHref(d);
  const lista = uno ? [{ url: uno, label: d.link_label || d.nombre }] : [];
  for (const l of d.links ?? []) if (l.url && !isPending(l.url) && /^https?:\/\//i.test(l.url)) lista.push(l);
  return lista;
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
/** "2026-06" -> "jun 2026" */
export function fechaCorta(fecha?: string): string {
  if (!fecha) return "";
  const m = /^(\d{4})-(\d{2})/.exec(fecha);
  if (!m) return fecha;
  return `${MESES[Number(m[2]) - 1] ?? ""} ${m[1]}`.trim();
}
