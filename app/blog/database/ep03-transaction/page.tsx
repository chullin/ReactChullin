import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Shield,
  AlertTriangle,
  Layers
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '交易與鎖定：ACID 不只是面試題 隔離層級、髒讀、幻讀與死鎖實戰 | Joseph Chen',
  description: '「帳戶轉帳扣了錢卻沒入帳」、「庫存超賣」——這些都是交易設計錯誤的結果。 ACID 保證的不只是理論，而是你的資料在並發情況下不會壞掉的底線。',
  alternates: {
    canonical: 'https://chullin.tw/blog/database/ep03-transaction',
  },
};



export default function DBEP03() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      <div className="bg-gradient-to-br from-teal-700 via-emerald-700 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.03</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">資料庫與 SQL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              交易與鎖定：ACID 不只是面試題<br />
              <span className="text-teal-200">隔離層級、髒讀、幻讀與死鎖實戰</span>
            </h1>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl">
              「帳戶轉帳扣了錢卻沒入帳」、「庫存超賣」——這些都是交易設計錯誤的結果。
              ACID 保證的不只是理論，而是你的資料在並發情況下不會壞掉的底線。
            </p>
            <div className="flex items-center gap-6 text-teal-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 13 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> ACID · Transaction · Lock · Isolation · Deadlock</span>
            </div>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <section   >
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-lg">
            <div className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-teal-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「轉帳是最經典的資料庫問題：從 A 帳戶扣 1000 元，存入 B 帳戶。
                    如果扣款成功但存入失敗，錢就憑空消失了。交易（Transaction）就是用來防止這件事的。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    交易是資料庫中「一組操作的原子單位」。ACID 定義了交易的四個保證，
                    而理解隔離層級與鎖定機制，才能在高並發系統中寫出正確的程式。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 什麼是交易 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="text-teal-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">什麼是交易（Transaction）？</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            交易是一組 SQL 操作的集合，這組操作<strong>要麼全部成功，要麼全部回滾</strong>，不會有「做一半」的中間狀態。
          </p>

          <CodeBlock
            title="交易的基本語法"
            lang="sql"
            code={`-- 轉帳範例：從帳戶 A 轉 1000 元到帳戶 B
BEGIN;  -- 開始交易

UPDATE accounts SET balance = balance - 1000 WHERE id = 'A';
UPDATE accounts SET balance = balance + 1000 WHERE id = 'B';

-- 如果中途發生錯誤，用 ROLLBACK 回滾所有操作
-- ROLLBACK;

COMMIT;  -- 確認提交，所有變更才永久生效

-- ────────────────────────────────────────
-- 在應用層（Node.js + pg 為例）
const client = await pool.connect();
try {
    await client.query('BEGIN');
    await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [1000, 'A']);
    await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [1000, 'B']);
    await client.query('COMMIT');
} catch (err) {
    await client.query('ROLLBACK');  // 任何錯誤都回滾
    throw err;
} finally {
    client.release();
}`}
          />
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* ACID */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">ACID：交易的四個保證</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                letter: 'A',
                name: 'Atomicity（原子性）',
                desc: '交易中的所有操作，要麼全部完成，要麼全部不做。不存在「做一半」的狀態。',
                example: '轉帳：扣款和入帳是原子的，不可能只發生其中一個。',
                color: 'bg-teal-50 border-teal-200',
                letter_color: 'bg-teal-600',
              },
              {
                letter: 'C',
                name: 'Consistency（一致性）',
                desc: '交易執行前後，資料庫必須保持一致性狀態（滿足所有定義的規則與約束）。',
                example: '帳戶餘額不能為負數（CHECK constraint），轉帳前後兩帳戶的總金額不變。',
                color: 'bg-emerald-50 border-emerald-200',
                letter_color: 'bg-emerald-600',
              },
              {
                letter: 'I',
                name: 'Isolation（隔離性）',
                desc: '並發執行的多個交易之間互不干擾，每個交易都感覺像是在「獨占」資料庫。',
                example: '兩個使用者同時購買最後一件商品，系統必須確保只有一個人成功。',
                color: 'bg-green-50 border-green-200',
                letter_color: 'bg-green-600',
              },
              {
                letter: 'D',
                name: 'Durability（持久性）',
                desc: 'COMMIT 後的資料永久保存，即使系統崩潰也不會丟失。背後是 WAL（Write-Ahead Log）機制：每次資料修改先寫入日誌，再更新實際資料頁。崩潰後，DB 用 WAL 重播尚未落地的變更，回到一致狀態。',
                example: '訂單確認後，即使伺服器突然斷電，重啟後 PostgreSQL 會透過 WAL 恢復，訂單仍然存在。',
                color: 'bg-cyan-50 border-cyan-200',
                letter_color: 'bg-cyan-600',
              },
            ].map((item, i) => (
              <div key={i} className={`border ${item.color}`}>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-9 h-9 rounded-full ${item.letter_color} text-white font-black text-lg flex items-center justify-center shrink-0`}>{item.letter}</span>
                    <p className="font-black text-gray-800 text-sm">{item.name}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                  <p className="text-xs text-gray-500 italic">📌 {item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 並發問題 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">並發問題：不隔離會發生什麼？</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            多個交易同時執行時，如果沒有適當的隔離，就會出現以下三類問題：
          </p>

          <div className="space-y-4">
            {[
              {
                problem: '髒讀（Dirty Read）',
                desc: '交易 A 讀到了交易 B 還未 COMMIT 的資料。如果 B 之後 ROLLBACK，A 讀到的就是不存在的「幽靈資料」。',
                example: 'B 正在轉帳（餘額暫時扣為 0），A 此時查詢顯示餘額為 0，但 B 最終 ROLLBACK 了。',
                severity: '嚴重',
                color: 'bg-red-50 border-red-200',
              },
              {
                problem: '不可重複讀（Non-repeatable Read）',
                desc: '交易 A 在同一個交易中兩次讀取同一列，但兩次結果不同（因為 B 在中間 UPDATE 並 COMMIT 了）。',
                example: '結帳時讀取商品價格是 100，計算完總價後再讀一次變成 120（另一個管理員改了價格）。',
                severity: '中等',
                color: 'bg-amber-50 border-amber-200',
              },
              {
                problem: '幻讀（Phantom Read）',
                desc: '交易 A 兩次執行同樣的範圍查詢，第二次出現了第一次沒有的列（B 在中間 INSERT 並 COMMIT）。',
                example: '統計「庫存 > 0 的商品」，第一次 10 筆，計算後再查變 11 筆（新商品入庫）。',
                severity: '輕微',
                color: 'bg-yellow-50 border-yellow-200',
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-black text-gray-800">{item.problem}</p>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                    item.severity === '嚴重' ? 'bg-red-100 text-red-700' :
                    item.severity === '中等' ? 'bg-amber-100 text-amber-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{item.severity}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                <p className="text-xs text-gray-500 italic">📌 例子：{item.example}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 隔離層級 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-teal-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">四個隔離層級：效能與安全的取捨</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            SQL 標準定義了四個隔離層級，隔離程度越高，並發性能越低。
            沒有「最好的」層級，只有「最適合你場景的」層級。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-teal-700 text-white">
                  {['隔離層級', '髒讀', '不可重複讀', '幻讀', '效能', '適用場景'].map(h => (
                    <th key={h} className="p-3 text-left font-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['READ UNCOMMITTED', '⚠️ 可能', '⚠️ 可能', '⚠️ 可能', '最快', '幾乎不用，僅粗略統計'],
                  ['READ COMMITTED\n（PostgreSQL 預設）', '✅ 防止', '⚠️ 可能', '⚠️ 可能', '快', '一般 CRUD、電商訂單'],
                  ['REPEATABLE READ\n（MySQL InnoDB 預設）', '✅ 防止', '✅ 防止', '⚠️ 可能*', '中', '報表、對帳、金融計算'],
                  ['SERIALIZABLE', '✅ 防止', '✅ 防止', '✅ 防止', '最慢', '嚴格金融交易、搶票'],
                ].map(([level, dirty, nonrep, phantom, perf, use], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-teal-50/30'}>
                    <td className="p-3 font-mono text-xs font-black text-gray-800 border-b border-teal-100 whitespace-pre-line">{level}</td>
                    <td className="p-3 border-b border-teal-100">{dirty}</td>
                    <td className="p-3 border-b border-teal-100">{nonrep}</td>
                    <td className="p-3 border-b border-teal-100">{phantom}</td>
                    <td className="p-3 font-bold text-gray-600 border-b border-teal-100">{perf}</td>
                    <td className="p-3 text-xs text-gray-500 border-b border-teal-100">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">* MySQL InnoDB 在 REPEATABLE READ 層級用 Gap Lock 防止幻讀；PostgreSQL 則需要 SERIALIZABLE 才完全防止。</p>

          <CodeBlock
            title="設定隔離層級"
            lang="sql"
            code={`-- 為單一交易設定隔離層級
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT balance FROM accounts WHERE id = 'A';
-- ... 其他操作 ...
COMMIT;

-- 查看當前預設隔離層級
SHOW transaction_isolation;  -- PostgreSQL

-- 修改 session 預設
SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL READ COMMITTED;`}
          />
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 鎖定 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">鎖定（Lock）：隔離的實作機制</h2>
          <p className="text-gray-600 leading-relaxed">
            隔離層級的背後，是鎖定機制在保護資料。理解鎖定有助於排查並發問題和死鎖。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-blue-50">
              <div className="p-5">
                <p className="font-black text-blue-800 mb-3">共享鎖（Shared Lock / S Lock）</p>
                <p className="text-sm text-blue-700 mb-3">讀取時獲取。多個交易可以同時持有同一列的共享鎖（多讀不互斥）。</p>
                <code className="text-xs bg-blue-100 px-2 py-1 rounded font-mono">SELECT ... FOR SHARE</code>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-red-50">
              <div className="p-5">
                <p className="font-black text-red-800 mb-3">排他鎖（Exclusive Lock / X Lock）</p>
                <p className="text-sm text-red-700 mb-3">寫入時獲取。只有一個交易能持有，其他交易無論讀寫都必須等待。</p>
                <code className="text-xs bg-red-100 px-2 py-1 rounded font-mono">SELECT ... FOR UPDATE</code>
              </div>
            </div>
          </div>

          <CodeBlock
            title="SELECT FOR UPDATE：防止庫存超賣（Node.js + pg）"
            lang="typescript"
            code={`// ❌ 錯誤做法：先讀後寫，沒有鎖（高並發時必然超賣！）
async function buyProductUnsafe(productId: number, userId: number) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query('SELECT stock FROM products WHERE id = $1', [productId]);
    const stock = rows[0].stock;  // A 讀到 1，B 同時也讀到 1
    // A 和 B 都認為有庫存，各自執行 UPDATE → stock 變 -1，超賣！
    if (stock > 0) {
      await client.query('UPDATE products SET stock = stock - 1 WHERE id = $1', [productId]);
    }
    await client.query('COMMIT');
  } finally {
    client.release();
  }
}

