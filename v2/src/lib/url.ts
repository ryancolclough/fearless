/** On-site booking links. Inbound utm_* values replace these in the browser. */
export const onsiteUtm = 'utm_source=website&utm_medium=onsite&utm_campaign=evergreen';

export function href(path: string, search = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const hashAt = path.indexOf('#');
  const hash = hashAt >= 0 ? path.slice(hashAt) : '';
  const before = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const pathname =
    before === '' || before === '/'
      ? `${base}/`
      : `${base}${before.startsWith('/') ? before : `/${before}`}${before.endsWith('/') ? '' : '/'}`;
  const query = search ? (search.startsWith('?') ? search : `?${search}`) : '';
  return `${pathname}${query}${hash}`;
}

export function bookHref(path: string, extra = ''): string {
  const query = extra ? `${onsiteUtm}&${extra}` : onsiteUtm;
  return href(path, query);
}
