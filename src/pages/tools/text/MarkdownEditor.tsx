import { useState, useMemo, useRef } from 'react';
import { renderMarkdown, handleAnchorClick } from '@/utils/markdown';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { CopyButton, Textarea } from '@/components/ui';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(
    '# Hello Toolskyt\n\n- Free tools\n- Works offline\n\n**Have fun compiling markdown!**'
  );

  const htmlPreview = useMemo(() => renderMarkdown(markdown), [markdown]);
  const previewRef = useRef<HTMLDivElement>(null);

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
            ref={previewRef}
            onClick={(e) => handleAnchorClick(e, previewRef.current)}
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
            className="sk-md input-base overflow-y-auto h-[360px] max-w-none p-4"
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
