'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Zap,
  BookOpen,
  Code2,
  Layers,
  GitBranch,
  Server,
  Inbox,
  Send,
  Shuffle,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function SystemDesignEP06() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-yellow-800 via-orange-800 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.06</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">System Design Bootcamp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Message Queue：<br />
              <span className="text-orange-200">用 Kafka 解耦你的系統</span>
            </h1>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl">
              Producer / Consumer / Topic / Partition — 高流量系統的非同步事件驅動架構完整指南
            </p>
            <div className="flex items-center gap-6 text-orange-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 17 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Kafka · Event-Driven · Microservices</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：痛點 — 同步呼叫的三個問題 ────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-orange-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 1：痛點 — 同步呼叫的三個問題</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            先從一個最常見的業務場景切入：用戶按下「下訂單」之後，系統需要完成哪些工作？
          </p>

          <CodeBlock language="text">{`用戶按下「下訂單」
  → 扣庫存（DB 操作）
  → 建立訂單記錄（DB 操作）
  → 發送確認 Email（外部 API）
  → 通知倉庫系統（外部 API）
  → 更新推薦系統（ML 運算）
  → 產生財務報表（複雜運算）
  → 回傳「訂單成功」給用戶`}</CodeBlock>

          <p className="text-gray-600 leading-relaxed mt-6 mb-8 text-lg">
            如果全部同步完成，會有三個致命問題：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-md border-t-4 border-red-500">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <Clock size={16} className="text-red-600" />
                </div>
                <h4 className="font-bold text-red-700 mb-2">問題一：延遲</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  全部做完才回應，用戶要等待 3–5 秒才能看到「訂單成功」。
                  現代用戶對超過 1 秒的等待就會感到不耐，轉換率直接下降。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md border-t-4 border-orange-500">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <GitBranch size={16} className="text-orange-600" />
                </div>
                <h4 className="font-bold text-orange-700 mb-2">問題二：耦合</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Email 服務掛了，整個下訂單流程就失敗。推薦系統變慢，
                  用戶就要等更久。一個不相關的服務，影響了核心業務流程。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md border-t-4 border-yellow-500">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                  <Shuffle size={16} className="text-yellow-600" />
                </div>
                <h4 className="font-bold text-yellow-700 mb-2">問題三：擴展難</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  推薦系統壓力大，你想水平擴展它，但它跟訂單服務是同一個呼叫鏈，
                  無法獨立部署和擴展。
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="border-0 shadow-md bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <BookOpen size={24} className="text-orange-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">類比：便利商店的訂單流程</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <strong>同步流程</strong>像是你在便利商店結帳，店員要當著你的面聯絡倉庫確認庫存、
                    幫你寄 Email 收據、更新帳本、通知配送中心 — 全部做完你才能離開。<br />
                    <br />
                    <strong>Message Queue</strong> 讓你：下完訂單立刻收到確認收據，後面的工作（Email、倉庫通知、
                    推薦系統更新）全部「非同步」在背景慢慢做，你不需要等。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：Message Queue 是什麼 ─────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Inbox size={20} className="text-yellow-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 2：Message Queue 是什麼</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Message Queue 是一個「中間人」服務，讓發訊息的一方（Producer）和接收訊息的一方（Consumer）
            不需要互相知道對方的存在，也不需要同時在線。
          </p>

          <CodeBlock language="text">{`Producer（生產者）→ [Message Queue / Broker] → Consumer（消費者）
                          ↑
                     Topic（主題）
                      ├── Partition 0
                      ├── Partition 1
                      └── Partition 2`}</CodeBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="border-0 shadow-md bg-yellow-50">
              <CardBody className="p-5">
                <div className="w-10 h-10 bg-yellow-200 rounded-xl flex items-center justify-center mb-3">
                  <Send size={18} className="text-yellow-700" />
                </div>
                <h4 className="font-bold text-yellow-800 mb-2">Producer（生產者）</h4>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  發送訊息到 Queue 的一方。在電商系統中是「訂單服務」。
                  發完就走，不等待任何 Consumer 的回應。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-orange-50">
              <CardBody className="p-5">
                <div className="w-10 h-10 bg-orange-200 rounded-xl flex items-center justify-center mb-3">
                  <Server size={18} className="text-orange-700" />
                </div>
                <h4 className="font-bold text-orange-800 mb-2">Broker / Queue</h4>
                <p className="text-orange-700 text-sm leading-relaxed">
                  儲存和轉發訊息的中間服務。常見的有 Kafka、RabbitMQ、AWS SQS。
                  負責保證訊息的持久化和可靠傳遞。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-red-50">
              <CardBody className="p-5">
                <div className="w-10 h-10 bg-red-200 rounded-xl flex items-center justify-center mb-3">
                  <Inbox size={18} className="text-red-700" />
                </div>
                <h4 className="font-bold text-red-800 mb-2">Consumer（消費者）</h4>
                <p className="text-red-700 text-sm leading-relaxed">
                  從 Queue 取出訊息並處理的一方。可以有多個 Consumer 訂閱同一個 Topic，
                  各自獨立處理自己關心的部分。
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="border-0 shadow-md mt-8 bg-gradient-to-r from-orange-600 to-red-700 text-white">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <Zap size={24} className="text-orange-200 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">引入 Message Queue 之後，下訂單流程變成這樣</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    用戶按下訂單 → 訂單服務扣庫存、建立記錄 → 發布
                    <code className="bg-white/20 px-1.5 py-0.5 rounded mx-1">order-created</code>
                    事件 → <strong className="text-orange-200">立刻回傳成功</strong>。
                    <br />
                    <br />
                    Email 服務、倉庫服務、推薦系統、財務服務各自訂閱
                    <code className="bg-white/20 px-1.5 py-0.5 rounded mx-1">order-created</code>
                    事件，在背景依自己的速度處理。
                    任何一個服務掛了，都不影響下訂單本身；恢復後從 Queue 繼續消費即可。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Kafka 核心概念 ─────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-orange-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 3：Kafka 核心概念</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Kafka 是目前業界最主流的高吞吐量 Message Queue，由 LinkedIn 開源。
            理解它的核心概念，等於理解了大多數 Message Queue 系統的共通設計邏輯。
          </p>

          <h3 className="text-xl font-bold text-gray-800 mb-4">Topic 和 Partition</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Topic 是訊息的分類（例如 <code className="bg-gray-100 px-1.5 rounded font-mono text-sm">order-created</code>），
            每個 Topic 下面可以分成多個 Partition。Partition 是 Kafka 水平擴展的關鍵機制。
          </p>

          <CodeBlock language="text">{`Topic: "order-created"
  ├── Partition 0: [msg1, msg4, msg7...]  → Consumer A
  ├── Partition 1: [msg2, msg5, msg8...]  → Consumer B
  └── Partition 2: [msg3, msg6, msg9...]  → Consumer C`}</CodeBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
            <Card className="border-0 shadow-md bg-orange-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-orange-800 mb-2 text-sm">並行處理</h4>
                <p className="text-orange-700 text-xs leading-relaxed">
                  多個 Consumer 同時處理不同 Partition，吞吐量隨 Partition 數量線性擴展。
                  Partition 越多，理論最大並行度越高。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-yellow-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-yellow-800 mb-2 text-sm">分區內有序</h4>
                <p className="text-yellow-700 text-xs leading-relaxed">
                  同一個 Partition 內的訊息保持嚴格的順序（FIFO）。
                  跨 Partition 則不保證順序，這是設計上的取捨。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-red-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-red-800 mb-2 text-sm">Key 決定分區</h4>
                <p className="text-red-700 text-xs leading-relaxed">
                  Producer 可以指定 message key，相同 key 的訊息會落在同一個 Partition，
                  確保同一訂單的所有事件按順序處理。
                </p>
              </CardBody>
            </Card>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-4">Offset 和 Consumer Group</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Offset 是訊息在 Partition 內的位置編號（從 0 開始）。Consumer 透過 committed offset 記錄自己處理到哪裡，
            重啟後從這個位置繼續，不會遺漏也不會重複（at-least-once 語意）。
          </p>

          <CodeBlock language="text">{`Partition 0: [0: "order-123", 1: "order-456", 2: "order-789"]
                                                ↑
                                       Consumer A 已處理到這裡
                                       （committed offset: 2）`}</CodeBlock>

          <p className="text-gray-600 leading-relaxed mt-6 mb-4">
            Consumer Group 是 Kafka 最強大的概念之一。同一個 Group 內的 Consumer 共同「瓜分」Partition；
            不同 Group 則各自獨立消費，互不影響。
          </p>

          <Card className="border-0 shadow-md bg-gradient-to-r from-orange-50 to-red-50">
            <CardBody className="p-6">
              <h4 className="font-bold text-gray-800 mb-4">Consumer Group 的實際運作</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-orange-700 mb-2">email-service（Group 1）</p>
                  <ul className="text-gray-600 space-y-1 text-xs">
                    <li>• 訂閱 <code className="bg-white px-1 rounded border">order-created</code></li>
                    <li>• Consumer A 處理 Partition 0、1</li>
                    <li>• Consumer B 處理 Partition 2</li>
                    <li>• 目的：發確認 Email</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-700 mb-2">analytics-service（Group 2）</p>
                  <ul className="text-gray-600 space-y-1 text-xs">
                    <li>• 訂閱相同的 <code className="bg-white px-1 rounded border">order-created</code></li>
                    <li>• 有自己的 offset，獨立消費</li>
                    <li>• 不影響 Group 1 的進度</li>
                    <li>• 目的：更新銷售統計</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-4 pt-3 border-t border-gray-200">
                同一份訊息，兩個 Group 各自收到一份，各自處理。這就是「發布 / 訂閱（Pub/Sub）」模型。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：Node.js 實作（kafkajs）───────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Code2 size={20} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 4：Node.js 實作（kafkajs）</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">kafkajs</code> 是 Node.js 生態系中最主流的 Kafka 客戶端，
            API 設計清晰，對 TypeScript 友好。以下是完整的 Producer 和 Consumer 實作範例。
          </p>

          <CodeBlock language="javascript">{`import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['kafka:9092'],
});

// ── Producer（訂單服務）────────────────────────────────────────────
const producer = kafka.producer();
await producer.connect();

// 下訂單時發布事件
async function createOrder(orderData) {
  // 1. 存入資料庫（必須先做，確保資料一致性）
  const order = await db.order.create({ data: orderData });

  // 2. 發布事件到 Kafka（非阻塞，發完就回傳）
  await producer.send({
    topic: 'order-created',
    messages: [{
      key: order.id,              // 確保同一訂單的所有事件落在同一 Partition
      value: JSON.stringify({
        orderId: order.id,
        userId: order.userId,
        items: order.items,
        totalAmount: order.total,
        createdAt: new Date().toISOString(),
      }),
    }],
  });

  // 3. 立刻回傳，不等 Email / 倉庫 / 推薦系統完成
  return { success: true, orderId: order.id };
}

// ── Consumer（Email 服務）──────────────────────────────────────────
const emailConsumer = kafka.consumer({ groupId: 'email-service' });
await emailConsumer.connect();
await emailConsumer.subscribe({ topic: 'order-created', fromBeginning: false });

await emailConsumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const order = JSON.parse(message.value.toString());

    try {
      await sendOrderConfirmationEmail(order.userId, {
        orderId: order.orderId,
        items: order.items,
        total: order.totalAmount,
      });
      console.log(\`已發送確認 Email，訂單 \${order.orderId}\`);
    } catch (err) {
      // 錯誤處理：可以發到 Dead Letter Queue 或記錄 log
      console.error(\`Email 發送失敗：\${err.message}\`, { orderId: order.orderId });
      throw err; // 重新拋出，讓 Kafka 知道這條訊息處理失敗（不 commit offset）
    }
  },
});

// ── Consumer（倉庫服務）────────────────────────────────────────────
const warehouseConsumer = kafka.consumer({ groupId: 'warehouse-service' });
await warehouseConsumer.connect();
await warehouseConsumer.subscribe({ topic: 'order-created', fromBeginning: false });

await warehouseConsumer.run({
  eachMessage: async ({ message }) => {
    const order = JSON.parse(message.value.toString());

    // 通知倉庫系統準備出貨
    await warehouseApi.createPickingTask({
      orderId: order.orderId,
      items: order.items,
      priority: order.totalAmount > 10000 ? 'high' : 'normal',
    });

    console.log(\`已通知倉庫，訂單 \${order.orderId}\`);
  },
});`}</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-4">錯誤處理：Dead Letter Queue（DLQ）</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            當訊息處理失敗時（例如 Email 服務 API 掛了），不應該無限重試阻塞正常訊息。
            標準做法是設定重試次數上限，超過後送到 Dead Letter Queue，由人工或另一個服務處理。
          </p>

          <CodeBlock language="javascript">{`// Dead Letter Queue 模式
const consumer = kafka.consumer({
  groupId: 'email-service',
  retry: {
    initialRetryTime: 100,     // 第一次重試等 100ms
    retries: 3,                // 最多重試 3 次
    multiplier: 2,             // 每次等待時間翻倍（100 → 200 → 400ms）
  },
});

// 如果 3 次都失敗，手動送到 DLQ
await emailConsumer.run({
  eachMessage: async ({ message }) => {
    try {
      await processMessage(message);
    } catch (err) {
      // 發到 Dead Letter Queue 供後續人工檢查
      await producer.send({
        topic: 'order-created-dlq',
        messages: [{
          key: message.key,
          value: message.value,
          headers: {
            'original-topic': 'order-created',
            'error-message': err.message,
            'failed-at': new Date().toISOString(),
          },
        }],
      });
    }
  },
});`}</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：Kafka vs RabbitMQ ─────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <RefreshCw size={20} className="text-yellow-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 5：Kafka vs RabbitMQ — 選哪個？</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Kafka 和 RabbitMQ 是最常被比較的兩個 Message Queue。它們的設計哲學根本不同，
            適合的場景也截然不同。選錯工具比不用更麻煩。
          </p>

          <Card className="border-0 shadow-md mb-8">
            <CardBody className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 pr-4 text-gray-500 font-medium"></th>
                      <th className="text-left py-2 pr-4 text-orange-700 font-bold">Kafka</th>
                      <th className="text-left py-2 text-red-700 font-bold">RabbitMQ</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">設計目標</td>
                      <td className="py-2.5 pr-4">高吞吐量日誌流</td>
                      <td className="py-2.5">任務佇列</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">訊息保留</td>
                      <td className="py-2.5 pr-4 text-green-600 font-semibold">可保留數天（可重播）</td>
                      <td className="py-2.5">消費後刪除</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">吞吐量</td>
                      <td className="py-2.5 pr-4 text-green-600 font-semibold">百萬 / 秒</td>
                      <td className="py-2.5">萬 – 十萬 / 秒</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">學習曲線</td>
                      <td className="py-2.5 pr-4 text-red-500">陡峭</td>
                      <td className="py-2.5 pr-4 text-green-600">相對平緩</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-700">適合場景</td>
                      <td className="py-2.5 pr-4">事件溯源、日誌、大數據</td>
                      <td className="py-2.5">任務分發、RPC</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-gray-700">雲端服務</td>
                      <td className="py-2.5 pr-4">AWS MSK、Confluent Cloud</td>
                      <td className="py-2.5">AWS SQS / SNS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-md bg-orange-50 border-l-4 border-orange-500">
              <CardBody className="p-5">
                <h4 className="font-bold text-orange-800 mb-3">選 Kafka 的時機</h4>
                <ul className="space-y-2 text-orange-700 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>每秒訊息量超過 10 萬</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>需要訊息重播（分析歷史事件）</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>事件溯源（Event Sourcing）架構</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>多個下游服務訂閱同一事件流</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>需要長期保留訊息供稽核</span></li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-red-50 border-l-4 border-red-500">
              <CardBody className="p-5">
                <h4 className="font-bold text-red-800 mb-3">選 RabbitMQ（或 SQS）的時機</h4>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>簡單的任務分發（影像壓縮、Email 批次）</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>需要複雜的路由規則（依內容分發）</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>訊息消費後不需要保留</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>團隊對 Kafka 不熟悉</span></li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="shrink-0 mt-0.5" /><span>想快速在 AWS 上啟動用 SQS</span></li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：常見的事件驅動模式 ─────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <GitBranch size={20} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 6：常見的事件驅動模式</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            引入 Message Queue 之後，系統架構通常會往事件驅動的方向演進。以下三個模式是業界最常見的應用方式。
          </p>

          {/* Event Sourcing */}
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-orange-100 rounded-lg flex items-center justify-center text-orange-700 font-bold text-sm">1</span>
            事件溯源（Event Sourcing）
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            傳統做法是儲存「當前狀態」（例如：訂單狀態 = 已出貨）。
            Event Sourcing 改成儲存所有「事件」，從事件序列重建當前狀態。
            這讓你可以回放任何時間點的狀態，對稽核和 Debug 非常有價值。
          </p>

          <CodeBlock language="javascript">{`// 傳統做法：只儲存當前狀態
// orders 表: { id, status: 'shipped', updatedAt }
// → 無法知道「什麼時候從 pending 變成 processing」

// Event Sourcing：儲存所有事件
// order_events 表:
// { orderId, type: 'ORDER_CREATED',   timestamp, payload: {...} }
// { orderId, type: 'PAYMENT_SUCCESS', timestamp, payload: {...} }
// { orderId, type: 'ORDER_SHIPPED',   timestamp, payload: {...} }

// 從事件重建當前狀態
function rebuildOrderState(events) {
  return events.reduce((state, event) => {
    switch (event.type) {
      case 'ORDER_CREATED':
        return { ...state, status: 'pending', ...event.payload };
      case 'PAYMENT_SUCCESS':
        return { ...state, status: 'paid', paidAt: event.timestamp };
      case 'ORDER_SHIPPED':
        return { ...state, status: 'shipped', shippedAt: event.timestamp };
      default:
        return state;
    }
  }, {});
}

// 好處：可以「時光旅行」— 重播到任何時間點
const stateAtYesterday = rebuildOrderState(
  events.filter(e => e.timestamp < yesterday)
);`}</CodeBlock>

          {/* CQRS */}
          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-700 font-bold text-sm">2</span>
            CQRS（Command Query Responsibility Segregation）
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            讀寫分離的架構模式。「寫入操作（Command）」和「讀取操作（Query）」使用不同的資料模型和儲存，
            透過 Message Queue 同步。讀取端可以針對查詢場景做專門優化。
          </p>

          <CodeBlock language="text">{`寫入流程（Command）:
用戶下訂單 → 訂單服務 → 寫入 Write DB → 發布 order-created 事件

同步流程（非同步）:
order-created 事件 → Consumer → 更新 Read DB（針對查詢優化的結構）

讀取流程（Query）:
用戶查訂單列表 → 直接讀 Read DB（可以是 Elasticsearch、Redis、Cache）
                 → 超快，因為是預先計算好的讀取優化結構`}</CodeBlock>

          {/* Saga Pattern */}
          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center text-red-700 font-bold text-sm">3</span>
            Saga Pattern（分散式交易）
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            微服務架構下，一個業務操作跨越多個服務時，無法用傳統的資料庫交易（ACID）保證一致性。
            Saga 透過一系列本地交易 + 補償操作（Compensating Transaction）來實現最終一致性。
          </p>

          <CodeBlock language="javascript">{`// Saga：下訂單的分散式交易
// 正向流程（每步成功才到下一步）
// 下訂單 → 扣庫存 → 扣款 → 建立出貨單

// Choreography 模式（事件驅動）
// 1. 訂單服務：建立訂單 → 發布 "order-pending"
// 2. 庫存服務：收到事件 → 扣庫存 → 發布 "inventory-reserved"
// 3. 支付服務：收到事件 → 扣款 → 發布 "payment-success"
// 4. 出貨服務：收到事件 → 建立出貨單 → 發布 "order-confirmed"

// 補償流程（如果中途失敗）
// 假設扣款失敗：
// 支付服務發布 "payment-failed"
// → 庫存服務收到 → 還原庫存（補償操作）
// → 訂單服務收到 → 標記訂單失敗 → 通知用戶

// Node.js 實作（簡化版）
const sagaSteps = [
  {
    execute: () => inventoryService.reserve(orderId, items),
    compensate: () => inventoryService.release(orderId, items),
  },
  {
    execute: () => paymentService.charge(userId, amount),
    compensate: () => paymentService.refund(userId, amount),
  },
  {
    execute: () => shippingService.create(orderId),
    compensate: () => shippingService.cancel(orderId),
  },
];

async function executeSaga(steps) {
  const completed = [];
  try {
    for (const step of steps) {
      await step.execute();
      completed.push(step);
    }
  } catch (err) {
    // 倒序補償已完成的步驟
    for (const step of completed.reverse()) {
      await step.compensate().catch(console.error);
    }
    throw err;
  }
}`}</CodeBlock>

          <Card className="border-0 shadow-lg mt-10 border-l-4 border-yellow-500 bg-yellow-50">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} className="text-yellow-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">什麼時候不需要 Message Queue？</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Message Queue 解決了很多問題，但也引入了額外的複雜度（Broker 的維運成本、最終一致性的複雜邏輯、
                    Debug 難度提高）。以下場景用同步呼叫就好，過早引入 Kafka 是反模式：
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold shrink-0">•</span>
                      <span><strong>單體應用、小流量：</strong>用 Queue 增加了運維複雜度，卻沒帶來對應的好處。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold shrink-0">•</span>
                      <span><strong>強一致性需求：</strong>銀行轉帳必須「扣款成功才算轉帳成功」，不能用最終一致性。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold shrink-0">•</span>
                      <span><strong>需要立即回傳結果：</strong>用戶問「我的庫存還剩幾個」，這種同步查詢不適合 Queue。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ──────────────────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <h3 className="text-lg font-bold text-gray-700 mb-4">本篇涵蓋技術</h3>
          <div className="flex flex-wrap gap-2">
            {['Kafka', 'Message Queue', 'Event-Driven', 'RabbitMQ', 'System Design', 'Microservices'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                classNames={{
                  base: 'bg-orange-100 text-orange-700',
                  content: 'font-medium text-xs',
                }}
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Navigation ────────────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/system-design/ep05-api-design">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <ArrowLeft size={14} />
                    <span>上一篇</span>
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    EP.05 API 設計
                  </p>
                  <p className="text-gray-400 text-xs mt-1">RESTful API 設計原則與最佳實踐</p>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/system-design/ep01-intro">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-400 text-xs mb-2">
                    <span>下一篇</span>
                    <ArrowRight size={14} />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    EP.01 分散式系統入門
                  </p>
                  <p className="text-gray-400 text-xs mt-1">CAP 定理、一致性模型完整解析</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
