import { Marked, type Tokens } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Shared Markdown → safe HTML renderer used by the Markdown Editor, Markdown
 * Previewer and Markdown → PDF tools. Full GitHub-flavoured Markdown (tables,
 * task lists, fenced code, nested lists, links, images, strikethrough) via
 * `marked`, sanitised with DOMPurify. Everything runs in the browser.
 */

/** Some pasted documents are wrapped in one ```markdown fence; unwrap them. */
export function unwrapMarkdownFence(src: string): string {
  const m = src.trim().match(/^(`{3,}|~{3,})[ \t]*(?:markdown|md)[ \t]*\r?\n([\s\S]*?)\r?\n\1[ \t]*$/i);
  return m ? m[2] : src;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z#0-9]+;/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/ /g, '-');
}

function buildMarked(): Marked {
  const md = new Marked({ gfm: true, breaks: false });
  const used = new Map<string, number>();
  md.use({
    hooks: {
      preprocess(s) {
        used.clear();
        return s;
      },
    },
    renderer: {
      heading(this: { parser: { parseInline(t: Tokens.Generic[]): string } }, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const base = slugify(token.text) || 'section';
        const n = used.get(base) ?? 0;
        used.set(base, n + 1);
        const id = n ? `${base}-${n}` : base;
        return `<h${token.depth} id="${id}">${inner}</h${token.depth}>\n`;
      },
    },
  });
  return md;
}

let hooked = false;
function ensureHooks() {
  if (hooked) return;
  hooked = true;
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (!(node instanceof Element)) return;
    if (node.tagName === 'A') {
      const href = node.getAttribute('href') ?? '';
      if (/^https?:/i.test(href)) {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
      }
    }
    // Mixed Arabic / English content: let each block pick its own direction.
    if (/^(P|LI|TD|TH|H[1-6]|BLOCKQUOTE)$/.test(node.tagName)) node.setAttribute('dir', 'auto');
  });
}

export function renderMarkdown(source: string): string {
  if (!source.trim()) return '';
  ensureHooks();
  const raw = buildMarked().parse(unwrapMarkdownFence(source), { async: false }) as string;
  return DOMPurify.sanitize(raw, {
    ADD_ATTR: ['target', 'dir'],
    FORBID_TAGS: ['style', 'form', 'iframe', 'object', 'embed'],
  });
}

/** Scrolls to in-document #anchors inside `container` instead of navigating the SPA. */
export function handleAnchorClick(e: { target: EventTarget | null; preventDefault(): void }, container: HTMLElement | null) {
  const a = (e.target as HTMLElement | null)?.closest?.('a');
  const href = a?.getAttribute('href');
  if (!a || !href || !container) return;
  if (href.startsWith('#')) {
    e.preventDefault();
    const id = decodeURIComponent(href.slice(1));
    const el = container.querySelector(`[id="${CSS.escape(id)}"]`) as HTMLElement | null;
    if (el) container.scrollTo({ top: Math.max(0, el.offsetTop - 12), behavior: 'smooth' });
  }
}
