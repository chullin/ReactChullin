import { FadeIn } from '@/components/blog/ScrollAnimation';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Database,
  GitBranch,
  Layers,
  Scale,
  Zap,
  AlertCircle
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoSQL 入門：MongoDB 與選型指南 Document Model、Schema 設計、Aggregation Pipeline、Mongoose | Joseph Chen',
  description: '什麼時候用 NoSQL，什麼時候堅持 SQL？從 Document Model 的本質出發， 一路走到 Aggregation Pipeline 與實際的 Mongoose 開發，再給你一份清晰的選型決策表。',
  alternates: {
    canonical: 'https://chullin.tw/blog/database/ep04-nosql-mongodb',
  },
};



export default function DBEP04() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-br from-green-800 via-emerald-700 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">
                EP.04
              </span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                資料庫系列
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              NoSQL 入門：MongoDB 與選型指南
              <br />
              <span className="text-emerald-200">
                Document Model、Schema 設計、Aggregation Pipeline、Mongoose
              </span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              什麼時候用 NoSQL，什麼時候堅持 SQL？從 Document Model 的本質出發，
              一路走到 Aggregation Pipeline 與實際的 Mongoose 開發，再給你一份清晰的選型決策表。
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
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
                <Database size={14} /> MongoDB · Mongoose · Aggregation · Schema Design
              </span>
            </div>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ─── Section 1: 為什麼需要 NoSQL ─── */}
        <section
          className="space-y-6"
          
          
          
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">為什麼需要 NoSQL？</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            SQL 資料庫非常強大，但在某些場景下會顯得笨重。最典型的例子是「多型態資料」——
            每筆資料的欄位數量和型別都不一樣，用固定的 Table Schema 來應對，往往是這樣的結果：
          </p>

          <CodeBlock
            title="SQL 面對多型態資料的困境"
            lang="sql"
            code={`-- 儲存社群媒體貼文（每個貼文的屬性都不一樣）
-- 有些有圖片、有些有影片、有些有投票、有些有位置...
-- 如果用 SQL 你需要...
CREATE TABLE posts (
  id         BIGINT PRIMARY KEY,
  user_id    BIGINT,
  text       TEXT,
  image_url  VARCHAR(500),   -- 可能是 NULL
  video_url  VARCHAR(500),   -- 可能是 NULL
  poll_options JSON,         -- 可能是 NULL
  location   GEOMETRY,       -- 可能是 NULL
  custom_fields JSON         -- 放棄了，用 JSON 塞
);

-- 問題出現了：
-- 1. 大量 NULL 欄位，浪費儲存空間
-- 2. 加入新的貼文型別 → 需要 ALTER TABLE（在大資料量下非常昂貴）
-- 3. 查詢特定型別的貼文需要複雜的 WHERE IS NOT NULL 組合
-- 4. 新開發者看這個 Schema 完全無法理解哪些欄位是必填的`}
          />

          <p className="text-gray-600 leading-relaxed">
            另一個典型場景是電商商品目錄：書有 ISBN、頁數；電子產品有電壓規格、處理器型號；
            衣服有尺寸、顏色、材質。這些屬性之間幾乎沒有共同欄位。
          </p>

          <CodeBlock
            title="MongoDB Document Model 的解法"
            lang="javascript"
            code={`// 每個 document 可以有完全不同的結構！
// 書
{
  _id:   ObjectId("64a1b2c3d4e5f6a7b8c9d0e1"),
  type:  "book",
  title: "Clean Code",
  isbn:  "978-0132350884",
  pages: 464,
  authors: ["Robert C. Martin"],
  publisher: "Prentice Hall"
}

// 電子產品
{
  _id:  ObjectId("64a1b2c3d4e5f6a7b8c9d0e2"),
  type: "electronics",
  name: "MacBook Pro M3",
  voltage: "110-240V",
  specs: {
    ram:     "16GB",
    storage: "512GB SSD",
    cpu:     "Apple M3 Pro"
  },
  warranty_years: 1
}

// 衣服
{
  _id:      ObjectId("64a1b2c3d4e5f6a7b8c9d0e3"),
  type:     "clothing",
  name:     "Basic T-Shirt",
  variants: [
    { size: "S", color: "black", sku: "TS-S-BLK", stock: 20 },
    { size: "M", color: "white", sku: "TS-M-WHT", stock: 15 },
    { size: "L", color: "black", sku: "TS-L-BLK", stock: 8  },
  ],
  material: "100% Cotton"
}

// 同一個 Collection，完全不同的結構 ─ 沒有 NULL，沒有 ALTER TABLE`}
          />

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-l-4 border-emerald-400 bg-emerald-50 border-0">
            <div className="p-5">
              <p className="font-black text-emerald-800 mb-2">NoSQL 不是「比 SQL 更好」</p>
              <p className="text-emerald-700 text-sm leading-relaxed">
                NoSQL（Not Only SQL）的設計初衷是解決特定問題：彈性 Schema、水平擴展、非結構化資料。
                它犧牲了 SQL 的強一致性和複雜查詢能力，換取了靈活性和擴展性。
                理解這個取捨，才是選型的起點。
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ─── Section 2: MongoDB 基本概念 ─── */}
        <section
          className="space-y-6"
          
          
          
        >
          <div className="flex items-center gap-3">
            <Database className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">MongoDB 基本概念</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            如果你有 SQL 背景，理解 MongoDB 最快的方式就是對照術語。
            概念是相通的，只是換了一套命名邏輯。
          </p>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
            <div className="p-0 overflow-hidden">
              <div className="bg-emerald-700 text-white px-6 py-3">
                <p className="font-black">SQL vs MongoDB 術語對照</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="px-6 py-3 text-left font-black text-gray-700">SQL</th>
                      <th className="px-6 py-3 text-left font-black text-gray-700">MongoDB</th>
                      <th className="px-6 py-3 text-left font-black text-gray-700">說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Database', 'Database', '相同概念，一個 MongoDB 實例可有多個 DB'],
                      ['Table', 'Collection', '一組 document 的集合，不強制統一 Schema'],
                      ['Row', 'Document', 'BSON 格式（類 JSON），可嵌套物件與陣列'],
                      ['Column', 'Field', 'Document 內的鍵值對'],
                      ['PRIMARY KEY', '_id（ObjectId）', '自動生成 12 bytes ID，內含時間戳'],
                      ['JOIN', '$lookup（Aggregation）', '效能不如 SQL JOIN，Schema 設計應避免過度依賴'],
                      ['INDEX', 'Index', '支援單欄位、複合、TTL、全文、地理空間索引'],
                    ].map(([sql, mongo, desc], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'}>
                        <td className="px-6 py-3 font-mono text-emerald-700 font-bold border-b border-emerald-100">{sql}</td>
                        <td className="px-6 py-3 font-mono text-teal-700 font-bold border-b border-emerald-100">{mongo}</td>
                        <td className="px-6 py-3 text-gray-500 text-xs border-b border-emerald-100">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-black text-gray-800">BSON 型別：MongoDB 的 JSON 超集</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              MongoDB 在硬碟與網路傳輸中用 BSON（Binary JSON）格式，比純 JSON 支援更多型別：
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  type: 'ObjectId',
                  desc: '12 bytes = 4 bytes 時間戳 + 5 bytes 機器識別 + 3 bytes 計數器。可從 _id 直接取得文件建立時間，不需額外 createdAt 欄位。',
                  color: 'bg-blue-50 border-blue-200 text-blue-800',
                },
                {
                  type: 'Date（ISODate）',
                  desc: '儲存為 UTC 毫秒時間戳，查詢時可用 $gte / $lte 做時間範圍篩選，避免用字串儲存日期。',
                  color: 'bg-purple-50 border-purple-200 text-purple-800',
                },
                {
                  type: 'NumberInt / NumberLong / Decimal128',
                  desc: '區分 32-bit 整數、64-bit 整數和高精度小數（金融計算用 Decimal128 避免浮點誤差）。',
                  color: 'bg-orange-50 border-orange-200 text-orange-800',
                },
                {
                  type: 'Binary（BinData）',
                  desc: '儲存二進位資料，常用於存放檔案 hash、加密資料或小型縮圖（大檔案建議用 GridFS 或外部儲存）。',
                  color: 'bg-teal-50 border-teal-200 text-teal-800',
                },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-4 border ${item.color}`}>
                  <p className="font-mono font-black text-sm mb-1">{item.type}</p>
                  <p className="text-xs leading-relaxed opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ─── Section 3: CRUD 操作 ─── */}
        <section
          className="space-y-6"
          
          
          
        >
          <div className="flex items-center gap-3">
            <Zap className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">
              CRUD 操作 — Mongoose + Node.js
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            雖然 MongoDB 本身沒有強制 Schema，但在 Node.js 開發中我們通常使用
            <strong> Mongoose</strong>——它在 MongoDB 之上加了 Schema 定義、型別驗證、
            Middleware（Hooks）和方便的 Query API。
          </p>

          <CodeBlock
            title="安裝 Mongoose"
            lang="bash"
            code={`npm install mongoose`}
          />

          <CodeBlock
            title="lib/mongodb.ts — 連線管理"
            lang="typescript"
            code={`import mongoose from 'mongoose';

// 在 Next.js 中，hot reload 會讓模組重複執行
// 用 isConnected 標記避免重複建立連線
let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error('請在 .env.local 設定 MONGODB_URI');
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'my-blog',     // 明確指定 DB 名稱
    bufferCommands: false, // 連線前的操作不緩衝，直接報錯，方便 debug
  });

  isConnected = true;
  console.log('MongoDB 已連線');
}`}
          />

          <CodeBlock
            title="models/Post.ts — Schema 定義（含索引）"
            lang="typescript"
            code={`import mongoose, { Document, Model } from 'mongoose';

