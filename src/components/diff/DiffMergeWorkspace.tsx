import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type DragEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Columns2,
  Download,
  Eraser,
  FileUp,
  GitCompareArrows,
  Layers,
  Pencil,
  Redo2,
  RotateCcw,
  Rows3,
  Undo2,
  TriangleAlert,
  UnfoldVertical,
} from 'lucide-react';
import { CopyButton } from '@/components/ui';
import {
  computeDiff,
  detectEol,
  intraLine,
  joinLines,
  resolveHunk,
  splitLines,
  unifiedPatch,
  type Eol,
  type Granularity,
  type Hunk,
  type Resolution,
  type Segment,
} from '@/utils/diffMerge';
import { downloadText } from '@/utils/download';
import { buildSplitRows, buildUnifiedRows } from './rows';

// ============================================================
// Compare & Merge workspace
// Edit two texts in equal A4-proportioned panes, then compare them
// side-by-side (or unified) with line + word/character highlighting,
// step through changes and resolve each one (keep left / right / both),
// with undo, redo and reset.
// ============================================================

type View = 'edit' | 'compare';
type Layout = 'split' | 'unified';
type Side = 'left' | 'right';

interface RulerTick {
  index: number;
  top: number;
  height: number;
  kind: 'add' | 'del' | 'mod';
}

interface Snapshot {
  left: string;
  right: string;
}

export interface PrepareResult {
  left: string;
  right: string;
  error?: string;
}

export interface DiffMergeWorkspaceProps {
  initialLeft: string;
  initialRight: string;
  leftLabel?: string;
  rightLabel?: string;
  /** Word or character highlighting inside changed lines. */
  defaultGranularity?: Granularity;
  /** Code mode: no soft-wrap in the editors, with line numbers. */
  codeEditor?: boolean;
  /** Default file extension used for downloads. */
  fileExtension?: string;
  accept?: string;
  /** Optional transform applied to both sides when comparing (e.g. JSON normalising). */
  prepare?: (left: string, right: string) => PrepareResult;
  /** Extra controls rendered in the edit toolbar (e.g. JSON options). */
  editToolbarExtra?: ReactNode;
  /** Rendered under the workspace, receives the current texts. */
  renderInsights?: (left: string, right: string, view: View) => ReactNode;
}

const MAX_BYTES = 5 * 1024 * 1024;
const DEFAULT_ACCEPT =
  '.txt,.md,.markdown,.json,.csv,.tsv,.xml,.html,.htm,.css,.scss,.js,.jsx,.ts,.tsx,.mjs,.cjs,.py,.java,.c,.h,.cpp,.cs,.go,.rs,.rb,.php,.sh,.yml,.yaml,.toml,.ini,.env,.sql,.log,.conf,.properties,.svg,.kt,.swift,text/*,application/json';
const AUTO_COLLAPSE_LINES = 1500;

const WIDE_QUERY = '(min-width: 768px)';
function useIsWide(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(WIDE_QUERY);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true
  );
}

function isMac(): boolean {
  return typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
}

function textStats(text: string) {
  return { lines: splitLines(text).length, chars: text.length };
}

function Segs({ segs }: { segs: Segment[] }) {
  return (
    <>
      {segs.map((s, i) =>
        s.changed ? (
          <mark key={i} className="sk-dm__hl">
            {s.text}
          </mark>
        ) : (
          <Fragment key={i}>{s.text}</Fragment>
        )
      )}
    </>
  );
}

function LineText({ text, segs }: { text: string; segs?: Segment[] }) {
  if (segs) return <Segs segs={segs} />;
  return <>{text === '' ? '​' : text}</>;
}

