import { useState, useMemo, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, CopyButton, Textarea } from '@/components/ui';
import { Printer, Code, Eye, FileText } from 'lucide-react';

export default function MarkdownToPdf() {
  const [markdown, setMarkdown] = useState(`# Project Status Report

## Overview
This is a standard project status report generated dynamically from Markdown. You can edit this text to generate your own PDF reports.

## Achievements
- Completed design system standardization
- Implemented 101 core browser tools
- Optimized SEO configurations and performance page indexing

## Timeline
1. **Phase 1**: Initial repository architecture setup (Completed)
2. **Phase 2**: Tool engine core framework builder (Completed)
3. **Phase 3**: Dynamic PDF conversion features (In Progress)

## Notes
All computations happen *locally* within the browser, keeping your documentation fully private and secure.`);

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [pageSize, setPageSize] = useState<'A4' | 'Letter'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Simple client-side Markdown to HTML compiler
  const htmlContent = useMemo(() => {
    let html = markdown;

    // Escaping HTML entities to prevent raw HTML execution inside Markdown unless intended
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');

    // Bold & Italics
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Unordered lists
    html = html.replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, ''); // merge lists

    // Ordered lists
    html = html.replace(/^\d+\.\s(.*$)/gim, '<ol><li>$1</li></ol>');
    html = html.replace(/<\/ol>\s*<ol>/g, ''); // merge lists

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr/>');

    // Paragraph lines - wrap any non-empty line that doesn't start with block element
    const lines = html.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<hr')
      ) {
        return line;
      }
      return `<p>${line}</p>`;
    });
    html = processedLines.join('\n');

    return html;
  }, [markdown]);

  const cssStyles = `
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 40px;
    }
    h1 {
      font-size: 2.2em;
      border-bottom: 2px solid #eaecef;
      padding-bottom: 0.3em;
      margin-top: 0;
      color: #111;
    }
    h2 {
      font-size: 1.6em;
      border-bottom: 1px solid #eaecef;
      padding-bottom: 0.3em;
      margin-top: 1.5em;
      color: #222;
    }
    h3 {
      font-size: 1.3em;
      margin-top: 1.5em;
      color: #333;
    }
    p {
      margin-top: 0;
      margin-bottom: 1em;
    }
    ul, ol {
      padding-left: 2em;
      margin-bottom: 1em;
    }
    li {
      margin-bottom: 0.5em;
    }
    blockquote {
      margin: 0 0 1em;
      padding: 0 1em;
      color: #6a737d;
      border-left: 0.25em solid #dfe2e5;
    }
    hr {
      height: 0.25em;
      padding: 0;
      margin: 24px 0;
      background-color: #e1e4e6;
      border: 0;
    }
    @media print {
      body {
        padding: 0;
      }
    }
  `;

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
              @page {
                size: ${pageSize.toLowerCase()} ${orientation};
                margin: 20mm;
              }
              ${cssStyles}
            </style>
          </head>
          <body>
            ${htmlContent}
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

  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          ${cssStyles}
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  return (
    <ToolPageWrapper toolId="markdown-to-pdf">
      <div className="flex flex-col gap-6">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-xl bg-[var(--bg-surface)] border-[var(--border-default)]">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                activeTab === 'editor'
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Code size={16} />
              Markdown Editor
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

          <div className="flex items-center gap-4 flex-wrap">
            {/* Page Size Selection */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Page:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as 'A4' | 'Letter')}
                className="text-xs p-1.5 border rounded-md bg-[var(--bg-base)] text-[var(--text-primary)] border-[var(--border-default)] outline-none"
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
              </select>
            </div>

            {/* Page Orientation Selection */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Orient:</span>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
                className="text-xs p-1.5 border rounded-md bg-[var(--bg-base)] text-[var(--text-primary)] border-[var(--border-default)] outline-none"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <Button variant="secondary" size="sm" onClick={() => setMarkdown('')} disabled={!markdown}>
              Clear
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              disabled={!markdown}
              className="flex items-center gap-2"
            >
              <Printer size={16} />
              Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* Core Editor / Preview Container */}
        {activeTab === 'editor' ? (
          <Card
            className="flex flex-col gap-4"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <FileText size={16} />
                Markdown Code
              </span>
              <CopyButton text={markdown} size="sm" />
            </div>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Write your markdown document here..."
              rows={18}
              className="font-mono text-xs w-full p-3 border rounded-lg bg-[var(--bg-base)] text-[var(--text-primary)] border-[var(--border-default)] outline-none focus:border-[var(--primary)]"
            />
          </Card>
        ) : (
          <Card
            className="flex flex-col h-[550px] p-0 overflow-hidden"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
          >
            <div className="p-3 border-b flex items-center justify-between bg-[var(--bg-surface)] border-[var(--border-default)]">
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Styled PDF Document Preview
              </span>
              <CopyButton text={htmlContent} label="Copy HTML Output" size="sm" />
            </div>
            <iframe
              ref={previewRef}
              srcDoc={iframeSrcDoc}
              title="Markdown PDF Sandbox Preview"
              className="flex-1 w-full border-none bg-white"
              sandbox="allow-same-origin"
            />
          </Card>
        )}
      </div>
    </ToolPageWrapper>
  );
}
