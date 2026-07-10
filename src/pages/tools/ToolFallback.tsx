import { useLocation } from 'react-router-dom';
import { TOOLS } from '@/config/tools';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { ComingSoon } from '@/components/shared/ComingSoon';
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
      <ComingSoon name={tool.name} />
    </ToolPageWrapper>
  );
}