// 定義 TypeScript 介面，讓 IDE 有型別提示
interface IPost extends Document {
  title:   string;
  content: string;
  author:  mongoose.Types.ObjectId;
  tags:    string[];
  status:  'draft' | 'published';
  metadata: {
    views: number;
    likes: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type:      String,
      required:  [true, '標題為必填'],
      maxlength: [200, '標題不可超過 200 字'],
      trim:      true,                  // 自動去除前後空白
    },
    content: { type: String, required: true },
    author: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',                 // 關聯到 User collection（populate 用）
      required: true,
    },
    tags:   [{ type: String, lowercase: true }],
    status: {
      type:    String,
      enum:    ['draft', 'published'],
      default: 'draft',
    },
    metadata: {
      views: { type: Number, default: 0, min: 0 },
      likes: { type: Number, default: 0, min: 0 },
    },
  },
  {
    timestamps: true,  // 自動加 createdAt / updatedAt，不需手動定義
  }
);

// ─── 索引定義 ────────────────────────────────────────────────────────
// 全文搜尋索引（title + content 欄位）
postSchema.index({ title: 'text', content: 'text' });

// 複合索引：查詢「某作者的最新文章」會用到
postSchema.index({ author: 1, createdAt: -1 });

// 單欄位索引
postSchema.index({ status: 1 });

