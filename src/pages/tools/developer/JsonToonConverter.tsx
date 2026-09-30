import { useCallback, useDeferredValue, useMemo, useRef, useState, type DragEvent } from 'react';
import { ArrowLeftRight, Download, Eraser, FileUp, Sparkles, TriangleAlert } from 'lucide-react';
import { encode, decode } from '@toon-format/toon';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { CopyButton, Tabs } from '@/components/ui';
import { downloadText } from '@/utils/download';
import { estimateTokens, parseJson } from '@/utils/jsonTools';

type Mode = 'json2toon' | 'toon2json';
type DelimiterKey = 'comma' | 'tab' | 'pipe';

const DELIMS: Record<DelimiterKey, { char: ',' | '\t' | '|'; label: string }> = {
  comma: { char: ',', label: 'Comma' },
  tab: { char: '\t', label: 'Tab' },
  pipe: { char: '|', label: 'Pipe' },
};

const SAMPLE_JSON = `{
  "context": {
    "task": "Summarise this week's orders",
    "currency": "INR"
  },
  "tags": ["priority", "retail", "q3"],
  "orders": [
    { "id": 1001, "customer": "Asha Rao", "city": "Pune", "total": 2499.5, "paid": true },
    { "id": 1002, "customer": "Ravi Kumar", "city": "Delhi", "total": 899, "paid": false },
    { "id": 1003, "customer": "Meera, Jr.", "city": "Chennai", "total": 15200, "paid": true },
    { "id": 1004, "customer": "Kabir Shah", "city": "Mumbai", "total": 430.75, "paid": true }
  ]
}`;

const MAX_BYTES = 5 * 1024 * 1024;

interface Output {
  text: string;
  error?: string;
  line?: number;
  /** Token/char comparison, JSON vs TOON. */
  metrics?: { jsonPretty: number; jsonMin: number; toon: number; jsonChars: number; toonChars: number };
}

function convert(mode: Mode, input: string, delimiter: DelimiterKey, indent: number, strict: boolean, jsonIndent: number): Output {
  if (!input.trim()) return { text: '' };
  if (mode === 'json2toon') {
    const parsed = parseJson(input);
    if (!parsed.ok) {
      return {
        text: '',
        error: `Invalid JSON${parsed.line ? ` at line ${parsed.line}, column ${parsed.column}` : ''}: ${parsed.error}`,
        line: parsed.line,
      };
    }
    try {
      const toon = encode(parsed.value, { delimiter: DELIMS[delimiter].char, indentSize: indent });
      const pretty = JSON.stringify(parsed.value, null, 2);
      const min = JSON.stringify(parsed.value);
      return {
        text: toon,
        metrics: {
          jsonPretty: estimateTokens(pretty),
          jsonMin: estimateTokens(min),
          toon: estimateTokens(toon),
          jsonChars: pretty.length,
          toonChars: toon.length,
        },
      };
    } catch (e) {
      return { text: '', error: e instanceof Error ? e.message : 'Could not encode to TOON.' };
    }
  }
  try {
    const value = decode(input, { indentSize: indent, strict });
    const json = JSON.stringify(value, null, jsonIndent || undefined);
    const pretty = JSON.stringify(value, null, 2);
    return {
      text: json,
      metrics: {
        jsonPretty: estimateTokens(pretty),
        jsonMin: estimateTokens(JSON.stringify(value)),
        toon: estimateTokens(input),
        jsonChars: pretty.length,
        toonChars: input.length,
      },
    };
  } catch (e) {
    const line = e && typeof e === 'object' && 'line' in e ? Number((e as { line?: number }).line) || undefined : undefined;
    const msg = e instanceof Error ? e.message : 'Invalid TOON.';
    return { text: '', error: `Invalid TOON: ${msg}`, line };
  }
}

function pct(from: number, to: number): number {
  if (!from) return 0;
  return Math.round(((from - to) / from) * 1000) / 10;
}

