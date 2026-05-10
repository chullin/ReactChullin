'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
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
  ShoppingCart,
  GitBranch,
  FlaskConical,
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

export default function WebDevEP25() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.25</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web Development Bootcamp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              useReducer：<br />
              <span className="text-cyan-200">當 useState 不夠用的時候</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl">
              dispatch / action / reducer 三角關係、購物車實戰 — 從 useState 升級到 useReducer 的正確時機
            </p>
            <div className="flex items-center gap-6 text-cyan-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> useReducer · Context API · TypeScript</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：你什麼時候需要 useReducer ─────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 1：你什麼時候需要 useReducer</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            很多開發者在學完 useState 之後，遇到複雜狀態就繼續硬撐，直到元件裡塞了 5、6 個 useState，
            每個操作函式都要同時協調好幾個 state，才意識到事情不對勁。
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            先看一個具體的例子：用 useState 管理購物車，看看這有多痛苦。
          </p>

          <CodeBlock language="tsx">
{` function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');

  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (productId) => { /* ... */ };
  const updateQty = (productId, qty) => { /* ... */ };
  const applyCoupon = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const discount = await validateCoupon(code);
      setDiscount(discount);
    } catch {
      setError('優惠券無效');
    } finally {
      setLoading(false);
    }
  };
  const clearCart = () => { /* ... */ };
} `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-8 border-l-4 border-red-500">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle size={28} className="text-red-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">這就是 useReducer 要解決的問題</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    5 個 useState，6 個操作函式，每個函式還要手動協調多個 state。
                    當邏輯繼續複雜化，這個元件將難以維護、難以測試、難以理解。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-4">什麼時候該從 useState 升級到 useReducer？</h3>

          <Card className="border-0 shadow-md mt-4 bg-gradient-to-r from-indigo-50 to-cyan-50">
            <CardBody className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-indigo-200">
                      <th className="text-left py-2 pr-6 text-indigo-800 font-bold">用 useState</th>
                      <th className="text-left py-2 text-cyan-800 font-bold">用 useReducer</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 space-y-1">
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-6">單一簡單值</td>
                      <td className="py-2">多個相關的 state</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-6">操作邏輯簡單</td>
                      <td className="py-2">多個操作共用複雜邏輯</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-6">state 之間互相獨立</td>
                      <td className="py-2">state 之間有關聯</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-6">1–2 個操作</td>
                      <td className="py-2">3+ 個操作</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：useReducer 三角關係 ───────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <GitBranch size={20} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 2：useReducer 三角關係</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            useReducer 就像一個「郵差中心」的系統：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="border-0 shadow-md bg-indigo-50">
              <CardBody className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-indigo-200 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-sm">你</div>
                  <span className="text-indigo-800 font-bold">元件（Component）</span>
                </div>
                <p className="text-indigo-700 text-sm">發出「訂單」— 呼叫 <code className="bg-white/70 px-1 rounded">dispatch(action)</code>，說明你想做什麼操作。</p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-blue-50">
              <CardBody className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center text-blue-700 font-bold text-sm">中</div>
                  <span className="text-blue-800 font-bold">Reducer（郵差中心）</span>
                </div>
                <p className="text-blue-700 text-sm">根據「訂單類型」（action.type）決定怎麼改變倉庫，永遠回傳一個新的 state 物件。</p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-cyan-50">
              <CardBody className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-cyan-200 rounded-lg flex items-center justify-center text-cyan-700 font-bold text-sm">庫</div>
                  <span className="text-cyan-800 font-bold">State（倉庫）</span>
                </div>
                <p className="text-cyan-700 text-sm">儲存所有相關的狀態。更新後，React 重新渲染元件，畫面根據新倉庫狀態展示。</p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-sky-50">
              <CardBody className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-sky-200 rounded-lg flex items-center justify-center text-sky-700 font-bold text-sm">面</div>
                  <span className="text-sky-800 font-bold">畫面（UI）</span>
                </div>
                <p className="text-sky-700 text-sm">根據最新的 state 重新渲染，展示給用戶看。用戶操作又觸發新的 dispatch，形成循環。</p>
              </CardBody>
            </Card>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-4">Action 的型別定義（TypeScript 聯合型別）</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            在 TypeScript 中，用聯合型別（Union Type）定義所有可能的 action，讓 reducer 裡的 switch 可以做到完整的型別推導。
          </p>

          <CodeBlock language="tsx">
{` // Action 的型別定義（TypeScript 聯合型別）
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QTY'; payload: { id: string; qty: number } }
  | { type: 'APPLY_COUPON'; payload: { code: string; discount: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// State 型別
type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  discount: number;
  couponCode: string;
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  discount: 0,
  couponCode: '',
}; `}
</CodeBlock>

          <Card className="border-0 shadow-md mt-6 bg-gradient-to-r from-indigo-50 to-blue-50">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <BookOpen size={24} className="text-indigo-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">為什麼用聯合型別定義 Action？</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    當你在 switch 的每個 case 裡存取 <code className="bg-white px-1 rounded border text-xs">action.payload</code>，
                    TypeScript 會根據 <code className="bg-white px-1 rounded border text-xs">action.type</code> 自動縮小型別（Type Narrowing）。
                    例如在 <code className="bg-white px-1 rounded border text-xs">case 'ADD_ITEM'</code> 裡，
                    TypeScript 知道 payload 是 <code className="bg-white px-1 rounded border text-xs">Product</code>，
                    不是 <code className="bg-white px-1 rounded border text-xs">{"{ id: string }"}&#125;</code>。
                    這讓 reducer 的每個分支都能享有完整的型別安全。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Reducer 函式 ───────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <Code2 size={20} className="text-cyan-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 3：Reducer 函式</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Reducer 是整個模式的核心。它接受「目前的 state」和「一個 action」，回傳「新的 state」。
            所有的更新邏輯都集中在這裡，取代了分散在各個 handler 函式的 setXxx 呼叫。
          </p>

          <CodeBlock language="tsx">
{` function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload.id),
      };

    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items
          .map(i =>
            i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
          )
          .filter(i => i.qty > 0), // qty 到 0 自動移除
      };

    case 'APPLY_COUPON':
      return {
        ...state,
        discount: action.payload.discount,
        couponCode: action.payload.code,
      };

    case 'CLEAR_CART':
      return initialState; // 重置到初始狀態

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
} `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-4">Reducer 是純函式（Pure Function）</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="border-0 shadow-md bg-green-50">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle size={16} className="text-green-700" />
                </div>
                <h4 className="font-bold text-green-800 mb-2 text-sm">1. 相同輸入 = 相同輸出</h4>
                <p className="text-green-700 text-xs leading-relaxed">
                  輸入相同的 state + action，永遠輸出相同的新 state。沒有隨機性、沒有外部依賴。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-yellow-50">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-yellow-200 rounded-lg flex items-center justify-center mb-3">
                  <AlertTriangle size={16} className="text-yellow-700" />
                </div>
                <h4 className="font-bold text-yellow-800 mb-2 text-sm">2. 不能有副作用</h4>
                <p className="text-yellow-700 text-xs leading-relaxed">
                  不能在 reducer 裡 fetch API、不能 setTimeout、不能操作 DOM。副作用留給 useEffect 或 event handler。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-blue-50">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center mb-3">
                  <Layers size={16} className="text-blue-700" />
                </div>
                <h4 className="font-bold text-blue-800 mb-2 text-sm">3. 不修改原始 state</h4>
                <p className="text-blue-700 text-xs leading-relaxed">
                  永遠回傳新物件（<code className="bg-white/70 px-1 rounded">{"...state"}</code>）。直接修改原始 state 不會觸發 React re-render。
                </p>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：在元件中使用 useReducer ─────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <ShoppingCart size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 4：在元件中使用 useReducer</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            有了 reducer 函式和 action 型別定義，在元件裡呼叫 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">useReducer</code> 非常簡潔。
            所有操作函式都變成單一行的 dispatch 呼叫。
          </p>

          <CodeBlock language="tsx">
{` function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { items, loading, error, discount, couponCode } = state;

  // 操作函式變得很簡潔 — 每個只需一行
  const addItem = (product: Product) =>
    dispatch({ type: 'ADD_ITEM', payload: product });

  const removeItem = (id: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });

  // 非同步操作：在 event handler 裡依序 dispatch 多個 action
  const applyCoupon = async (code: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const discount = await validateCoupon(code);
      dispatch({ type: 'APPLY_COUPON', payload: { code, discount } });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: '優惠券無效或已過期' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const totalPrice = useMemo(() =>
    items.reduce((sum, i) => sum + i.price * i.qty, 0) * (1 - discount),
    [items, discount]
  );

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div className="text-gray-400">驗證中...</div>}

      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={() => removeItem(item.id)}
          onQtyChange={(qty) =>
            dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty } })
          }
        />
      ))}

      <CouponInput
        value={couponCode}
        onApply={applyCoupon}
        discount={discount}
      />

      <div className="text-xl font-bold">
        總計：NT$ {totalPrice.toLocaleString()}
      </div>

      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
        清空購物車
      </button>
    </div>
  );
} `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <Zap size={24} className="shrink-0 mt-1 text-cyan-200" />
                <div>
                  <h4 className="font-bold text-lg mb-3">useReducer 讓元件職責變得清晰</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-cyan-200 mb-1">元件（Cart）負責</p>
                      <ul className="text-white/80 space-y-1 text-xs">
                        <li>• 呼叫 useReducer 取得 state 和 dispatch</li>
                        <li>• 根據 state 渲染 UI</li>
                        <li>• 在事件裡 dispatch action</li>
                        <li>• 處理非同步邏輯（fetch、try/catch）</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-cyan-200 mb-1">Reducer 負責</p>
                      <ul className="text-white/80 space-y-1 text-xs">
                        <li>• 根據 action 計算新的 state</li>
                        <li>• 所有「如何更新」的邏輯集中在此</li>
                        <li>• 保持純函式，不做任何副作用</li>
                        <li>• 可以獨立測試，不需要渲染任何 UI</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：useReducer + Context ──────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 5：useReducer + Context — 全域狀態管理</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            useReducer 本身只解決「單一元件」內的複雜狀態問題。如果你希望購物車狀態在整個 App 都能存取，
            做法是把 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">useReducer</code> 放進
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm"> Context</code> 裡。
            這個組合被稱為「輕量 Redux」，在不引入第三方狀態管理庫的情況下，
            實現全域可存取的結構化狀態。
          </p>

          <CodeBlock language="tsx">
{` import { createContext, useContext, useReducer } from 'react';

// ── 1. 建立 Context ───────────────────────────────────────────────
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// ── 2. 建立 Provider 元件 ─────────────────────────────────────────
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// ── 3. 建立自訂 Hook，封裝 useContext + 錯誤處理 ─────────────────
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

// ── 4. 在 layout 或 App 層包裹 Provider ──────────────────────────
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

// ── 5. 任何深層元件都可以直接存取購物車狀態 ──────────────────────
function ProductCard({ product }: { product: Product }) {
  const { state, dispatch } = useCart();
  const inCart = state.items.some(i => i.id === product.id);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>NT$ {product.price.toLocaleString()}</p>
      <button
        onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
        className={inCart ? 'btn-secondary' : 'btn-primary'}
      >
        {inCart ? '已在購物車' : '加入購物車'}
      </button>
    </div>
  );
}

// 購物車 icon 元件（顯示數量）
function CartIcon() {
  const { state } = useCart();
  const totalQty = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="relative">
      <ShoppingCartIcon size={24} />
      {totalQty > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white
          text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalQty}
        </span>
      )}
    </div>
  );
} `}
</CodeBlock>

          <Card className="border-0 shadow-md mt-6 bg-blue-50">
            <CardBody className="p-5">
              <h4 className="font-bold text-blue-800 mb-3">這個模式解決了什麼？</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
                <div>
                  <p className="font-semibold mb-1">集中的更新邏輯</p>
                  <p className="text-xs">所有狀態改變都透過 reducer，一眼就能看到所有可能的更新操作。</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">任何層級可存取</p>
                  <p className="text-xs">不需要 prop drilling，深層元件直接 useCart() 即可存取和更新狀態。</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">無額外依賴</p>
                  <p className="text-xs">純 React 內建 API，不需要安裝 Redux、Zustand 等外部套件。</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：useReducer vs useState vs Zustand ─────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <FlaskConical size={20} className="text-cyan-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 6：useReducer vs useState vs Zustand</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            選擇狀態管理工具沒有「最好」，只有「最適合當下場景」。以下是三者的對比，幫助你做出正確選擇。
          </p>

          <Card className="border-0 shadow-md mb-8">
            <CardBody className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 pr-4 text-gray-500 font-medium"></th>
                      <th className="text-left py-2 pr-4 text-indigo-700 font-bold">useState</th>
                      <th className="text-left py-2 pr-4 text-blue-700 font-bold">useReducer</th>
                      <th className="text-left py-2 text-cyan-700 font-bold">Zustand</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">學習成本</td>
                      <td className="py-2.5 pr-4 text-green-600">最低</td>
                      <td className="py-2.5 pr-4 text-yellow-600">低–中</td>
                      <td className="py-2.5 text-yellow-600">低</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">適合場景</td>
                      <td className="py-2.5 pr-4">簡單值</td>
                      <td className="py-2.5 pr-4">複雜相關 state</td>
                      <td className="py-2.5">全域狀態</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">TypeScript</td>
                      <td className="py-2.5 pr-4">容易</td>
                      <td className="py-2.5 pr-4 text-green-600 font-semibold">很好（union type）</td>
                      <td className="py-2.5">很好</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">Devtools</td>
                      <td className="py-2.5 pr-4 text-red-500">❌</td>
                      <td className="py-2.5 pr-4 text-red-500">❌</td>
                      <td className="py-2.5 text-green-600">✅</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">Bundle size</td>
                      <td className="py-2.5 pr-4 text-green-600">內建</td>
                      <td className="py-2.5 pr-4 text-green-600">內建</td>
                      <td className="py-2.5 text-yellow-600">額外 2KB</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-gray-700">測試難度</td>
                      <td className="py-2.5 pr-4">簡單</td>
                      <td className="py-2.5 pr-4 text-green-600 font-semibold">最容易（純函式）</td>
                      <td className="py-2.5">簡單</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FlaskConical size={18} className="text-cyan-600" />
            useReducer 的隱藏優勢：測試超容易
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4">
            因為 reducer 是純函式，你可以在完全不渲染任何 UI 的情況下，直接呼叫函式並驗證回傳值。
            這是 useReducer 相比 useState 最大的測試優勢。
          </p>

          <CodeBlock language="typescript">
{` // cart.test.ts — 純函式測試，不需要 render 任何元件！
import { cartReducer, initialState } from './cartReducer';

describe('cartReducer', () => {
  test('ADD_ITEM 應該將商品加入購物車', () => {
    const result = cartReducer(initialState, {
      type: 'ADD_ITEM',
      payload: { id: '1', name: 'iPhone 16', price: 30000 },
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].qty).toBe(1);
  });

  test('ADD_ITEM 同一商品應該累加數量', () => {
    const stateWithItem = cartReducer(initialState, {
      type: 'ADD_ITEM',
      payload: { id: '1', name: 'iPhone 16', price: 30000 },
    });
    const result = cartReducer(stateWithItem, {
      type: 'ADD_ITEM',
      payload: { id: '1', name: 'iPhone 16', price: 30000 },
    });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].qty).toBe(2);
  });

  test('UPDATE_QTY qty 為 0 應該自動移除商品', () => {
    const stateWithItem = cartReducer(initialState, {
      type: 'ADD_ITEM',
      payload: { id: '1', name: 'iPhone 16', price: 30000 },
    });
    const result = cartReducer(stateWithItem, {
      type: 'UPDATE_QTY',
      payload: { id: '1', qty: 0 },
    });
    expect(result.items).toHaveLength(0);
  });

  test('CLEAR_CART 應該回到初始狀態', () => {
    const stateWithItem = cartReducer(initialState, {
      type: 'ADD_ITEM',
      payload: { id: '1', name: 'iPhone 16', price: 30000 },
    });
    const result = cartReducer(stateWithItem, { type: 'CLEAR_CART' });
    expect(result).toEqual(initialState);
  });
});

// 對比：如果用 useState，要測試 addItem 邏輯，
// 你必須 render <Cart />、找到按鈕、模擬點擊、
// 再斷言 DOM 上的數字 — 複雜度高出好幾倍。 `}
</CodeBlock>

          <Card className="border-0 shadow-md mt-8 border-l-4 border-cyan-500 bg-cyan-50">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle size={24} className="text-cyan-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">總結：如何選擇？</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold shrink-0">useState</span>
                      <span>— 獨立的簡單值、1–2 個操作。例如：modal 的 isOpen、input 的即時值。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold shrink-0">useReducer</span>
                      <span>— 多個相關 state、3+ 個操作、需要可測試性。例如：購物車、表單狀態機、遊戲狀態。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold shrink-0">Zustand</span>
                      <span>— 跨多個路由的全域狀態、需要 devtools、團隊規模較大。例如：用戶認證、主題設定、通知系統。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ──────────────────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <h3 className="text-lg font-bold text-gray-700 mb-4">本篇涵蓋技術</h3>
          <div className="flex flex-wrap gap-2">
            {['useReducer', 'useState', 'Context API', 'State Management', 'TypeScript', 'React'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                classNames={{
                  base: 'bg-indigo-100 text-indigo-700',
                  content: 'font-medium text-xs',
                }}
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Navigation ────────────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep24-error-suspense">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <ArrowLeft size={14} />
                    <span>上一篇</span>
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    EP.24 Error Boundary
                  </p>
                  <p className="text-gray-400 text-xs mt-1">優雅的錯誤處理與 Suspense</p>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/web-dev/ep26-react-testing">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-400 text-xs mb-2">
                    <span>下一篇</span>
                    <ArrowRight size={14} />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    EP.26 React 測試
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Testing Library 完整實戰指南</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
