import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { ScaleIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';

const conversionTools = TOOLS.filter((t) => t.module === 'conversion');

export default function ConversionModule() {
  return (
    <>
      <Helmet>
        <title>Unit Conversions & Measurement Tools | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based unit conversion calculators including length, weight, and temperature metrics."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Conversion' }]} />

        {/* Hero Banner Header */}
        <ModuleHeader
          title="Conversion Tools"
          description="Translate metric lengths, compare mass weight values, and convert Celsius/Fahrenheit temperature scales instantly."
          icon={<ScaleIcon className="w-6 h-6" />}
          iconColorClass="text-teal-500"
          accentBgColor="rgba(20, 184, 166, 0.08)"
          toolCount={conversionTools.length}
        />

        {/* Tools Grid */}
        <section aria-label="Conversion tools list">
          <div className="tools-grid">
            {conversionTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
