import { metadata as layoutMetadata } from "./layout";
import { withEditedSeo } from "@/lib/cms/metadata";
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


// Edited-page SEO from the ERP (Part B), applied on the server.
export function generateMetadata() {
  return withEditedSeo("/technologies", layoutMetadata);
}
