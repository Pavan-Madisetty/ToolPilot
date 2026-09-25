import { useState } from 'react';
import { Download } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Dropzone, Input, Tabs } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { extractPages, openPdf, pdfBlob } from '@/utils/pdfTools';
import { downloadBlob, formatBytes } from '@/utils/download';
import { parsePageRanges } from '@/utils/extraToolMath';

export default function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [mode, setMode] = useState<'range' | 'chunks'>('range');
  const [range, setRange] = useState('1');
  const [chunk, setChunk] = useState('1');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const base = file?.name.replace(/\.pdf$/i, '') ?? 'document';

  const onFile = async (f: File) => {
    setError('');
    try {
      const r = await openPdf(f);
      setFile(f); setPages(r.pages); setRange(r.pages > 1 ? `1-${Math.min(2, r.pages)}` : '1');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not read PDF');
    }
  };

  const extract = async () => {
    if (!file) return;
    const { pages: idx, error: err } = parsePageRanges(range, pages);
    if (err) return setError(err);
    setBusy(true); setError('');
    try {
      downloadBlob(`${base}-pages.pdf`, pdfBlob(await extractPages(file, idx)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally { setBusy(false); }
  };

  const size = Math.max(1, parseInt(chunk, 10) || 1);
  const groups = Array.from({ length: Math.ceil(pages / size) }, (_, g) => {
    const from = g * size;
    const to = Math.min(pages, from + size);
    return { from, to, idx: Array.from({ length: to - from }, (_, k) => from + k) };
  });

  const downloadGroup = async (g: (typeof groups)[number]) => {
    if (!file) return;
    setError('');
    try {
      downloadBlob(`${base}-${g.from + 1}-${g.to}.pdf`, pdfBlob(await extractPages(file, g.idx)));
    } catch (e) { setError(e instanceof Error ? e.message : 'Failed'); }
  };

  return (
    <ToolPageWrapper toolId="pdf-split">
      <div className="space-y-6">
        {!file && <Dropzone accept="application/pdf,.pdf" onFileSelect={onFile} onError={setError} title="Drop a PDF here or click to browse" />}
        {error && <Notice tone="danger">{error}</Notice>}
        {file && (
          <Card className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm"><strong className="break-all">{file.name}</strong> · {pages} pages · {formatBytes(file.size)}</p>
              <Button variant="ghost" size="sm" onClick={() => { setFile(null); setPages(0); setError(''); }}>Choose another</Button>
            </div>
            <Tabs activeTab={mode} onTabChange={(k) => setMode(k as 'range' | 'chunks')} ariaLabel="Split mode" tabs={[{ key: 'range', name: 'Extract pages' }, { key: 'chunks', name: 'Split every N pages' }]} />
            {mode === 'range' ? (
              <div className="space-y-4 max-w-md">
                <Input label="Pages to extract" value={range} onChange={(e) => setRange(e.target.value)} helperText={`Example: 1-3, 5, 8- (document has ${pages} pages)`} />
                <Button leftIcon={<Download size={16} />} isLoading={busy} onClick={extract}>Extract to new PDF</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="max-w-xs"><Input label="Pages per file" type="number" min="1" max={pages} value={chunk} onChange={(e) => setChunk(e.target.value)} /></div>
                <ul className="grid gap-2 sm:grid-cols-2" aria-label="Output files">
                  {groups.slice(0, 200).map((g) => (
                    <li key={g.from} className="flex items-center justify-between gap-2 rounded-xl border p-3 text-sm" style={{ borderColor: 'var(--border-subtle)' }}>
                      <span>{g.to - g.from === 1 ? `Page ${g.from + 1}` : `Pages ${g.from + 1}–${g.to}`}</span>
                      <Button size="xs" variant="secondary" leftIcon={<Download size={12} />} onClick={() => downloadGroup(g)}>Download</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        )}
      </div>
    </ToolPageWrapper>
  );
}