export default function JsonToonConverter() {
  const [mode, setMode] = useState<Mode>('json2toon');
  const [input, setInput] = useState(SAMPLE_JSON);
  const [delimiter, setDelimiter] = useState<DelimiterKey>('comma');
  const [indent, setIndent] = useState(2);
  const [strict, setStrict] = useState(true);
  const [jsonIndent, setJsonIndent] = useState(2);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const deferred = useDeferredValue(input);
  const out = useMemo(
    () => convert(mode, deferred, delimiter, indent, strict, jsonIndent),
    [mode, deferred, delimiter, indent, strict, jsonIndent]
  );

  const inLabel = mode === 'json2toon' ? 'JSON' : 'TOON';
  const outLabel = mode === 'json2toon' ? 'TOON' : 'JSON';

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    // Carry the current result across so the round trip is one click.
    if (out.text && !out.error) setInput(out.text);
    setMode(m);
    setFileName(null);
  };

  const loadFile = useCallback(async (file: File | undefined | null) => {
    if (!file) return;
    setFileError(null);
    if (file.size > MAX_BYTES) {
      setFileError(`"${file.name}" is larger than 5 MB.`);
      return;
    }
    try {
      let text = await file.text();
      if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
      const isToon = /\.toon$/i.test(file.name);
      setMode(isToon ? 'toon2json' : 'json2toon');
      setInput(text);
      setFileName(file.name);
    } catch {
      setFileError(`Couldn't read "${file.name}".`);
    }
  }, []);

  const jumpToLine = (line?: number) => {
    const ta = taRef.current;
    if (!ta || !line) return;
    const lines = ta.value.split('\n');
    let off = 0;
    for (let i = 0; i < Math.min(line - 1, lines.length); i++) off += lines[i].length + 1;
    ta.focus();
    ta.setSelectionRange(off, off + (lines[line - 1]?.length ?? 0));
    const lh = parseFloat(getComputedStyle(ta).lineHeight) || 21;
    ta.scrollTop = Math.max(0, (line - 1) * lh - ta.clientHeight / 3);
  };

  const baseName = (fileName ?? 'data').replace(/\.(json|toon|txt)$/i, '');
  const m = out.metrics;
  const saved = m ? pct(m.jsonPretty, m.toon) : 0;
  const savedMin = m ? pct(m.jsonMin, m.toon) : 0;

  return (
    <ToolPageWrapper toolId="json-toon-converter">
      <div className="sk-dm">
        <div className="sk-dm__bar">
          <Tabs
            activeTab={mode}
            onTabChange={(k) => switchMode(k as Mode)}
            ariaLabel="Conversion direction"
            tabs={[
              { key: 'json2toon', name: 'JSON → TOON' },
              { key: 'toon2json', name: 'TOON → JSON' },
            ]}
          />
          <div className="sk-dm__group">
            <div className="sk-dm__seg" role="radiogroup" aria-label="Delimiter">
              {(Object.keys(DELIMS) as DelimiterKey[]).map((k) => (
                <button key={k} type="button" role="radio" aria-checked={delimiter === k} className={delimiter === k ? 'is-on' : ''} onClick={() => setDelimiter(k)} title={`${DELIMS[k].label}-separated rows`} disabled={mode === 'toon2json'}>
                  {DELIMS[k].label}
                </button>
              ))}
            </div>
            <div className="sk-dm__seg" role="radiogroup" aria-label="TOON indent">
              {[2, 4].map((n) => (
                <button key={n} type="button" role="radio" aria-checked={indent === n} className={indent === n ? 'is-on' : ''} onClick={() => setIndent(n)}>
                  {n} spaces
                </button>
              ))}
            </div>
            {mode === 'toon2json' && (
              <>
                <div className="sk-dm__seg" role="radiogroup" aria-label="JSON output style">
                  {[
                    { v: 2, l: 'Pretty' },
                    { v: 0, l: 'Minified' },
                  ].map((o) => (
                    <button key={o.v} type="button" role="radio" aria-checked={jsonIndent === o.v} className={jsonIndent === o.v ? 'is-on' : ''} onClick={() => setJsonIndent(o.v)}>
                      {o.l}
                    </button>
                  ))}
                </div>
                <button type="button" className={`sk-dm__chip ${strict ? 'is-on' : ''}`} aria-pressed={strict} onClick={() => setStrict((s) => !s)} title="Check that array lengths and row counts match their [N] headers">
                  Strict
                </button>
              </>
            )}
          </div>
        </div>

        {m && !out.error && (
          <div className="sk-toon__metrics" aria-live="polite">
            <div className={`sk-toon__metric ${saved > 0 ? 'is-good' : saved < 0 ? 'is-bad' : ''}`}>
              <b>{saved > 0 ? `−${saved}%` : `${-saved > 0 ? '+' : ''}${-saved}%`}</b>
              <span>tokens vs formatted JSON</span>
            </div>
            <div className={`sk-toon__metric ${savedMin > 0 ? 'is-good' : savedMin < 0 ? 'is-bad' : ''}`}>
              <b>{savedMin > 0 ? `−${savedMin}%` : `${-savedMin > 0 ? '+' : ''}${-savedMin}%`}</b>
              <span>tokens vs minified JSON</span>
            </div>
            <div className="sk-toon__metric">
              <b>≈ {m.toon.toLocaleString()}</b>
              <span>TOON tokens (vs ≈ {m.jsonPretty.toLocaleString()} JSON)</span>
            </div>
            <div className="sk-toon__metric">
              <b>{m.toonChars.toLocaleString()}</b>
              <span>TOON chars (vs {m.jsonChars.toLocaleString()} JSON)</span>
            </div>
          </div>
        )}

        {fileError && (
          <div className="sk-dm__error" role="alert">
            <TriangleAlert size={15} aria-hidden="true" /> {fileError}
          </div>
        )}

        <div className="sk-dm__panes">
          {/* Input */}
          <div
            className={`sk-dm__pane ${dragging ? 'is-drop' : ''}`}
            onDragOver={(e: DragEvent) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={(e: DragEvent) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false);
            }}
            onDrop={(e: DragEvent) => {
              e.preventDefault();
              setDragging(false);
              void loadFile(e.dataTransfer.files?.[0]);
            }}
          >
            <div className="sk-dm__head">
              <span className="sk-dm__title">
                {inLabel} input
                {fileName && <span className="sk-dm__file" title={fileName}>{fileName}</span>}
              </span>
              <span className="sk-dm__headActions">
                <button type="button" className="sk-dm__icon" onClick={() => { setInput(mode === 'json2toon' ? SAMPLE_JSON : encode(JSON.parse(SAMPLE_JSON))); setFileName(null); }} aria-label="Load sample" title="Load sample">
                  <Sparkles size={15} />
                </button>
                <button type="button" className="sk-dm__icon" onClick={() => fileRef.current?.click()} aria-label="Open a file" title="Open .json or .toon file">
                  <FileUp size={15} />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  accept=".json,.toon,.txt,application/json,text/plain"
                  onChange={(e) => {
                    void loadFile(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
                <button type="button" className="sk-dm__icon" onClick={() => { setInput(''); setFileName(null); taRef.current?.focus(); }} disabled={!input} aria-label="Clear input" title="Clear">
                  <Eraser size={15} />
                </button>
              </span>
            </div>
            <div className="sk-dm__editorWrap is-code">
              <textarea
                ref={taRef}
                className="sk-dm__editor"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                wrap="off"
                placeholder={mode === 'json2toon' ? 'Paste JSON here, or drop a .json file…' : 'Paste TOON here, or drop a .toon file…'}
                aria-label={`${inLabel} input`}
              />
            </div>
            {dragging && <div className="sk-dm__dropveil">Drop a .json or .toon file</div>}
          </div>

          {/* Output */}
          <div className="sk-dm__pane">
            <div className="sk-dm__head">
              <span className="sk-dm__title">{outLabel} output</span>
              <span className="sk-dm__headActions">
                <button type="button" className="sk-dm__icon" onClick={() => switchMode(mode === 'json2toon' ? 'toon2json' : 'json2toon')} disabled={!out.text} aria-label="Use output as input" title="Use output as input (reverse)">
                  <ArrowLeftRight size={15} />
                </button>
                <button
                  type="button"
                  className="sk-dm__icon"
                  disabled={!out.text}
                  onClick={() =>
                    mode === 'json2toon'
                      ? downloadText(`${baseName}.toon`, out.text, 'text/plain')
                      : downloadText(`${baseName}.json`, out.text, 'application/json')
                  }
                  aria-label={`Download ${outLabel}`}
                  title={`Download .${outLabel.toLowerCase()}`}
                >
                  <Download size={15} />
                </button>
                <CopyButton text={out.text} size="xs" label="Copy" />
              </span>
            </div>
            {out.error ? (
              <div className="p-4 space-y-3">
                <div className="sk-dm__error" role="alert">
                  <TriangleAlert size={15} aria-hidden="true" /> {out.error}
                </div>
                {out.line && (
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => jumpToLine(out.line)}>
                    Go to line {out.line}
                  </button>
                )}
              </div>
            ) : (
              <div className="sk-dm__editorWrap is-code">
                <textarea className="sk-dm__editor" value={out.text} readOnly wrap="off" spellCheck={false} aria-label={`${outLabel} output`} placeholder="The converted result appears here as you type." />
              </div>
            )}
          </div>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Token counts are estimates for comparing formats; exact numbers depend on the model’s tokenizer. Conversion uses the official TOON reference encoder and runs entirely in your browser.
        </p>
      </div>
    </ToolPageWrapper>
  );
}
