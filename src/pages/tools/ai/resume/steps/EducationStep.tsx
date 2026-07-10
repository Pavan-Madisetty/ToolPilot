// ─────────────────────────────────────────────────────────────
// Step 2 — Education (repeatable entries)
// ─────────────────────────────────────────────────────────────
import { useResumeStore } from '@/stores/resumeStore';
import { createEducation, type Education } from '@/types/resume';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

/**
 * EducationStep — CRUD interface for education entries.
 * Each entry renders as a Card with inline fields that write directly to the store.
 */
export default function EducationStep() {
  const education = useResumeStore((s) => s.resumeData.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  /** Update a single field on a specific entry */
  const handleChange = (id: string, field: keyof Education, value: string) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
        >
          <GraduationCap size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Education
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Add your degrees, diplomas, and relevant coursework.
          </p>
        </div>
      </div>

      {/* ── Entry cards ──────────────────────────────────── */}
      {education.length === 0 && (
        <Card padding="md">
          <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
            No education entries yet. Click the button below to add one.
          </p>
        </Card>
      )}

      {education.map((entry, index) => (
        <Card key={entry.id} padding="md" className="relative">
          {/* Delete button — top-right corner */}
          <div className="absolute top-3 right-3">
            <Button
              variant="danger"
              size="xs"
              onClick={() => removeEducation(entry.id)}
              aria-label={`Remove education entry ${index + 1}`}
              leftIcon={<Trash2 size={12} />}
            >
              Remove
            </Button>
          </div>

          <p
            className="text-sm font-semibold mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            Education #{index + 1}
          </p>

          {/* Row 1: Institution, Degree, Field */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id={`edu-institution-${entry.id}`}
              label="Institution"
              requiredMark
              placeholder="e.g. MIT"
              value={entry.institution}
              onChange={(e) => handleChange(entry.id, 'institution', e.target.value)}
              aria-label={`Institution for education ${index + 1}`}
            />
            <Input
              id={`edu-degree-${entry.id}`}
              label="Degree"
              requiredMark
              placeholder="e.g. B.Tech"
              value={entry.degree}
              onChange={(e) => handleChange(entry.id, 'degree', e.target.value)}
              aria-label={`Degree for education ${index + 1}`}
            />
            <Input
              id={`edu-field-${entry.id}`}
              label="Field of Study"
              placeholder="e.g. Computer Science"
              value={entry.field}
              onChange={(e) => handleChange(entry.id, 'field', e.target.value)}
              aria-label={`Field of study for education ${index + 1}`}
            />
          </div>

          {/* Row 2: Dates + GPA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input
              id={`edu-start-${entry.id}`}
              label="Start Date"
              type="month"
              value={entry.startDate}
              onChange={(e) => handleChange(entry.id, 'startDate', e.target.value)}
              aria-label={`Start date for education ${index + 1}`}
            />
            <div>
              <Input
                id={`edu-end-${entry.id}`}
                label="End Date"
                type={entry.endDate === 'Present' ? 'text' : 'month'}
                value={entry.endDate}
                onChange={(e) => handleChange(entry.id, 'endDate', e.target.value)}
                disabled={entry.endDate === 'Present'}
                aria-label={`End date for education ${index + 1}`}
              />
              <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={entry.endDate === 'Present'}
                  onChange={(e) =>
                    handleChange(entry.id, 'endDate', e.target.checked ? 'Present' : '')
                  }
                  className="accent-[var(--primary)]"
                  aria-label={`Currently studying at education ${index + 1}`}
                />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Currently studying here
                </span>
              </label>
            </div>
            <Input
              id={`edu-gpa-${entry.id}`}
              label="GPA"
              placeholder="e.g. 3.8/4.0"
              value={entry.gpa ?? ''}
              onChange={(e) => handleChange(entry.id, 'gpa', e.target.value)}
              aria-label={`GPA for education ${index + 1}`}
            />
          </div>

          {/* Row 3: Description */}
          <div className="mt-4">
            <Textarea
              id={`edu-desc-${entry.id}`}
              label="Description"
              rows={2}
              placeholder="Relevant coursework, thesis, or activities…"
              value={entry.description ?? ''}
              onChange={(e) => handleChange(entry.id, 'description', e.target.value)}
              aria-label={`Description for education ${index + 1}`}
            />
          </div>
        </Card>
      ))}

      {/* ── Add button ───────────────────────────────────── */}
      <Button
        variant="secondary"
        onClick={() => addEducation(createEducation())}
        leftIcon={<Plus size={16} />}
        aria-label="Add education entry"
      >
        Add Education
      </Button>
    </div>
  );
}
