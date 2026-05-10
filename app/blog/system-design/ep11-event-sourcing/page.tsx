'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Database,
  GitCommit,
  Layers,
  Repeat,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  RefreshCw,
  BookOpen
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function SystemDesignEP11() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-violet-800 via-purple-700 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.11</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">系統設計系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Event Sourcing 與 CQRS：<br />
              <span className="text-violet-200">用事件重建一切</span>
            </h1>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl">
              Event Store、Command/Query 分離、Projection 重建 — 金融、電商最愛的資料架構模式
            </p>
            <div className="flex items-center gap-6 text-violet-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Event Sourcing · CQRS · Projection · Aggregate</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：傳統資料庫的問題 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
              <Database size={20} className="text-violet-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 1：傳統資料庫的問題</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            你有沒有遇過這種情境：用戶打電話來說「我沒有取消訂單！」，但你打開資料庫一看，
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">status = CANCELLED</code>。
            你知道這個狀態是錯的，但你完全不知道它是什麼時候、被誰、基於什麼原因改掉的。
            傳統 CRUD 架構的核心問題就是：它只儲存「此刻的狀態」，歷史資訊永遠消失。
          </p>

          <Card className="border border-red-200 bg-red-50">
            <CardBody className="p-5">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-600" />
                傳統 CRUD 的痛點（以電商訂單為例）
              </h3>
              <CodeBlock language="text">
{`   傳統方式：資料庫永遠只存「最新狀態」
orders 表：
  id: 123
  status: "SHIPPED"  ← 但我怎麼知道訂單之前是什麼狀態？
  total: 1500
  updatedAt: 2026-05-07

問題：
  - 用戶說「我沒有取消訂單」，但資料庫說 status = CANCELLED
  - 無法重播過去的業務邏輯
  - 審計日誌需要額外設計
  - 多個微服務的資料同步複雜   `}
