import { ToolCard } from '@/components/ui/ToolCard';
import { DollarSign } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

// Filter finance tools
const financeTools = TOOLS_BY_MODULE['finance'] || [];

const LOAN_TOOLS = financeTools.filter((t) =>
  ['emi-calculator', 'home-loan-calculator', 'car-loan-calculator', 'personal-loan-calculator', 'loan-eligibility-calculator', 'loan-comparison'].includes(t.id)
);

const INVESTMENT_TOOLS = financeTools.filter((t) =>
  ['sip-calculator', 'fd-calculator', 'rd-calculator', 'ppf-calculator', 'retirement-calculator', 'mutual-fund-calculator', 'compound-interest-calculator'].includes(t.id)
);

const TAX_TOOLS = financeTools.filter((t) =>
  ['gst-calculator', 'income-tax-calculator', 'salary-calculator', 'hra-calculator'].includes(t.id)
);

const UTILITY_TOOLS = financeTools.filter((t) =>
  ['currency-converter', 'tip-calculator', 'bill-splitter', 'expense-tracker'].includes(t.id)
);

export default function FinanceModule() {
  return (
    <ModulePageWrapper
      moduleKey="finance"
      moduleName="Finance"
      description="Access free browser-based finance tools including EMI calculators, SIP growth planners, GST tax tools, and compounding interest calculators."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="finance"
        title="Finance Tools"
        description="Perform complex mortgage calculations, project investment portfolios, compute direct and indirect tax amounts, and split restaurant checks instantly in your browser."
        icon={<DollarSign size={24} strokeWidth={2} />}
        toolCount={financeTools.length}
      />

      {/* Categories of Tools */}
      <div className="space-y-12">
        {/* Loans & EMI */}
        {LOAN_TOOLS.length > 0 && (
          <section aria-labelledby="loans-heading">
            <h2 id="loans-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Loans & EMI Calculators
            </h2>
            <div className="tools-grid">
              {LOAN_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Investment */}
        {INVESTMENT_TOOLS.length > 0 && (
          <section aria-labelledby="investments-heading">
            <h2 id="investments-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Investment & Growth Planners
            </h2>
            <div className="tools-grid">
              {INVESTMENT_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Taxes */}
        {TAX_TOOLS.length > 0 && (
          <section aria-labelledby="taxes-heading">
            <h2 id="taxes-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Tax & Salary Calculators
            </h2>
            <div className="tools-grid">
              {TAX_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Utilities */}
        {UTILITY_TOOLS.length > 0 && (
          <section aria-labelledby="utilities-heading">
            <h2 id="utilities-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              General Financial Utilities
            </h2>
            <div className="tools-grid">
              {UTILITY_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}
      </div>
    </ModulePageWrapper>
  );
}
