/**
 * Staging switch for this preview.
 * true  → every page is noindex, and the built robots.txt disallows crawling.
 * false → pages may be indexed and robots.txt allows crawling.
 * Canonical links always point at the live production domain.
 */
export const previewNoIndex = true;

export const productionOrigin = 'https://fearlesstattoos.com';

export const siteName = 'Fearless Tattoos';

export const previewOrigin = 'https://ryancolclough.github.io';
