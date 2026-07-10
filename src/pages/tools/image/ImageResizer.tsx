import { useState, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Dropzone, Card, Input, Select } from '@/components/ui';
import { RefreshCw, CheckCircle, Download } from 'lucide-react';

const FORMAT_OPTIONS = [
  { value: 'image/png', label: 'PNG' },
  { value: 'image/jpeg', label: 'JPEG (JPG)' },
  { value: 'image/webp', label: 'WebP' },
];

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

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        setResizedUrl(null);
      }
    };
    reader.readAsDataURL(file);
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
      <div className="w-full">
        {!image && (
          <Dropzone
            onFileSelect={handleFileSelect}
            accept="image/*"
            icon={<RefreshCw size={32} className="text-[var(--text-tertiary)]" />}
            title="Click to select or drag and drop an image to resize"
            subtitle="Supports PNG, JPG, WebP, GIF up to 50MB."
          />
        )}

        {image && (
          <div className="tool-layout lg:grid-cols-2 gap-6">
            {/* Left: Original Preview */}
            <Card className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Original Image
                </span>
                <Button
                  onClick={() => {
                    setImage(null);
                    setResizedUrl(null);
                  }}
                  variant="secondary"
                  size="xs"
                >
                  Change Image
                </Button>
              </div>
              <div
                className="flex-1 min-h-[250px] max-h-[350px] flex items-center justify-center rounded-xl overflow-hidden p-2 border"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
              >
                <img
                  ref={imgRef}
                  src={image}
                  onLoad={handleImageLoad}
                  alt="Original"
                  className="max-h-[330px] max-w-full object-contain"
                />
              </div>
              <div className="text-xs text-center text-[var(--text-secondary)]">
                Original Size: {originalWidth} × {originalHeight} px
              </div>
            </Card>

            {/* Right: Controls & Resized Result */}
            <Card className="flex flex-col gap-5 justify-between">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Resize Settings
                </span>

                {/* Width & Height */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Width (px)"
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                  />
                  <Input
                    label="Height (px)"
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                  />
                </div>

                {/* Lock aspect ratio */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={lockRatio}
                    onChange={(e) => setLockRatio(e.target.checked)}
                    className="accent-[var(--primary)] rounded bg-transparent"
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Lock Aspect Ratio (
                    {originalWidth && originalHeight
                      ? (originalWidth / originalHeight).toFixed(2)
                      : '1.00'}
                    )
                  </span>
                </label>

                {/* Format selection */}
                <Select
                  label="Output Format"
                  options={FORMAT_OPTIONS}
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                />

                <Button onClick={handleResize} disabled={isResizing} className="w-full mt-2">
                  {isResizing ? 'Resizing...' : 'Resize Image'}
                </Button>
              </div>

              {/* Download link */}
              {resizedUrl && (
                <div
                  className="pt-4 border-t flex flex-col gap-3"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <div className="text-xs font-semibold text-[var(--success)] flex items-center gap-1.5 justify-center">
                    <CheckCircle size={14} />
                    <span>Image resized successfully!</span>
                  </div>
                  <a
                    href={resizedUrl}
                    download={`resized_image.${format.split('/')[1]}`}
                    className="w-full btn btn-primary text-center flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    <span>Download Resized Image</span>
                  </a>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
