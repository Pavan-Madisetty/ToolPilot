import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function ColorPicker() {
  return (
    <ToolPageWrapper toolId="color-picker">
      <div className="text-center py-16 border rounded-xl bg-slate-50 dark:bg-slate-800/40" style={{ borderColor: 'var(--border-default)' }}>
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Coming Soon</h2>
        <p style={{ color: 'var(--text-secondary)' }}>This tool is under development. Check back soon!</p>
      </div>
    </ToolPageWrapper>
  );
}
