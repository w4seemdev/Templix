// The nine catalog categories. The `categories` list in src/data/templates.ts
// is typed against this union so the filter UI can never drift from the data.
export type TemplateCategory =
  | 'saas'
  | 'portfolio'
  | 'ecommerce'
  | 'blog'
  | 'agency'
  | 'landing'
  | 'dashboard'
  | 'restaurant'
  | 'corporate';

export interface Template {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  price: number;
  image: string;
  tags: string[];
  isFree: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  demoUrl: string;
  techStack: readonly string[];
  // On-page sections of the single-page template (e.g. Hero, Features, Footer)
  pages: readonly string[];
  // Truthful "What's included" deliverables list
  included: readonly string[];
}
