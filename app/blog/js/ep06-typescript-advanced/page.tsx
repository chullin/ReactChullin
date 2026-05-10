'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Eye,
  Code2,
  Layers,
  GitMerge,
  Braces,
  Puzzle,
  CheckCircle,
  Zap
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function JSEP06() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-blue-800 via-indigo-700 to-violet-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.06</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">JavaScript 系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              TypeScript 進階：泛型、<br />
              <span className="text-violet-300">Conditional Types、Utility Types 實戰</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              Generic Constraints、infer、Mapped Types、Template Literal — 從「加冒號」到真正的型別工程師
            </p>
            <div className="flex items-center gap-6 text-violet-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Generics · Conditional Types · Mapped Types · Template Literal</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：基礎泛型回顧與 Constraints ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Puzzle size={20} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 1：基礎泛型回顧與 Constraints</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            泛型（Generics）讓函式、介面、Class 可以接受「任意型別」的參數，同時保留型別資訊。
            但光是「任意型別」還不夠——很多時候你需要告訴 TypeScript：「T 可以是任何型別，但它<strong>必須符合某個形狀</strong>」。
            這就是 <strong>Generic Constraints</strong>（泛型約束）的用途。
          </p>

          <CodeBlock language="typescript">
{`   // ── 基礎泛型（你可能已知道）──
function identity<T>(arg: T): T {
  return arg;
}

// ❌ 問題：沒有 constraint，T 可以是任何型別
function getLength<T>(arg: T): number {
  return arg.length;  // TypeScript 錯誤！T 不一定有 length 屬性
}

// ✅ Constraint：T 必須有 length 屬性
// "extends" 在泛型 constraint 裡的意思是「T 的形狀必須包含這些欄位」
// 注意：這裡的 extends 和繼承不同，是「相容」的意思
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength("hello");      // ✅ string 有 length
getLength([1, 2, 3]);    // ✅ array 有 length
getLength({ length: 5 }); // ✅ 物件有 length
getLength(42);           // ❌ TypeScript 錯誤！number 沒有 length   `}
</CodeBlock>

          <div className="my-6">
            <p className="text-gray-700 font-bold mb-3">keyof constraint — 最常見的泛型用法</p>
            <p className="text-gray-600 text-sm mb-4">
              <code className="bg-gray-100 px-1.5 py-0.5 rounded">K extends keyof T</code> 確保你傳入的 key 必定是物件 T 上存在的欄位，
              回傳型別也能從 <code className="bg-gray-100 px-1.5 py-0.5 rounded">T[K]</code> 精確推導出來：
            </p>
          </div>

          <CodeBlock language="typescript">
{`   // 從物件中安全地取值
// K extends keyof T：K 只能是 T 的 key 之一
// 回傳型別 T[K]：TypeScript 知道取這個 key 會得到什麼型別
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Joseph', email: 'joseph@example.com' };

const name = getProperty(user, 'name');    // 型別推導為 string ✅
const id   = getProperty(user, 'id');      // 型別推導為 number ✅
const bad  = getProperty(user, 'phone');   // ❌ 編譯錯誤！'phone' 不是 keyof user

// 進階：多層 constraint
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => { result[key] = obj[key]; });
  return result;
}

const subset = pick(user, ['id', 'name']);
// 型別：{ id: number; name: string }（不包含 email）   `}
</CodeBlock>

          <Card className="border-0 shadow-sm bg-blue-50 mt-4">
            <CardBody className="p-4">
              <p className="text-blue-800 text-sm">
                <strong>為什麼不直接用 any？</strong> 用 any 等於告訴 TypeScript「不要管這裡的型別」。
                泛型讓你在「彈性」和「型別安全」之間取得平衡——函式可以接受多種型別，
                但 TypeScript 仍然知道每個位置的具體型別，不會讓你傳錯或取錯欄位。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：Conditional Types ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <GitMerge size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 2：Conditional Types — 型別的 if-else</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Conditional Types 讓型別系統擁有「條件判斷」能力，語法和三元運算子一模一樣，
            只是操作對象從「值」變成「型別」。
          </p>

          <CodeBlock language="typescript">
{`   // 基本語法：T extends U ? X : Y
// 「如果 T 相容於 U，則回傳 X，否則回傳 Y」
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
type C = IsString<'hello'>; // true（literal type 相容於 string）

// 實用例子：NonNullable（TypeScript 內建，這是它的實作）
type NonNullable<T> = T extends null | undefined ? never : T;
// never 在聯合型別中會被消除，所以 string | never = string

type D = NonNullable<string | null>;       // string
type E = NonNullable<string | undefined>;  // string
type F = NonNullable<null | undefined>;    // never（兩個都被過濾掉了）

// Distributive Conditional Types（聯合型別的魔法）
// 當 T 是聯合型別時，Conditional Type 會對每個成員分別計算再聯合
type ToArray<T> = T extends any ? T[] : never;

type G = ToArray<string | number>;
// 計算過程：(string extends any ? string[] : never) | (number extends any ? number[] : never)
// = string[] | number[]（不是 (string | number)[]，這是兩種不同的型別！）

// 如果你不想要 distributive 行為，用 tuple 包起來
type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never;
type H = ToArrayNonDistributive<string | number>;
// = (string | number)[]   `}
</CodeBlock>

          <div className="my-6">
            <p className="text-gray-700 font-bold mb-2">infer 關鍵字 — Conditional Types 的最強功能</p>
            <p className="text-gray-600 text-sm mb-4">
              <code className="bg-gray-100 px-1.5 py-0.5 rounded">infer</code> 讓你在 Conditional Types 的條件判斷中「捕獲」未知的型別，
              就像正則表達式中的捕獲組。這是實作 <code className="bg-gray-100 px-1.5 py-0.5 rounded">ReturnType</code>、
              <code className="bg-gray-100 px-1.5 py-0.5 rounded">Parameters</code> 等內建 Utility Types 的核心機制：
            </p>
          </div>

          <CodeBlock language="typescript">
{`   // 從函式型別中提取回傳型別（ReturnType 的實作原理）
// infer R：「如果 T 是函式，幫我把它的回傳型別命名為 R」
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type F1 = MyReturnType<() => string>;               // string
type F2 = MyReturnType<(x: number) => boolean>;     // boolean
type F3 = MyReturnType<() => Promise<User>>;        // Promise<User>

// 從函式型別中提取參數型別（Parameters 的實作原理）
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

type P1 = MyParameters<(a: string, b: number) => void>;
// [a: string, b: number]（Tuple 型別，保留參數名）

// 從 Promise 中提取內層型別
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type G1 = UnwrapPromise<Promise<string>>;    // string
type G2 = UnwrapPromise<string>;             // string（不是 Promise，直接回傳 T）
type G3 = UnwrapPromise<Promise<Promise<number>>>; // Promise<number>（只解一層）

// 遞迴解包（解所有層）
type DeepUnwrapPromise<T> = T extends Promise<infer U>
  ? DeepUnwrapPromise<U>
  : T;
type G4 = DeepUnwrapPromise<Promise<Promise<number>>>; // number

// 從陣列中提取元素型別
type ArrayElement<T> = T extends (infer E)[] ? E : never;
type H1 = ArrayElement<string[]>;          // string
type H2 = ArrayElement<[1, 'a', true]>;    // 1 | 'a' | true（Tuple 的聯合）   `}
</CodeBlock>

          <Card className="border-0 shadow-sm bg-indigo-50 mt-4">
            <CardBody className="p-4">
              <p className="text-indigo-800 text-sm">
                <strong>infer 只能在 extends 子句的右邊使用</strong>。它的作用是「讓 TypeScript 去推斷這個位置的型別，並給它一個名字」。
                如果條件成立（T extends ...），就可以在 true branch 使用這個名字（R、U、P、E 等）。
                如果條件不成立，就進入 false branch，這時候那個名字就不存在了。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Mapped Types ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-violet-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 3：Mapped Types — 批次轉換型別</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Mapped Types 讓你基於現有型別，批次生成新型別。語法像是在「遍歷」型別的所有 key，
            並對每個 key 的型別做變換——這就是 TypeScript 所有內建 Utility Types 的實作基礎。
          </p>

          <CodeBlock language="typescript">
{`   // Mapped Type 的基本語法：[K in keyof T]
// 對 T 的每個 key K，生成一個新的型別屬性

// Readonly<T>：所有 key 加上 readonly 修飾符
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Optional<T>：所有 key 加上 ? 修飾符（變為可選）
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// Nullable<T>：所有 value 允許 null
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// ── 結合 Conditional Types 做更複雜的轉換 ──

// DeepReadonly<T>：遞迴地讓所有層都變成 readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Config = {
  db: { host: string; port: number };
  cache: { ttl: number };
};

type ReadonlyConfig = DeepReadonly<Config>;
// 現在 ReadonlyConfig.db.host 也是 readonly，不只是第一層

// ── 過濾型別：只保留特定型別的 key ──
// 這個技巧很常見但很少人知道原理
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];
// 步驟解析：
// 1. 對每個 key，如果 value 是 string，保留 key 名（字串字面量型別），否則變成 never
// 2. [keyof T] 取所有 value 的聯合型別
// 3. never 在聯合型別中自動消除

type User = { id: number; name: string; email: string; createdAt: Date };
type StringUserKeys = StringKeys<User>;  // 'name' | 'email'

// 進一步：取出那些 string 型別的 key 對應的物件
type PickStringFields<T> = Pick<T, StringKeys<T>>;
type UserStringFields = PickStringFields<User>;
// { name: string; email: string }   `}
</CodeBlock>

          <div className="my-6">
            <p className="text-gray-700 font-bold mb-3">as 重新映射（TypeScript 4.1+）</p>
            <p className="text-gray-600 text-sm mb-4">
              TypeScript 4.1 加入了 <code className="bg-gray-100 px-1.5 py-0.5 rounded">as</code> 子句，讓你在 Mapped Type 中同時改變 key 的名稱：
            </p>
          </div>

          <CodeBlock language="typescript">
{`   // 把 key 改成 Getter 形式
// Capitalize<string & K> 確保 K 是 string，再把首字母大寫
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type User = { id: number; name: string; email: string };
type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

// 把 key 改成 Setter 形式
type Setters<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

// 用 as 來過濾 key（as never 等於移除這個 key）
type NonNullableProps<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

type MaybeUser = { id: number; name: string | null; email: string | undefined };
type StrictUser = NonNullableProps<MaybeUser>;
// { id: number }（name 和 email 因為含 null/undefined 被過濾掉）   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：Template Literal Types ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <Code2 size={20} className="text-cyan-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 4：Template Literal Types（模板字串型別）</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Template Literal Types（TypeScript 4.1+）讓你用字串模板的語法，從現有的 string literal 型別組合出新的型別。
            結合 Mapped Types，可以自動生成大量型別，大幅減少手動維護的工作量。
          </p>

          <CodeBlock language="typescript">
{`   // 基本用法：組合 string literal
type EventName = 'click' | 'focus' | 'blur';

// Capitalize<S>：把 S 的首字母大寫（內建 Utility Type）
type Handler = \`on\${Capitalize<EventName>}\`;
// 'onClick' | 'onFocus' | 'onBlur'

// ── 實用：建立 CSS 單位型別 ──
type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'vh' | 'vw';
type CSSValue = \`\${number}\${CSSUnit}\`;

const size: CSSValue = '16px';   // ✅
const rem: CSSValue  = '1.5rem'; // ✅
const bad: CSSValue  = '16';     // ❌ 缺少單位
const bad2: CSSValue = 'large';  // ❌ 不是 number 開頭

// ── 路由型別：防止打錯路徑 ──
type Routes = '/home' | '/about' | '/blog';
type ApiRoutes = \`/api\${Routes}\`;
// '/api/home' | '/api/about' | '/api/blog'

// 使用情境：API 函式的路由參數自動有提示
function apiCall(route: ApiRoutes) { /* ... */ }
apiCall('/api/home');   // ✅
apiCall('/api/users');  // ❌ TypeScript 錯誤，'/api/users' 不在型別中

// ── 進階：深層 key 路徑（用在表單驗證、i18n 等場景）──
type DeepKeys<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends object
    ? DeepKeys<T[K], \`\${P}\${K}.\`>  // 繼續遞迴，在 key 後面加 "."
    : \`\${P}\${K}\`;                   // 葉節點，回傳完整路徑字串
}[keyof T & string];

type Config = {
  db: { host: string; port: number };
  cache: { ttl: number };
};

type ConfigKeys = DeepKeys<Config>;
// 'db.host' | 'db.port' | 'cache.ttl'

// 結合 get 函式：型別安全的深層取值
declare function getConfig<K extends ConfigKeys>(key: K): string;
getConfig('db.host');    // ✅
getConfig('db.invalid'); // ❌

// ── 事件系統：自動生成 on/off 方法型別 ──
type EventMap = {
  'user:login': { userId: string };
  'user:logout': { userId: string };
  'payment:complete': { amount: number };
};

type EventEmitterOn = {
  [K in keyof EventMap as \`on\${Capitalize<string & K>}\`]:
    (handler: (data: EventMap[K]) => void) => void;
};

// EventEmitterOn = {
//   onUserLogin: (handler: (data: { userId: string }) => void) => void;
//   onUserLogout: (handler: (data: { userId: string }) => void) => void;
//   onPaymentComplete: (handler: (data: { amount: number }) => void) => void;
// }   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：Utility Types 深度解析 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Braces size={20} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 5：常用 Utility Types 深度解析</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            TypeScript 內建了許多 Utility Types，多數人只知道「可以用 Partial」，但不知道它是怎麼實作的。
            理解原理可以讓你在需要時組合出自己的 Utility Types，而不是只靠記憶。
          </p>

          <CodeBlock language="typescript">
{`   // ── 以下是 TypeScript 內建 Utility Types 的實作原理 ──

// Pick<T, K>：只取需要的 key
// K extends keyof T 確保 K 是 T 的有效 key
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit<T, K>：排除特定 key
// 先用 Exclude 算出「T 的 key 去掉 K 之後剩哪些」，再 Pick 那些 key
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Partial<T>：所有 key 變可選
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Required<T>：所有 key 變必填
// -? 是「移除可選標記」的語法（相對於 ? 是「加上可選」）
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Readonly<T>：所有 key 變唯讀（-readonly 可以移除 readonly）
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Record<K, V>：創建 key-value 映射
// K extends keyof any 表示 K 可以是任何合法的物件 key（string | number | symbol）
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// Extract<T, U>：從聯合型別中提取符合的型別
// 利用 Distributive Conditional Types：對 T 的每個成員判斷
type Extract<T, U> = T extends U ? T : never;
type F1 = Extract<'a' | 'b' | 'c', 'a' | 'c'>;  // 'a' | 'c'
type F2 = Extract<string | number | boolean, string | number>; // string | number

// Exclude<T, U>：從聯合型別中排除符合的型別
type Exclude<T, U> = T extends U ? never : T;
type G1 = Exclude<'a' | 'b' | 'c', 'a' | 'c'>;  // 'b'
type G2 = Exclude<string | number | null, null>;   // string | number   `}
</CodeBlock>

          <div className="my-6">
            <p className="text-gray-700 font-bold mb-3">實用組合：DTO 型別生成</p>
            <p className="text-gray-600 text-sm mb-4">
              Utility Types 的真正威力在於組合使用。以下是實際後端開發中常見的型別設計：
            </p>
          </div>

          <CodeBlock language="typescript">
{`   type User = {
  id: number;
  name: string;
  email: string;
  password: string;   // 絕對不能回傳給前端！
  createdAt: Date;
  updatedAt: Date;
};

// API 回傳：去掉 password 和時間戳（前端不需要）
type UserDto = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
// { id: number; name: string; email: string }

// 更新操作：id 必填（定位哪個 user），其他都是可選（只更新有傳的欄位）
type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> & { id: number };
// { id: number; name?: string; email?: string; password?: string }

// 建立操作：id 和時間戳由系統生成，password 必填
type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
// { name: string; email: string; password: string }

// API Response 泛型包裝
type ApiResponse<T> = {
  data: T;
  meta: { total: number; page: number; pageSize: number };
  timestamp: Date;
};

// 使用
type UsersListResponse = ApiResponse<UserDto[]>;
// {
//   data: UserDto[];
//   meta: { total: number; page: number; pageSize: number };
//   timestamp: Date;
// }

// Readonly + 深層：API 回傳的資料不應該被修改
function fetchUser(id: number): Promise<Readonly<UserDto>> {
  return fetch(\`/api/users/\${id}\`).then(r => r.json());
}

const user = await fetchUser(1);
user.name = 'hacked';  // ❌ TypeScript 錯誤！回傳值是 readonly   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：Discriminated Union ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-rose-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 6：Discriminated Union — 更安全的狀態建模</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            狀態管理是前端開發最常踩坑的地方之一。Discriminated Union（可辨識聯合）讓每個狀態都是獨立且完整的，
            TypeScript 可以精確地在每個分支推導出正確的型別，消除「狀態不一致」的 bug。
          </p>

          <CodeBlock language="typescript">
{`   // ── ❌ 容易出 bug 的傳統做法 ──
type LoadingState = {
  isLoading: boolean;
  data: User | null;
  error: string | null;
};

// 問題：可以同時處於矛盾的狀態
const badState: LoadingState = {
  isLoading: true,
  data: someUser,     // 如果還在 loading，怎麼可能有 data？
  error: 'oops',      // 如果有 data，怎麼還有 error？
};
// TypeScript 不會報錯——因為型別本身就允許這種不合理的組合

// ── ✅ Discriminated Union：每個狀態都是唯一且完整的 ──
// 共同的 "status" 欄位就是 discriminant（鑑別符）
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }   // 只有 success 才有 data
  | { status: 'error'; error: string }; // 只有 error 才有 error message

// 使用 switch 做 Exhaustive Check（窮舉檢查）
function renderState(state: LoadingState): string {
  switch (state.status) {
    case 'idle':
      return '等待中';
    case 'loading':
      return '載入中...';
    case 'success':
      // 這個分支裡，TypeScript 知道 state 是 { status: 'success'; data: User }
      // 所以 state.data 有完整的 User 型別！
      return \`歡迎，\${state.data.name}\`;
    case 'error':
      // 這個分支裡，TypeScript 知道 state 是 { status: 'error'; error: string }
      return \`錯誤：\${state.error}\`;
    default:
      // Exhaustive Check：這裡的 state 型別應該是 never
      // 如果你新增了一個 status 但忘了加 case，TypeScript 就會報錯
      const _exhaustive: never = state;
      throw new Error(\`未處理的狀態：\${JSON.stringify(_exhaustive)}\`);
  }
}

// ── React 實際使用例子 ──
function UserProfile({ userId }: { userId: number }) {
  const [state, setState] = React.useState<LoadingState>({ status: 'idle' });

  React.useEffect(() => {
    setState({ status: 'loading' });

    fetchUser(userId)
      .then(data => setState({ status: 'success', data }))
      .catch(err => setState({ status: 'error', error: err.message }));
  }, [userId]);

  // switch 讓每個 case 都有精確的型別，沒有 null check 問題
  switch (state.status) {
    case 'idle':    return <div>請點擊載入</div>;
    case 'loading': return <Spinner />;
    case 'success': return <div>{state.data.name}</div>;  // state.data 有型別！
    case 'error':   return <div>錯誤：{state.error}</div>;
  }
}   `}
</CodeBlock>

          <div className="mt-8 overflow-x-auto rounded-xl shadow-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 text-white">
                  <th className="px-5 py-3 text-left font-bold">技術</th>
                  <th className="px-5 py-3 text-left font-bold">常見用途</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Generic Constraints', 'API 工具函式、React Hooks（useLocalStorage、useFetch）'],
                  ['Conditional Types', '型別工具函式、infer 提取函式回傳型別 / Promise 內層型別'],
                  ['Mapped Types', 'DTO 轉換（Partial / Required）、Readonly 包裝、過濾 key'],
                  ['Template Literal', '路由型別、Event Handler 名稱、CSS 值約束'],
                  ['Discriminated Union', '狀態機、API Response 建模、Redux action 型別'],
                  ['Utility Types', '每天都在用，要背起來（Partial、Pick、Omit、Record 最常見）'],
                ].map(([tech, usage], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-5 py-3 font-semibold text-indigo-700 whitespace-nowrap">{tech}</td>
                    <td className="px-5 py-3 text-gray-600">{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card className="border-0 shadow-md bg-gradient-to-r from-blue-800 via-indigo-700 to-violet-700 text-white mt-6">
            <CardBody className="p-6">
              <p className="font-bold text-lg mb-3 text-violet-200">從「加冒號」到型別工程師的分水嶺</p>
              <div className="space-y-2 text-blue-100 text-sm">
                <p className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-violet-300 mt-0.5 shrink-0" />
                  <span><strong>初級</strong>：會用 <code className="bg-white/10 px-1 rounded">interface</code>、<code className="bg-white/10 px-1 rounded">type</code>、基本 <code className="bg-white/10 px-1 rounded">generics</code>，讓 TypeScript 不報紅線</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-violet-300 mt-0.5 shrink-0" />
                  <span><strong>中級</strong>：會用 Utility Types（Partial、Pick、Omit），設計合理的 DTO 型別，用 Discriminated Union 建模狀態</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-violet-300 mt-0.5 shrink-0" />
                  <span><strong>進階</strong>：能用 Conditional Types + infer 設計型別工具函式，用 Mapped Types + Template Literal 自動生成大量型別，型別系統本身就是文件</span>
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-2">
            {[
              'TypeScript',
              'Generics',
              'Conditional Types',
              'Mapped Types',
              'Utility Types',
              'Advanced TypeScript',
            ].map(tag => (
              <Chip
                key={tag}
                variant="flat"
                color="secondary"
                size="sm"
                className="text-xs font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.section>

        {/* ── Navigation ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Link href="/blog/js/promise-async">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span>上一篇</span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">EP.05 Promise & Async/Await</p>
                  <p className="text-gray-500 text-xs mt-1">非同步程式設計完全指南</p>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/js/ep01-js-basics">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardBody className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-500 text-xs mb-2">
                    <span>回到系列起點</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="font-bold text-gray-900 text-sm">EP.01 JS 基礎</p>
                  <p className="text-gray-500 text-xs mt-1">從頭理解 JavaScript 核心概念</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
