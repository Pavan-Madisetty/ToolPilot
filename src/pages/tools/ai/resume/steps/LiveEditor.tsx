// ─────────────────────────────────────────────────────────────
// Step 9 — Live Editor (split-pane preview + editing)
// ─────────────────────────────────────────────────────────────
import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { SECTION_LABELS, type SectionKey } from '@/types/resume';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Tabs } from '@/components/ui/Tabs';
import {
  ChevronDown,
  ChevronUp,
  User,
  FileText,
  Settings,
  BarChart3,
} from 'lucide-react';

import TemplateRenderer from '../TemplateRenderer';
import CustomizationPanel from '../CustomizationPanel';
import ATSScore from '../ATSScore';
import ExportControls from '../ExportControls';

/** Tabs configuration */
const EDITOR_TABS = [
  { key: 'personal', name: 'Personal', icon: <User size={14} /> },
  { key: 'content', name: 'Content', icon: <FileText size={14} /> },
  { key: 'customize', name: 'Customize', icon: <Settings size={14} /> },
  { key: 'ats', name: 'ATS Score', icon: <BarChart3 size={14} /> },
];

/** Content sections that can be collapsed */
const CONTENT_SECTIONS: SectionKey[] = [
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certificates',
  'achievements',
];

// ─────────────────────────────────────────────────────────────
// Accordion section for Content tab
// ─────────────────────────────────────────────────────────────
function ContentAccordion({
  sectionKey,
  isOpen,
  onToggle,
}: {
  sectionKey: SectionKey;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const resumeData = useResumeStore((s) => s.resumeData);
  const updatePersonal = useResumeStore((s) => s.updatePersonal);

  const label = SECTION_LABELS[sectionKey];

  // Count entries for each section
  const count = (() => {
    switch (sectionKey) {
      case 'summary':
        return resumeData.personal.summary ? 1 : 0;
      case 'experience':
        return resumeData.experience.length;
      case 'education':
        return resumeData.education.length;
      case 'skills':
        return resumeData.skills.length;
      case 'projects':
        return resumeData.projects.length;
      case 'certificates':
        return resumeData.certificates.length;
      case 'achievements':
        return resumeData.achievements.length;
      default:
        return 0;
    }
  })();

  return (
    <div
      className="border rounded-lg overflow-hidden"
      style={{ borderColor: 'var(--border-default)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
        style={{ color: 'var(--text-primary)' }}
        aria-expanded={isOpen}
        aria-label={`Toggle ${label} section`}
      >
        <span>
          {label}{' '}
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            ({count})
          </span>
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="px-3 pb-3 space-y-2">
          {sectionKey === 'summary' && (
            <Textarea
              id="live-summary"
              rows={3}
              placeholder="Professional summary…"
              value={resumeData.personal.summary}
              onChange={(e) => updatePersonal({ summary: e.target.value })}
              aria-label="Edit professional summary"
            />
          )}

          {sectionKey === 'experience' &&
            resumeData.experience.map((exp) => (
              <div
                key={exp.id}
                className="text-xs p-2 rounded"
                style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <strong>{exp.position}</strong> at {exp.company}
                <br />
                <span style={{ color: 'var(--text-secondary)' }}>
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
            ))}

          {sectionKey === 'education' &&
            resumeData.education.map((edu) => (
              <div
                key={edu.id}
                className="text-xs p-2 rounded"
                style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <strong>{edu.degree}</strong> — {edu.institution}
                <br />
                <span style={{ color: 'var(--text-secondary)' }}>
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            ))}

          {sectionKey === 'skills' && (
            <div className="flex flex-wrap gap-1">
              {resumeData.skills.map((s) => (
                <span
                  key={s.id}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-default)',
                  }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          )}

          {sectionKey === 'projects' &&
            resumeData.projects.map((p) => (
              <div
                key={p.id}
                className="text-xs p-2 rounded"
                style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <strong>{p.name}</strong>
                {p.url && (
                  <span style={{ color: 'var(--text-secondary)' }}> — {p.url}</span>
                )}
              </div>
            ))}

          {sectionKey === 'certificates' &&
            resumeData.certificates.map((c) => (
              <div
                key={c.id}
                className="text-xs p-2 rounded"
                style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <strong>{c.name}</strong> — {c.issuer}
              </div>
            ))}

          {sectionKey === 'achievements' &&
            resumeData.achievements.map((a) => (
              <div
                key={a.id}
                className="text-xs p-2 rounded"
                style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <strong>{a.title}</strong>
              </div>
            ))}

          {count === 0 && sectionKey !== 'summary' && (
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              No entries. Go back to the relevant step to add data.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Compact personal info mini-form for the Personal tab
// ─────────────────────────────────────────────────────────────
function PersonalMiniForm() {
  const personal = useResumeStore((s) => s.resumeData.personal);
  const updatePersonal = useResumeStore((s) => s.updatePersonal);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    updatePersonal({ [field]: e.target.value });

  return (
    <div className="space-y-3">
      <Input id="live-fullName" label="Name" value={personal.fullName} onChange={set('fullName')} aria-label="Full name" />
      <Input id="live-jobTitle" label="Title" value={personal.jobTitle} onChange={set('jobTitle')} aria-label="Job title" />
      <div className="grid grid-cols-2 gap-3">
        <Input id="live-email" label="Email" value={personal.email} onChange={set('email')} aria-label="Email" />
        <Input id="live-phone" label="Phone" value={personal.phone} onChange={set('phone')} aria-label="Phone" />
      </div>
      <Input id="live-location" label="Location" value={personal.location} onChange={set('location')} aria-label="Location" />
      <Input id="live-website" label="Website" value={personal.website} onChange={set('website')} aria-label="Website" />
      <Input id="live-linkedin" label="LinkedIn" value={personal.linkedin} onChange={set('linkedin')} aria-label="LinkedIn" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main LiveEditor component
// ─────────────────────────────────────────────────────────────
export default function LiveEditor() {
  const resumeData = useResumeStore((s) => s.resumeData);
  const customization = useResumeStore((s) => s.customization);
  const [activeTab, setActiveTab] = useState('personal');
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(new Set(['summary']));
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.5);

  // Calculate scale so the A4-sized template fits the preview container
  const recalcScale = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    // A4 width = 210mm ≈ 794px at 96 DPI
    const a4Width = 794;
    setPreviewScale(Math.min(containerWidth / a4Width, 1));
  }, []);

  useEffect(() => {
    recalcScale();
    window.addEventListener('resize', recalcScale);
    return () => window.removeEventListener('resize', recalcScale);
  }, [recalcScale]);

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {/* ── Preview panel (right on desktop, top on mobile) ── */}
      <div className="order-1 lg:order-2 w-full lg:w-[55%]">
        <div className="lg:sticky lg:top-4 space-y-3">
          {/* Preview container */}
          <div
            ref={containerRef}
            className="rounded-xl border overflow-hidden"
            style={{
              borderColor: 'var(--border-default)',
              backgroundColor: '#fff',
              minHeight: 400,
            }}
          >
            <div
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: 'top left',
                width: 794,
              }}
            >
              <div ref={previewRef} className="resume-template-container">
                <TemplateRenderer data={resumeData} customization={customization} />
              </div>
            </div>
          </div>

          {/* Export controls */}
          <Suspense fallback={null}>
            <ExportControls />
          </Suspense>
        </div>
      </div>

      {/* ── Editor panel (left on desktop, bottom on mobile) ── */}
      <div className="order-2 lg:order-1 w-full lg:w-[45%]">
        <Card padding="sm">
          <Tabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={EDITOR_TABS}
            ariaLabel="Live editor tabs"
            className="mb-4"
          />

          <div className="min-h-[300px]">
            {/* Personal tab */}
            {activeTab === 'personal' && <PersonalMiniForm />}

            {/* Content tab */}
            {activeTab === 'content' && (
              <div className="space-y-2">
                {CONTENT_SECTIONS.map((key) => (
                  <ContentAccordion
                    key={key}
                    sectionKey={key}
                    isOpen={openSections.has(key)}
                    onToggle={() => toggleSection(key)}
                  />
                ))}
              </div>
            )}

            {/* Customize tab */}
            {activeTab === 'customize' && (
              <Suspense
                fallback={
                  <p className="text-sm py-4" style={{ color: 'var(--text-secondary)' }}>
                    Loading customization panel…
                  </p>
                }
              >
                <CustomizationPanel />
              </Suspense>
            )}

            {/* ATS Score tab */}
            {activeTab === 'ats' && (
              <Suspense
                fallback={
                  <p className="text-sm py-4" style={{ color: 'var(--text-secondary)' }}>
                    Calculating ATS score…
                  </p>
                }
              >
                <ATSScore />
              </Suspense>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
