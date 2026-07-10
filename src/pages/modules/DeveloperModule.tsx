import { ToolCard } from '@/components/ui/ToolCard';
import { Code } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

// Filter developer tools
const devTools = TOOLS_BY_MODULE['developer'] || [];

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
  ['timestamp-converter', 'color-picker', 'diff-checker', 'lorem-ipsum', 'gradient-generator', 'cron-builder', 'markdown-preview'].includes(t.id)
);

export default function DeveloperModule() {
  return (
    <ModulePageWrapper
      moduleKey="developer"
      moduleName="Developer"
      description="Access free browser-based developer tools including JSON formatters, Base64 encoders, cryptographic hash generators, and JWT decoders."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="developer"
        title="Developer Tools"
        description="Format raw JSON configurations, encode binary data, compute cryptographic checksum digests, generate cryptographically secure passwords, and parse epoch dates."
        icon={<Code size={24} strokeWidth={2} />}
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
              Encoders, Decoders & Parsers
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
              Cryptography & Security Utilities
            </h2>
            <div className="tools-grid">
              {CRYPTO_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* General Utilities */}
        {UTILITY_TOOLS.length > 0 && (
          <section aria-labelledby="utilities-heading">
            <h2 id="utilities-heading" className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              General Developer Utilities
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
