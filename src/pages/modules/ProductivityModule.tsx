import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { ClockIcon } from '@heroicons/react/24/outline';

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
        <div
          className="p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 mb-12 mt-4"
          style={{
            borderColor: 'var(--border-default)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, transparent 100%)',
          }}
        >
          <div className="max-w-xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-emerald-500"
              style={{ background: 'var(--bg-elevated)' }}
              aria-hidden="true"
            >
              <ClockIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Productivity Module
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Maintain daily task lists, log focus sessions with Pomodoro count cycles, and track streaks on personal habits.
            </p>
          </div>
          <div className="text-right">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}
            >
              {productivityTools.length} Utilities Online
            </span>
          </div>
        </div>

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
