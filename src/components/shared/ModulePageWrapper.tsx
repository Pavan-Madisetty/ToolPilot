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
        <div className="py-20 text-center border border-border-default bg-bg-elevated rounded-2xl mt-8">
          <div className="text-6xl mb-4" aria-hidden="true">
            🚧
          </div>
          <h2 className="text-xl font-bold mb-2 text-text-primary">
            Category Under Construction
          </h2>
          <p className="text-sm max-w-md mx-auto text-text-secondary">
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
        item: 'https://toolskyt.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: moduleName,
        item: `https://toolskyt.com${moduleSlug}`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${moduleName} Tools`,
    description,
    url: `https://toolskyt.com${moduleSlug}`,
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
        url: `https://toolskyt.com${tool.slug}`,
      })),
    },
  };

  const title = `${moduleName} Tools — Free Browser Utilities | Toolskyt`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://toolskyt.com${moduleSlug}`} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://toolskyt.com${moduleSlug}`} />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <div className="container-app py-8">
        <div className="mb-6">
          <Breadcrumb items={[{ label: moduleName }]} />
        </div>
        {children}
      </div>
    </>
  );
}
export default ModulePageWrapper;
