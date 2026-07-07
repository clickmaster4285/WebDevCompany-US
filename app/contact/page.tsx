// app/contact/page.tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Breadcrumb } from "@/components/breadcrumb/Breadcrumb";
import { motion, animate, useInView } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  Clock,
  Send,
  Sparkles,
  Circle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Zap,
  MessageCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Elegant Background Shapes ──────────────────────────────────────────────
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-violet/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-linear-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Animated counter for stats (supports decimals, e.g. 99.9%) ───────────
function StatCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.25, 0.4, 0.25, 1],
      onUpdate: (v) => setDisplay(Number(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [isInView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Cursor spotlight helper (imperative, no re-render on mousemove) ───────
function handleSpotlight(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty("--x", `${x}%`);
  e.currentTarget.style.setProperty("--y", `${y}%`);
}

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.12,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const heroStats: Array<{
  display?: string;
  value?: number;
  suffix?: string;
  decimals?: number;
  label: string;
}> = [
  { display: "< 24h", label: "Response Time" },
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Enterprise Clients" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Uptime Guarantee" },
];

const budgetOptions = [
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
];

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+44 7988 576086",
    href: "tel:+447988576086",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sale@clickmasterssoftwaredevelopmentcompany.co.uk",
    href: "mailto:sale@clickmasterssoftwaredevelopmentcompany.co.uk",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "London, United Kingdom",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday - Sunday: Closed",
  },
];

const whyContactUs = [
  {
    icon: MessageCircle,
    title: "Free Consultation",
    description:
      "Get a free 30-minute discovery call to discuss your project ideas and get expert recommendations.",
  },
  {
    icon: ShieldCheck,
    title: "NDA Protected",
    description:
      "Every conversation is covered by a non-disclosure agreement. Your ideas stay completely confidential.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "We respond within 24 hours and can often schedule calls the same day. No long waiting periods.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Get a dedicated project manager and direct access to our senior developers throughout your project.",
  },
];

const contactTeam = [
  {
    name: "Sarah Mitchell",
    role: "Head of Sales",
    initials: "SM",
    color: "from-violet to-purple-600",
    image: "/image1.png",
  },
  {
    name: "James Wilson",
    role: "Technical Lead",
    initials: "JW",
    color: "from-cyan-500 to-blue-600",
    image: "/image2.png",
  },
  {
    name: "Our Support Team",
    role: "Always Ready to Help",
    initials: undefined,
    color: "from-emerald-500 to-teal-600",
    image: "/image3.png",
  },
];

const ctaBadges = [
  "Free Consultation",
  "Agile Development",
  "On-Time Delivery",
  "24/7 Support",
  "Custom Software Solutions",
];

// ─── Real photo card for the sidebar — replaces an icon with an actual face ─
function ContactVisual() {
  const [imgErrored, setImgErrored] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-2xl overflow-hidden border border-border shadow-xl"
    >
      <div className="relative aspect-[16/11]">
        {/*
          Real photo — drop a friendly team/support photo at
          /public/images/contact-team.jpg (or point this at any path
          you've already got, same convention as the About page photos).
        */}
        {!imgErrored ? (
          <Image
            src="/images/contact-team.jpg"
            alt="A member of the ClickMasters team ready to help"
            fill
            unoptimized
            sizes="(min-width: 1024px) 420px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgErrored(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-violet/20 via-surface-2 to-surface-1 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-violet/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-xs font-medium text-white/90">Online now</span>
        </div>
        <p className="text-white text-sm font-semibold leading-snug">
          Real people, real conversations — no chatbots.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Team / support photo card — real photo, initials or icon as fallback ──
function PersonCard({ member }: { member: (typeof contactTeam)[number] }) {
  const [errored, setErrored] = useState(false);

  return (
    <motion.div
      variants={cardVariants as any}
      onMouseMove={handleSpotlight}
      className="group relative text-center p-6 rounded-2xl bg-surface-1 border border-border hover:border-violet/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(139,92,246,0.10), transparent 70%)",
        }}
      />
      <div className="relative">
        <div
          className={`relative w-20 h-20 mx-auto mb-4 rounded-full p-[3px] bg-linear-to-br ${member.color} shadow-lg transition-transform duration-300 group-hover:scale-105`}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-surface-2 ring-2 ring-background flex items-center justify-center">
            {!errored ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                unoptimized
                sizes="80px"
                className="object-cover"
                onError={() => setErrored(true)}
              />
            ) : member.initials ? (
              <span className="text-xl font-bold text-white/90">{member.initials}</span>
            ) : (
              <Users className="w-8 h-8 text-white/80" />
            )}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-ink">{member.name}</h3>
        <p className="text-sm text-ink-mute">{member.role}</p>
      </div>
    </motion.div>
  );
}

