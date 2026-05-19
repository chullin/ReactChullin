import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Database,
  Table,
  Search,
  Layers
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL 入門：SELECT 不只是查資料 從關聯式資料庫到 JOIN 的完整思維 | Joseph Chen',
  description: '資料庫是每個軟體系統的心臟。學 SQL 不只是背指令， 更要理解「為什麼要這樣設計」。本篇從零開始，帶你建立正確的資料庫思維。',
  alternates: {
    canonical: 'https://chullin.tw/blog/database/ep01-sql-basics',
  },
};



function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-emerald-600">{icon}</span>
      <h2 className="text-3xl font-black text-gray-900">{children}</h2>
    </div>
  );
}

export default function DBEP01() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.01</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">資料庫與 SQL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              SQL 入門：SELECT 不只是查資料<br />
              <span className="text-emerald-200">從關聯式資料庫到 JOIN 的完整思維</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              資料庫是每個軟體系統的心臟。學 SQL 不只是背指令，
              更要理解「為什麼要這樣設計」。本篇從零開始，帶你建立正確的資料庫思維。
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> SQL · CRUD · JOIN · PostgreSQL</span>
            </div>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* 開場 */}
        <section   >
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-lg">
            <div className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-emerald-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「99% 的 Web 應用都在做同一件事：把資料存進去，再把資料取出來。
                    理解 SQL，就是理解這件事的本質。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    無論你用什麼框架、什麼語言，背後幾乎都有一個關聯式資料庫在撐腰。
                    這篇的目標不是讓你背完所有 SQL 語法，而是讓你真正理解「資料表之間的關係」，
                    以及為什麼 JOIN 是所有 SQL 的靈魂。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 什麼是關聯式資料庫 */}
        <section className="space-y-6">
          <SectionTitle icon={<Database size={28} />}>關聯式資料庫：用表格思考世界</SectionTitle>
          <p className="text-gray-600 text-lg leading-relaxed">
            關聯式資料庫（Relational Database）把所有資料組織成<strong>二維表格（Table）</strong>——
            就像 Excel，但更嚴格、更強大。每個表格有固定的欄位（Column），每一列是一筆資料（Row）。
          </p>

          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
            <p className="font-black text-emerald-800 mb-4 text-sm">範例：一個簡單的電商資料庫</p>
            <div className="space-y-4">
              {/* users table */}
              <div>
                <p className="text-xs font-black text-gray-500 mb-2 uppercase tracking-wide">users 表</p>
                <div className="overflow-x-auto">
                  <table className="text-xs w-full border-collapse min-w-[400px]">
                    <thead>
                      <tr className="bg-emerald-600 text-white">
                        {['id (PK)', 'name', 'email', 'created_at'].map(h => (
                          <th key={h} className="p-2 text-left font-black">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1', 'Joseph', 'joseph@example.com', '2026-01-01'],
                        ['2', 'Alice', 'alice@example.com', '2026-01-03'],
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-emerald-50/40'}>
                          {row.map((cell, j) => (
                            <td key={j} className="p-2 border-b border-emerald-100 font-mono">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* orders table */}
              <div>
                <p className="text-xs font-black text-gray-500 mb-2 uppercase tracking-wide">orders 表</p>
                <div className="overflow-x-auto">
                  <table className="text-xs w-full border-collapse min-w-[400px]">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        {['id (PK)', 'user_id (FK)', 'product', 'amount', 'status'].map(h => (
                          <th key={h} className="p-2 text-left font-black">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['101', '1', 'MacBook Pro', '60000', 'shipped'],
                        ['102', '1', 'AirPods', '5000', 'delivered'],
                        ['103', '2', 'iPad', '25000', 'pending'],
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50/40'}>
                          {row.map((cell, j) => (
                            <td key={j} className="p-2 border-b border-green-100 font-mono">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-700 mt-3 font-medium">
              💡 user_id 是「外鍵（Foreign Key）」——它指向 users 表的 id，這就是「關聯」的意義。
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { term: 'Primary Key (PK)', desc: '每一列的唯一識別符。不可重複、不可為 NULL。通常用自動遞增的整數（SERIAL / AUTO_INCREMENT）。', icon: '🔑' },
              { term: 'Foreign Key (FK)', desc: '指向另一張表 PK 的欄位，建立表之間的「關聯」。例如 orders.user_id 指向 users.id。', icon: '🔗' },
              { term: 'Constraint（約束）', desc: 'NOT NULL / UNIQUE / CHECK 等規則，在資料庫層確保資料合法，比在應用層驗證更可靠。', icon: '🛡️' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-white shadow-sm">
                <div className="p-5">
                  <p className="text-xl mb-2">{item.icon}</p>
                  <p className="font-black text-gray-800 text-sm mb-2">{item.term}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <p className="font-black text-blue-800 mb-2 text-sm">為什麼要把資料拆進多張表（正規化）？</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              如果把 user 的 name、email 都直接存進 orders 表，每次使用者改名，
              你就必須更新所有相關訂單的記錄——這叫「更新異常（Update Anomaly）」。
              把資料拆進獨立的 users 表，用 FK 關聯，改名時只需更新一筆。
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              這就是正規化（Normalization）的核心邏輯：<strong>每個事實只存一次，透過 FK 連接</strong>。
              代價是查詢時需要 JOIN，但維護成本大幅降低。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 建立資料表 */}
        <section className="space-y-6">
          <SectionTitle icon={<Table size={28} />}>DDL：定義你的資料結構</SectionTitle>
          <p className="text-gray-600 leading-relaxed">
            DDL（Data Definition Language）是用來建立和修改資料庫結構的語法。
            先想清楚「資料長什麼樣子」，再動手建表——這個順序很重要。
          </p>

          <CodeBlock
            title="建立 users 和 orders 資料表（PostgreSQL）"
            lang="sql"
            code={`-- 建立 users 表
CREATE TABLE users (
    id         SERIAL PRIMARY KEY,          -- 自動遞增 ID
    name       VARCHAR(100) NOT NULL,       -- 最多 100 字元，不可為空
    email      VARCHAR(255) UNIQUE NOT NULL, -- 唯一且不可為空
    created_at TIMESTAMP DEFAULT NOW()      -- 預設為當下時間
);

-- 建立 orders 表（有外鍵關聯）
CREATE TABLE orders (
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product    VARCHAR(200) NOT NULL,
    amount     DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    status     VARCHAR(20) DEFAULT 'pending'
               CHECK (status IN ('pending', 'shipped', 'delivered')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 常用的 DDL 操作
ALTER TABLE users ADD COLUMN phone VARCHAR(20);  -- 新增欄位
ALTER TABLE users DROP COLUMN phone;              -- 刪除欄位
DROP TABLE orders;                                -- 刪除整張表（謹慎！）`}
          />

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-4">
            <p className="font-black text-slate-800 mb-2 text-sm">SERIAL vs BIGSERIAL vs UUID：Primary Key 型別選哪個？</p>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex gap-3">
                <code className="text-emerald-700 font-black w-28 shrink-0">SERIAL</code>
                <span>32 位元整數，最大約 21 億。小型系統的預設選擇，最簡單。</span>
              </div>
              <div className="flex gap-3">
                <code className="text-emerald-700 font-black w-28 shrink-0">BIGSERIAL</code>
                <span>64 位元整數，最大約 922 京。資料量大或預期快速成長時使用。有序，索引效率高。</span>
              </div>
              <div className="flex gap-3">
                <code className="text-emerald-700 font-black w-28 shrink-0">UUID</code>
                <span>128 位元隨機字串（如 550e8400-...）。分散式系統中可在應用層生成不重複 ID，不需協調。代價：字串比較慢、索引膨脹。</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">實務建議：單機/簡單系統用 BIGSERIAL；多服務、跨 DB 的分散式系統考慮 UUID（或 Snowflake ID）。</p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="font-black text-amber-800 mb-2 text-sm">🔥 ON DELETE CASCADE 是什麼？</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              當你刪除一個 user 時，CASCADE 會自動刪除他所有的 orders。
              另一個選項是 ON DELETE RESTRICT（預設）——如果 user 還有 orders，就拒絕刪除，強制你先處理子資料。
              <br /><br />
              <strong>實務建議</strong>：大多數業務場景不應該真正刪除資料，改用「軟刪除」（加 deleted_at 欄位）更安全。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* CRUD */}
        <section className="space-y-6">
          <SectionTitle icon={<Search size={28} />}>DML：CRUD 的四個操作</SectionTitle>
          <p className="text-gray-600 leading-relaxed">
            DML（Data Manipulation Language）是對資料本身的操作。
            <strong>C</strong>reate / <strong>R</strong>ead / <strong>U</strong>pdate / <strong>D</strong>elete，
            幾乎所有應用邏輯都是這四個的組合。
          </p>

          <CodeBlock
            title="CRUD 基本操作"
            lang="sql"
            code={`-- ─────────────── CREATE（新增）───────────────
INSERT INTO users (name, email)
VALUES ('Joseph', 'joseph@example.com');

-- 一次插入多筆
INSERT INTO orders (user_id, product, amount)
VALUES (1, 'MacBook Pro', 60000),
       (1, 'AirPods', 5000);

-- ─────────────── READ（查詢）────────────────
SELECT * FROM users;                    -- 所有欄位（避免在 production 用 *）
SELECT id, name, email FROM users;     -- 指定欄位

-- WHERE 條件
SELECT * FROM orders WHERE user_id = 1;
SELECT * FROM orders WHERE amount > 10000 AND status = 'shipped';

-- ORDER BY / LIMIT / OFFSET（分頁）
SELECT * FROM orders
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;   -- 第一頁，每頁 10 筆

-- ─────────────── UPDATE（修改）───────────────
UPDATE orders
SET status = 'shipped'
WHERE id = 101;

-- ⚠️ 千萬記得加 WHERE，不然會更新所有列！
-- UPDATE orders SET status = 'shipped';   -- 災難！

-- ─────────────── DELETE（刪除）───────────────
DELETE FROM orders WHERE id = 101;

-- 軟刪除（推薦做法）
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP;
UPDATE users SET deleted_at = NOW() WHERE id = 1;
-- 查詢時過濾掉已刪除的
SELECT * FROM users WHERE deleted_at IS NULL;`}
          />
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* WHERE 進階 */}
        <section className="space-y-6">
          <SectionTitle icon={<Search size={28} />}>WHERE 進階：篩選資料的藝術</SectionTitle>

          <CodeBlock
            title="WHERE 常用技巧"
            lang="sql"
            code={`-- LIKE：模糊搜尋（% 匹配任意字元，_ 匹配單一字元）
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE name LIKE 'J%';   -- 名字以 J 開頭

-- IN：多值比對（比多個 OR 更清晰）
SELECT * FROM orders WHERE status IN ('pending', 'shipped');
-- 等同於 WHERE status = 'pending' OR status = 'shipped'

-- BETWEEN：範圍查詢（含兩端）
SELECT * FROM orders WHERE amount BETWEEN 1000 AND 50000;

-- IS NULL / IS NOT NULL
SELECT * FROM users WHERE deleted_at IS NULL;

-- 子查詢（Subquery）：在 WHERE 中嵌套另一個 SELECT
SELECT * FROM orders
WHERE user_id IN (
    SELECT id FROM users WHERE email LIKE '%@company.com'
);

-- 聚合函數：COUNT / SUM / AVG / MAX / MIN
SELECT COUNT(*) FROM orders WHERE status = 'pending';
SELECT SUM(amount) FROM orders WHERE user_id = 1;
SELECT AVG(amount) FROM orders;

-- GROUP BY + HAVING（分組後再篩選）
SELECT user_id, COUNT(*) AS order_count, SUM(amount) AS total
FROM orders
GROUP BY user_id
HAVING SUM(amount) > 10000;   -- HAVING 是對分組後的結果篩選（不是 WHERE）`}
          />

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <p className="font-black text-blue-800 mb-2 text-sm">WHERE vs HAVING 的差異</p>
            <p className="text-sm text-blue-700 leading-relaxed">
              <strong>WHERE</strong> 在 GROUP BY 之前執行，用來過濾原始資料列。<br />
              <strong>HAVING</strong> 在 GROUP BY 之後執行，用來過濾分組的結果。<br /><br />
              簡單記法：WHERE 過濾「行」，HAVING 過濾「組」。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* JOIN */}
        <section className="space-y-6">
          <SectionTitle icon={<Layers size={28} />}>JOIN：SQL 的靈魂</SectionTitle>
          <p className="text-gray-600 leading-relaxed">
            JOIN 是把兩張（或多張）表根據關聯欄位合併在一起查詢。
            理解 JOIN 是 SQL 最重要的一關，也是面試必考的核心概念。
          </p>

          {/* Join types visual */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                type: 'INNER JOIN',
                desc: '只回傳兩張表都有匹配的列。最常用。',
                visual: '左圓 ∩ 右圓（交集）',
                use: '查詢有訂單的使用者',
                color: 'bg-emerald-50 border-emerald-200',
                badge: 'bg-emerald-100 text-emerald-800',
              },
              {
                type: 'LEFT JOIN',
                desc: '回傳左表所有列，右表沒匹配的填 NULL。',
                visual: '左圓全部 + 右圓交集部分',
                use: '查詢所有使用者（含沒訂單的）',
                color: 'bg-blue-50 border-blue-200',
                badge: 'bg-blue-100 text-blue-800',
              },
              {
                type: 'RIGHT JOIN',
                desc: '回傳右表所有列，左表沒匹配的填 NULL。（少用，通常可改成 LEFT JOIN）',
                visual: '右圓全部 + 左圓交集部分',
                use: '查詢所有訂單（即使使用者已刪除）',
                color: 'bg-violet-50 border-violet-200',
                badge: 'bg-violet-100 text-violet-800',
              },
              {
                type: 'FULL OUTER JOIN',
                desc: '回傳兩張表所有列，沒匹配的填 NULL。',
                visual: '左圓 ∪ 右圓（聯集）',
                use: '對帳：找出任何一側缺漏的資料',
                color: 'bg-amber-50 border-amber-200',
                badge: 'bg-amber-100 text-amber-800',
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${item.badge}`}>{item.type}</span>
                <p className="text-sm text-gray-700 mt-3 mb-2">{item.desc}</p>
                <p className="text-xs text-gray-400 font-mono">{item.visual}</p>
                <p className="text-xs text-gray-500 mt-2">📌 使用情境：{item.use}</p>
              </div>
            ))}
          </div>

          <CodeBlock
            title="四種 JOIN 實際範例"
            lang="sql"
            code={`-- INNER JOIN：只要有訂單的使用者
SELECT u.name, o.product, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN：所有使用者，沒訂單的也要出現
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
-- 沒有訂單的使用者：order_count = 0（因為 COUNT(NULL) = 0）

-- 多表 JOIN：users + orders + products（假設有 products 表）
SELECT u.name, o.amount, p.category
FROM orders o
JOIN users    u ON o.user_id    = u.id
JOIN products p ON o.product_id = p.id
WHERE o.status = 'shipped';

-- SELF JOIN：在同一張表查關聯（例如員工與主管都在 employees 表）
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`}
          />

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="font-black text-amber-800 mb-2 text-sm">⚠️ 常見陷阱：JOIN 後的 COUNT</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              LEFT JOIN 後，如果用 COUNT(*) 計算沒有訂單的使用者，會得到 1 而非 0，
              因為那一列本身存在（只是 order 欄位都是 NULL）。<br />
              正確做法是 <code className="bg-amber-100 px-1 rounded">COUNT(o.id)</code>——COUNT 遇到 NULL 自動跳過，結果才會是 0。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* SQL 執行順序 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900">SQL 的執行順序（面試必考）</h2>
          <p className="text-gray-600 leading-relaxed">
            你寫 SQL 的順序是 SELECT → FROM → WHERE，但資料庫實際執行的順序完全不同。
            理解這個順序，才能寫出正確的查詢（特別是 WHERE vs HAVING 的差異）。
          </p>

          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
            <div className="flex flex-col gap-0">
              {[
                { step: '1', clause: 'FROM / JOIN', desc: '先確定資料來源，執行 JOIN 把表合併', color: 'bg-emerald-100 text-emerald-800' },
                { step: '2', clause: 'WHERE', desc: '過濾原始資料列（不能用 SELECT 定義的別名）', color: 'bg-green-100 text-green-800' },
                { step: '3', clause: 'GROUP BY', desc: '把資料分組', color: 'bg-teal-100 text-teal-800' },
                { step: '4', clause: 'HAVING', desc: '過濾分組後的結果', color: 'bg-cyan-100 text-cyan-800' },
                { step: '5', clause: 'SELECT', desc: '選擇要輸出的欄位、計算聚合函數', color: 'bg-blue-100 text-blue-800' },
                { step: '6', clause: 'ORDER BY', desc: '排序（可以用 SELECT 定義的別名）', color: 'bg-indigo-100 text-indigo-800' },
                { step: '7', clause: 'LIMIT / OFFSET', desc: '截取最終結果', color: 'bg-violet-100 text-violet-800' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${item.color}`}>{item.step}</span>
                  <span className="font-black text-gray-800 w-28 shrink-0 text-sm font-mono">{item.clause}</span>
                  <span className="text-sm text-gray-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-emerald-700 to-green-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '🗂️', text: '關聯式資料庫用表格組織資料，PK 唯一識別每列，FK 建立表之間的關聯。' },
                { emoji: '🏗️', text: 'CREATE TABLE 時就定義好約束（NOT NULL / UNIQUE / CHECK），比在應用層驗證更可靠。' },
                { emoji: '✏️', text: 'CRUD 是所有操作的基礎，UPDATE / DELETE 一定要記得加 WHERE，軟刪除比硬刪除更安全。' },
                { emoji: '🔗', text: 'JOIN 是 SQL 的核心：INNER 取交集，LEFT 保留左表全部，RIGHT 保留右表全部，FULL OUTER 取聯集。' },
                { emoji: '📊', text: 'GROUP BY + 聚合函數（COUNT/SUM/AVG）用來統計，HAVING 過濾分組後的結果（不是 WHERE）。' },
                { emoji: '⚙️', text: 'SQL 執行順序：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT。' },
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

        {/* Navigation */}
        <div className="flex justify-end">
          <Link href="/blog/database/ep02-index" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 w-full sm:w-1/2 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.02 — 索引（Index）</p>
            <p className="text-sm text-gray-500 mt-1">為什麼你的查詢這麼慢？</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['SQL', 'Database', 'PostgreSQL', 'SELECT', 'JOIN', 'CRUD', 'Relational Database', 'EP.01'].map(tag => (
            <span key={tag}   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-bold">{tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
}
