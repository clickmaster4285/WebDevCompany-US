import { TechnologiesHero } from '@/components/technologies/TechnologiesHero';
import { TechnologiesSearch } from '@/components/technologies/TechnologiesSearch';
import { TechnologiesGrid } from '@/components/technologies/TechnologiesGrid';
import { technologies } from '@/data/technologies';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technologies We Use',
  description: 'Explore the modern tools, frameworks and platforms we use to build fast, scalable and high-performing digital products.',
};

export default function TechnologiesPage() {
  return (
    <>
      <TechnologiesHero />
      <TechnologiesSearch technologies={technologies} />
      <TechnologiesGrid technologies={technologies} />
    </>
  );
}
