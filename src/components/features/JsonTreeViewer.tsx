import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, AlertCircle } from 'lucide-react';

interface JsonTreeViewerProps {
  data: unknown;
  searchQuery?: string;
  defaultExpanded?: boolean;
  onSelectPath?: (path: (string | number)[], value: unknown) => void;
  onHoverPath?: (path: (string | number)[] | null) => void;
}

// Helper to determine if a subtree contains a search query match
function matchesSearch(value: unknown, key: string | number, query: string): boolean {
  if (!query) return false;
  const q = query.toLowerCase();

  // Check key/name
  if (String(key).toLowerCase().includes(q)) return true;

  // Check value
  if (value === null) return 'null'.includes(q);
  if (typeof value !== 'object') {
    return String(value).toLowerCase().includes(q);
  }

  // Check nested
  if (Array.isArray(value)) {
    return value.some((item, index) => matchesSearch(item, index, query));
  } else if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).some(([k, v]) => matchesSearch(v, k, query));
  }
  return false;
}

// Helper to highlight matched query text
const HighlightText: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query) return <span>{text}</span>;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return <span>{text}</span>;

  const parts: React.ReactNode[] = [];
  let start = 0;
  const qLen = query.length;

  while (true) {
    const idx = text.toLowerCase().indexOf(query.toLowerCase(), start);
    if (idx === -1) {
      parts.push(text.slice(start));
      break;
    }
    if (idx > start) {
      parts.push(text.slice(start, idx));
    }
    parts.push(
      <mark
        key={idx}
        className="bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-100 font-semibold px-0.5 rounded border border-amber-200 dark:border-amber-800 shadow-sm"
      >
        {text.slice(idx, idx + qLen)}
      </mark>
    );
    start = idx + qLen;
  }

  return <span>{parts}</span>;
};

interface JsonTreeNodeProps {
  name: string | number;
  value: unknown;
  path: (string | number)[];
  searchQuery: string;
  defaultExpanded: boolean;
  onSelectPath?: (path: (string | number)[], value: unknown) => void;
  onHoverPath?: (path: (string | number)[] | null) => void;
  isLast?: boolean;
}

