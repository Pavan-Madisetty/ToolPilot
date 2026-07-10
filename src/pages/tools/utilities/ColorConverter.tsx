import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Card, Input, Slider, CopyButton } from '@/components/ui';

interface RGB {
  r: number;
  g: number;
  b: number;
}

// HSL to RGB
function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;
  let r = l, g = l, b = l;
  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hue2rgb = (t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    r = hue2rgb(h + 1/3);
    g = hue2rgb(h);
    b = hue2rgb(h - 1/3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// RGB to HSL
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// RGB to HSV
function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

// RGB to CMYK
function rgbToCmyk(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

// RGB to Hex
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const hex = Math.max(0, Math.min(255, c)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
}

// Parse string color formats
function parseColorString(str: string): RGB | null {
  const clean = str.trim().toLowerCase();
  
  // 1. Hex parsing
  const hexRegex = /^#?([a-f\d]{3,6})$/;
  const hexMatch = clean.match(hexRegex);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        return { r, g, b };
      }
    }
  }

  // 2. RGB parsing
  const rgbRegex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*\d*(?:\.\d+)?)?\s*\)/;
  const rgbMatch = clean.match(rgbRegex);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return { r, g, b };
    }
  }

  // Raw comma separated rgb
  const rawRgbRegex = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/;
  const rawRgbMatch = clean.match(rawRgbRegex);
  if (rawRgbMatch) {
    const r = parseInt(rawRgbMatch[1], 10);
    const g = parseInt(rawRgbMatch[2], 10);
    const b = parseInt(rawRgbMatch[3], 10);
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return { r, g, b };
    }
  }

  // 3. HSL parsing
  const hslRegex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*(?:,\s*\d*(?:\.\d+)?)?\s*\)/;
  const hslMatch = clean.match(hslRegex);
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10);
    const s = parseInt(hslMatch[2], 10);
    const l = parseInt(hslMatch[3], 10);
    if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
      return hslToRgb(h, s, l);
    }
  }

  return null;
}

export default function ColorConverter() {
  const [rgb, setRgb] = useState<RGB>({ r: 99, g: 102, b: 241 }); // default #6366f1
  const [textInput, setTextInput] = useState<string>('#6366f1');
  const [error, setError] = useState<string | undefined>(undefined);

  // Sync inputs on text change
  const handleTextChange = (val: string) => {
    setTextInput(val);
    if (val === '') {
      setError(undefined);
      return;
    }
    const parsed = parseColorString(val);
    if (parsed) {
      setRgb(parsed);
      setError(undefined);
    } else {
      setError('Invalid format. Try e.g. #6366f1, rgb(99,102,241), or hsl(239,84%,67%)');
    }
  };

  // Convert on RGB change
  const formats = useMemo(() => {
    const hexVal = rgbToHex(rgb.r, rgb.g, rgb.b);
    const hslVal = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsvVal = rgbToHsv(rgb.r, rgb.g, rgb.b);
    const cmykVal = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    return {
      hex: hexVal,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`,
      hsv: `hsv(${hsvVal.h}, ${hsvVal.s}%, ${hsvVal.v}%)`,
      cmyk: `cmyk(${cmykVal.c}%, ${cmykVal.m}%, ${cmykVal.y}%, ${cmykVal.k}%)`,
      rawHsl: hslVal,
    };
  }, [rgb]);



  const handleRgbSlider = (key: keyof RGB, val: number) => {
    setRgb((prev) => {
      const next = { ...prev, [key]: val };
      setTextInput(rgbToHex(next.r, next.g, next.b));
      setError(undefined);
      return next;
    });
  };

  const handleHslSlider = (key: 'h' | 's' | 'l', val: number) => {
    const currentHsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const nextHsl = { ...currentHsl, [key]: val };
    const nextRgb = hslToRgb(nextHsl.h, nextHsl.s, nextHsl.l);
    setRgb(nextRgb);
    setTextInput(rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b));
    setError(undefined);
  };

  return (
    <ToolPageWrapper toolId="color-converter">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        
        {/* Left Side: Inputs & Sliders */}
        <div className="space-y-6 p-6 card">
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Color Input</h3>
            <Input
              label="Color Code (Hex, RGB, HSL)"
              value={textInput}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="e.g. #6366f1 or rgb(99, 102, 241)"
              error={error}
            />
          </div>

          {/* RGB Sliders */}
          <div className="border-t pt-4 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>RGB Sliders</h4>
            <Slider
              label="Red"
              min={0}
              max={255}
              value={rgb.r}
              onChange={(val) => handleRgbSlider('r', val)}
            />
            <Slider
              label="Green"
              min={0}
              max={255}
              value={rgb.g}
              onChange={(val) => handleRgbSlider('g', val)}
            />
            <Slider
              label="Blue"
              min={0}
              max={255}
              value={rgb.b}
              onChange={(val) => handleRgbSlider('b', val)}
            />
          </div>

          {/* HSL Sliders */}
          <div className="border-t pt-4 space-y-4" style={{ borderColor: 'var(--border-default)' }}>
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>HSL Sliders</h4>
            <Slider
              label="Hue"
              min={0}
              max={360}
              value={formats.rawHsl.h}
              onChange={(val) => handleHslSlider('h', val)}
              suffix="°"
            />
            <Slider
              label="Saturation"
              min={0}
              max={100}
              value={formats.rawHsl.s}
              onChange={(val) => handleHslSlider('s', val)}
              suffix="%"
            />
            <Slider
              label="Lightness"
              min={0}
              max={100}
              value={formats.rawHsl.l}
              onChange={(val) => handleHslSlider('l', val)}
              suffix="%"
            />
          </div>
        </div>

        {/* Right Side: Preview & Formats */}
        <div className="space-y-6">
          {/* Swatch Preview Card */}
          <Card className="flex flex-col items-center justify-center p-6 space-y-4">
            <div
              className="w-full h-32 rounded-xl border shadow-inner transition-colors duration-200"
              style={{
                backgroundColor: formats.hex,
                borderColor: 'var(--border-strong)',
              }}
            />
            <div className="text-center">
              <span className="text-xl font-extrabold uppercase" style={{ color: 'var(--text-primary)' }}>
                {formats.hex}
              </span>
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                Swatch Preview
              </p>
            </div>
          </Card>

          {/* Output Formats */}
          <div className="p-6 card space-y-4">
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Converted Formats</h3>
            
            <div className="space-y-3">
              {[
                { label: 'HEX', val: formats.hex },
                { label: 'RGB', val: formats.rgb },
                { label: 'HSL', val: formats.hsl },
                { label: 'HSV', val: formats.hsv },
                { label: 'CMYK', val: formats.cmyk },
              ].map((fmt) => (
                <div 
                  key={fmt.label} 
                  className="flex items-center justify-between p-3 rounded-lg border bg-[var(--bg-surface)]"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                      {fmt.label}
                    </span>
                    <span className="font-mono text-sm font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                      {fmt.val}
                    </span>
                  </div>
                  <CopyButton text={fmt.val} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
}
