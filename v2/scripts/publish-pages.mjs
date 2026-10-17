import { cp, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

// Built files live next to the Astro source so GitHub Pages (repo root)
// serves them at /fearless/v2/ without a build step and without moving V1.
const generated = [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap-index.xml',
  'sitemap-0.xml',
  'favicon.ico',
  'favicon-32.png',
  'favicon-64.png',
  'apple-touch-icon.png',
  'grain.png',
  'hero-crest.webp',
  'assets',
  'og',
  'icons',
  'team',
  'book',
  'contact',
  'aftercare',
  'policies',
  'faq',
  'promotions',
  'cocobookings',
  'suryabookings',
  'tristanbookings',
  'emilliabookings',
  'annbookings',
];

for (const name of generated) {
  await rm(path.join(root, name), { recursive: true, force: true });
}

const entries = await readdir(dist);
for (const name of entries) {
  await cp(path.join(dist, name), path.join(root, name), { recursive: true });
}

console.log(`Published ${entries.length} top-level entries from dist/ into v2/ for GitHub Pages.`);
