import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';

const MODULE_COLOR_THEME = {
  accent: '#f59e0b',
  bg: 'rgba(245, 158, 11, 0.08)',
};

const textTools = TOOLS.filter((t) => t.module === 'text');

export default function TextModule() {
  return (
    <ModulePageWrapper
      moduleKey="text"
      moduleName="Text"
      description="Access free browser-based text tools including word counters, case converters, line comparative diff checkers, and markdown preview editors."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        title="Text Tools"
        description="Count words and paragraphs, convert text casings to standard formatting rules, review differences between paragraphs, and compile markdown previews."
        icon={<DocumentTextIcon className="w-6 h-6" />}
        iconColorClass="text-amber-500"
        accentBgColor={MODULE_COLOR_THEME.bg}
        toolCount={textTools.length}
      />

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
        <div className="max-w-3xl">
          <div className="faq-card">
            <h4 className="faq-question">How is the reading speed computed?</h4>
            <p className="faq-answer">
              Reading speed projections assume an average reading pace of 200 words per minute (WPM). This standard allows visitors to estimate reading session time frames for written content.
            </p>
          </div>
          <div className="faq-card">
            <h4 className="faq-question">What markdown elements are supported in the preview editor?</h4>
            <p className="faq-answer">
              Our editor parsed headings, bulleted lists, bold emphasis, italics, hyperlinks, code snippets, blockquotes, and tables inline locally using JavaScript.
            </p>
          </div>
        </div>
      </section>
    </ModulePageWrapper>
  );
}