// ─── Contact Page Component ─────────────────────────────────────────────────
export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", phone: "", budget: "", message: "" });

    // Reset success state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClasses =
    "w-full rounded-xl border border-border bg-surface-1/60 px-4 py-3.5 text-sm text-ink placeholder:text-ink-mute/50 focus:outline-none focus:ring-2 focus:ring-violet/40 focus:border-violet transition-all duration-200 backdrop-blur-sm";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20">
        {/* Background glow */}
        <div className="absolute inset-0 bg-linear-to-br from-violet/5 via-transparent to-violet/5" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-tl from-violet/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-br from-violet/10 to-transparent rounded-full blur-3xl" />

        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-violet/10"
            className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-violet/10"
            className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-violet/10"
            className="left-[5%] bottom-[5%] md:left-[10%] md:bottom-[10%]"
          />
        </div>

        <div className="relative layout-container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 text-left">
              <Breadcrumb customLabels={{ contact: "Contact Us" }} />
            </div>
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Circle className="h-2 w-2 fill-violet" />
              <span className="text-ink-mute tracking-wide">Contact Us</span>
            </motion.div>

            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-linear-to-b from-ink to-ink/80">
                  Let&apos;s Build Something
                </span>
                <span className="text-violet"> Great Together</span>
              </h1>
            </motion.div>

            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-3xl mx-auto font-light">
                Ready to transform your business? Share your details — we&apos;ll
                respond within one business day with a personalized roadmap.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto"
          >
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardVariants as any}
                className="bg-surface-1/60 backdrop-blur-sm border border-border rounded-2xl p-5 text-center hover:bg-surface-1 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-violet mb-1">
                  {stat.display ? (
                    stat.display
                  ) : (
                    <StatCounter
                      value={stat.value ?? 0}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  )}
                </div>
                <div className="text-sm text-ink-mute">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT FORM + INFO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section id="contact-form" className="relative py-8 md:py-12 pb-20 border-t border-border">
        <div className="layout-container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* ── Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="lg:col-span-3"
            >
              <div className="relative bg-surface-1/40 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 lg:p-10 overflow-hidden focus-within:border-violet/40 transition-colors duration-300">
                <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-violet/10 blur-3xl" />

                <div className="relative mb-8">
                  <div className="inline-flex items-center gap-2 bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-medium mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Get in Touch</span>
                  </div>
                  <h2 className="text-2xl font-bold text-ink mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-ink-mute text-sm">
                    Fill out the form below and we&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="relative space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-ink-soft mb-1.5"
                      >
                        Full Name <span className="text-violet">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-ink-soft mb-1.5"
                      >
                        Work Email <span className="text-violet">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-ink-soft mb-1.5"
                      >
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-ink-soft mb-1.5"
                      >
                        Estimated Budget (optional)
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none cursor-pointer`}
                      >
                        <option value="">Select budget</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-ink-soft mb-1.5"
                    >
                      What would you like to build?{" "}
                      <span className="text-violet">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className={`${inputClasses} resize-none min-h-[140px]`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-violet hover:bg-violet/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-violet/25 hover:shadow-violet/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/25 to-transparent" />
                    {isSubmitting ? (
                      <>
                        <Loader2 className="relative w-5 h-5 animate-spin" />
                        <span className="relative">Sending...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle2 className="relative w-5 h-5 text-green-400" />
                        <span className="relative">Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="relative w-5 h-5" />
                        <span className="relative">Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-ink-mute/60 text-center">
                    By submitting, you agree to our{" "}
                    <Link href="/privacy" className="text-violet hover:underline">
                      privacy policy
                    </Link>
                    . We&apos;ll never share your information.
                  </p>
                </form>
              </div>
            </motion.div>

            {/* ── Contact Info Sidebar ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Real photo replaces what used to be an all-icon sidebar */}
              {/* <ContactVisual /> */}

              {/* Consolidated contact details card */}
              <div className="p-6 md:p-8 rounded-2xl bg-surface-1/40 border border-border">
                <h3 className="text-lg font-semibold text-ink mb-5">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  {contactDetails.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-violet/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-violet" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-ink-mute/70 mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-ink hover:text-violet transition-colors break-words"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-ink whitespace-pre-line">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Immediate Help */}
              <div className="p-6 rounded-2xl bg-violet/5 border border-violet/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5 text-violet" />
                  </div>
                  <p className="text-sm font-semibold text-ink">
                    Need Immediate Help?
                  </p>
                </div>
                <p className="text-xs text-ink-mute/80 mb-4 leading-relaxed">
                  For urgent inquiries, call us directly. We&apos;re here to
                  help you succeed.
                </p>
                <a
                  href="tel:+447988576086"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:text-violet/80 transition-colors"
                >
                  Call +44 7988 576086
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CONTACT US SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-surface-1/50 border-t border-border">
        <div className="layout-container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Contact Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              We&apos;re Here to Help You Succeed
            </h2>
            <p className="text-ink-soft text-lg">
              Every interaction with ClickMasters is designed to give you
              confidence in your project.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyContactUs.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariants as any}
                onMouseMove={handleSpotlight}
                className="group relative p-6 rounded-2xl bg-surface-1 border border-border hover:border-violet/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet/5 overflow-hidden"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), rgba(139,92,246,0.10), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center mb-4 group-hover:bg-violet/20 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-violet" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MEET OUR TEAM SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-24 border-t border-border">
        <div className="layout-container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Meet Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              The People Who Will Help You
            </h2>
            <p className="text-ink-soft text-lg">
              Our dedicated team is ready to understand your needs and deliver
              solutions that exceed expectations.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {contactTeam.map((member) => (
              <PersonCard key={member.name} member={member} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-24 border-t border-border">
        <div className="layout-container px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get a Free Consultation</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              Have a software project in mind?
              <br className="hidden sm:block" /> Let&apos;s Build it Together
            </h2>

            <p className="text-lg text-ink-soft max-w-2xl mx-auto mb-8">
              Our software development team will discuss your requirements and
              propose a technical solution tailored to your specific business
              goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="#contact-form"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-violet hover:bg-violet/90 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-violet/25 hover:shadow-violet/40 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">Contact Us</span>
                <ArrowRight className="relative w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {ctaBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-1 border border-border text-sm text-ink-soft"
                >
                  <CheckCircle2 className="w-4 h-4 text-violet" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}