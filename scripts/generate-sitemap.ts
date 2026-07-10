/* eslint-disable no-console */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { TOOLS } from '../src/config/tools';
import { MODULES } from '../src/config/modules';

const DOMAIN = 'https://toolpilot.app';

function generateSitemap() {
  console.log('Generating sitemap.xml...');

  const pages = [
    { loc: `${DOMAIN}/`, changefreq: 'daily', priority: '1.0' }
  ];

  // Category/Module pages
  for (const mod of MODULES) {
    pages.push({
      loc: `${DOMAIN}/${mod.key}`,
      changefreq: 'weekly',
      priority: '0.8'
    });
  }

  // Tool pages
  for (const tool of TOOLS) {
    pages.push({
      loc: `${DOMAIN}${tool.slug}`,
      changefreq: 'weekly',
      priority: '0.7'
    });
  }

  const xmlItems = pages.map(page => `
  <url>
    <loc>${page.loc}</loc>
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
