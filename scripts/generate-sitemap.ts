/* eslint-disable no-console */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { TOOLS, isComingSoon } from '../src/config/tools';
import { MODULES } from '../src/config/modules';

const DOMAIN = 'https://toolpilot.app';

function generateSitemap() {
  console.log('Generating sitemap.xml...');

  const today = new Date().toISOString().split('T')[0];

  const pages = [
    { loc: `${DOMAIN}/`, changefreq: 'daily', priority: '1.0', lastmod: today },
    // Company / static pages
    { loc: `${DOMAIN}/about`, changefreq: 'monthly', priority: '0.5', lastmod: today },
    { loc: `${DOMAIN}/blog`, changefreq: 'weekly', priority: '0.6', lastmod: today },
    { loc: `${DOMAIN}/privacy`, changefreq: 'yearly', priority: '0.3', lastmod: today },
    { loc: `${DOMAIN}/terms`, changefreq: 'yearly', priority: '0.3', lastmod: today },
    { loc: `${DOMAIN}/contact`, changefreq: 'monthly', priority: '0.4', lastmod: today }
  ];

  // Category/Module pages
  for (const mod of MODULES) {
    pages.push({
      loc: `${DOMAIN}/${mod.key}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: today
    });
  }

  // Tool pages — skip "coming soon" placeholders (they are noindex'd,
  // so keep them out of the sitemap to send a consistent SEO signal).
  for (const tool of TOOLS) {
    if (isComingSoon(tool.id)) continue;
    pages.push({
      loc: `${DOMAIN}${tool.slug}`,
      changefreq: 'weekly',
      priority: '0.7',
      lastmod: today
    });
  }

  const xmlItems = pages.map(page => `
  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>
`;

  // Ensure public directory exists
  if (!existsSync(resolve('public'))) {
    mkdirSync(resolve('public'));
  }

  // Write to public/sitemap.xml
  writeFileSync(resolve('public/sitemap.xml'), xmlContent.trim(), 'utf-8');
  console.log('Successfully generated public/sitemap.xml');

  // If dist/ exists, write to dist/sitemap.xml as well
  if (existsSync(resolve('dist'))) {
    writeFileSync(resolve('dist/sitemap.xml'), xmlContent.trim(), 'utf-8');
    console.log('Successfully generated dist/sitemap.xml');
  }
}

generateSitemap();
