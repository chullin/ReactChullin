'use client';

import { Card, CardBody, Chip, Divider, Tabs, Tab, Button, Accordion, AccordionItem } from '@heroui/react';
import { 
  Network, 
  Share2, 
  Layers, 
  Code2, 
  Terminal, 
  Cpu, 
  Zap, 
  ArrowRight, 
  Database, 
  Search,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Package,
  Activity,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const SectionWrapper = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="space-y-8"
  >
    {children}
  </motion.div>
);

export default function GraphQLPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#171e26] text-white pt-32 pb-24 overflow-hidden">
        {/* GraphQL Branding Style Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e10098] rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e10098]/10 border border-[#e10098]/30 rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-[#e10098] animate-pulse" />
              <span className="text-[#e10098] text-xs font-black uppercase tracking-widest">Web Dev EP.36</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
              GraphQL：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e10098] to-indigo-400">
                重新定義 API 互動
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
              不再被 REST 的多個 Endpoint 所困擾。學習如何讓前端精確定義所需的資料，並透過 Apollo Server 打造高效能的 API 層。
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button color="secondary" variant="shadow" className="bg-[#e10098] font-black h-12 px-8 rounded-2xl">
                開始學習
              </Button>
              <Button variant="bordered" className="border-slate-700 text-slate-300 font-black h-12 px-8 rounded-2xl">
                查看範例程式碼
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24">
        
        {/* Intro: The Problem with REST */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-pink-100 text-[#e10098] rounded-2xl">
              <AlertCircle size={28} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">為什麼我們需要 GraphQL？</h2>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            在傳統的 REST API 中，前端開發者經常面臨兩個頭痛的問題：
            <strong className="text-slate-900 italic underline decoration-pink-500 decoration-2">Over-fetching</strong> 與 
            <strong className="text-slate-900 italic underline decoration-blue-500 decoration-2">Under-fetching</strong>。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <Card shadow="none" className="bg-slate-50 border border-slate-100 rounded-[2rem] p-4">
              <CardBody className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Database className="text-pink-500" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Over-fetching</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  你只需要使用者的姓名，但 <code className="bg-slate-200 px-1 rounded">/api/user/1</code> 卻回傳了包含地址、電話、幾百行歷史紀錄的龐大 JSON，造成頻寬浪費。
                </p>
              </CardBody>
            </Card>
            <Card shadow="none" className="bg-slate-50 border border-slate-100 rounded-[2rem] p-4">
              <CardBody className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Layers className="text-blue-500" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Under-fetching</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  你想顯示一篇貼文和其作者資訊，必須先打 <code className="bg-slate-200 px-1 rounded">/api/post/1</code> 拿到作者 ID，再打一次 <code className="bg-slate-200 px-1 rounded">/api/user/ID</code>。這種 N+1 請求讓載入變慢。
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="bg-[#171e26] rounded-[2.5rem] p-10 text-slate-300">
            <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <Zap className="text-yellow-400" /> GraphQL 的解法：精確請求
            </h4>
            <p className="mb-8">前端直接描述它想要的資料結構，伺服器保證只回傳那些欄位，且一次請求就能拿到所有巢狀資料。</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CodeBlock 
                title="前端發送的 Query" 
                language="graphql" 
                code={`query GetPostDetails {
  post(id: "1") {
    title
    content
    author {
      name
      avatar
    }
  }
}`} 
              />
              <CodeBlock 
                title="後端回傳的 JSON" 
                language="json" 
                code={`{
  "data": {
    "post": {
      "title": "GraphQL 入門",
      "content": "...",
      "author": {
        "name": "Joseph",
        "avatar": "/img/j.png"
      }
    }
  }
}`} 
              />
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-24" />

        {/* Section 1: Schema and SDL */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-50 text-[#e10098] rounded-xl"><FileCode size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">一、Schema：定義你的資料契約</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              GraphQL 是強型別的。在寫任何程式碼之前，你必須使用 <strong className="text-slate-900">SDL (Schema Definition Language)</strong> 定義資料模型。
            </p>
          </div>

          <CodeBlock 
            title="schema.graphql" 
            language="graphql" 
            code={`type User {
  id: ID!
  name: String!
  email: String
  posts: [Post]
}

type Post {
  id: ID!
  title: String!
  author: User!
}

# 所有的進入點
type Query {
  user(id: ID!): User
  allPosts: [Post]
}

# 所有的寫入操作
type Mutation {
  createPost(title: String!, authorId: ID!): Post
}`} 
          />
          <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-500 border border-slate-100 italic">
            * <code className="font-bold">!</code> 代表該欄位為必填 (Non-Null)。
          </div>
        </SectionWrapper>

        <Divider className="my-24" />

        {/* Section 2: Apollo Server and Resolvers */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Server size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">二、Resolvers：資料的加工廠</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              Schema 只是「規格」，真正的邏輯寫在 <strong className="text-slate-900">Resolvers</strong>。每個 Schema 中的欄位，都對應到一個 Resolver 函數，負責去資料庫、快取、甚至另一個 API 抓取資料。
            </p>
          </div>

          <CodeBlock 
            title="resolvers.ts" 
            language="typescript" 
            code={`const resolvers = {
  Query: {
    user: async (parent, { id }, context) => {
      return await db.users.findById(id);
    },
    allPosts: () => db.posts.findMany(),
  },
  
  // 處理巢狀關聯
  Post: {
    author: async (post) => {
      // 这里的 post 就是上層傳下來的 parent 資料
      return await db.users.findById(post.authorId);
    }
  },

  Mutation: {
    createPost: async (_, { title, authorId }) => {
      return await db.posts.create({ title, authorId });
    }
  }
};`} 
          />

          <div className="bg-amber-50 border border-amber-100 rounded-[2rem] p-8 mt-8">
            <h5 className="font-black text-amber-900 mb-3 flex items-center gap-2">
              <AlertCircle size={20} /> 警告：N+1 查詢陷阱
            </h5>
            <p className="text-sm text-amber-800 leading-relaxed">
              如果上面的 `Post.author` 被呼叫了 100 次（當你請求 100 篇貼文時），這會導致資料庫被查詢 101 次。
              這在 REST 裡是常見問題，在 GraphQL 裡如果你不注意，會變得更嚴重。
            </p>
          </div>
        </SectionWrapper>

        <Divider className="my-24" />

        {/* Section 3: DataLoader - The N+1 Solution */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Zap size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">三、DataLoader：快取與批次處理</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              為了解決 N+1 問題，我們使用 Facebook 開源的 <strong className="text-slate-900">DataLoader</strong>。
              它的原理是：在一個 Tick 內收集所有的 ID，然後用一個 `WHERE IN (id1, id2...)` 的 Query 一次抓回來。
            </p>
          </div>

          <CodeBlock 
            title="使用 DataLoader 優化後端" 
            language="typescript" 
            code={`import DataLoader from 'dataloader';

// 1. 定義批次抓取函數
const batchUsers = async (userIds) => {
  const users = await db.users.findMany({
    where: { id: { in: userIds } }
  });
  // 必須保證回傳順序與傳入的 userIds 一致
  return userIds.map(id => users.find(u => u.id === id));
};

// 2. 初始化 DataLoader
const userLoader = new DataLoader(batchUsers);

// 3. 在 Resolver 中使用
const resolvers = {
  Post: {
    author: (post) => userLoader.load(post.authorId) // 這裡會自動進行 Batching
  }
};`} 
          />
        </SectionWrapper>

        <Divider className="my-24" />

        {/* Section 4: Apollo Client in Frontend */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Package size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">四、Apollo Client：前端的狀態管理</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              在 React 中，<strong className="text-slate-900">Apollo Client</strong> 不只是發送請求的工具，它還是一個強大的「本地快取」。它會自動把抓回來的資料根據 `__typename` 和 `id` 進行正規化 (Normalization)。
            </p>
          </div>

          <CodeBlock 
            title="React 元件實作" 
            language="tsx" 
            code={`import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql\\`
  query GetAllPosts {
    allPosts {
      id
      title
      author { name }
    }
  }
\\`;

function PostList() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allPosts.map(post => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>By: {post.author.name}</p>
    </div>
  ));
}`} 
          />
        </SectionWrapper>

        <Divider className="my-24" />

        {/* Section 5: Real-time with Subscriptions */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><MessageSquare size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">五、Subscriptions：即時資料流</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              GraphQL 內建支援 <strong className="text-slate-900">Subscriptions</strong>，底層通常透過 WebSocket 實作。這對於即時聊天室、股票行情或通知系統非常完美。
            </p>
          </div>

          <CodeBlock 
            title="Schema 定義即時通知" 
            language="graphql" 
            code={`type Subscription {
  postCreated: Post
}`} 
          />
          
          <CodeBlock 
            title="後端觸發推送" 
            language="typescript" 
            code={`// 使用 PubSub 機制
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    createPost: async (_, args) => {
      const newPost = await db.posts.create(args);
      pubsub.publish('POST_CREATED', { postCreated: newPost });
      return newPost;
    }
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
  },
};`} 
          />
        </SectionWrapper>

        <Divider className="my-24" />

        {/* Comparison Table */}
        <SectionWrapper>
          <h3 className="text-3xl font-black text-slate-900 mb-8">GraphQL vs REST：該如何選擇？</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 text-left font-black border-b border-slate-200">特性</th>
                  <th className="p-4 text-left font-black border-b border-slate-200">REST API</th>
                  <th className="p-4 text-left font-black border-b border-slate-200 text-[#e10098]">GraphQL</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                <tr>
                  <td className="p-4 border-b border-slate-100 font-bold">資料獲取</td>
                  <td className="p-4 border-b border-slate-100">固定結構，容易 Overfetch</td>
                  <td className="p-4 border-b border-slate-100 font-bold text-emerald-600">精確請求，絕不浪費</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-bold">進入點</td>
                  <td className="p-4 border-b border-slate-100">多個 URL (End-points)</td>
                  <td className="p-4 border-b border-slate-100">單一 URL (/graphql)</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-bold">強型別</td>
                  <td className="p-4 border-b border-slate-100">需依賴 Swagger/OpenAPI</td>
                  <td className="p-4 border-b border-slate-100 font-bold text-emerald-600">原生 Schema 支援</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-bold">快取</td>
                  <td className="p-4 border-b border-slate-100">優秀 (基於 HTTP Cache)</td>
                  <td className="p-4 border-b border-slate-100">較困難 (需依賴 Client Cache)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionWrapper>

        {/* Summary and Next Steps */}
        <div className="mt-24 pt-12 border-t border-slate-100 space-y-12">
          <div className="bg-pink-50 rounded-[3rem] p-10 border border-pink-100">
            <h3 className="text-3xl font-black text-pink-900 mb-6">總結：給初學者的話</h3>
            <p className="text-pink-800 leading-relaxed mb-6">
              GraphQL 不是為了取代 REST，而是為了解決「複雜前端應用」與「多樣化資料需求」而生的。如果你正在開發一個大型、資料關係緊密的專案，GraphQL 會是你的救星。
            </p>
            <div className="flex flex-wrap gap-2">
              {['GraphQL', 'Apollo', 'API', 'Backend', 'Fullstack', 'Schema', 'DataLoader'].map(tag => (
                <Chip key={tag} className="bg-white text-pink-600 font-bold border border-pink-200">#{tag}</Chip>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center gap-6">
            <Link 
              href="/blog/web-dev/ep35-pwa-service-worker" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <div className="flex items-center gap-2 text-slate-400 font-black text-xs mb-3 uppercase tracking-widest">
                <ChevronRight className="rotate-180" size={14} /> 上一篇
              </div>
              <p className="font-black text-slate-900 group-hover:text-[#e10098] transition-colors leading-snug">
                EP.35 — PWA 實戰：Service Worker 與離線快取
              </p>
            </Link>

            <Link 
              href="/blog/web-dev/ep37-websocket-realtime" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all text-right"
            >
              <div className="flex items-center justify-end gap-2 text-slate-400 font-black text-xs mb-3 uppercase tracking-widest">
                下一篇 <ChevronRight size={14} />
              </div>
              <p className="font-black text-slate-900 group-hover:text-[#e10098] transition-colors leading-snug">
                EP.37 — WebSocket：打造即時互動應用的心臟
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
