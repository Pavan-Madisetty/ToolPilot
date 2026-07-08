import { describe, it, expect } from 'vitest';

// ── Case Conversions ──
const toCamelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');
};

const toSnakeCase = (str: string) => {
  return str.replace(/\s+/g, '_').toLowerCase();
};

const toKebabCase = (str: string) => {
  return str.replace(/\s+/g, '-').toLowerCase();
};

// ── Word Counter Statistics ──
function getWordStats(text: string) {
  const raw = text.trim();
  const words = raw ? raw.split(/\s+/).filter(Boolean).length : 0;
  return { words, chars: text.length };
}

describe('Text Module Logic Engines', () => {
  describe('Case Converter Utilities', () => {
    it('converts to camelCase format correctly', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
      expect(toCamelCase('Tool Pilot app')).toBe('toolPilotApp');
    });

    it('converts to snake_case format correctly', () => {
      expect(toSnakeCase('hello world')).toBe('hello_world');
      expect(toSnakeCase('Tool Pilot App')).toBe('tool_pilot_app');
    });

    it('converts to kebab-case format correctly', () => {
      expect(toKebabCase('hello world')).toBe('hello-world');
      expect(toKebabCase('Tool Pilot App')).toBe('tool-pilot-app');
    });
  });

  describe('Word Counter Stats', () => {
    it('counts words and characters accurately', () => {
      const stats = getWordStats('Welcome to ToolPilot productivity suite');
      expect(stats.words).toBe(5);
      expect(stats.chars).toBe(39);
    });

    it('handles empty parameters gracefully', () => {
      const stats = getWordStats('  ');
      expect(stats.words).toBe(0);
      expect(stats.chars).toBe(2);
    });
  });
});
