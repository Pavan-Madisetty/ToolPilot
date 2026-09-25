import { TOOL_BY_ID } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';

interface RelatedToolsProps {
  toolIds: string[];
}

export function RelatedTools({ toolIds }: RelatedToolsProps) {
  const tools = toolIds.map((id) => TOOL_BY_ID[id]).filter(Boolean);
  if (tools.length === 0) return null;

  return (
    <section className="sk-related-tools" aria-labelledby="related-tools-heading">
      <h2 id="related-tools-heading" className="sk-section__title">
        You might also need
      </h2>
      <div className="sk-grid">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default RelatedTools;
