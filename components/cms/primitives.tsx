/* eslint-disable @next/next/no-img-element -- CMS images come from arbitrary hosts */
import Link from "next/link";
import { ArrowRight, icons, type LucideIcon } from "lucide-react";
import { createElement, type CSSProperties, type ReactNode } from "react";
import { CmsMotion } from "./CmsMotion";
import {
  isExternalUrl,
  safeImageUrl,
  safeUrl,
  sanitizeHtml,
  text,
} from "@/lib/cms/sanitize";
import type { CmsSectionSettings } from "@/lib/cms/types";

/* ------------------------------------------------------------------ */
/* Look & feel = this website's own design system (app/globals.css,     */
/* components/mainpageservices/*, components/services/*): dark surfaces,*/
/* white text at /60 for body copy, the blue `primary`, mono uppercase  */
/* eyebrows with a glowing dot, hairline white/10 panels with corner    */
/* brackets, grid-pattern CTA panel, square-cornered primary buttons.   */
/*                                                                      */
/* A few CSS vars switch per section background (settings.background)  */
/* so the same classes work on dark, muted, light and primary bands.    */
/* ------------------------------------------------------------------ */

type Tone = CSSProperties & Record<`--${string}`, string>;

const DARK: Tone = {
  "--cms-fg": "#ffffff",
  "--cms-fg-muted": "rgba(255,255,255,0.6)",
  "--cms-fg-subtle": "rgba(255,255,255,0.4)",
  "--cms-border": "rgba(255,255,255,0.1)",
  "--cms-border-strong": "rgba(255,255,255,0.2)",
  "--cms-card": "rgba(255,255,255,0.02)",
  "--cms-card-hover": "rgba(255,255,255,0.04)",
  "--cms-accent": "var(--primary)",
  "--cms-btn-bg": "var(--primary)",
  "--cms-btn-fg": "#000000",
  "--cms-btn-hover": "#ffffff",
};

const LIGHT: Tone = {
  "--cms-fg": "#020617",
  "--cms-fg-muted": "#475569",
  "--cms-fg-subtle": "#64748b",
  "--cms-border": "rgba(15,23,42,0.1)",
  "--cms-border-strong": "rgba(15,23,42,0.2)",
  "--cms-card": "#f8fafc",
  "--cms-card-hover": "#f1f5f9",
  "--cms-accent": "#2563eb",
  "--cms-btn-bg": "#020617",
  "--cms-btn-fg": "#ffffff",
  "--cms-btn-hover": "#2563eb",
};

const PRIMARY: Tone = {
  "--cms-fg": "#0a0a0a",
  "--cms-fg-muted": "rgba(0,0,0,0.7)",
  "--cms-fg-subtle": "rgba(0,0,0,0.5)",
  "--cms-border": "rgba(0,0,0,0.15)",
  "--cms-border-strong": "rgba(0,0,0,0.3)",
  "--cms-card": "rgba(255,255,255,0.15)",
  "--cms-card-hover": "rgba(255,255,255,0.25)",
  "--cms-accent": "#0a0a0a",
  "--cms-btn-bg": "#0a0a0a",
  "--cms-btn-fg": "#ffffff",
  "--cms-btn-hover": "#1f2937",
};

/** Default tone for a CMS page (set by CmsPage). */
export const PAGE_TONE: CSSProperties = DARK;

const BACKGROUND_STYLE: Record<string, CSSProperties> = {
  dark: { ...DARK, background: "var(--surface-0)" },
  muted: { ...DARK, background: "var(--surface-1)" },
  light: { ...LIGHT, background: "#ffffff" },
  primary: { ...PRIMARY, background: "var(--primary)" },
};

const WIDTH_CLASS: Record<string, string> = {
  narrow: "max-w-4xl",
  wide: "max-w-[1400px]",
  full: "max-w-none",
};

function clampPx(value: unknown, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(400, Math.round(n)));
}

