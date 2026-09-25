import { useState } from 'react';
import { ArrowDown, ArrowUp, Download, FileText, Trash2 } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Dropzone } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { mergePdfs, openPdf, pdfBlob } from '@/utils/pdfTools';
import { downloadBlob, formatBytes } from '@/utils/download';

interface Item { id: number; file: File; pages: number }
let nextId = 1;

export default function PdfMerge() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState('');

  const add = async (file: File) => {
    setError(''); setDone('');
    try {
      const { pages } = await openPdf(file);
      setItems((p) => [...p, { id: nextId++, file, pages }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not read PDF');
    }
  };

  const move = (i: number, d: number) =>
    setItems((p) => {
      const n = [...p]; const j = i + d;
      if (j < 0 || j >= n.length) return p;
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });

  const total = items.reduce((s, i) => s + i.pages, 0);

  const merge = async () => {
    setBusy(true); setError(''); setDone('');
    try {
      const bytes = await mergePdfs(items.map((i) => i.file));
      downloadBlob('merged.pdf', pdfBlob(bytes));
      setDone(`Merged ${items.length} files into one PDF with ${total} pages.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Merge failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPageWrapper toolId="pdf-merge">
      <div className="space-y-6">
        <Dropzone accept="application/pdf,.pdf" onFileSelect={add} onError={setError} title={items.length ? 'Add another PDF' : 'Drop a PDF here or click to browse'} subtitle="Add two or more PDFs — files never leave your device" />
        {error && <Notice tone="danger">{error}</Notice>}
        {done && <Notice tone="success">{done}</Notice>}
        {items.length > 0 && (
          <Card className="space-y-4">
            <ul className="divide-y" style={{ borderColor: 'var(--border-subtle)' }} aria-label="Files to merge">
              {items.map((it, i) => (
                <li key={it.id} className="flex items-center gap-3 py-3">
                  <span className="w-6 text-center text-sm tabular-nums" style={{ color: 'var(--text-tertiary)' }}>{i + 1}</span>
                  <FileText size={18} className="shrink-0" style={{ color: 'var(--danger)' }} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{it.file.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{it.pages} pages · {formatBytes(it.file.size)}</p>
                  </div>
                  <Button variant="ghost" size="xs" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp size={14} /></Button>
                  <Button variant="ghost" size="xs" aria-label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)}><ArrowDown size={14} /></Button>
                  <Button variant="ghost" size="xs" aria-label={`Remove ${it.file.name}`} onClick={() => setItems((p) => p.filter((x) => x.id !== it.id))}><Trash2 size={14} /></Button>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <Button leftIcon={<Download size={16} />} isLoading={busy} disabled={items.length < 2} onClick={merge}>Merge {items.length} PDFs</Button>
              <Button variant="ghost" onClick={() => { setItems([]); setDone(''); }}>Clear all</Button>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{total} pages total</span>
            </div>
            {items.length < 2 && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Add at least one more PDF to merge.</p>}
          </Card>
        )}
      </div>
    </ToolPageWrapper>
  );
}