const JsonTreeNode: React.FC<JsonTreeNodeProps> = ({
  name,
  value,
  path,
  searchQuery,
  defaultExpanded,
  onSelectPath,
  onHoverPath,
  isLast = false,
}) => {
  const isObject = typeof value === 'object' && value !== null;
  const isArray = Array.isArray(value);
  const size = isObject
    ? isArray
      ? (value as unknown[]).length
      : Object.keys(value as Record<string, unknown>).length
    : 0;

  // Determine if children contain a search query match
  const hasChildMatch = useMemo(() => {
    if (!searchQuery || !isObject) return false;
    if (isArray) {
      return (value as unknown[]).some((item: unknown, idx: number) => matchesSearch(item, idx, searchQuery));
    } else {
      return Object.entries(value as Record<string, unknown>).some(([k, v]) => matchesSearch(v, k, searchQuery));
    }
  }, [value, isObject, isArray, searchQuery]);

  const isMatched = useMemo(() => {
    return matchesSearch(value, name, searchQuery);
  }, [value, name, searchQuery]);

  // Expanded state derived cleanly
  const [userExpanded, setUserExpanded] = useState<boolean | null>(null);
  
  // Track reset of defaultExpanded
  const [prevDefaultExpanded, setPrevDefaultExpanded] = useState(defaultExpanded);
  if (defaultExpanded !== prevDefaultExpanded) {
    setPrevDefaultExpanded(defaultExpanded);
    setUserExpanded(null);
  }

  const isExpanded = userExpanded ?? (hasChildMatch || defaultExpanded);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserExpanded(!isExpanded);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectPath) {
      onSelectPath(path, value);
    }
  };

  const handleMouseEnter = () => {
    if (onHoverPath) {
      onHoverPath(path);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverPath) {
      onHoverPath(null);
    }
  };

  // Format primitive value node
  if (!isObject) {
    let valueElement: React.ReactNode;
    if (typeof value === 'string') {
      valueElement = (
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold break-all">
          "{<HighlightText text={value} query={searchQuery} />}"
        </span>
      );
    } else if (typeof value === 'number') {
      valueElement = (
        <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
          <HighlightText text={String(value)} query={searchQuery} />
        </span>
      );
    } else if (typeof value === 'boolean') {
      valueElement = (
        <span className="text-amber-600 dark:text-amber-400 font-bold uppercase text-[11px]">
          <HighlightText text={String(value)} query={searchQuery} />
        </span>
      );
    } else if (value === null) {
      valueElement = (
        <span className="text-rose-500 dark:text-rose-400 font-bold uppercase text-[11px]">
          null
        </span>
      );
    } else {
      valueElement = (
        <span className="text-gray-500 font-semibold">
          <HighlightText text={String(value)} query={searchQuery} />
        </span>
      );
    }

    const nameElement = (
      <span className="text-slate-800 dark:text-slate-200 font-semibold">
        <HighlightText text={String(name)} query={searchQuery} />
      </span>
    );

    return (
      <div
        onClick={handleSelect}
        className={`group/leaf flex items-center gap-item-gap hover:bg-indigo-50/60 dark:hover:bg-indigo-950/20 py-tree-row-y px-tree-row-x rounded-lg transition-colors cursor-pointer select-text ${
          isMatched && searchQuery ? 'bg-amber-50/60 dark:bg-amber-950/20 ring-1 ring-amber-200 dark:ring-amber-800' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center flex-wrap gap-x-1.5 w-full">
          {nameElement}
          <span className="text-gray-400 dark:text-gray-500 font-mono">:</span>
          {valueElement}
          {!isLast && <span className="text-gray-400 dark:text-gray-500 font-mono">,</span>}
        </div>
      </div>
    );
  }

  const nameElement = (
    <span className="text-slate-800 dark:text-slate-200 font-semibold">
      <HighlightText text={String(name)} query={searchQuery} />
    </span>
  );

  // Object or Array node
  const renderChildren = () => {
    if (isArray) {
      return (value as unknown[]).map((item, idx) => (
        <JsonTreeNode
          key={idx}
          name={idx}
          value={item}
          path={[...path, idx]}
          searchQuery={searchQuery}
          defaultExpanded={defaultExpanded}
          onSelectPath={onSelectPath}
          onHoverPath={onHoverPath}
          isLast={idx === (value as unknown[]).length - 1}
        />
      ));
    } else {
      const record = value as Record<string, unknown>;
      const keys = Object.keys(record);
      return keys.map((key, idx) => (
        <JsonTreeNode
          key={key}
          name={key}
          value={record[key]}
          path={[...path, key]}
          searchQuery={searchQuery}
          defaultExpanded={defaultExpanded}
          onSelectPath={onSelectPath}
          onHoverPath={onHoverPath}
          isLast={idx === keys.length - 1}
        />
      ));
    }
  };

  return (
    <div
      className={`group/node py-item-gap select-text ${
        isMatched && searchQuery ? 'bg-amber-50/50 dark:bg-amber-950/10 rounded-lg' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-item-gap hover:bg-blue-50/40 dark:hover:bg-blue-950/10 rounded-lg py-tree-row-y px-tree-row-x w-full">
        {/* Toggle Arrow */}
        <button
          onClick={toggleExpand}
          className="p-0.5 text-gray-400 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all cursor-pointer"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-1.5 flex-wrap cursor-pointer" onClick={toggleExpand}>
          {nameElement}
          <span className="text-gray-400 dark:text-gray-500 font-mono">:</span>
          <span className="text-gray-400 dark:text-gray-500 font-mono font-bold">
            {isArray ? '[' : '{'}
          </span>
          <span className="text-gray-400 dark:text-gray-500 text-[10px] bg-gray-50 dark:bg-gray-800 border border-gray-150 dark:border-gray-700 px-1 rounded font-semibold font-sans">
            {size} {size === 1 ? 'item' : 'items'}
          </span>
          {!isExpanded && (
            <>
              <span className="text-gray-400 dark:text-gray-500 font-mono">
                {isArray ? ']' : '}'}
              </span>
              {!isLast && <span className="text-gray-400 dark:text-gray-500 font-mono">,</span>}
            </>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="pl-tree-indent ml-2.5 border-l border-gray-200/60 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors flex flex-col gap-item-gap">
          {renderChildren()}
          <div className="py-tree-row-y text-gray-400 dark:text-gray-500 font-mono">
            {isArray ? ']' : '}'}
            {!isLast && <span className="text-gray-400 dark:text-gray-500 font-mono">,</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export const JsonTreeViewer: React.FC<JsonTreeViewerProps> = ({
  data,
  searchQuery = '',
  defaultExpanded = true,
  onSelectPath,
  onHoverPath,
}) => {
  const isObject = typeof data === 'object' && data !== null;

  if (!isObject) {
    // If not an object or array, show simple node or message
    return (
      <div className="p-6 text-center text-gray-400 dark:text-gray-500 flex flex-col items-center justify-center gap-2">
        <AlertCircle className="w-8 h-8 text-gray-300" />
        <span className="text-sm font-semibold">Primitive Value Found</span>
        <span className="font-mono text-xs max-w-full break-all bg-gray-50 dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
          {String(data)}
        </span>
      </div>
    );
  }

  const isArray = Array.isArray(data);

  return (
    <div className="font-mono text-xs select-none p-item-gap antialiased leading-relaxed max-w-full text-slate-800 dark:text-slate-200">
      <div className="text-gray-400 dark:text-gray-500 font-mono mb-1">
        {isArray ? '[' : '{'}
      </div>
      <div className="pl-2 flex flex-col gap-item-gap">
        {isArray
          ? (data as unknown[]).map((item, idx) => (
              <JsonTreeNode
                key={idx}
                name={idx}
                value={item}
                path={[idx]}
                searchQuery={searchQuery}
                defaultExpanded={defaultExpanded}
                onSelectPath={onSelectPath}
                onHoverPath={onHoverPath}
                isLast={idx === (data as unknown[]).length - 1}
              />
            ))
          : Object.keys(data as Record<string, unknown>).map((key, idx) => (
              <JsonTreeNode
                key={key}
                name={key}
                value={(data as Record<string, unknown>)[key]}
                path={[key]}
                searchQuery={searchQuery}
                defaultExpanded={defaultExpanded}
                onSelectPath={onSelectPath}
                onHoverPath={onHoverPath}
                isLast={idx === Object.keys(data as Record<string, unknown>).length - 1}
              />
            ))}
      </div>
      <div className="text-gray-400 dark:text-gray-500 font-mono mt-1">
        {isArray ? ']' : '}'}
      </div>
    </div>
  );
};
