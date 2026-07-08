import { useState, useEffect } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Select, CopyButton } from '@/components/ui';
import { ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const INDENT_OPTIONS = [
  { value: '2', label: '2 Spaces' },
  { value: '4', label: '4 Spaces' },
  { value: 'tab', label: 'Tabs' },
];

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState('2');
  const [sortKeys, setSortKeys] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to recursively sort object keys
  const sortObject = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sortObject);

    return Object.keys(obj)
      .sort()
      .reduce((sorted: any, key) => {
        sorted[key] = sortObject(obj[key]);
        return sorted;
      }, {});
  };

  // Main Formatting Handler
  const processJson = (mode: 'format' | 'minify') => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      // 1. Try standard parse
      let parsed = JSON.parse(input);

      // 2. Optional: sort keys
      if (sortKeys && mode === 'format') {
        parsed = sortObject(parsed);
      }

      // 3. Format or Minify
      if (mode === 'format') {
        const space = indent === 'tab' ? '\t' : Number(indent);
        setOutput(JSON.stringify(parsed, null, space));
      } else {
        setOutput(JSON.stringify(parsed));
      }
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setOutput('');
    }
  };

  // Auto-format on options change
  useEffect(() => {
    if (input.trim()) {
      processJson('format');
    }
  }, [indent, sortKeys]);

  // Try to repair common JSON syntax errors
  const repairJson = () => {
    setError(null);
    let repaired = input.trim();
    if (!repaired) return;

    try {
      // Replace single quotes with double quotes
      repaired = repaired.replace(/'/g, '"');
      // Remove trailing commas before closing braces/brackets
      repaired = repaired.replace(/,(\s*[}\]])/g, '$1');
      // Wrap unquoted keys in double quotes
      repaired = repaired.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

      const parsed = JSON.parse(repaired);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(`Repair failed: ${err.message}. Please check manual details.`);
    }
  };

  // Download Output as .json File
  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'toolpilot_formatted.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageWrapper toolId="json-formatter">
      <div className="tool-layout lg:grid-cols-2">
        {/* Input Panel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Input JSON</span>
            <div className="flex gap-2">
              <Button onClick={() => setInput('')} variant="ghost" size="xs">
                Clear
              </Button>
              <Button onClick={repairJson} variant="secondary" size="xs" leftIcon={<ArrowPathIcon className="w-3.5 h-3.5" />}>
                Auto-Fix
              </Button>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste JSON here... e.g. {"name": "ToolPilot", "tags": ["utility", "free"]}'
            className="input-base font-mono text-xs leading-relaxed h-[420px] resize-none"
            aria-label="JSON input raw data"
          />

          {error && (
            <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400">
              <span className="font-bold">Syntax Error:</span> {error}
            </div>
          )}
        </div>

        {/* Controls and Output Panel */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Select
                options={INDENT_OPTIONS}
                value={indent}
                onChange={(e) => setIndent(e.target.value)}
                className="max-w-[130px] py-1 px-2 text-xs"
                aria-label="Indentation spacing selector"
              />
              <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={sortKeys}
                  onChange={(e) => setSortKeys(e.target.checked)}
                  className="rounded text-blue-500 border-gray-300 focus:ring-blue-500"
                />
                <span>Sort Keys</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => processJson('format')} size="xs">
                Format
              </Button>
              <Button onClick={() => processJson('minify')} variant="secondary" size="xs">
                Minify
              </Button>
            </div>
          </div>

          {/* Output view box */}
          <div className="relative flex-1 flex flex-col">
            <div className="absolute right-3 top-3 z-10 flex gap-2">
              {output && <CopyButton text={output} />}
              {output && (
                <button
                  onClick={downloadJson}
                  className="copy-btn flex items-center gap-1"
                  title="Download File"
                  aria-label="Download JSON output file"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            <textarea
              readOnly
              value={output}
              placeholder="Formatted output will appear here..."
              className="input-base font-mono text-xs leading-relaxed h-[420px] resize-none bg-slate-50/50 dark:bg-slate-900/30"
              aria-label="Formatted JSON output"
            />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
