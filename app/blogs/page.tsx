import { metadata as layoutMetadata } from "./layout";
import { withEditedSeo } from "@/lib/cms/metadata";
import { BlogsPage } from "@/components/blogs/BlogsPage";

export default function Page() {
  return <BlogsPage />;
}

// Edited-page SEO from the ERP (Part B), applied on the server.
export function generateMetadata() {
  return withEditedSeo("/blogs", layoutMetadata);
}
