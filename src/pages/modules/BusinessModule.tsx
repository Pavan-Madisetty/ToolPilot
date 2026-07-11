import { ToolCard } from '@/components/ui/ToolCard';
import { Briefcase } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const businessTools = TOOLS_BY_MODULE['business'] || [];

export default function BusinessModule() {
  return (
    <ModulePageWrapper
      moduleKey="business"
      moduleName="Business"
      description="Access free browser-based business tools including PDF invoice builders and ROI calculators."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="business"
        title="Business Tools"
        description="Generate PDF invoices for clients, calculate return on investment metrics, and review business plan outlines locally."
        icon={<Briefcase size={24} strokeWidth={2} />}
        toolCount={businessTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Business tools">
        {businessTools.length > 0 ? (
          <div className="tools-grid mt-8">
            {businessTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            className="py-20 text-center border rounded-2xl"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">💼</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tools Coming Soon
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              We're building business tools like invoice builders and ROI calculators. Check back soon!
            </p>
          </div>
        )}
      </section>
    </ModulePageWrapper>
  );
}
