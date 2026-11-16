import type { ReactNode } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone, Quote } from "lucide-react";
import { safeUrl, text } from "@/lib/cms/sanitize";
import type { CmsPost, CmsSection } from "@/lib/cms/types";
import { CmsFaq } from "./CmsFaq";
import {
  BUTTON_PRIMARY,
  ButtonRow,
  CARD,
  CARD_BODY,
  CARD_TITLE,
  Card,
  CmsButton,
  CmsIcon,
  CmsImage,
  CmsLink,
  CornerBrackets,
  Eyebrow,
  GridPattern,
  INDEX_LABEL,
  SafeHtml,
  SectionIntro,
  SectionShell,
  asItems,
  gridClass,
} from "./primitives";

// Every A4 section type, rendered with this website's own visual language
// (see primitives.tsx). Unknown types never reach here (CmsSectionRenderer).

export type SectionProps = {
  section: CmsSection;
  posts: CmsPost[];
  isFirst: boolean;
};

type C = Record<string, unknown>;

function shell(
  props: SectionProps,
  children: ReactNode,
  opts: Partial<Parameters<typeof SectionShell>[0]> = {},
) {
  return (
    <SectionShell
      type={props.section.type ?? ""}
      id={props.section.id}
      settings={props.section.settings}
      {...opts}
    >
      {children}
    </SectionShell>
  );
}

const layoutOf = (p: SectionProps) => String(p.section.settings?.layout ?? "");
const contentOf = (p: SectionProps): C => p.section.content ?? {};
const columnsOf = (p: SectionProps) => p.section.settings?.columns;

const MEDIA =
  "relative w-full overflow-hidden border border-[var(--cms-border)] bg-surface-1 shadow-2xl shadow-black/50";
const ARROW_LINK =
  "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cms-accent)]";

/* ---------------------------- chrome ---------------------------- */

// The site's own Nav and Footer are rendered by the route layout around every
// created page, so ERP header/footer sections add nothing on their own (a
// second menu bar inside the page would duplicate the site chrome). ERP
// header/footer *navigation* (A1) is merged into Nav/Footer instead.
function SiteChromeSection(): ReactNode {
  return null;
}

export const SITE_CHROME_TYPES = new Set(["header", "footer"]);

/* ----------------------------- hero ----------------------------- */

// Same structure as the services hero: mono eyebrow, bold balanced H1, /70
// lead, bordered media panel with corner brackets and a grid overlay.
function HeroSection(p: SectionProps) {
  const c = contentOf(p);
  const hasImage = !!c.image;
  const split = hasImage && layoutOf(p) !== "center" && layoutOf(p) !== "stacked";
  const center = !split && layoutOf(p) !== "left";
  const Heading = p.isFirst ? "h1" : "h2";

  const copy = (
    <div className={center ? "mx-auto flex max-w-4xl flex-col items-center text-center" : ""}>
      {text(c.eyebrow) && <Eyebrow>{text(c.eyebrow)}</Eyebrow>}
      {text(c.heading) && (
        <Heading className="mb-8 max-w-4xl text-balance text-4xl font-bold tracking-tight text-[var(--cms-fg)] sm:text-5xl md:text-6xl">
          {text(c.heading)}
        </Heading>
      )}
      {text(c.description) && (
        <p className="max-w-2xl whitespace-pre-line text-lg leading-relaxed text-[var(--cms-fg-muted)]">
          {text(c.description)}
        </p>
      )}
      <ButtonRow {...c} center={center} />
      {text(c.meta) && (
        <div className="mt-10 border-t border-[var(--cms-border)] pt-6 font-mono text-xs uppercase tracking-widest text-[var(--cms-fg-subtle)]">
          {text(c.meta)}
        </div>
      )}
    </div>
  );

  const media = hasImage ? (
    <div className={`group ${MEDIA} ${split ? "aspect-[4/3]" : "mt-16 aspect-[16/9]"}`}>
      <CmsImage
        src={c.image}
        alt={c.heading}
        eager={p.isFirst}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
      <CornerBrackets active />
    </div>
  ) : null;

  return shell(
    p,
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {split ? (
        <div className="relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {copy}
          {media}
        </div>
      ) : (
        <div className="relative">
          {copy}
          {media}
        </div>
      )}
    </>,
    // A first hero clears the fixed site Nav.
    { defaultPadding: p.isFirst ? [160, 96] : [96, 96] },
  );
}

