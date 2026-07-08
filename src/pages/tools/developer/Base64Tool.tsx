import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Switch, CopyButton } from '@/components/ui';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isUrlSafe, setIsUrlSafe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Encode Handler
  const handleEncode = () => {
    setError(null);
    if (!input) {
      setOutput('');
      return;
    }

    try {
      // Use standard btoa with utf-8 encoding support
      const utf8Bytes = new TextEncoder().encode(input);
      let base64 = btoa(String.fromCharCode(...utf8Bytes));

      if (isUrlSafe) {
        // Swap symbols and remove padding
        base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }

      setOutput(base64);
    } catch (err: any) {
      setError('Encoding failed. Invalid characters detected.');
    }
  };

  // Decode Handler
  const handleDecode = () => {
    setError(null);
    if (!input) {
      setOutput('');
      return;
    }

    try {
      let base64 = input.trim();

      if (isUrlSafe) {
        // Restore standard padding and symbols
        base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
      }

      const binaryStr = atob(base64);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      const decoded = new TextDecoder().decode(bytes);
      setOutput(decoded);
    } catch (err: any) {
      setError('Decoding failed. The input is not a valid Base64 string.');
      setOutput('');
    }
  };

  return (
    <ToolPageWrapper toolId="base-64">
      <div className="tool-layout lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Raw Input</span>
            <Button onClick={() => setInput('')} variant="ghost" size="xs">
              Clear
            </Button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text here to encode or decode..."
            className="input-base font-mono text-xs leading-relaxed h-[300px] resize-none"
            aria-label="Base64 input textarea"
          />

          <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
            <Switch
              label="URL-Safe Base64"
              checked={isUrlSafe}
              onChange={setIsUrlSafe}
              description="Use - and _ symbols, trim padding"
            />
            <div className="flex gap-2">
              <Button onClick={handleEncode} size="sm">
                Encode
              </Button>
              <Button onClick={handleDecode} variant="secondary" size="sm">
                Decode
              </Button>
            </div>
          </div>

          {error && (
            <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Calculated Result</span>
            {output && <CopyButton text={output} />}
          </div>

          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="input-base font-mono text-xs leading-relaxed h-[300px] resize-none bg-slate-50/50 dark:bg-slate-900/30"
            aria-label="Base64 processed output"
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
}
