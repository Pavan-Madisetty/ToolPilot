import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { MarkdownWorkspace } from '@/components/markdown/MarkdownWorkspace';
import { renderMarkdown } from '@/utils/markdown';

const SAMPLE =
  '# Hello Toolskyt\n\nWrite Markdown on the left, or **Open file** to edit an existing `.md` document.\n\n- Free tools\n- Works offline\n- Your text never leaves the browser\n\n**Have fun compiling markdown!**\n';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const html = useMemo(() => renderMarkdown(markdown), [markdown]);

  return (
    <ToolPageWrapper toolId="markdown-editor">
      <MarkdownWorkspace
        value={markdown}
        onChange={setMarkdown}
        copyText={html}
        previewTitle="Preview"
        preview={<div className="sk-md" dangerouslySetInnerHTML={{ __html: html }} />}
      />
    </ToolPageWrapper>
  );
}
