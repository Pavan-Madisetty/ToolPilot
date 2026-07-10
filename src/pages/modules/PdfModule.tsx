import { FileText } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';

const pdfTools = TOOLS_BY_MODULE['pdf'] || [];

export default function PdfModule() {
  return (
    <ModulePageWrapper
      moduleKey="pdf"
      moduleName="PDF"
      description="Access free browser-based PDF tools to convert code and documents directly into print-ready PDF formats."
    >
      {/* Hero Header */}
      <ModuleHeader
        moduleKey="pdf"
        title="PDF Tools"
        description="Convert HTML/CSS code, images (JPG/PNG), and Markdown text documents into styled, print-ready PDF files securely in your browser."
        icon={<FileText size={24} strokeWidth={2} />}
        toolCount={pdfTools.length}
      />

      {/* Tools Grid */}
      {pdfTools.length > 0 ? (
        <div className="tools-grid mt-8">
          {pdfTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div
          className="py-20 text-center border rounded-2xl bg-white dark:bg-slate-800"
          style={{ borderColor: 'var(--border-default)' }}
        >
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            PDF Utilities Under Construction
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We are building client-side rendering engines to support completely private document conversions. Check back soon!
          </p>
        </div>
      )}
    </ModulePageWrapper>
  );
}
