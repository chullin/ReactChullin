'use client';

import { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRightLeft,
  BadgeDollarSign,
  Building2,
  Calculator,
  CircleDollarSign,
  Info,
  Landmark,
  Percent,
  ReceiptText,
  RotateCcw,
  TrendingDown,
} from 'lucide-react';

type BrokerId = 'cathay' | 'fubon' | 'union';
type Market = 'us' | 'tw';
type ProductType = 'etf' | 'stock';
type TradeMode = 'single' | 'recurring';
type TradeSide = 'buy' | 'sell' | 'sellThenBuyBack';
type FeeType = 'flat' | 'percent';

type Broker = {
  id: BrokerId;
  name: string;
  note: string;
};

type FeeModel = {
  buyFeeType: FeeType;
  buyFlat: number;
  buyRate: number;
  buyMinimum: number;
  sellFeeType: FeeType;
  sellFlat: number;
  sellRate: number;
  sellMinimum: number;
  sellLevyRate: number;
  sellTaxRate: number;
};

const BROKERS: Broker[] = [
  {
    id: 'cathay',
    name: '國泰證券',
    note: '美股 ETF 依 2026 官網優惠：買 USD 3、賣 USD 3，賣出另收 0.00206% 交易徵費。',
  },
  {
    id: 'fubon',
    name: '富邦證券',
    note: '富邦美股定期定額買進優惠 0.1% 至 2026/12/31；賣出與單筆複委託常依原費率或個人議價，請可自行調整。',
  },
  {
    id: 'union',
    name: '聯邦證券',
    note: '預設提供可調整的常見試算值，實際複委託費率請以你的契約與營業員報價為準。',
  },
];

const STOCK_PRESETS = [
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', market: 'us' as const, productType: 'etf' as const, price: 520 },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', market: 'us' as const, productType: 'etf' as const, price: 560 },
  { symbol: 'AAPL', name: 'Apple', market: 'us' as const, productType: 'stock' as const, price: 220 },
  { symbol: '0050', name: '元大台灣 50', market: 'tw' as const, productType: 'etf' as const, price: 190 },
  { symbol: '2330', name: '台積電', market: 'tw' as const, productType: 'stock' as const, price: 1100 },
];

const CATHAY_US_ETF: FeeModel = {
  buyFeeType: 'flat',
  buyFlat: 3,
  buyRate: 0,
  buyMinimum: 0,
  sellFeeType: 'flat',
  sellFlat: 3,
  sellRate: 0,
  sellMinimum: 0,
  sellLevyRate: 0.00206,
  sellTaxRate: 0,
};

const DEFAULT_FX_RATE = 31.5;

