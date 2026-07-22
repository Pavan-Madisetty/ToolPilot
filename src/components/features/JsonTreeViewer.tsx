import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronDown, AlertCircle } from 'lucide-react';

interface JsonTreeViewerProps {
  data: any;
  searchQuery?: string;
  defaultExpanded?: boolean;
  onSelectPath?: (path: (string | number)[], value: any) => void;
  onHoverPath?: (path: (string | number)[] | null) => void;
}

// Helper to determine if a subtree contains a search query match
function matchesSearch(value: any, key: string | number, query: string): boolean {
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
  } else {
    return Object.entries(value).some(([k, v]) => matchesSearch(v, k, query));
  }
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
  value: any;
  path: (string | number)[];
  searchQuery: string;
  defaultExpanded: boolean;
  onSelectPath?: (path: (string | number)[], value: any) => void;
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
  const size = isObject ? (isArray ? value.length : Object.keys(value).length) : 0;

  // Determine if children contain a search query match
  const hasChildMatch = useMemo(() => {
    if (!searchQuery || !isObject) return false;
    if (isArray) {
      return value.some((item: any, idx: number) => matchesSearch(item, idx, searchQuery));
    } else {
      return Object.entries(value).some(([k, v]) => matchesSearch(v, k, searchQuery));
    }
  }, [value, isObject, isArray, searchQuery]);

  const isMatched = useMemo(() => {
    return matchesSearch(value, name, searchQuery);
  }, [value, name, searchQuery]);

  // Expanded state
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Auto-expand nodes that contain matches in their children
  useEffect(() => {
    if (hasChildMatch) {
      setIsExpanded(true);
    }
  }, [hasChildMatch]);

  // Reset expansion when defaultExpanded changes globally (Expand/Collapse All)
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
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

  const nameElement = (
    <span
      onClick={handleSelect}
      className={`cursor-pointer font-mono font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 px-1 transition-colors ${
        typeof name === 'number'
          ? 'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 text-[10px] px-1 rounded mr-1'
          : 'text-indigo-600 dark:text-indigo-400 font-semibold'
      }`}
    >
      <HighlightText text={String(name)} query={searchQuery} />
    </span>
  );

  if (!isObject) {
    // Primitive node
    let valueElement;
    if (value === null) {
      valueElement = <span className="text-gray-400 italic font-mono">null</span>;
    } else if (typeof value === 'string') {
      valueElement = (
        <span className="text-emerald-600 dark:text-emerald-400 font-mono break-all">
          "<HighlightText text={value} query={searchQuery} />"
        </span>
      );
    } else if (typeof value === 'number') {
      valueElement = (
        <span className="text-blue-600 dark:text-blue-400 font-mono">
          <HighlightText text={String(value)} query={searchQuery} />
        </span>
      );
    } else if (typeof value === 'boolean') {
      valueElement = (
        <span className="text-purple-600 dark:text-purple-400 font-mono font-semibold">
          {String(value)}
        </span>
      );
    } else {
      valueElement = <span className="font-mono text-gray-800 dark:text-gray-200">{String(value)}</span>;
    }

    return (
      <div
        className={`group py-tree-row-y pr-tree-row-x pl-tree-indent select-text hover:bg-blue-50/40 dark:hover:bg-blue-950/10 rounded-lg flex items-start gap-item-gap transition-all ${
          isMatched && searchQuery ? 'bg-amber-50/50 dark:bg-amber-950/10' : ''
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

  // Object or Array node
  const renderChildren = () => {
    if (isArray) {
      return (value as any[]).map((item, idx) => (
        <JsonTreeNode
          key={idx}
          name={idx}
          value={item}
          path={[...path, idx]}
          searchQuery={searchQuery}
          defaultExpanded={defaultExpanded}
          onSelectPath={onSelectPath}
          onHoverPath={onHoverPath}
          isLast={idx === (value as any[]).length - 1}
        />
      ));
    } else {
      const keys = Object.keys(value);
      return keys.map((key, idx) => (
        <JsonTreeNode
          key={key}
          name={key}
          value={(value as any)[key]}
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
          ? (data as any[]).map((item, idx) => (
              <JsonTreeNode
                key={idx}
                name={idx}
                value={item}
                path={[idx]}
                searchQuery={searchQuery}
                defaultExpanded={defaultExpanded}
                onSelectPath={onSelectPath}
                onHoverPath={onHoverPath}
                isLast={idx === (data as any[]).length - 1}
              />
            ))
          : Object.keys(data).map((key, idx) => (
              <JsonTreeNode
                key={key}
                name={key}
                value={data[key]}
                path={[key]}
                searchQuery={searchQuery}
                defaultExpanded={defaultExpanded}
                onSelectPath={onSelectPath}
                onHoverPath={onHoverPath}
                isLast={idx === Object.keys(data).length - 1}
              />
            ))}
      </div>
      <div className="text-gray-400 dark:text-gray-500 font-mono mt-1">
        {isArray ? ']' : '}'}
      </div>
    </div>
  );
};
