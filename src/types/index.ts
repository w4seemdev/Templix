export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  tags: string[];
  isFree: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  demoUrl: string;
  techStack?: string[];
  // On-page sections of the single-page template (e.g. Hero, Features, Footer)
  pages?: string[];
  // Truthful "What's included" deliverables list
  included: string[];
}
