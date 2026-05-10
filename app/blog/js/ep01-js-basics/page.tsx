'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Box,
  Wrench,
  List,
  FileText,
  Layers,
  CheckCircle,
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
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-black text-sm shrink-0">
      {num}
    </div>
    <div className="p-2 rounded-xl bg-yellow-100 text-yellow-700">{icon}</div>
    <h2 className="text-2xl font-black text-gray-800">{children}</h2>
  </div>
);

const Callout = ({
  type,
  children,
}: {
  type: 'info' | 'warn' | 'tip';
  children: React.ReactNode;
}) => {
  const styles = {
    info: 'bg-blue-50 border border-blue-100 text-blue-800',
    warn: 'bg-amber-50 border border-amber-100 text-amber-800',
    tip: 'bg-green-50 border border-green-100 text-green-800',
  };
  const labels = { info: 'INFO', warn: 'NOTE', tip: 'TIP' };
  return (
    <div className={`rounded-2xl p-5 ${styles[type]}`}>
      <p className="text-[10px] font-black tracking-widest mb-1 opacity-60">{labels[type]}</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};

/* ─── 主頁面 ─────────────────────────────────────── */

export default function EP01JSBasicsPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────── */}
      <div className="relative h-[56vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500">
        {/* 浮動光暈 */}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 35%, rgba(255,255,255,0.18) 0%, transparent 55%), radial-gradient(circle at 75% 70%, rgba(255,100,0,0.25) 0%, transparent 55%)',
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
                EP.01
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
              在學 React 之前，<br />
              <span className="text-yellow-200">你必須懂的 JavaScript</span>
            </h1>
            <p className="text-orange-100 text-lg font-medium max-w-2xl mx-auto">
              變數、函式、陣列、物件——React 程式碼裡最常用的四樣東西，<br className="hidden sm:block" />
              一次全部搞懂，從此看 React 程式碼不再霧煞煞
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center text-white font-black text-sm">
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
                <span>8 min read</span>
                <span>·</span>
                <Eye size={12} />
                <span>EP.01</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" variant="flat" color="warning">JavaScript</Chip>
            <Chip size="sm" variant="flat" color="warning">基礎</Chip>
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
          <Card className="border border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-sm">
            <CardBody className="p-7">
              <div className="flex gap-4">
                <Quote size={28} className="text-yellow-500 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p className="text-gray-700 text-base leading-relaxed italic">
                    「我想學 React，打開教學影片，看到第一行程式碼：
                    <code className="font-mono bg-yellow-100 px-1.5 py-0.5 rounded text-yellow-800 not-italic">
                      const [count, setCount] = useState(0)
                    </code>
                    —— 這是什麼？<code className="font-mono not-italic">const</code> 後面有中括號、等號、括號…我完全看不懂。」
                  </p>
                  <p className="text-sm text-orange-600 font-bold">
                    — 幾乎每個第一次學 React 的人，都有這個時刻
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed text-base">
            這篇文章的目標很簡單：把 React 程式碼裡<strong>最高頻率出現</strong>的四個 JavaScript 概念講清楚。
            學完這篇，你再打開 React 教學，至少不會在語法上卡關。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '📦', label: '變數', sub: 'const / let' },
              { icon: '⚙️', label: '函式', sub: 'function' },
              { icon: '📋', label: '陣列', sub: '.map() .filter()' },
              { icon: '🗂️', label: '物件', sub: '{ key: value }' },
            ].map((item) => (
              <Card key={item.label} className="border border-gray-100 shadow-sm">
                <CardBody className="p-4 text-center space-y-1">
                  <p className="text-2xl">{item.icon}</p>
                  <p className="font-black text-gray-800 text-sm">{item.label}</p>
                  <p className="font-mono text-[11px] text-gray-400">{item.sub}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* ── Section 1：變數 ───────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<Box size={18} />} num="1">
            變數——有名字的盒子
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            最直觀的比喻：變數就像一個<strong>有名字的盒子</strong>。你把一個值放進去，之後只要叫那個盒子的名字，就能把值取出來。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border border-red-100 bg-red-50/40 shadow-sm">
              <CardBody className="p-5 space-y-2">
                <p className="font-black text-red-700 text-sm">const — 裝了就不能換</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  就像一個<strong>密封的盒子</strong>——放進去之後，蓋子就焊死了，不能再換內容物。React 裡<strong>絕大多數變數</strong>都用 <code className="font-mono">const</code>。
                </p>
              </CardBody>
            </Card>
            <Card className="border border-blue-100 bg-blue-50/40 shadow-sm">
              <CardBody className="p-5 space-y-2">
                <p className="font-black text-blue-700 text-sm">let — 可以換內容</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  就像一個<strong>普通盒子</strong>——你可以把裡面的東西換掉。計數器、迴圈變數才需要用 <code className="font-mono">let</code>。
                </p>
              </CardBody>
            </Card>
          </div>

          <CodeBlock
            title="variables.js"
            lang="javascript"
            code={`// const：裝了不能換（最常用）
const name = 'Joseph';
const age = 26;
const isLoggedIn = true;

// let：可以重新賦值
let count = 0;
count = count + 1;  // ✅ 可以，count 現在是 1

// name = 'Mary';   // ❌ 錯誤！const 不能重新賦值
// const x;         // ❌ 錯誤！const 宣告時一定要給值

// 三種基本型別
const myString = 'Hello';   // 字串
const myNumber = 42;         // 數字
const myBoolean = true;      // 布林（true 或 false）`}
          />

          <Callout type="tip">
            <strong>為什麼 React 幾乎都用 const？</strong><br />
            React 的資料流是「單向的」——你不會直接修改一個變數，而是呼叫像 <code className="font-mono">setState</code> 這樣的函式來更新狀態。所以大部分的變數設定之後就不需要再換，<code className="font-mono">const</code> 剛好符合這個需求，也讓程式碼更容易讀懂：「看到 const，就知道這個值不會被修改。」
          </Callout>
        </motion.section>

        <Divider />

        {/* ── Section 2：函式 ───────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<Wrench size={18} />} num="2">
            函式——把東西丟進去、出來成品
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            函式就像一台<strong>機器</strong>：你把原料（輸入）丟進去，機器處理完，吐出成品（輸出）。
            同一台機器可以重複使用，只要原料不同，成品也不同。
          </p>

          <p className="text-gray-700 leading-relaxed text-base">
            在 JavaScript 裡，函式由三個部分組成：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: '參數（Parameters）', desc: '函式的「輸入口」，放在小括號裡，可以有多個，也可以沒有', color: 'bg-purple-50 border-purple-100 text-purple-700' },
              { label: '函式體（Body）', desc: '大括號 {} 裡面是「機器的運作邏輯」，寫你要做什麼事', color: 'bg-orange-50 border-orange-100 text-orange-700' },
              { label: 'return', desc: '「成品出口」，把結果傳回給呼叫方。沒有 return 的函式回傳 undefined', color: 'bg-green-50 border-green-100 text-green-700' },
            ].map((item) => (
              <Card key={item.label} className={`border shadow-sm ${item.color}`}>
                <CardBody className="p-4 space-y-2">
                  <p className="font-black text-sm">{item.label}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <CodeBlock
            title="functions.js"
            lang="javascript"
            code={`// 函式：接收輸入，處理後產生輸出
function greet(name) {           // name 是「參數」（輸入）
  return '你好，' + name + '！'; // return 是「輸出」
}

const result = greet('Joseph');
console.log(result);  // 你好，Joseph！

// 可以有多個參數
function add(a, b) {
  return a + b;
}
console.log(add(3, 5));  // 8

// 沒有 return → 回傳 undefined
function sayHello(name) {
  console.log('Hello ' + name);  // 只做事，不回傳值
}
const val = sayHello('Mary');
console.log(val);  // undefined`}
          />

          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 space-y-4">
            <p className="font-black text-yellow-800 text-base">
              React Component 就是函式！
            </p>
            <p className="text-sm text-yellow-700 leading-relaxed">
              這是最重要的觀念：一個 React Component 就是一個「接收 props、回傳 UI」的函式。
              你現在看到的每一個 React Component，都是這個模式。
            </p>
            <CodeBlock
              title="MyButton.jsx"
              lang="jsx"
              code={`// React Component 就是函式！
// 輸入（props）→ 處理 → 輸出（UI / JSX）
function MyButton() {
  return <button>點我</button>;
}

// 有 props 的 Component
function Greeting({ name }) {     // 參數是 props
  return <h1>你好，{name}！</h1>; // 回傳 JSX（UI）
}

// 使用方法和一般函式呼叫很像
// 差別是用「標籤」語法
// <Greeting name="Joseph" />`}
            />
          </div>
        </motion.section>

        <Divider />

        {/* ── Section 3：陣列 ───────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<List size={18} />} num="3">
            陣列——有順序的清單（React 最愛用）
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            陣列就像一張<strong>購物清單</strong>——按順序列出一堆東西，用數字索引（從 0 開始）存取每一項。
            在 React 裡，你幾乎天天都在用陣列——因為資料通常是「一筆一筆」的，你需要把這些資料「渲染」成 UI。
          </p>

          <CodeBlock
            title="arrays-basics.js"
            lang="javascript"
            code={`// 建立陣列（用中括號）
const fruits = ['蘋果', '香蕉', '芒果'];

// 用索引存取（從 0 開始！）
console.log(fruits[0]);  // '蘋果'
console.log(fruits[1]);  // '香蕉'
console.log(fruits[2]);  // '芒果'

// 取得長度
console.log(fruits.length);  // 3`}
          />

          <p className="text-gray-700 leading-relaxed text-base">
            陣列有幾個內建方法，在 React 裡非常高頻率出現——其中 <code className="font-mono text-orange-600">.map()</code> 是最最最重要的一個：
          </p>

          <CodeBlock
            title="array-methods.js"
            lang="javascript"
            code={`const fruits = ['蘋果', '香蕉', '芒果'];

// .map()：把每個元素「變換」成新的東西
// 傳入一個函式，針對每個元素執行，回傳「新陣列」
const tagged = fruits.map(fruit => fruit + ' 🍴');
console.log(tagged);  // ['蘋果 🍴', '香蕉 🍴', '芒果 🍴']
// 原本的 fruits 不變！.map() 永遠回傳新陣列

// .filter()：篩選符合條件的元素，回傳「新陣列」
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4, 6]

// .find()：找到「第一個」符合條件的元素
// 找到就回傳那個元素，找不到就回傳 undefined
const found = fruits.find(fruit => fruit === '香蕉');
console.log(found);  // '香蕉'

const notFound = fruits.find(fruit => fruit === '西瓜');
console.log(notFound);  // undefined`}
          />

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 space-y-4">
            <p className="font-black text-orange-800 text-base">
              .map() 在 React 裡的樣子
            </p>
            <p className="text-sm text-orange-700 leading-relaxed">
              React 用 <code className="font-mono">.map()</code> 把資料陣列轉換成 UI 元素——這是 React 列表渲染的<strong>標準寫法</strong>，你在每個 React 專案都會看到。
            </p>
            <CodeBlock
              title="PostList.jsx"
              lang="jsx"
              code={`const posts = ['文章一', '文章二', '文章三'];

function PostList() {
  return (
    <div>
      {posts.map((post, index) => (
        // key 是 React 要求的：讓 React 知道哪筆資料變了
        // 實際專案通常用資料的唯一 ID，而不是 index
        <p key={index}>{post}</p>
      ))}
    </div>
  );
}

// React 看到 posts.map(...)，會自動渲染出：
// <p>文章一</p>
// <p>文章二</p>
// <p>文章三</p>`}
            />
          </div>

          <Callout type="info">
            <strong>為什麼需要 key？</strong><br />
            React 在更新畫面時，會比對「更新前」和「更新後」的 UI 差異，只更新有改變的部分（這是 Virtual DOM 的概念）。
            <code className="font-mono">key</code> 就是幫每個列表項目貼一個「識別標籤」，讓 React 知道「這個項目是同一個」還是「換了一個新的」，避免不必要的重新渲染。
          </Callout>
        </motion.section>

        <Divider />

        {/* ── Section 4：物件 ───────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<FileText size={18} />} num="4">
            物件——把相關資料整合在一起
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            物件就像一張<strong>名片</strong>——上面有名字、電話、公司、職稱。這些資料都屬於「同一個人」，用物件把它們包在一起，比分開放成多個變數好管理得多。
          </p>

          <p className="text-gray-700 leading-relaxed text-base">
            物件用<strong>大括號</strong> <code className="font-mono text-orange-600">{'{}'}</code> 建立，裡面放「鍵值對」（key-value pair）——<code className="font-mono">鍵名: 值</code>。
          </p>

          <CodeBlock
            title="objects.js"
            lang="javascript"
            code={`// 物件：把相關資料組合在一起
const user = {
  name: 'Joseph',        // 字串
  age: 26,               // 數字
  isAdmin: false,        // 布林
  address: {             // 巢狀物件！物件裡面可以再放物件
    city: '高雄',
    country: '台灣',
  }
};

// 兩種存取屬性的方式
console.log(user.name);           // 'Joseph'（點記法，最常用）
console.log(user['age']);         // 26（中括號記法）

// 巢狀物件用點記法一層層往下
console.log(user.address.city);   // '高雄'

// 修改屬性的值（物件是 const，但裡面的屬性可以改）
user.age = 27;                    // ✅ 可以
console.log(user.age);            // 27`}
          />

          <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6 space-y-4">
            <p className="font-black text-purple-800 text-base">
              React 裡最常見的物件用法：style
            </p>
            <CodeBlock
              title="StyledButton.jsx"
              lang="jsx"
              code={`// React 裡的 style 屬性要傳入一個「物件」
// 注意：CSS 的 background-color 在這裡要寫成 backgroundColor（camelCase）
const buttonStyle = {
  backgroundColor: 'royalblue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
};

function StyledButton() {
  return <button style={buttonStyle}>點我</button>;
}

// 也可以直接寫在 JSX 裡（兩層大括號：外層是 JSX 表達式，內層是物件）
function InlineButton() {
  return (
    <button style={{ backgroundColor: 'coral', color: 'white', padding: '8px 16px' }}>
      內嵌樣式
    </button>
  );
}`}
            />
          </div>
        </motion.section>

        <Divider />

        {/* ── Section 5：綜合練習 ───────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<Layers size={18} />} num="5">
            綜合練習——把四個概念串起來
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            理解了四個概念之後，我們來做一個簡單的<strong>書籍清單組件</strong>，把所有東西串在一起。
            注意看這段程式碼用到了哪些你剛學到的東西：
          </p>

          <CodeBlock
            title="BookList.jsx"
            lang="jsx"
            code={`// 1. 用「物件陣列」存資料
//    每一本書是一個物件，所有書放在一個陣列
const books = [
  { id: 1, title: 'Clean Code',        author: 'Robert Martin', price: 650 },
  { id: 2, title: "You Don't Know JS", author: 'Kyle Simpson',  price: 450 },
  { id: 3, title: 'Design Patterns',   author: 'GoF',           price: 800 },
];

// 2. 用「函式」建立 Component
//    接收一本書的物件作為 props，回傳 UI
function BookCard({ book }) {     // ← 參數是物件，下一篇會教解構賦值
  return (
    <div style={{ border: '1px solid #eee', padding: '16px', margin: '8px', borderRadius: '8px' }}>
      <h3 style={{ margin: 0 }}>{book.title}</h3>
      <p style={{ color: '#666' }}>作者：{book.author}</p>
      <p style={{ fontWeight: 'bold', color: '#e55' }}>NT${book.price}</p>
    </div>
  );
}

// 3. 用「.map()」把資料陣列轉成 UI
//    每本書呼叫一次 BookCard，key 用 book.id（唯一識別）
function BookList() {
  return (
    <div>
      <h2>書單</h2>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

// BookList 渲染出來大概長這樣：
// <div>
//   <h2>書單</h2>
//   <div>Clean Code — Robert Martin — NT$650</div>
//   <div>You Don't Know JS — Kyle Simpson — NT$450</div>
//   <div>Design Patterns — GoF — NT$800</div>
// </div>`}
          />

          <Callout type="tip">
            <strong>思考一下：</strong>如果書單有 1000 本書，你要改什麼嗎？<br />
            答案是不需要——只要 <code className="font-mono">books</code> 陣列有 1000 筆資料，<code className="font-mono">.map()</code> 就會自動渲染出 1000 個卡片。這就是「資料驅動 UI」的概念，React 最核心的精神。
          </Callout>
        </motion.section>

        <Divider />

        {/* ── 總結 ──────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <SectionTitle icon={<CheckCircle size={18} />} num="✓">
            核心重點整理
          </SectionTitle>

          <Card className="border border-yellow-100 bg-yellow-50/30 shadow-sm">
            <CardBody className="p-6 space-y-3">
              {[
                {
                  key: 'const / let',
                  val: '變數：存資料用。const 裝了不能換（React 常用），let 可以重新賦值',
                },
                {
                  key: '函式',
                  val: '輸入→輸出的機器。React Component 就是「接收 props、回傳 UI」的函式',
                },
                {
                  key: '陣列 + .map()',
                  val: 'React 列表渲染的核心。.map() 把資料陣列變成 UI 元素陣列',
                },
                {
                  key: '物件',
                  val: '把相關資料組合成一個單位。props、style、API 回傳值都是物件',
                },
                {
                  key: '物件陣列',
                  val: '真實資料幾乎都是「物件的陣列」，搭配 .map() 就是 React 的日常',
                },
              ].map((r) => (
                <div key={r.key} className="flex items-start gap-4 bg-white rounded-xl px-4 py-3">
                  <code className="font-mono text-sm font-black text-yellow-700 w-36 shrink-0 mt-0.5">
                    {r.key}
                  </code>
                  <p className="text-sm text-gray-600 flex-1 leading-relaxed">{r.val}</p>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="border border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-orange-800 text-base">下一篇預告</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                現在你懂了四個基本概念。但打開 React 程式碼，你還是會看到很多「怪」語法——
                <code className="font-mono text-orange-700">{`const { name, age } = user`}</code>、
                <code className="font-mono text-orange-700">{`(a, b) => a + b`}</code>、
                <code className="font-mono text-orange-700">{`...spread`}</code>……
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                這些是 <strong>ES6+</strong> 的現代語法——<strong>下一篇六個語法一次全部搞定</strong>，讀完你就能看懂 99% 的 React 程式碼。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        {/* ── Tags ──────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 pt-2">
          {['JavaScript', '基礎', '陣列', '物件', '函式', 'React 前置知識', '入門', 'const', 'map'].map((tag) => (
            <Chip key={tag} size="sm" variant="flat" color="warning" className="font-medium">
              {tag}
            </Chip>
          ))}
        </div>

        {/* ── Navigation ────────────────────────────── */}
        <div className="flex items-center justify-end gap-4 flex-wrap pt-4">
          <Link href="/blog/js/ep02-es6">
            <div className="group flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 border border-yellow-200 rounded-2xl px-5 py-4 transition-all duration-200">
              <div className="flex-1 text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">下一篇</p>
                <p className="font-black text-gray-800 text-sm group-hover:text-orange-600 transition-colors">
                  EP.02 — 六個 ES6+ 語法
                </p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center transition-colors">
                <ArrowRight size={16} className="text-orange-600" />
              </div>
            </div>
          </Link>
        </div>

      </article>
    </div>
  );
}
