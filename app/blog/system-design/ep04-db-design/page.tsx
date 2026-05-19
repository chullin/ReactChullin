import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  ArrowLeft,
  Quote,
  Clock,
  Eye,
  Database,
  AlertTriangle,
  CheckCircle,
  Layers,
  GitBranch
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '資料庫設計入門： ER Diagram、一對多、正規化 | Joseph Chen',
  description: '從「一張超大表」的痛苦，到規範化設計的清爽—— 系統設計面試必備。你的表結構決定了系統的上限。',
  alternates: {
    canonical: 'https://chullin.tw/blog/system-design/ep04-db-design',
  },
};



export default function SystemDesignEP04() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-500 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.04</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">系統設計系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              資料庫設計入門：<br />
              <span className="text-yellow-200">ER Diagram、一對多、正規化</span>
            </h1>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl">
              從「一張超大表」的痛苦，到規範化設計的清爽——
              系統設計面試必備。你的表結構決定了系統的上限。
            </p>
            <div className="flex items-center gap-6 text-orange-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> 資料庫設計 · ER Diagram · 正規化 · SQL</span>
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
                <Quote size={32} className="text-orange-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「你要設計一個社群媒體：每個用戶可以發多篇文章，每篇文章可以有多個留言，
                    用戶可以追蹤其他用戶。你的資料庫要怎麼設計？
                    把所有資料放在一張表？你很快就會後悔。」
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    很多初學者的第一張表都是「超大表」：什麼都塞進去，簡單直接。
                    短期沒問題，但三個月後你就知道痛苦了——更新一個欄位要動幾百列，
                    刪一個資料意外把另一個刪掉，插入新資料發現欄位是 NULL...
                    這篇帶你從根本上理解「好的資料庫設計」是什麼樣子。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: 一張超大表的問題 */}
        <section    className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">從「一張超大表」開始</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            先看一個壞設計長什麼樣子。假設你要設計一個部落格系統，你想：
            「用戶、文章、留言都有關聯，不如放在一起最方便。」
          </p>

          <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
            <p className="font-black text-red-700 mb-4 text-sm flex items-center gap-2">
              <AlertTriangle size={16} /> 壞設計：把所有東西塞進一張表
            </p>
            <CodeBlock
              title="users_posts_comments_table（壞設計）"
              lang="text"
              code={`┌────────┬──────────┬─────────────┬──────────────┬──────────────────┐
│ user_id│ username │ email       │ post_title   │ comment_text     │
├────────┼──────────┼─────────────┼──────────────┼──────────────────┤
│   1    │ Joseph   │ j@mail.com  │ 我的第一篇文 │ 好文！           │
│   1    │ Joseph   │ j@mail.com  │ 我的第一篇文 │ 讚讚讚           │
│   1    │ Joseph   │ j@mail.com  │ 我的第二篇文 │ NULL             │
│   2    │ Mary     │ m@mail.com  │ NULL         │ NULL             │
└────────┴──────────┴─────────────┴──────────────┴──────────────────┘

問題一眼可見：
- Joseph 的 email 重複出現了好幾列
- Mary 沒有文章和留言，大量 NULL
- 刪除 Joseph 的文章，可能連他的帳號資料一起刪了`}
            />
          </div>

          <p className="text-gray-600 leading-relaxed">
            這不只是「看起來醜」的問題，而是會造成三種具體的「資料異常」——
            資料庫設計理論稱之為<strong>更新異常、插入異常、刪除異常</strong>。
          </p>

          <div className="space-y-3">
            {[
              {
                title: '更新異常（Update Anomaly）',
                desc: 'Joseph 換了 Email。你要找出所有 user_id = 1 的列，逐一更新。如果漏更新一列，同一個用戶就有兩個不同的 Email——資料不一致了。',
                color: 'bg-red-50 border-red-200 border-l-red-400',
                icon: '✏️',
              },
              {
                title: '插入異常（Insert Anomaly）',
                desc: '新用戶 Bob 剛註冊，還沒發文。你怎麼插入他的資料？post_title 要填什麼？只能填 NULL。但 NULL 代表什麼意思？沒有標題？還是沒有文章？語意不清。',
                color: 'bg-orange-50 border-orange-200 border-l-orange-400',
                icon: '➕',
              },
              {
                title: '刪除異常（Delete Anomaly）',
                desc: '你要刪除 Joseph 的所有文章。結果：所有 post_title 不是 NULL 的列被刪了，Joseph 的帳號資訊（email、username）也一起消失了。',
                color: 'bg-yellow-50 border-yellow-200 border-l-yellow-400',
                icon: '🗑️',
              },
            ].map((item, i) => (
              <div key={i} className={`border-0 shadow-sm border-l-4 ${item.color}`}>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-black text-gray-800 mb-2">{item.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <p className="font-black text-amber-800 mb-2 text-sm">根本原因</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              所有問題都來自同一個錯誤：<strong>把描述不同「事物」的資料塞在同一張表</strong>。
              用戶是一種事物，文章是另一種事物，留言是第三種事物。它們有關聯，但不是同一種東西。
              解法：分開設計，用外鍵（Foreign Key）建立關聯。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 2: ER Diagram */}
        <section    className="space-y-6">
          <div className="flex items-center gap-3">
            <GitBranch className="text-orange-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">ER Diagram：用圖說清楚關係</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            ER Diagram（Entity-Relationship Diagram）是資料庫設計的第一步，
            在寫任何 SQL 之前，先把「<strong>有哪些實體、它們之間是什麼關係</strong>」畫出來。
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: '實體（Entity）', desc: '現實中獨立存在的「物件」，用矩形框表示。', examples: 'users、posts、comments、products', icon: '□', color: 'bg-blue-50 border-blue-100' },
              { title: '屬性（Attribute）', desc: '實體的特徵，用橢圓或欄位名稱表示。', examples: 'user_id, username, email, created_at', icon: '○', color: 'bg-purple-50 border-purple-100' },
              { title: '關係（Relationship）', desc: '實體之間的關聯，標明 1:1、1:N、M:N。', examples: '一個用戶有多篇文章（1:N）', icon: '◇', color: 'bg-orange-50 border-orange-100' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <div className="text-3xl font-black text-gray-400 mb-2">{item.icon}</div>
                <p className="font-black text-gray-800 text-sm mb-2">{item.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                <p className="text-xs font-mono text-gray-400">{item.examples}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">部落格系統 ER Diagram</h3>
            <CodeBlock
              title="部落格系統 ER Diagram（ASCII Art）"
              lang="text"
              code={`    users                posts              comments
┌──────────┐         ┌──────────┐       ┌──────────────┐
│ user_id  │1       N│ post_id  │1     N│ comment_id   │
│ username │─────────│ user_id  │───────│ post_id      │
│ email    │         │ title    │       │ user_id      │
│ password │         │ content  │       │ text         │
│ created  │         │ created  │       │ created_at   │
└──────────┘         └──────────┘       └──────────────┘

一個 user 可以有多個 posts（一對多 1:N）
一個 post 可以有多個 comments（一對多 1:N）
一個 user 也可以發多個 comments（一對多 1:N）

          follows（追蹤關係）
┌──────────────────────────────┐
│ follower_id（user_id）       │  ← 追蹤者
│ following_id（user_id）      │  ← 被追蹤者
└──────────────────────────────┘

users 追蹤 users → 同一實體的多對多（M:N）
透過中間表 follows 解決（稍後說明）`}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { type: '一對一（1:1）', example: '用戶 ↔ 用戶設定檔', when: '資訊可選、讀取頻率不同時分表', color: 'bg-blue-50 border-blue-100' },
              { type: '一對多（1:N）', example: '用戶 → 文章、訂單 → 明細', when: '最常見的關係，用外鍵實現', color: 'bg-green-50 border-green-100' },
              { type: '多對多（M:N）', example: '用戶 ↔ 用戶（追蹤）、訂單 ↔ 商品', when: '需要中間表（Junction Table）', color: 'bg-purple-50 border-purple-100' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <p className="font-black text-gray-800 text-sm mb-2">{item.type}</p>
                <p className="text-xs text-gray-600 mb-2">{item.example}</p>
                <p className="text-xs text-gray-400 italic">{item.when}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 3: 正規化 */}
        <section    className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-amber-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">正規化：每個事實只存一次</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            資料庫正規化（Normalization）是一套設計原則，核心思想只有一句話：
            <strong>每個事實在資料庫裡只存一次，不要重複。</strong>
            正規化分 1NF、2NF、3NF，從低到高逐步消除冗餘。
          </p>

          <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200 mb-2">
            <p className="font-black text-orange-800 mb-2 text-sm">正規化的直覺</p>
            <p className="text-sm text-orange-700 leading-relaxed">
              想像你在整理衣服：1NF 是「每件衣服放進格子裡，不要疊放」；
              2NF 是「按照類型分層，不要把毛衣和短袖混在同一格」；
              3NF 是「把品牌資訊移到品牌區，不要在每件衣服上貼品牌說明書」。
              每一層都是在減少「同一件事說兩遍」的情況。
            </p>
          </div>

          {/* 1NF */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-orange-600 text-white font-black px-3 py-1 rounded-full text-sm">1NF</span>
              <h3 className="text-xl font-black text-gray-800">第一正規形式：原子值，無重複欄位</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              每個欄位只存一個值（原子值），不能存清單或陣列。
              不能有 phone1、phone2、phone3 這種重複欄位。
            </p>
            <CodeBlock
              title="1NF 示範"
              lang="sql"
              code={`-- ❌ 違反 1NF：一個欄位存多個值
CREATE TABLE users_bad (
  user_id  INT,
  phones   VARCHAR(100)  -- '0912-123456, 0955-654321'（一格存了兩支電話）
);

-- ❌ 也違反 1NF：重複欄位
CREATE TABLE users_bad2 (
  user_id  INT,
  phone1   VARCHAR(20),  -- 第一支電話
  phone2   VARCHAR(20),  -- 第二支電話（如果沒有就 NULL）
  phone3   VARCHAR(20)   -- 第三支電話
);

-- ✅ 符合 1NF：每個事實一列
CREATE TABLE user_phones (
  user_id  INT REFERENCES users(user_id),
  phone    VARCHAR(20) NOT NULL,
  PRIMARY KEY (user_id, phone)  -- 一個用戶同一支電話只存一次
);`}
            />
          </div>

          {/* 2NF */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-amber-600 text-white font-black px-3 py-1 rounded-full text-sm">2NF</span>
              <h3 className="text-xl font-black text-gray-800">第二正規形式：消除部分依賴</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              所有非鍵欄位都必須完全依賴於整個主鍵，不能只依賴主鍵的一部分。
              這個問題只出現在<strong>組合主鍵</strong>的情況。
            </p>
            <CodeBlock
              title="2NF 示範"
              lang="sql"
              code={`-- ❌ 違反 2NF
-- 組合主鍵是 (order_id, product_id)
-- 但 product_name 只依賴 product_id，不依賴整個組合主鍵
CREATE TABLE order_items_bad (
  order_id     INT,
  product_id   INT,
  product_name VARCHAR(100),  -- ← 只依賴 product_id，部分依賴！
  quantity     INT,
  PRIMARY KEY (order_id, product_id)
);

-- ✅ 符合 2NF：把 product_name 移到 products 表
CREATE TABLE products (
  product_id   INT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  price        DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_items (
  order_id     INT REFERENCES orders(order_id),
  product_id   INT REFERENCES products(product_id),
  quantity     INT NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
-- 現在 order_items 裡的每個欄位都完全依賴組合主鍵`}
            />
          </div>

          {/* 3NF */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-yellow-600 text-white font-black px-3 py-1 rounded-full text-sm">3NF</span>
              <h3 className="text-xl font-black text-gray-800">第三正規形式：消除遞移依賴</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              非鍵欄位不能依賴另一個非鍵欄位。用白話說：「A 欄位決定 B 欄位，B 欄位決定 C 欄位，
              但 C 跟主鍵沒有直接關係」——這就是遞移依賴，要消除。
            </p>
            <CodeBlock
              title="3NF 示範"
              lang="sql"
              code={`-- ❌ 違反 3NF
-- user_id → zip_code → city（city 透過 zip_code 間接依賴 user_id）
CREATE TABLE users_bad (
  user_id   INT PRIMARY KEY,
  zip_code  CHAR(5),
  city      VARCHAR(50)  -- ← city 依賴 zip_code，不直接依賴 user_id
);

-- 問題：台北市的 100 郵遞區號存了幾萬次
-- 台北市改名時，要更新幾萬列

-- ✅ 符合 3NF：把 city 移到獨立的 zip_codes 表
CREATE TABLE zip_codes (
  zip_code  CHAR(5) PRIMARY KEY,
  city      VARCHAR(50) NOT NULL,
  district  VARCHAR(50)
);

CREATE TABLE users (
  user_id   INT PRIMARY KEY,
  zip_code  CHAR(5) REFERENCES zip_codes(zip_code)
);
-- 城市名稱只存一次，修改時只要改一列`}
            />
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <p className="font-black text-amber-800 mb-3 text-sm">正規化的取捨</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold text-green-700 mb-2">正規化的好處</p>
                <div className="space-y-1 text-gray-600">
                  {['無資料重複，更新只需改一列', '插入、刪除不會造成異常', '節省儲存空間（消除冗餘）'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500 shrink-0" />{t}</div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold text-orange-700 mb-2">過度正規化的壞處</p>
                <div className="space-y-1 text-gray-600">
                  {['查詢需要大量 JOIN，效能變差', '程式碼複雜度增加', 'OLAP（分析型）場景反而要反正規化'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2"><span className="text-orange-500 text-xs shrink-0">✗</span>{t}</div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-amber-700 mt-3">
              實務建議：OLTP（交易型，如電商、社群）先做到 3NF；OLAP（分析型，如報表、BI）可以用星型架構（反正規化）提升查詢速度。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 4: 實戰電商設計 */}
        <section    className="space-y-6">
          <div className="flex items-center gap-3">
            <Database className="text-orange-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">實戰：設計電商資料庫</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            理論說夠了，來設計一個真實的系統。電商是資料庫設計面試最常見的題目，
            一步一步走過設計流程，比背答案有用多了。
          </p>

          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
            <p className="font-black text-slate-700 mb-4 text-sm">需求清單</p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
              {[
                '用戶可以下訂單',
                '一個訂單包含多個商品',
                '每個商品有庫存數量',
                '商品有分類（一個商品屬於一個分類）',
                '訂單有狀態：pending / paid / shipped / delivered',
                '下訂時要記錄當時的售價（商品價格可能變動）',
              ].map((req, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">第一步：找出實體</h3>
            <div className="flex gap-3 flex-wrap">
              {['users（用戶）', 'products（商品）', 'categories（分類）', 'orders（訂單）', 'order_items（訂單明細）'].map((e, i) => (
                <span key={i} className="bg-orange-100 text-orange-800 font-bold text-sm px-3 py-1.5 rounded-full">{e}</span>
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              <strong>order_items</strong> 是訂單和商品之間的中間表——因為一張訂單可以包含多個商品，
              一個商品也可以出現在多張訂單，這是典型的多對多（M:N）關係，需要中間表來解決。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">第二步：定義關係</h3>
            <CodeBlock
              title="實體關係梳理"
              lang="text"
              code={`users      1:N  orders        （一個用戶有多張訂單）
orders     1:N  order_items   （一張訂單有多個商品明細）
products   1:N  order_items   （一個商品可在多張訂單出現）
categories 1:N  products      （一個分類有多個商品）

orders ↔ products 是 M:N，透過 order_items 中間表解決`}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">第三步：建表</h3>
            <CodeBlock
              title="電商資料庫完整 Schema"
              lang="sql"
              code={`-- 用戶表
CREATE TABLE users (
  user_id    BIGSERIAL PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  username   VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 商品分類表
CREATE TABLE categories (
  category_id   BIGSERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  parent_id     BIGINT REFERENCES categories(category_id)
  -- 自引用：支援多層分類（如 電子產品 > 手機 > 智慧型手機）
);

-- 商品表
CREATE TABLE products (
  product_id   BIGSERIAL PRIMARY KEY,
  category_id  BIGINT REFERENCES categories(category_id),
  name         VARCHAR(255) NOT NULL,
  description  TEXT,
  price        DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  stock        INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 訂單表
CREATE TABLE orders (
  order_id    BIGSERIAL PRIMARY KEY,
  user_id     BIGINT NOT NULL REFERENCES users(user_id),
  status      VARCHAR(20) NOT NULL DEFAULT 'pending',
               -- pending | paid | shipped | delivered | cancelled
  total       DECIMAL(10, 2),  -- 可用觸發器或應用層計算
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 訂單明細（orders ↔ products 的中間表）
CREATE TABLE order_items (
  order_id    BIGINT NOT NULL REFERENCES orders(order_id),
  product_id  BIGINT NOT NULL REFERENCES products(product_id),
  quantity    INT NOT NULL CHECK (quantity > 0),
  unit_price  DECIMAL(10, 2) NOT NULL,
  -- ↑ 關鍵設計：記錄下訂時的售價
  -- 商品日後漲價或打折，訂單歷史不受影響
  PRIMARY KEY (order_id, product_id)  -- 組合主鍵，同一訂單同一商品只能一列
);`}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <p className="font-black text-green-800 mb-3 text-sm">設計亮點：unit_price</p>
              <p className="text-sm text-green-700 leading-relaxed">
                order_items 裡的 unit_price 記錄的是<strong>下訂當時的售價</strong>，
                而非 products.price（現在的售價）。這樣設計是因為：
                商品可以打折、調價，但已成立的訂單金額不應該變動。
                如果直接 JOIN products.price，三年前的訂單總額就會跑掉。
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="font-black text-blue-800 mb-3 text-sm">設計亮點：組合主鍵</p>
              <p className="text-sm text-blue-700 leading-relaxed">
                order_items 用 <code className="bg-blue-100 px-1 rounded">(order_id, product_id)</code> 作為組合主鍵，
                確保同一張訂單同一個商品只能出現一列。
                要買 3 個同款商品，用 quantity = 3，不是插入三列。
                這個設計還帶來免費的複合索引（主鍵即索引）。
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 5: Index */}
        <section    className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Index 要加在哪裡？</h2>

          <p className="text-gray-600 leading-relaxed text-lg">
            設計完表結構，下一步是想清楚 Index。
            <strong>沒有 Index，查詢就是全表掃描（Full Table Scan）</strong>——對一張百萬列的訂單表執行
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">WHERE user_id = 1</code>，
            PostgreSQL 會逐列檢查每一列，回傳需要幾秒。
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-2">
            <p className="font-black text-slate-700 mb-2 text-sm">思考方式：根據查詢模式決定 Index</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              先問自己：<strong>「最常見的查詢是什麼？WHERE 條件是哪些欄位？」</strong>
              那些欄位就是 Index 的候選。但 Index 也有成本：每次寫入都要更新索引，
              索引太多反而讓寫入變慢，也佔空間。
            </p>
          </div>

          <CodeBlock
            title="根據查詢分析決定 Index"
            lang="sql"
            code={`-- 常見查詢一：查某個用戶的所有訂單
SELECT * FROM orders WHERE user_id = 1;
-- user_id 不是主鍵，沒有 Index → 全表掃描
CREATE INDEX idx_orders_user_id ON orders(user_id);  -- ← 加這個

-- 常見查詢二：查某張訂單的所有商品
SELECT p.name, oi.quantity, oi.unit_price
FROM order_items oi
JOIN products p ON p.product_id = oi.product_id
WHERE oi.order_id = 42;
-- order_id 是組合主鍵的一部分 → 已有索引，不需另加

-- 常見查詢三：查庫存不足的商品（股控警示）
SELECT * FROM products WHERE stock < 10;
-- 通常資料量小（幾千筆商品），全表掃描可接受
-- 如果商品很多，可以考慮：
CREATE INDEX idx_products_stock ON products(stock);

-- 常見查詢四：查某個分類下的所有商品
SELECT * FROM products WHERE category_id = 5;
CREATE INDEX idx_products_category ON products(category_id);  -- ← 加

-- 組合 Index：查用戶在某個日期之後的訂單（多欄位過濾）
SELECT * FROM orders WHERE user_id = 1 AND created_at > '2026-01-01';
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);
-- 規則：選擇性高（唯一值多）的欄位放前面`}
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: '一定要加', examples: 'WHERE 常用的外鍵欄位（user_id、order_id）、JOIN 的 ON 欄位', color: 'bg-green-50 border-green-100 text-green-700' },
              { title: '考慮加', examples: 'ORDER BY 欄位（created_at）、高選擇性的過濾欄位', color: 'bg-blue-50 border-blue-100 text-blue-700' },
              { title: '通常不需要', examples: '低選擇性欄位（如 status 只有 5 種值）、小表（幾千列以下）', color: 'bg-gray-50 border-gray-200 text-gray-600' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <p className="font-black text-sm mb-2">{item.title}</p>
                <p className="text-xs leading-relaxed">{item.examples}</p>
              </div>
            ))}
          </div>

          <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200">
            <p className="font-black text-orange-800 mb-2 text-sm">延伸閱讀</p>
            <p className="text-sm text-orange-700 leading-relaxed">
              Index 的完整原理（B-tree 索引、複合索引的最左前綴原則、Index 的代價分析），
              在 Database 系列 EP.02 Index 有詳細說明，這篇先掌握「什麼情況要加」的直覺。
            </p>
          </div>
        </section>

        {/* 總結 */}
        <section   >
          <div className="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-500 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { icon: '🏗️', text: '超大表的三個問題：更新異常、插入異常、刪除異常。根本原因是把不同「事物」塞在同一張表。' },
                { icon: '🗺️', text: 'ER Diagram 是設計前的必要步驟：找出實體（什麼東西）、屬性（它有什麼）、關係（它們怎麼連）。' },
                { icon: '1️⃣', text: '1NF：每個欄位只存一個值，不存清單，不存重複欄位。' },
                { icon: '2️⃣', text: '2NF：消除部分依賴——在組合主鍵的表中，每個非鍵欄位必須完全依賴整個主鍵。' },
                { icon: '3️⃣', text: '3NF：消除遞移依賴——非鍵欄位不能透過另一個非鍵欄位間接依賴主鍵。' },
                { icon: '🛒', text: '電商設計核心：users / products / orders / order_items。order_items 是中間表，unit_price 記錄下訂時的售價。' },
                { icon: '📍', text: 'Index 加在 WHERE 常用的外鍵欄位和 JOIN 條件欄位。低選擇性欄位（只有幾種值）和小表不需要加。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50"  />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link href="/blog/system-design/ep03-cache" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6 sm:w-1/2">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.03 — 快取策略</p>
            <p className="text-sm text-gray-500 mt-1">讓系統快 10 倍的關鍵決策</p>
          </Link>
          <div className="sm:w-1/2">
            <div className="bg-gray-50 rounded-2xl p-6 text-right opacity-50 cursor-not-allowed">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-500">EP.05 — Coming Soon</p>
              <p className="text-sm text-gray-400 mt-1">準備中，敬請期待</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['資料庫設計', 'ER Diagram', '正規化', 'SQL', '系統設計', 'EP.04'].map(tag => (
            <span key={tag}   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-bold">{tag}</span>
          ))}
        </div>

      </article>
    </div>
  );
}
