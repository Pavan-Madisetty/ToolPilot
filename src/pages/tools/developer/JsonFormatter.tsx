import { useState, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Select, CopyButton, Textarea } from '@/components/ui';
import { Download, RefreshCw } from 'lucide-react';

const INDENT_OPTIONS = [
  { value: '2', label: '2 Spaces' },
  { value: '4', label: '4 Spaces' },
  { value: 'tab', label: 'Tabs' },
];

// Helper function to recursively sort object keys
const sortObject = (obj: unknown): unknown => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);

  const record = obj as Record<string, unknown>;
  return Object.keys(record)
    .sort()
    .reduce((sorted: Record<string, unknown>, key) => {
      sorted[key] = sortObject(record[key]);
      return sorted;
    }, {});
};

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState('2');
  const [sortKeys, setSortKeys] = useState(false);
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [repairTrigger, setRepairTrigger] = useState(0);

  // Compute processed output and error cleanly during render
  const jsonResults = useMemo(() => {
    void repairTrigger;
    if (!input.trim()) {
      return { output: '', error: null };
    }

    try {
      let parsed = JSON.parse(input);

      if (sortKeys && mode === 'format') {
        parsed = sortObject(parsed);
      }

      if (mode === 'format') {
        const space = indent === 'tab' ? '\t' : Number(indent);
        return {
          output: JSON.stringify(parsed, null, space),
          error: null,
        };
      } else {
        return {
          output: JSON.stringify(parsed),
          error: null,
        };
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON syntax';
      return {
        output: '',
        error: msg,
      };
    }
  }, [input, indent, sortKeys, mode, repairTrigger]);

  // Try to repair common JSON syntax errors
  const repairJson = () => {
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
      setMode('format');
      setRepairTrigger((t) => t + 1);
    } catch {
      // Ignore repair failures, the validator will display the error anyway
    }
  };

  // Download Output as .json File
  const downloadJson = () => {
    if (!jsonResults.output) return;
    const blob = new Blob([jsonResults.output], { type: 'application/json' });
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
              <Button onClick={repairJson} variant="secondary" size="xs" leftIcon={<RefreshCw size={14} />}>
                Auto-Fix
              </Button>
            </div>
          </div>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste JSON here... e.g. {"name": "ToolPilot", "tags": ["utility", "free"]}'
            className="font-mono text-xs leading-relaxed h-[420px] resize-none"
            aria-label="JSON input raw data"
          />

          {jsonResults.error && (
            <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-400">
              <span className="font-bold">Syntax Error:</span> {jsonResults.error}
            </div>
          )}
        </div>

        {/* Controls and Output Panel */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="label">Formatted Output</span>
            <div className="flex gap-2">
              {jsonResults.output && <CopyButton text={jsonResults.output} variant="ghost" size="xs" />}
              {jsonResults.output && (
                <Button onClick={downloadJson} variant="ghost" size="xs" className="flex items-center gap-1">
                  <Download size={14} />
                  <span>Download</span>
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border-default)' }}>
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
                  className="rounded text-[var(--text-link)] border-[var(--border-default)] focus:ring-[var(--border-focus)] bg-transparent"
                />
                <span>Sort Keys</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setMode('format')} size="xs" variant={mode === 'format' ? 'primary' : 'secondary'}>
                Format
              </Button>
              <Button onClick={() => setMode('minify')} size="xs" variant={mode === 'minify' ? 'primary' : 'secondary'}>
                Minify
              </Button>
            </div>
          </div>

          {/* Output view box */}
          <div className="relative flex-1 flex flex-col">
            <Textarea
              readOnly
              value={jsonResults.output}
              placeholder="Formatted output will appear here..."
              className="font-mono text-xs leading-relaxed h-[360px] resize-none"
              aria-label="Formatted JSON output"
            />
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
