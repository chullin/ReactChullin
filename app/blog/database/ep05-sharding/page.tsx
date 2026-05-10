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
  Database,
  AlertTriangle,
  GitBranch,
  Layers,
  Zap,
  Scale,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function DBEP05() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-orange-50">

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-br from-rose-800 via-red-700 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">
                EP.05
              </span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                資料庫系列
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              資料庫 Sharding 與讀寫分離
              <br />
              <span className="text-rose-200">水平擴展的關鍵決策</span>
            </h1>
            <p className="text-rose-100 text-lg mb-8 max-w-2xl">
              Hash Sharding、Range Sharding、主從複製、Replication Lag —
              千萬級資料的分散式資料庫架構，從讀寫分離到 Sharding，一步步解開水平擴展的謎題。
            </p>
            <div className="flex items-center gap-6 text-rose-200 text-sm flex-wrap">
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
                <Database size={14} /> Sharding · Replication · Consistent Hashing · Vitess
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ─── Section 1: 單台資料庫的瓶頸 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-rose-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">單台資料庫的瓶頸</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            你的 App 剛上線時，一台 PostgreSQL 就夠用了。但當用戶從 10 萬成長到 1000 萬，
            你開始發現資料庫成為整個系統的瓶頸。問題不是 Query 寫得不好，而是單台機器本身的物理極限。
          </p>

          <CodeBlock
            title="單台 PostgreSQL 的硬體極限"
            lang="text"
            code={`單台 PostgreSQL 的極限（以中端伺服器為基準）：

  Write 瓶頸：約 10,000 TPS（transactions per second）
              超過後，磁碟 I/O 和鎖定競爭會讓效能斷崖式下滑

  Storage 瓶頸：單台伺服器磁碟大小
               即便用 NVMe SSD，單台通常也難超過 100TB
               且磁碟越大，備份與恢復時間越長

  Read 瓶頸：CPU 核心數與記憶體大小有限
             更多連線 → Context Switching 增加 → 整體吞吐量下降

  Connection 瓶頸：PostgreSQL 每個連線都是獨立 Process
                  超過 500 並發連線後，系統資源消耗顯著上升
                  （PgBouncer 可緩解，但不能根本解決）`}
          />

          <p className="text-gray-600 leading-relaxed">
            面對這些瓶頸，工程師通常有兩條路可以走：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardBody className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Scale className="text-blue-500" size={22} />
                  <h3 className="text-xl font-black text-gray-800">垂直擴展（Scale Up）</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  換更大的機器：更多 CPU 核心、更多 RAM、更快的 SSD。
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={14} /> 無需改動應用程式
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={14} /> 簡單直接，立竿見影
                  </div>
                  <div className="flex items-center gap-2 text-red-500">
                    <XCircle size={14} /> 有物理極限，無法無限擴展
                  </div>
                  <div className="flex items-center gap-2 text-red-500">
                    <XCircle size={14} /> 單點故障（SPOF）風險
                  </div>
                  <div className="flex items-center gap-2 text-red-500">
                    <XCircle size={14} /> 費用呈指數增長
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Layers className="text-rose-500" size={22} />
                  <h3 className="text-xl font-black text-gray-800">水平擴展（Scale Out）</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  加更多台機器，將資料和流量分散到多個節點。
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={14} /> 幾乎無限擴展
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={14} /> 沒有單點故障
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={14} /> 費用線性增長
                  </div>
                  <div className="flex items-center gap-2 text-red-500">
                    <XCircle size={14} /> 架構複雜，需要應用層配合
                  </div>
                  <div className="flex items-center gap-2 text-red-500">
                    <XCircle size={14} /> 資料一致性問題需要處理
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="border-l-4 border-rose-400 bg-rose-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-rose-800 mb-2">實務建議：不要過早 Scale Out</p>
              <p className="text-rose-700 text-sm leading-relaxed">
                水平擴展帶來的架構複雜度是真實的成本。在你的 DB 還沒真正到達瓶頸前，
                優先考慮索引優化、Query 調整、加 Cache。Scale Out 是最後的手段，不是第一選擇。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 2: 讀寫分離 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <GitBranch className="text-orange-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">讀寫分離（Read/Write Splitting）</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            在嘗試 Sharding 之前，讀寫分離通常是你能做的最划算的一步。
            它的概念很簡單：把寫入集中到一台 Primary，把讀取分散到多台 Replica。
          </p>

          <CodeBlock
            title="讀寫分離架構示意"
            lang="text"
            code={`Primary（主節點）→ 負責所有 Write（INSERT / UPDATE / DELETE）
    │
    └── 非同步複製（Async Replication）
        │
        ├── Replica 1（副節點）→ 處理 Read 請求
        ├── Replica 2（副節點）→ 處理 Read 請求
        └── Replica 3（副節點）→ 處理 Read 請求

80/20 法則：
  一般的 Web 應用，約 80% 的操作是讀取（查詢列表、取得詳情...）
  只有 20% 是寫入（建立帳號、下訂單、更新狀態...）

  → 把 80% 的流量分散到多個 Replica，主節點只承擔 20% 的寫入壓力
  → Read 效能可以近乎線性地水平擴展，只要加 Replica 即可`}
          />

          <p className="text-gray-600 leading-relaxed">
            在 Node.js 生態中，最直接的實作方式是針對 Primary 和 Replica 建立不同的連線，
            並在業務層依據操作類型選擇對應的 DB 實例：
          </p>

          <CodeBlock
            title="讀寫分離實作（Prisma + Node.js）"
            lang="typescript"
            code={`// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Primary（寫入節點）
export const primaryDB = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_PRIMARY_URL },
  },
});

// Replica 連線池（多個副節點，可做 Round-Robin 負載均衡）
const replicas = [
  new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_REPLICA_1_URL } },
  }),
  new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_REPLICA_2_URL } },
  }),
  new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_REPLICA_3_URL } },
  }),
];

let replicaIndex = 0;

// Round-Robin 選取 Replica
export function getReadDB(): PrismaClient {
  const db = replicas[replicaIndex % replicas.length];
  replicaIndex++;
  return db;
}

// ─── 使用方式 ───────────────────────────────────────────

// 寫入操作 → 一律走 primaryDB
export async function createUser(data: CreateUserInput) {
  return await primaryDB.user.create({ data });
}

export async function updateUserProfile(userId: string, data: UpdateUserInput) {
  return await primaryDB.user.update({
    where: { id: userId },
    data,
  });
}

// 讀取操作 → 走 Replica（getReadDB()）
export async function getActiveUsers() {
  return await getReadDB().user.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserById(id: string) {
  return await getReadDB().user.findUnique({
    where: { id },
  });
}`}
          />

          <div className="space-y-4">
            <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={22} />
              Replication Lag 問題（必須了解）
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Primary 和 Replica 之間的複製是「非同步」的，這意味著主節點寫入成功後，
              Replica 可能需要幾毫秒到幾百毫秒才能同步到最新資料。
              這段時間差稱為 <strong>Replication Lag</strong>，是讀寫分離最容易踩到的坑。
            </p>

            <CodeBlock
              title="Replication Lag 導致的 Bug 情境"
              lang="text"
              code={`典型情境：用戶剛建立帳號，立刻讀取自己的資料

  步驟 1：POST /api/register
          → 寫入 Primary（成功！userId = 12345）
          → 回傳 201 Created

  步驟 2：GET /api/users/12345（前端立刻發送）
          → 讀取 Replica
          → Replication Lag = 200ms，資料還沒同步！
          → 回傳 404 Not Found

  用戶體驗：「我剛剛建立帳號，系統說找不到我？」

另一個常見情境：電商下單後立刻查訂單
  步驟 1：POST /api/orders → 寫入成功
  步驟 2：GET /api/orders → 走 Replica → 訂單不見了！`}
            />

            <CodeBlock
              title="Replication Lag 的解決策略"
              lang="typescript"
              code={`// 策略一：Read Your Own Writes（寫後讀強制走 Primary）
// 在 API handler 中，寫入後的同一個 Request 內，讀取走 Primary

export async function registerUser(data: CreateUserInput) {
  // 寫入 Primary
  const user = await primaryDB.user.create({ data });

  // 寫入後立刻讀取 → 強制走 Primary，保證一致性
  const profile = await primaryDB.userProfile.findUnique({
    where: { userId: user.id },
  });

  return { user, profile };
}

// 策略二：寫入後同步放入 Cache（彌補 Lag）
import { redis } from './redis';

export async function createUserWithCache(data: CreateUserInput) {
  // 1. 寫入 Primary
  const user = await primaryDB.user.create({ data });

  // 2. 立刻寫入 Redis（TTL 60 秒，足夠 Replica 同步）
  await redis.setex(\`user:\${user.id}\`, 60, JSON.stringify(user));

  return user;
}

export async function getUserByIdWithCache(id: string) {
  // 1. 先查 Cache
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);

  // 2. Cache miss → 讀 Replica（此時 Lag 可能已消除）
  return await getReadDB().user.findUnique({ where: { id } });
}

// 策略三：Session 標記（最精準，但實作複雜）
// 記錄用戶最後一次寫入的時間戳，
// 如果距離現在 < LAG_THRESHOLD，強制走 Primary
const LAG_THRESHOLD_MS = 500;

export function shouldUsePrimary(lastWriteAt: Date | null): boolean {
  if (!lastWriteAt) return false;
  return Date.now() - lastWriteAt.getTime() < LAG_THRESHOLD_MS;
}`}
            />
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 3: Sharding ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Layers className="text-rose-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Sharding — 水平分片</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            讀寫分離解決了 Read 的瓶頸，但無法解決 Write 瓶頸和 Storage 瓶頸。
            當你的業務規模進一步增長，寫入量超過單台 Primary 的承載上限，
            或者資料量超過單台磁碟的儲存上限，你就需要 <strong>Sharding</strong>。
          </p>

          <p className="text-gray-600 leading-relaxed">
            Sharding 的核心思想是：把資料表拆分成多個「片段（Shard）」，
            每個 Shard 都是一台獨立的資料庫，只存放整體資料的一個子集。
          </p>

          <CodeBlock
            title="Sharding 概念示意（以 1 億筆用戶資料為例）"
            lang="text"
            code={`沒有 Sharding（單台 DB）：
  ┌─────────────────────────────────────┐
  │  users 表：1 億筆資料（全在一台機器）  │
  │  寫入壓力集中 → 成為系統瓶頸          │
  └─────────────────────────────────────┘

有 Sharding（4 個 Shard）：
  ┌──────────────────────┐
  │  Shard 0（DB 機器 0）  │  → userId % 4 == 0 的用戶（2,500 萬筆）
  └──────────────────────┘
  ┌──────────────────────┐
  │  Shard 1（DB 機器 1）  │  → userId % 4 == 1 的用戶（2,500 萬筆）
  └──────────────────────┘
  ┌──────────────────────┐
  │  Shard 2（DB 機器 2）  │  → userId % 4 == 2 的用戶（2,500 萬筆）
  └──────────────────────┘
  ┌──────────────────────┐
  │  Shard 3（DB 機器 3）  │  → userId % 4 == 3 的用戶（2,500 萬筆）
  └──────────────────────┘

效果：
  寫入壓力分散到 4 台機器 → 理論上 Write 吞吐量 ×4
  每台機器只存 1/4 的資料 → Storage 問題解決
  每個 Shard 可以再加 Replica → Read 進一步擴展`}
          />

          <CodeBlock
            title="應用層 Sharding 路由邏輯（Node.js）"
            lang="typescript"
            code={`// lib/sharding.ts
import { PrismaClient } from '@prisma/client';

const NUM_SHARDS = 4;

// 每個 Shard 對應一台獨立的 DB 伺服器
const shards: PrismaClient[] = [
  new PrismaClient({ datasources: { db: { url: process.env.DB_SHARD_0_URL } } }),
  new PrismaClient({ datasources: { db: { url: process.env.DB_SHARD_1_URL } } }),
  new PrismaClient({ datasources: { db: { url: process.env.DB_SHARD_2_URL } } }),
  new PrismaClient({ datasources: { db: { url: process.env.DB_SHARD_3_URL } } }),
];

// Shard 路由：根據 userId 決定要查哪台 DB
export function getShardByUserId(userId: number): PrismaClient {
  const shardIndex = userId % NUM_SHARDS;
  return shards[shardIndex];
}

// 使用範例
export async function getUserById(userId: number) {
  const shard = getShardByUserId(userId);  // 自動路由到正確的 Shard
  return await shard.user.findUnique({ where: { id: userId } });
}

export async function createUser(data: CreateUserInput) {
  // 假設 userId 由應用層生成（Snowflake ID 或 UUID）
  const userId = generateUserId();
  const shard = getShardByUserId(userId);
  return await shard.user.create({ data: { ...data, id: userId } });
}`}
          />
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 4: 兩種 Sharding 策略 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Zap className="text-orange-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">兩種 Sharding 策略</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            選擇 Sharding Key 和分片方式，是整個 Sharding 設計中最關鍵的決策。
            不同的策略有不同的取捨，選錯了之後要改代價極高。
          </p>

          <div className="space-y-8">
            {/* Hash Sharding */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-800">Hash Sharding（最均勻）</h3>
              <p className="text-gray-600 leading-relaxed">
                把 Sharding Key 進行 Hash，再取模決定落在哪個 Shard。
                資料分布最均勻，不容易產生某個 Shard 特別忙的 Hot Spot 問題。
              </p>

              <CodeBlock
                title="Hash Sharding 邏輯"
                lang="text"
                code={`shard_id = hash(user_id) % num_shards

例子（4 個 Shard）：
  user_id = 1001  →  hash(1001) % 4 = 1  →  Shard 1
  user_id = 1002  →  hash(1002) % 4 = 2  →  Shard 2
  user_id = 1003  →  hash(1003) % 4 = 3  →  Shard 3
  user_id = 1004  →  hash(1004) % 4 = 0  →  Shard 0

優點：
  ✓ 資料分布均勻，不會有 Hot Spot
  ✓ 新資料自動分散，不需要手動管理

缺點：
  ✗ 範圍查詢效率差（例如：查所有 userId 在 1000~2000 的用戶
    需要掃描所有 Shard）
  ✗ 增加/刪除 Shard 時，大量資料需要重新分配（Resharding）
    → 這個問題用 Consistent Hashing 解決`}
              />

              <CodeBlock
                title="Consistent Hashing — 解決 Resharding 問題"
                lang="text"
                code={`問題：原本有 4 個 Shard，現在要加到 5 個
  使用簡單取模（hash % 4 → hash % 5）：
    幾乎所有資料的 shard_id 都變了 → 需要遷移 75%+ 的資料！

Consistent Hashing 解法：
  把 Shard 節點和 Key 都映射到同一個虛擬 Hash Ring（0 ~ 2^32）

       0
       │  Shard A (300)
  ─────┤
       │
  ─────┤ Shard B (600)
       │
  ─────┤
       │  Shard C (900)
  ─────┤
       0 → 2^32（環形）

  查找規則：Key 的 Hash 值，順時針找到第一個 Shard 節點

  新增 Shard D（插入 Hash Ring 的 750 位置）：
    只有原本落在 Shard C（750~900 之間的 Key）需要遷移
    其餘 Shard 完全不受影響 → 只遷移約 1/N 的資料！`}
              />
            </div>

            {/* Range Sharding */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-800">Range Sharding（有序查詢友好）</h3>
              <p className="text-gray-600 leading-relaxed">
                根據 Sharding Key 的「值域範圍」來分配 Shard。
                適合有時間序列或有序 ID 的場景，範圍查詢效率極高。
              </p>

              <CodeBlock
                title="Range Sharding 示意"
                lang="text"
                code={`按 userId 的值域範圍分片：

  Shard 0：userId 1 ~ 25,000,000
  Shard 1：userId 25,000,001 ~ 50,000,000
  Shard 2：userId 50,000,001 ~ 75,000,000
  Shard 3：userId 75,000,001 ~ 100,000,000

優點：
  ✓ 範圍查詢效率高（查 userId 在 1~100 的用戶 → 只查 Shard 0）
  ✓ 增加 Shard 容易（直接開新範圍，舊資料不需移動）
  ✓ 資料具備局部性（相近 ID 的用戶在同一台機器，Cache 友好）

缺點：
  ✗ 可能產生 Hot Spot！
    → 如果 userId 是自增的，新用戶永遠寫入最後一個 Shard
    → 最後一個 Shard 的寫入壓力是其他 Shard 的數倍
    → 解法：改用隨機 ID（Snowflake ID、UUID）作為 Sharding Key

實際案例：
  HBase 用 Range Sharding（Region）
  但會把 Hot Region 自動分裂（Region Split）來避免 Hot Spot`}
              />
            </div>
          </div>

          <Card className="border-l-4 border-orange-400 bg-orange-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-orange-800 mb-2">Hash vs Range：如何選？</p>
              <p className="text-orange-700 text-sm leading-relaxed">
                如果你的主要查詢是「根據 ID 查單筆資料」，選 Hash Sharding（均勻、防 Hot Spot）。
                如果你的主要查詢是「查某個時間範圍或 ID 範圍的資料」，選 Range Sharding（範圍查詢快）。
                實務上，許多大型系統（如 Google Bigtable、HBase）同時支援兩種策略，依表格特性選擇。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 5: Sharding 的痛點 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <XCircle className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Sharding 的痛點</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Sharding 不是免費的午餐。它帶來了一系列在單台 DB 時代從未需要面對的問題，
            其中最痛的就是跨 Shard 的 JOIN 和分散式事務。
          </p>

          <CodeBlock
            title="跨 Shard JOIN 的困境"
            lang="sql"
            code={`-- 在 Sharding 前，這個查詢很簡單、很正常
SELECT
  u.name,
  u.email,
  o.order_id,
  o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.id = 12345;

-- 在 Sharding 後...
-- users 表按 userId 分片：
--   userId 12345 → userId % 4 = 1 → 在 Shard 1
-- orders 表按 orderId 分片（不是 userId）：
--   orderId 的 Shard 可能是 0、1、2、3 都有...
--
-- → 你無法在單台 DB 上執行這個 JOIN！
-- → 跨 Shard JOIN 在分散式資料庫中幾乎不可能高效實作`}
          />

          <p className="text-gray-600 leading-relaxed">
            面對跨 Shard JOIN 問題，實務上有四種常見的處理方式，
            各有取捨，選擇哪種取決於你的查詢模式和業務特性：
          </p>

          <div className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardBody className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-rose-100 text-rose-700 font-black text-sm px-2.5 py-1 rounded-full">方案 1</span>
                  <h4 className="text-lg font-black text-gray-800">應用層 Join（Application-Side Join）</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  在程式碼中發兩次 Query，先查 users，再查 orders，最後在記憶體裡合併。
                </p>
                <CodeBlock
                  lang="typescript"
                  code={`// 應用層 Join 範例
async function getUserWithOrders(userId: number) {
  // Query 1：查 users（到正確的 User Shard）
  const user = await getUserById(userId);  // 自動路由到 Shard 1

  // Query 2：查 orders（需要掃描所有 Order Shard）
  const orders = await Promise.all(
    orderShards.map(shard =>
      shard.order.findMany({ where: { userId } })
    )
  ).then(results => results.flat());

  // 在記憶體中 Join
  return { ...user, orders };
}
// 優點：簡單直接  缺點：多次網路往返，效能較差`}
                />
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-orange-100 text-orange-700 font-black text-sm px-2.5 py-1 rounded-full">方案 2</span>
                  <h4 className="text-lg font-black text-gray-800">Denormalization（反正規化）</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  把需要 JOIN 的欄位直接存在相關聯的表裡，用「空間換複雜度」。
                </p>
                <CodeBlock
                  lang="sql"
                  code={`-- 反正規化：在 orders 表中直接存入 user_name
CREATE TABLE orders (
  order_id     BIGINT PRIMARY KEY,
  user_id      BIGINT,
  user_name    VARCHAR(100),  -- 冗餘欄位，但查詢時不需要 JOIN users
  user_email   VARCHAR(255),  -- 冗餘欄位
  total_amount DECIMAL(10,2),
  created_at   TIMESTAMP
);

-- 查訂單時不需要跨 Shard JOIN
SELECT order_id, user_name, total_amount FROM orders WHERE user_id = 12345;
-- 缺點：user 改名字時，orders 裡的 user_name 需要同步更新（Write Amplification）`}
                />
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 font-black text-sm px-2.5 py-1 rounded-full">方案 3</span>
                  <h4 className="text-lg font-black text-gray-800">Global Tables（全域表）</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  把小型的、不常變動的參考資料表（如：商品分類、國家代碼）複製到所有 Shard，
                  讓每個 Shard 都能在本地完成 JOIN。
                </p>
                <CodeBlock
                  lang="text"
                  code={`適用情境：
  ✓ 資料量小（幾千到幾萬筆）
  ✓ 讀多寫少（幾乎不更新）
  ✓ 需要與大表 JOIN（如：分類 × 商品）

例子：
  product_categories（商品分類）→ 複製到所有 Shard
  countries（國家代碼）→ 複製到所有 Shard
  currencies（幣別）→ 複製到所有 Shard

不適用：
  ✗ 用戶資料（量大、常更新）
  ✗ 訂單資料（量大）`}
                />
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 font-black text-sm px-2.5 py-1 rounded-full">方案 4</span>
                  <h4 className="text-lg font-black text-gray-800">Co-location（相同 Shard Key）</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  設計時確保需要 JOIN 的兩張表使用相同的 Sharding Key，
                  這樣同一個 userId 的 users 和 orders 會落在同一個 Shard，本地 JOIN 即可。
                </p>
                <CodeBlock
                  lang="text"
                  code={`設計原則：
  users  表按 userId 分片
  orders 表也按 userId 分片（不是 orderId！）

  → userId = 12345 的用戶資料和他的所有訂單，都在同一個 Shard
  → 可以在單台 DB 內完成 JOIN，不需要跨 Shard

代價：
  orders 表按 userId 分片，意味著：
  → 按 orderId 查訂單需要廣播查詢（掃全部 Shard）
  → 「查所有用戶的今日訂單」效率很差（跨 Shard 聚合）
  → 需要根據最常見的查詢模式來決定 Sharding Key，這是設計難題`}
                />
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 6: 選擇正確的時機 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="text-rose-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">選擇正確的時機</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Sharding 是一個不可逆的架構決策。一旦引入，想要「去 Sharding」的成本極高。
            因此，必須在真正需要的時候才引入，而不是「未來可能需要」就提前做。
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">什麼時候需要 Sharding</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-md bg-red-50">
                <CardBody className="p-5 space-y-2">
                  <AlertTriangle className="text-red-500" size={22} />
                  <p className="font-black text-gray-800 text-sm">Write 達到瓶頸</p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    單台 Primary 的寫入量持續超過 10K TPS，且讀寫分離和 Cache 已無法緩解。
                  </p>
                </CardBody>
              </Card>
              <Card className="border-0 shadow-md bg-red-50">
                <CardBody className="p-5 space-y-2">
                  <Database className="text-red-500" size={22} />
                  <p className="font-black text-gray-800 text-sm">資料量超過單台磁碟</p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    單台資料量超過 10TB，備份時間過長，或磁碟費用超過合理預算。
                  </p>
                </CardBody>
              </Card>
              <Card className="border-0 shadow-md bg-red-50">
                <CardBody className="p-5 space-y-2">
                  <GitBranch className="text-red-500" size={22} />
                  <p className="font-black text-gray-800 text-sm">有明確分片維度</p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    業務上有天然的隔離維度（按地區、按租戶、按用戶 ID），且 JOIN 需求不多。
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">在 Sharding 之前，應該先嘗試（按順序）</h3>
            <div className="space-y-3">
              {[
                { step: '1', title: '加索引優化查詢', desc: '確保所有高頻查詢都有適當的複合索引（Composite Index），這是最便宜的優化。' },
                { step: '2', title: '讀寫分離', desc: '把 80% 的讀流量分散到 Replica，大幅降低 Primary 的壓力。' },
                { step: '3', title: '加 Cache（Redis）', desc: '把熱點資料放入 Redis，讓大多數讀取請求根本不需要打到 DB。' },
                { step: '4', title: '垂直擴展（換大機器）', desc: '升級 CPU、RAM、更快的 NVMe SSD，在不改架構的情況下獲得立即的效能提升。' },
                { step: '5', title: '最後才是 Sharding', desc: '上面四步都做了還不夠，才考慮 Sharding，並做好充分的架構規劃。' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <span className="bg-rose-600 text-white font-black text-sm w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                    {step}
                  </span>
                  <div>
                    <p className="font-bold text-gray-800">{title}</p>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">管理工具推薦</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-0 shadow-md">
                <CardBody className="p-5 space-y-2">
                  <p className="font-black text-gray-800">Vitess</p>
                  <Chip size="sm" variant="flat" color="warning">MySQL Sharding</Chip>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    YouTube 使用的 MySQL Sharding 解決方案，提供透明的 Sharding 路由，
                    應用層幾乎不需要改動。支援 Online Schema Changes。
                  </p>
                </CardBody>
              </Card>
              <Card className="border-0 shadow-md">
                <CardBody className="p-5 space-y-2">
                  <p className="font-black text-gray-800">Citus</p>
                  <Chip size="sm" variant="flat" color="primary">PostgreSQL Sharding</Chip>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    PostgreSQL 的 Sharding 擴充套件，支援分散式查詢、並行執行，
                    已被 Microsoft Azure 收購並整合到 Azure Database for PostgreSQL。
                  </p>
                </CardBody>
              </Card>
              <Card className="border-0 shadow-md">
                <CardBody className="p-5 space-y-2">
                  <p className="font-black text-gray-800">PlanetScale</p>
                  <Chip size="sm" variant="flat" color="secondary">Serverless MySQL</Chip>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    基於 Vitess 的雲端 MySQL Sharding 服務，適合 Serverless 架構。
                    提供 Non-blocking Schema Changes 和 Database Branching（類似 Git）。
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>

          <Card className="border-l-4 border-rose-400 bg-rose-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-rose-800 mb-2">架構師的視角</p>
              <p className="text-rose-700 text-sm leading-relaxed">
                大多數公司永遠不需要 Sharding。如果你的業務能讓一台 PostgreSQL 撐住，那就一台撐到底。
                Sharding 是 Netflix、Uber、Twitter 這種規模的解法，不是所有系統都需要的。
                過早引入 Sharding 的架構複雜度，會嚴重拖慢開發速度，得不償失。
              </p>
            </CardBody>
          </Card>
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
            {['Database Sharding', 'Read/Write Split', 'Consistent Hashing', 'Vitess', 'Scalability', 'PostgreSQL'].map(
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
              href="/blog/database/ep04-nosql-mongodb"
              className="flex items-center gap-3 p-5 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              <ArrowLeft
                className="text-rose-500 group-hover:-translate-x-1 transition-transform"
                size={20}
              />
              <div>
                <p className="text-xs text-gray-400 font-medium">上一篇</p>
                <p className="font-black text-gray-800 text-sm">EP.04 MongoDB 與選型指南</p>
              </div>
            </Link>

            <Link
              href="/blog/database/ep01-sql-basics"
              className="flex items-center gap-3 p-5 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100 group text-right"
            >
              <div>
                <p className="text-xs text-gray-400 font-medium">下一篇</p>
                <p className="font-black text-gray-800 text-sm">EP.01 SQL 基礎</p>
              </div>
              <ArrowRight
                className="text-rose-500 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
