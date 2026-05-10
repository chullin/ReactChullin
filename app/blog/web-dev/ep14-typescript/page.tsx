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
  Shield,
  Zap,
  Code,
  Layers
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function WebDevEP14() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-gradient-to-br from-blue-700 via-indigo-600 to-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.14</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網頁開發實戰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              TypeScript 入門：型別是你的隊友<br />
              <span className="text-blue-200">從 JS 工程師的角度理解型別思維</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              TypeScript 不是讓你多寫程式碼的工具——它是讓你少 debug 的工具。
              這篇從「為什麼要加型別」出發，帶你掌握 Interface、泛型、嚴格模式等核心概念。
            </p>
            <div className="flex items-center gap-6 text-blue-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> TypeScript · Interface · Generics · Type System</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-blue-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「TypeScript 在你執行程式之前就告訴你哪裡錯了——
                    而不是讓你在生產環境的 3 點鐘接到警報才發現。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    本系列所有的 Next.js 程式碼都是用 TypeScript 寫的，但我們一直沒有正面介紹它。
                    這篇把欠的帳還清——從型別系統的設計哲學，到你在 React 開發中最常用到的 TS 特性。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 為什麼要用 TypeScript */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">為什麼要用 TypeScript？</h2>
          </div>

          <CodeBlock
            title="沒有型別的世界會發生什麼"
            lang="typescript"
            code={`// JavaScript（無型別）
function getUser(id) {
  return fetch('/api/users/' + id).then(r => r.json());
}

const user = await getUser(1);
console.log(user.nmae);  // typo！但 JS 不報錯，執行時才發現是 undefined

// ─────────────────────────────────────────────
// TypeScript（有型別）
type User = {
  id: number;
  name: string;
  email: string;
};

async function getUser(id: number): Promise<User> {
  const res = await fetch('/api/users/' + id);
  return res.json();
}

const user = await getUser(1);
console.log(user.nmae);  // ❌ 編譯錯誤：Property 'nmae' does not exist on type 'User'
console.log(user.name);  // ✅ IDE 自動補全，100% 正確`}
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '🔍', title: '編譯期錯誤發現', desc: '打字錯誤、錯誤的 API 呼叫、undefined 存取，在執行前就被抓到。', color: 'bg-blue-50' },
              { icon: '💡', title: 'IDE 自動補全', desc: '知道型別，IDE 就能提示可用的屬性和方法，大幅提升開發速度。', color: 'bg-indigo-50' },
              { icon: '📖', title: '程式碼即文件', desc: '函數的參數型別和回傳型別本身就是最準確的文件，不需要另外維護。', color: 'bg-violet-50' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 ${item.color}`}>
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="font-black text-gray-800 text-sm mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
            <p className="font-black text-amber-800 mb-1 text-sm">⚠️ TypeScript 只保護你到「編譯期」</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              TypeScript 在 <code>tsc</code> 編譯時做型別檢查，編譯後輸出的是純 JavaScript。
              <strong>執行期的資料（API 回應、使用者輸入、localStorage）不受型別保護</strong>——你的型別定義只是「你跟編譯器說的話」，不是執行時的驗證。
              這就是為什麼處理外部資料時，還需要 Zod 這類 runtime validation 工具。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 基礎型別 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Code className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">基礎型別與型別推斷</h2>
          </div>

          <CodeBlock
            title="TypeScript 基礎型別"
            lang="typescript"
            code={`// ── 基本型別 ──────────────────────────────────────
let name: string = 'Joseph';
let age: number = 26;
let isActive: boolean = true;
let data: null = null;
let value: undefined = undefined;

// ── 型別推斷：TypeScript 很聰明，通常不需要手動標注 ──
let count = 0;           // 推斷為 number
let title = 'Hello';     // 推斷為 string
// count = 'abc';        // ❌ 錯誤：不能把 string 指定給 number

// ── 陣列 ────────────────────────────────────────
const ids: number[] = [1, 2, 3];
const names: Array<string> = ['Alice', 'Bob'];

// ── 物件（inline 型別）──────────────────────────
const user: { id: number; name: string } = { id: 1, name: 'Joseph' };

// ── Union 型別（可以是多種型別之一）──────────────
let status: 'pending' | 'shipped' | 'delivered' = 'pending';
let id: string | number = 1;
id = 'abc';   // 也合法

// ── Literal 型別（精確的值）─────────────────────
type Direction = 'up' | 'down' | 'left' | 'right';
function move(dir: Direction) { /* ... */ }
move('up');      // ✅
// move('diagonal'); // ❌ 型別錯誤

// ── any 和 unknown（謹慎使用）──────────────────
let anything: any = 'hello';  // 關閉型別檢查，盡量避免
let safe: unknown = 42;       // 比 any 安全，使用前必須 type guard`}
          />

          <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-200">
            <p className="font-black text-indigo-800 mb-2 text-sm">unknown + Type Narrowing：比 any 更安全的做法</p>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              收到 <code>unknown</code> 型別後，必須先用 <strong>Type Guard</strong> 縮小型別範圍（Narrowing），才能存取屬性。
              這讓你在處理外部資料時保持型別安全。
            </p>
            <CodeBlock
              title=""
              lang="typescript"
              code={`function processInput(value: unknown) {
  // ── typeof narrowing ──────────────────────────────
  if (typeof value === 'string') {
    console.log(value.toUpperCase());  // TS 知道這裡是 string
  }

  // ── instanceof narrowing ──────────────────────────
  if (value instanceof Date) {
    console.log(value.toISOString());  // TS 知道這裡是 Date
  }

  // ── 自定義 Type Guard（is 關鍵字）────────────────
  function isUser(obj: unknown): obj is User {
    return (
      typeof obj === 'object' && obj !== null &&
      'id' in obj && typeof (obj as any).id === 'number'
    );
  }

  if (isUser(value)) {
    console.log(value.id);   // TS 知道這裡是 User
  }
}`}
            />
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Interface vs Type */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-violet-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Interface vs Type：怎麼選？</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            這是 TypeScript 最常見的問題。兩者功能很相近，但有幾個關鍵差異。
          </p>

          <CodeBlock
            title="Interface 與 Type 的差異"
            lang="typescript"
            code={`// ── Interface：定義物件的形狀 ──────────────────────
interface User {
  id: number;
  name: string;
  email?: string;  // ? 代表可選屬性
  readonly createdAt: Date;  // readonly：只讀不可改
}

// Interface 可以繼承（extends）
interface Admin extends User {
  role: 'admin' | 'superadmin';
  permissions: string[];
}

// Interface 可以宣告合併（Declaration Merging）
// 同名 interface 會自動合併——擴充第三方 library 時很有用，但也是陷阱來源
interface User { phone?: string; }  // 合法！現在 User 多了 phone 欄位
// ⚠️ 陷阱：若你定義了和第三方庫同名的 interface（例如 Session），
// 你的合併會悄悄改變第三方型別的形狀，導致奇怪的型別錯誤：
// interface Session { userId: number; }  // 如果第三方庫已有 Session，這會合併！
// → 避免在全域 scope 定義與第三方庫同名的 interface

// ── Type Alias：更靈活的型別定義 ─────────────────
type Point = { x: number; y: number };

// Type 可以定義 Union、Intersection 等複雜型別（Interface 不行）
type ID = string | number;
type Response<T> = { data: T; error: string | null };

// Type 用 & 做交叉型別（類似繼承）
type AdminUser = User & { role: string };

// ── 實務建議 ─────────────────────────────────────
// ✅ 物件形狀（API 回應、Props）→ 用 Interface
// ✅ Union / Intersection / 別名 → 用 Type
// ✅ React 組件 Props → Interface（社群慣例）
// 兩者差異其實不大，保持一致風格比選哪個更重要`}
          />

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <p className="font-black text-blue-800 mb-2 text-sm">在 React + Next.js 中的慣例</p>
            <p className="text-sm text-blue-700">
              組件的 Props 通常用 <code>interface</code>（因為語義上代表「這個組件接受什麼形狀的輸入」），
              API 回應、Redux state、資料模型通常用 <code>type</code>。
              最重要的是整個專案保持一致——不要一半用 Interface 一半用 Type。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 泛型 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">泛型（Generics）：可重複使用的型別</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            泛型讓你寫出「型別安全的通用程式碼」——邏輯相同但適用於不同型別的情況。
            它是 TypeScript 最強大的特性，也是最多人跳過的部分。
          </p>

          <CodeBlock
            title="泛型的基本用法"
            lang="typescript"
            code={`// ── 問題：沒有泛型，要為每種型別寫重複的函數 ────────
function firstItem_number(arr: number[]): number { return arr[0]; }
function firstItem_string(arr: string[]): string { return arr[0]; }
// 這樣很冗餘...

// ── 解法：泛型讓函數「型別參數化」─────────────────
function firstItem<T>(arr: T[]): T {
    return arr[0];
}
firstItem([1, 2, 3]);       // 推斷 T = number，回傳 number
firstItem(['a', 'b', 'c']); // 推斷 T = string，回傳 string

// ── 實際案例：API 回應的通用型別 ──────────────────
interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

// 使用時代入具體型別
type UserResponse = ApiResponse<User>;     // data 是 User
type ListResponse = ApiResponse<User[]>;   // data 是 User 陣列

async function fetchUser(id: number): Promise<ApiResponse<User>> {
    const res = await fetch('/api/users/' + id);
    return res.json();
}

// ── React Hooks 中的泛型 ──────────────────────────
const [users, setUsers] = useState<User[]>([]);   // 明確告訴 TS 是 User 陣列
const [error, setError] = useState<string | null>(null);

// ── 泛型約束（extends）────────────────────────────
// 限制 T 必須有 id 屬性
function findById<T extends { id: number }>(list: T[], id: number): T | undefined {
    return list.find(item => item.id === id);
}
findById(users, 1);    // ✅ User 有 id
// findById([1,2,3], 1); // ❌ number 沒有 id 屬性`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* React + TS */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">TypeScript 在 React 中的實戰</h2>
          <p className="text-gray-600 leading-relaxed">
            學完泛型後，React 的 TypeScript 寫法其實很直覺：
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">useState&lt;User | null&gt;(null)</code>、
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">useRef&lt;HTMLInputElement&gt;(null)</code>——
            這些都是泛型的直接應用，TypeScript 幫你確保 state 的型別和元件 Props 的形狀，
            編譯期就能抓到 API 回傳值型別錯誤或 Props 傳錯型別的問題。
          </p>

          <CodeBlock
            title="React 組件的 TypeScript 寫法"
            lang="typescript"
            code={`// ── 1. 組件 Props 型別 ────────────────────────────
interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    children?: React.ReactNode;  // 可以接受任何 JSX 內容
}

function Button({ label, onClick, variant = 'primary', disabled }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}
        >
            {label}
        </button>
    );
}

// ── 2. useState 與 useRef ──────────────────────────
const [user, setUser] = useState<User | null>(null);
const inputRef = useRef<HTMLInputElement>(null);  // DOM 元素型別

// ── 3. Event 型別 ─────────────────────────────────
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // ...
}

// ── 4. 子組件傳遞 children ────────────────────────
interface CardProps {
    title: string;
    children: React.ReactNode;  // 最彈性的子組件型別
}

// ── 5. 非同步函數的回傳型別 ──────────────────────
async function loadData(): Promise<User[]> {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json() as Promise<User[]>;  // as 做型別斷言
}`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 嚴格模式 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900">tsconfig.json 嚴格模式：你應該開啟的選項</h2>

          <CodeBlock
            title="tsconfig.json 推薦設定"
            lang="json"
            code={`{
  "compilerOptions": {
    "strict": true,           // 開啟所有嚴格模式（強烈建議）
    // strict: true 等同於以下設定：
    // "noImplicitAny": true,         // 不允許隱式 any
    // "strictNullChecks": true,      // null 和 undefined 必須明確處理
    // "strictFunctionTypes": true,   // 函數型別嚴格檢查
    // "strictPropertyInitialization": true, // 類別屬性必須初始化

    "noUnusedLocals": true,    // 未使用的本地變數報錯
    "noUnusedParameters": true, // 未使用的函數參數報錯
    "noImplicitReturns": true,  // 函數所有路徑都必須有 return

    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "bundler",
    "jsx": "preserve"
  }
}`}
          />

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="font-black text-amber-800 mb-2 text-sm">最重要的：strictNullChecks</p>
            <CodeBlock
              title=""
              lang="typescript"
              code={`// strictNullChecks 開啟後
function getLength(str: string | null): number {
    // return str.length;  // ❌ 錯誤：str 可能是 null

    if (str === null) return 0;
    return str.length;     // ✅ TS 知道這裡 str 一定是 string（Narrowing）

    // 或用可選鏈
    return str?.length ?? 0;
}`}
            />
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 常見陷阱 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900">常見陷阱與最佳實踐</h2>
          <div className="space-y-4">
            {[
              {
                trap: '過度使用 any',
                bad: `const data: any = fetchSomething();  // 型別檢查被關閉`,
                good: `const data: unknown = fetchSomething();\nif (typeof data === 'object' && data !== null) { /* safe */ }`,
                tip: 'any 讓 TypeScript 沉默，但不能讓錯誤消失。用 unknown 強制自己做型別檢查。',
              },
              {
                trap: '型別斷言（as）的濫用',
                bad: `const user = data as User;  // 強制告訴 TS「相信我」，但可能錯`,
                good: `// 用型別守衛（Type Guard）更安全\nfunction isUser(obj: unknown): obj is User {\n  return typeof obj === 'object' && obj !== null && 'id' in obj;\n}`,
                tip: '型別斷言是「逃生艙」，不是正常手段。寧可用型別守衛。',
              },
              {
                trap: '忽略 API 回應的型別',
                bad: `const res = await fetch('/api/user');\nconst user = await res.json();  // user 是 any！`,
                good: `const res = await fetch('/api/user');\nconst user = await res.json() as User;  // 至少斷言\n// 更好：用 zod 或 superstruct 做 runtime 驗證`,
                tip: 'fetch 的 .json() 永遠回傳 any。考慮用 Zod 做 schema validation。',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gray-800 px-5 py-3">
                  <p className="font-black text-white text-sm">⚠️ 陷阱：{item.trap}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-0 divide-x divide-gray-100">
                  <div className="p-4">
                    <p className="text-xs font-black text-red-600 mb-2">❌ 常見寫法</p>
                    <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap leading-relaxed">{item.bad}</pre>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-black text-green-600 mb-2">✅ 更好的做法</p>
                    <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap leading-relaxed">{item.good}</pre>
                  </div>
                </div>
                <div className="bg-blue-50 px-5 py-2">
                  <p className="text-xs text-blue-700">💡 {item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zod 預覽 */}
        <div className="bg-violet-50 rounded-2xl p-5 border border-violet-200">
          <p className="font-black text-violet-800 mb-2 text-sm">進階：用 Zod 做 Runtime 型別驗證</p>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            TypeScript 型別在執行期消失，API 回應可能不符合你定義的型別。Zod 讓你同時得到「型別推斷」和「執行期驗證」：
          </p>
          <CodeBlock
            title=""
            lang="typescript"
            code={`import { z } from 'zod';

// 定義 schema（同時也是型別來源）
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;  // 從 schema 推斷 TypeScript 型別

// 執行期驗證 API 回應
const res = await fetch('/api/user');
const data = await res.json();
const user = UserSchema.parse(data);  // 若格式不符，丟出明確的錯誤訊息
// user 的型別是 User（TS 自動推斷）`}
          />
        </div>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-blue-700 to-indigo-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '🛡️', text: 'TypeScript 在編譯期發現錯誤，提供 IDE 自動補全，讓程式碼本身成為文件。' },
                { emoji: '🔤', text: '基礎型別包含 string / number / boolean / null / undefined，以及 Union（|）和 Literal 型別。善用型別推斷，不用每行都手動標注。' },
                { emoji: '📐', text: 'Interface 適合定義物件形狀，Type 適合 Union / Intersection 等複雜型別。保持專案風格一致比選哪個更重要。' },
                { emoji: '🔧', text: '泛型讓程式碼可重複使用：function<T>、interface Response<T>——在 React Hooks 和 API 呼叫中大量用到。' },
                { emoji: '⚙️', text: '開啟 strict: true（特別是 strictNullChecks），早期捕捉 null / undefined 錯誤。' },
                { emoji: '🚫', text: '避免 any，用 unknown 代替；型別斷言（as）只用在必要時；API 回應型別要明確定義。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep13-docker" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.13 — Docker 容器化</p>
            <p className="text-sm text-gray-500 mt-1">VM vs Container / Dockerfile / Compose</p>
          </Link>
          <Link href="/blog/web-dev/ep15-rest-api" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.15 — RESTful API 設計</p>
            <p className="text-sm text-gray-500 mt-1">URL、HTTP Method、狀態碼的藝術</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['TypeScript', 'Type System', 'Interface', 'Generics', 'React', 'strict mode', 'EP.14'].map(tag => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
