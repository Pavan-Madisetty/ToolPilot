// ─────────────────────────────────────────────────────────────
// Step 5 — Projects (repeatable entries)
// ─────────────────────────────────────────────────────────────
import { useResumeStore } from '@/stores/resumeStore';
import { createProject } from '@/types/resume';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Rocket, Plus, Trash2 } from 'lucide-react';

export default function ProjectsStep() {
  const projects = useResumeStore((s) => s.resumeData.projects);
  const addProject = useResumeStore((s) => s.addProject);
  const updateProject = useResumeStore((s) => s.updateProject);
  const removeProject = useResumeStore((s) => s.removeProject);

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
        >
          <Rocket size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Projects
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Showcase your personal or open-source projects.
          </p>
        </div>
      </div>

      {/* ── Empty state ──────────────────────────────────── */}
      {projects.length === 0 && (
        <Card padding="md">
          <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
            No projects yet. Click the button below to add one.
          </p>
        </Card>
      )}

      {/* ── Entry cards ──────────────────────────────────── */}
      {projects.map((entry, index) => (
        <Card key={entry.id} padding="md" className="relative">
          {/* Delete button */}
          <div className="absolute top-3 right-3">
            <Button
              variant="danger"
              size="xs"
              onClick={() => removeProject(entry.id)}
              aria-label={`Remove project ${index + 1}`}
              leftIcon={<Trash2 size={12} />}
            >
              Remove
            </Button>
          </div>

          <p
            className="text-sm font-semibold mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            Project #{index + 1}
          </p>

          {/* Row 1: Name + URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id={`proj-name-${entry.id}`}
              label="Project Name"
              requiredMark
              placeholder="e.g. ToolPilot"
              value={entry.name}
              onChange={(e) => updateProject(entry.id, { name: e.target.value })}
              aria-label={`Name for project ${index + 1}`}
            />
            <Input
              id={`proj-url-${entry.id}`}
              label="URL"
              type="url"
              placeholder="e.g. github.com/user/project"
              value={entry.url ?? ''}
              onChange={(e) => updateProject(entry.id, { url: e.target.value })}
              aria-label={`URL for project ${index + 1}`}
            />
          </div>

          {/* Row 2: Technologies (comma-separated) */}
          <div className="mt-4">
            <Input
              id={`proj-tech-${entry.id}`}
              label="Technologies"
              placeholder="React, TypeScript, Vite (comma-separated)"
              value={entry.technologies.join(', ')}
              onChange={(e) =>
                updateProject(entry.id, {
                  technologies: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              helperText="Separate technologies with commas."
              aria-label={`Technologies for project ${index + 1}`}
            />
          </div>

          {/* Row 3: Description */}
          <div className="mt-4">
            <Textarea
              id={`proj-desc-${entry.id}`}
              label="Description"
              rows={3}
              placeholder="Brief description of the project, its purpose, and your role…"
              value={entry.description}
              onChange={(e) => updateProject(entry.id, { description: e.target.value })}
              aria-label={`Description for project ${index + 1}`}
            />
          </div>
        </Card>
      ))}

      {/* ── Add button ───────────────────────────────────── */}
      <Button
        variant="secondary"
        onClick={() => addProject(createProject())}
        leftIcon={<Plus size={16} />}
        aria-label="Add project entry"
      >
        Add Project
      </Button>
    </div>
  );
}
