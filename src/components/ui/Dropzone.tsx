import { useRef, useState, ChangeEvent, ReactNode } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  /** Maximum accepted file size in megabytes. Defaults to 50MB. */
  maxSizeMB?: number;
  /** Called with a human-readable message when a file is rejected. */
  onError?: (message: string) => void;
}

/** Returns true when the file matches an `accept` string like "image/*,.png". */
function matchesAccept(file: File, accept: string): boolean {
  if (!accept || accept.trim() === '') return true;
  const patterns = accept.split(',').map((p) => p.trim().toLowerCase());
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  return patterns.some((pattern) => {
    if (pattern === '*' || pattern === '*/*') return true;
    if (pattern.startsWith('.')) return fileName.endsWith(pattern);
    if (pattern.endsWith('/*')) {
      const group = pattern.slice(0, pattern.indexOf('/'));
      return fileType.startsWith(`${group}/`);
    }
    return fileType === pattern;
  });
}

export function Dropzone({
  onFileSelect,
  accept = 'image/*',
  icon = <Upload size={32} className="text-[var(--text-tertiary)]" />,
  title = 'Click to select or drag and drop files',
  subtitle = '100% offline processing inside your browser',
  maxSizeMB = 50,
  onError,
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reject = (message: string) => {
    setError(message);
    onError?.(message);
  };

  const validateAndSelect = (file: File) => {
    if (!matchesAccept(file, accept)) {
      reject(`Unsupported file type. Please upload a file matching: ${accept}`);
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      reject(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }
    setError(null);
    onFileSelect(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSelect(file);
    // Reset so selecting the same file again still fires onChange.
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSelect(file);
  };

  return (
    <div>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors"
        style={{
          background: isDragging ? 'var(--primary-subtle)' : 'var(--bg-surface)',
          borderColor: isDragging
            ? 'var(--primary)'
            : error
              ? 'var(--danger)'
              : 'var(--border-default)',
        }}
        role="button"
        tabIndex={0}
        aria-label={title}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
        <div className="flex justify-center mb-4" aria-hidden="true">
          {icon}
        </div>
        <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
          {isDragging ? 'Drop your file here' : title}
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
          {subtitle}
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="flex items-center gap-1.5 text-xs mt-2"
          style={{ color: 'var(--danger)' }}
        >
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default Dropzone;
