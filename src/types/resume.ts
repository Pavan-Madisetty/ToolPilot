// ─────────────────────────────────────────────────────────────
// Resume Builder — Type Definitions & Zod Schemas
// ─────────────────────────────────────────────────────────────
import { z } from 'zod';

// ── Interfaces ───────────────────────────────────────────────

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
  photoUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  credentialId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  achievements: Achievement[];
}

export interface VisibleSections {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  certificates: boolean;
  achievements: boolean;
}

export type HeadingStyle = 'uppercase' | 'capitalize' | 'normal';
export type PageSize = 'A4' | 'Letter';
export type ResumeTheme = 'light' | 'dark';
export type ATSRating = 1 | 2 | 3 | 4 | 5;

export const FONT_OPTIONS = [
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: "'Merriweather', serif", label: 'Merriweather' },
  { value: "'Roboto', sans-serif", label: 'Roboto' },
  { value: "'Lato', sans-serif", label: 'Lato' },
  { value: "'Playfair Display', serif", label: 'Playfair Display' },
] as const;

export interface ResumeCustomization {
  templateId: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: number;
  headingStyle: HeadingStyle;
  sectionOrder: string[];
  pageMargins: number;
  lineSpacing: number;
  showPhoto: boolean;
  showIcons: boolean;
  theme: ResumeTheme;
  pageSize: PageSize;
  visibleSections: VisibleSections;
}

export interface TemplateRenderProps {
  data: ResumeData;
  customization: ResumeCustomization;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  atsRating: ATSRating;
  bestFor: string;
  defaultColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  component: React.ComponentType<TemplateRenderProps>;
}

// ── Section key type ─────────────────────────────────────────

export type SectionKey = keyof VisibleSections;

export const ALL_SECTION_KEYS: SectionKey[] = [
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certificates',
  'achievements',
];

export const SECTION_LABELS: Record<SectionKey, string> = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certificates: 'Certifications',
  achievements: 'Achievements',
};

// ── Zod Schemas ──────────────────────────────────────────────

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().optional().default(''),
  website: z.string().optional().default(''),
  linkedin: z.string().optional().default(''),
  summary: z.string().optional().default(''),
  photoUrl: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().optional().default(''),
  startDate: z.string().optional().default(''),
  endDate: z.string().optional().default(''),
  gpa: z.string().optional(),
  description: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string().optional(),
  startDate: z.string().optional().default(''),
  endDate: z.string().optional().default(''),
  description: z.string().optional().default(''),
  highlights: z.array(z.string()).default([]),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
  level: z.number().min(1).max(5).default(3),
  category: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional().default(''),
  technologies: z.array(z.string()).default([]),
  url: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certificate name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().optional().default(''),
  url: z.string().optional(),
  credentialId: z.string().optional(),
});

export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Achievement title is required'),
  description: z.string().optional(),
  date: z.string().optional(),
});

// ── Factory / Default Creators ───────────────────────────────

let _counter = 0;
export const uid = (): string => `${Date.now()}-${++_counter}`;

export const createEducation = (partial?: Partial<Education>): Education => ({
  id: uid(),
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  ...partial,
});

export const createExperience = (partial?: Partial<Experience>): Experience => ({
  id: uid(),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  description: '',
  highlights: [],
  ...partial,
});

export const createSkill = (partial?: Partial<Skill>): Skill => ({
  id: uid(),
  name: '',
  level: 3,
  ...partial,
});

export const createProject = (partial?: Partial<Project>): Project => ({
  id: uid(),
  name: '',
  description: '',
  technologies: [],
  ...partial,
});

export const createCertificate = (partial?: Partial<Certificate>): Certificate => ({
  id: uid(),
  name: '',
  issuer: '',
  date: '',
  ...partial,
});

export const createAchievement = (partial?: Partial<Achievement>): Achievement => ({
  id: uid(),
  title: '',
  ...partial,
});

export const DEFAULT_PERSONAL: PersonalInfo = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  summary: '',
};

export const DEFAULT_VISIBLE_SECTIONS: VisibleSections = {
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  certificates: true,
  achievements: true,
};

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certificates',
  'achievements',
];

export const DEFAULT_CUSTOMIZATION: ResumeCustomization = {
  templateId: 'modern-professional',
  primaryColor: '#2563eb',
  secondaryColor: '#1e293b',
  accentColor: '#3b82f6',
  fontFamily: 'Inter, sans-serif',
  fontSize: 11,
  headingStyle: 'uppercase',
  sectionOrder: [...DEFAULT_SECTION_ORDER],
  pageMargins: 20,
  lineSpacing: 1.4,
  showPhoto: false,
  showIcons: true,
  theme: 'light',
  pageSize: 'A4',
  visibleSections: { ...DEFAULT_VISIBLE_SECTIONS },
};

