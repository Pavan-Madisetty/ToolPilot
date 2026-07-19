import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Clipboard, Check, Download, Palette, Sliders, Link } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function QrGenerator() {
  const [inputText, setInputText] = useState('https://toolskyt.com');
  const [fgColor, setFgColor] = useState('#4648d4'); // Default primary indigo
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(256);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [copied, setCopied] = useState(false);
  
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
      } catch (err) {
        console.error('Failed to generate QR Code:', err);
      }
    };
    drawQrCode();
  }, [inputText, fgColor, bgColor, qrSize, errorCorrection]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'toolskyt_qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyDataUrl = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    navigator.clipboard.writeText(dataUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <ToolPageWrapper toolId="qr-generator">
      <div className="space-y-6 font-sans text-left">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">QR Code Generator</h2>
          <p className="text-sm text-gray-500 mb-6">Create customizable, high-resolution QR codes instantly. Customize colors, sizing, and error correction levels in real-time.</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Controls Panel (Left side - 7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Input Text/URL */}
              <div className="space-y-2">
                <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
                  <Link className="w-3.5 h-3.5" />
                  Text or URL
                </label>
                <input
                  id="qr-text-input"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g., https://toolskyt.com or any text"
                  className="w-full h-12 bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/5 rounded-lg px-4 text-sm font-sans font-medium outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Color Settings */}
                <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100/50 space-y-4">
                  <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
                    <Palette className="w-4 h-4 text-primary" />
                    Styling & Colors
                  </h3>

                  {/* Foreground Color */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-600 font-sans">Foreground Color</span>
                    <div className="flex items-center gap-1.5 font-sans">
                      <input
                        id="qr-fg-color-input"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-8 h-8 rounded border-0 cursor-pointer p-0 overflow-hidden bg-transparent"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-20 bg-white border border-gray-200 rounded px-1.5 py-1 text-center text-[10px] font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* Background Color */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-600 font-sans">Background Color</span>
                    <div className="flex items-center gap-1.5 font-sans">
                      <input
                        id="qr-bg-color-input"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-8 h-8 rounded border-0 cursor-pointer p-0 overflow-hidden bg-transparent"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-20 bg-white border border-gray-200 rounded px-1.5 py-1 text-center text-[10px] font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Layout/Size Settings */}
                <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-100/50 space-y-4 font-sans">
                  <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
                    <Sliders className="w-4 h-4 text-primary" />
                    Layout & Sizing
                  </h3>

                  {/* QR Code Size Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                      <span>QR Code Size</span>
                      <span className="font-bold text-primary">{qrSize}x{qrSize}px</span>
                    </div>
                    <input
                      id="qr-size-slider"
                      type="range"
                      min={128}
                      max={512}
                      step={32}
                      value={qrSize}
                      onChange={(e) => setQrSize(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Error Correction Level */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500">Error Correction Level</label>
                    <select
                      id="qr-ecc-select"
                      value={errorCorrection}
                      onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                      className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs font-semibold text-gray-600 outline-none cursor-pointer"
                    >
                      <option value="L">Low (L) - Faster, ideal for simple urls</option>
                      <option value="M">Medium (M) - Safe for general text</option>
                      <option value="Q">Quartile (Q) - Heavy text logs</option>
                      <option value="H">High (H) - Maximum redundancy, safest</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* QR Code Output Panel (Right side - 5 columns) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center border border-gray-100 rounded-xl p-8 bg-gray-50/50 shadow-inner">
              <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100 flex items-center justify-center min-h-[220px] min-w-[220px]">
                <canvas 
                  ref={canvasRef} 
                  className="max-w-full h-auto"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-xs justify-center font-sans">
                <button
                  id="qr-download-btn"
                  onClick={handleDownload}
                  className="flex-1 px-4 py-2.5 bg-primary text-white text-xs font-bold uppercase rounded-lg shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
                
                <button
                  id="qr-copy-data-url-btn"
                  onClick={handleCopyDataUrl}
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 hover:text-primary rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:bg-gray-50"
                >
                  {copied ? <Check className="w-4 h-4 text-success-emerald" /> : <Clipboard className="w-4 h-4" />}
                  Copy Data URL
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
