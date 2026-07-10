import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';

const educationTools = TOOLS.filter((t) => t.module === 'education');

export default function EducationModule() {
  return (
    <ModulePageWrapper
      moduleKey="education"
      moduleName="Education"
      description="Access free browser-based educational tools including scientific calculators, GPA/CGPA grids, age calculators, and percentage converters."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        title="Education Tools"
        description="Calculate CGPA benchmarks, compute scientific formulas, estimate age breakdowns, and solve multi-mode percentage ratios."
        icon={<AcademicCapIcon className="w-6 h-6" />}
        iconColorClass="text-blue-500"
        accentBgColor="rgba(59, 130, 246, 0.08)"
        toolCount={educationTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Education tools list">
        <div className="tools-grid">
          {educationTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </ModulePageWrapper>
  );
}
