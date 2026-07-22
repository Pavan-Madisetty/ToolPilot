import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Clipboard,
  Check,
  Code,
  Trash2,
  Upload,
  Download,
  Search,
  FileJson,
  AlertCircle,
  Copy,
  Link as LinkIcon
} from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { JsonTreeViewer } from '@/components/features/JsonTreeViewer';

export default function JsonFormatter() {
  const [inputVal, setInputVal] = useState('{\n  "name": "Toolskyt",\n  "version": "1.0.0",\n  "description": "The world\'s most precise developer suite",\n  "features": [\n    "High Performance",\n    "Privacy First",\n    "Offline Capable"\n  ],\n  "active": true,\n  "rating": 5.0\n}');
  const [parsedData, setParsedData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorPos, setErrorPos] = useState<{ line: number; column: number } | null>(null);
  
  // Right panel settings
  const [activeTab, setActiveTab] = useState<'viewer' | 'formatted' | 'minified'>('viewer');
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [treeSearchQuery, setTreeSearchQuery] = useState('');
  const [treeDefaultExpanded, setTreeDefaultExpanded] = useState(true);
  const [treeKey, setTreeKey] = useState(0); // Key to force tree remount

  // Path Selection state
  const [selectedPath, setSelectedPath] = useState<(string | number)[] | null>(null);
  const [selectedNodeValue, setSelectedNodeValue] = useState<any>(null);
  
  // Copy indicators
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);
  const [copiedValue, setCopiedValue] = useState(false);

  // URL modal
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [importUrl, setImportUrl] = useState('');

  // Refs for line numbers syncing scroll
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formatted Output value computation
  const formattedOutput = useMemo(() => {
    if (!parsedData) return '';
    try {
      const dataToFormat = sortKeys ? sortObjectKeys(parsedData) : parsedData;
      return JSON.stringify(dataToFormat, null, indentSize);
    } catch (e) {
      return '';
    }
  }, [parsedData, indentSize, sortKeys]);

  // Minified Output value computation
  const minifiedOutput = useMemo(() => {
    if (!parsedData) return '';
    try {
      const dataToMinify = sortKeys ? sortObjectKeys(parsedData) : parsedData;
      return JSON.stringify(dataToMinify);
    } catch (e) {
      return '';
    }
  }, [parsedData, sortKeys]);

  // Parse error helper
  const parseErrorPosition = (msg: string, text: string) => {
    const posMatch = msg.match(/at position (\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const lines = text.slice(0, pos).split('\n');
      return { line: lines.length, column: lines[lines.length - 1].length + 1 };
    }
    const lineColMatch = msg.match(/line (\d+).*column (\d+)/i);
    if (lineColMatch) {
      return { line: parseInt(lineColMatch[1], 10), column: parseInt(lineColMatch[2], 10) };
    }
    return null;
  };

  // Perform parsing whenever input changes
  useEffect(() => {
    if (!inputVal.trim()) {
      setParsedData(null);
      setErrorMsg(null);
      setErrorPos(null);
      return;
    }
    try {
      const parsed = JSON.parse(inputVal);
      setParsedData(parsed);
      setErrorMsg(null);
      setErrorPos(null);
    } catch (err) {
      const error = err as Error;
      const msg = error.message || 'Invalid JSON format';
      setErrorMsg(msg);
      setParsedData(null);
      setErrorPos(parseErrorPosition(msg, inputVal));
    }
  }, [inputVal]);

  // Scroll sync handler
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Sync scroll on layout mounts
  useEffect(() => {
    handleScroll();
  }, [inputVal]);

  // Helper for sorting keys
  function sortObjectKeys(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    }
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj: any = {};
    sortedKeys.forEach((key) => {
      sortedObj[key] = sortObjectKeys(obj[key]);
    });
    return sortedObj;
  }

  // Format Path string
  const formatPathString = (path: (string | number)[] | null, includeRoot = true): string => {
    if (!path || path.length === 0) return includeRoot ? 'root' : '';
    let result = includeRoot ? 'root' : '';
    path.forEach((part) => {
      if (typeof part === 'number') {
        result += `[${part}]`;
      } else {
        if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(part)) {
          result += result ? `.${part}` : part;
        } else {
          result += `["${part.replace(/"/g, '\\"')}"]`;
        }
      }
    });
    return result;
  };

  // In-place Format
  const handleFormatInput = () => {
    if (!parsedData) return;
    const formatted = JSON.stringify(
      sortKeys ? sortObjectKeys(parsedData) : parsedData,
      null,
      indentSize
    );
    setInputVal(formatted);
  };

  // In-place Minify
  const handleMinifyInput = () => {
    if (!parsedData) return;
    const minified = JSON.stringify(sortKeys ? sortObjectKeys(parsedData) : parsedData);
    setInputVal(minified);
  };

  // Repair common JSON syntax errors
  const handleRepairJson = () => {
    let repaired = inputVal.trim();
    // Replace smart quotes
    repaired = repaired.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"');
    repaired = repaired.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");
    // Remove trailing commas before closing braces/brackets
    repaired = repaired.replace(/,\s*([}\]])/g, '$1');
    setInputVal(repaired);
  };

  // Copying helpers
  const handleCopyInput = () => {
    navigator.clipboard.writeText(inputVal).then(() => {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    });
  };

  const handleCopyOutput = () => {
    const textToCopy = activeTab === 'formatted' ? formattedOutput : minifiedOutput;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    });
  };

  const handleCopyPath = () => {
    if (!selectedPath) return;
    const pathStr = formatPathString(selectedPath, false); // omit 'root' for coding convenience
    navigator.clipboard.writeText(pathStr).then(() => {
      setCopiedPath(true);
      setTimeout(() => setCopiedPath(false), 2000);
    });
  };

  const handleCopyValue = () => {
    if (selectedNodeValue === null || selectedNodeValue === undefined) return;
    const valStr = typeof selectedNodeValue === 'object'
      ? JSON.stringify(selectedNodeValue, null, 2)
      : String(selectedNodeValue);
    
    navigator.clipboard.writeText(valStr).then(() => {
      setCopiedValue(true);
      setTimeout(() => setCopiedValue(false), 2000);
    });
  };

  // Download logic
  const handleDownload = () => {
    const outputText = activeTab === 'minified' ? minifiedOutput : formattedOutput;
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `formatted_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      setInputVal(text);
    };
    reader.readAsText(file);
  };

  // Fetch URL JSON
  const handleFetchUrl = async () => {
    if (!importUrl.trim()) return;
    try {
      const res = await fetch(importUrl);
      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      const data = await res.json();
      setInputVal(JSON.stringify(data, null, 2));
      setShowUrlModal(false);
      setImportUrl('');
    } catch (err) {
      alert(`Failed to fetch JSON: ${(err as Error).message}`);
    }
  };

  const loadSample = () => {
    setInputVal('{\n  "id": 10023,\n  "title": "Developer Tools Pack",\n  "author": {\n    "name": "Toolskyt Engineering",\n    "active": true\n  },\n  "statistics": {\n    "clicks": 1498,\n    "downloads": 822,\n    "rating": 4.98\n  },\n  "tags": ["formatting", "developer", "utility"]\n}');
  };

  const clearAll = () => {
    setInputVal('');
    setSelectedPath(null);
    setSelectedNodeValue(null);
  };

  // Expand / Collapse all handlers
  const handleExpandAll = () => {
    setTreeDefaultExpanded(true);
    setTreeKey((prev) => prev + 1);
  };

  const handleCollapseAll = () => {
    setTreeDefaultExpanded(false);
    setTreeKey((prev) => prev + 1);
  };

  // Parse error line numbers count helper
  const lineCount = inputVal.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  // Highlighting formatter output JSX
  const highlightJsonJSX = (jsonStr: string) => {
    if (!jsonStr) return null;
    // Regex for matching key, string value, boolean, null, number, brackets, punctuation
    const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|[{}[\]:,])/g;
    let match;
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];
    let keyIndex = 0;

    // Reset regex index
    regex.lastIndex = 0;

    while ((match = regex.exec(jsonStr)) !== null) {
      const matchIndex = match.index;
      const matchText = match[0];

      // Push preceding plain text (spaces, newlines)
      if (matchIndex > lastIndex) {
        elements.push(jsonStr.substring(lastIndex, matchIndex));
      }

      let className = "text-slate-200";
      if (/^"/.test(matchText)) {
        if (/:$/.test(matchText)) {
          // Key
          className = "text-indigo-400 dark:text-indigo-300 font-semibold";
        } else {
          // String value
          className = "text-emerald-400 dark:text-emerald-400";
        }
      } else if (/true|false/.test(matchText)) {
        // Boolean
        className = "text-purple-400 dark:text-purple-400 font-bold";
      } else if (/null/.test(matchText)) {
        // Null
        className = "text-gray-400 dark:text-gray-500 italic";
      } else if (/[0-9]/.test(matchText)) {
        // Number
        className = "text-blue-400 dark:text-blue-400";
      } else if (/[{}[\]]/.test(matchText)) {
        // Brackets
        className = "text-amber-400 dark:text-amber-400 font-bold";
      } else if (/:/.test(matchText)) {
        className = "text-gray-400 dark:text-gray-500";
      }

      elements.push(
        <span key={keyIndex++} className={className}>
          {matchText}
        </span>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < jsonStr.length) {
      elements.push(jsonStr.substring(lastIndex));
    }

    return (
      <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed select-text p-panel-padding">
        {elements}
      </pre>
    );
  };

  return (
    <ToolPageWrapper toolId="json-formatter">
      <div className="flex flex-col gap-layout-gap font-sans select-none pb-12">
        {/* Workspace Dual-Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-layout-gap min-h-[650px] lg:h-[700px] items-stretch">
          {/* LEFT PANEL - Raw Input Editor */}
          <div className="lg:col-span-5 flex flex-col bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm h-full">
            {/* Editor Toolbar */}
            <div className="p-toolbar-padding border-b border-gray-100 dark:border-slate-800 flex items-center justify-between gap-toolbar-gap bg-gray-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-item-gap overflow-hidden">
                <span className="font-semibold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider shrink-0">Raw JSON Input</span>
                {parsedData ? (
                  <span className="badge-status-valid shrink-0">
                    Valid
                  </span>
                ) : inputVal.trim() ? (
                  <span className="badge-status-invalid shrink-0">
                    Invalid
                  </span>
                ) : null}
              </div>

              {/* Input Actions */}
              <div className="flex items-center gap-item-gap shrink-0">
                <button
                  onClick={loadSample}
                  className="custom-sample-btn"
                  title="Load Sample JSON"
                >
                  Sample
                </button>
                <button
                  onClick={clearAll}
                  className="btn-icon-utility text-red-500 hover:text-red-600"
                  title="Clear Input"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-gray-200 dark:bg-slate-800 self-center mx-0.5"></div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-icon-utility"
                  title="Upload JSON File"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".json,application/json"
                  className="hidden"
                />

                <button
                  onClick={() => setShowUrlModal(true)}
                  className="btn-icon-utility"
                  title="Fetch JSON from URL"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={handleCopyInput}
                  className="btn-icon-utility"
                  title="Copy Input"
                >
                  {copiedInput ? <Check className="w-4 h-4 text-emerald-500" /> : <Clipboard className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Input Formatter Action Strip */}
            <div className="px-toolbar-padding py-item-gap bg-gray-50/30 dark:bg-slate-900/30 border-b border-gray-100 dark:border-slate-800 flex flex-wrap gap-toolbar-gap items-center justify-between">
              <div className="flex gap-item-gap">
                <button
                  disabled={!parsedData}
                  onClick={handleFormatInput}
                  className="btn-primary-action"
                >
                  <Code className="w-3.5 h-3.5" />
                  Format Here
                </button>
                <button
                  disabled={!parsedData}
                  onClick={handleMinifyInput}
                  className="btn-secondary-action"
                >
                  Minify Here
                </button>
              </div>

              {errorMsg && (
                <button
                  onClick={handleRepairJson}
                  className="btn-secondary-action border-amber-200 hover:border-amber-400 text-amber-700 dark:text-amber-450"
                >
                  Auto-Fix JSON
                </button>
              )}
            </div>

            {/* Textarea Editor with Line Numbers */}
            <div className="flex-1 flex overflow-hidden relative min-h-[300px]">
              {/* Line Numbers column */}
              <div
                ref={lineNumbersRef}
                className="w-12 bg-gray-50/50 dark:bg-slate-900/30 text-gray-300 dark:text-gray-650 border-r border-gray-100 dark:border-slate-850 py-panel-padding text-right font-mono text-xs select-none overflow-y-hidden leading-relaxed"
              >
                {lineNumbers.map((line) => (
                  <div
                    key={line}
                    className={`${
                      errorPos?.line === line
                        ? 'text-red-500 font-bold bg-red-100 dark:bg-red-950/30 px-1 rounded-sm'
                        : ''
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Text Area Input */}
              <textarea
                ref={textareaRef}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onScroll={handleScroll}
                placeholder="Paste or write raw JSON here..."
                className="flex-1 bg-transparent p-panel-padding font-mono text-xs leading-relaxed text-gray-800 dark:text-slate-100 outline-none resize-none overflow-y-auto select-text focus:ring-0"
              />
            </div>

            {/* Error Notification Banner */}
            {errorMsg && (
              <div className="p-toolbar-padding bg-red-50 dark:bg-red-950/10 border-t border-red-100 dark:border-red-950/30 flex items-start gap-item-gap animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <div className="text-xs font-mono text-red-600 dark:text-red-400 leading-normal">
                  <div className="font-bold font-sans text-[10px] uppercase tracking-wider mb-0.5 text-red-700 dark:text-red-500">
                    Syntax Error {errorPos ? `at line ${errorPos.line}, col ${errorPos.column}` : ''}
                  </div>
                  <div className="break-words select-text">{errorMsg}</div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL - Viewer & Formatted Output tabs */}
          <div className="lg:col-span-7 flex flex-col bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm h-full">
            {/* Right Panel Tabs */}
            <div className="border-b border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-toolbar-gap px-toolbar-padding bg-gray-50/50 dark:bg-slate-900/50">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('viewer')}
                  className={`px-toolbar-padding py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === 'viewer'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600'
                  }`}
                >
                  Viewer
                </button>
                <button
                  onClick={() => setActiveTab('formatted')}
                  className={`px-toolbar-padding py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === 'formatted'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600'
                  }`}
                >
                  Formatted
                </button>
                <button
                  onClick={() => setActiveTab('minified')}
                  className={`px-toolbar-padding py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                    activeTab === 'minified'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600'
                  }`}
                >
                  Minified
                </button>
              </div>

              {/* Output Quick-Actions */}
              {parsedData && (
                <div className="flex items-center gap-item-gap py-2">
                  <button
                    onClick={handleCopyOutput}
                    className="btn-secondary-action"
                    title="Copy output tab text"
                  >
                    {copiedOutput ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Clipboard className="w-3.5 h-3.5" />}
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="btn-secondary-action"
                    title="Download output file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              )}
            </div>

            {/* TAB CONTENT - Viewer Mode */}
            {activeTab === 'viewer' && (
              <div className="flex-1 flex flex-col overflow-hidden min-h-[300px]">
                {/* 1. Stack/Path Breadcrumbs indicator */}
                <div className="px-toolbar-padding py-toolbar-gap bg-indigo-50/40 dark:bg-indigo-950/10 border-b border-gray-100 dark:border-slate-800/80 flex items-center justify-between gap-toolbar-gap text-xs">
                  <div className="flex items-center gap-item-gap overflow-hidden w-full">
                    <span className="font-bold text-[10px] uppercase text-indigo-500 tracking-wider shrink-0 select-none">
                      Stack Path:
                    </span>
                    {selectedPath ? (
                      <span className="font-mono text-gray-700 dark:text-slate-200 select-all truncate bg-white dark:bg-slate-850 px-2 py-0.5 border border-indigo-100/50 dark:border-slate-800 rounded shadow-sm">
                        {formatPathString(selectedPath, true)}
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 italic truncate select-none">
                        Click on any JSON tree key to select its code path
                      </span>
                    )}
                  </div>

                  {selectedPath && (
                    <div className="flex gap-item-gap shrink-0">
                      <button
                        onClick={handleCopyPath}
                        className="tree-action-btn"
                        title="Copy JavaScript path"
                      >
                        {copiedPath ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        Path
                      </button>
                      <button
                        onClick={handleCopyValue}
                        className="tree-action-btn"
                        title="Copy node value"
                      >
                        {copiedValue ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        Value
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Tree Search & Global controls */}
                <div className="px-toolbar-padding py-toolbar-gap border-b border-gray-100 dark:border-slate-800 bg-gray-50/20 dark:bg-slate-900/20 flex flex-col sm:flex-row gap-toolbar-gap justify-between items-stretch sm:items-center">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="custom-search-icon" />
                    <input
                      type="text"
                      placeholder="Search keys or values in tree..."
                      value={treeSearchQuery}
                      onChange={(e) => setTreeSearchQuery(e.target.value)}
                      className="custom-search-input"
                    />
                    {treeSearchQuery && (
                      <button
                        onClick={() => setTreeSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 hover:text-gray-600 bg-gray-200 dark:bg-slate-700 px-1.5 py-0.5 rounded cursor-pointer z-20"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Expand/Collapse Actions */}
                  <div className="flex items-center gap-item-gap shrink-0">
                    <button
                      onClick={handleExpandAll}
                      className="tree-action-btn"
                    >
                      Expand All
                    </button>
                    <button
                      onClick={handleCollapseAll}
                      className="tree-action-btn"
                    >
                      Collapse All
                    </button>
                  </div>
                </div>

                {/* 3. Tree Content */}
                <div className="flex-1 overflow-auto p-panel-padding bg-gray-50/10 dark:bg-slate-900/10">
                  {parsedData ? (
                    <JsonTreeViewer
                      key={`${treeKey}-${indentSize}-${sortKeys}`}
                      data={sortKeys ? sortObjectKeys(parsedData) : parsedData}
                      searchQuery={treeSearchQuery}
                      defaultExpanded={treeDefaultExpanded}
                      onSelectPath={(path, value) => {
                        setSelectedPath(path);
                        setSelectedNodeValue(value);
                      }}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-panel-padding text-gray-400">
                      <FileJson className="w-12 h-12 text-gray-200 dark:text-slate-800 mb-3" />
                      <span className="text-sm font-semibold mb-1">No JSON structured data</span>
                      <span className="text-xs max-w-sm">
                        Please check if your JSON input contains syntax errors.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT - Formatted Text Output */}
            {activeTab === 'formatted' && (
              <div className="flex-1 flex flex-col overflow-hidden min-h-[300px]">
                {/* Formatting Controls Bar */}
                <div className="px-toolbar-padding py-toolbar-gap border-b border-gray-100 dark:border-slate-800 bg-gray-50/20 dark:bg-slate-900/20 flex flex-wrap gap-toolbar-gap items-center justify-between text-xs">
                  <div className="flex items-center gap-toolbar-gap flex-wrap">
                    {/* Indent select */}
                    <div className="flex items-center gap-item-gap">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Indent:
                      </span>
                      <select
                        value={indentSize}
                        onChange={(e) => setIndentSize(Number(e.target.value))}
                        className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-800 rounded px-1.5 py-0.5 font-semibold text-gray-600 dark:text-gray-300 outline-none cursor-pointer text-xs"
                      >
                        <option value={2}>2 Spaces</option>
                        <option value={4}>4 Spaces</option>
                        <option value={8}>8 Spaces</option>
                      </select>
                    </div>

                    {/* Sort keys toggle */}
                    <label className="flex items-center gap-item-gap cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sortKeys}
                        onChange={(e) => setSortKeys(e.target.checked)}
                        className="rounded border-gray-300 dark:border-slate-850 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Sort Keys
                      </span>
                    </label>
                  </div>
                </div>

                {/* Text View Area */}
                <div className="flex-1 overflow-auto bg-slate-950 dark:bg-slate-950/80 rounded-b-xl border-t border-slate-900">
                  {parsedData ? (
                    highlightJsonJSX(formattedOutput)
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-panel-padding text-gray-400">
                      <FileJson className="w-12 h-12 text-slate-800 mb-3" />
                      <span className="text-sm font-semibold mb-1">No Formatted Output</span>
                      <span className="text-xs">Correct the input syntax error to see formatted output.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT - Minified Output */}
            {activeTab === 'minified' && (
              <div className="flex-1 flex flex-col overflow-hidden min-h-[300px]">
                {/* Minifier Controls */}
                <div className="px-toolbar-padding py-toolbar-gap border-b border-gray-100 dark:border-slate-800 bg-gray-50/20 dark:bg-slate-900/20 flex gap-toolbar-gap items-center justify-between text-xs">
                  <div className="flex items-center gap-toolbar-gap">
                    {/* Sort keys toggle */}
                    <label className="flex items-center gap-item-gap cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sortKeys}
                        onChange={(e) => setSortKeys(e.target.checked)}
                        className="rounded border-gray-300 dark:border-slate-850 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Sort Keys
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex-1 overflow-auto bg-slate-950 dark:bg-slate-950/80 p-panel-padding">
                  {parsedData ? (
                    <textarea
                      readOnly
                      value={minifiedOutput}
                      placeholder="Minified output will appear here..."
                      className="w-full h-full bg-transparent border-none text-slate-200 font-mono text-xs leading-relaxed outline-none select-all resize-none overflow-y-auto"
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-panel-padding text-gray-400">
                      <FileJson className="w-12 h-12 text-slate-800 mb-3" />
                      <span className="text-sm font-semibold mb-1">No Minified Output</span>
                      <span className="text-xs">Correct the input syntax error to see minified output.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* URL IMPORT MODAL */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-gray-900 dark:text-gray-100">Fetch JSON from URL</h3>
              <button
                onClick={() => {
                  setShowUrlModal(false);
                  setImportUrl('');
                }}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold bg-gray-100 dark:bg-slate-800 p-1.5 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
              Provide a valid HTTP/HTTPS URL returning JSON content. Browser CORS policies may apply.
            </p>

            <input
              type="url"
              placeholder="https://api.example.com/data.json"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 rounded-xl text-xs outline-none text-gray-700 dark:text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/10"
            />

            <div className="flex gap-2 justify-end mt-2">
              <button
                onClick={() => {
                  setShowUrlModal(false);
                  setImportUrl('');
                }}
                className="px-4 py-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-850 text-gray-650 dark:text-gray-400 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFetchUrl}
                disabled={!importUrl.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Fetch JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </ToolPageWrapper>
  );
}
