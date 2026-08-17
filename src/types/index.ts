export type BlockType = 
  | 'hero' 
  | 'intro' 
  | 'problems' 
  | 'approach' 
  | 'useCases' 
  | 'cta' 
  | 'metrics' 
  | 'testimonials' 
  | 'faq' 
  | 'timeline' 
  | 'team' 
  | 'pricing' 
  | 'contact' 
  | 'gallery' 
  | 'video' 
  | 'stats' 
  | 'logos' 
  | 'features';

export type BlockPosition = 'left' | 'right' | 'centered' | 'full';

export interface ContentBlock {
  id: string;
  type: BlockType;
  position: BlockPosition;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
    value?: string;
  }>;
  cta?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  image?: {
    src: string;
    alt: string;
  };
  bgClass?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'none';
}

export interface SolutionConfig {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  icon: string;
  color: string;
  gradient: string;
  shape: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
    ogImage: string;
  };
  blocks: ContentBlock[];
  isActive: boolean;
  order: number;
}

export interface SiteConfig {
  siteName: string;
  url: string;
  language: 'es' | 'en';
  languages: ('es' | 'en')[];
  social: {
    linkedin: string;
    website?: string;
  };
  contact: {
    email: string;
    address?: string;
  };
  solutions: SolutionConfig[];
  featureFlags: {
    analytics: boolean;
    newsletter: boolean;
    blog: boolean;
    testimonials: boolean;
  };
}

export interface WorkCase {
  id: string;
  title: string;
  client: string;
  category: 'Web Development' | 'Cloud Infrastructure' | 'Internal Tools' | 'E-commerce';
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  imageUrl: string;
  link?: string;
  featured: boolean;
}
