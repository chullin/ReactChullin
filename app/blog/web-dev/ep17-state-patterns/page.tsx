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
  Layers,
  AlertCircle,
  CheckCircle,
  Zap
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function WebDevEP17() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-fuchsia-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.17</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網頁開發實戰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              useState 不只是計數器：五種狀態管理場景<br />
              <span className="text-violet-200">物件狀態、陣列狀態、衍生狀態、多個 state——從入門到實戰全覆蓋</span>
            </h1>
            <p className="text-violet-100 text-lg mb-8 max-w-2xl">
              表單 10 個欄位要寫 10 個 useState 嗎？splice 為什麼不能用？
              這篇五個場景全部解清楚，讓你不再踩坑。
            </p>
            <div className="flex items-center gap-6 text-violet-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> useState · 不可變更新 · 陣列操作 · 衍生狀態</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening Quote */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-violet-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「useState(0) 我懂了。但我的表單有 10 個欄位，要寫 10 個 useState 嗎？還是用一個物件存？
                    我刪除陣列裡的一個項目，為什麼不能直接 todos.splice(index, 1)？」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    這是每個 React 初學者都會卡住的地方。問題的根源只有一個：
                    <strong className="text-gray-800"> React 的「不可變更新」原則</strong>。
                    理解它，後面五個場景全部迎刃而解。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 1: 不可變更新 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-violet-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">為什麼 React 要你「不可變更新」</h2>
          </div>

          <Card className="border border-violet-100 bg-gradient-to-br from-violet-50 to-fuchsia-50 shadow-none">
            <CardBody className="p-6">
              <p className="text-gray-700 leading-relaxed text-base">
                <strong className="text-violet-700">比喻：</strong>
                React 就像一個視力不好的人——他不看你物件<em>裡面</em>的值，
                只看「這個物件是不是換了一個新的」。你改了 <code className="bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded text-sm font-mono">user.age</code>，
                但還是同一個物件，他就說：沒變，不需要重新渲染。
              </p>
            </CardBody>
          </Card>

          <CodeBlock
            title="不可變更新的核心概念"
            lang="typescript"
            code={`const [user, setUser] = useState({ name: 'Joseph', age: 26 });

// ❌ 直接修改：React 看不到變化
user.age = 27;
setUser(user);  // user 還是同一個物件參考 → React 不重新渲染

// ✅ 建立新物件：React 知道有變化
setUser({ ...user, age: 27 });  // 展開建立新物件 → React 重新渲染

// 記憶口訣：
// 直接改 → 跟改原本的抄本一樣，React 看不出差異
// 展開新建 → 交出一份全新的文件，React 認得出「這是新的」`}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border rounded-2xl p-5 bg-red-50 border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={18} className="text-red-500" />
                <p className="font-black text-red-800">直接修改（Mutate）</p>
              </div>
              <ul className="space-y-1.5 text-sm text-red-700">
                <li>• 修改原物件的屬性</li>
                <li>• 對陣列用 splice、push、pop</li>
                <li>• React 偵測不到變化</li>
                <li>• 畫面不更新，但資料已經壞掉</li>
              </ul>
            </div>
            <div className="border rounded-2xl p-5 bg-green-50 border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={18} className="text-green-600" />
                <p className="font-black text-green-800">不可變更新（Immutable）</p>
              </div>
              <ul className="space-y-1.5 text-sm text-green-700">
                <li>• 建立新物件 &#123;...old, key: val&#125;</li>
                <li>• 陣列用 filter、map、展開</li>
                <li>• React 偵測到新參考</li>
                <li>• 畫面正確更新</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Scene 1: Boolean */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">
            <span className="text-violet-600 mr-2">場景 1</span>布林開關（最簡單）
          </h2>
          <p className="text-gray-700 leading-relaxed">
            模態框開關、載入狀態、展開/收合——這類布林 state 到處都是。
            寫法很簡單，但有一個值得注意的小細節：要用 functional update。
          </p>

          <CodeBlock
            title="boolean-toggle.tsx"
            lang="typescript"
            code={`const [isOpen, setIsOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);

// ✅ 最優寫法：用 prev（functional update）
const toggle = () => setIsOpen(prev => !prev);

// ❌ 這樣也能跑，但有潛在問題
const toggle = () => setIsOpen(!isOpen);
// 問題：isOpen 可能讀到「過期的值」（stale closure）
// 特別在 setTimeout、事件批次處理時容易踩坑

// 實際使用
function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? '關閉' : '開啟'} 對話框
      </button>

      {isOpen && (
        <div className="modal">
          <p>模態框內容</p>
          <button onClick={() => setIsOpen(false)}>關閉</button>
        </div>
      )}
    </>
  );
}`}
          />

          <Card className="border border-amber-100 bg-amber-50 shadow-none">
            <CardBody className="p-5">
              <p className="font-black text-amber-800 mb-1">為什麼用 prev？</p>
              <p className="text-amber-700 text-sm leading-relaxed">
                <code className="bg-amber-100 px-1 rounded font-mono">setIsOpen(prev =&gt; !prev)</code> 讓 React 在執行 setter 的時候才去取最新的值，
                而不是用閉包裡「快照」的 isOpen。在非同步操作、批次 setState 的情境下，
                這個差異會讓你少踩很多坑。
              </p>
            </CardBody>
          </Card>
        </section>

        <Divider className="opacity-30" />

        {/* Scene 2: Object State */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">
            <span className="text-violet-600 mr-2">場景 2</span>物件狀態（表單最常見）
          </h2>
          <p className="text-gray-700 leading-relaxed">
            表單是物件 state 的最典型場景。多個欄位用一個物件管，更新時用展開運算子
            <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-sm font-mono mx-1">...prev</code>
            保留其他欄位，只改目標欄位。
          </p>

          <CodeBlock
            title="login-form.tsx"
            lang="typescript"
            code={`function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // 通用更新方法：用計算屬性名 [field] 動態更新任意欄位
  function handleChange(field: string, value: string | boolean) {
    setForm(prev => ({
      ...prev,       // 保留其他欄位（不可變更新！）
      [field]: value // 只更新這個欄位
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('提交資料：', form);
    // form.email, form.password, form.rememberMe 都在這裡
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={form.email}
        onChange={e => handleChange('email', e.target.value)}
        placeholder="Email"
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="password"
        value={form.password}
        onChange={e => handleChange('password', e.target.value)}
        placeholder="密碼"
        className="w-full border rounded px-3 py-2"
      />
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.rememberMe}
          onChange={e => handleChange('rememberMe', e.target.checked)}
        />
        記住我
      </label>
      <button
        type="submit"
        className="w-full bg-violet-600 text-white py-2 rounded font-bold"
      >
        登入
      </button>
    </form>
  );
}`}
          />

          <Card className="border border-violet-100 shadow-none">
            <CardBody className="p-5">
              <p className="font-black text-gray-800 mb-3">這樣寫的優點</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• <strong>一個 handleChange 搞定所有欄位</strong>，不用為每個欄位寫獨立的 handler</p>
                <p>• <strong>計算屬性名 <code className="bg-gray-100 px-1 rounded font-mono">[field]</code></strong> 讓函數通用化，傳入欄位名稱動態更新</p>
                <p>• <strong><code className="bg-gray-100 px-1 rounded font-mono">...prev</code> 展開</strong>確保不可變更新，其他欄位不受影響</p>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider className="opacity-30" />

        {/* Scene 3: Array State */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">
            <span className="text-violet-600 mr-2">場景 3</span>陣列狀態（新增、刪除、修改）
          </h2>
          <p className="text-gray-700 leading-relaxed">
            待辦清單、購物車、留言列表——陣列 state 有三種常見操作。
            記住一條規則：<strong>永遠回傳新陣列，絕對不要改原陣列</strong>。
          </p>

          <CodeBlock
            title="todo-list.tsx"
            lang="typescript"
            code={`interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '買咖啡', done: false },
    { id: 2, text: '寫程式', done: true },
  ]);
  const [inputText, setInputText] = useState('');

  // ✅ 新增：展開現有陣列 + 新項目（回傳新陣列）
  function addTodo() {
    if (!inputText.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: inputText, done: false }
    ]);
    setInputText('');
  }

  // ✅ 刪除：filter 過濾掉要刪除的（回傳新陣列）
  function deleteTodo(id: number) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  // ✅ 修改：map 找到要改的，其他不動（回傳新陣列）
  function toggleTodo(id: number) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, done: !todo.done }  // 這個要改
          : todo                            // 其他不動
      )
    );
  }

  // ❌ 常見錯誤：直接 splice 修改原陣列
  function badDelete(index: number) {
    todos.splice(index, 1);   // 改了原陣列
    setTodos(todos);           // React 看到同一個陣列參考，不重新渲染！
  }

  return (
    <div className="max-w-sm space-y-3">
      <div className="flex gap-2">
        <input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="新增待辦..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={addTodo}
          className="bg-violet-600 text-white px-4 py-2 rounded text-sm font-bold"
        >
          新增
        </button>
      </div>

      {todos.map(todo => (
        <div key={todo.id} className="flex items-center gap-3 p-3 border rounded-lg">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
          />
          <span className={todo.done ? 'line-through text-gray-400' : 'text-gray-800'}>
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="ml-auto text-red-400 hover:text-red-600 text-sm"
          >
            刪除
          </button>
        </div>
      ))}

      <p className="text-sm text-gray-400">
        {todos.filter(t => t.done).length} / {todos.length} 完成
      </p>
    </div>
  );
}`}
          />

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">操作</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">正確寫法</th>
                  <th className="text-left px-5 py-3 font-black text-red-600">錯誤寫法（不要用）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['新增', '[...prev, newItem]', 'prev.push(newItem)'],
                  ['刪除', 'prev.filter(item => item.id !== id)', 'prev.splice(index, 1)'],
                  ['修改', 'prev.map(item => item.id === id ? {...item, ...changes} : item)', '直接修改 item 屬性'],
                  ['排序', '[...prev].sort(...)', 'prev.sort(...)（sort 會改原陣列！）'],
                ].map(([op, correct, wrong], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-bold text-gray-700">{op}</td>
                    <td className="px-5 py-3 font-mono text-green-700 text-xs">{correct}</td>
                    <td className="px-5 py-3 font-mono text-red-500 text-xs">{wrong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Scene 4: Derived State */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">
            <span className="text-violet-600 mr-2">場景 4</span>衍生狀態——不要把可以算出來的值放進 state
          </h2>
          <p className="text-gray-700 leading-relaxed">
            這是很多人寫 React 時不自覺犯的錯：把一個<strong>可以從現有 state 計算出來的值</strong>，
            又另外存成獨立的 state。這樣做不只多此一舉，還會製造同步問題。
          </p>

          <CodeBlock
            title="derived-state.tsx"
            lang="typescript"
            code={`// ❌ 不好的做法：completedCount 是衍生值，不需要單獨存
function BadTodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedCount, setCompletedCount] = useState(0);  // 多餘！

  function toggleTodo(id: number) {
    const newTodos = todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(newTodos);
    // 還要手動同步 completedCount！容易忘記
    setCompletedCount(newTodos.filter(t => t.done).length);
  }
  // 問題：兩個 state 需要手動同步 → 一旦忘記更新就不一致
}

// ─────────────────────────────────────────────────────

// ✅ 好的做法：completedCount 直接從 todos 算出來
function GoodTodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 這不是 state，只是計算值——todos 更新時它自動更新
  const completedCount = todos.filter(t => t.done).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  function toggleTodo(id: number) {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
    // 不需要更新 completedCount！它會自動重新計算
  }

  return (
    <div>
      <p>{completedCount} / {totalCount} 完成</p>
      <div
        style={{ width: \`\${progress}%\` }}
        className="h-2 bg-violet-500 rounded transition-all"
      />
    </div>
  );
}`}
          />

          <Card className="border border-amber-100 bg-amber-50 shadow-none">
            <CardBody className="p-5">
              <p className="font-black text-amber-800 mb-2">衍生狀態的判斷標準</p>
              <p className="text-amber-700 text-sm leading-relaxed">
                問自己：「這個值能不能從現有的 state 或 props 直接算出來？」
                如果可以，就<strong>不要</strong>把它存成 state，直接在 render 時計算就好。
                如果你需要快取或避免重複計算，用 <code className="bg-amber-100 px-1 rounded font-mono">useMemo</code>——但這是進階話題，先把「不要多存 state」的直覺建立起來。
              </p>
            </CardBody>
          </Card>
        </section>

        <Divider className="opacity-30" />

        {/* Scene 5: Multiple vs Object */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">
            <span className="text-violet-600 mr-2">場景 5</span>多個 useState vs 一個物件 state
          </h2>
          <p className="text-gray-700 leading-relaxed">
            這是很多人糾結的問題。答案其實很簡單，看<strong>這些值有沒有關聯</strong>就好。
          </p>

          <CodeBlock
            title="multiple-vs-object.tsx"
            lang="typescript"
            code={`// ✅ 多個 state：適合「完全無關」的值
function Dashboard() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 這三個值各自獨立，各自更新，分開存沒問題
}

// ─────────────────────────────────────────────────────

// ✅ 物件 state：適合「一起出現、一起更新」的值
function ProfileForm() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
  });
  // 這四個都是 profile 的一部分，放一起合理

  function updateField(field: keyof typeof profile, value: string) {
    setProfile(prev => ({ ...prev, [field]: value }));
  }
}

// ─────────────────────────────────────────────────────

// ❌ 不好：把無關的值硬塞進一個物件
function BadExample() {
  const [state, setState] = useState({
    count: 0,          // 計數器
    username: '',      // 表單輸入
    isMenuOpen: false, // UI 狀態
  });
  // 這三個沒有關聯，更新時都要 ...spread，顯得囉嗦
  // 改 count 時：setState(prev => ({ ...prev, count: prev.count + 1 }))
}`}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border border-violet-100 shadow-none">
              <CardBody className="p-5">
                <p className="font-black text-violet-700 mb-3">選多個 state 的情況</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2"><span className="text-violet-500 font-bold mt-0.5">→</span>這些值各自獨立更新</li>
                  <li className="flex gap-2"><span className="text-violet-500 font-bold mt-0.5">→</span>更新頻率差異很大（一個頻繁，一個很少動）</li>
                  <li className="flex gap-2"><span className="text-violet-500 font-bold mt-0.5">→</span>概念上沒有關聯</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border border-fuchsia-100 shadow-none">
              <CardBody className="p-5">
                <p className="font-black text-fuchsia-700 mb-3">選物件 state 的情況</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2"><span className="text-fuchsia-500 font-bold mt-0.5">→</span>這些值概念上屬於同一個「實體」</li>
                  <li className="flex gap-2"><span className="text-fuchsia-500 font-bold mt-0.5">→</span>通常一起顯示、一起提交</li>
                  <li className="flex gap-2"><span className="text-fuchsia-500 font-bold mt-0.5">→</span>典型案例：表單欄位、API 回應資料</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Functional Update Deep Dive */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-amber-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Functional Update：為什麼要用 prev</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            我們在前面幾個場景反覆用到 <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">prev =&gt;</code>，現在解釋清楚為什麼。
          </p>

          <CodeBlock
            title="functional-update.tsx"
            lang="typescript"
            code={`// 問題場景：快速點擊按鈕兩次
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ 問題寫法：兩次 setCount 讀到同一個 count（因為閉包快照）
  function handleDoubleIncrement() {
    setCount(count + 1);  // count 是 0，設為 1
    setCount(count + 1);  // count 還是 0（同一個快照！），又設為 1
    // 最終結果：count = 1，不是 2
  }

  // ✅ 正確寫法：functional update 永遠拿到最新值
  function handleDoubleIncrement() {
    setCount(prev => prev + 1);  // prev 是 0，設為 1
    setCount(prev => prev + 1);  // prev 是 1（最新值），設為 2
    // 最終結果：count = 2，正確！
  }

  // 另一個常見場景：setTimeout
  function handleDelayedIncrement() {
    setTimeout(() => {
      // ❌ count 是閉包裡的舊值（0）
      setCount(count + 1);

      // ✅ prev 永遠是執行時的最新值
      setCount(prev => prev + 1);
    }, 1000);
  }

  return <button onClick={handleDoubleIncrement}>+2（{count}）</button>;
}`}
          />

          <Card className="border border-violet-100 bg-violet-50 shadow-none">
            <CardBody className="p-5">
              <p className="font-black text-violet-800 mb-2">Functional Update 的使用原則</p>
              <p className="text-violet-700 text-sm leading-relaxed">
                只要新的 state 依賴於舊的 state（例如 toggle、count+1、陣列展開），
                就用 <code className="bg-violet-100 px-1 rounded font-mono">prev =&gt;</code> 的形式。
                如果新的 state 和舊的 state 完全無關（例如 <code className="bg-violet-100 px-1 rounded font-mono">setName('Joseph')</code>），
                直接傳值即可。
              </p>
            </CardBody>
          </Card>
        </section>

        <Divider className="opacity-30" />

        {/* Summary Table */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">速查卡：五大場景總結</h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-violet-50 to-fuchsia-50">
                  <th className="text-left px-5 py-4 font-black text-gray-700">場景</th>
                  <th className="text-left px-5 py-4 font-black text-gray-700">建議寫法</th>
                  <th className="text-left px-5 py-4 font-black text-gray-700">核心原則</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['布林開關', 'setFlag(prev => !prev)', '用 prev 避免 stale closure'],
                  ['物件更新單一欄位', 'setState(prev => ({ ...prev, key: value }))', '展開保留其他欄位'],
                  ['陣列新增', 'setState(prev => [...prev, newItem])', '展開建立新陣列'],
                  ['陣列刪除', 'setState(prev => prev.filter(...))', 'filter 不改原陣列'],
                  ['陣列修改', 'setState(prev => prev.map(...))', 'map 不改原陣列'],
                  ['衍生值', '直接算，不存 state', '能算的不要多存'],
                ].map(([scene, code, note], i) => (
                  <tr key={i} className="hover:bg-violet-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-gray-800">{scene}</td>
                    <td className="px-5 py-3.5 font-mono text-violet-700 text-xs">{code}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep16-useeffect">
            <div className="bg-gray-50 hover:bg-violet-50 transition-colors rounded-2xl p-6 cursor-pointer group border border-transparent hover:border-violet-100">
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeft size={16} className="text-gray-300 group-hover:text-violet-400 transition-colors" />
                <p className="text-xs font-bold text-gray-400 uppercase">上一篇</p>
              </div>
              <p className="font-black text-gray-700 group-hover:text-violet-700 transition-colors">EP.16 — useEffect 完全指南</p>
              <p className="text-sm text-gray-400 mt-1">副作用、依賴陣列、cleanup</p>
            </div>
          </Link>
          <Link href="/blog/web-dev/ep18-app-router">
            <div className="bg-gray-50 hover:bg-violet-50 transition-colors rounded-2xl p-6 cursor-pointer group border border-transparent hover:border-violet-100 text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase">下一篇</p>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-violet-400 transition-colors" />
              </div>
              <p className="font-black text-gray-700 group-hover:text-violet-700 transition-colors">EP.18 — Next.js App Router</p>
              <p className="text-sm text-gray-400 mt-1">Server Component、路由、Layout</p>
            </div>
          </Link>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['React', 'useState', 'Hook', '狀態管理', '不可變更新', 'EP.17'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>

      </article>
    </div>
  );
}
