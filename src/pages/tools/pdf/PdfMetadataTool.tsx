import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Trash2, 
  Settings2, 
  FileCheck, 
  Lock, 
  Sparkles, 
  Download,
  RefreshCw
} from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

interface MockPdfFile {
  id: string;
  name: string;
  size: string;
  pages: number;
}

export default function PdfMetadataTool() {
  const [files, setFiles] = useState<MockPdfFile[]>([
    { id: '1', name: 'corporate_financial_report_2026.pdf', size: '2.4 MB', pages: 28 },
    { id: '2', name: 'product_specs_draft_v4.pdf', size: '1.1 MB', pages: 12 }
  ]);
  const [dragActive, setDragActive] = useState(false);
  
  // Metadata Fields
  const [title, setTitle] = useState('Corporate Strategy and Annual Targets');
  const [author, setAuthor] = useState('Strategic Planning Team');
  const [subject, setSubject] = useState('Executive Summary of 2026 Objectives');
  const [keywords, setKeywords] = useState('finance, targets, strategy, growth');
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState('');
  
  // Optimization Level
  const [compressLevel, setCompressLevel] = useState<'none' | 'medium' | 'maximum'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).map((f: File) => ({
        id: Math.random().toString(),
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
        pages: Math.floor(Math.random() * 20) + 1
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files).map((f: File) => ({
        id: Math.random().toString(),
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(1) + ' MB',
        pages: Math.floor(Math.random() * 20) + 1
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const executeMetadataProcess = () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setDownloadReady(false);
    
    setTimeout(() => {
      setIsProcessing(false);
      setDownloadReady(true);
    }, 2000);
  };

  return (
    <ToolPageWrapper toolId="pdf-metadata">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 font-sans text-left">
        
        {/* Left Column: File drag/drop and metadata input forms (7 cols) */}
        <div className="lg:col-span-7 p-8 space-y-6 border-r border-gray-100">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded-full">PDF PROTOCOL</span>
            <h2 className="font-display text-xl font-bold text-gray-900">PDF Metadata & Compression Engine</h2>
            <p className="text-xs text-gray-500 font-medium">Inject security flags, clean PDF metadata, and compress document catalogs.</p>
          </div>

          {/* Drag & Drop Area */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              dragActive ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary/5 text-primary flex items-center justify-center rounded-xl">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Drag & Drop your PDFs here, or <span className="text-primary hover:underline">browse files</span></p>
                <p className="text-[10px] text-gray-400 font-medium mt-1">Supports batch upload. Operations processed 100% locally.</p>
              </div>
            </div>
          </div>

          {/* Uploaded Files Queue */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Document Queue ({files.length})</h3>
            {files.length === 0 ? (
              <div className="bg-gray-50 p-6 text-center rounded-xl text-xs text-gray-400 font-medium border border-gray-100">
                No documents added to the batch pipeline.
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-lg group">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-red-500" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{file.name}</h4>
                        <p className="text-[10px] text-gray-400 font-medium font-mono">{file.size} • {file.pages} Pages</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: PDF settings configuration panel (5 cols) */}
        <div className="lg:col-span-5 p-8 bg-gray-50/50 flex flex-col justify-between space-y-6">
          <div className="space-y-5 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <Settings2 className="w-4.5 h-4.5 text-primary" />
              <h3 className="font-display text-sm font-bold text-gray-800 font-display">Metadata Rules</h3>
            </div>

            <div className="space-y-3">
              {/* Document Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Document Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title property"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-primary"
                />
              </div>

              {/* Author */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Creator / Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author property"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-primary"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Subject Descriptor</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject property"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-primary"
                />
              </div>

              {/* Keywords */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Keywords</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Keywords (comma-separated)"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-primary"
                />
              </div>

              {/* Compression level buttons */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Image Compression Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['none', 'medium', 'maximum'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setCompressLevel(level)}
                      className={`py-1.5 rounded text-[10px] font-bold uppercase tracking-wide border cursor-pointer transition-all ${
                        compressLevel === level 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {level === 'none' ? 'Original Size' : level === 'medium' ? 'Standard 150dpi' : 'Heavy 72dpi'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Encrypt password block */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    PDF Password Security
                  </span>
                  <button 
                    onClick={() => setEnablePassword(!enablePassword)}
                    className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors cursor-pointer outline-none ${
                      enablePassword ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${enablePassword ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                <AnimatePresence>
                  {enablePassword && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: '8px' }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter decryption password..."
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none focus:border-primary"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Action Button trigger */}
          <div className="space-y-3 pt-4 border-t border-gray-200/60 font-sans">
            <button
              onClick={executeMetadataProcess}
              disabled={files.length === 0 || isProcessing}
              className="w-full py-2.5 bg-primary hover:bg-primary-container disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  Processing PDF Pipeline...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white animate-pulse" />
                  Optimize & Inject Metadata
                </>
              )}
            </button>

            {/* Download Box */}
            <AnimatePresence>
              {downloadReady && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4.5 h-4.5 text-emerald-600 animate-pulse" />
                    <div className="text-left">
                      <h5 className="text-[11px] font-bold text-gray-800">Optimized Batch Ready</h5>
                      <p className="text-[9px] text-gray-400 font-medium font-mono">Metadata injected • Saved ~34% space</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Downloaded processed documents zip archive (Simulated).')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-md cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