/** Honors settings.width / paddingY / background / motion. */
export function SectionShell({
  type,
  id,
  settings,
  children,
  defaultPadding = [80, 80],
  defaultWidth = "wide",
}: {
  type: string;
  id?: string;
  settings?: CmsSectionSettings;
  children: ReactNode;
  defaultPadding?: [number, number];
  defaultWidth?: "narrow" | "wide" | "full";
}) {
  const s = settings ?? {};
  const padding = Array.isArray(s.paddingY) ? s.paddingY : [];
  const top = clampPx(padding[0], defaultPadding[0]);
  const bottom = clampPx(padding[1] ?? padding[0], defaultPadding[1]);
  const width =
    WIDTH_CLASS[String(s.width ?? defaultWidth)] ?? WIDTH_CLASS[defaultWidth];
  const bg = BACKGROUND_STYLE[String(s.background ?? "")] ?? {};
  const motion =
    typeof s.motion === "string" && s.motion !== "none" && s.motion !== "";

  const inner = <div className={`mx-auto w-full ${width}`}>{children}</div>;

  return (
    <section
      id={id ? `cms-${id.replace(/[^A-Za-z0-9_-]/g, "")}` : undefined}
      data-cms-section={type}
      className="relative overflow-hidden px-4 text-[var(--cms-fg)] sm:px-6 md:px-10"
      style={{
        // Scale the ERP's desktop padding down on small screens.
        paddingTop: `clamp(${Math.round(top * 0.6)}px, ${(top / 14.4).toFixed(2)}vw, ${top}px)`,
        paddingBottom: `clamp(${Math.round(bottom * 0.6)}px, ${(bottom / 14.4).toFixed(2)}vw, ${bottom}px)`,
        ...bg,
      }}
    >
      {motion ? (
        <CmsMotion motion={String(s.motion)}>{inner}</CmsMotion>
      ) : (
        inner
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Grid columns (settings.columns, literal classes for Tailwind)        */
/* ------------------------------------------------------------------ */

const COLUMN_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

export function gridClass(columns: unknown, fallback = 3): string {
  const n = Math.round(Number(columns));
  return COLUMN_CLASS[n >= 1 && n <= 6 ? n : fallback];
}

/* ------------------------------------------------------------------ */
/* Decorations shared with the site's service pages                     */
/* ------------------------------------------------------------------ */

/** Same as components/mainpageservices/Primitives CornerBrackets (server-safe copy). */
export function CornerBrackets({ active = false }: { active?: boolean }) {
  const side =
    "pointer-events-none absolute h-3 w-3 border-[var(--cms-accent)] transition-opacity duration-300";
  const dim = active ? "opacity-100" : "opacity-0 group-hover:opacity-100";
  return (
    <>
      <span aria-hidden className={`${side} ${dim} left-0 top-0 border-l-2 border-t-2`} />
      <span aria-hidden className={`${side} ${dim} right-0 top-0 border-r-2 border-t-2`} />
      <span aria-hidden className={`${side} ${dim} bottom-0 left-0 border-b-2 border-l-2`} />
      <span aria-hidden className={`${side} ${dim} bottom-0 right-0 border-b-2 border-r-2`} />
    </>
  );
}

export function GridPattern({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Section heading: mono eyebrow + bold heading + lead (site style)     */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--cms-accent)]">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--cms-accent)] shadow-[0_0_10px_var(--cms-accent)]" />
      <span>{children}</span>
    </div>
  );
}

export function SectionIntro({
  eyebrow,
  heading,
  description,
  center = false,
  as: Heading = "h2",
}: {
  eyebrow?: unknown;
  heading?: unknown;
  description?: unknown;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  const e = text(eyebrow);
  const h = text(heading);
  const d = text(description);
  if (!e && !h && !d) return null;

  return (
    <div
      className={`mb-14 ${center ? "mx-auto flex max-w-3xl flex-col items-center text-center" : "max-w-4xl"}`}
    >
      {e && <Eyebrow>{e}</Eyebrow>}
      {h && (
        <Heading
          className={`text-balance font-bold tracking-tight text-[var(--cms-fg)] ${
            Heading === "h1"
              ? "text-4xl sm:text-5xl md:text-6xl"
              : "text-3xl sm:text-4xl md:text-5xl"
          }`}
        >
          {h}
        </Heading>
      )}
      {d && (
        <p
          className={`mt-6 max-w-3xl whitespace-pre-line text-lg leading-relaxed text-[var(--cms-fg-muted)] ${center ? "mx-auto" : ""}`}
        >
          {d}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Links & buttons                                                      */
/* ------------------------------------------------------------------ */

/** Link that only renders as a link when the URL passes the A6 allow-list. */
export function CmsLink({
  url,
  newTab,
  className,
  children,
}: {
  url: unknown;
  newTab?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const href = safeUrl(url);
  if (!href) return <span className={className}>{children}</span>;

  const extra =
    newTab === true ? { target: "_blank", rel: "noopener noreferrer" } : {};
  if (isExternalUrl(href) || /^(mailto|tel):/i.test(href)) {
    return (
      <a href={href} className={className} {...extra}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...extra}>
      {children}
    </Link>
  );
}

// Same as the services CTA ("Get a Free Consultation") and its outline twin.
export const BUTTON_PRIMARY =
  "group inline-flex items-center gap-2 rounded-md bg-[var(--cms-btn-bg)] px-8 py-4 font-semibold text-[var(--cms-btn-fg)] transition-all duration-300 hover:bg-[var(--cms-btn-hover)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export const BUTTON_SECONDARY =
  "group inline-flex items-center gap-2 rounded-md border border-[var(--cms-border-strong)] px-8 py-4 font-semibold text-[var(--cms-fg)] transition-colors duration-300 hover:border-[var(--cms-accent)] hover:bg-[var(--cms-card-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function CmsButton({
  label,
  url,
  variant = "primary",
}: {
  label: unknown;
  url: unknown;
  variant?: "primary" | "secondary";
}) {
  const l = text(label);
  if (!l || !safeUrl(url)) return null;
  return (
    <CmsLink
      url={url}
      className={variant === "primary" ? BUTTON_PRIMARY : BUTTON_SECONDARY}
    >
      {l}
      {variant === "primary" && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </CmsLink>
  );
}

export function ButtonRow({
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
  buttonStyle,
  center = false,
}: {
  primaryLabel?: unknown;
  primaryUrl?: unknown;
  secondaryLabel?: unknown;
  secondaryUrl?: unknown;
  buttonStyle?: unknown;
  center?: boolean;
}) {
  const hasPrimary = text(primaryLabel) && safeUrl(primaryUrl);
  const hasSecondary = text(secondaryLabel) && safeUrl(secondaryUrl);
  if (!hasPrimary && !hasSecondary) return null;
  const outline = buttonStyle === "outline" || buttonStyle === "ghost";
  return (
    <div
      className={`mt-10 flex flex-wrap items-center gap-4 ${center ? "justify-center" : ""}`}
    >
      <CmsButton
        label={primaryLabel}
        url={primaryUrl}
        variant={outline ? "secondary" : "primary"}
      />
      <CmsButton
        label={secondaryLabel}
        url={secondaryUrl}
        variant="secondary"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Images, rich text, cards, icons                                      */
/* ------------------------------------------------------------------ */

export function CmsImage({
  src,
  alt,
  className,
  eager = false,
}: {
  src: unknown;
  alt?: unknown;
  className?: string;
  eager?: boolean;
}) {
  const url = safeImageUrl(src);
  if (!url) return null;
  // Plain <img>: CMS images come from arbitrary hosts (next/image would need
  // every host in remotePatterns).
  return (
    <img
      src={url}
      alt={text(alt)}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}

// Typography of the site's long-form content (dark article style).
const PROSE =
  "text-base leading-relaxed text-[var(--cms-fg-muted)] md:text-lg " +
  "[&_a]:font-semibold [&_a]:text-[var(--cms-accent)] [&_a:hover]:underline [&_strong]:font-semibold [&_strong]:text-[var(--cms-fg)] " +
  "[&_h1]:mt-12 [&_h1]:mb-4 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-[var(--cms-fg)] " +
  "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[var(--cms-fg)] " +
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-[var(--cms-fg)] " +
  "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-[var(--cms-fg)] " +
  "[&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_li]:marker:text-[var(--cms-accent)] " +
  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--cms-accent)] [&_blockquote]:bg-[var(--cms-card)] [&_blockquote]:p-6 [&_blockquote]:text-[var(--cms-fg)] " +
  "[&_img]:my-8 [&_img]:border [&_img]:border-[var(--cms-border)] [&_hr]:my-10 [&_hr]:border-[var(--cms-border)] " +
  "[&_code]:rounded [&_code]:bg-[var(--cms-card-hover)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] " +
  "[&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[var(--cms-border)] [&_pre]:bg-surface-0 [&_pre]:p-6 [&_pre]:text-white " +
  "[&_table]:my-6 [&_table]:w-full [&_table]:border [&_table]:border-[var(--cms-border)] [&_th]:bg-[var(--cms-card-hover)] [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[var(--cms-fg)] [&_td]:border-t [&_td]:border-[var(--cms-border)] [&_td]:p-3";

/** The ONLY place CMS HTML reaches the DOM — always through the A6 sanitizer. */
export function SafeHtml({
  html,
  className = "",
}: {
  html: unknown;
  className?: string;
}) {
  const clean = sanitizeHtml(html);
  if (!clean) return null;
  return (
    <div
      className={`${PROSE} ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

// The site's panel: hairline border, faint fill, corner brackets on hover.
export const CARD =
  "group relative border border-[var(--cms-border)] bg-[var(--cms-card)] transition-colors duration-300 hover:border-[var(--cms-border-strong)] hover:bg-[var(--cms-card-hover)]";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${CARD} p-7 ${className}`}>
      <CornerBrackets />
      {children}
    </div>
  );
}

export const CARD_TITLE =
  "text-xl font-semibold tracking-tight text-[var(--cms-fg)]";

export const CARD_BODY = "mt-3 text-sm leading-relaxed text-[var(--cms-fg-muted)]";

export const INDEX_LABEL = "font-mono text-xs text-[var(--cms-accent)]";

function lucideIcon(name: string): LucideIcon | undefined {
  if (!/^[a-z][a-z0-9-]*$/i.test(name)) return undefined;
  const pascal = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return (icons as Record<string, LucideIcon>)[pascal];
}

export function CmsIcon({ icon }: { icon: unknown }) {
  const value = text(icon).trim();
  if (!value) return null;
  const box =
    "mb-6 grid h-12 w-12 place-items-center border border-[var(--cms-border)] bg-[var(--cms-card-hover)] text-[var(--cms-accent)]";

  if (safeImageUrl(value) && /[/.]/.test(value)) {
    return (
      <div className={box}>
        <CmsImage src={value} alt="" className="h-7 w-7 object-contain" />
      </div>
    );
  }
  // A static lookup in lucide's icon map (not a component defined here).
  const lucide = lucideIcon(value);
  if (lucide) {
    return (
      <div className={box}>{createElement(lucide, { className: "h-5 w-5" })}</div>
    );
  }
  // Emoji / short glyphs render as text; anything longer gets a monogram.
  const glyph = [...value].length <= 3 ? value : value.charAt(0).toUpperCase();
  return <div className={`${box} text-lg font-semibold`}>{glyph}</div>;
}

export function asItems(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? value.filter(
        (v): v is Record<string, unknown> => !!v && typeof v === "object",
      )
    : [];
}
