import { ToolCard } from '@/components/ui/ToolCard';
import { Clock } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const productivityTools = TOOLS_BY_MODULE['productivity'] || [];

export default function ProductivityModule() {
  return (
    <ModulePageWrapper
      moduleKey="productivity"
      moduleName="Productivity"
      description="Access free browser-based productivity tools including Pomodoro timers, collaborative To-Do lists, and habit trackers."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="productivity"
        title="Productivity Tools"
        description="Maintain daily task lists, log focus sessions with Pomodoro count cycles, and track streaks on personal habits."
        icon={<Clock size={24} strokeWidth={2} />}
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
