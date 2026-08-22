"use client";

import { useEffect, useRef, useState } from "react";
import { useGsap } from "@/lib/gsap";
import { HeroBrowserScene } from "./HeroBrowserScene";
import heroVideo from "@/public/assets/hero.mp4";
import Link from "next/link";

// Dark poster matching the video tint
const POSTER_BASE64 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%230a0a0a' width='100%25' height='100%25'/%3E%3C/svg%3E";

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const browser = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // IntersectionObserver — only load/play video when hero scrolls into view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = "auto";
          video.play().catch(() => {});
          setVideoReady(true);
          observer.unobserve(video);
        }
      },
      { rootMargin: "200px 0px" } // start loading 200px before it enters
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const { gsap } = useGsap();

    const ctx = gsap.context(() => {
      const h = headline.current;

      if (h) {
        const text = "ClickMasters, No.1 Web Development Services Company in USA";
        h.innerHTML = "";
        const words = text.split(' ');
        const allChars: HTMLElement[] = [];

        words.forEach((word, wordIndex) => {
          const wordContainer = document.createElement("span");
          wordContainer.style.display = "inline-block";
          wordContainer.style.whiteSpace = "nowrap";
          
          [...word].forEach((char) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.className = "inline-block";
            wordContainer.appendChild(span);
            allChars.push(span);
          });
          
          h.appendChild(wordContainer);
          
          if (wordIndex < words.length - 1) {
            const space = document.createElement("span");
            space.textContent = "\u00A0";
            space.style.display = "inline-block";
            h.appendChild(space);
          }
        });

        gsap.set(allChars, { yPercent: 120, opacity: 0 });
        gsap.to(allChars, {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.02,
          delay: 0.2,
        });
      }

      gsap.from(".hero-fade", { y: 24, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.5 });
      gsap.from(".cta-form", { y: 30, opacity: 0, duration: 0.8, ease: "expo.out", delay: 0.15 });

      if (browser.current && root.current) {
        gsap.to(browser.current, {
          y: -40,
          scale: 0.95,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative mx-auto flex flex-col items-center justify-center overflow-x-hidden max-w-full min-h-[100dvh] w-full pt-20 pb-16 px-4 sm:px-6 sm:pt-24 sm:pb-20 md:px-10">
      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          preload="metadata"
          loop
          muted
          playsInline
          poster={POSTER_BASE64}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        >
          <source src={heroVideo} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 layout-container px-4 sm:px-6 md:px-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        
        {/* Left Column */}
        <div>
          <h1
            ref={headline}
            className="overflow-hidden font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]"
          >
            <span className="text-white">ClickMasters</span>
            <span className="text-white/40">,</span>
            <span className="text-primary"> No.1</span>
            <span className="text-white"> Web Development</span>
            <br className="hidden sm:block" />
            <span className="text-white">Services</span>
            <span className="text-white/40"> </span>
            <span className="text-white">Company in</span>
            <span className="text-primary"> USA</span>
          </h1>

         <h2 className="hero-fade mt-6 text-white/90 text-xl sm:text-2xl md:text-3xl leading-tight font-medium">
  <span className="text-primary">ClickMasters</span> is a{" "}
  <span className="text-primary/80">
    web development company in USA
  </span>{" "}
  helping ambitious brands build websites, web applications, and online stores
  that feel effortless and are built to last.
</h2>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary to-violet px-6 py-4 text-sm font-medium text-white transition-all duration-300 ease-out hover:from-blue-600 hover:to-purple-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 min-h-[48px] sm:px-7 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:text-blue-200">→</span>
            </Link>

            <Link href="#work" className="inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white/80 transition-all duration-300 ease-out hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-0.5 hover:scale-105 min-h-[48px] sm:px-7 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
              See selected work
            </Link>
          </div>

          <div className="hero-fade mt-16 grid max-w-md grid-cols-3 gap-6">
            {[
              { val: "120+", label: "Projects", highlight: true },
              { val: "18", label: "Awards", highlight: false },
              { val: "99", label: "Lighthouse", highlight: true }
            ].map((item) => (
              <div key={item.label}>
                <div className={`text-2xl font-semibold md:text-3xl ${item.highlight ? 'text-primary' : 'text-white'}`}>
                  {item.val}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-white/50">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
       <div className="cta-form">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8">
            <h3 className="text-lg sm:text-xl font-medium text-white">Ready to create something <span className="text-primary">unforgettable</span>?</h3>
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                className="w-full rounded-xl bg-white/10 px-4 py-4 text-white placeholder:text-white/40 border border-white/5 focus:border-primary/50 focus:outline-none focus:bg-white/15 transition-all min-h-[48px]" 
                placeholder="Name" 
              />
              <input 
                type="email" 
                className="w-full rounded-xl bg-white/10 px-4 py-4 text-white placeholder:text-white/40 border border-white/5 focus:border-primary/50 focus:outline-none focus:bg-white/15 transition-all min-h-[48px]" 
                placeholder="Email" 
              />
              {/* New Phone Number Input */}
              <input 
                type="tel" 
                className="w-full rounded-xl bg-white/10 px-4 py-4 text-white placeholder:text-white/40 border border-white/5 focus:border-primary/50 focus:outline-none focus:bg-white/15 transition-all min-h-[48px]" 
                placeholder="Phone number" 
              />
              <textarea 
                className="w-full rounded-xl bg-white/10 px-4 py-4 text-white placeholder:text-white/40 border border-white/5 focus:border-primary/50 focus:outline-none focus:bg-white/15 transition-all min-h-[100px]" 
                rows={3} 
                placeholder="Project details" 
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-primary to-violet hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-primary/25 py-4 text-white font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}