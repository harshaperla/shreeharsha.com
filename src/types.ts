export type BlogType = 'tech' | 'kannada' | 'travel';

export interface GeoLocation {
  lat: number;
  lng: number;
  elevation?: string;
  region?: string;
}

export interface TravelSection {
  id: string;
  title: string;
  content: string;
}

export interface BlogPost {
  id: string;
  type: BlogType;
  title: string;
  subtitle?: string;
  date: string;
  readingTime: string;
  category: string;
  intro: string;
  content: string; // Markdown or detailed text
  sections?: TravelSection[]; // Optional multi-section structure for easy navigation
  tags: string[];
  image?: string;
  location?: string;
  geo?: GeoLocation;
  kannadaTitle?: string; // For bilingual search support
}

export interface SystemMindset {
  label: string;
  value: string;
  description: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  intent: 'infrastructure' | 'collaboration' | 'consulting' | 'general';
  priority: 'routine' | 'urgent' | 'critical_infrastructure';
  message: string;
}

export interface SavedMessage extends ContactFormInput {
  id: string;
  timestamp: string;
  status: 'received' | 'processing' | 'queued';
}

export interface AccomplishmentItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'National Recognition' | 'Cybersecurity Audit' | 'Digital Governance';
  date: string;
  source: string;
  url?: string;
  secondaryUrl?: string;
  secondarySource?: string;
  badge: string;
  iconType: 'modi' | 'security' | 'governance';
  summary: string;
  bullets: string[];
  quote?: string;
  quoteAuthor?: string;
  quoteUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  type: string;
  description: string;
  tech: string[];
  stats: string;
  category?: 'vlsi' | 'indic' | 'systems' | 'ai' | string;
  url?: string;
}
