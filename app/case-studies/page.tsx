import CaseStudiesPage from "./CaseStudiesIndex";
import { metadata as layoutMetadata } from "./layout";
import { withEditedSeo } from "@/lib/cms/metadata";

// Server wrapper so this route can apply ERP edited-page SEO (a client
// component page can't export generateMetadata). Renders the same page.
export function generateMetadata() {
  return withEditedSeo("/case-studies", layoutMetadata);
}

export default function Page() {
  return <CaseStudiesPage />;
}
