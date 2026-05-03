'use client';

import {
  Card,
  CardBody,
  Divider,
  Button,
  Link as HeroLink,
  Chip,
} from '@heroui/react';
import { Calendar, User, ArrowLeft, Bookmark, Share2, Globe, Quote, Layers, Rocket, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const TechBadge = ({ name, color }: { name: string; color: string }) => (
  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold ${color}`}>
    {name}
  </span>
);

export default function BuildingReactPortfolioPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-violet-600 to-indigo-800">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center gap-2 mb-6">
              <Chip size="sm" variant="flat" className="bg-white/20 text-white border-white/30 font-bold uppercase text-[10px]">
                Web Dev
              </Chip>
              <Chip size="sm" variant="flat" className="bg-white/20 text-white border-white/30 font-bold uppercase text-[10px]">
                React
              </Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              用 React + Next.js 打造個人作品集
            </h1>
            <p className="text-xl text-white/80 font-medium mt-4">
              從零開始，到 Vercel 部署上線的完整過程
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-white/70 font-bold">
                <User size={16} className="text-blue-200" />
                <span>Joseph Chen</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 font-bold">
                <Calendar size={16} className="text-blue-200" />
                <span>March 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Action Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <Button
              as={Link}
              href="/blog"
              variant="light"
              color="primary"
              className="font-bold"
              startContent={<ArrowLeft size={18} />}
            >
              Back to Blog
            </Button>
            <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Clock size={16} /> <span>5 min read</span></div>
              <div className="flex items-center gap-1.5"><Eye size={16} /> <span>1.2k views</span></div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-10">
            {/* Intro */}
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
              每個工程師都應該有一個自己的作品集網站。不只是展示作品，更是一個讓自己練手新技術、留下學習軌跡的地方。這篇文章分享我打造 ReactChullin 的過程，包含技術選型、遇到的坑，以及部署到正式環境的細節。
            </p>

            {/* Tech Stack */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                技術選型
              </h2>
              <p>
                選擇技術棧的原則很簡單：使用我最想深入學習的工具，而不是選最熟悉的。這個專案的主要技術：
              </p>
              <div className="flex flex-wrap gap-3 py-4">
                <TechBadge name="Next.js 14" color="bg-gray-900 text-white" />
                <TechBadge name="React 18" color="bg-blue-100 text-blue-800" />
                <TechBadge name="TypeScript" color="bg-blue-600 text-white" />
                <TechBadge name="Tailwind CSS" color="bg-cyan-100 text-cyan-800" />
                <TechBadge name="HeroUI" color="bg-violet-100 text-violet-800" />
                <TechBadge name="Framer Motion" color="bg-pink-100 text-pink-800" />
                <TechBadge name="Vercel" color="bg-gray-100 text-gray-800" />
              </div>
              <p>
                Next.js 的 App Router 是這次的重點學習目標。相比 Pages Router，App Router 支援 Server Components，讓頁面結構更清晰，也更容易做 SEO 優化。
              </p>
            </div>

            {/* Project Structure */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                專案架構
              </h2>
              <p>
                App Router 的資料夾即路由的概念非常直覺，整個專案的結構如下：
              </p>
              <CodeBlock language="text" code={`ReactChullin/
├── app/
│   ├── layout.tsx          # 全域 Layout（Navbar、Footer）
│   ├── page.tsx            # 首頁
│   ├── blog/
│   │   ├── page.tsx        # 部落格列表
│   │   └── [slug]/         # 個別文章
│   ├── seg/                # 其他頁面段落
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── utils/                  # 工具函式
└── public/                 # 靜態資源`} />
            </div>

            {/* Git Branch Conflict */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                最麻煩的一關：Git 分支衝突
              </h2>
              <p>
                部署到 Vercel 之前，遇到了一個讓我頭痛的問題：本地 <code>master</code> 分支和遠端 <code>main</code> 分支的歷史完全不同。這種情況叫做「diverged branches」，直接 merge 會有衝突。
              </p>
              <CodeBlock language="bash" code={`# 問題：兩個分支沒有共同的 base commit
git log --oneline --graph --all
# * a1b2c3d (origin/main) Initial commit from Vercel
# * d4e5f6a (master) my local commits...

# 解法：用 --allow-unrelated-histories 強制合併
git checkout main
git merge master --allow-unrelated-histories

# 解決衝突後
git add .
git commit -m "Merge master into main"
git push origin main`} />
              <Card className="bg-amber-50/50 border border-amber-200 shadow-none my-4">
                <CardBody className="p-6">
                  <p className="text-sm font-medium text-amber-800">
                    <strong>教訓：</strong>從一開始就在 <code>main</code> 分支工作，不要讓兩邊歷史分叉。如果已經分叉了，越早解決越簡單。
                  </p>
                </CardBody>
              </Card>
            </div>

            {/* Vercel Deploy */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                Vercel 部署設定
              </h2>
              <p>
                Vercel 和 Next.js 的整合幾乎是零設定，但有幾個細節值得注意：
              </p>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                  <h3 className="font-black text-gray-900 flex items-center gap-2">
                    <Layers size={18} className="text-blue-500" />
                    Production Branch
                  </h3>
                  <p className="text-sm text-gray-600">
                    Vercel 預設追蹤 <code>main</code> 分支。每次推送到 <code>main</code> 就會觸發自動部署。其他分支的推送會建立 Preview Deployment，可以在正式上線前預覽效果。
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                  <h3 className="font-black text-gray-900 flex items-center gap-2">
                    <Globe size={18} className="text-blue-500" />
                    next.config.js 設定
                  </h3>
                  <p className="text-sm text-gray-600">
                    因為也部署在 GitHub Pages（<code>chullin.github.io/ReactChullin/</code>），需要設定 <code>basePath</code>。但 Vercel 不需要這個設定，所以要根據環境動態切換。
                  </p>
                  <CodeBlock language="javascript" code={`// next.config.js
const isProd = process.env.NODE_ENV === 'production'
  && process.env.VERCEL !== '1';

module.exports = {
  basePath: isProd ? '/ReactChullin' : '',
  output: 'export',  // GitHub Pages 需要靜態輸出
}`} />
                </div>
              </div>
            </div>

            {/* Quote */}
            <Card className="bg-blue-50/50 border-none shadow-none my-12">
              <CardBody className="p-10 relative overflow-hidden">
                <Quote size={48} className="text-blue-200 absolute -top-2 -left-2 rotate-12" />
                <div className="relative z-10">
                  <p className="text-2xl font-black text-blue-900 leading-snug">
                    "建立個人網站最大的價值，不是給別人看，而是給未來的自己留一面鏡子。"
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* What I Learned */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                這個專案學到什麼
              </h2>
              <div className="grid gap-4">
                {[
                  {
                    title: 'App Router vs Pages Router',
                    desc: 'Server Components 的概念需要時間轉換思維，但習慣後邏輯更清晰。',
                  },
                  {
                    title: 'Tailwind CSS 的設計系統',
                    desc: '從 utility-first 到建立自己的設計規範，spacing 和 color scale 的一致性非常重要。',
                  },
                  {
                    title: 'Framer Motion 動畫',
                    desc: '`whileInView` + `viewport={{ once: true }}` 是讓頁面滾動動畫不重複觸發的關鍵。',
                  },
                  {
                    title: 'Git 分支管理',
                    desc: '永遠在一個 branch 上工作，不要讓 master 和 main 同時存在。',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 bg-gray-50 rounded-2xl p-5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-black text-sm flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider className="my-16 opacity-50" />

          <div className="flex items-center gap-4 flex-wrap">
            {['React', 'Next.js', 'TypeScript', 'Vercel', 'Web Dev', 'Git'].map((tag) => (
              <Chip key={tag} variant="flat" color="primary" className="font-bold">
                {tag}
              </Chip>
            ))}
          </div>

          <div className="bg-gray-50 p-10 rounded-[2rem] flex flex-col items-center text-center space-y-6">
            <Rocket size={48} className="text-blue-500" />
            <h3 className="text-2xl font-black text-gray-900">想看實際成品？</h3>
            <p className="text-gray-500 font-medium">
              這個網站本身就是成品，原始碼也完全公開。
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button
                as={HeroLink}
                href="https://github.com/chullin/ReactChullin"
                isExternal
                color="primary"
                radius="full"
                size="lg"
                className="font-black px-8"
              >
                View Source Code
              </Button>
              <Button
                as={Link}
                href="/blog"
                variant="flat"
                size="lg"
                radius="full"
                className="font-bold"
              >
                More Posts
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
