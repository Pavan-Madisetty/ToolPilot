import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Dropzone, Select, Slider } from '@/components/ui';
import { Notice } from '@/components/tools/Notice';
import { canvasToBlob, EXPORT_TYPES, loadImageFile } from '@/utils/imageLoad';
import { downloadBlob } from '@/utils/download';

const DEFAULTS = { brightness: 100, contrast: 100, saturate: 100, grayscale: 0, sepia: 0, blur: 0, hue: 0, invert: 0 };
type Filters = typeof DEFAULTS;

const PRESETS: Record<string, Partial<Filters>> = {
  Original: {},
  'Black & white': { grayscale: 100, contrast: 110 },
  Vintage: { sepia: 60, contrast: 90, brightness: 105, saturate: 120 },
  Vivid: { saturate: 160, contrast: 115 },
  Cool: { hue: 190, saturate: 110 },
  Faded: { contrast: 80, brightness: 110, saturate: 80 },
};

const cssFilter = (f: Filters) =>
  `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) grayscale(${f.grayscale}%) sepia(${f.sepia}%) hue-rotate(${f.hue}deg) invert(${f.invert}%) blur(${f.blur}px)`;

/** Pixel-level fallback for browsers where CanvasRenderingContext2D.filter is unavailable (Safari). */
function applyPixels(ctx: CanvasRenderingContext2D, w: number, h: number, f: Filters) {
  const d = ctx.getImageData(0, 0, w, h);
  const p = d.data;
  const br = f.brightness / 100, ct = f.contrast / 100, sat = f.saturate / 100, gs = f.grayscale / 100, sp = f.sepia / 100, inv = f.invert / 100;
  for (let i = 0; i < p.length; i += 4) {
    let r = p[i], g = p[i + 1], b = p[i + 2];
    r *= br; g *= br; b *= br;
    r = (r - 128) * ct + 128; g = (g - 128) * ct + 128; b = (b - 128) * ct + 128;
    const l = 0.299 * r + 0.587 * g + 0.114 * b;
    r = l + (r - l) * sat; g = l + (g - l) * sat; b = l + (b - l) * sat;
    const l2 = 0.299 * r + 0.587 * g + 0.114 * b;
    r += (l2 - r) * gs; g += (l2 - g) * gs; b += (l2 - b) * gs;
    const sr = 0.393 * r + 0.769 * g + 0.189 * b, sg = 0.349 * r + 0.686 * g + 0.168 * b, sb = 0.272 * r + 0.534 * g + 0.131 * b;
    r += (sr - r) * sp; g += (sg - g) * sp; b += (sb - b) * sp;
    r += (255 - 2 * r) * inv; g += (255 - 2 * g) * inv; b += (255 - 2 * b) * inv;
    p[i] = Math.max(0, Math.min(255, r)); p[i + 1] = Math.max(0, Math.min(255, g)); p[i + 2] = Math.max(0, Math.min(255, b));
  }
  ctx.putImageData(d, 0, 0);
}

export default function ImageFilters() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [src, setSrc] = useState('');
  const [name, setName] = useState('image');
  const [f, setF] = useState<Filters>(DEFAULTS);
  const [format, setFormat] = useState<string>('image/png');
  const [error, setError] = useState('');
  const urlRef = useRef<string | null>(null);
  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const onFile = async (file: File) => {
    setError('');
    try {
      const { img: i, url } = await loadImageFile(file);
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      setImg(i); setSrc(url); setF(DEFAULTS);
      setName(file.name.replace(/\.[^.]+$/, ''));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load image');
    }
  };

  const set = (k: keyof Filters) => (v: number) => setF((p) => ({ ...p, [k]: v }));
  const style = useMemo(() => cssFilter(f), [f]);

  const download = async () => {
    if (!img) return;
    const c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    if (format === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); }
    if (typeof (ctx as { filter?: unknown }).filter === 'string') {
      ctx.filter = style;
      ctx.drawImage(img, 0, 0);
    } else {
      ctx.drawImage(img, 0, 0);
      applyPixels(ctx, c.width, c.height, f);
    }
    const t = EXPORT_TYPES.find((x) => x.value === format) ?? EXPORT_TYPES[0];
    downloadBlob(`${name}-filtered.${t.ext}`, await canvasToBlob(c, t.value));
  };

  return (
    <ToolPageWrapper toolId="image-filters">
      <div className="space-y-6">
        {!img && <Dropzone accept="image/*" onFileSelect={onFile} onError={setError} title="Drop an image to edit" />}
        {error && <Notice tone="danger">{error}</Notice>}
        {img && (
          <div className="tool-layout lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <Card className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {Object.entries(PRESETS).map(([label, p]) => (
                  <button key={label} type="button" className="btn btn-secondary btn-sm" onClick={() => setF({ ...DEFAULTS, ...p })}>{label}</button>
                ))}
              </div>
              <Slider label="Brightness" min={0} max={200} value={f.brightness} onChange={set('brightness')} suffix="%" />
              <Slider label="Contrast" min={0} max={200} value={f.contrast} onChange={set('contrast')} suffix="%" />
              <Slider label="Saturation" min={0} max={300} value={f.saturate} onChange={set('saturate')} suffix="%" />
              <Slider label="Grayscale" min={0} max={100} value={f.grayscale} onChange={set('grayscale')} suffix="%" />
              <Slider label="Sepia" min={0} max={100} value={f.sepia} onChange={set('sepia')} suffix="%" />
              <Slider label="Hue rotate" min={0} max={360} value={f.hue} onChange={set('hue')} suffix="°" />
              <Slider label="Invert" min={0} max={100} value={f.invert} onChange={set('invert')} suffix="%" />
              <Slider label="Blur" min={0} max={20} step={0.5} value={f.blur} onChange={set('blur')} suffix="px" />
              <Select label="Export format" value={format} onChange={(e) => setFormat(e.target.value)} options={EXPORT_TYPES.map((t) => ({ value: t.value, label: t.label }))} />
              <div className="flex flex-wrap gap-2">
                <Button leftIcon={<Download size={16} />} onClick={download}>Download</Button>
                <Button variant="secondary" leftIcon={<RotateCcw size={16} />} onClick={() => setF(DEFAULTS)}>Reset</Button>
                <Button variant="ghost" onClick={() => setImg(null)}>Choose another</Button>
              </div>
            </Card>
            <Card className="flex items-center justify-center overflow-hidden">
              <img src={src} alt="Filtered preview" style={{ filter: style }} className="max-h-[70vh] max-w-full rounded-lg object-contain" />
            </Card>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
