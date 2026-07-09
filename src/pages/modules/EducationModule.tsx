import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';

const educationTools = TOOLS.filter((t) => t.module === 'education');

export default function EducationModule() {
  return (
    <>
      <Helmet>
        <title>Academic Planners & Educational Calculators | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based educational tools including scientific calculators, GPA/CGPA grids, age calculators, and percentage converters."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Education' }]} />

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
      </div>
    </>
  );
}
