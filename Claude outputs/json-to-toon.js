/**
 * JSON → TOON (Token-Oriented Object Notation) converter.
 *
 * Standalone, zero dependencies. Works in the browser and in Node.js
 * (ES module or CommonJS). Output matches the official reference encoder
 * @toon-format/toon v4.1.1 (checked with a differential test).
 *
 * Usage
 *   jsonToToon('{"users":[{"id":1,"name":"Ana"}]}')
 *   // users[1]{id,name}:
 *   //   1,Ana
 *
 *   jsonToToon(data, { indent: 4, delimiter: '\t' })
 *
 * Options
 *   indent     number of spaces per level (default 2)
 *   delimiter  ',' (default) | '\t' | '|'
 */

const DEFAULT_DELIMITER = ',';
const DELIMITERS = [',', '\t', '|'];
const NUMERIC_LIKE = /^[+-]?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i;
const UNQUOTED_KEY = /^[A-Z_][\w.]*$/i;

// ── Public API ────────────────────────────────────────────────

/**
 * Convert JSON (a string or an already-parsed value) to TOON.
 * @param {string|unknown} input  JSON text, or any JS value
 * @param {{ indent?: number, delimiter?: ',' | '\t' | '|' }} [options]
 * @returns {string}
 */
function jsonToToon(input, options = {}) {
  const value = typeof input === 'string' ? JSON.parse(stripBom(input)) : input;
  const opts = {
    indent: options.indent ?? 2,
    delimiter: options.delimiter ?? DEFAULT_DELIMITER,
  };
  if (!DELIMITERS.includes(opts.delimiter)) {
    throw new TypeError(`Invalid delimiter ${JSON.stringify(opts.delimiter)}. Use ",", "\\t" or "|".`);
  }
  if (!Number.isInteger(opts.indent) || opts.indent < 1) {
    throw new TypeError('indent must be a positive integer');
  }
  return Array.from(encodeValue(normalize(value), opts, 0)).join('\n');
}

// ── Normalisation: JS value → JSON data model ────────────────

function normalize(value) {
  if (value === null) return null;
  if (typeof value === 'object' && typeof value.toJSON === 'function') {
    const next = value.toJSON();
    if (next !== value) return normalize(next);
  }
  switch (typeof value) {
    case 'string':
    case 'boolean':
      return value;
    case 'number':
      if (Object.is(value, -0)) return 0;
      return Number.isFinite(value) ? value : null;
    case 'bigint':
      return value >= BigInt(Number.MIN_SAFE_INTEGER) && value <= BigInt(Number.MAX_SAFE_INTEGER)
        ? Number(value)
        : value.toString();
  }
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(normalize);
  if (value instanceof Set) return Array.from(value, normalize);
  if (value instanceof Map) {
    return Object.fromEntries(Array.from(value, ([k, v]) => [String(k), normalize(v)]));
  }
  if (isPlainObject(value)) {
    const out = {};
    for (const key of Object.keys(value)) {
      Object.defineProperty(out, key, { value: normalize(value[key]), enumerable: true, writable: true, configurable: true });
    }
    return out;
  }
  return null; // functions, symbols, undefined, class instances
}

// ── Type helpers ──────────────────────────────────────────────

const isPrimitive = (v) => v === null || ['string', 'number', 'boolean'].includes(typeof v);
const isArray = Array.isArray;
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isEmptyObject = (v) => Object.keys(v).length === 0;
const allPrimitives = (arr) => arr.length === 0 || arr.every(isPrimitive);
const allArrays = (arr) => arr.length === 0 || arr.every(isArray);
const allObjects = (arr) => arr.length === 0 || arr.every(isObject);

function isPlainObject(v) {
  if (v === null || typeof v !== 'object') return false;
  const proto = Object.getPrototypeOf(v);
  return proto === null || proto === Object.prototype;
}

function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

// ── Primitive / key encoding ─────────────────────────────────

function escapeString(s) {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/[\u0000-\u001F]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);
}

/** A string can stay unquoted only if it can't be mistaken for structure or another type. */
function isSafeUnquoted(s, delimiter) {
  if (!s) return false;
  if (/^[ \t]|[ \t]$/.test(s)) return false;
  if (s === 'true' || s === 'false' || s === 'null') return false;
  if (NUMERIC_LIKE.test(s)) return false;
  if (s.includes(':') || s.includes('"') || s.includes('\\')) return false;
  if (/[[\]{}]/.test(s)) return false;
  if (/[\u0000-\u001F]/.test(s)) return false;
  if (s.includes(delimiter)) return false;
  if (s.startsWith('-') || s.startsWith('#')) return false;
  return true;
}

