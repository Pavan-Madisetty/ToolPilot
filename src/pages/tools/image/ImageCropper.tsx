import { useState, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Dropzone, Card, Slider } from '@/components/ui';
import { RefreshCw, CheckCircle, Download } from 'lucide-react';

export default function ImageCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<string>('free');

  // Crop coordinates in percentage of the image dimension (0 to 100)
  const [cropX, setCropX] = useState<number>(10);
  const [cropY, setCropY] = useState<number>(10);
  const [cropW, setCropW] = useState<number>(80);
  const [cropH, setCropH] = useState<number>(80);

  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        setCroppedUrl(null);
        // Reset crop overlay values
        setCropX(10);
        setCropY(10);
        setCropW(80);
        setCropH(80);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAspectRatioChange = (ratio: string, w = originalWidth, h = originalHeight) => {
    setAspectRatio(ratio);
    if (ratio === 'free') return;

    let targetRatio = 1.0;
    if (ratio === '1:1') targetRatio = 1.0;
    if (ratio === '16:9') targetRatio = 16 / 9;
    if (ratio === '4:3') targetRatio = 4 / 3;

    if (w && h) {
      const imageRatio = w / h;
      if (imageRatio > targetRatio) {
        const newW = Math.min(80, Math.round(80 * (targetRatio / imageRatio)));
        setCropW(newW);
        setCropH(80);
      } else {
        const newH = Math.min(80, Math.round(80 * (imageRatio / targetRatio)));
        setCropW(80);
        setCropH(newH);
      }
      setCropX(10);
      setCropY(10);
    }
  };

  const handleImageLoad = () => {
    if (imgRef.current) {
      const w = imgRef.current.naturalWidth;
      const h = imgRef.current.naturalHeight;
      setOriginalWidth(w);
      setOriginalHeight(h);
      handleAspectRatioChange(aspectRatio, w, h);
    }
  };

  const handleCrop = () => {
    const img = imgRef.current;
    if (!img) return;
    setIsCropping(true);

    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Convert percentage coordinates back to pixel values
      const xPixel = (cropX / 100) * originalWidth;
      const yPixel = (cropY / 100) * originalHeight;
      const wPixel = (cropW / 100) * originalWidth;
      const hPixel = (cropH / 100) * originalHeight;

      canvas.width = wPixel;
      canvas.height = hPixel;

      if (ctx) {
        ctx.drawImage(
          img,
          xPixel,
          yPixel,
          wPixel,
          hPixel,
          0,
          0,
          wPixel,
          hPixel
        );
        const dataUrl = canvas.toDataURL('image/png');
        setCroppedUrl(dataUrl);
      }
      setIsCropping(false);
    }, 100);
  };

  return (
    <ToolPageWrapper toolId="image-crop">
      <div className="w-full">
        {!image && (
          <Dropzone
            onFileSelect={handleFileSelect}
            accept="image/*"
            icon={<RefreshCw size={32} className="text-[var(--text-tertiary)]" />}
            title="Click to select or drag and drop an image to crop"
            subtitle="Supports custom aspect ratios. 100% offline."
          />
        )}

        {image && (
          <div className="tool-layout lg:grid-cols-2 gap-6">
            {/* Left Panel: Cropping Editor */}
            <Card className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Crop Area Adjustment
                </span>
                <Button
                  onClick={() => {
                    setImage(null);
                    setCroppedUrl(null);
                  }}
                  variant="secondary"
                  size="xs"
                >
                  Change Image
                </Button>
              </div>

              {/* Crop Visualizer Area */}
              <div
                className="relative min-h-[300px] max-h-[400px] rounded-xl overflow-hidden flex items-center justify-center p-2 border"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
              >
                <div className="relative inline-block max-h-full max-w-full">
                  <img
                    ref={imgRef}
                    src={image}
                    onLoad={handleImageLoad}
                    alt="Source"
                    className="max-h-[380px] max-w-full object-contain select-none pointer-events-none"
                  />

                  {/* Crop Overlay Box (Absolute position based on crop state) */}
                  <div
                    className="absolute border-2 border-[var(--primary)] bg-[rgba(99,102,241,0.2)] box-border pointer-events-none"
                    style={{
                      left: `${cropX}%`,
                      top: `${cropY}%`,
                      width: `${cropW}%`,
                      height: `${cropH}%`,
                    }}
                  >
                    {/* Visual corner indicators */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)] bg-white -translate-x-[2px] -translate-y-[2px]" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--primary)] bg-white translate-x-[2px] -translate-y-[2px]" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--primary)] bg-white -translate-x-[2px] translate-y-[2px]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--primary)] bg-white translate-x-[2px] translate-y-[2px]" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Right Panel: Settings & download */}
            <Card className="flex flex-col gap-6 justify-between">
              <div className="flex flex-col gap-5">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Crop Settings
                </span>

                {/* Aspect Ratio selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">Aspect Ratio</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['free', '1:1', '16:9', '4:3'].map((ratio) => (
                      <Button
                        key={ratio}
                        type="button"
                        onClick={() => handleAspectRatioChange(ratio)}
                        variant={aspectRatio === ratio ? 'primary' : 'secondary'}
                        size="sm"
                        className="uppercase"
                      >
                        {ratio}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Position Controls (X, Y, Width, Height sliders) */}
                <div className="flex flex-col gap-3 pt-2">
                  <Slider
                    label="Horizontal Position (X)"
                    min={0}
                    max={100 - cropW}
                    value={cropX}
                    onChange={setCropX}
                    suffix="%"
                  />

                  <Slider
                    label="Vertical Position (Y)"
                    min={0}
                    max={100 - cropH}
                    value={cropY}
                    onChange={setCropY}
                    suffix="%"
                  />

                  <Slider
                    label="Width"
                    min={10}
                    max={100 - cropX}
                    value={cropW}
                    disabled={aspectRatio !== 'free'}
                    onChange={setCropW}
                    suffix="%"
                  />

                  <Slider
                    label="Height"
                    min={10}
                    max={100 - cropY}
                    value={cropH}
                    disabled={aspectRatio !== 'free'}
                    onChange={setCropH}
                    suffix="%"
                  />
                </div>

                <Button
                  onClick={handleCrop}
                  disabled={isCropping}
                  className="w-full mt-2"
                >
                  {isCropping ? 'Cropping...' : 'Apply Crop'}
                </Button>
              </div>

              {/* Cropped Output Preview */}
              {croppedUrl && (
                <div className="pt-4 border-t flex flex-col gap-3" style={{ borderColor: 'var(--border-default)' }}>
                  <div className="text-xs font-semibold text-[var(--success)] flex items-center justify-center gap-1.5">
                    <CheckCircle size={14} />
                    <span>Cropped image generated!</span>
                  </div>
                  <a
                    href={croppedUrl}
                    download="cropped_image.png"
                    className="w-full btn btn-primary text-center flex items-center justify-center gap-2 py-2.5"
                  >
                    <Download size={16} />
                    <span>Download Cropped Image</span>
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
