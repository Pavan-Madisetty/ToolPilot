import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';
import { MODULES } from '@/config/modules';

interface ModulePageWrapperProps {
  moduleKey: string;
  moduleName: string;
  description: string;
  children: ReactNode;
}

import { useRuntimeConfig } from '@/context/RuntimeConfigContext';
import { FeatureFlags } from '@/types/runtimeConfig';

export function ModulePageWrapper({
  moduleKey,
  moduleName,
  description,
  children,
}: ModulePageWrapperProps) {
  const { config } = useRuntimeConfig();

  const flagMap: Record<string, keyof FeatureFlags> = {
    finance: 'financeTools',
    developer: 'developerTools',
    ai: 'aiTools',
  };

  const flagKey = flagMap[moduleKey];
  const isEnabled = flagKey ? config.featureFlags?.[flagKey] : true;

  const moduleTools = TOOLS.filter((t) => t.module === moduleKey);
  const moduleConfig = MODULES.find((m) => m.key === moduleKey);
  const moduleSlug = moduleConfig ? moduleConfig.slug : `/${moduleKey}`;

  if (!isEnabled) {
    return (
      <div className="container-app py-16 text-center">
        <Breadcrumb items={[{ label: moduleName }]} />
        <div
          className="py-20 text-center border rounded-2xl mt-8"
          style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
        >
          <div className="text-6xl mb-4" aria-hidden="true">
            🚧
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Category Under Construction
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            This category is temporarily disabled. Please check back later!
          </p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Structured Data Schema Generators
  // ─────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://toolpilot.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: moduleName,
        item: `https://toolpilot.app${moduleSlug}`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${moduleName} Tools`,
    description,
    url: `https://toolpilot.app${moduleSlug}`,
    about: {
      '@type': 'Thing',
      name: `${moduleName} Utilities`,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: moduleTools.map((tool, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: tool.name,
        url: `https://toolpilot.app${tool.slug}`,
      })),
    },
  };

  const title = `${moduleName} Tools — Free Browser Utilities | ToolPilot`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://toolpilot.app${moduleSlug}`} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://toolpilot.app${moduleSlug}`} />
        <meta property="og:image" content="https://toolpilot.app/og-image.png" />
        <meta property="og:site_name" content="ToolPilot" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://toolpilot.app/og-image.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: moduleName }]} />
        {children}
      </div>
    </>
  );
}
export default ModulePageWrapper;
