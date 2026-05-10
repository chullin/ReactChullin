'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Network,
  GitBranch,
  ArrowRightLeft,
  Shield,
  Activity,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function SystemDesignEP09() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-gray-100">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-slate-800 via-zinc-700 to-gray-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.09</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">系統設計系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              微服務拆分原則<br />
              <span className="text-zinc-300">與 Service Mesh</span>
            </h1>
            <p className="text-zinc-200 text-lg mb-8 max-w-2xl">
              Domain-Driven Design、Strangler Fig Pattern、Istio Sidecar —
              何時拆、怎麼拆、拆完怎麼管
            </p>
            <div className="flex items-center gap-6 text-zinc-300 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> DDD · Strangler Fig · Istio · Observability</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：微服務不是萬靈丹 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-slate-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 1：微服務不是萬靈丹</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            微服務架構在過去幾年被過度神話化。許多團隊在沒有充分評估的情況下採用微服務，
            結果反而增加了不必要的複雜度與運維負擔。在決定是否拆分之前，先理解真實的代價。
          </p>

          <CodeBlock language="text">{`單體架構（Monolith）：
  一個 codebase、一個 DB、一個部署單元
  優點：開發快速、事務容易、除錯直觀、部署簡單
  缺點：規模擴展困難、技術債累積快、一個 bug 可能拖垮整個服務

微服務（Microservices）：
  N 個 codebase、N 個 DB、N 個部署單元
  優點：獨立部署、獨立 scale、技術棧異構、故障隔離
  缺點：
    - 分散式系統複雜度（網路延遲、部分失敗）
    - 資料一致性難保證（沒有 ACID 跨服務事務）
    - 服務發現、負載均衡、監控成本大幅上升
    - 本地開發困難（需要跑多個服務）`}</CodeBlock>

          <Card className="border border-amber-200 bg-amber-50 my-6">
            <CardBody className="p-5">
              <p className="text-amber-800 font-medium leading-relaxed">
                「不要過早拆分微服務。Netflix 和 Amazon 都是先有巨大的 Monolith，再逐漸拆分。
                如果你的團隊人數少於 10 人，Monolith 幾乎必然是更好的選擇。
                微服務的複雜度需要有足夠的工程能力和組織規模才能消化。」
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800 mb-4">何時值得考慮拆分？</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: '部署頻率差異大',
                desc: '某些功能每天部署、某些功能每月部署，部署耦合造成風險',
              },
              {
                title: '擴展需求不同',
                desc: '搜尋服務需要 100 個節點，用戶服務只需要 5 個',
              },
              {
                title: '團隊規模 > 30 人',
                desc: '超過 30 人的團隊需要獨立工作，避免互相等待與衝突',
              },
              {
                title: '技術棧需求不同',
                desc: 'ML 推薦服務用 Python、主 API 用 Node.js、批次處理用 Java',
              },
            ].map((item) => (
              <Card key={item.title} className="border border-gray-200">
                <CardBody className="p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：DDD Bounded Context ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
              <Network size={20} className="text-zinc-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 2：拆分邊界 — Domain-Driven Design（DDD）</h2>
          </div>

          <Card className="border border-zinc-200 bg-zinc-50 mb-6">
            <CardBody className="p-5">
              <p className="text-zinc-800 font-semibold">
                「好的微服務邊界來自業務領域，而不是技術層面。
                按照資料庫 table 拆或按照技術層（Controller / Service / Repository）拆，都是錯誤的做法。」
              </p>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed mb-6">
            DDD 的核心概念是 <strong>Bounded Context（限界上下文）</strong>——
            每個業務領域有自己的「語言」和「模型」，服務邊界應該和業務邊界對齊。
            以電商系統為例，每個 Bounded Context 就對應到一個微服務。
          </p>

          <CodeBlock language="text">{`電商系統的 Bounded Context 劃分：

訂單（Order BC）          → Order Service
  └── 訂單、訂單明細、訂單狀態（Pending / Confirmed / Shipped）
  └── 不需要知道「商品價格」怎麼算，只需要知道訂單總金額

用戶（User BC）           → User Service
  └── 用戶資料、認證（JWT）、收貨地址
  └── 「用戶」在 Order BC 中只是一個 userId，不是完整 User 物件

庫存（Inventory BC）      → Inventory Service
  └── 商品、庫存量、倉庫位置、入庫/出庫記錄

支付（Payment BC）        → Payment Service
  └── 支付方式、交易記錄、退款記錄
  └── 不知道「訂單」是什麼，只知道 orderId 和金額

通知（Notification BC）   → Notification Service
  └── Email、SMS、Push Notification
  └── 純粹的通知分發，不包含業務邏輯

推薦（Recommendation BC） → Recommendation Service
  └── 用戶行為分析、推薦演算法、A/B 測試`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4">三個核心拆分原則</h3>
          <div className="space-y-3">
            {[
              {
                num: '01',
                title: '高內聚，低耦合',
                desc: '同一個服務內的功能應該「經常一起改變」。如果改訂單邏輯每次都要改庫存，那它們應該在同一個服務。',
              },
              {
                num: '02',
                title: '單一職責（Single Responsibility）',
                desc: '每個服務只負責一個業務領域。一個服務不應該同時處理「下訂單」和「發送通知」。',
              },
              {
                num: '03',
                title: '服務間只透過 API 通訊',
                desc: '服務之間絕對不能共用資料庫。共用 DB 是最常見的微服務反模式（Anti-pattern），會導致隱性耦合。',
              },
            ].map((item) => (
              <Card key={item.num} className="border border-gray-200">
                <CardBody className="p-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-black text-gray-200">{item.num}</span>
                    <div>
                      <p className="font-bold text-gray-800 mb-1">{item.title}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Strangler Fig Pattern ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <GitBranch size={20} className="text-gray-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 3：Strangler Fig Pattern — 安全遷移到微服務</h2>
          </div>

          <Card className="border border-gray-200 bg-gray-50 mb-6">
            <CardBody className="p-5">
              <p className="text-gray-700 font-medium leading-relaxed">
                「不要嘗試重寫整個系統（Big Bang Rewrite）——根據歷史統計，這類專案的失敗率極高。
                應該用 Strangler Fig Pattern：像榕樹氣根一樣，慢慢包覆舊系統，逐漸取而代之。」
              </p>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed mb-6">
            Strangler Fig 取名自一種熱帶植物：它的氣根會慢慢包覆宿主樹，最終完全取代宿主。
            這個模式讓你可以在生產環境持續運行的同時，漸進式地遷移系統。
          </p>

          <CodeBlock language="text">{`第一步：在 Monolith 前面加一層 API Gateway

  所有請求
  Request ──→ API Gateway ──→ Monolith（全部流量）

  此時 API Gateway 是透明的，不改變任何行為

──────────────────────────────────────────────────

第二步：把最獨立的功能抽出來（從最低風險的開始）

  Request ──→ API Gateway
                ├── /api/payments/* ──→ Payment Service（新）
                └── /*              ──→ Monolith（其餘流量）

  選擇「最低依賴」的功能優先遷移：
  - 通知服務（幾乎沒有讀寫 DB 的需求）
  - 推薦服務（讀多寫少，可獨立部署）

──────────────────────────────────────────────────

第三步：逐漸把更多功能遷移

  Request ──→ API Gateway
                ├── /api/payments/*        ──→ Payment Service
                ├── /api/notifications/*   ──→ Notification Service
                ├── /api/recommendations/* ──→ Recommendation Service
                └── /*                    ──→ Monolith（越來越瘦）

──────────────────────────────────────────────────

最終：Monolith 消失，全面微服務化

  Request ──→ API Gateway
                ├── /api/orders/*   ──→ Order Service
                ├── /api/users/*    ──→ User Service
                ├── /api/inventory/* → Inventory Service
                └── ...`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4">遷移時的資料庫策略</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            資料庫遷移是最難的部分。建議採用「雙寫（Dual Write）」策略過渡：
          </p>

          <CodeBlock language="typescript">{`// 遷移期間：同時寫入舊 DB 和新 DB
async function createOrder(orderData: OrderInput) {
  // 1. 寫入舊的 Monolith DB（確保舊系統不中斷）
  await legacyDb.query(
    'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3)',
    [orderData.userId, orderData.total, 'pending']
  );

  // 2. 同步寫入新的 Order Service DB（為切換做準備）
  try {
    await newOrderServiceDb.orders.create({ data: orderData });
  } catch (e) {
    // 新 DB 失敗不影響主流程，只記錄 log
    logger.error('新 DB 寫入失敗', { error: e, orderId: orderData.id });
  }
}

// 切換讀取來源時，使用 Feature Flag 控制
const READ_FROM_NEW_SERVICE = process.env.ORDER_SERVICE_MIGRATION === 'true';

async function getOrder(orderId: string) {
  if (READ_FROM_NEW_SERVICE) {
    return await orderService.getOrder(orderId);
  }
  return await legacyDb.query('SELECT * FROM orders WHERE id = $1', [orderId]);
}`}</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：服務間通訊模式 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <ArrowRightLeft size={20} className="text-slate-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 4：服務間通訊模式</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            微服務之間的通訊方式決定了系統的可靠性和耦合度。選擇錯誤的通訊模式是許多微服務架構失敗的根本原因。
          </p>

          <h3 className="text-lg font-bold text-gray-800 mb-4">同步通訊（REST / gRPC）</h3>

          <CodeBlock language="text">{`Order Service ──HTTP/gRPC──→ Payment Service
                               （等待回應，最長 30 秒 timeout）

優點：
  ✓ 簡單直觀，像呼叫本地函式
  ✓ 立即知道操作結果（成功 / 失敗）
  ✓ 適合需要即時回應的操作

缺點：
  ✗ Payment Service 掛了，Order Service 也會失敗
  ✗ 網路延遲直接影響用戶體驗
  ✗ 服務之間形成時間耦合（Temporal Coupling）`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4">非同步通訊（Kafka / RabbitMQ）</h3>

          <CodeBlock language="text">{`Order Service ──Event──→ Kafka Topic: order.created
                              ├──→ Payment Service（訂閱，獨立消費）
                              ├──→ Notification Service（訂閱）
                              └──→ Inventory Service（訂閱）

Order Service 發完事件就返回，不等任何人回應

優點：
  ✓ 各服務完全解耦，互不影響
  ✓ Payment 掛了，消息還在 Kafka，服務恢復後繼續消費
  ✓ 天然支援 Pub/Sub（一個事件多個消費者）

缺點：
  ✗ 最終一致性（Eventual Consistency），不是立即一致
  ✗ 除錯困難，要追蹤事件流
  ✗ 需要額外維護 Kafka 基礎設施`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4">Saga Pattern — 分散式事務的解法</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            微服務最棘手的問題是「跨服務的事務」。Saga Pattern 用一連串的本地事務取代分散式 ACID 事務，
            每一步失敗都執行「補償交易（Compensating Transaction）」來回滾。
          </p>

          <CodeBlock language="text">{`下訂單完整流程（Choreography Saga）：

  Step 1: Order Service
    ├── 建立訂單（狀態：PENDING）
    └── 發布事件：OrderCreated { orderId, userId, items, total }

  Step 2: Inventory Service（收到 OrderCreated）
    ├── 扣減庫存（樂觀鎖）
    └── 成功 → 發布 InventoryReserved
       失敗 → 發布 InventoryFailed

  Step 3a: 成功路徑
    Payment Service（收到 InventoryReserved）
    ├── 向支付閘道發起扣款
    └── 成功 → 發布 PaymentSucceeded
    Order Service（收到 PaymentSucceeded）
    └── 更新訂單狀態：CONFIRMED

  Step 3b: 失敗路徑（補償交易）
    Payment Service 扣款失敗 → 發布 PaymentFailed
    Inventory Service（收到 PaymentFailed）
    └── 補償交易：還原庫存（+N 件回去）
    Order Service（收到 PaymentFailed）
    └── 更新訂單狀態：FAILED，通知用戶`}</CodeBlock>

          <CodeBlock language="typescript">{`// Kafka 事件消費範例（Payment Service）
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ clientId: 'payment-service', brokers: ['kafka:9092'] });
const consumer = kafka.consumer({ groupId: 'payment-group' });

await consumer.subscribe({ topic: 'inventory.reserved', fromBeginning: false });

await consumer.run({
  eachMessage: async ({ message }) => {
    const event = JSON.parse(message.value!.toString());

    try {
      // 執行支付
      const result = await paymentGateway.charge({
        orderId: event.orderId,
        amount: event.total,
        userId: event.userId,
      });

      // 成功 → 發布成功事件
      await producer.send({
        topic: 'payment.succeeded',
        messages: [{ value: JSON.stringify({ orderId: event.orderId, transactionId: result.id }) }],
      });

    } catch (error) {
      // 失敗 → 發布失敗事件，觸發補償
      await producer.send({
        topic: 'payment.failed',
        messages: [{ value: JSON.stringify({ orderId: event.orderId, reason: error.message }) }],
      });
    }
  },
});`}</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：Service Mesh ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-zinc-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 5：Service Mesh — 管理微服務的基礎設施層</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            當你有 50 個微服務時，每個服務都要自己實作重試、Circuit Breaker、mTLS 加密、日誌追蹤，
            這是不可行的。Service Mesh 把這些「橫切關注點（Cross-cutting Concerns）」
            抽離到基礎設施層，讓每個服務可以專注在業務邏輯上。
          </p>

          <CodeBlock language="text">{`沒有 Service Mesh：
  每個微服務自己實作：
    ├── 重試邏輯（Retry with exponential backoff）
    ├── Circuit Breaker（斷路器）
    ├── mTLS 加密通訊
    ├── 分散式追蹤（Distributed Tracing）
    ├── 訪問控制（Authorization Policy）
    └── 流量管控（Rate Limiting）

  N 個服務 × M 個功能 = 大量重複程式碼，且難以統一升級

有 Service Mesh（Istio）：
  每個 Pod 旁邊注入一個 Sidecar Proxy（Envoy）
  ┌─────────────────────────────────────┐
  │  Pod                                │
  │  ┌───────────┐    ┌──────────────┐  │
  │  │ 你的服務   │ ←→ │ Envoy Sidecar│  │
  │  │ (port 8080)│    │  (port 15001)│  │
  │  └───────────┘    └──────────────┘  │
  └─────────────────────────────────────┘

  Sidecar 自動處理：
    ├── mTLS（服務間加密，無需修改程式碼）
    ├── 自動重試與超時
    ├── Circuit Breaker
    ├── 流量追蹤（Jaeger / Zipkin）
    └── 訪問控制（誰可以呼叫誰）`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4">Istio Traffic Management：Canary 部署</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Service Mesh 最強大的功能之一是細粒度的流量控制，
            可以基於 Header、百分比、用戶身份等條件將流量導向不同版本，實現安全的 Canary 部署。
          </p>

          <CodeBlock language="yaml">{`# VirtualService：定義流量路由規則
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: product-service
spec:
  hosts:
    - product-service
  http:
    # 規則一：Canary 用戶（Header 帶有特殊標記）導向 v2
    - match:
        - headers:
            x-canary-user:
              exact: "true"
      route:
        - destination:
            host: product-service
            subset: v2

    # 規則二：一般流量 99% v1 / 1% v2
    - route:
        - destination:
            host: product-service
            subset: v1    # 穩定版（舊）
          weight: 99
        - destination:
            host: product-service
            subset: v2    # 新版（只有 1% 流量）
          weight: 1

---
# DestinationRule：定義 v1 / v2 對應到哪些 Pod
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: product-service
spec:
  host: product-service
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
  trafficPolicy:
    # Circuit Breaker 設定
    outlierDetection:
      consecutiveErrors: 5        # 連續 5 次錯誤觸發斷路
      interval: 30s               # 每 30 秒評估一次
      baseEjectionTime: 1m        # 斷路後剔除 1 分鐘`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4">Authorization Policy：服務間的存取控制</h3>

          <CodeBlock language="yaml">{`# 只允許 order-service 呼叫 payment-service
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: payment-service-policy
  namespace: default
spec:
  selector:
    matchLabels:
      app: payment-service
  rules:
    - from:
        - source:
            principals:
              - "cluster.local/ns/default/sa/order-service"
      to:
        - operation:
            methods: ["POST"]
            paths: ["/api/payment/charge"]
  # 其他服務的請求會被自動拒絕（403 Forbidden）`}</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：Observability ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Activity size={20} className="text-slate-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 6：微服務的 Observability（可觀測性）</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            在微服務架構中，一個用戶請求可能穿越 10 個服務。當出現問題時，
            如果沒有完善的 Observability，排查故障的難度會呈指數級上升。
            業界普遍認可的標準是「三根柱子（Three Pillars of Observability）」。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: '📋', title: 'Logs', subtitle: '日誌', desc: '何時發生了什麼事', tool: 'ELK Stack / Loki' },
              { icon: '📊', title: 'Metrics', subtitle: '指標', desc: '系統健康狀況的數字', tool: 'Prometheus + Grafana' },
              { icon: '🔍', title: 'Traces', subtitle: '追蹤', desc: '請求如何在服務間流動', tool: 'Jaeger / Zipkin' },
            ].map((item) => (
              <Card key={item.title} className="border border-gray-200 text-center">
                <CardBody className="p-4">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-black text-gray-800 text-lg">{item.title}</p>
                  <p className="text-gray-500 text-sm mb-1">{item.subtitle}</p>
                  <p className="text-gray-600 text-xs mb-2">{item.desc}</p>
                  <Chip size="sm" variant="flat" className="bg-gray-100 text-gray-600 text-xs">
                    {item.tool}
                  </Chip>
                </CardBody>
              </Card>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-3">1. Logs — Correlation ID 串聯跨服務日誌</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            結構化日誌（JSON 格式）+ Correlation ID 是追蹤問題的基礎。
            每個請求在入口處產生一個唯一 ID，並在所有服務間傳遞。
          </p>

          <CodeBlock language="typescript">{`import { v4 as uuid } from 'uuid';
import pino from 'pino';

const logger = pino({ level: 'info' });

// Express 中間件：為每個請求注入 Correlation ID
app.use((req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] as string ?? uuid();
  res.setHeader('x-correlation-id', req.correlationId);
  next();
});

// 在每個服務的所有 log 都帶上 correlationId
async function processOrder(orderId: string, correlationId: string) {
  logger.info({ correlationId, orderId }, 'Order processing started');

  try {
    const result = await db.orders.create({ orderId });
    logger.info({ correlationId, orderId, result: result.id }, 'Order created in DB');

    await callInventoryService(orderId, correlationId);  // 往下傳遞
    logger.info({ correlationId, orderId }, 'Inventory reserved');

  } catch (error) {
    logger.error({ correlationId, orderId, error }, 'Order processing failed');
    throw error;
  }
}

// 呼叫下游服務時，把 correlationId 放在 Header 裡傳遞
async function callInventoryService(orderId: string, correlationId: string) {
  return fetch('http://inventory-service/api/reserve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-correlation-id': correlationId,  // 跨服務傳遞
    },
    body: JSON.stringify({ orderId }),
  });
}
// 在 Kibana / Grafana Loki 用 correlationId 搜尋，
// 就能看到一個請求穿越所有服務的完整日誌鏈`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-3">2. Metrics — 關鍵指標監控</h3>

          <CodeBlock language="typescript">{`import { Counter, Histogram, Registry } from 'prom-client';

const register = new Registry();

// 請求計數器（區分服務、方法、狀態碼）
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['service', 'method', 'status_code'],
  registers: [register],
});

// 請求延遲直方圖（用於計算 P50 / P95 / P99）
const httpRequestDurationMs = new Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  labelNames: ['service', 'endpoint'],
  buckets: [10, 50, 100, 200, 500, 1000, 2000, 5000],
  registers: [register],
});

// 中間件自動收集指標
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    httpRequestsTotal.inc({
      service: 'order-service',
      method: req.method,
      status_code: res.statusCode,
    });

    httpRequestDurationMs.observe(
      { service: 'order-service', endpoint: req.route?.path ?? req.path },
      duration
    );
  });

  next();
});

// Prometheus 抓取 endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// 在 Grafana 設定 Alert：
// - Error Rate > 1%：頁面告警
// - P99 Latency > 2s：Slack 通知
// - RPS 突然下降 50%：可能服務掛掉`}</CodeBlock>

          <h3 className="text-lg font-bold text-gray-800 mt-8 mb-3">3. Traces — OpenTelemetry 分散式追蹤</h3>

          <CodeBlock language="typescript">{`// OpenTelemetry 是分散式追蹤的業界標準
// 可以導出到 Jaeger、Zipkin、Datadog 等後端
import { trace, SpanStatusCode, context, propagation } from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/sdk-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

// 初始化（在應用最早期）
const provider = new NodeTracerProvider();
provider.addSpanProcessor(
  new SimpleSpanProcessor(new JaegerExporter({ endpoint: 'http://jaeger:14268/api/traces' }))
);
provider.register();

// ── 業務程式碼中使用 ──
const tracer = trace.getTracer('order-service', '1.0.0');

async function processOrder(orderData: OrderInput) {
  // 建立一個 Span（追蹤單元）
  const span = tracer.startSpan('processOrder', {
    attributes: {
      'order.id': orderData.orderId,
      'order.total': orderData.total,
      'user.id': orderData.userId,
    },
  });

  // 把 span 放進 context，讓子操作自動繼承
  return context.with(trace.setSpan(context.active(), span), async () => {
    try {
      // 建立子 Span（對應 DB 操作）
      const dbSpan = tracer.startSpan('db.orders.create');
      const order = await db.orders.create(orderData);
      dbSpan.end();

      // 呼叫下游服務時，把追蹤 context 注入 HTTP Header
      const headers: Record<string, string> = {};
      propagation.inject(context.active(), headers);

      await fetch('http://inventory-service/api/reserve', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      });

      span.setStatus({ code: SpanStatusCode.OK });
      return order;

    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: SpanStatusCode.ERROR, message: (error as Error).message });
      throw error;

    } finally {
      span.end();  // 一定要 end，否則 trace 不會上報
    }
  });
}

// 在 Jaeger UI 中，可以看到：
// processOrder (Order Service) 120ms
//   └── db.orders.create        15ms
//   └── HTTP POST /api/reserve (Inventory Service) 45ms
//         └── db.inventory.update 12ms
//         └── kafka.produce       8ms`}</CodeBlock>

          <Card className="border border-slate-200 bg-gradient-to-r from-slate-50 to-zinc-50 mt-6">
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <BarChart3 size={20} className="text-slate-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 mb-2">實務建議：從 Logs 開始，逐步建立</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    不要一開始就想把三個 Pillar 全部建齊。建議順序：
                    <strong> Logs（1 天）→ Metrics + Grafana Dashboard（1 週）→ Traces（1 個月）</strong>。
                    Logs 是最快見效的，Traces 架設成本最高但排查複雜問題時最不可或缺。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ── */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {['Microservices', 'DDD', 'Service Mesh', 'Istio', 'Strangler Fig', 'Distributed Systems'].map((tag) => (
            <Chip
              key={tag}
              size="sm"
              variant="flat"
              className="bg-slate-100 text-slate-700"
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
          <Link href="/blog/system-design/ep08-elasticsearch">
            <Card className="border border-gray-200 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer">
              <CardBody className="p-4">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <ArrowLeft size={16} />
                  <span className="text-xs">前一篇</span>
                </div>
                <p className="font-bold text-gray-800 text-sm">EP.08 Elasticsearch</p>
                <p className="text-gray-500 text-xs">全文搜尋、Inverted Index、Query DSL</p>
              </CardBody>
            </Card>
          </Link>

          <Link href="/blog/system-design/ep01-intro">
            <Card className="border border-gray-200 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer">
              <CardBody className="p-4 text-right">
                <div className="flex items-center justify-end gap-2 text-gray-500 mb-1">
                  <span className="text-xs">下一篇</span>
                  <ArrowRight size={16} />
                </div>
                <p className="font-bold text-gray-800 text-sm">EP.01 分散式系統入門</p>
                <p className="text-gray-500 text-xs">CAP Theorem、一致性模型、分散式基礎</p>
              </CardBody>
            </Card>
          </Link>
        </motion.div>

      </article>
    </div>
  );
}
