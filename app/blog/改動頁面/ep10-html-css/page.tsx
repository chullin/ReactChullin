'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/* ─── Inline Components ─────────────────────────────────────── */

const CodeBlock = ({ title, code }: { title?: string; code: string }) => (
  <div className="rounded-2xl overflow-hidden shadow-lg my-4">
    <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-red-400" />
      <span className="w-3 h-3 rounded-full bg-yellow-400" />
      <span className="w-3 h-3 rounded-full bg-green-400" />
      {title && <span className="ml-3 text-gray-400 text-xs font-mono">{title}</span>}
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-xs p-5 overflow-x-auto leading-relaxed whitespace-pre">
      {code}
    </pre>
  </div>
);

const InfoBox = ({ color, title, children }: { color: 'blue' | 'amber' | 'green' | 'orange'; title: string; children: React.ReactNode }) => {
  const styles = {
    blue:   'bg-blue-50 border-blue-100 text-blue-900',
    amber:  'bg-amber-50 border-amber-100 text-amber-900',
    green:  'bg-green-50 border-green-100 text-green-900',
    orange: 'bg-orange-50 border-orange-100 text-orange-900',
  };
  return (
    <div className={`border rounded-2xl p-6 ${styles[color]}`}>
      <p className="font-black mb-3">{title}</p>
      <div className="text-sm leading-relaxed space-y-1">{children}</div>
    </div>
  );
};

/* ─── Page ──────────────────────────────────────────────────── */

