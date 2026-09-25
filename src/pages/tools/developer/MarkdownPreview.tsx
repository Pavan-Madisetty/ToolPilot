import { useState, useMemo, useRef } from 'react';
import { renderMarkdown, handleAnchorClick } from '@/utils/markdown';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Textarea, CopyButton } from '@/components/ui';
import { Eye, FileText, Download } from 'lucide-react';

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState<string>(
    `# Markdown Previewer\n\nWelcome to **Toolskyt**! This is a live browser-based Markdown renderer.\n\n## Features\n- Real-time preview\n- 100% offline and secure\n- Copy compiled HTML instantly\n\n### Formatting Examples\nHere is a code block:\n\`\`\`javascript\nconst greet = () => "Hello, Toolskyt!";\n\`\`\`\n\n> This is a blockquote containing some interesting quote.\n\n- [x] Standard UI Components\n- [x] Full Design Tokens\n- [ ] More tools coming soon!`
  );

  const htmlPreview = useMemo(() => renderMarkdown(markdown), [markdown]);
  const previewRef = useRef<HTMLDivElement>(null);

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
            <span
              className="text-sm font-bold flex items-center gap-1.5"
              style={{ color: 'var(--text-primary)' }}
            >
              <FileText size={16} />
              <span>Markdown Source</span>
            </span>
            <div className="flex gap-2">
              <Button onClick={() => setMarkdown('')} variant="secondary" size="xs">
                Clear
              </Button>
              <Button
                onClick={handleDownload}
                variant="secondary"
                size="xs"
                leftIcon={<Download size={14} />}
              >
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
            <span
              className="text-sm font-bold flex items-center gap-1.5"
              style={{ color: 'var(--text-primary)' }}
            >
              <Eye size={16} />
              <span>Live Render</span>
            </span>
            {htmlPreview && (
              <CopyButton text={htmlPreview} label="Copy HTML" variant="outline" size="xs" />
            )}
          </div>
          <div
            ref={previewRef}
            onClick={(e) => handleAnchorClick(e, previewRef.current)}
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
            className="sk-md border rounded-xl overflow-y-auto h-[420px] p-4"
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
