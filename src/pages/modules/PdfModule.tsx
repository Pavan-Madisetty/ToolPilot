import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';

export default function PdfModule() {
  return (
    <ModulePageWrapper
      moduleKey="pdf"
      moduleName="PDF"
      description="Access free browser-based PDF tools to merge files, split pages, compress file size, and digitally sign documents locally."
    >
      {/* Hero Header */}
      <ModuleHeader
        title="PDF Module"
        description="Merge multiple document pages, split sheets into separate PDFs, optimize file compressions, and add annotations or digital signatures safely."
        icon={<DocumentDuplicateIcon className="w-6 h-6" />}
        iconColorClass="text-blue-500"
        accentBgColor="rgba(59, 130, 246, 0.08)"
      />

      {/* Coming soon board */}
      <div className="py-20 text-center border rounded-2xl bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>PDF Utilities Under Construction</h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          We are building client-side WebAssembly rendering engines to support completely private document conversions. Check back soon!
        </p>
      </div>
    </ModulePageWrapper>
  );
}
