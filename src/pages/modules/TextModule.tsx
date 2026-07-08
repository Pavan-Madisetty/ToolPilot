import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const MODULE_COLOR_THEME = {
  accent: '#f59e0b',
  bg: 'rgba(245, 158, 11, 0.08)',
};

// Filter text tools
const textTools = TOOLS.filter((t) => t.module === 'text');

export default function TextModule() {
  return (
    <>
      <Helmet>
        <title>Text Analysis & Conversion Utilities | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based text tools including word counters, case converters, line comparative diff checkers, and markdown preview editors."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Text' }]} />

        {/* Hero Banner Header */}
        <div
          className="p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 mb-12 mt-4"
          style={{
            borderColor: 'var(--border-default)',
            background: `linear-gradient(135deg, ${MODULE_COLOR_THEME.bg} 0%, transparent 100%)`,
          }}
        >
          <div className="max-w-xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-amber-500"
              style={{ background: 'var(--bg-elevated)' }}
              aria-hidden="true"
            >
              <DocumentTextIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Text Module
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Count words and paragraphs, convert text casings to standard formatting rules, review differences between paragraphs, and compile markdown previews.
            </p>
          </div>
          <div className="text-right">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}
            >
              {textTools.length} Utilities Online
            </span>
          </div>
        </div>

        {/* Tools Grid */}
        <section aria-label="Text tools list">
          <div className="tools-grid">
            {textTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border-default)' }} aria-labelledby="faq-heading">
          <h3 id="faq-heading" className="text-lg font-bold mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4 max-w-3xl">
            <div className="p-4 border rounded-xl" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <h4 className="font-bold text-sm mb-1">How is the reading speed computed?</h4>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Reading speed projections assume an average reading pace of 200 words per minute (WPM). This standard allows visitors to estimate reading session time frames for written content.
              </p>
            </div>
            <div className="p-4 border rounded-xl" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}>
              <h4 className="font-bold text-sm mb-1">What markdown elements are supported in the preview editor?</h4>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                The preview editor parses headings, list items (`-`), strong bold tags (`**`), and emphasis highlights (`*`) dynamically in the browser, showing raw HTML syntax exports as well.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
