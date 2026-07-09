import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { ClockIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';

const productivityTools = TOOLS.filter((t) => t.module === 'productivity');

export default function ProductivityModule() {
  return (
    <>
      <Helmet>
        <title>Productivity Planners & Time Tracking Utilities | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based productivity tools including Pomodoro timers, collaborative To-Do lists, and habit trackers."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Productivity' }]} />

        {/* Hero Banner Header */}
        <ModuleHeader
          title="Productivity Tools"
          description="Maintain daily task lists, log focus sessions with Pomodoro count cycles, and track streaks on personal habits."
          icon={<ClockIcon className="w-6 h-6" />}
          iconColorClass="text-emerald-500"
          accentBgColor="rgba(16, 185, 129, 0.08)"
          toolCount={productivityTools.length}
        />

        {/* Tools Grid */}
        <section aria-label="Productivity tools list">
          <div className="tools-grid">
            {productivityTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
