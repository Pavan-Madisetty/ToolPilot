import { useState, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Dropzone, Card } from '@/components/ui';
import { RefreshCw, Download } from 'lucide-react';

interface FaviconSize {
  label: string;
  filename: string;
  size: number;
  dataUrl: string | null;
}

/**
 * Browsers don't support `canvas.toDataURL('image/x-icon')` — it silently
 * falls back to PNG, producing a file that is a PNG mislabeled as .ico.
 * This wraps a real PNG blob in a valid ICO container (PNG-in-ICO, supported
 * by all modern browsers) and returns a data URL for download.
 */
function pngToIcoDataUrl(canvas: HTMLCanvasElement): string {
  const pngDataUrl = canvas.toDataURL('image/png');
  const pngBase64 = pngDataUrl.split(',')[1];
  const pngBinary = atob(pngBase64);
  const pngBytes = new Uint8Array(pngBinary.length);
  for (let i = 0; i < pngBinary.length; i++) pngBytes[i] = pngBinary.charCodeAt(i);

  const header = new Uint8Array(6 + 16);
  const view = new DataView(header.buffer);
  // ICONDIR
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, 1, true); // image count
  // ICONDIRENTRY
  const dim = canvas.width >= 256 ? 0 : canvas.width; // 0 means 256px
  header[6] = dim; // width
  header[7] = dim; // height
  header[8] = 0; // palette
  header[9] = 0; // reserved
  view.setUint16(10, 1, true); // color planes
  view.setUint16(12, 32, true); // bits per pixel
  view.setUint32(14, pngBytes.length, true); // image data size
  view.setUint32(18, 22, true); // offset to image data (6 + 16)

  const ico = new Uint8Array(header.length + pngBytes.length);
  ico.set(header, 0);
  ico.set(pngBytes, header.length);

  let binary = '';
  for (let i = 0; i < ico.length; i++) binary += String.fromCharCode(ico[i]);
  return `data:image/x-icon;base64,${btoa(binary)}`;
}

export default function FaviconGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState<string>('');
  const [favicons, setFavicons] = useState<FaviconSize[]>([
    { label: 'Standard Browser Icon', filename: 'favicon.ico', size: 32, dataUrl: null },
    { label: 'Small Browser Tab Icon', filename: 'favicon-16x16.png', size: 16, dataUrl: null },
    { label: 'Medium Browser Tab Icon', filename: 'favicon-32x32.png', size: 32, dataUrl: null },
    { label: 'Apple Touch Icon (iOS)', filename: 'apple-touch-icon.png', size: 180, dataUrl: null },
    {
      label: 'Android/Chrome Icon',
      filename: 'android-chrome-192x192.png',
      size: 192,
      dataUrl: null,
    },
    {
      label: 'High Resolution Icon',
      filename: 'android-chrome-512x512.png',
      size: 512,
      dataUrl: null,
    },
  ]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileSelect = (file: File) => {
    setOriginalName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        // Reset urls
        setFavicons((prev) => prev.map((fav) => ({ ...fav, dataUrl: null })));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    if (!imgRef.current) return;
    setIsGenerating(true);

    setTimeout(() => {
      const img = imgRef.current;
      if (!img) return;
      const updatedFavicons = favicons.map((fav) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = fav.size;
        canvas.height = fav.size;

        if (ctx) {
          ctx.drawImage(img, 0, 0, fav.size, fav.size);
          const dataUrl = fav.filename.endsWith('.ico')
            ? pngToIcoDataUrl(canvas)
            : canvas.toDataURL('image/png');
          return { ...fav, dataUrl };
        }
        return fav;
      });

      setFavicons(updatedFavicons);
      setIsGenerating(false);
    }, 150);
  };

  return (
    <ToolPageWrapper toolId="favicon-generator">
      <div className="w-full">
        {!image && (
          <Dropzone
            onFileSelect={handleFileSelect}
            accept="image/*"
            icon={<RefreshCw size={32} className="text-[var(--text-tertiary)]" />}
            title="Click to select or drag and drop an image to generate Favicons"
            subtitle="Supports browser tab, iOS Apple Touch, and Android sizes. 100% offline."
          />
        )}

        {image && (
          <div className="tool-layout lg:grid-cols-2 gap-6">
            {/* Left Panel: Preview */}
            <Card className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Selected Logo Image
                </span>
                <Button
                  onClick={() => {
                    setImage(null);
                    setFavicons((prev) => prev.map((fav) => ({ ...fav, dataUrl: null })));
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
                  onLoad={handleGenerate}
                  alt="Favicon Source"
                  className="max-h-[330px] max-w-full object-contain"
                />
              </div>
              <div className="text-xs text-[var(--text-tertiary)] text-center truncate">
                File: {originalName}
              </div>
            </Card>

            {/* Right Panel: Sizes & Package Downloads */}
            <Card className="flex flex-col gap-4 justify-between h-fit">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Generated Favicon Pack
                </span>

                {favicons[0].dataUrl ? (
                  <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
                    {favicons.map((fav, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border rounded-xl p-3 hover:bg-[var(--bg-surface)] transition-colors"
                        style={{ borderColor: 'var(--border-default)' }}
                      >
                        <div className="flex items-center gap-3">
                          {/* Mini visual size indicator */}
                          <div
                            className="w-10 h-10 rounded border bg-white flex items-center justify-center overflow-hidden"
                            style={{ borderColor: 'var(--border-default)' }}
                          >
                            {fav.dataUrl && (
                              <img
                                src={fav.dataUrl}
                                alt="fav"
                                className="object-contain"
                                style={{
                                  width: Math.min(24, fav.size),
                                  height: Math.min(24, fav.size),
                                }}
                              />
                            )}
                          </div>
                          <div>
                            <div
                              className="text-xs font-bold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {fav.filename}
                            </div>
                            <div className="text-[10px] text-[var(--text-tertiary)]">
                              {fav.label} ({fav.size}x{fav.size} px)
                            </div>
                          </div>
                        </div>

                        {fav.dataUrl && (
                          <a
                            href={fav.dataUrl}
                            download={fav.filename}
                            className="btn btn-secondary flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold uppercase rounded-lg"
                          >
                            <Download size={12} />
                            <span>Download</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center text-[var(--text-tertiary)] text-sm">
                    {isGenerating ? 'Generating favicons...' : 'Generating preview...'}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
