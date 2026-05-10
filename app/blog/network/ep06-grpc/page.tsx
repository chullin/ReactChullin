'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle,
  Server,
  GitBranch,
  Layers,
  Radio,
  BarChart2,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function NetworkEP06() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.06</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網路系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              gRPC：微服務間通訊的<br />
              <span className="text-cyan-300">高效選擇</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              Protobuf 二進位編碼、Service 定義、Streaming — 比 REST 更快、強型別、自動生成客戶端
            </p>
            <div className="flex items-center gap-6 text-cyan-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> gRPC · Protobuf · Microservices · HTTP/2</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：REST 的問題 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 1：REST 在微服務間通訊的問題</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            假設你有一個電商系統，Order Service 需要向 Payment Service 發起付款請求。
            用 REST 的話，看起來很直觀：
          </p>

          <Card className="border-0 shadow-md mb-6">
            <CardBody className="p-6 bg-gray-50">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">REST 微服務通訊示意圖</p>
              <CodeBlock language="plaintext">{`Order Service  →  HTTP/1.1 POST /api/payments  →  Payment Service
                       JSON: { "orderId": "abc-123", "amount": 1000 }`}</CodeBlock>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed mb-6">
            能用，但在高頻次、多服務的微服務架構下，這個做法有四個根本問題：
          </p>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {[
              {
                icon: <Zap size={20} className="text-red-500" />,
                title: '效能瓶頸',
                desc: 'JSON 序列化 / 反序列化開銷大，HTTP/1.1 每次請求都需要建立新的 TCP 連線（沒有多路複用），高流量下延遲顯著上升。',
              },
              {
                icon: <AlertTriangle size={20} className="text-orange-500" />,
                title: '型別不安全',
                desc: 'Payment Service 不知道 Order Service 傳來的 amount 是 float 還是 integer。JSON 是純文字，型別只存在於文件，不在程式碼裡。',
              },
              {
                icon: <GitBranch size={20} className="text-yellow-600" />,
                title: '版本管理困難',
                desc: 'API 欄位一旦更改，需要手動同步更新雙方的 Model 定義，非常容易漏改、改錯，也難以追蹤 breaking change。',
              },
              {
                icon: <Radio size={20} className="text-purple-500" />,
                title: '沒有原生 Streaming',
                desc: '如果要傳輸大量資料（例如批次處理結果）或即時推送（例如訂單狀態流），REST 的請求 - 回應模型非常不方便，只能靠 WebSocket 或 SSE 繞過。',
              },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardBody className="p-5 flex flex-row items-start gap-4">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{item.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-md bg-gradient-to-r from-indigo-50 to-cyan-50">
            <CardBody className="p-6">
              <p className="text-indigo-900 font-bold mb-2">gRPC 如何解決這些問題？</p>
              <ul className="text-indigo-800 text-sm space-y-2">
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span><strong>二進位格式（Protobuf）</strong>：比 JSON 小 3–10 倍，序列化速度快 5–10 倍</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span><strong>HTTP/2</strong>：單一連線多路複用，消除 HTTP/1.1 的連線開銷</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span><strong>強型別 Protobuf</strong>：從 .proto 檔自動生成雙語言的客戶端與伺服器 stub</span></li>
                <li className="flex items-start gap-2"><CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span><strong>原生 Streaming</strong>：四種 RPC 模式，覆蓋所有通訊需求</span></li>
              </ul>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：Protocol Buffers ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 2：Protocol Buffers（Protobuf）</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Protobuf 是 gRPC 的 IDL（Interface Definition Language）。你先用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-indigo-700">.proto</code> 檔定義好資料結構與 Service 介面，
            再用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-indigo-700">protoc</code> 編譯器自動生成各語言的 client / server 程式碼。
            這份 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-indigo-700">.proto</code> 就是雙方服務的「合約」，型別不一致會在編譯期就報錯。
          </p>

          <CodeBlock language="protobuf">{`// payment.proto
syntax = "proto3";

package payment;

// 定義 Enum
enum Currency {
  USD = 0;
  TWD = 1;
  JPY = 2;
}

// 定義 Message（相當於 TypeScript interface）
message PaymentRequest {
  string order_id    = 1;   // field number（序列化時的 ID，不要改！）
  double amount      = 2;
  Currency currency  = 3;
  string description = 4;
}

message PaymentResponse {
  string payment_id    = 1;
  bool   success       = 2;
  string error_message = 3;  // 失敗時才有值
}

message GetHistoryRequest {
  string user_id = 1;
  int32  limit   = 2;
}

message PaymentRecord {
  string payment_id = 1;
  double amount     = 2;
  string created_at = 3;
}

message PaymentFilter {
  string currency = 1;
  double min_amount = 2;
}

message BatchResult {
  int32 success_count = 1;
  int32 fail_count    = 2;
}

// 定義 Service（相當於 API 端點）
service PaymentService {
  // Unary RPC（普通請求 - 回應）
  rpc ProcessPayment(PaymentRequest) returns (PaymentResponse);

  // Server-Side Streaming（一個請求，多個回應）
  rpc GetPaymentHistory(GetHistoryRequest) returns (stream PaymentRecord);

  // Client-Side Streaming（多個請求，一個回應）
  rpc BatchProcess(stream PaymentRequest) returns (BatchResult);

  // Bidirectional Streaming（雙向流）
  rpc LivePaymentFeed(stream PaymentFilter) returns (stream PaymentRecord);
}`}</CodeBlock>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-orange-500">JSON 格式</span>
                  <span className="text-gray-400 text-xs">（文字）</span>
                </p>
                <CodeBlock language="json">{`{
  "order_id": "abc123",
  "amount": 1000.50
}
// 大小：38 bytes
// key 名稱也要序列化傳輸`}</CodeBlock>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-indigo-600">Protobuf 格式</span>
                  <span className="text-gray-400 text-xs">（二進位）</span>
                </p>
                <CodeBlock language="plaintext">{`// 同樣資料 = ~12 bytes
// 用 field number (1, 2, 3...) 取代 key 名稱
// 省去了 "order_id"、"amount" 字串本身的空間
// 數字型別直接以二進位編碼，不轉成字串`}</CodeBlock>
              </CardBody>
            </Card>
          </div>

          <Card className="border-0 shadow-sm bg-amber-50 mt-4">
            <CardBody className="p-4">
              <p className="text-amber-800 text-sm">
                <strong>為什麼 field number 不能改？</strong> Protobuf 序列化時，欄位的識別碼是 field number 而非名稱。
                如果你把 <code className="bg-amber-100 px-1 rounded">amount = 2</code> 改成 <code className="bg-amber-100 px-1 rounded">total = 2</code>，
                binary 層面完全沒有影響，舊客戶端依然可以解碼。
                但如果你把 field number 從 2 改成 5，舊客戶端就再也找不到 amount 了——這是 breaking change。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Node.js gRPC Server ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <Server size={20} className="text-cyan-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 3：Node.js gRPC Server 實作</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            Node.js 使用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-indigo-700">@grpc/grpc-js</code> 套件實作 gRPC server。
            不需要額外編譯 .proto，直接在 runtime 載入即可：
          </p>

          <CodeBlock language="typescript">{`// npm install @grpc/grpc-js @grpc/proto-loader

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// ── 型別定義（對應 proto 裡的 Message）──
interface PaymentRequest {
  order_id: string;
  amount: number;
  currency: string;
  description: string;
}

interface PaymentResponse {
  payment_id: string;
  success: boolean;
  error_message: string;
}

interface GetHistoryRequest {
  user_id: string;
  limit: number;
}

interface PaymentRecord {
  payment_id: string;
  amount: number;
  created_at: string;
}

// ── 載入 proto 定義 ──
const packageDef = protoLoader.loadSync(
  path.join(__dirname, 'payment.proto'),
  {
    keepCase: true,   // 保留 snake_case（對應 proto 原始命名）
    longs: String,    // int64 轉成 string（JS number 精度不夠）
    enums: String,    // enum 轉成 string
    defaults: true,   // 未設定欄位填預設值
  }
);
const proto = grpc.loadPackageDefinition(packageDef) as any;

// ── 模擬資料庫操作 ──
async function processPaymentInDB(orderId: string, amount: number, currency: string) {
  // 實際會連資料庫、打金流 API...
  return { id: `pay-${Date.now()}` };
}

async function getPaymentHistory(userId: string, limit: number): Promise<PaymentRecord[]> {
  // 模擬從資料庫撈資料
  return Array.from({ length: Math.min(limit, 10) }, (_, i) => ({
    payment_id: \`pay-\${i}\`,
    amount: (i + 1) * 100,
    created_at: new Date().toISOString(),
  }));
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ── 實作 Service ──
const paymentService = {
  // Unary RPC：一個請求，一個回應
  async processPayment(
    call: grpc.ServerUnaryCall<PaymentRequest, PaymentResponse>,
    callback: grpc.sendUnaryData<PaymentResponse>
  ) {
    const { order_id, amount, currency } = call.request;

    try {
      const result = await processPaymentInDB(order_id, amount, currency);
      callback(null, {
        payment_id: result.id,
        success: true,
        error_message: '',
      });
    } catch (error: any) {
      // gRPC 有標準的錯誤狀態碼，對應 HTTP status
      callback({
        code: grpc.status.INTERNAL,
        message: error.message,
      });
    }
  },

  // Server-Side Streaming：一個請求，多個回應（分批傳送）
  async getPaymentHistory(
    call: grpc.ServerWritableStream<GetHistoryRequest, PaymentRecord>
  ) {
    const { user_id, limit } = call.request;
    const records = await getPaymentHistory(user_id, limit);

    for (const record of records) {
      call.write(record);  // 每筆資料獨立傳送，不用等全部查完才回傳
      await sleep(10);     // 模擬資料庫分批查詢的間隔
    }
    call.end();  // 告訴客戶端串流結束
  },
};

// ── 啟動 Server ──
const server = new grpc.Server();
server.addService(proto.payment.PaymentService.service, paymentService);

server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),  // 生產環境改用 createSsl()
  (err, port) => {
    if (err) {
      console.error('Server 啟動失敗：', err);
      return;
    }
    server.start();
    console.log(\`gRPC server 在 port \${port} 啟動\`);
  }
);`}</CodeBlock>

          <Card className="border-0 shadow-sm bg-blue-50 mt-4">
            <CardBody className="p-4">
              <p className="text-blue-800 text-sm">
                <strong>gRPC 錯誤狀態碼</strong>：gRPC 有自己的一套狀態碼系統（非 HTTP status），例如
                <code className="bg-blue-100 px-1 rounded mx-1">INTERNAL</code>（5xx 類）、
                <code className="bg-blue-100 px-1 rounded mx-1">NOT_FOUND</code>（404 類）、
                <code className="bg-blue-100 px-1 rounded mx-1">PERMISSION_DENIED</code>（403 類）、
                <code className="bg-blue-100 px-1 rounded mx-1">DEADLINE_EXCEEDED</code>（timeout）。
                設計良好的 gRPC service 應該使用語意明確的狀態碼，而不是所有錯誤都回 INTERNAL。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：gRPC Client ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <GitBranch size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 4：gRPC Client 實作</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            gRPC 的 client 使用同一份 .proto 檔生成，所以型別是保證對得上的。
            原生 API 是 callback 風格，實際使用時通常 promisify 一下：
          </p>

          <CodeBlock language="typescript">{`import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { promisify } from 'util';
import path from 'path';

const packageDef = protoLoader.loadSync(
  path.join(__dirname, 'payment.proto'),
  { keepCase: true, longs: String, enums: String, defaults: true }
);
const proto = grpc.loadPackageDefinition(packageDef) as any;

// ── 建立客戶端 ──
// 第一個參數是服務的 host:port（微服務環境通常透過 service discovery 解析）
const client = new proto.payment.PaymentService(
  'payment-service:50051',
  grpc.credentials.createInsecure()
);

// ── Promisify：把 gRPC callback 包成 async/await ──
const processPayment = promisify(client.processPayment.bind(client));

// Unary Call：等價於 fetch + await response.json()，但型別安全
async function chargeUser(orderId: string, amount: number) {
  const response = await processPayment({
    order_id: orderId,
    amount,
    currency: 'TWD',
    description: '商品購買',
  });

  if (!response.success) {
    throw new Error(response.error_message);
  }

  return response.payment_id;
}

// ── Server-Side Streaming：接收多個回應 ──
function streamPaymentHistory(userId: string): Promise<PaymentRecord[]> {
  return new Promise((resolve, reject) => {
    const records: PaymentRecord[] = [];

    // 呼叫 streaming RPC，取得一個可監聽事件的 stream 物件
    const stream = client.getPaymentHistory({
      user_id: userId,
      limit: 100,
    });

    // 每收到一筆資料就觸發
    stream.on('data', (record: PaymentRecord) => {
      records.push(record);
      console.log(\`收到第 \${records.length} 筆付款記錄\`);
    });

    // server 呼叫 call.end() 後觸發
    stream.on('end', () => {
      console.log(\`串流結束，共 \${records.length} 筆\`);
      resolve(records);
    });

    stream.on('error', (err: Error) => {
      reject(err);
    });
  });
}

// ── Client-Side Streaming：多個請求，一個回應 ──
function batchProcessPayments(payments: PaymentRequest[]): Promise<BatchResult> {
  return new Promise((resolve, reject) => {
    const stream = client.batchProcess(
      (err: Error, response: BatchResult) => {
        if (err) reject(err);
        else resolve(response);
      }
    );

    // 一次一筆送過去
    for (const payment of payments) {
      stream.write(payment);
    }
    stream.end();  // 告訴 server 客戶端送完了
  });
}

// ── 實際使用 ──
async function main() {
  try {
    // Unary
    const paymentId = await chargeUser('order-001', 999);
    console.log('付款成功，ID：', paymentId);

    // Streaming
    const history = await streamPaymentHistory('user-001');
    console.log('歷史記錄共：', history.length, '筆');

    // Batch
    const result = await batchProcessPayments([
      { order_id: 'batch-1', amount: 100, currency: 'TWD', description: '' },
      { order_id: 'batch-2', amount: 200, currency: 'TWD', description: '' },
    ]);
    console.log(\`批次結果：成功 \${result.success_count} 筆，失敗 \${result.fail_count} 筆\`);
  } catch (error) {
    console.error('gRPC 呼叫失敗：', error);
  }
}

main();`}</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：gRPC vs REST 對比 ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <BarChart2 size={20} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 5：gRPC 與 REST 詳細對比</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            gRPC 不是要取代 REST，而是針對不同場景各有優勢。看完這張表，你就知道什麼情況下該選哪個：
          </p>

          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                  <th className="px-5 py-3 text-left font-bold">面向</th>
                  <th className="px-5 py-3 text-left font-bold">REST</th>
                  <th className="px-5 py-3 text-left font-bold">gRPC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['資料格式', 'JSON（文字）', 'Protobuf（二進位）'],
                  ['傳輸協議', 'HTTP/1.1', 'HTTP/2'],
                  ['效能', '基準', '5–10x 更快'],
                  ['型別安全', '無（需要 OpenAPI）', '✅ 強型別，編譯期檢查'],
                  ['客戶端生成', '需要 openapi-generator', '✅ protoc 自動生成'],
                  ['瀏覽器支援', '✅ 完整支援', '❌ 需要 grpc-web proxy'],
                  ['Streaming', 'Long Polling / SSE', '✅ 原生四種 RPC 模式'],
                  ['學習成本', '低', '中（需要學 Protobuf）'],
                  ['調試友好度', '✅ curl / Postman 即可', '需要 grpcurl / Postman gRPC'],
                ].map(([aspect, rest, grpc], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-5 py-3 font-semibold text-gray-700">{aspect}</td>
                    <td className="px-5 py-3 text-gray-600">{rest}</td>
                    <td className="px-5 py-3 text-indigo-700 font-medium">{grpc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              效能差異從何而來？HTTP/2 的多路複用（Multiplexing）是關鍵——多個 RPC 呼叫可以共用同一條 TCP 連線，
              消除了 HTTP/1.1 每次都要重新建立連線的開銷。加上 Protobuf 的二進位壓縮，在高流量微服務之間效果非常顯著。
            </p>
            <Card className="border-0 shadow-sm bg-slate-50">
              <CardBody className="p-5">
                <p className="font-bold text-gray-800 mb-2">HTTP/1.1 vs HTTP/2 連線模型</p>
                <CodeBlock language="plaintext">{`HTTP/1.1（REST）：
Request A ──────────────────────────────► Response A
                    Request B ──────────────────► Response B
                                   Request C ──────────────► Response C
（三個請求需要三條 TCP 連線，或排隊等待 head-of-line blocking）

HTTP/2（gRPC）：
          ┌─ Stream 1: Request A ──────────────► Response A ─┐
TCP 連線 ─┼─ Stream 2: Request B ──────────────► Response B ─┤
          └─ Stream 3: Request C ──────────────► Response C ─┘
（三個請求共用一條 TCP 連線，真正並行）`}</CodeBlock>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：什麼時候用 gRPC ── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 6：什麼時候用 gRPC</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            工具沒有好壞，只有適不適合。實際工程決策應根據場景來選型：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <Card className="border-0 shadow-md border-t-4 border-t-indigo-500">
              <CardBody className="p-5">
                <p className="font-black text-indigo-700 text-lg mb-3">用 gRPC</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    '微服務間的內部通訊',
                    '高頻低延遲的 API 呼叫',
                    '需要 Streaming（即時推送、批次）',
                    '多語言環境（Go + Node.js + Python）',
                    'API 合約需要強型別保障',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md border-t-4 border-t-green-500">
              <CardBody className="p-5">
                <p className="font-black text-green-700 text-lg mb-3">用 REST</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    '對外公開的 API（第三方整合）',
                    '瀏覽器直接呼叫（無 proxy）',
                    '簡單的 CRUD API',
                    '團隊熟悉度高、快速迭代',
                    '需要 CDN 快取（GET 請求）',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md border-t-4 border-t-violet-500">
              <CardBody className="p-5">
                <p className="font-black text-violet-700 text-lg mb-3">用 tRPC</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    'Next.js 全端應用',
                    '整個 stack 都是 TypeScript',
                    '不需要跨語言通訊',
                    '開發速度優先（零 schema 定義）',
                    '小型到中型團隊',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-violet-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>

          <Card className="border-0 shadow-md bg-gradient-to-r from-indigo-900 to-blue-900 text-white">
            <CardBody className="p-6">
              <p className="font-bold text-lg mb-2 text-cyan-300">現實世界的架構選擇</p>
              <p className="text-blue-100 text-sm leading-relaxed mb-4">
                Google、Netflix、Uber 等公司的微服務架構通常長這樣：
                對外是 REST API（瀏覽器友好），服務與服務之間是 gRPC（效能最優）。
                這兩者並不互斥，你可以用 API Gateway 把外部 REST 請求轉發給內部 gRPC 服務。
              </p>
              <CodeBlock language="plaintext">{`瀏覽器 / App
     │ REST (HTTPS)
     ▼
API Gateway（Nginx / Kong）
     │ gRPC (HTTP/2)
     ├──► Order Service  :50051
     ├──► Payment Service :50052
     └──► Inventory Service :50053`}</CodeBlock>
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
            {['gRPC', 'Protobuf', 'Microservices', 'HTTP/2', 'Streaming', 'Network'].map(tag => (
              <Chip
                key={tag}
                variant="flat"
                color="primary"
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
            <Link href="/blog/network/ep05-websocket">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span>上一篇</span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">EP.05 WebSocket 與 SSE</p>
                  <p className="text-gray-500 text-xs mt-1">即時通訊的兩種選擇</p>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/network/ep01-http">
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardBody className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-500 text-xs mb-2">
                    <span>回到系列起點</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="font-bold text-gray-900 text-sm">EP.01 HTTP 完全指南</p>
                  <p className="text-gray-500 text-xs mt-1">從頭理解網路通訊的基礎</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
