import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';

const utilitiesTools = TOOLS.filter((t) => t.module === 'utilities');

export default function UtilitiesModule() {
  return (
    <>
      <Helmet>
        <title>General Calculations & Utility Widgets | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based general utilities including discount calculators, date differences trackers, and hex color code tools."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Utilities' }]} />

        {/* Hero Banner Header */}
        <ModuleHeader
          title="Utility Tools"
          description="Compute discount rates, check date intervals (days between dates), and translate digital color models."
          icon={<SparklesIcon className="w-6 h-6" />}
          iconColorClass="text-yellow-500"
          accentBgColor="rgba(234, 179, 8, 0.08)"
          toolCount={utilitiesTools.length}
        />

        {/* Tools Grid */}
        <section aria-label="Utilities tools list">
          <div className="tools-grid">
            {utilitiesTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
