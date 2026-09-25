export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

export interface Collaborator {
  name: string;
  role: string;
  href?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  media: MediaItem[];
  tags: string[];
  techStack: string[];
  label: string;
  featured: boolean;
  isPrivate: boolean;
  sortOrder: number;
  href?: string;
  collaborators?: Collaborator[];
  createdAt: string;
  updatedAt: string;
}

export interface Segment {
  text: string;
  bold?: boolean;
}

export interface TimelineEntry {
  id: number;
  period: string;
  startDate: string;
  endDate: string | null;
  title: string;
  company: string;
  location: string;
  companyDesc: string;
  bullets: Segment[][];
  highlight: boolean;
  sortOrder: number;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  icon: string;
  title: string;
  skills: string[];
}

export interface SkillsData {
  categories: SkillCategory[];
  frontendSkills: string[];
  tools: string[];
  softSkills: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface HeroData {
  roles: string[];
  stats: Stat[];
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string | null;
}

export interface Social {
  icon: string;
  href: string;
  label: string;
}

export interface NavLink {
  name: string;
  to: string;
  num: string;
  icon: string;
}
