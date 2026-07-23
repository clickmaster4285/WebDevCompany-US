import Image from "next/image";

const PARTNERS = [
  { name: "Clutch", icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234B9CD3' d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.301 0-9.6-4.299-9.6-9.6S6.699 2.4 12 2.4s9.6 4.299 9.6 9.6-4.299 9.6-9.6 9.6zM8.4 12c0-1.988 1.612-3.6 3.6-3.6s3.6 1.612 3.6 3.6-1.612 3.6-3.6 3.6-3.6-1.612-3.6-3.6z'/%3E%3C/svg%3E", dark: false },
  { name: "Google", icon: "https://cdn.simpleicons.org/google/4285F4", dark: false },
  { name: "HubSpot", icon: "https://cdn.simpleicons.org/hubspot/FF7A59", dark: false },
  { name: "Shopify Partners", icon: "https://cdn.simpleicons.org/shopify/7AB55C", dark: false },
  { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe/635BFF", dark: false },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/000000", dark: true },
  { name: "Netlify", icon: "https://cdn.simpleicons.org/netlify/00C7B7", dark: false },
  { name: "Cloudflare", icon: "https://cdn.simpleicons.org/cloudflare/F38020", dark: false },
  { name: "DigitalOcean", icon: "https://cdn.simpleicons.org/digitalocean/0080FF", dark: false },
  { name: "Contentful", icon: "https://cdn.simpleicons.org/contentful/2478CC", dark: false },
  { name: "Sanity", icon: "https://cdn.simpleicons.org/sanity/F03E2F", dark: false },
  { name: "Storyblok", icon: "https://cdn.simpleicons.org/storyblok/09B3AF", dark: false },
  { name: "Algolia", icon: "https://cdn.simpleicons.org/algolia/5468FF", dark: false },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E", dark: false },
  { name: "Upwork", icon: "https://cdn.simpleicons.org/upwork/6FDA44", dark: false },
  { name: "Toptal", icon: "https://cdn.simpleicons.org/toptal/7E3ACB", dark: false },
  { name: "Fiverr", icon: "https://cdn.simpleicons.org/fiverr/1DBF73", dark: false },
];

export function Partners() {
  const partnersRow = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative z-10 bg-black px-4 sm:px-6">
      <div className="layout-container">
        <div className="mt-0">
          <div
            className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="flex gap-8 sm:gap-12 md:gap-16 items-center will-change-transform marquee-track"
              style={{ "--marquee-duration": "40s" } as React.CSSProperties}
            >
              {partnersRow.map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className="flex flex-col items-center gap-2 group transition-transform duration-200 hover:scale-105"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:bg-white/10">
                    <Image
                      src={partner.icon}
                      alt={partner.name}
                      width={40}
                      height={40}
                      unoptimized
                      className={`w-full h-full object-contain transition-all duration-300 ${
                        partner.dark ? "brightness-0 invert" : ""
                      }`}
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
