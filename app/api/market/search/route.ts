import { NextRequest, NextResponse } from 'next/server';
import type { MarketAssetType, MarketSearchResult } from '@/lib/market/types';
import { defaultFxSearchResults, normalizeFxSymbol } from '@/lib/market/providers/fxProvider';
import { defaultMetalSearchResults, normalizeMetalSymbol } from '@/lib/market/providers/metalProvider';
import {
  assetTypeToStockMarket,
  detectStockMarkets,
  normalizeStockSymbol,
} from '@/lib/market/providers/stockMarketProvider';
import { stockSearchResult } from '@/lib/market/providers/jacksuStockAdapter';

export const dynamic = 'force-dynamic';

const supportedAssetTypes: MarketAssetType[] = ['tw_stock', 'us_stock', 'fx', 'metal'];
const YAHOO_SEARCH_URL = 'https://query1.finance.yahoo.com/v1/finance/search';
const TWSE_COMPANIES_URL = 'https://openapi.twse.com.tw/v1/opendata/t187ap03_L';
const TPEX_COMPANIES_URL = 'https://www.tpex.org.tw/openapi/v1/mopsfin_t187ap03_O';

type YahooSearchQuote = {
  symbol?: string;
  shortname?: string;
  longname?: string;
  exchDisp?: string;
  exchange?: string;
  quoteType?: string;
};

type YahooSearchResponse = {
  quotes?: YahooSearchQuote[];
};

type TwCompany = {
  symbol: string;
  name: string;
  fullName: string;
  englishName: string;
  exchange: string;
};

function normalizedSearchText(value: string) {
  return value.trim().toLocaleLowerCase('zh-TW').replace(/[\s._-]+/g, '');
}

async function fetchTaiwanCompanies() {
  try {
    const [listedResponse, otcResponse] = await Promise.all([
      fetch(TWSE_COMPANIES_URL, { next: { revalidate: 86_400 } }),
      fetch(TPEX_COMPANIES_URL, { next: { revalidate: 86_400 } }),
    ]);
    const [listed, otc] = await Promise.all([
      listedResponse.ok ? listedResponse.json() as Promise<Record<string, string>[]> : Promise.resolve([]),
      otcResponse.ok ? otcResponse.json() as Promise<Record<string, string>[]> : Promise.resolve([]),
    ]);

    return [
      ...listed.map<TwCompany>((company) => ({
        symbol: company['公司代號']?.trim(),
        name: company['公司簡稱']?.trim(),
        fullName: company['公司名稱']?.trim(),
        englishName: company['英文簡稱']?.trim(),
        exchange: '上市',
      })),
      ...otc.map<TwCompany>((company) => ({
        symbol: company.SecuritiesCompanyCode?.trim(),
        name: company.CompanyAbbreviation?.trim(),
        fullName: company.CompanyName?.trim(),
        englishName: company.Symbol?.trim(),
        exchange: '上櫃',
      })),
    ].filter((company) => company.symbol && company.name);
  } catch {
    return [];
  }
}

async function searchTaiwanCompanies(query: string) {
  const needle = normalizedSearchText(query);
  if (!needle) return [];
  const companies = await fetchTaiwanCompanies();

  return companies
    .flatMap((company) => {
      const fields = [company.symbol, company.name, company.fullName, company.englishName].map(normalizedSearchText);
      const exactIndex = fields.findIndex((field) => field === needle);
      const prefixIndex = fields.findIndex((field) => field.startsWith(needle));
      const includesIndex = fields.findIndex((field) => field.includes(needle));
      if (includesIndex < 0) return [];
      const score = exactIndex >= 0 ? 0 : prefixIndex >= 0 ? 1 : 2;
      return [{ company, score }];
    })
    .sort((first, second) => first.score - second.score || first.company.symbol.localeCompare(second.company.symbol))
    .slice(0, 8)
    .map(({ company }) => ({
      ...stockSearchResult(company.symbol, '台股'),
      displayName: company.name,
      description: `${company.exchange} · ${company.fullName}${company.englishName ? ` · ${company.englishName}` : ''}`,
    }));
}

function parseAssetType(value: string | null): MarketAssetType | undefined {
  if (!value) return undefined;
  return supportedAssetTypes.includes(value as MarketAssetType) ? (value as MarketAssetType) : undefined;
}

