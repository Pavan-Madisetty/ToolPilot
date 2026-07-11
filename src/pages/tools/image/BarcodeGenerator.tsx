import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input } from '@/components/ui';
import { Download } from 'lucide-react';

// CODE128 encoding patterns (values 0-106, per the CODE128 specification).
// Indices 0-102 are data symbols; 103-105 are start codes; 106 is the stop code.
const CODE128_PATTERNS: string[] = [
  '11011001100', '11001101100', '11001100110', '10010011000', '10010001100',
  '10001001100', '10011001000', '10011000100', '10001100100', '11001001000',
  '11001000100', '11000100100', '10110011100', '10011011100', '10011001110',
  '10111001100', '10011101100', '10011100110', '11001110010', '11001011100',
  '11001001110', '11011100100', '11001110100', '11101101110', '11101001100',
  '11100101100', '11100100110', '11101100100', '11100110100', '11100110010',
  '11011011000', '11011000110', '11000110110', '10100011000', '10001011000',
  '10001000110', '10110001000', '10001101000', '10001100010', '11010001000',
  '11000101000', '11000100010', '10110111000', '10110001110', '10001101110',
  '10111011000', '10111000110', '10001110110', '11101110110', '11010001110',
  '11000101110', '11011101000', '11011100010', '11011101110', '11101011000',
  '11101000110', '11100010110', '11101101000', '11101100010', '11100011010',
  '11101111010', '11001000010', '11110001010', '10100110000', '10100001100',
  '10010110000', '10010000110', '10000101100', '10000100110', '10110010000',
  '10110000100', '10011010000', '10011000010', '10000110100', '10000110010',
  '11000010010', '11001010000', '11110111010', '11000010100', '10001111010',
  '10100111100', '10010111100', '10010011110', '10111100100', '10011110100',
  '10011110010', '11110100100', '11110010100', '11110010010', '11011011110',
  '11011110110', '11110110110', '10101111000', '10100011110', '10001011110',
  '10111101000', '10111100010', '11110101000', '11110100010', '10111011110',
  '10111101110', '11101011110', '11110101110', '11010000100', '11010010000',
  '11010011100', '1100011101011',
];

const START_CODE_B = CODE128_PATTERNS[104]; // Start Code B
const STOP_CODE = CODE128_PATTERNS[106]; // Stop pattern

export default function BarcodeGenerator() {
  const [text, setText] = useState<string>('TOOLSKYT123');

  let downloadUrl = '';
  let error: string | null = null;

  if (text) {
    try {
      // Validate ASCII characters (CODE128 B matches standard ASCII values 32-127)
      for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if (code < 32 || code > 126) {
          throw new Error(
            'Invalid characters. CODE128 B supports standard ASCII values (letters, numbers, symbols).'
          );
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

      downloadUrl =
        'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent.trim())));
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  }

  return (
    <ToolPageWrapper toolId="barcode-generator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <Card className="flex flex-col gap-5">
          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            Barcode Generator
          </span>

          <Input
            label="Barcode Content (Letters, Numbers & Standard Symbols)"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            placeholder="Enter alphanumeric text..."
            helperText="Barcode will automatically convert text to uppercase."
            error={error || undefined}
          />
        </Card>

        {/* Preview Panel */}
        <Card className="flex flex-col items-center justify-between gap-6">
          <span
            className="text-sm font-bold w-full text-left"
            style={{ color: 'var(--text-primary)' }}
          >
            Live Barcode Preview
          </span>

          {downloadUrl ? (
            <div
              className="p-4 border rounded-2xl flex items-center justify-center shadow-inner overflow-x-auto max-w-full"
              style={{ background: '#ffffff', borderColor: 'var(--border-default)' }}
            >
              <img src={downloadUrl} alt="Barcode Preview" className="h-28 object-contain" />
            </div>
          ) : (
            <div className="h-28 flex items-center justify-center text-[var(--text-tertiary)] text-sm">
              No barcode generated
            </div>
          )}

          <div className="w-full">
            <a
              href={downloadUrl || undefined}
              download="barcode.svg"
              style={{ pointerEvents: downloadUrl ? 'auto' : 'none' }}
            >
              <Button
                disabled={!downloadUrl}
                className="w-full flex items-center justify-center gap-2"
                leftIcon={<Download size={16} />}
              >
                Download Barcode (SVG)
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