/* ----------------------------- text ----------------------------- */

function TextSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      {text(c.body) && (
        <div className="whitespace-pre-line text-lg leading-relaxed text-[var(--cms-fg-muted)]">
          {text(c.body)}
        </div>
      )}
    </>,
    { defaultWidth: "narrow" },
  );
}

function RichTextSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <SafeHtml html={c.bodyHtml} />
    </>,
    { defaultWidth: "narrow" },
  );
}

function HtmlSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(p, <SafeHtml html={c.code} />);
}

function ImageSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <figure>
      <div className={`group ${MEDIA}`}>
        <CmsImage
          src={c.image}
          alt={c.alt ?? c.caption}
          className="w-full object-cover"
        />
        <CornerBrackets />
      </div>
      {text(c.caption) && (
        <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-[var(--cms-fg-subtle)]">
          {text(c.caption)}
        </figcaption>
      )}
    </figure>,
  );
}

function ImageTextSection(p: SectionProps) {
  const c = contentOf(p);
  const reverse = /left|reverse/i.test(layoutOf(p));
  return shell(
    p,
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <SectionIntro eyebrow={c.eyebrow} heading={c.heading} />
        <SafeHtml html={c.bodyHtml} />
        <ButtonRow primaryLabel={c.primaryLabel} primaryUrl={c.primaryUrl} />
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        {c.image ? (
          <div className={`group ${MEDIA} aspect-[4/3]`}>
            <CmsImage
              src={c.image}
              alt={c.alt ?? c.heading}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <CornerBrackets active />
          </div>
        ) : null}
      </div>
    </div>,
  );
}

function videoEmbed(
  url: string,
): { kind: "iframe" | "video"; src: string } | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be")
      return {
        kind: "iframe",
        src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(u.pathname.slice(1))}`,
      };
    if (host.endsWith("youtube.com") || host === "youtube-nocookie.com") {
      const id =
        u.searchParams.get("v") ?? u.pathname.split("/").filter(Boolean).pop();
      if (id && /^[\w-]{6,20}$/.test(id))
        return {
          kind: "iframe",
          src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`,
        };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id && /^\d+$/.test(id))
        return { kind: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
    if (/\.(mp4|webm|ogg)$/i.test(u.pathname))
      return { kind: "video", src: u.toString() };
  } catch {
    // Relative video file.
    if (url.startsWith("/") && /\.(mp4|webm|ogg)$/i.test(url))
      return { kind: "video", src: url };
  }
  return null;
}

function VideoSection(p: SectionProps) {
  const c = contentOf(p);
  const url = safeUrl(c.videoUrl);
  const embed = url ? videoEmbed(url) : null;
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} center />
      {embed && (
        <div className={`${MEDIA} aspect-video`}>
          {embed.kind === "iframe" ? (
            <iframe
              src={embed.src}
              title={text(c.heading) || "Video"}
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <video
              src={embed.src}
              controls
              preload="metadata"
              className="h-full w-full"
            />
          )}
          <CornerBrackets active />
        </div>
      )}
    </>,
  );
}

/* ------------------------- list sections ------------------------- */

function CardsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-6 ${gridClass(columnsOf(p), 3)}`}>
        {asItems(c.items).map((item, i) => {
          const body = (
            <div className={`${CARD} flex h-full flex-col overflow-hidden`}>
              <CornerBrackets />
              {item.image ? (
                <div className="aspect-[4/3] w-full overflow-hidden border-b border-[var(--cms-border)]">
                  <CmsImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-7">
                <h3 className={CARD_TITLE}>{text(item.title)}</h3>
                {text(item.description) && (
                  <p className={`${CARD_BODY} flex-1`}>
                    {text(item.description)}
                  </p>
                )}
                {text(item.linkLabel) && safeUrl(item.url) && (
                  <div className={ARROW_LINK}>
                    {text(item.linkLabel)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </div>
          );
          return safeUrl(item.url) ? (
            <CmsLink key={i} url={item.url} className="block">
              {body}
            </CmsLink>
          ) : (
            <div key={i}>{body}</div>
          );
        })}
      </div>
    </>,
  );
}

function FeaturesSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-6 ${gridClass(columnsOf(p), 3)}`}>
        {asItems(c.items).map((item, i) => (
          <Card key={i} className="h-full">
            <CmsIcon icon={item.icon} />
            {item.image ? (
              <CmsImage
                src={item.image}
                alt={item.title}
                className="mb-6 w-full border border-[var(--cms-border)] object-cover"
              />
            ) : null}
            <h3 className={CARD_TITLE}>{text(item.title)}</h3>
            {text(item.description) && (
              <p className={CARD_BODY}>{text(item.description)}</p>
            )}
          </Card>
        ))}
      </div>
    </>,
  );
}

function ServicesSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-6 ${gridClass(columnsOf(p), 3)}`}>
        {asItems(c.items).map((item, i) => {
          const linked = !!safeUrl(item.url);
          const body = (
            <Card className="h-full">
              <CmsIcon icon={item.icon} />
              <h3 className={CARD_TITLE}>{text(item.title)}</h3>
              {text(item.description) && (
                <p className={CARD_BODY}>{text(item.description)}</p>
              )}
              {linked && (
                <div className={ARROW_LINK}>
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Card>
          );
          return linked ? (
            <CmsLink key={i} url={item.url} className="block">
              {body}
            </CmsLink>
          ) : (
            <div key={i}>{body}</div>
          );
        })}
      </div>
    </>,
  );
}

function BenefitsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <ul className={`grid gap-4 ${gridClass(columnsOf(p), 2)}`}>
        {asItems(c.items).map((item, i) => (
          <li
            key={i}
            className={`${CARD} flex items-start gap-4 p-6`}
          >
            <CornerBrackets />
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border border-[var(--cms-border)] text-[var(--cms-accent)]">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-[var(--cms-fg)]">
                {text(item.title)}
              </h3>
              {text(item.description) && (
                <p className="mt-1 text-sm leading-relaxed text-[var(--cms-fg-muted)]">
                  {text(item.description)}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>,
  );
}

function ProcessSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <ol className={`grid gap-6 ${gridClass(columnsOf(p), 4)}`}>
        {asItems(c.items).map((item, i) => (
          <li key={i}>
            <Card className="h-full">
              <div className={INDEX_LABEL}>
                STEP {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className={`mt-4 ${CARD_TITLE}`}>{text(item.title)}</h3>
              {text(item.description) && (
                <p className={CARD_BODY}>{text(item.description)}</p>
              )}
            </Card>
          </li>
        ))}
      </ol>
    </>,
  );
}

function TimelineSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <ol className="relative space-y-10 border-l border-[var(--cms-border-strong)] pl-8">
        {asItems(c.items).map((item, i) => (
          <li key={i} className="relative">
            <span
              aria-hidden
              className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--cms-accent)] shadow-[0_0_10px_var(--cms-accent)]"
            />
            {text(item.date) && (
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--cms-accent)]">
                {text(item.date)}
              </div>
            )}
            <h3 className="mt-2 text-xl font-semibold text-[var(--cms-fg)]">
              {text(item.title)}
            </h3>
            {text(item.description) && (
              <p className="mt-2 leading-relaxed text-[var(--cms-fg-muted)]">
                {text(item.description)}
              </p>
            )}
          </li>
        ))}
      </ol>
    </>,
    { defaultWidth: "narrow" },
  );
}

function TestimonialsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} center />
      <div className={`grid gap-6 ${gridClass(columnsOf(p), 3)}`}>
        {asItems(c.items).map((item, i) => (
          <Card key={i} className="flex h-full flex-col">
            <Quote className="h-7 w-7 text-[var(--cms-accent)]" />
            <blockquote className="mt-4 flex-1 leading-relaxed text-[var(--cms-fg-muted)]">
              “{text(item.quote)}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--cms-border)] pt-5">
              {item.image ? (
                <CmsImage
                  src={item.image}
                  alt={item.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--cms-border)] font-semibold text-[var(--cms-fg)]">
                  {text(item.name).charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <div className="font-semibold text-[var(--cms-fg)]">
                  {text(item.name)}
                </div>
                {text(item.role) && (
                  <div className="text-xs text-[var(--cms-fg-subtle)]">
                    {text(item.role)}
                  </div>
                )}
              </div>
            </figcaption>
          </Card>
        ))}
      </div>
    </>,
  );
}

function TeamSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-6 ${gridClass(columnsOf(p), 4)}`}>
        {asItems(c.items).map((item, i) => (
          <div key={i} className={`${CARD} overflow-hidden`}>
            <CornerBrackets />
            {item.image ? (
              <div className="aspect-square w-full overflow-hidden border-b border-[var(--cms-border)]">
                <CmsImage
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ) : null}
            <div className="p-6">
              <h3 className={CARD_TITLE}>{text(item.name)}</h3>
              {text(item.role) && (
                <div className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--cms-accent)]">
                  {text(item.role)}
                </div>
              )}
              {text(item.bio) && <p className={CARD_BODY}>{text(item.bio)}</p>}
            </div>
          </div>
        ))}
      </div>
    </>,
  );
}

