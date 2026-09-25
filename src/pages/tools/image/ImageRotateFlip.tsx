import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, FlipHorizontal, FlipVertical, RotateCcw, RotateCw } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Dropzone, Select, Slider } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { canvasToBlob, EXPORT_TYPES, loadImageFile } from '@/utils/imageLoad';
import { downloadBlob } from '@/utils/download';

export default function ImageRotateFlip() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [name, setName] = useState('image');
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [format, setFormat] = useState<string>('image/png');
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const onFile = async (f: File) => {
    setError('');
    try {
      const { img: i, url } = await loadImageFile(f);
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      setImg(i);
      setName(f.name.replace(/\.[^.]+$/, ''));
      setAngle(0); setFlipH(false); setFlipV(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load image');
    }
  };

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c || !img) return;
    const rad = (angle * Math.PI) / 180;
    const w = img.naturalWidth, h = img.naturalHeight;
    const cos = Math.abs(Math.cos(rad)), sin = Math.abs(Math.sin(rad));
    c.width = Math.max(1, Math.round(w * cos + h * sin));
    c.height = Math.max(1, Math.round(w * sin + h * cos));
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    if (format === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); }
    ctx.translate(c.width / 2, c.height / 2);
    ctx.rotate(rad);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -w / 2, -h / 2);
  }, [img, angle, flipH, flipV, format]);

  useEffect(draw, [draw]);

  const step = (d: number) => setAngle((a) => { let n = a + d; if (n > 180) n -= 360; if (n < -180) n += 360; return n; });

  const download = async () => {
    const c = canvasRef.current;
    if (!c) return;
    const t = EXPORT_TYPES.find((x) => x.value === format) ?? EXPORT_TYPES[0];
    downloadBlob(`${name}-edited.${t.ext}`, await canvasToBlob(c, t.value));
  };

  return (
    <ToolPageWrapper toolId="image-flip-rotate">
      <div className="space-y-6">
        {!img && <Dropzone accept="image/*" onFileSelect={onFile} onError={setError} title="Drop an image to rotate or flip" />}
        {error && <Notice tone="danger">{error}</Notice>}
        {img && (
          <div className="tool-layout lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <Card className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" leftIcon={<RotateCcw size={14} />} onClick={() => step(-90)}>90° left</Button>
                <Button variant="secondary" size="sm" leftIcon={<RotateCw size={14} />} onClick={() => step(90)}>90° right</Button>
                <Button variant={flipH ? 'primary' : 'secondary'} size="sm" leftIcon={<FlipHorizontal size={14} />} onClick={() => setFlipH((v) => !v)}>Flip horizontal</Button>
                <Button variant={flipV ? 'primary' : 'secondary'} size="sm" leftIcon={<FlipVertical size={14} />} onClick={() => setFlipV((v) => !v)}>Flip vertical</Button>
              </div>
              <Slider label="Angle" min={-180} max={180} step={1} value={angle} onChange={setAngle} suffix="°" />
              <Select label="Export format" value={format} onChange={(e) => setFormat(e.target.value)} options={EXPORT_TYPES.map((t) => ({ value: t.value, label: t.label }))} />
              <div className="flex flex-wrap gap-2">
                <Button leftIcon={<Download size={16} />} onClick={download}>Download</Button>
                <Button variant="ghost" onClick={() => { setImg(null); }}>Choose another</Button>
              </div>
            </Card>
            <Card className="flex items-center justify-center overflow-hidden">
              <canvas ref={canvasRef} className="max-h-[60vh] max-w-full h-auto w-auto rounded-lg" style={{ background: 'repeating-conic-gradient(var(--border-subtle) 0% 25%, transparent 0% 50%) 50% / 16px 16px' }} aria-label="Preview" />
            </Card>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
