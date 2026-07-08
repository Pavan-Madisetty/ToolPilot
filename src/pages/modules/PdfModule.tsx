import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export default function PdfModule() {
  return (
    <>
      <Helmet>
        <title>PDF Document Management Utilities | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based PDF tools to merge files, split pages, compress file size, and digitally sign documents locally."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'PDF' }]} />

        {/* Hero Header */}
        <div
          className="p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 mb-12 mt-4"
          style={{
            borderColor: 'var(--border-default)',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, transparent 100%)',
          }}
        >
          <div className="max-w-xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-500"
              style={{ background: 'var(--bg-elevated)' }}
              aria-hidden="true"
            >
              <DocumentDuplicateIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              PDF Module
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Merge multiple document pages, split sheets into separate PDFs, optimize file compressions, and add annotations or digital signatures safely.
            </p>
          </div>
        </div>

        {/* Coming soon board */}
        <div className="py-20 text-center border rounded-2xl bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>PDF Utilities Under Construction</h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We are building client-side WebAssembly rendering engines to support completely private document conversions. Check back soon!
          </p>
        </div>
      </div>
    </>
  );
}
