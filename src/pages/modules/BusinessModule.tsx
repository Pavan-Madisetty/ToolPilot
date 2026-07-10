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
