import { useState, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Dropzone, Card, Select } from '@/components/ui';
import { RefreshCw, Clipboard } from 'lucide-react';

interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
}

const PALETTE_SIZES = [
  { value: '4', label: '4 colors' },
  { value: '6', label: '6 colors' },
  { value: '8', label: '8 colors' },
  { value: '10', label: '10 colors' },
];

export default function ColorPalette() {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<ColorInfo[]>([]);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [paletteSize, setPaletteSize] = useState<number>(6);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        setPalette([]);
      }
    };
    reader.readAsDataURL(file);
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const rgbToHsl = (r: number, g: number, b: number): string => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const extractPalette = () => {
    if (!imgRef.current) return;
    setIsExtracting(true);

    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = imgRef.current;
      if (!img) return;

      canvas.width = 50;
      canvas.height = 50;

      if (ctx) {
        ctx.drawImage(img, 0, 0, 50, 50);
        const imgData = ctx.getImageData(0, 0, 50, 50).data;

        const colors: { r: number; g: number; b: number }[] = [];
        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          if (a > 128) {
            colors.push({ r, g, b });
          }
        }

        if (colors.length > 0) {
          const centroids = colors.slice(0, paletteSize);

          for (let iter = 0; iter < 4; iter++) {
            const groups: (typeof colors)[] = Array.from({ length: paletteSize }, () => []);
            for (const color of colors) {
              let minIndex = 0;
              let minDist = Infinity;
              for (let c = 0; c < centroids.length; c++) {
                if (!centroids[c]) continue;
                const dist =
                  Math.pow(color.r - centroids[c].r, 2) +
                  Math.pow(color.g - centroids[c].g, 2) +
                  Math.pow(color.b - centroids[c].b, 2);
                if (dist < minDist) {
                  minDist = dist;
                  minIndex = c;
                }
              }
              groups[minIndex].push(color);
            }

            for (let c = 0; c < centroids.length; c++) {
              const group = groups[c];
              if (group && group.length > 0) {
                let sumR = 0,
                  sumG = 0,
                  sumB = 0;
                for (const col of group) {
                  sumR += col.r;
                  sumG += col.g;
                  sumB += col.b;
                }
                centroids[c] = {
                  r: Math.round(sumR / group.length),
                  g: Math.round(sumG / group.length),
                  b: Math.round(sumB / group.length),
                };
              }
            }
          }

          const formatted = centroids.filter(Boolean).map((c) => ({
            hex: rgbToHex(c.r, c.g, c.b),
            rgb: `rgb(${c.r}, ${c.g}, ${c.b})`,
            hsl: rgbToHsl(c.r, c.g, c.b),
          }));
          setPalette(formatted);
        }
      }
      setIsExtracting(false);
    }, 100);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedColor(text);
      setTimeout(() => setCopiedColor(null), 1500);
    });
  };

  return (
    <ToolPageWrapper toolId="color-palette">
      <div className="w-full">
        {!image && (
          <Dropzone
            onFileSelect={handleFileSelect}
            accept="image/*"
            icon={<RefreshCw size={32} className="text-[var(--text-tertiary)]" />}
            title="Click to select or drag and drop an image to extract colors"
            subtitle="Supports dominant color palette generation. 100% offline."
          />
        )}

        {image && (
          <div className="tool-layout lg:grid-cols-2 gap-6">
            {/* Left Column: Image Preview */}
            <Card className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Selected Image
                </span>
                <Button
                  onClick={() => {
                    setImage(null);
                    setPalette([]);
                  }}
                  variant="secondary"
                  size="xs"
                >
                  Change Image
                </Button>
              </div>
              <div
                className="min-h-[250px] max-h-[350px] flex items-center justify-center rounded-xl overflow-hidden p-2 border"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
              >
                <img
                  ref={imgRef}
                  src={image}
                  onLoad={extractPalette}
                  alt="Color Source"
                  className="max-h-[330px] max-w-full object-contain"
                />
              </div>
            </Card>

            {/* Right Column: Extracted Palette */}
            <Card className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Color Palette
                </span>
                <Select
                  options={PALETTE_SIZES}
                  value={paletteSize.toString()}
                  onChange={(e) => {
                    setPaletteSize(parseInt(e.target.value));
                    setTimeout(extractPalette, 50);
                  }}
                  className="max-w-[120px] py-1 text-xs"
                  aria-label="Palette size"
                />
              </div>

              {palette.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {palette.map((color, idx) => (
                    <div
                      key={idx}
                      onClick={() => copyToClipboard(color.hex)}
                      className="border rounded-xl p-2 flex items-center gap-3 cursor-pointer hover:bg-[var(--bg-surface)] transition-colors"
                      style={{ borderColor: 'var(--border-default)' }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg border shrink-0"
                        style={{ background: color.hex, borderColor: 'var(--border-default)' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-xs font-bold truncate"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {color.hex}
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)] truncate">
                          {color.rgb}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {copiedColor === color.hex ? (
                          <span className="text-[10px] text-[var(--success)] font-bold">
                            Copied
                          </span>
                        ) : (
                          <Clipboard size={12} className="text-[var(--text-tertiary)]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-[var(--text-tertiary)] text-sm min-h-[150px]">
                  {isExtracting ? 'Extracting palette...' : 'Extracted colors will display here'}
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
