// ─────────────────────────────────────────────────────────────
// Step 4 — Skills (tag / chip based)
// ─────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { createSkill } from '@/types/resume';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Zap, Plus, X } from 'lucide-react';

/** Popular skills for the quick-add row */
const QUICK_ADD_SKILLS = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Node.js',
  'Java', 'Go', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Git',
];

/** Level select options */
const LEVEL_OPTIONS = [
  { value: '1', label: '1 — Beginner' },
  { value: '2', label: '2 — Elementary' },
  { value: '3', label: '3 — Intermediate' },
  { value: '4', label: '4 — Advanced' },
  { value: '5', label: '5 — Expert' },
];

/** Renders filled / empty dots to visualise skill level (1–5) */
function LevelDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Skill level ${level} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="inline-block w-2 h-2 rounded-full"
          style={{
            backgroundColor: i < level ? 'var(--primary)' : 'var(--border-default)',
          }}
        />
      ))}
    </div>
  );
}

export default function SkillsStep() {
  const skills = useResumeStore((s) => s.resumeData.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);

  const [newName, setNewName] = useState('');
  const [newLevel, setNewLevel] = useState('3');

  /** Prevent adding duplicate skill names (case-insensitive) */
  const isDuplicate = useCallback(
    (name: string) =>
      skills.some((s) => s.name.toLowerCase() === name.trim().toLowerCase()),
    [skills]
  );

  const handleAdd = () => {
    const trimmed = newName.trim();
    if (!trimmed || isDuplicate(trimmed)) return;
    addSkill(createSkill({ name: trimmed, level: Number(newLevel) }));
    setNewName('');
  };

  const handleQuickAdd = (name: string) => {
    if (isDuplicate(name)) return;
    addSkill(createSkill({ name, level: 3 }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
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
          <Zap size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Skills
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Add your technical and professional skills with proficiency levels.
          </p>
        </div>
      </div>

      {/* ── Add skill form ───────────────────────────────── */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <Input
              id="skill-name"
              label="Skill Name"
              placeholder="e.g. React"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Skill name input"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              id="skill-level"
              label="Level"
              options={LEVEL_OPTIONS}
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              aria-label="Skill level selector"
            />
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleAdd}
            leftIcon={<Plus size={16} />}
            disabled={!newName.trim() || isDuplicate(newName)}
            aria-label="Add skill"
          >
            Add
          </Button>
        </div>
      </Card>

      {/* ── Quick-add row ────────────────────────────────── */}
      <div>
        <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Quick add (level 3):
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_ADD_SKILLS.map((name) => {
            const alreadyAdded = isDuplicate(name);
            return (
              <Button
                key={name}
                variant="ghost"
                size="xs"
                disabled={alreadyAdded}
                onClick={() => handleQuickAdd(name)}
                aria-label={`Quick-add ${name}`}
                className={alreadyAdded ? 'opacity-40' : ''}
              >
                + {name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* ── Skills grid ──────────────────────────────────── */}
      {skills.length === 0 ? (
        <Card padding="md">
          <p className="text-center py-6" style={{ color: 'var(--text-secondary)' }}>
            No skills added yet. Use the form above or quick-add buttons.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 border"
              style={{
                borderColor: 'var(--border-default)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {skill.name}
                </span>
                <LevelDots level={skill.level} />
              </div>
              <button
                onClick={() => removeSkill(skill.id)}
                className="shrink-0 p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                aria-label={`Remove ${skill.name} skill`}
                style={{ color: 'var(--text-secondary)' }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
