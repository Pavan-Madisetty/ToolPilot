import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { HeartIcon } from '@heroicons/react/24/outline';

const healthTools = TOOLS.filter((t) => t.module === 'health');

export default function HealthModule() {
  return (
    <>
      <Helmet>
        <title>Health Planners & Fitness Calculators | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based fitness utilities including BMI and calorie metrics."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Health' }]} />

        {/* Hero Banner Header */}
        <div
          className="p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 mb-12 mt-4"
          style={{
            borderColor: 'var(--border-default)',
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, transparent 100%)',
          }}
        >
          <div className="max-w-xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-rose-500"
              style={{ background: 'var(--bg-elevated)' }}
              aria-hidden="true"
            >
              <HeartIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Health Module
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Compute BMI (Body Mass Index) scores, determine healthy weight target scopes, and check baseline fitness metrics locally.
            </p>
          </div>
          <div className="text-right">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(244, 63, 94, 0.12)', color: '#e11d48' }}
            >
              {healthTools.length} Utilities Online
            </span>
          </div>
        </div>

        {/* Tools Grid */}
        <section aria-label="Health tools list">
          <div className="tools-grid">
            {healthTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
