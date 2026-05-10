'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Info
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

/* ─── Inline Components ─────────────────────────────────────── */

const InfoBox = ({
  color,
  title,
  children,
}: {
  color: 'blue' | 'amber' | 'purple' | 'green';
  title: string;
  children: React.ReactNode;
}) => {
  const styles = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    amber: 'bg-amber-50 border-amber-200 text-amber-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
    green: 'bg-green-50 border-green-200 text-green-900',
  };
  return (
    <div className={`border rounded-2xl p-6 ${styles[color]}`}>
      <p className="font-black mb-3">{title}</p>
      <div className="text-sm leading-relaxed space-y-1.5">{children}</div>
    </div>
  );
};

/* ─── Page ──────────────────────────────────────────────────── */

export default function WebDevEP11Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.11</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium">網頁開發實戰</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
              Bootstrap 入門<br />
              <span className="text-purple-200">Grid 系統與元件庫</span>
            </h1>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl">
              12 欄 Grid、RWD Breakpoints、Utility classes —<br />
              與 Tailwind 設計哲學的核心差異
            </p>
            <div className="flex items-center gap-6 text-purple-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 9 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Bootstrap · Grid · RWD · Tailwind</span>
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
                <Quote size={32} className="text-purple-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-4">
                    「我第一次做網站就是用 Bootstrap，那時候只要加個 class 就有漂亮的按鈕，感覺像在施魔法。直到我開始用 Tailwind，才理解兩者設計哲學有多不同。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Bootstrap 是前端框架入門的第一課，也是許多後台系統的首選。
                    這篇把 12 欄 Grid、常用 Utility classes、核心元件整理成速查格式，
                    最後附上 Bootstrap vs Tailwind 的設計哲學比較，讓你面試時能說清楚兩者的取捨。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="opacity-30" />

        {/* 1. Bootstrap 是什麼 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">1. Bootstrap 是什麼</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Bootstrap 是由 Twitter 團隊開發的 CSS 框架，核心概念是<strong>元件驅動（Component-driven）</strong>：
            框架預先定義好按鈕、卡片、導覽列等元件的視覺樣式，開發者只需加上對應的 class 名稱即可套用。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-purple-50">
              <CardBody className="p-6">
                <p className="font-black text-purple-800 mb-2">Bootstrap 設計哲學</p>
                <p className="text-sm text-purple-700 leading-relaxed">
                  <strong>元件驅動（Component-driven）</strong>：框架提供完整的預設樣式元件。
                  你記住元件的 class 名稱，就能快速套用一致的視覺設計。
                  重視「快速可用」而非「完全自由」。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 bg-indigo-50">
              <CardBody className="p-6">
                <p className="font-black text-indigo-800 mb-2">Tailwind 設計哲學</p>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  <strong>Utility-first（原子類）</strong>：框架只提供單一功能的 utility class，
                  你自由組合這些原子 class 來構建設計。
                  重視「完全自由」而非「開箱即用」。
                </p>
              </CardBody>
            </Card>
          </div>

          <InfoBox color="purple" title="Bootstrap 5 的重要變化">
            <p>• <strong>移除 jQuery 依賴</strong>：Bootstrap 5 改用原生 JavaScript，套件體積大幅縮小，與現代框架（React、Vue）整合更乾淨。</p>
            <p>• Grid 系統底層改為 Flexbox（v4 開始，v5 延續），排版更彈性。</p>
            <p>• 新增 <code>xxl</code> breakpoint（≥1400px），支援更大螢幕。</p>
            <p>• 新增大量 Utility classes，向 Tailwind 的設計理念靠攏。</p>
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 2. 12 欄 Grid 系統 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">2. 12 欄 Grid 系統</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Bootstrap Grid 是框架最核心的功能，以<strong>12 欄為基礎</strong>進行版面分割。
            三層結構：<code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">container</code> →{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">row</code> →{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">col</code>。
          </p>

          {/* Visual: col-md-6 兩欄示範 */}
          <div className="space-y-3">
            <p className="font-black text-gray-700 text-sm uppercase tracking-wide">視覺示範：col-md-6（兩等欄）</p>
            <div className="border-2 border-dashed border-purple-300 rounded-2xl p-3 bg-white">
              <p className="text-xs text-purple-500 font-mono mb-2 px-1">.container</p>
              <div className="border border-dashed border-indigo-300 rounded-xl p-2 bg-indigo-50/40">
                <p className="text-xs text-indigo-500 font-mono mb-2 px-1">.row</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-purple-100 border border-purple-300 rounded-lg px-4 py-5 text-center">
                    <p className="font-mono text-purple-700 text-sm font-bold">.col-md-6</p>
                    <p className="text-purple-500 text-xs mt-1">6/12 欄 = 50%</p>
                  </div>
                  <div className="bg-violet-100 border border-violet-300 rounded-lg px-4 py-5 text-center">
                    <p className="font-mono text-violet-700 text-sm font-bold">.col-md-6</p>
                    <p className="text-violet-500 text-xs mt-1">6/12 欄 = 50%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock lang="html"
            title="Bootstrap Grid 基本語法"
            code={`<!-- 三層結構：container > row > col -->
<div class="container">
  <div class="row">
    <!-- 兩欄等寬：各佔 6/12 = 50% -->
    <div class="col-md-6">左欄內容</div>
    <div class="col-md-6">右欄內容</div>
  </div>

  <div class="row">
    <!-- 三欄：4+4+4 = 12 -->
    <div class="col-md-4">第一欄</div>
    <div class="col-md-4">第二欄</div>
    <div class="col-md-4">第三欄</div>
  </div>

  <div class="row">
    <!-- 側欄佈局：3+9 = 12 -->
    <div class="col-md-3">側欄</div>
    <div class="col-md-9">主內容</div>
  </div>
</div>`}
          />

          {/* Breakpoints 表格 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-purple-100 text-purple-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl">Breakpoint</th>
                  <th className="text-left px-4 py-3 font-black">螢幕寬度</th>
                  <th className="text-left px-4 py-3 font-black">Class 前綴</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">適用裝置</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['xs（預設）', '< 576px', 'col-', '小手機'],
                  ['sm', '≥ 576px', 'col-sm-', '大手機'],
                  ['md', '≥ 768px', 'col-md-', '平板'],
                  ['lg', '≥ 992px', 'col-lg-', '筆電'],
                  ['xl', '≥ 1200px', 'col-xl-', '桌機'],
                  ['xxl', '≥ 1400px', 'col-xxl-', '大螢幕（v5 新增）'],
                ].map(([bp, w, cls, dev]) => (
                  <tr key={bp} className="bg-white hover:bg-purple-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-purple-700">{bp}</td>
                    <td className="px-4 py-3 text-gray-700">{w}</td>
                    <td className="px-4 py-3 font-mono text-indigo-600 font-bold">{cls}</td>
                    <td className="px-4 py-3 text-gray-500">{dev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InfoBox color="blue" title="進階：offset 與 order">
            <p>• <code>offset-md-3</code>：向右偏移 3 欄（在左側製造空白間距），常用於置中單一欄。</p>
            <p>• <code>order-md-2</code>：在 md 以上的螢幕中，將該欄排到第 2 個位置（不改變 HTML 順序，純 CSS 視覺重排）。</p>
            <p className="mt-2">使用場景：手機版希望圖片在文字上面，但桌機版圖片在右側時，可用 order 調整順序而不動 HTML 結構。</p>
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 3. 常用 Utility Classes */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">3. 常用 Utility Classes 速查</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Bootstrap 5 大量擴充了 Utility classes，讓你不需要寫自定義 CSS 就能快速調整樣式。
            數字通常代表倍數（1 = 0.25rem, 2 = 0.5rem, 3 = 1rem, 4 = 1.5rem, 5 = 3rem）。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-violet-100 text-violet-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl w-1/4">分類</th>
                  <th className="text-left px-4 py-3 font-black w-1/3">Class</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">效果</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Spacing', 'mt-3 / mb-4 / px-4 / py-2', 'margin-top:1rem / margin-bottom:1.5rem / padding 水平 / 垂直'],
                  ['Spacing', 'mx-auto', '水平置中（需設定寬度）'],
                  ['Flex', 'd-flex', 'display: flex'],
                  ['Flex', 'justify-content-between', 'justify-content: space-between'],
                  ['Flex', 'align-items-center', 'align-items: center'],
                  ['Flex', 'flex-column / gap-3', 'flex-direction:column / gap:1rem'],
                  ['Display', 'd-none / d-md-block', '隱藏 / md 以上才顯示（RWD 顯示控制）'],
                  ['Text', 'text-center / fw-bold', '文字置中 / font-weight:700'],
                  ['Text', 'text-muted / fs-5', '灰色輔助文字 / font-size:1.25rem'],
                  ['Color', 'bg-primary / bg-light', '主色背景 / 淺灰背景'],
                  ['Color', 'text-danger / text-success', '紅色文字（錯誤）/ 綠色文字（成功）'],
                ].map(([cat, cls, effect], i) => (
                  <tr key={i} className="bg-white hover:bg-violet-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="bg-violet-100 text-violet-700 font-bold text-xs px-2.5 py-1 rounded-full">{cat}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-indigo-600 font-bold text-xs">{cls}</td>
                    <td className="px-4 py-3 text-gray-600">{effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 4. 常用元件 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">4. 常用元件</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Bootstrap 的元件只需套用對應的 class 組合即可獲得預設樣式。以下是最常用的四組元件。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Navbar */}
            <Card className="border-0 shadow-sm">
              <CardBody className="p-6 space-y-3">
                <p className="font-black text-gray-900">Navbar</p>
                <CodeBlock lang="html"
                  title="navbar"
                  code={`<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" ...>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active">首頁</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`}
                />
                <p className="text-xs text-gray-500">
                  <code className="bg-gray-100 px-1 rounded">navbar-expand-lg</code>：lg 以上展開，以下收合成漢堡選單。
                </p>
              </CardBody>
            </Card>

            {/* Button */}
            <Card className="border-0 shadow-sm">
              <CardBody className="p-6 space-y-3">
                <p className="font-black text-gray-900">Button</p>
                <CodeBlock lang="html"
                  title="btn"
                  code={`<!-- 實心按鈕 -->
<button class="btn btn-primary">送出</button>
<button class="btn btn-danger">刪除</button>
<button class="btn btn-secondary">取消</button>

<!-- 空心按鈕（outline）-->
<button class="btn btn-outline-primary">編輯</button>
<button class="btn btn-outline-secondary">詳情</button>

<!-- 尺寸控制 -->
<button class="btn btn-primary btn-sm">小按鈕</button>
<button class="btn btn-primary btn-lg">大按鈕</button>`}
                />
              </CardBody>
            </Card>

            {/* Card */}
            <Card className="border-0 shadow-sm">
              <CardBody className="p-6 space-y-3">
                <p className="font-black text-gray-900">Card</p>
                <CodeBlock lang="html"
                  title="card"
                  code={`<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">標題</h5>
    <p class="card-text">內文描述...</p>
    <a href="#" class="btn btn-primary">了解更多</a>
  </div>
</div>`}
                />
              </CardBody>
            </Card>

            {/* Badge + Alert */}
            <Card className="border-0 shadow-sm">
              <CardBody className="p-6 space-y-3">
                <p className="font-black text-gray-900">Badge &amp; Alert</p>
                <CodeBlock lang="html"
                  title="badge / alert"
                  code={`<!-- Badge：行內標籤 -->
<span class="badge bg-success">完成</span>
<span class="badge bg-danger">錯誤</span>
<span class="badge bg-warning text-dark">警告</span>
<span class="badge bg-primary rounded-pill">99+</span>

<!-- Alert：通知區塊 -->
<div class="alert alert-warning" role="alert">
  注意：這個操作無法復原。
</div>
<div class="alert alert-success alert-dismissible fade show">
  操作成功！
  <button type="button" class="btn-close" data-bs-dismiss="alert">
</div>`}
                />
              </CardBody>
            </Card>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 5. Bootstrap vs Tailwind 比較表 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">5. Bootstrap vs Tailwind 設計哲學比較</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            這是面試最常被問到的問題。兩者都是優秀的 CSS 框架，差異在於設計哲學的根本不同——不是誰比誰好，而是<strong>適用場景不同</strong>。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-purple-100 text-purple-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl w-1/4">面向</th>
                  <th className="text-left px-4 py-3 font-black w-[37.5%]">Bootstrap</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">Tailwind</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['設計方式', '元件驅動（預設樣式）', 'Utility-first（原子類）'],
                  ['客製化', '需 override 預設 CSS（Specificity 戰爭）', '完全自由組合，沒有需要覆蓋的預設值'],
                  ['學習曲線', '低（記元件 class 名稱即可）', '中（需記住 utility 命名規則）'],
                  ['打包大小', '~50KB gzipped（含 JS 套件）', 'JIT 依使用量極小（只打包用到的 class）'],
                  ['設計一致性', 'Bootstrap 風格明顯，辨識度高', '完全自訂，可實現任何設計系統'],
                  ['適合場景', '快速原型、後台管理系統、傳統 MPA', '品牌設計系統、SPA、現代前端框架'],
                ].map(([aspect, bs, tw]) => (
                  <tr key={aspect} className="bg-white hover:bg-purple-50 transition-colors">
                    <td className="px-4 py-3 font-black text-gray-800">{aspect}</td>
                    <td className="px-4 py-3 text-gray-600">{bs}</td>
                    <td className="px-4 py-3 text-gray-600">{tw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InfoBox color="green" title="實務選擇建議">
            <p>• <strong>選 Bootstrap</strong>：團隊有設計師但沒有設計系統、需要快速交付後台介面、與 jQuery 或傳統後端框架整合。</p>
            <p>• <strong>選 Tailwind</strong>：使用 React / Next.js 建構品牌網站、需要完全掌控設計細節、團隊習慣 component-based 開發模式。</p>
            <p className="mt-2">兩者也可以並用：用 Bootstrap Grid 做版面、用 Tailwind utilities 做細節調整（不常見，但可行）。</p>
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 6. 面試常考題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">6. 面試常考題 Q&amp;A</h2>
          <p className="text-gray-600 leading-relaxed">以下是關於 Bootstrap 面試最常被問到的問題，附上完整可背誦的答案框架。</p>

          <div className="space-y-4">
            {[
              {
                q: 'Bootstrap Grid 的 12 欄是如何工作的？',
                a: 'Bootstrap 將水平空間等分為 12 欄，開發者透過 col-{n} 指定元素佔幾欄。例如 col-6 佔一半，col-4 佔三分之一。父層需有 row class 來設定 flexbox 容器並處理負 margin，row 外層需有 container 或 container-fluid 來設定最大寬度與水平 padding。',
              },
              {
                q: 'col-md-6 代表什麼？',
                a: 'md 是 breakpoint 前綴，代表「螢幕寬度 ≥ 768px 時生效」；6 代表佔 12 欄中的 6 欄（即 50%）。在 md 以下（手機），若沒有指定更小的 breakpoint class，元素預設佔滿整行（100%）。可以疊加不同 breakpoint：col-12 col-md-6 col-lg-4 讓元素在手機全寬、平板半寬、桌機三分之一。',
              },
              {
                q: '如何在 Bootstrap 中覆蓋預設樣式？',
                a: '有三種方法：① 提高 Specificity：用更具體的 selector（如 #myForm .btn）覆蓋 Bootstrap 的樣式；② 在載入 Bootstrap 後引入自定義 CSS 檔案，利用後寫覆蓋先寫的規則；③ 最後手段用 !important，但會破壞 CSS 的可維護性，應避免濫用。最佳實踐是用 SCSS 覆蓋 Bootstrap 的變數（$primary、$font-size-base 等）後重新編譯。',
              },
              {
                q: 'Bootstrap 5 相較 v4 的主要改變？',
                a: '最重要的三點：① 移除 jQuery 依賴，改用原生 JavaScript，相容現代框架；② 新增 xxl breakpoint（≥1400px）；③ 移除 IE 10/11 支援，讓框架可以使用更多現代 CSS 特性。此外 Grid 系統支援 CSS Grid 模式、新增 Offcanvas、Accordion 等元件，RTL（從右到左語言）支援也大幅改善。',
              },
              {
                q: '你會選 Bootstrap 還是 Tailwind？請說明理由。',
                a: '取決於專案類型。如果是需要快速交付的後台管理介面，我會選 Bootstrap：元件現成、學習成本低、不需要設計師就能做出一致的 UI。如果是品牌形象網站或使用 React 的 SPA，我會選 Tailwind：完全掌控設計、JIT 打包體積小、與 component 架構整合更自然。目前個人專案我主要用 Tailwind，因為設計自由度更高，但我也有在後台系統中用 Bootstrap 的實際經驗。',
              },
            ].map(({ q, a }, i) => (
              <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-100 text-purple-700 font-black text-sm px-2.5 py-1 rounded-full shrink-0">Q{i + 1}</span>
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
          <Link href="/blog/web-dev/ep10-html-css" className="group block bg-gray-50 hover:bg-purple-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-purple-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">EP.10 — HTML / CSS 核心概念</p>
            <p className="text-sm text-gray-500 mt-1">Box Model、Flexbox、Grid、RWD、Specificity</p>
          </Link>
          <Link href="/blog/web-dev/ep12-git" className="group block bg-gray-50 hover:bg-purple-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">EP.12 — Git 版本控制</p>
            <p className="text-sm text-gray-500 mt-1">分支策略、Merge vs Rebase、衝突解決</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Bootstrap', 'CSS', 'Grid', 'RWD', '元件庫', 'Tailwind', 'EP.11'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
