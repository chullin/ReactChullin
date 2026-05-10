'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Activity,
  Server,
  Code2,
  BarChart3,
  Bell,
  AlertTriangle,
  TrendingUp,
  Gauge,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function DevOpsEP06() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-br from-emerald-800 via-green-700 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">
                EP.06
              </span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                DevOps 系列
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              監控告警：Prometheus + Grafana 完整實戰
              <br />
              <span className="text-emerald-200">
                Metrics 四黃金信號、AlertManager、Dashboard 設計
              </span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              讓問題在用戶發現之前就告警給你 — 從 Node.js 暴露 Metrics，
              到 PromQL 查詢、Grafana Dashboard，再到 AlertManager 即時告警。
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5">
                <User size={14} /> Joseph Chen
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 16 min read
              </span>
              <span className="flex items-center gap-1.5">
                <Activity size={14} /> Prometheus · Grafana · SRE · Monitoring
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ─── Section 1: 為什麼需要監控 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">為什麼需要監控？</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            沒有監控就像開車不看儀表板。引擎過熱、油箱快空，你渾然不知，
            直到車子拋錨才察覺。線上服務也是一樣：問題往往已經持續了一段時間，
            你卻要等到用戶回報才知道。
          </p>

          <Card className="border-0 bg-gray-900 text-white">
            <CardBody className="p-6">
              <p className="text-gray-400 text-xs mb-4 font-mono uppercase tracking-wider">
                沒有監控的典型場景
              </p>
              <div className="font-mono text-sm space-y-1.5">
                <p><span className="text-red-400 font-bold">用戶回報：</span><span className="text-gray-300">「你們網站壞了」</span></p>
                <p><span className="text-blue-400 font-bold">工程師：</span><span className="text-gray-300">「蛤？我這邊沒問題...」</span></p>
                <p className="text-gray-500 pl-4">... 查了 30 分鐘 ...</p>
                <p><span className="text-blue-400 font-bold">工程師：</span><span className="text-gray-300">「喔是 DB connection pool 滿了」</span></p>
                <p className="text-gray-500 pl-4 text-xs">「但我們不知道這個問題已經持續了 2 小時，影響了 40% 的用戶」</p>
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <p className="text-green-400 font-bold">有監控的情況：</p>
                  <p className="text-gray-300">DB connection pool 使用率超過 80% 持續 2 分鐘 → 自動告警到 Slack</p>
                  <p className="text-gray-300">工程師在問題惡化前 20 分鐘收到通知並處理完畢</p>
                  <p className="text-gray-300">用戶完全感知不到異常</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-800">
            Four Golden Signals — SRE 黃金四信號
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Google SRE 團隊提出的「四黃金信號」是監控設計的基礎框架。
            如果你只能監控四個指標，就監控這四個。
            它們能反映出絕大多數的系統問題。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                number: '01',
                signal: 'Latency（延遲）',
                desc: '請求花了多長時間完成？',
                detail: '不只看平均值（Mean），更要看 P95、P99。平均 100ms 但 P99 是 5s，代表 1% 的用戶體驗很差。',
                metric: 'http_request_duration_seconds',
                color: 'bg-blue-50 border-blue-200',
                numberColor: 'text-blue-300',
                titleColor: 'text-blue-800',
              },
              {
                number: '02',
                signal: 'Traffic（流量）',
                desc: '系統承受多少負載？',
                detail: 'RPS（Requests Per Second）是最直觀的指標。流量突然暴增或驟降都是需要調查的信號。',
                metric: 'http_requests_total',
                color: 'bg-emerald-50 border-emerald-200',
                numberColor: 'text-emerald-300',
                titleColor: 'text-emerald-800',
              },
              {
                number: '03',
                signal: 'Errors（錯誤率）',
                desc: '請求失敗的比例是多少？',
                detail: '5xx Server Error 的比例。低錯誤率（< 0.1%）是基本要求，超過 1% 通常需要立即告警。',
                metric: 'rate(http_requests_total{status=~"5.."})',
                color: 'bg-red-50 border-red-200',
                numberColor: 'text-red-300',
                titleColor: 'text-red-800',
              },
              {
                number: '04',
                signal: 'Saturation（飽和度）',
                desc: '系統資源使用了多少？',
                detail: 'CPU、Memory、DB connections、磁碟空間。飽和度高（>80%）預示著效能問題即將發生。',
                metric: 'node_memory_MemAvailable_bytes',
                color: 'bg-amber-50 border-amber-200',
                numberColor: 'text-amber-300',
                titleColor: 'text-amber-800',
              },
            ].map((item, i) => (
              <Card key={i} className={`border ${item.color}`}>
                <CardBody className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <p className={`font-black text-4xl ${item.numberColor}`}>{item.number}</p>
                  </div>
                  <p className={`font-black text-sm mb-1 ${item.titleColor}`}>{item.signal}</p>
                  <p className="text-gray-500 text-xs mb-2">{item.desc}</p>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{item.detail}</p>
                  <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono block truncate">
                    {item.metric}
                  </code>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 2: Prometheus 資料模型 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Gauge className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Prometheus 資料模型</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Prometheus 採用 Pull 模型：它定期主動去拉取（scrape）各個服務暴露的
            <code className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono text-sm mx-1">/metrics</code>
            端點，而不是讓服務把資料推送進來。
            這個設計讓 Prometheus 本身就能感知哪些服務還在運行，哪些已經掛掉。
          </p>

          <CodeBlock language="text">
{` Prometheus Server
    │
    ├── 每 15 秒拉取（scrape）→ /metrics endpoint
    │   ├── api-server:9090/metrics        （你的 Node.js 應用）
    │   ├── postgres-exporter:9187/metrics  （PostgreSQL 指標）
    │   ├── node-exporter:9100/metrics      （主機 CPU/Memory/Disk）
    │   └── redis-exporter:9121/metrics     （Redis 指標）
    │
    ├── 儲存 Time Series 資料（預設保存 15 天）
    │
    └── 提供 PromQL 查詢介面
         └── Grafana 連接 Prometheus 做視覺化 `}
</CodeBlock>

          <h3 className="text-xl font-black text-gray-800">四種 Metric 型別</h3>
          <p className="text-gray-600 leading-relaxed">
            Prometheus 定義了四種 Metric 型別，每種適用不同的場景。
            選錯型別會讓後續查詢和圖表變得困難。
          </p>

          <CodeBlock language="text">
{` # ── Counter（計數器）────────────────────────────────────────────
# 只增不減的累計值。適合：請求次數、錯誤次數、傳輸位元組數
# 注意：Counter 只會增加（除非 process 重啟歸零）
# 實際使用時用 rate() 計算速率，而不是直接看絕對值

http_requests_total{method="GET",  path="/api/posts", status="200"} 15432
http_requests_total{method="POST", path="/api/login",  status="200"} 8821
http_requests_total{method="POST", path="/api/login",  status="401"} 234

# ── Gauge（量表）─────────────────────────────────────────────────
# 可增可減的當前值。適合：CPU 使用率、當前連線數、記憶體使用量
# 直接讀取當前值，不需要 rate()

process_memory_bytes              524288000    # 約 500MB
db_connections_active             42
db_connections_pool_size          100

# ── Histogram（直方圖）──────────────────────────────────────────
# 把觀測值分配到預定義的 bucket（區間）中，用於計算百分位數
# 適合：延遲分布、請求大小分布

http_request_duration_seconds_bucket{le="0.01"}   450   # 10ms 以下 450 個請求
http_request_duration_seconds_bucket{le="0.05"}   780   # 50ms 以下 780 個請求
http_request_duration_seconds_bucket{le="0.1"}    850   # 100ms 以下 850 個請求
http_request_duration_seconds_bucket{le="0.5"}    980   # 500ms 以下 980 個請求
http_request_duration_seconds_bucket{le="1"}      995   # 1s 以下 995 個請求
http_request_duration_seconds_bucket{le="+Inf"}   1000  # 總計 1000 個請求
http_request_duration_seconds_sum                 85.5   # 總耗時秒數
http_request_duration_seconds_count               1000   # 總請求數

# ── Summary（摘要）─────────────────────────────────────────────
# 客戶端計算百分位數（不需要 Prometheus 計算）
# 缺點：不能跨多個 instance 聚合，多機部署時用 Histogram 取代

rpc_duration_seconds{quantile="0.5"}  0.012   # 中位數 12ms
rpc_duration_seconds{quantile="0.9"}  0.087   # P90 87ms
rpc_duration_seconds{quantile="0.99"} 0.342   # P99 342ms `}
</CodeBlock>

          <Card className="border-0 bg-emerald-50">
            <CardBody className="p-5">
              <p className="font-black text-emerald-800 mb-3">Histogram vs Summary 怎麼選？</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-black text-gray-700 mb-2">Histogram（推薦）</p>
                  <ul className="space-y-1 text-gray-600 text-xs">
                    <li>• 服務端計算，客戶端負擔低</li>
                    <li>• 支援跨多個 instance 聚合（多機部署必備）</li>
                    <li>• 可在 Prometheus 端用 histogram_quantile() 計算 P99</li>
                    <li>• 缺點：需要預先定義 bucket 邊界</li>
                  </ul>
                </div>
                <div>
                  <p className="font-black text-gray-700 mb-2">Summary</p>
                  <ul className="space-y-1 text-gray-600 text-xs">
                    <li>• 客戶端計算，精確度高</li>
                    <li>• 無法跨多個 instance 聚合</li>
                    <li>• 適合單機服務或不需聚合的場景</li>
                    <li>• 計算成本在客戶端</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-emerald-700 mt-3 font-medium">
                結論：多機部署的生產環境一律用 Histogram，配合 histogram_quantile() 計算百分位數。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 3: Node.js 暴露 Metrics ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Code2 className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">在 Node.js 暴露 Metrics</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            <code className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono text-sm">prom-client</code> 是 Node.js 最主流的 Prometheus client library，
            提供了四種 Metric 型別的封裝，並自動收集 Node.js 系統預設指標。
          </p>

          <CodeBlock language="typescript">
{` // npm install prom-client
import { collectDefaultMetrics, Counter, Histogram, Gauge, Registry } from 'prom-client';

// 建立獨立的 Registry（避免全域污染，利於測試）
const register = new Registry();

// 自動收集 Node.js 系統指標（process CPU、heap memory、event loop lag 等）
// 相當於免費取得 ~20 個有用的系統指標
collectDefaultMetrics({ register });

// ─── 自訂 Counter：HTTP 請求總數 ──────────────────────────────
const httpRequestTotal = new Counter({
  name:       'http_requests_total',
  help:       'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],    // Label 是 Metric 的維度，用於過濾/聚合
  registers:  [register],
});

// ─── 自訂 Histogram：HTTP 請求延遲 ────────────────────────────
const httpRequestDuration = new Histogram({
  name:       'http_request_duration_seconds',
  help:       'HTTP request duration in seconds',
  labelNames: ['method', 'path'],
  // bucket 邊界：根據你的 SLA 目標設計
  // 例如 SLA 要求 P99 < 500ms，就確保 0.5 在 bucket 裡
  buckets:    [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers:  [register],
});

// ─── 自訂 Gauge：DB connection pool 使用率 ───────────────────
const dbConnectionsActive = new Gauge({
  name:      'db_connections_active',
  help:      'Number of active database connections',
  registers: [register],
});

const dbConnectionsPoolSize = new Gauge({
  name:      'db_connections_pool_size',
  help:      'Database connection pool total size',
  registers: [register],
});

// 定期更新 Gauge（每 10 秒從 DB pool 取得當前狀態）
setInterval(async () => {
  const poolStats = await prisma.$pool.stats();
  dbConnectionsActive.set(poolStats.activeConnections);
  dbConnectionsPoolSize.set(poolStats.totalConnections);
}, 10_000); `}
</CodeBlock>

          <CodeBlock language="typescript">
{` // ─── Express Middleware：自動記錄所有 HTTP 請求 ──────────────
import express from 'express';
const app = express();

app.use((req, res, next) => {
  // startTimer() 回傳一個函數，呼叫時記錄從此刻到呼叫時的耗時
  const endTimer = httpRequestDuration.startTimer({
    method: req.method,
    path:   normalizePath(req.path),  // 把 /api/posts/123 → /api/posts/:id
  });

  res.on('finish', () => {
    // 請求完成時記錄
    httpRequestTotal.inc({
      method: req.method,
      path:   normalizePath(req.path),
      status: res.statusCode.toString(),
    });
    endTimer();   // 自動計算並記錄耗時到 Histogram
  });

  next();
});

// 路徑正規化：避免 /api/posts/1、/api/posts/2 產生無數個不同的 Label
// 這是 Prometheus 基數（Cardinality）爆炸的常見原因
function normalizePath(path: string): string {
  return path
    .replace(/\/\d+/g, '/:id')                          // 數字 ID
    .replace(/\/[0-9a-f-]{36}/gi, '/:uuid')             // UUID
    .replace(/\/[0-9a-f]{24}/gi, '/:objectId');         // MongoDB ObjectId
}

// ─── Prometheus Scrape Endpoint ────────────────────────────────
// Prometheus Server 每 15 秒會來拉取這個端點
app.get('/metrics', async (req, res) => {
  // 限制只有內部網路可以訪問（不能讓公開的互聯網存取）
  const clientIp = req.ip ?? '';
  if (!clientIp.startsWith('10.') && !clientIp.startsWith('172.') && clientIp !== '::1') {
    return res.status(403).send('Forbidden');
  }

  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
}); `}
</CodeBlock>

          <CodeBlock language="typescript">
{` // ─── 業務層 Metrics：記錄重要的業務事件 ─────────────────────
const orderCreatedTotal = new Counter({
  name:       'orders_created_total',
  help:       'Total orders created',
  labelNames: ['payment_method', 'user_tier'],
  registers:  [register],
});

const orderAmountHistogram = new Histogram({
  name:      'order_amount_dollars',
  help:      'Distribution of order amounts in USD',
  buckets:   [10, 50, 100, 500, 1000, 5000],
  registers: [register],
});

// 在業務邏輯中埋點
async function createOrder(data: CreateOrderDto, user: User) {
  const order = await orderService.create(data, user);

  // 記錄業務指標
  orderCreatedTotal.inc({
    payment_method: data.paymentMethod,
    user_tier:      user.tier,
  });
  orderAmountHistogram.observe(order.totalAmount);

  return order;
} `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 4: PromQL ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">PromQL 查詢語言</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            PromQL 是 Prometheus 的查詢語言，用於從時間序列資料中提取有意義的指標。
            掌握以下幾個核心函數，就能寫出 Grafana Dashboard 所需的所有查詢。
          </p>

          <CodeBlock language="promql">
{` # ── 流量（Traffic）────────────────────────────────────────────
# rate()：計算 Counter 在指定時間窗口內的每秒平均增長率
# [5m] 表示用過去 5 分鐘的資料計算
rate(http_requests_total[5m])
# 結果：每秒平均 RPS，帶有 method/path/status 維度

# 按路徑聚合（sum by）— 計算各路徑的 RPS
sum by(path) (rate(http_requests_total[5m]))

# ── 錯誤率（Errors）────────────────────────────────────────────
# 5xx 請求的比例
rate(http_requests_total{status=~"5.."}[5m])
  / rate(http_requests_total[5m])
# =~"5.."  使用正則匹配 500、502、503、504 等

# 以百分比呈現（乘以 100）
(
  rate(http_requests_total{status=~"5.."}[5m])
  / rate(http_requests_total[5m])
) * 100

# ── 延遲（Latency）────────────────────────────────────────────
# histogram_quantile：從 Histogram bucket 計算百分位數
# 0.99 = P99，0.95 = P95，0.50 = P50（中位數）
histogram_quantile(
  0.99,
  rate(http_request_duration_seconds_bucket[5m])
)
# 注意：rate() 要用在 _bucket 上，而不是 _sum 或 _count

# 按路徑分別計算 P99
histogram_quantile(
  0.99,
  sum by(path, le) (rate(http_request_duration_seconds_bucket[5m]))
)

# ── 飽和度（Saturation）───────────────────────────────────────
# CPU 使用率（Node Exporter 提供的指標）
100 - (
  avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100
)

# 記憶體使用率
(
  1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes
) * 100

# DB Connection Pool 使用率
db_connections_active / db_connections_pool_size * 100

# ── 進階：多個指標組合 ─────────────────────────────────────────
# 計算每個路徑的平均延遲（sum/count）
rate(http_request_duration_seconds_sum[5m])
  / rate(http_request_duration_seconds_count[5m])

# 最近 1 小時的錯誤請求總數
increase(http_requests_total{status=~"5.."}[1h]) `}
</CodeBlock>

          <Card className="border-0 bg-slate-50">
            <CardBody className="p-5">
              <p className="font-black text-gray-800 mb-3">PromQL 常用函數速查</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { fn: 'rate(metric[5m])', desc: 'Counter 的每秒增長率（最常用）' },
                  { fn: 'increase(metric[1h])', desc: 'Counter 在時間窗口內的總增量' },
                  { fn: 'sum by(label)(expr)', desc: '按指定 Label 分組聚合' },
                  { fn: 'avg by(label)(expr)', desc: '按指定 Label 分組取平均' },
                  { fn: 'histogram_quantile(0.99, ...)', desc: '從 Histogram 計算百分位數' },
                  { fn: 'delta(gauge[5m])', desc: 'Gauge 在時間窗口的變化量' },
                  { fn: 'predict_linear(metric[1h], 3600)', desc: '線性預測未來 1 小時的值' },
                  { fn: 'topk(5, metric)', desc: '取值最大的前 5 個 series' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <code className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-mono shrink-0 mt-0.5">
                      {item.fn}
                    </code>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 5: Grafana Dashboard ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Grafana Dashboard 設計</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Prometheus 收集資料，Grafana 做視覺化。先設定 Prometheus scrape 設定，
            再連接 Grafana 建立 Dashboard。
          </p>

          <CodeBlock language="yaml">
{` # prometheus.yml — Prometheus 設定檔
global:
  scrape_interval:     15s   # 每 15 秒拉取一次
  evaluation_interval: 15s   # 每 15 秒評估一次告警規則

# 告警規則設定（指向 rule 檔案）
rule_files:
  - "alert-rules.yml"

# AlertManager 設定（接收告警並發送通知）
alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

# 抓取設定（scrape_configs）
scrape_configs:
  # Prometheus 監控自己
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # 你的 Node.js 應用
  - job_name: 'api-server'
    static_configs:
      - targets: ['api-server:9090']
    metrics_path: '/metrics'
    scrape_interval: 10s      # 應用層可以更頻繁

  # PostgreSQL（需要安裝 postgres_exporter）
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  # 主機系統（需要安裝 node_exporter）
  - job_name: 'node'
    static_configs:
      - targets:
          - 'server-1:9100'
          - 'server-2:9100'
          - 'server-3:9100'

  # Redis（需要安裝 redis_exporter）
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121'] `}
</CodeBlock>

          <h3 className="text-xl font-black text-gray-800">標準服務 Dashboard 應包含的 Panel</h3>
          <p className="text-gray-600 leading-relaxed">
            一個完整的服務 Dashboard 應該讓 On-call 工程師在 10 秒內判斷服務是否健康。
            以下是推薦的 Panel 組合，按重要性排序。
          </p>

          <div className="space-y-3">
            {[
              {
                panel: '1. Overview Row（最上方大數字）',
                desc: 'RPS、Error Rate、P99 Latency 三個 Stat Panel。一眼看出當前服務健康狀態。用顏色閾值：綠色（正常）→ 黃色（警告）→ 紅色（危急）。',
                promql: 'sum(rate(http_requests_total[5m]))',
                color: 'bg-blue-50 border-blue-200',
              },
              {
                panel: '2. Request Rate Graph（折線圖）',
                desc: '按 HTTP method（GET/POST/DELETE）分線，顯示過去 24 小時的流量趨勢。可以快速判斷是否有異常流量。',
                promql: 'sum by(method) (rate(http_requests_total[5m]))',
                color: 'bg-emerald-50 border-emerald-200',
              },
              {
                panel: '3. Latency Distribution Graph（P50/P95/P99 三條線）',
                desc: '三條百分位數曲線。P99 突然上升通常是資源瓶頸或慢 Query 的早期信號。',
                promql: 'histogram_quantile(0.99, sum by(le) (rate(http_request_duration_seconds_bucket[5m])))',
                color: 'bg-purple-50 border-purple-200',
              },
              {
                panel: '4. Error Rate Graph（按 Status Code 分色）',
                desc: '500/502/503/504 各自一條線。不同錯誤碼代表不同問題：502/504 通常是上游問題，500 是應用程式 bug。',
                promql: 'sum by(status) (rate(http_requests_total{status=~"5.."}[5m]))',
                color: 'bg-red-50 border-red-200',
              },
              {
                panel: '5. Resource Usage（CPU / Memory / Disk）',
                desc: '系統資源使用率。設定 80% 告警閾值。特別注意 Memory 持續緩慢上升，可能是記憶體洩漏。',
                promql: '(1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100',
                color: 'bg-amber-50 border-amber-200',
              },
              {
                panel: '6. DB Connection Pool（DB 連線池使用率）',
                desc: '連線池使用率接近 100% 是嚴重的效能瓶頸。新的請求會被阻塞等待連線，P99 延遲會飆升。',
                promql: 'db_connections_active / db_connections_pool_size * 100',
                color: 'bg-teal-50 border-teal-200',
              },
            ].map((item, i) => (
              <Card key={i} className={`border ${item.color}`}>
                <CardBody className="p-5">
                  <p className="font-black text-gray-800 text-sm mb-2">{item.panel}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>
                  <code className="text-xs bg-gray-100 text-gray-600 px-3 py-2 rounded font-mono block">
                    {item.promql}
                  </code>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card className="border-0 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
            <CardBody className="p-6">
              <p className="font-black mb-3">推薦直接 Import 的社群 Dashboard</p>
              <p className="text-slate-300 text-sm mb-4">
                Grafana 有社群分享的 Dashboard JSON，可以直接 Import 免去從頭建立的時間。
                在 Grafana 介面選 Dashboards → Import，輸入以下 ID 即可。
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: '11159', name: 'Node.js Dashboard', desc: 'process、heap、GC、event loop' },
                  { id: '9628',  name: 'PostgreSQL Dashboard', desc: 'query time、connections、cache hit rate' },
                  { id: '6417',  name: 'Kubernetes Dashboard', desc: 'pod、node、namespace 資源使用' },
                ].map((item) => (
                  <div key={item.id} className="bg-white/10 rounded-xl p-4">
                    <p className="text-2xl font-black text-emerald-300 mb-1">#{item.id}</p>
                    <p className="font-black text-sm mb-1">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 6: AlertManager ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Bell className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">AlertManager — 告警規則</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            AlertManager 負責接收 Prometheus 的告警，做去重（dedup）、分組（grouping）、
            靜默（silencing），最後路由到不同的通知管道（Slack、PagerDuty、Email）。
            告警規則定義在 Prometheus 的 rule 檔案中。
          </p>

          <CodeBlock language="yaml">
{` # alert-rules.yml — 告警規則定義
groups:
  - name: api_alerts
    rules:

      # ── 錯誤率超過 1% 持續 5 分鐘 ──────────────────────────
      - alert: HighErrorRate
        expr: |
          (
            rate(http_requests_total{status=~"5.."}[5m])
            / rate(http_requests_total[5m])
          ) > 0.01
        for: 5m     # 條件持續 5 分鐘才告警（避免瞬間尖峰誤報）
        labels:
          severity: critical
          team:     backend
        annotations:
          summary:     "錯誤率過高"
          description: >
            服務 {{ $labels.instance }} 的 5xx 錯誤率達
            {{ $value | humanizePercentage }}，
            已持續 5 分鐘。請立即查看 Error Log。

      # ── P99 延遲超過 500ms 持續 10 分鐘 ─────────────────────
      - alert: HighLatency
        expr: |
          histogram_quantile(
            0.99,
            sum by(le) (rate(http_request_duration_seconds_bucket[5m]))
          ) > 0.5
        for: 10m
        labels:
          severity: warning
        annotations:
          summary:     "P99 延遲過高"
          description: "P99 延遲達 {{ $value | humanizeDuration }}，請檢查慢查詢或資源瓶頸。"

      # ── 記憶體使用率超過 90% ──────────────────────────────────
      - alert: HighMemoryUsage
        expr: |
          (1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) > 0.9
        for: 2m
        labels:
          severity: critical
        annotations:
          summary:     "記憶體使用率過高"
          description: "主機 {{ $labels.instance }} 記憶體使用率達 {{ $value | humanizePercentage }}。"

      # ── DB Connection Pool 使用率超過 85% ─────────────────────
      - alert: HighDBConnectionUsage
        expr: |
          db_connections_active / db_connections_pool_size > 0.85
        for: 3m
        labels:
          severity: warning
        annotations:
          summary:     "DB Connection Pool 快滿了"
          description: "Connection pool 使用率 {{ $value | humanizePercentage }}，新請求可能被阻塞。"

      # ── 服務 Down（沒有收到 Metrics）──────────────────────────
      - alert: ServiceDown
        expr: up{job="api-server"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary:     "服務不可用"
          description: "{{ $labels.instance }} 已無法抓取 Metrics 超過 1 分鐘，可能已 Down。" `}
</CodeBlock>

          <CodeBlock language="yaml">
{` # alertmanager.yml — AlertManager 路由與通知設定
global:
  # 預設的 Slack Webhook（也可以在各 receiver 中個別設定）
  slack_api_url: 'https://hooks.slack.com/services/xxx/yyy/zzz'

# 告警分組設定
# 相同 alertname + cluster 的告警會被合併成一條通知（避免告警風暴）
route:
  group_by:         ['alertname', 'cluster', 'service']
  group_wait:       30s    # 等待 30 秒看有沒有同組其他告警，一起發
  group_interval:   5m     # 同組告警每 5 分鐘最多發一次
  repeat_interval:  4h     # 同一個 active 告警每 4 小時重複通知一次

  receiver: 'slack-warning'    # 預設 receiver

  # 子路由：根據 label 路由到不同的通知管道
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty'    # Critical 告警 → PagerDuty（24h On-Call）
      continue: true           # continue: true = 同時也傳到預設 receiver

    - match:
        severity: warning
      receiver: 'slack-warning'

    - match:
        team: backend
      receiver: 'slack-backend-team'

receivers:
  # ── Slack 通知（Warning）────────────────────────────────────
  - name: 'slack-warning'
    slack_configs:
      - channel: '#alerts-warning'
        title:   '⚠️ {{ .GroupLabels.alertname }}'
        text:    |
          {{ range .Alerts }}
          *告警*: {{ .Annotations.summary }}
          *詳情*: {{ .Annotations.description }}
          *嚴重度*: {{ .Labels.severity }}
          {{ end }}
        send_resolved: true    # 告警恢復時也發通知

  # ── PagerDuty（Critical，會打電話 On-Call 工程師）──────────
  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'your-pagerduty-service-key'
        description: '{{ .CommonAnnotations.summary }}'
        severity:    'critical'

  # ── 告警靜默（Silencing）────────────────────────────────────
  # 可在 AlertManager UI 設定，避免維護期間誤報
  # 例如：部署新版本的 5 分鐘內靜默所有告警 `}
</CodeBlock>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-green-50">
              <CardBody className="p-5">
                <p className="font-black text-green-800 mb-3 text-sm">好的告警設計原則</p>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✓</span>
                    告警要 Actionable（收到後知道該做什麼）
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✓</span>
                    用 for: 避免瞬間尖峰誤報（至少 1-5 分鐘）
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✓</span>
                    Critical 才打電話，Warning 發 Slack 即可
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✓</span>
                    告警訊息包含足夠的上下文（哪台機器、當前值）
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✓</span>
                    恢復時（resolved）也要發通知
                  </li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 bg-red-50">
              <CardBody className="p-5">
                <p className="font-black text-red-800 mb-3 text-sm">常見的告警反模式</p>
                <ul className="text-sm text-red-700 space-y-2">
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✗</span>
                    告警太多導致疲勞（Alert Fatigue），工程師開始忽略
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✗</span>
                    沒有 for 子句，瞬間尖峰就觸發
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✗</span>
                    告警訊息不清楚，需要查了才知道問題在哪
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✗</span>
                    只告警症狀（CPU 高），沒有告警原因（慢查詢）
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black shrink-0">✗</span>
                    所有告警都用 Critical 等級
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        {/* ─── 總結 ─── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-emerald-800 via-green-800 to-teal-800 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                {
                  icon: '📊',
                  text: 'Four Golden Signals：Latency（P50/P95/P99）、Traffic（RPS）、Errors（5xx 比率）、Saturation（CPU/Memory/DB Pool）。這四個指標能反映 90% 的系統問題。',
                },
                {
                  icon: '🔄',
                  text: 'Prometheus 採用 Pull 模型，每 15 秒主動 scrape 各服務的 /metrics 端點。四種 Metric 型別：Counter（只增不減）、Gauge（可增可減）、Histogram（延遲分布）、Summary（客戶端百分位數）。',
                },
                {
                  icon: '⚙️',
                  text: 'Node.js 使用 prom-client。用 Express Middleware 自動記錄所有 HTTP 請求的 Counter 和 Histogram。路徑正規化（/posts/:id）避免 Label 基數爆炸。',
                },
                {
                  icon: '🔎',
                  text: 'PromQL 核心函數：rate()（Counter 速率）、histogram_quantile(0.99, ...)（P99）、sum by(label)（分組聚合）。這三個組合能寫出 Four Golden Signals 的所有查詢。',
                },
                {
                  icon: '📈',
                  text: 'Grafana Dashboard 標準配置：Overview 大數字（RPS/Error Rate/P99）、Request Rate 折線圖、Latency 三條線（P50/P95/P99）、Error Rate 按 Status Code 分色、Resource Usage。',
                },
                {
                  icon: '🔔',
                  text: 'AlertManager 告警設計：用 for 避免誤報（至少 1-5 分鐘）、Critical 走 PagerDuty、Warning 走 Slack、告警訊息包含足夠上下文、設定 repeat_interval 避免無限重複通知。',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-white/90 font-medium leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Navigation ─── */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/blog/devops/ep05-deployment-strategy"
            className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6"
          >
            <ArrowLeft
              size={18}
              className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors"
            />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
              EP.05 — 藍綠部署
            </p>
            <p className="text-sm text-gray-500 mt-1">
              零 Downtime 部署策略與 Canary Release
            </p>
          </Link>
          <Link
            href="/blog/devops/ep01-test-pyramid"
            className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 text-right"
          >
            <ArrowRight
              size={18}
              className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors ml-auto"
            />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">回到起點</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
              EP.01 — 測試金字塔
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Unit、Integration、E2E 測試策略設計
            </p>
          </Link>
        </div>

        {/* ─── Tags ─── */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {[
            'Prometheus',
            'Grafana',
            'Monitoring',
            'Alerting',
            'Metrics',
            'SRE',
            'DevOps',
          ].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">
              {tag}
            </Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
