import type { MarketSearchResult } from './types';

// A literal symbol candidate is only a fallback, never a company-name match.
export function selectMarketSearchResult(query: string, results: MarketSearchResult[]) {
  const normalized = query.trim().toUpperCase().replace(/\./g, '-');
  const verified = results.filter((result) => !result.description?.endsWith(' symbol candidate'));
  return verified.find((result) => result.symbol === normalized) || verified[0]
    || results.find((result) => result.symbol === normalized);
}
