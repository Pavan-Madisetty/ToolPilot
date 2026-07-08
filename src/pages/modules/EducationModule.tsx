import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

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
        <div
          className="p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 mb-12 mt-4"
          style={{
            borderColor: 'var(--border-default)',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, transparent 100%)',
          }}
        >
          <div className="max-w-xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-500"
              style={{ background: 'var(--bg-elevated)' }}
              aria-hidden="true"
            >
              <AcademicCapIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Education Module
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Calculate CGPA benchmarks, compute scientific formulas, estimate age breakdowns, and solve multi-mode percentage ratios.
            </p>
          </div>
          <div className="text-right">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}
            >
              {educationTools.length} Utilities Online
            </span>
          </div>
        </div>

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
