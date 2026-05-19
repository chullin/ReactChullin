import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Cpu,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  Layers,
  Box
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '不用 React，做個動態待辦清單 ——然後你就懂了 | Joseph Chen',
  description: '從「手動操作 DOM 的痛苦」理解 React 為什麼存在。 先用原生 JavaScript 體驗那個痛點，再看 React 如何優雅地解決它。',
  alternates: {
    canonical: 'https://chullin.tw/blog/web-dev/ep15-why-react',
  },
};



export default function WebDevEP15() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-700 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.15</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web 開發系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              不用 React，做個動態待辦清單<br />
              <span className="text-cyan-200">——然後你就懂了</span>
            </h1>
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl">
              從「手動操作 DOM 的痛苦」理解 React 為什麼存在。
              先用原生 JavaScript 體驗那個痛點，再看 React 如何優雅地解決它。
            </p>
            <div className="flex items-center gap-6 text-cyan-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 12 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> React · DOM · Virtual DOM · 為什麼學 React</span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* 開場 Quote */}
        <section   >
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-lg">
            <div className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-cyan-400 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「讓我先問你一個問題：如果有人說用 HTML + CSS + JavaScript 就能做網頁，為什麼還需要 React？」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    這篇帶你親手感受那個痛點。我們先用純 JavaScript 做一個待辦清單，
                    讓你真實體會「手動操作 DOM」有多麻煩——然後你就會懂 React 為什麼存在了。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: 原生 JS 待辦清單 */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <Cpu className="text-cyan-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">先做一個原生 JS 待辦清單</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            先別碰 React。我們用最原始的 HTML + JavaScript 來做一個能「新增、勾選完成、刪除」的待辦清單。
            這個版本完全可以運作——先看它怎麼寫的：
          </p>

          <CodeBlock
            title="vanilla-todo.html — 純 HTML + JavaScript 版本"
            lang="html"
            code={`<!DOCTYPE html>
<html>
<body>
  <input id="input" placeholder="輸入待辦事項">
  <button onclick="addTodo()">新增</button>
  <ul id="list"></ul>
  <p>共 <span id="count">0</span> 筆待辦</p>

  <script>
    const todos = [];

    function addTodo() {
      const input = document.getElementById('input');
      const value = input.value;
      if (!value) return;

      todos.push({ id: Date.now(), text: value, done: false });
      input.value = '';
      render();  // 每次更新都要手動呼叫
    }

    function toggleTodo(id) {
      const todo = todos.find(t => t.id === id);
      todo.done = !todo.done;
      render();  // 又要手動呼叫
    }

    function deleteTodo(id) {
      const index = todos.findIndex(t => t.id === id);
      todos.splice(index, 1);
      render();  // 還是手動呼叫
    }

    function render() {
      // 每次都要整個重新建 DOM
      const list = document.getElementById('list');
      list.innerHTML = '';  // 先清空

      todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = \`
          <span style="text-decoration: \${todo.done ? 'line-through' : 'none'}">\${todo.text}</span>
          <button onclick="toggleTodo(\${todo.id})">完成</button>
          <button onclick="deleteTodo(\${todo.id})">刪除</button>
        \`;
        list.appendChild(li);
      });

      // 別忘了更新計數器！
      document.getElementById('count').textContent = todos.length;
    }
  </script>
</body>
</html>`}
          />

          <p className="text-gray-600 leading-relaxed">
            這個版本「可以用」。功能都有：新增、完成、刪除、計數器。
            但等等——你有沒有注意到 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">render()</code> 出現了三次？
            而且每次改資料之後，你都要記得手動呼叫它。
          </p>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 2: 這裡有什麼問題？ */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">這裡有什麼問題？</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            乍看之下沒什麼大問題。但等到你要加功能——「按重要度排序」、「只顯示未完成」、「每筆待辦有截止日」——
            問題就開始浮現。讓我們拆開來看：
          </p>

          <div className="grid sm:grid-cols-1 gap-5">
            {/* 問題 1 */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-red-100 shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <span className="text-red-600 font-black text-lg">1</span>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black text-gray-900">每次都要手動更新 DOM</p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      你改了資料（<code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">todos</code> 陣列），
                      畫面不會自動更新——你必須記得呼叫 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">render()</code>。
                      如果你忘了，畫面和資料就不同步了。功能越多，需要呼叫 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">render()</code> 的地方越多，越容易漏掉。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 問題 2 */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-orange-100 shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="text-orange-600 font-black text-lg">2</span>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black text-gray-900">render() 效率差</p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      每次 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">render()</code> 都先 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">list.innerHTML = ''</code> 清空整個列表，再重建所有項目。
                      你點了一個「完成」按鈕，結果整個列表都重建了——包括那些根本沒變的待辦事項。
                      清單 100 筆，你改一筆，100 筆全部重新建 DOM。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 問題 3 */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-yellow-100 shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                    <span className="text-yellow-600 font-black text-lg">3</span>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black text-gray-900">程式碼越來越難維護</p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      加一個「按重要度排序」功能，你需要在十幾個地方更新邏輯，還要記得呼叫 <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">render()</code>。
                      「只顯示未完成」功能也一樣。每加一個功能，複雜度就跳一個量級。
                      六個月後換人接手（或六個月後的自己接手），根本看不懂資料和畫面之間的關係。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 比喻 Card */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-amber-200 bg-amber-50 shadow-sm">
            <div className="p-6">
              <div className="flex gap-3">
                <Lightbulb className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-black text-amber-800 mb-2 text-sm">Excel 比喻</p>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    就像你在 Excel 裡用公式 <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">SUM</code>，但每次改了數字，
                    你要手動按 F9 才會更新——這不對，公式就應該自動計算。
                    React 就是讓畫面能「自動計算」。你只需要說「這格的值是什麼」，
                    計算的事讓工具幫你做。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 3: React 怎麼解決 */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">React 怎麼解決這個問題</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            把剛才的待辦清單改寫成 React 版本。對比著看，你就會懂核心差異在哪：
          </p>

          <CodeBlock
            title="TodoApp.tsx — React 版本"
            lang="tsx"
            code={`import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function addTodo() {
    if (!input) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
    // ← 不需要手動 render()，React 自動處理！
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
    // ← 只更新這個項目，其他不動
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>新增</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => toggleTodo(todo.id)}>完成</button>
            <button onClick={() => deleteTodo(todo.id)}>刪除</button>
          </li>
        ))}
      </ul>
      <p>共 {todos.length} 筆待辦</p>
    </div>
  );
}`}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
              <p className="font-black text-red-700 mb-3 text-sm">原生 JS 版本的負擔</p>
              <ul className="space-y-2 text-sm text-red-700">
                <li className="flex items-start gap-2"><span className="mt-0.5">✗</span> 每次改資料都要手動呼叫 render()</li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✗</span> render() 清空整個 DOM 再重建</li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✗</span> 資料和 DOM 操作混在一起</li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✗</span> 計數器要單獨記得更新</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <p className="font-black text-green-700 mb-3 text-sm">React 版本的差異</p>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start gap-2"><span className="mt-0.5">✓</span> setTodos() 之後畫面自動更新</li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✓</span> React 只更新有差異的部分</li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✓</span> 你只管資料，不管 DOM</li>
                <li className="flex items-start gap-2"><span className="mt-0.5">✓</span> 計數器 {'{todos.length}'} 自動同步</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-blue-200 bg-blue-50 shadow-sm">
            <div className="p-6">
              <p className="font-black text-blue-800 mb-3">React 的核心思想</p>
              <p className="text-blue-700 leading-relaxed">
                你只需要說明資料是什麼（<code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-sm">todos</code>），
                以及怎麼更新資料（<code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-sm">setTodos</code>）。
                畫面的事，React 幫你搞定。
              </p>
              <div className="mt-4 bg-blue-700 text-white rounded-xl px-5 py-3 font-black text-center text-lg tracking-wide">
                UI = f(data)
              </div>
              <p className="text-blue-600 text-sm text-center mt-2">
                UI 是資料的函式。資料變了，UI 自動跟著變。
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 4: Virtual DOM */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <Layers className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Virtual DOM——React 為什麼快</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            你可能會想：「React 畫面自動更新，那它不是每次都重建整個 DOM 嗎？那不是更慢？」
            答案是——React 用了 Virtual DOM，讓更新變得聰明很多。
          </p>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-indigo-100 bg-indigo-50 shadow-sm">
            <div className="p-6">
              <div className="flex gap-3">
                <Lightbulb className="text-indigo-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-black text-indigo-800 mb-2">裝修房子的比喻</p>
                  <p className="text-indigo-700 text-sm leading-relaxed">
                    想像你要裝修一間房子。<br /><br />
                    <strong>傳統做法（原生 JS）：</strong>每次有任何改動，就把整個房子拆掉重建。換個燈泡也拆整棟。<br /><br />
                    <strong>React 的做法：</strong>先在腦袋裡（Virtual DOM）規劃好改動，比對前後差異，
                    只搬那幾件家具、換那顆燈泡，其他不動。不拆整間房子。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 流程圖 */}
          <div className="space-y-4">
            <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
              <p className="font-black text-red-700 mb-3 text-sm">原生 JS 更新流程</p>
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-medium">資料改變</span>
                <span className="text-red-400">→</span>
                <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-medium">innerHTML = '' 清空</span>
                <span className="text-red-400">→</span>
                <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-medium">整個 DOM 重建</span>
                <span className="text-red-400">→</span>
                <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-medium">瀏覽器重新繪製</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <p className="font-black text-green-700 mb-3 text-sm">React 更新流程</p>
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">資料改變</span>
                <span className="text-green-400">→</span>
                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">計算新 Virtual DOM</span>
                <span className="text-green-400">→</span>
                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">比對 diff</span>
                <span className="text-green-400">→</span>
                <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">只更新有差異的部分</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Virtual DOM 是 React 在記憶體中維護的一份 DOM 樹的輕量描述。
            每次狀態改變，React 先更新 Virtual DOM，再比較前後兩棵樹的差異（reconciliation），
            最後只把真正有變化的部分同步到瀏覽器的實際 DOM。
            這個過程叫做 <strong>Diffing</strong>。
          </p>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 5: React 核心心法 */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <Box className="text-cyan-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">React 的三個核心心法</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            React 不只是一個「讓 DOM 操作變簡單」的工具，它背後有一套設計哲學。
            理解這三個心法，你學 React 的速度會快很多：
          </p>

          <div className="grid sm:grid-cols-1 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-cyan-100 shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center shrink-0">
                    <span className="text-cyan-700 font-black text-lg">1</span>
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg mb-2">UI = f(state)</p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      把注意力放在「資料」，不是「DOM 操作」。你只需要描述「當資料是 X 時，畫面長什麼樣子」。
                      React 的工作是把這個描述轉換成真實的 DOM 並保持同步。
                      你不再需要思考「我要操作哪個 DOM 元素」——只需要思考「資料應該長什麼樣子」。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-blue-100 shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-blue-700 font-black text-lg">2</span>
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg mb-2">單向資料流</p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      資料從上往下傳（父組件 → 子組件），只能透過 Props 傳遞。
                      這讓你永遠知道「這個資料從哪來」——不會有資料從四面八方湧入、你搞不清楚誰改了什麼的狀況。
                      單向流讓 debug 變得容易：追蹤資料的源頭，就能找到問題所在。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-indigo-100 shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center shrink-0">
                    <span className="text-indigo-700 font-black text-lg">3</span>
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-lg mb-2">組件化（Component）</p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      把 UI 拆成獨立的積木，每個積木只管自己的邏輯。
                      <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">{'<TodoItem />'}</code> 只管一筆待辦事項的顯示，
                      <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">{'<TodoList />'}</code> 只管清單的排列，
                      <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">{'<TodoApp />'}</code> 管整個應用的狀態。
                      每個積木可以獨立開發、測試、重複使用。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 總結 */}
        <section
          
          
          
          
        >
          <div className="bg-gradient-to-br from-cyan-700 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-4">
              {[
                { n: '01', text: '原生 JS 的問題：資料改了，你必須手動呼叫 render() 更新 DOM。功能越多，越容易忘記、越難維護。' },
                { n: '02', text: '原生 JS 的 render() 每次清空整個 DOM 再重建，效率差。React 用 Virtual DOM + Diffing，只更新有變化的部分。' },
                { n: '03', text: 'React 的核心哲學：UI = f(data)。你只管資料（state），畫面自動同步，不需要手動操作 DOM。' },
                { n: '04', text: '三個心法：宣告式 UI（描述結果）、單向資料流（來源清晰）、組件化（可重複使用的積木）。' },
              ].map((item) => (
                <div key={item.n} className="flex items-start gap-4">
                  <span className="bg-white/20 rounded-lg px-2.5 py-0.5 font-black text-sm shrink-0">{item.n}</span>
                  <span className="text-white/90 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-2xl">
              <p className="text-cyan-100 text-sm font-medium">
                現在你知道為什麼需要 React 了。下一篇就直接進去：Component、JSX、Props、State——React 的四個核心積木。
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50"  />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep14-typescript" className="group block bg-gray-50 hover:bg-cyan-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-cyan-600 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-cyan-700 transition-colors">EP.14 — TypeScript 入門</p>
            <p className="text-sm text-gray-500 mt-1">型別系統 · Interface · Generics</p>
          </Link>
          <Link href="/blog/web-dev/ep04-react-component" className="group block bg-gray-50 hover:bg-cyan-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-cyan-600 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-cyan-700 transition-colors">EP.04 — React 核心概念</p>
            <p className="text-sm text-gray-500 mt-1">Component · JSX · Props · State</p>
          </Link>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['React', 'JavaScript', 'DOM', 'Virtual DOM', '為什麼學 React', 'EP.15'].map(tag => (
            <span key={tag}   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-bold">{tag}</span>
          ))}
        </div>

      </article>
    </div>
  );
}
