import React, { useState, useRef } from 'react';
import { Clipboard, Check, Upload, ArrowLeftRight, FileText, Download, Image as ImageIcon } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputText, setInputText] = useState('Welcome to Toolskyt - Developer Tools Suite!');
  const [outputText, setOutputText] = useState('V2VsY29tZSB0byBUb29sc2t5dCAtIERldmVsb3BlciBUb29scyBTdWl0ZSE=');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Encode Text logic
  const handleEncodeText = (text: string) => {
    setInputText(text);
    if (!text) {
      setOutputText('');
      return;
    }
    try {
      const encoded = btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }));
      setOutputText(encoded);
    } catch (err) {
      setOutputText('Error encoding text: ' + err);
    }
  };

  // Decode Text logic
  const handleDecodeText = (text: string) => {
    setInputText(text);
    if (!text) {
      setOutputText('');
      return;
    }
    try {
      const decoded = decodeURIComponent(atob(text).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      setOutputText(decoded);
    } catch {
      setOutputText('Invalid Base64 string / Unable to decode');
    }
  };

  // File loading logic
  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileType(file.type);
    
    const kb = file.size / 1024;
    setFileSize(kb > 1024 ? (kb / 1024).toFixed(2) + ' MB' : kb.toFixed(1) + ' KB');

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        if (mode === 'encode') {
          setOutputText(dataUrl);
        } else {
          const rawBase64 = dataUrl.split(',')[1] || dataUrl;
          try {
            const decoded = atob(rawBase64);
            setOutputText(decoded);
          } catch {
            setOutputText('Invalid Base64 file content');
          }
        }
      }
    };
    if (mode === 'encode') {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const toggleMode = () => {
    const nextMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(nextMode);
    setInputText(outputText);
    setOutputText(inputText);
    setFileName(null);
    setFileSize(null);
    setFileType(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const isImageOutput = outputText.startsWith('data:image/');
  const isDecodedImage = mode === 'decode' && (inputText.startsWith('data:image/') || /^[a-zA-Z0-9+/=]+$/.test(inputText) && (inputText.length > 500));

  return (
    <ToolPageWrapper toolId="base64">
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="text-left">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Base64 Encoder & Decoder</h2>
              <p className="text-sm text-gray-500">Encode files or standard strings to base64, or decode base64 hashes back into files or readable text format.</p>
            </div>
            
            <button
              id="base64-toggle-mode-btn"
              onClick={toggleMode}
              className="self-start sm:self-center px-4 py-2.5 bg-primary text-white text-xs font-bold uppercase rounded-lg shadow-sm shadow-primary/15 hover:bg-primary-container transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
            </button>
          </div>

          {/* Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input Panel */}
            <div className="space-y-3 text-left">
              <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                {mode === 'encode' ? 'Raw Input (Text or Drag File)' : 'Base64 Hash Input'}
              </label>
              
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative flex flex-col rounded-xl border-2 border-dashed ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50/20'
                } p-2 transition-all`}
              >
                <textarea
                  id="base64-input-textarea"
                  rows={10}
                  value={inputText}
                  onChange={(e) => mode === 'encode' ? handleEncodeText(e.target.value) : handleDecodeText(e.target.value)}
                  placeholder={mode === 'encode' ? 'Type or paste text to encode, or drag a file here...' : 'Paste Base64 string to decode...'}
                  className="w-full bg-transparent p-4 border-0 outline-none text-xs font-mono leading-relaxed resize-none text-gray-800"
                />

                {/* Upload Overlay/Zone */}
                {mode === 'encode' && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50/50 rounded-b-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-gray-400" />
                      <span>Drag and drop any file here to encode to Base64 data URL</span>
                    </div>
                    <button
                      id="base64-select-file-btn"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 hover:text-primary rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer"
                    >
                      Select File
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {fileName && (
                <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between text-xs text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{fileName}</span>
                    <span className="text-gray-400">({fileSize})</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {fileType?.split('/')[1] || 'binary'}
                  </span>
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  {mode === 'encode' ? 'Encoded Base64 Output' : 'Decoded Output'}
                </label>
                
                {outputText && (
                  <button
                    id="base64-copy-output-btn"
                    onClick={handleCopy}
                    className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-500 hover:text-primary rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer font-sans"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-success-emerald" /> : <Clipboard className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Output'}
                  </button>
                )}
              </div>

              {/* Special Image Decoding Output */}
              {mode === 'decode' && (isImageOutput || isDecodedImage) ? (
                <div className="rounded-xl border border-gray-200 p-5 bg-gray-50 flex flex-col items-center justify-center gap-4 min-h-[220px]">
                  <ImageIcon className="w-8 h-8 text-primary opacity-80" />
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Image detected in Base64 stream</div>
                  
                  <img 
                    src={inputText.startsWith('data:') ? inputText : `data:image/png;base64,${inputText}`} 
                    alt="Decoded preview" 
                    className="max-h-48 max-w-xs object-contain rounded border border-gray-200 shadow-sm bg-white"
                  />

                  <a
                    id="base64-download-img"
                    href={inputText.startsWith('data:') ? inputText : `data:image/png;base64,${inputText}`}
                    download="decoded_image.png"
                    className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase rounded-lg shadow-sm hover:bg-primary-container transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Decoded Image
                  </a>
                </div>
              ) : (
                <textarea
                  id="base64-output-textarea"
                  readOnly
                  rows={11}
                  value={outputText}
                  placeholder="Converted results will appear here..."
                  className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl p-4 font-mono text-xs leading-relaxed outline-none resize-none select-all break-all"
                />
              )}
            </div>

          </div>

        </div>
      </div>
    </ToolPageWrapper>
  );
}
