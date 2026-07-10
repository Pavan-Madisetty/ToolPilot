import { useState, useRef, ChangeEvent } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    }
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
            <div className="text-5xl mb-4 text-slate-400">✂️</div>
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Click to select or drag and drop an image to crop
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Supports custom aspect ratios. 100% offline.
            </p>
          </div>
        )}

        {image && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Panel: Cropping Editor */}
            <div className="border rounded-2xl p-4 flex flex-col gap-4" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Crop Area Adjustment
                </span>
                <button
                  onClick={() => {
                    setImage(null);
                    setCroppedUrl(null);
                  }}
                  className="px-3 py-1 text-xs border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  Change Image
                </button>
              </div>

              {/* Crop Visualizer Area */}
              <div className="relative min-h-[300px] max-h-[400px] bg-slate-100 dark:bg-slate-900/60 rounded-xl overflow-hidden flex items-center justify-center p-2">
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
                    className="absolute border-2 border-indigo-500 bg-indigo-500/20 box-border pointer-events-none"
                    style={{
                      left: `${cropX}%`,
                      top: `${cropY}%`,
                      width: `${cropW}%`,
                      height: `${cropH}%`,
                    }}
                  >
                    {/* Visual corner indicators */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-600 bg-white -translate-x-[2px] -translate-y-[2px]" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-indigo-600 bg-white translate-x-[2px] -translate-y-[2px]" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-indigo-600 bg-white -translate-x-[2px] translate-y-[2px]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-600 bg-white translate-x-[2px] translate-y-[2px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Settings & download */}
            <div className="border rounded-2xl p-5 flex flex-col gap-6 justify-between" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <div className="flex flex-col gap-5">
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Crop Settings
                </span>

                {/* Aspect Ratio selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Aspect Ratio</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['free', '1:1', '16:9', '4:3'].map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => handleAspectRatioChange(ratio)}
                        className={`py-1.5 border rounded-lg text-xs font-semibold uppercase transition-colors ${
                          aspectRatio === ratio
                            ? 'bg-indigo-500 text-white border-indigo-500'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        style={{
                          borderColor: aspectRatio === ratio ? 'transparent' : 'var(--border-default)',
                        }}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Position Controls (X, Y, Width, Height sliders) */}
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Horizontal Position (X)</span>
                      <span>{cropX}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={100 - cropW}
                      value={cropX}
                      onChange={(e) => setCropX(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Vertical Position (Y)</span>
                      <span>{cropY}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={100 - cropH}
                      value={cropY}
                      onChange={(e) => setCropY(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Width</span>
                      <span>{cropW}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max={100 - cropX}
                      value={cropW}
                      disabled={aspectRatio !== 'free'}
                      onChange={(e) => setCropW(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer disabled:opacity-50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Height</span>
                      <span>{cropH}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max={100 - cropY}
                      value={cropH}
                      disabled={aspectRatio !== 'free'}
                      onChange={(e) => setCropH(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer disabled:opacity-50"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCrop}
                  disabled={isCropping}
                  className="w-full btn btn-primary mt-2"
                >
                  {isCropping ? 'Cropping...' : 'Apply Crop'}
                </button>
              </div>

              {/* Cropped Output Preview */}
              {croppedUrl && (
                <div className="pt-4 border-t flex flex-col gap-3" style={{ borderColor: 'var(--border-default)' }}>
                  <div className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center justify-center">
                    <span>✓ Cropped image generated!</span>
                  </div>
                  <a
                    href={croppedUrl}
                    download="cropped_image.png"
                    className="w-full btn btn-primary text-center flex items-center justify-center py-2.5"
                  >
                    Download Cropped Image
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
