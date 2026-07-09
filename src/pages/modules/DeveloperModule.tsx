import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';

const MODULE_COLOR_THEME = {
  accent: '#8b5cf6',
  bg: 'rgba(139, 92, 246, 0.08)',
};

// Filter developer tools
const devTools = TOOLS.filter((t) => t.module === 'developer');

const FORMATTER_TOOLS = devTools.filter((t) =>
  ['json-formatter', 'sql-formatter', 'xml-formatter', 'yaml-formatter'].includes(t.id)
);

const ENCODER_TOOLS = devTools.filter((t) =>
  ['base64', 'url-encoder', 'html-entities', 'hex-encoder'].includes(t.id)
);

const CRYPTO_TOOLS = devTools.filter((t) =>
  ['hash-generator', 'password-generator', 'uuid-generator', 'jwt-decoder', 'regex-tester'].includes(t.id)
);

const UTILITY_TOOLS = devTools.filter((t) =>
  ['timestamp-converter', 'color-picker', 'diff-checker', 'lorem-ipsum'].includes(t.id)
);

export default function DeveloperModule() {
  return (
    <>
      <Helmet>
        <title>Developer Utilities & Code Formatters | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based developer tools including JSON formatters, Base64 encoders, cryptographic hash generators, and JWT decoders."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Developer' }]} />

        {/* Hero Banner Header */}
        <ModuleHeader
          title="Developer Tools"
          description="Format raw JSON configurations, encode binary data, compute cryptographic checksum digests, generate cryptographically secure passwords, and parse epoch dates."
          icon={<CodeBracketIcon className="w-6 h-6" />}
          iconColorClass="text-purple-500"
          accentBgColor={MODULE_COLOR_THEME.bg}
          toolCount={devTools.length}
        />

        {/* Categories of Tools */}
        <div className="space-y-12">
          {/* Formatters */}
          {FORMATTER_TOOLS.length > 0 && (
            <section aria-labelledby="formatters-heading">
              <h2 id="formatters-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Code Formatters & Beautifiers
              </h2>
              <div className="tools-grid">
                {FORMATTER_TOOLS.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}

          {/* Encoders */}
          {ENCODER_TOOLS.length > 0 && (
            <section aria-labelledby="encoders-heading">
              <h2 id="encoders-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Data Encoders & Decoders
              </h2>
              <div className="tools-grid">
                {ENCODER_TOOLS.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}

          {/* Cryptography */}
          {CRYPTO_TOOLS.length > 0 && (
            <section aria-labelledby="crypto-heading">
              <h2 id="crypto-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Cryptography, Security & Generators
              </h2>
              <div className="tools-grid">
                {CRYPTO_TOOLS.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          )}

          {/* Utilities */}
          {UTILITY_TOOLS.length > 0 && (
            <section aria-labelledby="utilities-heading">
              <h2 id="utilities-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Daily Utilities & Conversions
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
              <h4 className="faq-question">Is my input code sent to any servers?</h4>
              <p className="faq-answer">
                No. All formatting, encoding, regular expressions testing, and hash calculation processes are executed locally using browser JavaScript and built-in Web APIs. No logs leave your machine.
              </p>
            </div>
            <div className="faq-card">
              <h4 className="faq-question">What is entropy in password strength?</h4>
              <p className="faq-answer">
                Entropy measures the mathematical unpredictability of a password. Higher character pools (mixing upper, lower, numbers, symbols) and longer lengths increase entropy exponentially, making passwords computationally impractical to brute force.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
