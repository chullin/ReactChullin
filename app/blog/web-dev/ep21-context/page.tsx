'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, Clock, Eye, AlertTriangle, CheckCircle, Radio, Layers, Zap, BarChart3, RefreshCw, Shield } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function WebDevEP21() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-700 via-amber-600 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.21</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web 開發系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Context API：告別 Props Drilling<br />
              <span className="text-yellow-200">跨元件共享狀態的正確方式</span>
            </h1>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl">
              createContext、useContext、ThemeContext 實戰、何時不該用 Context —
              從「到處傳 props」的地獄中解脫，學會讓資料在元件樹中「自由流動」。
            </p>
            <div className="flex items-center gap-6 text-orange-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 13 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Context · useContext · State Management</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* 開場 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Layers size={32} className="text-orange-400 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「App 傳 user 給 Layout，Layout 傳給 Sidebar，Sidebar 傳給 UserProfile……
                    但 Layout 和 Sidebar 根本不用 user，它們只是「中間人」。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    這就是 Props Drilling——資料不得不穿過一層又一層它根本不需要的元件。
                    這篇教你用 Context API 解決這個問題，同時說清楚 Context 的使用邊界，
                    讓你不會把它用在它不擅長的地方。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 1: Props Drilling 的痛苦 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Props Drilling 的痛苦</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            假設你有這樣的元件樹：UserProfile 需要 user 資料，但它藏在樹的很深處。
          </p>

          <Card className="border-0 shadow-md bg-gray-900 text-green-400">
            <CardBody className="p-6 font-mono text-sm">
              <p className="text-gray-400 mb-3">{`// 元件樹結構`}</p>
              <p>App</p>
              <p className="pl-4">└── Layout <span className="text-yellow-400">← 不需要 user，但被迫傳遞</span></p>
              <p className="pl-8">└── Sidebar <span className="text-yellow-400">← 不需要 user，但被迫傳遞</span></p>
              <p className="pl-12">└── UserProfile <span className="text-green-400">← 真正需要 user 的地方</span></p>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed text-lg">
            為了讓 UserProfile 拿到 user，你必須讓每一層都接收並往下傳：
          </p>

          <CodeBlock language="tsx">
{` // App.tsx — 資料的源頭
function App() {
  const [user, setUser] = useState({ name: 'Joseph', email: 'fg6ts15@gmail.com' });

  // 把 user 傳給 Layout（但 Layout 其實不用它！）
  return <Layout user={user} />;
}

// Layout.tsx — 中間人，自己不用 user，但必須接收並轉傳
function Layout({ user }: { user: User }) {
  return (
    <div>
      <main>...</main>
      {/* 繼續往下傳給 Sidebar */}
      <Sidebar user={user} />
    </div>
  );
}

// Sidebar.tsx — 又是中間人
function Sidebar({ user }: { user: User }) {
  return (
    <nav>
      {/* 終於傳到真正需要的地方 */}
      <UserProfile user={user} />
    </nav>
  );
}

// UserProfile.tsx — 真正用到 user 的元件
function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>;
} `}
</CodeBlock>

          <Card className="border-0 shadow-md border-l-4 border-l-red-400">
            <CardBody className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-red-700 mb-3">Props Drilling 的問題（三個層次）</p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">1.</span>
                      <span><strong>中間元件被迫接受它不需要的 props</strong>：Layout 和 Sidebar 的 props 介面被污染，
                      它們根本不在乎 user 是誰，卻必須在型別定義裡聲明。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">2.</span>
                      <span><strong>改 user 型別時，每一層都要改</strong>：假設你在 User 裡加了 avatar 欄位，
                      Layout、Sidebar 的 PropTypes 都要更新，即使它們完全不用 avatar。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">3.</span>
                      <span><strong>難以重構元件</strong>：你想把 UserProfile 移到另一個位置，
                      但 props chain 斷掉了，整個資料流要重新梳理。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 2: Context 解法 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Radio className="text-orange-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Context 的解法 — 全域的「廣播頻道」</h2>
          </div>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-amber-50">
            <CardBody className="p-6">
              <p className="text-gray-800 text-lg leading-relaxed">
                <strong>生活類比：</strong>Context 像辦公室的內部廣播系統。
                HR 透過廣播說「今天提早下班」，<strong>所有人都直接聽到</strong>，
                不需要 HR 親自跑去每個人的座位告知，
                也不需要主管把消息一層一層往下傳達。
                <br /><br />
                每個元件就像一個員工——它只需要「打開廣播收聽」（useContext），
                就能拿到資料，完全不依賴中間層傳遞。
              </p>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed text-lg">
            Context 的使用分三個步驟：建立 Context、提供資料（Provider）、消費資料（useContext）。
            加上一個最佳實踐：把 useContext 封裝成自訂 Hook：
          </p>

          <CodeBlock language="tsx">
{` // context/UserContext.tsx
import { createContext, useContext, useState } from 'react';

type User = {
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// 步驟 1：建立 Context
// undefined 作為預設值，讓我們在沒有 Provider 時能偵測到錯誤
const UserContext = createContext<UserContextType | undefined>(undefined);

// 步驟 2：建立 Provider 元件
// Provider 是「廣播站」，value 是要廣播的內容
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 步驟 3：建立自訂 Hook 封裝存取（最佳實踐）
// 好處：不用每次都引入 UserContext，也確保一定在 Provider 內使用
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    // 清楚的錯誤訊息，方便 debug
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
 `}