</CodeBlock>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed">
            這些問題在一般的 CRUD 應用裡可能還撐得住。但在金融系統、電商平台、醫療記錄等
            「每一個操作都必須可追溯」的場景中，傳統架構就會讓你付出慘痛代價——
            不是被法規罰款，就是面對一個你完全無法解釋的「資料為什麼變成這樣」的謎題。
          </p>

          <Card className="border border-green-200 bg-green-50">
            <CardBody className="p-5">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Event Sourcing 的核心思想
              </h3>
              <CodeBlock language="text">
{`   Event Sourcing：把「發生的事情」存下來，而非「最終狀態」

events 表（只能新增，不能修改/刪除）：
  { type: "OrderCreated",    data: {...}, timestamp: T1 }
  { type: "PaymentReceived", data: {...}, timestamp: T2 }
  { type: "OrderShipped",    data: {...}, timestamp: T3 }

當前狀態 = 重播所有事件的結果
歷史記錄 = 免費贈送！   `}
</CodeBlock>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed">
            Event Sourcing 的核心哲學是：<strong>不存「狀態」，只存「發生過的事情」</strong>。
            每一個對系統的操作都會產生一個不可變的事件，這些事件永遠不會被修改或刪除，只能被追加。
            而系統的「當前狀態」，是把所有歷史事件按順序重播（Replay）之後得到的結果。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-violet-200 bg-violet-50">
              <CardBody className="p-4 text-center">
                <BookOpen size={28} className="text-violet-600 mx-auto mb-2" />
                <p className="font-black text-violet-800 mb-1">完整審計日誌</p>
                <p className="text-violet-600 text-sm">每一個操作都有記錄，不可篡改，天然符合法規要求</p>
              </CardBody>
            </Card>
            <Card className="border border-purple-200 bg-purple-50">
              <CardBody className="p-4 text-center">
                <RefreshCw size={28} className="text-purple-600 mx-auto mb-2" />
                <p className="font-black text-purple-800 mb-1">任意重播歷史</p>
                <p className="text-purple-600 text-sm">可以重播到任意時間點的狀態，時光機般的除錯能力</p>
              </CardBody>
            </Card>
            <Card className="border border-indigo-200 bg-indigo-50">
              <CardBody className="p-4 text-center">
                <Layers size={28} className="text-indigo-600 mx-auto mb-2" />
                <p className="font-black text-indigo-800 mb-1">多種讀取視圖</p>
                <p className="text-indigo-600 text-sm">同一份事件，可以建立多個不同用途的查詢視圖</p>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：Event Sourcing 基礎實作 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <GitCommit size={20} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 2：Event Sourcing 基礎實作</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            理解了概念之後，來看實際的 TypeScript 實作。我們以電商訂單系統為例，
            建立 Domain Events 的型別定義，以及只支援「追加」操作的 Event Store。
            這是 Event Sourcing 架構的兩個最基礎的積木。
          </p>

          <CodeBlock language="typescript">
{`   // 定義 Domain Events（不可變）
type OrderEvent =
  | { type: 'OrderCreated';   data: { orderId: string; userId: string; items: OrderItem[]; total: number } }
  | { type: 'PaymentReceived'; data: { orderId: string; paymentId: string; amount: number } }
  | { type: 'OrderShipped';   data: { orderId: string; trackingNumber: string; carrier: string } }
  | { type: 'OrderCancelled'; data: { orderId: string; reason: string; refundAmount: number } };

// Event Store（只能 append）
interface StoredEvent {
  id: string;
  aggregateId: string;
  aggregateType: string;
  type: string;
  data: unknown;
  metadata: { userId: string; timestamp: Date; version: number };
}

class EventStore {
  private events: StoredEvent[] = [];

  async append(aggregateId: string, events: OrderEvent[], expectedVersion: number) {
    const currentVersion = await this.getVersion(aggregateId);

    // Optimistic Concurrency Control（樂觀鎖）
    if (currentVersion !== expectedVersion) {
      throw new Error(\`Concurrency conflict: expected version \${expectedVersion}, got \${currentVersion}\`);
    }

    const storedEvents = events.map((event, i) => ({
      id: crypto.randomUUID(),
      aggregateId,
      aggregateType: 'Order',
      type: event.type,
      data: event.data,
      metadata: {
        userId: 'user:001',
        timestamp: new Date(),
        version: currentVersion + i + 1,
      },
    }));

    this.events.push(...storedEvents);
    return storedEvents;
  }

  async getEvents(aggregateId: string, fromVersion = 0): Promise<StoredEvent[]> {
    return this.events.filter(
      e => e.aggregateId === aggregateId && e.metadata.version > fromVersion
    );
  }

  async getAllEvents(): Promise<StoredEvent[]> {
    return [...this.events].sort(
      (a, b) => a.metadata.timestamp.getTime() - b.metadata.timestamp.getTime()
    );
  }

  async getVersion(aggregateId: string): Promise<number> {
    const events = await this.getEvents(aggregateId);
    return events.length;
  }
}   `}
</CodeBlock>

          <Card className="border border-violet-200 bg-violet-50">
            <CardBody className="p-5">
              <p className="text-violet-800 text-sm leading-relaxed">
                <strong>樂觀鎖（Optimistic Concurrency Control）是什麼？</strong><br />
                當兩個使用者同時對同一個訂單發送操作時，可能導致「後一個操作覆蓋前一個」的競態條件。
                樂觀鎖的做法是：在發送操作時帶上「我目前知道的版本號」，
                如果 Event Store 裡的版本和預期不符，就代表有人在你之前修改了，操作拒絕，讓前端重試。
                這比悲觀鎖（直接鎖定記錄）更適合高並發場景。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Aggregate 與狀態重建 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Repeat size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 3：Aggregate 與狀態重建</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Aggregate 是 Domain-Driven Design（DDD）的概念，代表一組具有業務邊界的物件集合，
            由一個「根（Aggregate Root）」統一管理對外的操作。
            在 Event Sourcing 中，Aggregate 的職責有兩個：<strong>產生事件</strong>（接收 Command 時）
            和<strong>重建狀態</strong>（從 Event Store 讀取事件時）。
          </p>

          <CodeBlock language="typescript">
{`   // Order Aggregate：從事件重建狀態
interface OrderState {
  id: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED';
  userId: string;
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
  version: number;
}

class Order {
  private state: Partial<OrderState> = {};
  private uncommittedEvents: OrderEvent[] = [];
  private version = 0;

  // 從事件重建（Replay）
  static fromEvents(events: StoredEvent[]): Order {
    const order = new Order();
    for (const event of events) {
      order.apply(event as any);
      order.version = event.metadata.version;
    }
    order.uncommittedEvents = []; // 重建後清空未提交事件
    return order;
  }

  // 業務邏輯：建立訂單（Command）
  create(orderId: string, userId: string, items: OrderItem[], total: number) {
    if (this.state.status) {
      throw new Error('Order already exists');
    }

    this.raise({
      type: 'OrderCreated',
      data: { orderId, userId, items, total },
    });
  }

  // 業務邏輯：確認付款
  confirmPayment(paymentId: string, amount: number) {
    if (this.state.status !== 'PENDING') {
      throw new Error(\`Cannot pay order in status: \${this.state.status}\`);
    }

    this.raise({
      type: 'PaymentReceived',
      data: { orderId: this.state.id!, paymentId, amount },
    });
  }

  // 業務邏輯：確認出貨
  ship(trackingNumber: string, carrier: string) {
    if (this.state.status !== 'PAID') {
      throw new Error(\`Cannot ship order in status: \${this.state.status}\`);
    }

    this.raise({
      type: 'OrderShipped',
      data: { orderId: this.state.id!, trackingNumber, carrier },
    });
  }

  // 私有方法：產生事件並更新狀態
  private raise(event: OrderEvent) {
    this.uncommittedEvents.push(event);
    this.apply(event);
  }

  // Apply：根據事件更新 in-memory 狀態
  private apply(event: OrderEvent) {
    switch (event.type) {
      case 'OrderCreated':
        this.state = {
          id: event.data.orderId,
          status: 'PENDING',
          userId: event.data.userId,
          items: event.data.items,
          total: event.data.total,
        };
        break;
      case 'PaymentReceived':
        this.state.status = 'PAID';
        break;
      case 'OrderShipped':
        this.state.status = 'SHIPPED';
        this.state.trackingNumber = event.data.trackingNumber;
        break;
      case 'OrderCancelled':
        this.state.status = 'CANCELLED';
        break;
    }
  }

  getState() { return this.state as OrderState; }
  getUncommittedEvents() { return this.uncommittedEvents; }
  getVersion() { return this.version; }
}   `}
</CodeBlock>

          <Card className="border border-indigo-200 bg-indigo-50">
            <CardBody className="p-5">
              <p className="text-indigo-800 text-sm leading-relaxed">
                <strong>為什麼要分開 raise 和 apply？</strong><br />
                <code className="bg-indigo-100 px-1 rounded">raise()</code> 負責把事件加入「待提交清單」，然後呼叫 <code className="bg-indigo-100 px-1 rounded">apply()</code>。
                <code className="bg-indigo-100 px-1 rounded">apply()</code> 只負責更新 in-memory 狀態，不管事件是「新產生的」還是「從 Event Store 重播的」。
                這個設計讓 <code className="bg-indigo-100 px-1 rounded">fromEvents()</code> 可以直接呼叫 <code className="bg-indigo-100 px-1 rounded">apply()</code> 重建狀態，
                不會產生多餘的「未提交事件」，避免重複儲存。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：CQRS ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-violet-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 4：CQRS — Command 與 Query 分離</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            CQRS（Command Query Responsibility Segregation，命令查詢職責分離）是一個設計模式，
            但和 Event Sourcing 幾乎是天生一對。它的核心思想是：
            <strong>寫入的資料模型和讀取的資料模型應該分開設計</strong>，
            因為這兩件事的需求完全不同。
          </p>

          <Card className="border border-gray-200 bg-gray-50">
            <CardBody className="p-5">
              <CodeBlock language="text">
{`   傳統方式（CRUD）：
  同一個資料模型同時負責讀取和寫入
  問題：寫入模型（正規化）不適合複雜讀取查詢

CQRS（Command Query Responsibility Segregation）：
  Write Side（Command）：
    - 接收命令（CreateOrder、CancelOrder）
    - 驗證業務規則
    - 產生事件
    - Event Store 儲存事件

  Read Side（Query）：
    - 訂閱事件，更新「讀取優化的視圖」（Projection）
    - 回應查詢請求
    - 可以有多種不同的 Projection   `}
