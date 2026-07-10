import { useState, useRef, ChangeEvent } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function WebpConverter() {
  const [image, setImage] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(0.85);
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalName(file.name);
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          setWebpUrl(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!imgRef.current) return;
    setIsConverting(true);

    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = imgRef.current;
      if (!img) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/webp', quality);
        setWebpUrl(dataUrl);
      }
      setIsConverting(false);
    }, 100);
  };

  return (
    <ToolPageWrapper toolId="webp-converter">
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
              accept="image/png, image/jpeg, image/gif, image/bmp"
              className="hidden"
            />
            <div className="text-5xl mb-4 text-slate-400">🔄</div>
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Click to select or drag and drop PNG, JPG, GIF, BMP image to convert to WebP
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Supports output quality configuration. 100% offline.
            </p>
          </div>
        )}

        {image && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Panel: Preview */}
            <div className="border rounded-2xl p-4 flex flex-col gap-3" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Original Image ({formatSize(originalSize)})
                </span>
                <button
                  onClick={() => {
                    setImage(null);
                    setWebpUrl(null);
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
                  alt="Original Source"
                  className="max-h-[330px] max-w-full object-contain"
                />
              </div>
              <div className="text-[10px] text-slate-400 text-center truncate max-w-full">
                File: {originalName}
              </div>
            </div>

            {/* Right Panel: Settings & Download */}
            <div className="border rounded-2xl p-5 flex flex-col gap-6 justify-between" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  WebP Export Options
                </span>

                {/* Quality Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span style={{ color: 'var(--text-secondary)' }}>WebP Quality</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{Math.round(quality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="w-full btn btn-primary mt-2"
                >
                  {isConverting ? 'Converting...' : 'Convert to WebP'}
                </button>
              </div>

              {/* Output Download Link */}
              {webpUrl && (
                <div className="pt-4 border-t flex flex-col gap-3" style={{ borderColor: 'var(--border-default)' }}>
                  <div className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center justify-center">
                    <span>✓ Converted to WebP successfully!</span>
                  </div>
                  <a
                    href={webpUrl}
                    download={`${originalName.split('.')[0] || 'converted'}.webp`}
                    className="w-full btn btn-primary text-center flex items-center justify-center py-2.5"
                  >
                    Download WebP Image
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
