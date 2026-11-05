import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getMetadata } from "@/lib/metadata";

export const metadata: Metadata = getMetadata({
  title: "Privacy Policy",
  description:
    "How Clickmasters Web Development Company handles contact details and analytics data submitted through this website.",
  slug: "privacy",
});

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="grow">
        <article className="layout-container max-w-3xl px-4 py-16 sm:px-6 md:px-10">
          <h1 className="text-4xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
          <p className="mt-4 text-sm text-ink-mute">Clickmasters Web Development Company</p>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-soft">
            <p>
              This page explains what this website collects when you contact us or browse the site, and how that information is used.
            </p>
            <h2 className="text-2xl font-semibold text-ink">Who we are</h2>
            <p>
              Clickmasters Web Development Company serves clients in the United States, the United Kingdom, and Pakistan. The US line is{" "}
              <a className="text-violet underline-offset-2 hover:underline" href="tel:+13252024074">
                +1 325 202 4074
              </a>
              . Email{" "}
              <a className="text-violet underline-offset-2 hover:underline" href="mailto:sales@clickmasterswebdevelopmentcompany.com">
                sales@clickmasterswebdevelopmentcompany.com
              </a>
              .
            </p>
            <h2 className="text-2xl font-semibold text-ink">Contact form</h2>
            <p>
              The form on the <Link className="text-violet underline-offset-2 hover:underline" href="/contact">contact page</Link> sends your name, email, phone number if you provide one, project message, budget if you select one, the page you submitted from, the referring page, and any campaign parameters in the URL. Those details are sent to our lead system at crm.clickmasters.pk so we can reply about your project. We do not sell that information.
            </p>
            <h2 className="text-2xl font-semibold text-ink">Analytics</h2>
            <p>
              The site loads Google Analytics to measure visits. That can include your browser, device, and pages viewed. You can block analytics in your browser settings.
            </p>
            <h2 className="text-2xl font-semibold text-ink">How long we keep it</h2>
            <p>
              We keep contact submissions for as long as we need them to respond to the inquiry and keep a record of the conversation. Email sales@clickmasterswebdevelopmentcompany.com if you want a copy of what we hold from a form you submitted, or if you want it deleted.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