/** Toggle chip used for boolean diff options. */
function Chip({
  on,
  onClick,
  children,
  title,
}: {
  on: boolean;
  onClick: () => void;
  children: ReactNode;
  title?: string;
}) {
  return (
    <button type="button" className={`sk-dm__chip ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={onClick} title={title}>
      {children}
    </button>
  );
}

export function DiffMergeWorkspace({
  initialLeft,
  initialRight,
  leftLabel = 'Original',
  rightLabel = 'Changed',
  defaultGranularity = 'word',
  codeEditor = false,
  fileExtension = 'txt',
  accept = DEFAULT_ACCEPT,
  prepare,
  editToolbarExtra,
  renderInsights,
}: DiffMergeWorkspaceProps) {
  const isWide = useIsWide();
  const mod = isMac() ? '⌘' : 'Ctrl';

  // ── Documents & history ──────────────────────────────────
  const [left, setLeft] = useState(initialLeft);
  const [right, setRight] = useState(initialRight);
  const [view, setView] = useState<View>('edit');
  const [baseline, setBaseline] = useState<Snapshot>({ left: initialLeft, right: initialRight });
  const [past, setPast] = useState<Snapshot[]>([]);
  const [future, setFuture] = useState<Snapshot[]>([]);
  const [names, setNames] = useState<Record<Side, string | null>>({ left: null, right: null });
  const [error, setError] = useState<string | null>(null);
  const eol = useRef<Record<Side, Eol>>({ left: detectEol(initialLeft), right: detectEol(initialRight) });

  // ── Options ──────────────────────────────────────────────
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [granularity, setGranularity] = useState<Granularity>(defaultGranularity);
  const [layoutChoice, setLayoutChoice] = useState<Layout | null>(null);
  const layout: Layout = layoutChoice ?? (isWide ? 'split' : 'unified');
  const [collapse, setCollapse] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [syncScroll, setSyncScroll] = useState(false);
  const [active, setActive] = useState(0);

  const leftRef = useRef<HTMLTextAreaElement>(null);
  const rightRef = useRef<HTMLTextAreaElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const syncing = useRef(false);
  const pendingCaret = useRef<{ side: Side; line: number } | null>(null);

  // ── Diff (only computed while comparing) ─────────────────
  const diff = useMemo(
    () => (view === 'compare' ? computeDiff(left, right, { ignoreWhitespace, ignoreCase }) : null),
    [view, left, right, ignoreWhitespace, ignoreCase]
  );
  const hunkCount = diff?.hunks.length ?? 0;
  const activeIdx = Math.min(active, Math.max(0, hunkCount - 1));
  const activeHunk: Hunk | undefined = diff?.hunks[activeIdx];

  const rows = useMemo(() => {
    if (!diff) return null;
    return layout === 'split'
      ? { split: buildSplitRows(diff, collapse, expanded), unified: null }
      : { split: null, unified: buildUnifiedRows(diff, collapse, expanded) };
  }, [diff, layout, collapse, expanded]);

  // Word/char highlights for every paired (modified) line, recomputed only when the diff changes.
  const intraMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof intraLine>>();
    if (!diff) return map;
    let budget = 5000;
    for (const h of diff.hunks) {
      const n = Math.min(h.leftEnd - h.leftStart, h.rightEnd - h.rightStart);
      for (let k = 0; k < n && budget > 0; k++, budget--) {
        const l = h.leftStart + k;
        const r = h.rightStart + k;
        map.set(`${l}:${r}`, intraLine(diff.left[l], diff.right[r], granularity, ignoreCase));
      }
    }
    return map;
  }, [diff, granularity, ignoreCase]);
  const intra = (l: number, r: number) => intraMap.get(`${l}:${r}`) ?? null;
  const leftLines = diff?.left ?? [];
  const rightLines = diff?.right ?? [];

  const lnWidth = `${Math.max(2, String(Math.max(diff?.left.length ?? 0, diff?.right.length ?? 0)).length) + 1.5}ch`;

  // ── State transitions ────────────────────────────────────
  const commit = useCallback(
    (next: Snapshot) => {
      setPast((p) => [...p.slice(-199), { left, right }]);
      setFuture([]);
      setLeft(next.left);
      setRight(next.right);
    },
    [left, right]
  );

  const startCompare = useCallback(() => {
    setError(null);
    let l = left;
    let r = right;
    if (prepare) {
      const res = prepare(left, right);
      if (res.error) {
        setError(res.error);
        return;
      }
      l = res.left;
      r = res.right;
      setLeft(l);
      setRight(r);
    }
    setBaseline({ left: l, right: r });
    setPast([]);
    setFuture([]);
    setActive(0);
    setExpanded(new Set());
    setCollapse(Math.max(splitLines(l).length, splitLines(r).length) > AUTO_COLLAPSE_LINES);
    setView('compare');
  }, [left, right, prepare]);

  const backToEdit = useCallback((caret?: { side: Side; line: number }) => {
    pendingCaret.current = caret ?? null;
    setView('edit');
  }, []);

  const undo = useCallback(() => {
    if (!past.length) return;
    const prev = past[past.length - 1];
    setPast(past.slice(0, -1));
    setFuture([{ left, right }, ...future]);
    setLeft(prev.left);
    setRight(prev.right);
  }, [future, left, past, right]);

  const redo = useCallback(() => {
    if (!future.length) return;
    const next = future[0];
    setFuture(future.slice(1));
    setPast([...past, { left, right }]);
    setLeft(next.left);
    setRight(next.right);
  }, [future, left, past, right]);

  const reset = useCallback(() => {
    if (left === baseline.left && right === baseline.right) return;
    commit(baseline);
  }, [baseline, commit, left, right]);

  const swap = useCallback(() => {
    const e = eol.current;
    eol.current = { left: e.right, right: e.left };
    setNames((n) => ({ left: n.right, right: n.left }));
    if (view === 'compare') commit({ left: right, right: left });
    else {
      setLeft(right);
      setRight(left);
    }
  }, [commit, left, right, view]);

  const resolve = useCallback(
    (resolution: Resolution, hunk: Hunk | undefined = activeHunk) => {
      if (!diff || !hunk) return;
      const next = resolveHunk(diff.left, diff.right, hunk, resolution);
      setActive(hunk.index);
      commit({ left: joinLines(next.left, eol.current.left), right: joinLines(next.right, eol.current.right) });
    },
    [activeHunk, commit, diff]
  );

  const resolveAll = useCallback(
    (side: 'left' | 'right') => {
      if (side === 'left') commit({ left, right: left });
      else commit({ left: right, right });
    },
    [commit, left, right]
  );

  // ── Navigation ───────────────────────────────────────────
  const scrollToHunk = useCallback((i: number) => {
    const vp = viewportRef.current;
    const row = vp?.querySelector<HTMLElement>(`[data-hunk-start="${i}"]`);
    if (!vp || !row) return;
    const top = row.offsetTop - vp.clientHeight / 3;
    vp.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (!hunkCount) return;
      const next = (activeIdx + delta + hunkCount) % hunkCount;
      setActive(next);
      requestAnimationFrame(() => scrollToHunk(next));
    },
    [activeIdx, hunkCount, scrollToHunk]
  );

  // Bring the first change into view when a comparison opens.
  useEffect(() => {
    if (view !== 'compare') return;
    const vp = viewportRef.current;
    if (vp) vp.scrollTop = 0;
    requestAnimationFrame(() => scrollToHunk(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  // Place the caret on a double-clicked line when returning to the editors.
  useEffect(() => {
    if (view !== 'edit' || !pendingCaret.current) return;
    const { side, line } = pendingCaret.current;
    pendingCaret.current = null;
    const ta = side === 'left' ? leftRef.current : rightRef.current;
    if (!ta) return;
    const lines = splitLines(ta.value);
    let offset = 0;
    for (let k = 0; k < Math.min(line, lines.length); k++) offset += lines[k].length + 1;
    ta.focus();
    ta.setSelectionRange(offset, offset);
    const lh = parseFloat(getComputedStyle(ta).lineHeight) || 21;
    ta.scrollTop = Math.max(0, line * lh - ta.clientHeight / 3);
  }, [view]);

  // Keyboard shortcuts while the compare view has focus.
  const onCompareKey = (e: ReactKeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, select')) return;
    const primary = e.metaKey || e.ctrlKey;
    if (primary && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) redo();
      else undo();
    } else if (primary && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      redo();
    } else if (e.altKey && e.key === 'ArrowDown') {
      e.preventDefault();
      go(1);
    } else if (e.altKey && e.key === 'ArrowUp') {
      e.preventDefault();
      go(-1);
    } else if (e.altKey && e.key === 'ArrowRight') {
      e.preventDefault();
      resolve('left');
    } else if (e.altKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      resolve('right');
    }
  };

  // ── Files ────────────────────────────────────────────────
  const [dropSide, setDropSide] = useState<Side | null>(null);
  const fileInputs = { left: useRef<HTMLInputElement>(null), right: useRef<HTMLInputElement>(null) };

  const loadFile = useCallback(async (side: Side, file: File | undefined | null) => {
    if (!file) return;
    setError(null);
    if (file.size > MAX_BYTES) {
      setError(`"${file.name}" is larger than 5 MB.`);
      return;
    }
    try {
      let text = await file.text();
      if (text.includes(String.fromCharCode(0))) {
        setError(`"${file.name}" looks like a binary file — only text files can be compared.`);
        return;
      }
      if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
      eol.current[side] = detectEol(text);
      if (side === 'left') setLeft(text);
      else setRight(text);
      setNames((n) => ({ ...n, [side]: file.name }));
      setView('edit');
    } catch {
      setError(`Couldn't read "${file.name}".`);
    }
  }, []);

  const download = (side: Side) => {
    const name = names[side] ?? `${side === 'left' ? 'original' : 'changed'}.${fileExtension}`;
    downloadText(name, side === 'left' ? left : right);
  };

  const downloadPatch = () => {
    const a = names.left ?? `original.${fileExtension}`;
    const b = names.right ?? `changed.${fileExtension}`;
    downloadText('changes.patch', unifiedPatch(baseline.left, right, a, b), 'text/x-diff');
  };

  // ── Editor helpers ───────────────────────────────────────
  const onEditorScroll = (side: Side) => {
    if (!syncScroll || syncing.current) return;
    const src = side === 'left' ? leftRef.current : rightRef.current;
    const dst = side === 'left' ? rightRef.current : leftRef.current;
    if (!src || !dst) return;
    syncing.current = true;
    dst.scrollTop = src.scrollTop;
    dst.scrollLeft = src.scrollLeft;
    requestAnimationFrame(() => (syncing.current = false));
  };

  const escaped = useRef(false);
  const onEditorKey = (side: Side) => (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      startCompare();
      return;
    }
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
    const { selectionStart: s, selectionEnd: en, value } = ta;
    const next = value.slice(0, s) + '  ' + value.slice(en);
    if (side === 'left') setLeft(next);
    else setRight(next);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = s + 2;
    });
  };

  const setSide = (side: Side, v: string) => (side === 'left' ? setLeft(v) : setRight(v));

  const toggleFold = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  const changed = left !== baseline.left || right !== baseline.right;
  const resolvedAll = view === 'compare' && diff?.identical && past.length > 0;
  const labels: Record<Side, string> = { left: leftLabel, right: rightLabel };

  // ── Render: one editor pane ──────────────────────────────
  const renderEditor = (side: Side) => {
    const value = side === 'left' ? left : right;
    const st = textStats(value);
    const ref = side === 'left' ? leftRef : rightRef;
    return (
      <div
        className={`sk-dm__pane ${dropSide === side ? 'is-drop' : ''}`}
        onDragOver={(e: DragEvent) => {
          e.preventDefault();
          setDropSide(side);
        }}
        onDragLeave={(e: DragEvent) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropSide(null);
        }}
        onDrop={(e: DragEvent) => {
          e.preventDefault();
          setDropSide(null);
          void loadFile(side, e.dataTransfer.files?.[0]);
        }}
      >
        <div className="sk-dm__head">
          <span className="sk-dm__title">
            <span className={`sk-dm__dot sk-dm__dot--${side}`} aria-hidden="true" />
            {labels[side]}
            {names[side] && (
              <span className="sk-dm__file" title={names[side] ?? ''}>
                {names[side]}
              </span>
            )}
          </span>
          <span className="sk-dm__headActions">
            <span className="sk-dm__stats">
              {st.lines.toLocaleString()} lines · {st.chars.toLocaleString()} chars
            </span>
            <button
              type="button"
              className="sk-dm__icon"
              onClick={() => fileInputs[side].current?.click()}
              aria-label={`Open a file into ${labels[side]}`}
              title="Open file"
            >
              <FileUp size={15} />
            </button>
            <input
              ref={fileInputs[side]}
              type="file"
              accept={accept}
              hidden
              onChange={(e) => {
                void loadFile(side, e.target.files?.[0]);
                e.target.value = '';
              }}
            />
            <button
              type="button"
              className="sk-dm__icon"
              onClick={() => {
                setSide(side, '');
                setNames((n) => ({ ...n, [side]: null }));
                ref.current?.focus();
              }}
              disabled={!value}
              aria-label={`Clear ${labels[side]}`}
              title="Clear"
            >
              <Eraser size={15} />
            </button>
            <CopyButton text={value} size="xs" variant="ghost" label="Copy" />
          </span>
        </div>
        <div className={`sk-dm__editorWrap ${codeEditor ? 'is-code' : ''}`}>
          <textarea
            ref={ref}
            className="sk-dm__editor"
            value={value}
            onChange={(e) => setSide(side, e.target.value)}
            onScroll={() => onEditorScroll(side)}
            onKeyDown={onEditorKey(side)}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            wrap={codeEditor ? 'off' : 'soft'}
            dir="auto"
            placeholder={`Paste or type the ${labels[side].toLowerCase()} text here, or drop a file on this panel…`}
            aria-label={`${labels[side]} text`}
          />
        </div>
        {dropSide === side && <div className="sk-dm__dropveil">Drop a file to load it as “{labels[side]}”</div>}
      </div>
    );
  };

  // ── Render: compare rows ─────────────────────────────────
  const hunkClass = (h: Hunk) => `${h.index === activeIdx ? 'is-active' : ''}`;

  const foldRow = (id: string, count: number) => (
    <button key={`f${id}`} type="button" className="sk-dm__fold" onClick={() => toggleFold(id)}>
      <UnfoldVertical size={14} aria-hidden="true" />
      Show {count.toLocaleString()} unchanged {count === 1 ? 'line' : 'lines'}
    </button>
  );

  const renderSplit = () =>
    rows?.split?.map((row, i) => {
      if (row.kind === 'fold') return foldRow(row.id, row.count);
      if (row.kind === 'equal') {
        return (
          <div key={i} className="sk-dm__row">
            <span className="sk-dm__ln">{row.l + 1}</span>
            <div className="sk-dm__code" onDoubleClick={() => backToEdit({ side: 'left', line: row.l })}>
              <LineText text={leftLines[row.l]} />
            </div>
            <span className="sk-dm__gut" />
            <span className="sk-dm__ln">{row.r + 1}</span>
            <div className="sk-dm__code" onDoubleClick={() => backToEdit({ side: 'right', line: row.r })}>
              <LineText text={rightLines[row.r]} />
            </div>
          </div>
        );
      }
      const pair = row.l !== undefined && row.r !== undefined ? intra(row.l, row.r) : null;
      const h = row.hunk;
      return (
        <div
          key={i}
          className={`sk-dm__row is-change ${hunkClass(h)} ${row.first ? 'is-first' : ''}`}
          data-hunk-start={row.first ? h.index : undefined}
          data-hunk={h.index}
          onClick={() => setActive(h.index)}
        >
          <span className={`sk-dm__ln ${row.l !== undefined ? 'is-del' : 'is-empty'}`}>
            {row.l !== undefined ? row.l + 1 : ''}
          </span>
          <div
            className={`sk-dm__code ${row.l !== undefined ? 'is-del' : 'is-empty'}`}
            onDoubleClick={() => row.l !== undefined && backToEdit({ side: 'left', line: row.l })}
          >
            {row.l !== undefined && <LineText text={leftLines[row.l]} segs={pair?.left} />}
          </div>
          <span className="sk-dm__gut">
            {row.first && (
              <span className="sk-dm__merge">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resolve('left', h);
                  }}
                  aria-label={`Keep ${leftLabel} version of change ${h.index + 1}`}
                  title={`Keep ${leftLabel} (copy →)`}
                >
                  <ArrowRight size={13} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    resolve('right', h);
                  }}
                  aria-label={`Keep ${rightLabel} version of change ${h.index + 1}`}
                  title={`Keep ${rightLabel} (copy ←)`}
                >
                  <ArrowLeft size={13} strokeWidth={2.5} />
                </button>
              </span>
            )}
          </span>
          <span className={`sk-dm__ln ${row.r !== undefined ? 'is-add' : 'is-empty'}`}>
            {row.r !== undefined ? row.r + 1 : ''}
          </span>
          <div
            className={`sk-dm__code ${row.r !== undefined ? 'is-add' : 'is-empty'}`}
            onDoubleClick={() => row.r !== undefined && backToEdit({ side: 'right', line: row.r })}
          >
            {row.r !== undefined && <LineText text={rightLines[row.r]} segs={pair?.right} />}
          </div>
        </div>
      );
    });

  const renderUnified = () =>
    rows?.unified?.map((row, i) => {
      if (row.kind === 'fold') return foldRow(row.id, row.count);
      if (row.kind === 'equal') {
        return (
          <div key={i} className="sk-dm__urow">
            <span className="sk-dm__ln">{row.l + 1}</span>
            <span className="sk-dm__ln">{row.r + 1}</span>
            <span className="sk-dm__sign" />
            <div className="sk-dm__code" onDoubleClick={() => backToEdit({ side: 'right', line: row.r })}>
              <LineText text={rightLines[row.r]} />
            </div>
          </div>
        );
      }
      const h = row.hunk;
      const isDel = row.kind === 'del';
      const segs = isDel
        ? row.pairR !== undefined
          ? intra(row.l, row.pairR)?.left
          : undefined
        : row.pairL !== undefined
          ? intra(row.pairL, row.r)?.right
          : undefined;
      const line = isDel ? row.l : row.r;
      return (
        <div
          key={i}
          className={`sk-dm__urow is-change ${isDel ? 'is-del' : 'is-add'} ${hunkClass(h)} ${row.first ? 'is-first' : ''}`}
          data-hunk-start={row.first ? h.index : undefined}
          data-hunk={h.index}
          onClick={() => setActive(h.index)}
        >
          <span className="sk-dm__ln">{isDel ? row.l + 1 : ''}</span>
          <span className="sk-dm__ln">{isDel ? '' : row.r + 1}</span>
          <span className="sk-dm__sign" aria-hidden="true">
            {isDel ? '−' : '+'}
          </span>
          <div
            className="sk-dm__code"
            onDoubleClick={() => backToEdit({ side: isDel ? 'left' : 'right', line })}
          >
            <LineText text={isDel ? leftLines[row.l] : rightLines[row.r]} segs={segs} />
          </div>
        </div>
      );
    });

  // Overview ruler: one tick per change, measured from the rendered rows so it
  // lines up with the content even when lines wrap or the diff is short.
  const [ruler, setRuler] = useState<RulerTick[]>([]);
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (view !== 'compare' || !vp || !diff) return;
    const measure = () => {
      const total = Math.max(vp.scrollHeight, vp.clientHeight) || 1;
      const spans = new Map<number, { top: number; bottom: number }>();
      vp.querySelectorAll<HTMLElement>('[data-hunk]').forEach((el) => {
        const i = Number(el.dataset.hunk);
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        const s = spans.get(i);
        if (!s) spans.set(i, { top, bottom });
        else {
          s.top = Math.min(s.top, top);
          s.bottom = Math.max(s.bottom, bottom);
        }
      });
      const ticks: RulerTick[] = [];
      spans.forEach((sp, index) => {
        const h = diff.hunks[index];
        if (!h) return;
        const nl = h.leftEnd - h.leftStart;
        const nr = h.rightEnd - h.rightStart;
        ticks.push({
          index,
          top: (sp.top / total) * 100,
          height: Math.max(((sp.bottom - sp.top) / total) * 100, 0.8),
          kind: nl && nr ? 'mod' : nr ? 'add' : 'del',
        });
      });
      setRuler(ticks);
    };
    const raf = requestAnimationFrame(measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => requestAnimationFrame(measure)) : null;
    ro?.observe(vp);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [view, diff, rows]);

  // ── Render ───────────────────────────────────────────────
  return (
    <section
      ref={rootRef}
      className="sk-dm"
      aria-label="Compare and merge workspace"
      onKeyDown={view === 'compare' ? onCompareKey : undefined}
    >
      {/* Toolbar */}
      <div className="sk-dm__bar">
        <div className="sk-dm__group">
          {view === 'edit' ? (
            <button type="button" className="btn btn-primary btn-sm" onClick={startCompare} title={`${mod}+Enter`}>
              <GitCompareArrows size={15} aria-hidden="true" /> Compare
              <kbd className="sk-dm__kbd">{mod}↵</kbd>
            </button>
          ) : (
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => backToEdit()}>
              <Pencil size={15} aria-hidden="true" /> Edit texts
            </button>
          )}
          <button type="button" className="btn btn-ghost btn-sm" onClick={swap} title="Swap left and right">
            <ArrowLeftRight size={15} aria-hidden="true" /> Swap
          </button>
          {view === 'compare' && (
            <>
              <span className="sk-dm__sep" aria-hidden="true" />
              <button type="button" className="sk-dm__icon sk-dm__icon--lg" onClick={undo} disabled={!past.length} aria-label="Undo" title={`Undo (${mod}+Z)`}>
                <Undo2 size={15} />
              </button>
              <button type="button" className="sk-dm__icon sk-dm__icon--lg" onClick={redo} disabled={!future.length} aria-label="Redo" title={`Redo (${mod}+Shift+Z)`}>
                <Redo2 size={15} />
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={reset} disabled={!changed} title="Restore both texts to how they were when you pressed Compare">
                <RotateCcw size={14} aria-hidden="true" /> Reset
              </button>
            </>
          )}
          {view === 'edit' && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setLeft('');
                setRight('');
                setNames({ left: null, right: null });
                setError(null);
                leftRef.current?.focus();
              }}
              disabled={!left && !right}
            >
              <Eraser size={15} aria-hidden="true" /> Clear both
            </button>
          )}
          {view === 'edit' && editToolbarExtra}
        </div>

        <div className="sk-dm__group sk-dm__group--opts" role="group" aria-label="Comparison options">
          <Chip on={ignoreWhitespace} onClick={() => setIgnoreWhitespace((v) => !v)} title="Treat lines that differ only in spaces or indentation as equal">
            Ignore whitespace
          </Chip>
          <Chip on={ignoreCase} onClick={() => setIgnoreCase((v) => !v)} title="Treat upper and lower case as equal">
            Ignore case
          </Chip>
          {view === 'edit' ? (
            <Chip on={syncScroll} onClick={() => setSyncScroll((v) => !v)} title="Scroll both editors together">
              Sync scroll
            </Chip>
          ) : (
            <>
              <Chip on={collapse} onClick={() => { setCollapse((v) => !v); setExpanded(new Set()); }} title="Hide long runs of unchanged lines">
                Only changes
              </Chip>
              <div className="sk-dm__seg" role="radiogroup" aria-label="Highlight inside lines">
                {(['word', 'char'] as const).map((g) => (
                  <button key={g} type="button" role="radio" aria-checked={granularity === g} className={granularity === g ? 'is-on' : ''} onClick={() => setGranularity(g)}>
                    {g === 'word' ? 'Words' : 'Chars'}
                  </button>
                ))}
              </div>
              <div className="sk-dm__seg" role="radiogroup" aria-label="Layout">
                <button type="button" role="radio" aria-checked={layout === 'split'} className={layout === 'split' ? 'is-on' : ''} onClick={() => setLayoutChoice('split')} title="Side by side">
                  <Columns2 size={14} aria-hidden="true" />
                  <span className="sk-dm__segLabel">Split</span>
                </button>
                <button type="button" role="radio" aria-checked={layout === 'unified'} className={layout === 'unified' ? 'is-on' : ''} onClick={() => setLayoutChoice('unified')} title="Unified (one column)">
                  <Rows3 size={14} aria-hidden="true" />
                  <span className="sk-dm__segLabel">Unified</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="sk-dm__error" role="alert">
          <TriangleAlert size={15} aria-hidden="true" /> {error}
        </div>
      )}

      {/* Merge / navigation bar */}
      {view === 'compare' && diff && (
        <div className="sk-dm__nav">
          <div className="sk-dm__summary" aria-live="polite">
            {diff.identical ? (
              <span className="sk-dm__same">
                <CircleCheck size={15} aria-hidden="true" />
                {resolvedAll ? 'All changes resolved — both sides match' : 'No differences found'}
              </span>
            ) : (
              <>
                <span className="sk-dm__pill sk-dm__pill--add">+{diff.stats.added.toLocaleString()}</span>
                <span className="sk-dm__pill sk-dm__pill--del">−{diff.stats.removed.toLocaleString()}</span>
                <span className="sk-dm__muted">
                  {diff.stats.changes.toLocaleString()} {diff.stats.changes === 1 ? 'change' : 'changes'} · {diff.stats.similarity}% same
                </span>
              </>
            )}
          </div>

          {!diff.identical && (
            <>
              <div className="sk-dm__stepper" role="group" aria-label="Navigate changes">
                <button type="button" className="sk-dm__icon" onClick={() => go(-1)} aria-label="Previous change" title="Previous change (Alt+↑)">
                  <ChevronUp size={16} />
                </button>
                <span className="sk-dm__count">
                  {activeIdx + 1} <span className="sk-dm__muted">of</span> {hunkCount}
                </span>
                <button type="button" className="sk-dm__icon" onClick={() => go(1)} aria-label="Next change" title="Next change (Alt+↓)">
                  <ChevronDown size={16} />
                </button>
              </div>
              <div className="sk-dm__actions" role="group" aria-label="Resolve the selected change">
                <button type="button" className="btn btn-secondary btn-xs" onClick={() => resolve('left')} title={`Keep the ${leftLabel} version of this change (Alt+→)`}>
                  Keep {leftLabel} <ArrowRight size={13} aria-hidden="true" />
                </button>
                <button type="button" className="btn btn-secondary btn-xs" onClick={() => resolve('right')} title={`Keep the ${rightLabel} version of this change (Alt+←)`}>
                  <ArrowLeft size={13} aria-hidden="true" /> Keep {rightLabel}
                </button>
                <button type="button" className="btn btn-ghost btn-xs" onClick={() => resolve('both')} title="Keep both versions, one after the other">
                  <Layers size={13} aria-hidden="true" /> Keep both
                </button>
                <span className="sk-dm__sep" aria-hidden="true" />
                <button type="button" className="btn btn-ghost btn-xs" onClick={() => resolveAll('left')} title={`Make ${rightLabel} identical to ${leftLabel}`}>
                  All {leftLabel}
                </button>
                <button type="button" className="btn btn-ghost btn-xs" onClick={() => resolveAll('right')} title={`Make ${leftLabel} identical to ${rightLabel}`}>
                  All {rightLabel}
                </button>
              </div>
            </>
          )}

          <div className="sk-dm__exports">
            {resolvedAll && <CopyButton text={right} size="xs" label="Copy result" />}
            <button type="button" className="btn btn-ghost btn-xs" onClick={downloadPatch} disabled={baseline.left === right} title="Download a unified .patch from the original left text to the current right text">
              <Download size={13} aria-hidden="true" /> .patch
            </button>
          </div>
        </div>
      )}

      {diff?.timedOut && (
        <div className="sk-dm__error sk-dm__error--warn" role="status">
          <TriangleAlert size={15} aria-hidden="true" /> These texts are too different to align line by line quickly, so the middle section is shown as one change.
        </div>
      )}

      {/* Body */}
      {view === 'edit' ? (
        <div className="sk-dm__panes">
          {renderEditor('left')}
          {renderEditor('right')}
        </div>
      ) : (
        <div className={`sk-dm__view sk-dm__view--${layout}`} style={{ ['--sk-ln' as string]: lnWidth }}>
          <div className="sk-dm__vhead">
            {layout === 'split' ? (
              <>
                {(['left', 'right'] as const).map((side) => (
                  <div key={side} className="sk-dm__vcol">
                    <span className="sk-dm__title">
                      <span className={`sk-dm__dot sk-dm__dot--${side}`} aria-hidden="true" />
                      {labels[side]}
                      {names[side] && <span className="sk-dm__file">{names[side]}</span>}
                    </span>
                    <span className="sk-dm__headActions">
                      <CopyButton text={side === 'left' ? left : right} size="xs" variant="ghost" label="Copy" />
                      <button type="button" className="sk-dm__icon" onClick={() => download(side)} aria-label={`Download ${labels[side]}`} title="Download">
                        <Download size={15} />
                      </button>
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <div className="sk-dm__vcol">
                <span className="sk-dm__title">
                  <span className="sk-dm__dot sk-dm__dot--left" aria-hidden="true" />
                  {leftLabel}
                  <ArrowRight size={13} aria-hidden="true" />
                  <span className="sk-dm__dot sk-dm__dot--right" aria-hidden="true" />
                  {rightLabel}
                </span>
                <span className="sk-dm__headActions">
                  <CopyButton text={right} size="xs" variant="ghost" label={`Copy ${rightLabel}`} />
                  <button type="button" className="sk-dm__icon" onClick={() => download('right')} aria-label={`Download ${rightLabel}`} title={`Download ${rightLabel}`}>
                    <Download size={15} />
                  </button>
                </span>
              </div>
            )}
          </div>
          <div className="sk-dm__vbody">
            <div
              className="sk-dm__scroll"
              ref={viewportRef}
              tabIndex={0}
              role="region"
              aria-label={`Differences between ${leftLabel} and ${rightLabel}`}
            >
              {layout === 'split' ? renderSplit() : renderUnified()}
              {diff && diff.left.length === 0 && diff.right.length === 0 && (
                <p className="sk-dm__empty">Both sides are empty. Choose “Edit texts” to add something to compare.</p>
              )}
            </div>
            {view === 'compare' && ruler.length > 0 && (
              <div className="sk-dm__ruler" aria-hidden="true">
                {ruler.map((t) => (
                  <button
                    key={t.index}
                    type="button"
                    tabIndex={-1}
                    className={`sk-dm__tick sk-dm__tick--${t.kind} ${t.index === activeIdx ? 'is-active' : ''}`}
                    style={{ top: `${t.top}%`, height: `${t.height}%` }}
                    onClick={() => {
                      setActive(t.index);
                      scrollToHunk(t.index);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <p className="sk-dm__hint">
            Tip: double-click any line to edit it · Alt+↑/↓ to move between changes · Alt+→ / Alt+← to keep a side
          </p>
        </div>
      )}

      {renderInsights?.(left, right, view)}
    </section>
  );
}

export default DiffMergeWorkspace;
