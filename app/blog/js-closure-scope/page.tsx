'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, ArrowLeft, ArrowRight, Code2, Lightbulb, AlertTriangle, CheckCircle, Layers, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, title, lang = 'js' }: { code: string; title?: string; lang?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? lang}</span>
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
  </div>
);

const Callout = ({ type, children }: { type: 'info' | 'warn' | 'tip' | 'error'; children: React.ReactNode }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-100 text-blue-800',
    warn: 'bg-amber-50 border-amber-100 text-amber-800',
    tip: 'bg-green-50 border-green-100 text-green-800',
    error: 'bg-red-50 border-red-100 text-red-800',
  };
  const icons = { info: '💡', warn: '⚠️', tip: '✅', error: '❌' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0">{icons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded-xl bg-amber-100 text-amber-700">{icon}</div>
    <h2 className="text-2xl font-black text-gray-800">{children}</h2>
  </div>
);

const CompareBlock = ({ bad, good, badLabel, goodLabel, note }: {
  bad: string; good: string; badLabel?: string; goodLabel?: string; note?: string;
}) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-xl overflow-hidden">
        <div className="bg-red-800 px-4 py-2">
          <span className="text-red-200 text-xs font-mono font-bold">{badLabel ?? '❌ 有問題'}</span>
        </div>
        <pre className="bg-red-950 text-red-300 font-mono text-sm px-4 py-4 overflow-x-auto whitespace-pre leading-relaxed">{bad}</pre>
      </div>
      <div className="rounded-xl overflow-hidden">
        <div className="bg-green-800 px-4 py-2">
          <span className="text-green-200 text-xs font-mono font-bold">{goodLabel ?? '✅ 正確做法'}</span>
        </div>
        <pre className="bg-green-950 text-green-300 font-mono text-sm px-4 py-4 overflow-x-auto whitespace-pre leading-relaxed">{good}</pre>
      </div>
    </div>
    {note && <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 leading-relaxed">{note}</p>}
  </div>
);

