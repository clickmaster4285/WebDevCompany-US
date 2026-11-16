import { cn } from "@/lib/utils"
import Image from "next/image"

// ── Interfaces ──────────────────────────────────────────────────────────────
interface TestimonialAuthor {
  name: string
  role: string
  avatar: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

// ── Inline TestimonialCard Component ─────────────────────────────────────────
export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const CardWrapper = href ? "a" : "div"
  const cardProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <CardWrapper
      {...cardProps}
      className={cn(
        "flex h-auto w-[320px] shrink-0 flex-col justify-between gap-6",
        "rounded-2xl border border-border bg-card p-6 shadow-sm",
        "transition-all duration-300 ease-out hover:bg-accent/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
        "sm:w-[380px]",
        className
      )}
    >
      <p className="text-base leading-relaxed text-foreground sm:text-lg">
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-background transition-all duration-300 ease-out hover:ring-primary/50 hover:scale-110">
          <Image
            src={author.avatar}
            alt={`${author.name} profile`}
            width={40}
            height={40}
            sizes="40px"
            quality={60}
            className="h-10 w-10 object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground transition-colors duration-300 ease-out hover:text-primary">{author.name}</span>
          <span className="text-xs text-muted-foreground">{author.role}</span>
        </div>
      </div>
    </CardWrapper>
  )
}

// ── Default Content ─────────────────────────────────────────────────────────
const defaultTitle = "Loved by ambitious brands"
const defaultDescription =
  "From custom web apps to AI-powered SaaS platforms, we help founders and teams build digital products that look, feel, and perform beautifully."

type TestimonialItem = {
  id: string
  author: TestimonialAuthor
  text: string
  href?: string
}

// No approved homepage quotes are on file. Do not add names or results here
// until the business confirms the client and the wording.
const defaultTestimonials: TestimonialItem[] = []

function uniqueTestimonials(items: TestimonialItem[]) {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (!item.id || seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

// ── Main Component ──────────────────────────────────────────────────────────
interface TestimonialsSectionProps {
  title?: string
  description?: string
  testimonials?: TestimonialItem[]
  className?: string
}

export function TestimonialsSection({
  title = defaultTitle,
  description = defaultDescription,
  testimonials = defaultTestimonials,
  className,
}: TestimonialsSectionProps) {
  const unique = uniqueTestimonials(testimonials)
  if (unique.length === 0) return null

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "px-0 py-12 sm:py-24 md:py-32",
        className
      )}
    >
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="max-w-[600px] text-base font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        {/* ── FIXED MARQUEE ── */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex w-full overflow-hidden p-2 [--gap:1.5rem] [--duration:40s]">
            
            {/* 
              The Track: 
              1. `w-max` ensures the width is exactly the content width.
              2. We render exactly 2 Sets.
              3. We add `mr-[var(--gap)]` to the set wrapper so the gap is included in the "Set Width".
              4. CSS translates by -50%, which perfectly moves exactly 1 Set + 1 Gap.
            */}
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              
              {/* SET 1 */}
              <div className="flex shrink-0 gap-[var(--gap)] mr-[var(--gap)]">
                {unique.map((testimonial) => {
                  const { id, ...card } = testimonial
                  return <TestimonialCard key={id} {...card} />
                })}
              </div>

              {/* Visual clone for the marquee. Hidden from assistive tech and not a second testimonial. */}
              <div className="flex shrink-0 gap-[var(--gap)] mr-[var(--gap)]" aria-hidden="true">
                {unique.map((testimonial) => {
                  const { id, ...card } = testimonial
                  return <TestimonialCard key={`${id}-clone`} {...card} />
                })}
              </div>

            </div>
          </div>

          {/* Edge Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  )
}

export { TestimonialsSection as Testimonials }