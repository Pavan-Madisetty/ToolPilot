import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Switch, CopyButton, Textarea } from '@/components/ui';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeAll, setEncodeAll] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    setError(null);
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeAll ? encodeURIComponent(input) : encodeURI(input);
        setOutput(encoded);
      } else {
        const decoded = encodeAll ? decodeURIComponent(input) : decodeURI(input);
        setOutput(decoded);
      }
    } catch {
      setError(
        mode === 'encode'
          ? 'Encoding failed. Invalid characters detected.'
          : 'Decoding failed. The input is not a valid percent-encoded URI string.'
      );
      setOutput('');
    }
  };

  const clearInput = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <ToolPageWrapper toolId="url-encoder">
      <div className="tool-layout lg:grid-cols-2">
        {/* Input Panel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Raw URL / Text</span>
            <Button onClick={clearInput} variant="ghost" size="xs">
              Clear
            </Button>
          </div>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Enter URL or text to encode...'
                : 'Enter encoded URL text to decode...'
            }
            className="font-mono text-xs leading-relaxed h-[300px] resize-none"
            aria-label="URL input query"
          />

          <div
            className="flex flex-wrap items-center justify-between gap-4 border-t pt-4"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <Switch
              label="Encode All Characters"
              checked={encodeAll}
              onChange={setEncodeAll}
              description={
                encodeAll
                  ? 'Encode spaces, slashes, query parameters'
                  : 'Encode only spaces and special characters'
              }
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
            {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
          </Button>

          {error && (
            <div
              role="alert"
              className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400"
            >
              {error}
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Result Output</span>
            {output && <CopyButton text={output} variant="ghost" size="xs" />}
          </div>

          <Textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="font-mono text-xs leading-relaxed h-[356px] resize-none"
            aria-label="URL output result"
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
}
