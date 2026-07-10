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
