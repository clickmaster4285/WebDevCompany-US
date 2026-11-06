// Approved testimonials only. Placeholder names, quotes, and aggregate
// statistics were removed because they could not be verified from a client record.

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  rating?: number;
  company?: string;
  industry?: string;
  useCase?: string;
  featured?: boolean;
  date?: string;
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [];

export const industries = ["all", ...new Set(testimonials.map((t) => t.industry).filter(Boolean))];

export function getTestimonialsByIndustry(industry: string) {
  if (industry === "all") return testimonials;
  return testimonials.filter((t) => t.industry === industry);
}

export function getFeaturedTestimonials() {
  return testimonials.filter((t) => t.featured);
}

export function getTestimonialsWithVideo() {
  return testimonials.filter((t) => t.videoUrl);
}

export function getTestimonialByIndex(index: number) {
  if (testimonials.length === 0) return undefined;
  return testimonials[index % testimonials.length];
}
