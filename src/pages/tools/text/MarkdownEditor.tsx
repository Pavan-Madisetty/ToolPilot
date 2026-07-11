import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { CopyButton, Textarea } from '@/components/ui';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(
    '# Hello Toolskyt\n\n- Free tools\n- Works offline\n\n**Have fun compiling markdown!**'
  );

  // Simple client-side Markdown to HTML compiler (avoids external library dependencies)
  const htmlPreview = useMemo(() => {
    // Escape HTML first so raw tags in user input can never execute
    // (e.g. `<img src=x onerror=...>`). Markdown syntax is applied afterwards.
    let html = markdown
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');

    // Bold & Italics
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

    // Unordered lists
    html = html.replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, ''); // merge lists

    // Paragraph lines
    html = html.replace(/^\s*(\b.*$)/gim, '<p>$1</p>');

    return html;
  }, [markdown]);

  return (
    <ToolPageWrapper toolId="markdown-editor">
      <div className="tool-layout lg:grid-cols-2">
        {/* Editor panel */}
        <Textarea
          label="Markdown Input"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="font-mono text-xs leading-relaxed h-[360px] resize-none"
          aria-label="Markdown content input"
        />

        {/* Live Preview panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label">Preview Render</span>
            {htmlPreview && <CopyButton text={htmlPreview} label="Copy HTML" />}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
            className="input-base overflow-y-auto h-[360px] prose dark:prose-invert max-w-none text-sm p-4"
            style={{
              borderColor: 'var(--border-default)',
              background: 'var(--bg-surface)',
            }}
            aria-label="HTML preview output"
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
}