function featureList(value: unknown): string[] {
  if (Array.isArray(value))
    return value
      .map((v) =>
        text(
          typeof v === "object" && v ? ((v as C).label ?? (v as C).title) : v,
        ),
      )
      .filter(Boolean);
  return text(value)
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function PricingSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} center />
      <div className={`grid gap-6 ${gridClass(columnsOf(p), 3)}`}>
        {asItems(c.items).map((item, i) => {
          const featured = item.featured === true;
          return (
            <div
              key={i}
              className={`${CARD} flex flex-col p-8 ${
                featured ? "border-[var(--cms-accent)]" : ""
              }`}
            >
              <CornerBrackets active={featured} />
              {featured && (
                <span className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-widest text-[var(--cms-accent)]">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold text-[var(--cms-fg)]">
                {text(item.name)}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-[var(--cms-fg)]">
                  {text(item.price)}
                </span>
                {text(item.period) && (
                  <span className="text-sm text-[var(--cms-fg-subtle)]">
                    /{text(item.period)}
                  </span>
                )}
              </div>
              {text(item.description) && (
                <p className={CARD_BODY}>{text(item.description)}</p>
              )}
              <ul className="mt-6 flex-1 space-y-3 text-sm text-[var(--cms-fg-muted)]">
                {featureList(item.features).map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cms-accent)]"
                      strokeWidth={3}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CmsButton
                  label={item.buttonLabel}
                  url={item.buttonUrl}
                  variant={featured ? "primary" : "secondary"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>,
  );
}

function FaqSection(p: SectionProps) {
  const c = contentOf(p);
  const faqs = asItems(c.items)
    .map((item) => ({
      question: text(item.question),
      answer: text(item.answer),
    }))
    .filter((f) => f.question);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      {faqs.length > 0 && <CmsFaq faqs={faqs} />}
    </>,
    { defaultWidth: "narrow" },
  );
}

function GallerySection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <div className={`grid gap-5 ${gridClass(columnsOf(p), 3)}`}>
        {asItems(c.items).map((item, i) => (
          <figure key={i} className="group">
            <div className={`${MEDIA} aspect-[4/3]`}>
              <CmsImage
                src={item.image}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <CornerBrackets />
            </div>
            {text(item.caption) && (
              <figcaption className="mt-3 text-sm text-[var(--cms-fg-muted)]">
                {text(item.caption)}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </>,
  );
}

function StatsSection(p: SectionProps) {
  const c = contentOf(p);
  const items = asItems(c.items);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <dl
        className={`grid border-l border-t border-[var(--cms-border)] ${gridClass(columnsOf(p), Math.min(Math.max(items.length, 1), 4))}`}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col border-b border-r border-[var(--cms-border)] p-8"
          >
            <dt className="order-2 mt-2 font-mono text-xs uppercase tracking-widest text-[var(--cms-fg-subtle)]">
              {text(item.label)}
            </dt>
            <dd className="text-4xl font-bold tracking-tight text-[var(--cms-fg)] md:text-5xl">
              {text(item.value)}
            </dd>
          </div>
        ))}
      </dl>
    </>,
  );
}

function LogosSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      {text(c.heading) && (
        <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-[var(--cms-fg-subtle)]">
          {text(c.heading)}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {asItems(c.items).map((item, i) => {
          const logo = (
            <CmsImage
              src={item.image}
              alt={item.name}
              className="h-10 w-auto max-w-[160px] object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          );
          return safeUrl(item.url) ? (
            <CmsLink key={i} url={item.url} newTab>
              {logo}
            </CmsLink>
          ) : (
            <div key={i}>{logo}</div>
          );
        })}
      </div>
    </>,
    { defaultPadding: [56, 56] },
  );
}

/* ---------------------------- actions ---------------------------- */

// Same bordered grid-pattern panel as the services CTASection.
function CtaSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <div className="relative mx-auto max-w-3xl overflow-hidden border border-[var(--cms-border)] bg-[var(--cms-card)] px-6 py-16 text-center sm:px-14">
      <GridPattern />
      <CornerBrackets active />
      {text(c.heading) && (
        <h2 className="relative mx-auto mb-6 max-w-3xl text-balance text-3xl font-bold text-[var(--cms-fg)] md:text-5xl">
          {text(c.heading)}
        </h2>
      )}
      {text(c.description) && (
        <p className="relative mx-auto mb-10 max-w-xl whitespace-pre-line text-[var(--cms-fg-muted)]">
          {text(c.description)}
        </p>
      )}
      <div className="relative flex flex-wrap items-center justify-center gap-4">
        <CmsButton
          label={c.primaryLabel}
          url={c.primaryUrl}
          variant={
            c.buttonStyle === "outline" || c.buttonStyle === "ghost"
              ? "secondary"
              : "primary"
          }
        />
        <CmsButton
          label={c.secondaryLabel}
          url={c.secondaryUrl}
          variant="secondary"
        />
      </div>
    </div>,
    { defaultPadding: [96, 96] },
  );
}

const INPUT =
  "h-12 w-full rounded-md border border-[var(--cms-border)] bg-[var(--cms-card)] px-4 text-sm text-[var(--cms-fg)] placeholder:text-[var(--cms-fg-subtle)] transition-colors focus:border-[var(--cms-accent)] focus:outline-none";

const TILE = `${CARD} flex items-start gap-4 p-5`;
const TILE_ICON =
  "grid h-10 w-10 shrink-0 place-items-center border border-[var(--cms-border)] text-[var(--cms-accent)]";
const TILE_LABEL =
  "block font-mono text-xs uppercase tracking-[0.3em] text-[var(--cms-fg-subtle)]";
const TILE_VALUE = "mt-1 block font-semibold text-[var(--cms-fg)]";

function ContactSection(p: SectionProps) {
  const c = contentOf(p);
  const action = safeUrl(c.formAction);
  const email = text(c.email);
  const phone = text(c.phone);
  const address = text(c.address);
  return shell(
    p,
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <SectionIntro heading={c.heading} description={c.description} />
        <div className="space-y-3">
          {email && (
            <CmsLink url={`mailto:${email}`} className={TILE}>
              <span className={TILE_ICON}>
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className={TILE_LABEL}>Email</span>
                <span className={`${TILE_VALUE} break-all`}>{email}</span>
              </span>
            </CmsLink>
          )}
          {phone && (
            <CmsLink
              url={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className={TILE}
            >
              <span className={TILE_ICON}>
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className={TILE_LABEL}>Phone</span>
                <span className={TILE_VALUE}>{phone}</span>
              </span>
            </CmsLink>
          )}
          {address && (
            <div className={TILE}>
              <span className={TILE_ICON}>
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className={TILE_LABEL}>Address</span>
                <span className={`${TILE_VALUE} whitespace-pre-line`}>
                  {address}
                </span>
              </span>
            </div>
          )}
        </div>
        {c.image ? (
          <CmsImage
            src={c.image}
            alt={c.heading}
            className="mt-8 w-full border border-[var(--cms-border)] object-cover"
          />
        ) : null}
      </div>
      {action ? (
        <form
          action={action}
          method="post"
          className="relative space-y-4 border border-[var(--cms-border)] bg-[var(--cms-card)] p-7 md:p-8"
        >
          <CornerBrackets active />
          <input
            name="name"
            required
            placeholder="Name"
            className={INPUT}
            autoComplete="name"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className={INPUT}
            autoComplete="email"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            className={INPUT}
            autoComplete="tel"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project"
            className={`${INPUT} h-auto py-3`}
          />
          <button type="submit" className={BUTTON_PRIMARY}>
            {text(c.buttonLabel) || "Send message"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      ) : (
        <div className="flex items-start">
          <CmsButton
            label={text(c.buttonLabel) || "Start a project"}
            url="/contact"
          />
        </div>
      )}
    </div>,
  );
}

function NewsletterSection(p: SectionProps) {
  const c = contentOf(p);
  const action = safeUrl(c.formAction);
  return shell(
    p,
    <div className="mx-auto max-w-2xl text-center">
      <SectionIntro heading={c.heading} description={c.description} center />
      {action && (
        <form
          action={action}
          method="post"
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={INPUT}
            autoComplete="email"
          />
          <button type="submit" className={`${BUTTON_PRIMARY} shrink-0 justify-center py-3`}>
            {text(c.buttonLabel) || "Subscribe"}
          </button>
        </form>
      )}
    </div>,
    { defaultWidth: "narrow" },
  );
}

/* ----------------------------- posts ----------------------------- */

type PostCard = {
  title: string;
  description: string;
  image?: unknown;
  url?: unknown;
  meta?: string;
};

function resolvePosts(c: C, posts: CmsPost[]): PostCard[] {
  const limit = Math.max(1, Math.min(48, Math.round(Number(c.limit)) || 6));
  if (c.mode === "manual") {
    return asItems(c.items)
      .slice(0, limit)
      .map((i) => ({
        title: text(i.title),
        description: text(i.description),
        image: i.image,
        url: i.url,
      }));
  }
  const type = text(c.pageType);
  return posts
    .filter((post) => !type || !post.pageType || post.pageType === type)
    .slice(0, limit)
    .map((post) => ({
      title: text(post.title),
      description: text(post.excerpt),
      image: post.image,
      url: post.url,
      meta: post.pageType,
    }));
}

function PostsGrid({
  items,
  columns,
}: {
  items: PostCard[];
  columns: unknown;
}) {
  if (items.length === 0) return null;
  return (
    <div className={`grid gap-6 ${gridClass(columns, 3)}`}>
      {items.map((post, i) => (
        <CmsLink key={i} url={post.url} className="block">
          <article className={`${CARD} flex h-full flex-col overflow-hidden`}>
            <CornerBrackets />
            {post.image ? (
              <div className="aspect-[16/10] w-full overflow-hidden border-b border-[var(--cms-border)]">
                <CmsImage
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-6">
              {post.meta && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--cms-accent)]">
                  {post.meta}
                </span>
              )}
              <h3 className={`mt-3 line-clamp-2 ${CARD_TITLE}`}>
                {post.title}
              </h3>
              {post.description && (
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-[var(--cms-fg-muted)]">
                  {post.description}
                </p>
              )}
              <div className="mt-5 flex items-center justify-between border-t border-[var(--cms-border)] pt-4 text-sm font-semibold text-[var(--cms-accent)]">
                Read more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        </CmsLink>
      ))}
    </div>
  );
}

function BlogPostsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} description={c.description} />
      <PostsGrid items={resolvePosts(c, p.posts)} columns={columnsOf(p)} />
    </>,
  );
}

function RelatedPostsSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <PostsGrid items={resolvePosts(c, p.posts)} columns={columnsOf(p)} />
    </>,
  );
}

function AuthorSection(p: SectionProps) {
  const c = contentOf(p);
  return shell(
    p,
    <>
      <SectionIntro heading={c.heading} />
      <div className={`${CARD} flex flex-col gap-6 p-7 sm:flex-row md:p-8`}>
        <CornerBrackets active />
        {c.image ? (
          <CmsImage
            src={c.image}
            alt={c.name}
            className="h-24 w-24 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[var(--cms-border)] text-2xl font-semibold text-[var(--cms-fg)]">
            {text(c.name).charAt(0).toUpperCase()}
          </span>
        )}
        <div>
          <div className="text-xl font-semibold text-[var(--cms-fg)]">
            {text(c.name)}
          </div>
          {text(c.role) && (
            <div className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--cms-accent)]">
              {text(c.role)}
            </div>
          )}
          <SafeHtml html={c.bioHtml} className="mt-3 text-sm md:text-base" />
        </div>
      </div>
    </>,
    { defaultWidth: "narrow" },
  );
}

/* ---------------------------- registry ---------------------------- */

export const SECTION_COMPONENTS: Record<
  string,
  (props: SectionProps) => ReactNode
> = {
  header: SiteChromeSection,
  footer: SiteChromeSection,
  hero: HeroSection,
  text: TextSection,
  richText: RichTextSection,
  customContent: RichTextSection,
  html: HtmlSection,
  image: ImageSection,
  imageText: ImageTextSection,
  video: VideoSection,
  cards: CardsSection,
  features: FeaturesSection,
  services: ServicesSection,
  benefits: BenefitsSection,
  process: ProcessSection,
  timeline: TimelineSection,
  testimonials: TestimonialsSection,
  team: TeamSection,
  pricing: PricingSection,
  faq: FaqSection,
  gallery: GallerySection,
  stats: StatsSection,
  logos: LogosSection,
  cta: CtaSection,
  contact: ContactSection,
  newsletter: NewsletterSection,
  blogPosts: BlogPostsSection,
  relatedPosts: RelatedPostsSection,
  author: AuthorSection,
};
