'use client';

import { Card, CardBody, Button, Chip, Divider, Avatar } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, ExternalLink, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const Callout = ({ type, children }: { type: 'info' | 'warn' | 'tip'; children: React.ReactNode }) => {
  const styles = { info: 'bg-blue-50 border-blue-100 text-blue-800', warn: 'bg-amber-50 border-amber-100 text-amber-800', tip: 'bg-green-50 border-green-100 text-green-800' };
  const icons = { info: '💡', warn: '⚠️', tip: '✅' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3"><span className="text-xl shrink-0">{icons[type]}</span><div className="text-sm leading-relaxed">{children}</div></div>
    </div>
  );
};

const PropRow = ({ prop, type, def, desc }: { prop: string; type: string; def?: string; desc: string }) => (
  <tr>
    <td className="p-3 font-mono text-xs text-violet-700 font-black">{prop}</td>
    <td className="p-3 font-mono text-xs text-blue-600">{type}</td>
    <td className="p-3 font-mono text-xs text-gray-400">{def ?? '—'}</td>
    <td className="p-3 text-xs text-gray-600">{desc}</td>
  </tr>
);

export default function WebDevEP06Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.4) 0%, transparent 60%)` }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">個人網頁開發</Chip>
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">EP.06</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              HeroUI 元件庫<br />
              <span className="text-violet-300">現成 UI 積木，快速建出美觀介面</span>
            </h1>
            <p className="text-purple-200 text-lg font-medium max-w-2xl mx-auto">
              Card、Button、Chip、Divider — 我的網頁所有 UI 元件都來自這裡，<br />
              安裝一次，直接拿來用
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-violet-100 text-violet-600 p-2.5 rounded-full"><User size={18} /></div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm"><Calendar size={13} /><span>2024</span></div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Clock size={16} /> <span>5 min read</span></div>
              <div className="flex items-center gap-1.5"><Eye size={16} /> <span>1.2k views</span></div>
            </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            有了 React + Tailwind，你已經能做出任何樣式的頁面。但每次都要從零寫一個按鈕、一張卡片嗎？
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這就是元件庫（Component Library）的價值：<strong>把常用的 UI 元件封裝好，直接引入使用</strong>。
            HeroUI 是我選擇的元件庫，它基於 Tailwind CSS，設計美觀，和 Next.js 相容。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            打開我任何一個 page.tsx，第一行 import 通常長這樣：
          </p>
          <CodeBlock title="" code={`import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';`} />
        </section>

        <Divider className="opacity-30" />

        {/* 安裝設定 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">安裝與設定（只做一次）</h2>

          <div className="space-y-8">
            <div>
              <p className="font-bold text-gray-900 mb-2">Step 1：安裝套件</p>
              <CodeBlock title="terminal" lang="bash" code={`npm install @heroui/react framer-motion`} />
              <p className="text-gray-500 text-sm">HeroUI 依賴 framer-motion 做動畫，兩個都要裝。</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-2">Step 2：設定 tailwind.config.ts</p>
              <CodeBlock title="tailwind.config.ts" code={`import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // ↓ 必加：讓 Tailwind 掃描 HeroUI 的樣式
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#006FEE",  // 自訂主題色（我用藍色）
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
export default config;`} />
              <Callout type="warn">
                如果不加 HeroUI 的 content 路徑，Tailwind 不會掃描 HeroUI 的樣式，元件可能顯示出錯或沒有樣式。
              </Callout>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-2">Step 3：加入 Providers</p>
              <p className="text-gray-500 text-sm mb-3">HeroUI 需要一個 Provider 包住整個 App，才能讓主題、動畫等功能正常運作：</p>
              <CodeBlock title="app/providers.tsx（新建這個檔案）" code={`'use client';

import { HeroUIProvider } from '@heroui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}`} />
              <CodeBlock title="app/layout.tsx — 把 Providers 包住 children" code={`import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>        {/* ← 包住全部 */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}`} />
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Card */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Card — 最常用的容器</h2>
          <p className="text-gray-700 leading-relaxed">
            Card 是網頁裡最基本的「卡片容器」，有陰影、圓角，適合放各種資訊。
          </p>

          <div className="space-y-4">
            <div>
              <p className="font-bold text-gray-900 mb-3">基本用法</p>
              <CodeBlock title="" code={`import { Card, CardBody } from '@heroui/react';

<Card>
  <CardBody>
    <p>這是卡片裡的內容</p>
  </CardBody>
