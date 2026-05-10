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
  Shield,
  Cpu,
  Server,
  AlertTriangle,
  RefreshCw,
  Layers
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function SysDesignEP07() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">
                EP.07
              </span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                系統設計系列
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              限流設計：保護你的系統不被打垮
              <br />
              <span className="text-red-200">
                Token Bucket、Leaky Bucket、Sliding Window、Redis 實作
              </span>
            </h1>
            <p className="text-red-100 text-lg mb-8 max-w-2xl">
              面試最常考的限流演算法完整指南。從演算法原理到 Node.js 單機實作，
              再到 Redis 分散式方案，最後討論不同資源的限流策略設計。
            </p>
            <div className="flex items-center gap-6 text-red-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5">
                <User size={14} /> Joseph Chen
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 15 min read
              </span>
              <span className="flex items-center gap-1.5">
                <Shield size={14} /> Rate Limiting · Token Bucket · Redis · System Design
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ─── Section 1: 為什麼需要限流 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">為什麼需要限流？</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            沒有限流的系統就像沒有閥門的水管：正常流量時運作良好，
            但流量突然暴增時，整個系統可能直接崩潰。
          </p>

          <Card className="border-0 bg-gray-900 text-white">
            <CardBody className="p-6">
              <p className="text-gray-400 text-xs mb-4 font-mono uppercase tracking-wider">
                有 vs 沒有限流
              </p>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 font-black w-28 shrink-0">正常流量</span>
                  <span className="text-gray-400">100 req/s</span>
                  <span className="text-gray-600 mx-2">→</span>
                  <span className="bg-green-900/40 text-green-300 px-3 py-1 rounded-lg">API Server ✓</span>
                  <span className="text-gray-600 mx-2">→</span>
                  <span className="bg-green-900/40 text-green-300 px-3 py-1 rounded-lg">DB ✓</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-400 font-black w-28 shrink-0">沒有限流</span>
                  <span className="text-gray-400">10,000 req/s</span>
                  <span className="text-gray-600 mx-2">→</span>
                  <span className="bg-red-900/40 text-red-300 px-3 py-1 rounded-lg">API 過載 ✗</span>
                  <span className="text-gray-600 mx-2">→</span>
                  <span className="bg-red-900/40 text-red-300 px-3 py-1 rounded-lg">DB 崩潰 ✗</span>
                  <span className="text-gray-600 mx-2">→</span>
                  <span className="text-red-400">全站 500</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-black w-28 shrink-0">有限流</span>
                  <span className="text-gray-400">10,000 req/s</span>
                  <span className="text-gray-600 mx-2">→</span>
                  <span className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-lg">Rate Limiter</span>
                  <span className="text-gray-600 mx-2">→</span>
                  <span className="bg-green-900/40 text-green-300 px-2 py-1 rounded-lg text-xs">100 req 通過</span>
                  <span className="text-gray-400 text-xs ml-1">9,900 → 429</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-800">三種需要限流的場景</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🚫',
                title: '防止濫用',
                desc: '防止惡意用戶大量爬取資料、暴力破解密碼、或透過 API 進行 DDoS 攻擊。',
                color: 'bg-red-50 border-red-200',
                titleColor: 'text-red-800',
              },
              {
                icon: '🛡️',
                title: '保護後端',
                desc: '突發流量（秒殺活動、新聞爆紅）不讓 DB、下游微服務、第三方 API 被打垮。',
                color: 'bg-orange-50 border-orange-200',
                titleColor: 'text-orange-800',
              },
              {
                icon: '⚖️',
                title: '公平分配',
                desc: '確保每個用戶都有合理的 quota，防止少數高頻用戶消耗大部分資源，影響其他人。',
                color: 'bg-amber-50 border-amber-200',
                titleColor: 'text-amber-800',
              },
            ].map((item, i) => (
              <Card key={i} className={`border ${item.color}`}>
                <CardBody className="p-5">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className={`font-black text-sm mb-2 ${item.titleColor}`}>{item.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card className="border-0 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
            <CardBody className="p-5">
              <p className="font-black mb-2">類比：捷運站閘門</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                限流就像捷運站的閘門。正常流量下大家都能快速刷卡進站。
                尖峰時期閘門控制進站速度，讓站內不至於擁擠到危險。
                如果超過承載量就暫時關閘（429 Too Many Requests），
                等人潮散去再開放。閘門的目的不是阻止乘客，而是讓系統有序運作。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 2: 四種限流演算法 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Cpu className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">四種限流演算法</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            面試最常被問到的就是這四種演算法，每種都有其適用場景與缺點。
            理解原理才能在面試和實際設計中做出正確選擇。
          </p>

          <div className="space-y-6">

            {/* Fixed Window */}
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-black text-gray-900 text-lg">1. Fixed Window（固定視窗）</p>
                    <p className="text-gray-500 text-sm">最簡單，但有邊界漏洞</p>
                  </div>
                  <span className="bg-red-100 text-red-700 text-xs font-black px-3 py-1 rounded-full">
                    有缺陷
                  </span>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 mb-4">
                  <p className="text-gray-500 mb-2"># 每分鐘允許 100 次請求</p>
                  <p><span className="text-yellow-400">0:00</span> ─ <span className="text-yellow-400">0:59</span>  →  計數器（用完就拒絕）</p>
                  <p><span className="text-green-400">1:00</span> ─ <span className="text-green-400">1:59</span>  →  計數器重置</p>
                  <p className="text-red-400 mt-3"># 問題：視窗邊界可以打 2 倍請求</p>
                  <p className="text-gray-400">0:59 打 100 次 + 1:00 打 100 次 = 200 次/2秒</p>
                </div>
                <p className="text-gray-600 text-sm">
                  固定視窗計數器在視窗切換瞬間有明顯漏洞，適合對精確度要求不高的場景（如每日 API 配額）。
                </p>
              </CardBody>
            </Card>

            {/* Sliding Window */}
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-black text-gray-900 text-lg">2. Sliding Window（滑動視窗）</p>
                    <p className="text-gray-500 text-sm">更精確，但儲存成本較高</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-1 rounded-full">
                    推薦
                  </span>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 mb-4">
                  <p className="text-gray-500 mb-2"># 任意時刻往前推 1 分鐘內，最多 100 次請求</p>
                  <p><span className="text-blue-400">t=1:30</span>  →  統計 <span className="text-yellow-400">0:30 ~ 1:30</span> 的請求數</p>
                  <p><span className="text-blue-400">t=1:45</span>  →  統計 <span className="text-yellow-400">0:45 ~ 1:45</span> 的請求數</p>
                  <p className="text-green-400 mt-3"># 沒有邊界漏洞，任何 60 秒視窗都不超過 100 次</p>
                  <p className="text-gray-500"># 實作：用 Redis Sorted Set 儲存每次請求的時間戳</p>
                </div>
                <p className="text-gray-600 text-sm">
                  每次請求都需要記錄時間戳（用 Redis Sorted Set），儲存成本隨請求量線性增加。
                  Section 4 的 Redis 實作就是基於滑動視窗。
                </p>
              </CardBody>
            </Card>

            {/* Token Bucket */}
            <Card className="border-0 shadow-md border-l-4 border-orange-400">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-black text-gray-900 text-lg">3. Token Bucket（令牌桶）</p>
                    <p className="text-gray-500 text-sm">最常用，允許突發流量</p>
                  </div>
                  <span className="bg-orange-100 text-orange-700 text-xs font-black px-3 py-1 rounded-full">
                    最常用
                  </span>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 mb-4">
                  <p className="text-gray-500 mb-2"># Token Bucket 運作邏輯</p>
                  <p>桶容量：<span className="text-yellow-400">100</span> 個令牌（最多儲存 100 個）</p>
                  <p>補充速率：每秒 <span className="text-green-400">10</span> 個令牌</p>
                  <p className="mt-2">請求進來  →  從桶取 1 個令牌</p>
                  <p>          ├─ 有令牌  →  允許請求 <span className="text-green-400">✓</span></p>
                  <p>          └─ 桶空了  →  429 Too Many Requests <span className="text-red-400">✗</span></p>
                  <p className="text-blue-400 mt-2"># 桶滿了時：可短暫以 100 req/s 高速處理（突發）</p>
                  <p className="text-blue-400"># 長期速率：受補充速率控制（10 req/s）</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Token Bucket 的最大優點是允許合理的突發流量（Burst）。
                  用戶偶爾的批次操作可以被吸收，但長期平均速率仍然受控。
                  AWS API Gateway、Stripe API 都採用類似機制。
                </p>
              </CardBody>
            </Card>

            {/* Leaky Bucket */}
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-black text-gray-900 text-lg">4. Leaky Bucket（漏桶）</p>
                    <p className="text-gray-500 text-sm">平滑輸出，保護下游</p>
                  </div>
                  <span className="bg-teal-100 text-teal-700 text-xs font-black px-3 py-1 rounded-full">
                    保護下游
                  </span>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 mb-4">
                  <p className="text-gray-500 mb-2"># Leaky Bucket 運作邏輯</p>
                  <p>請求進來  →  放入佇列（桶）</p>
                  <p>          ├─ 佇列未滿  →  排隊等待</p>
                  <p>          └─ 佇列已滿  →  429 丟棄請求</p>
                  <p className="mt-2 text-green-400">以固定速率（leak rate）從佇列取出並處理</p>
                  <p className="text-gray-500">→ 無論流入速率多快，流出一定是平滑的</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Leaky Bucket 強制輸出速率恆定，非常適合保護下游系統（DB、第三方 API）。
                  缺點是突發流量會在佇列中等待，可能增加延遲；適合後台批次處理，不適合需要低延遲的 API。
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="border-0 bg-slate-50">
            <CardBody className="p-5">
              <p className="font-black text-gray-800 mb-3 text-sm">快速選型指南</p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-bold text-gray-700 mb-1">Token Bucket</p>
                  <p className="text-gray-500 text-xs">需要允許突發、對用戶友善的 API 限流</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-1">Sliding Window</p>
                  <p className="text-gray-500 text-xs">需要精確控制任意時間段的請求數</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-1">Leaky Bucket</p>
                  <p className="text-gray-500 text-xs">需要保護下游系統，輸出必須平滑</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-1">Fixed Window</p>
                  <p className="text-gray-500 text-xs">每日/每月 API 配額，精確度要求低</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 3: Node.js 實作 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Server className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">
              Node.js 實作（Token Bucket）
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            先從單機記憶體實作開始理解 Token Bucket 的核心邏輯，
            再到 Section 4 升級到 Redis 分散式版本。
          </p>

          <CodeBlock
            title="TokenBucket 類別實作"
            lang="typescript"
            code={`class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,    // 桶的最大容量（決定允許的最大突發量）
    private refillRate: number,  // 每秒補充多少令牌（決定長期平均速率）
  ) {
    this.tokens = capacity;      // 初始時桶是滿的
    this.lastRefill = Date.now();
  }

  consume(n: number = 1): boolean {
    this.refill();               // 先補充令牌，再嘗試消耗

    if (this.tokens >= n) {
      this.tokens -= n;
      return true;               // 允許請求
    }
    return false;                // 令牌不足，拒絕請求
  }

  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;  // 換算成秒

    // 根據經過的時間補充令牌，但不超過桶的容量
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;
  }

  // 取得當前令牌數（用於回傳 X-RateLimit-Remaining header）
  getRemainingTokens(): number {
    this.refill();
    return Math.floor(this.tokens);
  }
}`}
          />

          <CodeBlock
            title="Express Middleware 封裝"
            lang="typescript"
            code={`import { Request, Response, NextFunction } from 'express';

// 用 Map 儲存每個 IP 的 TokenBucket（真實環境應用 Redis 取代，見 Section 4）
const buckets = new Map<string, TokenBucket>();

// 定期清理長時間未使用的 bucket，避免記憶體洩漏
setInterval(() => {
  // 在生產環境中，可以記錄最後使用時間並清理超過 1 小時未使用的 entry
  if (buckets.size > 100_000) buckets.clear();
}, 60 * 60 * 1000);

function rateLimiter(capacity: number, refillRate: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 限流的「粒度」：以 IP 為單位
    // 實際場景可改為 user ID、API Key 或 IP + endpoint 組合
    const key = req.ip ?? 'unknown';

    if (!buckets.has(key)) {
      buckets.set(key, new TokenBucket(capacity, refillRate));
    }

    const bucket = buckets.get(key)!;
    const remaining = bucket.getRemainingTokens();

    // 標準的限流 Response Header（讓客戶端知道剩餘配額）
    res.setHeader('X-RateLimit-Limit', capacity.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', Math.ceil(Date.now() / 1000 + 1).toString());

    if (bucket.consume()) {
      next();  // 允許通過
    } else {
      res.setHeader('Retry-After', '1');  // 建議 1 秒後重試
      res.status(429).json({
        error:      'Too Many Requests',
        message:    '請求太頻繁，請稍後再試',
        retryAfter: 1,
      });
    }
  };
}

// ─── 使用範例 ────────────────────────────────────────────────────────
// 全域限流：每 IP 每秒補 10 個令牌，最多 100 個（允許 10x 突發）
app.use('/api/', rateLimiter(100, 10));

// 針對特定路由更嚴格的限流
app.use('/api/login', rateLimiter(5, 0.1));   // 最多 5 次，每 10 秒補 1 個

// 搭配 express-rate-limit 套件（生產環境推薦）
// npm install express-rate-limit
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 分鐘
  max:      10,               // 最多 10 次
  message:  { error: 'Too Many Login Attempts' },
  standardHeaders: true,      // 自動加 RateLimit-* headers
  legacyHeaders:   false,
});
app.post('/api/login', loginLimiter, loginHandler);`}
          />
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 4: Redis 分散式限流 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Layers className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Redis 分散式限流</h2>
          </div>

          <Card className="border-l-4 border-amber-400 bg-amber-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-amber-800 mb-2">單機記憶體的致命缺點</p>
              <p className="text-amber-700 text-sm leading-relaxed">
                Section 3 的 TokenBucket 把狀態存在應用層記憶體中。
                當你有多台 API Server 時（負載均衡）每台各自計數，
                同一個 IP 可以打每台伺服器各 100 次，實際通過的請求是設定值的 N 倍。
                解法：用 Redis 作為共享狀態存儲，讓所有 Server 讀寫同一個計數器。
              </p>
            </CardBody>
          </Card>

          <CodeBlock
            title="Redis Sliding Window 分散式實作（Next.js API Route）"
            lang="typescript"
            code={`import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

async function slidingWindowRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now       = Date.now();
  const windowStart = now - windowMs;

  // 使用 Redis Pipeline 把多個命令打包成一次網路往返，減少延遲
  const pipeline = redis.pipeline();

  // 1. 移除視窗外（過期）的請求記錄
  pipeline.zremrangebyscore(key, '-inf', windowStart);

  // 2. 計算目前視窗內的請求數
  pipeline.zcard(key);

  // 3. 加入當前請求（score = 時間戳，member = 唯一 ID）
  //    使用時間戳 + 亂數確保 member 唯一（相同毫秒內多個請求）
  pipeline.zadd(key, now, \`\${now}-\${Math.random().toString(36).slice(2)}\`);

  // 4. 設定 key 的 TTL（窗口結束後自動清理，避免 Redis 記憶體洩漏）
  pipeline.pexpire(key, windowMs);

  const results = await pipeline.exec();

  // results[1] 是 zcard 的結果（pipeline exec 前的 count，不含當前請求）
  const requestCount = results![1][1] as number;

  const allowed   = requestCount < limit;
  const remaining = Math.max(0, limit - requestCount - (allowed ? 1 : 0));
  const resetAt   = now + windowMs;

  return { allowed, remaining, resetAt };
}

// ─── Next.js API Route Middleware ─────────────────────────────────────
export async function rateLimitMiddleware(
  req: Request,
  options: { limit?: number; windowMs?: number } = {}
): Promise<Response | null> {
  const { limit = 100, windowMs = 60_000 } = options;

  // 取得真實 IP（考慮反向代理，如 Nginx、Cloudflare）
  const ip =
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown';

  const key = \`rate-limit:\${ip}\`;

  const { allowed, remaining, resetAt } = await slidingWindowRateLimit(
    key, limit, windowMs
  );

  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'Too Many Requests', message: '請求過於頻繁，請稍後再試' }),
      {
        status: 429,
        headers: {
          'Content-Type':          'application/json',
          'X-RateLimit-Limit':     limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset':     Math.ceil(resetAt / 1000).toString(),
          'Retry-After':           Math.ceil(windowMs / 1000).toString(),
        },
      }
    );
  }

  return null;  // 回傳 null 表示允許繼續
}

// ─── 在 Next.js Route Handler 中使用 ─────────────────────────────────
// app/api/posts/route.ts
export async function GET(req: Request) {
  // 先過限流
  const limitResponse = await rateLimitMiddleware(req, { limit: 60, windowMs: 60_000 });
  if (limitResponse) return limitResponse;

  // 正常業務邏輯
  const posts = await fetchPosts();
  return Response.json({ posts });
}

// ─── 或在 Next.js Middleware（middleware.ts）統一處理 ─────────────────
// middleware.ts（Next.js Edge Runtime，效能最佳）
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 只對 API 路由做限流
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';
  // Edge Runtime 建議用 @upstash/ratelimit（基於 Upstash Redis，原生支援 Edge）
  // const { success } = await ratelimit.limit(ip);
  // if (!success) return new NextResponse('Too Many Requests', { status: 429 });

  return NextResponse.next();
}`}
          />

          <CodeBlock
            title="Lua Script：原子性 Token Bucket（避免 TOCTOU 競態）"
            lang="typescript"
            code={`// 進階：用 Lua Script 讓 Token Bucket 在 Redis 中原子執行
// Redis 保證 Lua Script 是原子的，不需要分散式鎖

const TOKEN_BUCKET_SCRIPT = \`
local key       = KEYS[1]
local capacity  = tonumber(ARGV[1])   -- 桶容量
local refillRate = tonumber(ARGV[2])  -- 每秒補充速率（令牌數）
local now       = tonumber(ARGV[3])   -- 當前時間（毫秒）
local cost      = tonumber(ARGV[4])   -- 本次消耗令牌數（通常 = 1）

-- 讀取上次狀態
local lastTokens = tonumber(redis.call('HGET', key, 'tokens') or capacity)
local lastRefill = tonumber(redis.call('HGET', key, 'lastRefill') or now)

-- 計算應補充的令牌
local elapsed = math.max(0, now - lastRefill) / 1000
local tokens  = math.min(capacity, lastTokens + elapsed * refillRate)

-- 判斷是否允許
local allowed = 0
if tokens >= cost then
  tokens  = tokens - cost
  allowed = 1
end

-- 更新狀態，設定 TTL（capacity / refillRate 秒後桶會補滿）
redis.call('HSET', key, 'tokens', tokens, 'lastRefill', now)
redis.call('EXPIRE', key, math.ceil(capacity / refillRate) + 1)

return { allowed, math.floor(tokens) }
\`;

async function tokenBucketRedis(
  key: string,
  capacity: number,
  refillRate: number,
  cost = 1
): Promise<{ allowed: boolean; remaining: number }> {
  const [allowed, remaining] = await redis.eval(
    TOKEN_BUCKET_SCRIPT,
    1,             // numkeys
    key,           // KEYS[1]
    capacity,      // ARGV[1]
    refillRate,    // ARGV[2]
    Date.now(),    // ARGV[3]
    cost,          // ARGV[4]
  ) as [number, number];

  return { allowed: allowed === 1, remaining };
}`}
          />
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 5: 限流策略設計 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Shield className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">限流策略設計</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            不同端點有不同的安全需求和資源成本，不應該套用相同的限流策略。
            以下是一個典型電商/內容平台的限流設計參考。
          </p>

          <Card className="border-0 shadow-md">
            <CardBody className="p-0 overflow-hidden">
              <div className="bg-red-800 text-white px-6 py-3">
                <p className="font-black">各端點限流策略建議</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="bg-red-50">
                      <th className="px-5 py-3 text-left font-black text-gray-700">端點</th>
                      <th className="px-5 py-3 text-left font-black text-gray-700">限流策略</th>
                      <th className="px-5 py-3 text-left font-black text-gray-700">限流粒度</th>
                      <th className="px-5 py-3 text-left font-black text-gray-700">原因</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        'GET /api/products',
                        '1000 req / min',
                        'IP',
                        '讀取操作，可寬鬆；有 CDN 快取輔助',
                      ],
                      [
                        'POST /api/login',
                        '5 req / min',
                        'IP',
                        '防暴力破解密碼，需要非常嚴格',
                      ],
                      [
                        'POST /api/register',
                        '3 req / hour',
                        'IP',
                        '防止批量假帳號建立',
                      ],
                      [
                        'POST /api/comment',
                        '10 req / min',
                        'User ID',
                        '防洗版、防垃圾留言',
                      ],
                      [
                        'GET /api/export',
                        '1 req / min',
                        'User ID',
                        '資源密集，產生大型 CSV/Excel',
                      ],
                      [
                        'POST /api/ai-generate',
                        '10 req / day',
                        'User ID',
                        'LLM API 成本高，按日控制配額',
                      ],
                      [
                        'POST /api/payment',
                        '3 req / min',
                        'User ID',
                        '防止重複扣款，配合冪等性設計',
                      ],
                    ].map(([endpoint, strategy, unit, reason], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-red-50/30'}>
                        <td className="px-5 py-3 font-mono text-xs text-red-700 font-bold border-b border-red-100">
                          {endpoint}
                        </td>
                        <td className="px-5 py-3 font-bold text-gray-800 border-b border-red-100">
                          {strategy}
                        </td>
                        <td className="px-5 py-3 text-gray-500 border-b border-red-100">
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
                            {unit}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-500 border-b border-red-100">
                          {reason}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-800">限流的分層架構</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            生產環境的限流不是只在應用層做一層，而是多層防禦：
          </p>
          <div className="space-y-3">
            {[
              {
                layer: '第一層：CDN / WAF',
                desc: '按 IP 限流，防 DDoS 和大規模掃描。Cloudflare、AWS WAF 都有內建規則。這層的限制最寬鬆，但可以處理每秒百萬級的請求。',
                color: 'bg-red-50 border-red-200',
                badge: 'CDN/WAF 層',
                badgeColor: 'bg-red-600',
              },
              {
                layer: '第二層：API Gateway',
                desc: '按 API Key 或 Client ID 限流，實現商業配額（如免費用戶 1000 req/day，付費用戶 10000 req/day）。AWS API Gateway、Kong、Nginx 都支援。',
                color: 'bg-orange-50 border-orange-200',
                badge: 'Gateway 層',
                badgeColor: 'bg-orange-600',
              },
              {
                layer: '第三層：應用層',
                desc: '按用戶、功能、IP 組合限流，實現細粒度的業務規則（如每個用戶每天最多發 10 篇文章）。這層最靈活，但只保護應用層以下。',
                color: 'bg-amber-50 border-amber-200',
                badge: '應用層',
                badgeColor: 'bg-amber-600',
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-white text-xs font-black px-2 py-1 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <p className="font-black text-gray-800 text-sm">{item.layer}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 6: 處理被限流的請求 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">
              處理被限流的請求：客戶端設計
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            限流不只是伺服器端的事。好的客戶端設計能讓系統在被限流時自動恢復，
            而不是直接報錯給用戶。核心概念是 Retry with Backoff。
          </p>

          <CodeBlock
            title="基本重試邏輯（處理 429）"
            lang="typescript"
            code={`async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  maxRetries = 3
): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.status !== 429) {
      return response;  // 成功或其他錯誤，直接回傳
    }

    // 被限流：讀取伺服器建議的等待時間
    const retryAfter = Number(response.headers.get('Retry-After') ?? 1);
    console.warn(\`[RateLimit] Attempt \${attempt + 1}/\${maxRetries}，\${retryAfter}s 後重試\`);

    if (attempt < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    }
  }

  throw new Error(\`超過最大重試次數（\${maxRetries}），請求依然被限流\`);
}`}
          />

          <CodeBlock
            title="Exponential Backoff（指數退避）— 生產級重試策略"
            lang="typescript"
            code={`interface RetryOptions {
  maxRetries:  number;
  baseDelayMs: number;  // 初始等待時間（毫秒）
  maxDelayMs:  number;  // 最長等待時間（毫秒）
  jitter:      boolean; // 加入亂數避免 Thundering Herd（大量客戶端同時重試）
}

async function fetchWithExponentialBackoff(
  url: string,
  options?: RequestInit,
  retryOptions: RetryOptions = {
    maxRetries:  3,
    baseDelayMs: 1000,
    maxDelayMs:  30_000,
    jitter:      true,
  }
): Promise<Response> {
  const { maxRetries, baseDelayMs, maxDelayMs, jitter } = retryOptions;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) return response;

      // 5xx 伺服器錯誤和 429 都值得重試
      const shouldRetry = response.status === 429 || response.status >= 500;

      if (!shouldRetry || attempt === maxRetries) {
        return response;  // 不應重試，或已達最大次數
      }

      // 計算等待時間：exponential backoff = baseDelay * 2^attempt
      // 例：1s → 2s → 4s → 8s → 最多 30s
      let delay = Math.min(baseDelayMs * Math.pow(2, attempt), maxDelayMs);

      // Jitter（抖動）：在 delay 的 50%~100% 之間取亂數
      // 防止大量客戶端在同一時間點同時重試（Thundering Herd Problem）
      if (jitter) {
        delay = delay * (0.5 + Math.random() * 0.5);
      }

      // 如果伺服器有提供 Retry-After，優先使用（但不超過 maxDelayMs）
      const retryAfterHeader = response.headers.get('Retry-After');
      if (retryAfterHeader) {
        delay = Math.min(Number(retryAfterHeader) * 1000, maxDelayMs);
      }

      console.warn(
        \`[Retry] Attempt \${attempt + 1}/\${maxRetries}, Status: \${response.status}, Wait: \${Math.round(delay)}ms\`
      );
      await new Promise(resolve => setTimeout(resolve, delay));

    } catch (error) {
      // 網路錯誤（斷線、timeout）也應該重試
      if (attempt === maxRetries) throw error;
      const delay = Math.min(baseDelayMs * Math.pow(2, attempt), maxDelayMs);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error('Unreachable');
}

// ─── 使用範例 ────────────────────────────────────────────────────────
const response = await fetchWithExponentialBackoff(
  '/api/posts',
  { method: 'GET' },
  { maxRetries: 3, baseDelayMs: 1000, maxDelayMs: 15_000, jitter: true }
);

// ─── 在 React Query / SWR 中設定重試 ─────────────────────────────────
// React Query 內建 retry 邏輯
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn:  fetchPosts,
  retry: (failureCount, error) => {
    // 只對 429 和 5xx 重試，最多 3 次
    if (error instanceof HttpError && error.status === 404) return false;
    return failureCount < 3;
  },
  retryDelay: (attemptIndex) =>
    Math.min(1000 * Math.pow(2, attemptIndex), 30_000),  // Exponential Backoff
});`}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-green-50">
              <CardBody className="p-5">
                <p className="font-black text-green-800 mb-3 text-sm">好的限流客戶端行為</p>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex gap-2"><span className="font-black">✓</span>讀取 Retry-After header，等待建議時間後重試</li>
                  <li className="flex gap-2"><span className="font-black">✓</span>使用 Exponential Backoff，越重試等越久</li>
                  <li className="flex gap-2"><span className="font-black">✓</span>加入 Jitter，避免 Thundering Herd</li>
                  <li className="flex gap-2"><span className="font-black">✓</span>讀取 X-RateLimit-Remaining，提前降速</li>
                  <li className="flex gap-2"><span className="font-black">✓</span>在 UI 顯示「稍後再試」而非直接報錯</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 bg-red-50">
              <CardBody className="p-5">
                <p className="font-black text-red-800 mb-3 text-sm">常見的錯誤行為</p>
                <ul className="text-sm text-red-700 space-y-2">
                  <li className="flex gap-2"><span className="font-black">✗</span>收到 429 立即重試（讓問題更嚴重）</li>
                  <li className="flex gap-2"><span className="font-black">✗</span>固定間隔重試（沒有 Jitter，全部同時打）</li>
                  <li className="flex gap-2"><span className="font-black">✗</span>忽略 Retry-After header</li>
                  <li className="flex gap-2"><span className="font-black">✗</span>無限重試（耗盡資源）</li>
                  <li className="flex gap-2"><span className="font-black">✗</span>對 404 也重試（沒有判斷錯誤類型）</li>
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
          <div className="bg-gradient-to-br from-red-900 to-orange-800 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                {
                  icon: '🚦',
                  text: '限流的三個目的：防止濫用（惡意爬蟲/暴力破解）、保護後端（突發流量不讓 DB 崩潰）、公平分配（每個用戶有合理 quota）。',
                },
                {
                  icon: '🪣',
                  text: '四種演算法：Fixed Window（最簡單但有邊界漏洞）、Sliding Window（精確但儲存成本高）、Token Bucket（允許突發，最常用）、Leaky Bucket（平滑輸出，保護下游）。',
                },
                {
                  icon: '⚙️',
                  text: 'Token Bucket 核心邏輯：桶容量決定突發上限，補充速率決定長期平均速率。consume() 時先 refill() 再消耗，用 elapsed time 計算應補充的令牌數。',
                },
                {
                  icon: '🔴',
                  text: 'Redis 分散式限流：Sliding Window 用 Sorted Set（ZADD + ZCARD + ZREMRANGEBYSCORE）；Token Bucket 用 Lua Script 保證原子性，避免競態條件。',
                },
                {
                  icon: '🏗️',
                  text: '分層限流架構：CDN/WAF（IP 層，防 DDoS）→ API Gateway（API Key 層，商業配額）→ 應用層（用戶/功能層，業務規則）。',
                },
                {
                  icon: '🔄',
                  text: '客戶端重試策略：Exponential Backoff（1s → 2s → 4s...）+ Jitter（加亂數防 Thundering Herd）+ 讀取 Retry-After header + 設定最大重試次數。',
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
            href="/blog/system-design/ep06-message-queue"
            className="group block bg-gray-50 hover:bg-red-50 transition-colors rounded-2xl p-6"
          >
            <ArrowLeft
              size={18}
              className="mb-3 text-gray-400 group-hover:text-red-500 transition-colors"
            />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-red-600 transition-colors">
              EP.06 — Message Queue
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Kafka、RabbitMQ 與非同步架構設計
            </p>
          </Link>
          <Link
            href="/blog/system-design/ep01-intro"
            className="group block bg-gray-50 hover:bg-red-50 transition-colors rounded-2xl p-6 text-right"
          >
            <ArrowRight
              size={18}
              className="mb-3 text-gray-400 group-hover:text-red-500 transition-colors ml-auto"
            />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">回到起點</p>
            <p className="font-black text-gray-900 group-hover:text-red-600 transition-colors">
              EP.01 — 分散式系統入門
            </p>
            <p className="text-sm text-gray-500 mt-1">
              CAP 定理、一致性模型與系統設計思維
            </p>
          </Link>
        </div>

        {/* ─── Tags ─── */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {[
            'Rate Limiting',
            'Token Bucket',
            'Redis',
            'System Design',
            'API Security',
            'Distributed Systems',
          ].map((tag) => (
            <Chip key={tag} variant="flat" color="danger" className="font-bold">
              {tag}
            </Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
