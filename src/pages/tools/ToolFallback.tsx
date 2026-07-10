import { useLocation } from 'react-router-dom';
import { TOOLS } from '@/config/tools';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import NotFoundPage from '@/pages/NotFoundPage';

export default function ToolFallback() {
  const location = useLocation();

  // Find the tool by slug
  const tool = TOOLS.find((t) => t.slug === location.pathname);

  if (!tool) {
    return <NotFoundPage />;
  }

  return (
    <ToolPageWrapper toolId={tool.id}>
      <div className="text-center py-16 border rounded-xl bg-slate-50 dark:bg-slate-800/40" style={{ borderColor: 'var(--border-default)' }}>
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Coming Soon</h2>
        <p style={{ color: 'var(--text-secondary)' }}>This tool is under development. Check back soon!</p>
      </div>
    </ToolPageWrapper>
  );
}
