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
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Search,
  BookOpen,
  Layers,
  Activity,
  BarChart3,
  Info
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function DBEP07() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50">

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-br from-blue-800 via-indigo-700 to-violet-700 text-white">
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
                資料庫系列
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              PostgreSQL 進階：Window Functions、CTE、EXPLAIN ANALYZE
              <br />
              <span className="text-indigo-200">讓你從「會寫 SQL」進化到「寫好 SQL」</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl">
              ROW_NUMBER、RANK、LAG/LEAD、遞迴 CTE、執行計畫優化 — 讓你從「會寫 SQL」進化到「寫好 SQL」
            </p>
            <div className="flex items-center gap-6 text-indigo-200 text-sm flex-wrap">
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
                <Database size={14} /> PostgreSQL · Window Functions · CTE · EXPLAIN ANALYZE
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ─── Section 1: 你的 SQL 可能很慢，但你不知道 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">你的 SQL 可能很慢，但你不知道</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            大多數工程師寫 SQL 的標準是「功能正確」，但在資料量小的時候，幾乎所有寫法都夠快。
            問題出在資料量增長後 — 同樣的邏輯，優化的寫法可能比未優化的快上百倍。
            以下是一個真實案例：兩個查詢，功能完全相同，但執行時間差了 100 倍。
          </p>

          <CodeBlock language="sql">
{`   -- ❌ 慢查詢（掃全表 + 子查詢重複執行）
SELECT *
FROM orders o
WHERE o.total = (
  SELECT MAX(total)
  FROM orders
  WHERE user_id = o.user_id  -- 每一行都執行一次子查詢！
);
-- 執行時間：4,200ms（百萬行）

-- ✅ 優化後（Window Function）
SELECT *
FROM (
  SELECT *,
         MAX(total) OVER (PARTITION BY user_id) AS max_total
  FROM orders
) ranked
WHERE total = max_total;
-- 執行時間：42ms（同樣百萬行）   `}
</CodeBlock>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>為什麼差這麼多？</strong>
              慢查詢中的子查詢是「相關子查詢（Correlated Subquery）」，對每一行外部資料都重新執行一次。
              若 orders 表有 100 萬行，子查詢就跑 100 萬次。而 Window Function 只需掃描一次資料集即可完成計算。
            </p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            本文將涵蓋三大主題，幫你從「SQL 能跑就好」升級到「SQL 要跑得好」：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <BarChart3 className="text-indigo-500" size={22} />,
                title: 'Window Functions',
                desc: '不用 GROUP BY 也能做聚合計算，保留所有行的同時進行統計',
                color: 'bg-indigo-50 border-indigo-200',
              },
              {
                icon: <BookOpen className="text-violet-500" size={22} />,
                title: 'CTE（Common Table Expression）',
                desc: '讓複雜查詢拆解成可讀的邏輯單元，支援遞迴處理樹狀結構',
                color: 'bg-violet-50 border-violet-200',
              },
              {
                icon: <Search className="text-blue-500" size={22} />,
                title: 'EXPLAIN ANALYZE',
                desc: '看懂執行計畫，精準定位效能瓶頸，用 Index 把慢查詢變快查詢',
                color: 'bg-blue-50 border-blue-200',
              },
            ].map(({ icon, title, desc, color }) => (
              <Card key={title} className={`border ${color} shadow-sm`}>
                <CardBody className="p-5 space-y-3">
                  {icon}
                  <h3 className="font-black text-gray-800">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 2: Window Functions ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Window Functions — 聚合不折疊行</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Window Functions 是 SQL 中最被低估的功能之一。它和 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GROUP BY</code> 最根本的區別在於：
            GROUP BY 會把多行「折疊」成一行，而 Window Functions 保留所有原始行，同時在每行上附加計算結果。
          </p>

          <CodeBlock language="sql">
{`   -- GROUP BY：結果被「折疊」為每組一行
SELECT department_id, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id;
-- 每個部門只有一行結果，員工個人資訊消失了

-- OVER()：保留所有行，同時計算部門平均
SELECT
  name,
  department_id,
  salary,
  AVG(salary) OVER (PARTITION BY department_id) AS dept_avg_salary,
  salary - AVG(salary) OVER (PARTITION BY department_id) AS diff_from_avg
FROM employees;
-- 每個員工一行，同時顯示他跟部門平均的差距
-- 可以直接看到「這個人比部門平均高/低多少」   `}
</CodeBlock>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
            <p className="text-indigo-800 text-sm leading-relaxed">
              <strong>PARTITION BY vs ORDER BY in OVER()：</strong>
              <code className="bg-indigo-100 px-1 rounded font-mono">PARTITION BY</code> 定義計算的分組範圍（類似 GROUP BY），
              <code className="bg-indigo-100 px-1 rounded font-mono">ORDER BY</code> 定義視窗內的排序順序（影響排名、累計等計算）。
              兩者可以同時使用，也可以只用其中一個。
            </p>
          </div>

          <h3 className="text-xl font-black text-gray-800 mt-8">四大排名函數：ROW_NUMBER、RANK、DENSE_RANK、PERCENT_RANK</h3>

          <p className="text-gray-600 leading-relaxed">
            排名函數是 Window Functions 最常見的應用場景，但四種函數處理「同分」的方式完全不同，
            選錯會導致業務邏輯錯誤。下面用一個具體例子說明差異：
          </p>

          <CodeBlock language="sql">
{`   -- 測試資料
WITH scores AS (
  SELECT 'Alice' AS name, 95 AS score UNION ALL
  SELECT 'Bob', 87 UNION ALL
  SELECT 'Charlie', 87 UNION ALL
  SELECT 'David', 72 UNION ALL
  SELECT 'Eve', 72
)
SELECT
  name,
  score,
  ROW_NUMBER() OVER (ORDER BY score DESC) AS row_num,
  -- 1, 2, 3, 4, 5（每行唯一，不跳號）
  -- 同分時依資料庫內部順序任意決定，結果不穩定

  RANK() OVER (ORDER BY score DESC) AS rank,
  -- 1, 2, 2, 4, 4（同分同名次，跳號）
  -- 兩個第2名之後，下一名是第4名

  DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank,
  -- 1, 2, 2, 3, 3（同分同名次，不跳號）
  -- 兩個第2名之後，下一名是第3名

  PERCENT_RANK() OVER (ORDER BY score DESC) AS percentile
  -- 0.0, 0.25, 0.25, 0.75, 0.75（百分位）
  -- 計算公式：(rank - 1) / (total_rows - 1)
FROM scores;   `}
</CodeBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                func: 'ROW_NUMBER()',
                use: '需要每行唯一編號時（例如分頁實作）',
                warn: '同分時順序不確定，不適合排行榜',
                color: 'bg-blue-50 border-blue-200 text-blue-800',
              },
              {
                func: 'RANK()',
                use: '標準競賽排名（奧運模式：沒有第3，直接第4）',
                warn: '名次不連續，某些業務場景可能造成混淆',
                color: 'bg-violet-50 border-violet-200 text-violet-800',
              },
              {
                func: 'DENSE_RANK()',
                use: '需要名次連續的排行榜（最常用的業務排名）',
                warn: '名次連續但不唯一，需確認業務對同名次的處理',
                color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
              },
              {
                func: 'PERCENT_RANK()',
                use: '統計分析，了解數據在整體分布中的位置',
                warn: '第一名固定是 0.0，最後一名固定是 1.0',
                color: 'bg-slate-50 border-slate-200 text-slate-800',
              },
            ].map(({ func, use, warn, color }) => (
              <div key={func} className={`border rounded-xl p-4 ${color}`}>
                <p className="font-black font-mono text-sm mb-2">{func}</p>
                <p className="text-sm mb-1"><strong>適用：</strong>{use}</p>
                <p className="text-xs opacity-75"><strong>注意：</strong>{warn}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 3: LAG/LEAD ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">LAG/LEAD — 讀取前後行的資料</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">LAG()</code> 和
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">LEAD()</code>
            是時序分析的神器。LAG 讀取「前幾行」的值，LEAD 讀取「後幾行」的值。
            最典型的應用是計算環比成長率：今天和昨天比，這個月和上個月比。
            不用自己 JOIN，也不用子查詢，一行就能搞定。
          </p>

          <CodeBlock language="sql">
{`   -- 計算每月銷售額與上月的環比成長率
SELECT
  year,
  month,
  total_sales,
  LAG(total_sales) OVER (ORDER BY year, month) AS prev_month_sales,
  LEAD(total_sales) OVER (ORDER BY year, month) AS next_month_sales,
  ROUND(
    (total_sales - LAG(total_sales) OVER (ORDER BY year, month))
    / NULLIF(LAG(total_sales) OVER (ORDER BY year, month), 0) * 100,
    2
  ) AS growth_rate_pct
  -- NULLIF 防止除以 0（當上月銷售為 0 時回傳 NULL 而非錯誤）
FROM monthly_sales
ORDER BY year, month;   `}
</CodeBlock>

          <CodeBlock language="sql">
{`   -- LAG/LEAD 的三個參數
LAG(total_sales, 1, 0) OVER (ORDER BY month)
-- 第一個參數：要讀取的欄位
-- 第二個參數：offset，往前幾行（預設為 1）
-- 第三個參數：預設值，當沒有前一行時使用（預設為 NULL）

LAG(total_sales, 3) OVER (ORDER BY month)
-- 往前3行，即「季度對比」，與三個月前比較

LEAD(total_sales, 1, 0) OVER (ORDER BY month)
-- 往後1行，即「預覽下個月的數字」   `}
</CodeBlock>

          <h3 className="text-xl font-black text-gray-800">搭配 PARTITION BY：每個分組獨立計算</h3>

          <p className="text-gray-600 leading-relaxed">
            LAG/LEAD 和其他 Window Functions 一樣，可以搭配 PARTITION BY 讓每個分組獨立計算，
            不同分組之間的邊界不會互相干擾。下面的例子計算每個用戶相鄰訂單的時間差：
          </p>

          <CodeBlock language="sql">
{`   -- 每個用戶的相鄰訂單時間差
SELECT
  user_id,
  order_id,
  created_at,
  LAG(created_at) OVER (
    PARTITION BY user_id      -- 每個用戶獨立計算
    ORDER BY created_at       -- 按時間排序
  ) AS prev_order_at,
  created_at - LAG(created_at) OVER (
    PARTITION BY user_id
    ORDER BY created_at
  ) AS days_since_last_order
  -- 第一筆訂單的 prev_order_at 為 NULL（沒有前一筆）
  -- 所以 days_since_last_order 也會是 NULL
FROM orders;

-- 實際應用：找出超過 30 天沒有回購的用戶
SELECT DISTINCT user_id
FROM (
  SELECT
    user_id,
    created_at,
    LEAD(created_at) OVER (PARTITION BY user_id ORDER BY created_at) AS next_order_at
  FROM orders
) gaps
WHERE next_order_at IS NULL  -- 最後一筆訂單
   OR next_order_at - created_at > INTERVAL '30 days';  -- 或間隔超過30天   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 4: Sliding Window ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Activity className="text-purple-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Sliding Window — 移動視窗計算</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Sliding Window（移動視窗）是 Window Functions 最強大的特性之一，讓你可以定義「計算範圍」：
            不是計算整個 PARTITION，而是計算「當前行前後 N 行」的範圍。
            常見應用包含 7 天移動平均、累計銷售額、滾動總和等。
          </p>

          <CodeBlock language="sql">
{`   -- 7天移動平均（Rolling Average）
SELECT
  date,
  daily_revenue,
  AVG(daily_revenue) OVER (
    ORDER BY date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW  -- 當前行 + 前6行 = 7天
  ) AS revenue_7day_avg,

  SUM(daily_revenue) OVER (
    ORDER BY date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  -- 從第一行到當前行
  ) AS cumulative_revenue
  -- 累計總和：每行顯示從期初到該日期的總收入
FROM daily_revenue_report;   `}
</CodeBlock>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 space-y-3">
            <p className="text-purple-800 font-bold text-sm">ROWS vs RANGE 的差異（容易踩坑！）</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <p className="font-bold mb-1">ROWS（按物理行數）</p>
                <p>精確計算「前 N 行」。推薦使用。</p>
                <p className="font-mono bg-purple-100 px-2 py-1 rounded mt-1 text-xs">ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</p>
              </div>
              <div>
                <p className="font-bold mb-1">RANGE（按值的範圍）</p>
                <p>相同排序值的行算同一組，可能包含意外的行數。</p>
                <p className="font-mono bg-purple-100 px-2 py-1 rounded mt-1 text-xs">RANGE BETWEEN 6 PRECEDING AND CURRENT ROW</p>
              </div>
            </div>
          </div>

          <CodeBlock language="sql">
{`   -- 視窗邊界語法完整說明
ROWS BETWEEN [start] AND [end]

-- start / end 可以是：
-- UNBOUNDED PRECEDING  → 分組的第一行
-- N PRECEDING          → 當前行之前的第 N 行
-- CURRENT ROW          → 當前行
-- N FOLLOWING          → 當前行之後的第 N 行
-- UNBOUNDED FOLLOWING  → 分組的最後一行

-- 實用範例
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW   -- 累計計算（最常用）
ROWS BETWEEN 6 PRECEDING AND CURRENT ROW           -- 7日滾動窗口
ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING           -- 前後各3行（中心移動平均）
ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING   -- 從現在到結尾的累計

-- 累計排名百分比（實際業務範例）
SELECT
  user_id,
  order_total,
  SUM(order_total) OVER (
    ORDER BY order_total
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total,
  SUM(order_total) OVER () AS grand_total,  -- OVER() 空括號 = 全部行
  ROUND(
    100.0 * SUM(order_total) OVER (
      ORDER BY order_total
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) / SUM(order_total) OVER (),
    1
  ) AS cumulative_pct
FROM orders;   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 5: CTE ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Layers className="text-violet-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">CTE — 讓複雜查詢可讀</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            CTE（Common Table Expression，公共表表達式）用 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">WITH</code> 關鍵字開頭，
            讓你把一個複雜查詢拆成多個具名的邏輯單元，每個單元可以被後面的查詢引用。
            最大的優點是可讀性：複雜的 Nested Subquery 可以變成清晰的線性邏輯。
          </p>

          <CodeBlock language="sql">
{`   -- 沒有 CTE 的複雜查詢（難以維護，三個月後連自己都看不懂）
SELECT u.name, order_counts.count, revenue.total
FROM users u
JOIN (
  SELECT user_id, COUNT(*) as count
  FROM orders
  WHERE status = 'completed'
  GROUP BY user_id
) order_counts ON u.id = order_counts.user_id
JOIN (
  SELECT user_id, SUM(total) as total
  FROM orders
  WHERE status = 'completed'
  GROUP BY user_id
) revenue ON u.id = revenue.user_id;
-- 問題：orders 表被掃描了兩次，邏輯重複且難以維護   `}
</CodeBlock>

          <CodeBlock language="sql">
{`   -- 用 CTE 改寫（清晰易讀，邏輯一目瞭然）
WITH completed_orders AS (
  -- 第一步：篩選已完成的訂單（只掃描一次）
  SELECT user_id, total
  FROM orders
  WHERE status = 'completed'
),
user_order_stats AS (
  -- 第二步：計算每個用戶的統計數據
  SELECT
    user_id,
    COUNT(*) AS order_count,
    SUM(total) AS total_revenue,
    AVG(total) AS avg_order_value
  FROM completed_orders  -- 引用上一個 CTE
  GROUP BY user_id
)
-- 第三步：最終結果，與用戶表 JOIN
SELECT
  u.name,
  u.email,
  s.order_count,
  s.total_revenue,
  ROUND(s.avg_order_value, 2) AS avg_order_value
FROM users u
JOIN user_order_stats s ON u.id = s.user_id
ORDER BY s.total_revenue DESC
LIMIT 100;   `}
</CodeBlock>

          <h3 className="text-xl font-black text-gray-800 mt-8">遞迴 CTE — 處理樹狀結構的利器</h3>

          <p className="text-gray-600 leading-relaxed">
            CTE 支援遞迴（<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">WITH RECURSIVE</code>），
            可以處理自引用的樹狀結構，例如組織架構、商品分類樹、評論回覆鏈。
            遞迴 CTE 由兩部分組成：基礎查詢（錨點）和遞迴查詢，用 UNION ALL 連接。
          </p>

          <CodeBlock language="sql">
{`   -- 組織架構樹（自引用表）
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  manager_id INT REFERENCES employees(id)  -- NULL = 最高層（CEO）
);

-- 找出 CEO 下的所有成員（遞迴展開整個組織樹）
WITH RECURSIVE org_chart AS (
  -- 基礎查詢（錨點）：從指定的人開始
  SELECT
    id,
    name,
    manager_id,
    1 AS level,                      -- 第一層
    CAST(name AS TEXT) AS path       -- 追蹤路徑
  FROM employees
  WHERE id = 1  -- 從 CEO（id=1）開始

  UNION ALL

  -- 遞迴查詢：找上一層的每個人的直屬下屬
  SELECT
    e.id,
    e.name,
    e.manager_id,
    oc.level + 1,                    -- 層級加一
    oc.path || ' > ' || e.name       -- 追加路徑
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id  -- 我的上司在前一層
  WHERE oc.level < 10  -- 防止無限遞迴（資料有循環時的保護）
)
SELECT
  id,
  REPEAT('  ', level - 1) || name AS indented_name,  -- 縮排顯示層級
  level,
  path
FROM org_chart
ORDER BY level, name;

-- 輸出結果（示意）：
-- CEO                        (level 1)
--   CTO                      (level 2)
--     VP Engineering         (level 3)
--       Senior Engineer A    (level 4)   `}
</CodeBlock>

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
            <p className="text-violet-800 text-sm leading-relaxed">
              <strong>遞迴 CTE 的執行邏輯：</strong>
              先執行基礎查詢得到初始結果集，然後把結果集作為輸入執行遞迴查詢，
              得到新結果再作為輸入繼續遞迴，直到遞迴查詢回傳空集合為止。
              務必加上 <code className="bg-violet-100 px-1 rounded font-mono">WHERE level &lt; N</code> 等防護條件，避免資料有循環時造成無限遞迴。
            </p>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 6: EXPLAIN ANALYZE ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Search className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">EXPLAIN ANALYZE — 看懂執行計畫</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            優化 SQL 最重要的工具是 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">EXPLAIN ANALYZE</code>。
            它告訴你 PostgreSQL 實際上怎麼執行你的查詢：掃描了哪些表、用了哪些 Index、每個步驟花了多少時間。
            沒有這個工具，所謂的「優化」只是猜測。有了它，才能做到有根據的效能改善。
          </p>

          <CodeBlock language="sql">
{`   -- 在任何查詢前加上 EXPLAIN ANALYZE 即可查看執行計畫
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2026-01-01'
GROUP BY u.id, u.name;   `}
</CodeBlock>

          <CodeBlock language="bash">
{`   -- 典型輸出（需要學會解讀每一行的含義）
HashAggregate  (cost=1250.00..1350.00 rows=1000 width=50)
               (actual time=125.3..142.8 rows=892 loops=1)
  Group Key: u.id, u.name
  ->  Hash Left Join  (cost=250.00..1200.00 rows=10000 width=30)
                      (actual time=45.2..110.5 rows=10542 loops=1)
        Hash Cond: (o.user_id = u.id)
        ->  Seq Scan on orders o  (cost=0.00..800.00 rows=50000 width=10)
                                  (actual time=0.1..55.3 rows=50000 loops=1)
        ->  Hash  (cost=200.00..200.00 rows=4000 width=24)
                  (actual time=44.8..44.9 rows=3892 loops=1)
              ->  Seq Scan on users u  (cost=0.00..200.00 rows=4000 width=24)
                                       (actual time=0.1..22.3 rows=3892 loops=1)
                    Filter: (created_at > '2026-01-01'::date)
                    Rows Removed by Filter: 108
Planning Time: 3.2 ms
Execution Time: 145.2 ms   `}
</CodeBlock>

          <h3 className="text-xl font-black text-gray-800">關鍵指標解讀</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: 'Seq Scan（全表掃描）',
                icon: <AlertTriangle size={16} className="text-amber-500" />,
                status: 'warning' as const,
                desc: '從頭到尾掃描整張表，資料量大時是效能殺手。解法：在 WHERE 條件欄位建立 Index。',
              },
              {
                label: 'Index Scan（索引掃描）',
                icon: <CheckCircle size={16} className="text-green-500" />,
                status: 'success' as const,
                desc: '透過 B-Tree Index 快速定位資料，是理想狀態。確認 EXPLAIN 中出現了預期的 Index 名稱。',
              },
              {
                label: 'Nested Loop（巢狀迴圈）',
                icon: <AlertTriangle size={16} className="text-amber-500" />,
                status: 'warning' as const,
                desc: '適合小資料集，但當外層資料量大時複雜度是 O(n²)。大資料量應改用 Hash Join。',
              },
              {
                label: 'cost=X..Y',
                icon: <Info size={16} className="text-blue-500" />,
                status: 'primary' as const,
                desc: '估計成本，非毫秒數。X 是回傳第一行的成本，Y 是回傳所有行的成本。用來比較不同計畫的相對代價。',
              },
              {
                label: 'rows=A vs actual rows=B',
                icon: <Info size={16} className="text-blue-500" />,
                status: 'primary' as const,
                desc: '估計行數 vs 實際行數。差距太大代表統計資料過時，需執行 ANALYZE tablename 更新。',
              },
              {
                label: 'loops=N',
                icon: <AlertTriangle size={16} className="text-amber-500" />,
                status: 'warning' as const,
                desc: '這個節點被執行了 N 次。若 loops 很大，actual time 要乘以 N 才是真正花費的時間。',
              },
            ].map(({ label, icon, status, desc }) => (
              <Card key={label} className="border-0 shadow-sm">
                <CardBody className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-black text-gray-800 text-sm">{label}</span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-black text-gray-800 mt-6">加 Index 後的效果對比</h3>

          <CodeBlock language="sql">
{`   -- 步驟一：看到 EXPLAIN 中有 Seq Scan on users（因為 created_at 沒有 Index）
-- 建立 Index，CONCURRENTLY 讓生產環境不鎖表
CREATE INDEX CONCURRENTLY idx_users_created_at ON users(created_at);

-- 步驟二：發現 orders.user_id 常被 JOIN，也建立 Index
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders(user_id);

-- 步驟三：再跑一次 EXPLAIN ANALYZE
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2026-01-01'
GROUP BY u.id, u.name;

-- 優化後的執行計畫變化：
-- Seq Scan on users u  →  Index Scan using idx_users_created_at on users u
-- Hash Left Join       →  Index Nested Loop（因為 orders.user_id 有 Index 了）
-- Execution Time: 145.2 ms  →  8.3 ms  （快了 17 倍！）   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 7: 常用 PostgreSQL 進階語法彙整 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Database className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">常用 PostgreSQL 進階語法彙整</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            除了 Window Functions 和 CTE，PostgreSQL 還有幾個在實際業務場景非常實用的進階語法，
            了解這些可以讓你少寫很多應用層程式碼，把邏輯下推到資料庫層處理。
          </p>

          <h3 className="text-xl font-black text-gray-800">1. UPSERT — 不存在就插入，存在就更新</h3>

          <CodeBlock language="sql">
{`   -- ON CONFLICT DO UPDATE（UPSERT）
-- 場景：同步外部資料時，不確定資料是否已存在
INSERT INTO user_stats (user_id, total_orders, total_revenue)
VALUES (1, 5, 7500.00)
ON CONFLICT (user_id) DO UPDATE SET
  total_orders = EXCLUDED.total_orders,    -- EXCLUDED 指的是「試圖插入但衝突的那一行」
  total_revenue = EXCLUDED.total_revenue,
  updated_at = NOW();

-- ON CONFLICT DO NOTHING（存在就忽略，不更新）
INSERT INTO user_preferences (user_id, theme)
VALUES (1, 'dark')
ON CONFLICT (user_id) DO NOTHING;

-- 複合 Unique Key 的 UPSERT
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES (100, 'PROD-001', 2, 299.00)
ON CONFLICT (order_id, product_id) DO UPDATE SET  -- 複合 Unique
  quantity = order_items.quantity + EXCLUDED.quantity,  -- 數量累加
  updated_at = NOW();   `}
</CodeBlock>

          <h3 className="text-xl font-black text-gray-800">2. JSONB — 比 MongoDB 更強的 JSON 支援</h3>

          <CodeBlock language="sql">
{`   -- PostgreSQL JSONB 支援完整的 JSON 操作
-- 查詢 JSONB 欄位（->> 取出文字值，-> 取出 JSON 值）
SELECT * FROM products
WHERE metadata->>'category' = 'electronics'
  AND (metadata->>'price')::numeric > 1000;

-- JSONB 包含查詢（@> 運算子）
SELECT * FROM products
WHERE metadata @> '{"in_stock": true, "brand": "Apple"}';
-- 比對「metadata 是否包含這個 JSON 子集」

-- 更新 JSONB 特定欄位（不覆蓋整個 JSON）
UPDATE products
SET metadata = jsonb_set(metadata, '{price}', '899.00')
WHERE id = 1;

-- 在 JSONB 陣列中搜尋
SELECT * FROM products
WHERE metadata->'tags' ? 'wireless';  -- ? 運算子：key 或陣列元素是否存在

-- GIN Index 加速 JSONB 查詢
CREATE INDEX idx_products_metadata ON products USING gin(metadata);
-- 建立後，@>、?、? 等運算子都可以利用 Index   `}
</CodeBlock>

          <h3 className="text-xl font-black text-gray-800">3. 全文搜尋 — 不需要 Elasticsearch 的基本全文搜尋</h3>

          <CodeBlock language="sql">
{`   -- 建立全文搜尋向量欄位
ALTER TABLE articles ADD COLUMN search_vector tsvector;

-- 更新現有資料的搜尋向量
UPDATE articles SET
  search_vector = to_tsvector('english', title || ' ' || content);
-- to_tsvector：把文字轉成詞幹化的 token（running → run）

-- 建立 GIN Index 加速全文搜尋
CREATE INDEX idx_articles_search ON articles USING gin(search_vector);

-- 全文搜尋查詢
SELECT id, title, ts_rank(search_vector, query) AS rank
FROM articles,
     plainto_tsquery('english', 'React hooks performance') AS query
-- plainto_tsquery：把自然語言查詢轉成 tsquery
WHERE search_vector @@ query  -- @@ 運算子：文件是否匹配查詢
ORDER BY rank DESC
LIMIT 10;

-- 自動維護 search_vector（觸發器）
CREATE TRIGGER update_search_vector
BEFORE INSERT OR UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(search_vector, 'pg_catalog.english', title, content);
-- 之後 INSERT/UPDATE 時自動重算 search_vector   `}
</CodeBlock>

          <h3 className="text-xl font-black text-gray-800">4. Keyset Pagination — 比 OFFSET 快 100 倍的分頁</h3>

          <CodeBlock language="sql">
{`   -- ❌ OFFSET 分頁（越翻越慢）
-- 第 100 頁要先掃描並丟棄前 2000 行，才回傳第 2001-2020 行
SELECT * FROM posts
ORDER BY created_at DESC
LIMIT 20 OFFSET 2000;
-- 時間複雜度：O(offset + limit)，第 10000 頁非常慢

-- ✅ Keyset Pagination（Cursor-based，永遠快）
-- 第一頁
SELECT id, title, created_at
FROM posts
ORDER BY created_at DESC, id DESC  -- 雙重排序確保穩定性
LIMIT 20;

-- 下一頁（利用上一頁最後一筆的 cursor）
SELECT id, title, created_at
FROM posts
WHERE (created_at, id) < ('2026-04-30 10:00:00', 12345)  -- 上一頁最後一筆
ORDER BY created_at DESC, id DESC
LIMIT 20;
-- 直接用 Index 定位，無論第幾頁速度都一樣

-- 搭配 Index 最佳化
CREATE INDEX idx_posts_pagination ON posts(created_at DESC, id DESC);   `}
</CodeBlock>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
            <p className="text-indigo-800 text-sm leading-relaxed">
              <strong>Keyset Pagination 的限制：</strong>
              不支援「跳頁」（例如直接跳到第 50 頁），只能「上一頁/下一頁」。
              但對大多數業務場景（Feed、列表滾動載入）這不是問題，而且換來的效能提升非常顯著。
              如果業務需要跳頁，才考慮用 OFFSET 或其他方案。
            </p>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Tags ─── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-2 mb-10">
            {['PostgreSQL', 'Window Functions', 'CTE', 'EXPLAIN ANALYZE', 'SQL 優化', 'UPSERT', 'JSONB', 'Keyset Pagination'].map((tag) => (
              <Chip key={tag} variant="flat" color="primary" size="sm">
                {tag}
              </Chip>
            ))}
          </div>

          {/* ─── Navigation ─── */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/blog/database/ep06-redis-advanced">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3 text-gray-400 group-hover:text-indigo-600 transition-colors">
                    <ArrowLeft size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-black text-gray-700 group-hover:text-indigo-600 text-sm">
                        EP.06 Redis 進階：Pub/Sub、Lua Script
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>

            <div className="ml-auto w-full">
              <Card className="border-0 shadow-md opacity-60 cursor-not-allowed">
                <CardBody className="p-5">
                  <div className="flex items-center justify-end gap-3 text-gray-400">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-black text-gray-500 text-sm">
                        EP.08（Coming Soon）
                      </p>
                    </div>
                    <ArrowRight size={20} />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
