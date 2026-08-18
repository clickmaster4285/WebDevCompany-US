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
        "transition-colors hover:bg-accent/50",
        "sm:w-[380px]",
        className
      )}
    >
      <p className="text-base leading-relaxed text-foreground sm:text-lg">
        &ldquo;{text}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-background">
          <Image
            src={author.avatar}
            alt={`${author.name} profile`}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{author.name}</span>
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

const defaultTestimonials: Array<{
  author: TestimonialAuthor
  text: string
  href?: string
}> = [
  {
    author: {
      name: "Sarah Jenkins",
      role: "CTO, NovaTech SaaS",
      avatar: "/images/clients/sarah.jpeg",
    },
    text: "ClickMasters integrated custom AI tools into our SaaS platform seamlessly. The code quality and product strategy they brought to the table were exactly what we needed to scale.",
    href: "https://x.com",
  },
  {
    author: {
      name: "Marcus Vance",
      role: "Founder, Loom & Thread",
      avatar: "/images/clients/marcus.jpeg",
    },
    text: "Our new online store feels effortless for our customers and is built to last. Conversion rates are up 40% since the UI/UX redesign by the ClickMasters team. Highly recommend!",
    href: "https://x.com",
  },
  {
    author: {
      name: "Elena Rodriguez",
      role: "Product Lead, FinFlow",
      avatar: "/images/clients/elena.jpeg",
    },
    text: "Finding a US-based web dev team that actually understands product strategy is rare. ClickMasters delivered our custom web app ahead of schedule and it performs flawlessly.",
    href: "https://x.com",
  },
  {
    author: {
      name: "David Kim",
      role: "CEO, Orbit Media",
      avatar: "/images/clients/david.jpeg",
    },
    text: "They bring strategy, design, and code together in one place. Working with ClickMasters felt like having an elite in-house team rather than an external agency. 10/10.",
    href: "https://x.com",
  },
  {
    author: {
      name: "Chloe Bennett",
      role: "Founder, EcoCart",
      avatar: "/images/clients/chloe.jpeg",
    },
    text: "The attention to how every product looks, feels, and performs is real. ClickMasters built our eCommerce platform from the ground up and it's an absolute joy to use.",
    href: "https://x.com",
  },
]

// ── Main Component ──────────────────────────────────────────────────────────
interface TestimonialsSectionProps {
  title?: string
  description?: string
  testimonials?: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({
  title = defaultTitle,
  description = defaultDescription,
  testimonials = defaultTestimonials,
  className,
}: TestimonialsSectionProps) {
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
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={`set-1-${index}`} {...testimonial} />
                ))}
              </div>

              {/* SET 2 */}
              <div className="flex shrink-0 gap-[var(--gap)] mr-[var(--gap)]">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={`set-2-${index}`} {...testimonial} />
                ))}
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