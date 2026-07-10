import { useState, useRef, ChangeEvent } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function ImageResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [lockRatio, setLockRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<string>('image/png');
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
          setResizedUrl(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = () => {
    if (imgRef.current) {
      const w = imgRef.current.naturalWidth;
      const h = imgRef.current.naturalHeight;
      setOriginalWidth(w);
      setOriginalHeight(h);
      setWidth(w.toString());
      setHeight(h.toString());
    }
  };

  const handleWidthChange = (val: string) => {
    setWidth(val);
    const num = parseInt(val);
    if (lockRatio && originalWidth && originalHeight && !isNaN(num)) {
      const calculatedHeight = Math.round((num * originalHeight) / originalWidth);
      setHeight(calculatedHeight.toString());
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    const num = parseInt(val);
    if (lockRatio && originalWidth && originalHeight && !isNaN(num)) {
      const calculatedWidth = Math.round((num * originalWidth) / originalHeight);
      setWidth(calculatedWidth.toString());
    }
  };

  const handleResize = () => {
    if (!imgRef.current) return;
    setIsResizing(true);

    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const targetWidth = parseInt(width) || originalWidth;
      const targetHeight = parseInt(height) || originalHeight;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      if (ctx) {
        const img = imgRef.current;
        if (img) {
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        }
        const dataUrl = canvas.toDataURL(format, 0.92);
        setResizedUrl(dataUrl);
      }
      setIsResizing(false);
    }, 100);
  };

  return (
    <ToolPageWrapper toolId="image-resize">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {/* Upload Box */}
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
            <div className="text-5xl mb-4 text-slate-400">🖼️</div>
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Click to select or drag and drop an image
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              PNG, JPG, WebP, GIF up to 50MB
            </p>
          </div>
        )}

        {image && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Original Preview */}
            <div className="border rounded-2xl p-4 flex flex-col gap-4" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Original Image
                </span>
                <button
                  onClick={() => {
                    setImage(null);
                    setResizedUrl(null);
                  }}
                  className="px-3 py-1 text-xs border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  Change Image
                </button>
              </div>
              <div className="flex-1 min-h-[250px] max-h-[350px] flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-xl overflow-hidden p-2">
                <img
                  ref={imgRef}
                  src={image}
                  onLoad={handleImageLoad}
                  alt="Original"
                  className="max-h-[330px] max-w-full object-contain"
                />
              </div>
              <div className="text-xs text-center text-slate-500 dark:text-slate-400">
                Original Size: {originalWidth} × {originalHeight} px
              </div>
            </div>

            {/* Right: Controls & Resized Result */}
            <div className="border rounded-2xl p-4 flex flex-col gap-5 justify-between" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Resize Settings
                </span>

                {/* Width & Height */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Width (px)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      className="px-3 py-2 border rounded-xl bg-transparent outline-none focus:border-indigo-500 transition-colors text-sm"
                      style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">Height (px)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      className="px-3 py-2 border rounded-xl bg-transparent outline-none focus:border-indigo-500 transition-colors text-sm"
                      style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                {/* Lock aspect ratio */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={lockRatio}
                    onChange={(e) => setLockRatio(e.target.checked)}
                    className="accent-indigo-600 rounded"
                  />
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Lock Aspect Ratio ({originalWidth && originalHeight ? (originalWidth / originalHeight).toFixed(2) : '1.00'})
                  </span>
                </label>

                {/* Format selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Output Format</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="px-3 py-2 border rounded-xl bg-transparent outline-none focus:border-indigo-500 transition-colors text-sm"
                    style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
                  >
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPEG (JPG)</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>

                <button
                  onClick={handleResize}
                  disabled={isResizing}
                  className="w-full btn btn-primary mt-2"
                >
                  {isResizing ? 'Resizing...' : 'Resize Image'}
                </button>
              </div>

              {/* Download link */}
              {resizedUrl && (
                <div className="pt-4 border-t flex flex-col gap-3" style={{ borderColor: 'var(--border-default)' }}>
                  <div className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1.5 justify-center">
                    <span>✓ Image resized successfully!</span>
                  </div>
                  <a
                    href={resizedUrl}
                    download={`resized_image.${format.split('/')[1]}`}
                    className="w-full btn btn-primary text-center flex items-center justify-center"
                  >
                    Download Resized Image
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
