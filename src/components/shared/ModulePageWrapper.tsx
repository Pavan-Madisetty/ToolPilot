import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS, isComingSoon } from '@/config/tools';
import { MODULES } from '@/config/modules';
import { moduleTitle, moduleUrl, breadcrumbSchema as buildBreadcrumb, collectionSchema as buildCollection, SITE_URL } from '@/utils/seo';

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

  const moduleTools = TOOLS.filter((t) => t.module === moduleKey && !isComingSoon(t.id));
  const moduleConfig = MODULES.find((m) => m.key === moduleKey);
  const moduleSlug = moduleConfig ? moduleConfig.slug : `/${moduleKey}`;

  if (!isEnabled) {
    return (
      <div className="sk-container py-16 text-center">
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
  const url = moduleUrl(moduleSlug);
  const breadcrumbSchema = buildBreadcrumb([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: moduleName, url },
  ]);
  const collectionSchema = buildCollection({ name: moduleName, description, url, tools: moduleTools });
  const title = moduleTitle(moduleName);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <div className="sk-container sk-modpage">
        <Breadcrumb items={[{ label: moduleName }]} />
        {children}
      </div>
    </>
  );
}
export default ModulePageWrapper;
