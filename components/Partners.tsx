const PARTNERS = [
  { name: "Google", href: "https://developers.google.com/" },
  { name: "HubSpot", href: "https://www.hubspot.com/" },
  { name: "Shopify", href: "https://www.shopify.com/" },
  { name: "Stripe", href: "https://stripe.com/" },
  { name: "Vercel", href: "https://vercel.com/" },
  { name: "Netlify", href: "https://www.netlify.com/" },
  { name: "Cloudflare", href: "https://www.cloudflare.com/" },
  { name: "DigitalOcean", href: "https://www.digitalocean.com/" },
  { name: "Contentful", href: "https://www.contentful.com/" },
  { name: "Sanity", href: "https://www.sanity.io/" },
  { name: "Storyblok", href: "https://www.storyblok.com/" },
  { name: "Algolia", href: "https://www.algolia.com/" },
  { name: "Supabase", href: "https://supabase.com/" },
];

export function Partners() {
  const partnersRow = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative z-10 bg-black px-4 py-6 sm:px-6" aria-label="Tools we build with">
      <div className="layout-container">
        <p className="pb-4 text-center text-xs uppercase tracking-[0.2em] text-white/40">
          Tools we build with
        </p>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            className="marquee-track flex items-center gap-8 will-change-transform sm:gap-12 md:gap-16"
            style={{ "--marquee-duration": "40s" } as React.CSSProperties}
          >
            {partnersRow.map((partner, i) => (
              <a
                key={`${partner.name}-${i}`}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium tracking-wide text-white/70 transition hover:text-white"
              >
                {partner.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
