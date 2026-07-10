import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Switch, CopyButton, Textarea } from '@/components/ui';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
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
      const utf8Bytes = new TextEncoder().encode(input);
      let base64 = btoa(String.fromCharCode(...utf8Bytes));

      if (isUrlSafe) {
        base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      }

      setOutput(base64);
    } catch {
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
    } catch {
      setError('Decoding failed. The input is not a valid Base64 string.');
      setOutput('');
    }
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const clearInput = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <ToolPageWrapper toolId="base64">
      <div className="tool-layout lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col gap-4">
          <Textarea
            label={
              <div className="flex items-center justify-between w-full">
                <span>Raw Input</span>
                {input && (
                  <Button onClick={clearInput} variant="ghost" size="xs">
                    Clear
                  </Button>
                )}
              </div>
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? "Enter plain text here to encode..." : "Enter Base64 text here to decode..."}
            className="font-mono text-xs leading-relaxed h-[300px] resize-none"
            aria-label="Base64 input textarea"
          />

          <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
            <Switch
              label="URL-Safe Base64"
              checked={isUrlSafe}
              onChange={setIsUrlSafe}
              description="Use - and _ symbols, trim padding"
            />
            
            {/* Segmented Mode Control */}
            <div className="segmented-control">
              <button
                type="button"
                onClick={() => setMode('encode')}
                className={`segmented-control__btn ${mode === 'encode' ? 'segmented-control__btn--active' : ''}`}
              >
                Encode
              </button>
              <button
                type="button"
                onClick={() => setMode('decode')}
                className={`segmented-control__btn ${mode === 'decode' ? 'segmented-control__btn--active' : ''}`}
              >
                Decode
              </button>
            </div>
          </div>

          <Button onClick={handleProcess} className="w-full mt-2">
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </Button>

          {error && (
            <div role="alert" className="p-3 bg-[rgba(239,68,68,0.08)] border border-[var(--border-default)] rounded-lg text-xs text-[var(--danger)]">
              {error}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="label">Calculated Result</span>
            {output && <CopyButton text={output} variant="ghost" size="xs" />}
          </div>

          <Textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="font-mono text-xs leading-relaxed h-[356px] resize-none"
            aria-label="Base64 processed output"
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
}
