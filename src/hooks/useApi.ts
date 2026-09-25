import { projects } from '../data/projects';
import type {
  HeroData, Highlight, TimelineEntry, SkillsData,
  ContactInfo, Social, NavLink,
} from '../types';

interface UseApiResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

function useApi<T>(data: T): UseApiResult<T> {
  return { data, loading: false, error: null };
}

const fallbackHero: HeroData = {
  roles: ['Backend Engineer', 'Software Architect', 'AI Integration Specialist', 'Microservices Expert'],
  stats: [
    { value: '4+', label: 'Years building' },
    { value: '4', label: 'Countries served' },
  ],
};

export function useHero() {
  return useApi(fallbackHero);
}

const fallbackHighlights: Highlight[] = [
  { icon: 'Cpu', title: 'Backend Architecture', description: 'High-throughput microservices reducing inter-service latency by 30%+.' },
  { icon: 'Globe2', title: 'Global Delivery', description: 'Production systems for clients in Indonesia, Australia, Singapore & Japan.' },
  { icon: 'Trophy', title: 'Proven Track Record', description: 'Delivered production systems serving 300+ enterprise users with zero-downtime releases.' },
  { icon: 'GraduationCap', title: 'AI & Cloud', description: 'Hands-on with OpenAI, Claude, Gemini, Azure, AWS & GCP in production.' },
];

export function useHighlights() {
  return useApi(fallbackHighlights);
}

const fallbackTimeline: TimelineEntry[] = [
  {
    id: 1, period: 'Mar 2026 — Present', startDate: '2026-03-01', endDate: null,
    title: 'Founder & Software Engineer', company: 'Hompimpa', location: 'Depok, Indonesia',
    companyDesc: 'Hompimpa is a software studio focused on delivering production-ready web, mobile applications with hardware integration and client solutions across multiple technology stacks.',
    highlight: true, sortOrder: 0,
    bullets: [
      [{ text: 'Led ' }, { text: 'cross-functional sub-teams', bold: true }, { text: ' through full project lifecycles, conducted ' }, { text: 'direct client requirements gathering', bold: true }, { text: ', technical discussions, and stakeholder alignment to ensure on-time delivery of solutions aligned with business needs.' }],
      [{ text: 'Architected and delivered ' }, { text: 'production-ready web and mobile applications', bold: true }, { text: ' using ' }, { text: 'Go, Node.js, NestJS, Next.js, and Flutter', bold: true }, { text: ', spanning ' }, { text: 'full-stack development', bold: true }, { text: ', designed scalable RESTful APIs, integrated databases, and consistently delivered features on time for ' }, { text: 'multiple client', bold: true }, { text: ' projects.' }],
      [{ text: 'Owned end-to-end ' }, { text: 'CI/CD pipelines', bold: true }, { text: ' via GitHub Actions and Docker, ' }, { text: 'reducing deployment cycle times by 40%', bold: true }, { text: ' and ensuring ' }, { text: '99.9% uptime', bold: true }, { text: ' across all client infrastructure through proactive Linux server optimization.' }],
    ],
  },
  {
    id: 2, period: 'Jan 2024 — Present', startDate: '2024-01-01', endDate: null,
    title: 'Backend Developer', company: 'PT. Altimeda Cipta Visitama', location: 'Depok, Indonesia',
    companyDesc: 'PT. Altimeda Cipta Visitama is an Indonesian tech company delivering enterprise backend systems, AI-powered platforms, and ERP solutions for clients in Indonesia, Australia, and Japan, including collaboration with ProjectedAI.',
    highlight: false, sortOrder: 1,
    bullets: [
      [{ text: 'Designed high-throughput microservice architectures using ' }, { text: 'Golang, Node.js, NestJS, gRPC, and Protobuf', bold: true }, { text: ', ' }, { text: 'reducing inter-service latency by over 30%', bold: true }, { text: '.' }],
      [{ text: 'Built an ' }, { text: 'AI document intelligence platform', bold: true }, { text: ' utilizing OpenAI APIs and HNSW vector databases to semantically process enterprise files.' }],
      [{ text: 'Integrated OneDrive, Google Drive, and Amazon S3 storage handlers, optimizing vector search capabilities to achieve ' }, { text: 'sub-second query response times', bold: true }, { text: ' across thousands of documents.' }],
      [{ text: 'Engineered multi-tenant ERP backend modules and resolved complex external storage module dependencies to ensure ' }, { text: 'highly reliable data pipelines', bold: true }, { text: '.' }],
      [{ text: 'Managed Microsoft Azure cloud infrastructure, implementing auto-scaling and proactive cost optimization strategies that ' }, { text: 'reduced monthly cloud spend by 20%', bold: true }, { text: '.' }],
      [{ text: 'Collaborated with international partners across Australia and Japan, navigating cross-timezone technical handoffs and adapting to ' }, { text: 'strict enterprise delivery standards', bold: true }, { text: '.' }],
    ],
  },
  {
    id: 3, period: 'Feb 2023 — Jul 2023', startDate: '2023-02-01', endDate: '2023-07-31',
    title: 'Backend Developer (Campus, Part-Time)', company: 'PT. Telkom Indonesia', location: 'Jakarta, Indonesia',
    companyDesc: "PT. Telkom Indonesia is Indonesia's largest state-owned telecommunications and digital services company, with over 150 million subscribers and a workforce of over 25,000 employees, operating across telecommunications, internet, and digital ecosystem services nationwide.",
    highlight: false, sortOrder: 2,
    bullets: [
      [{ text: 'Developed and maintained ' }, { text: 'RESTful APIs and backend services', bold: true }, { text: ' for an internal talent nurturing web portal, successfully supporting ' }, { text: '300+ active enterprise users', bold: true }, { text: '.' }],
      [{ text: 'Managed server provisioning, environment configuration, and ' }, { text: 'production deployments', bold: true }, { text: ' to ensure seamless application availability.' }],
      [{ text: 'Collaborated within a large Agile team, implementing ' }, { text: 'enterprise-grade code reviews', bold: true }, { text: ' and production-level service monitoring.' }],
    ],
  },
  {
    id: 4, period: 'Jul 2022 — Sep 2022', startDate: '2022-07-01', endDate: '2022-09-30',
    title: 'Backend Developer (Campus, Part-Time)', company: 'Waithub', location: 'Bandung, Indonesia',
    companyDesc: 'Waithub (formerly Antrique) is a Bandung-based tech startup specializing in face-to-face service innovation, offering a comprehensive suite of virtual queuing systems, time delivery analytics, targeted advertising, and secure payment services for businesses across Indonesia.',
    highlight: false, sortOrder: 3,
    bullets: [
      [{ text: 'Designed and developed a scalable ' }, { text: 'RESTful API in Golang', bold: true }, { text: ' to power a virtual queuing, time analytics, and payment services platform.' }],
      [{ text: 'Containerized all backend services with Docker and deployed to ' }, { text: 'AWS via automated GitLab CI/CD pipelines', bold: true }, { text: ', achieving ' }, { text: 'zero-downtime releases', bold: true }, { text: '.' }],
      [{ text: 'Optimized API endpoints for ' }, { text: 'concurrent queue management', bold: true }, { text: ' and real-time analytics, and successfully integrated secure payment modules.' }],
    ],
  },
];