// ─── Middleware（Hooks）─────────────────────────────────────────────
// pre-save hook：儲存前自動做某些事
postSchema.pre('save', function (next) {
  // this 指向當前 document
  if (this.isModified('title')) {
    // 例如：自動生成 slug
    // this.slug = slugify(this.title);
  }
  next();
});

// 避免 Next.js hot reload 重複定義 model（標準做法）
export const Post: Model<IPost> =
  mongoose.models.Post ?? mongoose.model('Post', postSchema);`}
          />

          <CodeBlock
            title="CRUD 實戰操作"
            lang="typescript"
            code={`// ─── Create ─────────────────────────────────────────────────────────
const post = await Post.create({
  title:   '我的第一篇文章',
  content: '這是文章內容...',
  author:  userId,          // ObjectId
  tags:    ['React', 'TypeScript'],
  status:  'published',
});
// 回傳完整的 document，含 _id、createdAt、updatedAt

// ─── Read ────────────────────────────────────────────────────────────
// 查詢多筆（鏈式 API）
const posts = await Post
  .find({ author: userId, status: 'published' })
  .sort({ createdAt: -1 })      // 最新的在前
  .limit(10)
  .skip(0)                      // 分頁：第 1 頁
  .select('title metadata createdAt')  // 只取需要的欄位（像 SELECT）
  .populate('author', 'name email');   // 自動 JOIN User collection！

// 查詢單筆
const post = await Post.findById(postId);
const post2 = await Post.findOne({ title: '特定標題', status: 'published' });

// 全文搜尋（需要先建 text index）
const results = await Post.find({ $text: { $search: 'React TypeScript' } });

// 計數
const count = await Post.countDocuments({ status: 'published' });

