'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, Clock, Eye, Layers, Lightbulb, Zap, Database, Search, RefreshCw, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function WebDevEP20() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-700 via-emerald-700 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.20</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web 開發系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              自訂 Hook：把邏輯從元件裡抽出來<br />
              <span className="text-emerald-200">讓元件永遠不超過 100 行</span>
            </h1>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl">
              useLocalStorage、useDebounce、useFetch — 一旦學會，你的元件永遠不會超過 100 行。
              Custom Hook 是 React 開發者從「寫得出來」進化到「寫得好」的關鍵一步。
            </p>
            <div className="flex items-center gap-6 text-teal-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Custom Hooks · TypeScript · Reusability</span>
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
                <Layers size={32} className="text-teal-500 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「我的 ProfilePage、SettingsPage、DashboardPage 都有一段讀寫 localStorage 的邏輯，
                    複製貼上了三次，改一個地方就要改三個地方……」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    這是幾乎每個初學 React 的人都會遇到的痛點。解法不是「更仔細地複製貼上」，
                    而是學會把重複邏輯抽成 Custom Hook。這篇會帶你從痛點出發，
                    一步步建立三個實用的 Custom Hook，並在最後展示如何組合它們。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 1: 痛點 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">痛點：三個元件寫了三次一樣的邏輯</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            想像這個場景：你的 app 有三個頁面，都需要把使用者偏好存到 localStorage，
            並在元件掛載時讀回來。你可能會在每個元件裡寫出這樣的程式碼——
          </p>

          <CodeBlock language="tsx">{`// ProfilePage.tsx — 第一次寫
function ProfilePage() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return <div>...</div>;
}

// SettingsPage.tsx — 複製貼上，略做修改
function SettingsPage() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // 又是一樣的邏輯
  };

  return <div>...</div>;
}

// DashboardPage.tsx — 第三次，完全一樣
function DashboardPage() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);
  // ...
}`}</CodeBlock>

          <Card className="border-0 shadow-md border-l-4 border-l-red-400">
            <CardBody className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-red-700 mb-2">這段重複代碼有什麼問題？</p>
                  <ul className="space-y-1.5 text-gray-700 text-sm">
                    <li>• 邏輯改了（例如加上 JSON.parse 容錯），要在三個地方分別修改</li>
                    <li>• localStorage 的 key 名稱打錯，三個地方都要找</li>
                    <li>• 寫測試時，同樣的邏輯要測三次</li>
                    <li>• 新同事加入，看到三份一樣的東西，不知道哪個才是「正確版本」</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed text-lg">
            解法是：把這 15 行重複邏輯「搬出來」，放到一個以 <code className="bg-gray-100 text-teal-700 px-1.5 py-0.5 rounded font-mono">use</code> 開頭的函式裡。
            這就是 Custom Hook 的核心概念——<strong>把邏輯抽離元件，讓元件只專注在「畫什麼」</strong>。
          </p>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 2: 三條規則 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Lightbulb className="text-amber-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Custom Hook 的三條規則</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            Custom Hook 不是什麼魔法，它就是一個普通的 JavaScript/TypeScript 函式，
            只是必須遵守三條規則。違反這三條規則，React 不知道怎麼正確追蹤你的狀態。
          </p>

          <div className="grid gap-4">
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <span className="bg-teal-100 text-teal-700 font-black text-lg w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">名稱必須以 <code className="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-mono">use</code> 開頭</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      React 的 linter（eslint-plugin-react-hooks）靠這個命名規則辨識 Hook。
                      如果你命名為 <code className="bg-gray-100 font-mono text-sm px-1 rounded">localStorageHook</code>，它就不是 Hook，
                      裡面呼叫 useState 會報錯或行為異常。
                      <br />
                      <span className="text-teal-600 font-semibold">✓ useLocalStorage ✓ useDebounce ✓ useFetch</span>
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <span className="bg-teal-100 text-teal-700 font-black text-lg w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">可以在裡面呼叫其他 Hook</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Custom Hook 裡面可以呼叫 useState、useEffect、useRef，
                      甚至呼叫其他 Custom Hook。
                      這讓你可以把複雜邏輯「一層一層組合」，就像積木一樣。
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <span className="bg-teal-100 text-teal-700 font-black text-lg w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">可以回傳任何東西</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      不像元件必須回傳 JSX，Hook 可以回傳數值、函式、物件、陣列，
                      或完全不回傳。回傳什麼，取決於呼叫端需要什麼。
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-emerald-50">
            <CardBody className="p-6">
              <p className="text-gray-800 text-lg leading-relaxed">
                <strong>生活類比：</strong>Custom Hook 就像一個「私人助理」。
                你告訴助理「幫我追蹤 localStorage 裡的 theme 值」，
                助理會自動幫你讀取、儲存、同步，並隨時回報最新值給你。
                你（元件）不需要知道助理怎麼做到的，你只要用結果就好。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 3: useLocalStorage */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Database className="text-teal-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">useLocalStorage — 第一個實用 Hook</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            我們來解決開頭那個痛點。把讀寫 localStorage 的邏輯抽出來，
            做成一個可以重用於任何型別的泛型 Hook：
          </p>

          <CodeBlock language="tsx">{`// hooks/useLocalStorage.ts
import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // lazy initializer：用函式延遲執行，避免 SSR 問題
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      // localStorage 可能因隱私模式或瀏覽器限制而無法存取
      return initialValue;
    }
  });

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;`}</CodeBlock>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <p className="font-bold text-teal-700 mb-2 text-sm">Lazy Initializer 是什麼？</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <code className="bg-gray-100 font-mono text-xs px-1 rounded">useState(fn)</code> 傳函式而非直接傳值，
                  React 只在第一次 render 時執行這個函式。
                  直接寫 <code className="bg-gray-100 font-mono text-xs px-1 rounded">localStorage.getItem(key)</code>
                  的話，每次 render 都會執行一次，效能較差。
                </p>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <p className="font-bold text-teal-700 mb-2 text-sm">TypeScript 泛型 &lt;T&gt;</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  泛型讓這個 Hook 可以用於任何型別：string、number、物件都行。
                  TypeScript 會自動推斷 <code className="bg-gray-100 font-mono text-xs px-1 rounded">value</code> 的型別，
                  你不需要每次都手動指定。
                </p>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <p className="font-bold text-teal-700 mb-2 text-sm">as const 的作用</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <code className="bg-gray-100 font-mono text-xs px-1 rounded">as const</code> 讓 TypeScript 把回傳值視為 tuple（固定長度陣列）而非 array，
                  解構時 <code className="bg-gray-100 font-mono text-xs px-1 rounded">value</code> 是 T、
                  <code className="bg-gray-100 font-mono text-xs px-1 rounded">setter</code> 是 function，型別正確。
                </p>
              </CardBody>
            </Card>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            有了這個 Hook，原本三個元件各自寫的 15 行，現在變成 1 行：
          </p>

          <CodeBlock language="tsx">{`// ProfilePage.tsx — 現在只需要 1 行！
const [theme, setTheme] = useLocalStorage('theme', 'light');

// 也可以用在任何型別
const [user, setUser] = useLocalStorage('user', { name: '', email: '' });
const [cartCount, setCartCount] = useLocalStorage('cart-count', 0);
const [preferences, setPreferences] = useLocalStorage('prefs', {
  language: 'zh-TW',
  notifications: true,
  fontSize: 'medium',
});

// 用起來跟 useState 完全一樣，但會自動同步到 localStorage
function ProfilePage() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <p>目前主題：{theme}</p>
      <button onClick={() => setTheme('dark')}>切換深色模式</button>
    </div>
  );
}`}</CodeBlock>

          <Card className="border-0 shadow-md border-l-4 border-l-teal-400">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-teal-500 shrink-0 mt-0.5" size={18} />
                <p className="text-gray-700 text-sm leading-relaxed">
                  三個頁面改起來了嗎？只要把各自的 useState + useEffect 換成 <code className="bg-gray-100 font-mono text-sm px-1 rounded">useLocalStorage</code>，
                  就完成重構。以後 localStorage 邏輯要改，只改一個地方。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 4: useDebounce */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Search className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">useDebounce — 搜尋框的效能救星</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            假設你做了一個搜尋框，每當使用者輸入，就打一次 API 搜尋結果。
            聽起來很合理，但實際上——
          </p>

          <Card className="border-0 shadow-md border-l-4 border-l-red-400">
            <CardBody className="p-6">
              <p className="font-bold text-red-700 mb-3">沒有 debounce 的搜尋框（效能殺手）</p>
              <CodeBlock language="tsx">{`function SearchPage() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    // ❌ 每次 search 改變都直接 fetch！
    // 使用者輸入 "typescript" (10個字) = 10 次 API 呼叫
    // 300ms 快速連打 = 伺服器被洗版
    if (search) fetchResults(search);
  }, [search]);

  return <input onChange={e => setSearch(e.target.value)} />;
}`}</CodeBlock>
              <p className="text-gray-600 text-sm mt-3">
                使用者輸入 10 個字的過程中，你發了 10 次請求。前 9 次的結果根本沒用，
                卻浪費了伺服器資源和使用者的流量。
              </p>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed text-lg">
            Debounce 的概念是：「等使用者停止輸入 X 毫秒後，才執行動作。」
            把這個等待邏輯抽成 Hook：
          </p>

          <CodeBlock language="tsx">{`// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 設定 timer：delay 毫秒後更新 debouncedValue
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup！每次 value 或 delay 改變，先清掉舊的 timer
    // 這確保只有「最後一次輸入」才會觸發更新
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;`}</CodeBlock>

          <p className="text-gray-600 leading-relaxed text-lg">
            用起來非常直觀——加一行 <code className="bg-gray-100 text-emerald-700 px-1.5 py-0.5 rounded font-mono">useDebounce</code>，
            搜尋框就從「每字都 fetch」變成「停止輸入後才 fetch」：
          </p>

          <CodeBlock language="tsx">{`function SearchPage() {
  const [search, setSearch] = useState('');

  // 把原始 search 值延遲 300ms
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    // 只在停止輸入 300ms 後才觸發
    if (debouncedSearch) fetchResults(debouncedSearch);
  }, [debouncedSearch]); // 注意：依賴的是 debouncedSearch，不是 search

  return (
    <input
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="搜尋..."
    />
  );
}

// 效果：
// 使用者輸入 "typescript"（300ms 內快速輸入）
// → 只有在停止輸入 300ms 後，才發出 1 次 API 請求
// → 省下 9 次不必要的請求！`}</CodeBlock>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
            <CardBody className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-amber-800 mb-2">為什麼 Cleanup 很重要？</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <code className="bg-white font-mono text-sm px-1 rounded border">return () =&gt; clearTimeout(timer)</code> 這行是關鍵。
                    <br /><br />
                    想像使用者連續輸入三個字：<code className="bg-white font-mono text-sm px-1 rounded border">a</code>、
                    <code className="bg-white font-mono text-sm px-1 rounded border">ab</code>、
                    <code className="bg-white font-mono text-sm px-1 rounded border">abc</code>。
                    每次輸入都會觸發 useEffect，建立一個新的 timer。
                    如果不清掉舊的 timer，三個 timer 會「競速」，
                    可能造成 <strong>race condition</strong>——最後回來的結果不一定是最新的那個。
                    Cleanup 確保永遠只有「最後設定的那個 timer」有效。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 5: useFetch */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="text-green-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">useFetch — 把資料請求邏輯封裝起來</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            每個需要顯示 API 資料的元件，都需要 loading 狀態、error 狀態、data 狀態……
            每次都重複寫一樣的模板代碼。把它封裝成 useFetch：
          </p>

          <CodeBlock language="tsx">{`// hooks/useFetch.ts
import { useState, useEffect } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // AbortController：讓我們可以「取消」已發出的請求
    const controller = new AbortController();

    setState(prev => ({ ...prev, loading: true }));

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => {
        // AbortError 是我們主動取消的，不算「錯誤」
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err.message });
        }
      });

    // Cleanup：元件卸載時取消請求
    return () => controller.abort();
  }, [url]); // url 改變時重新請求

  return state;
}

export default useFetch;`}</CodeBlock>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
            <CardBody className="p-6">
              <div className="flex items-start gap-3">
                <Zap className="text-green-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-green-800 mb-2">AbortController 防止 Memory Leak</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    如果使用者快速切換頁面，元件在 API 還沒回來就卸載了。
                    此時如果 fetch 完成並嘗試呼叫 setState，React 會警告你「在已卸載的元件上設定狀態」，
                    這就是 memory leak 的前兆。
                    <br /><br />
                    <code className="bg-white font-mono text-sm px-1 rounded border">controller.abort()</code> 會在元件卸載時取消請求，
                    <code className="bg-white font-mono text-sm px-1 rounded border">err.name !== 'AbortError'</code> 確保主動取消不被誤判為錯誤。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed text-lg">
            有了 useFetch，任何資料顯示頁面都可以用三行解決所有狀態管理：
          </p>

          <CodeBlock language="tsx">{`// 用法非常乾淨
type Post = { id: number; title: string; body: string };

function PostList() {
  const { data: posts, loading, error } = useFetch<Post[]>('/api/posts');

  if (loading) return <div>載入中...</div>;
  if (error) return <div>載入失敗：{error}</div>;
  if (!posts) return null;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// url 變了自動重新請求
function UserDetail({ userId }: { userId: number }) {
  const { data: user, loading } = useFetch<User>(\`/api/users/\${userId}\`);
  // userId 從 1 變成 2，自動重新 fetch /api/users/2
}`}</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 6: usePagination 組合練習 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Package className="text-teal-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">組合 Hooks — usePagination 綜合練習</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            Custom Hook 真正強大的地方，在於可以把多個 Hook 組合成更複雜的邏輯。
            分頁（pagination）就是一個好例子——它需要資料、目前頁數、計算邊界，
            但這些邏輯全部可以封裝在一個 Hook 裡：
          </p>

          <CodeBlock language="tsx">{`// hooks/usePagination.ts
import { useState } from 'react';

function usePagination<T>(data: T[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    // Math.max/min 確保不超出合法頁碼範圍
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return {
    currentData,   // 目前頁要顯示的資料
    currentPage,   // 目前在第幾頁
    totalPages,    // 總共幾頁
    goToPage,      // 跳到指定頁
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}

export default usePagination;`}</CodeBlock>

          <p className="text-gray-600 leading-relaxed text-lg">
            更進一步，我們可以把 useFetch 和 usePagination 結合起來，
            完成一個具備「資料請求 + 分頁」功能的複合 Hook：
          </p>

          <CodeBlock language="tsx">{`function PostListPage() {
  // 先用 useFetch 拿資料
  const { data: allPosts, loading, error } = useFetch<Post[]>('/api/posts');

  // 再用 usePagination 管理分頁
  const { currentData, currentPage, totalPages, goToPage, hasNext, hasPrev } =
    usePagination(allPosts ?? [], 5);

  if (loading) return <div>載入中...</div>;
  if (error) return <div>發生錯誤：{error}</div>;

  return (
    <div>
      <ul>
        {currentData.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <div className="flex gap-4 mt-4">
        <button onClick={() => goToPage(currentPage - 1)} disabled={!hasPrev}>
          上一頁
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={!hasNext}>
          下一頁
        </button>
      </div>
    </div>
  );
}`}</CodeBlock>

          <p className="text-gray-600 leading-relaxed text-lg">
            PostListPage 本身只有 30 行，但功能完整。邏輯全部在 Hook 裡，
            元件只負責「怎麼畫」，這才是 Custom Hook 的最終目標。
          </p>

          {/* 比較表格 */}
          <Card className="border-0 shadow-lg">
            <CardBody className="p-6">
              <p className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="text-teal-500" size={20} />
                什麼情境用什麼 Hook？
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-teal-200">
                      <th className="text-left py-2 pr-6 text-teal-700 font-bold">使用場景</th>
                      <th className="text-left py-2 text-teal-700 font-bold">推薦 Hook</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2.5 pr-6 text-gray-700">表單欄位持久化、用戶偏好設定</td>
                      <td className="py-2.5"><code className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono">useLocalStorage</code></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-6 text-gray-700">搜尋框、Autocomplete 輸入</td>
                      <td className="py-2.5"><code className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono">useDebounce</code></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-6 text-gray-700">任何 API 資料顯示頁面</td>
                      <td className="py-2.5"><code className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono">useFetch</code></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-6 text-gray-700">列表、表格的分頁控制</td>
                      <td className="py-2.5"><code className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono">usePagination</code></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-6 text-gray-700">RWD 版型切換、視窗尺寸偵測</td>
                      <td className="py-2.5"><code className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono">useWindowSize</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
            <CardBody className="p-8">
              <h3 className="text-xl font-black mb-3">本篇重點整理</h3>
              <ul className="space-y-2 text-teal-100">
                <li className="flex items-start gap-2"><CheckCircle size={16} className="shrink-0 mt-0.5" /> Custom Hook = 以 use 開頭、可呼叫其他 Hook 的普通函式</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="shrink-0 mt-0.5" /> useLocalStorage：持久化任意型別，lazy initializer 避免不必要執行</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="shrink-0 mt-0.5" /> useDebounce：Cleanup 防止 race condition，只有最後一次輸入才觸發</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="shrink-0 mt-0.5" /> useFetch：AbortController 防止元件卸載後的 memory leak</li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="shrink-0 mt-0.5" /> Hook 可以互相組合，從簡單邏輯構建複雜功能</li>
              </ul>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Tags */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 mb-10">
            {['Custom Hooks', 'useLocalStorage', 'useDebounce', 'useFetch', 'TypeScript', 'React'].map(tag => (
              <Chip key={tag} variant="flat" color="success" size="sm">{tag}</Chip>
            ))}
          </div>

          {/* Navigation */}
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep19-data-fetching">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft size={20} className="text-teal-500 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">上一篇</p>
                      <p className="font-bold text-gray-900 text-sm">EP.19 React 資料請求全攻略</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/web-dev/ep21-context">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center justify-end gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">下一篇</p>
                      <p className="font-bold text-gray-900 text-sm">EP.21 Context API</p>
                    </div>
                    <ArrowRight size={20} className="text-teal-500 group-hover:translate-x-1 transition-transform" />
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
