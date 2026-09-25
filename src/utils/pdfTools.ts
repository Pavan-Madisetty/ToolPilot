import { PDFDocument, degrees } from 'pdf-lib';

export class PdfReadError extends Error {
  readonly original?: unknown;
  constructor(message: string, original?: unknown) {
    super(message);
    this.name = 'PdfReadError';
    this.original = original;
  }
}

/** Read a File into memory and open it as a PDFDocument (pdf-lib runs fully client-side). */
export async function openPdf(file: File): Promise<{ doc: PDFDocument; bytes: Uint8Array; pages: number }> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  try {
    const doc = await PDFDocument.load(bytes);
    return { doc, bytes, pages: doc.getPageCount() };
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    if (/encrypt/i.test(msg)) {
      throw new PdfReadError(`"${file.name}" is password-protected. Remove the password first.`, e);
    }
    throw new PdfReadError(`"${file.name}" is not a valid PDF or is damaged.`, e);
  }
}

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const out = await PDFDocument.create();
  for (const f of files) {
    const { doc } = await openPdf(f);
    const pages = await out.copyPages(doc, doc.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  return out.save();
}

export async function extractPages(file: File, pageIndexes: number[]): Promise<Uint8Array> {
  const { doc } = await openPdf(file);
  const out = await PDFDocument.create();
  const pages = await out.copyPages(doc, pageIndexes);
  pages.forEach((p) => out.addPage(p));
  return out.save();
}

export async function rotatePdf(file: File, pageIndexes: number[], deltaDeg: number): Promise<Uint8Array> {
  const { doc } = await openPdf(file);
  const pages = doc.getPages();
  for (const i of pageIndexes) {
    const p = pages[i];
    if (!p) continue;
    const current = p.getRotation().angle;
    p.setRotation(degrees((((current + deltaDeg) % 360) + 360) % 360));
  }
  return doc.save();
}

/** Copy into a fresh ArrayBuffer-backed Uint8Array so it can always be used as a BlobPart. */
export function pdfBlob(bytes: Uint8Array): Blob {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return new Blob([copy], { type: 'application/pdf' });
}
