// ─────────────────────────────────────────────────────────────
// Step 3 — Work Experience (repeatable entries)
// ─────────────────────────────────────────────────────────────
import { useResumeStore } from '@/stores/resumeStore';
import { createExperience, type Experience } from '@/types/resume';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

/**
 * Parses lines beginning with '- ' or '• ' into an array of highlight strings.
 * Lines that don't match are left in the description body.
 */
function parseHighlights(text: string): string[] {
  return text
    .split('\n')
    .filter((line) => /^[-•]\s/.test(line.trim()))
    .map((line) => line.trim().replace(/^[-•]\s*/, ''));
}

export default function ExperienceStep() {
  const experience = useResumeStore((s) => s.resumeData.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);

  /** Update a single field and auto-extract highlights when description changes */
  const handleChange = (
    id: string,
    field: keyof Experience,
    value: string | string[]
  ) => {
    if (field === 'description' && typeof value === 'string') {
      const highlights = parseHighlights(value);
      updateExperience(id, { description: value, highlights });
    } else {
      updateExperience(id, { [field]: value });
    }
  };

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
        >
          <Briefcase size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Work Experience
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            List your professional experience, starting with the most recent.
          </p>
        </div>
      </div>

      {/* ── Empty state ──────────────────────────────────── */}
      {experience.length === 0 && (
        <Card padding="md">
          <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
            No experience entries yet. Click the button below to add one.
          </p>
        </Card>
      )}

      {/* ── Entry cards ──────────────────────────────────── */}
      {experience.map((entry, index) => (
        <Card key={entry.id} padding="md" className="relative">
          {/* Delete button */}
          <div className="absolute top-3 right-3">
            <Button
              variant="danger"
              size="xs"
              onClick={() => removeExperience(entry.id)}
              aria-label={`Remove experience entry ${index + 1}`}
              leftIcon={<Trash2 size={12} />}
            >
              Remove
            </Button>
          </div>

          <p
            className="text-sm font-semibold mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            Experience #{index + 1}
          </p>

          {/* Row 1: Company, Position, Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id={`exp-company-${entry.id}`}
              label="Company"
              requiredMark
              placeholder="e.g. Google"
              value={entry.company}
              onChange={(e) => handleChange(entry.id, 'company', e.target.value)}
              aria-label={`Company for experience ${index + 1}`}
            />
            <Input
              id={`exp-position-${entry.id}`}
              label="Position"
              requiredMark
              placeholder="e.g. Senior Engineer"
              value={entry.position}
              onChange={(e) => handleChange(entry.id, 'position', e.target.value)}
              aria-label={`Position for experience ${index + 1}`}
            />
            <Input
              id={`exp-location-${entry.id}`}
              label="Location"
              placeholder="e.g. Bengaluru, India"
              value={entry.location ?? ''}
              onChange={(e) => handleChange(entry.id, 'location', e.target.value)}
              aria-label={`Location for experience ${index + 1}`}
            />
          </div>

          {/* Row 2: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              id={`exp-start-${entry.id}`}
              label="Start Date"
              type="month"
              value={entry.startDate}
              onChange={(e) => handleChange(entry.id, 'startDate', e.target.value)}
              aria-label={`Start date for experience ${index + 1}`}
            />
            <div>
              <Input
                id={`exp-end-${entry.id}`}
                label="End Date"
                type={entry.endDate === 'Present' ? 'text' : 'month'}
                value={entry.endDate}
                onChange={(e) => handleChange(entry.id, 'endDate', e.target.value)}
                disabled={entry.endDate === 'Present'}
                aria-label={`End date for experience ${index + 1}`}
              />
              <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={entry.endDate === 'Present'}
                  onChange={(e) =>
                    handleChange(entry.id, 'endDate', e.target.checked ? 'Present' : '')
                  }
                  className="accent-[var(--primary)]"
                  aria-label={`Currently working at experience ${index + 1}`}
                />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  I currently work here
                </span>
              </label>
            </div>
          </div>

          {/* Row 3: Description with auto-highlight extraction */}
          <div className="mt-4">
            <Textarea
              id={`exp-desc-${entry.id}`}
              label="Description & Achievements"
              rows={4}
              placeholder={`Describe your role and achievements…\n\n- Led a team of 5 engineers\n- Increased revenue by 30%`}
              value={entry.description}
              onChange={(e) => handleChange(entry.id, 'description', e.target.value)}
              helperText="Use bullet points (lines starting with '- ' or '• ') to describe your achievements. They'll be auto-extracted as highlights."
              aria-label={`Description for experience ${index + 1}`}
            />
          </div>

          {/* Preview extracted highlights */}
          {entry.highlights.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                Extracted highlights:
              </p>
              <ul className="list-disc list-inside space-y-0.5">
                {entry.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-xs"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      ))}

      {/* ── Add button ───────────────────────────────────── */}
      <Button
        variant="secondary"
        onClick={() => addExperience(createExperience())}
        leftIcon={<Plus size={16} />}
        aria-label="Add experience entry"
      >
        Add Experience
      </Button>
    </div>
  );
}
