import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';

const imageTools = TOOLS.filter((t) => t.module === 'image');

export default function ImageModule() {
  return (
    <>
      <Helmet>
        <title>Image Resizing & Compression Utilities | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based image utilities including compressors, dimension resizers, and custom QR generators."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Image' }]} />

        {/* Hero Banner Header */}
        <ModuleHeader
          title="Image Tools"
          description="Resize photo dimensions, compress file sizes to fit thresholds, and compile personalized QR code graphics in your browser."
          icon={<PhotoIcon className="w-6 h-6" />}
          iconColorClass="text-red-500"
          accentBgColor="rgba(239, 68, 68, 0.08)"
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
      </div>
    </>
  );
}
