import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Palette, Sliders, Link as LinkIcon } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton } from '@/components/ui';

export default function QrGenerator() {
  const [inputText, setInputText] = useState('https://toolskyt.com');
  const [fgColor, setFgColor] = useState('#4648d4');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(256);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [dataUrl, setDataUrl] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawQrCode = async () => {
      if (!canvasRef.current) return;
      try {
        await QRCode.toCanvas(canvasRef.current, inputText, {
          width: qrSize,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: errorCorrection,
        });
        setDataUrl(canvasRef.current.toDataURL('image/png'));
      } catch (err) {
        console.error('Failed to generate QR Code:', err);
      }
    };
    drawQrCode();
  }, [inputText, fgColor, bgColor, qrSize, errorCorrection]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'toolskyt_qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolPageWrapper toolId="qr-generator">
      <div className="tool-layout lg:grid-cols-12 gap-6 text-left">
        {/* Controls Panel (Left side - 7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Input Text/URL */}
          <div className="flex flex-col gap-2">
            <label className="label flex items-center gap-1.5">
              <LinkIcon size={14} className="text-primary" />
              <span>Text or URL</span>
            </label>
            <input
              id="qr-text-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g., https://toolskyt.com or any text"
              className="input-base h-11 text-xs font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Color Settings */}
            <div className="p-4 bg-bg-surface-container-low rounded-xl border border-border-default space-y-4">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide flex items-center gap-1.5 border-b border-border-default pb-2">
                <Palette size={16} className="text-primary" />
                <span>Styling & Colors</span>
              </h3>

              {/* Foreground Color */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-text-secondary">Foreground</span>
                <div className="flex items-center gap-2">
                  <input
                    id="qr-fg-color-input"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-7 h-7 rounded border-0 cursor-pointer p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-20 bg-bg-surface border border-border-default rounded px-2 py-1 text-center text-[10px] font-mono font-bold text-text-primary"
                  />
                </div>
              </div>

              {/* Background Color */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-text-secondary">Background</span>
                <div className="flex items-center gap-2">
                  <input
                    id="qr-bg-color-input"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-7 h-7 rounded border-0 cursor-pointer p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-20 bg-bg-surface border border-border-default rounded px-2 py-1 text-center text-[10px] font-mono font-bold text-text-primary"
                  />
                </div>
              </div>
            </div>

            {/* Layout/Size Settings */}
            <div className="p-4 bg-bg-surface-container-low rounded-xl border border-border-default space-y-4">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wide flex items-center gap-1.5 border-b border-border-default pb-2">
                <Sliders size={16} className="text-primary" />
                <span>Layout & Sizing</span>
              </h3>

              {/* QR Code Size Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-text-secondary font-medium">
                  <span>QR Code Size</span>
                  <span className="font-bold text-primary font-mono">{qrSize}x{qrSize}px</span>
                </div>
                <input
                  id="qr-size-slider"
                  type="range"
                  min={128}
                  max={512}
                  step={32}
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-border-default rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Error Correction Level */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-text-secondary block">Error Correction</label>
                <select
                  id="qr-ecc-select"
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                  className="w-full bg-bg-surface border border-border-default rounded px-2 py-1.5 text-xs font-semibold text-text-primary outline-none cursor-pointer"
                >
                  <option value="L">Low (L) - Faster</option>
                  <option value="M">Medium (M) - Standard</option>
                  <option value="Q">Quartile (Q) - Heavy logs</option>
                  <option value="H">High (H) - Maximum reliability</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Output Panel (Right side - 5 columns) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center border border-border-default rounded-xl p-8 bg-bg-surface-container-low shadow-inner">
          <div className="p-4 bg-white rounded-lg shadow-md border border-border-default flex items-center justify-center min-h-[220px] min-w-[220px]">
            <canvas ref={canvasRef} className="max-w-full h-auto" />
          </div>

          <div className="flex flex-wrap gap-3 mt-6 w-full max-w-xs justify-center font-sans">
            <Button
              id="qr-download-btn"
              onClick={handleDownload}
              size="sm"
              leftIcon={<Download size={14} />}
              className="flex-1"
            >
              Download PNG
            </Button>
            {dataUrl && (
              <CopyButton text={dataUrl} label="Copy Data URL" size="sm" variant="outline" className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
