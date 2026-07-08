import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

const businessTools = TOOLS.filter((t) => t.module === 'business');

export default function BusinessModule() {
  return (
    <>
      <Helmet>
        <title>Business Calculators & Invoice Generators | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based business tools including PDF invoice builders and ROI calculators."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Business' }]} />

        {/* Hero Banner Header */}
        <div
          className="p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 mb-12 mt-4"
          style={{
            borderColor: 'var(--border-default)',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, transparent 100%)',
          }}
        >
          <div className="max-w-xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-indigo-500"
              style={{ background: 'var(--bg-elevated)' }}
              aria-hidden="true"
            >
              <BriefcaseIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Business Module
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Generate PDF invoices for clients, calculate return on investment metrics, and review business plan outlines locally.
            </p>
          </div>
          <div className="text-right">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(79, 70, 229, 0.12)', color: '#4f46e5' }}
            >
              {businessTools.length} Utilities Online
            </span>
          </div>
        </div>

        {/* Tools Grid */}
        <section aria-label="Business tools list">
          <div className="tools-grid">
            {businessTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