// ─── Update ──────────────────────────────────────────────────────────
// $inc：原子遞增，不覆蓋整個 document（避免 read-modify-write 競態）
await Post.findByIdAndUpdate(
  postId,
  { $inc: { 'metadata.views': 1 } },
  { new: true }  // 回傳更新後的 document（預設回傳更新前）
);

// $set：更新特定欄位
await Post.findByIdAndUpdate(postId, {
  $set:      { status: 'published' },
  $addToSet: { tags: 'Node.js' },  // 加入陣列元素（不重複）
});

// 批次更新（所有草稿文章）
await Post.updateMany(
  { status: 'draft', createdAt: { $lt: new Date('2025-01-01') } },
  { $set: { status: 'archived' } }
);

// ─── Delete ──────────────────────────────────────────────────────────
await Post.findByIdAndDelete(postId);
await Post.deleteMany({ tags: 'draft', 'metadata.views': 0 });`}
          />
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ─── Section 4: Aggregation Pipeline ─── */}
        <section
          className="space-y-6"
          
          
          
        >
          <div className="flex items-center gap-3">
            <Layers className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">
              Aggregation Pipeline — MongoDB 的 GROUP BY
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Aggregation Pipeline 是 MongoDB 最強大也最難的功能，等同於 SQL 的
            <code className="mx-1 bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">GROUP BY + HAVING + ORDER BY</code>
            組合。資料流過一個個 Stage，每個 Stage 對資料做轉換，前一個 Stage 的輸出是下一個 Stage 的輸入。
          </p>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-gray-900 text-white">
            <div className="p-5">
              <p className="text-gray-400 text-xs mb-3 font-mono">Pipeline 概念示意</p>
              <div className="flex items-center gap-2 flex-wrap text-sm font-mono">
                {[
                  { label: 'Collection', color: 'bg-emerald-700' },
                  { label: '→' , color: '' },
                  { label: '$match', color: 'bg-blue-700' },
                  { label: '→' , color: '' },
                  { label: '$unwind', color: 'bg-purple-700' },
                  { label: '→' , color: '' },
                  { label: '$group', color: 'bg-orange-700' },
                  { label: '→' , color: '' },
                  { label: '$sort', color: 'bg-red-700' },
                  { label: '→' , color: '' },
                  { label: '$project', color: 'bg-teal-700' },
                  { label: '→' , color: '' },
                  { label: 'Result', color: 'bg-emerald-600' },
                ].map((s, i) =>
                  s.color ? (
                    <span key={i} className={`px-2 py-1 rounded-lg ${s.color} text-white text-xs font-black`}>
                      {s.label}
                    </span>
                  ) : (
                    <span key={i} className="text-gray-500">{s.label}</span>
                  )
                )}
              </div>
            </div>
          </div>

          <CodeBlock
            title="Aggregation 實戰：計算每個標籤的文章統計"
            lang="javascript"
            code={`// 需求：計算每個標籤的文章數、平均閱讀量和總按讚數（只統計已發布文章）
db.posts.aggregate([

  // Stage 1：$match — 篩選（相當於 SQL WHERE）
  // 放在最前面：利用索引，減少後續 Stage 處理的資料量
  { $match: { status: 'published' } },

  // Stage 2：$unwind — 展開陣列
  // tags 是陣列，$unwind 把每個 tag 元素拆成獨立的 document
  // 例：{ tags: ['React', 'TypeScript'] } → 兩個 document，各帶一個 tag
  { $unwind: '$tags' },

  // Stage 3：$group — 分組聚合（相當於 SQL GROUP BY）
  { $group: {
    _id:        '$tags',                          // GROUP BY tags
    postCount:  { $sum: 1 },                      // COUNT(*)
    avgViews:   { $avg: '$metadata.views' },      // AVG(views)
    totalLikes: { $sum: '$metadata.likes' },      // SUM(likes)
    latestPost: { $max: '$createdAt' },           // MAX(createdAt)
  }},

  // Stage 4：$sort — 排序（相當於 SQL ORDER BY）
  { $sort: { postCount: -1 } },   // -1 是降序，1 是升序

  // Stage 5：$limit — 取前 10 筆（相當於 SQL LIMIT）
  { $limit: 10 },

  // Stage 6：$project — 欄位重整（相當於 SQL SELECT）
  { $project: {
    _id:        0,                                    // 隱藏 _id
    tag:        '$_id',                               // 重新命名
    postCount:  1,                                    // 保留
    avgViews:   { $round: ['$avgViews', 1] },         // 四捨五入到小數第 1 位
    totalLikes: 1,
    latestPost: { $dateToString: {
      format: '%Y-%m-%d',
      date:   '$latestPost'
    }},
  }},
]);

