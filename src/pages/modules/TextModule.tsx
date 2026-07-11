import { ToolCard } from '@/components/ui/ToolCard';
import { FileText } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const textTools = TOOLS_BY_MODULE['text'] || [];

export default function TextModule() {
  return (
    <ModulePageWrapper
      moduleKey="text"
      moduleName="Text"
      description="Access free browser-based text tools including word counters, case converters, line comparative diff checkers, and markdown preview editors."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="text"
        title="Text Tools"
        description="Count words and paragraphs, convert text casings to standard formatting rules, review differences between paragraphs, and compile markdown previews."
        icon={<FileText size={24} strokeWidth={2} />}
        toolCount={textTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Text tools">
        {textTools.length > 0 ? (
          <div className="tools-grid mt-8">
            {textTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            className="py-20 text-center border rounded-2xl"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">📝</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tools Coming Soon
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              We're building text tools like word counters, case converters, and diff checkers. Check back soon!
            </p>
          </div>
        )}
      </section>
    </ModulePageWrapper>
  );
}
