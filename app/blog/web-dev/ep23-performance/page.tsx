'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Zap,
  BookOpen,
  Code2,
  Layers,
  BarChart2,
  XCircle,
  Activity
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

export default function WebDevEP23() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-amber-700 via-orange-700 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.23</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web Development Bootcamp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              React 效能優化三件套：<br />
              <span className="text-amber-200">useMemo、useCallback、React.memo</span>
            </h1>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl">
              什麼時候用、什麼時候反而變慢 — 搞懂 re-render 原理才能正確優化
            </p>
            <div className="flex items-center gap-6 text-amber-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> useMemo · useCallback · React.memo</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：痛點 ────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 1：痛點 — 為什麼你的 React app 變慢了</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            你的 React app 好像越寫越卡。明明只是點了一個按鈕更新購物車數量，但整個商品列表都閃了一下——
            即使商品資料完全沒有改變。這不是你的想像，這是 React 的預設行為造成的。
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            先看一個看似無害的元件：
          </p>

          <CodeBlock language="tsx">
{`   function ProductList({ products, onAddToCart }) {
  return (
    <div>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
      ))}
    </div>
  );
}   `}
</CodeBlock>

          <p className="text-gray-600 leading-relaxed mb-6 mt-6 text-lg">
            問題出在哪？當父元件呼叫 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">setState</code>（例如用戶把某個商品加進購物車，更新購物車數量），
            父元件重新渲染，<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">ProductList</code> 也跟著重新渲染，
            然後裡面所有 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">ProductCard</code> 都重新渲染——
            <strong className="text-amber-700"> 即使 products 根本沒有改變</strong>。
          </p>

          <Card className="border-0 shadow-lg border-l-4 border-amber-500">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <Zap size={28} className="text-amber-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">類比時間：React 的 re-render 就像老闆說「開會」</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    React 的 re-render 就像老闆說「開會」，所有人都要去，即使會議跟你的工作無關。
                    <strong className="text-amber-700"> React.memo 就是讓你可以說「我在忙，沒我的事就別叫我」</strong>。
                    但前提是你要先搞懂 React 的 re-render 規則，知道什麼情況才算「有你的事」。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-md bg-amber-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-amber-800 mb-2 text-sm">React 的 re-render 時機</h4>
                <ul className="space-y-1.5 text-xs text-amber-700">
                  <li className="flex items-start gap-1.5"><span className="font-bold shrink-0">1.</span> state 改變</li>
                  <li className="flex items-start gap-1.5"><span className="font-bold shrink-0">2.</span> props 改變</li>
                  <li className="flex items-start gap-1.5"><span className="font-bold shrink-0">3.</span> 父元件 re-render（即使 props 沒變）</li>
                  <li className="flex items-start gap-1.5"><span className="font-bold shrink-0">4.</span> Context 值改變</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-orange-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-orange-800 mb-2 text-sm">問題的根本原因</h4>
                <p className="text-xs text-orange-700 leading-relaxed">
                  規則 3 是最常被忽略的。子元件預設會跟著父元件一起渲染，
                  不管它自己的 props 有沒有變。在元件樹很深的情況下，
                  一個頂層 state 改變會引起大量不必要的渲染。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-red-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-red-800 mb-2 text-sm">三件套的分工</h4>
                <ul className="space-y-1.5 text-xs text-red-700">
                  <li><strong>React.memo</strong>：讓元件記住 props</li>
                  <li><strong>useMemo</strong>：讓運算記住結果</li>
                  <li><strong>useCallback</strong>：讓函式記住 reference</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：React.memo ──────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-orange-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 2：React.memo — 讓元件「記住」上次的 props</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">React.memo</code> 是一個 Higher-Order Component（HOC）。
            把你的元件包進去之後，React 在渲染前會先比較這次和上次的 props。
            如果 props 沒有改變，就跳過渲染，直接用上次的結果。
          </p>

          <CodeBlock language="tsx">
{`   // ❌ 沒有 memo：每次父元件渲染，ProductCard 都重新渲染
function ProductCard({ product, onAdd }) {
  console.log('ProductCard 渲染了', product.id);
  return <div onClick={() => onAdd(product)}>{product.name}</div>;
}

// ✅ 有 memo：props 沒變就跳過渲染
const ProductCard = React.memo(function ProductCard({ product, onAdd }) {
  console.log('ProductCard 渲染了', product.id);
  return <div onClick={() => onAdd(product)}>{product.name}</div>;
});   `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-amber-50 to-orange-50">
            <CardBody className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-amber-600" />
                React.memo 用的是淺比較（Shallow Comparison）
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-700">基本型別（string、number、boolean）：</span>
                    <span className="text-gray-600"> 值相同就跳過 ✅ — <code className="bg-gray-100 px-1 rounded">'hello' === 'hello'</code> 為 true</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-700">物件 / 陣列：</span>
                    <span className="text-gray-600"> 每次渲染都是新的 reference → 比較失敗 ❌ — <code className="bg-gray-100 px-1 rounded">{'{ id: 1 } !== { id: 1 }'}</code></span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-700">函式：</span>
                    <span className="text-gray-600"> 每次渲染都是新建立的函式 → 比較失敗 ❌ — <code className="bg-gray-100 px-1 rounded">{'() => {} !== () => {}'}</code></span>
                  </div>
                </div>
              </div>
              <p className="text-amber-700 font-semibold mt-4 text-sm">
                這就是為什麼光靠 React.memo 還不夠——你還需要 useMemo 穩定物件的 reference，以及 useCallback 穩定函式的 reference。
              </p>
            </CardBody>
          </Card>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">自訂比較函式（進階）</h3>
          <p className="text-gray-600 leading-relaxed mb-4 text-base">
            如果預設的淺比較不夠用（例如你只在意 <code className="bg-gray-100 px-1 rounded text-sm">product.id</code> 有沒有變，不管其他欄位），
            可以傳入第二個參數自訂比較邏輯：
          </p>
          <CodeBlock language="tsx">
{`   const ProductCard = React.memo(
  function ProductCard({ product, onAdd }) {
    return <div onClick={() => onAdd(product)}>{product.name}</div>;
  },
  // 第二個參數：arePropsEqual(prevProps, nextProps)
  // 回傳 true → 跳過渲染（props 視為相同）
  // 回傳 false → 重新渲染
  (prevProps, nextProps) => {
    // 只在意 product.id 和 product.price，其他欄位忽略
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.price === nextProps.product.price
    );
    // 注意：onAdd 的比較這裡被忽略了，
    // 搭配 useCallback 使用更安全
  }
);   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：useMemo ────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Activity size={20} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 3：useMemo — 讓運算結果「記住」上次的值</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">useMemo(fn, deps)</code> 讓你快取一個運算結果。
            只有當 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">deps</code>（依賴陣列）裡的值改變時，才重新執行 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">fn</code>；
            否則直接回傳上次的結果。
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            什麼時候用：<strong className="text-red-700">昂貴的運算，且依賴的資料沒變的情況下不需要重算。</strong>
          </p>

          <CodeBlock language="tsx">
{`   // ❌ 沒有 useMemo：每次渲染都重新排序 / 篩選
// 假設 products 有 10,000 筆資料——每次父元件 setState，這裡就算一次
function ProductList({ products, filterCategory }) {
  const filteredProducts = products
    .filter(p => p.category === filterCategory)
    .sort((a, b) => a.price - b.price);

  return <>{filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}</>;
}

// ✅ 有 useMemo：只在 products 或 filterCategory 改變時重新計算
function ProductList({ products, filterCategory }) {
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.category === filterCategory)
      .sort((a, b) => a.price - b.price);
  }, [products, filterCategory]); // deps array：這兩個值沒變就不重算

  return <>{filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}</>;
}   `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-8 border-l-4 border-red-500">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle size={28} className="text-red-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">重要提醒：useMemo 本身有開銷</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    useMemo 需要儲存上次的結果、比較 deps 陣列。這些操作本身就有成本。
                    <strong className="text-red-600"> 不要對簡單運算用 useMemo，得不償失。</strong>
                  </p>
                  <CodeBlock language="tsx">
{`   // ❌ 完全沒有意義，useMemo 的開銷比加法還貴
const total = useMemo(() => a + b, [a, b]);

