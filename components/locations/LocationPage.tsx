// components/location/LocationPage.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { getAllLocationPages, LocationPageData } from '@/data/locationdata';
import { AboveTheFold } from './AboveTheFold';
import { FeaturedAnswerBlock } from './FeaturedAnswerBlock';
import { WhatBusinessesNeed } from './WhatBusinessesNeed';
import { HowWeServe } from './HowWeServe';
import { ServicesTable, getDefaultServices } from './ServicesTable';
import { ComparisonTable, getDefaultComparisonOptions } from './ComparisonTable';
import { ProcessSteps, getDefaultProcessSteps } from './ProcessSteps';
import { CaseStudy } from './CaseStudy';
import { BusinessCase } from './BusinessCase';
import { FAQ, getDefaultFAQs } from './FAQ';
import { CTASection } from './CTASection';

interface LocationPageProps {
  data: LocationPageData;
}

export const LocationPage: React.FC<LocationPageProps> = ({ data }) => {
  const {
    city,
    state,
    region,
    primarySectors,
    pricingRange,
    credibilityBar,
    primaryCTA,
    secondaryCTA,
    buyerPersona,
    pageNumber
  } = data;

  const services = getDefaultServices(city, region);
  const comparisonOptions = getDefaultComparisonOptions(city, region, primarySectors[0]);
  const processSteps = getDefaultProcessSteps(city);
  const faqs = getDefaultFAQs(city, region, primarySectors, pricingRange);

  return (
    <div className="min-h-screen bg-background">
      <div className="layout-container px-4 sm:px-6 lg:px-8">
        {/* Page Number Indicator */}
        {/* <div className="flex items-center justify-end gap-2 py-4 text-xs text-ink-mute">
          <span className="inline-block w-1 h-1 rounded-full bg-violet"></span>
          Page {pageNumber}
        </div> */}

        {/* Above the Fold - Ensure it doesn't overlap */}
        <div className="relative">
          <AboveTheFold
            city={city}
            state={state}
            region={region}
            primarySectors={primarySectors}
            credibilityBar={credibilityBar}
            primaryCTA={primaryCTA}
            secondaryCTA={secondaryCTA}
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          <FeaturedAnswerBlock
            city={city}
            primarySectors={primarySectors}
            pricingRange={pricingRange}
            region={region}
          />

          <WhatBusinessesNeed
            city={city}
            region={region}
            primarySectors={primarySectors}
            buyerPersona={buyerPersona}
          />

          <HowWeServe
            city={city}
            region={region}
            primarySectors={primarySectors}
            pricingRange={pricingRange}
          />

          <ServicesTable services={services} city={city} region={region} />

          <ComparisonTable options={comparisonOptions} city={city} region={region} />

          <ProcessSteps steps={processSteps} city={city} />

          <CaseStudy region={region} primarySectors={primarySectors} />

          <BusinessCase city={city} region={region} primarySector={primarySectors[0]} />

          <FAQ items={faqs} city={city} />

          <RelatedCities currentSlug={data.slug} state={state} />

          <CTASection city={city} primaryCTA={primaryCTA} secondaryCTA={secondaryCTA} />
        </div>
      </div>
    </div>
  );
};

function RelatedCities({ currentSlug, state }: { currentSlug: string; state: string }) {
  const others = getAllLocationPages().filter((page) => page.slug !== currentSlug);
  const sameState = others.filter((page) => page.state === state);
  const offset = currentSlug.length % Math.max(others.length, 1);
  const rotated = others.slice(offset).concat(others.slice(0, offset));
  const filler = rotated.filter((page) => page.state !== state).slice(0, 3);
  const links = [...sameState, ...filler].filter(
    (page, index, list) => list.findIndex((item) => item.slug === page.slug) === index,
  );

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Web development in other cities
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
        The same senior team covers these markets. Start with the{" "}
        <Link href="/web-development-services" className="text-violet-soft underline-offset-2 hover:underline">
          web development services
        </Link>{" "}
        overview, or open another city.
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/locations/${page.slug}`}
              className="block rounded-2xl border border-white/10 px-4 py-3 text-sm text-ink transition hover:border-violet/40"
            >
              {page.city}, {page.state}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/locations"
            className="block rounded-2xl border border-white/10 px-4 py-3 text-sm text-ink transition hover:border-violet/40"
          >
            All cities
          </Link>
        </li>
      </ul>
    </section>
  );
}