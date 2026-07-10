import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

// CODE128 encoding patterns (Version B)
const CODE128_PATTERNS: string[] = [
  '11011001100', '11001101100', '11001100110', '10010011000', '10010001100', '10001001100', '10011001000', '10011000100', '10001100100', '11001101000',
  '11001100010', '11000110100', '10110011100', '10011011100', '10011001110', '10111001100', '10011100110', '10011100010', '11011011100', '11001101110',
  '11001110110', '11011100100', '11001110100', '11101101110', '11101001100', '11100100110', '11100100010', '11101100100', '11100110100', '11100110010',
  '11011011000', '11011000110', '11000110110', '10100011000', '10001011000', '10001000110', '10110001000', '10001101000', '10001100010', '11010001000',
  '11000101000', '11000100010', '10110111000', '10110001110', '10001101110', '10111011000', '10111000110', '10001110110', '11101110110', '11010001110',
  '11000101110', '11011101000', '11011100010', '11011101110', '11101011000', '11101000110', '11100010110', '11101101000', '11101100010', '11100011010',
  '11101111010', '11001000010', '11110001010', '10100110000', '10100001100', '10010110000', '10010000110', '10000101100', '10000100110', '10111010000',
  '10111000010', '10000110110', '10000110010', '11000010010', '11000010100', '109_dummy', '11000010100', '10110111100', '11101011110', '11110101110',
  '11011101011', '11100101011', '11100101101', '10011011000', '10010001110', '10001001110', '10011101100', '10011100020_dummy', '10010111100', '10010011110',
  '10001011110', '10111101000', '10111100010', '10111101110', '11110101000', '11110100010', '11110101110', '11011101110', '11011110100', '11101111010',
  '11101011110', '11101011110', '11101011110', '11101011110', '11101011110', '11101011110'
];

const START_CODE_B = '11010010000';
const STOP_CODE = '1100011101011';

export default function BarcodeGenerator() {
  const [text, setText] = useState<string>('TOOLPILOT123');

  let downloadUrl = '';
  let error: string | null = null;

  if (text) {
    try {
      // Validate ASCII characters (CODE128 B matches standard ASCII values 32-127)
      for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if (code < 32 || code > 126) {
          throw new Error('Invalid characters. CODE128 B supports standard ASCII values (letters, numbers, symbols).');
        }
      }

      // Calculate checksum
      let checksum = 104; // Start code value
      for (let i = 0; i < text.length; i++) {
        const charVal = text.charCodeAt(i) - 32;
        checksum += charVal * (i + 1);
      }
      const checksumIndex = checksum % 103;

      // Build overall bit stream
      let bits = START_CODE_B;
      for (let i = 0; i < text.length; i++) {
        const charVal = text.charCodeAt(i) - 32;
        bits += CODE128_PATTERNS[charVal];
      }
      bits += CODE128_PATTERNS[checksumIndex];
      bits += STOP_CODE;

      // Convert bit stream to base64 SVG for download preview
      const barWidth = 2;
      const barHeight = 80;
      const padding = 20;
      const width = bits.length * barWidth + padding * 2;
      const height = barHeight + padding * 2 + 15; // Extra padding for text

      let rectsSvg = '';
      for (let i = 0; i < bits.length; i++) {
        if (bits[i] === '1') {
          rectsSvg += `<rect x="${padding + i * barWidth}" y="${padding}" width="${barWidth}" height="${barHeight}" fill="#000000" />`;
        }
      }

      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:#ffffff;">
          ${rectsSvg}
          <text x="${width / 2}" y="${padding + barHeight + 15}" font-family="monospace" font-size="14" font-weight="bold" fill="#000000" text-anchor="middle">
            ${text}
          </text>
        </svg>
      `;

      downloadUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent.trim())));
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  }

  return (
    <ToolPageWrapper toolId="barcode-generator">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="border rounded-2xl p-5 flex flex-col gap-5" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Barcode Generator
            </span>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Barcode Content (Letters, Numbers & Standard Symbols)</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase())}
                placeholder="Enter alphanumeric text..."
                className="px-3 py-2 border rounded-xl bg-transparent outline-none focus:border-indigo-500 transition-colors text-sm font-mono"
                style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
              />
              <span className="text-[10px] text-slate-400">Barcode will automatically convert text to uppercase.</span>
            </div>

            {error && (
              <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 text-xs text-red-600 dark:text-red-400">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="border rounded-2xl p-5 flex flex-col items-center justify-between gap-6" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
            <span className="text-sm font-bold w-full text-left" style={{ color: 'var(--text-primary)' }}>
              Live Barcode Preview
            </span>

            {downloadUrl ? (
              <div className="p-4 border rounded-2xl bg-white flex items-center justify-center shadow-inner overflow-x-auto max-w-full">
                <img src={downloadUrl} alt="Barcode Preview" className="h-28 object-contain" />
              </div>
            ) : (
              <div className="h-28 flex items-center justify-center text-slate-400 text-sm">
                No barcode generated
              </div>
            )}

            <div className="w-full">
              <a
                href={downloadUrl || undefined}
                download="barcode.svg"
                className={`w-full btn btn-primary text-center flex items-center justify-center py-2.5 ${!downloadUrl ? 'opacity-50 pointer-events-none' : ''}`}
              >
                Download Barcode (SVG)
              </a>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
