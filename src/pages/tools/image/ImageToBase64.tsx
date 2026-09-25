import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Dropzone, Tabs, Textarea, Button } from '@/components/ui';
import { CopyButton } from '@/components/ui/CopyButton';
import { Notice } from '@/components/tools/Notice';
import { formatBytes } from '@/utils/download';

interface Loaded {
  name: string;
  type: string;
  size: number;
  dataUri: string;
}

export default function ImageToBase64() {
  const [file, setFile] = useState<Loaded | null>(null);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('uri');

  const onFile = (f: File) => {
    setError('');
    setTab('uri');
    const reader = new FileReader();
    reader.onload = () => setFile({ name: f.name, type: f.type, size: f.size, dataUri: String(reader.result) });
    reader.onerror = () => setError('Could not read that file.');
    reader.readAsDataURL(f);
  };

  const raw = file ? file.dataUri.split(',')[1] ?? '' : '';
  const outputs: Record<string, string> = file
    ? {
        uri: file.dataUri,
        raw,
        css: `background-image: url("${file.dataUri}");`,
        html: `<img src="${file.dataUri}" alt="${file.name.replace(/"/g, '')}" />`,
      }
    : {};
  const out = outputs[tab] ?? '';

  return (
    <ToolPageWrapper toolId="image-to-base64">
      <div className="space-y-6">
        <Dropzone accept="image/*" onFileSelect={onFile} onError={setError} title="Drop an image here or click to browse" />
        {error && <Notice tone="danger">{error}</Notice>}
        {file && (
          <div className="tool-layout lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <Card className="space-y-3">
              <img src={file.dataUri} alt="Uploaded preview" className="max-h-64 w-full rounded-xl object-contain" style={{ background: 'var(--border-subtle)' }} />
              <p className="text-sm break-all"><strong>{file.name}</strong></p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {file.type || 'image'} · {formatBytes(file.size)} → {formatBytes(file.dataUri.length)} as text
              </p>
              {file.dataUri.length > 200_000 && (
                <Notice tone="warning">Base64 grows files by ~33%. Large data URIs slow down pages — consider a real image file instead.</Notice>
              )}
            </Card>
            <Card className="space-y-4">
              <Tabs
                activeTab={tab}
                onTabChange={setTab}
                ariaLabel="Output format"
                tabs={[
                  { key: 'uri', name: 'Data URI' },
                  { key: 'raw', name: 'Base64' },
                  { key: 'css', name: 'CSS' },
                  { key: 'html', name: 'HTML' },
                ]}
              />
              <Textarea variant="code" rows={10} value={out} readOnly aria-label="Output" />
              <div className="flex gap-2">
                <CopyButton text={out} label="Copy output" />
                <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Clear</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
