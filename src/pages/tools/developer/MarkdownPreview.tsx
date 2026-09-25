import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { MarkdownWorkspace } from '@/components/markdown/MarkdownWorkspace';
import { renderMarkdown } from '@/utils/markdown';

const SAMPLE = `# Markdown Previewer

Welcome to **Toolskyt**! Type on the left, or use **Open file** to load a \`.md\` file from your computer.

## Features
- Live preview with synced scrolling
- Tables, task lists, code blocks and links
- 100% in your browser: your file never leaves your device

| Feature | Supported |
|---|---|
| Tables | Yes |
| Task lists | Yes |
| Code blocks | Yes |

- [x] Open .md files
- [x] Save your edits
- [ ] More tools coming soon

\`\`\`javascript
const greet = () => "Hello, Toolskyt!";
\`\`\`

> Blockquotes work too.
`;

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const html = useMemo(() => renderMarkdown(markdown), [markdown]);

  return (
    <ToolPageWrapper toolId="markdown-preview">
      <MarkdownWorkspace
        value={markdown}
        onChange={setMarkdown}
        copyText={html}
        previewTitle="Live preview"
        preview={<div className="sk-md" dangerouslySetInnerHTML={{ __html: html }} />}
      />
    </ToolPageWrapper>
  );
}
