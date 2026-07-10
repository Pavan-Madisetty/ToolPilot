import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { ComingSoon } from '@/components/shared/ComingSoon';

export default function TodoList() {
  return (
    <ToolPageWrapper toolId="todo">
      <ComingSoon name="To-Do List" />
    </ToolPageWrapper>
  );
}