// ❌ 這個也是，字串串接不需要 memo
const displayName = useMemo(() => \`\${firstName} \${lastName}\`, [firstName, lastName]);

// ✅ 值得：排序 / 篩選大型陣列
const sortedData = useMemo(() => data.sort(compareFn), [data]);

// ✅ 值得：複雜的巢狀資料轉換
const chartData = useMemo(() => transformRawData(rawSalesData), [rawSalesData]);   `}
</CodeBlock>
                </div>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">useMemo 黃金判斷規則</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">✅ 適合用的情況</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• 運算時間 {'>'} 幾毫秒（大型陣列操作）</li>
                  <li>• 需要穩定的物件 / 陣列 reference</li>
                  <li>• 結果要傳給 React.memo 包裹的子元件</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <XCircle size={16} className="text-red-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">❌ 不適合用的情況</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• 簡單的數學運算</li>
                  <li>• 字串操作</li>
                  <li>• deps 陣列包含大量複雜物件（比較本身就慢）</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                  <AlertTriangle size={16} className="text-amber-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">⚠️ 先量測再決定</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• 用 React DevTools Profiler 測渲染時間</li>
                  <li>• 不要憑感覺判斷「應該很慢」</li>
                  <li>• 如果不確定，先不加，有問題再優化</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：useCallback ──────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Code2 size={20} className="text-amber-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 4：useCallback — 讓函式「記住」上次的 reference</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">useCallback(fn, deps)</code> 就是{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">useMemo(() =&gt; fn, deps)</code> 的語法糖——
            差別在於 useMemo 快取「運算結果」，useCallback 快取「函式本身」。
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            為什麼需要這個？因為 React 元件每次渲染，函式都是重新建立的。
            你以為傳了「同一個 onAdd 函式」給子元件，但對 React 來說那是兩個不同的函式 reference，
            導致 React.memo 失效。
          </p>

          <CodeBlock language="tsx">
{`   function ShoppingCart() {
  const [cart, setCart] = useState([]);

  // ❌ 每次 ShoppingCart 渲染，addToCart 都是新的函式 reference
  // → React.memo 包的 ProductCard 每次都重新渲染，memo 形同虛設
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  // ✅ useCallback：addToCart 的 reference 在 deps 不變時保持穩定
  const addToCart = useCallback((product) => {
    setCart(prev => [...prev, product]);
    // 注意：這裡用了 setCart 的 updater 形式 (prev => ...)
    // 所以不需要把 cart 放進 deps，避免函式頻繁重建
  }, []); // 空 deps：函式本身不依賴任何外部 state / props

  return <ProductList products={products} onAddToCart={addToCart} />;
}   `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-amber-50 to-orange-50">
            <CardBody className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-amber-600" />
                updater 函式的技巧：讓 deps 保持最小
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                當你在 useCallback 內需要讀取 state 的當前值時，有一個常見陷阱：把 state 放進 deps，
                導致函式每次 state 改變都重建（等於沒用 useCallback）。解法是改用 updater 函式形式：
              </p>
              <CodeBlock language="tsx">
{`   // ❌ 把 cart 放進 deps：每次 cart 改變，addToCart 就重建
const addToCart = useCallback((product) => {
  setCart([...cart, product]); // 直接讀 cart
}, [cart]); // cart 改變 → addToCart 重建 → ProductCard 重新渲染

// ✅ 用 updater 形式：不需要讀外部的 cart
const addToCart = useCallback((product) => {
  setCart(prev => [...prev, product]); // 透過 prev 讀取當前值
}, []); // deps 為空 → addToCart reference 永遠穩定   `}
</CodeBlock>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：三件套搭配 ────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 5：三件套如何搭配使用（完整範例）</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            單獨使用三件套的任何一個，效果都是有限的。真正的威力在於正確組合。
            下面是一個完整的購物 app 範例，展示三者如何協同運作：
          </p>

          <h3 className="text-xl font-bold text-gray-800 mb-4">優化後的完整版本</h3>

          <CodeBlock language="tsx">
{`   // types.ts
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// ShoppingApp.tsx
function ShoppingApp() {
  const [cart, setCart] = useState<Product[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [products] = useState<Product[]>(initialProducts); // 商品資料不會變

  // ── 1. useCallback：穩定 addToCart 的 reference ──────────────
  // deps 為空：不依賴任何外部變數（用 updater 形式讀 cart）
  const addToCart = useCallback((product: Product) => {
    setCart(prev => [...prev, product]);
  }, []);

  // ── 2. useMemo：昂貴的篩選 + 排序運算 ───────────────────────
  // 只在 products 或 filterCategory 改變時重新計算
  const filteredProducts = useMemo(() => {
    return filterCategory === 'all'
      ? products
      : products.filter(p => p.category === filterCategory);
  }, [products, filterCategory]);

  // ── 3. useMemo：衍生值（購物車總金額）───────────────────────
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, p) => sum + p.price, 0);
  }, [cart]);

  return (
    <div>
      <CartSummary total={totalPrice} />
      <CategoryFilter
        value={filterCategory}
        onChange={setFilterCategory}
      />
      {/* ProductList 是 React.memo 包裹的元件 */}
      {/* filteredProducts（useMemo）和 addToCart（useCallback）*/}
      {/* 的 reference 都是穩定的，所以 memo 可以發揮效用 */}
      <ProductList
        products={filteredProducts}
        onAddToCart={addToCart}
      />
    </div>
  );
}

// ── React.memo 包裹的子元件 ──────────────────────────────────
const ProductList = React.memo(function ProductList({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: Product) => void;
}) {
  console.log('ProductList 渲染了'); // 只在 products 或 onAddToCart 變時出現
  return (
    <>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
      ))}
    </>
  );
});

// ProductCard 也用 memo 包裹，防止兄弟元件更新時觸發
const ProductCard = React.memo(function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  return (
    <div className="border rounded-lg p-4">
      <h3>{product.name}</h3>
      <p>NT$ {product.price.toLocaleString()}</p>
      <button onClick={() => onAdd(product)}>加入購物車</button>
    </div>
  );
});   `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-amber-600 to-red-600 text-white">
            <CardBody className="p-6">
              <h3 className="font-bold text-lg mb-4">三件套的連鎖效應（為什麼缺一不可）</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-bold text-amber-200 mb-2">只有 React.memo</p>
                  <p className="text-white/80">
                    父元件每次渲染，<code className="bg-white/20 px-1 rounded">addToCart</code> 是新函式、
                    <code className="bg-white/20 px-1 rounded">filteredProducts</code> 是新陣列。
                    淺比較失敗，memo 沒用。
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-bold text-amber-200 mb-2">加上 useCallback</p>
                  <p className="text-white/80">
                    <code className="bg-white/20 px-1 rounded">addToCart</code> 的 reference 穩定了。
                    但 <code className="bg-white/20 px-1 rounded">filteredProducts</code> 每次還是新陣列，memo 仍然失效。
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="font-bold text-amber-200 mb-2">三件套齊全</p>
                  <p className="text-white/80">
                    函式 reference 穩定（useCallback）、陣列 reference 穩定（useMemo）、
                    子元件跳過渲染（React.memo）。購物車更新，商品列表不重新渲染。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：什麼時候不要用 ─────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <XCircle size={20} className="text-orange-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 6：什麼時候「不要」用</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            過早優化是所有問題的根源。以下是三個最常見的錯誤使用模式，
            它們不但沒有優化效能，還讓程式碼變得更難讀和維護。
          </p>

          <div className="space-y-6">
            {/* 錯誤 1 */}
            <Card className="border-0 shadow-md border-l-4 border-red-400">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
                  <XCircle size={18} />
                  錯誤 1：對所有東西都加 useMemo / useCallback
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  這是「過早優化」的典型反面。看到有人說「要用 useMemo 優化效能」就不管三七二十一全加上去。
                  每個 useMemo 和 useCallback 都有記憶體和比較的開銷，不是加越多越快。
                </p>
                <CodeBlock language="tsx">
{`   // ❌ 完全沒有意義——這些操作比 useMemo 本身的開銷還便宜
const name = useMemo(() => user.name, [user.name]);
const isLoggedIn = useMemo(() => !!user, [user]);
const greeting = useMemo(() => \`Hello, \${name}\`, [name]);

// ❌ 這個 useCallback 也是：根本沒有傳給 React.memo 的子元件
// 完全是浪費
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);   `}
</CodeBlock>
              </CardBody>
            </Card>

            {/* 錯誤 2 */}
            <Card className="border-0 shadow-md border-l-4 border-orange-400">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-orange-700 mb-2 flex items-center gap-2">
                  <XCircle size={18} />
                  錯誤 2：在 deps 裡放物件字面量
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  物件字面量（<code className="bg-gray-100 px-1 rounded">{'{}'}</code>）每次渲染都是新的 reference，
                  放進 deps 後 useMemo 和 useCallback 每次都會重新執行，等於沒用。
                </p>
                <CodeBlock language="tsx">
{`   // ❌ { page: 1 } 每次都是新物件 → useMemo 每次都重新計算
const result = useMemo(() => computeData(options), [{ page: 1 }]);

// ❌ 同樣問題，陣列字面量也是每次新建
const filter = useMemo(() => filterData(data), [['a', 'b']]);

// ✅ 把物件抽到外面（或用 useState 管理）
const options = useMemo(() => ({ page: 1 }), []); // 先穩定 options
const result = useMemo(() => computeData(options), [options]); // 再用它   `}
</CodeBlock>
              </CardBody>
            </Card>

            {/* 錯誤 3 */}
            <Card className="border-0 shadow-md border-l-4 border-amber-400">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-amber-700 mb-2 flex items-center gap-2">
                  <XCircle size={18} />
                  錯誤 3：漏寫 deps 造成 stale closure（過期閉包）
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  這是最隱蔽的 bug。deps 少寫了某個變數，函式裡讀到的是「建立當下」的舊值，
                  不是最新的值。用 eslint-plugin-react-hooks 的 exhaustive-deps 規則可以自動偵測。
                </p>
                <CodeBlock language="tsx">
{`   // ❌ 少寫了 userId：userId 改變時，fetchUser 不會更新
// 每次呼叫 fetchUser，userId 永遠是初次建立時的舊值
const fetchUser = useCallback(() => {
  fetch(\`/api/users/\${userId}\`); // userId 是 stale closure
}, []); // ← 應該要有 [userId]

// ✅ 正確寫法
const fetchUser = useCallback(() => {
  fetch(\`/api/users/\${userId}\`);
}, [userId]); // userId 改變 → fetchUser 重建，取到最新 userId

// 設定 ESLint 規則自動偵測（.eslintrc.js）：
// {
//   "extends": ["plugin:react-hooks/recommended"],
//   "rules": {
//     "react-hooks/exhaustive-deps": "error"  // warn 改 error 更嚴格
//   }
// }   `}
</CodeBlock>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 7：Profiler ────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <BarChart2 size={20} className="text-amber-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 7：Profiler — 用數據決定要不要優化</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            在加任何一個 useMemo 或 useCallback 之前，先問自己：
            <strong className="text-amber-700">「這真的慢嗎？有數據支持嗎？」</strong>
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            React DevTools 內建 Profiler 讓你錄製一次互動，看清楚哪個元件渲染了、花了多少毫秒，
            以及為什麼重新渲染。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 text-base">如何使用 React DevTools Profiler</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-700 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>安裝 React DevTools 瀏覽器擴充功能（Chrome / Firefox 都有）</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-700 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>打開 DevTools → 切換到「Profiler」標籤</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-700 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>點「錄製」按鈕（圓形）→ 在 app 上做一次操作（例如點加入購物車）→ 再點一次停止錄製</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-700 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <span>查看 Flamegraph：每個方塊是一個元件，顏色越深 / 越寬代表渲染時間越長</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-700 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">5</span>
                    <span>點擊元件，右側會顯示「Why did this render?」，說明是 props 變了還是 state 變了</span>
                  </li>
                </ol>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <h3 className="font-bold text-gray-800 mb-4 text-base">看哪些指標</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="font-semibold text-red-700 text-sm mb-1">渲染時間（ms）</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      如果某個元件渲染時間 {'>'} 16ms（一個 frame 的預算），就會造成掉幀感。這就是最值得優化的候選對象。
                    </p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3">
                    <p className="font-semibold text-amber-700 text-sm mb-1">灰色的元件</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Flamegraph 中灰色的元件代表「這次沒有渲染」（被 memo 跳過了）。
                      如果你優化後還有你不期望的彩色元件，說明 memo 沒有正確生效。
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="font-semibold text-green-700 text-sm mb-1">Ranked Chart</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      切換到「Ranked」視圖，元件按渲染時間排序。最上面的就是最慢的，優先處理它們。
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-4">程式碼層面的效能量測</h3>
          <CodeBlock language="tsx">
{`   // 用 React 的 Profiler 元件在程式碼層面量測
import { Profiler, ProfilerOnRenderCallback } from 'react';

const onRenderCallback: ProfilerOnRenderCallback = (
  id,           // 元件樹的識別 ID（你自訂的字串）
  phase,        // 'mount' 或 'update'
  actualDuration, // 這次渲染花了幾毫秒
  baseDuration,   // 如果沒有 memo，估計需要幾毫秒
  startTime,
  commitTime,
) => {
  // 可以上報到 DataDog、Sentry 等效能監控服務
  console.log(\`[\${id}] \${phase} 渲染耗時：\${actualDuration.toFixed(2)}ms\`);

  if (actualDuration > 16) {
    console.warn(\`⚠️ \${id} 渲染超過一個 frame（\${actualDuration.toFixed(2)}ms）\`);
  }
};

function App() {
  return (
    <Profiler id="ProductList" onRender={onRenderCallback}>
      <ProductList products={products} onAddToCart={addToCart} />
    </Profiler>
  );
}
// 注意：Profiler 只在開發模式有效，production build 中會自動移除   `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <BarChart2 size={28} className="shrink-0 mt-1 text-amber-200" />
                <div>
                  <h4 className="font-bold text-lg mb-2">效能優化的鐵則</h4>
                  <p className="text-white/90 leading-relaxed">
                    <strong className="text-amber-200">先量測，再優化。</strong>
                    不量測就優化等於猜謎——你可能優化了一個根本不是瓶頸的地方，而真正慢的元件繼續拖累效能。
                    用 Profiler 找到最慢的元件，針對它加三件套，量測改善幅度，確認有效再繼續下一個。
                    這才是工程師的方式。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ──────────────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <h3 className="text-lg font-bold text-gray-700 mb-4">本篇涵蓋技術</h3>
          <div className="flex flex-wrap gap-2">
            {['useMemo', 'useCallback', 'React.memo', 'Performance', 'Re-render', 'React'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                classNames={{
                  base: 'bg-amber-100 text-amber-700',
                  content: 'font-medium text-xs',
                }}
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Navigation ───────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep22-react-forms">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <ArrowLeft size={14} />
                    <span>上一篇</span>
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    EP.22 React 表單實戰
                  </p>
                  <p className="text-gray-400 text-xs mt-1">從 useState 到 react-hook-form</p>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/web-dev/ep24-error-suspense">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-400 text-xs mb-2">
                    <span>下一篇</span>
                    <ArrowRight size={14} />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    EP.24 Error Boundary 與 Suspense
                  </p>
                  <p className="text-gray-400 text-xs mt-1">優雅的錯誤與 Loading 處理</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
