import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { ClockIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';

const productivityTools = TOOLS.filter((t) => t.module === 'productivity');

export default function ProductivityModule() {
  return (
    <ModulePageWrapper
      moduleKey="productivity"
      moduleName="Productivity"
      description="Access free browser-based productivity tools including Pomodoro timers, collaborative To-Do lists, and habit trackers."
    >
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
    </ModulePageWrapper>
  );
}