</CodeBlock>

          <p className="text-gray-600 leading-relaxed text-lg">
            有了這個 Context，原本四層都要傳遞 props 的問題消失了。
            UserProfile 直接「收聽廣播」就好：
          </p>

          <CodeBlock language="tsx">
{` // App.tsx — 用 Provider 包住整個 app
function App() {
  return (
    <UserProvider>
      <Layout />  {/* ← Layout 不需要任何 props！ */}
    </UserProvider>
  );
}

// Layout.tsx — 完全乾淨，不再是中間人
function Layout() {
  return (
    <div>
      <main>...</main>
      <Sidebar />  {/* ← Sidebar 也不需要任何 props！ */}
    </div>
  );
}

// Sidebar.tsx — 同樣不需要傳任何東西
function Sidebar() {
  return (
    <nav>
      <UserProfile />
    </nav>
  );
}

// UserProfile.tsx — 直接從 Context 取資料
function UserProfile() {
  const { user } = useUser();  // ← 直接收聽廣播！

  if (!user) return <div>未登入</div>;
  return <div>{user.name}</div>;
} `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 3: ThemeContext 實戰 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">完整 ThemeContext 實戰</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            Dark/Light mode 切換是最常見的 Context 使用案例，也是學習 Context 最好的入口。
            讓我們寫一個完整的 ThemeContext，包含持久化到 localStorage：
          </p>

          <CodeBlock language="tsx">
{` // context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // 記住用戶偏好：app 啟動時從 localStorage 讀取
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      // 同時存進 localStorage，下次開啟 app 還記得
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* 根據 theme 加上 Tailwind 的 dark class */}
      <div className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
} `}
</CodeBlock>

          <p className="text-gray-600 leading-relaxed text-lg">
            任何元件都可以直接使用 <code className="bg-gray-100 text-orange-700 px-1.5 py-0.5 rounded font-mono">useTheme</code>，
            完全不需要 props 傳遞：
          </p>

          <CodeBlock language="tsx">
{` // 可以放在 app 的任何地方，不管層級多深
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {theme === 'dark' ? '☀️ 切換淺色' : '🌙 切換深色'}
    </button>
  );
}

// Header 裡使用
function Header() {
  const { theme } = useTheme();

  return (
    <header className={theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      <ThemeToggleButton />
    </header>
  );
}

// 任意深度的子元件都能直接拿到 theme
function DeepNestedComponent() {
  const { theme } = useTheme();
  return <div className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>...</div>;
} `}
</CodeBlock>

          <Card className="border-0 shadow-md border-l-4 border-l-amber-400">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Tailwind Dark Mode 提醒：</strong>使用這個方式時，記得在 tailwind.config 設定
                  <code className="bg-gray-100 font-mono text-sm px-1 rounded mx-1">darkMode: 'class'</code>，
                  這樣 Tailwind 才會根據 <code className="bg-gray-100 font-mono text-sm px-1 rounded">.dark</code> class 套用深色樣式，
                  而不是根據系統設定。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 4: 多個 Context 的組合 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Layers className="text-orange-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">多個 Context 的組合</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            真實 app 通常有多個 Context——主題、使用者、購物車……
            它們都需要在 layout 中組合起來。Provider 的巢狀順序有個慣例：
          </p>

          <CodeBlock language="tsx">
{` // app/layout.tsx
import { ThemeProvider } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserContext';
import { CartProvider } from '@/context/CartContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        {/* 外層放最不常變動的 Context */}
        <ThemeProvider>
          {/* 中層放中等頻率更新的 */}
          <UserProvider>
            {/* 內層放較常更新的 */}
            <CartProvider>
              {children}
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} `}
</CodeBlock>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-amber-50">
            <CardBody className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="text-amber-500 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-amber-800 mb-3">Provider 巢狀順序的邏輯</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    當一個 Context 的值改變，它的所有 children（包含其他 Provider）都可能重新渲染。
                    所以慣例是：
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold shrink-0">外層：</span>
                      <span>ThemeContext — 極少變動（用戶切換一次就固定了）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold shrink-0">中層：</span>
                      <span>UserContext — 登入/登出才變（每個 session 一次）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold shrink-0">內層：</span>
                      <span>CartContext — 相對頻繁（每次加入商品都會更新）</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-3">
                    這樣 Cart 更新時，外層的 Theme 和 User Context 不受影響。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed text-lg">
            如果 Provider 巢狀太多，可以建立一個 <code className="bg-gray-100 text-orange-700 px-1.5 py-0.5 rounded font-mono">AppProviders</code> 元件來整理：
          </p>

          <CodeBlock language="tsx">
{` // providers/AppProviders.tsx — 把所有 Provider 整合在一起
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

// app/layout.tsx — 乾淨很多
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
} `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 5: 效能陷阱 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="text-red-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Context 的效能陷阱 — 什麼時候不該用</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            這是最重要的 section。很多人把 Context 當 Redux 用，把所有狀態都塞進去，
            結果導致整個 app 頻繁、不必要地重新渲染。
          </p>

          <Card className="border-0 shadow-md border-l-4 border-l-red-400">
            <CardBody className="p-6">
              <p className="font-bold text-red-700 mb-3">Context 的重渲染機制</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                <strong>Context 的 value 只要改變，所有呼叫了 useContext 的元件都會重新渲染</strong>，
                無論它們用到的是不是那個改變的值。
              </p>
              <CodeBlock language="tsx">
{` // ❌ 壞做法：把不相關的狀態混在同一個 Context
const AppContext = createContext({
  count: 0,      // 每秒更新一次的計數器
  user: null,    // 幾乎不變
  theme: 'light' // 極少變動
});

// 每次 count 變化（每秒一次）：
// → 所有用到 AppContext 的元件都重新渲染
// → 即使元件只用到 user，根本不在乎 count！ `}
</CodeBlock>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed text-lg">
            解法是：<strong>依據更新頻率，把 Context 拆分成多個獨立的 Context</strong>。
          </p>

          <CodeBlock language="tsx">
{` // ✅ 好做法：按更新頻率拆分
const CountContext = createContext(0);        // 高頻更新 → 單獨隔離
const UserContext = createContext(null);      // 低頻更新 → 獨立管理
const ThemeContext = createContext('light');  // 極低頻 → 獨立管理

// 現在：
// count 每秒更新 → 只有 useContext(CountContext) 的元件重渲染
// UserProfile 用 UserContext → 完全不受 count 影響
// ThemeToggle 用 ThemeContext → 同樣不受 count 影響 `}
</CodeBlock>

          {/* 比較表格 */}
          <Card className="border-0 shadow-lg">
            <CardBody className="p-6">
              <p className="font-bold text-gray-900 text-lg mb-4">Context 適合 vs. 不適合的場景</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-orange-200">
                      <th className="text-left py-2 pr-6 text-green-700 font-bold">適合用 Context</th>
                      <th className="text-left py-2 text-red-700 font-bold">不適合用 Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2.5 pr-6 text-gray-700">
                        <span className="text-green-500 mr-2">✓</span>
                        主題 / 語言切換（極少變動）
                      </td>
                      <td className="py-2.5 text-gray-700">
                        <span className="text-red-400 mr-2">✗</span>
                        高頻更新的 UI 狀態（滾動位置、動畫值）
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-6 text-gray-700">
                        <span className="text-green-500 mr-2">✓</span>
                        登入用戶資訊（每個 session 一次）
                      </td>
                      <td className="py-2.5 text-gray-700">
                        <span className="text-red-400 mr-2">✗</span>
                        表單輸入值（每個鍵盤按鍵都更新）
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-6 text-gray-700">
                        <span className="text-green-500 mr-2">✓</span>
                        全域 Modal / Toast 狀態
                      </td>
                      <td className="py-2.5 text-gray-700">
                        <span className="text-red-400 mr-2">✗</span>
                        動畫 / 過渡狀態（每幀都在變）
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-6 text-gray-700">
                        <span className="text-green-500 mr-2">✓</span>
                        購物車（加入商品頻率低）
                      </td>
                      <td className="py-2.5 text-gray-700">
                        <span className="text-red-400 mr-2">✗</span>
                        複雜的非同步操作流程
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <Card className="border-0 shadow-md border-l-4 border-l-orange-400">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <Shield className="text-orange-500 shrink-0 mt-0.5" size={18} />
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>進階最佳化：</strong>如果你的 Context value 是一個物件，可以搭配 useMemo 防止不必要的重渲染——
                  <code className="bg-gray-100 font-mono text-sm px-1 rounded mx-1">
                    {`const value = useMemo(() => ({ user, setUser }), [user])`}
                  </code>。
                  物件字面量每次 render 都會產生新的 reference，會導致所有 consumer 重渲染，
                  useMemo 確保只有 user 真的改變時才建立新物件。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 6: Context vs Zustand vs Redux */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="text-amber-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Context vs Zustand vs Redux</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            「既然 Context 有效能問題，我應該直接用 Redux 嗎？」
            這個問題很常見。答案是：<strong>要看 app 的規模和複雜度</strong>。
          </p>

          <div className="grid gap-4">
            <Card className="border-0 shadow-md border-l-4 border-l-blue-400">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚛️</span>
                    <p className="font-bold text-gray-900 text-lg">Context API</p>
                  </div>
                  <Chip variant="flat" color="primary" size="sm">內建</Chip>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-green-700 mb-1.5">優點</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 零依賴，React 內建</li>
                      <li>• 學習成本低</li>
                      <li>• 適合簡單的跨元件狀態</li>
                      <li>• TypeScript 整合自然</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1.5">限制</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 效能需自行最佳化</li>
                      <li>• 沒有 DevTools</li>
                      <li>• 複雜狀態邏輯難以維護</li>
                    </ul>
                  </div>
                </div>
                <p className="text-blue-700 font-semibold text-sm mt-3">
                  適合：中小型 app、主題/用戶/語言等低頻全域狀態
                </p>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md border-l-4 border-l-purple-400">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐻</span>
                    <p className="font-bold text-gray-900 text-lg">Zustand</p>
                  </div>
                  <Chip variant="flat" color="secondary" size="sm">2KB</Chip>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-green-700 mb-1.5">優點</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 極輕量（2KB gzip）</li>
                      <li>• API 非常直觀</li>
                      <li>• 原生支援選擇性訂閱（效能好）</li>
                      <li>• 不需要 Provider 包裝</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1.5">限制</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 需要額外安裝</li>
                      <li>• 生態系比 Redux 小</li>
                    </ul>
                  </div>
                </div>
                <p className="text-purple-700 font-semibold text-sm mt-3">
                  適合：中大型 app、需要高效能全域狀態管理
                </p>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md border-l-4 border-l-red-400">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏗️</span>
                    <p className="font-bold text-gray-900 text-lg">Redux Toolkit</p>
                  </div>
                  <Chip variant="flat" color="danger" size="sm">完整生態</Chip>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-green-700 mb-1.5">優點</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 完整的 DevTools（時間旅行 debug）</li>
                      <li>• 成熟的生態系和社群</li>
                      <li>• 嚴格的單向資料流</li>
                      <li>• 企業級最佳實踐</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1.5">限制</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• 學習成本高</li>
                      <li>• 樣板代碼多</li>
                      <li>• 小專案殺雞用牛刀</li>
                    </ul>
                  </div>
                </div>
                <p className="text-red-700 font-semibold text-sm mt-3">
                  適合：大型 app、複雜異步邏輯、多人協作大型團隊
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 text-white">
            <CardBody className="p-8">
              <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                <Zap size={22} />
                2026 年的建議
              </h3>
              <p className="text-white/90 leading-relaxed mb-4">
                <strong>先用 Context，複雜了再遷移到 Zustand，不要一上來就用 Redux。</strong>
              </p>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• 新專案：Context API（零成本，先跑起來）</li>
                <li>• 遇到效能問題或狀態邏輯複雜：遷移到 Zustand（API 差不多，改起來快）</li>
                <li>• 企業大型專案或已有 Redux 基礎：Redux Toolkit（有 DevTools 優勢）</li>
              </ul>
              <p className="text-yellow-200 text-sm mt-4">
                從 Context 遷移到 Zustand 成本很低——因為你已經把邏輯封裝在自訂 Hook 裡了，
                只要換掉 Hook 的內部實作，元件完全不用改。這也是為什麼「封裝成自訂 Hook」是重要習慣。
              </p>
            </CardBody>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardBody className="p-6">
              <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-orange-500" size={20} />
                本篇重點整理
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                  <span>Props Drilling 的痛點：中間元件被迫傳遞不相干的 props，型別改動要多層更新</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                  <span>Context 三步驟：createContext → Provider（廣播站）→ useContext（收聽）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                  <span>把 useContext 封裝成自訂 Hook（如 useUser、useTheme），確保在 Provider 內使用</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                  <span>Provider 巢狀：從最不常變的放外層（Theme &gt; User &gt; Cart）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                  <span>效能陷阱：按更新頻率拆分 Context；考慮 useMemo 防止不必要重渲染</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-orange-400 shrink-0 mt-0.5" />
                  <span>選型建議：Context → Zustand → Redux，按複雜度遞進，不要過度設計</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Tags + Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 mb-10">
            {['Context API', 'useContext', 'Props Drilling', 'ThemeContext', 'State Management', 'React'].map(tag => (
              <Chip key={tag} variant="flat" color="warning" size="sm">{tag}</Chip>
            ))}
          </div>

          {/* Navigation */}
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep20-custom-hooks">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft size={20} className="text-orange-400 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">上一篇</p>
                      <p className="font-bold text-gray-900 text-sm">EP.20 自訂 Hook</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/web-dev/ep22-react-forms">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center justify-end gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">下一篇</p>
                      <p className="font-bold text-gray-900 text-sm">EP.22 React 表單實戰</p>
                    </div>
                    <ArrowRight size={20} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