// ─────────────────────────────────────────────────────────────────────
// ✅ 正確做法：SELECT FOR UPDATE 取得排他鎖，IF/ELSE 控制流在應用層
async function buyProduct(productId: number, userId: number) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // FOR UPDATE：鎖定這列，其他交易的 FOR UPDATE 請求會阻塞到此交易結束
    const { rows } = await client.query(
      'SELECT stock FROM products WHERE id = $1 FOR UPDATE',
      [productId]
    );
    const stock = rows[0].stock;

    // 控制流在 Node.js，不是在 SQL（SQL 沒有 IF/ELSE，那是 PL/pgSQL 的語法）
    if (stock <= 0) {
      await client.query('ROLLBACK');
      throw new Error('Out of stock');
    }

    await client.query('UPDATE products SET stock = stock - 1 WHERE id = $1', [productId]);
    await client.query('INSERT INTO orders (product_id, user_id) VALUES ($1, $2)', [productId, userId]);
    await client.query('COMMIT');
  } catch (err) {
    // 主動 ROLLBACK（含 DB 錯誤、業務邏輯錯誤等所有異常）
    // 若連線已斷，ROLLBACK 本身可能失敗，但交易超時後 DB 會自動回滾
    try { await client.query('ROLLBACK'); } catch { /* 連線已斷，DB 自動回滾 */ }
    throw err;
  } finally {
    client.release();  // 無論如何都要釋放連線回 pool
  }
}`}
          />
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 死鎖 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">死鎖（Deadlock）：兩個交易互相等待</h2>
          </div>

          <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
            <p className="font-black text-red-800 mb-4 text-sm">死鎖情境：兩個交易的加鎖順序相反</p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <p className="font-black text-red-700 mb-2">交易 A</p>
                <div className="bg-white p-2 rounded-lg border border-red-100">
                  <p className="text-gray-600">BEGIN;</p>
                  <p className="text-red-600 font-black">-- 鎖定 帳戶 1</p>
                  <p className="text-gray-700">SELECT ... FROM accounts WHERE id=1 FOR UPDATE;</p>
                  <p className="text-gray-400 mt-2">-- 等待帳戶 2 的鎖（被 B 持有）</p>
                  <p className="text-gray-500">SELECT ... FROM accounts WHERE id=2 FOR UPDATE;</p>
                  <p className="text-gray-400">⏳ 等待 B 釋放帳戶 2...</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-black text-blue-700 mb-2">交易 B</p>
                <div className="bg-white p-2 rounded-lg border border-blue-100">
                  <p className="text-gray-600">BEGIN;</p>
                  <p className="text-blue-600 font-black">-- 鎖定 帳戶 2</p>
                  <p className="text-gray-700">SELECT ... FROM accounts WHERE id=2 FOR UPDATE;</p>
                  <p className="text-gray-400 mt-2">-- 等待帳戶 1 的鎖（被 A 持有）</p>
                  <p className="text-gray-500">SELECT ... FROM accounts WHERE id=1 FOR UPDATE;</p>
                  <p className="text-gray-400">⏳ 等待 A 釋放帳戶 1...</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-red-700 mt-4">
              結果：A 等 B，B 等 A，永遠等下去。<br />
              PostgreSQL 會自動偵測並終止其中一個交易（回傳 ERROR: deadlock detected）。
            </p>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
            <p className="font-black text-emerald-800 mb-3 text-sm">✅ 避免死鎖的策略</p>
            <ul className="text-sm text-emerald-700 space-y-2">
              <li><strong>固定加鎖順序</strong>：所有交易都按同樣順序鎖定資源（例如永遠先鎖 id 較小的帳戶）。</li>
              <li><strong>縮短交易時間</strong>：交易越短，持有鎖的時間越短，死鎖機率越低。</li>
              <li><strong>一次性取得所有鎖</strong>：用 <code>SELECT ... FOR UPDATE OF a, b</code> 一次鎖定多個表，而非分批鎖定。</li>
              <li><strong>捕捉 deadlock 錯誤並重試</strong>：死鎖是正常現象，應用層要能捕捉並自動重試交易。</li>
            </ul>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-teal-700 to-emerald-700 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '⚛️', text: 'ACID 是交易的四個保證：Atomicity（全或無）、Consistency（約束不違反）、Isolation（並發互不干擾）、Durability（持久化）。' },
                { emoji: '👻', text: '三種並發問題：髒讀（讀未提交資料）、不可重複讀（同列讀兩次不同）、幻讀（範圍查詢多了新列）。' },
                { emoji: '🏰', text: '四個隔離層級：READ UNCOMMITTED < READ COMMITTED（PG 預設）< REPEATABLE READ（MySQL 預設）< SERIALIZABLE。隔離越高效能越低。' },
                { emoji: '🔒', text: 'SELECT FOR UPDATE 取得排他鎖，防止並發讀後寫的競態條件（庫存超賣的核心解法）。' },
                { emoji: '💀', text: '死鎖：A 等 B，B 等 A。預防方式：固定加鎖順序、縮短交易。應用層要捕捉 deadlock 錯誤並重試。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50"  />

        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/database/ep02-index" className="group block bg-gray-50 hover:bg-teal-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-teal-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-teal-600 transition-colors">EP.02 — 索引（Index）</p>
            <p className="text-sm text-gray-500 mt-1">B-Tree 原理與 EXPLAIN 實戰</p>
          </Link>
          <Link href="/blog/database/ep04-schema-design" className="group block bg-gray-50 hover:bg-teal-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-teal-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-teal-600 transition-colors">EP.04 — Schema 設計</p>
            <p className="text-sm text-gray-500 mt-1">正規化、ER Diagram 與反正規化取捨</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['ACID', 'Transaction', 'Lock', 'Isolation', 'Deadlock', 'SELECT FOR UPDATE', 'Database', 'EP.03'].map(tag => (
            <span key={tag}   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-bold">{tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
}
