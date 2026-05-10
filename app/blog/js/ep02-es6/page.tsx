'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Zap,
  Package,
  Layers,
  Code2,
  Link2,
  ShieldCheck,
  CheckCircle,
  User
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

/* ─── 小工具元件 ─────────────────────────────────── */

const SectionTitle = ({
  icon,
  num,
  children,
}: {
  icon: React.ReactNode;
  num: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-green-500 flex items-center justify-center text-white font-black text-sm shrink-0">
      {num}
    </div>
    <div className="p-2 rounded-xl bg-amber-100 text-amber-700">{icon}</div>
    <h2 className="text-2xl font-black text-gray-800">{children}</h2>
  </div>
);

const Callout = ({
  type,
  children,
}: {
  type: 'info' | 'warn' | 'tip' | 'react';
  children: React.ReactNode;
}) => {
  const styles = {
    info: 'bg-blue-50 border border-blue-100 text-blue-800',
    warn: 'bg-amber-50 border border-amber-100 text-amber-800',
    tip: 'bg-green-50 border border-green-100 text-green-800',
    react: 'bg-sky-50 border border-sky-100 text-sky-800',
  };
  const labels = { info: 'INFO', warn: 'NOTE', tip: 'TIP', react: 'REACT' };
  return (
    <div className={`rounded-2xl p-5 ${styles[type]}`}>
      <p className="text-[10px] font-black tracking-widest mb-1 opacity-60">{labels[type]}</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};

/* ─── 主頁面 ─────────────────────────────────────── */

export default function EP02ES6Page() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────── */}
      <div className="relative h-[56vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-500 via-yellow-400 to-green-500">
        {/* 浮動光暈 */}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 40%, rgba(255,255,255,0.2) 0%, transparent 55%), radial-gradient(circle at 80% 65%, rgba(34,197,94,0.25) 0%, transparent 55%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex justify-center gap-2 mb-5">
              <Chip
                size="sm"
                variant="flat"
                className="bg-white/20 text-white border-white/30 font-bold uppercase text-[10px]"
              >
                EP.02
              </Chip>
              <Chip
                size="sm"
                variant="flat"
                className="bg-white/20 text-white border-white/30 font-bold uppercase text-[10px]"
              >
                JavaScript 入門系列
              </Chip>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              六個 ES6+ 語法，<br />
              <span className="text-yellow-100">讓你看懂所有 React 程式碼</span>
            </h1>
            <p className="text-yellow-100/90 text-lg font-medium max-w-2xl mx-auto">
              箭頭函式、解構、展開、模板字串、import/export、選用鏈——<br className="hidden sm:block" />
              一次全學完，從此 React 程式碼不再有看不懂的語法
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── 文章主體 ─────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">

        {/* Author Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-green-500 flex items-center justify-center text-white font-black text-sm">
              J
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Joseph Chen</p>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Calendar size={12} />
                <span>2026</span>
                <span>·</span>
                <span>JavaScript 入門系列</span>
                <span>·</span>
                <Clock size={12} />
                <span>10 min read</span>
                <span>·</span>
                <Eye size={12} />
                <span>EP.02</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" variant="flat" color="warning">ES6+</Chip>
            <Chip size="sm" variant="flat" color="warning">JavaScript</Chip>
            <Chip size="sm" variant="flat" color="warning">React 前置知識</Chip>
          </div>
        </motion.div>

        <Divider />

        {/* ── Opening Quote ─────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card className="border border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm">
            <CardBody className="p-7">
              <div className="flex gap-4">
                <Quote size={28} className="text-amber-500 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p className="text-gray-700 text-base leading-relaxed italic">
                    「你學完基礎 JS，打開 React 程式碼，第一行就看到：
                    <code className="font-mono bg-amber-100 px-1.5 py-0.5 rounded text-amber-800 not-italic">
                      const [count, setCount] = useState(0)
                    </code>
                    —— 這個 <code className="font-mono not-italic">[count, setCount] =</code> 是什麼鬼語法？別緊張——這是 ES6 的解構賦值，這篇六個語法讀完你就全懂了。」
                  </p>
                  <p className="text-sm text-amber-600 font-bold">
                    — ES6 是 2015 年發布的 JavaScript 大改版，現代 React 程式碼全都是這個語法
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { num: '1', label: '箭頭函式', code: '() => {}' },
              { num: '2', label: '解構賦值', code: 'const { a } = obj' },
              { num: '3', label: '展開運算子', code: '[...arr]' },
              { num: '4', label: '模板字串', code: '`Hello ${name}`' },
              { num: '5', label: 'import/export', code: 'import X from Y' },
              { num: '6', label: '選用鏈', code: 'obj?.key ?? default' },
            ].map((item) => (
              <Card key={item.num} className="border border-gray-100 shadow-sm">
                <CardBody className="p-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 font-black text-[11px] flex items-center justify-center">
                      {item.num}
                    </span>
                    <p className="font-black text-gray-800 text-sm">{item.label}</p>
                  </div>
                  <code className="font-mono text-[11px] text-gray-400 block">{item.code}</code>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* ── 語法 1：箭頭函式 ───────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<Zap size={18} />} num="1">
            箭頭函式 <code className="font-mono text-xl">() =&gt; {'{}'}</code>
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            箭頭函式就是函式的<strong>速記法</strong>——功能完全一樣，只是寫法更短。在 React 裡你到處都會看到它，特別是事件處理和 <code className="font-mono text-amber-700">.map()</code> 回呼。
          </p>

          <CodeBlock
            title="arrow-functions.js"
            lang="javascript"
            code={`// 傳統函式寫法
function add(a, b) {
  return a + b;
}

// 箭頭函式（完全等價）
const add = (a, b) => {
  return a + b;
};

// 進階省略：只有一行 return 時，可以拿掉 {} 和 return
const add = (a, b) => a + b;

// 只有一個參數時，小括號也可以省略
const double = n => n * 2;

// 沒有參數：小括號不能省
const greet = () => 'Hello!';`}
          />

          <CodeBlock
            title="arrow-in-react.jsx"
            lang="jsx"
            code={`// React 裡最常見的箭頭函式用法

// 1. .map() 的回呼
const names = ['Alice', 'Bob', 'Charlie'];
const upper = names.map(name => name.toUpperCase());
// ['ALICE', 'BOB', 'CHARLIE']

// 2. 事件處理（onClick、onChange 等）
function MyButton() {
  return (
    <button onClick={() => console.log('被點了！')}>
      點我
    </button>
  );
}

// 3. Component 本身也可以用箭頭函式定義（跟 function 宣告等價）
const Greeting = ({ name }) => (
  <h1>你好，{name}！</h1>
);`}
          />

          <Callout type="info">
            <strong>什麼時候用傳統函式、什麼時候用箭頭函式？</strong><br />
            大多數情況下可以互換。React 社群<strong>偏好箭頭函式</strong>，因為更短、更容易閱讀。
            唯一要注意的是：箭頭函式沒有自己的 <code className="font-mono">this</code>（這在 EP.03 閉包篇會講到）。
          </Callout>
        </motion.section>

        <Divider />

        {/* ── 語法 2：解構賦值 ─────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<Package size={18} />} num="2">
            解構賦值——從快遞盒裡拆包裹
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            解構賦值就像「拆包裹」——從陣列或物件裡，把你要的東西直接取出來，並且立刻幫它命名。
            這是 React 裡<strong>最高頻率</strong>出現的 ES6 語法，特別是 <code className="font-mono text-amber-700">useState</code> 和 props。
          </p>

          <div className="space-y-4">
            <p className="font-black text-gray-700 text-base">陣列解構——useState 的秘密</p>
            <CodeBlock
              title="array-destructuring.js"
              lang="javascript"
              code={`// 不用解構：很囉嗦
const pair = [0, function setter(v) { /* 更新函式 */ }];
const count = pair[0];
const setCount = pair[1];

