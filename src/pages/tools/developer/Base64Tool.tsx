import React, { useState, useRef } from 'react';
import { Upload, ArrowLeftRight, FileText, Download, Image as ImageIcon } from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton, Textarea } from '@/components/ui';

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputText, setInputText] = useState('Welcome to Toolskyt - Developer Tools Suite!');
  const [outputText, setOutputText] = useState('V2VsY29tZSB0byBUb29sc2t5dCAtIERldmVsb3BlciBUb29scyBTdWl0ZSE=');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
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

  const isImageOutput = outputText.startsWith('data:image/');
  const isDecodedImage = mode === 'decode' && (inputText.startsWith('data:image/') || (/^[a-zA-Z0-9+/=]+$/.test(inputText) && inputText.length > 500));

  return (
    <ToolPageWrapper toolId="base64">
      <div className="tool-layout lg:grid-cols-2">
        
        {/* Input Panel */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between min-h-[36px]">
            <span className="label">
              {mode === 'encode' ? 'Raw Input (Text or Drag File)' : 'Base64 Hash Input'}
            </span>
            <Button
              id="base64-toggle-mode-btn"
              variant="secondary"
              size="xs"
              onClick={toggleMode}
              leftIcon={<ArrowLeftRight size={14} />}
            >
              Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
            </Button>
          </div>

          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`relative flex flex-col rounded-xl border-2 border-dashed transition-all overflow-hidden ${
              dragActive ? 'border-primary bg-primary/5' : 'border-border-default bg-bg-surface-container-low'
            }`}
          >
            <textarea
              id="base64-input-textarea"
              rows={10}
              value={inputText}
              onChange={(e) => mode === 'encode' ? handleEncodeText(e.target.value) : handleDecodeText(e.target.value)}
              placeholder={mode === 'encode' ? 'Type or paste text to encode, or drag a file here...' : 'Paste Base64 string to decode...'}
              className="w-full bg-transparent p-4 outline-none font-mono text-xs leading-relaxed resize-none text-text-primary placeholder:text-text-tertiary"
            />

            {/* Upload Overlay/Zone */}
            {mode === 'encode' && (
              <div className="border-t border-border-default p-3 bg-bg-surface-container-lowest flex flex-wrap items-center justify-between gap-3 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Upload size={14} className="text-text-tertiary shrink-0" />
                  <span>Drag and drop any file here to encode to Base64</span>
                </div>
                <Button
                  id="base64-select-file-btn"
                  variant="ghost"
                  size="xs"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  aria-label="Choose file" tabIndex={-1}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {fileName && (
            <div className="p-3 card flex items-center justify-between text-xs text-text-secondary font-medium">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText size={16} className="text-primary shrink-0" />
                <span className="font-semibold text-text-primary truncate">{fileName}</span>
                <span className="text-text-tertiary shrink-0">({fileSize})</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded shrink-0">
                {fileType?.split('/')[1] || 'binary'}
              </span>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between min-h-[36px]">
            <span className="label">
              {mode === 'encode' ? 'Encoded Base64 Output' : 'Decoded Output'}
            </span>
            
            {outputText && (
              <CopyButton
                text={outputText}
                label="Copy Output"
                size="xs"
              />
            )}
          </div>

          {/* Special Image Decoding Output */}
          {mode === 'decode' && (isImageOutput || isDecodedImage) ? (
            <div className="rounded-xl border border-border-default p-6 bg-bg-surface-container-low flex flex-col items-center justify-center gap-4 min-h-[280px]">
              <ImageIcon size={32} className="text-primary opacity-80" />
              <div className="text-xs text-text-secondary font-semibold uppercase tracking-wider">
                Image detected in Base64 stream
              </div>
              
              <img 
                src={inputText.startsWith('data:') ? inputText : `data:image/png;base64,${inputText}`} 
                alt="Decoded preview" 
                className="max-h-48 max-w-xs object-contain rounded border border-border-default shadow-sm bg-bg-surface"
              />

              <a
                id="base64-download-img"
                href={inputText.startsWith('data:') ? inputText : `data:image/png;base64,${inputText}`}
                download="decoded_image.png"
                className="btn btn-primary btn-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                <span>Download Decoded Image</span>
              </a>
            </div>
          ) : (
            <Textarea
              id="base64-output-textarea"
              readOnly
              rows={11}
              variant="code"
              value={outputText}
              placeholder="Converted results will appear here..."
              className="h-full select-all break-all"
            />
          )}
        </div>

      </div>
    </ToolPageWrapper>
  );
}
