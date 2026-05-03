'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, BookOpen, AlertTriangle, CheckCircle, Code2, Lightbulb, Target, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

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

const ProblemCard = ({
  num,
  title,
  tag,
  tagColor,
  children,
}: {
  num: string;
  title: string;
  tag: string;
  tagColor: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <Card className="shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <CardBody className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-black text-gray-400 tracking-widest uppercase mb-1">{num}</p>
            <h3 className="text-lg font-black text-gray-800">{title}</h3>
          </div>
          <Chip size="sm" className={`${tagColor} font-bold text-xs shrink-0`}>{tag}</Chip>
        </div>
        {children}
      </CardBody>
    </Card>
  </motion.div>
);

const MistakeRow = ({ bad, good, note }: { bad: string; good: string; note: string }) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-xl overflow-hidden">
        <div className="bg-red-800 px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-red-200 text-xs font-mono font-bold">❌ 錯誤寫法</span>
        </div>
        <pre className="bg-red-950 text-red-300 font-mono text-sm px-4 py-3 overflow-x-auto whitespace-pre">{bad}</pre>
      </div>
      <div className="rounded-xl overflow-hidden">
        <div className="bg-green-800 px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-green-200 text-xs font-mono font-bold">✅ 正確寫法</span>
        </div>
        <pre className="bg-green-950 text-green-300 font-mono text-sm px-4 py-3 overflow-x-auto whitespace-pre">{good}</pre>
      </div>
    </div>
    <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 leading-relaxed">{note}</p>
  </div>
);