export function useTimeline() {
  return useApi(fallbackTimeline);
}

const fallbackSkills: SkillsData = {
  categories: [
    { icon: 'Server', title: 'Backend & Architecture', skills: ['Node.js / NestJS', 'Golang', 'TypeScript', 'REST / gRPC / GraphQL', 'Python'] },
    { icon: 'Cloud', title: 'Cloud & DevOps', skills: ['Docker', 'Microsoft Azure', 'GitHub Actions / GitLab CI', 'AWS', 'Linux / Nginx'] },
    { icon: 'Database', title: 'Databases & Vector Search', skills: ['PostgreSQL / MySQL', 'Redis', 'MongoDB', 'Vector DB (HNSW / Pinecone)', 'SQL Server'] },
    { icon: 'Brain', title: 'AI & Integrations', skills: ['OpenAI API', 'Claude / Gemini API', 'Local LLM / Hermes Agent', 'S3 / OneDrive / GDrive', 'Midtrans Payment Gateway'] },
  ],
  frontendSkills: ['React / Next.js', 'Flutter / Dart', 'Tailwind CSS', 'HTML5 / CSS3'],
  tools: ['Git', 'Docker', 'Portainer', 'Postman', 'Swagger / OpenAPI', 'Jira', 'Notion', 'Slack', 'GitHub Actions', 'PM2'],
  softSkills: ['Agile/Scrum', 'System Design', 'Code Review', 'Microservices', 'CI/CD', 'English (Professional)', 'Indonesian (Native)'],
};

export function useSkills() {
  return useApi(fallbackSkills);
}

export function useProjects() {
  return useApi(projects);
}

export function useProjectBySlug(slug: string) {
  return useApi(projects.find((project) => project.slug === slug) ?? null);
}

interface ContactData {
  contactInfo: ContactInfo[];
  socials: Social[];
}

const fallbackContact: ContactData = {
  contactInfo: [
    { icon: 'Mail', label: 'Email', value: 'rifkylovanto@gmail.com', href: 'mailto:rifkylovanto@gmail.com' },
    { icon: 'Phone', label: 'Phone', value: '+62 821 2330 4428', href: 'tel:+6282123304428' },
    { icon: 'MapPin', label: 'Location', value: 'Bandung, Indonesia', href: null },
  ],
  socials: [
    { icon: 'Linkedin', href: 'https://linkedin.com/in/lovanto', label: 'LinkedIn' },
    { icon: 'Github', href: 'https://github.com/lovanto', label: 'GitHub' },
    { icon: 'Globe', href: 'https://lovanto.my.id', label: 'Website' },
  ],
};

export function useContactInfo() {
  return useApi(fallbackContact);
}

interface NavData {
  navLinks: NavLink[];
  socials: Social[];
}

const fallbackNav: NavData = {
  navLinks: [
    { name: 'Home', to: '/', num: '01', icon: 'Home' },
    { name: 'About', to: '/about', num: '02', icon: 'User' },
    { name: 'Work', to: '/work', num: '03', icon: 'Briefcase' },
    { name: 'Skills', to: '/skills', num: '04', icon: 'Code2' },
    { name: 'Contact', to: '/contact', num: '05', icon: 'Mail' },
  ],
  socials: [
    { icon: 'Github', href: 'https://github.com/lovanto', label: 'GitHub' },
    { icon: 'Linkedin', href: 'https://linkedin.com/in/lovanto', label: 'LinkedIn' },
    { icon: 'Mail', href: 'mailto:rifkylovanto@gmail.com', label: 'Email' },
    { icon: 'Globe', href: 'https://lovanto.my.id', label: 'Website' },
  ],
};

export function useNav() {
  return useApi(fallbackNav);
}
