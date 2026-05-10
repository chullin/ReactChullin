'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  AlertTriangle,
  Lightbulb,
  Zap,
  RefreshCw,
  XCircle
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function WebDevEP16() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.16</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web 開發系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              useEffect 不是「生命週期」<br />
              <span className="text-blue-200">——是「監聽資料變化」</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              資料請求、副作用、Cleanup——用三個真實場景搞懂 useEffect，
              React 最常讓初學者困惑的 Hook。
            </p>
            <div className="flex items-center gap-6 text-blue-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> React · useEffect · Hook · 副作用 · 資料請求</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* 開場 Quote */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-blue-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「我知道 useState 了。但我想在頁面載入時呼叫 API 拿資料，該怎麼做？
                    為什麼不能直接在 Component 裡呼叫 fetch？」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    這篇解釋清楚 useEffect——React 最常讓初學者困惑的 Hook。
                    不從「定義」開始，直接從你遇到的問題開始。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Section 1: 為什麼不能直接 fetch */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">為什麼不能直接 fetch？</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            很直覺的想法：「我要資料，就直接呼叫 fetch 啊。」來試試看：
          </p>

          <CodeBlock
            title="UserProfile.tsx — ❌ 這樣寫有問題"
            lang="tsx"
            code={`// ❌ 這樣寫會造成無限迴圈！
function UserProfile() {
  const [user, setUser] = useState(null);

  // 直接在 Component 函式裡呼叫 fetch
  fetch('/api/user')
    .then(res => res.json())
    .then(data => setUser(data));  // setUser → 重新渲染 → 又呼叫 fetch → 無限迴圈！

  return <div>{user?.name}</div>;
}`}
          />

          <Card className="border border-red-200 bg-red-50 shadow-sm">
            <CardBody className="p-6">
              <div className="flex gap-3">
                <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-black text-red-800 mb-2">為什麼會無限迴圈？</p>
                  <p className="text-red-700 text-sm leading-relaxed">
                    React Component 是一個函式，每次狀態改變都會重新執行這個函式。
                    如果你在函式裡直接 fetch，就會觸發這個死循環：
                  </p>
                  <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
                    <span className="bg-red-100 text-red-700 px-2.5 py-1.5 rounded-lg font-medium">Component 渲染</span>
                    <span className="text-red-400">→</span>
                    <span className="bg-red-100 text-red-700 px-2.5 py-1.5 rounded-lg font-medium">執行 fetch</span>
                    <span className="text-red-400">→</span>
                    <span className="bg-red-100 text-red-700 px-2.5 py-1.5 rounded-lg font-medium">setUser(data)</span>
                    <span className="text-red-400">→</span>
                    <span className="bg-red-100 text-red-700 px-2.5 py-1.5 rounded-lg font-medium">重新渲染</span>
                    <span className="text-red-400">→</span>
                    <span className="bg-red-100 text-red-700 px-2.5 py-1.5 rounded-lg font-medium">又執行 fetch ♾️</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed">
            你需要一個方式告訴 React：「等你把 UI 渲染完，再來做 fetch 這件事，而且只做一次。」
            這就是 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">useEffect</code> 的設計目的。
          </p>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 2: 副作用是什麼 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Lightbulb className="text-blue-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">副作用（Side Effect）是什麼</h2>
          </div>

          <Card className="border border-blue-200 bg-blue-50 shadow-sm">
            <CardBody className="p-6">
              <div className="flex gap-3">
                <Lightbulb className="text-blue-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-black text-blue-800 mb-2">「副作用」聽起來嚇人，其實很簡單</p>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    Component 的「主業」是根據資料回傳 UI（就是那個 return 裡的 JSX）。
                    任何不是「回傳 UI」的事情，都叫副作用（Side Effect）：
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-blue-700">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      呼叫 API、發 HTTP 請求
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      設定計時器（setTimeout、setInterval）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      訂閱事件（WebSocket、EventEmitter）
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      修改 document.title
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      操作瀏覽器的 localStorage
                    </li>
                  </ul>
                  <p className="text-blue-700 text-sm mt-3 font-medium">
                    useEffect 就是說：「等你把 UI 渲染完，再來做這些副業。」
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 3: useEffect 三種用法 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Zap className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">useEffect 的三種用法</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            這是最重要的部分。useEffect 的行為完全由第二個參數（dependency array）決定：
          </p>

          {/* 用法 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-700 font-black px-3 py-1 rounded-full text-sm">用法 1</span>
              <p className="font-black text-gray-900">只在「第一次渲染」執行（最常用）</p>
            </div>
            <CodeBlock
              title="useEffect with empty array — 初始資料請求"
              lang="tsx"
              code={`function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 在組件第一次出現在畫面上時執行
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);  // ← 空陣列 = 只執行一次，不再重複

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`}
            />
            <p className="text-gray-500 text-sm">
              空陣列 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">[]</code> 的語義是：「沒有任何 dependency，所以只在最初執行一次，之後不管什麼改變都不重跑。」
            </p>
          </div>

          {/* 用法 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 text-blue-700 font-black px-3 py-1 rounded-full text-sm">用法 2</span>
              <p className="font-black text-gray-900">當特定資料改變時執行</p>
            </div>
            <CodeBlock
              title="useEffect with dependency — 監聽特定 state"
              lang="tsx"
              code={`function UserProfile() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 當 userId 改變時，重新請求對應的使用者資料
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);  // ← userId 是 dependency，userId 變了就重新執行

  return (
    <div>
      <button onClick={() => setUserId(2)}>切換使用者</button>
      <p>{user?.name}</p>
    </div>
  );
}`}
            />
            <p className="text-gray-500 text-sm">
              這個模式超級常用：「當你選了不同的使用者 ID，就重新抓那個使用者的資料」。
              useEffect 監聽 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">userId</code>，它一改變，副作用就重新執行。
            </p>
          </div>

          {/* 用法 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-orange-100 text-orange-700 font-black px-3 py-1 rounded-full text-sm">用法 3</span>
              <p className="font-black text-gray-900">每次渲染都執行（幾乎不用）</p>
            </div>
            <CodeBlock
              title="useEffect without array — 每次渲染都跑"
              lang="tsx"
              code={`useEffect(() => {
  console.log('每次渲染都執行');
  // ⚠️ 小心！如果這裡有 setState，很容易造成無限迴圈
});  // ← 沒有第二個參數`}
            />
            <p className="text-gray-500 text-sm">
              幾乎不會用到這個形式。一旦 effect 裡有 setState，就會：執行 effect → setState → 重新渲染 → 執行 effect → 無限迴圈。
            </p>
          </div>

          {/* 比較表 */}
          <Card className="border border-gray-200 shadow-sm overflow-hidden">
            <CardBody className="p-0">
              <div className="bg-gray-800 px-5 py-3">
                <p className="text-white font-black text-sm">三種寫法對比</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-5 py-3 font-black text-gray-700">寫法</th>
                      <th className="text-left px-5 py-3 font-black text-gray-700">執行時機</th>
                      <th className="text-left px-5 py-3 font-black text-gray-700">使用場景</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-5 py-3">
                        <code className="bg-green-50 text-green-700 px-2 py-0.5 rounded font-mono text-xs">useEffect(() =&gt; {'{}'}, [])</code>
                      </td>
                      <td className="px-5 py-3 text-gray-600">只執行一次（初次渲染後）</td>
                      <td className="px-5 py-3 text-gray-600">初始化資料請求</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="px-5 py-3">
                        <code className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono text-xs">useEffect(() =&gt; {'{}'}, [x])</code>
                      </td>
                      <td className="px-5 py-3 text-gray-600">x 改變時執行</td>
                      <td className="px-5 py-3 text-gray-600">依賴某個 state / prop</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3">
                        <code className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded font-mono text-xs">useEffect(() =&gt; {'{}'})</code>
                      </td>
                      <td className="px-5 py-3 text-gray-600">每次渲染後都執行</td>
                      <td className="px-5 py-3 text-gray-500 italic">幾乎不用</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 4: 完整的資料請求模式 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">完整的資料請求模式</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            真實專案裡，資料請求不只是 fetch 那麼簡單。你還需要處理「載入中」狀態和「錯誤」狀態——
            否則使用者盯著空白頁面等，根本不知道發生什麼事：
          </p>

          <CodeBlock
            title="UserProfile.tsx — 完整的 loading + error 處理"
            lang="tsx"
            code={`interface User {
  id: number;
  name: string;
  email: string;
}

interface UserProfileProps {
  userId: number;
}

function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);   // 載入中狀態
  const [error, setError] = useState<string | null>(null);  // 錯誤狀態

  useEffect(() => {
    // 每次 userId 改變，重置狀態並重新請求
    setIsLoading(true);
    setError(null);

    fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error(\`API 回傳錯誤：\${res.status}\`);
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [userId]);  // userId 改變 → 重新請求

  // 三種狀態對應三種 UI
  if (isLoading) return <p>載入中...</p>;
  if (error) return <p>發生錯誤：{error}</p>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`}
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { color: 'bg-blue-50 border-blue-100', title: '初始狀態', badge: 'isLoading: true', desc: '使用者進入頁面，還沒拿到資料。顯示 spinner 或骨架屏，告訴使用者「正在載入」。' },
              { color: 'bg-red-50 border-red-100', title: '錯誤狀態', badge: 'error: string', desc: 'API 掛了、網路斷線、認證失敗。顯示有意義的錯誤訊息，不要讓使用者面對空白。' },
              { color: 'bg-green-50 border-green-100', title: '成功狀態', badge: 'user: User', desc: '資料拿回來了，正常渲染。這才是你的「主要 UI」，但它只是三種狀態之一。' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <p className="font-black text-gray-800 text-sm mb-1">{item.title}</p>
                <code className="text-xs bg-white/70 px-2 py-0.5 rounded font-mono text-gray-600 block mb-2">{item.badge}</code>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <Card className="border border-indigo-100 bg-indigo-50">
            <CardBody className="p-5">
              <p className="font-black text-indigo-800 mb-2 text-sm">這個模式在 React 專案裡無處不在</p>
              <p className="text-indigo-700 text-sm leading-relaxed">
                isLoading + error + data 是最基本的非同步資料模式。
                之後你會學到 React Query（TanStack Query），它把這整個模式包裝成一行
                <code className="bg-indigo-100 px-1 py-0.5 rounded font-mono"> const {'{ data, isLoading, error }'} = useQuery(...)</code>，
                原理是一樣的，只是幫你把樣板程式碼都處理掉了。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 5: Cleanup */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <XCircle className="text-violet-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Cleanup——為什麼有些 useEffect 要「收拾」</h2>
          </div>

          <Card className="border border-violet-200 bg-violet-50 shadow-sm">
            <CardBody className="p-6">
              <div className="flex gap-3">
                <Lightbulb className="text-violet-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-black text-violet-800 mb-2">報紙訂閱的比喻</p>
                  <p className="text-violet-700 text-sm leading-relaxed">
                    想像你訂了一份報紙。你搬家了，但沒有通知報社取消訂閱——
                    報紙一直送到舊地址，浪費資源，也可能引發奇怪的問題（例如舊鄰居收到你的報紙）。
                    <br /><br />
                    Cleanup 就是「搬家前先取消訂閱」。
                    當 Component 從畫面消失時，你要負責清除你啟動的副作用，
                    不然那些副作用會繼續跑，繼續嘗試更新已經不存在的 Component。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <CodeBlock
            title="WebSocket + Cleanup"
            lang="tsx"
            code={`function LiveChat() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // 訂閱 WebSocket
    const ws = new WebSocket('wss://api.example.com/live');

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket 錯誤', error);
    };

    // ← return 一個函式 = Cleanup
    // 當 Component 從畫面消失時，React 會自動呼叫這個函式
    return () => {
      ws.close();  // 關閉 WebSocket 連線，不再接收訊息
      console.log('WebSocket 已關閉');
    };
  }, []);  // 只建立一次連線

  return (
    <ul>
      {messages.map((msg, i) => <li key={i}>{msg}</li>)}
    </ul>
  );
}`}
          />

          <CodeBlock
            title="計時器 + Cleanup"
            lang="tsx"
            code={`function CountdownTimer() {
  const [count, setCount] = useState(60);

  useEffect(() => {
    // 建立計時器，每秒 -1
    const timer = setInterval(() => {
      setCount(c => c - 1);
    }, 1000);

    // Cleanup：Component 消失時清除計時器
    return () => {
      clearInterval(timer);  // 不清除的話，計時器會繼續跑
      // 如果你切換了頁面，計時器還在背後跑，繼續嘗試更新已不存在的 Component
      // React 會警告：Can't perform a React state update on an unmounted component.
    };
  }, []);

  return <p>倒數：{count} 秒</p>;
}`}
          />

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <p className="font-black text-amber-800 mb-2 text-sm">什麼時候需要 Cleanup？</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <p className="text-amber-800 font-bold text-xs mb-1.5">需要 Cleanup</p>
                <ul className="text-amber-700 text-xs space-y-1">
                  <li>✓ setInterval / setTimeout</li>
                  <li>✓ WebSocket 連線</li>
                  <li>✓ EventListener 訂閱</li>
                  <li>✓ 第三方 library 的訂閱</li>
                  <li>✓ 正在進行中的 fetch（可用 AbortController）</li>
                </ul>
              </div>
              <div>
                <p className="text-amber-800 font-bold text-xs mb-1.5">不需要 Cleanup</p>
                <ul className="text-amber-700 text-xs space-y-1">
                  <li>✓ 一次性的 fetch 請求</li>
                  <li>✓ 修改 document.title</li>
                  <li>✓ 寫入 localStorage</li>
                  <li>✓ 記錄 log</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 6: 常見錯誤 */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-orange-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">三個最常見的錯誤</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            學會用法之後，這三個錯誤幾乎每個初學者都會犯。早點認識它們，少走彎路：
          </p>

          {/* 錯誤 1 */}
          <Card className="border border-red-100 shadow-sm overflow-hidden">
            <CardBody className="p-0">
              <div className="bg-red-800 px-5 py-3">
                <p className="text-white font-black text-sm">錯誤 1：忘記 Dependency Array → 無限迴圈</p>
              </div>
              <div className="p-5 space-y-3">
                <CodeBlock
                  title=""
                  lang="tsx"
                  code={`// ❌ 忘記第二個參數，每次渲染都執行
useEffect(() => {
  setCount(count + 1);
  // setCount → 重新渲染 → 執行 effect → setCount → 無限迴圈！
});

// ✅ 加上 dependency array
useEffect(() => {
  // 只有需要時才執行
  document.title = \`計數：\${count}\`;
}, [count]);  // count 改變時才更新 title`}
                />
                <p className="text-gray-500 text-sm">
                  如果你的 effect 只需要執行一次，用空陣列 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">[]</code>。
                  如果依賴某個值，把那個值放進 dependency array。
                </p>
              </div>
            </CardBody>
          </Card>

          {/* 錯誤 2 */}
          <Card className="border border-orange-100 shadow-sm overflow-hidden">
            <CardBody className="p-0">
              <div className="bg-orange-700 px-5 py-3">
                <p className="text-white font-black text-sm">錯誤 2：Dependency Array 不完整 → 資料過時（Stale Closure）</p>
              </div>
              <div className="p-5 space-y-3">
                <CodeBlock
                  title=""
                  lang="tsx"
                  code={`// ❌ 用了 userId，但沒放進 dependency array
useEffect(() => {
  fetch(\`/api/users/\${userId}\`)  // userId 可能是舊的！
    .then(res => res.json())
    .then(data => setUser(data));
}, []);  // ← 空陣列，userId 改變時不重新執行

// ✅ 把 userId 加進 dependency array
useEffect(() => {
  fetch(\`/api/users/\${userId}\`)
    .then(res => res.json())
    .then(data => setUser(data));
}, [userId]);  // ← userId 改變時重新執行`}
                />
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-orange-800 text-sm font-bold mb-1">ESLint 救你一命</p>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    安裝 <code className="bg-orange-100 px-1 py-0.5 rounded font-mono">eslint-plugin-react-hooks</code>，
                    規則 <code className="bg-orange-100 px-1 py-0.5 rounded font-mono">react-hooks/exhaustive-deps</code> 會提醒你
                    把所有在 effect 裡用到的值都加進 dependency array。Next.js 預設已啟用。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* 錯誤 3 */}
          <Card className="border border-yellow-100 shadow-sm overflow-hidden">
            <CardBody className="p-0">
              <div className="bg-yellow-700 px-5 py-3">
                <p className="text-white font-black text-sm">錯誤 3：在 useEffect 直接用 async → 回傳了 Promise</p>
              </div>
              <div className="p-5 space-y-3">
                <CodeBlock
                  title=""
                  lang="tsx"
                  code={`// ❌ useEffect 的 callback 不能是 async function
// async function 回傳 Promise，但 useEffect 的 callback 應該回傳 cleanup function 或 void
useEffect(async () => {
  const res = await fetch('/api/data');  // 語法上可以，但有問題
  const data = await res.json();
  setData(data);
}, []);

// ✅ 在 effect 裡面定義 async 函式，然後呼叫它
useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch('/api/data');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    }
  }

  fetchData();  // 呼叫它
}, []);`}
                />
                <p className="text-gray-500 text-sm">
                  這是 React 文件明確提到的規則：useEffect 的 callback 必須是同步函式。
                  如果要用 async/await，就在 callback 裡定義一個 async 函式，然後呼叫它。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="opacity-30" />

        {/* 總結 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-4">
              {[
                { n: '01', text: '不能在 Component 函式裡直接 fetch，會造成無限迴圈（渲染 → fetch → setState → 渲染 → ...）。' },
                { n: '02', text: '副作用是「不是回傳 UI 的事情」：API 請求、計時器、事件訂閱。useEffect 讓你在渲染完之後才做這些事。' },
                { n: '03', text: '三種用法：空陣列（只跑一次）、有 dependency（對應值改變時跑）、無陣列（每次渲染跑，幾乎不用）。' },
                { n: '04', text: '完整的資料請求要處理三種狀態：isLoading、error、data。這是 React 非同步的標準模式。' },
                { n: '05', text: 'WebSocket、計時器等需要 Cleanup：return 一個函式，Component 消失時 React 自動呼叫它。' },
                { n: '06', text: '三個常見錯誤：忘記 dependency array、dependency array 不完整、直接用 async callback。' },
              ].map((item) => (
                <div key={item.n} className="flex items-start gap-4">
                  <span className="bg-white/20 rounded-lg px-2.5 py-0.5 font-black text-sm shrink-0">{item.n}</span>
                  <span className="text-white/90 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-2xl">
              <p className="text-blue-100 text-sm font-medium">
                掌握了 useEffect，你就打通了 React 資料請求的任督二脈。
                下一篇進入 State 管理模式——當 useState 不夠用時，你需要什麼？
              </p>
            </div>
          </div>
        </motion.section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep04-react-component" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.04 — React 核心概念</p>
            <p className="text-sm text-gray-500 mt-1">Component · JSX · Props · State</p>
          </Link>
          <Link href="/blog/web-dev/ep17-state-patterns" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.17 — State 管理模式</p>
            <p className="text-sm text-gray-500 mt-1">useState 的邊界 · useReducer · Context</p>
          </Link>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['React', 'useEffect', 'Hook', '副作用', '資料請求', 'EP.16'].map(tag => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>

      </article>
    </div>
  );
}
