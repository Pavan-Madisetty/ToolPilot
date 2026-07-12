import { useState, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton } from '@/components/ui';
import { Upload, FileText, CheckCircle, RefreshCw } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

interface PdfTextItem {
  str: string;
  transform: number[];
}

interface PdfJsDocument {
  numPages: number;
  getPage: (index: number) => Promise<{
    getTextContent: () => Promise<{
      items: PdfTextItem[];
    }>;
  }>;
}

interface PdfJsLib {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (options: { data: ArrayBuffer }) => {
    promise: Promise<PdfJsDocument>;
  };
}

export default function PdfToMarkdown() {
  const { addToast } = useUIStore();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPdfJS = () => {
    return new Promise<PdfJsLib>((resolve, reject) => {
      const globalWindow = window as unknown as { pdfjsLib?: PdfJsLib };
      if (globalWindow.pdfjsLib) {
        resolve(globalWindow.pdfjsLib);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
      script.onload = () => {
        const pdfjs = globalWindow.pdfjsLib;
        if (pdfjs) {
          pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
          resolve(pdfjs);
        } else {
          reject(new Error('Failed to load PDF.js engine'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load PDF.js engine'));
      document.body.appendChild(script);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processPdf(file);
  };

  const processPdf = async (file: File) => {
    setFileName(file.name);
    setLoading(true);
    setMarkdown('');
    setProgress('Loading PDF engine...');

    try {
      const pdfjs = await loadPdfJS();
      setProgress('Reading file...');

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      let fullText = '';

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Extracting page ${i} of ${numPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        let lastY = -1;
        let pageText = '';

        for (const item of textContent.items) {
          // Approximate basic formatting (add newlines for new visual lines)
          if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 10) {
            pageText += '\n';
          }
          pageText += item.str + ' ';
          lastY = item.transform[5];
        }

        fullText += `\n\n## Page ${i}\n\n` + pageText;
      }

      // Convert double newlines/headers into cleaner markdown
      const cleanedMarkdown = fullText
        .replace(/\n{3,}/g, '\n\n')
        .replace(/Page\s+(\d+)/gi, '\n### Page $1\n')
        .trim();

      setMarkdown(cleanedMarkdown);
      addToast({
        type: 'success',
        title: 'PDF Extracted',
        message: 'Successfully extracted text to Markdown formatting!',
      });
    } catch (err: unknown) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Could not parse the PDF document.';
      addToast({
        type: 'error',
        title: 'Extraction Failed',
        message: errMsg,
      });
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      await processPdf(file);
    } else {
      addToast({
        type: 'error',
        title: 'Invalid File',
        message: 'Please drop a valid PDF file.',
      });
    }
  };

  return (
    <ToolPageWrapper toolId="pdf-to-markdown">
      <div className="space-y-6">
        {/* Upload Container Zone */}
        {!markdown && !loading && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[var(--border-default)] hover:border-[var(--primary)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] rounded-2xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-4"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />
            <div className="p-4 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
              <Upload size={32} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Drag & Drop PDF document here
              </h3>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">
                or click to browse local files (max 25MB)
              </p>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="border border-[var(--border-default)] bg-[var(--bg-elevated)] rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 animate-pulse">
            <RefreshCw className="animate-spin text-[var(--primary)]" size={32} />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{progress}</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">Processing locally in your browser...</p>
            </div>
          </div>
        )}

        {/* Result Area */}
        {markdown && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-[var(--bg-elevated)] p-4 rounded-xl border border-[var(--border-default)]">
              <div className="flex items-center gap-3">
                <FileText className="text-[var(--primary)]" />
                <div>
                  <p className="text-sm font-semibold truncate max-w-xs md:max-w-md">{fileName}</p>
                  <p className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
                    <CheckCircle size={12} className="text-green-500" /> Extraction Completed
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setMarkdown('');
                  setFileName('');
                }}
                variant="secondary"
                size="sm"
              >
                Upload Another
              </Button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[var(--text-secondary)]">Formatted Markdown</span>
              <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] min-h-[300px] flex flex-col justify-between">
                <pre className="text-sm font-mono leading-relaxed overflow-auto max-h-[400px] whitespace-pre-wrap select-all text-[var(--text-primary)]">
                  {markdown}
                </pre>
                <div className="flex justify-end mt-4 pt-4 border-t border-[var(--border-subtle)]">
                  <CopyButton text={markdown} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
