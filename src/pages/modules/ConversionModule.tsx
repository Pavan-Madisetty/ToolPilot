import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { ScaleIcon } from '@heroicons/react/24/outline';

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
        <div
          className="p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 mb-12 mt-4"
          style={{
            borderColor: 'var(--border-default)',
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, transparent 100%)',
          }}
        >
          <div className="max-w-xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-teal-500"
              style={{ background: 'var(--bg-elevated)' }}
              aria-hidden="true"
            >
              <ScaleIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Conversion Module
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Translate metric lengths, compare mass weight values, and convert Celsius/Fahrenheit temperature scales instantly.
            </p>
          </div>
          <div className="text-right">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(20, 184, 166, 0.12)', color: '#0d9488' }}
            >
              {conversionTools.length} Utilities Online
            </span>
          </div>
        </div>

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
