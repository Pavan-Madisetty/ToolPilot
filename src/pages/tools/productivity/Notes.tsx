import { useState, useEffect, useMemo } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, CopyButton, Textarea } from '@/components/ui';
import { Trash2, Plus, FileText, Eye, Edit2, Search } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem('toolpilot_notes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading notes:', e);
    }
    // Default initial notes
    return [
      {
        id: '1',
        title: 'Project Ideas 💡',
        content: `# Project Ideas

Here are some cool concepts for the upcoming hackathon:

1. **ToolPilot Extensions**: Custom modules for developer workflows.
2. **AI Resume Parser**: Extract and clean CV text into ATS formats.
3. **Task Board**: Local storage offline Kanban board.

*Keep updating this file!*`,
        updatedAt: Date.now() - 3600000 * 2, // 2 hours ago
      },
      {
        id: '2',
        title: 'Meeting Notes - July 10',
        content: `## Weekly Sync Notes
Date: 2026-07-10

- **Product Goals**: Finalize the core design system primitives.
- **Developer Work**: Code cleanups and React 18 compat checks.
- **QA Updates**: Fix boundary alerts on count downs.`,
        updatedAt: Date.now(),
      },
    ];
  });

  const [activeNoteId, setActiveNoteId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('toolpilot_notes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed[0].id;
      }
    } catch (e) {
      console.error(e);
    }
    return '1';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('toolpilot_notes', JSON.stringify(notes));
    } catch (e) {
      console.error('Error saving notes:', e);
    }
  }, [notes]);

  const activeNote = useMemo(() => {
    return notes.find((note) => note.id === activeNoteId) || notes[0] || null;
  }, [notes, activeNoteId]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '# New Note\n\nStart typing here...',
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setActiveTab('edit');
  };

  const handleUpdateNote = (field: 'title' | 'content', value: string) => {
    if (!activeNote) return;
    setNotes(
      notes.map((note) =>
        note.id === activeNote.id
          ? {
              ...note,
              [field]: value,
              updatedAt: Date.now(),
            }
          : note
      )
    );
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    const remainingNotes = notes.filter((note) => note.id !== id);
    setNotes(remainingNotes);

    if (activeNoteId === id) {
      setActiveNoteId(remainingNotes[0]?.id || '');
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  // Basic custom markdown parser for preview
  const renderMarkdown = (mdText: string) => {
    if (!mdText) return <p className="italic" style={{ color: 'var(--text-tertiary)' }}>Empty note</p>;
    const lines = mdText.split('\n');

    return (
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          // Headers
          if (trimmed.startsWith('# ')) {
            return (
              <h1
                key={idx}
                className="text-2xl font-bold border-b pb-2 mb-4 mt-2"
                style={{ borderColor: 'var(--border-default)' }}
              >
                {trimmed.replace('# ', '')}
              </h1>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h2
                key={idx}
                className="text-xl font-bold border-b pb-1 mb-3 mt-4"
                style={{ borderColor: 'var(--border-default)' }}
              >
                {trimmed.replace('## ', '')}
              </h2>
            );
          }
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-lg font-bold mb-2 mt-3">
                {trimmed.replace('### ', '')}
              </h3>
            );
          }

          // Bullet lists
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const cleanText = trimmed.replace(/^[-*]\s+/, '');
            return (
              <ul key={idx} className="list-disc pl-5">
                <li>{parseInlineStyles(cleanText)}</li>
              </ul>
            );
          }

          // Numbered lists
          if (/^\d+\.\s+/.test(trimmed)) {
            const cleanText = trimmed.replace(/^\d+\.\s+/, '');
            return (
              <ol key={idx} className="list-decimal pl-5">
                <li>{parseInlineStyles(cleanText)}</li>
              </ol>
            );
          }

          // Empty line
          if (trimmed === '') {
            return <div key={idx} className="h-2" />;
          }

          // Default Paragraph
          return <p key={idx}>{parseInlineStyles(trimmed)}</p>;
        })}
      </div>
    );
  };

  // Helper to parse bold, italic inline markdown styling
  const parseInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ToolPageWrapper toolId="notes">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Left Column: Note Listing */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Card
            className="flex flex-col gap-4"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Notebook
              </h3>
              <Button onClick={handleCreateNote} size="xs" className="flex items-center gap-1">
                <Plus size={14} />
                <span>New Note</span>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <span
                className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <Search size={16} />
              </span>
              <input
                type="text"
                className="input-base pl-9 w-full text-xs"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Note List Container */}
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => {
                  const isActive = note.id === activeNoteId;
                  const snippet = note.content
                    .replace(/[#*`\n]/g, ' ')
                    .trim()
                    .slice(0, 60);

                  return (
                    <div
                      key={note.id}
                      onClick={() => {
                        setActiveNoteId(note.id);
                        setActiveTab('edit');
                      }}
                      className="p-3 rounded-lg border cursor-pointer transition-all hover:bg-[var(--bg-elevated)]"
                      style={{
                        background: isActive ? 'var(--bg-elevated)' : 'transparent',
                        borderColor: isActive ? 'var(--primary)' : 'var(--border-default)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className="font-bold text-sm truncate"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {note.title || 'Untitled Note'}
                        </h4>
                        <button
                          onClick={(e) => handleDeleteNote(note.id, e)}
                          className="transition-colors p-0.5 rounded"
                          style={{ color: 'var(--text-tertiary)' }}
                          aria-label="Delete note"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p
                        className="text-xs truncate mt-1"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {snippet || 'Empty note...'}
                      </p>
                      <span
                        className="text-[10px] block mt-2 text-right"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        {formatDate(note.updatedAt)}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div
                  className="py-8 text-center border border-dashed rounded-lg"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    No notes found.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Note Editor / Preview */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {activeNote ? (
            <Card
              className="flex-1 flex flex-col gap-4"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
            >
              {/* Note Header and Tabs */}
              <div
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full text-xl font-bold bg-transparent border-none outline-none focus:ring-0 p-0"
                    style={{ color: 'var(--text-primary)' }}
                    placeholder="Note Title"
                    value={activeNote.title}
                    onChange={(e) => handleUpdateNote('title', e.target.value)}
                  />
                  <span
                    className="text-[10px] mt-1 block"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Last saved: {formatDate(activeNote.updatedAt)}
                  </span>
                </div>

                {/* Tabs & Copy */}
                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <div
                    className="flex rounded-md p-0.5 border"
                    style={{
                      background: 'var(--bg-elevated)',
                      borderColor: 'var(--border-default)',
                    }}
                  >
                    <button
                      onClick={() => setActiveTab('edit')}
                      className="px-3 py-1 text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                      style={{
                        background: activeTab === 'edit' ? 'var(--bg-surface)' : 'transparent',
                        color:
                          activeTab === 'edit' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      }}
                    >
                      <Edit2 size={12} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('preview')}
                      className="px-3 py-1 text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                      style={{
                        background: activeTab === 'preview' ? 'var(--bg-surface)' : 'transparent',
                        color:
                          activeTab === 'preview' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      }}
                    >
                      <Eye size={12} />
                      <span>Preview</span>
                    </button>
                  </div>

                  <CopyButton text={activeNote.content} label="Copy Content" size="sm" />
                </div>
              </div>

              {/* Editor or Preview Area */}
              <div className="flex-1 min-h-[350px] flex flex-col">
                {activeTab === 'edit' ? (
                  <Textarea
                    className="flex-1 w-full font-mono text-sm leading-relaxed p-4 rounded-lg resize-none min-h-[350px] focus:ring-0 outline-none"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-primary)',
                    }}
                    value={activeNote.content}
                    onChange={(e) => handleUpdateNote('content', e.target.value)}
                    placeholder="Write your markdown note here..."
                  />
                ) : (
                  <div
                    className="flex-1 p-5 rounded-lg overflow-y-auto border min-h-[350px]"
                    style={{
                      background: 'var(--bg-elevated)',
                      borderColor: 'var(--border-default)',
                    }}
                  >
                    {renderMarkdown(activeNote.content)}
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card
              className="flex-1 min-h-[400px] flex flex-col items-center justify-center text-center p-8 border border-dashed"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
            >
              <FileText size={48} className="mb-2" style={{ color: 'var(--text-tertiary)' }} />
              <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                No Active Note
              </h4>
              <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                Select an existing note from the list or create a new one to begin editing.
              </p>
              <Button onClick={handleCreateNote} size="sm">
                Create First Note
              </Button>
            </Card>
          )}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