export default function JSClosureScopePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-orange-900 to-slate-900">
        <motion.div
          className="absolute inset-0 opacity-15"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 40%, rgba(251,191,36,0.7) 0%, transparent 50%), radial-gradient(circle at 70% 65%, rgba(249,115,22,0.4) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                JavaScript 深度
              </Chip>
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                閉包 × 作用域
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              閉包與作用域<br />
              <span className="text-amber-300">JS 最核心的底層機制</span>
            </h1>
            <p className="text-orange-200 text-lg font-medium max-w-2xl mx-auto">
              搞懂作用域鏈、var / let / const 的差異、閉包的形成原理，<br />
              以及那些最容易在面試和實際開發中踩到的坑
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-black text-sm">
              J
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Joseph Chen</p>
              <div className="flex items-center gap-2 text-gray-400 text-xs"><Calendar size={12} />
                <span>2026</span>
                <span>·</span>
                <span>JavaScript 深度系列</span>
                <span>·</span>
                <Clock size={12} />
                <span>5 min read</span>
                <span>·</span>
                <Eye size={12} />
                <span>1.2k views</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" variant="flat" color="warning">作用域</Chip>
            <Chip size="sm" variant="flat" color="warning">閉包</Chip>
            <Chip size="sm" variant="flat" color="warning">var/let/const</Chip>
          </div>
        </motion.div>

        <Divider />

        {/* 一、什麼是作用域 */}
        <section className="space-y-6">
          <SectionTitle icon={<Layers size={18} />}>一、什麼是作用域（Scope）？</SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            作用域（Scope）決定了<strong>「一個變數在哪裡可以被讀取或修改」</strong>。
            JavaScript 有三種作用域層級，理解它們是搞懂閉包的第一步。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: '全域作用域',
                en: 'Global Scope',
                color: 'bg-blue-50 border-blue-100',
                titleColor: 'text-blue-700',
                desc: '在任何函式或區塊之外宣告的變數，程式碼的任何地方都能存取。',
                example: 'const name = "Joseph";\n// 整份程式碼都可以用 name',
              },
              {
                name: '函式作用域',
                en: 'Function Scope',
                color: 'bg-purple-50 border-purple-100',
                titleColor: 'text-purple-700',
                desc: '在函式內部宣告的變數，只有函式內部可以存取，外部無法讀取。',
                example: 'function greet() {\n  const msg = "Hi";\n}\n// msg 在這裡是 undefined',
              },
              {
                name: '區塊作用域',
                en: 'Block Scope',
                color: 'bg-amber-50 border-amber-100',
                titleColor: 'text-amber-700',
                desc: '用 {} 包起來的區塊內，let / const 宣告的變數只在該區塊內有效。',
                example: 'if (true) {\n  let x = 1;\n}\n// x 在這裡是 undefined',
              },
            ].map((s) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card className={`border ${s.color} shadow-sm h-full`}>
                  <CardBody className="p-5 space-y-3">
                    <div>
                      <p className={`font-black text-base ${s.titleColor}`}>{s.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{s.en}</p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                    <pre className="bg-gray-900 text-green-400 font-mono text-xs p-3 rounded-xl overflow-x-auto whitespace-pre">{s.example}</pre>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 二、var vs let vs const */}
        <section className="space-y-6">
          <SectionTitle icon={<Code2 size={18} />}>二、var / let / const 與作用域的本質差異</SectionTitle>

          <p className="text-gray-700 leading-relaxed">
            這三個關鍵字的差異不只是「能不能重新賦值」，最根本的差別在於<strong>作用域的大小</strong>和<strong>提升（Hoisting）的行為</strong>。
          </p>

          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-0 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-black text-gray-600">特性</th>
                    <th className="text-center px-4 py-3 font-black text-red-500">var</th>
                    <th className="text-center px-4 py-3 font-black text-blue-600">let</th>
                    <th className="text-center px-4 py-3 font-black text-emerald-600">const</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ['作用域', '函式作用域', '區塊作用域', '區塊作用域'],
                    ['可重新賦值', '✅ 可以', '✅ 可以', '❌ 不行'],
                    ['可重新宣告', '✅ 可以', '❌ 不行', '❌ 不行'],
                    ['Hoisting', '✅（值為 undefined）', '✅（TDZ，存取報錯）', '✅（TDZ，存取報錯）'],
                    ['全域物件屬性', '✅ window.xxx', '❌ 不會掛上', '❌ 不會掛上'],
                  ].map(([feature, varV, letV, constV]) => (
                    <tr key={feature} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-bold text-gray-700">{feature}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{varV}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{letV}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{constV}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          <CodeBlock
            title="var-function-scope.js — var 的陷阱"
            code={`// var 是函式作用域，不是區塊作用域！
function example() {
  for (var i = 0; i < 3; i++) {
    // 以為 i 只在 for 迴圈裡，其實不是
  }
  console.log(i); // 3 ← for 迴圈外仍可存取！
}

// let 是區塊作用域，這才是你預期的行為
function example2() {
  for (let j = 0; j < 3; j++) {
    // j 只存在 for 區塊內
  }
  console.log(j); // ❌ ReferenceError: j is not defined
}`}
          />

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">Hoisting（提升）與暫時死區（TDZ）</h3>
            <p className="text-gray-700 leading-relaxed">
              Hoisting 是指 JS 引擎在執行程式碼之前，會先把所有宣告「提升」到作用域頂部。
              但 <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">let</code> 和 <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">const</code> 雖然也會提升，
              但在宣告那行之前讀取它們會進入<strong>暫時死區（Temporal Dead Zone）</strong>，直接報錯。
            </p>
            <CodeBlock
              title="hoisting-tdz.js"
              code={`// var 的 hoisting：宣告被提升，但值是 undefined
console.log(a); // undefined（不報錯！）
var a = 5;
console.log(a); // 5

// let 的 TDZ：宣告被提升，但在初始化前存取就報錯
console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 10;

// 這就是為什麼「用 let/const 比 var 更安全」——
// 它們會幫你抓到「先用後宣告」這種邏輯錯誤`}
            />
          </div>
        </section>

        {/* 三、作用域鏈 */}
        <section className="space-y-6">
          <SectionTitle icon={<Lightbulb size={18} />}>三、作用域鏈（Scope Chain）</SectionTitle>

          <p className="text-gray-700 leading-relaxed">
            當 JS 查找一個變數時，它會先在<strong>目前作用域</strong>找，找不到就往<strong>外層作用域</strong>找，
            一層一層向上，直到全域作用域為止。這個查找鏈就叫做<strong>作用域鏈</strong>。
          </p>

          <CodeBlock
            title="scope-chain.js"
            code={`const x = 'global';      // 全域作用域

function outer() {
  const x = 'outer';     // outer 的函式作用域

  function inner() {
    const x = 'inner';   // inner 的函式作用域
    console.log(x);      // 'inner'（在自己的作用域就找到了）
  }

  function inner2() {
    // inner2 自己沒有 x
    console.log(x);      // 'outer'（往外一層找到 outer 的 x）
  }

  inner();   // 'inner'
  inner2();  // 'outer'
}

outer();
console.log(x); // 'global'（全域的 x）`}
          />

          <Callout type="info">
            <strong>詞法作用域（Lexical Scope）</strong>：JS 的作用域是在<em>寫程式碼的時候</em>就決定的，
            不是執行的時候決定的。也就是說，一個函式能存取哪些變數，看的是它被<em>定義</em>在哪裡，
            而不是被<em>呼叫</em>在哪裡。這個特性是閉包能夠運作的根本原因。
          </Callout>
        </section>

        {/* 四、閉包 */}
        <section className="space-y-6">
          <SectionTitle icon={<Code2 size={18} />}>四、閉包（Closure）深度解析</SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            閉包是 JS 中最常被問到也最常被誤解的概念。簡單說，閉包就是：
            <strong>「一個函式，記得它被定義時所在的作用域，即使那個作用域已經執行完畢。」</strong>
          </p>

          <CodeBlock
            title="closure-basic.js — 閉包的形成"
            code={`function makeAdder(x) {
  // makeAdder 執行完後，x 理論上應該消失…
  return function(y) {
    return x + y;  // 但內層函式「記住」了 x！
  };
}

const add5 = makeAdder(5);  // makeAdder 已執行完畢
const add10 = makeAdder(10);

console.log(add5(3));   // 8   ← x 還在，等於 5 + 3
console.log(add10(3));  // 13  ← 這個 x 是 10，等於 10 + 3

// add5 和 add10 各自持有獨立的 x 值
// 它們是兩個不同的閉包`}
          />

          <Card className="shadow-sm border border-gray-100 bg-amber-50/30">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-amber-700 text-sm uppercase tracking-widest">閉包形成的三個條件</p>
              {[
                { num: '01', text: '有一個外層函式（提供作用域）' },
                { num: '02', text: '外層函式內部定義了一個內層函式' },
                { num: '03', text: '內層函式引用了外層函式的變數，且被回傳或傳遞到外部使用' },
              ].map((c) => (
                <div key={c.num} className="flex items-start gap-4 bg-white rounded-xl px-4 py-3">
                  <span className="font-black text-amber-400 text-lg w-8 shrink-0">{c.num}</span>
                  <p className="text-gray-700 text-sm leading-relaxed mt-0.5">{c.text}</p>
                </div>
              ))}
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-800">閉包的實際應用場景</h3>

          <div className="space-y-6">
            {/* 應用 1：私有變數 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="warning">應用 1</Chip>
                <h4 className="font-black text-gray-700">私有變數（Private State）</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                JS 沒有原生的 private 關鍵字（class 的 # 是後來才加的），
                閉包是在 ES6 之前實現私有狀態的標準做法。
              </p>
              <CodeBlock
                title="private-state.js"
                code={`function createBankAccount(initialBalance) {
  let balance = initialBalance;  // 外部無法直接存取 balance

  return {
    deposit: (amount) => {
      balance += amount;
      return balance;
    },
    withdraw: (amount) => {
      if (amount > balance) throw new Error('餘額不足');
      balance -= amount;
      return balance;
    },
    getBalance: () => balance,
  };
}

const account = createBankAccount(1000);
account.deposit(500);     // 1500
account.withdraw(200);    // 1300
account.getBalance();     // 1300
account.balance;          // undefined ← 無法直接存取！`}
              />
            </div>

            {/* 應用 2：函式工廠 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="warning">應用 2</Chip>
                <h4 className="font-black text-gray-700">函式工廠（Function Factory）</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                用閉包「預先固定」部分參數，產生一系列相關函式。這在 React 的事件處理中非常常見。
              </p>
              <CodeBlock
                title="function-factory.js"
                code={`// 通用的乘法工廠
const multiply = (factor) => (num) => num * factor;

const double = multiply(2);
const triple = multiply(3);
const tenTimes = multiply(10);

double(5);   // 10
triple(5);   // 15
tenTimes(5); // 50

// React 中的實際使用場景
// const handleClick = (id) => () => deleteItem(id);
// <button onClick={handleClick(item.id)}>刪除</button>`}
              />
            </div>

            {/* 應用 3：Memoization */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="warning">應用 3</Chip>
                <h4 className="font-black text-gray-700">快取（Memoization）</h4>
              </div>
              <CodeBlock
                title="memoize.js"
                code={`function memoize(fn) {
  const cache = {};  // 閉包記住這個快取物件

  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log('從快取回傳');
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const slowSquare = (n) => {
  // 假設這是一個耗時計算
  return n * n;
};

const fastSquare = memoize(slowSquare);
fastSquare(10); // 計算，回傳 100，存入快取
fastSquare(10); // 從快取回傳 100，不重新計算
fastSquare(10); // 從快取回傳 100`}
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* 五、常見陷阱 */}
        <section className="space-y-8">
          <SectionTitle icon={<AlertTriangle size={18} />}>五、最常見的閉包陷阱</SectionTitle>

          {/* 陷阱 1：var in loop */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #1</Chip>
                <h4 className="font-black text-gray-800">var 在迴圈中建立閉包</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                這是最經典的面試題。用 <code className="font-mono">var</code> 的迴圈，所有閉包共享同一個變數。
              </p>
              <CompareBlock
                badLabel="❌ var — 全部印出 3"
                goodLabel="✅ let — 各自獨立"
                bad={`for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// 印出：3 3 3
// 因為 var i 是函式作用域，
// 三個閉包共享同一個 i，
// 執行時 i 已經是 3 了`}
                good={`for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// 印出：0 1 2
// let 是區塊作用域，
// 每次迭代都建立一個新的 i，
// 各閉包記住自己那份 i`}
                note="這個問題的根本原因是 var 的函式作用域。用 let 替換 var，讓每次迭代都有獨立的區塊作用域，閉包就能各自記住正確的 i 值。"
              />
            </CardBody>
          </Card>

          {/* 陷阱 2：記憶體洩漏 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #2</Chip>
                <h4 className="font-black text-gray-800">閉包造成的記憶體洩漏</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                閉包會讓外層函式的變數一直存在記憶體中，如果閉包持有大型資料且沒有釋放，會造成記憶體洩漏。
              </p>
              <CodeBlock
                title="memory-leak.js"
                code={`function createLeak() {
  const bigData = new Array(1000000).fill('data'); // 大型資料

  return function() {
    // 這個閉包只用到 bigData.length，
    // 但 bigData 整個陣列都被保留在記憶體中
    return bigData.length;
  };
}

// ✅ 改法：只保留需要的值
function createNoLeak() {
  const bigData = new Array(1000000).fill('data');
  const len = bigData.length; // 只記住需要的值

  // bigData 可以被垃圾回收了
  return function() {
    return len;
  };
}`}
              />
              <Callout type="warn">
                在 React 中，useCallback / useMemo 的 dependency array 如果漏掉了某個閉包引用的變數，
                可能導致閉包「記住舊的值」而不更新，這是 stale closure（過時閉包）問題。
              </Callout>
            </CardBody>
          </Card>

          {/* 陷阱 3：this */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #3</Chip>
                <h4 className="font-black text-gray-800">閉包不能「記住」<code className="font-mono">this</code></h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                閉包記住的是<em>外層作用域的變數</em>，但 <code className="font-mono">this</code> 不是變數，它是由呼叫方式決定的。
                這是一個不少人混淆的地方。
              </p>
              <CodeBlock
                title="this-closure.js"
                code={`const obj = {
  name: 'Joseph',

  // ❌ 傳統函式：this 由呼叫方式決定
  greetTraditional: function() {
    setTimeout(function() {
      console.log(this.name); // undefined（this 是 window/undefined）
    }, 100);
  },

  // ✅ 箭頭函式：this 繼承定義時的外層 this
  greetArrow: function() {
    setTimeout(() => {
      console.log(this.name); // 'Joseph' ← 正確！
    }, 100);
  },
};

obj.greetTraditional(); // undefined
obj.greetArrow();       // 'Joseph'`}
              />
              <Callout type="info">
                箭頭函式沒有自己的 <code className="font-mono">this</code>，它會繼承定義時外層作用域的 <code className="font-mono">this</code>。
                這就是 React 事件處理器通常用箭頭函式的原因——可以正確讀取元件實例的 <code className="font-mono">this</code>。
              </Callout>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* 六、快速複習 */}
        <section className="space-y-5">
          <SectionTitle icon={<CheckCircle size={18} />}>六、核心重點整理</SectionTitle>

          <Card className="shadow-sm border border-amber-100 bg-amber-50/30">
            <CardBody className="p-6 space-y-3">
              {[
                { key: '作用域', val: '決定變數在哪裡可以被讀取，分全域／函式／區塊三層' },
                { key: '作用域鏈', val: '找不到變數就往外層找，一直找到全域；基於詞法作用域（寫程式的位置決定）' },
                { key: 'var', val: '函式作用域、會 Hoisting（值為 undefined）、可重複宣告 → 避免使用' },
                { key: 'let / const', val: '區塊作用域、TDZ（宣告前存取報錯）、let 可重新賦值，const 不行' },
                { key: '閉包', val: '內層函式記住外層作用域變數引用，即使外層函式已執行完畢' },
                { key: 'var + 閉包迴圈', val: '所有閉包共享同一個 var 變數 → 用 let 解決，各次迭代有獨立作用域' },
                { key: 'this ≠ 閉包', val: 'this 由呼叫方式決定，不被閉包記住 → 箭頭函式繼承外層 this' },
              ].map((r) => (
                <div key={r.key} className="flex items-start gap-4 bg-white rounded-xl px-4 py-3">
                  <code className="font-mono text-sm font-black text-amber-700 w-28 shrink-0 mt-0.5">{r.key}</code>
                  <p className="text-sm text-gray-600 flex-1 leading-relaxed">{r.val}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-4">
          <Link href="/blog/js-30days-learning-review">
            <Button variant="flat" startContent={<ArrowLeft size={16} />} className="font-bold text-gray-600 hover:text-gray-900">
              JS 學習復盤
            </Button>
          </Link>
          <Link href="/blog/js-event-loop">
            <Button variant="flat" endContent={<ArrowRight size={16} />} className="font-bold text-gray-600 hover:text-gray-900">
              Event Loop 完整圖解
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