// 用解構：這就是 React 的 useState！
const [count, setCount] = useState(0);
// [count, setCount] 對應 useState 回傳陣列的 [第0個, 第1個]

// 更多陣列解構範例
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);   // 1
console.log(second);  // 2
console.log(rest);    // [3, 4, 5]  ← ...rest 收集剩下的

// 跳過某個值：用逗號佔位
const [,, third] = [10, 20, 30];
console.log(third);   // 30`}
            />
          </div>

          <div className="space-y-4">
            <p className="font-black text-gray-700 text-base">物件解構——props 的秘密</p>
            <CodeBlock
              title="object-destructuring.js"
              lang="javascript"
              code={`const user = { name: 'Joseph', age: 26, city: '高雄' };

// 不用解構：一行一行取出
const name = user.name;
const age = user.age;

// 用解構：一次取出多個屬性
const { name, age } = user;
console.log(name);  // 'Joseph'
console.log(age);   // 26

// 重新命名（變數名 : 新名字）
const { name: userName, city: location } = user;
console.log(userName);   // 'Joseph'
console.log(location);   // '高雄'

// 設定預設值（屬性不存在時用預設值）
const { name, role = '訪客' } = user;
console.log(role);  // '訪客'（user 沒有 role 屬性）`}
            />
          </div>

          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6 space-y-4">
            <p className="font-black text-sky-800 text-base">Component props 的解構</p>
            <p className="text-sm text-sky-700 leading-relaxed">
              這是你在 React 裡<strong>最常看到</strong>的用法：在函式參數裡直接解構 props 物件。
            </p>
            <CodeBlock
              title="props-destructuring.jsx"
              lang="jsx"
              code={`// 不用解構：要一直寫 props.xxx
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.age} 歲 — {props.city}</p>
    </div>
  );
}

// 用解構：在參數位置直接拆開 props（React 偏好這種寫法）
function UserCard({ name, age, city }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age} 歲 — {city}</p>
    </div>
  );
}

// 使用時一樣
<UserCard name="Joseph" age={26} city="高雄" />`}
            />
          </div>
        </motion.section>

        <Divider />

        {/* ── 語法 3：展開運算子 ───────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<Layers size={18} />} num="3">
            展開運算子 <code className="font-mono text-xl">...</code>
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            三個點 <code className="font-mono text-amber-700">...</code>，叫做展開運算子（Spread Operator）。比喻：就像「複製貼上」——把一個陣列或物件的所有內容<strong>展開</strong>到另一個裡面。
          </p>

          <CodeBlock
            title="spread-operator.js"
            lang="javascript"
            code={`// 複製陣列（產生全新陣列，不影響原本的）
const original = [1, 2, 3];
const copy = [...original];         // [1, 2, 3]
const added = [...original, 4, 5];  // [1, 2, 3, 4, 5]

// 合併兩個陣列
const a = [1, 2, 3];
const b = [4, 5, 6];
const merged = [...a, ...b];  // [1, 2, 3, 4, 5, 6]

// 複製物件（產生全新物件）
const user = { name: 'Joseph', age: 26 };
const copy = { ...user };                   // { name: 'Joseph', age: 26 }
const updated = { ...user, age: 27 };       // { name: 'Joseph', age: 27 }
// 後面的屬性會覆蓋前面的 ↑

// 合併兩個物件
const extra = { city: '高雄', role: 'admin' };
const full = { ...user, ...extra };
// { name: 'Joseph', age: 26, city: '高雄', role: 'admin' }`}
          />

          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 space-y-4">
            <p className="font-black text-red-800 text-base">
              為什麼 React 這麼常用展開運算子？
            </p>
            <p className="text-sm text-red-700 leading-relaxed">
              React 要求狀態更新必須用<strong>全新的物件或陣列</strong>，不能直接修改（mutate）原本的。
              這是因為 React 判斷狀態有沒有改變，是比對「參考（reference）」而非「內容」。
              展開運算子剛好可以輕鬆建立新物件，同時保留原本的屬性。
            </p>
            <CodeBlock
              title="state-update.jsx"
              lang="jsx"
              code={`const [user, setUser] = useState({ name: 'Joseph', age: 26 });

// ❌ 錯誤：直接修改原物件
// React 看到的還是「同一個物件的記憶體位址」→ 不會重新渲染
user.age = 27;
setUser(user);

// ✅ 正確：用展開運算子建立新物件
// React 看到「不同的物件記憶體位址」→ 觸發重新渲染
setUser({ ...user, age: 27 });

// 陣列也是一樣的概念
const [items, setItems] = useState(['蘋果', '香蕉']);

// ❌ 錯誤：直接修改原陣列
items.push('芒果');
setItems(items);

// ✅ 正確：建立新陣列
setItems([...items, '芒果']);`}
            />
          </div>

          <Callout type="tip">
            <strong>展開 vs 解構</strong>——很多人會搞混：<br />
            <code className="font-mono">const copy = [...arr]</code> 是展開（建立新陣列）<br />
            <code className="font-mono">const [first, ...rest] = arr</code> 是解構（取出元素），<code className="font-mono">...rest</code> 這裡叫「Rest Parameter」<br />
            形狀一樣，但用途不同——看左邊是賦值目標還是值表達式來判斷。
          </Callout>
        </motion.section>

        <Divider />

        {/* ── 語法 4：模板字串 ─────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<Code2 size={18} />} num="4">
            模板字串 <code className="font-mono text-xl">{'`${ }`'}</code>
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            模板字串用<strong>反引號</strong>（<code className="font-mono">`</code>，鍵盤左上角 Tab 鍵上方）包住，在字串裡用 <code className="font-mono text-amber-700">{'${}'}</code> 嵌入變數或運算式。比喻：就像填空題——先把空格留好，需要的時候再填進去。
          </p>

          <CodeBlock
            title="template-literals.js"
            lang="javascript"
            code={`const name = 'Joseph';
const age = 26;

// 舊方法（字串拼接）：容易出錯，又難讀
const greeting = '你好，' + name + '！你今年 ' + age + ' 歲。';

// 模板字串：直覺多了
const greeting = \`你好，\${name}！你今年 \${age} 歲。\`;
// 你好，Joseph！你今年 26 歲。

// \${}  裡面可以放任何 JavaScript 運算式
const price = 100;
const qty = 3;
console.log(\`總計：\${price * qty} 元\`);   // 總計：300 元
console.log(\`明年：\${age + 1} 歲\`);        // 明年：27 歲

// 多行字串（舊方法要 \\n，模板字串直接換行）
const message = \`
  親愛的 \${name}，
  您的訂單已確認。
  總計：NT$\${price * qty}
\`;

// 在 React 裡：動態 className
const isActive = true;
const className = \`btn \${isActive ? 'btn-active' : 'btn-default'}\`;
// 'btn btn-active'`}
          />

          <Callout type="react">
            <strong>在 React / Next.js 裡最常見的用法：</strong>動態 CSS className。
            比如 Tailwind 的類名組合：<br />
            <code className="font-mono">{`\`px-4 py-2 \${isActive ? 'bg-blue-500' : 'bg-gray-200'}\``}</code><br />
            不過更複雜的情況下，大家通常改用 <code className="font-mono">clsx</code> 或 <code className="font-mono">cn</code> 工具函式。
          </Callout>
        </motion.section>

        <Divider />

        {/* ── 語法 5：import / export ──────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<Link2 size={18} />} num="5">
            import / export——模組化的基礎
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            每個 <code className="font-mono">.js</code> / <code className="font-mono">.tsx</code> 檔案就是一個「模組」。模組可以把裡面的東西「輸出」（export），讓其他模組「輸入」（import）使用。比喻：就像公司的各個部門——財務部把報表「輸出」給管理部，管理部「輸入」後才能做決策。
          </p>

          <CodeBlock
            title="math.js（輸出）"
            lang="javascript"
            code={`// Named Export：可以有多個，用名字區分
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export const PI = 3.14159;

// Default Export：每個檔案只能有一個 default
export default function divide(a, b) {
  return a / b;
}`}
          />

          <CodeBlock
            title="main.js（輸入）"
            lang="javascript"
            code={`// Named Import：用大括號，名字要對應
import { add, multiply, PI } from './math.js';

// Default Import：沒有大括號，可以取任何名字
import divide from './math.js';
import myDivide from './math.js';  // 名字隨便取，都對應那個 default

// 兩種一起 import
import divide, { add, multiply } from './math.js';

// 重新命名（避免名字衝突）
import { add as plus } from './math.js';

// 全部 named export 放到一個物件
import * as MathUtils from './math.js';
MathUtils.add(1, 2);  // 3`}
          />

          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6 space-y-4">
            <p className="font-black text-sky-800 text-base">React 程式碼裡到處都是 import</p>
            <CodeBlock
              title="MyComponent.tsx（React 真實範例）"
              lang="typescript"
              code={`// React 核心：useState 和 useEffect 是 named export
import React, { useState, useEffect } from 'react';

// UI 元件庫
import { Card, Button, Chip } from '@heroui/react';

// Next.js 提供的 Link Component（default export）
import Link from 'next/link';

// 動畫函式庫
import { motion } from 'framer-motion';

// 你自己寫的 Component（default export）
import CodeBlock from '@/components/blog/CodeBlock';

// 你自己寫的工具函式（named export）
import { formatDate, cn } from '@/lib/utils';`}
            />
          </div>

          <Callout type="info">
            <strong>Named export vs Default export——什麼時候用哪個？</strong><br />
            一個約定俗成的規則：<strong>Component 用 default export</strong>（因為一個檔案通常只有一個主要 Component），<strong>工具函式用 named export</strong>（一個 utils 檔案可能輸出很多函式）。不過這只是慣例，不是強制規定。
          </Callout>
        </motion.section>

        <Divider />

        {/* ── 語法 6：選用鏈 ───────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<ShieldCheck size={18} />} num="6">
            選用鏈 <code className="font-mono text-xl">?.</code> 與空值合併 <code className="font-mono text-xl">??</code>
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            這兩個符號是<strong>防禦性編程</strong>的好工具——在資料可能是 <code className="font-mono">null</code> 或 <code className="font-mono">undefined</code> 的情況下，避免程式噴錯炸掉。
            在串接 API 資料、處理 React props 時特別常用。
          </p>

          <CodeBlock
            title="optional-chaining.js"
            lang="javascript"
            code={`// 問題：直接存取 null 物件的屬性會噴錯
const user = null;
console.log(user.name);  // ❌ TypeError: Cannot read properties of null

// 舊方法（很囉嗦）
const name = user && user.address && user.address.city;

// 選用鏈 ?.：如果 ? 前面是 null/undefined，直接回傳 undefined，不噴錯
console.log(user?.name);                  // undefined（不噴錯）
console.log(user?.address?.city);         // undefined（巢狀也安全）
console.log(user?.getAge?.());            // undefined（函式呼叫也能用）

// 空值合併 ??：左邊是 null 或 undefined 時，回傳右邊的預設值
const displayName = user?.name ?? '訪客'; // '訪客'
const age = user?.age ?? 0;              // 0

// 注意 ?? 和 || 的差異：
// || 把 0、''、false 也視為假值
// ?? 只把 null 和 undefined 視為「沒有值」
const count = 0;
console.log(count || 10);  // 10（因為 0 是 falsy）
console.log(count ?? 10);  // 0（0 不是 null/undefined，所以用 0）`}
          />

          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 space-y-4">
            <p className="font-black text-green-800 text-base">React Component 的防禦性寫法</p>
            <CodeBlock
              title="Profile.jsx"
              lang="jsx"
              code={`// 從 API 取得的資料，一開始可能是 null/undefined
function Profile({ user }) {
  return (
    <div>
      {/* ?. 和 ?? 讓你安全讀取巢狀屬性 */}
      <h1>{user?.displayName ?? '未知用戶'}</h1>
      <p>{user?.email ?? '未設定 Email'}</p>
      <p>{user?.profile?.bio ?? '這個人很神秘，什麼都沒留下。'}</p>

      {/* 選用鏈 + && 的組合：只有有值才顯示 */}
      {user?.isAdmin && <span>管理員</span>}

      {/* 選用鏈呼叫方法 */}
      <p>加入時間：{user?.getJoinDate?.() ?? '不詳'}</p>
    </div>
  );
}

