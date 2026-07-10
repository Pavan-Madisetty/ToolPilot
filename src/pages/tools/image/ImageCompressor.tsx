import { useState, useRef, useEffect, useCallback } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Dropzone, Card, Slider } from '@/components/ui';
import { RefreshCw, Download } from 'lucide-react';

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(0.8);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

  const [mimeType, setMimeType] = useState<string>('image/jpeg');

  const imgRef = useRef<HTMLImageElement | null>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (file: File) => {
    setOriginalName(file.name);
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
  };

  const compressImage = useCallback(() => {
    const img = imgRef.current;
    if (!image || !img) return;

    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const targetMime = mimeType === 'image/png' ? 'image/jpeg' : mimeType;
        const dataUrl = canvas.toDataURL(targetMime, quality);
        setCompressedUrl(dataUrl);

        // Estimate size from base64 string length
        const head = dataUrl.split(',')[0];
        const padding = dataUrl.endsWith('==') ? 2 : dataUrl.endsWith('=') ? 1 : 0;
        const sizeInBytes = (dataUrl.length - head.length - 1) * 0.75 - padding;
        setCompressedSize(sizeInBytes);
      }
    }, 100);
  }, [image, mimeType, quality]);

  useEffect(() => {
    if (image) {
      compressImage();
    }
  }, [image, compressImage]);

  const savings =
    originalSize && compressedSize
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  return (
    <ToolPageWrapper toolId="image-compress">
      <div className="w-full">
        {!image && (
          <Dropzone
            onFileSelect={handleFileSelect}
            accept="image/*"
            icon={<RefreshCw size={32} className="text-[var(--text-tertiary)]" />}
            title="Click to select or drag and drop image to compress"
            subtitle="Supports PNG, JPG, WebP. 100% browser-side."
          />
        )}

        {image && (
          <div className="tool-layout lg:grid-cols-2 gap-6">
            {/* Left Column: Previews */}
            <div className="flex flex-col gap-6">
              <Card className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    Original ({formatSize(originalSize)})
                  </span>
                  <Button
                    onClick={() => {
                      setImage(null);
                      setCompressedUrl(null);
                    }}
                    variant="secondary"
                    size="xs"
                  >
                    Change Image
                  </Button>
                </div>
                <div
                  className="min-h-[220px] max-h-[300px] flex items-center justify-center rounded-xl overflow-hidden p-2 border"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
                >
                  <img
                    ref={imgRef}
                    src={image}
                    alt="Original Source"
                    className="max-h-[280px] max-w-full object-contain"
                  />
                </div>
              </Card>

              {compressedUrl && (
                <Card className="flex flex-col gap-4">
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    Compressed ({formatSize(compressedSize)})
                  </span>
                  <div
                    className="min-h-[220px] max-h-[300px] flex items-center justify-center rounded-xl overflow-hidden p-2 border"
                    style={{
                      background: 'var(--bg-surface)',
                      borderColor: 'var(--border-default)',
                    }}
                  >
                    <img
                      src={compressedUrl}
                      alt="Compressed Output"
                      className="max-h-[280px] max-w-full object-contain"
                    />
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column: Controls */}
            <Card className="flex flex-col gap-6 justify-between h-fit">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Compression Parameters
                </span>

                {/* Slider */}
                <Slider
                  label="Compression Quality"
                  min={10}
                  max={100}
                  step={5}
                  value={Math.round(quality * 100)}
                  onChange={(val) => setQuality(val / 100)}
                  suffix="%"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] font-medium">
                  <span>Highest Compression</span>
                  <span>Best Quality</span>
                </div>

                {/* Size stats & savings readout */}
                <div
                  className="grid grid-cols-3 gap-3 pt-4 border-t"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <div className="flex flex-col text-center justify-center">
                    <span className="text-[10px] text-[var(--text-tertiary)] font-semibold uppercase">
                      Original
                    </span>
                    <span
                      className="text-sm font-bold mt-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {formatSize(originalSize)}
                    </span>
                  </div>
                  <div className="flex flex-col text-center justify-center">
                    <span className="text-[10px] text-[var(--text-tertiary)] font-semibold uppercase">
                      Compressed
                    </span>
                    <span
                      className="text-sm font-bold mt-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {formatSize(compressedSize)}
                    </span>
                  </div>
                  <div
                    className="flex flex-col text-center bg-[rgba(16,185,129,0.08)] p-2 rounded-xl border"
                    style={{ borderColor: 'rgba(16,185,129,0.2)' }}
                  >
                    <span className="text-[10px] text-[var(--success)] font-semibold uppercase">
                      Savings
                    </span>
                    <span className="text-base font-extrabold mt-0.5 text-[var(--success)]">
                      {savings}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Download */}
              {compressedUrl && (
                <div
                  className="pt-4 border-t flex flex-col gap-2"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <a
                    href={compressedUrl}
                    download={`compressed_${originalName || 'image'}.${mimeType === 'image/png' ? 'jpg' : mimeType.split('/')[1]}`}
                    className="w-full btn btn-primary text-center flex items-center justify-center gap-2 py-3"
                  >
                    <Download size={16} />
                    <span>Download Compressed Image</span>
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
