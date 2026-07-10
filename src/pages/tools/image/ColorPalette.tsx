import { useState, useRef, ChangeEvent } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
}

export default function ColorPalette() {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<ColorInfo[]>([]);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [paletteSize, setPaletteSize] = useState<number>(6);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          setPalette([]);
        }
      };
      reader.readAsDataURL(file);
    }
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

      // Draw onto a tiny canvas to perform sampling and clustering
      canvas.width = 50;
      canvas.height = 50;

      if (ctx) {
        ctx.drawImage(img, 0, 0, 50, 50);
        const imgData = ctx.getImageData(0, 0, 50, 50).data;

        // Collect all pixel colors (skipping transparent pixels)
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

        // Run a simple K-Means-like quantization clustering
        // Step 1: Initialize random centroids
        const centroids = colors.slice(0, paletteSize);

        // Step 2: Run 4 iterations of clustering
        for (let iter = 0; iter < 4; iter++) {
          const groups: typeof colors[] = Array.from({ length: paletteSize }, () => []);
          for (const color of colors) {
            let minIndex = 0;
            let minDist = Infinity;
            for (let c = 0; c < centroids.length; c++) {
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

          // Update centroids to group averages
          for (let c = 0; c < centroids.length; c++) {
            const group = groups[c];
            if (group.length > 0) {
              let sumR = 0, sumG = 0, sumB = 0;
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

        // Format palette colors
        const formatted = centroids.map((c) => ({
          hex: rgbToHex(c.r, c.g, c.b),
          rgb: `rgb(${c.r}, ${c.g}, ${c.b})`,
          hsl: rgbToHsl(c.r, c.g, c.b),
        }));
        setPalette(formatted);
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
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {!image && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl p-12 text-center cursor-pointer transition-colors"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="text-5xl mb-4 text-slate-400">🎨</div>
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Click to select or drag and drop an image to extract colors
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Supports dominant color palette generation. 100% offline.
            </p>
          </div>
        )}

        {image && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Image Preview */}
            <div className="border rounded-2xl p-4 flex flex-col gap-3" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Selected Image
                </span>
                <button
                  onClick={() => {
                    setImage(null);
                    setPalette([]);
                  }}
                  className="px-3 py-1 text-xs border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  Change Image
                </button>
              </div>
              <div className="min-h-[250px] max-h-[350px] flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-xl overflow-hidden p-2">
                <img
                  ref={imgRef}
                  src={image}
                  onLoad={extractPalette}
                  alt="Color Source"
                  className="max-h-[330px] max-w-full object-contain"
                />
              </div>
            </div>

            {/* Right Column: Extracted Palette */}
            <div className="border rounded-2xl p-5 flex flex-col gap-5" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Color Palette
                </span>
                <select
                  value={paletteSize}
                  onChange={(e) => {
                    setPaletteSize(parseInt(e.target.value));
                    setTimeout(extractPalette, 50);
                  }}
                  className="px-2.5 py-1 border rounded-lg bg-transparent text-xs"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  <option value={4}>4 colors</option>
                  <option value={6}>6 colors</option>
                  <option value={8}>8 colors</option>
                  <option value={10}>10 colors</option>
                </select>
              </div>

              {palette.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {palette.map((color, idx) => (
                    <div
                      key={idx}
                      onClick={() => copyToClipboard(color.hex)}
                      className="border rounded-xl p-2 flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                      style={{ borderColor: 'var(--border-default)' }}
                    >
                      {/* Color chip */}
                      <div
                        className="w-10 h-10 rounded-lg border shrink-0"
                        style={{ background: color.hex, borderColor: 'var(--border-default)' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                          {color.hex}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {color.rgb}
                        </div>
                      </div>
                      {copiedColor === color.hex && (
                        <span className="text-[10px] text-green-600 font-bold">Copied</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                  {isExtracting ? 'Extracting palette...' : 'Extracted colors will display here'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
