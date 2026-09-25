import { useState } from 'react';
import { Download, RotateCcw, RotateCw } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Dropzone, Input } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { openPdf, pdfBlob, rotatePdf } from '@/utils/pdfTools';
import { downloadBlob, formatBytes } from '@/utils/download';
import { parsePageRanges } from '@/utils/extraToolMath';

export default function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [delta, setDelta] = useState(90);
  const [range, setRange] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onFile = async (f: File) => {
    setError('');
    try {
      const r = await openPdf(f);
      setFile(f); setPages(r.pages); setRange(''); setDelta(90);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not read PDF'); }
  };

  const go = async () => {
    if (!file) return;
    let idx = Array.from({ length: pages }, (_, i) => i);
    if (range.trim()) {
      const r = parsePageRanges(range, pages);
      if (r.error) return setError(r.error);
      idx = r.pages;
    }
    setBusy(true); setError('');
    try {
      downloadBlob(`${file.name.replace(/\.pdf$/i, '')}-rotated.pdf`, pdfBlob(await rotatePdf(file, idx, delta)));
    } catch (e) { setError(e instanceof Error ? e.message : 'Failed'); } finally { setBusy(false); }
  };

  return (
    <ToolPageWrapper toolId="pdf-rotate">
      <div className="space-y-6">
        {!file && <Dropzone accept="application/pdf,.pdf" onFileSelect={onFile} onError={setError} title="Drop a PDF here or click to browse" />}
        {error && <Notice tone="danger">{error}</Notice>}
        {file && (
          <Card className="space-y-5 max-w-2xl">
            <p className="text-sm"><strong className="break-all">{file.name}</strong> · {pages} pages · {formatBytes(file.size)}</p>
            <div>
              <p className="label">Rotation</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { v: 270, label: '90° left', icon: <RotateCcw size={14} /> },
                  { v: 90, label: '90° right', icon: <RotateCw size={14} /> },
                  { v: 180, label: '180°', icon: <RotateCw size={14} /> },
                ].map((o) => (
                  <Button key={o.v} size="sm" variant={delta === o.v ? 'primary' : 'secondary'} leftIcon={o.icon} onClick={() => setDelta(o.v)} aria-pressed={delta === o.v}>{o.label}</Button>
                ))}
              </div>
            </div>
            <Input label="Pages (optional)" value={range} onChange={(e) => setRange(e.target.value)} placeholder="All pages" helperText={`Leave blank to rotate all ${pages} pages, or enter e.g. 1-3, 5`} />
            <div className="flex flex-wrap gap-2">
              <Button leftIcon={<Download size={16} />} isLoading={busy} onClick={go}>Rotate &amp; download</Button>
              <Button variant="ghost" onClick={() => setFile(null)}>Choose another</Button>
            </div>
          </Card>
        )}
      </div>
    </ToolPageWrapper>
  );
}
