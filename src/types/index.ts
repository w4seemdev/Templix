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
  pages?: string[];
}
