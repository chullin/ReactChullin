'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Server,
  Database,
  Globe,
  Layers,
  Zap,
  Scale
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function SystemDesignEP01() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50">
      <div className="bg-gradient-to-br from-violet-800 via-purple-700 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.01</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">系統設計</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              系統設計思維：<br />
              <span className="text-violet-200">從需求分解到架構決策</span>
            </h1>
            <p className="text-violet-100 text-lg mb-8 max-w-2xl">
              面試官問「設計一個 Instagram」，你該從哪裡開始？
              這篇建立系統設計的思考框架：如何拆解需求、估算容量、
              一步步做出有依據的架構決策。
            </p>
            <div className="flex items-center gap-6 text-violet-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> System Design · Scalability · Architecture · Interview</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening Quote */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-violet-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「系統設計沒有唯一正確答案，只有在特定約束條件下更好或更差的取捨。
                    一個能說清楚『我選這個方案是因為 X，代價是 Y，但在這個規模下可以接受』的工程師，
                    比背答案的人值錢十倍。」
                  </p>
                  <p className="text-gray-500 text-sm">— 大型系統設計面試核心原則</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 為什麼系統設計很難 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">為什麼系統設計「感覺很難」？</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            系統設計難不在於技術本身，而在於它沒有固定答案。
            演算法題有正確解，系統設計題是在模糊需求下做取捨。
            初學者最常犯的錯誤有三個：
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                no: '01',
                title: '直接跳進實作細節',
                desc: '「我會用 Redis 做快取，然後加一個 message queue，然後...」——等等，我們連用戶量是多少都不知道，為什麼先設計快取？',
                color: 'red'
              },
              {
                no: '02',
                title: '把系統設計當技術名詞清單',
                desc: '把所有聽過的技術全丟進去：Kafka、Redis、ElasticSearch、CDN...但說不清楚為什麼用這個，而不是更簡單的方案。',
                color: 'orange'
              },
              {
                no: '03',
                title: '忽略約束條件（Constraints）',
                desc: '每個系統都有它的脈絡：預算、團隊規模、維護成本、延遲要求。「最好的架構」是在這些約束下最合適的，不是技術上最酷的。',
                color: 'amber'
              }
            ].map(({ no, title, desc, color }) => (
              <Card key={no} className={`border-0 shadow-md border-l-4 border-${color}-400`}>
                <CardBody className="p-5">
                  <div className="flex gap-4">
                    <span className={`text-3xl font-black text-${color}-200`}>{no}</span>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-md bg-violet-50 border border-violet-200">
            <CardBody className="p-5">
              <p className="text-violet-800 font-semibold mb-2">正確的思考順序</p>
              <div className="flex flex-wrap gap-2 items-center text-sm">
                {['釐清需求', '→', '估算規模', '→', '確認約束', '→', '設計高層架構', '→', '深入關鍵模組', '→', '識別瓶頸', '→', '提出優化方案'].map((step, i) => (
                  <span key={i} className={step === '→' ? 'text-violet-400' : 'bg-white px-3 py-1 rounded-full text-violet-700 border border-violet-200 font-medium'}>
                    {step}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* Step 1: 需求釐清 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Step 1：需求釐清（Requirements Clarification）</h2>
          <p className="text-violet-600 font-semibold mb-6">永遠是第一步，花 5 分鐘在這裡，能省 30 分鐘的冤枉路</p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            面試官說「設計 URL Shortener」，這個描述至少有十種不同的系統。
            在設計之前，你需要問到兩類需求：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-violet-500" />
                  功能性需求（Functional）
                </h3>
                <p className="text-gray-500 text-xs mb-3">系統「要做什麼」</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="bg-gray-50 p-2 rounded">用戶能縮短 URL？</p>
                  <p className="bg-gray-50 p-2 rounded">能自訂短網址後綴？</p>
                  <p className="bg-gray-50 p-2 rounded">短網址有過期時間嗎？</p>
                  <p className="bg-gray-50 p-2 rounded">需要點擊次數統計嗎？</p>
                  <p className="bg-gray-50 p-2 rounded">需要使用者帳號系統嗎？</p>
                </div>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Scale size={18} className="text-purple-500" />
                  非功能性需求（Non-Functional）
                </h3>
                <p className="text-gray-500 text-xs mb-3">系統「要多好」</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="bg-gray-50 p-2 rounded">讀寫比例是多少？（read-heavy?）</p>
                  <p className="bg-gray-50 p-2 rounded">延遲要求？（p99 &lt; 100ms?）</p>
                  <p className="bg-gray-50 p-2 rounded">可用性要求？（99.9%? 99.99%?）</p>
                  <p className="bg-gray-50 p-2 rounded">一致性 vs 可用性如何取捨？</p>
                  <p className="bg-gray-50 p-2 rounded">資料需要持久化多久？</p>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="border-0 shadow-md bg-slate-900 text-white">
            <CardBody className="p-6">
              <p className="text-violet-300 text-sm font-bold mb-3">📝 範例：URL Shortener 的需求確認結果</p>
              <div className="space-y-2 text-sm font-mono">
                <div><span className="text-gray-400">功能：</span> <span className="text-green-400">縮短 URL、redirect、點擊統計</span></div>
                <div><span className="text-gray-400">規模：</span> <span className="text-green-400">100M DAU，讀寫比 = 100:1（讀多寫少）</span></div>
                <div><span className="text-gray-400">延遲：</span> <span className="text-green-400">redirect p99 &lt; 50ms</span></div>
                <div><span className="text-gray-400">可用性：</span> <span className="text-green-400">99.9%（允許每年約 8 小時 downtime）</span></div>
                <div><span className="text-gray-400">一致性：</span> <span className="text-green-400">最終一致性可接受（統計資料）</span></div>
                <div><span className="text-gray-400">保存期限：</span> <span className="text-green-400">預設 5 年，可自訂</span></div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* Step 2: 容量估算 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Step 2：容量估算（Capacity Estimation）</h2>
          <p className="text-violet-600 font-semibold mb-6">「大概」的數字比沒有數字好，數量級對了就夠了</p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            估算的目的不是精確，而是判斷架構規模：
            一台機器夠不夠？需不需要分片？需不需要快取？
            先記住幾個常用數字：
          </p>

          {/* 常用估算數字 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { val: '86K', unit: '次/天', desc: '1 req/秒的日請求量（86400s）' },
              { val: '2.5M', unit: '次/月', desc: '1 req/秒的月請求量（86400 × 30）' },
              { val: '1KB', unit: '/條', desc: '一條一般文字記錄' },
              { val: '1MB', unit: '= 10⁶ B', desc: '百萬位元組' },
              { val: '1GB', unit: '= 10⁹ B', desc: '十億位元組' },
              { val: '1TB', unit: '= 10¹² B', desc: '一兆位元組' },
              { val: '300ms', unit: 'RTT', desc: 'US → Asia 往返延遲' },
              { val: '100ms', unit: '上限', desc: '用戶感知到的「慢」' },
            ].map(({ val, unit, desc }) => (
              <Card key={val + desc} className="border-0 shadow-sm">
                <CardBody className="p-3 text-center">
                  <div className="text-xl font-black text-violet-700">{val}</div>
                  <div className="text-xs text-violet-500 font-semibold">{unit}</div>
                  <div className="text-xs text-gray-400 mt-1">{desc}</div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* URL Shortener 估算示例 */}
          <Card className="border-0 shadow-md">
            <CardBody className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">實戰估算：URL Shortener（100M DAU）</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">📊 QPS（每秒請求數）</p>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
                    <div className="text-gray-600">寫入（縮短 URL）：<span className="text-violet-700">100M DAU × 0.1 次 / 86400s ≈ 115 寫入/s</span></div>
                    <div className="text-gray-600">讀取（redirect）：<span className="text-violet-700">100:1 讀寫比 → 11,500 讀取/s ≈ 12K QPS</span></div>
                    <div className="text-gray-600">峰值：<span className="text-violet-700">平均的 2x → 24K QPS（讀取）</span></div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">💾 儲存空間</p>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
                    <div className="text-gray-600">每條記錄：<span className="text-violet-700">原始 URL(2KB) + 短碼(7B) + 時間戳(8B) ≈ 2.1KB</span></div>
                    <div className="text-gray-600">每天新增：<span className="text-violet-700">115 寫入/s × 86400s × 2.1KB ≈ 20GB/天</span></div>
                    <div className="text-gray-600">5 年總量：<span className="text-violet-700">20GB × 365 × 5 ≈ 36TB</span></div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">🔑 短碼需求</p>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-2">
                    <div className="text-gray-600">5 年總 URL 數：<span className="text-violet-700">115/s × 86400 × 365 × 5 ≈ 18 億條</span></div>
                    <div className="text-gray-600">7 位 Base62（a-z,A-Z,0-9）：<span className="text-violet-700">62⁷ ≈ 3.5 兆，足夠</span></div>
                    <div className="text-gray-600">結論：<span className="text-green-600">7 位短碼即可覆蓋 5 年需求</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-violet-50 rounded-lg p-4 text-sm text-violet-800">
                <strong>估算結論：</strong>12K QPS 的讀取量已超過單台 DB 能扛的上限（約 1K~5K QPS），
                必須引入快取（Redis）。36TB 的資料量需要考慮資料庫分片（Sharding）策略。
                這兩個數字直接影響後續的架構決策。
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* Step 3: 高層架構 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Step 3：高層架構設計（High-Level Design）</h2>
          <p className="text-violet-600 font-semibold mb-6">先畫方塊圖，再說每個方塊的職責</p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            估算結果是架構的「輸入」，不是終點。
            12K QPS 告訴你需要快取；36TB 告訴你需要分片——這些數字現在要轉換成具體的元件與資料流。
            高層架構設計的原則是：<span className="text-violet-700 font-semibold">先確認誰負責什麼，再討論怎麼做</span>。
          </p>

          {/* URL Shortener 架構圖 */}
          <Card className="border-0 shadow-lg bg-slate-900 text-white mb-6">
            <CardBody className="p-8">
              <p className="text-violet-300 text-sm font-bold mb-6">URL Shortener 高層架構</p>
              <div className="space-y-4">
                {/* Client */}
                <div className="flex justify-center">
                  <div className="bg-slate-700 border border-slate-500 rounded-lg px-6 py-3 text-center">
                    <Globe size={20} className="text-violet-400 mx-auto mb-1" />
                    <span className="text-sm font-bold">Client（Browser / App）</span>
                  </div>
                </div>
                <div className="flex justify-center text-gray-500">↓ HTTPS Request</div>
                {/* Load Balancer */}
                <div className="flex justify-center">
                  <div className="bg-violet-900/50 border border-violet-500 rounded-lg px-6 py-3 text-center">
                    <Scale size={20} className="text-violet-400 mx-auto mb-1" />
                    <span className="text-sm font-bold">Load Balancer</span>
                    <p className="text-xs text-gray-400 mt-1">distribute traffic</p>
                  </div>
                </div>
                <div className="flex justify-center text-gray-500">↓ route to service</div>
                {/* API Services */}
                <div className="flex gap-4 justify-center flex-wrap">
                  <div className="bg-slate-700 border border-slate-500 rounded-lg px-4 py-3 text-center">
                    <Server size={18} className="text-amber-400 mx-auto mb-1" />
                    <span className="text-xs font-bold">Write Service</span>
                    <p className="text-xs text-gray-400 mt-1">縮短 URL</p>
                  </div>
                  <div className="bg-slate-700 border border-slate-500 rounded-lg px-4 py-3 text-center">
                    <Zap size={18} className="text-green-400 mx-auto mb-1" />
                    <span className="text-xs font-bold">Read Service</span>
                    <p className="text-xs text-gray-400 mt-1">redirect</p>
                  </div>
                  <div className="bg-slate-700 border border-slate-500 rounded-lg px-4 py-3 text-center">
                    <Layers size={18} className="text-blue-400 mx-auto mb-1" />
                    <span className="text-xs font-bold">Analytics Service</span>
                    <p className="text-xs text-gray-400 mt-1">點擊統計</p>
                  </div>
                </div>
                <div className="flex justify-center gap-12 text-gray-500 text-xs">
                  <span>↓ write</span>
                  <span>↓ read (Cache first)</span>
                  <span>↓ async</span>
                </div>
                {/* Storage */}
                <div className="flex gap-4 justify-center flex-wrap">
                  <div className="bg-red-900/40 border border-red-600 rounded-lg px-4 py-3 text-center">
                    <Database size={18} className="text-red-400 mx-auto mb-1" />
                    <span className="text-xs font-bold">Redis Cache</span>
                    <p className="text-xs text-gray-400 mt-1">hot URLs, TTL</p>
                  </div>
                  <div className="bg-blue-900/40 border border-blue-600 rounded-lg px-4 py-3 text-center">
                    <Database size={18} className="text-blue-400 mx-auto mb-1" />
                    <span className="text-xs font-bold">Primary DB</span>
                    <p className="text-xs text-gray-400 mt-1">URL 對照表</p>
                  </div>
                  <div className="bg-green-900/40 border border-green-600 rounded-lg px-4 py-3 text-center">
                    <Database size={18} className="text-green-400 mx-auto mb-1" />
                    <span className="text-xs font-bold">Analytics DB</span>
                    <p className="text-xs text-gray-400 mt-1">ClickHouse / BigQuery</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-600 leading-relaxed text-sm">
            注意這個架構把讀寫分離成兩個服務（Write Service / Read Service）。
            這是因為我們算出讀取是 12K QPS，但寫入只有 115 QPS——兩者規模差一百倍，
            分開設計讓各自可以獨立擴縮（Scale Out）。
          </p>
        </motion.section>

        <Divider />

        {/* Step 4: 深入關鍵模組 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Step 4：深入關鍵模組</h2>
          <p className="text-violet-600 font-semibold mb-6">面試官通常會指定一個模組讓你深入</p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            以 URL Shortener 為例，最值得深入的是「短碼生成策略」。
            這看起來簡單，但真正做到不重複、高可用，有幾種思路：
          </p>

          <div className="space-y-4">
            {[
              {
                title: '方案 A：雜湊截斷（MD5 / SHA-256）',
                pros: ['實作簡單', '相同 URL 產生相同短碼（去重）'],
                cons: ['Hash 碰撞需處理', '難以支援自訂後綴'],
                code: `// MD5 前 7 碼
const shortCode = md5(originalUrl).slice(0, 7);
// 問題：碰撞時如何處理？遞增後綴直到不衝突`,
                color: 'violet'
              },
              {
                title: '方案 B：全局自增 ID（Auto-increment）',
                pros: ['唯一性保證', '可 Base62 encode 成短碼'],
                cons: ['單點瓶頸（DB 序列）', '可預測的 ID（安全疑慮）'],
                code: `// DB 自增 ID → Base62
function toBase62(id: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  while (id > 0) {
    result = chars[id % 62] + result;
    id = Math.floor(id / 62);
  }
  return result;
}`,
                color: 'purple'
              },
              {
                title: '方案 C：分散式 ID（Snowflake / UUID）',
                pros: ['無單點瓶頸', '分散式環境安全產生'],
                cons: ['UUID 太長（需截斷）', 'Snowflake 需時鐘同步'],
                code: `// Snowflake ID: 64 bits
// [1 bit 符號][41 bit 時間戳][10 bit 機器 ID][12 bit 序列號]
// 可每毫秒產生 4096 個不重複 ID，不需中央協調`,
                color: 'indigo'
              }
            ].map(({ title, pros, cons, code, color }) => (
              <Card key={title} className="border-0 shadow-md">
                <CardBody className="p-6">
                  <h3 className={`font-bold text-${color}-700 mb-3`}>{title}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-bold text-green-600 mb-2">✅ 優點</p>
                      {pros.map(p => <p key={p} className="text-xs text-gray-600 mb-1">• {p}</p>)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-500 mb-2">❌ 缺點</p>
                      {cons.map(c => <p key={c} className="text-xs text-gray-600 mb-1">• {c}</p>)}
                    </div>
                  </div>
                  <CodeBlock language="typescript" filename="" code={code} />
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mt-4">
            <p className="font-bold text-slate-800 mb-2 text-sm">📌 Ticket Server 是什麼？</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Ticket Server 是解決「分散式環境下全局唯一自增 ID」的輕量方案。
              做法是：有一台專用的 DB，只做一件事——維護一個 counter 並批量發放 ID 段。
              每個服務啟動時或用完本地 ID 池後，向 Ticket Server 請求一批 ID（例如 1000 個），
              之後在本地順序使用，不需要每次生成 ID 都打 DB。
              這樣 Ticket Server 的 QPS 壓力降為實際生成 QPS / 批次大小（1000），同時 ID 保持有序（對 B-Tree 索引友好）。
            </p>
          </div>

          <Card className="border-0 shadow-md bg-violet-50 border border-violet-200 mt-4">
            <CardBody className="p-5">
              <p className="text-violet-800 font-bold mb-2">🎯 面試建議答法</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                「我選方案 B（自增 ID + Base62）搭配 <strong>Ticket Server</strong> 解決單點問題：
                用一台專用的 Ticket DB 批量發放 ID 段（例如每次領取 1000 個），
                服務在本地消化這 1000 個 ID 再去領下一批。
                這樣 Ticket Server 的壓力降為 QPS / 1000，且服務有本地 ID 池不依賴 DB 每次請求。」
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* 通用框架 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">通用系統設計框架（可套用任何題目）</h2>

          <div className="space-y-3">
            {[
              { step: '1', title: '釐清需求', time: '5 min', desc: '功能性需求（做什麼）＋非功能性需求（多快、多穩、多大）', icon: CheckCircle },
              { step: '2', title: '容量估算', time: '5 min', desc: '估算 QPS、儲存量、頻寬。數量級對了就夠，不要糾結精確數字', icon: Scale },
              { step: '3', title: '高層架構', time: '10 min', desc: '畫方塊圖，確認主要元件、資料流、讀寫路徑', icon: Layers },
              { step: '4', title: '深入關鍵模組', time: '15 min', desc: '根據面試官指引，深入一個或兩個最複雜的子問題', icon: Zap },
              { step: '5', title: '識別瓶頸與優化', time: '5 min', desc: 'SPOF（單點故障）、熱點（hot key）、跨區延遲、一致性問題', icon: AlertTriangle },
            ].map(({ step, title, time, desc, icon: Icon }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-black shrink-0">
                  {step}
                </div>
                <Card className="border-0 shadow-sm flex-1">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Icon size={16} className="text-violet-500" />
                        {title}
                      </h3>
                      <span className="text-xs text-violet-400 bg-violet-50 px-2 py-0.5 rounded-full">{time}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{desc}</p>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* 常見取捨 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">必知的系統設計取捨</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left p-4 text-violet-900 font-bold">取捨維度</th>
                  <th className="text-left p-4 text-violet-900 font-bold">選 A</th>
                  <th className="text-left p-4 text-violet-900 font-bold">選 B</th>
                  <th className="text-left p-4 text-violet-900 font-bold">何時選 A？</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['一致性 vs 可用性', '強一致（CP）', '最終一致（AP）', '金融交易、庫存扣減'],
                  ['讀延遲 vs 寫延遲', 'Read-through Cache', 'Write-through Cache', '讀多寫少（>10:1）'],
                  ['SQL vs NoSQL', 'SQL（關聯式）', 'NoSQL（文件/KV）', '結構化、需要 JOIN、ACID'],
                  ['垂直擴展 vs 水平擴展', 'Scale Up（更大機器）', 'Scale Out（更多機器）', '初期簡單，有上限'],
                  ['同步 vs 非同步', '同步處理', '非同步 Queue', '非核心路徑、可延遲處理'],
                ].map(([dim, a, b, when]) => (
                  <tr key={String(dim)} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{dim}</td>
                    <td className="p-4 text-violet-700">{a}</td>
                    <td className="p-4 text-purple-700">{b}</td>
                    <td className="p-4 text-gray-500 text-xs">{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <Divider />

        {/* 重點整理 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">重點整理</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: '先問需求再動手', content: '功能性 + 非功能性需求確認清楚，才能判斷架構方向。跳過這步是最常見的失誤。' },
              { title: '估算決定架構', content: '12K QPS → 需要快取；36TB → 需要分片。數字是架構決策的依據，不是裝飾。' },
              { title: '先廣後深', content: '先畫方塊圖（30 分鐘內），再由面試官指引深入特定模組。別一開始就死在細節裡。' },
              { title: '說清楚取捨', content: '每個決策都要說「我選 X 而不是 Y，是因為在我們的場景下 Z 更重要」。沒有取捨的設計是沒想清楚的設計。' },
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
        </motion.section>

        {/* Navigation */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Divider className="mb-8" />
          <div className="flex justify-between items-center">
            <div className="w-64" />
            <div className="flex gap-2">
              <Chip size="sm" color="secondary" variant="flat">System Design</Chip>
              <Chip size="sm" color="secondary" variant="flat">Architecture</Chip>
            </div>
            <Link href="/blog/system-design/ep02-load-balancer">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer w-64">
                <CardBody className="p-4">
                  <div className="flex items-center justify-end gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="text-sm font-semibold text-gray-700">EP.02 負載均衡</p>
                    </div>
                    <ArrowRight size={20} className="text-violet-500" />
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