</Card>`} />
              <div className="mt-2">
                <Card>
                  <CardBody>
                    <p className="text-gray-700">這是卡片裡的內容</p>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-3">isPressable + as={`{Link}`} — 可點擊的卡片連結</p>
              <p className="text-gray-500 text-sm mb-2">我的 blog 文章列表用的方式：</p>
              <CodeBlock title="" code={`<Card
  isPressable           // 加上 hover 按壓效果
  as={Link}            // 讓 Card 渲染成 <a> 連結
  href="/blog/post-1"  // 連結目標
  className="border-none shadow-sm hover:shadow-lg transition-all"
>
  <CardBody className="p-6">
    <h3>EP.01 — Two Sum</h3>
    <p>從暴力解到 HashMap 思維</p>
  </CardBody>
</Card>`} />
              <Callout type="info">
                <strong>as prop</strong> 是 HeroUI 的強大功能：把元件渲染成其他 HTML 元素或 React 元件。<code>as={'{'} Link {'}'}</code> 讓 Card 有 Link 的功能（可以導航），同時保有 Card 的樣式。
              </Callout>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Button */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Button — 豐富的變體</h2>
          <p className="text-gray-700 leading-relaxed">
            HeroUI 的 Button 有很多 variant（變體）和 color（顏色），組合使用可以表達不同的視覺層級：
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="font-bold text-gray-700 text-sm uppercase tracking-wider">variant 變體</p>
            <div className="flex flex-wrap gap-3">
              <Button color="primary" variant="solid">solid（實心）</Button>
              <Button color="primary" variant="flat">flat（淡色填充）</Button>
              <Button color="primary" variant="bordered">bordered（外框）</Button>
              <Button color="primary" variant="light">light（超淡）</Button>
              <Button color="primary" variant="shadow">shadow（有陰影）</Button>
              <Button color="primary" variant="ghost">ghost（hover 才顯示）</Button>
            </div>
            <CodeBlock title="" code={`<Button color="primary" variant="solid">送出</Button>
<Button color="primary" variant="flat">取消</Button>
<Button color="primary" variant="shadow">主要行動</Button>`} />
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="font-bold text-gray-700 text-sm uppercase tracking-wider">常用 Props</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3 font-black text-gray-700">Prop</th>
                    <th className="text-left p-3 font-black text-gray-700">型別</th>
                    <th className="text-left p-3 font-black text-gray-700">預設</th>
                    <th className="text-left p-3 font-black text-gray-700">說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <PropRow prop="color" type="string" def="default" desc="primary / secondary / success / warning / danger" />
                  <PropRow prop="variant" type="string" def="solid" desc="solid / flat / bordered / light / shadow / ghost" />
                  <PropRow prop="size" type="string" def="md" desc="sm / md / lg" />
                  <PropRow prop="radius" type="string" def="md" desc="none / sm / md / lg / full（圓角程度）" />
                  <PropRow prop="isIconOnly" type="boolean" def="false" desc="只有圖示的方形按鈕" />
                  <PropRow prop="as" type="Component" def="button" desc="渲染成其他元件，常用 as={'{'}Link{'}'}" />
                  <PropRow prop="startContent" type="ReactNode" def="—" desc="按鈕左側的圖示或元素" />
                  <PropRow prop="endContent" type="ReactNode" def="—" desc="按鈕右側的圖示或元素" />
                </tbody>
              </table>
            </div>
          </div>

          <CodeBlock title="我的網頁實際用法" code={`// 主要行動按鈕（Resume）
<Button
  as={Link}
  href="/resume"
  color="primary"
  size="lg"
  className="font-bold px-8 shadow-lg"
  endContent={<ArrowRight size={20} />}
>
  View Resume
</Button>

// 圖示按鈕（書籤）
<Button isIconOnly variant="light" size="sm">
  <Bookmark size={18} />
</Button>`} />
        </section>

        <Divider className="opacity-30" />

        {/* Chip */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Chip — 標籤與分類</h2>
          <p className="text-gray-700 leading-relaxed">
            Chip 是小標籤，我用它來顯示文章分類、EP 編號、技術標籤等。
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap gap-3">
              <Chip color="primary" variant="flat">LeetCode 系列</Chip>
              <Chip color="secondary" variant="flat">Web Dev</Chip>
              <Chip color="success" variant="flat">Graph</Chip>
              <Chip color="warning" variant="dot">External</Chip>
              <Chip color="danger" variant="bordered">🔥 Hot</Chip>
              <Chip size="sm" variant="flat" className="text-[10px] font-black uppercase">EP.06</Chip>
            </div>
            <CodeBlock title="" code={`<Chip color="primary" variant="flat">LeetCode 系列</Chip>
<Chip color="success" variant="dot">進行中</Chip>     {/* dot 在左邊顯示圓點 */}
<Chip size="sm" variant="flat" className="text-[10px] font-black uppercase">
  EP.06
