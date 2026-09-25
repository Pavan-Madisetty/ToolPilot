/* eslint-disable no-console */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { TOOLS, isComingSoon } from '../src/config/tools';
import { MODULES } from '../src/config/modules';
import { SITE_URL, moduleUrl } from '../src/utils/seo';

/** lastmod = date of the latest commit (stable between builds), falling back to today. */
function lastmod(): string {
  try {
    const d = execSync('git log -1 --format=%cs', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch {
    /* not a git checkout */
  }
  return new Date().toISOString().split('T')[0];
}

function generateSitemap() {
  const mod = lastmod();
  // Canonical URLs only, matching <link rel="canonical"> on each page.
  const urls: string[] = [
    `${SITE_URL}/`,
    `${SITE_URL}/all-tools`,
    ...MODULES.map((m) => moduleUrl(m.slug)),
    ...TOOLS.filter((t) => !isComingSoon(t.id)).map((t) => `${SITE_URL}${t.slug}`),
    `${SITE_URL}/about`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/privacy`,
    `${SITE_URL}/terms`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${mod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;

  if (!existsSync(resolve('public'))) mkdirSync(resolve('public'));
  writeFileSync(resolve('public/sitemap.xml'), xml, 'utf-8');
  if (existsSync(resolve('dist'))) writeFileSync(resolve('dist/sitemap.xml'), xml, 'utf-8');
  // llms.txt — concise, crawlable index for AI assistants / answer engines.
  const llms = [
    '# Toolskyt',
    '',
    '> Free online tools that run entirely in your browser: finance calculators, PDF and image tools, developer utilities, converters and more. No sign-up, no uploads, no tracking.',
    '',
    `- [All tools](${SITE_URL}/all-tools): full A–Z directory`,
    '',
    ...MODULES.flatMap((m) => [
      `## ${m.name}`,
      '',
      ...TOOLS.filter((t) => t.module === m.key && !isComingSoon(t.id)).map(
        (t) => `- [${t.name}](${SITE_URL}${t.slug}): ${t.description}`
      ),
      '',
    ]),
  ].join('\n');
  writeFileSync(resolve('public/llms.txt'), llms, 'utf-8');
  if (existsSync(resolve('dist'))) writeFileSync(resolve('dist/llms.txt'), llms, 'utf-8');

  console.log(`Sitemap: ${urls.length} URLs (lastmod ${mod})`);
}

generateSitemap();
