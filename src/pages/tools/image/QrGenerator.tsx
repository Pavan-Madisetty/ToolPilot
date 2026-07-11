import { useState, useEffect, useCallback, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Textarea } from '@/components/ui';

// Simple lightweight QR code generator matrix helper
class QRCodeModel {
  typeNumber: number;
  errorCorrectLevel: number;
  modules: boolean[][] = [];
  moduleCount = 0;
  dataList: { mode: number; data: string }[] = [];

  constructor(typeNumber: number, errorCorrectLevel: number) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
  }

  addData(data: string) {
    this.dataList.push({ mode: 4, data }); // Mode 4 is Byte mode
  }

  make() {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = Array.from({ length: this.moduleCount }, () =>
      new Array(this.moduleCount).fill(false)
    );

    this.setupPositionDetectionPattern(0, 0);
    this.setupPositionDetectionPattern(this.moduleCount - 7, 0);
    this.setupPositionDetectionPattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo();

    const data = this.createData();
    this.mapData(data);
  }

  setupPositionDetectionPattern(row: number, col: number) {
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || this.moduleCount <= row + r) continue;
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || this.moduleCount <= col + c) continue;
        if (
          (0 <= r && r <= 6 && (c === 0 || c === 6)) ||
          (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
          (2 <= r && r <= 4 && 2 <= c && c <= 4)
        ) {
          this.modules[row + r][col + c] = true;
        }
      }
    }
  }

  setupTimingPattern() {
    for (let r = 8; r < this.moduleCount - 8; r++) {
      this.modules[r][6] = r % 2 === 0;
    }
    for (let c = 8; c < this.moduleCount - 8; c++) {
      this.modules[6][c] = c % 2 === 0;
    }
  }

  setupPositionAdjustPattern() {
    const pos = this.getPatternPosition();
    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        const row = pos[i];
        const col = pos[j];
        if (
          (row === 6 && col === 6) ||
          (row === 6 && col === this.moduleCount - 7) ||
          (row === this.moduleCount - 7 && col === 6)
        ) {
          continue;
        }
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
              this.modules[row + r][col + c] = true;
            }
          }
        }
      }
    }
  }

  getPatternPosition(): number[] {
    if (this.typeNumber === 1) return [];
    if (this.typeNumber === 2) return [6, 18];
    if (this.typeNumber === 3) return [6, 22];
    if (this.typeNumber === 4) return [6, 26];
    return [6, 20 + (this.typeNumber - 2) * 4];
  }

  setupTypeInfo() {
    const data = (this.errorCorrectLevel << 3) | 0;
    const bits = this.getBCHTypeInfo(data);
    for (let i = 0; i < 15; i++) {
      const mod = ((bits >> i) & 1) === 1;
      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }
    }
    for (let i = 0; i < 15; i++) {
      const mod = ((bits >> i) & 1) === 1;
      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }
    this.modules[this.moduleCount - 8][8] = true;
  }

  getBCHTypeInfo(data: number): number {
    let d = data << 10;
    while (this.getMSB(d) >= 10) {
      d ^= 0x537 << (this.getMSB(d) - 10);
    }
    return ((data << 10) | d) ^ 0x5412;
  }

  getMSB(n: number): number {
    let msb = 0;
    while (n >= 1 << (msb + 1)) {
      msb++;
    }
    return msb;
  }

  createData(): number[] {
    const buffer: number[] = [];
    for (const item of this.dataList) {
      buffer.push(4);
      buffer.push(item.data.length);
      for (let i = 0; i < item.data.length; i++) {
        buffer.push(item.data.charCodeAt(i));
      }
    }
    return buffer;
  }

  mapData(data: number[]) {
    let inc = -1;
    let row = this.moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;

    for (let col = this.moduleCount - 1; col > 0; col -= 2) {
      if (col === 6) col--;
      while (true) {
        for (let c = 0; c < 2; c++) {
          const currentCol = col - c;
          const isReserved = this.isReservedPattern(row, currentCol);
          if (!isReserved) {
            let dark = false;
            if (byteIndex < data.length) {
              dark = ((data[byteIndex] >>> bitIndex) & 1) === 1;
            }
            const mask = (row + currentCol) % 2 === 0;
            if (mask) {
              dark = !dark;
            }
            this.modules[row][currentCol] = dark;
            bitIndex--;
            if (bitIndex === -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }

  isReservedPattern(row: number, col: number): boolean {
    if (row < 9 && col < 9) return true;
    if (row < 9 && col >= this.moduleCount - 8) return true;
    if (row >= this.moduleCount - 8 && col < 9) return true;
    if (row === 6 || col === 6) return true;
    return false;
  }
}

export default function QrGenerator() {
  const [text, setText] = useState<string>('https://toolskyt.com');
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [size, setSize] = useState<number>(256);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateQR = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const len = text.length;
    let version = 2;
    if (len > 32) version = 4;
    if (len > 60) version = 6;
    if (len > 120) version = 10;

    try {
      if (len > 255) {
        throw new Error('Input is too long to encode. Please shorten your text.');
      }

      const qr = new QRCodeModel(version, 1); // 1 = Medium Error correction
      qr.addData(text || ' ');
      qr.make();

      const moduleCount = qr.moduleCount;
      const cellSize = size / moduleCount;

      canvas.width = size;
      canvas.height = size;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);

      ctx.fillStyle = fgColor;
      for (let r = 0; r < moduleCount; r++) {
        for (let c = 0; c < moduleCount; c++) {
          if (qr.modules[r][c]) {
            ctx.fillRect(
              Math.round(c * cellSize),
              Math.round(r * cellSize),
              Math.ceil(cellSize),
              Math.ceil(cellSize)
            );
          }
        }
      }
      setDownloadUrl(canvas.toDataURL('image/png'));
      setError(null);
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error && e.message
          ? e.message
          : 'Failed to generate QR code. Your input may be too long.'
      );
    }
  }, [text, fgColor, bgColor, size]);

  useEffect(() => {
    generateQR();
  }, [generateQR]);

  return (
    <ToolPageWrapper toolId="qr-generator">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel: Settings */}
          <div
            className="border rounded-2xl p-5 flex flex-col gap-5"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              QR Settings
            </span>

            {/* Input Data */}
            <Textarea
              label="QR Code Content (URL or Text)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text to encode..."
              rows={4}
              className="resize-none text-sm"
              aria-label="QR Code Content"
            />

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer bg-transparent"
                    style={{ borderColor: 'var(--border-default)' }}
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-2.5 py-1 border rounded-lg bg-transparent text-xs outline-none focus:border-[var(--border-focus)] transition-colors"
                    style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer bg-transparent"
                    style={{ borderColor: 'var(--border-default)' }}
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-2.5 py-1 border rounded-lg bg-transparent text-xs outline-none focus:border-[var(--border-focus)] transition-colors"
                    style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                QR Code Size (px)
              </label>
              <select
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="px-3 py-2 border rounded-xl bg-transparent outline-none focus:border-[var(--border-focus)] transition-colors text-sm"
                style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
              >
                <option value={128}>128 × 128 px</option>
                <option value={256}>256 × 256 px</option>
                <option value={512}>512 × 512 px</option>
                <option value={1024}>1024 × 1024 px</option>
              </select>
            </div>

            {error && (
              <p role="alert" className="text-xs font-semibold" style={{ color: 'var(--danger)' }}>
                {error}
              </p>
            )}
          </div>

          {/* Right Panel: Output & Download */}
          <div
            className="border rounded-2xl p-5 flex flex-col items-center justify-between gap-6"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <span
              className="text-sm font-bold w-full text-left"
              style={{ color: 'var(--text-primary)' }}
            >
              Live Preview
            </span>

            <div className="p-4 border rounded-2xl bg-white flex items-center justify-center shadow-inner">
              <canvas ref={canvasRef} className="max-w-[200px] h-auto object-contain" />
            </div>

            <div className="w-full flex flex-col gap-3">
              <a
                href={downloadUrl}
                download="qrcode.png"
                className="w-full btn btn-primary text-center flex items-center justify-center py-2.5"
              >
                Download QR Code (PNG)
              </a>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