function getDefaultFeeModel(brokerId: BrokerId, market: Market, productType: ProductType, tradeMode: TradeMode): FeeModel {
  if (market === 'tw') {
    const commissionRate = brokerId === 'cathay' ? 0.0399 : brokerId === 'fubon' ? 0.1425 : 0.1425;

    return {
      buyFeeType: 'percent',
      buyFlat: 0,
      buyRate: commissionRate,
      buyMinimum: 20,
      sellFeeType: 'percent',
      sellFlat: 0,
      sellRate: commissionRate,
      sellMinimum: 20,
      sellLevyRate: 0,
      sellTaxRate: productType === 'etf' ? 0.1 : 0.3,
    };
  }

  if (brokerId === 'cathay' && productType === 'etf') return CATHAY_US_ETF;

  if (brokerId === 'cathay' && tradeMode === 'recurring') {
    return {
      buyFeeType: 'flat',
      buyFlat: 0.1,
      buyRate: 0,
      buyMinimum: 0,
      sellFeeType: productType === 'etf' ? 'flat' : 'percent',
      sellFlat: productType === 'etf' ? 3 : 0,
      sellRate: productType === 'etf' ? 0 : 0.08,
      sellMinimum: 0,
      sellLevyRate: 0.00206,
      sellTaxRate: 0,
    };
  }

  if (brokerId === 'cathay') {
    return {
      buyFeeType: 'percent',
      buyFlat: 0,
      buyRate: 0.08,
      buyMinimum: 0,
      sellFeeType: 'percent',
      sellFlat: 0,
      sellRate: 0.08,
      sellMinimum: 0,
      sellLevyRate: 0.00206,
      sellTaxRate: 0,
    };
  }

  if (brokerId === 'fubon' && tradeMode === 'recurring') {
    return {
      buyFeeType: 'percent',
      buyFlat: 0,
      buyRate: 0.1,
      buyMinimum: 0,
      sellFeeType: 'percent',
      sellFlat: 0,
      sellRate: 0.25,
      sellMinimum: 0,
      sellLevyRate: 0.00206,
      sellTaxRate: 0,
    };
  }

  return {
    buyFeeType: 'percent',
    buyFlat: 0,
    buyRate: 0.25,
    buyMinimum: 0,
    sellFeeType: 'percent',
    sellFlat: 0,
    sellRate: 0.25,
    sellMinimum: 0,
    sellLevyRate: market === 'us' ? 0.00206 : 0,
    sellTaxRate: 0,
  };
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function parseNumber(value: string) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function formatMoney(value: number, currency: string, digits = 2) {
  return value.toLocaleString(currency === 'TWD' ? 'zh-TW' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatPlainMoney(value: number, currency: string) {
  return `${currency} ${value.toLocaleString(currency === 'TWD' ? 'zh-TW' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPercent(value: number) {
  return `${value.toFixed(3)}%`;
}

function calculateBrokerFee(notional: number, feeType: FeeType, flatFee: number, rate: number, minimum: number) {
  if (notional <= 0) return 0;
  const rawFee = feeType === 'flat' ? flatFee : notional * (rate / 100);
  return Math.max(rawFee, minimum);
}

function NumberInput({
  id,
  label,
  value,
  min = 0,
  step = '0.01',
  onChange,
  suffix,
}: {
  id: string;
  label: string;
  value: string;
  min?: number;
  step?: string;
  onChange: (value: string) => void;
  suffix?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className="mt-2 flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
        <input
          id={id}
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm font-semibold text-slate-900 outline-none"
        />
        {suffix && (
          <span className="flex shrink-0 items-center border-l border-slate-100 bg-slate-50 px-3 text-xs font-black text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function SelectField<TValue extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: TValue;
  options: { value: TValue; label: string }[];
  onChange: (value: TValue) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as TValue)}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-black uppercase text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-black tabular-nums text-slate-900">{value}</p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">{note}</p>
    </div>
  );
}

export default function TradingCostClient() {
  const [brokerId, setBrokerId] = useState<BrokerId>('cathay');
  const [market, setMarket] = useState<Market>('us');
  const [productType, setProductType] = useState<ProductType>('etf');
  const [tradeMode, setTradeMode] = useState<TradeMode>('single');
  const [tradeSide, setTradeSide] = useState<TradeSide>('sellThenBuyBack');
  const [symbol, setSymbol] = useState('QQQ');
  const [price, setPrice] = useState('520');
  const [quantity, setQuantity] = useState('192.3077');
  const [targetDrop, setTargetDrop] = useState('0.7');
  const [fxRate, setFxRate] = useState(String(DEFAULT_FX_RATE));
  const [feeModel, setFeeModel] = useState<FeeModel>(() => getDefaultFeeModel('cathay', 'us', 'etf', 'single'));

  const broker = BROKERS.find((item) => item.id === brokerId) ?? BROKERS[0];
  const currency = market === 'us' ? 'USD' : 'TWD';
  const priceNumber = parseNumber(price);
  const quantityNumber = parseNumber(quantity);
  const notional = Math.max(priceNumber * quantityNumber, 0);

  const result = useMemo(() => {
    const sellFee = calculateBrokerFee(
      notional,
      feeModel.sellFeeType,
      feeModel.sellFlat,
      feeModel.sellRate,
      feeModel.sellMinimum,
    );
    const buyFee = calculateBrokerFee(
      notional,
      feeModel.buyFeeType,
      feeModel.buyFlat,
      feeModel.buyRate,
      feeModel.buyMinimum,
    );
    const sellLevy = notional * (feeModel.sellLevyRate / 100);
    const sellTax = notional * (feeModel.sellTaxRate / 100);
    const totalSellCost = sellFee + sellLevy + sellTax;
    const totalBuyCost = buyFee;
    const roundTripCost = totalSellCost + totalBuyCost;
    const roundTripCostRate = notional > 0 ? (roundTripCost / notional) * 100 : 0;
    const sellNetProceeds = Math.max(notional - totalSellCost, 0);
    const breakEvenBuyBackPrice =
      quantityNumber > 0 ? Math.max((sellNetProceeds - totalBuyCost) / quantityNumber, 0) : 0;
    const requiredDropRate =
      priceNumber > 0 ? Math.max(((priceNumber - breakEvenBuyBackPrice) / priceNumber) * 100, 0) : 0;
    const targetBuyBackPrice = priceNumber * (1 - Math.max(parseNumber(targetDrop), 0) / 100);
    const buyBackNotional = targetBuyBackPrice * quantityNumber;
    const targetBuyFee = calculateBrokerFee(
      buyBackNotional,
      feeModel.buyFeeType,
      feeModel.buyFlat,
      feeModel.buyRate,
      feeModel.buyMinimum,
    );
    const targetNetGain = sellNetProceeds - buyBackNotional - targetBuyFee;

    return {
      buyFee,
      sellFee,
      sellLevy,
      sellTax,
      totalBuyCost,
      totalSellCost,
      roundTripCost,
      roundTripCostRate,
      sellNetProceeds,
      breakEvenBuyBackPrice,
      requiredDropRate,
      targetBuyBackPrice,
      targetNetGain,
    };
  }, [feeModel, notional, priceNumber, quantityNumber, targetDrop]);

  const twdAmount = currency === 'USD' ? notional * parseNumber(fxRate) : notional;
  const isCathayQqq = brokerId === 'cathay' && market === 'us' && productType === 'etf' && symbol.trim().toUpperCase() === 'QQQ';

  const applyDefaults = (nextBrokerId = brokerId, nextMarket = market, nextProductType = productType, nextTradeMode = tradeMode) => {
    setFeeModel(getDefaultFeeModel(nextBrokerId, nextMarket, nextProductType, nextTradeMode));
  };

  const handleBrokerChange = (value: BrokerId) => {
    setBrokerId(value);
    applyDefaults(value, market, productType, tradeMode);
  };

  const handleMarketChange = (value: Market) => {
    setMarket(value);
    const nextProduct = value === 'tw' && productType === 'stock' ? productType : productType;
    applyDefaults(brokerId, value, nextProduct, tradeMode);
  };

  const handleProductChange = (value: ProductType) => {
    setProductType(value);
    applyDefaults(brokerId, market, value, tradeMode);
  };

  const handleTradeModeChange = (value: TradeMode) => {
    setTradeMode(value);
    applyDefaults(brokerId, market, productType, value);
  };

  const handlePresetChange = (presetSymbol: string) => {
    const preset = STOCK_PRESETS.find((item) => item.symbol === presetSymbol);
    if (!preset) return;

    setSymbol(preset.symbol);
    setMarket(preset.market);
    setProductType(preset.productType);
    setPrice(String(preset.price));
    applyDefaults(brokerId, preset.market, preset.productType, tradeMode);
  };

  const setAmountToOneHundredThousand = () => {
    const nextPrice = Math.max(priceNumber, 1);
    const targetAmount = currency === 'USD' ? 100000 / Math.max(parseNumber(fxRate), 1) : 100000;
    setQuantity((targetAmount / nextPrice).toFixed(4));
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-black text-orange-700">
              <Calculator size={16} aria-hidden="true" />
              Trading Cost Calculator
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              交易成本與回補價位計算
            </h1>
            <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              選擇券商、市場、商品與交易方式後，試算買賣手續費、交易稅費，以及現在賣出後要等價格跌到哪裡，這次換手才開始有淨收益。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              label="本次成交金額"
              value={formatMoney(notional, currency)}
              note={currency === 'USD' ? `約 NT$ ${twdAmount.toLocaleString('zh-TW', { maximumFractionDigits: 0 })}` : '以台幣成交金額估算'}
            />
            <StatCard
              label="來回總成本"
              value={formatMoney(result.roundTripCost, currency)}
              note={`約占成交金額 ${formatPercent(result.roundTripCostRate)}`}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Building2 size={20} className="text-orange-600" aria-hidden="true" />
              <h2 className="text-lg font-black text-slate-900">交易條件</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <SelectField
                id="broker"
                label="證券公司"
                value={brokerId}
                options={BROKERS.map((item) => ({ value: item.id, label: item.name }))}
                onChange={handleBrokerChange}
              />
              <SelectField
                id="stock-preset"
                label="股票快速帶入"
                value={STOCK_PRESETS.some((item) => item.symbol === symbol) ? symbol : ''}
                options={[
                  { value: '', label: '自訂股票' },
                  ...STOCK_PRESETS.map((item) => ({ value: item.symbol, label: `${item.symbol} ${item.name}` })),
                ]}
                onChange={handlePresetChange}
              />
              <NumberInput id="price" label="現價" value={price} onChange={setPrice} suffix={currency} />
              <div className="grid grid-cols-2 gap-3">
                <SelectField
                  id="market"
                  label="市場"
                  value={market}
                  options={[
                    { value: 'us', label: '美股' },
                    { value: 'tw', label: '台股' },
                  ]}
                  onChange={handleMarketChange}
                />
                <SelectField
                  id="product-type"
                  label="商品"
                  value={productType}
                  options={[
                    { value: 'etf', label: 'ETF' },
                    { value: 'stock', label: '股票' },
                  ]}
                  onChange={handleProductChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <SelectField
                  id="trade-mode"
                  label="方式"
                  value={tradeMode}
                  options={[
                    { value: 'single', label: '單筆買賣' },
                    { value: 'recurring', label: '定期定額' },
                  ]}
                  onChange={handleTradeModeChange}
                />
                <SelectField
                  id="trade-side"
                  label="情境"
                  value={tradeSide}
                  options={[
                    { value: 'sellThenBuyBack', label: '賣出後回補' },
                    { value: 'buy', label: '只買進' },
                    { value: 'sell', label: '只賣出' },
                  ]}
                  onChange={setTradeSide}
                />
              </div>
              <NumberInput id="quantity" label="交易數量" value={quantity} onChange={setQuantity} suffix="股" step="0.0001" />
              {market === 'us' && (
                <NumberInput id="fx-rate" label="美元兌台幣估算匯率" value={fxRate} onChange={setFxRate} suffix="TWD" />
              )}
              <div>
                <label htmlFor="symbol" className="text-sm font-bold text-slate-700">
                  股票代號
                </label>
                <input
                  id="symbol"
                  value={symbol}
                  onChange={(event) => setSymbol(event.target.value.toUpperCase())}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
              <button
                type="button"
                onClick={setAmountToOneHundredThousand}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 text-sm font-black text-orange-700 transition hover:bg-orange-100"
              >
                <CircleDollarSign size={17} aria-hidden="true" />
                以 10 萬台幣反推數量
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Percent size={20} className="text-orange-600" aria-hidden="true" />
                <h2 className="text-lg font-black text-slate-900">費率設定</h2>
              </div>
              <button
                type="button"
                onClick={() => applyDefaults()}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-black text-slate-600 transition hover:bg-slate-50"
              >
                <RotateCcw size={14} aria-hidden="true" />
                重設
              </button>
            </div>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{broker.note}</p>

            <div className="mt-5 grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <SelectField
                  id="buy-fee-type"
                  label="買進手續費"
                  value={feeModel.buyFeeType}
                  options={[
                    { value: 'flat', label: '固定金額' },
                    { value: 'percent', label: '百分比' },
                  ]}
                  onChange={(value) => setFeeModel((current) => ({ ...current, buyFeeType: value }))}
                />
                <NumberInput
                  id="buy-fee"
                  label={feeModel.buyFeeType === 'flat' ? '買進固定費' : '買進費率'}
                  value={String(feeModel.buyFeeType === 'flat' ? feeModel.buyFlat : feeModel.buyRate)}
                  onChange={(value) =>
                    setFeeModel((current) => ({
                      ...current,
                      ...(current.buyFeeType === 'flat' ? { buyFlat: parseNumber(value) } : { buyRate: parseNumber(value) }),
                    }))
                  }
                  suffix={feeModel.buyFeeType === 'flat' ? currency : '%'}
                  step="0.0001"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <SelectField
                  id="sell-fee-type"
                  label="賣出手續費"
                  value={feeModel.sellFeeType}
                  options={[
                    { value: 'flat', label: '固定金額' },
                    { value: 'percent', label: '百分比' },
                  ]}
                  onChange={(value) => setFeeModel((current) => ({ ...current, sellFeeType: value }))}
                />
                <NumberInput
                  id="sell-fee"
                  label={feeModel.sellFeeType === 'flat' ? '賣出固定費' : '賣出費率'}
                  value={String(feeModel.sellFeeType === 'flat' ? feeModel.sellFlat : feeModel.sellRate)}
                  onChange={(value) =>
                    setFeeModel((current) => ({
                      ...current,
                      ...(current.sellFeeType === 'flat' ? { sellFlat: parseNumber(value) } : { sellRate: parseNumber(value) }),
                    }))
                  }
                  suffix={feeModel.sellFeeType === 'flat' ? currency : '%'}
                  step="0.0001"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <NumberInput
                  id="sell-levy"
                  label="賣出交易徵費"
                  value={String(feeModel.sellLevyRate)}
                  onChange={(value) => setFeeModel((current) => ({ ...current, sellLevyRate: parseNumber(value) }))}
                  suffix="%"
                  step="0.00001"
                />
                <NumberInput
                  id="sell-tax"
                  label="賣出交易稅"
                  value={String(feeModel.sellTaxRate)}
                  onChange={(value) => setFeeModel((current) => ({ ...current, sellTaxRate: parseNumber(value) }))}
                  suffix="%"
                  step="0.0001"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase text-orange-600">{symbol || '自訂標的'}</p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">試算結果</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                <Landmark size={14} aria-hidden="true" />
                {broker.name} / {market === 'us' ? '美股' : '台股'} / {productType === 'etf' ? 'ETF' : '股票'}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="買進成本" value={formatMoney(result.totalBuyCost, currency)} note="買進手續費估算" />
              <StatCard label="賣出成本" value={formatMoney(result.totalSellCost, currency)} note="含賣出手續費、交易徵費與交易稅" />
              <StatCard label="賣出淨入帳" value={formatMoney(result.sellNetProceeds, currency)} note="成交金額扣除賣出成本" />
              <StatCard label="成本率" value={formatPercent(result.roundTripCostRate)} note="以先賣後買同股數估算" />
            </div>

            {tradeSide === 'sellThenBuyBack' && (
              <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-white p-2 text-emerald-700 shadow-sm">
                    <TrendingDown size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase text-emerald-700">Break-even pullback</p>
                    <h3 className="mt-1 text-2xl font-black text-emerald-950">
                      至少跌到 {formatPlainMoney(result.breakEvenBuyBackPrice, currency)}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-emerald-800">
                      以同股數買回估算，現價需要回檔至少 {formatPercent(result.requiredDropRate)}，扣掉賣出與買回成本後才開始有淨收益。
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2">
                  <ArrowDownRight size={20} className="text-rose-600" aria-hidden="true" />
                  <h3 className="font-black text-slate-900">假設回檔幅度</h3>
                </div>
                <div className="mt-4">
                  <NumberInput id="target-drop" label="預期回檔" value={targetDrop} onChange={setTargetDrop} suffix="%" />
                </div>
                <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-sm font-bold text-slate-500">回補價格</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-slate-900">
                    {formatPlainMoney(result.targetBuyBackPrice, currency)}
                  </p>
                  <p className={`mt-2 text-sm font-black ${result.targetNetGain > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    淨效果 {formatMoney(result.targetNetGain, currency)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2">
                  <ReceiptText size={20} className="text-orange-600" aria-hidden="true" />
                  <h3 className="font-black text-slate-900">成本明細</h3>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  {[
                    ['買進手續費', result.buyFee],
                    ['賣出手續費', result.sellFee],
                    ['賣出交易徵費', result.sellLevy],
                    ['賣出交易稅', result.sellTax],
                    ['來回合計', result.roundTripCost],
                  ].map(([label, value]) => (
                    <div key={label as string} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <span className="font-bold text-slate-500">{label}</span>
                      <span className="font-black tabular-nums text-slate-900">{formatMoney(value as number, currency)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <ArrowRightLeft size={20} className="text-orange-600" aria-hidden="true" />
              <h2 className="text-lg font-black text-slate-900">QQQ 10 萬元情境</h2>
            </div>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
              若用國泰複委託交易 QQQ，且成交金額約 NT$ 100,000，頁面會以 USD 3 買進、USD 3 賣出與 0.00206% 賣出交易徵費估算。
              如果你自行用 0.7% 當保守總成本門檻，代表價格至少要回檔超過 0.7%，這次賣出再買回才比較有意義。
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-black text-slate-400">目前套用</p>
                <p className="mt-1 font-black text-slate-900">{isCathayQqq ? '國泰 QQQ 費率' : '自訂或其他券商費率'}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-black text-slate-400">你的試算門檻</p>
                <p className="mt-1 font-black text-slate-900">{formatPercent(result.requiredDropRate)}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-black text-slate-400">0.7% 參考價</p>
                <p className="mt-1 font-black text-slate-900">{formatPlainMoney(priceNumber * 0.993, currency)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <Info size={20} className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
              <div className="text-sm font-medium leading-7 text-amber-900">
                <p className="font-black">費率來源與提醒</p>
                <p>
                  國泰美股 ETF 依國泰證券收費頁與美股交易資訊頁；美股交易徵費可能依 SEC 調整。富邦公開頁顯示美股定期定額買進 0.1% 優惠至 2026/12/31，其他複委託費率常受活動與個人約定影響。
                  此工具是估算器，不含匯差、申購扣款日滑價、股息稅、ADR 費用、融資利息與券商特殊活動回饋。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
