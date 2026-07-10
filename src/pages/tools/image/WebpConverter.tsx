import { useState, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Dropzone, Card, Slider } from '@/components/ui';
import { RefreshCw, CheckCircle, Download } from 'lucide-react';

export default function WebpConverter() {
  const [image, setImage] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(0.85);
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

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
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        setWebpUrl(null);
      }
    };
    reader.readAsDataURL(file);
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
      <div className="w-full">
        {!image && (
          <Dropzone
            onFileSelect={handleFileSelect}
            accept="image/png, image/jpeg, image/gif, image/bmp"
            icon={<RefreshCw size={32} className="text-[var(--text-tertiary)]" />}
            title="Click to select or drag and drop image (PNG, JPG, GIF, BMP) to convert to WebP"
            subtitle="Supports quality configuration. 100% offline."
          />
        )}

        {image && (
          <div className="tool-layout lg:grid-cols-2 gap-6">
            {/* Left Panel: Preview */}
            <Card className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Original Image ({formatSize(originalSize)})
                </span>
                <Button
                  onClick={() => {
                    setImage(null);
                    setWebpUrl(null);
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
                  alt="Original Source"
                  className="max-h-[330px] max-w-full object-contain"
                />
              </div>
              <div className="text-[10px] text-[var(--text-tertiary)] text-center truncate max-w-full">
                File: {originalName}
              </div>
            </Card>

            {/* Right Panel: Settings & Download */}
            <Card className="flex flex-col gap-6 justify-between">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  WebP Export Options
                </span>

                {/* Quality Slider */}
                <Slider
                  label="WebP Quality"
                  min={10}
                  max={100}
                  step={5}
                  value={Math.round(quality * 100)}
                  onChange={(val) => setQuality(val / 100)}
                  suffix="%"
                />

                <Button onClick={handleConvert} disabled={isConverting} className="w-full mt-2">
                  {isConverting ? 'Converting...' : 'Convert to WebP'}
                </Button>
              </div>

              {/* Output Download Link */}
              {webpUrl && (
                <div
                  className="pt-4 border-t flex flex-col gap-3"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <div className="text-xs font-semibold text-[var(--success)] flex items-center justify-center gap-1.5">
                    <CheckCircle size={14} />
                    <span>Converted to WebP successfully!</span>
                  </div>
                  <a
                    href={webpUrl}
                    download={`${originalName.split('.')[0] || 'converted'}.webp`}
                    className="w-full btn btn-primary text-center flex items-center justify-center gap-2 py-2.5"
                  >
                    <Download size={16} />
                    <span>Download WebP Image</span>
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
