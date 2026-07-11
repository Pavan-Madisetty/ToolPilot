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
      <section aria-label="Productivity tools">
        {productivityTools.length > 0 ? (
          <div className="tools-grid mt-8">
            {productivityTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            className="py-20 text-center border rounded-2xl"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">⏱️</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tools Coming Soon
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              We're building productivity tools like Pomodoro timers and to-do lists. Check back soon!
            </p>
          </div>
        )}
      </section>
    </ModulePageWrapper>
  );
}
