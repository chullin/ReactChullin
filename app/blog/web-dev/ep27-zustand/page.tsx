'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  Zap,
  Package,
  ShoppingCart,
  Layers,
  BarChart3,
  CheckCircle,
  XCircle,
  Settings,
  Database,
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

export default function WebDevEP27() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-fuchsia-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-purple-800 via-violet-700 to-fuchsia-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.27</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">React 實戰系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Zustand：<br />
              <span className="text-fuchsia-300">輕量全域狀態管理</span>
            </h1>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl">
              比 Redux 簡單 10 倍、比 Context 效能更好 — 2026 年最推薦的 React 狀態管理方案
            </p>
            <div className="flex items-center gap-6 text-fuchsia-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 12 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Zustand · Middleware · Selector</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：為什麼需要 Zustand ─────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-purple-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="text-purple-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：為什麼需要 Zustand
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                在 EP.21 我們學了 Context API，它解決了「prop drilling」問題。但當應用規模增大，Context 和 Redux 各自都有明顯的痛點。Zustand 正是為了解決這兩者的問題而生。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                <XCircle className="text-red-500" size={18} />
                Context API 的效能陷阱
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Context 最大的問題是「粒度太粗」。只要 Context 的 value 物件有任何一個欄位改變，所有訂閱該 Context 的 Consumer 元件都會強制重新渲染，即使它根本沒有用到那個改變的欄位。
              </p>
              <CodeBlock language="tsx">{`// ❌ Context 的效能陷阱：任何 value 改變，所有 Consumer 重新渲染
const AppContext = createContext({ user: null, cart: [], notifications: [] });

// 更新通知 → user 和 cart 沒變 → 但所有 Consumer 都 re-render 了
// CartIcon 元件：只需要 cart，但通知更新時也會被迫重渲染
// UserAvatar 元件：只需要 user，但購物車變動時也會被迫重渲染
// 在大型應用中，這會造成嚴重的效能問題`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8 flex items-center gap-2">
                <XCircle className="text-red-500" size={18} />
                Redux 的問題：學習成本與樣板程式碼
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Redux 功能強大，但即使是最現代的 Redux Toolkit 版本，也需要引入大量概念與多個檔案才能完成一個功能。對中小型應用來說，這個成本往往不值得。
              </p>
              <CodeBlock language="bash">{`npm install @reduxjs/toolkit react-redux  # 兩個 package，30+ KB

# 要實作一個「計數器」功能，你需要：
# 1. counterSlice.ts      → 定義 reducer 與 actions
# 2. store.ts             → 建立 Redux store
# 3. 在 main.tsx 加上 <Provider store={store}>
# 4. 在元件中 useSelector + useDispatch
# 5. dispatch(increment()) → action → reducer → 新 state

# action → actionCreator → reducer → store → selector → dispatch
# 一個簡單功能要寫 4-5 個概念，對新手來說門檻很高`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} />
                Zustand 的解法
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Zustand（德文「狀態」的意思）只有 2KB，一個 package，整個 store 只需要 20 行。它採用 hook-based API，不需要 Provider，任何元件直接 import 就能使用。
              </p>
              <CodeBlock language="bash">{`npm install zustand  # 一個 package，僅 2KB gzipped

# Zustand 的核心哲學：
# 1. 不需要 Provider 包裹 — 直接 import hook 就能用
# 2. 內建 selector 機制 — 只訂閱你需要的值
# 3. 可選的 middleware — devtools、persist、immer 按需加載
# 4. TypeScript 友好 — 型別推斷完整
# 5. 測試容易 — 純函式，不依賴 React 環境`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：第一個 Store ────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-violet-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <Package className="text-violet-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：第一個 Store
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                用最簡單的計數器範例來理解 Zustand 的核心 API。整個 store 的建立非常直覺——你只需要定義 state 和能修改它的函式，全部寫在一個地方。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">建立 Store</h3>
              <CodeBlock language="typescript">{`// store/useCounterStore.ts
import { create } from 'zustand';

// 定義型別：state 欄位 + 操作函式
type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

// create() 接收一個工廠函式，參數 set 用來更新 state
export const useCounterStore = create<CounterState>((set) => ({
  // 初始 state
  count: 0,

  // 操作函式：set 接收一個函式，參數是當前 state，回傳要合併的新值
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  // 也可以直接傳物件（不需要當前 state 時）
  reset: () => set({ count: 0 }),
}));

// 就這樣！不需要 Provider，不需要 reducer，不需要 action type`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">在元件中使用</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Zustand 最大的優點之一：<strong>不需要 Provider 包裹</strong>。任何元件只要 import hook 就能直接取用 store 中的值，包含在完全不同的元件樹中。
              </p>
              <CodeBlock language="tsx">{`// components/Counter.tsx
import { useCounterStore } from '@/store/useCounterStore';

function Counter() {
  // ✅ 只訂閱需要的值，避免不必要的 re-render
  // 當 count 改變時，這個元件才重新渲染
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div className="flex items-center gap-4">
      <button onClick={decrement} className="btn">-1</button>
      <span className="text-2xl font-bold">{count}</span>
      <button onClick={increment} className="btn">+1</button>
    </div>
  );
}

// 完全不同的元件，直接用同一個 store
// 不需要透過 props 傳遞，不需要 Context
function ResetButton() {
  const reset = useCounterStore((state) => state.reset);
  // 注意：這個元件只訂閱 reset 函式
  // count 改變時，ResetButton 不會重新渲染！
  return <button onClick={reset} className="btn-secondary">重置</button>;
}

// 可以放在頁面任意位置，直接 import 就能通訊
function CountDisplay() {
  const count = useCounterStore((state) => state.count);
  return <p>目前計數：{count}</p>;
}`}</CodeBlock>

              <div className="mt-6 p-4 bg-violet-50 rounded-lg border border-violet-200">
                <p className="text-violet-800 text-sm font-medium mb-1">重點對比</p>
                <p className="text-violet-700 text-sm leading-relaxed">
                  Context 需要：<code className="bg-violet-100 px-1 rounded">createContext → Provider 包裹 → useContext</code>，且 value 改變時所有 Consumer 都重渲染。<br />
                  Zustand 只需要：<code className="bg-violet-100 px-1 rounded">import hook → 選擇器</code>，且只有選擇的值改變時才重渲染。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：完整的購物車 Store ──────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-fuchsia-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-fuchsia-100 rounded-lg">
                  <ShoppingCart className="text-fuchsia-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：完整的購物車 Store
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                在 EP.25 我們用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">useReducer + Context</code> 實作了購物車，需要分開的 reducer 函式、action types、Context 建立和 Provider 設定。現在用 Zustand 改寫，程式碼量大幅減少，而且還能免費得到 localStorage 持久化。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">購物車 Store（含自動持久化）</h3>
              <CodeBlock language="typescript">{`// store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(  // ✅ 用 persist middleware 包裹，自動持久化到 localStorage！
    (set, get) => ({
      items: [],

      // 加入商品：如果已存在則 qty+1，否則新增
      addItem: (product) => set((state) => {
        const existing = state.items.find(i => i.id === product.id);
        if (existing) {
          return {
            items: state.items.map(i =>
              i.id === product.id ? { ...i, qty: i.qty + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...product, qty: 1 }] };
      }),

      // 移除商品
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id),
      })),

      // 更新數量：qty <= 0 時自動移除
      updateQty: (id, qty) => set((state) => ({
        items: qty > 0
          ? state.items.map(i => i.id === id ? { ...i, qty } : i)
          : state.items.filter(i => i.id !== id),
      })),

      // 清空購物車
      clearCart: () => set({ items: [] }),

      // 衍生值：直接在 store 裡定義計算邏輯
      // 使用 get() 而非 set()，因為只是讀取當前 state
      totalPrice: () => get().items.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
      ),
    }),
    {
      name: 'cart-storage',  // localStorage 的 key 名稱
      // 可選：partialize 只持久化特定欄位
      // partialize: (state) => ({ items: state.items }),
    }
  )
);`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">在各元件中使用</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                各元件只訂閱自己需要的部分，彼此完全解耦。不需要任何 Provider，不需要透過 props 傳遞回調函式。
              </p>
              <CodeBlock language="tsx">{`// 商品卡片：只需要 addItem
function ProductCard({ product }: { product: { id: string; name: string; price: number } }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>NT$ {product.price}</p>
      <button onClick={() => addItem(product)}>加入購物車</button>
    </div>
  );
}

// 導覽列購物車圖示：只顯示總數量
function CartBadge() {
  const items = useCartStore((state) => state.items);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  // 只有 items 改變時才重渲染，與 totalPrice 無關
  return (
    <div className="relative">
      <ShoppingCartIcon />
      {totalQty > 0 && (
        <span className="badge">{totalQty}</span>
      )}
    </div>
  );
}

// 購物車總計：只需要 totalPrice
function CartTotal() {
  const totalPrice = useCartStore((state) => state.totalPrice);
  return <div className="text-xl font-bold">總計：NT$ {totalPrice()}</div>;
}

// 購物車列表：需要 items、updateQty、removeItem
function CartList() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} className="flex items-center gap-4">
          <span>{item.name}</span>
          <input
            type="number"
            value={item.qty}
            onChange={(e) => updateQty(item.id, Number(e.target.value))}
            min={0}
          />
          <button onClick={() => removeItem(item.id)}>移除</button>
        </li>
      ))}
    </ul>
  );
}`}</CodeBlock>

              <div className="mt-6 p-4 bg-fuchsia-50 rounded-lg border border-fuchsia-200">
                <p className="text-fuchsia-800 text-sm font-medium mb-1">persist middleware 的魔力</p>
                <p className="text-fuchsia-700 text-sm leading-relaxed">
                  加上 <code className="bg-fuchsia-100 px-1 rounded">persist</code> 之後，使用者重新整理頁面、關閉瀏覽器重開，購物車內容都會保留。這在 Context 或純 Redux 中需要自己寫 localStorage 邏輯，Zustand 一行搞定。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：Middleware ───────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-purple-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Layers className="text-purple-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：Middleware — devtools + persist + immer
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Zustand 的 middleware 系統讓你可以按需疊加功能。三個最常用的 middleware：<strong>devtools</strong>（除錯）、<strong>persist</strong>（持久化）、<strong>immer</strong>（簡化 state 更新）。它們可以自由組合。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Settings size={16} className="text-purple-500" />
                devtools — 連接 Redux DevTools
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                安裝 Redux DevTools 瀏覽器擴充後，加上 devtools middleware 即可在瀏覽器中時間旅行除錯，查看每次 state 改變的歷史記錄。
              </p>
              <CodeBlock language="typescript">{`import { devtools } from 'zustand/middleware';

const useStore = create<State>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
      //                                                              ^^^^^ ^^^^^^^^^^^
      //                                                        replace?   action 名稱（DevTools 顯示用）
    }),
    { name: 'CounterStore' }  // DevTools 中顯示的 store 名稱
  )
);

// 在 Redux DevTools 中你可以看到：
// - 每一次 action 的名稱（increment、decrement...）
// - 每次 action 前後的 state 差異
// - 時間旅行：回到任意歷史 state`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8 flex items-center gap-2">
                <Database size={16} className="text-violet-500" />
                immer — 直接 mutate state
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                immer middleware 讓你在 set 函式中直接修改 state（mutate），不需要手動 spread 展開。immer 在背後幫你產生不可變的新 state。
              </p>
              <CodeBlock language="typescript">{`import { immer } from 'zustand/middleware/immer';

const useCartStore = create<CartStore>()(
  immer((set) => ({
    items: [],

    // ✅ 使用 immer：可以直接 mutate，更直覺
    addItem: (product) => set((state) => {
      const existing = state.items.find(i => i.id === product.id);
      if (existing) {
        existing.qty += 1;  // 直接修改！immer 處理 immutability
      } else {
        state.items.push({ ...product, qty: 1 });  // 直接 push！
      }
      // 不需要 return，immer 自動產生新 state
    }),

    // ❌ 沒有 immer 時的寫法：需要手動展開
    // addItem: (product) => set((state) => {
    //   const existing = state.items.find(i => i.id === product.id);
    //   if (existing) {
    //     return {
    //       items: state.items.map(i =>
    //         i.id === product.id ? { ...i, qty: i.qty + 1 } : i
    //       ),
    //     };
    //   }
    //   return { items: [...state.items, { ...product, qty: 1 }] };
    // }),
  }))
);`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">組合多個 Middleware</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                三個 middleware 可以同時使用，用括號依序包裹即可。注意順序：通常 devtools 在最外層，persist 次之，immer 在最內層。
              </p>
              <CodeBlock language="typescript">{`import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useCartStore = create<CartStore>()(
  devtools(          // 最外層：DevTools 監控所有 action
    persist(         // 中間層：持久化 state 到 localStorage
      immer(         // 最內層：允許直接 mutate
        (set, get) => ({
          items: [],
          addItem: (product) => set((state) => {
            const existing = state.items.find(i => i.id === product.id);
            if (existing) {
              existing.qty += 1;  // immer 語法
            } else {
              state.items.push({ ...product, qty: 1 });
            }
          }),
          totalPrice: () => get().items.reduce(
            (sum, i) => sum + i.price * i.qty, 0
          ),
        })
      ),
      { name: 'cart-storage' }   // persist 設定
    ),
    { name: 'CartStore' }        // devtools 設定
  )
);`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：選擇器優化 ──────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-violet-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <BarChart3 className="text-violet-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：選擇器優化 — 防止不必要的 re-render
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Zustand 的 selector 是它效能優於 Context 的關鍵機制。正確使用 selector，可以確保元件只在它真正關心的資料改變時才重新渲染。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">基本 Selector 用法</h3>
              <CodeBlock language="tsx">{`// ❌ 反面示範：拿整個 state 物件
// 每次 store 中任何值改變，這個元件都會重新渲染
const state = useCartStore();
// 即使你只用了 state.items，其他欄位改變也觸發 re-render

// ✅ 正確：只選取需要的欄位
// 只有 items.length 改變時，這個元件才重新渲染
const itemCount = useCartStore((state) => state.items.length);

// ✅ 選取衍生值
const totalPrice = useCartStore((state) => state.totalPrice);
// totalPrice 是函式，每次呼叫都重新計算
// 但「選取 totalPrice 函式本身」的這個訂閱，函式參考不會變

// ✅ 選取函式（動作）時，函式參考是穩定的，不會造成 re-render
const addItem = useCartStore((state) => state.addItem);
const clearCart = useCartStore((state) => state.clearCart);`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">shallow — 訂閱多個欄位</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                當需要同時訂閱多個欄位時，selector 回傳的是一個新物件，每次呼叫都會建立新物件參考（即使內容相同），會造成不必要的 re-render。解法是使用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">shallow</code> 進行淺比較。
              </p>
              <CodeBlock language="tsx">{`import { shallow } from 'zustand/shallow';

// ❌ 問題：每次 store 更新，selector 都回傳新物件
// React 以參考比較，新物件 !== 舊物件，所以每次都重渲染
const { items, addItem } = useCartStore(
  (state) => ({ items: state.items, addItem: state.addItem })
);

// ✅ 解法：加上 shallow 進行淺比較
// 只比較物件的每個 key 的值，值相同就不重渲染
const { items, addItem } = useCartStore(
  (state) => ({ items: state.items, addItem: state.addItem }),
  shallow  // 第二個參數：自訂比較函式
);

// ✅ 另一種寫法：useShallow（Zustand v4.4+）
import { useShallow } from 'zustand/react/shallow';

const { items, addItem } = useCartStore(
  useShallow((state) => ({ items: state.items, addItem: state.addItem }))
);

// 實際效能對比：
// 假設 store 有 { items: [...], user: {...}, ui: {...} }
// 當 user 更新時：
//   - 沒有 selector：CartList 重渲染 ❌
//   - 有 selector + shallow：CartList 不重渲染 ✅`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">訂閱模式的效能階梯</h3>
              <CodeBlock language="tsx">{`// 效能由差到好：

// 1. 整個 store（最差）：任何改變都重渲染
const everything = useStore();

// 2. 單一原始值（好）：只有該值改變才重渲染
const count = useStore((s) => s.count);
const name = useStore((s) => s.user.name);

// 3. 多個值，用 shallow（好）：用淺比較防止多餘重渲染
const { count, name } = useStore(
  useShallow((s) => ({ count: s.count, name: s.user.name }))
);

// 4. 計算衍生值（好）：在 selector 中計算，結果相同就不重渲染
const totalQty = useStore((s) => s.items.reduce((sum, i) => sum + i.qty, 0));
// 即使 items 陣列參考改變，只要 totalQty 數值不變，就不重渲染`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：完整對比表 ──────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-fuchsia-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-fuchsia-100 rounded-lg">
                  <CheckCircle className="text-fuchsia-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：Zustand vs Context vs Redux 完整對比
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                三種狀態管理方案各有適合的場景，沒有絕對的好壞。理解各自的特性，才能在適合的時機選用正確的工具。
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
                      <th className="px-4 py-3 text-left rounded-tl-lg">比較項目</th>
                      <th className="px-4 py-3 text-center">Context API</th>
                      <th className="px-4 py-3 text-center bg-fuchsia-700">Zustand</th>
                      <th className="px-4 py-3 text-center rounded-tr-lg">Redux Toolkit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Bundle size', '0 KB（內建）', '2 KB', '30+ KB'],
                      ['學習成本', '低', '低', '高'],
                      ['效能優化', '需手動 useMemo', '自動 selector', '需 reselect'],
                      ['DevTools', '❌', '✅（middleware）', '✅'],
                      ['持久化', '需自己寫', '✅（middleware）', '需 redux-persist'],
                      ['Provider 包裹', '需要', '不需要', '需要'],
                      ['TypeScript', '好', '很好', '很好'],
                      ['適合場景', '主題/語言設定', '中大型應用', '超大型應用'],
                      ['學習資源', '官方文件完整', '文件簡潔清晰', '生態系最完整'],
                    ].map(([label, ctx, zustand, redux], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{ctx}</td>
                        <td className="px-4 py-3 text-center font-medium text-fuchsia-700 bg-fuchsia-50">{zustand}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{redux}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">2026 年建議選用路線</h3>
              <CodeBlock language="typescript">{`// 根據應用規模選擇狀態管理方案

// 1. 小型專案 / 簡單共享狀態 → Context API
//    適合：主題切換（dark/light）、語言設定、登入使用者資訊
//    特點：零依賴、React 內建、概念簡單
const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

// 2. 中大型專案 / 複雜 state 邏輯 → Zustand ⭐ 2026 年首選
//    適合：購物車、表單狀態、多步驟流程、跨元件共享的複雜 state
//    特點：輕量、TypeScript 友好、middleware 生態完整
const useAppStore = create<AppState>()(/* ... */);

// 3. 超大型應用 / 需要完整 DevTools 生態 → Redux Toolkit
//    適合：企業級應用、需要嚴格 action 追蹤、已有 Redux 技術債
//    特點：最成熟的生態系、最完整的工具鏈、學習成本最高
const store = configureStore({ reducer: { /* ... */ } });

// 判斷流程：
// Q: 只是主題/語言？→ Context
// Q: 有購物車/複雜 state？→ Zustand
// Q: 是 10 人以上團隊的大型 SaaS？→ Redux Toolkit 值得投資`}</CodeBlock>

              <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl border border-purple-200">
                <p className="text-purple-900 font-bold mb-2">學習路線建議</p>
                <p className="text-purple-800 text-sm leading-relaxed">
                  如果你正在學 React，建議的順序是：先搞懂 <strong>useState + useReducer</strong>（EP.17、25），理解 <strong>Context</strong>（EP.21），然後直接跳到 <strong>Zustand</strong>。Redux 可以等到真的遇到超大型專案再學，大多數個人、中小型商業專案用 Zustand 完全夠用。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Tags ───────────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex flex-wrap gap-2">
            {['Zustand', 'State Management', 'Context API', 'Redux', 'React', 'Performance'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-purple-100 text-purple-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep26-react-testing">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-purple-300">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-purple-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.26 React 測試實戰</p>
                      <p className="text-xs text-gray-400">Vitest + Testing Library</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/web-dev/ep28-react-router">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-purple-300">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.28 React Router v6</p>
                      <p className="text-xs text-gray-400">SPA 路由完整指南</p>
                    </div>
                    <ArrowRight className="text-purple-500 shrink-0" size={20} />
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
