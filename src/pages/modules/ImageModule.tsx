import { ToolCard } from '@/components/ui/ToolCard';
import { Image as ImageIcon } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const imageTools = TOOLS_BY_MODULE['image'] || [];

export default function ImageModule() {
  return (
    <ModulePageWrapper
      moduleKey="image"
      moduleName="Image"
      description="Access free browser-based image utilities including compressors, dimension resizers, and custom QR generators."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="image"
        title="Image Tools"
        description="Resize photo dimensions, compress file sizes to fit thresholds, and compile personalized QR code graphics in your browser."
        icon={<ImageIcon size={24} strokeWidth={2} />}
        toolCount={imageTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Image tools list">
        <div className="tools-grid">
          {imageTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </ModulePageWrapper>
  );
}
