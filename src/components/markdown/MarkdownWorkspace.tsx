import {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  type DragEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { FileUp, Download, Eraser, Pencil, Columns2, Eye, FileText } from 'lucide-react';
import { CopyButton } from '@/components/ui';
import { handleAnchorClick } from '@/utils/markdown';

type Mode = 'edit' | 'split' | 'preview';

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = '.md,.markdown,.mdown,.txt,text/markdown,text/plain';

const DESKTOP_QUERY = '(min-width: 1024px)';
function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(DESKTOP_QUERY);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => true
  );
}

function markdownStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  return {
    words,
    chars: text.length,
    lines: text ? text.split('\n').length : 0,
    minutes: Math.max(words ? 1 : 0, Math.round(words / 220)),
  };
}

interface Props {
  value: string;
  onChange: (v: string) => void;
  /** Rendered inside the preview pane. */
  preview: ReactNode;
  /** Used for "Save .md" and shown after a file is opened. */
  defaultFilename?: string;
  /** Text copied by the preview pane's copy button (e.g. the generated HTML). */
  copyText?: string;
  copyLabel?: string;
  previewTitle?: string;
  /** Extra buttons for the preview pane header (e.g. Download HTML). */
  previewActions?: ReactNode;
  /** Remove the preview padding (for full-bleed content such as an iframe). */
  previewFlush?: boolean;
}

/**
 * Shared source + preview workspace for every Markdown tool:
 * open a file (button or drag & drop), edit, live preview, save.
 * Desktop: Edit / Split / Preview with synced scrolling and equal-height panes.
 * Mobile: one pane at a time behind a segmented switch.
 */
