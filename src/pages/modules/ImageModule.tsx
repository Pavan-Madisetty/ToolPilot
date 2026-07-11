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
      <section aria-label="Image tools">
        {imageTools.length > 0 ? (
          <div className="tools-grid mt-8">
            {imageTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            className="py-20 text-center border rounded-2xl"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">🖼️</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tools Coming Soon
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              We're building image utilities like compressors, resizers, and QR generators. Check back soon!
            </p>
          </div>
        )}
      </section>
    </ModulePageWrapper>
  );
}
