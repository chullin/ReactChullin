import type { MarketSearchResult } from '../types';
import { stockSearchResult } from './jacksuStockAdapter';

let directoryCache: { text: string; expiresAt: number } | undefined;
let directoryRequest: Promise<string> | undefined;

const DIRECTORY_URL = 'https://www.nasdaqtrader.com/dynamic/SymDir/nasdaqtraded.txt';

// Explicit aliases avoid guessing arbitrary misspelled ticker symbols.
export function normalizeCompanyQuery(query: string) {
  return /^(nvdia|輝達)$/i.test(query.trim()) ? 'NVIDIA' : query.trim();
}

export function searchUsSymbolDirectory(text: string, query: string): MarketSearchResult[] {
  const needle = normalizeCompanyQuery(query).toLowerCase();
  if (!needle) return [];
  const [header, ...lines] = text.split(/\r?\n/);
  const columns = header.split('|');
  const index = (name: string) => columns.indexOf(name);
  return lines.flatMap((line) => {
    const row = line.split('|');
    const symbol = row[index('Symbol')];
    const name = row[index('Security Name')];
    if (row[index('Nasdaq Traded')] !== 'Y' || row[index('Test Issue')] !== 'N' || !symbol || !name) return [];
    const lowerName = name.toLowerCase();
    const exactSymbol = symbol.toLowerCase() === needle;
    if (!exactSymbol && !lowerName.includes(needle)) return [];
    return [{
      score: exactSymbol ? 0 : lowerName.startsWith(needle) ? 1 : 2,
      result: {
        ...stockSearchResult(symbol, '美股'),
        displayName: name.replace(/\s*-?\s*(Common Stock|Ordinary Shares).*$/i, '').trim(),
        description: `美股 · ${row[index('ETF')] === 'Y' ? 'ETF' : '股票'} · Nasdaq Trader`,
      },
    }];
  }).sort((a, b) => a.score - b.score || a.result.displayName.length - b.result.displayName.length)
    .slice(0, 8).map(({ result }) => result);
}

async function fetchDirectory() {
  if (directoryCache && directoryCache.expiresAt > Date.now()) return directoryCache.text;
  if (!directoryRequest) {
    directoryRequest = (async () => {
      const response = await fetch(DIRECTORY_URL, {
        next: { revalidate: 86_400 },
        signal: AbortSignal.timeout(5_000),
      });
      if (!response.ok) throw new Error('US symbol directory unavailable');
      const text = await response.text();
      if (!text.startsWith('Nasdaq Traded|Symbol|')) throw new Error('Invalid US symbol directory');
      directoryCache = { text, expiresAt: Date.now() + 86_400_000 };
      return text;
    })().finally(() => { directoryRequest = undefined; });
  }
  return directoryRequest;
}

export async function searchUsCompanies(query: string) {
  try {
    return searchUsSymbolDirectory(await fetchDirectory(), query);
  } catch {
    return directoryCache ? searchUsSymbolDirectory(directoryCache.text, query) : [];
  }
}
