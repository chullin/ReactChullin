'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Clock, Eye } from 'lucide-react';
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

// 視覺化的 class demo
const Demo = ({ label, className, children }: { label: string; className: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <code className="text-xs font-mono text-violet-700 bg-violet-50 px-2 py-0.5 rounded">{className}</code>
    <div className={`border-2 border-dashed border-gray-200 rounded-xl p-4 ${className}`}>{children}</div>
    <p className="text-xs text-gray-400">{label}</p>
  </div>
);

export default function WebDevEP05Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-900 via-cyan-900 to-slate-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(135deg, rgba(20,184,166,0.3) 25%, transparent 25%), linear-gradient(225deg, rgba(20,184,166,0.3) 25%, transparent 25%)`, backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-teal-500/20 text-teal-300 border-teal-500/30 font-bold uppercase text-[10px]">個人網頁開發</Chip>
              <Chip size="sm" variant="flat" className="bg-teal-500/20 text-teal-300 border-teal-500/30 font-bold uppercase text-[10px]">EP.05</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Tailwind CSS<br />
              <span className="text-teal-300">不再寫 CSS 檔，class 就是樣式</span>
            </h1>
            <p className="text-cyan-200 text-lg font-medium max-w-2xl mx-auto">
              我的個人網頁沒有任何手寫的 .css 檔案（除了全域設定），<br />
              所有樣式都寫在 className 裡面
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 text-teal-600 p-2.5 rounded-full"><User size={18} /></div>
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
            傳統寫法是：在 .html 裡加 class，在 .css 裡寫對應的樣式。兩個檔案來回切換，改個顏色要找半天。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Tailwind 的做法完全不同：<strong>每個 class 都直接對應一個 CSS 屬性</strong>。不需要自己命名 class，不需要另外寫 CSS 檔案，樣式就寫在元素上。
          </p>
          <CodeBlock title="傳統 CSS vs Tailwind" code={`// ❌ 傳統方式：HTML + CSS 兩個檔案
// index.html
<div class="my-card">...</div>

// styles.css
.my-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

// ✅ Tailwind 方式：直接寫在元素上
<div className="bg-white rounded-2xl p-6 shadow-sm">...</div>`} />
          <p className="text-gray-700 leading-relaxed">
            乍看之下 className 很長很醜，但用習慣之後你會發現：<strong>根本不需要離開這個檔案就能完成所有樣式修改</strong>。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* 命名規則 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Tailwind 的命名規律</h2>
          <p className="text-gray-700 leading-relaxed">
            Tailwind class 都有規律，一旦抓到模式就能猜出大部分：
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">Class</th>
                  <th className="text-left p-4 font-black text-gray-700">對應的 CSS</th>
                  <th className="text-left p-4 font-black text-gray-700">說明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-mono text-xs">
                {[
                  ['text-xl', 'font-size: 1.25rem', '字體大小，還有 text-sm / text-2xl / text-5xl'],
                  ['font-black', 'font-weight: 900', '字重，還有 font-bold / font-medium / font-light'],
                  ['text-gray-900', 'color: #111827', '文字顏色，數字 100-950，越大越深'],
                  ['bg-white', 'background: white', '背景色，同樣支援色票系統'],
                  ['p-6', 'padding: 1.5rem', 'p = padding，數字是 4px × 數字'],
                  ['px-6', 'padding-left/right: 1.5rem', 'px = 水平 padding，py = 垂直'],
                  ['mt-4', 'margin-top: 1rem', 'm = margin，mt/mb/ml/mr/mx/my'],
                  ['rounded-2xl', 'border-radius: 1rem', '圓角，還有 rounded-lg / rounded-full'],
                  ['shadow-sm', 'box-shadow: ...', '陰影，還有 shadow-md / shadow-lg / shadow-xl'],
                  ['w-full', 'width: 100%', '寬度，還有 w-1/2 / w-48 / w-auto'],
                  ['h-screen', 'height: 100vh', '高度'],
                  ['opacity-50', 'opacity: 0.5', '透明度，0-100'],
                ].map(([cls, css, note]) => (
                  <tr key={cls}>
                    <td className="p-4 text-teal-700 font-black">{cls}</td>
                    <td className="p-4 text-gray-500">{css}</td>
                    <td className="p-4 text-gray-400 text-xs font-sans">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Flexbox */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">排版：flex 和 grid</h2>
          <p className="text-gray-700 leading-relaxed">
            我的網頁大量使用 flex 排版。以下是最常用的 flex 組合：
          </p>

          <div className="space-y-6">
            <div>
              <code className="text-sm font-mono font-black text-teal-700 bg-teal-50 px-3 py-1 rounded-lg">flex items-center gap-3</code>
              <p className="text-gray-500 text-sm mt-1 mb-3">水平排列、垂直置中、間距 12px — 最常用的排版</p>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-black text-sm">J</div>
                  <div>
                    <p className="font-black text-gray-900">Joseph Chen</p>
                    <p className="text-sm text-gray-400">Software Engineer</p>
                  </div>
                </div>
              </div>
              <CodeBlock title="" code={`<div className="flex items-center gap-3">
  <Avatar />
  <div>
    <p>Joseph Chen</p>
    <p>Software Engineer</p>
  </div>
</div>`} />
            </div>

            <div>
              <code className="text-sm font-mono font-black text-teal-700 bg-teal-50 px-3 py-1 rounded-lg">flex items-center justify-between</code>
              <p className="text-gray-500 text-sm mt-1 mb-3">左右兩端對齊 — 常用在 Card Header 或 Navbar</p>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="font-black text-gray-900">EP.01 — Two Sum</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">2024</span>
                </div>
              </div>
            </div>

            <div>
              <code className="text-sm font-mono font-black text-teal-700 bg-teal-50 px-3 py-1 rounded-lg">grid sm:grid-cols-2 gap-4</code>
              <p className="text-gray-500 text-sm mt-1 mb-3">響應式網格：手機 1 欄，sm 以上 2 欄</p>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  {['卡片 A', '卡片 B', '卡片 C', '卡片 D'].map(t => (
                    <div key={t} className="bg-teal-50 rounded-xl p-3 text-center text-sm font-bold text-teal-700">{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 響應式設計 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">響應式設計：前綴修飾符</h2>
          <p className="text-gray-700 leading-relaxed">
            Tailwind 用前綴讓你針對不同螢幕寬度套用不同樣式。規則很簡單：<strong>沒有前綴 = 手機，sm: 以上 = 套用</strong>。
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">前綴</th>
                  <th className="text-left p-4 font-black text-gray-700">觸發寬度</th>
                  <th className="text-left p-4 font-black text-gray-700">例子</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-mono text-xs">
                {[
                  ['（無前綴）', '所有裝置', 'text-sm → 所有裝置用小字'],
                  ['sm:', '≥ 640px', 'sm:text-xl → 平板以上用大字'],
                  ['md:', '≥ 768px', 'md:grid-cols-3 → 中螢幕 3 欄'],
                  ['lg:', '≥ 1024px', 'lg:text-7xl → 大螢幕超大標題'],
                ].map(([p, w, e]) => (
                  <tr key={p}><td className="p-4 text-teal-700 font-black">{p}</td><td className="p-4 text-gray-500">{w}</td><td className="p-4 text-gray-500">{e}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed">
            我的首頁標題就用了響應式：手機 5xl，桌面 7xl：
          </p>
          <CodeBlock title="app/page.tsx" code={`<h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
  I think, therefore I am
</h1>
{/* 手機：56px，桌面（lg以上）：72px */}`} />
        </section>

        <Divider className="opacity-30" />

        {/* 狀態修飾符 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">互動狀態：hover、focus、group</h2>

          <div className="space-y-5">
            <div>
              <p className="font-black text-gray-900 mb-2">hover: — 滑鼠懸停效果</p>
              <CodeBlock title="" code={`<div className="bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
  {/* 預設灰底，hover 時變藍底，用 transition-colors 讓顏色平滑過渡 */}
</div>`} />
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 mt-2">
                <div className="bg-gray-50 hover:bg-blue-50 transition-colors rounded-xl p-4 cursor-pointer text-center text-sm text-gray-500">
                  滑鼠移到這裡看效果 →
                </div>
              </div>
            </div>

            <div>
              <p className="font-black text-gray-900 mb-2">group + group-hover: — 父子連動效果</p>
              <p className="text-gray-500 text-sm mb-3">在父元素加 group，子元素用 group-hover: 就能在 hover 父元素時改變子元素的樣式</p>
              <CodeBlock title="blog/page.tsx — 實際用法" code={`<Link href={post.href} className="group">
  <p className="text-gray-800 group-hover:text-blue-600 transition-colors">
    {post.title}
  </p>
  <ChevronRight className="text-gray-300 group-hover:text-blue-400 transition-colors" />
</Link>
{/* hover Link 時，裡面的文字和箭頭同時變色 */}`} />
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 實際拆解 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">實戰：拆解一張 Blog 卡片的 className</h2>
          <p className="text-gray-700 leading-relaxed">
            這是我的 blog/page.tsx 裡一段實際的 className，我們來逐字拆解：
          </p>
          <CodeBlock title="完整的卡片 className" code={`<div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 space-y-3">

{/*
  bg-violet-50      → 淡紫色背景
  border            → 加外框線
  border-violet-100 → 外框線顏色（比背景深一點）
  rounded-2xl       → 圓角 1rem
  p-6               → 四周 padding 1.5rem（24px）
  space-y-3         → 子元素之間垂直間距 0.75rem
*/}`} />

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-violet-800">這就是上面那段 className 的實際效果</p>
            <p className="text-violet-700 text-sm">淡紫色背景、細框線、圓角、內距、子元素間距 — 完全不需要寫任何 CSS 檔案。</p>
          </div>

          <Callout type="tip">
            <strong>讀 className 的技巧</strong>：遇到看不懂的 class，在 VS Code 裡把滑鼠移到 class 上，Tailwind IntelliSense 擴充套件會顯示對應的 CSS 是什麼。這是最快的學習方式。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* space-y 和 max-w */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">兩個超常用的 Class</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 space-y-3">
              <p className="font-black text-teal-800 text-lg">space-y-N</p>
              <p className="text-teal-700 text-sm leading-relaxed">
                讓容器內所有子元素之間有垂直間距。等同於對每個子元素加 <code className="bg-teal-100 px-1 rounded font-mono">margin-top</code>，但不用一個個加。
              </p>
              <CodeBlock title="" code={`<div className="space-y-4">
  <Card />  {/* 間距 16px */}
  <Card />  {/* 間距 16px */}
  <Card />
</div>`} />
            </div>
            <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6 space-y-3">
              <p className="font-black text-cyan-800 text-lg">max-w-3xl mx-auto</p>
              <p className="text-cyan-700 text-sm leading-relaxed">
                限制最大寬度並水平置中。我幾乎每篇文章都用這個，讓內容不要在寬螢幕上過度延伸，保持可讀性。
              </p>
              <CodeBlock title="" code={`<article className="max-w-3xl mx-auto px-6 py-16">
  {/* 最寬 768px，水平置中，兩側內距 */}
</article>`} />
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-teal-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🎨', text: 'Tailwind = 每個 class 對應一個 CSS 屬性，直接寫在元素上，不再需要另開 .css 檔' },
                { emoji: '📐', text: 'p-N / m-N 是間距，text-N 是字體，bg-N 是背景，rounded-N 是圓角，shadow-N 是陰影' },
                { emoji: '📱', text: '響應式：sm: md: lg: 前綴針對不同螢幕寬度，無前綴 = 手機優先（Mobile First）' },
                { emoji: '✨', text: 'hover: 控制懸停效果；group + group-hover: 讓父子元素連動' },
                { emoji: '📦', text: 'flex items-center gap-3 = 水平置中排列；max-w-3xl mx-auto = 置中容器' },
                { emoji: '🔍', text: 'VS Code + Tailwind IntelliSense：hover 在 class 上可以看對應的 CSS，最快的學習方式' },
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
          <Link href="/blog/web-dev/ep04-react-component" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.04 — React 核心概念</p>
            <p className="text-sm text-gray-500 mt-1">Component、JSX、Props、useState</p>
          </Link>
          <Link href="/blog/web-dev/ep06-heroui" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.06 — HeroUI 元件庫</p>
            <p className="text-sm text-gray-500 mt-1">現成 Card、Button、Chip，快速建 UI</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Web Dev', 'Tailwind CSS', 'Styling', '響應式', 'EP.05'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
