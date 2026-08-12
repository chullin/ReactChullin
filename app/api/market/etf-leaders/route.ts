import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TWSE_ETF_URL = 'https://www.twse.com.tw/zh/ETFortune-institute/ajaxProducts';

type TwseEtfRow = {
  stockNo?: string;
  stockName?: string;
  listingDate?: string;
  indexName?: string;
  totalAv?: string;
  close1?: string;
  holders?: string;
  issuer?: string;
  valueYTD?: string;
  volumeYTD?: string;
};

function numeric(value?: string) {
  const parsed = Number((value || '').replace(/[,\s]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function GET() {
  try {
    const response = await fetch(TWSE_ETF_URL, {
      next: { revalidate: 60 * 60 },
      headers: {
        accept: 'application/json',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
      },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`Upstream HTTP ${response.status}`);

    const payload = await response.json() as { status?: string; data?: TwseEtfRow[] };
    const data = (payload.data || [])
      .flatMap((row) => {
        const aum = numeric(row.totalAv);
        if (!row.stockNo || !row.stockName || !aum) return [];
        return [{
          symbol: row.stockNo,
          name: row.stockName,
          aum,
          price: numeric(row.close1),
          holders: numeric(row.holders),
          issuer: row.issuer || '',
          benchmark: row.indexName || '',
          listingDate: row.listingDate || '',
          averageValue: numeric(row.valueYTD),
          averageVolume: numeric(row.volumeYTD),
          holdingsChangeSupported: row.stockNo === '006208',
        }];
      })
      .sort((first, second) => second.aum - first.aum)
      .slice(0, 100)
      .map((row, index) => ({ ...row, rank: index + 1 }));

    return NextResponse.json({
      success: true,
      data,
      updatedAt: new Date().toISOString(),
      sourceName: '臺灣證券交易所 ETF Screener',
      sourceUrl: 'https://www.twse.com.tw/zh/ETFortune-institute/products',
      rankingBasis: '基金規模（AUM）',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '暫時無法取得 ETF 前 100 排行' },
      { status: 502 },
    );
  }
}
