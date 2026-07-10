import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Textarea, CopyButton } from '@/components/ui';
import { Eye, FileText, Download } from 'lucide-react';

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState<string>(
    `# Markdown Previewer\n\nWelcome to **ToolPilot**! This is a live browser-based Markdown renderer.\n\n## Features\n- Real-time preview\n- 100% offline and secure\n- Copy compiled HTML instantly\n\n### Formatting Examples\nHere is a code block:\n\`\`\`javascript\nconst greet = () => "Hello, ToolPilot!";\n\`\`\`\n\n> This is a blockquote containing some interesting quote.\n\n- [x] Standard UI Components\n- [x] Full Design Tokens\n- [ ] More tools coming soon!`
  );

  const htmlPreview = useMemo(() => {
    let html = markdown;

    // Escaping simple HTML tags to avoid tag injection
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Restoring blockquote &gt; for parsing
    html = html.replace(/^&gt;\s+(.*)$/gim, '<blockquote>$1</blockquote>');

    // Headers
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold mb-4 border-b pb-2">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 border-b pb-1">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>');

    // Code blocks (fenced)
    html = html.replace(/```(.*?)\n([\s\S]*?)```/gm, (_, __, code) => {
      return `<pre class="p-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg font-mono text-xs overflow-x-auto my-3"><code class="text-[var(--text-primary)]">${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded font-mono text-xs">$1</code>');

    // Bold & Italics
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Task list check boxes
    html = html.replace(/^- \[(x|X)\] (.*$)/gim, '<div class="flex items-center gap-2 my-1"><input type="checkbox" checked disabled class="accent-[var(--primary)]" /><span>$2</span></div>');
    html = html.replace(/^- \[\s*\] (.*$)/gim, '<div class="flex items-center gap-2 my-1"><input type="checkbox" disabled class="accent-[var(--primary)]" /><span>$1</span></div>');

    // Unordered lists
    html = html.replace(/^- (.*$)/gim, '<ul><li class="list-disc list-inside ml-2 my-0.5">$1</li></ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, ''); // merge lists

    // Blockquotes recovery wrapper
    html = html.replace(/<\/blockquote>\s*<blockquote>/g, '<br />');

    // Paragraph lines (split by double newlines)
    const paragraphs = html.split('\n\n');
    html = paragraphs
      .map((p) => {
        if (p.trim().startsWith('<h') || p.trim().startsWith('<ul') || p.trim().startsWith('<pre') || p.trim().startsWith('<block') || p.trim().startsWith('<div')) {
          return p;
        }
        return `<p class="my-2 leading-relaxed text-sm">${p.replace(/\n/g, '<br />')}</p>`;
      })
      .join('\n');

    return html;
  }, [markdown]);

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageWrapper toolId="markdown-preview">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
              <FileText size={16} />
              <span>Markdown Source</span>
            </span>
            <div className="flex gap-2">
              <Button onClick={() => setMarkdown('')} variant="secondary" size="xs">
                Clear
              </Button>
              <Button onClick={handleDownload} variant="secondary" size="xs" leftIcon={<Download size={14} />}>
                Export .md
              </Button>
            </div>
          </div>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            className="font-mono text-xs leading-relaxed h-[420px] resize-none"
            aria-label="Markdown document source"
          />
        </Card>

        {/* Preview Panel */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
              <Eye size={16} />
              <span>Live Render</span>
            </span>
            {htmlPreview && (
              <CopyButton
                text={htmlPreview}
                label="Copy HTML"
                variant="outline"
                size="xs"
              />
            )}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
            className="border rounded-xl overflow-y-auto h-[420px] p-4 text-[var(--text-primary)]"
            style={{
              borderColor: 'var(--border-default)',
              background: 'var(--bg-surface)',
            }}
            aria-label="Rendered Markdown Preview"
          />
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
