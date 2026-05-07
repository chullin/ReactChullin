'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Zap, Search, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function DBEP02() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
      <div className="bg-gradient-to-br from-green-700 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.02</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">資料庫與 SQL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              索引（Index）：為什麼你的查詢這麼慢？<br />
              <span className="text-green-200">B-Tree 原理、複合索引與 EXPLAIN 實戰</span>
            </h1>
            <p className="text-green-100 text-lg mb-8 max-w-2xl">
              同樣的 SQL，在 100 筆資料時跑 1ms，在 1000 萬筆時跑 30 秒。
              索引是讓資料庫「秒查」的關鍵，但錯誤的索引策略反而會讓系統更慢。
            </p>
            <div className="flex items-center gap-6 text-green-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 12 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Index · B-Tree · EXPLAIN · PostgreSQL</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-green-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「沒有索引的資料庫查詢，就像在一本沒有目錄的書裡找一個章節——
                    只能從第一頁翻到最後一頁。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    索引是資料庫效能優化最直接、最有效的工具。但「加了索引就快」是個危險的迷思——
                    索引有維護成本，加錯地方反而拖慢寫入。這篇帶你從原理出發，學會判斷「什麼時候該加索引、加在哪裡」。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 什麼是索引 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Search className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">索引是什麼？Full Table Scan 的代價</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            沒有索引時，資料庫找資料的方式是<strong>全表掃描（Full Table Scan）</strong>：
            從第一列讀到最後一列，逐一比對條件。資料量小時無感，資料量大時慘不忍睹。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
              <p className="font-black text-red-800 mb-3 flex items-center gap-2"><AlertTriangle size={16} /> 無索引：全表掃描</p>
              <div className="space-y-1 font-mono text-xs">
                {['第 1 列：email = alice@? ❌', '第 2 列：email = bob@? ❌', '...（掃描 100 萬列）...', '第 999,999 列：✅ 找到了！'].map((row, i) => (
                  <div key={i} className={`p-1.5 rounded ${i === 3 ? 'bg-red-100 text-red-700 font-black' : 'text-red-600'}`}>{row}</div>
                ))}
              </div>
              <p className="text-xs text-red-600 mt-3 font-bold">複雜度：O(N)，N=資料筆數</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
              <p className="font-black text-green-800 mb-3 flex items-center gap-2"><CheckCircle size={16} /> 有索引：B-Tree 查詢</p>
              <div className="space-y-1 font-mono text-xs">
                {['根節點：m < joseph < z → 往右', '中間層：j < joseph < k → 往右', '葉節點：joseph ✅ 找到位置', '直接讀取該列'].map((row, i) => (
                  <div key={i} className={`p-1.5 rounded ${i === 2 ? 'bg-green-100 text-green-700 font-black' : 'text-green-600'}`}>{row}</div>
                ))}
              </div>
              <p className="text-xs text-green-600 mt-3 font-bold">複雜度：O(log N)，百萬筆只需 ~20 步</p>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* B-Tree 原理 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-green-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">B-Tree 索引的運作原理</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            PostgreSQL 和 MySQL 預設的索引結構都是 <strong>B-Tree（Balanced Tree）</strong>。
            它是一棵「平衡」的多叉樹，確保從根節點到任何葉節點的距離都相同——
            這保證了查詢的時間複雜度穩定在 O(log N)。
          </p>

          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
            <p className="font-black text-emerald-800 mb-4 text-sm">B-Tree 結構示意（以 email 欄位建索引）</p>
            <div className="space-y-3">
              {/* Root */}
              <div className="flex justify-center">
                <div className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-black text-sm">根節點：joseph</div>
              </div>
              {/* Lines */}
              <div className="flex justify-center gap-24 text-gray-300 text-lg">
                <span>╱</span><span>╲</span>
              </div>
              {/* Level 2 */}
              <div className="flex justify-center gap-8">
                <div className="bg-emerald-400 text-white px-4 py-1.5 rounded-lg font-bold text-xs">alice · bob</div>
                <div className="bg-emerald-400 text-white px-4 py-1.5 rounded-lg font-bold text-xs">kevin · mary</div>
              </div>
              <div className="flex justify-center gap-2 text-gray-300 text-sm">
                <span>╱ ╲</span><span className="mx-8">╱ ╲</span>
              </div>
              {/* Leaves */}
              <div className="flex justify-center gap-2 flex-wrap">
                {['alice\n→ row 2', 'bob\n→ row 7', 'joseph\n→ row 1', 'kevin\n→ row 5', 'mary\n→ row 9', 'zoe\n→ row 3'].map((leaf, i) => (
                  <div key={i} className="bg-white border border-emerald-200 rounded-lg px-3 py-2 text-center">
                    <p className="text-xs font-mono font-bold text-emerald-800 whitespace-pre-line leading-tight">{leaf}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-emerald-700 mt-2">葉節點儲存索引值 + 指向實際資料列的指標（row pointer）</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-blue-50">
              <CardBody className="p-5">
                <p className="font-black text-blue-800 mb-2">B-Tree 擅長的查詢</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✅ 等值查詢：WHERE email = 'x@x.com'</li>
                  <li>✅ 範圍查詢：WHERE age BETWEEN 20 AND 30</li>
                  <li>✅ 前綴查詢：WHERE name LIKE 'Jo%'</li>
                  <li>✅ 排序：ORDER BY email（可避免額外排序步驟）</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 bg-red-50">
              <CardBody className="p-5">
                <p className="font-black text-red-800 mb-2">B-Tree 無法優化的查詢</p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>❌ 後綴查詢：WHERE name LIKE '%Chen'</li>
                  <li>❌ 函數計算：WHERE YEAR(created_at) = 2026</li>
                  <li>❌ 否定：WHERE status != 'active'（回傳大量資料時）</li>
                  <li>❌ OR 跨欄位（需要多個索引）</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 建立索引 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">建立與管理索引</h2>

          <CodeBlock
            title="索引操作語法（PostgreSQL）"
            lang="sql"
            code={`-- 建立單欄索引
CREATE INDEX idx_users_email ON users(email);

-- 建立唯一索引（同時確保值不重複）
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- 建立複合索引（欄位順序很重要！）
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- 建立部分索引（只對符合條件的列建索引，節省空間）
CREATE INDEX idx_orders_pending ON orders(created_at)
WHERE status = 'pending';   -- 只對待處理訂單建索引

-- 查看某張表的所有索引
SELECT indexname, indexdef FROM pg_indexes
WHERE tablename = 'orders';

-- 刪除索引
DROP INDEX idx_users_email;

-- 重建索引（修復索引膨脹，在離峰時間執行）
REINDEX INDEX idx_users_email;`}
          />

          <div className="bg-red-50 rounded-2xl p-4 border border-red-200 mb-4">
            <p className="font-black text-red-800 mb-2 text-sm">⚠️ 生產環境建索引：一定要加 CONCURRENTLY</p>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              普通的 <code>CREATE INDEX</code> 會鎖住整張表，期間所有寫入都被阻塞。
              百萬列的表可能鎖幾分鐘——生產環境中這等同於服務中斷。
              加上 <code>CONCURRENTLY</code> 讓索引在背景建立，不阻塞讀寫。
            </p>
            <div className="bg-slate-900 rounded p-3 font-mono text-xs text-green-400 space-y-1">
              <p className="text-gray-400">-- ❌ 生產環境禁用（會鎖表）</p>
              <p>CREATE INDEX idx_users_email ON users(email);</p>
              <p className="text-gray-400 mt-2">-- ✅ 生產環境必用（背景建立，不阻塞）</p>
              <p>CREATE INDEX CONCURRENTLY idx_users_email ON users(email);</p>
              <p className="text-gray-400 mt-2">-- 注意：CONCURRENTLY 不能在交易（BEGIN...COMMIT）內使用</p>
              <p className="text-gray-400">--      若中途失敗，需手動清除殘留的 INVALID 索引</p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="font-black text-amber-800 mb-2 text-sm">💡 主鍵（PRIMARY KEY）自動建索引</p>
            <p className="text-sm text-amber-700">
              定義 PRIMARY KEY 時，PostgreSQL 會自動建立一個唯一索引。
              不需要、也不應該再手動對 id 欄位建索引。
              FOREIGN KEY 欄位（如 user_id）則<strong>不會</strong>自動建索引，需要手動加——這是常見遺漏。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 複合索引 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">複合索引的欄位順序：最重要的細節</h2>
          <p className="text-gray-600 leading-relaxed">
            複合索引（Composite Index）可以同時索引多個欄位，但<strong>欄位的順序決定了索引的效用</strong>。
            這是最多人搞錯的地方。
          </p>

          <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
            <p className="font-black text-green-800 mb-2 text-sm">規則：最左前綴原則（Leftmost Prefix Rule）</p>
            <p className="text-sm text-green-700 mb-4">
              索引 (A, B, C) 可以服務以下查詢，但只能從左邊開始連續使用：
            </p>
            <div className="space-y-2">
              {[
                { query: 'WHERE A = 1', uses: '✅ 使用索引（A）', ok: true },
                { query: 'WHERE A = 1 AND B = 2', uses: '✅ 使用索引（A, B）', ok: true },
                { query: 'WHERE A = 1 AND B = 2 AND C = 3', uses: '✅ 使用索引（A, B, C）', ok: true },
                { query: 'WHERE B = 2', uses: '❌ 無法使用索引（跳過了 A）', ok: false },
                { query: 'WHERE A = 1 AND C = 3', uses: '⚠️ 只能使用 A 部分，C 無法走索引', ok: null },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.ok === true ? 'bg-white' : item.ok === false ? 'bg-red-50' : 'bg-amber-50'}`}>
                  <code className="text-xs font-mono text-gray-700 flex-1">{item.query}</code>
                  <span className={`text-xs font-bold shrink-0 ${item.ok === true ? 'text-green-600' : item.ok === false ? 'text-red-600' : 'text-amber-600'}`}>{item.uses}</span>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="複合索引設計實例"
            lang="sql"
            code={`-- 場景：電商訂單查詢，最常見的查詢模式是：
-- 1. 查某個使用者的特定狀態訂單（最常見）
-- 2. 查某個使用者的所有訂單
-- 3. 查特定狀態的所有訂單（較少）

-- ❌ 錯誤設計（status 在前）
CREATE INDEX idx_bad ON orders(status, user_id);
-- WHERE user_id = 1 → 無法使用此索引！

-- ✅ 正確設計（高選擇性欄位在前）
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
-- WHERE user_id = 1            → 使用 user_id 部分
-- WHERE user_id = 1 AND status = 'pending' → 使用完整索引

-- 設計原則：
-- 1. 等值查詢的欄位放前面（= 而非 BETWEEN / LIKE）
-- 2. 高選擇性的欄位放前面（user_id 比 status 更有辨別力）
-- 3. ORDER BY 的欄位放最後（可利用索引排序，避免額外 Sort 步驟）`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* EXPLAIN */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Search className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">EXPLAIN：看穿查詢的執行計畫</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            <code>EXPLAIN</code> 是診斷慢查詢最重要的工具。它顯示資料庫「打算怎麼執行你的 SQL」——
            有沒有走索引、掃了多少列、花了多少成本。
          </p>

          <CodeBlock
            title="EXPLAIN ANALYZE 使用範例"
            lang="sql"
            code={`-- EXPLAIN：只看執行計畫（不實際執行）
EXPLAIN SELECT * FROM orders WHERE user_id = 1;

-- EXPLAIN ANALYZE：實際執行並回報真實時間（推薦）
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1 AND status = 'pending';

-- 典型輸出（有索引）：
-- Index Scan using idx_orders_user_status on orders
--   (cost=0.43..8.45 rows=3 width=72) (actual time=0.05..0.07 rows=2 loops=1)
--   Index Cond: ((user_id = 1) AND (status = 'pending'))

-- 典型輸出（無索引，全表掃描）：
-- Seq Scan on orders
--   (cost=0.00..21458.00 rows=1000000 width=72) (actual time=0.05..312.4 rows=2 loops=1)
--   Filter: ((user_id = 1) AND (status = 'pending'))
--   Rows Removed by Filter: 999998`}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <p className="font-black text-slate-800 mb-3 text-sm">看懂 EXPLAIN 輸出的關鍵欄位</p>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'Seq Scan', desc: '全表掃描，通常是問題所在' },
                  { key: 'Index Scan', desc: '走索引，好的跡象' },
                  { key: 'Index Only Scan', desc: '只讀索引不讀資料列，最快' },
                  { key: 'cost=X..Y', desc: 'X=取第一列的成本，Y=總成本（越小越好）' },
                  { key: 'rows=N', desc: '預估回傳的列數（與 actual 差很多表示統計過期）' },
                  { key: 'actual time=X..Y', desc: '實際執行時間（ms），ANALYZE 才有' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <code className="text-emerald-700 font-black w-36 shrink-0">{item.key}</code>
                    <span className="text-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <p className="font-black text-amber-800 mb-3 text-sm">⚠️ 為什麼索引有時不被使用？</p>
              <ul className="text-xs text-amber-700 space-y-2">
                <li>• <strong>資料量太少</strong>：幾百列時全表掃描比走索引更快（有 overhead）</li>
                <li>• <strong>選擇性太低</strong>：欄位值重複率高（如性別），全掃比索引跳轉更划算</li>
                <li>• <strong>函數包裹欄位</strong>：WHERE LOWER(email) = 'x'，索引在 email 上，LOWER() 使其失效</li>
                <li>• <strong>隱式型別轉換</strong>：欄位是 VARCHAR，查詢傳 INTEGER，型別不符導致索引失效</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 索引的代價 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900">索引的代價：不是加越多越好</h2>
          <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
            <p className="font-black text-red-800 mb-4">每個索引都有維護成本</p>
            <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
              {[
                { icon: '💾', title: '儲存空間', desc: '每個索引都需要額外的磁碟空間。一張表索引多了，可能比資料本身還大。' },
                { icon: '✏️', title: '寫入效能', desc: 'INSERT / UPDATE / DELETE 時，所有相關索引都需要同步更新。寫多讀少的表慎加索引。' },
                { icon: '🔒', title: '鎖定範圍', desc: '索引更新需要獲取鎖，高並發寫入時多餘的索引會加劇鎖競爭。' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4">
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="font-black text-gray-800 mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
            <p className="font-black text-emerald-800 mb-3 text-sm">✅ 索引最佳實踐</p>
            <ul className="text-sm text-emerald-700 space-y-1.5">
              <li>• <strong>WHERE、JOIN ON、ORDER BY 的欄位</strong>是索引的第一候選</li>
              <li>• FK 欄位（如 user_id）幾乎都該加索引——外鍵查詢非常頻繁</li>
              <li>• 選擇性高的欄位優先（email 勝過 gender）</li>
              <li>• 先用 EXPLAIN ANALYZE 確認問題，再加索引——不要猜測</li>
              <li>• 定期用 <code>pg_stat_user_indexes</code> 檢查索引使用率，刪除從未被使用的索引</li>
            </ul>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-green-700 to-emerald-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '🔍', text: '無索引 = Full Table Scan = O(N)。B-Tree 索引讓查詢降到 O(log N)，百萬筆資料只需約 20 步。' },
                { emoji: '🌲', text: 'B-Tree 擅長等值、範圍、前綴查詢；不適合後綴（LIKE \'%x\'）和函數包裹的欄位。' },
                { emoji: '📐', text: '複合索引遵循最左前綴原則：(A,B,C) 的索引，查詢必須從 A 開始才有效。高選擇性、等值查詢的欄位放前面。' },
                { emoji: '🔬', text: 'EXPLAIN ANALYZE 是診斷工具：看 Seq Scan 還是 Index Scan、actual time、rows 的估計準不準。' },
                { emoji: '⚖️', text: '索引有代價：每次寫入都需要更新索引。不要「猜測」要加什麼索引，先量測再決定。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/database/ep01-sql-basics" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.01 — SQL 入門</p>
            <p className="text-sm text-gray-500 mt-1">SELECT、JOIN、CRUD 基礎</p>
          </Link>
          <Link href="/blog/database/ep03-transaction" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.03 — 交易與 ACID</p>
            <p className="text-sm text-gray-500 mt-1">鎖定、隔離層級與死鎖</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Index', 'B-Tree', 'PostgreSQL', 'EXPLAIN', 'Performance', 'Composite Index', 'Database', 'EP.02'].map(tag => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
