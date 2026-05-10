'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Database,
  Zap,
  Lock,
  Radio,
  BarChart3,
  Shield,
  Trophy,
  Server,
  AlertTriangle,
  CheckCircle,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function DBEP06() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50">

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-br from-red-700 via-rose-700 to-pink-700 text-white">
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
                資料庫系列
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Redis 進階應用：Pub/Sub、Lua Script、分散式鎖
              <br />
              <span className="text-rose-200">不只是快取的完整應用指南</span>
            </h1>
            <p className="text-rose-100 text-lg mb-8 max-w-2xl">
              Redis Streams、HyperLogLog、Bloom Filter、分散式鎖實作 —
              Redis 不只是快取的完整應用指南，從 Pub/Sub 到 Lua Script 原子操作，
              解鎖 Redis 的全部潛能。
            </p>
            <div className="flex items-center gap-6 text-rose-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5">
                <User size={14} /> Joseph Chen
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 18 min read
              </span>
              <span className="flex items-center gap-1.5">
                <Database size={14} /> Redis · Pub/Sub · Distributed Lock · HyperLogLog
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ─── Section 1: Redis 不只是快取 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Database className="text-rose-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Redis 不只是快取</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            大多數工程師第一次認識 Redis，是把它當作 Cache 層使用：把資料庫查詢結果放進去，
            設個 TTL，讀取時先查 Redis 再查 DB。這當然沒問題，但 Redis 的能力遠不止於此。
            它是一個多功能的記憶體資料結構伺服器，理解它的完整能力，能讓你少寫很多複雜的系統。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Zap className="text-yellow-500" size={22} />,
                title: '快取（Cache）',
                desc: '最常見的用法，SET/GET/TTL。把 DB 熱點資料放進 Redis，讀取速度從毫秒降到微秒。',
                tag: '必學',
                tagColor: 'warning' as const,
              },
              {
                icon: <Shield className="text-blue-500" size={22} />,
                title: 'Session Store',
                desc: '使用者登入狀態儲存。比存在 DB 快、比存在 Server 記憶體更能做水平擴展。',
                tag: '常見',
                tagColor: 'primary' as const,
              },
              {
                icon: <Trophy className="text-orange-500" size={22} />,
                title: '排行榜（Leaderboard）',
                desc: 'Sorted Set 的天然應用場景。ZADD 更新分數，ZREVRANGE 取前N名，O(log N) 複雜度。',
                tag: '實用',
                tagColor: 'success' as const,
              },
              {
                icon: <Radio className="text-purple-500" size={22} />,
                title: 'Pub/Sub 訊息系統',
                desc: '輕量的事件廣播機制。不需要 Kafka，小規模的即時通知用 Redis Pub/Sub 就夠了。',
                tag: '進階',
                tagColor: 'secondary' as const,
              },
              {
                icon: <Lock className="text-red-500" size={22} />,
                title: '分散式鎖（Distributed Lock）',
                desc: '跨服務的互斥操作。多台 Server 同時搶同一個資源，用 Redis 加鎖防止 Race Condition。',
                tag: '進階',
                tagColor: 'danger' as const,
              },
              {
                icon: <BarChart3 className="text-teal-500" size={22} />,
                title: '計數與統計',
                desc: 'HyperLogLog 統計 UV，Bloom Filter 判斷是否存在，以極小的記憶體換取巨大的效能。',
                tag: '進階',
                tagColor: 'primary' as const,
              },
            ].map(({ icon, title, desc, tag, tagColor }) => (
              <Card key={title} className="border-0 shadow-md">
                <CardBody className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    {icon}
                    <Chip size="sm" variant="flat" color={tagColor}>{tag}</Chip>
                  </div>
                  <h3 className="font-black text-gray-800">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed">
            在深入各個應用場景之前，先快速回顧 Redis 的五種核心資料結構，
            因為後面所有的進階用法都建立在這些基礎之上：
          </p>

          <CodeBlock
            title="Redis 五大資料結構快速回顧"
            lang="text"
            code={`String: SET key value / GET key / SETEX key 60 value（TTL 60秒）
        → 基本 Key-Value、計數器（INCR/DECR）、快取

Hash:   HSET user:1 name "Joseph" age 28
        HGET user:1 name          → "Joseph"
        HGETALL user:1            → 所有欄位
        → 物件儲存，比 JSON String 更節省記憶體（有 ziplist 優化）

List:   LPUSH queue task1 task2   → 從左側推入
        RPOP queue                 → 從右側取出（Queue 行為）
        LRANGE queue 0 -1          → 取得所有元素
        → 工作佇列、最新動態（Timeline）

Set:    SADD tags:post:1 redis backend database
        SMEMBERS tags:post:1       → 所有標籤
        SINTER tags:post:1 tags:post:2  → 兩篇文章的共同標籤
        → 去重、交集/聯集/差集運算

ZSet:   ZADD leaderboard 1500 "Joseph" 1200 "Alice"
(Sorted ZREVRANGE leaderboard 0 9 WITHSCORES   → 前10名（含分數）
  Set)  ZREVRANK leaderboard "Joseph"           → Joseph 的排名
        → 排行榜、帶權重的任務佇列、延遲佇列`}
          />
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 2: Pub/Sub ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Radio className="text-purple-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Pub/Sub — 輕量事件廣播</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Redis 的 Pub/Sub 提供了一個簡單的發布-訂閱模型：Publisher 把訊息發布到某個頻道（Channel），
            所有訂閱該頻道的 Subscriber 都會即時收到。實作即時通知、廣播系統、
            或服務間的輕量事件傳遞時，Redis Pub/Sub 是比引入 Kafka 更輕量的選擇。
          </p>

          <CodeBlock
            title="ioredis Pub/Sub 完整範例"
            lang="typescript"
            code={`import Redis from 'ioredis';

const publisher = new Redis();
const subscriber = new Redis(); // Pub/Sub 需要獨立連線！
// 一旦連線進入 subscribe 模式，就不能再發送其他命令
// 因此 publisher 和 subscriber 必須是兩個獨立的 Redis 連線

// ─── 訂閱頻道 ───────────────────────────────────────────
await subscriber.subscribe('notifications', 'chat:general');

subscriber.on('message', (channel, message) => {
  const data = JSON.parse(message);
  console.log(\\`[\\${channel}] Received:\\`, data);

  // 根據頻道處理不同邏輯
  if (channel === 'notifications') {
    sendPushNotification(data);
  } else if (channel === 'chat:general') {
    broadcastToWebSocket(data);
  }
});

// ─── 發布訊息 ───────────────────────────────────────────
await publisher.publish('notifications', JSON.stringify({
  type: 'NEW_ORDER',
  orderId: '12345',
  userId: 'user:001',
  timestamp: Date.now(),
}));

// 回傳值：成功收到訊息的訂閱者數量（0 = 沒有人在線）
// → Pub/Sub 的 Fire and Forget 特性：沒人訂閱就直接丟棄

// ─── Pattern 訂閱（訂閱所有 chat: 開頭的頻道）───────────
await subscriber.psubscribe('chat:*');

subscriber.on('pmessage', (pattern, channel, message) => {
  console.log(\\`Pattern "\\${pattern}" matched "\\${channel}":\\`, message);
  // pattern  = "chat:*"
  // channel  = "chat:general" 或 "chat:room-1" 等實際頻道名
  // message  = 訊息內容
});`}
          />

          <div className="space-y-4">
            <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={22} />
              Pub/Sub 的限制，以及 Redis Streams 如何解決
            </h3>

            <CodeBlock
              title="Pub/Sub 的根本限制"
              lang="text"
              code={`Pub/Sub 的三大限制：

  1. 訊息遺失（Fire and Forget）
     訂閱者不在線時，訊息會直接丟棄，永遠找不回來
     → 若 Consumer 服務重啟，重啟期間的所有訊息都消失了

  2. 沒有持久化
     Redis 重啟後，所有頻道中的訊息消失（本來就沒儲存）
     → 不適合需要保證送達的場景

  3. 沒有消費者群組（Consumer Group）
     所有訂閱者都會收到同一則訊息，無法做到「每條訊息只被一個 Worker 處理」
     → 不能用於任務分配場景

Redis Streams（解決以上全部問題）：
  ✓ 持久化：訊息儲存在 Stream 中，可以回放（Replay）
  ✓ Consumer Group：多個消費者協作處理訊息，每條訊息只給一個人
  ✓ ACK 機制：消費者處理完才確認，未確認的訊息可以重新投遞
  ✓ 訊息 ID：每條訊息有唯一 ID，支援斷點續讀`}
            />

            <CodeBlock
              title="Redis Streams 完整範例（生產者 + 消費者群組）"
              lang="typescript"
              code={`// ─── 生產者：發送事件 ──────────────────────────────────────
await redis.xadd(
  'orders-stream',   // Stream 名稱（Key）
  '*',               // 自動生成 ID（格式：毫秒時間戳-序號，如 1715000000000-0）
  'orderId', '12345',
  'status',  'PENDING',
  'amount',  '1500',
  'userId',  'user:001',
);
// XADD 是原子操作且只追加（Append-Only），適合高頻寫入

// ─── 建立消費者群組 ──────────────────────────────────────
// $ 表示只接收「建立群組之後」的新訊息
// MKSTREAM 表示 Stream 不存在時自動建立
await redis.xgroup('CREATE', 'orders-stream', 'order-processors', '$', 'MKSTREAM');

// ─── 消費者從群組讀取 ─────────────────────────────────────
// > 表示「取得尚未分配給任何消費者的新訊息」
const messages = await redis.xreadgroup(
  'GROUP', 'order-processors', 'consumer-1',  // 群組名、消費者名
  'COUNT', 10,                                  // 每次最多取 10 條
  'BLOCK', 0,                                   // 阻塞等待（0 = 永遠等待有訊息為止）
  'STREAMS', 'orders-stream', '>',
);

// ─── 處理訊息 + ACK 確認 ────────────────────────────────
if (messages) {
  for (const [, entries] of messages) {
    for (const [id, fields] of entries) {
      // Redis 把欄位回傳為扁平陣列：['orderId', '12345', 'status', 'PENDING', ...]
      // 轉換為物件
      const data: Record<string, string> = {};
      for (let i = 0; i < fields.length; i += 2) {
        data[fields[i]] = fields[i + 1];
      }

      try {
        await processOrder(data);
        // 處理成功 → ACK 確認，訊息從 Pending List 中移除
        await redis.xack('orders-stream', 'order-processors', id);
      } catch (err) {
        // 處理失敗 → 不 ACK，訊息留在 Pending List，等待重新投遞
        console.error(\\`Failed to process message \\${id}:\\`, err);
      }
    }
  }
}

// ─── 查詢 Pending 訊息（未被確認的） ──────────────────────
const pending = await redis.xpending(
  'orders-stream', 'order-processors',
  '-', '+',   // ID 範圍：最小到最大
  10,          // 最多查 10 條
);
// 可以用 XCLAIM 把長時間未確認的訊息重新分配給其他消費者`}
            />
          </div>

          <Card className="border-l-4 border-purple-400 bg-purple-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-purple-800 mb-2 flex items-center gap-2">
                <Info size={16} /> 何時用 Pub/Sub，何時用 Streams？
              </p>
              <p className="text-purple-700 text-sm leading-relaxed">
                如果你需要的是「廣播通知」（多個訂閱者同時收到），且可以接受訊息遺失，用 Pub/Sub 就好，簡單快速。
                如果你需要「可靠的任務佇列」（每條訊息只被處理一次，且保證送達），用 Redis Streams。
                Kafka 適合更大規模（每秒百萬級），Redis Streams 適合中小規模但要比 Pub/Sub 更可靠的場景。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 3: 分散式鎖 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Lock className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">分散式鎖（Distributed Lock）</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            單一程序內的 Race Condition 可以用 Mutex（互斥鎖）解決。但在多台 Server 的分散式環境中，
            每台機器的記憶體是獨立的，傳統的鎖根本跨不了機器邊界。
            這時候就需要用 Redis 實作分散式鎖。
          </p>

          <CodeBlock
            title="為什麼需要分散式鎖？超賣問題"
            lang="text"
            code={`情境：限量商品庫存 = 1，兩台 API Server 同時收到購買請求

Server 1: 讀取庫存 = 1，判斷「有庫存，可以購買」
Server 2: 讀取庫存 = 1，判斷「有庫存，可以購買」
Server 1: 執行扣庫存 → 庫存 = 0（成功建立訂單）
Server 2: 執行扣庫存 → 庫存 = -1（超賣了！）

這就是「讀-改-寫」（Read-Modify-Write）的 Race Condition。
在多台 Server 的環境中，這是必然會發生的問題，不是偶發。

解法一：資料庫樂觀鎖（有 Retry 成本）
解法二：資料庫 SELECT FOR UPDATE（高併發時會鎖住大量請求）
解法三：Redis 分散式鎖（高效、低延遲、跨服務）← 今天的主角`}
          />

          <CodeBlock
            title="Redlock 演算法實作（生產環境推薦）"
            lang="typescript"
            code={`import Redlock from 'redlock';
import Redis from 'ioredis';

const redis = new Redis({ host: 'localhost', port: 6379 });

const redlock = new Redlock(
  [redis],  // 生產環境建議傳入奇數個 Redis 實例（如 3 或 5），提高可靠性
  {
    retryCount: 3,    // 獲取鎖失敗後最多重試 3 次
    retryDelay: 200,  // 每次重試間隔 200ms
    retryJitter: 200, // 加入隨機抖動（0~200ms），防止多個請求同時重試產生「驚群效應」
    // 驚群效應：所有等待的請求在同一時刻重試，瞬間產生大量競爭
  },
);

async function purchaseProduct(productId: string, userId: string) {
  const lockKey = \\`lock:product:\\${productId}\\`;
  const lockTTL = 10_000; // 鎖的最長持有時間：10 秒（防止死鎖）

  // 嘗試獲取鎖（會等待重試，直到成功或超過 retryCount）
  const lock = await redlock.acquire([lockKey], lockTTL);

  try {
    // ─── 臨界區（Critical Section）─────────────────────────
    // 這段程式碼在任何時間點，整個系統中只有一個執行緒在跑

    const stock = await getProductStock(productId);

    if (stock <= 0) {
      throw new Error('Out of stock');
    }

    await decreaseStock(productId, 1);
    const order = await createOrder({ productId, userId, quantity: 1 });

    console.log(\\`Order \\${order.id} created for user \\${userId}\\`);
    return order;
    // ─── 臨界區結束 ─────────────────────────────────────────

  } finally {
    // 確保鎖一定被釋放（即使上面拋出錯誤）
    // finally 區塊保證無論成功或失敗都會執行
    await lock.release();
  }
}

// ─── 自行實作（理解原理）────────────────────────────────────
// Redis 的 SET NX EX 是原子操作，這是分散式鎖的核心
async function acquireLock(key: string, ttlSeconds: number): Promise<string | null> {
  // 使用隨機 token 作為鎖的值（用於確認只有鎖的持有者才能釋放）
  const token = \\`\\${Date.now()}-\\${Math.random()}\\`;

  // SET key token NX EX ttl
  // NX：Only Set if Not eXists（只有 key 不存在時才設定）
  // EX：設定過期時間（秒），防止程序崩潰後鎖永遠不釋放（死鎖）
  const result = await redis.set(key, token, 'EX', ttlSeconds, 'NX');

  // result 為 'OK' 表示成功獲取鎖，null 表示鎖已被其他人持有
  return result === 'OK' ? token : null;
}

async function releaseLock(key: string, token: string): Promise<boolean> {
  // 必須先確認 token 是自己的，才能刪除
  // 這段必須是原子操作，否則「確認」和「刪除」之間可能有 Race Condition
  // → 用 Lua Script 保證原子性（見 Section 4）
  const luaScript = \\`
    if redis.call('GET', KEYS[1]) == ARGV[1] then
      return redis.call('DEL', KEYS[1])
    else
      return 0
    end
  \\`;

  const result = await redis.eval(luaScript, 1, key, token) as number;
  return result === 1;
}`}
          />

          <Card className="border-l-4 border-red-400 bg-red-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-red-800 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} /> 分散式鎖的正確使用方式
              </p>
              <p className="text-red-700 text-sm leading-relaxed">
                鎖的 TTL 必須遠大於臨界區的執行時間，否則程式還在執行中鎖就過期了，另一個執行緒就會進來。
                釋放鎖時一定要用 Lua Script 或 Redlock，確認 token 是自己的再刪除，
                否則可能不小心釋放了別人的鎖。生產環境強烈建議使用成熟的 Redlock 函式庫而不是自己實作。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 4: Lua Script ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Zap className="text-orange-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Lua Script — 原子操作的終極武器</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Redis 是單執行緒的，這是它能保證原子性的基礎。但是，當你需要執行多個命令的組合操作時，
            這些命令之間仍然可能被其他客戶端打斷。Lua Script 讓你把多個命令打包成一個原子操作，
            Redis 保證執行期間不會有任何其他命令插入。
          </p>

          <CodeBlock
            title="Lua Script：讓多個命令變成一個原子操作"
            lang="lua"
            code={`-- scripts/deduct-stock.lua
-- KEYS[1] = 庫存的 Key（如 "stock:product:123"）
-- ARGV[1] = 要扣除的數量
-- ARGV[2] = 操作日誌的識別碼（userId + timestamp）

local stock = tonumber(redis.call('GET', KEYS[1]))

-- 判斷商品是否存在
if stock == nil then
  return -1  -- 商品不存在
end

-- 判斷庫存是否足夠
if stock < tonumber(ARGV[1]) then
  return -2  -- 庫存不足（回傳負數讓應用層判斷錯誤類型）
end

-- 扣減庫存
local new_stock = stock - tonumber(ARGV[1])
redis.call('SET', KEYS[1], new_stock)

-- 寫入操作日誌（可以之後用 LRANGE 查詢所有扣減記錄）
redis.call('LPUSH', 'deduct-log', ARGV[2])

-- 如果庫存歸零，發布 sold-out 事件
if new_stock == 0 then
  redis.call('PUBLISH', 'inventory:sold-out', KEYS[1])
end

return new_stock  -- 回傳扣減後的庫存數量

-- 整個 Script 是原子的：
-- 不可能發生「讀到庫存 = 1，另一個請求也讀到 1，然後兩個都扣」的 Race Condition`}
          />

          <CodeBlock
            title="在 Node.js 中執行 Lua Script（EVALSHA 更有效率）"
            lang="typescript"
            code={`import fs from 'fs';
import Redis from 'ioredis';

const redis = new Redis();

// ─── 載入 Script（SCRIPT LOAD）────────────────────────────
// 使用 EVALSHA 而不是 EVAL 的原因：
//   EVAL：每次都傳送完整的 Script 內容（浪費頻寬）
//   EVALSHA：只傳 SHA1 Hash，Redis 從 Script Cache 取出執行（省頻寬）

const script = fs.readFileSync('./scripts/deduct-stock.lua', 'utf8');
const sha = await redis.script('LOAD', script);
// sha 像是 "a42059b356c875f0717db19a51f6aaca9ae659ea"

// ─── 執行 Lua Script ────────────────────────────────────
async function deductStock(
  productId: string,
  quantity: number,
  userId: string,
): Promise<number> {
  const result = await redis.evalsha(
    sha,                                   // Script 的 SHA1 Hash
    1,                                     // KEYS 的數量（下面的參數分為 KEYS 和 ARGV）
    \\`stock:\\${productId}\\`,                // KEYS[1]
    quantity.toString(),                    // ARGV[1]
    \\`\\${userId}:\\${Date.now()}\\`,          // ARGV[2]
  ) as number;

  // 解析 Lua Script 的回傳值
  switch (result) {
    case -1:
      throw new Error(\\`Product \\${productId} not found\\`);
    case -2:
      throw new Error(\\`Insufficient stock for product \\${productId}\\`);
    default:
      console.log(\\`Stock deducted. Remaining: \\${result}\\`);
      return result;
  }
}

// ─── 錯誤處理：NOSCRIPT（Script Cache 被清除）─────────────
async function safeDeductStock(
  productId: string,
  quantity: number,
  userId: string,
): Promise<number> {
  try {
    return await deductStock(productId, quantity, userId);
  } catch (err: unknown) {
    // 如果是 NOSCRIPT 錯誤（Redis 重啟後 Script Cache 清空），重新 LOAD
    if (err instanceof Error && err.message.includes('NOSCRIPT')) {
      const script = fs.readFileSync('./scripts/deduct-stock.lua', 'utf8');
      sha = await redis.script('LOAD', script);
      return await deductStock(productId, quantity, userId);
    }
    throw err;
  }
}`}
          />

          <Card className="border-l-4 border-orange-400 bg-orange-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-orange-800 mb-2">Lua Script 的使用場景</p>
              <p className="text-orange-700 text-sm leading-relaxed">
                任何需要「讀取 → 判斷 → 修改」三步驟的操作，都應該考慮用 Lua Script 包起來。
                典型場景：扣庫存、限流器（Rate Limiter）、計數+判斷閾值、帶條件的快取更新。
                注意：Lua Script 執行期間 Redis 是阻塞的，不要在 Script 中做複雜的計算或大量遍歷。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 5: HyperLogLog 與 Bloom Filter ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="text-teal-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">HyperLogLog 與 Bloom Filter</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            當資料量達到億級規模，精確計算「有多少個不重複的元素」或「某個元素是否存在」，
            都會消耗大量記憶體。HyperLogLog 和 Bloom Filter 是兩種用「小誤差換巨大記憶體節省」的神奇資料結構。
          </p>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                <BarChart3 className="text-teal-500" size={22} />
                HyperLogLog — 超省記憶體的基數統計
              </h3>

              <p className="text-gray-600 leading-relaxed">
                基數（Cardinality）指的是集合中不重複元素的數量，也就是「獨立訪客數（UV）」的概念。
                HyperLogLog 是一種機率型資料結構，用大約 12KB 的固定記憶體，就能統計數億個不重複元素，
                誤差率只有約 0.81%。
              </p>

              <CodeBlock
                title="HyperLogLog 統計網站獨立訪客（UV）"
                lang="typescript"
                code={`// 問題：統計網站每天的獨立訪客數（UV）
// 方案一：用 Set 儲存所有用戶 ID
//   1 億用戶 × 平均 4 bytes/ID ≈ 400MB → 記憶體太貴了
// 方案二：用 HyperLogLog（PFADD/PFCOUNT）
//   永遠只用 12KB，誤差率約 0.81%

const today = new Date().toISOString().slice(0, 10); // "2026-05-08"

// ─── 記錄訪客（每次用戶訪問頁面時呼叫）─────────────────────
async function trackPageVisit(userId: string) {
  await redis.pfadd(\\`uv:\\${today}\\`, userId);
  // PFADD 只在 userId 是新的時回傳 1，重複加入回傳 0（去重）
}

// ─── 查詢今天的獨立訪客數 ────────────────────────────────
async function getTodayUV(): Promise<number> {
  return await redis.pfcount(\\`uv:\\${today}\\`);
}

// ─── 合併多天統計（週報、月報）──────────────────────────────
async function getWeeklyUV(): Promise<number> {
  const keys = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return \\`uv:\\${d.toISOString().slice(0, 10)}\\`;
  });

  // PFMERGE 把多個 HyperLogLog 合併成一個
  await redis.pfmerge('uv:week', ...keys);

  // 合併後的基數（去掉跨天重複的訪客）
  const weekUV = await redis.pfcount('uv:week');
  return weekUV;
}

// 與精確方法的對比：
// 精確方法（Redis Set）：1 億 UV × 4 bytes ≈ 400MB
// HyperLogLog：12KB（縮小約 33,000 倍），誤差 < 1%
// → 如果你不需要精確到個位數，HyperLogLog 是最佳選擇`}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                <Shield className="text-indigo-500" size={22} />
                Bloom Filter — 「可能在」或「一定不在」
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Bloom Filter 解決的問題是：「這個元素之前有沒有見過？」
                它能在 O(1) 時間內判斷，且只用極少的記憶體，代價是有一定機率的「誤判為存在」（False Positive），
                但絕對不會「誤判為不存在」（False Negative）。
              </p>

              <Card className="border-0 shadow-md bg-indigo-50">
                <CardBody className="p-5 space-y-3">
                  <p className="font-black text-indigo-800">Bloom Filter 的保證：</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-gray-700">
                        <strong>回傳 0（一定不存在）</strong>：可以 100% 確定這個元素從未被加入過
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-gray-700">
                        <strong>回傳 1（可能存在）</strong>：這個元素很可能存在，但有小機率是誤判（False Positive），
                        需要再查資料庫確認
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <CodeBlock
                title="Bloom Filter 實作：Email 重複判斷（Redis Stack 模組）"
                lang="typescript"
                code={`// Redis Stack 提供原生 Bloom Filter 支援（BF.RESERVE / BF.ADD / BF.EXISTS）
// 或使用 ioredis-bloom 套件

// ─── 初始化 Bloom Filter ─────────────────────────────────
// error_rate：允許的誤判率（0.0001 = 0.01%）
// capacity：預計容量（100 萬筆 email）
await redis.call('BF.RESERVE', 'registered-emails', 0.0001, 1_000_000);
// 記憶體消耗：約 3MB（vs 儲存 100 萬個 email 字串需要 ~100MB）

// ─── 新用戶註冊流程 ───────────────────────────────────────
async function checkEmailExists(email: string): Promise<boolean> {
  // BF.EXISTS 回傳 0（一定不存在）或 1（可能存在）
  const result = await redis.call('BF.EXISTS', 'registered-emails', email) as number;
  return result === 1;
}

async function registerUser(email: string, password: string) {
  // 第一步：查 Bloom Filter（O(1)，極快）
  const mightExist = await checkEmailExists(email);

  if (mightExist) {
    // 第二步：Bloom Filter 說可能存在 → 去資料庫確認（避免 False Positive）
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already registered');
    }
    // 如果資料庫說不存在 → 這是 False Positive，繼續執行
  }

  // Bloom Filter 說一定不存在（或 False Positive 被排除）→ 建立用戶
  const user = await db.user.create({ data: { email, password: hash(password) } });

  // 加入 Bloom Filter
  await redis.call('BF.ADD', 'registered-emails', email);

  return user;
}

// ─── 批量加入 ────────────────────────────────────────────
await redis.call('BF.MADD', 'registered-emails',
  'user1@example.com',
  'user2@example.com',
  'user3@example.com',
);
// BF.MADD 回傳陣列，1 = 成功加入新元素，0 = 已存在（或 False Positive）`}
              />
            </div>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 6: Sorted Set 排行榜 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Trophy className="text-orange-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Sorted Set 實作即時排行榜</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            排行榜是 Redis Sorted Set 最典型的應用場景。Sorted Set 中的每個成員都有一個關聯的浮點數分數，
            成員按分數自動排序。無論是遊戲積分、電商銷售量、還是貼文熱度，
            Sorted Set 都能以 O(log N) 的複雜度高效更新和查詢排名。
          </p>

          <CodeBlock
            title="即時排行榜完整實作"
            lang="typescript"
            code={`const LEADERBOARD_KEY = 'game:leaderboard';

// ─── 設定分數（絕對值）────────────────────────────────────
async function setScore(userId: string, score: number) {
  // ZADD：如果成員已存在，更新分數；不存在則新增
  await redis.zadd(LEADERBOARD_KEY, score, userId);
}

// ─── 加分（相對值，原子操作）──────────────────────────────
async function addScore(userId: string, delta: number): Promise<number> {
  // ZINCRBY 是原子的：不需要先 GET 再 SET，天然防止 Race Condition
  const newScore = await redis.zincrby(LEADERBOARD_KEY, delta, userId);
  return parseFloat(newScore);
}

// ─── 取得前 N 名 ─────────────────────────────────────────
async function getTopPlayers(count = 10) {
  // ZREVRANGE：按分數從高到低排序（Rev = Reverse = 降序）
  // WITHSCORES：同時回傳分數
  const raw = await redis.zrevrange(LEADERBOARD_KEY, 0, count - 1, 'WITHSCORES');

  // raw = ['userId1', '1500', 'userId2', '1200', ...] 交錯排列
  const leaderboard = [];
  for (let i = 0; i < raw.length; i += 2) {
    leaderboard.push({
      rank: i / 2 + 1,          // 1-indexed 排名
      userId: raw[i],
      score: parseFloat(raw[i + 1]),
    });
  }

  return leaderboard;
}

// ─── 取得特定用戶的排名和分數 ─────────────────────────────
async function getUserRank(userId: string) {
  // ZREVRANK：從高到低的排名（0-indexed），不存在回傳 null
  const [rank, score] = await Promise.all([
    redis.zrevrank(LEADERBOARD_KEY, userId),
    redis.zscore(LEADERBOARD_KEY, userId),
  ]);

  return {
    rank: rank !== null ? rank + 1 : null,  // 轉為 1-indexed
    score: score ? parseFloat(score) : 0,
    inLeaderboard: rank !== null,
  };
}

// ─── 分頁取得排行榜 ───────────────────────────────────────
async function getLeaderboardPage(page: number, pageSize = 20) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const [raw, total] = await Promise.all([
    redis.zrevrange(LEADERBOARD_KEY, start, end, 'WITHSCORES'),
    redis.zcard(LEADERBOARD_KEY),   // 總成員數
  ]);

  const players = [];
  for (let i = 0; i < raw.length; i += 2) {
    players.push({
      rank: start + i / 2 + 1,
      userId: raw[i],
      score: parseFloat(raw[i + 1]),
    });
  }

  return {
    players,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// ─── 取得某分數範圍的玩家（按分數篩選）──────────────────────
async function getPlayersByScoreRange(minScore: number, maxScore: number) {
  // ZRANGEBYSCORE：按分數範圍查詢（從低到高）
  // 用 ZREVRANGEBYSCORE 則是從高到低
  const raw = await redis.zrangebyscore(
    LEADERBOARD_KEY,
    minScore,
    maxScore,
    'WITHSCORES',
  );

  const players = [];
  for (let i = 0; i < raw.length; i += 2) {
    players.push({ userId: raw[i], score: parseFloat(raw[i + 1]) });
  }

  return players;
}`}
          />

          <Card className="border-l-4 border-orange-400 bg-orange-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-orange-800 mb-2">為什麼不用資料庫來做排行榜？</p>
              <p className="text-orange-700 text-sm leading-relaxed">
                用資料庫 ORDER BY score DESC 在資料量小時沒問題，但隨著玩家增加，
                每次更新分數都需要 UPDATE，每次查排名都需要 ORDER BY 全表掃描（即使有索引，寫入時維護索引也有成本）。
                Sorted Set 的 ZINCRBY 和 ZREVRANK 都是 O(log N)，且 Redis 的記憶體操作遠快於磁碟 I/O。
                每秒更新百萬次分數，Redis 輕鬆應對，資料庫早崩了。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 7: 部署與監控 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Server className="text-gray-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Redis 部署與監控最佳實踐</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Redis 跑起來很簡單，但在生產環境中要跑得穩，需要了解幾個常見的問題和對應的處理方式。
            這裡列出工程師最常遇到的坑，以及對應的解法。
          </p>

          <CodeBlock
            title="Redis 常見問題與解法"
            lang="text"
            code={`──────────────────────────────────────────────────────────
問題 1：記憶體超過限制
──────────────────────────────────────────────────────────

症狀：OOM（Out of Memory），Redis 拒絕寫入新資料
解法：設定 maxmemory 和淘汰策略（eviction policy）

  # redis.conf
  maxmemory 2gb                    # 限制最大記憶體使用量
  maxmemory-policy allkeys-lru     # 最常用的淘汰策略

  淘汰策略選擇指南：
  allkeys-lru    : 所有 Key 中，淘汰最近最少使用的（最常用）
  volatile-lru   : 只淘汰有 TTL 的 Key（適合只把部分資料當快取的場景）
  allkeys-random : 隨機淘汰（不推薦）
  noeviction     : 記憶體滿了就報錯（預設值，適合不能丟資料的場景）

──────────────────────────────────────────────────────────
問題 2：熱 Key（Hot Key）— 單一 Key 請求量過大
──────────────────────────────────────────────────────────

症狀：某個 Key 承受了大量請求，導致 Redis 該實例 CPU 100%
     （例如：首頁推薦資料、爆紅文章的點贊數）

解法一：本地快取（Local Cache）
  在應用層加一層 LRU Cache（如 node-lru-cache）
  把超熱的 Key 快取在 Server 記憶體中（TTL 1~5 秒）
  這樣大部分請求根本不打到 Redis

解法二：Key 加隨機後綴（複製多份）
  原本 "product:hot:1" 承受所有流量
  改為 "product:hot:1:0" / "product:hot:1:1" / "product:hot:1:2"
  寫入時更新所有副本，讀取時隨機選一個
  → 流量分散到多個 Key，避免集中

──────────────────────────────────────────────────────────
問題 3：BigKey — 單一 Value 過大
──────────────────────────────────────────────────────────

症狀：讀取或刪除某個 Key 時，Redis 阻塞數秒
     （Redis 單執行緒，一個大操作會卡住所有其他請求）

典型 BigKey：
  String > 10MB、List/Hash/Set/ZSet 成員數超過 10,000

解法：
  ✓ 壓縮 Value（gzip 後再存）
  ✓ 拆分大 Hash：user:1:profile / user:1:settings（分散欄位）
  ✓ 用 HSCAN / SSCAN 分批讀取（不要用 HGETALL / SMEMBERS 一次取全部）
  ✓ 刪除大 Key 用 UNLINK（非同步刪除，不阻塞）而不是 DEL

──────────────────────────────────────────────────────────
問題 4：慢日誌排查（slowlog）
──────────────────────────────────────────────────────────

# 設定：記錄執行時間超過 10ms 的命令
CONFIG SET slowlog-log-slower-than 10000   # 單位：微秒（10000 = 10ms）
CONFIG SET slowlog-max-len 128              # 最多記錄 128 條

# 查看最近 10 條慢日誌
SLOWLOG GET 10
# 每條包含：唯一 ID、時間戳、執行時間（微秒）、命令與參數

# 清空慢日誌
SLOWLOG RESET`}
          />

          <h3 className="text-xl font-black text-gray-800">重要監控指標</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                metric: 'used_memory',
                cmd: 'INFO memory',
                desc: '目前使用的記憶體量。應低於 maxmemory 的 80%，否則 GC 壓力大。',
                color: 'bg-blue-50 border-blue-200',
                textColor: 'text-blue-700',
              },
              {
                metric: 'connected_clients',
                cmd: 'INFO clients',
                desc: '目前連線數。突然飆高表示連線池洩漏；建議用 PgBouncer 同理，Redis 也要控制連線數。',
                color: 'bg-green-50 border-green-200',
                textColor: 'text-green-700',
              },
              {
                metric: 'keyspace_hits / misses',
                cmd: 'INFO stats',
                desc: '快取命中率 = hits / (hits + misses)。低於 80% 表示快取策略需要調整。',
                color: 'bg-yellow-50 border-yellow-200',
                textColor: 'text-yellow-700',
              },
              {
                metric: 'evicted_keys',
                cmd: 'INFO stats',
                desc: '被淘汰的 Key 數量。長期非零表示記憶體不足，需要加記憶體或調整資料 TTL。',
                color: 'bg-red-50 border-red-200',
                textColor: 'text-red-700',
              },
              {
                metric: 'instantaneous_ops_per_sec',
                cmd: 'INFO stats',
                desc: '每秒操作數（OPS）。突然下降可能表示有大量慢查詢阻塞。',
                color: 'bg-purple-50 border-purple-200',
                textColor: 'text-purple-700',
              },
              {
                metric: 'repl_backlog_size',
                cmd: 'INFO replication',
                desc: '主從複製的 Backlog 大小。如果 Replica 斷線重連後 Backlog 不夠大，需要全量同步（很慢）。',
                color: 'bg-orange-50 border-orange-200',
                textColor: 'text-orange-700',
              },
            ].map(({ metric, cmd, desc, color, textColor }) => (
              <Card key={metric} className={`border ${color} shadow-sm`}>
                <CardBody className="p-4 space-y-2">
                  <code className={`text-xs font-black ${textColor}`}>{metric}</code>
                  <p className="text-gray-400 text-xs">{cmd}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <CodeBlock
            title="Redis 高可用架構選擇"
            lang="text"
            code={`單節點 Redis（開發/小型生產）：
  → 簡單，適合 Cache 場景（資料可以丟失）
  → 不適合分散式鎖（節點掛掉，鎖也消失）

Redis Sentinel（主從 + 自動切換）：
  → 一主多從 + 3 個 Sentinel 監控節點
  → 主節點掛掉時，Sentinel 自動選出新的主節點
  → 適合中型系統，提供 HA 但不提供水平擴展

Redis Cluster（分片 + HA）：
  → 資料自動分散到多個節點（16384 個 Hash Slot）
  → 每個節點有副本，節點掛掉自動切換
  → 適合超大規模系統，提供水平擴展 + HA
  → 注意：Cluster 模式下，多 Key 命令（MGET、Pipeline）
    需要所有 Key 在同一個 Slot，否則報錯

Cloud 託管（最推薦）：
  → AWS ElastiCache、GCP Memorystore、Upstash
  → 自動處理 HA、備份、版本升級，工程師不用管運維`}
          />
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Tags ─── */}
        <motion.section
          className="space-y-4"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-black text-gray-700">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['Redis', 'Pub/Sub', 'Distributed Lock', 'HyperLogLog', 'Bloom Filter', 'Redis Streams', 'Lua Script', 'Sorted Set'].map(
              (tag) => (
                <Chip key={tag} variant="flat" color="danger" size="sm">
                  {tag}
                </Chip>
              ),
            )}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Navigation ─── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link
              href="/blog/database/ep05-sharding"
              className="flex items-center gap-3 p-5 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              <ArrowLeft
                className="text-rose-500 group-hover:-translate-x-1 transition-transform"
                size={20}
              />
              <div>
                <p className="text-xs text-gray-400 font-medium">上一篇</p>
                <p className="font-black text-gray-800 text-sm">EP.05 Sharding 水平擴展</p>
              </div>
            </Link>

            <div className="flex items-center gap-3 p-5 rounded-2xl bg-gray-50 border border-dashed border-gray-200 opacity-60">
              <div className="text-right">
                <p className="text-xs text-gray-400 font-medium">下一篇</p>
                <p className="font-black text-gray-500 text-sm">EP.07（Coming Soon）</p>
              </div>
              <ArrowRight className="text-gray-400" size={20} />
            </div>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
