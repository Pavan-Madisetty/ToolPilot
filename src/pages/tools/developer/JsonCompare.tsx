import { useCallback, useMemo, useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { DiffMergeWorkspace, type PrepareResult } from '@/components/diff/DiffMergeWorkspace';
import { diffJson, parseJson, previewJson, sortKeysDeep, type JsonChange } from '@/utils/jsonTools';

const LEFT = `{
  "id": 42,
  "name": "Toolskyt API",
  "version": "1.4.0",
  "features": ["compare", "merge", "format"],
  "limits": { "requestsPerMinute": 60, "maxPayloadKb": 512 },
  "owner": { "name": "Asha", "email": "asha@example.com" },
  "beta": true
}`;

const RIGHT = `{
  "name": "Toolskyt API",
  "id": 42,
  "version": "1.5.0",
  "features": ["compare", "merge", "format", "convert"],
  "limits": { "maxPayloadKb": 1024, "requestsPerMinute": 60 },
  "owner": { "name": "Asha", "email": "asha@toolskyt.com", "team": "platform" },
  "beta": "false"
}`;

const KIND_LABEL: Record<JsonChange['kind'], string> = {
  added: 'Added',
  removed: 'Removed',
  changed: 'Changed',
  type: 'Type changed',
};

function StructuralChanges({ left, right }: { left: string; right: string }) {
  const changes = useMemo(() => {
    const a = parseJson(left);
    const b = parseJson(right);
    if (!a.ok || !b.ok) return null;
    return diffJson(a.value, b.value);
  }, [left, right]);

  if (!changes) return null;
  return (
    <section className="sk-jc" aria-label="Structural changes">
      <header className="sk-jc__head">
        <h2 className="sk-jc__title">Structural changes</h2>
        <span className="sk-jc__count">
          {changes.length === 0 ? 'The two documents are equal' : `${changes.length.toLocaleString()} ${changes.length === 1 ? 'path' : 'paths'} differ`}
        </span>
      </header>
      {changes.length > 0 && (
        <div className="sk-jc__scroll">
          <table className="sk-jc__table">
            <thead>
              <tr>
                <th scope="col">Path</th>
                <th scope="col">Change</th>
                <th scope="col">Before</th>
                <th scope="col">After</th>
              </tr>
            </thead>
            <tbody>
              {changes.slice(0, 500).map((c, i) => (
                <tr key={i}>
                  <td><code>{c.path}</code></td>
                  <td><span className={`sk-jc__kind sk-jc__kind--${c.kind}`}>{KIND_LABEL[c.kind]}</span></td>
                  <td><code className="sk-jc__val">{c.kind === 'added' ? '—' : previewJson(c.before)}</code></td>
                  <td><code className="sk-jc__val">{c.kind === 'removed' ? '—' : previewJson(c.after)}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
          {changes.length > 500 && <p className="sk-jc__more">Showing the first 500 changes.</p>}
        </div>
      )}
    </section>
  );
}

export default function JsonCompare() {
  const [sortKeys, setSortKeys] = useState(true);
  const [sortArrays, setSortArrays] = useState(false);

  const prepare = useCallback(
    (left: string, right: string): PrepareResult => {
      const a = parseJson(left);
      if (!a.ok) return { left, right, error: `Left JSON is invalid${a.line ? ` (line ${a.line}, column ${a.column})` : ''}: ${a.error}` };
      const b = parseJson(right);
      if (!b.ok) return { left, right, error: `Right JSON is invalid${b.line ? ` (line ${b.line}, column ${b.column})` : ''}: ${b.error}` };
      const norm = (v: unknown) =>
        JSON.stringify(sortKeys || sortArrays ? sortKeysDeep(v, sortArrays) : v, null, 2);
      return { left: norm(a.value), right: norm(b.value) };
    },
    [sortKeys, sortArrays]
  );

  return (
    <ToolPageWrapper toolId="json-compare">
      <DiffMergeWorkspace
        initialLeft={LEFT}
        initialRight={RIGHT}
        leftLabel="Left JSON"
        rightLabel="Right JSON"
        defaultGranularity="char"
        codeEditor
        fileExtension="json"
        accept=".json,.txt,application/json,text/plain"
        prepare={prepare}
        editToolbarExtra={
          <>
            <button type="button" className={`sk-dm__chip ${sortKeys ? 'is-on' : ''}`} aria-pressed={sortKeys} onClick={() => setSortKeys((v) => !v)} title="Sort object keys so key order doesn't show up as a difference">
              Sort keys
            </button>
            <button type="button" className={`sk-dm__chip ${sortArrays ? 'is-on' : ''}`} aria-pressed={sortArrays} onClick={() => setSortArrays((v) => !v)} title="Sort array items too, so item order is ignored">
              Ignore array order
            </button>
          </>
        }
        renderInsights={(l, r, view) => (view === 'compare' ? <StructuralChanges left={l} right={r} /> : null)}
      />
    </ToolPageWrapper>
  );
}
