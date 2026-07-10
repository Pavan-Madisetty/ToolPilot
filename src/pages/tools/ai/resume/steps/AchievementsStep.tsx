// ─────────────────────────────────────────────────────────────
// Step 7 — Achievements (repeatable entries)
// ─────────────────────────────────────────────────────────────
import { useResumeStore } from '@/stores/resumeStore';
import { createAchievement } from '@/types/resume';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Trophy, Plus, Trash2 } from 'lucide-react';

export default function AchievementsStep() {
  const achievements = useResumeStore((s) => s.resumeData.achievements);
  const addAchievement = useResumeStore((s) => s.addAchievement);
  const updateAchievement = useResumeStore((s) => s.updateAchievement);
  const removeAchievement = useResumeStore((s) => s.removeAchievement);

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
        >
          <Trophy size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Achievements
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Awards, publications, speaking engagements, or notable accomplishments.
          </p>
        </div>
      </div>

      {/* ── Empty state ──────────────────────────────────── */}
      {achievements.length === 0 && (
        <Card padding="md">
          <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
            No achievements yet. Click the button below to add one.
          </p>
        </Card>
      )}

      {/* ── Entry cards ──────────────────────────────────── */}
      {achievements.map((entry, index) => (
        <Card key={entry.id} padding="md" className="relative">
          {/* Delete button */}
          <div className="absolute top-3 right-3">
            <Button
              variant="danger"
              size="xs"
              onClick={() => removeAchievement(entry.id)}
              aria-label={`Remove achievement ${index + 1}`}
              leftIcon={<Trash2 size={12} />}
            >
              Remove
            </Button>
          </div>

          <p
            className="text-sm font-semibold mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            Achievement #{index + 1}
          </p>

          {/* Row 1: Title + Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                id={`ach-title-${entry.id}`}
                label="Title"
                requiredMark
                placeholder="e.g. Hackathon Winner — Google 2023"
                value={entry.title}
                onChange={(e) => updateAchievement(entry.id, { title: e.target.value })}
                aria-label={`Title for achievement ${index + 1}`}
              />
            </div>
            <Input
              id={`ach-date-${entry.id}`}
              label="Date"
              type="month"
              value={entry.date ?? ''}
              onChange={(e) => updateAchievement(entry.id, { date: e.target.value })}
              aria-label={`Date for achievement ${index + 1}`}
            />
          </div>

          {/* Row 2: Description */}
          <div className="mt-4">
            <Textarea
              id={`ach-desc-${entry.id}`}
              label="Description"
              rows={2}
              placeholder="Brief description of the achievement…"
              value={entry.description ?? ''}
              onChange={(e) => updateAchievement(entry.id, { description: e.target.value })}
              aria-label={`Description for achievement ${index + 1}`}
            />
          </div>
        </Card>
      ))}

      {/* ── Add button ───────────────────────────────────── */}
      <Button
        variant="secondary"
        onClick={() => addAchievement(createAchievement())}
        leftIcon={<Plus size={16} />}
        aria-label="Add achievement entry"
      >
        Add Achievement
      </Button>
    </div>
  );
}
