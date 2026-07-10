import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(0.8);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');

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
      setOriginalSize(file.size);
      setMimeType(file.type || 'image/jpeg');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          setCompressedUrl(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = useCallback(() => {
    const img = imgRef.current;
    if (!image || !img) return;
    setIsCompressing(true);

    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        // Canvas uses quality slider only for jpeg/webp
        const targetMime = mimeType === 'image/png' ? 'image/jpeg' : mimeType;
        const dataUrl = canvas.toDataURL(targetMime, quality);
        setCompressedUrl(dataUrl);

        // Estimate size from base64 string length
        // Base64 is ~4/3 of the binary data size
        const head = dataUrl.split(',')[0];
        const padding = dataUrl.endsWith('==') ? 2 : dataUrl.endsWith('=') ? 1 : 0;
        const sizeInBytes = (dataUrl.length - head.length - 1) * 0.75 - padding;
        setCompressedSize(sizeInBytes);
      }
      setIsCompressing(false);
    }, 100);
  }, [image, mimeType, quality]);

  useEffect(() => {
    if (image) {
      compressImage();
    }
  }, [image, compressImage]);

  const savings = originalSize && compressedSize
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <ToolPageWrapper toolId="image-compress">
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
            <div className="text-5xl mb-4 text-slate-400">🗜️</div>
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Click to select or drag and drop an image to compress
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Supports PNG, JPG, WebP. 100% browser-side.
            </p>
          </div>
        )}

        {image && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Image Previews */}
            <div className="flex flex-col gap-4">
              <div className="border rounded-2xl p-4 flex flex-col gap-3" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    Original ({formatSize(originalSize)})
                  </span>
                  <button
                    onClick={() => {
                      setImage(null);
                      setCompressedUrl(null);
                    }}
                    className="px-3 py-1 text-xs border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                  >
                    Change Image
                  </button>
                </div>
                <div className="min-h-[220px] max-h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-xl overflow-hidden p-2">
                  <img
                    ref={imgRef}
                    src={image}
                    alt="Original Source"
                    className="max-h-[280px] max-w-full object-contain"
                  />
                </div>
              </div>

              {compressedUrl && (
                <div className="border rounded-2xl p-4 flex flex-col gap-3" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    Compressed ({formatSize(compressedSize)})
                  </span>
                  <div className="min-h-[220px] max-h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-xl overflow-hidden p-2">
                    <img
                      src={compressedUrl}
                      alt="Compressed Output"
                      className="max-h-[280px] max-w-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Compression Controls */}
            <div className="border rounded-2xl p-5 flex flex-col gap-6 justify-between h-fit" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Compression Parameters
                </span>

                {/* Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span style={{ color: 'var(--text-secondary)' }}>Compression Quality</span>
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
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>Highest Compression</span>
                    <span>Best Quality</span>
                  </div>
                </div>

                {/* Size stats & savings readout */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
                  <div className="flex flex-col text-center">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Original</span>
                    <span className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{formatSize(originalSize)}</span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Compressed</span>
                    <span className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{formatSize(compressedSize)}</span>
                  </div>
                  <div className="flex flex-col text-center bg-green-50 dark:bg-green-950/20 p-2 rounded-xl border border-green-100 dark:border-green-900/40">
                    <span className="text-[10px] text-green-700 dark:text-green-400 font-semibold uppercase">Savings</span>
                    <span className="text-base font-extrabold mt-0.5 text-green-600 dark:text-green-400">{savings}%</span>
                  </div>
                </div>
              </div>

              {/* Download */}
              {compressedUrl && (
                <div className="pt-4 border-t flex flex-col gap-2" style={{ borderColor: 'var(--border-default)' }}>
                  <a
                    href={compressedUrl}
                    download={`compressed_image.${mimeType === 'image/png' ? 'jpg' : mimeType.split('/')[1]}`}
                    className="w-full btn btn-primary text-center flex items-center justify-center py-3"
                  >
                    {isCompressing ? 'Generating...' : 'Download Compressed Image'}
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