export default function JS30DaysReviewPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-900 to-slate-900">
        <motion.div
          className="absolute inset-0 opacity-15"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 45%, rgba(251,191,36,0.7) 0%, transparent 50%), radial-gradient(circle at 75% 55%, rgba(245,158,11,0.4) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                JavaScript 深度
              </Chip>
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                30 Days of JS
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              JS 算法學習復盤<br />
              <span className="text-amber-300">閉包、高階函式與那些坑</span>
            </h1>
            <p className="text-yellow-200 text-lg font-medium max-w-2xl mx-auto">
              從 LeetCode 30 Days of JavaScript 學習紀錄出發，<br />
              整理那些讓我卡關最久、理解最深的 JS 核心觀念
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white font-black text-sm">
              J
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Joseph Chen</p>
              <div className="flex items-center gap-2 text-gray-400 text-xs"><Calendar size={12} />
                <span>2026</span>
                <span>·</span>
                <span>LeetCode 30 Days of JavaScript</span>
                <span>·</span>
                <Clock size={12} />
                <span>5 min read</span>
                <span>·</span>
                <Eye size={12} />
                <span>1.2k views</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Chip size="sm" variant="flat" color="warning">閉包</Chip>
            <Chip size="sm" variant="flat" color="warning">高階函式</Chip>
            <Chip size="sm" variant="flat" color="warning">函式組合</Chip>
          </div>
        </motion.div>

        <Divider />

        {/* Section 1 — 學習背景與難點 */}
        <section className="space-y-6">
          <SectionTitle icon={<BookOpen size={18} />}>一、學習背景與難點</SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            這份復盤的素材，來自我在 <strong>LeetCode 30 Days of JavaScript</strong> 學習計畫中，
            與 AI 的實際對話紀錄。從最基礎的 Hello World、Counter，到函式組合的 <code className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-mono text-sm">reduceRight</code>，
            我把每一個卡關的地方都留了下來。
          </p>

          <Card className="shadow-sm border border-amber-100">
            <CardBody className="p-6">
              <p className="text-sm font-black text-amber-700 uppercase tracking-widest mb-4">本次學習覆蓋的題目</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { num: '#2667', title: 'Create Hello World Function', tag: '閉包基礎' },
                  { num: '#2620', title: 'Counter', tag: 'n++ vs ++n' },
                  { num: '#2704', title: 'To Be Or Not To Be', tag: '物件方法語法' },
                  { num: '#2665', title: 'Counter II', tag: '變數遮蔽 Bug' },
                  { num: '#2634', title: 'Filter Elements from Array', tag: 'Truthy/Falsy' },
                  { num: '#2635', title: 'Apply Transform Over Each Element', tag: '高階函式' },
                  { num: '#2703', title: 'Return Length of Arguments Passed', tag: 'Rest 參數' },
                  { num: '#2629', title: 'Function Composition', tag: 'reduceRight' },
                ].map((p) => (
                  <div key={p.num} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-xs font-black text-amber-600 w-14 shrink-0">{p.num}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-700 truncate">{p.title}</p>
                    </div>
                    <Chip size="sm" variant="flat" color="warning" className="text-[10px] shrink-0">{p.tag}</Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed">
            我在這個學習計畫中遇到的難點，大致可以分成三類：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🔒',
                title: '閉包直覺',
                desc: '知道「閉包會記住外層變數」，但實際遇到 n++ 的回傳值、變數遮蔽，腦袋就打結。',
              },
              {
                icon: '🧩',
                title: '語法誤用',
                desc: '物件方法的 key: value 語法、箭頭函式隱式回傳、rest 參數 ...args，每個都有細節地雷。',
              },
              {
                icon: '🔄',
                title: '函式組合',
                desc: 'reduceRight 的執行順序、高階函式為什麼要 return function，腦袋需要建立新的抽象層。',
              },
            ].map((item) => (
              <Card key={item.title} className="shadow-sm border border-gray-100">
                <CardBody className="p-5 space-y-2">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="font-black text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* Section 2 — 核心知識問題點 */}
        <section className="space-y-10">
          <SectionTitle icon={<Lightbulb size={18} />}>二、核心知識問題點</SectionTitle>

          {/* 2-1 閉包 */}
          <div className="space-y-5">
            <h3 className="text-xl font-black text-gray-800">2-1 閉包（Closure）的本質</h3>
            <p className="text-gray-700 leading-relaxed">
              閉包最難的不是定義，而是<strong>「它記住的是變數本身，不是值」</strong>。
              每次呼叫內層函式時，讀取的是外層變數的<em>當前狀態</em>，不是建立時的快照。
            </p>
            <CodeBlock
              title="closure-counter.js"
              code={`function makeCounter() {
  let n = 0;          // 這個 n 被內層函式「記住」

  return function() {
    return n++;       // 先回傳 n 的當前值，然後 n 才加 1
  };
}

const counter = makeCounter();
console.log(counter()); // 0  ← 回傳 0，n 變成 1
console.log(counter()); // 1  ← 回傳 1，n 變成 2
console.log(counter()); // 2  ← 回傳 2，n 變成 3`}
            />
            <Callout type="warn">
              <strong>n++ 與 ++n 的差異：</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><code className="font-mono">n++</code>（後置遞增）：先回傳 n 的舊值，再將 n 加 1</li>
                <li><code className="font-mono">++n</code>（前置遞增）：先將 n 加 1，再回傳新值</li>
              </ul>
              <p className="mt-2">Counter 題目要求「第一次呼叫回傳 init」，所以必須用 <code className="font-mono">return n++</code>，不能用 <code className="font-mono">return ++n</code>。</p>
            </Callout>
          </div>

          {/* 2-2 物件方法語法 */}
          <div className="space-y-5">
            <h3 className="text-xl font-black text-gray-800">2-2 物件方法的 <code className="font-mono text-lg">key: value</code> 語法</h3>
            <p className="text-gray-700 leading-relaxed">
              我在 <strong>#2704 To Be Or Not To Be</strong> 的時候，完全搞不清楚
              <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm mx-1">:</code> 的用途。
              後來理解了：在物件字面值（object literal）裡，<code className="font-mono">:</code> 是「鍵值對的分隔符號」，不是 TypeScript 型別標注。
            </p>
            <CodeBlock
              title="object-methods.js"
              code={`// 物件字面值：{ key: value }
// value 可以是任何東西，包含函式（方法）

const expect = (val) => {
  return {
    // toBe 是 key，後面的箭頭函式是 value
    toBe: (expected) => {
      if (val !== expected) throw new Error("Not Equal");
      return true;
    },
    // notToBe 也是一個 key，value 同樣是函式
    notToBe: (expected) => {
      if (val === expected) throw new Error("Equal");
      return true;
    },
  };
};

// 鏈式呼叫：expect(5).toBe(5) → true
// expect(5).notToBe(6) → true`}
            />
            <Callout type="info">
              <strong>throw vs return 的差異</strong>：<code className="font-mono">throw new Error("msg")</code> 會中斷執行並拋出例外；
              <code className="font-mono">return false</code> 只是回傳一個值，函式繼續正常結束。
              LeetCode 要求「不相等時拋出例外」，必須用 <code className="font-mono">throw</code>，不能用 <code className="font-mono">return</code>。
            </Callout>
          </div>

          {/* 2-3 Truthy/Falsy */}
          <div className="space-y-5">
            <h3 className="text-xl font-black text-gray-800">2-3 Truthy / Falsy：JS 的真假判斷規則</h3>
            <p className="text-gray-700 leading-relaxed">
              在 <strong>#2634 Filter Elements</strong> 中，filter 函式的核心就是：
              把 fn 回傳值為 <strong>truthy</strong> 的元素留下來。
              JS 的 Falsy 值只有 6 個，其他所有值都是 Truthy。
            </p>
            <Card className="shadow-sm border border-gray-100">
              <CardBody className="p-6">
                <p className="text-sm font-black text-gray-500 uppercase tracking-widest mb-4">JS 的 6 個 Falsy 值</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { val: 'false', desc: '布林假值' },
                    { val: '0', desc: '數字零' },
                    { val: '""', desc: '空字串' },
                    { val: 'null', desc: '無值' },
                    { val: 'undefined', desc: '未定義' },
                    { val: 'NaN', desc: '非數字' },
                  ].map((f) => (
                    <div key={f.val} className="bg-red-50 rounded-xl px-4 py-3 text-center">
                      <code className="font-mono font-black text-red-700 text-base">{f.val}</code>
                      <p className="text-xs text-red-500 mt-1">{f.desc}</p>
                    </div>
                  ))}
                </div>
                <Callout type="tip">
                  <strong>易混淆</strong>：<code className="font-mono">"0"</code>（字串的零）、<code className="font-mono">[]</code>（空陣列）、
                  <code className="font-mono">{'{}'}</code>（空物件）通通是 <strong>Truthy</strong>！只有數字 <code className="font-mono">0</code> 是 Falsy。
                </Callout>
              </CardBody>
            </Card>
          </div>

          {/* 2-4 Rest 參數 */}
          <div className="space-y-5">
            <h3 className="text-xl font-black text-gray-800">2-4 Rest 參數 <code className="font-mono text-lg">...args</code></h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>#2703 argumentsLength</strong> 讓我第一次認識 rest 參數。
              <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm mx-1">...args</code>
              會把所有傳入的參數收集成一個<strong>真正的陣列</strong>，可以直接用 <code className="font-mono">.length</code>。
            </p>
            <CodeBlock
              title="rest-params.js"
              code={`// ...args 收集所有參數成陣列
const argumentsLength = (...args) => args.length;

argumentsLength(1, 2, 3);        // 3
argumentsLength("a", "b");       // 2
argumentsLength();               // 0

// ⚠️ 舊寫法：arguments 物件（類陣列，不是真正的陣列）
function old() {
  console.log(arguments);      // Arguments [1, 2, 3]
  console.log(arguments.length); // 3
  // arguments.map(...)  ← 這會報錯！不是真陣列
}

// ✅ 現代寫法：用 rest params，是真正的陣列
const modern = (...args) => {
  args.map(x => x * 2); // ✅ 可以用所有陣列方法
};`}
            />
          </div>

          {/* 2-5 reduceRight */}
          <div className="space-y-5">
            <h3 className="text-xl font-black text-gray-800">2-5 函式組合與 <code className="font-mono text-lg">reduceRight</code></h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>#2629 Function Composition</strong> 是這批題目中概念最難的一題。
              函式組合 <code className="font-mono">compose(f, g, h)(x)</code> 的數學定義是 <code className="font-mono">f(g(h(x)))</code>——
              從右到左依序執行。<code className="font-mono">reduceRight</code> 就是專門為這個場景設計的。
            </p>
            <CodeBlock
              title="function-composition.js"
              code={`const compose = (functions) => {
  // 如果沒有函式，就直接回傳輸入值
  if (functions.length === 0) return (x) => x;

  return function(x) {
    // reduceRight 從陣列最後一個元素開始往左走
    // 每次把上一輪的結果餵給下一個函式
    return functions.reduceRight(
      (result, fn) => fn(result),
      x  // 初始值是 x
    );
  };
};

// 使用範例
const double = (x) => x * 2;
const addOne = (x) => x + 1;
const square = (x) => x * x;

// compose([double, addOne, square])(4)
// = double(addOne(square(4)))
// = double(addOne(16))
// = double(17)
// = 34`}
            />
            <Callout type="info">
              <strong>為什麼要 <code className="font-mono">return function(x)</code>？</strong><br />
              因為 <code className="font-mono">compose</code> 本身接收的是「函式陣列」，它必須<em>回傳一個新函式</em>，
              等之後傳入 <code className="font-mono">x</code> 才真正執行。這是高階函式的核心模式：
              「接收函式、回傳函式」。
            </Callout>
          </div>
        </section>

        <Divider />

        {/* Section 3 — 經典例題復盤 */}
        <section className="space-y-8">
          <SectionTitle icon={<Code2 size={18} />}>三、經典例題與程式碼復盤</SectionTitle>

          <ProblemCard
            num="#2704"
            title="To Be Or Not To Be"
            tag="閉包 + 物件方法"
            tagColor="bg-purple-100 text-purple-700"
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              這題要求實作一個 <code className="font-mono">expect(val)</code> 函式，回傳一個物件，
              物件有 <code className="font-mono">toBe</code> 和 <code className="font-mono">notToBe</code> 兩個方法，
              分別用 <code className="font-mono">===</code> 嚴格比較，不相等就 throw Error。
            </p>
            <CodeBlock
              title="#2704 solution"
              code={`var expect = function(val) {
  return {
    toBe: (expected) => {
      if (val !== expected) {
        throw new Error("Not Equal");
      }
      return true;
    },
    notToBe: (expected) => {
      if (val === expected) {
        throw new Error("Equal");
      }
      return true;
    },
  };
};

// 測試
expect(5).toBe(5);      // true
expect(5).notToBe(6);   // true
expect(5).toBe(6);      // throws Error: "Not Equal"`}
            />
            <Callout type="tip">
              這題的關鍵學習點：<strong>鏈式呼叫</strong>（chaining）的底層邏輯。
              <code className="font-mono">expect(5).toBe(5)</code> 等同於先呼叫 <code className="font-mono">expect(5)</code> 拿到物件，
              再對這個物件呼叫 <code className="font-mono">.toBe(5)</code>。<code className="font-mono">.</code> 就是在讀取物件的屬性（這裡是個函式）。
            </Callout>
          </ProblemCard>

          <ProblemCard
            num="#2665"
            title="Counter II"
            tag="變數遮蔽"
            tagColor="bg-red-100 text-red-700"
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              這題要實作有 <code className="font-mono">increment</code>、<code className="font-mono">decrement</code>、<code className="font-mono">reset</code> 三個方法的計數器。
              我在這題犯了一個經典的<strong>變數遮蔽（variable shadowing）</strong>錯誤。
            </p>
            <CodeBlock
              title="#2665 solution"
              code={`// ✅ 正確寫法
var createCounter = function(init) {
  let value = init;  // 外層變數

  return {
    increment: () => ++value,
    decrement: () => --value,
    reset: () => {
      value = init;  // 重置回初始值
      return value;
    },
  };
};

// ❌ 我犯的錯誤：
// increment: (value) => { ... }
// 參數名稱 'value' 遮蔽了外層的 let value
// 內部對 value 的修改不會影響閉包裡的那個 value！`}
            />
            <Callout type="error">
              <strong>變數遮蔽（Variable Shadowing）</strong>：當內層作用域宣告了和外層<em>同名</em>的變數（或參數），
              外層變數就被「遮住」了。在這個作用域內，你操作的是內層那個，和外層完全無關。
              這是閉包相關 Bug 中最常見的一種。
            </Callout>
          </ProblemCard>

          <ProblemCard
            num="#2634"
            title="Filter Elements from Array"
            tag="Truthy/Falsy + 陣列操作"
            tagColor="bg-blue-100 text-blue-700"
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              不能用原生 <code className="font-mono">.filter()</code>，要自己從零實作。
              我在這題犯了一個傻錯：把 <code className="font-mono">fn</code> 的回傳值（boolean）直接賦值給 <code className="font-mono">newArray</code>，
              把陣列蓋掉了。
            </p>
            <CodeBlock
              title="#2634 solution"
              code={`// ✅ 正確寫法
var filter = function(arr, fn) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {      // fn 回傳 truthy 才放入
      newArray.push(arr[i]);  // 放入的是 arr[i]，不是 fn 的回傳值
    }
  }
  return newArray;
};

// ❌ 我的錯誤寫法：
// newArray = fn(arr[i], i);   ← 把整個 newArray 蓋掉成 boolean！`}
            />
          </ProblemCard>

          <ProblemCard
            num="#2629"
            title="Function Composition"
            tag="reduceRight + 高階函式"
            tagColor="bg-amber-100 text-amber-700"
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              最難的一題。除了 <code className="font-mono">reduceRight</code> 的方向要搞清楚，
              我還犯了一個打字錯誤：<code className="font-mono">function[i]</code>（把陣列名稱打成了關鍵字 <code className="font-mono">function</code>）。
            </p>
            <CodeBlock
              title="#2629 solution"
              code={`var compose = function(functions) {
  if (functions.length === 0) return (x) => x;

  return function(x) {
    return functions.reduceRight(function(acc, fn) {
      return fn(acc);  // ← fn，不是 function（關鍵字）
    }, x);
  };
};

// reduceRight 執行順序示意：
// functions = [f, g, h], x = 5
// 第1步：h(5)  → result1
// 第2步：g(result1) → result2
// 第3步：f(result2) → 最終結果`}
            />
            <Callout type="warn">
              <strong>拼字陷阱</strong>：<code className="font-mono">function</code> 是 JS 的保留關鍵字，
              如果你把變數名取成 <code className="font-mono">function</code> 會直接語法錯誤。
              正確做法是用不衝突的名稱，例如 <code className="font-mono">fn</code>、<code className="font-mono">func</code>、<code className="font-mono">cb</code>（callback 縮寫）。
            </Callout>
          </ProblemCard>
        </section>

        <Divider />

        {/* Section 4 — 避坑指南 */}
        <section className="space-y-8">
          <SectionTitle icon={<AlertTriangle size={18} />}>四、容易錯誤點與避坑指南</SectionTitle>

          <p className="text-gray-700 leading-relaxed">
            整理這批題目中反覆出現的坑，每個都附上錯誤寫法 vs 正確寫法的對比。
          </p>

          {/* Pit 1 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">坑 #1</Chip>
                <h4 className="font-black text-gray-800">n++ 後置遞增的回傳值</h4>
              </div>
              <MistakeRow
                bad={`// 想要「第一次回傳 init，之後每次加 1」
return {
  count: () => {
    n++;       // 先加 1
    return n;  // 回傳已經加過的 n → 第一次回傳 init+1，答案錯了
  }
}`}
                good={`// 正確：後置遞增 n++
return {
  count: () => {
    return n++;
    // 等同於：先儲存舊值，回傳舊值，然後 n+1
    // 第一次呼叫：回傳 init，n 變成 init+1
  }
}`}
                note="n++ 是「先回傳，再遞增」；++n 是「先遞增，再回傳」。Counter 題目要求第一次回傳初始值，所以必須用 n++。"
              />
            </CardBody>
          </Card>

          {/* Pit 2 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">坑 #2</Chip>
                <h4 className="font-black text-gray-800">物件方法參數名稱遮蔽閉包變數</h4>
              </div>
              <MistakeRow
                bad={`var createCounter = function(init) {
  let value = init;

  return {
    // ❌ 參數名叫 value，遮蔽了外層 let value
    increment: (value) => {
      return ++value;  // 修改的是參數 value，不是閉包裡的 value
    },
  };
};`}
                good={`var createCounter = function(init) {
  let value = init;

  return {
    // ✅ 不需要任何參數，直接讀取閉包的 value
    increment: () => ++value,
  };
};`}
                note="方法不應該接受和閉包變數同名的參數。命名衝突時，內層的參數會遮蔽（shadow）外層的變數，讓閉包失效。"
              />
            </CardBody>
          </Card>

          {/* Pit 3 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">坑 #3</Chip>
                <h4 className="font-black text-gray-800">filter 回傳 fn 的結果而非元素本身</h4>
              </div>
              <MistakeRow
                bad={`for (let i = 0; i < arr.length; i++) {
  // ❌ fn() 回傳的是 true/false，不是元素
  newArray.push(fn(arr[i], i));
}`}
                good={`for (let i = 0; i < arr.length; i++) {
  // ✅ fn() 只用來判斷，push 的是 arr[i]
  if (fn(arr[i], i)) {
    newArray.push(arr[i]);
  }
}`}
                note="filter 的語義是「保留元素」，fn 只是「判斷是否保留」的謂詞（predicate）函式。push 的一定是原始元素 arr[i]，不是 fn 的回傳值。"
              />
            </CardBody>
          </Card>

          {/* Pit 4 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">坑 #4</Chip>
                <h4 className="font-black text-gray-800">== vs === 的嚴格性</h4>
              </div>
              <MistakeRow
                bad={`// ❌ == 會做型別轉換，結果出乎意料
5 == "5"    // true ← 字串被轉成數字
0 == false  // true ← false 被轉成 0
null == 0   // false ← 不一致的行為`}
                good={`// ✅ === 嚴格比較，不做型別轉換
5 === "5"   // false ← 型別不同，直接 false
0 === false // false ← 型別不同，直接 false
null === undefined // false ← 就是不一樣`}
                note="JavaScript 預設應該始終用 ===（三個等號）。== 的型別轉換規則極其複雜且容易出錯。只有在刻意要利用寬鬆比較（例如 null == undefined）時才考慮 ==。"
              />
            </CardBody>
          </Card>

          {/* Pit 5 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">坑 #5</Chip>
                <h4 className="font-black text-gray-800">function 是關鍵字，不能當變數名</h4>
              </div>
              <MistakeRow
                bad={`// ❌ function 是保留字，這行直接語法錯誤
functions.reduceRight((acc, function) => {
  return function(acc);
}, x);`}
                good={`// ✅ 用 fn 或 func 等非保留字
functions.reduceRight((acc, fn) => {
  return fn(acc);
}, x);`}
                note="JS 的保留關鍵字（function、return、class、const、let 等）不能用作變數名或參數名。一般慣例用 fn 代表「某個函式參數」，cb 代表 callback。"
              />
            </CardBody>
          </Card>

          {/* 總結表 */}
          <Card className="shadow-sm border border-amber-100 bg-amber-50/30">
            <CardBody className="p-6">
              <p className="text-sm font-black text-amber-700 uppercase tracking-widest mb-4">快速複習：本次學到的 JS 特性一覽</p>
              <div className="space-y-3">
                {[
                  { concept: 'n++', rule: '後置遞增，先回傳舊值，再加 1', level: '基礎' },
                  { concept: '閉包（Closure）', rule: '內層函式記住外層變數的「引用」，不是快照', level: '核心' },
                  { concept: '變數遮蔽', rule: '內層同名變數/參數會遮蔽外層，閉包操作的是那個被遮住的', level: '陷阱' },
                  { concept: 'Truthy/Falsy', rule: 'Falsy 只有 6 個：false、0、""、null、undefined、NaN', level: '核心' },
                  { concept: 'throw vs return', rule: 'throw 拋出例外中斷執行，return 正常回傳值', level: '基礎' },
                  { concept: '=== vs ==', rule: '永遠用 ===，== 有型別轉換容易出 bug', level: '習慣' },
                  { concept: '...args（rest 參數）', rule: '收集所有參數成真陣列，可以用所有陣列方法', level: '現代語法' },
                  { concept: 'reduceRight', rule: '從陣列末端往前累積，函式組合（compose）的標準工具', level: '進階' },
                  { concept: '高階函式', rule: '接收函式或回傳函式的函式，JS 的核心抽象機制', level: '核心' },
                ].map((r) => (
                  <div key={r.concept} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3">
                    <code className="font-mono text-sm font-black text-amber-700 w-36 shrink-0 mt-0.5">{r.concept}</code>
                    <p className="text-sm text-gray-600 flex-1 leading-relaxed">{r.rule}</p>
                    <Chip size="sm" variant="flat" color="warning" className="text-[10px] shrink-0">{r.level}</Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* Closing */}
        <section className="space-y-5">
          <SectionTitle icon={<Target size={18} />}>學習心得</SectionTitle>
          <Card className="shadow-sm border border-gray-100 bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardBody className="p-8 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                30 Days of JavaScript 的前幾題看起來很簡單，但每一題都藏著一個 JS 的核心觀念。
                我犯的每一個錯誤——<em>n++ 回傳值搞混、變數遮蔽、filter push 錯對象、function 關鍵字打字錯誤</em>——
                在真實的前端專案中都會出現，只是那時候可能更難找到。
              </p>
              <p className="text-gray-700 leading-relaxed">
                這份復盤的意義不只是記錄錯誤，而是幫助未來的自己在看到類似程式碼時，
                能夠第一眼就認出潛在的問題點。
                刷題的價值，在於把這些直覺刻進肌肉記憶裡。
              </p>
              <Callout type="tip">
                <strong>下一步建議</strong>：繼續完成 LeetCode 30 Days of JavaScript 的後半段，
                重點放在 <code className="font-mono">Promise</code>、<code className="font-mono">async/await</code>、
                <code className="font-mono">Event Loop</code>，這三個主題在非同步 JS 開發中至關重要。
              </Callout>
            </CardBody>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-4">
          <Link href="/blog">
            <Button variant="flat" startContent={<ArrowLeft size={16} />} className="font-bold text-gray-600 hover:text-gray-900">
              所有文章
            </Button>
          </Link>
          <p className="text-xs text-gray-400 font-medium">JavaScript Deep Dive Series</p>
        </div>
      </article>
    </div>
  );
}
