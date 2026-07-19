import { useState, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Download, 
  ImageIcon, 
  Maximize2, 
  Zap, 
  RefreshCw,
  Lock,
  Unlock,
  Check
} from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

const sampleUrl = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23f8fafc"/><circle cx="300" cy="200" r="80" fill="%233b82f6" opacity="0.1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">Upload an image to resize/compress</text></svg>';

export default function ImageResizer() {
  const [imageSrc, setImageSrc] = useState<string | null>(sampleUrl);
  const [imageName, setImageName] = useState<string>('sample-image.png');
  const [originalSize, setOriginalSize] = useState<number>(125400);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  
  // Controls
  const [format, setFormat] = useState<'webp' | 'png' | 'jpeg'>('webp');
  const [quality, setQuality] = useState<number>(80);
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(400);
  const [originalWidth, setOriginalWidth] = useState<number>(600);
  const [originalHeight, setOriginalHeight] = useState<number>(400);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);
    setOriginalSize(file.size);
    setDownloadUrl(null);
    setCompressedSize(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setImageSrc(event.target?.result as string);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspectRatio && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspectRatio && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(val * ratio));
    }
  };

  const processImage = () => {
    if (!imageSrc) return;
    setIsProcessing(true);
    setDownloadUrl(null);

    setTimeout(() => {
      try {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            setIsProcessing(false);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          const mimeType = format === 'webp' ? 'image/webp' : format === 'jpeg' ? 'image/jpeg' : 'image/png';
          const qualityValue = quality / 100;

          canvas.toBlob((blob) => {
            if (blob) {
              setCompressedSize(blob.size);
              const url = URL.createObjectURL(blob);
              setDownloadUrl(url);
            }
            setIsProcessing(false);
          }, mimeType, format === 'png' ? undefined : qualityValue);
        };
        img.src = imageSrc;
      } catch (err) {
        console.error(err);
        setIsProcessing(false);
      }
    }, 600);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compressionRatio = compressedSize && originalSize 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : null;

  return (
    <ToolPageWrapper toolId="image-resize">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 font-sans text-left">
        
        {/* LEFT COLUMN: Controls Panel (5 cols) */}
        <div className="lg:col-span-5 p-8 bg-gray-50/50 border-r border-gray-100 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded-full">DESIGN TOOL</span>
            <h2 className="font-display text-xl font-bold text-gray-900">WebP Compressor</h2>
            <p className="text-xs text-gray-500 font-medium">Resize images, adjust formats, and apply modern WebP compression ratios.</p>
          </div>

          <div className="space-y-4">
            
            {/* File Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Source Image File</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-400" />
                  Select Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="text-[11px] text-gray-500 font-mono truncate py-2 flex-grow max-w-[150px]">
                  {imageName}
                </span>
              </div>
            </div>

            {/* Export format buttons */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Export Format</label>
              <div className="grid grid-cols-3 gap-2">
                {(['webp', 'png', 'jpeg'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => { setFormat(fmt); setDownloadUrl(null); }}
                    className={`py-1.5 rounded text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                      format === fmt 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizer layout dimensions */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Resize Dimensions</label>
                <button 
                  onClick={() => {
                    setLockAspectRatio(!lockAspectRatio);
                    if (!lockAspectRatio && originalWidth > 0) {
                      const ratio = originalHeight / originalWidth;
                      setHeight(Math.round(width * ratio));
                    }
                  }}
                  className="flex items-center gap-1 text-[10px] text-primary font-bold uppercase"
                >
                  {lockAspectRatio ? (
                    <>
                      <Lock className="w-3 h-3 text-emerald-600" />
                      Locked Ratio
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3 text-gray-400" />
                      Unlocked
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400">Width (px)</span>
                  <input
                    type="number"
                    value={width || ''}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400">Height (px)</span>
                  <input
                    type="number"
                    value={height || ''}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Quality slider */}
            {format !== 'png' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Compression Quality</span>
                  <span className="font-mono font-bold text-primary">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => { setQuality(parseInt(e.target.value)); setDownloadUrl(null); }}
                  className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* Original details box */}
            <div className="p-3.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-600 space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Original Size:</span>
                <span className="font-bold text-gray-900">{formatSize(originalSize)}</span>
              </div>
              <div className="flex justify-between">
                <span>Resolution:</span>
                <span className="font-bold text-gray-900">{originalWidth} × {originalHeight}px</span>
              </div>
            </div>

          </div>

          <button
            onClick={processImage}
            className="w-full py-2.5 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-white animate-pulse" />
            Compress & Export Image
          </button>
        </div>

        {/* RIGHT COLUMN: Preview Sandbox (7 cols) */}
        <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
          
          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Interactive Output Canvas</span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
              <Maximize2 className="w-4 h-4 text-emerald-500" />
              100% Client-Side Sandbox
            </div>
          </div>

          {/* Image Preview Window */}
          <div className="flex-grow flex items-center justify-center min-h-[250px] bg-slate-50 border border-gray-100 rounded-xl relative overflow-hidden group">
            {imageSrc ? (
              <div className="p-4 max-h-[260px] flex items-center justify-center">
                <img 
                  ref={imageRef}
                  src={imageSrc} 
                  alt="Uploaded Sandbox" 
                  className="max-w-full max-h-[240px] rounded object-contain shadow-xs border border-gray-100 bg-white"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                <ImageIcon className="w-8 h-8 opacity-40 animate-pulse" />
                <p className="text-xs font-bold text-gray-400">Sandbox Preview Ready</p>
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                <span className="text-xs font-bold text-gray-800 uppercase tracking-widest font-mono">Executing Compression...</span>
              </div>
            )}
          </div>

          {/* Stats & download */}
          <div className="h-16 flex items-center justify-between">
            <AnimatePresence mode="wait">
              {downloadUrl && compressedSize ? (
                <motion.div
                  key="download-zone"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="w-full flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg"
                >
                  <div className="text-left font-sans">
                    <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                      <Check className="w-4.5 h-4.5 text-emerald-600" />
                      WebP Generation Complete!
                    </h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5 font-medium">
                      New Size: <span className="font-bold text-gray-900">{formatSize(compressedSize)}</span> 
                      {compressionRatio && compressionRatio > 0 && (
                        <span> ({compressionRatio}% compression ratio)</span>
                      )}
                    </p>
                  </div>

                  <a 
                    href={downloadUrl}
                    download={`optimized-${imageName.split('.')[0]}.${format}`}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors font-sans"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Save File
                  </a>
                </motion.div>
              ) : (
                <div className="text-xs text-gray-400 font-medium italic text-left w-full flex items-center justify-center gap-1.5 bg-gray-50 p-3 border border-gray-100 rounded-lg">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                  Select dimensions and click Compress to activate real WebP processing.
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </ToolPageWrapper>
  );
}