export const DEFAULT_RESUME_DATA: ResumeData = {
  personal: { ...DEFAULT_PERSONAL },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certificates: [],
  achievements: [],
};

// ── Sample / Demo Data ───────────────────────────────────────

export const SAMPLE_RESUME_DATA: ResumeData = {
  personal: {
    fullName: 'Jane Doe',
    jobTitle: 'Senior Software Engineer',
    email: 'jane.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    website: 'janedoe.dev',
    linkedin: 'linkedin.com/in/janedoe',
    summary:
      'Passionate software engineer with 5+ years of experience building scalable web applications. Proficient in React, TypeScript, Node.js, and cloud-native architectures. Led teams of 6+ engineers to deliver enterprise products used by 100K+ users.',
  },
  education: [
    {
      id: 'edu-1',
      institution: 'Indian Institute of Technology, Delhi',
      degree: 'B.Tech',
      field: 'Computer Science & Engineering',
      startDate: '2015-07',
      endDate: '2019-05',
      gpa: '8.9/10',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Google',
      position: 'Senior Software Engineer',
      location: 'Bengaluru, India',
      startDate: '2022-01',
      endDate: 'Present',
      description:
        'Led the frontend architecture migration from Angular to React for a flagship product serving 2M+ daily active users.',
      highlights: [
        'Reduced page load time by 40% through code splitting and lazy loading',
        'Mentored 4 junior engineers and conducted 50+ code reviews per quarter',
        'Designed and implemented a component library used across 3 product teams',
      ],
    },
    {
      id: 'exp-2',
      company: 'Microsoft',
      position: 'Software Engineer',
      location: 'Hyderabad, India',
      startDate: '2019-07',
      endDate: '2021-12',
      description:
        'Built real-time collaboration features for Microsoft Teams using React and SignalR.',
      highlights: [
        'Implemented WebSocket-based real-time sync reducing latency by 60%',
        'Achieved 95% test coverage with comprehensive unit and integration tests',
      ],
    },
  ],
  skills: [
    { id: 'sk-1', name: 'React', level: 5, category: 'Frontend' },
    { id: 'sk-2', name: 'TypeScript', level: 5, category: 'Languages' },
    { id: 'sk-3', name: 'Node.js', level: 4, category: 'Backend' },
    { id: 'sk-4', name: 'Python', level: 3, category: 'Languages' },
    { id: 'sk-5', name: 'AWS', level: 4, category: 'Cloud' },
    { id: 'sk-6', name: 'Docker', level: 4, category: 'DevOps' },
    { id: 'sk-7', name: 'GraphQL', level: 4, category: 'API' },
    { id: 'sk-8', name: 'PostgreSQL', level: 3, category: 'Database' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'ToolPilot',
      description:
        'Open-source browser-based utility platform with 80+ tools. Built with React, TypeScript, and Vite. Zero backend dependencies.',
      technologies: ['React', 'TypeScript', 'Vite', 'Zustand'],
      url: 'github.com/janedoe/toolpilot',
    },
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023-03',
      credentialId: 'AWS-SAA-12345',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Hackathon Winner — Google Internal Hackathon 2023',
      description: 'Built an AI-powered code review assistant in 48 hours',
    },
    {
      id: 'ach-2',
      title: 'Speaker — ReactConf India 2022',
      description: 'Presented on "Scaling Design Systems for Enterprise React Apps"',
    },
  ],
};

// ── Step definitions ─────────────────────────────────────────

export interface WizardStep {
  key: string;
  label: string;
  shortLabel: string;
  icon: string;
}

export const WIZARD_STEPS: WizardStep[] = [
  { key: 'personal', label: 'Personal Details', shortLabel: 'Personal', icon: '👤' },
  { key: 'education', label: 'Education', shortLabel: 'Education', icon: '🎓' },
  { key: 'experience', label: 'Experience', shortLabel: 'Experience', icon: '💼' },
  { key: 'skills', label: 'Skills', shortLabel: 'Skills', icon: '⚡' },
  { key: 'projects', label: 'Projects', shortLabel: 'Projects', icon: '🚀' },
  { key: 'certificates', label: 'Certificates', shortLabel: 'Certs', icon: '📜' },
  { key: 'achievements', label: 'Achievements', shortLabel: 'Awards', icon: '🏆' },
  { key: 'templates', label: 'Choose Template', shortLabel: 'Template', icon: '🎨' },
  { key: 'editor', label: 'Live Preview & Export', shortLabel: 'Preview', icon: '📄' },
];
