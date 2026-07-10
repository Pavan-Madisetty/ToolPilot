import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { CopyButton } from '@/components/ui';

// Color conversion helper functions
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 99, g: 102, b: 241 }; // Default primary indigo
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r = l;
  let g = l;
  let b = l;

  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export default function ColorPicker() {
  const [hex, setHex] = useState('#6366f1');
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });

  const updateColorFromHex = (newHex: string) => {
    if (/^#[0-9A-F]{6}$/i.test(newHex)) {
      const newRgb = hexToRgb(newHex);
      const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
      setHex(newHex);
      setRgb(newRgb);
      setHsl(newHsl);
    } else {
      setHex(newHex);
    }
  };

  const updateColorFromRgb = (r: number, g: number, b: number) => {
    const newHex = rgbToHex(r, g, b);
    const newHsl = rgbToHsl(r, g, b);
    setHex(newHex);
    setRgb({ r, g, b });
    setHsl(newHsl);
  };

  const updateColorFromHsl = (h: number, s: number, l: number) => {
    const newRgb = hslToRgb(h, s, l);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    setRgb(newRgb);
    setHsl({ h, s, l });
  };

  return (
    <ToolPageWrapper toolId="color-picker">
      <div className="tool-layout lg:grid-cols-2 gap-8">
        {/* Left Side: Color Picker / Sliders */}
        <div className="flex flex-col gap-6 p-6 card">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Color Controls</h2>
          
          <div className="flex items-center gap-4">
            {/* Color preview swatch and input */}
            <div
              className="relative w-24 h-24 rounded-xl border shadow-sm shrink-0 overflow-hidden"
              style={{
                backgroundColor: hex,
                borderColor: 'var(--border-default)',
              }}
            >
              <input
                type="color"
                value={hex.startsWith('#') && hex.length === 7 ? hex : '#000000'}
                onChange={(e) => updateColorFromHex(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Color input selector"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor="hex-input" className="label">HEX Input</label>
              <input
                id="hex-input"
                type="text"
                value={hex}
                onChange={(e) => updateColorFromHex(e.target.value)}
                className="input-base font-mono uppercase"
                placeholder="#6366F1"
                maxLength={7}
              />
            </div>
          </div>

          {/* RGB Sliders */}
          <div className="flex flex-col gap-4">
            <span className="label">RGB Channels</span>
            
            {/* Red */}
            <div className="flex items-center gap-3">
              <span className="w-4 text-xs font-semibold text-red-500">R</span>
              <input
                type="range"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) => updateColorFromRgb(Number(e.target.value), rgb.g, rgb.b)}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-800"
                style={{
                  background: `linear-gradient(to right, rgb(0, ${rgb.g}, ${rgb.b}), rgb(255, ${rgb.g}, ${rgb.b}))`
                }}
                aria-label="Red channel slider"
              />
              <span className="w-8 text-right font-mono text-xs">{rgb.r}</span>
            </div>

            {/* Green */}
            <div className="flex items-center gap-3">
              <span className="w-4 text-xs font-semibold text-emerald-500">G</span>
              <input
                type="range"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) => updateColorFromRgb(rgb.r, Number(e.target.value), rgb.b)}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-800"
                style={{
                  background: `linear-gradient(to right, rgb(${rgb.r}, 0, ${rgb.b}), rgb(${rgb.r}, 255, ${rgb.b}))`
                }}
                aria-label="Green channel slider"
              />
              <span className="w-8 text-right font-mono text-xs">{rgb.g}</span>
            </div>

            {/* Blue */}
            <div className="flex items-center gap-3">
              <span className="w-4 text-xs font-semibold text-blue-500">B</span>
              <input
                type="range"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) => updateColorFromRgb(rgb.r, rgb.g, Number(e.target.value))}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-800"
                style={{
                  background: `linear-gradient(to right, rgb(${rgb.r}, ${rgb.g}, 0), rgb(${rgb.r}, ${rgb.g}, 255))`
                }}
                aria-label="Blue channel slider"
              />
              <span className="w-8 text-right font-mono text-xs">{rgb.b}</span>
            </div>
          </div>

          {/* HSL Sliders */}
          <div className="flex flex-col gap-4 border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
            <span className="label">HSL Values</span>

            {/* Hue */}
            <div className="flex items-center gap-3">
              <span className="w-4 text-xs font-semibold">H</span>
              <input
                type="range"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => updateColorFromHsl(Number(e.target.value), hsl.s, hsl.l)}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-800"
                style={{
                  background: 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)'
                }}
                aria-label="Hue slider"
              />
              <span className="w-8 text-right font-mono text-xs">{hsl.h}°</span>
            </div>

            {/* Saturation */}
            <div className="flex items-center gap-3">
              <span className="w-4 text-xs font-semibold">S</span>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => updateColorFromHsl(hsl.h, Number(e.target.value), hsl.l)}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-800"
                style={{
                  background: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`
                }}
                aria-label="Saturation slider"
              />
              <span className="w-8 text-right font-mono text-xs">{hsl.s}%</span>
            </div>

            {/* Lightness */}
            <div className="flex items-center gap-3">
              <span className="w-4 text-xs font-semibold">L</span>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => updateColorFromHsl(hsl.h, hsl.s, Number(e.target.value))}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-800"
                style={{
                  background: `linear-gradient(to right, black, hsl(${hsl.h}, ${hsl.s}%, 50%), white)`
                }}
                aria-label="Lightness slider"
              />
              <span className="w-8 text-right font-mono text-xs">{hsl.l}%</span>
            </div>
          </div>
        </div>

        {/* Right Side: Output formats / copy values */}
        <div className="flex flex-col gap-6 p-6 card">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Color Conversions</h2>

          {/* HEX Result */}
          <div className="flex flex-col gap-2">
            <span className="label">HEX format</span>
            <div className="flex gap-2">
              <input
                readOnly
                type="text"
                value={hex.toUpperCase()}
                className="input-base font-mono text-xs"
                aria-label="HEX code result"
              />
              <CopyButton text={hex.toUpperCase()} />
            </div>
          </div>

          {/* RGB Result */}
          <div className="flex flex-col gap-2">
            <span className="label">RGB format</span>
            <div className="flex gap-2">
              <input
                readOnly
                type="text"
                value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                className="input-base font-mono text-xs"
                aria-label="RGB result string"
              />
              <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
            </div>
          </div>

          {/* HSL Result */}
          <div className="flex flex-col gap-2">
            <span className="label">HSL format</span>
            <div className="flex gap-2">
              <input
                readOnly
                type="text"
                value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                className="input-base font-mono text-xs"
                aria-label="HSL result string"
              />
              <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
            </div>
          </div>

          {/* CSS Rule representation */}
          <div className="flex flex-col gap-2 border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
            <span className="label">CSS styling snippet</span>
            <pre className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-lg font-mono text-xs leading-relaxed select-all">
              {`background-color: ${hex.toUpperCase()};\ncolor: ${hsl.l > 55 ? '#0F172A' : '#FFFFFF'};`}
            </pre>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