function encodePrimitive(v, delimiter) {
  if (v === null) return 'null';
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  return isSafeUnquoted(v, delimiter) ? v : `"${escapeString(v)}"`;
}

function encodeKey(key) {
  return UNQUOTED_KEY.test(key) ? key : `"${escapeString(key)}"`;
}

function joinPrimitives(values, delimiter) {
  return values.map((v) => encodePrimitive(v, delimiter)).join(delimiter);
}

/** key[N]{fields}:  — the delimiter is shown inside [] when it isn't a comma. */
function formatHeader(length, { key, fields, delimiter, keyed } = {}) {
  let h = key != null ? encodeKey(key) : '';
  h += `[${length}${keyed ? ':' : ''}${delimiter !== DEFAULT_DELIMITER ? delimiter : ''}]`;
  if (fields) h += `{${formatFields(fields, delimiter)}}`;
  return h + ':';
}

function formatFields(fields, delimiter) {
  return fields
    .map((f) => encodeKey(f.name) + (f.children ? `{${formatFields(f.children, delimiter)}}` : ''))
    .join(delimiter);
}

// ── Tabular detection ────────────────────────────────────────

/** Field list if every row has the same keys and each column is primitive (or a nested uniform object). */
function tabularFields(rows) {
  if (rows.length === 0) return undefined;
  const keys = Object.keys(rows[0]);
  if (keys.length === 0) return undefined;
  for (const row of rows) {
    if (Object.keys(row).length !== keys.length) return undefined;
    for (const k of keys) if (!Object.hasOwn(row, k)) return undefined;
  }
  const fields = [];
  for (const k of keys) {
    const field = classifyColumn(k, rows.map((r) => r[k]));
    if (!field) return undefined;
    fields.push(field);
  }
  return fields;
}

function classifyColumn(name, values) {
  if (values.every(isPrimitive)) return { name };
  if (!values.every((v) => isObject(v) && !isEmptyObject(v))) return undefined;
  const children = tabularFields(values);
  return children ? { name, children } : undefined;
}

/** An object whose (2+) values are uniform objects is written as a keyed table: key[N:]{fields}: */
function keyedTabularFields(obj) {
  const values = Object.values(obj);
  if (values.length < 2) return undefined;
  if (!values.every((v) => isObject(v) && !isEmptyObject(v))) return undefined;
  return tabularFields(values);
}

function rowLeaves(row, fields, out = []) {
  for (const f of fields) {
    if (f.children) rowLeaves(row[f.name], f.children, out);
    else out.push(row[f.name]);
  }
  return out;
}

// ── Line emitters ────────────────────────────────────────────

const line = (depth, text, o) => ' '.repeat(o.indent * depth) + text;
const listItem = (depth, text, o) => line(depth, '- ' + text, o);

function* encodeValue(value, o, depth) {
  if (isPrimitive(value)) {
    const s = encodePrimitive(value, o.delimiter);
    if (s !== '') yield s;
    return;
  }
  if (isArray(value)) {
    yield* encodeArray(undefined, value, depth, o);
    return;
  }
  const keyed = keyedTabularFields(value);
  if (keyed) yield* encodeKeyedObject(undefined, value, keyed, depth, o);
  else yield* encodeObject(value, depth, o);
}

function* encodeObject(obj, depth, o) {
  for (const [k, v] of Object.entries(obj)) yield* encodeKeyValue(k, v, depth, o);
}

function* encodeKeyValue(key, value, depth, o) {
  if (isPrimitive(value)) {
    yield line(depth, `${encodeKey(key)}: ${encodePrimitive(value, o.delimiter)}`, o);
  } else if (isArray(value)) {
    yield* encodeArray(key, value, depth, o);
  } else {
    const keyed = keyedTabularFields(value);
    if (keyed) {
      yield* encodeKeyedObject(key, value, keyed, depth, o);
      return;
    }
    yield line(depth, `${encodeKey(key)}:`, o);
    if (!isEmptyObject(value)) yield* encodeObject(value, depth + 1, o);
  }
}

function* encodeKeyedObject(key, obj, fields, depth, o) {
  const entries = Object.entries(obj);
  yield line(depth, formatHeader(entries.length, { key, fields, delimiter: o.delimiter, keyed: true }), o);
  yield* keyedRows(entries, fields, depth + 1, o);
}

