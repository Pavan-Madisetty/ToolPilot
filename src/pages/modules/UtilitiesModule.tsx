import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { SparklesIcon } from '@heroicons/react/24/outline';

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
        <div
          className="p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 mb-12 mt-4"
          style={{
            borderColor: 'var(--border-default)',
            background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.08) 0%, transparent 100%)',
          }}
        >
          <div className="max-w-xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-yellow-500"
              style={{ background: 'var(--bg-elevated)' }}
              aria-hidden="true"
            >
              <SparklesIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Utilities Module
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Compute discount rates, check date intervals (days between dates), and translate digital color models.
            </p>
          </div>
          <div className="text-right">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(234, 179, 8, 0.12)', color: '#ca8a04' }}
            >
              {utilitiesTools.length} Utilities Online
            </span>
          </div>
        </div>

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
