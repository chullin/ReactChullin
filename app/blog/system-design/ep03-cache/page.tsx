import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  ArrowLeft,
  Quote,
  Clock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Database,
  Zap,
  RefreshCw,
  Layers,
  Shield,
  Timer
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '快取策略： 讓系統快 10 倍的關鍵決策 | Joseph Chen',
  description: '「加快取就好了」是最常見的回答，也是最危險的回答。 Cache-aside？Write-through？TTL 設多長？資料更新時怎麼辦？ 這篇帶你搞清楚每一種快取策略的原理與取捨。',
  alternates: {
    canonical: 'https://chullin.tw/blog/system-design/ep03-cache',
  },
};



export default function SystemDesignEP03() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50">
      <div className="bg-gradient-to-br from-indigo-800 via-violet-700 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.03</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">系統設計</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              快取策略：<br />
              <span className="text-violet-200">讓系統快 10 倍的關鍵決策</span>
            </h1>
            <p className="text-violet-100 text-lg mb-8 max-w-2xl">
              「加快取就好了」是最常見的回答，也是最危險的回答。
              Cache-aside？Write-through？TTL 設多長？資料更新時怎麼辦？
              這篇帶你搞清楚每一種快取策略的原理與取捨。
            </p>
            <div className="flex items-center gap-6 text-violet-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Cache · Redis · Cache Invalidation · System Design</span>
            </div>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening Quote */}
        <section   >
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-lg">
            <div className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-violet-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「Computer Science 中只有兩件難事：快取失效（Cache Invalidation）和命名。」
                  </p>
                  <p className="text-gray-500 text-sm">— Phil Karlton，廣為流傳的名言</p>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    這個笑話之所以成名，是因為它說出了真相：快取很容易加，難的是讓快取裡的資料保持正確。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 為什麼要快取 */}
        <section   >
          <h2 className="text-3xl font-black text-gray-900 mb-6">為什麼要快取？速度差距有多大？</h2>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            快取的本質是「用空間換時間」：把計算代價高或存取慢的資料，存在更快的地方。
            先感受一下各層儲存的速度差距：
          </p>

          <div className="space-y-2 mb-8">
            {[
              { label: 'L1 CPU Cache', time: '~1 ns', bars: 1, color: 'violet' },
              { label: 'L2 CPU Cache', time: '~4 ns', bars: 2, color: 'violet' },
              { label: 'RAM（主記憶體）', time: '~100 ns', bars: 3, color: 'purple' },
              { label: 'Redis（本地）', time: '~0.1 ms', bars: 5, color: 'indigo' },
              { label: 'Redis（網路）', time: '~1 ms', bars: 7, color: 'blue' },
              { label: 'SSD 讀取', time: '~0.1 ms', bars: 5, color: 'teal' },
              { label: 'HDD 讀取', time: '~10 ms', bars: 10, color: 'orange' },
              { label: 'DB 查詢（無索引）', time: '~100 ms', bars: 14, color: 'red' },
              { label: '跨區網路請求', time: '~200 ms', bars: 16, color: 'red' },
            ].map(({ label, time, bars, color }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-xs text-gray-500 w-36 shrink-0 text-right">{label}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: bars }).map((_, i) => (
                    <div key={i} className={`w-3 h-4 bg-${color}-400 rounded-sm`} />
                  ))}
                </div>
                <span className={`text-xs font-mono font-bold text-${color}-600`}>{time}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md bg-violet-50 border border-violet-200">
            <div className="p-5">
              <p className="text-violet-800 font-semibold mb-2">數量級差距的實際影響</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Redis 讀取（~1ms）vs DB 無索引查詢（~100ms）差 100 倍。
                如果你的 API 每次請求都打 DB，加了 Redis 後同樣的硬體可以多撐 100 倍的流量。
                這不是優化，是量級的改變。
              </p>
            </div>
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* Redis 基礎 */}
        <section   >
          <h2 className="text-3xl font-black text-gray-900 mb-6">Redis 常用資料結構</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Redis 不只是 key-value store，它有多種資料結構，選對結構能大幅簡化實作。
          </p>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md bg-indigo-50 border border-indigo-200 mb-6">
            <div className="p-5">
              <p className="text-indigo-800 font-semibold mb-2">String vs Hash：最常被問到的選擇題</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold text-gray-700 mb-1">用 String（JSON 序列化）</p>
                  <p className="text-gray-600 text-xs leading-relaxed mb-1">適合：整個物件作為一個整體讀取，不需要部分更新</p>
                  <code className="text-xs bg-slate-900 text-green-400 px-2 py-1 rounded block font-mono">SET user:123 '&#123;"name":"J","age":28&#125;' EX 3600</code>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-1">用 Hash（欄位分開存）</p>
                  <p className="text-gray-600 text-xs leading-relaxed mb-1">適合：只更新其中一個欄位，不想序列化整個物件</p>
                  <code className="text-xs bg-slate-900 text-green-400 px-2 py-1 rounded block font-mono">HSET user:123 name "J" age 28</code>
                </div>
              </div>
              <p className="text-gray-600 text-xs mt-3">⚡ 實務上，String + JSON 更普遍：程式語言都有 JSON 序列化，且通常整筆讀取。Hash 適合欄位數量多且頻繁部分更新的場景（如用戶設定頁）。</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              {
                type: 'String',
                cmd: 'SET / GET / INCR / EXPIRE',
                useCase: '最基本的快取（JSON 字串化）、計數器（INCR）、Session Token',
                example: 'SET user:123 \'{"name":"Joseph"}\' EX 3600'
              },
              {
                type: 'Hash',
                cmd: 'HSET / HGET / HGETALL',
                useCase: '用戶資料（欄位可部分更新）、避免每次序列化整個物件',
                example: 'HSET user:123 name Joseph age 28\nHGET user:123 name'
              },
              {
                type: 'List',
                cmd: 'LPUSH / RPUSH / LRANGE / LPOP',
                useCase: '訊息佇列（Message Queue）、最近瀏覽記錄（取前 N 筆）',
                example: 'LPUSH recent:user:123 productId\nLTRIM recent:user:123 0 49  # 只保留最近 50 筆'
              },
              {
                type: 'Set',
                cmd: 'SADD / SISMEMBER / SUNION',
                useCase: '去重（唯一訪客）、標籤系統、好友關係、點讚狀態',
                example: 'SADD post:456:likes userId\nSISMEMBER post:456:likes userId  # 是否已按讚'
              },
              {
                type: 'Sorted Set（ZSet）',
                cmd: 'ZADD / ZRANGE / ZRANGEBYSCORE',
                useCase: '排行榜（分數排序）、延遲隊列（timestamp 排序）',
                example: 'ZADD leaderboard 9800 "Joseph"\nZRANGE leaderboard 0 9 WITHSCORES REV  # 前10名'
              },
              {
                type: 'Bitmap / HyperLogLog',
                cmd: 'SETBIT / PFADD / PFCOUNT',
                useCase: 'Bitmap：簽到記錄（1位=1天）；HLL：大規模 UV 統計（允許誤差）',
                example: 'PFADD uv:2026-05-05 userId1 userId2\nPFCOUNT uv:2026-05-05  # 約 1% 誤差，省記憶體'
              }
            ].map(({ type, cmd, useCase, example }) => (
              <div key={type} className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-violet-700">{type}</h3>
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-600">{cmd}</code>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{useCase}</p>
                  <div className="bg-slate-900 rounded p-2 font-mono text-xs text-green-400 whitespace-pre">{example}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* 快取策略 */}
        <section   >
          <h2 className="text-3xl font-black text-gray-900 mb-6">快取策略：四種模式</h2>

          {/* Cache-aside */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Cache-aside（Lazy Loading）</h3>
                  <span    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">最常用</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  應用程式直接管理快取：讀時先查 Cache，沒有才查 DB 並回寫 Cache（稱為 Cache Miss 後填入）。
                  寫時只寫 DB，快取讓它自然過期（TTL）或主動刪除。
                </p>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
                    <span className="text-blue-600 font-bold">1</span>
                    <span className="text-blue-700">讀：先查 Redis</span>
                  </div>
                  <span className="text-gray-400 self-center">→</span>
                  <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full">
                    <span className="text-green-600 font-bold">Cache Hit</span>
                    <span className="text-green-700">→ 直接返回</span>
                  </div>
                  <span className="text-gray-300 self-center">|</span>
                  <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
                    <span className="text-orange-600 font-bold">Cache Miss</span>
                    <span className="text-orange-700">→ 查 DB → 存 Redis → 返回</span>
                  </div>
                </div>

                <CodeBlock
                  language="typescript"
                  filename="Cache-aside 實作"
                  code={`async function getUserById(userId: string) {
  const cacheKey = \`user:\${userId}\`;

  // 1. 先查 Redis
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);  // Cache Hit
  }

  // 2. Cache Miss：查 DB
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  if (!user) return null;

  // 3. 回寫 Redis，設 TTL 1 小時
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  return user;
}

// 更新時：刪除快取（讓下次讀取重新從 DB 載入）
async function updateUser(userId: string, data: Partial<User>) {
  await db.query('UPDATE users SET ... WHERE id = $1', [userId]);
  await redis.del(\`user:\${userId}\`);  // Cache Invalidation
}`}
                />

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded p-3 text-xs">
                    <p className="font-bold text-green-700 mb-1">✅ 優點</p>
                    <p className="text-gray-600">只快取真正被讀取的資料；DB 故障時快取仍可服務部分請求</p>
                  </div>
                  <div className="bg-red-50 rounded p-3 text-xs">
                    <p className="font-bold text-red-600 mb-1">⚠️ 缺點</p>
                    <p className="text-gray-600">Cache Miss 時需要 3 次操作（讀 Cache + 讀 DB + 寫 Cache），首次較慢</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Write-through */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Write-through</h3>
                  <span    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">寫多場景</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  每次寫入時，<strong>同時</strong>寫 DB 和 Cache。保持 Cache 與 DB 強一致，但寫入延遲較高。
                </p>

                <CodeBlock
                  language="typescript"
                  filename="Write-through 實作"
                  code={`async function updateUserProfile(userId: string, data: Partial<User>) {
  // ⚠️ 不能用 Promise.all 並行！若 DB 失敗但 Redis 成功，
  // Cache 就存著未落地的資料（Dirty Read 的來源）。
  // 正確做法：以 DB 寫入成功為前提，再更新 Cache。

  // Step 1：先寫 DB
  const updatedUser = await db.query(
    'UPDATE users SET name=$2, bio=$3 WHERE id=$1 RETURNING *',
    [userId, data.name, data.bio]
  );

  // Step 2：DB 成功後才更新 Redis
  // 若 Redis 失敗，允許 Cache 暫時過期，TTL 到期後自動重建（可接受短暫不一致）
  try {
    await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(updatedUser));
  } catch {
    console.error('Cache update failed, will self-heal on next read');
  }

  return updatedUser;
}`}
                />

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded p-3 text-xs">
                    <p className="font-bold text-green-700 mb-1">✅ 適合</p>
                    <p className="text-gray-600">寫後馬上讀的場景；對快取一致性要求高的資料</p>
                  </div>
                  <div className="bg-red-50 rounded p-3 text-xs">
                    <p className="font-bold text-red-600 mb-1">⚠️ 缺點</p>
                    <p className="text-gray-600">寫入延遲翻倍；寫多讀少時快取中大量資料從未被讀取（浪費記憶體）</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Write-behind */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Write-behind（Write-back）</h3>
                  <span    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">高吞吐量</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  寫入只寫 Cache，非同步批次寫入 DB。寫入延遲最低，
                  適合高頻寫入的場景（遊戲積分、實時計數器）。代價是快取故障時資料可能遺失。
                </p>

                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 text-sm">
                  <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                    <AlertTriangle size={16} /> 風險提示
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Redis Crash 且 AOF/RDB 未開啟的情況下，尚未落地 DB 的資料會永久遺失。
                    需要搭配 Redis Persistence 機制（AOF appendfsync everysec）與監控告警。
                    金融、訂單等關鍵資料不應使用此策略。
                  </p>
                </div>
              </div>
            </div>

            {/* Read-through */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Read-through</h3>
                  <span    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">框架整合</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  與 Cache-aside 流程相同，但由快取庫（而非應用程式）自動處理 Cache Miss 時的 DB 查詢。
                  應用程式只與快取層互動，不直接調用 DB。
                  適合使用支援 Read-through 的快取中間件（如 Caffeine + 自定義 CacheLoader）。
                </p>
              </div>
            </div>
          </div>

          {/* 策略選擇表 */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md mt-6">
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">快取策略選擇指南</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-violet-50">
                      <th className="text-left p-3 text-violet-900 font-bold">場景</th>
                      <th className="text-left p-3 text-violet-900 font-bold">推薦策略</th>
                      <th className="text-left p-3 text-violet-900 font-bold">原因</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['讀多寫少（用戶資料、商品詳情）', 'Cache-aside', '只快取實際被讀的資料，省記憶體'],
                      ['寫後立即讀（下單後看訂單）', 'Write-through', '保持一致性，避免讀到舊資料'],
                      ['超高頻寫（遊戲積分、點擊計數）', 'Write-behind', '批次落地 DB，降低寫入壓力'],
                      ['需要複雜 Query 結果（JOIN、聚合）', 'Cache-aside（手動 Key 設計）', '把計算代價高的結果整體快取'],
                    ].map(([scene, strategy, reason]) => (
                      <tr key={String(scene)} className="hover:bg-gray-50">
                        <td className="p-3 text-gray-700">{scene}</td>
                        <td className="p-3 text-violet-700 font-medium">{strategy}</td>
                        <td className="p-3 text-gray-500 text-xs">{reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* TTL 與快取失效 */}
        <section   >
          <h2 className="text-3xl font-black text-gray-900 mb-6">快取失效（Cache Invalidation）策略</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            快取失效是最難的部分。有兩種思路：<strong>被動失效（TTL 到期）</strong>和<strong>主動失效（資料更新時刪除）</strong>。
            兩者各有適用場景。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md border-l-4 border-violet-500">
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Timer size={18} className="text-violet-500" />
                  被動失效：TTL 過期
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  設定快取存活時間，時間到就自動失效。簡單、不需要程式邏輯，
                  但在 TTL 內資料可能是舊的。
                </p>
                <div className="bg-gray-50 rounded p-3 font-mono text-xs space-y-1 text-gray-600">
                  <p>熱門商品：TTL = 5 分鐘</p>
                  <p>用戶基本資料：TTL = 1 小時</p>
                  <p>靜態設定檔：TTL = 24 小時</p>
                  <p>Session Token：TTL = 15 分鐘</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md border-l-4 border-purple-500">
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <RefreshCw size={18} className="text-purple-500" />
                  主動失效：事件驅動刪除
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  資料更新時，主動刪除對應的快取 Key，讓下次讀取重新從 DB 載入最新資料。
                </p>
                <CodeBlock
                  language="typescript"
                  filename=""
                  code={`// 更新用戶後刪除快取
await db.updateUser(userId, data);
await redis.del(\`user:\${userId}\`);

// 批次刪除（如更新分類下所有商品）
const keys = await redis.keys(\`product:cat:\${catId}:*\`);
if (keys.length > 0) await redis.del(...keys);`}
                />
              </div>
            </div>
          </div>

          {/* 三大問題 */}
          <h3 className="text-xl font-bold text-gray-900 mb-3">三個必須了解的快取問題</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            快取設計有三個典型的陷阱，都源自「Cache 與 DB 之間的資料斷層」。
            理解它們的根因，面試和實作時才能給出正確的解法而不是頭痛醫頭。
          </p>
          <div className="space-y-4">
            {[
              {
                name: '快取穿透（Cache Penetration）',
                icon: Shield,
                color: 'red',
                desc: '大量請求查詢一個「確定不存在於 DB」的 Key，每次都 Cache Miss → 打穿 DB。常見於惡意攻擊。',
                solution: '方案一：快取空值（存 null 並設短 TTL）。方案二：Bloom Filter（先用 bitmap 判斷 Key 是否存在）。',
                code: `// 快取空值防穿透
const user = await db.getUser(userId);
if (!user) {
  // 快取 null，TTL 設短（避免長時間快取不存在的 Key）
  await redis.setex(\`user:\${userId}\`, 60, 'NULL');
  return null;
}
await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user));`
              },
              {
                name: '快取擊穿（Cache Breakdown）',
                icon: Zap,
                color: 'orange',
                desc: '一個「熱點 Key」快取剛好過期（TTL = 0），此時大量請求同時 Cache Miss 並打到 DB，造成 DB 瞬間壓力。',
                solution: '方案一：互斥鎖（只讓一個請求去查 DB，其他等待）。方案二：熱點 Key 永不過期（邏輯 TTL：存儲期望失效時間，後台非同步更新）。',
                code: `// 互斥鎖防擊穿（Redis SETNX 實現分散式鎖）
async function getHotDataWithLock(key: string) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const lockKey = \`lock:\${key}\`;
  const lockAcquired = await redis.set(lockKey, '1', 'NX', 'EX', 5);

  if (lockAcquired) {
    try {
      const data = await db.query(...);
      await redis.setex(key, 3600, JSON.stringify(data));
      return data;
    } finally {
      await redis.del(lockKey);
    }
  } else {
    // 未拿到鎖，等一下再讀 Cache
    await new Promise(r => setTimeout(r, 50));
    return getHotDataWithLock(key);
  }
}`
              },
              {
                name: '快取雪崩（Cache Avalanche）',
                icon: AlertTriangle,
                color: 'yellow',
                desc: '大量 Key 同時過期（例如系統啟動時統一設置了相同 TTL），造成瞬間大量 DB 請求。',
                solution: '在 TTL 基礎上加入隨機抖動（jitter），讓過期時間分散，避免同時大量失效。',
                code: `// TTL 加隨機抖動
const baseTTL = 3600;
const jitter = Math.floor(Math.random() * 300);  // 0~5 分鐘隨機
await redis.setex(key, baseTTL + jitter, value);`
              }
            ].map(({ name, icon: Icon, color, desc, solution, code }) => (
              <div key={name} className={`border-0 shadow-md border-l-4 border-${color}-400`}>
                <div className="p-6">
                  <h4 className={`font-bold text-${color}-700 mb-2 flex items-center gap-2`}>
                    <Icon size={18} />
                    {name}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{desc}</p>
                  <div className="bg-green-50 rounded p-3 text-xs text-gray-700 mb-3">
                    <strong className="text-green-700">解法：</strong>{solution}
                  </div>
                  <CodeBlock language="typescript" filename="" code={code} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* Redis 生產環境注意事項 */}
        <section   >
          <h2 className="text-3xl font-black text-gray-900 mb-6">生產環境 Redis 最佳實踐</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Key 命名規範',
                icon: Layers,
                content: '使用命名空間前綴避免衝突：\nuser:123\npost:456:comments\nleaderboard:2026-05\n方便 SCAN 按模式批次操作'
              },
              {
                title: '記憶體淘汰策略',
                icon: Database,
                content: '⚠️ 預設值是 noeviction（記憶體滿了直接報 OOM 錯誤）！\n生產環境必須顯式設定：\n\nmaxmemory-policy allkeys-lru  # 推薦\n\nallkeys-lru：淘汰最久未用的（通用快取場景）\nvolatile-lru：只淘汰有 TTL 的 Key\nnoeviction：滿了就報錯（預設，不適合快取）'
              },
              {
                title: 'Pipeline / MULTI-EXEC',
                icon: Zap,
                content: '批次操作用 Pipeline 減少 RTT：\nconst pipe = redis.pipeline();\npipe.set(...);\npipe.expire(...);\nawait pipe.exec();\n比逐一操作快 5-10 倍'
              },
              {
                title: '監控指標',
                icon: Shield,
                content: '關注以下指標：\n· Cache Hit Rate（>90% 才有意義）\n· Memory Usage（<80% 可用）\n· Evicted Keys（非 0 表示記憶體不足）\n· Latency（p99 <5ms）'
              }
            ].map(({ title, icon: Icon, content }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center">
                      <Icon size={18} className="text-violet-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">{title}</h3>
                  </div>
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">{content}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* 重點整理 */}
        <section   >
          <h2 className="text-3xl font-black text-gray-900 mb-6">重點整理</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Cache-aside 是預設選擇', content: '讀多寫少的場景幾乎都適用。Cache Miss 時查 DB 並回寫，更新時刪除快取讓 TTL 自然重建。' },
              { title: 'TTL 加 Jitter 防雪崩', content: '不要統一設置相同的 TTL，加入 ±10% 的隨機值，讓過期時間分散，避免瞬間大量 DB 請求。' },
              { title: '空值也要快取', content: '防穿透攻擊：查詢不存在的 Key 也要快取 null（設短 TTL），否則每次都穿透到 DB。' },
              { title: 'Cache Hit Rate 是核心指標', content: 'Hit Rate < 90% 代表快取設計有問題（TTL 太短、Key 設計不合理）。先量後優化。' },
              { title: '快取不是銀彈', content: '快取的代價是複雜度：你有兩份資料，要保持一致。一致性需求高的場景（餘額、庫存）要謹慎使用。' },
              { title: '面試三問必答', content: '問你快取時，說清楚：① 用哪種策略？② TTL 設多長？③ 如何處理穿透、擊穿、雪崩？' }
            ].map(({ title, content }) => (
              <div key={title} className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                <h4 className="text-violet-800 font-bold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle size={14} className="text-violet-600" />
                  {title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <section   >
          <hr className="border-gray-100 mb-8"  />
          <div className="flex justify-between items-center">
            <Link href="/blog/system-design/ep02-load-balancer">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer w-64">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <ArrowLeft size={20} className="text-violet-500" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="text-sm font-semibold text-gray-700">EP.02 負載均衡</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex gap-2">
              <span    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">Cache</span>
              <span    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">Redis</span>
              <span    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">System Design</span>
            </div>
            <div className="w-64" />
          </div>
        </section>

      </article>
    </div>
  );
}