export default function WebDevEP10Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/25 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.10</span>
              <span className="bg-white/15 text-white/85 px-3 py-1 rounded-full text-xs font-medium">網頁開發實戰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
              HTML / CSS 核心概念<br />
              <span className="text-yellow-200">前端面試基礎題</span>
            </h1>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl">
              Box Model、Flexbox、Grid、RWD、Selector —<br />
              寫前端 10 年都用得到的基礎，面試必考
            </p>
            <div className="flex items-center gap-6 text-orange-100 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 10 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> HTML · CSS · RWD · Flexbox · Grid</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Article ── */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening Quote */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-orange-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「HTML 決定了什麼東西存在，CSS 決定了它長什麼樣子。這兩件事分清楚，前端就通了一半。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    很多人把 HTML 和 CSS 當成「入門就會」的東西，結果面試的時候才發現 Box Model 說不清楚、
                    Flexbox 和 Grid 搞混、Specificity 計算錯誤。這篇把面試必考的核心概念整理成速查格式，
                    附上視覺化圖解，讓你隨時複習。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="opacity-30" />

        {/* 1. HTML 語意化標籤 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">1. HTML 語意化標籤</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            語意化（Semantic HTML）的核心概念：用<strong>有意義的標籤</strong>取代萬用的 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">div</code>。
            好處是提升 SEO、無障礙性（Accessibility），讓程式碼更易讀。
          </p>
          <CodeBlock
            title="語意化 vs 非語意化"
            code={`<!-- ❌ 非語意化：滿版 div，不知道每塊是什麼 -->
<div class="header"> ... </div>
<div class="nav"> ... </div>
<div class="main"> ... </div>

<!-- ✅ 語意化：標籤本身說明了用途 -->
<header> ... </header>
<nav> ... </nav>
<main>
  <article> ... </article>
  <aside> ... </aside>
</main>
<footer> ... </footer>`}
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-orange-100 text-orange-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl">標籤</th>
                  <th className="text-left px-4 py-3 font-black">語意</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">使用場景</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['<header>', '頁首區塊', 'Logo、標題、頂部導覽'],
                  ['<nav>', '導覽連結', '主選單、麵包屑、分頁'],
                  ['<main>', '主要內容', '每個頁面只應有一個'],
                  ['<article>', '獨立文章', '部落格文章、新聞稿、討論串'],
                  ['<section>', '主題分段', '文章內的章節、功能區塊'],
                  ['<aside>', '附屬內容', '側欄、廣告、相關連結'],
                  ['<footer>', '頁尾區塊', '版權聲明、聯絡資訊'],
                ].map(([tag, sem, use]) => (
                  <tr key={tag} className="bg-white hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-orange-600 font-bold">{tag}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{sem}</td>
                    <td className="px-4 py-3 text-gray-500">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 2. CSS Box Model */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">2. CSS Box Model</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            每一個 HTML 元素都是一個「盒子」，由四層組成。理解 Box Model 是寫出精確排版的前提。
          </p>

          {/* Visual Box Model */}
          <div className="flex justify-center my-6">
            <div className="relative inline-block">
              {/* Margin */}
              <div className="bg-orange-100 border-2 border-dashed border-orange-300 p-8 rounded-2xl">
                <p className="text-orange-500 text-xs font-black absolute top-2 left-3">Margin（外距）</p>
                {/* Border */}
                <div className="bg-yellow-100 border-4 border-yellow-400 p-6 rounded-xl">
                  <p className="text-yellow-600 text-xs font-black absolute top-10 left-11">Border（邊框）</p>
                  {/* Padding */}
                  <div className="bg-green-100 border-2 border-dashed border-green-400 p-6 rounded-lg">
                    <p className="text-green-600 text-xs font-black absolute top-[72px] left-[76px]">Padding（內距）</p>
                    {/* Content */}
                    <div className="bg-blue-200 border-2 border-blue-400 px-8 py-4 rounded-md text-center">
                      <p className="text-blue-700 text-xs font-black">Content</p>
                      <p className="text-blue-600 text-[10px]">width × height</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InfoBox color="orange" title="box-sizing：最重要的 CSS 習慣">
            <p>• <strong>content-box（預設）</strong>：width 只計算 Content，Padding + Border 會加在外面，讓元素比你設定的更寬。</p>
            <p>• <strong>border-box（推薦）</strong>：width 包含 Content + Padding + Border，所見即所得，更直覺。</p>
            <p className="mt-2 font-medium">幾乎所有現代專案都會在全局設定 <code>* {'{'} box-sizing: border-box {'}'}</code></p>
          </InfoBox>

          <CodeBlock
            title="box-sizing 差異示範"
            code={`/* content-box（預設）：實際渲染寬度 = 200 + 20 + 20 = 240px */
.box-content {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;   /* 往外擴張 */
}

/* border-box（推薦）：實際渲染寬度 = 就是 200px */
.box-border {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;   /* 向內壓縮 content 空間 */
}

/* 全局設定（最佳實踐） */
*, *::before, *::after {
  box-sizing: border-box;
}`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 3. Flexbox */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">3. Flexbox 速查</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Flexbox 是<strong>一維排版</strong>工具，沿著主軸（Main Axis）排列子元素。
            設在父容器上的屬性控制排列方式，設在子元素上的屬性控制個別行為。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-blue-50">
              <CardBody className="p-6">
                <p className="font-black text-blue-800 mb-2">主軸（Main Axis）</p>
                <p className="text-sm text-blue-700">
                  <code>flex-direction: row</code> → 主軸是<strong>水平</strong>方向（預設）<br />
                  <code>flex-direction: column</code> → 主軸是<strong>垂直</strong>方向<br />
                  <code>justify-content</code> 控制主軸對齊
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 bg-purple-50">
              <CardBody className="p-6">
                <p className="font-black text-purple-800 mb-2">交叉軸（Cross Axis）</p>
                <p className="text-sm text-purple-700">
                  永遠垂直於主軸<br />
                  <code>align-items</code> 控制交叉軸對齊<br />
                  <code>align-self</code> 可覆蓋單一子元素的對齊
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl">屬性</th>
                  <th className="text-left px-4 py-3 font-black">常用值</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">說明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['display: flex', '—', '啟動 Flexbox，套用在父容器'],
                  ['flex-direction', 'row / column / row-reverse', '主軸方向'],
                  ['justify-content', 'flex-start / center / space-between / space-around', '主軸對齊'],
                  ['align-items', 'stretch / center / flex-start / flex-end', '交叉軸對齊'],
                  ['flex-wrap', 'nowrap / wrap', '子元素是否換行'],
                  ['gap', '8px / 1rem', '子元素間距（取代 margin hack）'],
                  ['flex: 1', '—', '子元素平均分配剩餘空間'],
                ].map(([prop, vals, desc]) => (
                  <tr key={prop} className="bg-white hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-blue-600 text-xs font-bold">{prop}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs font-mono">{vals}</td>
                    <td className="px-4 py-3 text-gray-700">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 4. Grid */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">4. Grid 速查</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Grid 是<strong>二維排版</strong>工具，同時控制列（rows）與欄（columns）。適合整體頁面佈局或複雜的表格式排列。
          </p>

          <CodeBlock
            title="Grid 核心語法"
            code={`/* 3 欄等寬 Grid */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 1fr = 1 份自由空間 */
  gap: 16px;
}

/* 響應式 Grid：自動決定欄數 */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

/* 子元素跨欄 */
.featured-card {
  grid-column: span 2;    /* 佔 2 欄 */
  grid-row: span 2;       /* 佔 2 列 */
}

/* 水平垂直置中（配合 Grid） */
.centered {
  display: grid;
  place-items: center;    /* = align-items + justify-items */
}`}
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-green-100 text-green-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl w-1/3">面向</th>
                  <th className="text-left px-4 py-3 font-black">Flexbox</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">Grid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['維度', '一維（單行或單列）', '二維（同時控制行與列）'],
                  ['適合場景', 'Navbar、按鈕群組、卡片水平排列', '整體頁面佈局、複雜表格'],
                  ['對齊方式', '主軸 + 交叉軸', '行軸 + 列軸（更精細）'],
                  ['子元素控制', 'flex-grow / shrink / basis', 'grid-column / row / span'],
                  ['Tailwind 寫法', 'flex gap-4 justify-between', 'grid grid-cols-3 gap-6'],
                ].map(([aspect, flex, grid]) => (
                  <tr key={aspect} className="bg-white hover:bg-green-50 transition-colors">
                    <td className="px-4 py-3 font-black text-gray-800">{aspect}</td>
                    <td className="px-4 py-3 text-gray-600">{flex}</td>
                    <td className="px-4 py-3 text-gray-600">{grid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 5. Selector Specificity */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">5. Selector 優先順序（Specificity）</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            當多個 CSS 規則套用到同一個元素時，瀏覽器用<strong>優先順序分數</strong>決定誰贏。
            分數格式是 (a, b, c, d)，數字越大越優先。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Inline Style', score: '(1,0,0,0)', color: 'bg-red-100 text-red-700 border-red-200', example: 'style="color:red"' },
              { label: 'ID Selector', score: '(0,1,0,0)', color: 'bg-orange-100 text-orange-700 border-orange-200', example: '#header' },
              { label: 'Class / Pseudo', score: '(0,0,1,0)', color: 'bg-blue-100 text-blue-700 border-blue-200', example: '.btn :hover' },
              { label: 'Element', score: '(0,0,0,1)', color: 'bg-gray-100 text-gray-600 border-gray-200', example: 'div h1' },
            ].map((item) => (
              <div key={item.label} className={`border rounded-2xl p-4 text-center ${item.color}`}>
                <p className="font-black text-sm mb-1">{item.label}</p>
                <p className="font-mono font-bold text-lg">{item.score}</p>
                <p className="text-xs mt-1 font-mono opacity-80">{item.example}</p>
              </div>
            ))}
          </div>

          <CodeBlock
            title="Specificity 計算範例"
            code={`/* Specificity: (0,0,0,1) → 最低 */
p { color: black; }

/* Specificity: (0,0,1,1) → class + element */
.text p { color: blue; }

/* Specificity: (0,1,0,1) → id + element */
#main p { color: green; }

/* Specificity: (1,0,0,0) → inline style，幾乎無法覆蓋 */
<p style="color: red;">文字</p>

/* 例外：!important 直接無視 specificity（不推薦濫用）*/
p { color: purple !important; }`}
          />

          <InfoBox color="amber" title="Specificity 計算口訣">
            <p>數「(a, b, c, d)」：</p>
            <p>• <strong>a</strong> = inline style 數量</p>
            <p>• <strong>b</strong> = ID selector 數量（#id）</p>
            <p>• <strong>c</strong> = class、attribute、pseudo-class 數量（.class, [type], :hover）</p>
            <p>• <strong>d</strong> = element、pseudo-element 數量（div, ::before）</p>
            <p className="mt-2">比較時從左到右，數字大的優先；分數相同則<strong>後寫的覆蓋前寫的</strong>。</p>
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 6. RWD */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">6. RWD 響應式設計</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            響應式設計（Responsive Web Design）讓網頁在不同螢幕尺寸下都能正常顯示。
            核心工具是 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">@media query</code>。
          </p>

          <CodeBlock
            title="Mobile-First 設計原則"
            code={`/* 1. Viewport meta tag（HTML head 必加） */
<meta name="viewport" content="width=device-width, initial-scale=1">

/* 2. Mobile-First：先寫手機版，再用 min-width 覆蓋 */
.container {
  padding: 16px;        /* 手機版（預設） */
  font-size: 14px;
}

@media (min-width: 768px) {    /* 768px 以上（平板） */
  .container {
    padding: 32px;
    font-size: 16px;
  }
}

@media (min-width: 1024px) {   /* 1024px 以上（桌機） */
  .container {
    padding: 48px;
    max-width: 1280px;
    margin: 0 auto;
  }
}`}
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-amber-100 text-amber-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl">Breakpoint</th>
                  <th className="text-left px-4 py-3 font-black">最小寬度</th>
                  <th className="text-left px-4 py-3 font-black">裝置</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">Tailwind Class 前綴</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['xs（預設）', '< 640px', '小手機', '無前綴（直接寫）'],
                  ['sm', '≥ 640px', '大手機 / 直式平板', 'sm:'],
                  ['md', '≥ 768px', '橫式平板', 'md:'],
                  ['lg', '≥ 1024px', '筆電', 'lg:'],
                  ['xl', '≥ 1280px', '桌機', 'xl:'],
                  ['2xl', '≥ 1536px', '大螢幕', '2xl:'],
                ].map(([bp, w, dev, tw]) => (
                  <tr key={bp} className="bg-white hover:bg-amber-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-amber-700">{bp}</td>
                    <td className="px-4 py-3 text-gray-700">{w}</td>
                    <td className="px-4 py-3 text-gray-600">{dev}</td>
                    <td className="px-4 py-3 font-mono text-orange-600 font-bold">{tw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 7. Position */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">7. CSS 定位（position）</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">position</code> 控制元素在文件流中的定位方式。
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">z-index</code> 控制堆疊順序，只對非 static 元素有效。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-purple-100 text-purple-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl">值</th>
                  <th className="text-left px-4 py-3 font-black">文件流</th>
                  <th className="text-left px-4 py-3 font-black">定位基準</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">常見使用場景</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['static', '在流中', '—', '預設值，正常排列'],
                  ['relative', '在流中', '自身原始位置', '微調位置、建立 absolute 的參考點'],
                  ['absolute', '脫離流', '最近的非 static 祖先', '懸浮標籤、Tooltip、下拉選單'],
                  ['fixed', '脫離流', 'Viewport（視窗）', 'Navbar、回到頂部按鈕、Cookie Banner'],
                  ['sticky', '混合', '滾動到閾值前：in flow；之後：fixed', '黏性標題、側欄目錄'],
                ].map(([val, flow, ref, use]) => (
                  <tr key={val} className="bg-white hover:bg-purple-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-purple-600">{val}</td>
                    <td className="px-4 py-3 text-gray-700">{flow}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{ref}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InfoBox color="blue" title="z-index 堆疊規則">
            <p>• <code>z-index</code> 只對 <code>position</code> 不是 <code>static</code> 的元素有效。</p>
            <p>• 數字越大，元素越靠近使用者（顯示在最上層）。</p>
            <p>• 同一個 Stacking Context 內比較有效；父元素建立新的 Stacking Context 時，子元素的 z-index 只在該 Context 內排序。</p>
            <p className="mt-2">• Tailwind 常用：<code>z-10</code>、<code>z-50</code>（Modal 常設 100+）</p>
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 8. 面試 Q&A */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">8. 面試常考題 Q&amp;A</h2>
          <p className="text-gray-600 leading-relaxed">以下是前端面試中關於 HTML / CSS 最常被問到的問題，附上可直接背誦的標準答案。</p>

          <div className="space-y-4">
            {[
              {
                q: 'box-sizing: border-box 和 content-box 差在哪？',
                a: 'content-box（預設）：width 只計算 content 區域，padding 和 border 會往外撐大元素。border-box：width 包含 content + padding + border，設定多少就是多少，不會意外撐大，是現代專案的標準選擇。',
              },
              {
                q: 'CSS 優先順序如何計算？',
                a: '從高到低：inline style (1,0,0,0) > ID selector (0,1,0,0) > class/pseudo-class (0,0,1,0) > element (0,0,0,1)。相同分數時後寫的覆蓋前寫的。!important 可無視所有計算，但應避免濫用。',
              },
              {
                q: 'Flexbox vs Grid 什麼時候用哪個？',
                a: 'Flexbox 是一維排版（沿一條軸排列），適合 Navbar、按鈕群組、卡片水平/垂直排列。Grid 是二維排版（同時控制行列），適合整體頁面佈局、複雜的表格式結構。不互斥，可以外 Grid 內 Flex。',
              },
              {
                q: 'position: absolute 是相對於什麼定位的？',
                a: '相對於最近的 position 不是 static 的祖先元素（通常設定 position: relative）。如果找不到這樣的祖先，就相對於 <html> 根元素定位。',
              },
              {
                q: '如何讓一個元素水平垂直置中（至少 3 種）？',
                a: '① Flexbox：父元素設 display:flex; justify-content:center; align-items:center。② Grid：父元素設 display:grid; place-items:center。③ 絕對定位：position:absolute; top:50%; left:50%; transform:translate(-50%,-50%)。',
              },
              {
                q: 'display: none vs visibility: hidden？',
                a: 'display:none 完全從文件流移除，不佔空間，會觸發 Reflow。visibility:hidden 隱藏元素但保留佔位空間，只觸發 Repaint。若要保持佈局穩定又隱藏元素，用 visibility:hidden；若要完全消失，用 display:none。',
              },
              {
                q: 'BFC（Block Formatting Context）是什麼？',
                a: 'BFC 是一個獨立的渲染區域，裡面的元素不會影響外部佈局。常見觸發方式：overflow 不為 visible、display:flex/grid/inline-block、position:absolute/fixed。BFC 的主要作用：① 清除浮動（內部 float 不溢出）② 防止 margin collapse（相鄰 block 的 margin 合併）。',
              },
            ].map(({ q, a }, i) => (
              <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-orange-100 text-orange-600 font-black text-sm px-2.5 py-1 rounded-full shrink-0">Q{i + 1}</span>
                    <p className="font-black text-gray-900">{q}</p>
                  </div>
                  <div className="pl-10">
                    <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep09-advanced-nav" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.09 — 部落格導航系統</p>
            <p className="text-sm text-gray-500 mt-1">配置驅動、即時搜尋、IntersectionObserver</p>
          </Link>
          <Link href="/blog/web-dev/ep11-bootstrap" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.11 — Bootstrap</p>
            <p className="text-sm text-gray-500 mt-1">12 欄 Grid 系統與元件庫</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['HTML', 'CSS', 'Box Model', 'Flexbox', 'Grid', 'RWD', 'EP.10'].map((tag) => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
