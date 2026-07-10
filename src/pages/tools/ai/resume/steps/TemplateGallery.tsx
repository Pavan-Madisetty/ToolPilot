// ─────────────────────────────────────────────────────────────
// Step 8 — Template Gallery
// ─────────────────────────────────────────────────────────────
import { useResumeStore } from '@/stores/resumeStore';
import type { TemplateConfig } from '@/types/resume';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Check, Palette } from 'lucide-react';

import { TEMPLATES } from '../templates/registry';

/** Renders ATS rating as filled / empty stars */
function AtsStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`ATS rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-sm"
          style={{ color: i < rating ? '#f59e0b' : 'var(--border-default)' }}
        >
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

/** Renders three small color circles showing template default colours */
function ColorDots({ colors }: { colors: TemplateConfig['defaultColors'] }) {
  return (
    <div className="flex gap-1.5" aria-label="Template colour palette">
      {[colors.primary, colors.secondary, colors.accent].map((c, i) => (
        <span
          key={i}
          className="inline-block w-4 h-4 rounded-full border"
          style={{ backgroundColor: c, borderColor: 'var(--border-default)' }}
        />
      ))}
    </div>
  );
}

export default function TemplateGallery() {
  const selectedId = useResumeStore((s) => s.customization.templateId);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const updateCustomization = useResumeStore((s) => s.updateCustomization);

  const handleSelect = (t: TemplateConfig) => {
    setTemplate(t.id);
    updateCustomization({
      primaryColor: t.defaultColors.primary,
      secondaryColor: t.defaultColors.secondary,
      accentColor: t.defaultColors.accent,
    });
  };

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
        >
          <Palette size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Choose a Template
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Pick a design that best suits your industry and style.
          </p>
        </div>
      </div>

      {/* ── Template grid ────────────────────────────────── */}
      {TEMPLATES.length === 0 ? (
        <Card padding="md">
          <p className="text-center py-10" style={{ color: 'var(--text-secondary)' }}>
            No templates available yet. The template registry will be populated soon.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map((t) => {
            const isSelected = selectedId === t.id;
            return (
              <Card
                key={t.id}
                padding="md"
                interactive
                className="relative transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: isSelected ? 'var(--primary)' : undefined,
                  borderWidth: isSelected ? '2px' : undefined,
                  transform: isSelected ? 'scale(1.02)' : undefined,
                }}
                onClick={() => handleSelect(t)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${t.name} template`}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(t);
                  }
                }}
              >
                {/* Selected checkmark overlay */}
                {isSelected && (
                  <div
                    className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full"
                    style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
                  >
                    <Check size={14} />
                  </div>
                )}

                {/* Template name */}
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t.name}
                </h3>

                {/* Description */}
                <p
                  className="text-sm mb-3 line-clamp-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t.description}
                </p>

                {/* Meta: ATS rating + best for badge */}
                <div className="flex items-center justify-between mb-3">
                  <AtsStars rating={t.atsRating} />
                  <Badge variant="info">{t.bestFor}</Badge>
                </div>

                {/* Color palette + Use button */}
                <div className="flex items-center justify-between">
                  <ColorDots colors={t.defaultColors} />
                  <Button
                    variant={isSelected ? 'success' : 'primary'}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(t);
                    }}
                    leftIcon={isSelected ? <Check size={14} /> : undefined}
                    aria-label={`Use ${t.name} template`}
                  >
                    {isSelected ? 'Selected' : 'Use Template'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
