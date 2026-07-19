import { useState } from 'react';
import { Clipboard, Check, Code, Trash2 } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function JsonFormatter() {
  const [inputVal, setInputVal] = useState('{\n  "name": "Toolskyt",\n  "version": "1.0.0",\n  "description": "The world\'s most precise developer suite",\n  "features": [\n    "High Performance",\n    "Privacy First",\n    "Offline Capable"\n  ],\n  "active": true,\n  "rating": 5.0\n}');
  const [outputVal, setOutputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const handleFormat = (minify = false) => {
    setErrorMsg(null);
    if (!inputVal.trim()) {
      setOutputVal('');
      return;
    }

    try {
      const parsed = JSON.parse(inputVal);
      const res = minify 
        ? JSON.stringify(parsed) 
        : JSON.stringify(parsed, null, indentSize);
      setOutputVal(res);
    } catch (err) {
      const error = err as Error;
      setErrorMsg(error.message || 'Invalid JSON format');
      setOutputVal('');
    }
  };

  const handleMinify = () => {
    handleFormat(true);
  };

  const handleValidate = () => {
    setErrorMsg(null);
    if (!inputVal.trim()) {
      setErrorMsg('Input is empty');
      return;
    }
    try {
      JSON.parse(inputVal);
      setErrorMsg(null);
      alert('JSON is fully valid!');
    } catch (err) {
      const error = err as Error;
      setErrorMsg(error.message || 'Invalid JSON format');
    }
  };

  const loadSample = () => {
    setInputVal('{\n  "id": 10023,\n  "title": "Developer Tools Pack",\n  "author": {\n    "name": "Toolskyt Engineering",\n    "active": true\n  },\n  "statistics": {\n    "clicks": 1498,\n    "downloads": 822,\n    "rating": 4.98\n  },\n  "tags": ["formatting", "developer", "utility"]\n}');
    setErrorMsg(null);
  };

  const handleCopy = () => {
    if (!outputVal) return;
    navigator.clipboard.writeText(outputVal).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const clearAll = () => {
    setInputVal('');
    setOutputVal('');
    setErrorMsg(null);
  };

  return (
    <ToolPageWrapper toolId="json-formatter">
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">JSON Formatter & Beautifier</h2>
          <p className="text-sm text-gray-500 mb-6">Validate, format, and minify JSON structures instantly inside your browser with clean, highlighted outputs.</p>

          {/* Toolbar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-55">
            <div className="flex flex-wrap gap-2.5">
              <button
                id="json-format-beautify-btn"
                onClick={() => handleFormat(false)}
                className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold uppercase rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-primary/15"
              >
                <Code className="w-3.5 h-3.5" />
                Beautify
              </button>
              <button
                id="json-minify-btn"
                onClick={handleMinify}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Minify
              </button>
              <button
                id="json-validate-btn"
                onClick={handleValidate}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Validate
              </button>
              <button
                id="json-load-sample-btn"
                onClick={loadSample}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg transition-all border border-gray-100 cursor-pointer"
              >
                Load Sample
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-400 uppercase">Indentation:</span>
                <select
                  id="json-indent-select"
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs font-semibold text-gray-600 outline-none cursor-pointer"
                >
                  <option value={2}>2 Spaces</option>
                  <option value={4}>4 Spaces</option>
                  <option value={8}>8 Spaces</option>
                </select>
              </div>

              <button
                id="json-clear-btn"
                onClick={clearAll}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                title="Clear all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Workspace Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Block */}
            <div className="space-y-2 text-left">
              <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Raw JSON Input</label>
              <div className="relative">
                <textarea
                  id="json-input-textarea"
                  rows={14}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Paste or type raw JSON here..."
                  className="w-full bg-gray-50/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/5 rounded-xl p-4 font-mono text-xs leading-relaxed outline-none transition-all text-gray-800"
                />
              </div>
              {errorMsg && (
                <div className="p-3 bg-red-50/50 border border-red-100 rounded-lg text-red-500 text-xs font-medium flex items-start gap-2 animate-pulse">
                  <span className="font-bold uppercase tracking-wider bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[9px] mt-0.5 font-sans">Error</span>
                  <span className="break-words font-mono">{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Output Block */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Formatted Output</label>
                {outputVal && (
                  <button
                    id="json-copy-output-btn"
                    onClick={handleCopy}
                    className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-500 hover:text-primary rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer font-sans"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-success-emerald" /> : <Clipboard className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>
              <div className="relative">
                <textarea
                  id="json-output-textarea"
                  readOnly
                  rows={14}
                  value={outputVal}
                  placeholder="Formatted JSON will appear here..."
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl p-4 font-mono text-xs leading-relaxed outline-none select-all resize-none"
                />
                {!outputVal && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs text-slate-505 font-sans font-medium text-slate-500">Click "Beautify" to format your JSON</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
