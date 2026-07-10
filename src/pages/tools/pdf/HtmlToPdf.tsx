import { useState, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, CopyButton, Textarea } from '@/components/ui';
import { FileText, Printer, Code, Eye } from 'lucide-react';

export default function HtmlToPdf() {
  const [html, setHtml] = useState(`<!-- Paste or write your HTML here -->
<div class="invoice-box">
  <h1>Invoice #1024</h1>
  <p>Date: July 10, 2026</p>
  <hr/>
  <div class="row">
    <span>Item 1: Web Development Services</span>
    <strong>$1,200.00</strong>
  </div>
  <div class="row">
    <span>Item 2: SEO Optimization</span>
    <strong>$450.00</strong>
  </div>
  <hr/>
  <div class="row total">
    <span>Total Due:</span>
    <strong>$1,650.00</strong>
  </div>
</div>`);

  const [css, setCss] = useState(`/* Write your CSS rules here */
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  padding: 20px;
}
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.total {
  font-size: 1.2em;
  font-weight: bold;
}
@media print {
  body {
    padding: 0;
  }
  .invoice-box {
    border: none;
    box-shadow: none;
    padding: 0;
  }
}`);

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const previewRef = useRef<HTMLIFrameElement>(null);

  const handlePrint = () => {
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
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Export PDF</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
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

  const handleClear = () => {
    setHtml('');
    setCss('');
  };

  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  return (
    <ToolPageWrapper toolId="html-to-pdf">
      <div className="flex flex-col gap-6">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-xl bg-[var(--bg-surface)] border-[var(--border-default)]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                activeTab === 'editor'
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Code size={16} />
              Code Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                activeTab === 'preview'
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Eye size={16} />
              Live Preview
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleClear} disabled={!html && !css}>
              Clear All
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              disabled={!html}
              className="flex items-center gap-2"
            >
              <Printer size={16} />
              Export to PDF
            </Button>
          </div>
        </div>

        {/* Core Editor / Preview Container */}
        {activeTab === 'editor' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              className="flex flex-col gap-4"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Code size={16} />
                  HTML Markup
                </span>
                <CopyButton text={html} size="sm" />
              </div>
              <Textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="Write your HTML here..."
                rows={18}
                className="font-mono text-xs w-full p-3 border rounded-lg bg-[var(--bg-base)] text-[var(--text-primary)] border-[var(--border-default)] outline-none focus:border-[var(--primary)]"
              />
            </Card>

            <Card
              className="flex flex-col gap-4"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <FileText size={16} />
                  CSS Stylesheet
                </span>
                <CopyButton text={css} size="sm" />
              </div>
              <Textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                placeholder="Write your CSS rules here..."
                rows={18}
                className="font-mono text-xs w-full p-3 border rounded-lg bg-[var(--bg-base)] text-[var(--text-primary)] border-[var(--border-default)] outline-none focus:border-[var(--primary)]"
              />
            </Card>
          </div>
        ) : (
          <Card
            className="flex flex-col h-[550px] p-0 overflow-hidden"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
          >
            <div className="p-3 border-b flex items-center justify-between bg-[var(--bg-surface)] border-[var(--border-default)]">
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Sandboxed Document Output Preview
              </span>
            </div>
            <iframe
              ref={previewRef}
              srcDoc={iframeSrcDoc}
              title="HTML PDF Sandbox Preview"
              className="flex-1 w-full border-none bg-white"
              sandbox="allow-same-origin"
            />
          </Card>
        )}
      </div>
    </ToolPageWrapper>
  );
}
