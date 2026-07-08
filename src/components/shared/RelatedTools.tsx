import { Link } from 'react-router-dom';
import { TOOL_BY_ID } from '@/config/tools';
import { MODULE_MAP } from '@/config/modules';
import { StarIcon } from '@heroicons/react/24/outline';

interface RelatedToolsProps {
  toolIds: string[];
}

export function RelatedTools({ toolIds }: RelatedToolsProps) {
  // Map IDs to actual configurations, filtering out missing ones
  const tools = toolIds.map((id) => TOOL_BY_ID[id]).filter(Boolean);

  if (tools.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <StarIcon className="w-5 h-5 text-yellow-500" />
        Related Tools
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const moduleConfig = MODULE_MAP[tool.module];
          return (
            <Link
              key={tool.id}
              to={tool.slug}
              className="flex flex-col gap-1.5 p-4 rounded-xl border bg-white dark:bg-slate-800 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all text-decoration-none group"
              style={{
                borderColor: 'var(--border-default)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold group-hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {tool.name}
                </span>
                {moduleConfig && (
                  <span className={`badge module-badge-${tool.module}`}>
                    {moduleConfig.name}
                  </span>
                )}
              </div>
              <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {tool.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
export default RelatedTools;
