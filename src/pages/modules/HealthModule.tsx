import { ToolCard } from '@/components/ui/ToolCard';
import { Heart } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const healthTools = TOOLS_BY_MODULE['health'] || [];

export default function HealthModule() {
  return (
    <ModulePageWrapper
      moduleKey="health"
      moduleName="Health"
      description="Access free browser-based fitness utilities including BMI and calorie metrics."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="health"
        title="Health Tools"
        description="Compute BMI (Body Mass Index) scores, determine healthy weight target scopes, and check baseline fitness metrics locally."
        icon={<Heart size={24} strokeWidth={2} />}
        toolCount={healthTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Health tools list">
        <div className="tools-grid">
          {healthTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </ModulePageWrapper>
  );
}
