'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CodeBlock = ({ code, title, lang = 'tsx' }: { code: string; title?: string; lang?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? lang}</span>
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
  </div>
);

const Callout = ({ type, children }: { type: 'info' | 'warn' | 'tip'; children: React.ReactNode }) => {
  const styles = { info: 'bg-blue-50 border-blue-100 text-blue-800', warn: 'bg-amber-50 border-amber-100 text-amber-800', tip: 'bg-green-50 border-green-100 text-green-800' };
  const icons = { info: '💡', warn: '⚠️', tip: '✅' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3"><span className="text-xl shrink-0">{icons[type]}</span><div className="text-sm leading-relaxed">{children}</div></div>
    </div>
  );
};

// 互動 demo 元件
function LiveDemo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-black text-gray-400 uppercase tracking-wider">{label}</p>
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 flex items-center justify-center min-h-[140px]">
        {children}
      </div>
    </div>
  );
}

export default function WebDevEP07Page() {
  const [visible, setVisible] = useState(true);
  const [listItems, setListItems] = useState([1, 2, 3]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-900 via-rose-900 to-slate-900">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(244,114,182,0.6) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(251,113,133,0.4) 0%, transparent 50%)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-pink-500/20 text-pink-300 border-pink-500/30 font-bold uppercase text-[10px]">個人網頁開發</Chip>
              <Chip size="sm" variant="flat" className="bg-pink-500/20 text-pink-300 border-pink-500/30 font-bold uppercase text-[10px]">EP.07</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Framer Motion<br />
              <span className="text-pink-300">讓頁面元素動起來</span>
            </h1>
            <p className="text-rose-200 text-lg font-medium max-w-2xl mx-auto">
              我的網頁所有滑入、淡出、滾動觸發動畫都靠它，<br />
              幾行程式碼就能讓靜態頁面瞬間有生命感
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-pink-100 text-pink-600 p-2.5 rounded-full"><User size={18} /></div>
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
            你有沒有注意到，打開我的個人網頁時，頁面上的元素不是「突然出現」，而是從下方滑入、逐漸淡出？滾動到某個區塊時，卡片一張一張延遲出現？
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這些全都來自 <strong>Framer Motion</strong>。它的設計哲學很簡單：<strong>把動畫寫成 props，不是 CSS keyframes</strong>。
          </p>
          <CodeBlock title="你已經在我的網頁裡看過無數次的這段" code={`<motion.div
  initial={{ opacity: 0, y: 20 }}   // 從這個狀態開始
  animate={{ opacity: 1, y: 0 }}    // 動畫到這個狀態
  transition={{ duration: 0.6 }}    // 花 0.6 秒
>
  <h1>Joseph Chen</h1>
</motion.div>`} />
          <p className="text-gray-700 leading-relaxed">
            這篇帶你從基礎到實際用法，全部都是我的網頁裡真實出現的動畫。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* PART 1: motion.div */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">1. motion 元件 — 最基本的概念</h2>
          <p className="text-gray-700 leading-relaxed">
            Framer Motion 的用法是把原本的 HTML 元素換成 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">motion.</code> 版本：
          </p>
          <CodeBlock title="" code={`// 原本
<div>...</div>
<h1>...</h1>
<section>...</section>

// 加上動畫能力
<motion.div>...</motion.div>
<motion.h1>...</motion.h1>
<motion.section>...</motion.section>`} />
          <p className="text-gray-700 leading-relaxed">
            換成 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">motion.div</code> 之後，原本 div 的所有行為都保留，只是多了動畫 props 可以用。
          </p>
          <Callout type="info">
            <strong>記得 import！</strong> 使用前需要引入：
            <code className="block bg-blue-100 rounded-lg p-2 mt-1 font-mono text-xs">import {'{'} motion {'}'} from 'framer-motion';</code>
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* PART 2: initial + animate */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">2. initial + animate — 進場動畫</h2>
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">initial</code> 是元件出現前的狀態，<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">animate</code> 是最終狀態。Framer Motion 自動補間兩者之間的動畫。
          </p>

          <div className="space-y-6">
            {/* 淡入 */}
            <div className="space-y-3">
              <p className="font-black text-gray-900">淡入（fade in）</p>
              <CodeBlock title="" code={`<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>`} />
              <LiveDemo label="效果預覽（重新整理頁面可看到）">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
                  className="bg-pink-500 text-white px-6 py-3 rounded-xl font-black"
                >
                  淡入淡出
                </motion.div>
              </LiveDemo>
            </div>

            {/* 從下方滑入 */}
            <div className="space-y-3">
              <p className="font-black text-gray-900">從下方滑入（最常用）</p>
              <CodeBlock title="我的首頁 Hero 區塊用的動畫" code={`<motion.div
  initial={{ opacity: 0, y: 20 }}  // 透明 + 往下 20px
  animate={{ opacity: 1, y: 0 }}   // 不透明 + 回到原位
  transition={{ duration: 0.6 }}
>`} />
              <LiveDemo label="效果預覽（可點「重播」）">
                <div className="text-center space-y-3">
                  <motion.div
                    key={visible ? 'show' : 'hide'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg"
                  >
                    從下方滑入
                  </motion.div>
                  <button
                    onClick={() => { setVisible(false); setTimeout(() => setVisible(true), 100); }}
                    className="text-xs font-bold text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    ↻ 重播
                  </button>
                </div>
              </LiveDemo>
            </div>

            {/* 從左方滑入 */}
            <div className="space-y-3">
              <p className="font-black text-gray-900">從左方滑入</p>
              <CodeBlock title="我的首頁文字區塊用的動畫" code={`<motion.div
  initial={{ opacity: 0, x: -30 }}  // 往左 30px
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>`} />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50"><tr>
                <th className="text-left p-4 font-black text-gray-700">常用屬性</th>
                <th className="text-left p-4 font-black text-gray-700">說明</th>
                <th className="text-left p-4 font-black text-gray-700">典型值</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50 font-mono text-xs">
                {[
                  ['opacity', '透明度', '0 → 1'],
                  ['y', '垂直位移（正 = 往下）', '20 → 0 或 -20 → 0'],
                  ['x', '水平位移（正 = 往右）', '-30 → 0 或 30 → 0'],
                  ['scale', '縮放', '0.8 → 1'],
                  ['rotate', '旋轉角度', '90 → 0'],
                ].map(([p, d, v]) => (
                  <tr key={p}><td className="p-4 text-pink-700 font-black">{p}</td><td className="p-4 text-gray-600 font-sans">{d}</td><td className="p-4 text-gray-400">{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* PART 3: transition */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">3. transition — 控制動畫節奏</h2>
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">transition</code> 控制動畫的時間、緩動和延遲：
          </p>
          <CodeBlock title="transition 完整範例" code={`<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.6,    // 持續時間（秒）
    delay: 0.2,       // 延遲幾秒後開始
    ease: "easeOut",  // 緩動函式：開始快、結尾慢（最自然）
  }}
>`} />

          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6 space-y-4">
            <p className="font-black text-pink-800">delay 的妙用：讓元素「逐一出現」</p>
            <p className="text-pink-700 text-sm leading-relaxed">
              我的 blog/page.tsx 裡的每個系列卡片，用 index × 0.1 製造錯開效果，讓卡片一張一張依序出現，而不是全部同時跳出：
            </p>
            <CodeBlock title="blog/page.tsx — 逐一出現效果" code={`{series.map((s, i) => (
  <motion.section
    key={s.id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: i * 0.1,  // i=0 → 0s, i=1 → 0.1s, i=2 → 0.2s
    }}
  >
    <SeriesSection s={s} />
  </motion.section>
))}`} />
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* PART 4: whileInView */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">4. whileInView — 滾動觸發動畫</h2>
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">animate</code> 是頁面載入時立刻播放。但我更常用 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">whileInView</code>：
            <strong>等到元素滾動進入視窗時才觸發動畫</strong>。
          </p>
          <p className="text-gray-700 leading-relaxed">
            這讓使用者滾動到任何區塊都有「內容飛入」的感覺，而不是一開始全部動完之後就靜止了。
          </p>
          <CodeBlock title="whileInView 基本用法" code={`<motion.div
  initial={{ opacity: 0, y: 24 }}     // 初始：透明 + 往下
  whileInView={{ opacity: 1, y: 0 }}  // 滾動到視窗內：動畫到這
  viewport={{ once: true }}           // once: true = 只觸發一次，不要每次滾回去都重播
  transition={{ duration: 0.5 }}
>`} />

          <Callout type="tip">
            <strong>viewport={'{'} once: true {'}'}</strong> 非常重要！
            <ul className="mt-1 space-y-0.5 list-disc list-inside">
              <li><strong>once: true</strong> — 滾動到時播放一次，往上捲再回來不重播（推薦）</li>
              <li><strong>once: false（預設）</strong> — 每次進出視窗都重播，通常太吵</li>
            </ul>
          </Callout>

          <p className="text-gray-700 leading-relaxed">
            我的每一篇文章頁面都大量使用 whileInView，讓讀者越往下滾、內容越活躍：
          </p>
          <CodeBlock title="文章頁面的區塊動畫" code={`// 每個 section 滾動進來時淡入
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="space-y-6"
>
  <h2>這個章節的標題</h2>
  ...
</motion.section>`} />
        </section>

        <Divider className="opacity-30" />

        {/* PART 5: whileHover / whileTap */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">5. whileHover / whileTap — 互動反饋</h2>
          <p className="text-gray-700 leading-relaxed">
            除了進場動畫，Framer Motion 還能處理 hover 和點擊的微互動，讓按鈕、卡片有「按下去」的手感：
          </p>
          <CodeBlock title="" code={`<motion.button
  whileHover={{ scale: 1.05 }}   // hover 時放大 5%
  whileTap={{ scale: 0.95 }}     // 點擊時縮小 5%（按壓感）
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  點我
</motion.button>`} />
          <LiveDemo label="試試看 — 滑鼠移上去、點一下">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg cursor-pointer"
            >
              滑我 / 點我
            </motion.button>
          </LiveDemo>

          <Callout type="info">
            <code>type: "spring"</code> 是彈簧緩動，比一般 easeOut 更有彈性、更自然。
            <code>stiffness</code>（彈簧硬度）越高越快，<code>damping</code>（阻尼）越高越少回彈。
            <code>stiffness: 400, damping: 17</code> 是我最喜歡的組合，快速且稍微回彈一下。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* PART 6: AnimatePresence */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">6. AnimatePresence — 離場動畫</h2>
          <p className="text-gray-700 leading-relaxed">
            正常的 React 元件消失時是瞬間消失的。<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">AnimatePresence</code> 讓元件可以有「離場動畫」，等動畫播完才真正從 DOM 移除：
          </p>
          <CodeBlock title="" code={`import { AnimatePresence, motion } from 'framer-motion';

function ToggleBox({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}    // ← 離場時的狀態
          transition={{ duration: 0.3 }}
        >
          這個內容會平滑收起
        </motion.div>
      )}
    </AnimatePresence>
  );
}`} />
          <LiveDemo label="展開/收起 demo">
            <div className="space-y-3 w-full max-w-sm">
              <button
                onClick={() => setVisible(!visible)}
                className="w-full bg-pink-100 hover:bg-pink-200 text-pink-700 font-black px-4 py-2 rounded-xl transition-colors text-sm"
              >
                {visible ? '收起' : '展開'}
              </button>
              <AnimatePresence>
                {visible && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 text-pink-700 text-sm font-medium">
                      這段內容會平滑展開和收起，不是瞬間跳動。
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </LiveDemo>
        </section>

        <Divider className="opacity-30" />

        {/* 完整案例 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">完整案例：我的首頁動畫架構</h2>
          <p className="text-gray-700 leading-relaxed">
            把以上學到的全部組合起來，這是我的首頁 Hero 區塊的完整動畫寫法：
          </p>
          <CodeBlock title="app/page.tsx — Hero 區塊（動畫部分）" code={`'use client';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <section className="pt-20 pb-32">
      {/* 文字區塊：從左滑入 */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>I think, therefore I am</h1>
        <Button>View Resume</Button>
      </motion.div>

      {/* 圖片區塊：從右滑入，延遲 0.2 秒 */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image src="/profile.png" />
      </motion.div>

      {/* 技術標籤：從下方滑入，再延遲 0.4 秒 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* 技術 Chip 們 */}
      </motion.div>
    </section>
  );
}`} />
          <Callout type="tip">
            <strong>文字和圖片錯開進場</strong>是我網頁最核心的動畫效果。文字從左、圖片從右、標籤從下，三個方向加上遞增 delay，製造「內容逐步建立」的層次感。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-pink-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🎬', text: 'motion.div = 原本的 div + 動畫能力，所有 HTML 元素都有對應的 motion.xxx 版本' },
                { emoji: '▶️', text: 'initial（起始狀態）+ animate（目標狀態）= 頁面載入時播放的進場動畫' },
                { emoji: '⏱️', text: 'transition 控制 duration（時間）、delay（延遲）、ease（緩動）' },
                { emoji: '📜', text: 'whileInView + viewport={{once:true}} = 滾動到時才觸發，只觸發一次' },
                { emoji: '🖱️', text: 'whileHover + whileTap + spring = 有彈性的按壓互動感' },
                { emoji: '✨', text: 'AnimatePresence + exit = 元件消失時有離場動畫，不再瞬間消失' },
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
          <Link href="/blog/web-dev-ep06-heroui" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.06 — HeroUI 元件庫</p>
            <p className="text-sm text-gray-500 mt-1">Card、Button、Chip 現成積木</p>
          </Link>
          <Link href="/blog/web-dev-ep08-vercel-deploy" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.08 — Vercel 部署上線</p>
            <p className="text-sm text-gray-500 mt-1">GitHub push → 自動部署，免費上線</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Web Dev', 'Framer Motion', '動畫', 'whileInView', 'EP.07'].map((tag) => (
            <Chip key={tag} variant="flat" color="danger" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