</CodeBlock>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed">
            實際上，CQRS 讓你可以針對讀取和寫入分別優化。寫入端（Event Store）只需要
            支援高效的「追加事件」操作；讀取端（Projection）可以用任何最適合查詢的資料結構，
            例如 PostgreSQL 做列表查詢、Elasticsearch 做全文搜尋、Redis 做即時計數。
          </p>

          <CodeBlock language="typescript">
{`   // Command Handler（寫入端）
interface CreateOrderCommand {
  orderId: string;
  userId: string;
  items: OrderItem[];
  total: number;
}

class OrderCommandHandler {
  constructor(
    private eventStore: EventStore,
    private eventBus: EventBus
  ) {}

  async handle(command: CreateOrderCommand) {
    const order = new Order();
    order.create(command.orderId, command.userId, command.items, command.total);

    // 儲存事件
    const events = await this.eventStore.append(
      command.orderId,
      order.getUncommittedEvents(),
      0
    );

    // 發布事件給 Read Side
    await this.eventBus.publish(events);
  }
}

// Read Model（讀取端的資料結構）
interface OrderReadModel {
  id: string;
  userId: string;
  status: string;
  total: number;
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Projection（讀取端視圖，根據事件更新）
class OrderProjection {
  // 可以是任何資料庫：PostgreSQL、MongoDB、Elasticsearch
  private readModel: Map<string, OrderReadModel> = new Map();

  async onEvent(event: StoredEvent) {
    switch (event.type) {
      case 'OrderCreated': {
        const data = event.data as any;
        this.readModel.set(data.orderId, {
          id: data.orderId,
          userId: data.userId,
          status: 'PENDING',
          total: data.total,
          itemCount: data.items.length,
          createdAt: event.metadata.timestamp,
          updatedAt: event.metadata.timestamp,
        });
        break;
      }
      case 'PaymentReceived': {
        const existing = this.readModel.get((event.data as any).orderId);
        if (existing) {
          this.readModel.set(existing.id, {
            ...existing,
            status: 'PAID',
            updatedAt: event.metadata.timestamp,
          });
        }
        break;
      }
      case 'OrderShipped': {
        const existing = this.readModel.get((event.data as any).orderId);
        if (existing) {
          this.readModel.set(existing.id, {
            ...existing,
            status: 'SHIPPED',
            updatedAt: event.metadata.timestamp,
          });
        }
        break;
      }
      case 'OrderCancelled': {
        const existing = this.readModel.get((event.data as any).orderId);
        if (existing) {
          this.readModel.set(existing.id, {
            ...existing,
            status: 'CANCELLED',
            updatedAt: event.metadata.timestamp,
          });
        }
        break;
      }
    }
  }

  // 查詢（快速！因為資料已預先計算）
  async getOrder(orderId: string): Promise<OrderReadModel | undefined> {
    return this.readModel.get(orderId);
  }

  async getUserOrders(userId: string): Promise<OrderReadModel[]> {
    return Array.from(this.readModel.values())
      .filter(o => o.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getOrdersByStatus(status: string): Promise<OrderReadModel[]> {
    return Array.from(this.readModel.values())
      .filter(o => o.status === status);
  }
}   `}
</CodeBlock>

          <Card className="border border-violet-200 bg-violet-50">
            <CardBody className="p-5">
              <p className="text-violet-800 text-sm leading-relaxed">
                <strong>Projection 的本質是「預先計算」：</strong>
                當 Event 發生時，立刻更新對應的 Read Model，讓查詢時可以直接讀取已經整理好的資料，
                不需要在查詢時才去計算。這和 SQL 的 Materialized View 概念相似，
                但 Projection 可以更靈活，跨越多個 Aggregate，也可以針對特定的查詢場景量身定做。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：Projection 重建 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <RefreshCw size={20} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 5：Projection 重建（Rebuild）</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Event Sourcing 最讓人驚豔的特性，就是你可以在任何時候「從頭重建任何 Projection」。
            因為所有的事件都永遠保存在 Event Store 裡，只要你有新的查詢需求，
            只需要建立新的 Projection，然後把所有歷史事件重播一遍——
            不需要寫任何資料遷移腳本，不需要修改既有的資料結構。
          </p>

          <CodeBlock language="typescript">
{`   // 當你需要新的查詢方式時，建立新的 Projection
class OrderByStatusProjection {
  private byStatus: Map<string, string[]> = new Map();

  // 重建：從頭播放所有事件
  async rebuild(eventStore: EventStore) {
    console.log('Rebuilding projection from scratch...');
    this.byStatus.clear();

    const allEvents = await eventStore.getAllEvents();
    for (const event of allEvents) {
      await this.onEvent(event);
    }

    console.log(\`Rebuild complete! Processed \${allEvents.length} events\`);
  }

  async onEvent(event: StoredEvent) {
    if (event.type === 'OrderCreated') {
      const pending = this.byStatus.get('PENDING') ?? [];
      this.byStatus.set('PENDING', [...pending, (event.data as any).orderId]);
    }
    if (event.type === 'PaymentReceived') {
      const orderId = (event.data as any).orderId;
      // 從 PENDING 移除
      const pending = (this.byStatus.get('PENDING') ?? []).filter(id => id !== orderId);
      this.byStatus.set('PENDING', pending);
      // 加入 PAID
      const paid = this.byStatus.get('PAID') ?? [];
      this.byStatus.set('PAID', [...paid, orderId]);
    }
    // ... 其他事件處理
  }

  getOrdersByStatus(status: string): string[] {
    return this.byStatus.get(status) ?? [];
  }
}

// 場景：需要新增「按月份統計訂單金額」的 Projection
class MonthlyRevenueProjection {
  private monthlyRevenue: Map<string, number> = new Map(); // "2026-05" → 150000

  async rebuild(eventStore: EventStore) {
    this.monthlyRevenue.clear();
    const allEvents = await eventStore.getAllEvents();
    for (const event of allEvents) {
      await this.onEvent(event);
    }
  }

  async onEvent(event: StoredEvent) {
    // 只關心 PaymentReceived 事件（代表真正付款成功）
    if (event.type === 'PaymentReceived') {
      const data = event.data as any;
      const month = event.metadata.timestamp
        .toISOString()
        .slice(0, 7); // "2026-05"

      const current = this.monthlyRevenue.get(month) ?? 0;
      this.monthlyRevenue.set(month, current + data.amount);
    }
  }

  getMonthlyRevenue(yearMonth: string): number {
    return this.monthlyRevenue.get(yearMonth) ?? 0;
  }

  getAllMonths(): Array<{ month: string; revenue: number }> {
    return Array.from(this.monthlyRevenue.entries())
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }
}

// 不需要修改任何已存在的資料，只需要：
// 1. 建立新的 MonthlyRevenueProjection
// 2. 從 Event Store 重播所有事件
// 3. Done！歷史資料全部有了   `}
</CodeBlock>

          <Card className="border border-purple-200 bg-purple-50">
            <CardBody className="p-5">
              <p className="text-purple-800 text-sm leading-relaxed">
                <strong>Projection 重建的實際應用場景：</strong><br />
                (1) 你發現 Projection 有 bug，計算邏輯錯誤 → 修正邏輯後重建，歷史資料自動修正。<br />
                (2) 業務需要新的報表維度 → 建立新 Projection 重播即可，不需要 Data Migration。<br />
                (3) 要換查詢資料庫（PostgreSQL → Elasticsearch）→ 把 Projection 的儲存層換掉，重播一遍。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：實際挑戰 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 6：Event Sourcing 的實際挑戰</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Event Sourcing 不是萬能藥。它解決了傳統 CRUD 的審計和歷史問題，
            但也引入了新的複雜性。在決定採用之前，必須清楚理解這些取捨。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">Eventual Consistency（最終一致性）</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            CQRS 架構中，Command 成功（事件已寫入 Event Store）和 Projection 更新之間，
            存在一段時間差。這段時間裡，用戶可能看到「過時的」讀取結果。
            這就是「最終一致性」——資料最終會一致，但不是立即的。
          </p>

          <CodeBlock language="typescript">
{`   // 問題：Command 成功，但 Projection 還沒更新
// 解法一：輪詢直到一致（適合非即時場景）
async function createOrderAndWait(command: CreateOrderCommand) {
  // 發送 Command
  const { version } = await orderApi.createOrder(command);

  // 輪詢直到 Read Model 更新到此版本
  let retries = 0;
  while (retries < 10) {
    const order = await orderQuery.getOrder(command.orderId);
    if (order && order.version >= version) return order;

    await new Promise(resolve => setTimeout(resolve, 200));
    retries++;
  }

  throw new Error('Timeout waiting for projection to update');
}

// 解法二：Optimistic UI（前端直接假設成功，背景同步）
function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderApi.createOrder,
    onMutate: async (command) => {
      // 取消正在進行的 refetch
      await queryClient.cancelQueries({ queryKey: ['orders'] });

      // 樂觀地把新訂單加入快取
      queryClient.setQueryData(['orders'], (old: OrderReadModel[]) => [
        { id: command.orderId, status: 'PENDING', ...command },
        ...(old ?? []),
      ]);
    },
    onError: (err, command, context) => {
      // 如果失敗，回滾到樂觀更新前的狀態
      queryClient.setQueryData(['orders'], context?.previousOrders);
    },
    onSettled: () => {
      // 無論成功失敗，都重新 fetch 確保資料正確
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}   `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-6">Event Schema 演化</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            事件一旦寫入就永遠保存，這意味著你的程式碼必須能夠處理「舊版本的事件格式」。
            當業務需求改變，需要修改事件的 data 結構時，必須謹慎處理向後相容。
          </p>

          <CodeBlock language="typescript">
{`   // 問題：事件格式演化了，舊事件要怎麼處理？
// ❌ 直接修改事件格式（會導致舊事件重播失敗）
type OrderCreatedV1 = { type: 'OrderCreated'; data: { orderId: string; total: number } };
// 改成
type OrderCreatedV2 = { type: 'OrderCreated'; data: { orderId: string; total: number; currency: string } };

// ✅ 方法一：Upcasting（在讀取時轉換舊事件格式）
class EventUpcaster {
  upcast(event: StoredEvent): StoredEvent {
    if (event.type === 'OrderCreated') {
      const data = event.data as any;
      // 舊事件沒有 currency，補上預設值
      if (!data.currency) {
        return {
          ...event,
          data: { ...data, currency: 'TWD' }, // 預設補上台幣
        };
      }
    }
    return event;
  }
}

// ✅ 方法二：版本號 + 分支處理（事件格式差異很大時）
type OrderCreatedV1 = { type: 'OrderCreated'; version: 1; data: { orderId: string; total: number } };
type OrderCreatedV2 = { type: 'OrderCreated'; version: 2; data: { orderId: string; total: number; currency: string } };

function applyOrderCreated(event: OrderCreatedV1 | OrderCreatedV2) {
  if (event.version === 1) {
    // 處理舊格式
    return { ...event.data, currency: 'TWD' };
  }
  // 處理新格式
  return event.data;
}   `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-6">何時適合 Event Sourcing？</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-green-200 bg-green-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  適合採用的場景
                </h4>
                <ul className="text-green-700 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    需要完整審計日誌（金融、醫療、法律）
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    業務邏輯複雜、狀態機轉換多
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    需要重播歷史資料分析
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    微服務間需要可靠的事件通知
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    需要支援 Undo / Redo 功能
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    多個下游系統需要消費同一份資料
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card className="border border-red-200 bg-red-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <XCircle size={18} className="text-red-600" />
                  不建議採用的場景
                </h4>
                <ul className="text-red-700 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                    簡單的 CRUD 應用（過度設計）
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                    小團隊、快速原型（學習成本高）
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                    查詢需求單一、不需要多種 Projection
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                    團隊對 DDD / Event Sourcing 不熟悉
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                    需要大量複雜的跨 Aggregate 查詢
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                    強一致性要求（無法接受最終一致性）
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 7：實際工具與框架 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 7：實際工具與框架</h2>
          </div>

          <p className="text-gray-700 leading-relaxed">
            了解了理論之後，在生產環境中你不會自己實作 Event Store。
            以下介紹幾個成熟的工具，以及如何和 Node.js / TypeScript 整合。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">EventStoreDB — 專為 Event Sourcing 設計的資料庫</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            EventStoreDB 是業界最成熟的 Event Sourcing 專用資料庫，
            提供原生的 Stream（即 Aggregate 的事件串列）、
            樂觀鎖、Catch-up Subscription（即時推送新事件）等功能。
          </p>

          <CodeBlock language="typescript">
{`   // EventStoreDB（專為 Event Sourcing 設計的資料庫）
import { EventStoreDBClient, jsonEvent, START, StreamNotFoundError } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString(
  'esdb://localhost:2113?tls=false'
);

// 寫入事件（append to stream）
async function appendOrderEvent(orderId: string, eventType: string, data: unknown) {
  const event = jsonEvent({
    type: eventType,
    data,
  });

  try {
    await client.appendToStream(\`order-\${orderId}\`, event, {
      // 使用 expectedRevision 做樂觀鎖
      // expectedRevision: BigInt(currentVersion)
    });
    console.log(\`Event \${eventType} appended to order-\${orderId}\`);
  } catch (err) {
    console.error('Failed to append event:', err);
    throw err;
  }
}

// 讀取所有事件（重建 Aggregate）
async function readOrderEvents(orderId: string) {
  const events = [];

  try {
    const result = client.readStream(\`order-\${orderId}\`, {
      fromRevision: START,
      direction: 'forwards',
    });

    for await (const { event } of result) {
      if (event) {
        events.push({
          type: event.type,
          data: event.data,
          revision: event.revision,
          created: event.created,
        });
      }
    }
  } catch (err) {
    if (err instanceof StreamNotFoundError) {
      return []; // 訂單不存在
    }
    throw err;
  }

  return events;
}

// 訂閱事件（即時 Projection 更新）
// 適合長時間運行的背景服務（如 Projection Worker）
async function subscribeToAllOrderEvents(projection: OrderProjection) {
  // 訂閱所有 order- 開頭的 Stream
  const subscription = client.subscribeToStream('$ce-order', {
    fromRevision: START,
  });

  for await (const { event } of subscription) {
    if (!event) continue;

    console.log(\`Processing event: \${event.type} @ \${event.streamId}\`);
    await projection.onEvent({
      id: event.id,
      aggregateId: event.streamId.replace('order-', ''),
      aggregateType: 'Order',
      type: event.type,
      data: event.data,
      metadata: {
        userId: (event.metadata as any)?.userId ?? 'system',
        timestamp: new Date(event.created),
        version: Number(event.revision),
      },
    });
  }
}

// 使用範例：建立訂單的完整流程
async function createOrder(command: CreateOrderCommand) {
  // 1. 驗證（讀取現有事件重建 Aggregate）
  const events = await readOrderEvents(command.orderId);
  if (events.length > 0) {
    throw new Error('Order already exists');
  }

  // 2. 執行業務邏輯（產生事件）
  const order = new Order();
  order.create(command.orderId, command.userId, command.items, command.total);

  // 3. 持久化事件
  for (const event of order.getUncommittedEvents()) {
    await appendOrderEvent(command.orderId, event.type, event.data);
  }

  return { orderId: command.orderId, status: 'created' };
}   `}
</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-6">Snapshot 優化（解決 Replay 效能問題）</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            當一個 Aggregate 累積了幾千個事件時，每次重建狀態都要重播所有事件，效能會變差。
            解法是「Snapshot」：定期把當前狀態存下來，重建時從最近的 Snapshot 開始，
            只需要重播 Snapshot 之後的事件。
          </p>

          <CodeBlock language="typescript">
{`   // Snapshot 優化策略
interface Snapshot {
  aggregateId: string;
  version: number;      // 這個 Snapshot 是在 version N 時建立的
  state: OrderState;    // 當時的完整狀態
  createdAt: Date;
}

class SnapshotStore {
  private snapshots: Map<string, Snapshot> = new Map();

  async save(snapshot: Snapshot) {
    this.snapshots.set(snapshot.aggregateId, snapshot);
  }

  async getLatest(aggregateId: string): Promise<Snapshot | undefined> {
    return this.snapshots.get(aggregateId);
  }
}

// 優化後的 Aggregate 重建
async function rebuildOrderWithSnapshot(
  orderId: string,
  eventStore: EventStore,
  snapshotStore: SnapshotStore
): Promise<Order> {
  // 1. 先找最近的 Snapshot
  const snapshot = await snapshotStore.getLatest(orderId);

  let order: Order;
  let fromVersion: number;

  if (snapshot) {
    // 2. 從 Snapshot 恢復狀態（不需要重播 Snapshot 之前的事件）
    order = Order.fromSnapshot(snapshot.state);
    fromVersion = snapshot.version;
    console.log(\`Restored from snapshot at version \${fromVersion}\`);
  } else {
    order = new Order();
    fromVersion = 0;
  }

  // 3. 只重播 Snapshot 之後的事件（通常很少）
  const recentEvents = await eventStore.getEvents(orderId, fromVersion);
  for (const event of recentEvents) {
    order.applyFromStore(event as any);
  }

  // 4. 如果事件累積超過閾值，建立新 Snapshot
  if (recentEvents.length >= 50) {
    await snapshotStore.save({
      aggregateId: orderId,
      version: order.getVersion(),
      state: order.getState(),
      createdAt: new Date(),
    });
    console.log(\`Snapshot created at version \${order.getVersion()}\`);
  }

  return order;
}   `}
</CodeBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="border border-violet-200 bg-violet-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-violet-800 mb-3">EventStoreDB</h4>
                <ul className="text-violet-700 text-sm space-y-1">
                  <li>• 專為 Event Sourcing 設計</li>
                  <li>• 原生 Stream + 樂觀鎖支援</li>
                  <li>• Catch-up Subscription</li>
                  <li>• 適合：需要成熟 ES 方案</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border border-indigo-200 bg-indigo-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-indigo-800 mb-3">PostgreSQL（自建）</h4>
                <ul className="text-indigo-700 text-sm space-y-1">
                  <li>• 用 events 表 + 樂觀鎖</li>
                  <li>• 搭配 LISTEN/NOTIFY 推送</li>
                  <li>• 或用 Debezium CDC 監聽變更</li>
                  <li>• 適合：已有 PostgreSQL 的團隊</li>
                </ul>
              </CardBody>
            </Card>
          </div>
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
            'Event Sourcing',
            'CQRS',
            'Domain Events',
            'Projection',
            'Aggregate',
            'DDD',
            'EventStoreDB',
            'Eventual Consistency',
          ].map(tag => (
            <Chip key={tag} variant="flat" className="bg-violet-100 text-violet-800">
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
            href="/blog/system-design/ep10-cdn-edge"
            className="flex items-center gap-2 text-violet-700 hover:text-violet-900 font-semibold transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>← EP.10 CDN</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-400 font-semibold cursor-not-allowed">
            <span>EP.12 →（Coming Soon）</span>
            <ArrowRight size={18} />
          </div>
        </motion.div>

      </article>
    </div>
  );
}
