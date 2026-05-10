'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Radio,
  Shuffle,
  Factory,
  Gem,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function JSEP07() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-fuchsia-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-violet-800 via-purple-700 to-fuchsia-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.07</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">JavaScript 系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              JavaScript 設計模式：<br />
              <span className="text-fuchsia-300">Observer、Strategy、Factory 實戰</span>
            </h1>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl">
              三個最常被問到的設計模式 — 用 React 的真實場景帶你理解「為什麼」而非死背
            </p>
            <div className="flex items-center gap-6 text-fuchsia-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Observer · Strategy · Factory · Singleton</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：為什麼要學設計模式 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
              <Lightbulb size={20} className="text-violet-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 1：為什麼要學設計模式</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            設計模式（Design Patterns）是「前人總結的最佳實踐」。它們不是為了用而用，
            而是針對特定問題的成熟解法。重要的是，你不需要背起來每一個模式——你需要的是當問題出現時，
            知道有這類解法的存在。
          </p>

          <Card className="border border-violet-200 bg-violet-50 mb-6">
            <CardBody className="p-5">
              <p className="text-violet-800 text-base font-medium italic leading-relaxed">
                「設計模式就像烹飪食譜。你不需要背起來，但當你遇到相同問題時，知道有這個食譜存在就夠了。」
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800 mb-4">最常見的學習誤區</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border border-red-200 bg-red-50">
              <CardBody className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-red-700 mb-1">❌ 錯誤思維</p>
                    <p className="text-red-600 text-sm">「這段程式碼要套哪個 Pattern？」</p>
                    <p className="text-red-500 text-xs mt-1">從 Pattern 出發，強行套用，反而讓程式碼變複雜</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border border-green-200 bg-green-50">
              <CardBody className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-green-700 mb-1">✅ 正確思維</p>
                    <p className="text-green-600 text-sm">「我遇到了什麼問題？有沒有成熟的解法？」</p>
                    <p className="text-green-500 text-xs mt-1">從問題出發，Pattern 只是工具，不是目的</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <p className="text-gray-700 leading-relaxed">
            這篇文章選了面試最高頻的四個模式：Observer、Strategy、Factory、Singleton。
            每個都會先說「問題是什麼」，再帶出「Pattern 怎麼解決它」，最後給出 React 中的實際應用。
          </p>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：Observer Pattern ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Radio size={20} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 2：Observer Pattern（觀察者模式）</h2>
          </div>

          <Card className="border border-purple-200 bg-purple-50 mb-6">
            <CardBody className="p-5">
              <p className="text-purple-800 font-semibold">
                核心問題：如何讓多個「訂閱者」在某個事件發生時自動收到通知，而不需要讓發布者知道有哪些訂閱者？
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800 mb-3">你在 React 中已經在用 Observer 了</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">useEffect</code> 的 deps array — 觀察資料變化，當依賴改變時觸發</li>
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Redux store + useSelector</code> — store 是 Subject，每個 selector 是 Observer</li>
            <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">EventEmitter（Node.js）</code> — 最經典的 Observer 實作</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-800 mb-3">從零實作 TypeScript 型別安全的 EventEmitter</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            下面這個實作有幾個設計亮點：泛型讓事件名稱和 payload 都有型別推斷、
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">on()</code> 回傳取消訂閱函式避免 memory leak、
            完整的 TypeScript 泛型約束確保你不會傳錯 payload。
          </p>

          <CodeBlock language="typescript">
{` class EventEmitter<Events extends Record<string, any>> {
  private listeners: Partial<{
    [K in keyof Events]: Array<(data: Events[K]) => void>;
  }> = {};

  on<K extends keyof Events>(
    event: K,
    callback: (data: Events[K]) => void
  ) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(callback);

    // 回傳取消訂閱函式（非常重要！防止 memory leak）
    return () => this.off(event, callback);
  }

  off<K extends keyof Events>(
    event: K,
    callback: (data: Events[K]) => void
  ) {
    this.listeners[event] = this.listeners[event]?.filter(
      (cb) => cb !== callback
    );
  }

  emit<K extends keyof Events>(event: K, data: Events[K]) {
    this.listeners[event]?.forEach((cb) => cb(data));
  }
}

// ── 定義應用的事件型別 ──
type AppEvents = {
  'user:login': { userId: string; email: string };
  'cart:add': { productId: string; qty: number };
  'order:placed': { orderId: string; total: number };
};

const eventBus = new EventEmitter<AppEvents>();

// ── 訂閱（Analytics Service）──
const unsubscribe = eventBus.on('user:login', ({ userId }) => {
  analytics.track('login', { userId });
});

// ── 訂閱（Notification Service）──
eventBus.on('order:placed', ({ orderId, total }) => {
  sendEmail({ subject: \\`訂單 \\${orderId} 確認\\`, total });
});

// ── 發布事件（所有訂閱者自動收到通知）──
eventBus.emit('user:login', { userId: '123', email: 'joe@example.com' });

// ── 組件卸載時取消訂閱 ──
useEffect(() => {
  const unsub = eventBus.on('user:login', handler);
  return () => unsub(); // cleanup
}, []); `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-3">React Custom Hook 版本</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            在 React 中，通常會把 EventEmitter 放進 Ref 裡，確保同一個元件生命週期內是同一個實例。
          </p>

          <CodeBlock language="typescript">
{` import { useRef, useEffect } from 'react';

function useEventEmitter<Events extends Record<string, any>>() {
  const emitterRef = useRef(new EventEmitter<Events>());
  return emitterRef.current;
}

// 使用方式
function ChatRoom() {
  const emitter = useEventEmitter<{
    'message:receive': { text: string; sender: string };
    'user:join': { name: string };
  }>();

  useEffect(() => {
    // 訂閱訊息
    const unsub1 = emitter.on('message:receive', ({ text, sender }) => {
      setMessages((prev) => [...prev, { text, sender }]);
    });

    const unsub2 = emitter.on('user:join', ({ name }) => {
      setNotifications((prev) => [...prev, \\`\\${name} 加入了聊天室\\`]);
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, [emitter]);
} `}
</CodeBlock>

          <Card className="border border-purple-100 bg-gradient-to-r from-purple-50 to-fuchsia-50 mt-6">
            <CardBody className="p-4">
              <p className="text-purple-700 text-sm">
                <strong>Observer 的核心價值：</strong>發布者（Publisher）和訂閱者（Subscriber）完全解耦。
                發布者不需要知道有誰在訂閱，新增訂閱者完全不影響發布者的程式碼。
                這就是「Open for extension, Closed for modification」（開放封閉原則）的體現。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Strategy Pattern ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-fuchsia-100 rounded-xl flex items-center justify-center">
              <Shuffle size={20} className="text-fuchsia-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 3：Strategy Pattern（策略模式）</h2>
          </div>

          <Card className="border border-fuchsia-200 bg-fuchsia-50 mb-6">
            <CardBody className="p-5">
              <p className="text-fuchsia-800 font-semibold">
                核心問題：同一個操作有多種實作方式，如何在執行時動態切換，而不需要修改呼叫端的程式碼？
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800 mb-3">常見場景</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {[
              '不同支付方式（信用卡、LINE Pay、街口）',
              '不同排序演算法（快速排序、合併排序）',
              '不同驗證策略（Email、Phone、Social Login）',
              '不同資料壓縮格式（ZIP、GZIP、BZIP2）',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                <CheckCircle size={16} className="text-fuchsia-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-3">❌ 沒有 Strategy Pattern（if-else 地獄）</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            每加一種支付方式，這個函式就越來越複雜、越來越難測試，最終變成一個誰都不敢改的巨大函式。
          </p>

          <CodeBlock language="typescript">
{` function processPayment(method: string, amount: number) {
  if (method === 'credit') {
    // 100 行信用卡邏輯...
    // 驗證卡號、呼叫 Stripe API、處理 3D Secure...
  } else if (method === 'linepay') {
    // 80 行 LINE Pay 邏輯...
    // 跳轉 LINE Pay 頁面、等 callback、驗簽...
  } else if (method === 'jkos') {
    // 90 行街口邏輯...
    // 街口 SDK 初始化、QR Code 生成...
  } else if (method === 'apple_pay') {
    // 每加一種支付方式，這個函式就更複雜
    // 而且改一個 if-else 可能影響其他分支
  }
} `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-3">✅ Strategy Pattern</h3>

          <CodeBlock language="typescript">
{` // 1. 定義策略介面（Interface）
interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>;
  validate(cardData: any): boolean;
}

// 2. 各自實作具體策略
class CreditCardStrategy implements PaymentStrategy {
  constructor(private cardNumber: string, private cvv: string) {}

  validate() {
    return this.cardNumber.length === 16 && this.cvv.length === 3;
  }

  async pay(amount: number) {
    const response = await fetch('/api/payment/credit', {
      method: 'POST',
      body: JSON.stringify({ cardNumber: this.cardNumber, amount }),
    });
    return response.json();
  }
}

class LinePayStrategy implements PaymentStrategy {
  validate() {
    return true; // LINE Pay 不需要預先驗證
  }

  async pay(amount: number) {
    return await linePaySDK.charge(amount);
  }
}

class JkosStrategy implements PaymentStrategy {
  validate() { return true; }

  async pay(amount: number) {
    return await jkosSDK.createOrder(amount);
  }
}

// 3. Context（上下文）持有策略，並提供統一介面
class PaymentContext {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  async checkout(amount: number) {
    if (!this.strategy.validate({})) throw new Error('付款資料驗證失敗');
    return this.strategy.pay(amount);
  }
}

// ── 使用 ──
const payment = new PaymentContext(new CreditCardStrategy('4111111111111111', '123'));
await payment.checkout(1000);

// 切換策略（核心邏輯完全不用動）
payment.setStrategy(new LinePayStrategy());
await payment.checkout(1000);

// 新增支付方式只需要新增一個 class，不修改任何現有程式碼
payment.setStrategy(new JkosStrategy());
await payment.checkout(1000); `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-3">React 中的 Strategy Pattern</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            在函式型程式設計（Functional Programming）中，Strategy 就是把「函式當作參數傳遞」。
            React 的 Hook 很適合這個模式。
          </p>

          <CodeBlock language="tsx">
{` // ── 定義不同的「篩選策略」（函式即策略）──
type FilterStrategy = (items: Product[], query: string) => Product[];

const exactMatch: FilterStrategy = (items, q) =>
  items.filter((i) => i.name.toLowerCase() === q.toLowerCase());

const fuzzyMatch: FilterStrategy = (items, q) =>
  items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));

const tagMatch: FilterStrategy = (items, q) =>
  items.filter((i) => i.tags.includes(q));

// ── 元件中動態切換策略 ──
function ProductSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [strategy, setStrategy] = useState<FilterStrategy>(() => fuzzyMatch);

  // strategy 改變時，結果自動重新計算
  const results = useMemo(
    () => strategy(products, query),
    [strategy, products, query]
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={() => setStrategy(() => fuzzyMatch)}>模糊搜尋</button>
        <button onClick={() => setStrategy(() => exactMatch)}>精確搜尋</button>
        <button onClick={() => setStrategy(() => tagMatch)}>標籤搜尋</button>
      </div>
      {results.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
} `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：Factory Pattern ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
              <Factory size={20} className="text-violet-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 4：Factory Pattern（工廠模式）</h2>
          </div>

          <Card className="border border-violet-200 bg-violet-50 mb-6">
            <CardBody className="p-5">
              <p className="text-violet-800 font-semibold">
                核心問題：建立物件的邏輯複雜，或需要根據條件建立不同類型的物件時，
                如何讓呼叫端不需要知道建立細節？
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800 mb-3">常見場景</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>根據環境建立不同的 Logger（dev console vs prod Datadog）</li>
            <li>根據角色建立不同的 User 物件（Admin vs Guest vs Member）</li>
            <li>根據設定建立不同的資料庫連線（PostgreSQL vs SQLite）</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-800 mb-3">Simple Factory — Logger 範例</h3>

          <CodeBlock language="typescript">
{` type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// 定義 Logger 介面
interface Logger {
  log(level: LogLevel, message: string): void;
}

// 各種具體 Logger
class ConsoleLogger implements Logger {
  log(level: LogLevel, message: string) {
    const colors = {
      debug: '\x1b[36m',
      info: '\x1b[32m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
    };
    console.log(\\`\\${colors[level]}[\\${level.toUpperCase()}] \\${message}\x1b[0m\\`);
  }
}

class DatadogLogger implements Logger {
  log(level: LogLevel, message: string) {
    datadogLogs.logger[level](message);
  }
}

class SilentLogger implements Logger {
  log() {}  // 測試環境完全不輸出（避免污染測試輸出）
}

// ── Factory Function（工廠函式）──
function createLogger(env: string): Logger {
  switch (env) {
    case 'production':
      return new DatadogLogger();
    case 'test':
      return new SilentLogger();
    default:
      return new ConsoleLogger();
  }
}

// ── 使用（呼叫端不需要知道 Logger 的具體型別）──
const logger = createLogger(process.env.NODE_ENV ?? 'development');
logger.log('info', '伺服器啟動完成');
logger.log('error', '資料庫連線失敗');

// 換環境完全不影響呼叫端的程式碼 `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-3">React 中的 Factory Pattern</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            動態表單是 Factory Pattern 在 React 中最典型的應用場景。
            後端傳來欄位設定，前端透過 Factory 元件決定渲染哪種輸入元件。
          </p>

          <CodeBlock language="tsx">
{` // 欄位設定的聯合型別（Discriminated Union）
type FieldConfig =
  | { type: 'text'; label: string; placeholder?: string }
  | { type: 'select'; label: string; options: { value: string; label: string }[] }
  | { type: 'checkbox'; label: string }
  | { type: 'textarea'; label: string; rows?: number };

// Form Field Factory Component
function FormFieldFactory({
  config,
  value,
  onChange,
}: {
  config: FieldConfig;
  value: any;
  onChange: (val: any) => void;
}) {
  switch (config.type) {
    case 'text':
      return (
        <TextInput
          label={config.label}
          placeholder={config.placeholder}
          value={value}
          onChange={onChange}
        />
      );
    case 'select':
      return (
        <SelectInput
          label={config.label}
          options={config.options}
          value={value}
          onChange={onChange}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          label={config.label}
          checked={value}
          onChange={onChange}
        />
      );
    case 'textarea':
      return (
        <Textarea
          label={config.label}
          rows={config.rows ?? 4}
          value={value}
          onChange={onChange}
        />
      );
  }
}

// ── 使用（後端來的欄位設定直接驅動 UI）──
function DynamicForm({ schema }: { schema: FieldConfig[] }) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  return (
    <form>
      {schema.map((fieldConfig, index) => (
        <FormFieldFactory
          key={index}
          config={fieldConfig}
          value={formData[fieldConfig.label]}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, [fieldConfig.label]: val }))
          }
        />
      ))}
    </form>
  );
} `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：Singleton Pattern ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-fuchsia-100 rounded-xl flex items-center justify-center">
              <Gem size={20} className="text-fuchsia-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 5：Singleton Pattern（單例模式）</h2>
          </div>

          <Card className="border border-fuchsia-200 bg-fuchsia-50 mb-6">
            <CardBody className="p-5">
              <p className="text-fuchsia-800 font-semibold">
                核心問題：整個應用只需要一個實例（例如資料庫連線池、設定管理、全域狀態），
                如何確保不會意外建立多個？
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800 mb-3">❌ 沒有 Singleton 的問題</h3>

          <CodeBlock language="typescript">
{` // ❌ 每次呼叫都建立新的連線池——極其浪費資源
async function getUser(id: string) {
  const db = new Database(process.env.DB_URL);  // 每次 API 呼叫都建立新連線！
  return db.query('SELECT * FROM users WHERE id = $1', [id]);
}
// 如果同時有 1000 個請求，就會有 1000 個資料庫連線 `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">✅ Singleton Pattern</h3>

          <CodeBlock language="typescript">
{` class DatabaseConnection {
  // private static 確保只有一個 instance
  private static instance: DatabaseConnection | null = null;
  private pool: Pool;

  // private constructor 防止外部用 new 建立
  private constructor() {
    this.pool = new Pool({
      connectionString: process.env.DB_URL,
      max: 20,          // 最多 20 個連線
      idleTimeoutMillis: 30000,
    });
  }

  // 唯一的建立入口
  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
      console.log('資料庫連線池初始化完成');
    }
    return DatabaseConnection.instance;
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sql, params);
      return result.rows;
    } finally {
      client.release(); // 歸還連線到 pool
    }
  }

  async transaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await fn(client);
      await client.query('COMMIT');
      return result;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

// ── 使用（不論在哪個檔案呼叫，都是同一個連線池）──
const db = DatabaseConnection.getInstance();
const users = await db.query<User>('SELECT * FROM users WHERE id = $1', [userId]);

// 在另一個 API route 也是同一個 instance
const db2 = DatabaseConnection.getInstance();
console.log(db === db2);  // true

// ── Next.js / Node.js 環境中更常見的做法（module 層級單例）──
// db.ts
let instance: PrismaClient | null = null;

export function getPrismaClient() {
  if (!instance) {
    instance = new PrismaClient();
  }
  return instance;
}
// module 本身就是 Singleton，Node.js 會 cache module `}
</CodeBlock>

          <Card className="border border-amber-100 bg-amber-50 mt-6">
            <CardBody className="p-4">
              <p className="text-amber-800 text-sm">
                <strong>注意：</strong>Singleton 在多執行緒環境需要額外的「雙重檢查鎖定」處理，
                但在 Node.js 單執行緒環境中不需要擔心這個問題。
                在 React 前端，全域狀態管理（Redux store、Zustand store）本質上也是 Singleton。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：面試情境 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <MessageSquare size={20} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 6：實際面試情境</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            面試中被問到「請解釋一個你用過的設計模式」是高頻題，關鍵是要用「STAR 法則」回答：
            Situation（情境）、Task（任務）、Action（你的解法）、Result（結果）。
          </p>

          <Card className="border border-purple-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 mb-6">
            <CardBody className="p-6">
              <p className="font-bold text-gray-800 mb-3">問：「請解釋一個你用過的設計模式」</p>
              <div className="bg-white border border-purple-100 rounded-xl p-4">
                <p className="text-gray-700 leading-loose text-sm">
                  「在我的電商專案中，我使用了 <strong>Strategy Pattern</strong> 來處理不同的支付方式。
                  <br /><br />
                  問題是最初用 if-else 寫，每次要加新的支付方式就要修改核心函式，
                  每次改動都有可能影響其他支付方式的邏輯，也很難寫單元測試。
                  <br /><br />
                  我改成 Strategy Pattern 後，每種支付方式是獨立的 class，都實作同一個
                  <code className="bg-purple-100 px-1 rounded">PaymentStrategy</code> 介面。
                  加新的支付方式只需要新增一個 class，核心的 PaymentContext 完全不用動——
                  符合開放封閉原則。
                  <br /><br />
                  測試也更容易——每個策略可以獨立做單元測試，測試信用卡策略時不需要顧慮 LINE Pay 的邏輯。」
                </p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800 mb-4">四個模式的選擇指引</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                pattern: 'Observer',
                use: '需要「一對多通知」，發布者不需要知道訂閱者',
                example: 'EventBus、DOM addEventListener、Redux',
                color: 'purple',
              },
              {
                pattern: 'Strategy',
                use: '同一個操作有多種算法/實作，需要執行時切換',
                example: '支付方式、排序算法、認證策略',
                color: 'fuchsia',
              },
              {
                pattern: 'Factory',
                use: '建立邏輯複雜，或需要根據條件建立不同型別',
                example: 'Logger、動態表單、資料庫連線',
                color: 'violet',
              },
              {
                pattern: 'Singleton',
                use: '整個應用只需要一個實例，避免重複建立',
                example: '資料庫連線池、設定管理、全域 store',
                color: 'purple',
              },
            ].map((item) => (
              <Card key={item.pattern} className={`border border-${item.color}-200`}>
                <CardBody className="p-4">
                  <p className={`font-black text-${item.color}-700 text-lg mb-1`}>{item.pattern}</p>
                  <p className="text-gray-600 text-sm mb-2">{item.use}</p>
                  <p className="text-gray-400 text-xs">例：{item.example}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ── */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {['Design Patterns', 'Observer', 'Strategy', 'Factory', 'Singleton', 'JavaScript', 'TypeScript'].map((tag) => (
            <Chip
              key={tag}
              size="sm"
              variant="flat"
              className="bg-violet-100 text-violet-700"
            >
              {tag}
            </Chip>
          ))}
        </motion.div>

        {/* ── Navigation ── */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
        >
          <Link href="/blog/js/ep06-typescript-advanced">
            <Card className="border border-gray-200 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer">
              <CardBody className="p-4">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <ArrowLeft size={16} />
                  <span className="text-xs">前一篇</span>
                </div>
                <p className="font-bold text-gray-800 text-sm">EP.06 TypeScript 進階</p>
                <p className="text-gray-500 text-xs">泛型、Conditional Types、Utility Types 實戰</p>
              </CardBody>
            </Card>
          </Link>

          <Link href="/blog/js/ep01-js-basics">
            <Card className="border border-gray-200 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer">
              <CardBody className="p-4 text-right">
                <div className="flex items-center justify-end gap-2 text-gray-500 mb-1">
                  <span className="text-xs">下一篇</span>
                  <ArrowRight size={16} />
                </div>
                <p className="font-bold text-gray-800 text-sm">EP.01 JS 基礎</p>
                <p className="text-gray-500 text-xs">var / let / const、Hoisting、Closure</p>
              </CardBody>
            </Card>
          </Link>
        </motion.div>

      </article>
    </div>
  );
}
