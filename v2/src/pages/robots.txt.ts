import type { APIRoute } from 'astro';
import { previewNoIndex } from '../config';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = previewNoIndex
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n\nSitemap: https://fearlesstattoos.com/sitemap-index.xml\n';
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
