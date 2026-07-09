import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CpuChipIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';

export default function AiModule() {
  return (
    <>
      <Helmet>
        <title>AI Writing & Translation Tools | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based AI models to translate strings, review career resumes, and generate text drafts locally."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'AI Writing' }]} />

        {/* Hero Header */}
        <ModuleHeader
          title="AI Writing Module"
          description="Leverage local browser LLMs to rewrite text copy, correct grammatical compositions, and optimize resume profiles securely."
          icon={<CpuChipIcon className="w-6 h-6" />}
          iconColorClass="text-pink-500"
          accentBgColor="rgba(236, 72, 153, 0.08)"
        />

        {/* Coming soon board */}
        <div className="py-20 text-center border rounded-2xl bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Local Web-LLM Models Coming Soon</h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We are integrating WebGPU-accelerated models (such as Llama 3) to execute AI workflows entirely inside your browser cache. Stay tuned!
          </p>
        </div>
      </div>
    </>
  );
}
