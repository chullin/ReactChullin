'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Gauge,
  Image as ImageIcon,
  MousePointer,
  LayoutGrid,
  List,
  BarChart2,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function WebDevEP32() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-green-700 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.32</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web Dev Bootcamp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Web 效能優化：<br />
              <span className="text-emerald-200">Core Web Vitals 與 Lighthouse 實戰</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              LCP、INP、CLS 三大指標 — 從分析到實際改善，讓你的 Google Search 評分達到 90+
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> LCP · INP · CLS · Lighthouse · Next.js</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：為什麼效能很重要 ─────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-green-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Gauge className="text-green-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：為什麼效能很重要（數據說話）
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Web 效能不只是技術問題，它直接影響業務成果。以下是幾個有名的數據，可以幫助你在團隊中說服非技術的利益相關人為何值得投資效能優化。
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    company: 'Google 研究',
                    stat: '每增加 1 秒',
                    impact: '轉換率下降 7%',
                    detail: '行動版網頁載入時間與轉換率的直接關聯研究',
                    color: 'blue',
                  },
                  {
                    company: 'Amazon',
                    stat: '每 100ms 延遲',
                    impact: '損失 1% 銷售額',
                    detail: '早在 2006 年就發現的規律，至今仍被廣泛引用',
                    color: 'orange',
                  },
                  {
                    company: 'BBC',
                    stat: '每增加 1 秒',
                    impact: '損失 10% 用戶',
                    detail: '行動版新聞網站用戶留存率與速度的相關性',
                    color: 'red',
                  },
                ].map(({ company, stat, impact, detail, color }) => (
                  <div key={company} className={`p-5 bg-${color}-50 rounded-xl border border-${color}-200 text-center`}>
                    <p className={`text-${color}-600 text-xs font-medium mb-1`}>{company}</p>
                    <p className={`text-${color}-700 text-sm font-bold mb-1`}>{stat}</p>
                    <p className={`text-${color}-900 text-xl font-black mb-2`}>{impact}</p>
                    <p className={`text-${color}-600 text-xs leading-relaxed`}>{detail}</p>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 mb-6">
                <p className="text-emerald-800 font-bold mb-3">Core Web Vitals 是 Google 排名因素之一（2021 年起）</p>
                <p className="text-emerald-700 text-sm mb-4 leading-relaxed">
                  Google 在 2021 年 6 月正式將 Core Web Vitals 納入搜尋排名演算法。在內容品質相近的情況下，效能更好的網頁會獲得更高的排名。這讓效能優化從「加分項」變成了「必要條件」。
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    {
                      metric: 'LCP',
                      full: 'Largest Contentful Paint',
                      desc: '最大內容渲染時間',
                      measure: '衡量載入速度',
                      good: '< 2.5s',
                      color: 'green',
                    },
                    {
                      metric: 'INP',
                      full: 'Interaction to Next Paint',
                      desc: '互動反應速度',
                      measure: '衡量互動性',
                      good: '< 200ms',
                      color: 'blue',
                    },
                    {
                      metric: 'CLS',
                      full: 'Cumulative Layout Shift',
                      desc: '版面位移量',
                      measure: '衡量視覺穩定性',
                      good: '< 0.1',
                      color: 'purple',
                    },
                  ].map(({ metric, full, desc, measure, good, color }) => (
                    <div key={metric} className={`p-3 bg-white rounded-lg border border-${color}-200`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-${color}-700 font-black text-lg`}>{metric}</span>
                        <span className={`bg-${color}-100 text-${color}-700 text-xs px-2 py-0.5 rounded-full font-medium`}>目標 {good}</span>
                      </div>
                      <p className="text-gray-700 text-xs font-medium mb-0.5">{desc}</p>
                      <p className="text-gray-500 text-xs">{measure}</p>
                      <p className="text-gray-400 text-xs mt-1 italic">{full}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-amber-800 text-sm font-medium mb-1">INP 在 2024 年 3 月取代了 FID</p>
                    <p className="text-amber-700 text-xs leading-relaxed">
                      舊的 FID（First Input Delay）只量測第一次互動的延遲，而 INP 量測整個頁面生命週期中所有互動的反應速度，更能反映用戶的實際體驗。如果你在看舊文章，FID 已經不再是 Core Web Vitals 的一部分。
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：LCP ──────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-green-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ImageIcon className="text-green-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：LCP（Largest Contentful Paint）— 讓頁面快速顯示主要內容
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-6">
                {[
                  { range: '< 2.5s', label: '良好', color: 'green', emoji: '🟢' },
                  { range: '2.5s — 4s', label: '需改善', color: 'yellow', emoji: '🟡' },
                  { range: '> 4s', label: '差', color: 'red', emoji: '🔴' },
                ].map(({ range, label, color, emoji }) => (
                  <div key={range} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-200 text-center`}>
                    <span className="text-2xl mb-2 block">{emoji}</span>
                    <p className={`text-${color}-700 font-bold text-sm`}>{range}</p>
                    <p className={`text-${color}-600 text-xs`}>{label}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                LCP 量測的是頁面上「視口中最大的內容元素」完成渲染的時間。通常是 Hero 圖片、大標題（H1）或背景圖。改善 LCP 的本質是：讓瀏覽器盡快取得這個元素所需的資源。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">問題 1：圖片沒有優化</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                LCP 元素最常見的是圖片。使用 Next.js 的 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">Image</code> 組件，你幾乎可以自動解決圖片相關的所有 LCP 問題。
              </p>
              <CodeBlock language="tsx">{`// ❌ 原生 img 標籤：沒有優化，沒有 lazy loading 控制
<img src="/hero.jpg" width={1200} height={600} alt="Hero image" />
// 問題：
// - 沒有自動轉換為 WebP/AVIF（更小的檔案大小）
// - 沒有根據螢幕尺寸提供不同大小的圖片（srcset）
// - 沒有 blur placeholder（圖片載入前一片白）
// - 沒有 lazy loading 控制（所有圖片都立刻載入）

// ✅ Next.js Image 組件：自動處理所有圖片優化
import Image from 'next/image';

// LCP 元素必須加 priority！
// priority 告訴瀏覽器：這是最重要的圖片，立刻預載入（preload）
// 沒有 priority 的圖片預設是 lazy load（出現在視口才載入）
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority                     // LCP 元素必備！移除 lazy loading，加入 preload
  placeholder="blur"           // 載入期間顯示模糊的 placeholder
  blurDataURL="data:image/..."  // 可以省略，Next.js 自動產生
  sizes="(max-width: 768px) 100vw, 1200px"  // 告訴瀏覽器在不同螢幕寬度下的顯示尺寸
  alt="Hero image"
  className="w-full h-auto object-cover"
/>

// sizes 的寫法解釋：
// "(max-width: 768px) 100vw" → 手機上佔全部視口寬度
// "1200px"                   → 桌面上最大 1200px
// 瀏覽器用這個資訊決定要下載哪個尺寸的圖片（自動選最合適的）`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">問題 2：字型阻塞渲染</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                Google Fonts 的傳統 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">&lt;link&gt;</code> 標籤需要建立額外的 HTTP 連線，字型未載入完成前文字渲染可能被阻塞，造成 Flash of Invisible Text（FOIT）。
              </p>
              <CodeBlock language="tsx">{`// ❌ 傳統 Google Fonts link 標籤（在 layout.tsx 的 head 中）
// <link rel="preconnect" href="https://fonts.googleapis.com" />
// <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
// <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
// 問題：
// - 需要額外 2-3 次 DNS + TCP + TLS 連線
// - 字型檔案另外下載，可能延遲數百毫秒
// - 字型換頁時重新下載（沒有 self-hosting）

// ✅ next/font/google：字型在 build time 下載到本地
import { Inter, Noto_Sans_TC } from 'next/font/google';

// 英文字型
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // 先顯示 fallback 字型，字型載入後替換（無 FOIT）
  variable: '--font-inter',  // CSS variable，可以在 Tailwind 中使用
});

// 中文字型（注意 preload 可能很大，建議不設或只選需要的 weight）
const notoSansTC = Noto_Sans_TC({
  subsets: ['chinese-traditional'],
  weight: ['400', '500', '700'],  // 只下載需要的字重
  display: 'swap',
  variable: '--font-noto',
});

// 在 layout.tsx 的 body 加上 class
export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={\`\${inter.variable} \${notoSansTC.variable} font-sans\`}>
        {children}
      </body>
    </html>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">問題 3：Server Response 太慢（TTFB 高）</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                TTFB（Time to First Byte）高表示伺服器處理時間太長。LCP 不可能在 TTFB 之前完成，所以 TTFB 是 LCP 的下限。
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: '使用 CDN / Edge Network',
                    items: ['Vercel 自動將靜態內容部署到全球 Edge 節點', 'Cloudflare Pages 同樣效果', '用戶從最近的伺服器取得內容，TTFB 從 300ms 降到 10ms'],
                    color: 'green',
                  },
                  {
                    title: '加資料庫索引',
                    items: ['找出慢查詢（slow query log）', '在 WHERE 條件的欄位加索引', '善用 ORM 的 explain() 分析查詢計畫'],
                    color: 'blue',
                  },
                  {
                    title: '使用 ISR / SSG 預渲染',
                    items: ['靜態頁面從 CDN 直接回傳，TTFB < 50ms', 'ISR 讓你有定期更新的靜態頁面', '動態部分用 Suspense streaming'],
                    color: 'purple',
                  },
                ].map(({ title, items, color }) => (
                  <div key={title} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-200`}>
                    <p className={`font-bold text-${color}-800 text-sm mb-3`}>{title}</p>
                    <ul className={`text-${color}-700 text-xs space-y-1.5`}>
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="shrink-0 mt-0.5">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：INP ──────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-emerald-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <MousePointer className="text-emerald-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：INP（Interaction to Next Paint）— 互動要快速
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-6">
                {[
                  { range: '< 200ms', label: '良好', color: 'green', emoji: '🟢' },
                  { range: '200ms — 500ms', label: '需改善', color: 'yellow', emoji: '🟡' },
                  { range: '> 500ms', label: '差', color: 'red', emoji: '🔴' },
                ].map(({ range, label, color, emoji }) => (
                  <div key={range} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-200 text-center`}>
                    <span className="text-2xl mb-2 block">{emoji}</span>
                    <p className={`text-${color}-700 font-bold text-sm`}>{range}</p>
                    <p className={`text-${color}-600 text-xs`}>{label}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                INP 量測從用戶互動（點擊、鍵盤輸入、觸碰）到瀏覽器完成下一次繪製的時間。如果 INP 高，用戶會感覺頁面「卡卡的」— 按了按鈕沒反應、輸入文字有延遲。根本原因通常是 JavaScript 主線程被阻塞。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">問題 1：JavaScript 主線程阻塞</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                瀏覽器的 JavaScript 主線程同時負責執行 JS 和繪製畫面。如果有昂貴的同步運算佔用主線程，用戶互動的回應就會被延遲。
              </p>
              <CodeBlock language="tsx">{`// ❌ 昂貴的同步運算阻塞 UI
function handleSearch(query: string) {
  // 假設 hugeDataset 有 10 萬筆資料
  // 複雜的 filter 可能執行 100ms+，這段時間 UI 完全凍結
  const results = hugeDataset.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) &&
    item.tags.some(tag => tag.startsWith(query))
  );
  setResults(results);
}

// ✅ 使用 startTransition 區分高/低優先級更新
import { startTransition, useState } from 'react';

function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = e.target.value;

    // 高優先級：輸入框的值立刻更新（不延遲，確保打字流暢）
    setQuery(newQuery);

    // 低優先級：搜尋結果可以稍後更新
    // React 會先完成高優先級的更新，再處理 transition 內的更新
    // 如果用戶繼續打字，舊的 transition 會被中止（Concurrent Mode）
    startTransition(() => {
      const filtered = hugeDataset.filter((item) =>
        item.title.toLowerCase().includes(newQuery.toLowerCase())
      );
      setResults(filtered);
    });
  }

  return (
    <>
      <input value={query} onChange={handleSearch} placeholder="搜尋..." />
      <ResultList results={results} />
    </>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">問題 2：大型 Component 的重新渲染</h3>
              <CodeBlock language="tsx">{`// ✅ useDeferredValue — 延遲非關鍵 UI 更新
import { useDeferredValue, useMemo, useState } from 'react';

function SearchResults({ query }: { query: string }) {
  // deferredQuery 會比 query 落後一個渲染周期
  // 輸入框更新立刻觸發，搜尋結果更新在瀏覽器空閒時才執行
  const deferredQuery = useDeferredValue(query);

  // 使用 deferredQuery 而不是 query 來計算結果
  // 這樣即使 query 快速變化，昂貴的 useMemo 也不會每次都跑
  const results = useMemo(
    () => performExpensiveSearch(deferredQuery),
    [deferredQuery]
  );

  // 可以利用 query !== deferredQuery 判斷是否正在更新
  const isUpdating = query !== deferredQuery;

  return (
    <div style={{ opacity: isUpdating ? 0.7 : 1, transition: 'opacity 0.2s' }}>
      {results.map((item) => (
        <ResultItem key={item.id} item={item} />
      ))}
    </div>
  );
}

// useDeferredValue vs startTransition 的差異：
// - startTransition：你控制「哪個 setState 是低優先級」（push 模型）
// - useDeferredValue：你控制「哪個值應該延遲更新」（pull 模型）
// - 如果值來自父組件 props，只能用 useDeferredValue`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">問題 3：事件 Handler 太慢</h3>
              <CodeBlock language="tsx">{`// ✅ 把昂貴的計算移到 Web Worker（完全不阻塞主線程）
// 適合：圖片處理、資料解析、複雜的數學運算

// worker.ts
self.onmessage = (e) => {
  const { data } = e;
  // 在 worker 中執行昂貴操作（不阻塞主線程）
  const result = performHeavyComputation(data);
  self.postMessage(result);
};

// 在 React 組件中使用 Web Worker
function HeavyComputationComponent() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('./worker.ts', import.meta.url));
    workerRef.current.onmessage = (e) => {
      setResult(e.data);  // 收到結果後更新 UI
    };
    return () => workerRef.current?.terminate();
  }, []);

  function handleCompute(input: unknown) {
    // 發送到 worker 執行，主線程立刻回傳，UI 不卡頓
    workerRef.current?.postMessage(input);
  }

  return <button onClick={() => handleCompute(bigData)}>開始計算</button>;
}

// ✅ 使用 requestAnimationFrame 分批處理
function processLargeBatch(items: unknown[]) {
  let index = 0;

  function processBatch() {
    const batchSize = 100;  // 每幀處理 100 筆
    const end = Math.min(index + batchSize, items.length);

    for (let i = index; i < end; i++) {
      processItem(items[i]);
    }

    index = end;

    if (index < items.length) {
      // 讓瀏覽器有機會繪製下一幀，然後繼續處理
      requestAnimationFrame(processBatch);
    }
  }

  requestAnimationFrame(processBatch);
}`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：CLS ──────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-teal-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <LayoutGrid className="text-teal-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：CLS（Cumulative Layout Shift）— 防止頁面跳動
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-3 mb-6">
                {[
                  { range: '< 0.1', label: '良好', color: 'green', emoji: '🟢' },
                  { range: '0.1 — 0.25', label: '需改善', color: 'yellow', emoji: '🟡' },
                  { range: '> 0.25', label: '差', color: 'red', emoji: '🔴' },
                ].map(({ range, label, color, emoji }) => (
                  <div key={range} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-200 text-center`}>
                    <span className="text-2xl mb-2 block">{emoji}</span>
                    <p className={`text-${color}-700 font-bold text-sm`}>{range}</p>
                    <p className={`text-${color}-600 text-xs`}>{label}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                CLS 量測頁面生命週期中意外的版面位移總量。當用戶正在點擊某個按鈕，結果按鈕突然跑掉、點到了別的東西 — 這就是 CLS 造成的糟糕體驗。CLS 的分數是所有位移事件的加總（位移幅度 × 受影響的視口比例）。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">問題 1：圖片沒有設定尺寸（最常見）</h3>
              <CodeBlock language="tsx">{`// ❌ 圖片沒有尺寸：圖片載入後突然佔了空間，把下面的內容往下推
// CLS 分數可能因此暴增
<img src="photo.jpg" alt="用戶照片" />
// 圖片下載完成前，這個 <img> 的高度是 0
// 下載完成後，假設圖片 400px 高，整個下方內容被推下去 400px
// 這就是一次嚴重的 layout shift

// ✅ 方法 1：設定明確的 width 和 height
// 瀏覽器知道圖片的比例後，會預先保留空間
<img src="photo.jpg" width={800} height={600} alt="用戶照片" />

// ✅ 方法 2：CSS aspect-ratio（更彈性，適合響應式）
<div style={{ aspectRatio: '16 / 9', background: '#f0f0f0' }}>
  <img src="video-thumbnail.jpg" className="w-full h-full object-cover" alt="縮圖" />
</div>

// ✅ 方法 3：使用 Next.js Image（自動計算 aspect ratio）
import Image from 'next/image';

<Image
  src="photo.jpg"
  width={800}
  height={600}
  alt="用戶照片"
  // Next.js Image 自動根據 width/height 保留空間，CLS = 0
/>`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">問題 2：字型替換導致文字位移</h3>
              <CodeBlock language="css">{`/* 問題：Web Font 載入時，fallback 字型（系統字型）和 web font 的字元寬度不同
   文字會在字型替換時跳動（造成 CLS）

   解法：size-adjust 讓 fallback 字型的大小接近 web font */

/* 分析你的 web font 和 system font 的差異，找到合適的 size-adjust 值 */
@font-face {
  font-family: 'CustomFontFallback';
  src: local('Arial');           /* 使用系統字型作為 fallback */
  ascent-override: 90%;          /* 調整上升高度 */
  descent-override: 22%;         /* 調整下降高度 */
  line-gap-override: 0%;
  size-adjust: 107%;             /* 關鍵：讓 fallback 字型大小接近 web font */
}

body {
  font-family: 'CustomFont', 'CustomFontFallback', Arial, sans-serif;
  /* 字型替換時，因為大小已經調整過，位移量大幅減少 */
}

/* 使用 next/font 時 Next.js 會自動計算這些值 */
/* 這是 next/font 自動 zero CLS 的秘密 */`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">問題 3：動態注入的內容（廣告、Banner）</h3>
              <CodeBlock language="tsx">{`// ❌ 廣告/Banner 在頁面渲染後才插入，把下方內容往下推
<ArticleContent />
<AdBanner />  {/* 廣告資料從 API 取得後才插入，造成 layout shift */}
<MoreContent />

// ✅ 預先保留廣告空間（Skeleton）
function AdPlaceholder() {
  return (
    // 給廣告預留固定高度的空間
    // 廣告載入後填入這個空間，不影響下方內容
    <div
      className="w-full bg-gray-100 rounded-lg flex items-center justify-center"
      style={{ minHeight: '250px' }}  // 標準廣告高度
    >
      <AdBanner />  {/* 廣告放在這個固定大小的容器內 */}
    </div>
  );
}

// ✅ 動態通知 Toast（從固定位置出現，不推動其他內容）
// 使用 fixed/absolute positioning 讓 Toast 不佔 layout 空間
function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-3 rounded-lg shadow-lg z-50">
      {/* fixed 定位不影響文件流，不會造成 CLS */}
      {message}
    </div>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">問題 4：動畫導致位移（用 transform 而非 margin）</h3>
              <CodeBlock language="css">{`/* ❌ 改變 layout 屬性的動畫 — 觸發 Layout + Paint，影響其他元素 */
.slide-in-bad {
  animation: slideInBad 0.3s ease;
}

@keyframes slideInBad {
  from { margin-left: -300px; }  /* margin 影響 layout，推動周圍元素 */
  to   { margin-left: 0; }
}

/* ❌ 同樣有問題的屬性：top、left、width、height、padding */
/* 這些屬性的變化都會觸發 Layout Recalculation，影響 CLS */

/* ✅ 只改變視覺位置，不影響 layout 的動畫 */
.slide-in-good {
  animation: slideInGood 0.3s ease;
}

@keyframes slideInGood {
  from { transform: translateX(-300px); opacity: 0; }  /* transform 不影響 layout */
  to   { transform: translateX(0); opacity: 1; }
}

/* ✅ 高效能動畫的黃金法則：只動 transform 和 opacity */
/* transform：不觸發 Layout 或 Paint（GPU 加速）*/
/* opacity：不觸發 Layout（但觸發 Paint，仍然很快）*/

/* ✅ 加上 will-change 讓瀏覽器提前準備 GPU 層 */
.animated-element {
  will-change: transform;  /* 提示瀏覽器此元素會動，提前建立 compositing layer */
  /* 注意：不要對所有元素都加，只用在確實會動的元素上 */
}`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：Next.js 效能最佳實踐 ─────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-green-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <List className="text-green-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：Next.js 效能最佳實踐清單
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                使用 Next.js 開發時，框架本身提供了許多效能優化工具。以下是一份可以立刻套用到你的專案的最佳實踐清單，每一項都有對應的實作方式。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">1. Image 優化完整設定</h3>
              <CodeBlock language="tsx">{`import Image from 'next/image';

// LCP 元素（Hero 圖片、主要內容圖）
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority                          // 移除 lazy loading，加入 preload link
  placeholder="blur"                // 圖片載入期間顯示模糊版本
  blurDataURL="/hero-blur.jpg"      // 小尺寸的 base64 圖片（或讓 Next.js 自動產生）
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  alt="Hero 圖片"
  className="w-full h-auto"
/>

// 一般內容圖片（預設 lazy load）
<Image
  src={post.coverImage}
  width={800}
  height={450}
  // 不加 priority → 預設 lazy load，出現在視口前不下載
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, 800px"
  alt={post.title}
/>

// 使用者頭像（固定小尺寸）
<Image
  src={user.avatar}
  width={40}
  height={40}
  className="rounded-full"
  alt={user.name}
/>`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">2. Dynamic Import — 程式碼分割</h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                Dynamic Import 讓你把大型組件分割成獨立的 JS chunk，只有在需要時才下載。這直接減少初始頁面的 JS 大小，改善 LCP 和 INP。
              </p>
              <CodeBlock language="tsx">{`import dynamic from 'next/dynamic';

// ✅ 大型圖表庫（不需要在首屏顯示）
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-xl animate-pulse" />
  ),
  ssr: false,  // 圖表通常只在客戶端渲染（需要 DOM API）
});

// ✅ 富文本編輯器（只在用戶點擊編輯時才載入）
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  loading: () => <p>載入編輯器中...</p>,
  ssr: false,
});

// ✅ 模態視窗（只在開啟時才需要）
const VideoModal = dynamic(() => import('./VideoModal'), {
  ssr: false,
});

function ProductPage() {
  const [showEditor, setShowEditor] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      {/* 點擊才載入編輯器，節省初始頁面的 JS */}
      <button onClick={() => setShowEditor(true)}>編輯</button>
      {showEditor && <RichTextEditor />}

      <button onClick={() => setShowVideo(true)}>看影片</button>
      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}

      {/* HeavyChart 總是渲染，但直到這個組件出現在視口才下載 */}
      <HeavyChart data={chartData} />
    </div>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">3. Script 最佳化載入</h3>
              <CodeBlock language="tsx">{`import Script from 'next/script';

// strategy 決定 script 的載入時機：

// beforeInteractive — 頁面變成 interactive 之前載入（最高優先）
// 適合：Polyfills、關鍵的第三方 SDK
// 注意：會阻塞頁面，謹慎使用
<Script src="/polyfills.js" strategy="beforeInteractive" />

// afterInteractive（預設）— 頁面變成 interactive 後立刻載入
// 適合：Tag Manager、Analytics
<Script src="https://www.googletagmanager.com/gtag/js" strategy="afterInteractive" />

// lazyOnload — 瀏覽器空閒時才載入（最低優先）
// 適合：聊天客服、社群分享按鈕、廣告 SDK
<Script src="//cdn.example.com/chat-widget.js" strategy="lazyOnload" />

// worker — 在 Web Worker 中執行（不阻塞主線程）
// 需要安裝 @builder.io/partytown
<Script src="/heavy-analytics.js" strategy="worker" />`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">4. Bundle 大小分析</h3>
              <CodeBlock language="bash">{`# 安裝 bundle analyzer
npm install @next/bundle-analyzer

# next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);

# 執行分析（會在瀏覽器開啟互動式分析圖）
ANALYZE=true next build

# 常見的 bundle 優化機會：
# - lodash：改用 lodash-es 或直接用原生 JS 方法
# - moment.js：改用 date-fns（按需引入）或 Day.js
# - @mui/icons-material：改用具名引入而非整包引入`}</CodeBlock>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="font-bold text-green-800 text-sm mb-3 flex items-center gap-2">
                    <CheckCircle size={16} /> 高效能清單
                  </p>
                  <ul className="text-green-700 text-xs space-y-1.5">
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✓</span> LCP 元素加 priority 屬性</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✓</span> 所有 Image 設定 width + height</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✓</span> 字型使用 next/font/google</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✓</span> 大型組件使用 dynamic import</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✓</span> 第三方 Script 使用適當的 strategy</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✓</span> 動畫只用 transform 和 opacity</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <p className="font-bold text-red-800 text-sm mb-3 flex items-center gap-2">
                    <XCircle size={16} /> 常見錯誤
                  </p>
                  <ul className="text-red-700 text-xs space-y-1.5">
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✗</span> 所有圖片都加 priority（失去 lazy loading 效益）</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✗</span> 使用原生 img 標籤載入大圖</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✗</span> 把整個 lodash 引入只用一個函式</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✗</span> 在主線程做昂貴的同步計算</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✗</span> 動畫使用 margin/top/left</li>
                    <li className="flex items-start gap-1.5"><span className="shrink-0">✗</span> 圖片沒有設定 sizes（讓瀏覽器下載過大的圖片）</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：Lighthouse ────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-teal-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <BarChart2 className="text-teal-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：用 Lighthouse 找出問題
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Lighthouse 是 Google 提供的開源自動化網頁品質工具，內建在 Chrome DevTools 中。它從 Performance、Accessibility、Best Practices、SEO 四個維度評分，並提供具體的改善建議，是效能優化的最佳起點。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">使用 Lighthouse</h3>
              <CodeBlock language="bash">{`# 方法 1：Chrome DevTools
# 打開 DevTools → Lighthouse 分頁 → 選擇 Mobile / Desktop → Generate report

# 方法 2：CLI（適合 CI/CD 整合）
npm install -g lighthouse

# 跑分並產生 HTML 報告
lighthouse https://yoursite.com \\
  --output html \\
  --output-path ./lighthouse-report.html \\
  --view  # 自動在瀏覽器開啟報告

# 只跑特定類別（節省時間）
lighthouse https://yoursite.com \\
  --only-categories=performance,seo \\
  --output json \\
  --output-path ./report.json

# 方法 3：PageSpeed Insights（Google 線上工具）
# https://pagespeed.web.dev/
# 用真實的 Lighthouse 跑分 + 提供真實用戶的 CrUX 資料`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-4 mt-8">Lighthouse 分數解讀</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-700 to-teal-600 text-white">
                      <th className="px-5 py-3 text-left rounded-tl-lg font-semibold">分數</th>
                      <th className="px-5 py-3 text-left font-semibold">狀態</th>
                      <th className="px-5 py-3 text-left rounded-tr-lg font-semibold">說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { range: '90 — 100', emoji: '🟢', status: '優秀', desc: '達到業界最佳實踐，SEO 有加分效果', bg: 'bg-green-50' },
                      { range: '50 — 89', emoji: '🟡', status: '需要改善', desc: '有明顯的效能問題，建議優先處理分數較低的類別', bg: 'bg-yellow-50' },
                      { range: '0 — 49', emoji: '🔴', status: '差', desc: '嚴重的效能問題，可能直接影響 SEO 排名和用戶體驗', bg: 'bg-red-50' },
                    ].map(({ range, emoji, status, desc, bg }) => (
                      <tr key={range} className={bg}>
                        <td className="px-5 py-3 font-bold text-gray-800">{range}</td>
                        <td className="px-5 py-3">
                          <span className="flex items-center gap-2">
                            <span>{emoji}</span>
                            <span className="font-medium">{status}</span>
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-600 text-xs leading-relaxed">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-4">最常見的 Lighthouse 建議</h3>
              <div className="space-y-3 mb-6">
                {[
                  {
                    title: '1. Serve images in next-gen formats',
                    desc: '建議將 JPEG/PNG 轉換為 WebP 或 AVIF 格式。WebP 比 JPEG 小 25-35%，AVIF 更小但相容性稍差。使用 next/image 會自動轉換為 WebP/AVIF，完全解決這個問題。',
                    fix: 'image',
                    savings: '可節省 30-50% 圖片大小',
                  },
                  {
                    title: '2. Eliminate render-blocking resources',
                    desc: '某些 JS 和 CSS 在載入完成前會阻止頁面渲染。對 JS 加 defer/async，對不重要的 CSS 動態載入。Next.js 的 Script 組件幫你管理這個問題。',
                    fix: 'script',
                    savings: '可改善 200-500ms 的 LCP',
                  },
                  {
                    title: '3. Reduce unused JavaScript',
                    desc: '頁面載入了大量從未被執行的 JS。解決方法是程式碼分割（Dynamic Import）和 Tree Shaking。用 Bundle Analyzer 找出最大的 chunk。',
                    fix: 'dynamic-import',
                    savings: '可節省 50-80% 的初始 JS 大小',
                  },
                  {
                    title: '4. Properly size images',
                    desc: '圖片的實際像素遠大於顯示尺寸。例如上傳了 4000x3000px 的圖片，但只顯示 400x300px，浪費了 100 倍的資料量。使用 next/image 的 sizes 屬性解決。',
                    fix: 'sizes',
                    savings: '可節省 90% 以上的圖片傳輸量',
                  },
                  {
                    title: '5. Enable text compression',
                    desc: 'HTML、JS、CSS 等文字資源沒有壓縮。啟用 gzip 或 brotli 壓縮可以大幅減少傳輸大小。Vercel 和大多數現代主機自動啟用。',
                    fix: 'server',
                    savings: 'JS/CSS 壓縮後通常縮小 70%',
                  },
                ].map(({ title, desc, savings }) => (
                  <div key={title} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="font-bold text-gray-800 text-sm">{title}</p>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full shrink-0 font-medium">{savings}</span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">在 CI/CD 中整合 Lighthouse</h3>
              <CodeBlock language="bash">{`# package.json — 加入效能測試 script
# "scripts": {
#   "perf:check": "lighthouse-ci autorun"
# }

# 安裝 Lighthouse CI
npm install -g @lhci/cli

# .lighthouserc.js — 設定效能門檻
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000', 'http://localhost:3000/blog'],
      numberOfRuns: 3,  // 跑 3 次取平均，減少波動
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],  // 效能 >= 90 分
        'categories:seo': ['error', { minScore: 0.9 }],           // SEO >= 90 分
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',  // 上傳報告到臨時儲存（免費）
    },
  },
};

# 在 GitHub Actions 中使用：
# - name: Run Lighthouse CI
#   run: |
#     npm run build
#     npm start &
#     npx @lhci/cli autorun`}</CodeBlock>

              <div className="mt-6 p-5 bg-gradient-to-r from-green-700/10 to-teal-600/10 rounded-xl border border-green-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-gray-800 mb-2">效能優化的優先順序建議</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      效能優化是一個持續的過程，不要試圖一次解決所有問題。建議的優先順序：
                    </p>
                    <ol className="text-gray-600 text-sm space-y-1.5 leading-relaxed list-decimal list-inside">
                      <li>先用 Lighthouse 找出最嚴重的問題（分數最低的建議）</li>
                      <li>修復 LCP（圖片優化、priority、字型）— 影響最大且通常最容易</li>
                      <li>修復 CLS（設定圖片尺寸、保留廣告空間）— 避免用戶點錯</li>
                      <li>改善 INP（程式碼分割、startTransition）— 需要更深入的分析</li>
                      <li>持續監控：在 CI/CD 設定效能門檻，防止退步</li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Tags ───────────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex flex-wrap gap-2">
            {['Core Web Vitals', 'LCP', 'INP', 'CLS', 'Lighthouse', 'Next.js', 'Web Performance'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-emerald-100 text-emerald-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep31-nextjs15">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-emerald-400">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-emerald-600 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.31 Next.js 15 完全指南</p>
                      <p className="text-xs text-gray-400">Server Actions、PPR、React 19</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/web-dev/ep01-modern-web">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-emerald-400">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">系列完整循環</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.01 現代網頁開發</p>
                      <p className="text-xs text-gray-400">回到系列起點，重新出發</p>
                    </div>
                    <ArrowRight className="text-emerald-600 shrink-0" size={20} />
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