// 使用時就算 user 是 undefined 也不會噴錯
<Profile user={undefined} />  // ✅ 不炸`}
            />
          </div>
        </motion.section>

        <Divider />

        {/* ── 綜合改寫 ──────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<Code2 size={18} />} num="★">
            綜合範例——改寫前 vs 改寫後
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            讓我們把同一個 Component 用 ES5 和 ES6+ 各寫一次，看看差距有多大。
            邏輯完全一樣，但可讀性天差地遠：
          </p>

          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-red-200">
              <div className="bg-red-800 px-4 py-2.5">
                <span className="text-red-200 text-xs font-mono font-bold">改寫前 — ES5 傳統寫法</span>
              </div>
              <CodeBlock
                lang="javascript"
                code={`function BookCard(props) {
  var title = props.title;
  var author = props.author;
  var price = props.price;
  var inStock = props.inStock;

  if (inStock === undefined) {
    inStock = true;  // 手動設預設值
  }

  return (
    '<div>' +
    title + ' by ' + author +
    ' — NT$' + price +
    (inStock ? ' (現貨)' : ' (缺貨)') +
    '</div>'
  );
}`}
              />
            </div>

            <div className="flex justify-center">
              <div className="text-gray-400 font-black text-lg px-4 py-2">↓ ES6+ 改寫後</div>
            </div>

            <div className="rounded-xl overflow-hidden border border-green-200">
              <div className="bg-green-800 px-4 py-2.5">
                <span className="text-green-200 text-xs font-mono font-bold">改寫後 — ES6+ 現代寫法</span>
              </div>
              <CodeBlock
                lang="jsx"
                code={`// 箭頭函式 + 解構（含預設值）+ 模板字串
const BookCard = ({ title, author, price, inStock = true }) => (
  <div>
    {\`\${title} by \${author} — NT$\${price} \${inStock ? '(現貨)' : '(缺貨)'}\`}
  </div>
);`}
              />
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl px-4 py-3">
            從 13 行壓縮成 4 行，可讀性卻反而更好——這就是現代 ES6+ 語法帶來的威力。
            你在 React 程式碼裡看到的「精簡」寫法，背後都是這幾個語法的組合。
          </p>
        </motion.section>

        <Divider />

        {/* ── 總結速查表 ───────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<CheckCircle size={18} />} num="✓">
            六個語法速查表
          </SectionTitle>

          <Card className="border border-amber-100 bg-amber-50/30 shadow-sm">
            <CardBody className="p-6 space-y-3">
              {[
                {
                  key: '箭頭函式',
                  code: '(a, b) => a + b',
                  val: '函式的速記法。React 事件處理和 .map() 回呼的標準寫法',
                },
                {
                  key: '解構賦值',
                  code: 'const { a, b } = obj',
                  val: '從陣列或物件中直接取出並命名。useState、props 的核心語法',
                },
                {
                  key: '展開運算子',
                  code: '[...arr]  {...obj}',
                  val: '複製並展開陣列/物件。React 狀態更新必用，確保不可變性',
                },
                {
                  key: '模板字串',
                  code: '`Hello ${name}`',
                  val: '反引號字串，可嵌入變數和運算式。動態字串的最佳寫法',
                },
                {
                  key: 'import/export',
                  code: 'import X from Y',
                  val: '模組系統。每個 .tsx 檔案都是模組，Component 用 default export',
                },
                {
                  key: '選用鏈 + ??',
                  code: 'obj?.a ?? default',
                  val: '安全存取可能為 null/undefined 的值，給予預設值',
                },
              ].map((r) => (
                <div key={r.key} className="flex items-start gap-4 bg-white rounded-xl px-4 py-3">
                  <div className="w-28 shrink-0 mt-0.5 space-y-1">
                    <p className="font-black text-amber-700 text-sm">{r.key}</p>
                    <code className="font-mono text-[10px] text-gray-400 leading-snug block">{r.code}</code>
                  </div>
                  <p className="text-sm text-gray-600 flex-1 leading-relaxed">{r.val}</p>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-green-800 text-base">現在你能看懂什麼了？</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                還記得開篇的那行程式碼嗎：
              </p>
              <CodeBlock
                lang="jsx"
                code={`const [count, setCount] = useState(0);
//     ↑               ↑              ↑
//     陣列解構         陣列解構        函式呼叫

const UserCard = ({ name, age = 18 }) => (  // 解構 + 預設值 + 箭頭函式
  <div className={\`card \${age >= 18 ? 'adult' : 'minor'}\`}>  {/* 模板字串 */}
    <h2>{name ?? '訪客'}</h2>                                  {/* 空值合併 */}
  </div>
);`}
              />
              <p className="text-sm text-gray-700 leading-relaxed">
                你現在已經能完整讀懂這段程式碼了。接下來的文章，我們會開始<strong>真正使用 React</strong>——你已經準備好了。
              </p>
            </CardBody>
          </Card>

          <Card className="border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-amber-800 text-base">下一步</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                語法你現在全懂了。但你可能還有一個問題：React 為什麼要存在？
                「傳統 HTML + JS 不是也可以做網頁嗎？」——下一篇從這個問題開始，
                讓你真正理解 React 的設計哲學。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        {/* ── Tags ──────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 pt-2">
          {['ES6', 'JavaScript', '箭頭函式', '解構賦值', '展開運算子', '模板字串', 'import/export', '選用鏈', 'React 前置知識'].map(
            (tag) => (
              <Chip key={tag} size="sm" variant="flat" color="warning" className="font-medium">
                {tag}
              </Chip>
            )
          )}
        </div>

        {/* ── Navigation ────────────────────────────── */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-4">
          <Link href="/blog/js/ep01-js-basics">
            <div className="group flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-200 rounded-2xl px-5 py-4 transition-all duration-200">
              <div className="w-8 h-8 rounded-xl bg-gray-200 group-hover:bg-gray-300 flex items-center justify-center transition-colors">
                <ArrowLeft size={16} className="text-gray-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">上一篇</p>
                <p className="font-black text-gray-800 text-sm group-hover:text-gray-900 transition-colors">
                  EP.01 — 學 React 前必備的 JS
                </p>
              </div>
            </div>
          </Link>

          <Link href="/blog/js/closure-scope">
            <div className="group flex items-center gap-3 bg-gradient-to-r from-amber-50 to-green-50 hover:from-amber-100 hover:to-green-100 border border-amber-200 rounded-2xl px-5 py-4 transition-all duration-200">
              <div className="flex-1 text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">下一篇</p>
                <p className="font-black text-gray-800 text-sm group-hover:text-amber-700 transition-colors">
                  閉包與作用域——JS 底層核心
                </p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center transition-colors">
                <ArrowRight size={16} className="text-amber-600" />
              </div>
            </div>
          </Link>
        </div>

      </article>
    </div>
  );
}
