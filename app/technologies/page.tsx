import { TechnologiesHero } from '@/components/technologies/TechnologiesHero';
import { TechnologiesSearch } from '@/components/technologies/TechnologiesSearch';
import { TechnologiesGrid } from '@/components/technologies/TechnologiesGrid';
import { technologies } from '@/data/technologies';

export default function TechnologiesPage() {
  return (
    <>
      <TechnologiesHero />
      <TechnologiesSearch technologies={technologies} />
      <TechnologiesGrid technologies={technologies} />
    </>
  );
}
