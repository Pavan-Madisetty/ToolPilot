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
      <section aria-label="Text tools list">
        <div className="tools-grid">
          {textTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </ModulePageWrapper>
  );
}
