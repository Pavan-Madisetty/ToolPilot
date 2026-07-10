import { useResumeStore } from '@/stores/resumeStore';
import { Button } from '@/components/ui';
import { Printer, Save, RefreshCw, Trash2, FileText } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

export default function ExportControls() {
  const { customization, updateCustomization, loadSampleData, resetAll } = useResumeStore();
  const { addToast } = useUIStore();

  const handleExportPDF = () => {
    // Look up the preview element rendered inside the iframe container or local DOM
    const previewEl = document.querySelector('.resume-template-container');
    if (!previewEl) {
      addToast({
        type: 'warning',
        title: 'Export Failed',
        message: 'Could not find resume layout for export.',
      });
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      // Read style elements from primary document
      const styleTags = Array.from(document.querySelectorAll('style'))
        .map((s) => s.outerHTML)
        .join('\n');
      const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map((l) => l.outerHTML)
        .join('\n');
      const innerHtml = previewEl.innerHTML;

      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Resume Export</title>
            ${linkTags}
            ${styleTags}
            <style>
              body {
                margin: 0;
                padding: 0;
                background: white;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              @page {
                size: ${customization.pageSize.toLowerCase()};
                margin: 0;
              }
              .resume-template-container {
                width: 100% !important;
                max-width: 100% !important;
                box-shadow: none !important;
                border: none !important;
                padding: 0 !important;
                margin: 0 !important;
              }
              /* Hide screen-only interactive states */
              .print-hidden {
                display: none !important;
              }
            </style>
          </head>
          <body>
            <div class="resume-template-container">
              ${innerHtml}
            </div>
          </body>
        </html>
      `);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    }
  };

  const handleSaveProgress = () => {
    addToast({
      type: 'success',
      title: 'Progress Saved',
      message: 'Resume data auto-saved in local cache.',
    });
  };

  const handleLoadSample = () => {
    loadSampleData();
    addToast({
      type: 'info',
      title: 'Demo Loaded',
      message: 'Sample mock profile data loaded.',
    });
  };

  const handleReset = () => {
    const confirmClear = window.confirm(
      'Are you sure you want to clear your current progress? This will reset all entered fields.'
    );
    if (confirmClear) {
      resetAll();
      addToast({
        type: 'error',
        title: 'Resume Cleared',
        message: 'All resume profile data cleared.',
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between p-4 border rounded-xl bg-[var(--bg-surface)] border-[var(--border-default)]">
      {/* Document format selector */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => updateCustomization({ pageSize: 'A4' })}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
            customization.pageSize === 'A4'
              ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
              : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-base)]'
          }`}
        >
          <FileText size={12} />
          A4
        </button>
        <button
          onClick={() => updateCustomization({ pageSize: 'Letter' })}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
            customization.pageSize === 'Letter'
              ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
              : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-base)]'
          }`}
        >
          <FileText size={12} />
          Letter
        </button>
      </div>

      {/* Primary Print/Download Action */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">
          <Trash2 size={16} />
        </Button>
        <Button variant="secondary" size="sm" onClick={handleLoadSample} className="flex items-center gap-1.5">
          <RefreshCw size={14} />
          Load Demo
        </Button>
        <Button variant="secondary" size="sm" onClick={handleSaveProgress} className="flex items-center gap-1.5">
          <Save size={14} />
          Save
        </Button>
        <Button variant="primary" size="sm" onClick={handleExportPDF} className="flex items-center gap-1.5">
          <Printer size={16} />
          Download PDF
        </Button>
      </div>
    </div>
  );
}
