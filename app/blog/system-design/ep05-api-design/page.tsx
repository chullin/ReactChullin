'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Globe, Layers, Zap, Shield, GitCompare, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function SystemDesignEP05() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-800 via-violet-700 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.05</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">系統設計系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              API 設計：<br />
              <span className="text-violet-200">REST、GraphQL、tRPC 三種方案的取捨</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl">
              RESTful 最佳實踐、GraphQL N+1 問題解法、tRPC 零配置型別安全 — 根據情境選對 API 架構
            </p>
            <div className="flex items-center gap-6 text-violet-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> REST · GraphQL · tRPC · API Design</span>
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
                    「API 是你後端的門面。設計糟的 API 就像沒有菜單的餐廳，客人只能靠猜。
                    等你的 API 被一百個前端工程師使用之後，改一個 endpoint 名稱就是一場災難。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    很多人第一次寫 API 是這樣的：<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">GET /getUser?userId=123</code>、
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">POST /createNewOrder</code>。
                    能動，但沒有規範。等到系統越來越大，你會發現每個 endpoint 命名風格都不一樣，
                    Status Code 亂用，前端不知道何時該 retry，出了 bug 沒有人知道從哪裡看。
                    這篇帶你系統性地理解 API 設計的三種主流方案，以及在不同情境下如何做出正確選擇。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Section 1: 為什麼 API 設計很重要 */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 1：為什麼 API 設計很重要</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            API 設計是軟體工程中一個容易被輕視的環節。大多數初學者在第一次寫後端時，關注的是「能不能動」，
            而不是「設計得好不好」。但 API 是前後端之間的契約——一旦上線，改動就有代價。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle size={18} className="text-red-500" />
                  <h3 className="font-bold text-gray-800">設計糟糕的 API</h3>
                </div>
                <CodeBlock language="text">
{`GET /getUser?userId=123
POST /createNewOrder
GET /fetchAllProductsFromDB
DELETE /deleteUserAndAllHisData?id=456`}
                </CodeBlock>
                <p className="text-red-600 text-sm mt-3">
                  動詞混入 URL、命名不一致、欄位語義不清、難以維護
                </p>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={18} className="text-green-500" />
                  <h3 className="font-bold text-gray-800">設計良好的 RESTful API</h3>
                </div>
                <CodeBlock language="text">
{`GET    /users/123
POST   /orders
GET    /products
DELETE /users/456`}
                </CodeBlock>
                <p className="text-green-600 text-sm mt-3">
                  以資源為核心、HTTP Method 語義清晰、URL 簡潔可預測
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="border-l-4 border-violet-500 bg-violet-50 shadow-sm">
            <CardBody className="p-6">
              <p className="text-violet-800 font-medium text-lg leading-relaxed">
                API 是你後端的門面。設計糟的 API 就像沒有菜單的餐廳，客人只能靠猜。
              </p>
              <p className="text-violet-700 mt-2 text-sm leading-relaxed">
                好的 API 設計讓前端工程師不需要讀文件就能猜到 endpoint 是什麼。
                這種「最少驚喜原則（Principle of Least Surprise）」是 API 設計的核心價值之一。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 2: RESTful API 設計原則 */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Layers size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 2：RESTful API 設計原則</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            REST（Representational State Transfer）不是一個標準，而是一組風格指南。
            以下六個核心原則是業界公認的最佳實踐，掌握它們你的 API 就能讓人賞心悅目。
          </p>

          {/* Principle 1 */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full">原則 1</span>
              <h3 className="text-xl font-bold text-gray-800">以資源為中心（名詞，不是動詞）</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              URL 代表的是「資源」，動作由 HTTP Method 表達。不要把動詞塞進 URL——那是 RPC 風格，不是 REST。
            </p>
            <CodeBlock language="text">
{`❌ POST /createUser       →  ✅ POST /users
❌ GET  /getUserById/1    →  ✅ GET  /users/1
❌ POST /deletePost       →  ✅ DELETE /posts/1
❌ GET  /getAllOrders      →  ✅ GET  /orders
❌ POST /updateProfile    →  ✅ PATCH /users/1/profile`}
            </CodeBlock>
          </div>

          {/* Principle 2 */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full">原則 2</span>
              <h3 className="text-xl font-bold text-gray-800">HTTP Method 有語義</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              不同的 HTTP Method 代表不同的操作意圖，正確使用能讓 API 的行為可預測。
              冪等性（Idempotent）意指「重複執行相同請求，結果相同」，這對重試機制很重要。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="text-left p-3 font-semibold text-indigo-800 border border-indigo-100">Method</th>
                    <th className="text-left p-3 font-semibold text-indigo-800 border border-indigo-100">用途</th>
                    <th className="text-left p-3 font-semibold text-indigo-800 border border-indigo-100">冪等</th>
                    <th className="text-left p-3 font-semibold text-indigo-800 border border-indigo-100">有 Body</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-100 font-mono font-bold text-blue-600">GET</td>
                    <td className="p-3 border border-gray-100 text-gray-700">讀取資源</td>
                    <td className="p-3 border border-gray-100 text-green-600 font-medium">✅ 是</td>
                    <td className="p-3 border border-gray-100 text-gray-500">❌ 否</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-100 font-mono font-bold text-green-600">POST</td>
                    <td className="p-3 border border-gray-100 text-gray-700">建立資源</td>
                    <td className="p-3 border border-gray-100 text-red-500 font-medium">❌ 否</td>
                    <td className="p-3 border border-gray-100 text-green-600">✅ 是</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-100 font-mono font-bold text-yellow-600">PUT</td>
                    <td className="p-3 border border-gray-100 text-gray-700">全量更新（取代整個資源）</td>
                    <td className="p-3 border border-gray-100 text-green-600 font-medium">✅ 是</td>
                    <td className="p-3 border border-gray-100 text-green-600">✅ 是</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-100 font-mono font-bold text-orange-600">PATCH</td>
                    <td className="p-3 border border-gray-100 text-gray-700">部分更新（只改指定欄位）</td>
                    <td className="p-3 border border-gray-100 text-gray-500 font-medium">⚠️ 視實作</td>
                    <td className="p-3 border border-gray-100 text-green-600">✅ 是</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-100 font-mono font-bold text-red-600">DELETE</td>
                    <td className="p-3 border border-gray-100 text-gray-700">刪除資源</td>
                    <td className="p-3 border border-gray-100 text-green-600 font-medium">✅ 是</td>
                    <td className="p-3 border border-gray-100 text-gray-500">❌ 通常否</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Principle 3 */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full">原則 3</span>
              <h3 className="text-xl font-bold text-gray-800">Status Code 要正確</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              最常見的錯誤：所有 response 都回傳 200，然後在 body 裡放 <code className="bg-gray-100 px-1 rounded">success: false</code>。
              這讓監控系統無法正確判斷錯誤率，也讓前端工程師非常困惑。正確使用 HTTP Status Code 是專業度的體現。
            </p>
            <CodeBlock language="text">
{`200 OK            - 讀取/更新成功
201 Created       - 建立成功（POST 後回傳，附上新資源 URL）
204 No Content    - 刪除成功（不回傳 body）
400 Bad Request   - 用戶端請求錯誤（欄位缺失、格式錯誤）
401 Unauthorized  - 未登入（沒有 Token 或 Token 無效）
403 Forbidden     - 登入了但沒權限（沒有執行此操作的資格）
404 Not Found     - 資源不存在
422 Unprocessable - 格式對但業務邏輯錯（Email 已被使用）
429 Too Many Req  - 超過 Rate Limit
500 Internal Err  - 你的 bug（伺服器端錯誤）
502 Bad Gateway   - 上游服務（資料庫、微服務）掛了`}
            </CodeBlock>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 text-sm">
                <strong>401 vs 403 的差別：</strong>401 是「我不知道你是誰」，403 是「我知道你是誰，但你沒有權限」。
                例如：沒帶 JWT token 是 401；帶了 token 但嘗試刪除別人的資料是 403。
              </p>
            </div>
          </div>

          {/* Principle 4 */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full">原則 4</span>
              <h3 className="text-xl font-bold text-gray-800">版本控制</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              API 版本控制讓你能在不破壞舊客戶端的前提下推出新版 API。
              常見的版本控制策略有三種：URL 路徑（最直覺）、Header（最乾淨）、Query String（最懶惰）。
            </p>
            <CodeBlock language="text">
{`// URL 路徑版本（推薦：最直覺，可書籤）
GET /api/v1/users   ← 穩定的舊版，繼續維護
GET /api/v2/users   ← 新版，有破壞性更改（response 結構改變）

// Header 版本（較乾淨，但需要客戶端配合）
GET /api/users
Accept: application/vnd.myapp.v2+json

// Query String 版本（不推薦：會被 cache 搞混）
GET /api/users?version=2`}
            </CodeBlock>
            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
              為什麼需要版本？行動端 App 用戶可能還在使用三個月前的舊版本，這些用戶仍在呼叫 v1 API。
              如果你直接改 v1，這些用戶的 App 就會壞掉。版本控制讓你可以漸進式遷移。
            </p>
          </div>

          {/* Principle 5 */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full">原則 5</span>
              <h3 className="text-xl font-bold text-gray-800">Filter / Sort / Pagination</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              永遠不要設計「回傳所有資料」的 endpoint，這是資料庫的炸彈。
              用 Query Parameters 提供篩選、排序、分頁能力。
            </p>
            <CodeBlock language="text">
{`// 篩選 + 排序 + 分頁
GET /products?category=electronics&sort=-price&page=2&limit=20

// -price 表示降序（負號前綴），+price 或 price 表示升序
// 回傳格式應包含 pagination meta
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 347,
    "totalPages": 18
  }
}

// Cursor-based Pagination（更適合大資料集）
GET /posts?after=eyJpZCI6MTAwfQ==&limit=20`}
            </CodeBlock>
          </div>

          {/* Principle 6 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full">原則 6</span>
              <h3 className="text-xl font-bold text-gray-800">回應格式標準化</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              統一的回應格式讓前端工程師能寫通用的 error handler，而不是每個 endpoint 都要特殊處理。
            </p>
            <CodeBlock language="json">
{`// 成功回應
{
  "data": {
    "id": 1,
    "name": "Joseph Chen",
    "email": "joseph@example.com"
  },
  "message": "ok"
}

// 失敗回應（業務邏輯錯誤）
{
  "error": {
    "code": "EMAIL_TAKEN",
    "message": "Email 已被使用，請使用其他 Email",
    "field": "email"
  }
}

// 失敗回應（驗證錯誤，多欄位）
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "請求格式不正確",
    "details": [
      { "field": "email", "message": "不是有效的 Email 格式" },
      { "field": "password", "message": "密碼至少需要 8 個字元" }
    ]
  }
}`}
            </CodeBlock>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 3: GraphQL */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <GitCompare size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 3：GraphQL — 你問什麼就給什麼</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            GraphQL 是 Facebook 在 2015 年開源的查詢語言，為了解決 REST 在複雜前端需求下的兩個核心問題：
            <strong>Over-fetching（拿了太多不需要的欄位）</strong> 和 <strong>Under-fetching（一個頁面需要打多個 API）</strong>。
          </p>

          <Card className="border-0 shadow-md mb-6">
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={18} className="text-amber-500" />
                <h3 className="font-bold text-gray-800">REST 的困境：N+1 查詢問題</h3>
              </div>
              <CodeBlock language="javascript">
{`// 你要顯示用戶的個人資料頁（包含他的文章和留言）
// REST 需要這樣做：

GET /users/123           // 第 1 個請求：拿用戶資料（20 個欄位，你只需要 3 個）
GET /users/123/posts     // 第 2 個請求：拿文章列表
GET /posts/456/comments  // 第 3 個請求：拿第一篇文章的留言
GET /posts/789/comments  // 第 4 個請求：拿第二篇文章的留言
// ...

// 如果要顯示 10 個用戶的所有文章：
// 1 個（獲取用戶列表）+ 10 個（每個用戶的文章）= 11 個請求
// 這就是 N+1 問題`}
              </CodeBlock>
            </CardBody>
          </Card>

          <p className="text-gray-700 leading-relaxed mb-4">
            GraphQL 用一個 endpoint + 彈性查詢語言解決了這個問題：
          </p>

          <CodeBlock language="graphql">
{`# 一次請求，只拿你要的欄位，深度任意
query {
  user(id: "123") {
    name           # 只拿 name，不要其他 19 個欄位
    email
    posts {
      title
      comments {
        content
        author { name }
      }
    }
  }
}`}
          </CodeBlock>

          <div className="mt-8 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">GraphQL Schema 定義（後端）</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              GraphQL 是強型別的。你需要先定義 Schema（資料的形狀），前端只能查詢 Schema 裡有的欄位。
              這個強約束同時也是它的優勢——IDE 可以提供完整的自動補全。
            </p>
            <CodeBlock language="graphql">
{`# Schema 定義（後端，通常是 schema.graphql 檔案）

type User {
  id: ID!           # ! 表示不可為 null
  name: String!
  email: String!
  posts: [Post!]!   # 陣列，且每個元素不可為 null
  createdAt: String
}

type Post {
  id: ID!
  title: String!
  content: String   # 可為 null（草稿可能沒有內容）
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  content: String!
  author: User!
}

# Query：讀取操作
type Query {
  user(id: ID!): User        # 回傳單個用戶（可能為 null）
  users: [User!]!            # 回傳所有用戶列表
  posts(limit: Int): [Post!]!
}

# Mutation：寫入操作
type Mutation {
  createPost(title: String!, content: String): Post!
  updateUser(id: ID!, name: String): User!
  deletePost(id: ID!): Boolean!
}

# Subscription：即時訂閱（需要 WebSocket）
type Subscription {
  postCreated: Post!
  commentAdded(postId: ID!): Comment!
}`}
            </CodeBlock>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">React 中使用 GraphQL（Apollo Client）</h3>
            <CodeBlock language="tsx">
{`import { gql, useQuery, useMutation } from '@apollo/client';

// 定義 Query（放在元件外，避免每次 render 重新建立）
const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
      posts {
        id
        title
      }
    }
  }
\`;

const CREATE_POST = gql\`
  mutation CreatePost($title: String!, $content: String) {
    createPost(title: $title, content: $content) {
      id
      title
    }
  }
\`;

function UserProfile({ id }: { id: string }) {
  // useQuery 自動處理 loading、error、data 狀態
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
  });

  const [createPost] = useMutation(CREATE_POST, {
    // 建立成功後自動重新 fetch 用戶資料
    refetchQueries: [{ query: GET_USER, variables: { id } }],
  });

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error.message}</div>;

  return (
    <div>
      <h1>{data.user.name}</h1>
      <p>{data.user.email}</p>
      <ul>
        {data.user.posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}`}
            </CodeBlock>
          </div>

          <Card className="border-l-4 border-amber-400 bg-amber-50 shadow-sm">
            <CardBody className="p-5">
              <p className="text-amber-800 font-semibold mb-1">GraphQL 的缺點</p>
              <ul className="text-amber-700 text-sm space-y-1 list-disc list-inside">
                <li>學習曲線：需要理解 Schema、Resolver、DataLoader 等概念</li>
                <li>N+1 問題沒有自動消失：Resolver 層仍需用 DataLoader 做 batch 查詢</li>
                <li>快取困難：REST 可以用 URL 做 HTTP 快取，GraphQL 需要 Apollo Cache 等工具</li>
                <li>對外 API 不友善：第三方開發者更熟悉 REST</li>
              </ul>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 4: tRPC */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 4：tRPC — 前後端型別完全共享</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            tRPC（TypeScript Remote Procedure Call）是 2021 年興起的方案，專門為 TypeScript 全端專案設計。
            它的核心概念很簡單：<strong>後端定義 procedure（程序），前端直接呼叫，型別自動推導，零 schema、零 code generation</strong>。
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            用 REST 的時候，你通常需要手動維護 TypeScript 型別或 OpenAPI schema，這很容易讓前後端型別不同步。
            GraphQL 需要 code generation（<code className="bg-gray-100 px-1 rounded text-sm">graphql-codegen</code>）才能有型別。
            tRPC 直接跳過這些：後端的回傳型別，前端自動就有。
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">後端定義（Next.js API Routes）</h3>
            <CodeBlock language="typescript">
{`// server/router.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  // Query：讀取操作
  getUser: t.procedure
    .input(z.object({ id: z.string() }))  // Zod 驗證 input
    .query(async ({ input }) => {
      const user = await db.user.findUnique({
        where: { id: input.id },
      });
      return user;  // 回傳型別自動推導為 User | null
    }),

  // 巢狀 router（模組化）
  post: t.router({
    list: t.procedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return db.post.findMany({ take: input.limit ?? 10 });
      }),

    create: t.procedure
      .input(
        z.object({
          title: z.string().min(1).max(100),
          content: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // input.title 是 string，input.content 是 string
        // Zod 已驗證，不需要再手動 check
        return db.post.create({ data: input });
      }),

    delete: t.procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await db.post.delete({ where: { id: input.id } });
        return { success: true };
      }),
  }),
});

// 匯出型別（這是 tRPC 魔法的關鍵）
export type AppRouter = typeof appRouter;`}
            </CodeBlock>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">前端使用（完整型別，零配置）</h3>
            <CodeBlock language="tsx">
{`// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/router';

// 把後端的 AppRouter 型別帶到前端
export const trpc = createTRPCReact<AppRouter>();

// --- 元件中使用 ---
// app/profile/page.tsx
import { trpc } from '@/utils/trpc';

function UserProfile({ id }: { id: string }) {
  // 完整的型別提示！
  // data 的型別自動推導為 { id: string; name: string; email: string } | null
  const { data, isLoading } = trpc.getUser.useQuery({ id });

  // 後端的 input schema 也完整共享
  // 如果傳 { id: 123 }（number）會立即報 TypeScript 錯誤
  const createPost = trpc.post.create.useMutation({
    onSuccess: () => {
      // 建立成功後 invalidate 查詢快取
      utils.post.list.invalidate();
    },
  });

  const utils = trpc.useUtils();

  if (isLoading) return <div>載入中...</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <button
        onClick={() =>
          createPost.mutate({
            title: '新文章',
            content: '內容...',
            // TypeScript 會確保這裡的型別符合後端 Zod schema
          })
        }
      >
        新增文章
      </button>
    </div>
  );
}`}
            </CodeBlock>
          </div>

          <Card className="border-l-4 border-violet-500 bg-violet-50 shadow-sm">
            <CardBody className="p-5">
              <p className="text-violet-800 font-semibold mb-2">tRPC 的核心優勢</p>
              <ul className="text-violet-700 text-sm space-y-2">
                <li><strong>型別安全 100%</strong>：後端改了回傳欄位，前端立刻報錯，不需要任何 codegen</li>
                <li><strong>重構友善</strong>：rename 一個 procedure，IDE 會幫你找到所有使用到的地方</li>
                <li><strong>開發速度快</strong>：不需要寫 OpenAPI spec、不需要 graphql-codegen</li>
                <li><strong>DX 極佳</strong>：後端和前端工程師共享同一個 TypeScript 型別系統</li>
              </ul>
              <p className="text-violet-700 text-sm mt-3">
                <strong>限制：</strong>只適合前後端同一個 TypeScript monorepo 的場景。
                如果有 iOS App、Android App、第三方合作方，tRPC 就幫不了你了。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 5: 三種方案對比 */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <GitCompare size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 5：三種方案全面對比</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            沒有最好的方案，只有最適合當前情境的方案。以下對比幫助你在做技術選型時有清晰的依據。
          </p>

          <Card className="border-0 shadow-lg">
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                      <th className="text-left p-4 font-semibold">比較維度</th>
                      <th className="text-center p-4 font-semibold">REST</th>
                      <th className="text-center p-4 font-semibold">GraphQL</th>
                      <th className="text-center p-4 font-semibold">tRPC</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">學習成本</td>
                      <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">低</span></td>
                      <td className="p-4 text-center"><span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-medium">中</span></td>
                      <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">低（需 TypeScript）</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">型別安全</td>
                      <td className="p-4 text-center text-gray-600 text-xs">手動維護<br />(OpenAPI/Swagger)</td>
                      <td className="p-4 text-center text-gray-600 text-xs">Schema 生成<br />(需 codegen)</td>
                      <td className="p-4 text-center text-gray-600 text-xs">自動推導<br />(100% 覆蓋)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">前後端共用型別</td>
                      <td className="p-4 text-center text-red-500 font-bold">❌</td>
                      <td className="p-4 text-center text-yellow-600 font-bold">⚠️ 需 codegen</td>
                      <td className="p-4 text-center text-green-600 font-bold">✅ 原生支援</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">適合微服務</td>
                      <td className="p-4 text-center text-green-600 font-bold">✅</td>
                      <td className="p-4 text-center text-green-600 font-bold">✅</td>
                      <td className="p-4 text-center text-red-500 font-bold">❌ 單一 repo</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">行動端 / 外部 API</td>
                      <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">✅ 最通用</span></td>
                      <td className="p-4 text-center text-green-600 font-bold">✅</td>
                      <td className="p-4 text-center text-red-500 font-bold">❌</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">效能</td>
                      <td className="p-4 text-center text-gray-600 text-xs">可能 N+1<br />(需手動最佳化)</td>
                      <td className="p-4 text-center text-gray-600 text-xs">Batch（DataLoader）<br />需額外設定</td>
                      <td className="p-4 text-center text-gray-600 text-xs">等同 REST<br />(底層同 HTTP)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">HTTP 快取</td>
                      <td className="p-4 text-center text-green-600 font-bold">✅ 原生支援</td>
                      <td className="p-4 text-center text-red-500 font-bold">❌ 需 Apollo</td>
                      <td className="p-4 text-center text-yellow-600 font-bold">⚠️ React Query</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-medium text-gray-700">2026 趨勢</td>
                      <td className="p-4 text-center"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">主流（穩定）</span></td>
                      <td className="p-4 text-center"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">下降中</span></td>
                      <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">上升中</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <p className="text-gray-600 text-sm mt-4 leading-relaxed">
            GraphQL 的趨勢下降主要原因：複雜度高、學習曲線陡峭、大多數應用其實不需要它的彈性查詢能力。
            tRPC 的崛起則是因為 Next.js 生態的成熟，越來越多團隊採用 TypeScript 全端方案。
          </p>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 6: 如何選擇 */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <CheckCircle size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 6：決策指南 — 如何選擇</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            技術選型沒有對錯，關鍵是理解每個方案的適用情境。用以下決策樹幫助你做出有依據的選擇：
          </p>

          <Card className="border-0 shadow-lg mb-6">
            <CardBody className="p-8">
              <h3 className="font-bold text-gray-800 mb-6 text-lg">API 技術選型決策樹</h3>
              <CodeBlock language="text">
{`你的 API 需要對外公開（第三方開發者、行動端 App、合作夥伴）？
  ↓ 是
  → 用 REST（最通用，開發者熟悉，有 HTTP 快取，文件工具完整）
  ↓ 否
  ↓
是 Next.js + TypeScript 的全端專案（前後端同一個 repo）？
  ↓ 是
  → 用 tRPC（零配置型別安全，DX 最好，重構最容易）
  ↓ 否
  ↓
前端需要高度彈性的資料查詢？
（例如：social media、複雜 dashboard、用戶自訂查詢欄位）
  ↓ 是
  → 用 GraphQL（但要評估團隊學習成本）
  ↓ 否
  ↓
→ 用 REST（最穩健的預設選擇）`}
              </CodeBlock>
            </CardBody>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-md border-t-4 border-blue-500">
              <CardBody className="p-5">
                <h4 className="font-bold text-blue-700 mb-3">選 REST 的情境</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>✓ 有外部 API 消費者</li>
                  <li>✓ 行動端（iOS / Android）</li>
                  <li>✓ 微服務架構</li>
                  <li>✓ 團隊有不熟 TypeScript 的成員</li>
                  <li>✓ 需要 CDN / HTTP 快取</li>
                  <li>✓ 預設選擇（最保險）</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md border-t-4 border-pink-500">
              <CardBody className="p-5">
                <h4 className="font-bold text-pink-700 mb-3">選 GraphQL 的情境</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>✓ 複雜的前端資料需求</li>
                  <li>✓ 多個前端（web + mobile）共用同一 API</li>
                  <li>✓ 資料關聯複雜（社交圖譜）</li>
                  <li>✓ 需要即時訂閱（Subscription）</li>
                  <li>✓ 團隊已有 GraphQL 經驗</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md border-t-4 border-violet-500">
              <CardBody className="p-5">
                <h4 className="font-bold text-violet-700 mb-3">選 tRPC 的情境</h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>✓ Next.js + TypeScript 全端</li>
                  <li>✓ 小到中型團隊</li>
                  <li>✓ 快速迭代的 SaaS 產品</li>
                  <li>✓ 重視 DX 和型別安全</li>
                  <li>✓ 前後端共用型別是關鍵需求</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 7: 安全性速查 */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 7：REST API 安全性速查</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            這是後端工程師最容易忽略的部分。功能做好了，但安全沒做到位，一樣是爛的 API。
            以下是每個後端 API 都必須考慮的五個安全面向：
          </p>

          {/* Auth */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">1</span>
              <h3 className="text-lg font-bold text-gray-800">Authentication：JWT Bearer Token</h3>
            </div>
            <CodeBlock language="typescript">
{`// 每個需要登入的 API，必須驗證 JWT Token
import jwt from 'jsonwebtoken';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // Authorization: Bearer <token>
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: { code: 'MISSING_TOKEN', message: '請先登入' }
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload;  // 把用戶資訊掛到 request 上
    next();
  } catch {
    return res.status(401).json({
      error: { code: 'INVALID_TOKEN', message: 'Token 已過期或無效' }
    });
  }
}`}
            </CodeBlock>
          </div>

          {/* Rate Limiting */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">2</span>
              <h3 className="text-lg font-bold text-gray-800">Rate Limiting：防止濫用</h3>
            </div>
            <CodeBlock language="typescript">
{`import rateLimit from 'express-rate-limit';

// 全域 Rate Limit
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,    // 1 分鐘視窗
  max: 100,               // 最多 100 次請求
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: '請求過於頻繁，請稍後再試',
    },
  },
});

// 登入 API 的嚴格 Rate Limit（防止暴力破解密碼）
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 分鐘
  max: 5,                     // 最多 5 次失敗嘗試
});

app.use('/api', globalLimiter);
app.post('/api/auth/login', loginLimiter, loginHandler);`}
            </CodeBlock>
          </div>

          {/* CORS */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">3</span>
              <h3 className="text-lg font-bold text-gray-800">CORS：只允許你的前端 Domain</h3>
            </div>
            <CodeBlock language="typescript">
{`import cors from 'cors';

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://yourdomain.com',
      'https://www.yourdomain.com',
      // 開發環境才允許 localhost
      ...(process.env.NODE_ENV === 'development'
        ? ['http://localhost:3000']
        : []),
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: 不允許此來源'));
    }
  },
  credentials: true,       // 允許攜帶 Cookie
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));`}
            </CodeBlock>
          </div>

          {/* Input Validation */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">4</span>
              <h3 className="text-lg font-bold text-gray-800">Input Validation：永遠不相信用戶輸入</h3>
            </div>
            <CodeBlock language="typescript">
{`import { z } from 'zod';

// 用 Zod 定義嚴格的 Schema
const createUserSchema = z.object({
  email: z.string().email('不是有效的 Email'),
  password: z.string().min(8, '密碼至少 8 個字元').max(100),
  name: z.string().min(1).max(50).trim(),
  age: z.number().int().min(0).max(120).optional(),
});

app.post('/api/users', (req, res) => {
  // parse() 會拋出錯誤，safeParse() 會回傳 result
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        details: result.error.issues.map(i => ({
          field: i.path.join('.'),
          message: i.message,
        })),
      },
    });
  }

  // result.data 已經過驗證且型別安全
  const { email, password, name } = result.data;
  // ... 繼續處理
});`}
            </CodeBlock>
          </div>

          {/* SQL Injection */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">5</span>
              <h3 className="text-lg font-bold text-gray-800">SQL Injection 防範：用 ORM 或 Prepared Statement</h3>
            </div>
            <CodeBlock language="typescript">
{`// ❌ 危險：直接拼接 SQL 字串
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;
// 攻擊者可以輸入：' OR '1'='1 來繞過驗證

// ✅ 安全：Prisma ORM（自動防 SQL Injection）
const user = await prisma.user.findUnique({
  where: { email },  // Prisma 自動處理轉義
});

// ✅ 安全：Prepared Statement（原生 SQL）
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]  // 參數化查詢，不直接插入字串
);`}
            </CodeBlock>

            <Card className="border-l-4 border-red-400 bg-red-50 shadow-sm mt-4">
              <CardBody className="p-5">
                <p className="text-red-800 font-semibold mb-2">安全性核心原則</p>
                <ul className="text-red-700 text-sm space-y-1 list-disc list-inside">
                  <li>永遠在後端驗證 input（前端驗證只是 UX，不是安全）</li>
                  <li>密碼使用 bcrypt / argon2 雜湊，永遠不要明文儲存</li>
                  <li>敏感操作（刪帳號、改 Email）要求重新輸入密碼確認</li>
                  <li>Log 不要記錄密碼、Token、信用卡號等敏感資訊</li>
                  <li>HTTPS 是必須的，不是選配</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* Tags */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-2 mb-10">
            {['REST API', 'GraphQL', 'tRPC', 'API Design', 'System Design', 'TypeScript'].map(tag => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-violet-100 text-violet-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link href="/blog/system-design/ep04-db-design">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5 flex items-center gap-3">
                  <ArrowLeft size={18} className="text-violet-500 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                    <p className="text-sm font-bold text-gray-700">EP.04 資料庫設計</p>
                  </div>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/system-design/ep01-intro">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5 flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">從頭開始</p>
                    <p className="text-sm font-bold text-gray-700">EP.01 分散式系統入門</p>
                  </div>
                  <ArrowRight size={18} className="text-violet-500 group-hover:translate-x-1 transition-transform" />
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