// 輸出範例：
// { tag: 'react', postCount: 42, avgViews: 1203.7, totalLikes: 892, latestPost: '2026-03-15' }
// { tag: 'typescript', postCount: 38, ... }`}
          />

          <CodeBlock
            title="在 Mongoose 中使用 aggregate"
            lang="typescript"
            code={`// Mongoose 的 .aggregate() 接收同樣的 Pipeline 陣列
const tagStats = await Post.aggregate([
  { $match: { status: 'published' } },
  { $unwind: '$tags' },
  { $group: {
    _id:       '$tags',
    postCount: { $sum: 1 },
    avgViews:  { $avg: '$metadata.views' },
  }},
  { $sort: { postCount: -1 } },
  { $limit: 10 },
]);

// 注意：.aggregate() 不走 Mongoose 的 populate、middleware 或型別轉換
// 它直接呼叫 MongoDB driver，回傳的是原始物件陣列

// 另一個常用場景：計算作者的文章統計（LEFT JOIN 概念）
const authorStats = await Post.aggregate([
  { $group: {
    _id:        '$author',
    totalPosts: { $sum: 1 },
    totalViews: { $sum: '$metadata.views' },
  }},
  // $lookup 相當於 LEFT JOIN
  { $lookup: {
    from:         'users',       // 要 JOIN 的 collection
    localField:   '_id',         // 本 collection 的欄位
    foreignField: '_id',         // 另一個 collection 的欄位
    as:           'authorInfo',  // 結果放在哪個欄位
  }},
  { $unwind: '$authorInfo' },   // $lookup 結果是陣列，展開成物件
  { $project: {
    authorName:  '$authorInfo.name',
    totalPosts:  1,
    totalViews:  1,
  }},
]);`}
          />
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ─── Section 5: Schema 設計原則 ─── */}
        <section
          className="space-y-6"
          
          
          
        >
          <div className="flex items-center gap-3">
            <GitBranch className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">
              Schema 設計原則 — 最大的誤區
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-l-4 border-amber-400 bg-amber-50 border-0">
            <div className="p-5">
              <p className="font-black text-amber-800 mb-2">最常見的 NoSQL 誤區</p>
              <p className="text-amber-700 text-sm leading-relaxed">
                很多人從 SQL 轉過來，直覺是「把每個實體拆成獨立 Collection，再用 $lookup JOIN 起來」。
                但 MongoDB 的 $lookup 沒有 SQL JOIN 的效能優化，過度引用反而比嵌入慢 10 倍以上。
                <strong> MongoDB Schema 的設計原則應該以「查詢模式」為起點，而不是以「資料結構」為起點。</strong>
              </p>
            </div>
          </div>

          <h3 className="text-xl font-black text-gray-800">嵌入（Embed）vs 引用（Reference）</h3>

          <CodeBlock
            title="嵌入 vs 引用：程式碼對比"
            lang="javascript"
            code={`// ─── 嵌入（Embedding）─────────────────────────────────────────────
// 適用場景：評論只在「特定文章頁面」顯示，不需要單獨查詢評論
{
  _id:     ObjectId("post1"),
  title:   "我的文章",
  content: "...",
  comments: [
    {
      _id:       ObjectId("c1"),
      user:      "Joseph",
      text:      "很棒的文章！",
      createdAt: ISODate("2026-03-01"),
    },
    {
      _id:       ObjectId("c2"),
      user:      "Jane",
      text:      "完全同意",
      createdAt: ISODate("2026-03-02"),
    },
  ],
}
// 優點：查詢文章 → 評論一次讀取，不需要額外 query
// 缺點：document 越來越大；評論無法單獨更新；上限 16MB

// ─── 引用（Reference）──────────────────────────────────────────────
// 適用場景：用戶資料被多個地方共用（文章、評論、訂單都有 author）
{
  _id:     ObjectId("post1"),
  title:   "我的文章",
  content: "...",
  author:  ObjectId("user1"),   // 引用，需要 populate() 才能看到完整資料
  tags:    ["React", "MongoDB"],
}
// User document 只存一份，修改後所有引用到的地方都自動反映新值
// 代價：每次需要作者資料都要多一次 query（或用 $lookup）`}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-emerald-50">
              <div className="p-5">
                <p className="font-black text-emerald-800 mb-3 text-sm">選擇嵌入（Embed）的情況</p>
                <ul className="text-sm text-emerald-700 space-y-2">
                  <li className="flex gap-2"><span className="text-emerald-500 font-black">✓</span>「一對少」關聯（文章對評論，通常幾十則）</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-black">✓</span>子文件不需要單獨查詢或列表顯示</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-black">✓</span>子文件資料和父文件一起讀取</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-black">✓</span>子文件總大小不會超過幾 MB</li>
                  <li className="flex gap-2"><span className="text-emerald-500 font-black">✓</span>子文件不會被多個父文件共用</li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-blue-50">
              <div className="p-5">
                <p className="font-black text-blue-800 mb-3 text-sm">選擇引用（Reference）的情況</p>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex gap-2"><span className="text-blue-500 font-black">✓</span>「一對多/很多」關聯（用戶對訂單，可能幾萬筆）</li>
                  <li className="flex gap-2"><span className="text-blue-500 font-black">✓</span>子文件需要單獨查詢（例：用戶資料頁）</li>
                  <li className="flex gap-2"><span className="text-blue-500 font-black">✓</span>子文件被多個父文件共用</li>
                  <li className="flex gap-2"><span className="text-blue-500 font-black">✓</span>子文件需要頻繁更新（不想重複修改多個地方）</li>
                  <li className="flex gap-2"><span className="text-blue-500 font-black">✓</span>子文件數量不可預測，可能無限增長</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-gray-50">
            <div className="p-5">
              <p className="font-black text-gray-800 mb-3 text-sm">實務決策流程</p>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>先問：<strong>「最常見的查詢是什麼？」</strong> — 以查詢效率為設計起點</li>
                <li>資料是否需要「單獨存在」？（可以單獨被搜尋、更新、刪除？）→ 引用</li>
                <li>資料是否「幾乎只在父文件脈絡下出現」？→ 嵌入</li>
                <li>資料量是否可能無限增長？→ 引用（避免 document 超過 16MB 上限）</li>
                <li>在不確定時：先嵌入，性能問題出現後再拆分</li>
              </ol>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ─── Section 6: SQL vs NoSQL 選型 ─── */}
        <section
          className="space-y-6"
          
          
          
        >
          <div className="flex items-center gap-3">
            <Scale className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">
              SQL vs NoSQL — 什麼時候選哪個
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            這是最常被問到的問題。答案不是「哪個更好」，而是「哪個更適合你的場景」。
            大型系統（Twitter、Airbnb、Shopify）往往兩個都用：SQL 管核心業務資料，
            MongoDB 管用戶行為、內容、IoT 資料。
          </p>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
            <div className="p-0 overflow-hidden">
              <div className="bg-emerald-700 text-white px-6 py-3">
                <p className="font-black">選型決策表</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="px-5 py-3 text-left font-black text-gray-700">考量因素</th>
                      <th className="px-5 py-3 text-left font-black text-blue-700">選 SQL（PostgreSQL / MySQL）</th>
                      <th className="px-5 py-3 text-left font-black text-emerald-700">選 NoSQL（MongoDB）</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        '資料關聯',
                        '複雜多對多、需要複雜 JOIN',
                        '簡單關聯、以 document 為主的讀取',
                      ],
                      [
                        'Schema 彈性',
                        '固定結構、各欄位型別明確',
                        '彈性、多型態、欄位隨時間演進',
                      ],
                      [
                        '資料一致性',
                        '嚴格 ACID，強一致性，支援 Transaction',
                        '可接受最終一致性（跨 document Transaction 有支援但較複雜）',
                      ],
                      [
                        '查詢複雜度',
                        '複雜聚合、多表 JOIN、報表查詢',
                        '以 document 為單位讀寫、簡單聚合',
                      ],
                      [
                        '擴展方式',
                        '垂直擴展（加 CPU / RAM）為主',
                        '水平擴展（Sharding，加機器）原生支援',
                      ],
                      [
                        '典型用例',
                        '金融系統、ERP、庫存管理、電商訂單',
                        '內容平台、IoT 資料、用戶行為日誌、商品目錄',
                      ],
                    ].map(([factor, sql, nosql], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-5 py-3 font-bold text-gray-700 border-b border-gray-100">{factor}</td>
                        <td className="px-5 py-3 text-blue-600 text-xs border-b border-gray-100">{sql}</td>
                        <td className="px-5 py-3 text-emerald-600 text-xs border-b border-gray-100">{nosql}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="font-black text-blue-800 mb-3 text-sm">考慮 SQL 的訊號</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 資料之間有明確的關聯關係（訂單-商品-用戶）</li>
                <li>• 需要複雜的 JOIN 和聚合報表</li>
                <li>• 資料完整性要求極高（金融、醫療、庫存）</li>
                <li>• 團隊對 SQL 更熟悉</li>
                <li>• 需要嚴格的 Transaction 保證</li>
              </ul>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
              <p className="font-black text-emerald-800 mb-3 text-sm">考慮 MongoDB 的訊號</p>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• 資料結構不固定或頻繁演進（MVP 階段）</li>
                <li>• 以 document 為單位讀寫（博客、商品詳情）</li>
                <li>• 需要儲存 JSON/半結構化資料</li>
                <li>• 資料量超大，需要水平 Sharding</li>
                <li>• 快速開發、Schema 需要靈活調整</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
            <div className="p-6">
              <p className="font-black text-lg mb-3">結論：工具，不是信仰</p>
              <p className="text-emerald-100 leading-relaxed">
                不是 NoSQL 比 SQL 好，而是不同工具解決不同問題。
                很多大型系統兩個都用：PostgreSQL 管訂單和帳務，
                MongoDB 管用戶行為和內容，Redis 做快取，
                Elasticsearch 做全文搜尋。
                選型的最佳答案永遠是：<strong>「哪個讓你的團隊能最快解決眼前的問題」</strong>。
              </p>
            </div>
          </div>
        </section>

        {/* ─── 總結 ─── */}
        <section
          
          
          
        >
          <div className="bg-gradient-to-br from-green-800 to-teal-700 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                {
                  icon: '📄',
                  text: 'MongoDB Document Model 的核心優勢：彈性 Schema，同一個 Collection 的 document 可以有完全不同的欄位，適合多型態資料。',
                },
                {
                  icon: '🔑',
                  text: 'BSON _id（ObjectId）自帶時間戳，12 bytes 確保分散式唯一性；Decimal128 適合金融計算避免浮點誤差。',
                },
                {
                  icon: '🔌',
                  text: 'Mongoose 在 MongoDB 之上提供 Schema 定義、型別驗證、Middleware Hook 和鏈式 Query API，是 Node.js 中的標準選擇。',
                },
                {
                  icon: '⚡',
                  text: 'Aggregation Pipeline 是 MongoDB 聚合查詢的核心：$match（過濾）→ $unwind（展開陣列）→ $group（聚合）→ $sort → $project（欄位整形）。',
                },
                {
                  icon: '🏗️',
                  text: 'Schema 設計關鍵決策：嵌入（Embed）vs 引用（Reference）。設計起點是「查詢模式」，而不是資料結構。一對少用嵌入，一對多或共用資料用引用。',
                },
                {
                  icon: '⚖️',
                  text: 'SQL vs NoSQL 不是對立，而是互補。強一致性、複雜 JOIN → SQL；彈性 Schema、水平擴展、document 導向讀寫 → MongoDB。',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-white/90 font-medium leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ─── Navigation ─── */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/blog/database/ep03-transaction"
            className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6"
          >
            <ArrowLeft
              size={18}
              className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors"
            />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
              EP.03 — Transaction 與 ACID
            </p>
            <p className="text-sm text-gray-500 mt-1">
              隔離層級、髒讀、幻讀與死鎖實戰
            </p>
          </Link>
          <Link
            href="/blog/database/ep01-sql-basics"
            className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 text-right"
          >
            <ArrowRight
              size={18}
              className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors ml-auto"
            />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">回到起點</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
              EP.01 — SQL 基礎
            </p>
            <p className="text-sm text-gray-500 mt-1">
              從零開始的關聯式資料庫
            </p>
          </Link>
        </div>

        {/* ─── Tags ─── */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['MongoDB', 'NoSQL', 'Mongoose', 'Aggregation', 'Database', 'Schema Design'].map(
            (tag) => (
              <span key={tag}   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-bold">
                {tag}
              </span>
            )
          )}
        </div>
      </article>
    </div>
  );
}