</Chip>`} />
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Divider */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Divider — 分隔線</h2>
          <p className="text-gray-700 leading-relaxed">
            最簡單的元件，就是一條水平線，用來分隔內容區塊：
          </p>
          <CodeBlock title="" code={`<Divider />                              {/* 完整寬度的線 */}
<Divider className="opacity-30" />      {/* 加透明度讓線更淡 */}
<Divider className="my-12 opacity-50" /> {/* 加垂直間距 */}`} />
          <div className="space-y-4">
            <p className="text-sm text-gray-500">以下是 opacity-30 的效果：</p>
            <Divider className="opacity-30" />
            <p className="text-sm text-gray-500">以下是 opacity-80 的效果：</p>
            <Divider className="opacity-80" />
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 其他元件快速介紹 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">其他常用元件快速一覽</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'Link', desc: '語意化連結，可以 href 外部 URL 或內部路由，支援 target="_blank"', code: `<Link href="/blog" color="primary">Blog</Link>` },
              { name: 'Avatar', desc: '用戶頭像，可顯示圖片或文字縮寫，有 size / radius / bordered 等 props', code: `<Avatar src="/profile.png" size="lg" />` },
              { name: 'Skeleton', desc: '載入佔位效果（骨架屏），讓頁面在資料還沒載入時有預覽框架', code: `<Skeleton className="w-32 h-4 rounded" />` },
              { name: 'Spinner', desc: '載入中的旋轉動畫', code: `<Spinner color="primary" size="sm" />` },
              { name: 'Modal', desc: '彈出視窗，需搭配 useDisclosure Hook 控制開關', code: `const {isOpen, onOpen, onClose} = useDisclosure()` },
              { name: 'Tabs', desc: '分頁切換，每個 Tab 有自己的內容', code: `<Tabs><Tab key="1" title="A">...</Tab></Tabs>` },
            ].map(({ name, desc, code }) => (
              <div key={name} className="bg-gray-50 rounded-2xl p-5 space-y-2">
                <p className="font-black text-violet-700">{name}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
                <code className="block bg-gray-800 text-green-400 rounded-lg p-2 font-mono text-[11px] whitespace-pre overflow-x-auto">{code}</code>
              </div>
            ))}
          </div>
          <Callout type="tip">
            完整的 HeroUI 文件和互動示例在 <strong>heroui.com/docs</strong>。每個元件都有「Playground」可以直接改 props 預覽效果，是學習 HeroUI 最快的方式。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* 和 Tailwind 一起用 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">HeroUI + Tailwind 混用</h2>
          <p className="text-gray-700 leading-relaxed">
            HeroUI 元件本身用 Tailwind 寫的，所以你可以在 HeroUI 元件上加 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">className</code> 覆蓋或擴充樣式，兩者完全相容：
          </p>
          <CodeBlock title="混用範例" code={`// HeroUI 的 Chip 加上自訂 className
<Chip
  size="sm"
  variant="flat"
  color="primary"
  className="font-bold uppercase text-[10px] tracking-widest"  // ← Tailwind class
>
  LeetCode 系列
</Chip>

// HeroUI 的 Card 加上 hover 效果
<Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300">
  <CardBody className="p-8 sm:p-10">
    ...
  </CardBody>
</Card>`} />
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-violet-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🧩', text: '元件庫 = 封裝好的 UI 積木，直接引入使用，省去從頭設計的時間' },
                { emoji: '⚙️', text: '安裝三步驟：npm install → tailwind.config 加 content 路徑和 plugin → providers.tsx 包住 App' },
                { emoji: '🃏', text: 'Card + CardBody：最常用的容器，加 isPressable + as={"{Link}"} 就是可點擊的卡片連結' },
                { emoji: '🔘', text: 'Button：color × variant 組合出不同視覺層級，endContent 放圖示，as={"{Link}"} 導航用' },
                { emoji: '🏷️', text: 'Chip：小標籤，顯示分類、EP 編號、技術標籤' },
                { emoji: '🎨', text: 'HeroUI + Tailwind 可以自由混用，在 HeroUI 元件上加 className 覆蓋預設樣式' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep05-tailwind" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.05 — Tailwind CSS</p>
            <p className="text-sm text-gray-500 mt-1">用 class 名稱寫樣式，響應式、hover</p>
          </Link>
          <Link href="/blog/web-dev/ep07-framer-motion" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.07 — Framer Motion</p>
            <p className="text-sm text-gray-500 mt-1">讓頁面元素動起來的動畫庫</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Web Dev', 'HeroUI', 'Component Library', 'Card', 'Button', 'EP.06'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
