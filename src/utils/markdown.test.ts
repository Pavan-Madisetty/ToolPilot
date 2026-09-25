import { describe, it, expect } from 'vitest';
import { renderMarkdown, unwrapMarkdownFence, slugify } from './markdown';

describe('markdown', () => {
  it('renders GFM tables', () => {
    const h = renderMarkdown('| a | b |\n|---|---|\n| 1 | 2 |');
    expect(h).toContain('<table>');
    expect(h).toContain('<td');
  });
  it('renders task lists, code and ordered lists', () => {
    const h = renderMarkdown('1. one\n2. two\n\n- [x] done\n\n```js\nlet a=1\n```');
    expect(h).toContain('<ol>');
    expect(h).toContain('type="checkbox"');
    expect(h).toContain('<pre>');
  });
  it('unwraps a whole-document markdown fence', () => {
    expect(unwrapMarkdownFence('```markdown\n# Hi\n```')).toBe('# Hi');
    expect(unwrapMarkdownFence('```js\nx\n```')).toBe('```js\nx\n```');
  });
  it('adds heading ids matching link anchors, keeps raw anchors', () => {
    const h = renderMarkdown('# BUG-1 — Arabic\n\n<a id="bug-1"></a>\n[x](#bug-1)');
    expect(h).toContain('id="bug-1--arabic"');
    expect(h).toContain('id="bug-1"');
  });
  it('sanitises scripts and handlers', () => {
    const h = renderMarkdown('<img src=x onerror=alert(1)><script>alert(1)</script>[a](javascript:alert(1))');
    expect(h).not.toMatch(/onerror|<script|javascript:/i);
  });
  it('slugifies like GitHub', () => {
    expect(slugify('Arabic-speaking customers')).toBe('arabic-speaking-customers');
  });
});
