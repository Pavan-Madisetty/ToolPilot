// ─────────────────────────────────────────────────────────────
// Resume Template Registry
// ─────────────────────────────────────────────────────────────
import type { TemplateConfig } from '@/types/resume';
import ModernProfessional from './ModernProfessional';
import MinimalExecutive from './MinimalExecutive';
import CreativeDesigner from './CreativeDesigner';
import Corporate from './Corporate';
import ModernATS from './ModernATS';

// ── Template configs ─────────────────────────────────────────

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean two-column layout with blue accents, ATS-friendly design',
    category: 'Professional',
    atsRating: 5,
    bestFor: 'Tech, Engineering, Corporate',
    defaultColors: {
      primary: '#2563eb',
      secondary: '#1e293b',
      accent: '#3b82f6',
    },
    component: ModernProfessional,
  },
  {
    id: 'minimal-executive',
    name: 'Minimal Executive',
    description: 'Elegant single-column with maximum white space and serif typography',
    category: 'Executive',
    atsRating: 5,
    bestFor: 'C-Suite, Management, Consulting',
    defaultColors: {
      primary: '#111827',
      secondary: '#374151',
      accent: '#6b7280',
    },
    component: MinimalExecutive,
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Bold colorful header with skill bars and modern layout',
    category: 'Creative',
    atsRating: 3,
    bestFor: 'Design, Marketing, Creative Roles',
    defaultColors: {
      primary: '#7c3aed',
      secondary: '#4c1d95',
      accent: '#a78bfa',
    },
    component: CreativeDesigner,
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Traditional conservative layout optimized for HR systems',
    category: 'Corporate',
    atsRating: 5,
    bestFor: 'Banking, Law, Government, HR',
    defaultColors: {
      primary: '#1e3a5f',
      secondary: '#2d3748',
      accent: '#4a6fa5',
    },
    component: Corporate,
  },
  {
    id: 'modern-ats',
    name: 'Modern ATS',
    description: 'Minimal, recruiter-friendly design with modern typography',
    category: 'Modern',
    atsRating: 5,
    bestFor: 'Startups, SaaS, General Applications',
    defaultColors: {
      primary: '#059669',
      secondary: '#1f2937',
      accent: '#10b981',
    },
    component: ModernATS,
  },
];

// ── Lookup helpers ───────────────────────────────────────────

export const TEMPLATE_MAP: Record<string, TemplateConfig> = TEMPLATES.reduce(
  (map, tpl) => {
    map[tpl.id] = tpl;
    return map;
  },
  {} as Record<string, TemplateConfig>,
);

export function getTemplate(id: string): TemplateConfig | undefined {
  return TEMPLATE_MAP[id];
}
