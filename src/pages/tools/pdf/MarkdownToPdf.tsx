import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { MarkdownWorkspace } from '@/components/markdown/MarkdownWorkspace';
import { renderMarkdown } from '@/utils/markdown';
import { Printer } from 'lucide-react';

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

  const [pageSize, setPageSize] = useState<'A4' | 'Letter'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const htmlContent = useMemo(() => renderMarkdown(markdown), [markdown]);

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
    ul { list-style: disc; } ol { list-style: decimal; }
    li > ul, li > ol { margin: 0.3em 0 0; }
    li:has(> input[type="checkbox"]) { list-style: none; margin-left: -1.4em; }
    a { color: #0b57d0; text-decoration: underline; }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.88em; background: #f3f4f6; border: 1px solid #e5e7eb;
      padding: 0.1em 0.35em; border-radius: 4px;
    }
    pre {
      background: #f6f8fa; border: 1px solid #e5e7eb; border-radius: 6px;
      padding: 12px 14px; margin: 0 0 1em; white-space: pre-wrap; word-break: break-word;
    }
    pre code { background: none; border: 0; padding: 0; }
    table { border-collapse: collapse; width: 100%; margin: 0 0 1em; font-size: 0.9em; table-layout: auto; }
    th, td { border: 1px solid #d0d7de; padding: 6px 10px; text-align: start; vertical-align: top; overflow-wrap: anywhere; }
    th { background: #f3f4f6; font-weight: 700; }
    tr:nth-child(even) td { background: #fafbfc; }
    td:first-child a { white-space: nowrap; }
    img { max-width: 100%; height: auto; }
    h4, h5, h6 { margin: 1.2em 0 0.5em; }
    @media print {
      body { padding: 0; }
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      h1, h2, h3, h4 { break-after: avoid; }
      tr, pre, blockquote, img { break-inside: avoid; }
      thead { display: table-header-group; }
      a { color: #0b57d0; }
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
      <div className="flex flex-col gap-4">
        <div className="sk-mdw__bar sk-mdw__settings">
          <div className="sk-mdw__actions">
            <label className="sk-mdw__field">
              <span>Page</span>
              <select value={pageSize} onChange={(e) => setPageSize(e.target.value as 'A4' | 'Letter')} className="input-base">
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
              </select>
            </label>
            <label className="sk-mdw__field">
              <span>Orientation</span>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
                className="input-base"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </label>
          </div>
          <button type="button" className="btn btn-primary" onClick={handlePrint} disabled={!markdown.trim()}>
            <Printer size={16} aria-hidden="true" /> Print / Save as PDF
          </button>
        </div>

        <MarkdownWorkspace
          value={markdown}
          onChange={setMarkdown}
          defaultFilename="document.md"
          copyText={htmlContent}
          copyLabel="Copy HTML"
          previewTitle="PDF preview"
          previewFlush
          preview={<iframe srcDoc={iframeSrcDoc} title="PDF preview" sandbox="allow-same-origin" />}
        />
      </div>
    </ToolPageWrapper>
  );
}
