import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';

const businessTools = TOOLS.filter((t) => t.module === 'business');

export default function BusinessModule() {
  return (
    <ModulePageWrapper
      moduleKey="business"
      moduleName="Business"
      description="Access free browser-based business tools including PDF invoice builders and ROI calculators."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        title="Business Tools"
        description="Generate PDF invoices for clients, calculate return on investment metrics, and review business plan outlines locally."
        icon={<BriefcaseIcon className="w-6 h-6" />}
        iconColorClass="text-indigo-500"
        accentBgColor="rgba(79, 70, 229, 0.08)"
        toolCount={businessTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Business tools list">
        <div className="tools-grid">
          {businessTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </ModulePageWrapper>
  );
}
