/* eslint-disable no-console */
// Pings IndexNow (Bing, Yandex, Seznam, Naver…) with every sitemap URL after a deploy.
import { readFileSync } from 'fs';
import { resolve } from 'path';

const KEY = 'f1ecea7a299e63eb9e30e2c68a2aa0c3';
const HOST = 'toolskyt.com';

async function main() {
  const xml = readFileSync(resolve('dist/sitemap.xml'), 'utf-8');
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status}`);
}

main().catch((e) => console.log('IndexNow skipped:', e instanceof Error ? e.message : e));
