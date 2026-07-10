import { useState, useRef, ChangeEvent } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

interface FaviconSize {
  label: string;
  filename: string;
  size: number;
  dataUrl: string | null;
}

export default function FaviconGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState<string>('');
  const [favicons, setFavicons] = useState<FaviconSize[]>([
    { label: 'Standard Browser Icon', filename: 'favicon.ico', size: 32, dataUrl: null },
    { label: 'Small Browser Tab Icon', filename: 'favicon-16x16.png', size: 16, dataUrl: null },
    { label: 'Medium Browser Tab Icon', filename: 'favicon-32x32.png', size: 32, dataUrl: null },
    { label: 'Apple Touch Icon (iOS)', filename: 'apple-touch-icon.png', size: 180, dataUrl: null },
    { label: 'Android/Chrome Icon', filename: 'android-chrome-192x192.png', size: 192, dataUrl: null },
    { label: 'High Resolution Icon', filename: 'android-chrome-512x512.png', size: 512, dataUrl: null },
  ]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    }
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
          const format = fav.filename.endsWith('.ico') ? 'image/x-icon' : 'image/png';
          const dataUrl = canvas.toDataURL(format);
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
            <div className="text-5xl mb-4 text-slate-400">🌐</div>
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Click to select or drag and drop an image to generate Favicons
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Supports browser tab, iOS Apple Touch, and Android sizes. 100% offline.
            </p>
          </div>
        )}

        {image && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Panel: Preview */}
            <div className="border rounded-2xl p-4 flex flex-col gap-3" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Selected Logo Image
                </span>
                <button
                  onClick={() => {
                    setImage(null);
                    setFavicons((prev) => prev.map((fav) => ({ ...fav, dataUrl: null })));
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
                  onLoad={handleGenerate}
                  alt="Favicon Source"
                  className="max-h-[330px] max-w-full object-contain"
                />
              </div>
              <div className="text-xs text-slate-400 text-center truncate">
                File: {originalName}
              </div>
            </div>

            {/* Right Panel: Sizes & Package Downloads */}
            <div className="border rounded-2xl p-5 flex flex-col gap-4 justify-between h-fit" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Generated Favicon Pack
                </span>

                {favicons[0].dataUrl ? (
                  <div className="flex flex-col gap-3.5 max-h-[350px] overflow-y-auto pr-1">
                    {favicons.map((fav, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border rounded-xl p-3 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors"
                        style={{ borderColor: 'var(--border-default)' }}
                      >
                        <div className="flex items-center gap-3">
                          {/* Mini visual size indicator */}
                          <div className="w-10 h-10 rounded border bg-white flex items-center justify-center overflow-hidden border-slate-200 dark:border-slate-800">
                            {fav.dataUrl && (
                              <img
                                src={fav.dataUrl}
                                alt="fav"
                                className="object-contain"
                                style={{ width: Math.min(24, fav.size), height: Math.min(24, fav.size) }}
                              />
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                              {fav.filename}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {fav.label} ({fav.size}x{fav.size} px)
                            </div>
                          </div>
                        </div>

                        {fav.dataUrl && (
                          <a
                            href={fav.dataUrl}
                            download={fav.filename}
                            className="px-2.5 py-1.5 text-[10px] font-bold uppercase rounded-lg border hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            style={{
                              borderColor: 'var(--border-default)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            Download
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center text-slate-400 text-sm">
                    {isGenerating ? 'Generating favicons...' : 'Generating preview...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