function* keyedRows(entries, fields, depth, o) {
  for (const [k, v] of entries) {
    yield line(depth, `${encodeKey(k)}: ${joinPrimitives(rowLeaves(v, fields), o.delimiter)}`, o);
  }
}

function inlineArray(values, delimiter, key) {
  const header = formatHeader(values.length, { key, delimiter });
  return values.length === 0 ? header : `${header} ${joinPrimitives(values, delimiter)}`;
}

function* encodeArray(key, arr, depth, o) {
  if (arr.length === 0) {
    yield line(depth, key != null ? `${encodeKey(key)}: []` : '[]', o);
    return;
  }
  if (allPrimitives(arr)) {
    yield line(depth, inlineArray(arr, o.delimiter, key), o);
    return;
  }
  if (allArrays(arr) && arr.every(allPrimitives)) {
    yield line(depth, formatHeader(arr.length, { key, delimiter: o.delimiter }), o);
    for (const inner of arr) yield listItem(depth + 1, inlineArray(inner, o.delimiter), o);
    return;
  }
  if (allObjects(arr)) {
    const fields = tabularFields(arr);
    if (fields) {
      yield line(depth, formatHeader(arr.length, { key, fields, delimiter: o.delimiter }), o);
      yield* tableRows(arr, fields, depth + 1, o);
      return;
    }
  }
  // Mixed / irregular array → list items
  yield line(depth, formatHeader(arr.length, { key, delimiter: o.delimiter }), o);
  for (const item of arr) yield* encodeListItem(item, depth + 1, o);
}

function* tableRows(rows, fields, depth, o) {
  for (const row of rows) yield line(depth, joinPrimitives(rowLeaves(row, fields), o.delimiter), o);
}

function* encodeListItem(value, depth, o) {
  if (isPrimitive(value)) {
    yield listItem(depth, encodePrimitive(value, o.delimiter), o);
  } else if (isArray(value)) {
    if (allPrimitives(value)) {
      yield listItem(depth, inlineArray(value, o.delimiter), o);
    } else {
      yield listItem(depth, formatHeader(value.length, { delimiter: o.delimiter }), o);
      for (const item of value) yield* encodeListItem(item, depth + 1, o);
    }
  } else {
    yield* encodeObjectListItem(value, depth, o);
  }
}

/** An object inside a list: first field goes on the "- " line, the rest are indented under it. */
function* encodeObjectListItem(obj, depth, o) {
  if (isEmptyObject(obj)) {
    yield line(depth, '-', o);
    return;
  }
  const entries = Object.entries(obj);
  const [firstKey, first] = entries[0];
  const rest = entries.slice(1);
  const restLines = function* () {
    if (rest.length) yield* encodeObject(Object.fromEntries(rest), depth + 1, o);
  };

  if (isArray(first) && allObjects(first)) {
    const fields = tabularFields(first);
    if (fields) {
      yield listItem(depth, formatHeader(first.length, { key: firstKey, fields, delimiter: o.delimiter }), o);
      yield* tableRows(first, fields, depth + 2, o);
      yield* restLines();
      return;
    }
  }
  if (isObject(first)) {
    const keyed = keyedTabularFields(first);
    if (keyed) {
      yield listItem(depth, formatHeader(Object.keys(first).length, { key: firstKey, fields: keyed, delimiter: o.delimiter, keyed: true }), o);
      yield* keyedRows(Object.entries(first), keyed, depth + 2, o);
      yield* restLines();
      return;
    }
  }

  const k = encodeKey(firstKey);
  if (isPrimitive(first)) {
    yield listItem(depth, `${k}: ${encodePrimitive(first, o.delimiter)}`, o);
  } else if (isArray(first)) {
    if (first.length === 0) {
      yield listItem(depth, `${k}: []`, o);
    } else if (allPrimitives(first)) {
      yield listItem(depth, `${k}${inlineArray(first, o.delimiter)}`, o);
    } else {
      yield listItem(depth, `${k}${formatHeader(first.length, { delimiter: o.delimiter })}`, o);
      for (const item of first) yield* encodeListItem(item, depth + 2, o);
    }
  } else {
    yield listItem(depth, `${k}:`, o);
    if (!isEmptyObject(first)) yield* encodeObject(first, depth + 2, o);
  }
  yield* restLines();
}

// ── Exports (ESM / CommonJS / browser global) ────────────────

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { jsonToToon };
} else if (typeof window !== 'undefined') {
  window.jsonToToon = jsonToToon;
}