export function MarkdownWorkspace({
  value,
  onChange,
  preview,
  defaultFilename = 'document.md',
  copyText,
  copyLabel = 'Copy HTML',
  previewTitle = 'Preview',
  previewActions,
  previewFlush,
}: Props) {
  const isDesktop = useIsDesktop();
  const [chosen, setChosen] = useState<Mode>('split');
  const mode: Mode = isDesktop ? chosen : chosen === 'preview' ? 'preview' : 'edit';

  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const localPreviewRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  const stats = markdownStats(value);

  const loadFile = useCallback(
    async (file: File | undefined | null) => {
      if (!file) return;
      setError(null);
      if (file.size > MAX_BYTES) {
        setError(`"${file.name}" is larger than 5 MB.`);
        return;
      }
      if (!/\.(md|markdown|mdown|txt)$/i.test(file.name) && !file.type.startsWith('text/')) {
        setError(`"${file.name}" doesn't look like a Markdown or text file.`);
        return;
      }
      try {
        const text = await file.text();
        if (text.includes(String.fromCharCode(0))) {
          setError(`"${file.name}" looks like a binary file.`);
          return;
        }
        onChange(text.charCodeAt(0) === 0xfeff ? text.slice(1) : text);
        setFileName(file.name);
        if (taRef.current) taRef.current.scrollTop = 0;
      } catch {
        setError(`Couldn't read "${file.name}".`);
      }
    },
    [onChange]
  );

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    void loadFile(e.dataTransfer.files?.[0]);
  };

  const saveMd = () => {
    const name = fileName ?? defaultFilename;
    const blob = new Blob([value], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = /\.(md|markdown|mdown|txt)$/i.test(name) ? name : `${name}.md`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const clearAll = () => {
    onChange('');
    setFileName(null);
    setError(null);
    taRef.current?.focus();
  };

  // Proportional scroll sync (editor → preview) while both panes are visible.
  const getPreviewEl = () => localPreviewRef.current;
  const onEditorScroll = () => {
    if (mode !== 'split' || syncing.current) return;
    const ta = taRef.current;
    const pv = getPreviewEl();
    if (!ta || !pv) return;
    const max = ta.scrollHeight - ta.clientHeight;
    const pmax = pv.scrollHeight - pv.clientHeight;
    if (max <= 0 || pmax <= 0) return;
    syncing.current = true;
    pv.scrollTop = (ta.scrollTop / max) * pmax;
    requestAnimationFrame(() => (syncing.current = false));
  };
  const onPreviewScroll = () => {
    if (mode !== 'split' || syncing.current) return;
    const ta = taRef.current;
    const pv = getPreviewEl();
    if (!ta || !pv) return;
    const max = ta.scrollHeight - ta.clientHeight;
    const pmax = pv.scrollHeight - pv.clientHeight;
    if (max <= 0 || pmax <= 0) return;
    syncing.current = true;
    ta.scrollTop = (pv.scrollTop / pmax) * max;
    requestAnimationFrame(() => (syncing.current = false));
  };

  // Tab inserts two spaces instead of leaving the editor; Esc restores normal tabbing.
  const escaped = useRef(false);
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      escaped.current = true;
      return;
    }
    if (e.key !== 'Tab' || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) {
      escaped.current = false;
      return;
    }
    if (escaped.current) return;
    e.preventDefault();
    const ta = e.currentTarget;
    const { selectionStart: s, selectionEnd: en } = ta;
    onChange(value.slice(0, s) + '  ' + value.slice(en));
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = s + 2;
    });
  };

  const modes: { id: Mode; label: string; icon: ReactNode; desktopOnly?: boolean }[] = [
    { id: 'edit', label: 'Edit', icon: <Pencil size={14} /> },
    { id: 'split', label: 'Split', icon: <Columns2 size={14} />, desktopOnly: true },
    { id: 'preview', label: 'Preview', icon: <Eye size={14} /> },
  ];

  return (
    <section className="sk-mdw" aria-label="Markdown workspace">
      {/* Toolbar */}
      <div className="sk-mdw__bar">
        <div className="sk-mdw__actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => fileRef.current?.click()}>
            <FileUp size={15} aria-hidden="true" /> Open file
          </button>
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPT}
            hidden
            aria-label="Open a Markdown file"
            onChange={(e) => {
              void loadFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
          <button type="button" className="btn btn-secondary btn-sm" onClick={saveMd} disabled={!value}>
            <Download size={15} aria-hidden="true" /> Save .md
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={clearAll} disabled={!value}>
            <Eraser size={15} aria-hidden="true" /> Clear
          </button>
        </div>

        <div className="sk-mdw__seg" role="tablist" aria-label="View">
          {modes
            .filter((m) => isDesktop || !m.desktopOnly)
            .map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={mode === m.id}
                className={mode === m.id ? 'is-on' : ''}
                onClick={() => setChosen(m.id)}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
        </div>
      </div>

      {error && (
        <div className="sk-mdw__error" role="alert">
          {error}
        </div>
      )}

      {/* Panes */}
      <div className={`sk-mdw__panes sk-mdw__panes--${mode}`}>
        <div
          className={`sk-mdw__pane sk-mdw__pane--src ${dragging ? 'is-drop' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false);
          }}
          onDrop={onDrop}
        >
          <div className="sk-mdw__head">
            <span className="sk-mdw__title">
              <FileText size={15} aria-hidden="true" />
              {fileName ? <span className="sk-mdw__file" title={fileName}>{fileName}</span> : 'Markdown'}
            </span>
            <span className="sk-mdw__stats" aria-live="polite">
              {stats.words.toLocaleString()} words · {stats.chars.toLocaleString()} chars
              {stats.minutes > 0 ? ` · ${stats.minutes} min read` : ''}
            </span>
          </div>
          <textarea
            ref={taRef}
            className="sk-mdw__editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={onEditorScroll}
            onKeyDown={onKeyDown}
            spellCheck={false}
            dir="auto"
            placeholder="Type or paste Markdown here, or drop a .md file anywhere on this panel…"
            aria-label="Markdown source"
          />
          {dragging && <div className="sk-mdw__dropveil">Drop a Markdown file to open it</div>}
        </div>

        <div className="sk-mdw__pane sk-mdw__pane--out">
          <div className="sk-mdw__head">
            <span className="sk-mdw__title">
              <Eye size={15} aria-hidden="true" />
              {previewTitle}
            </span>
            <span className="sk-mdw__headActions">
              {previewActions}
              {copyText ? <CopyButton text={copyText} label={copyLabel} variant="outline" size="xs" /> : null}
            </span>
          </div>
          <div
            className={`sk-mdw__scroll ${previewFlush ? 'is-flush' : ''}`}
            ref={localPreviewRef}
            onScroll={onPreviewScroll}
            onClick={(e) => handleAnchorClick(e, localPreviewRef.current)}
          >
            {value.trim() ? preview : <p className="sk-mdw__empty">Nothing to preview yet. Open a file or start typing.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
