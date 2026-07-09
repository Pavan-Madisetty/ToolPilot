import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';

const MODULE_COLOR_THEME = {
  accent: '#10b981',
  bg: 'rgba(16, 185, 129, 0.08)',
};

// Filter finance tools
const financeTools = TOOLS.filter((t) => t.module === 'finance');

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
    <>
      <Helmet>
        <title>Finance Calculators & Planning Tools | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based finance tools including EMI calculators, SIP growth planners, GST tax tools, and compounding interest calculators."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Finance' }]} />

        {/* Hero Banner Header */}
        <ModuleHeader
          title="Finance Tools"
          description="Perform complex mortgage calculations, project investment portfolios, compute direct and indirect tax amounts, and split restaurant checks instantly in your browser."
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
          iconColorClass="text-emerald-500"
          accentBgColor={MODULE_COLOR_THEME.bg}
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

          {/* Investments */}
          {INVESTMENT_TOOLS.length > 0 && (
            <section aria-labelledby="investments-heading">
              <h2 id="investments-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Investments & Savings Planners
              </h2>
              <div className="tools-grid">
                {INVESTMENT_TOOLS.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}

          {/* Tax & Salaries */}
          {TAX_TOOLS.length > 0 && (
            <section aria-labelledby="tax-heading">
              <h2 id="tax-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Taxes & Salary Breakdown Utilities
              </h2>
              <div className="tools-grid">
                {TAX_TOOLS.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}

          {/* Billing Utilities */}
          {UTILITY_TOOLS.length > 0 && (
            <section aria-labelledby="utilities-heading">
              <h2 id="utilities-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Daily Expenses & Billing Splitters
              </h2>
              <div className="tools-grid">
                {UTILITY_TOOLS.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* FAQs */}
        <section className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border-default)' }} aria-labelledby="faq-heading">
          <h3 id="faq-heading" className="text-lg font-bold mb-6">Frequently Asked Questions</h3>
          <div className="max-w-3xl">
            <div className="faq-card">
              <h4 className="faq-question">Is my financial data secure?</h4>
              <p className="faq-answer">
                Yes, absolutely. ToolPilot processes all financial computations entirely client-side. No inputs, interest rate quotes, or principal values are ever transmitted to external servers.
              </p>
            </div>
            <div className="faq-card">
              <h4 className="faq-question">What is an amortization schedule?</h4>
              <p className="faq-answer">
                An amortization schedule is a complete table detailing each periodic payment on an amortizing loan. It shows the amount of interest and principal component applied to each payment, alongside the outstanding balance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
