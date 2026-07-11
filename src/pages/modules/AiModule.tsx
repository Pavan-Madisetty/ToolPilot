import { Cpu } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';

const aiTools = TOOLS_BY_MODULE['ai'] || [];

export default function AiModule() {
  return (
    <ModulePageWrapper
      moduleKey="ai"
      moduleName="AI Writing"
      description="Access free browser-based AI writing assistants to optimize resumes, generate emails, and draft cover letters."
    >
      {/* Hero Header */}
      <ModuleHeader
        moduleKey="ai"
        title="AI Writing Tools"
        description="Leverage smart offline text assistants to structure ChatGPT prompts, draft professional emails, build resume profiles, and create cover letters securely."
        icon={<Cpu size={24} strokeWidth={2} />}
        toolCount={aiTools.length}
      />

      {/* Tools Grid */}
      {aiTools.length > 0 ? (
        <section aria-label="AI Writing tools">
          <div className="tools-grid mt-8">
            {aiTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      ) : (
        <div
          className="py-20 text-center border rounded-2xl"
          style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
        >
          <div className="text-6xl mb-4" aria-hidden="true">🤖</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Local Web-LLM Models Coming Soon
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We are integrating WebGPU-accelerated models (such as Llama 3) to execute AI workflows entirely inside your browser cache. Stay tuned!
          </p>
        </div>
      )}
    </ModulePageWrapper>
  );
}
