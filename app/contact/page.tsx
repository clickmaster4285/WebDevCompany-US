// app/contact/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Circle,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
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

// ─── Contact Info Data ──────────────────────────────────────────────────────
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@clickmasters.com",
    href: "mailto:hello@clickmasters.com",
    description: "We typically respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    description: "Mon–Fri, 9 AM – 6 PM EST",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "1200 Park Avenue, Suite 400\nNew York, NY 10128",
    href: "https://maps.google.com",
    description: "By appointment only",
  },
];

// ─── Contact Page Component ─────────────────────────────────────────────────
export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    setFormState({ name: "", email: "", phone: "", message: "" });

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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Circle className="h-2 w-2 fill-violet" />
              <span className="text-ink-mute tracking-wide">Get in Touch</span>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-linear-to-b from-ink to-ink/80">
                  Let&apos;s Start a Conversation
                </span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-3xl mx-auto font-light">
                Have a project in mind or just want to learn more about how we
                can help? We&apos;d love to hear from you. Fill out the form
                below and we&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT FORM + INFO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-8 md:py-12 pb-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* ── Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="lg:col-span-3"
            >
              <div className="bg-surface-1/40 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-ink mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-ink-mute text-sm">
                    Tell us about your project and we&apos;ll get back to you
                    with a free consultation.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                        Email Address <span className="text-violet">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-ink-soft mb-1.5"
                    >
                      Phone Number
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
                      htmlFor="message"
                      className="block text-sm font-medium text-ink-soft mb-1.5"
                    >
                      Message <span className="text-violet">*</span>
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
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-violet hover:bg-violet/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-violet/25 hover:shadow-violet/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
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
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="group p-6 rounded-2xl bg-surface-1/40 border border-border hover:bg-surface-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center shrink-0 group-hover:bg-violet/20 transition-colors">
                      <info.icon className="w-6 h-6 text-violet" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-ink mb-1">
                        {info.label}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-ink-soft text-sm hover:text-violet transition-colors block whitespace-pre-line"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-ink-soft text-sm whitespace-pre-line">
                          {info.value}
                        </p>
                      )}
                      <p className="text-xs text-ink-mute/60 mt-1.5">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Availability badge */}
              <div className="p-6 rounded-2xl bg-violet/5 border border-violet/10">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-ink">
                      Currently accepting new projects
                    </p>
                    <p className="text-xs text-ink-mute/60 mt-0.5">
                      Typical response time: within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social proof */}
              <div className="p-6 rounded-2xl bg-surface-1/40 border border-border text-center">
                <p className="text-xs text-ink-mute mb-2">
                  TRUSTED BY INNOVATIVE COMPANIES
                </p>
                <div className="flex justify-center -space-x-2">
                  {[
                    { initial: "A", color: "from-violet to-purple-600" },
                    { initial: "B", color: "from-cyan-500 to-blue-600" },
                    { initial: "C", color: "from-rose-500 to-pink-600" },
                    { initial: "D", color: "from-amber-500 to-orange-600" },
                    { initial: "E", color: "from-emerald-500 to-teal-600" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-10 rounded-full bg-linear-to-br ${item.color} flex items-center justify-center text-xs font-bold text-white border-2 border-background`}
                    >
                      {item.initial}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-xs font-bold text-ink-mute border-2 border-background">
                    +50
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 text-violet px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prefer to explore first?</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">
              Learn More About What We Do
            </h2>

            <p className="text-lg text-ink-soft max-w-2xl mx-auto mb-8">
              Browse our case studies, explore our services, or read our latest
              blog posts to get a feel for how we work and what we can achieve
              together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-violet hover:bg-violet/90 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-violet/25 hover:shadow-violet/40 hover:-translate-y-0.5"
              >
                View Case Studies
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-ink-soft hover:text-ink font-semibold rounded-full transition-all duration-300 hover:bg-surface-1 hover:-translate-y-0.5"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
