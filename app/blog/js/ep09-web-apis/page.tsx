'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Cpu,
  Database,
  ScanEye,
  SquareActivity,
  ShieldCheck,
  EyeOff,
  Zap,
  CheckCircle,
  AlertTriangle,
  Monitor
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

export default function JSEP09() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-yellow-700 via-orange-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.09</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">JavaScript 系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Web APIs 實戰：<br />
              <span className="text-amber-200">Web Workers、IndexedDB、Intersection Observer</span>
            </h1>
            <p className="text-amber-100 text-lg mb-8 max-w-2xl">
              瀏覽器原生 API 的三大場景 — 背景執行緒、離線儲存、懶載入 — 不依賴框架的原生能力
            </p>
            <div className="flex items-center gap-6 text-amber-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Web Workers · IndexedDB · Intersection Observer · Web Crypto</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：瀏覽器比你想像的更強大 ──────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-amber-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Monitor className="text-amber-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：瀏覽器比你想像的更強大
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                現代瀏覽器早就不只是「渲染 HTML 的工具」了。Web 標準在過去十年間發展出大量強大的原生 API，讓你不需要依賴任何第三方框架，就能在瀏覽器中做到背景計算、大量資料儲存、高效能 DOM 監聽、頁面間通訊、甚至加密操作。
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    title: 'Web Workers',
                    desc: '在背景執行緒跑 CPU 密集計算，不阻塞主執行緒 UI 渲染',
                    icon: Cpu,
                    color: 'orange',
                    tag: 'Section 2',
                  },
                  {
                    title: 'IndexedDB',
                    desc: '瀏覽器端的 NoSQL 資料庫，支援 GB 級離線儲存與索引查詢',
                    icon: Database,
                    color: 'amber',
                    tag: 'Section 4',
                  },
                  {
                    title: 'Intersection Observer',
                    desc: '高效偵測元素是否在視口中，實作懶載入與無限捲動',
                    icon: ScanEye,
                    color: 'yellow',
                    tag: 'Section 3',
                  },
                  {
                    title: 'ResizeObserver',
                    desc: '偵測元素大小變化，取代 window.resize 監聽',
                    icon: SquareActivity,
                    color: 'lime',
                    tag: 'Section 5',
                  },
                  {
                    title: 'Page Visibility API',
                    desc: '偵測用戶是否切換到其他分頁或最小化視窗',
                    icon: EyeOff,
                    color: 'green',
                    tag: 'Section 6',
                  },
                  {
                    title: 'Web Crypto API',
                    desc: '瀏覽器端 AES/RSA 加密、SHA hash、UUID 生成',
                    icon: ShieldCheck,
                    color: 'teal',
                    tag: 'Section 7',
                  },
                ].map(({ title, desc, icon: Icon, color, tag }) => (
                  <div key={title} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`text-${color}-600`} size={16} />
                        <p className={`font-bold text-${color}-800 text-sm`}>{title}</p>
                      </div>
                      <span className={`text-xs bg-${color}-200 text-${color}-700 px-2 py-0.5 rounded-full`}>{tag}</span>
                    </div>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>{desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-start gap-2">
                  <Zap className="text-orange-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-orange-800 text-sm font-medium mb-1">為什麼要學原生 Web API？</p>
                    <p className="text-orange-700 text-xs leading-relaxed">
                      React、Vue 等框架的底層都是建立在這些 Web API 上的。當你理解底層，不只是能在框架之外解決問題，也能在框架中寫出更高效的程式碼。例如，很多開發者用第三方套件做懶載入，但 Intersection Observer 原生就能做到，而且效能更好、bundle 更小。
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：Web Workers — 別讓計算凍結 UI ─────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-amber-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Cpu className="text-amber-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：Web Workers — 別讓計算凍結 UI
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                JavaScript 是單執行緒的語言，主執行緒（Main Thread）同時負責執行 JavaScript、處理用戶事件、以及渲染畫面（Layout、Paint）。一旦有耗時的計算佔用主執行緒，用戶就會看到 UI 凍結——滾不動、點不了、動畫卡住。Web Workers 讓你開一個背景執行緒，把計算工作交給它，主執行緒繼續保持流暢。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">問題 vs 解法</h3>

              <CodeBlock language="javascript">
{`   // ❌ 問題：在主執行緒跑大計算 → UI 凍結
function heavyCalc(n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += Math.sqrt(i);
  }
  return result;
}

document.querySelector('button').addEventListener('click', () => {
  const result = heavyCalc(100_000_000); // UI 凍結！用戶無法互動
  console.log(result);
});

// ✅ 解法：把計算丟給 Web Worker
// --- worker.js（獨立的 js 檔案）---
self.onmessage = function(event) {
  const { n } = event.data;
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += Math.sqrt(i);
  }
  self.postMessage({ result }); // 計算完成，送回主執行緒
};

// --- main.js ---
const worker = new Worker('/worker.js');

// Worker 計算完成後，這裡接收結果
worker.onmessage = function(event) {
  const { result } = event.data;
  console.log('計算結果:', result);
  document.querySelector('#result').textContent = result;
};

worker.onerror = function(error) {
  console.error('Worker error:', error);
};

document.querySelector('button').addEventListener('click', () => {
  worker.postMessage({ n: 100_000_000 }); // 送給 Worker，主執行緒不卡
  // 這行會立刻執行完畢，不會等 Worker 算完
  console.log('計算已送出，UI 繼續回應！');
});   `}
</CodeBlock>

              <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 my-6 font-mono text-sm">
                <p className="text-slate-400 text-xs mb-3">Web Worker 通訊模型</p>
                <div className="flex items-center justify-around text-xs flex-wrap gap-4">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-2">Main Thread</div>
                    <div className="text-slate-400 text-xs">UI + 事件 + 渲染</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">postMessage() →</div>
                    <div className="text-slate-500 text-xs my-1">（複製資料，非共享）</div>
                    <div className="text-slate-400">← onmessage</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-600 text-white px-4 py-2 rounded-lg mb-2">Worker Thread</div>
                    <div className="text-slate-400 text-xs">CPU 密集計算</div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">在 React 中使用 Web Worker（with Comlink，更簡單）</h3>

              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                原生 Web Worker API 用 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">postMessage / onmessage</code> 通訊，寫起來像在用事件系統，不夠直覺。<code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">Comlink</code> 是 Google 開發的輕量包裝庫，讓你像呼叫普通 async function 一樣呼叫 Worker 中的函式。
              </p>

              <CodeBlock language="typescript">
{`   // workers/calculator.worker.ts
import { expose } from 'comlink';

const calculator = {
  async heavyCalc(n: number) {
    let result = 0;
    for (let i = 0; i < n; i++) {
      result += Math.sqrt(i);
    }
    return result;
  },

  async processLargeArray(data: number[]) {
    // 在 Worker 中處理大陣列，不阻塞 UI
    return data
      .filter(n => n % 2 === 0)
      .map(n => n * n)
      .reduce((acc, n) => acc + n, 0);
  },
};

expose(calculator); // Comlink：把物件暴露給主執行緒   `}
</CodeBlock>

              <div className="h-4" />

              <CodeBlock language="typescript">
{`   // hooks/useWorker.ts
import { wrap } from 'comlink';
import { useRef, useEffect } from 'react';

export function useCalculator() {
  const workerRef = useRef<Worker | null>(null);
  const apiRef = useRef<any>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/calculator.worker.ts', import.meta.url)
    );
    // wrap：把 Worker 包裝成看起來像一般物件的 Proxy
    apiRef.current = wrap(workerRef.current);

    return () => {
      workerRef.current?.terminate(); // 元件卸載時終止 Worker
    };
  }, []);

  return apiRef.current;
}

// ── 使用 ─────────────────────────────────────────────────────
function MyComponent() {
  const calculator = useCalculator();
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    setIsLoading(true);
    // 就像呼叫普通 async function，但實際在 Worker 裡跑
    const result = await calculator.heavyCalc(100_000_000);
    setResult(result);
    setIsLoading(false);
    // ↑ 整個過程 UI 完全不凍結！
  };

  return (
    <div>
      <button onClick={handleCalculate} disabled={isLoading}>
        {isLoading ? '計算中...' : '開始計算'}
      </button>
      {result && <p>結果：{result}</p>}
    </div>
  );
}   `}
</CodeBlock>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-800 text-sm font-bold mb-2">適合交給 Worker 的任務</p>
                  <ul className="text-green-700 text-xs space-y-1.5 leading-relaxed">
                    <li>• 大量資料排序、過濾、轉換</li>
                    <li>• 圖片處理（濾鏡、壓縮、像素操作）</li>
                    <li>• PDF 生成、報表計算</li>
                    <li>• 機器學習模型推論（TensorFlow.js）</li>
                    <li>• 加密解密（也可用 Web Crypto API）</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <p className="text-red-800 text-sm font-bold mb-2">Worker 的限制</p>
                  <ul className="text-red-700 text-xs space-y-1.5 leading-relaxed">
                    <li>• 無法存取 DOM（不能操作頁面元素）</li>
                    <li>• 無法存取 window 物件</li>
                    <li>• 通訊資料會被複製（非共享記憶體）</li>
                    <li>• 傳遞大資料有效能成本（可用 Transferable Objects 解決）</li>
                    <li>• 每個 Worker 是獨立的 JS 環境</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：Intersection Observer ─────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-amber-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <ScanEye className="text-amber-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：Intersection Observer — 懶載入與無限捲動
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Intersection Observer API 讓你非同步地觀察目標元素與其祖先或視口（Viewport）的交叉狀態。白話說：它能告訴你「這個元素現在有沒有在畫面上」。這個 API 是瀏覽器在「後台」幫你計算的，比監聽 scroll 事件效能好得多。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">傳統做法 vs Intersection Observer</h3>

              <CodeBlock language="javascript">
{`   // ❌ 舊方法：監聽 scroll 事件（效能差！）
window.addEventListener('scroll', () => {
  // 每次滾動都觸發（可能每秒幾十次）
  // 每次都要重新計算所有元素的位置
  const elements = document.querySelectorAll('.lazy-load');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect(); // 觸發 Layout 重新計算
    if (rect.top < window.innerHeight) {
      loadContent(el);
    }
  });
});
// 問題：
// 1. scroll 事件高頻觸發，必須 throttle/debounce
// 2. getBoundingClientRect() 會強制同步 Layout，影響效能
// 3. 頁面有 100 個元素就要算 100 次

// ✅ Intersection Observer（瀏覽器原生，高效）
const observer = new IntersectionObserver(
  (entries) => {
    // 只在「狀態改變」時才觸發（元素進入或離開視口）
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadContent(entry.target);
        observer.unobserve(entry.target); // 載入後停止觀察，節省資源
      }
    });
  },
  {
    root: null,         // null = 以視口作為根元素
    threshold: 0.1,     // 元素出現 10% 時觸發（0 ~ 1 的值）
    rootMargin: '0px 0px -100px 0px', // 縮小偵測區域（提前或延後觸發）
    // rootMargin: '200px' → 元素還在視口外 200px 時就提前觸發（預載入）
  }
);

// 觀察所有需要懶載入的元素
document.querySelectorAll('.lazy-load').forEach(el => {
  observer.observe(el);
});

// threshold 的值：
// 0   → 元素剛剛碰到視口邊緣就觸發
// 0.5 → 元素出現一半才觸發
// 1   → 元素完整出現才觸發
// [0, 0.25, 0.5, 0.75, 1] → 每達到這些比例都觸發   `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-6">React Hook 封裝</h3>

              <CodeBlock language="typescript">
{`   // hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean; // true = 只觸發一次（常用於動畫）
}

export function useIntersectionObserver(options: Options = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element); // 觸發一次後停止觀察
          }
        } else if (!triggerOnce) {
          setIsVisible(false); // 離開視口時重置
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

// ── 使用案例 1：懶載入圖片（預載入：進入視口前 200px 就開始載入）
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, isVisible } = useIntersectionObserver({
    rootMargin: '200px', // 元素還在視口外 200px 時就開始載入
  });

  return (
    <div ref={ref as any} className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden">
      {isVisible ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        // 佔位符：避免 Layout Shift
        <div className="w-full h-full animate-pulse bg-gray-300" />
      )}
    </div>
  );
}

// ── 使用案例 2：進場動畫（元素進入視口才播放動畫，不提前觸發）
function AnimatedCard({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div
      ref={ref as any}
      className={\`transition-all duration-700 \${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }\`}
    >
      {children}
    </div>
  );
}

// ── 使用案例 3：無限捲動（監聽列表底部的哨兵元素）
function InfiniteList() {
  const { ref, isVisible } = useIntersectionObserver({ triggerOnce: false });
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (isVisible) {
      // 哨兵元素進入視口 → 載入下一頁
      fetchNextPage(page).then(newItems => {
        setItems(prev => [...prev, ...newItems]);
        setPage(p => p + 1);
      });
    }
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {items.map((item, i) => <div key={i}>{item}</div>)}
      {/* 哨兵元素：放在列表最底部 */}
      <div ref={ref as any} className="h-4" />
    </div>
  );
}

async function fetchNextPage(page: number): Promise<string[]> {
  // 模擬 API 呼叫
  return Array.from({ length: 10 }, (_, i) => \`Item \${(page - 1) * 10 + i + 1}\`);
}   `}
</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：IndexedDB ───────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-amber-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Database className="text-amber-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：IndexedDB — 瀏覽器的本地資料庫
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                IndexedDB 是瀏覽器內建的 NoSQL 物件資料庫，支援事務（Transaction）、索引查詢、以及儲存各種 JavaScript 物件（包含 Blob、ArrayBuffer）。相比 localStorage，它的儲存上限大得多（通常數百 MB 到 GB 級），且操作是非同步的，不會阻塞主執行緒。
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-5 bg-slate-800 rounded-xl border border-slate-600 font-mono text-sm">
                  <p className="text-slate-400 text-xs mb-3">LocalStorage</p>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-red-400">✗ 同步（會阻塞 UI）</p>
                    <p className="text-red-400">✗ 最多 5MB</p>
                    <p className="text-red-400">✗ 只能存字串</p>
                    <p className="text-red-400">✗ 沒有索引查詢</p>
                    <p className="text-green-400">✓ API 簡單</p>
                    <p className="text-slate-400 mt-2">適合：少量設定、用戶偏好</p>
                  </div>
                </div>
                <div className="p-5 bg-amber-900 rounded-xl border border-amber-600 font-mono text-sm">
                  <p className="text-amber-300 text-xs mb-3">IndexedDB</p>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-green-400">✓ 非同步（不阻塞 UI）</p>
                    <p className="text-green-400">✓ 可達數百 MB 甚至 GB</p>
                    <p className="text-green-400">✓ 支援物件、Blob、ArrayBuffer</p>
                    <p className="text-green-400">✓ 支援索引查詢</p>
                    <p className="text-green-400">✓ 支援事務（原子性操作）</p>
                    <p className="text-slate-400 mt-2">適合：離線 App、大量資料快取</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">用 idb 庫（IndexedDB 的 Promise 包裝）</h3>

              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                原生 IndexedDB API 是基於事件的，寫起來相當繁瑣。<code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">idb</code> 庫提供 Promise 化的包裝以及完整的 TypeScript 型別支援，讓 IndexedDB 的使用體驗接近 async/await 的直覺感。
              </p>

              <CodeBlock language="bash">
{`   npm install idb   `}
</CodeBlock>

              <div className="h-4" />

              <CodeBlock language="typescript">
{`   import { openDB, DBSchema } from 'idb';

// 定義 DB Schema（TypeScript 型別安全）
interface BlogDB extends DBSchema {
  articles: {
    key: string;
    value: {
      id: string;
      title: string;
      content: string;
      cachedAt: number;
      tags: string[];
    };
    indexes: {
      'by-tag': string;
      'by-date': number;
    };
  };
  drafts: {
    key: string;
    value: {
      id: string;
      title: string;
      content: string;
      updatedAt: number;
    };
  };
}

// 初始化資料庫
const dbPromise = openDB<BlogDB>('blog-app', 1, {
  upgrade(db) {
    // 建立 articles object store
    const articleStore = db.createObjectStore('articles', { keyPath: 'id' });
    // 建立索引（讓你可以用 tag 或日期查詢）
    articleStore.createIndex('by-tag', 'tags', { multiEntry: true }); // multiEntry: 陣列中每個值都建立索引
    articleStore.createIndex('by-date', 'cachedAt');

    // 建立 drafts object store
    db.createObjectStore('drafts', { keyPath: 'id' });
  },
});

// ── CRUD 操作 ──────────────────────────────────────────────
// 儲存文章到本地快取
async function cacheArticle(article: BlogDB['articles']['value']) {
  const db = await dbPromise;
  await db.put('articles', { ...article, cachedAt: Date.now() });
}

// 讀取快取的文章（key 查詢）
async function getCachedArticle(id: string) {
  const db = await dbPromise;
  return db.get('articles', id);
}

// 取得所有快取文章
async function getAllCachedArticles() {
  const db = await dbPromise;
  return db.getAll('articles');
}

// 依標籤查詢（利用 Index）
async function getArticlesByTag(tag: string) {
  const db = await dbPromise;
  return db.getAllFromIndex('articles', 'by-tag', tag);
}

// 刪除文章
async function deleteArticle(id: string) {
  const db = await dbPromise;
  await db.delete('articles', id);
}

// 清除過期快取（超過 1 小時的記錄）
async function clearExpiredCache() {
  const db = await dbPromise;
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  // 使用事務確保操作的原子性
  const tx = db.transaction('articles', 'readwrite');
  const index = tx.store.index('by-date');

  // 使用 cursor 遍歷所有過期記錄
  for await (const cursor of index.iterate(IDBKeyRange.upperBound(oneHourAgo))) {
    cursor.delete();
  }

  await tx.done;
  console.log('過期快取已清除');
}   `}
</CodeBlock>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mt-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-amber-800 text-sm font-medium mb-1">IndexedDB 實際應用場景</p>
                    <ul className="text-amber-700 text-xs space-y-1 leading-relaxed">
                      <li>• <strong>離線優先 App</strong>：先從 IndexedDB 讀取資料顯示，背景更新後再同步。</li>
                      <li>• <strong>草稿自動儲存</strong>：每隔幾秒把編輯器內容存入 IndexedDB，防止意外關閉遺失。</li>
                      <li>• <strong>API 回應快取</strong>：把 API 結果存起來，相同請求直接從本地讀取，節省網路請求。</li>
                      <li>• <strong>大型資源離線</strong>：把 PDF、圖片等 Blob 儲存在 IndexedDB 供離線存取。</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：ResizeObserver ─────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-amber-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <SquareActivity className="text-amber-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：ResizeObserver — 偵測元素大小變化
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                傳統做法是監聽 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">window.resize</code> 事件，但這只能偵測視窗大小，無法偵測特定元素的大小變化（例如側邊欄展開收合、動態內容導致父容器改變大小）。ResizeObserver 正是為這個場景而生。
              </p>

              <CodeBlock language="typescript">
{`   // hooks/useElementSize.ts
import { useEffect, useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

export function useElementSize() {
  const ref = useRef<HTMLElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      // contentRect：不含 border 和 padding 的內容區域大小
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(element);

    // 初始大小（ResizeObserver 第一次 callback 前的值）
    setSize({
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

// ── 使用案例 1：根據容器寬度決定 Grid 欄數
// （比 CSS media query 更靈活，基於容器而非視窗寬度）
function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  const { ref, size } = useElementSize();

  const columns =
    size.width > 1024 ? 4 :
    size.width > 768  ? 3 :
    size.width > 480  ? 2 : 1;

  return (
    <div
      ref={ref as any}
      style={{
        display: 'grid',
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
        gap: '1rem',
      }}
    >
      {children}
    </div>
  );
}

// ── 使用案例 2：文字截斷 + 展開按鈕
// 只有當內容真的超出容器高度時才顯示「展開」按鈕
function ClampedText({ text }: { text: string }) {
  const { ref, size } = useElementSize();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // scrollHeight > clientHeight 表示內容被截斷
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [size, ref]);

  return (
    <div>
      <p
        ref={ref as any}
        className={\`\${isExpanded ? '' : 'line-clamp-3'} text-gray-600\`}
      >
        {text}
      </p>
      {isClamped && !isExpanded && (
        <button onClick={() => setIsExpanded(true)} className="text-blue-600 text-sm mt-1">
          展開全文
        </button>
      )}
    </div>
  );
}   `}
</CodeBlock>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-800 text-sm font-bold mb-2">ResizeObserver vs window.resize</p>
                  <ul className="text-green-700 text-xs space-y-1.5 leading-relaxed">
                    <li>• ResizeObserver 監聽特定元素，window.resize 只監聽視窗</li>
                    <li>• ResizeObserver 在元素大小變化的「微任務」中觸發，更即時</li>
                    <li>• 不需要 throttle/debounce，瀏覽器已處理批次更新</li>
                    <li>• 支援同時觀察多個元素</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-orange-600 shrink-0 mt-0.5" size={14} />
                    <div>
                      <p className="text-orange-800 text-sm font-bold mb-1">注意：避免 ResizeObserver Loop</p>
                      <p className="text-orange-700 text-xs leading-relaxed">
                        如果在 ResizeObserver callback 中修改被觀察元素的大小（例如：setState 觸發重新渲染並改變 DOM），可能造成無限循環。最好只讀取大小，不直接修改被觀察元素。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：Page Visibility API ───────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-amber-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <EyeOff className="text-amber-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：Page Visibility API — 用戶離開頁面了嗎？
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Page Visibility API 讓你知道用戶目前是否在看這個頁面——他們切換到其他分頁、最小化視窗、或鎖定螢幕時，<code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">document.hidden</code> 會變成 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">true</code>。善用這個 API，可以暫停不必要的 CPU/網路消耗，節省用戶的電量和流量。
              </p>

              <CodeBlock language="typescript">
{`   // hooks/usePageVisibility.ts
import { useState, useEffect } from 'react';

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleChange = () => setIsVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleChange);
    return () => document.removeEventListener('visibilitychange', handleChange);
  }, []);

  return isVisible;
}

// ── 使用案例 1：暫停影片（用戶切換分頁時自動暫停）
function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = usePageVisibility();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isVisible) {
      video.pause();
      // 注意：用戶回來時刻意不自動播放（尊重用戶決定）
    }
  }, [isVisible]);

  return <video ref={videoRef} src={src} controls className="w-full" />;
}

// ── 使用案例 2：暫停 WebSocket / 輪詢（頁面不可見時停止請求）
function useLiveData() {
  const isVisible = usePageVisibility();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isVisible) return; // 頁面不可見時直接 return，不建立 interval

    const interval = setInterval(async () => {
      const newData = await fetchLatestData();
      setData(newData);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]); // isVisible 改變時重新執行 effect

  return data;
}

// ── 使用案例 3：追蹤用戶在頁面上停留的實際時間
function useActiveTime() {
  const isVisible = usePageVisibility();
  const [activeSeconds, setActiveSeconds] = useState(0);

  useEffect(() => {
    if (!isVisible) return; // 頁面不可見時不計時

    const interval = setInterval(() => {
      setActiveSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return activeSeconds;
}

async function fetchLatestData() {
  const res = await fetch('/api/data');
  return res.json();
}   `}
</CodeBlock>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mt-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-amber-800 text-sm font-medium mb-1">Page Visibility 使用場景整理</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        '影片/音樂播放器（切換分頁自動暫停）',
                        '即時資料輪詢（頁面不可見時暫停）',
                        '遊戲（切換分頁暫停遊戲進度）',
                        '分析追蹤（計算用戶真實在場時間）',
                        'WebSocket 連線管理（暫停心跳）',
                        '動畫（不在視窗中時暫停 requestAnimationFrame）',
                      ].map((item) => (
                        <p key={item} className="text-amber-700 text-xs flex items-start gap-1">
                          <span className="mt-0.5">•</span> {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 7：Web Crypto API ─────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-amber-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <ShieldCheck className="text-amber-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 7：Web Crypto API — 瀏覽器端加密
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Web Crypto API（<code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">crypto.subtle</code>）是瀏覽器內建的密碼學 API，支援 AES、RSA、ECDH 等常見加密演算法，以及 SHA-256、SHA-512 等雜湊函式。在瀏覽器端就能完成加密，不需要把敏感資料送到後端。
              </p>

              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200 mb-6">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="text-teal-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-teal-800 text-sm font-medium mb-1">為什麼用 Web Crypto 而不是第三方加密庫？</p>
                    <p className="text-teal-700 text-xs leading-relaxed">
                      Web Crypto API 由瀏覽器原生實作，使用硬體加速，效能遠優於純 JavaScript 的加密庫。它也不需要加到 bundle，零成本引入。此外，Web Crypto 是 FIPS 140-2 合規的實作，比大多數第三方庫更受信任。
                    </p>
                  </div>
                </div>
              </div>

              <CodeBlock language="typescript">
{`   // ── AES-GCM 對稱加密 ──────────────────────────────────────

// 生成加密金鑰
async function generateKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 }, // 256-bit AES
    true,                               // extractable: 允許匯出金鑰
    ['encrypt', 'decrypt']             // 金鑰用途
  );
}

// AES-GCM 加密（每次加密都要用隨機 IV，確保相同明文加密結果不同）
async function encrypt(text: string, key: CryptoKey): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12 byte 隨機 IV
  const encoded = new TextEncoder().encode(text);

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  // 將 IV 和加密資料合併（解密時需要 IV，IV 不需要保密）
  const combined = new Uint8Array(iv.byteLength + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.byteLength);

  // 轉為 Base64 方便儲存和傳輸
  return btoa(String.fromCharCode(...combined));
}

// AES-GCM 解密
async function decrypt(encryptedBase64: string, key: CryptoKey): Promise<string> {
  const combined = new Uint8Array(
    atob(encryptedBase64).split('').map(c => c.charCodeAt(0))
  );

  const iv = combined.slice(0, 12);   // 取出前 12 bytes 的 IV
  const data = combined.slice(12);    // 剩餘是加密資料

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  return new TextDecoder().decode(decrypted);
}

// ── SHA-256 Hash ──────────────────────────────────────────
// 常用於：資料完整性驗證、密碼確認（配合 salt）、Gravatar URL 生成
async function sha256(message: string): Promise<string> {
  const encoded = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // 轉為十六進位字串
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── 使用範例 ───────────────────────────────────────────────
async function demo() {
  // 最常用的：生成隨機 UUID（不需要 crypto.subtle）
  const id = crypto.randomUUID();
  console.log(id); // '550e8400-e29b-41d4-a716-446655440000'

  // SHA-256
  const hash = await sha256('Hello, World!');
  console.log(hash); // 'dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986d'

  // AES-GCM 加密解密
  const key = await generateKey();
  const ciphertext = await encrypt('機密訊息：不能讓第三方看到', key);
  const plaintext = await decrypt(ciphertext, key);
  console.log(plaintext); // '機密訊息：不能讓第三方看到'

  // 金鑰匯出（儲存到 IndexedDB 或 LocalStorage）
  const exportedKey = await crypto.subtle.exportKey('jwk', key);
  console.log(JSON.stringify(exportedKey));

  // 金鑰匯入（從儲存的 JWK 恢復金鑰）
  const importedKey = await crypto.subtle.importKey(
    'jwk',
    exportedKey,
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt']
  );
  console.log('金鑰匯入成功：', importedKey);
}   `}
</CodeBlock>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                {[
                  {
                    api: 'crypto.randomUUID()',
                    use: '生成 v4 UUID，比 Math.random() 更安全',
                    color: 'blue',
                  },
                  {
                    api: 'crypto.getRandomValues()',
                    use: '生成密碼學安全的隨機數（IV、Salt、Token）',
                    color: 'purple',
                  },
                  {
                    api: 'crypto.subtle.digest()',
                    use: 'SHA-256/512 雜湊，資料完整性驗證',
                    color: 'teal',
                  },
                ].map(({ api, use, color }) => (
                  <div key={api} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <p className={`font-mono text-${color}-800 text-xs font-bold mb-2`}>{api}</p>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>{use}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-yellow-700/10 to-amber-600/10 rounded-xl border border-amber-200">
                <div className="flex items-start gap-3">
                  <Zap className="text-amber-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-gray-800 mb-1">這些 Web API 改變你的思維方式</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      學完這些 API，你會發現瀏覽器本身就是一個非常強大的執行環境。很多你以為「必須靠後端或第三方庫」才能做到的事，其實瀏覽器原生就支援：多執行緒計算（Web Workers）、大型資料庫（IndexedDB）、高效 DOM 監聽（Observer APIs）、加密（Web Crypto）。善用這些工具，你的應用會更快、更省流量、用戶體驗更好。
                    </p>
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
            {['Web Workers', 'IndexedDB', 'Intersection Observer', 'ResizeObserver', 'Page Visibility', 'Web Crypto', 'JavaScript', 'Browser APIs'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-amber-100 text-amber-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/js/ep08-functional-programming">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-amber-400">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-amber-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.08 Functional Programming</p>
                      <p className="text-xs text-gray-400">Pure Functions · Immutability · Compose</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/js/30days-learning-review">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-amber-400">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right w-full">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">JavaScript 30天回顧</p>
                      <p className="text-xs text-gray-400">從 JS 基礎到進階的學習總整理</p>
                    </div>
                    <ArrowRight className="text-amber-500 shrink-0" size={20} />
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