function yahooResultAssetType(symbol: string): MarketAssetType | null {
  if (/\.(TW|TWO)$/i.test(symbol)) return 'tw_stock';
  return 'us_stock';
}

function normalizeYahooSymbol(symbol: string, assetType: MarketAssetType) {
  const normalized = symbol.trim().toUpperCase();
  if (assetType === 'tw_stock') return normalized.replace(/\.(TW|TWO)$/i, '');
  return normalized.replace(/\./g, '-');
}

function yahooQuoteToSearchResult(quote: YahooSearchQuote): MarketSearchResult | null {
  const symbol = quote.symbol?.trim();
  if (!symbol || quote.quoteType !== 'EQUITY') return null;

  const assetType = yahooResultAssetType(symbol);
  if (!assetType) return null;

  const normalizedSymbol = normalizeYahooSymbol(symbol, assetType);
  const market = assetTypeToStockMarket(assetType);
  if (!market) return null;

  const base = stockSearchResult(normalizedSymbol, market);

  return {
    ...base,
    displayName: quote.longname || quote.shortname || base.displayName,
    description: quote.exchDisp || quote.exchange || base.description,
  };
}

async function searchYahoo(query: string, assetType?: MarketAssetType) {
  if (!query || assetType === 'fx') return [];

  const url = new URL(YAHOO_SEARCH_URL);
  url.searchParams.set('q', query);
  url.searchParams.set('quotesCount', '12');
  url.searchParams.set('newsCount', '0');
  url.searchParams.set('enableFuzzyQuery', 'true');
  url.searchParams.set('lang', 'zh-TW');
  url.searchParams.set('region', 'TW');

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        accept: 'application/json',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
      },
    });

    if (!response.ok) return [];

    const payload = (await response.json()) as YahooSearchResponse;
    return (payload.quotes || [])
      .map(yahooQuoteToSearchResult)
      .filter((result): result is MarketSearchResult => Boolean(result))
      .filter((result) => !assetType || result.assetType === assetType)
      .slice(0, 8);
  } catch {
    return [];
  }
}

function uniqueResults(results: MarketSearchResult[]) {
  const seen = new Set<string>();
  return results.filter((result) => {
    if (seen.has(result.assetId)) return false;
    seen.add(result.assetId);
    return true;
  });
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query')?.trim() || '';
  const assetType = parseAssetType(request.nextUrl.searchParams.get('assetType'));
  const results: MarketSearchResult[] = [];

  if (!query && assetType !== 'fx' && assetType !== 'metal') {
    return NextResponse.json({ success: true, data: results });
  }

  if (!assetType || assetType === 'fx') {
    const normalizedQuery = normalizeFxSymbol(query);
    results.push(
      ...defaultFxSearchResults().filter((item) => {
        if (!query) return true;
        return item.symbol.includes(normalizedQuery) || item.displayName.includes(query);
      }),
    );
  }

  if (!assetType || assetType === 'metal') {
    const normalizedQuery = normalizeMetalSymbol(query);
    const exactMetalMatch = normalizedQuery === 'GOLD/TWD' || normalizedQuery === 'PLATINUM/TWD';
    results.push(
      ...defaultMetalSearchResults().filter((item) => {
        if (!query) return true;
        if (exactMetalMatch) return item.symbol === normalizedQuery;
        return item.symbol.includes(normalizedQuery) || item.displayName.includes(query);
      }),
    );
  }

  if (!assetType || assetType === 'tw_stock' || assetType === 'us_stock') {
    if (!assetType || assetType === 'tw_stock') {
      results.push(...await searchTaiwanCompanies(query));
    }
    results.push(...await searchYahoo(query, assetType));

    const normalizedSymbol = normalizeStockSymbol(query);
    if (/^[A-Z0-9.-]+$/i.test(normalizedSymbol)) {
      const explicitMarket = assetType ? assetTypeToStockMarket(assetType) : null;
      const markets = explicitMarket ? [explicitMarket] : detectStockMarkets(normalizedSymbol);
      results.push(...markets.map((market) => stockSearchResult(normalizedSymbol, market)));
    }
  }

  return NextResponse.json({ success: true, data: uniqueResults(results) });
}
