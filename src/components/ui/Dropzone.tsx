import { useRef, ChangeEvent, ReactNode } from 'react';
import { Upload } from 'lucide-react';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
}

export function Dropzone({
  onFileSelect,
  accept = 'image/*',
  icon = <Upload size={32} className="text-[var(--text-tertiary)]" />,
  title = 'Click to select or drag and drop files',
  subtitle = '100% offline processing inside your browser',
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-[var(--border-default)] hover:border-[var(--primary)] rounded-2xl p-12 text-center cursor-pointer transition-colors"
      style={{ background: 'var(--bg-surface)' }}
      role="button"
      tabIndex={0}
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
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
        {title}
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
        {subtitle}
      </p>
    </div>
  );
}

export default Dropzone;
