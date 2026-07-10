import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TOOLS } from '@/config/tools';

interface ModulePageWrapperProps {
  moduleKey: string;
  moduleName: string;
  description: string;
  children: ReactNode;
}

export function ModulePageWrapper({
  moduleKey,
  moduleName,
  description,
  children,
}: ModulePageWrapperProps) {
  const moduleTools = TOOLS.filter((t) => t.module === moduleKey);

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
        item: `https://toolpilot.app/${moduleKey}`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${moduleName} Tools`,
    description,
    url: `https://toolpilot.app/${moduleKey}`,
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
        <link rel="canonical" href={`https://toolpilot.app/${moduleKey}`} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://toolpilot.app/${moduleKey}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

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
