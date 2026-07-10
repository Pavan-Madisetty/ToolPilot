import { useState, useRef } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card } from '@/components/ui';
import { Upload, X, ArrowUp, ArrowDown, Image as ImageIcon, Printer } from 'lucide-react';

interface ImageFile {
  id: string;
  name: string;
  src: string;
}

export default function ImageToPdf() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [pageSize, setPageSize] = useState<'A4' | 'Letter'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<'none' | 'small' | 'medium'>('none');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setImages((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              name: file.name,
              src: result as string,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === images.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const nextImages = [...images];
    const temp = nextImages[index];
    nextImages[index] = nextImages[targetIndex];
    nextImages[targetIndex] = temp;
    setImages(nextImages);
  };

  const handlePrint = () => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      const marginSize = margin === 'none' ? '0' : margin === 'small' ? '10mm' : '20mm';

      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Image PDF Export</title>
            <style>
              @page {
                size: ${pageSize.toLowerCase()} ${orientation};
                margin: ${marginSize};
              }
              body {
                margin: 0;
                padding: 0;
                background: white;
              }
              .page {
                page-break-after: always;
                page-break-inside: avoid;
                width: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              .page:last-child {
                page-break-after: avoid;
              }
              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                display: block;
              }
            </style>
          </head>
          <body>
            ${images
              .map(
                (img) => `
              <div class="page">
                <img src="${img.src}" alt="${img.name}" />
              </div>
            `
              )
              .join('')}
          </body>
        </html>
      `);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    }
  };

  return (
    <ToolPageWrapper toolId="image-to-pdf">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Options Panel */}
        <Card
          className="flex flex-col gap-6 lg:col-span-1 h-fit"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              PDF Layout Options
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Configure the dimensions, orientation, and margins for the exported PDF.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Page Size */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Page Size
              </label>
              <div className="flex gap-2">
                {(['A4', 'Letter'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setPageSize(size)}
                    className={`flex-1 py-2 text-sm font-semibold border rounded-lg transition-colors ${
                      pageSize === size
                        ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                        : 'border-[var(--border-default)] hover:bg-[var(--bg-base)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Orientation */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Page Orientation
              </label>
              <div className="flex gap-2">
                {(['portrait', 'landscape'] as const).map((orient) => (
                  <button
                    key={orient}
                    onClick={() => setOrientation(orient)}
                    className={`flex-1 py-2 text-sm font-semibold capitalize border rounded-lg transition-colors ${
                      orientation === orient
                        ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                        : 'border-[var(--border-default)] hover:bg-[var(--bg-base)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {orient}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Margin */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Page Margin
              </label>
              <div className="flex gap-2">
                {(['none', 'small', 'medium'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMargin(m)}
                    className={`flex-1 py-2 text-sm font-semibold capitalize border rounded-lg transition-colors ${
                      margin === m
                        ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                        : 'border-[var(--border-default)] hover:bg-[var(--bg-base)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <Button
              variant="primary"
              onClick={handlePrint}
              disabled={images.length === 0}
              className="w-full flex items-center justify-center gap-2 mt-4"
            >
              <Printer size={16} />
              Export {images.length > 0 ? `(${images.length} Pages)` : ''} to PDF
            </Button>
          </div>
        </Card>

        {/* Right Images Panel */}
        <Card
          className="flex flex-col gap-6 lg:col-span-2 min-h-[400px]"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <ImageIcon size={18} />
              Images Catalog
            </h3>
            <span className="text-xs text-[var(--text-secondary)]">
              {images.length} image{images.length === 1 ? '' : 's'} added
            </span>
          </div>

          {/* Upload Button Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 px-4 cursor-pointer hover:border-[var(--primary)] transition-colors text-center"
            style={{ borderColor: 'var(--border-default)' }}
          >
            <Upload size={32} className="text-[var(--text-secondary)]" />
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Choose or Drop Images here
            </span>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Supports JPG, PNG, and WebP formats
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>

          {/* Images List */}
          {images.length > 0 ? (
            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
              {images.map((img, index) => (
                <div
                  key={img.id}
                  className="flex items-center gap-4 p-3 border rounded-xl bg-[var(--bg-base)] border-[var(--border-default)] hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <img
                    src={img.src}
                    alt={img.name}
                    className="w-12 h-12 object-cover rounded-lg border border-[var(--border-default)]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                      Page {index + 1}: {img.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => moveImage(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-md hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] disabled:opacity-30 disabled:pointer-events-none"
                      aria-label="Move page up"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => moveImage(index, 'down')}
                      disabled={index === images.length - 1}
                      className="p-1.5 rounded-md hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] disabled:opacity-30 disabled:pointer-events-none"
                      aria-label="Move page down"
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      onClick={() => removeImage(img.id)}
                      className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500"
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <ImageIcon size={48} className="text-slate-300 dark:text-slate-700 mb-3" />
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                No images added yet. Click upload to start converting.
              </p>
            </div>
          )}
        </Card>
      </div>
    </ToolPageWrapper>
  );
}
