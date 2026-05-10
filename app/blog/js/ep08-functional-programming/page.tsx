'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Zap,
  Shield,
  Layers,
  GitBranch,
  RefreshCw,
  Box,
  CheckCircle,
  AlertTriangle,
  Code2,
  Cpu,
  FlaskConical,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function JSEP08() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-yellow-600 via-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.08</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">JavaScript 系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Functional Programming in JavaScript：<br />
              <span className="text-yellow-200">不可變資料與純函數</span>
            </h1>
            <p className="text-amber-100 text-lg mb-8 max-w-2xl">
              Immutability、Pure Functions、Compose、Functor、Maybe Monad — 讓你的程式碼更可預測、更好測試
            </p>
            <div className="flex items-center gap-6 text-yellow-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> FP · Pure Functions · Immutability · Monad</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：FP 不是什麼神祕的東西 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-yellow-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 1：FP 不是什麼神祕的東西</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            「函數式程式設計（Functional Programming，FP）」聽起來很學術，但它的核心哲學其實非常直白：
            <strong>「用函數的組合來描述程式要做什麼，而不是一步步告訴電腦怎麼做」</strong>。
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            你不需要去讀 Haskell 或 Erlang 才能理解 FP。JavaScript 本身就是一門多範式語言，
            你早就在不知不覺中使用 FP 的概念了——<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.map()</code>、
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.filter()</code>、
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.reduce()</code> 都是 FP 的體現。
          </p>

          <Card className="border border-amber-200 bg-amber-50 mb-6">
            <CardBody className="p-5">
              <p className="text-amber-800 text-base font-medium italic leading-relaxed">
                「OOP（物件導向）把程式看成一群互相傳遞訊息的物件；FP 把程式看成一系列資料的轉換管道。
                兩者都是工具，選哪個取決於你在解決什麼問題。」
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800 mb-4">命令式 vs 函數式：同一個需求，兩種思維</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            假設任務是：從一個數字陣列中取出偶數，並乘以 2。
          </p>

          <CodeBlock language="javascript">{`// 命令式（Imperative）：告訴電腦「怎麼做」
// 思維：我需要一個空陣列 → 遍歷每個元素 → 判斷是否符合 → 加入陣列
const numbers = [1, 2, 3, 4, 5];
const evens = [];
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evens.push(numbers[i] * 2);
  }
}
// evens = [4, 8]

// 函數式（Functional）：告訴電腦「要什麼」
// 思維：從數字中篩出偶數，然後把每個數乘以 2
const evens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
// evens = [4, 8]`}</CodeBlock>

          <p className="text-gray-700 leading-relaxed mb-6 mt-4">
            函數式版本更短、更易讀，而且每一步的意圖都清晰：
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">filter</code> 負責篩選，
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">map</code> 負責轉換。
            你不需要追蹤 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">i</code> 這個變數的狀態。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">FP 的三大核心原則</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border border-yellow-200 bg-yellow-50">
              <CardBody className="p-4">
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-yellow-800 mb-1">1. 純函數</p>
                    <p className="text-yellow-700 text-sm">相同輸入，永遠相同輸出，沒有副作用</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border border-amber-200 bg-amber-50">
              <CardBody className="p-4">
                <div className="flex items-start gap-3">
                  <Box size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-amber-800 mb-1">2. 不可變性</p>
                    <p className="text-amber-700 text-sm">不修改資料，而是產生新資料</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border border-orange-200 bg-orange-50">
              <CardBody className="p-4">
                <div className="flex items-start gap-3">
                  <Layers size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-orange-800 mb-1">3. 函數組合</p>
                    <p className="text-orange-700 text-sm">用小函數組合成大函數</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <p className="text-gray-700 leading-relaxed">
            這三個原則環環相扣：因為函數是純的，你才能放心組合它們；因為資料是不可變的，
            你才能確保組合後的行為是可預測的。接下來我們一個一個深入拆解。
          </p>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：純函數 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 2：純函數 — FP 的基礎</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            純函數（Pure Function）的定義只有兩條規則：
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>相同輸入，永遠回傳相同輸出</strong>（Deterministic）</li>
            <li><strong>沒有副作用</strong>：不修改外部變數、不發 API、不寫 log、不修改 DOM</li>
          </ul>

          <CodeBlock language="javascript">{`// ❌ 不純函數：有副作用——修改了外部變數
let total = 0;
function addToTotal(amount) {
  total += amount; // 修改了外部狀態！
  return total;
}
// addToTotal(5) 第一次回傳 5
// addToTotal(5) 第二次回傳 10（相同輸入，不同輸出）

// ❌ 不純函數：依賴外部狀態
function getDiscount(price) {
  return price * discountRate; // discountRate 可能隨時改變！
}

// ✅ 純函數：只依賴參數，不修改任何外部狀態
function add(a, b) {
  return a + b;
}
// add(3, 5) 永遠回傳 8，不論何時呼叫

// ✅ 純函數：顯式傳入所有依賴
function getDiscount(price, discountRate) {
  return price * discountRate;
}

// 純函數的四大好處：
// 1. 容易測試（不需要 mock 外部狀態，不需要 setup）
// 2. 容易快取（memoize），因為相同輸入永遠相同輸出
// 3. 並行安全（沒有競態條件，多個執行緒可以同時跑）
// 4. 容易組合（可以安全地把多個純函數串接）

// ─── 純函數 memoize 範例 ───
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  // 假設這是需要大量運算的費時計算
  console.log('Computing...');
  return n * n + n;
});

expensiveCalc(10); // Computing... → 110
expensiveCalc(10); // Cache hit!   → 110（直接從快取拿）
expensiveCalc(20); // Computing... → 420`}</CodeBlock>

          <p className="text-gray-700 leading-relaxed mt-4 mb-6">
            Memoize 能運作的前提就是「純函數」。如果函數有副作用或依賴外部狀態，
            快取的結果可能是過時的，memoize 就失去意義了。這是純函數帶來的直接好處。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">React Component 就是純函數！</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            React 的設計哲學本身就建立在純函數之上。一個理想的 React component 就是：
            <strong>props → JSX</strong>，相同的 props 永遠渲染出相同的結果。
          </p>

          <CodeBlock language="tsx">{`// ❌ 不純的 component（每次渲染結果不同，即使 props 完全相同）
function TimeDisplay() {
  // new Date() 是副作用！每次呼叫結果都不同
  return <div>{new Date().toLocaleString()}</div>;
}

// ❌ 不純的 component（依賴外部的全域變數）
function UserGreeting() {
  return <div>Hello, {window.currentUser.name}</div>;
}

// ✅ 把「不純」推到邊界，component 本身保持純函數
function TimeDisplay({ currentTime }: { currentTime: Date }) {
  return <div>{currentTime.toLocaleString()}</div>; // 純函數！
}

// ✅ 顯式地透過 props 傳入所有依賴
function UserGreeting({ userName }: { userName: string }) {
  return <div>Hello, {userName}</div>; // 純函數！
}

// React 18 的 Strict Mode 就是在利用純函數特性：
// 它會在開發模式下故意把 useEffect 執行兩次，
// 讓你發現那些「你以為只執行一次」的副作用。
// 如果你的 component 是純的，雙重執行不會造成問題。`}</CodeBlock>

          <Card className="border border-green-200 bg-green-50 mt-6">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>重點：</strong>副作用不是壞事，程式本來就需要副作用（否則什麼都做不了）。
                  FP 的原則不是「消滅」副作用，而是把副作用「推到系統邊界」，讓核心邏輯保持純函數、可測試。
                  React 中，副作用被集中在 <code className="bg-green-100 px-1 rounded">useEffect</code> 中處理，就是這個原則的體現。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：不可變性 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Box size={20} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 3：不可變性（Immutability）</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            為什麼要不可變？想像你有一個 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">user</code> 物件，
            同時被 10 個函數使用。如果其中一個函數偷偷修改了它，其他 9 個函數的行為就可能變得不可預測——
            這就是 <strong>共享可變狀態（Shared Mutable State）</strong>帶來的噩夢。
          </p>

          <CodeBlock language="javascript">{`// ❌ 可變（Mutable）- 難以追蹤是誰改了資料
const user = { name: 'Joseph', age: 28, role: 'admin' };

function updateAge(user, newAge) {
  user.age = newAge; // 直接修改了原始物件！
  return user;       // 回傳的是同一個物件的參考
}

const updated = updateAge(user, 29);
console.log(user === updated); // true（同一個物件）
console.log(user.age);         // 29（原始物件被改了！）

// ✅ 不可變（Immutable）- 每次都回傳新物件
function updateAge(user, newAge) {
  return { ...user, age: newAge }; // Spread 產生全新的物件
}

const updated = updateAge(user, 29);
console.log(user === updated); // false（不同物件）
console.log(user.age);         // 28（原始物件不受影響）
console.log(updated.age);      // 29

// ─── 深層不可變：陣列中的物件 ───
const state = {
  users: [
    { id: 1, name: 'Joseph', scores: [85, 90, 78] }
  ]
};

// ❌ 直接修改深層資料（mutation）
state.users[0].scores.push(95); // 直接改了原始陣列！

// ✅ 不可變的方式更新深層資料
const newState = {
  ...state,
  users: state.users.map(user =>
    user.id === 1
      ? { ...user, scores: [...user.scores, 95] }
      : user
  ),
};

// 驗證不可變性
console.log(state.users[0].scores);    // [85, 90, 78]（原始未變）
console.log(newState.users[0].scores); // [85, 90, 78, 95]（新物件）
console.log(state === newState);       // false
console.log(state.users[0] === newState.users[0]); // false`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-8">Immer — 讓不可變更直觀</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            深層不可變更新的程式碼（多層 spread）寫起來很冗長、容易出錯。
            <strong>Immer</strong> 讓你用「看起來像在直接修改」的語法，底層卻保證完全不可變。
            Redux Toolkit 內部也是用 Immer 的。
          </p>

          <CodeBlock language="typescript">{`import { produce } from 'immer';

const state = {
  users: [
    { id: 1, name: 'Joseph', scores: [85, 90, 78] }
  ],
  settings: { theme: 'dark', language: 'zh-TW' },
};

// Immer 的 produce：看起來像 mutation，實際上是 immutable
const newState = produce(state, (draft) => {
  // draft 是 state 的 Proxy，你對 draft 做的任何修改
  // Immer 都會在背後建立新物件，不影響原始 state

  const user = draft.users.find(u => u.id === 1);
  if (user) {
    user.scores.push(95);         // 看起來像直接修改，但 Immer 保護了原始資料
    user.name = 'Joseph Chen';    // 同樣安全
  }

  draft.settings.theme = 'light'; // 也可以同時修改其他部分
});

// 驗證：
console.log(state === newState);              // false（不同物件）
console.log(state.users[0] === newState.users[0]); // false（有修改的部分產生新物件）
console.log(state.settings === newState.settings); // false（有修改的部分產生新物件）
console.log(state.users[0].scores);          // [85, 90, 78]（原始資料未改）
console.log(newState.users[0].scores);       // [85, 90, 78, 95]

// Immer 的結構共享（Structural Sharing）：
// 沒有被修改的部分，Immer 會重用原始物件的參考
// 這讓 React 的 shouldComponentUpdate / memo 能正確偵測到哪些部分改變了`}</CodeBlock>

          <Card className="border border-blue-200 bg-blue-50 mt-6">
            <CardBody className="p-5">
              <p className="text-blue-800 text-sm leading-relaxed">
                <strong>為什麼 React 的 setState 要用不可變的方式更新？</strong> 因為 React 用
                <code className="bg-blue-100 px-1 rounded mx-1">Object.is()</code>（淺比較）來判斷狀態是否改變。
                如果你直接修改物件（mutation），React 看到的是同一個參考，會認為狀態沒有改變，不觸發重新渲染。
                這是 React 最常見的 bug 來源之一。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：高階函數 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <GitBranch size={20} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 4：高階函數 — 函數當參數</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>高階函數（Higher-Order Function，HOF）</strong>：接受函數作為參數，
            或回傳一個函數的函數。這是 FP 最重要的特性，讓函數可以被組合和複用。
          </p>

          <CodeBlock language="javascript">{`// ── 1. map：轉換每個元素 ──
const prices = [100, 200, 300];
const withTax = prices.map(price => price * 1.1);
// [110, 220, 330]

// ── 2. filter：篩選元素 ──
const products = [
  { name: 'T-Shirt', price: 50,  inStock: true  },
  { name: 'Jacket',  price: 150, inStock: false },
  { name: 'Cap',     price: 80,  inStock: true  },
  { name: 'Shorts',  price: 40,  inStock: true  },
];

const availableUnder100 = products
  .filter(p => p.inStock)   // 先篩出有庫存的
  .filter(p => p.price < 100); // 再篩出價格低於 100 的
// [{ name: 'T-Shirt', ... }, { name: 'Cap', ... }, { name: 'Shorts', ... }]

// ── 3. reduce：聚合所有元素 ──
const total = prices.reduce((acc, price) => acc + price, 0); // 600

// 用 reduce 建立 Map（id → user）
const users = [
  { id: 1, name: 'Joseph' },
  { id: 2, name: 'Alice' },
];
const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
// { 1: { id: 1, name: 'Joseph' }, 2: { id: 2, name: 'Alice' } }

// ── 4. 自己實作高階函數 ──
function repeat(n, fn) {
  return Array.from({ length: n }, (_, i) => fn(i));
}
repeat(5, i => i * i); // [0, 1, 4, 9, 16]

// ── 5. Currying（柯里化）──
// 把多參數函數拆成多個單參數函數，讓函數可以「部分應用」
const add = (a) => (b) => a + b;

// 建立「偏函數（Partial Application）」：固定部分參數
const add5  = add(5);  // 等於一個「把輸入 +5」的函數
const add10 = add(10);

add5(3);   // 8
add5(10);  // 15
add10(7);  // 17

// 更實用的 curry 工具函數（支援任意參數數量）
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      // 參數夠了，直接執行
      return fn.apply(this, args);
    }
    // 參數不夠，回傳一個等待更多參數的函數
    return function(...more) {
      return curried.apply(this, args.concat(more));
    };
  };
}

const multiply = curry((a, b, c) => a * b * c);

const double       = multiply(2);      // 等待 b 和 c
const double3Times = multiply(2)(3);   // 等待 c

double(5)(4);    // 40   （2 × 5 × 4）
double3Times(5); // 30   （2 × 3 × 5）
multiply(2, 3, 5); // 30 （一次傳所有參數也可以）

// Currying 的實際應用：從通用函數建立特化版本
const formatDate = curry((locale, format, date) =>
  new Intl.DateTimeFormat(locale, format).format(date)
);

const formatTW     = formatDate('zh-TW');
const formatTWFull = formatTW({ dateStyle: 'full' });
formatTWFull(new Date()); // "2026年5月8日 星期五"`}</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：函數組合 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-orange-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 5：函數組合（Function Composition）</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            函數組合是 FP 的精髓：把多個小函數串接成一個大函數。
            就像數學中的 f(g(x))，每個函數的輸出是下一個函數的輸入。
          </p>

          <Card className="border border-orange-200 bg-orange-50 mb-6">
            <CardBody className="p-5">
              <p className="text-orange-800 text-sm leading-relaxed">
                <strong>compose vs pipe 的差異：</strong>
                <code className="bg-orange-100 px-1 rounded mx-1">compose</code> 從右到左執行（數學慣例：f∘g∘h = f(g(h(x)))），
                <code className="bg-orange-100 px-1 rounded mx-1">pipe</code> 從左到右執行（符合人類閱讀順序）。
                實際工作中 <code className="bg-orange-100 px-1 rounded mx-1">pipe</code> 更常用，因為執行順序和程式碼書寫順序一致。
              </p>
            </CardBody>
          </Card>

          <CodeBlock language="javascript">{`// ── compose 與 pipe 的實作 ──

// compose：右到左（數學慣例）
// compose(f, g, h)(x) 等於 f(g(h(x)))
const compose = (...fns) => (value) =>
  fns.reduceRight((acc, fn) => fn(acc), value);

// pipe：左到右（更直觀）
// pipe(f, g, h)(x) 等於 h(g(f(x)))
const pipe = (...fns) => (value) =>
  fns.reduce((acc, fn) => fn(acc), value);

// ── 單一功能的小函數 ──
const trim      = (str) => str.trim();
const lowercase = (str) => str.toLowerCase();
const removeSpaces = (str) => str.replace(/\s+/g, '-');
const addSlash  = (str) => '/' + str;

// 用 pipe 組合成「字串轉 URL slug」
const toSlug = pipe(trim, lowercase, removeSpaces, addSlash);

toSlug('  Hello World  ');   // "/hello-world"
toSlug('  FP in JS  ');      // "/fp-in-js"

// ── 實際範例：格式化價格 ──
const formatPrice = pipe(
  (price) => parseFloat(price),                     // "100.506" → 100.506
  (price) => Math.round(price * 100) / 100,         // → 100.51
  (price) => price.toFixed(2),                      // → "100.51"
  (price) => \`NT$ \${price}\`                         // → "NT$ 100.51"
);

formatPrice("100.506"); // "NT$ 100.51"
formatPrice("50");      // "NT$ 50.00"

// ── 帶有 currying 的函數組合：真正的威力 ──
const clamp = curry((min, max, value) => Math.min(Math.max(value, min), max));
const round = curry((precision, value) => +value.toFixed(precision));
const multiply_c = curry((factor, value) => value * factor);

// 建立一個「計算含稅後的最終售價（最大 9999 元，取整數）」的函數
const finalPrice = pipe(
  multiply_c(1.05),          // 加 5% 稅
  round(0),                  // 四捨五入
  clamp(0, 9999),            // 限制在 0~9999 之間
);

finalPrice(100);    // 105
finalPrice(10000);  // 9999（上限截斷）
finalPrice(-50);    // 0  （下限截斷）

// ── React 中的 compose 思維：HOC 組合 ──
const withAuth = (Component) => (props) =>
  isAuthenticated
    ? <Component {...props} />
    : <Redirect to="/login" />;

const withLogging = (Component) => (props) => {
  useEffect(() => {
    console.log(\`Rendered: \${Component.displayName ?? Component.name}\`);
  });
  return <Component {...props} />;
};

const withErrorBoundary = (Component) => (props) => (
  <ErrorBoundary fallback={<ErrorPage />}>
    <Component {...props} />
  </ErrorBoundary>
);

// 一次組合三個 HOC：
const EnhancedDashboard = compose(
  withAuth,
  withLogging,
  withErrorBoundary
)(Dashboard);`}</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：Maybe Monad ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <FlaskConical size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 6：Maybe Monad — 優雅處理 null/undefined</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Monad 是 FP 中最讓人望而生畏的概念，但它的核心思想其實很簡單：
            <strong>「把一個值包進容器，讓你可以鏈式地對它做操作，而不用每一步都手動處理邊界情況」</strong>。
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            最實用的 Monad 是 <strong>Maybe</strong>，專門用來優雅地處理可能為 null 或 undefined 的值，
            避免一層一層的 null check。
          </p>

          <CodeBlock language="typescript">{`// ── 問題：深層取值的 null 地獄 ──
function getUserCity(data: any) {
  if (data && data.user && data.user.address && data.user.address.city) {
    return data.user.address.city;
  }
  return null;
}

// 現代 JavaScript 解法：Optional Chaining（最推薦）
const city = data?.user?.address?.city ?? 'Unknown';

// ── FP 解法：Maybe Monad（學習用途，理解概念很重要）──
class Maybe<T> {
  private constructor(private readonly value: T | null | undefined) {}

  // 建立 Maybe：包裝一個可能是 null 的值
  static of<T>(value: T | null | undefined): Maybe<T> {
    return new Maybe(value);
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>(null);
  }

  isNothing(): boolean {
    return this.value === null || this.value === undefined;
  }

  // map：如果有值，就轉換它；如果是 null，就跳過
  map<U>(fn: (value: T) => U | null | undefined): Maybe<U> {
    if (this.isNothing()) return Maybe.nothing<U>();
    return Maybe.of(fn(this.value as T));
  }

  // 提取值，如果是 Nothing 就回傳預設值
  getOrElse(defaultValue: T): T {
    return this.isNothing() ? defaultValue : (this.value as T);
  }

  // 用於 debug
  toString(): string {
    return this.isNothing() ? 'Nothing' : \`Just(\${this.value})\`;
  }
}

// 使用 Maybe 安全地深層取值
const data = {
  user: {
    address: { city: 'Kaohsiung', zip: '800' }
  }
};

const city = Maybe.of(data)
  .map(d => d.user)
  .map(u => u.address)
  .map(a => a.city)
  .getOrElse('Unknown');

console.log(city); // "Kaohsiung"

// 如果中途任何一層是 null，安全地回傳預設值
const cityOfMissingUser = Maybe.of(null as any)
  .map(d => d.user)       // null → 直接跳過，不會 throw
  .map(u => u.address)    // null → 直接跳過
  .map(a => a.city)       // null → 直接跳過
  .getOrElse('Unknown');

console.log(cityOfMissingUser); // "Unknown"（沒有 TypeError）

// ── Either Monad：更實用的錯誤處理 ──
// Either 表示「成功或失敗」，是比 try/catch 更函數式的錯誤處理方式
type Either<L, R> = { tag: 'Left'; value: L } | { tag: 'Right'; value: R };

const Left  = <L, R>(value: L): Either<L, R> => ({ tag: 'Left',  value });
const Right = <L, R>(value: R): Either<L, R> => ({ tag: 'Right', value });

function parseJSON(str: string): Either<string, unknown> {
  try {
    return Right(JSON.parse(str));
  } catch (e) {
    return Left(\`Parse error: \${e instanceof Error ? e.message : String(e)}\`);
  }
}

function validateUser(data: unknown): Either<string, { name: string; age: number }> {
  if (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'age' in data
  ) {
    return Right(data as { name: string; age: number });
  }
  return Left('Invalid user format');
}

// 鏈式使用 Either
const input = '{"name": "Joseph", "age": 28}';
const result = parseJSON(input);

if (result.tag === 'Right') {
  const userResult = validateUser(result.value);
  if (userResult.tag === 'Right') {
    console.log(\`Welcome, \${userResult.value.name}!\`); // "Welcome, Joseph!"
  } else {
    console.error(userResult.value);
  }
} else {
  console.error(result.value);
}`}</CodeBlock>

          <Card className="border border-indigo-200 bg-indigo-50 mt-6">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                <p className="text-indigo-800 text-sm leading-relaxed">
                  <strong>實務建議：</strong>在現代 JavaScript 中，Optional Chaining（<code className="bg-indigo-100 px-1 rounded">?.</code>）
                  已經解決了大部分 Maybe Monad 的使用場景。學習 Maybe/Either 的主要價值在於
                  理解「把副作用和錯誤包進容器、讓程式碼保持可組合」的思想，
                  這個概念在 RxJS 的 Observable、Promise 的鏈式呼叫中都有體現。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 7：FP 在 React 生態系的實際應用 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <Cpu size={20} className="text-rose-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 7：FP 在 React 生態系的實際應用</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            FP 不是紙上談兵的學術概念。React 的整個設計哲學就建立在函數式程式設計之上：
            Components 是純函數、Hooks 是高階函數、State 更新必須不可變。
            讓我們看看幾個真實場景。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">a. 資料轉換管道</h3>

          <CodeBlock language="tsx">{`// 使用 pipe 思維串接資料轉換
interface User {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: string;
}

const UserList = ({ users }: { users: User[] }) => {
  // 資料轉換管道：filter → sort → map（每一步都是純函數）
  const displayUsers = users
    .filter(u => u.isActive)
    .filter(u => u.role !== 'banned')
    .sort((a, b) => a.firstName.localeCompare(b.firstName))
    .map(u => ({
      ...u,
      displayName: \`\${u.firstName} \${u.lastName}\`,
      initials: \`\${u.firstName[0]}\${u.lastName[0]}\`.toUpperCase(),
    }));

  return (
    <ul>
      {displayUsers.map(u => (
        <UserItem key={u.id} user={u} />
      ))}
    </ul>
  );
};`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-8">b. useReducer 就是純函數</h3>

          <CodeBlock language="tsx">{`// useReducer 的 reducer 本身就是一個純函數！
// 簽章：(state, action) => newState
// 完全符合 FP 的「相同輸入，相同輸出，沒有副作用」

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET'; payload: number }
  | { type: 'SET_STEP'; payload: number };

interface CounterState {
  count: number;
  step: number;
}

// 純函數：不修改 state，回傳新物件
function counterReducer(state: CounterState, action: Action): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'RESET':
      return { ...state, count: action.payload };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

// 因為 reducer 是純函數，測試超簡單：
// test('INCREMENT', () => {
//   const state = { count: 0, step: 1 };
//   const next  = counterReducer(state, { type: 'INCREMENT' });
//   expect(next.count).toBe(1);
//   expect(state.count).toBe(0); // 原始 state 未改變
// });`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-8">c. 自定義 Hook 的函數組合</h3>

          <CodeBlock language="tsx">{`// 把多個小 Hook 組合成一個大 Hook，就是 FP 的函數組合概念
function useUser(userId: string) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  return user;
}

function usePermissions(role: string | undefined) {
  return useMemo(() => {
    if (!role) return { canEdit: false, canDelete: false, canAdmin: false };
    return {
      canEdit:   ['editor', 'admin'].includes(role),
      canDelete: ['admin'].includes(role),
      canAdmin:  role === 'admin',
    };
  }, [role]);
}

function usePreferences(userId: string) {
  const [prefs, setPrefs] = useState({ theme: 'light', language: 'zh-TW' });
  useEffect(() => {
    fetchPreferences(userId).then(setPrefs);
  }, [userId]);
  return prefs;
}

// 組合成更高層的 Hook（函數組合！）
function useUserData(userId: string) {
  const user        = useUser(userId);
  const permissions = usePermissions(user?.role);
  const preferences = usePreferences(userId);

  return { user, permissions, preferences };
}

// 使用時只需要：
function Dashboard({ userId }: { userId: string }) {
  const { user, permissions, preferences } = useUserData(userId);
  // ...
}`}</CodeBlock>

          <Card className="border border-rose-200 bg-rose-50 mt-6">
            <CardBody className="p-5">
              <p className="text-rose-800 text-sm leading-relaxed">
                <strong>總結：</strong>FP 不需要你放棄 OOP，也不需要你完全重寫現有的程式碼。
                它更像是一種思維方式：優先使用純函數、避免共享可變狀態、用小函數組合成大函數。
                從今天起，當你寫 <code className="bg-rose-100 px-1 rounded">.map().filter().reduce()</code>、
                用 Immer 更新 state、寫 useReducer 的 reducer 時，你都已經在實踐 FP 了。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {[
            'Functional Programming',
            'Pure Functions',
            'Immutability',
            'Currying',
            'Function Composition',
            'Maybe Monad',
            'Higher-Order Functions',
            'React Hooks',
          ].map(tag => (
            <Chip key={tag} variant="flat" className="bg-amber-100 text-amber-800">
              {tag}
            </Chip>
          ))}
        </motion.section>

        {/* ── Navigation ── */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="flex justify-between items-center pt-4"
        >
          <Link
            href="/blog/js/ep07-design-patterns"
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>← EP.07 設計模式</span>
          </Link>
          <Link
            href="/blog/js/30days-learning-review"
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-semibold transition-colors group"
          >
            <span>JavaScript 30天回顧 →</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </article>
    </div>
  );
}
