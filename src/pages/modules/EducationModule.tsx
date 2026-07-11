import { ToolCard } from '@/components/ui/ToolCard';
import { GraduationCap } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const educationTools = TOOLS_BY_MODULE['education'] || [];

export default function EducationModule() {
  return (
    <ModulePageWrapper
      moduleKey="education"
      moduleName="Education"
      description="Access free browser-based educational tools including scientific calculators, GPA/CGPA grids, age calculators, and percentage converters."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="education"
        title="Education Tools"
        description="Calculate CGPA benchmarks, compute scientific formulas, estimate age breakdowns, and solve multi-mode percentage ratios."
        icon={<GraduationCap size={24} strokeWidth={2} />}
        toolCount={educationTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Education tools">
        {educationTools.length > 0 ? (
          <div className="tools-grid mt-8">
            {educationTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            className="py-20 text-center border rounded-2xl"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">🎓</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tools Coming Soon
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              We're building educational tools like scientific calculators and GPA grids. Check back soon!
            </p>
          </div>
        )}
      </section>
    </ModulePageWrapper>
  );
}
