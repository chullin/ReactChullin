'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Heart,
  Code2,
  Keyboard,
  Palette,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lightbulb,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function WebDevEP29() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.29</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web Dev Bootcamp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              無障礙設計（a11y）：<br />
              <span className="text-cyan-200">讓每個人都能使用你的網站</span>
            </h1>
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl">
              ARIA 屬性、語義化 HTML、鍵盤導航、色彩對比 — 前端面試越來越常考，也是做好產品的必修課
            </p>
            <div className="flex items-center gap-6 text-cyan-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> ARIA · WCAG · Keyboard</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：為什麼要做無障礙設計 ──────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-cyan-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Globe className="text-cyan-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：為什麼要做無障礙設計
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                根據 WHO 數據，全球約有 <strong>15% 的人口（約 13 億人）</strong>有某種形式的障礙。這包括視障（使用螢幕閱讀器）、聽障（需要字幕）、行動障礙（只能使用鍵盤或語音輸入）、以及認知障礙（需要清晰的排版與語言）。
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-3">受影響的族群</p>
                  <ul className="text-blue-600 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">👁️</span>
                      <span><strong>視障</strong>：使用螢幕閱讀器（NVDA、VoiceOver）逐字聆聽頁面</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">👂</span>
                      <span><strong>聽障</strong>：影片需要字幕、不依賴聲音提示</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🖐️</span>
                      <span><strong>行動障礙</strong>：只用鍵盤、語音、眼動儀操作</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🧠</span>
                      <span><strong>認知障礙</strong>：需要簡單清晰的語言與結構</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="font-semibold text-teal-700 mb-3">為什麼你應該在意</p>
                  <ul className="text-teal-600 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-0.5 shrink-0" />
                      <span><strong>法律要求</strong>：美國 ADA、歐盟 EAA、台灣身心障礙者權益保障法</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-0.5 shrink-0" />
                      <span><strong>SEO 提升</strong>：語義化 HTML 讓搜尋引擎更理解頁面結構</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-0.5 shrink-0" />
                      <span><strong>更大的用戶群</strong>：覆蓋更多用戶 = 更多潛在客戶</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="mt-0.5 shrink-0" />
                      <span><strong>前端面試考點</strong>：越來越多企業在面試時詢問 a11y</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl border border-cyan-200">
                <div className="flex items-start gap-3">
                  <Lightbulb className="text-cyan-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-semibold text-cyan-800 mb-1">斜坡效應（Curb Cut Effect）</p>
                    <p className="text-cyan-700 text-sm leading-relaxed">
                      無障礙設計不是特殊功能，而是正確的設計。就像路邊的斜坡，不只讓輪椅用戶受益，也讓推嬰兒車的家長、搬貨的工人都更方便。網頁上的鍵盤導航，不只服務行動障礙用戶，也讓喜歡鍵盤操作的工程師效率更高。
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：語義化 HTML ─────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-teal-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Code2 className="text-teal-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：語義化 HTML — 最低成本的無障礙
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                語義化 HTML 是無障礙設計的地基。螢幕閱讀器依賴 HTML 元素本身的「語義」來理解頁面結構，告訴用戶「這是一個導覽列」、「這是主要內容」、「這是一個按鈕」。使用正確的元素幾乎不需要額外程式碼，卻能大幅提升可訪問性。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-4">壞 vs 好的 HTML 結構對比</h3>
              <CodeBlock language="html">
{` <!-- ❌ 不語義化：全是 div，螢幕閱讀器無法理解任何結構 -->
<div class="header">
  <div class="nav">
    <div class="nav-item" onclick="navigate()">首頁</div>
    <div class="nav-item" onclick="navigate('/about')">關於</div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title">文章標題</div>
    <div class="content">內容...</div>
  </div>
</div>
<div class="footer">版權所有</div>

<!-- ✅ 語義化：結構清晰，螢幕閱讀器能自動理解頁面架構 -->
<header>
  <nav>
    <a href="/">首頁</a>
    <a href="/about">關於</a>
  </nav>
</header>
<main>
  <article>
    <h1>文章標題</h1>
    <p>內容...</p>
  </article>
</main>
<footer>版權所有</footer> `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-4 mt-8">常用語義化元素速查表</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                      <th className="px-4 py-3 text-left rounded-tl-lg font-semibold">元素</th>
                      <th className="px-4 py-3 text-left rounded-tr-lg font-semibold">用途與說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['<header>', '頁面或區塊的頭部，可包含 Logo、導覽、搜尋列'],
                      ['<nav>', '導覽連結群組，螢幕閱讀器會宣告「導覽區域」'],
                      ['<main>', '主要內容（每頁只有一個），螢幕閱讀器可跳轉到此'],
                      ['<article>', '獨立完整的內容單元，例如文章、卡片、留言'],
                      ['<section>', '有標題的內容區塊，比 div 更有語義'],
                      ['<aside>', '側欄、補充資訊，與主要內容相關但非核心'],
                      ['<footer>', '頁面或區塊的底部，版權、連結等'],
                      ['<button>', '可點擊的操作按鈕，絕對不要用 div 代替'],
                      ['<a href>', '連結，絕對不要用 div onclick 代替'],
                      ['<h1>~<h6>', '標題層級，結構要合理（不跳級）'],
                      ['<label>', '表單欄位的說明文字，必須與 input 關聯'],
                      ['<figure> / <figcaption>', '圖表與說明文字的語義組合'],
                    ].map(([elem, desc], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-mono text-cyan-700 font-medium whitespace-nowrap">{elem}</td>
                        <td className="px-4 py-3 text-gray-600">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  <p className="text-amber-800 text-sm leading-relaxed">
                    <strong>最常見的錯誤：</strong>用 <code className="bg-amber-100 px-1 rounded">{'<div onClick>'}</code> 模擬按鈕，或用 <code className="bg-amber-100 px-1 rounded">{'<div class="link">'}</code> 模擬連結。這些元素本身不具備鍵盤可訪問性（無法用 Tab 聚焦，無法用 Enter 觸發），也不會被螢幕閱讀器識別為互動元素。永遠用 <code className="bg-amber-100 px-1 rounded">{'<button>'}</code> 和 <code className="bg-amber-100 px-1 rounded">{'<a href>'}</code>。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：ARIA ────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-cyan-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Heart className="text-cyan-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：ARIA — 讓螢幕閱讀器理解你的 UI
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                ARIA（Accessible Rich Internet Applications）是一組 HTML 屬性，讓螢幕閱讀器理解原生 HTML 無法表達的複雜 UI 元件，例如自訂的下拉選單、Modal、Tab 切換等。ARIA 分為三大類別：
              </p>

              <div className="grid md:grid-cols-3 gap-3 mb-6">
                {[
                  { title: 'role', desc: '告訴螢幕閱讀器「這是什麼」', example: 'role="dialog"', color: 'blue' },
                  { title: 'aria-* 屬性', desc: '描述「狀態、關係、說明」', example: 'aria-expanded="true"', color: 'cyan' },
                  { title: 'aria-live', desc: '動態更新時自動通知', example: 'aria-live="polite"', color: 'teal' },
                ].map(({ title, desc, example, color }) => (
                  <div key={title} className={`p-4 bg-${color}-50 rounded-lg border border-${color}-200`}>
                    <p className={`font-bold text-${color}-700 mb-1`}>{title}</p>
                    <p className={`text-${color}-600 text-xs mb-2`}>{desc}</p>
                    <code className={`bg-${color}-100 text-${color}-800 text-xs px-2 py-1 rounded block`}>{example}</code>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">1. role — 告訴螢幕閱讀器「這是什麼」</h3>
              <CodeBlock language="tsx">
{` // 自訂下拉選單 — 螢幕閱讀器需要 role 才能理解這個元件
function CustomSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-label="選擇城市"
    >
      <input
        aria-autocomplete="list"
        aria-controls="options-list"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <ul role="listbox" id="options-list">
          {options.map((opt) => (
            <li
              role="option"
              key={opt.id}
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">2. aria-* 屬性 — 描述狀態與關聯</h3>
              <CodeBlock language="tsx">
{` // Modal 對話框 — 完整的 ARIA 無障礙實作
function ConfirmModal({ isOpen, onConfirm, onClose }) {
  return isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"      // 標題元素的 id
      aria-describedby="modal-desc"      // 說明文字的 id
    >
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />
      <div className="modal-content">
        {/* id 與上面的 aria-labelledby 對應 */}
        <h2 id="modal-title">確認刪除</h2>
        {/* id 與上面的 aria-describedby 對應 */}
        <p id="modal-desc">這個操作無法復原，確定要繼續嗎？</p>

        <div className="modal-actions">
          <button onClick={onConfirm}>確認刪除</button>
          {/* aria-label 提供螢幕閱讀器用的文字說明 */}
          {/* 因為按鈕文字是「×」，螢幕閱讀器不知道意義 */}
          <button onClick={onClose} aria-label="關閉對話框">×</button>
        </div>
      </div>
    </div>
  ) : null;
}

// 常用 aria-* 屬性速查：
// aria-label="說明文字"           → 為沒有可見文字的元素提供說明
// aria-labelledby="other-id"     → 用另一個元素的文字作為標籤
// aria-describedby="desc-id"     → 附加說明文字（比 label 更詳細）
// aria-expanded={boolean}        → 下拉/折疊元件的展開狀態
// aria-selected={boolean}        → Tab、選單中的選中狀態
// aria-checked={boolean}         → Checkbox/Radio 的勾選狀態
// aria-disabled={boolean}        → 禁用狀態（配合視覺樣式）
// aria-hidden={boolean}          → 對螢幕閱讀器隱藏（裝飾性元素）
// aria-required={boolean}        → 必填欄位
// aria-invalid={boolean}         → 欄位驗證失敗 `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">3. aria-live — 動態更新通知</h3>
              <CodeBlock language="tsx">
{` // 表單錯誤訊息：當 error 出現時，螢幕閱讀器自動唸出內容
// 不需要使用者焦點在這個元素上
function FormWithLiveRegion() {
  const [error, setError] = useState('');

  return (
    <form>
      <input
        type="email"
        onBlur={(e) => {
          if (!e.target.value.includes('@')) {
            setError('請輸入有效的電子郵件地址');
          } else {
            setError('');
          }
        }}
      />

      {/* aria-live="polite"  → 等待螢幕閱讀器唸完目前內容後才插入播報 */}
      {/* aria-live="assertive" → 立即打斷並播報（只用於緊急訊息）*/}
      {/* aria-atomic="true"  → 整個區域作為一個單位播報，而非只播報變動部分 */}
      <div aria-live="polite" aria-atomic="true">
        {error && (
          <p role="alert" className="text-red-500 text-sm">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

// 常見 aria-live 使用場景：
// - 表單驗證錯誤訊息
// - Toast / 通知訊息
// - 搜尋結果數量更新（「找到 23 筆結果」）
// - 載入狀態變化（「資料載入完成」） `}
</CodeBlock>

              <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-cyan-800 text-sm font-medium mb-1">ARIA 第一原則</p>
                <p className="text-cyan-700 text-sm leading-relaxed">
                  <strong>能用原生 HTML 就不要用 ARIA。</strong> <code className="bg-cyan-100 px-1 rounded">{'<button>'}</code> 比 <code className="bg-cyan-100 px-1 rounded">{'<div role="button">'}</code> 更好，因為原生元素已內建鍵盤支援、焦點管理等行為。ARIA 只用於原生 HTML 無法表達的複雜互動模式。
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：鍵盤導航 ────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-teal-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Keyboard className="text-teal-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：鍵盤導航 — Tab 鍵必須能用
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                大多數鍵盤用戶和螢幕閱讀器用戶使用 <kbd className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-sm font-mono">Tab</kbd> 鍵在頁面元素間移動，用 <kbd className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-sm font-mono">Enter</kbd> 或 <kbd className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-sm font-mono">Space</kbd> 觸發操作。原生的 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{'<button>'}</code> 和 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">{'<a href>'}</code> 自動支援這些行為，但自訂元件需要額外處理。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">自訂按鈕的鍵盤支援</h3>
              <CodeBlock language="tsx">
{` // ❌ 自訂按鈕：無法用 Tab 聚焦，無法用 Enter 觸發
function BadButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <div
      className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
      onClick={onClick}
    >
      {children}
    </div>
    // 問題：
    // 1. Tab 無法聚焦（div 預設不在 Tab 順序中）
    // 2. Enter / Space 無法觸發 onClick
    // 3. 螢幕閱讀器不知道這是「按鈕」
  );
}

// ✅ 正確做法：直接使用 <button>
// button 自動支援 Tab 聚焦、Enter 觸發、螢幕閱讀器識別
function GoodButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded
                 hover:bg-blue-600
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                 // ↑ focus ring 非常重要！讓鍵盤用戶知道焦點在哪
    >
      {children}
    </button>
  );
}

// ✅ 如果真的必須讓非互動元素可鍵盤操作（例如自訂 Card 點擊）
function ClickableCard({ onClick, children }) {
  return (
    <div
      role="button"          // 告訴螢幕閱讀器這是按鈕
      tabIndex={0}           // 加入 Tab 順序
      onClick={onClick}
      onKeyDown={(e) => {
        // 鍵盤 Enter 和 Space 都應該觸發操作
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
    >
      {children}
    </div>
  );
} `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">焦點管理 — Modal 的正確實作</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Modal 開啟時，焦點必須移到 Modal 內部；關閉時，焦點必須回到觸發按鈕。同時需要實作「焦點陷阱」，讓 Tab 鍵在 Modal 內循環，不允許焦點跑到背景的元素。
              </p>
              <CodeBlock language="tsx">
{` import { useRef, useEffect } from 'react';

function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Modal 開啟時：將焦點移到 Modal 內的第一個可互動元素
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Escape 鍵關閉 Modal（這是標準無障礙行為）
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩：aria-hidden 讓螢幕閱讀器忽略，避免干擾 */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onKeyDown={handleKeyDown}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-xl font-bold">對話框標題</h2>
            {/* 關閉按鈕放第一個，方便鍵盤用戶快速退出 */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="關閉對話框"
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

// 實際專案中，推薦使用 focus-trap-react 套件處理複雜的焦點陷阱：
// npm install focus-trap-react
//
// import FocusTrap from 'focus-trap-react';
// <FocusTrap active={isOpen}>
//   <div role="dialog" aria-modal="true">...</div>
// </FocusTrap> `}
</CodeBlock>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="font-semibold text-teal-700 mb-2 text-sm">tabIndex 的正確使用</p>
                  <ul className="text-teal-600 text-xs space-y-1.5">
                    <li><code className="bg-teal-100 px-1 rounded">tabIndex={'{0}'}</code> → 加入 Tab 順序（依 DOM 順序）</li>
                    <li><code className="bg-teal-100 px-1 rounded">tabIndex={'{-1}'}</code> → 移除 Tab 焦點（但可用程式 focus）</li>
                    <li><code className="bg-teal-100 px-1 rounded">tabIndex={'{1}'}</code> 以上 → 不推薦，會破壞自然順序</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-700 mb-2 text-sm">focus ring 樣式</p>
                  <p className="text-blue-600 text-xs leading-relaxed">
                    不要用 <code className="bg-blue-100 px-1 rounded">outline: none</code> 消除焦點框！如果覺得預設樣式醜，用 Tailwind 的 <code className="bg-blue-100 px-1 rounded">focus:ring-2 focus:ring-blue-500</code> 自訂更好看的焦點指示器。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：色彩對比 ────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-cyan-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Palette className="text-cyan-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：色彩對比與視覺設計
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                WCAG 2.1 規定了最低色彩對比度標準，確保視力較弱的用戶能看清文字。對比度的計算基於相對亮度（Relative Luminance），比值越高越容易閱讀。
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-black text-blue-600 mb-1">4.5:1</p>
                  <p className="font-semibold text-gray-700 text-sm">一般文字</p>
                  <p className="text-gray-500 text-xs">低於 18px 或非粗體</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-black text-teal-600 mb-1">3:1</p>
                  <p className="font-semibold text-gray-700 text-sm">大文字</p>
                  <p className="text-gray-500 text-xs">18px+ 或 14px+ 粗體</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <p className="text-2xl font-black text-cyan-600 mb-1">3:1</p>
                  <p className="font-semibold text-gray-700 text-sm">UI 元件</p>
                  <p className="text-gray-500 text-xs">按鈕邊框、圖示、輸入框</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">對比度範例</h3>
              <CodeBlock language="tsx">
{` // ❌ 對比度不足（淺灰色文字在白底）
<p className="text-gray-300">這段文字很難看到</p>
{/* text-gray-300 on white = 1.9:1 — 完全不及格 */}

// ❌ 也不足夠（常見的灰色描述文字）
<p className="text-gray-400">副標題文字</p>
{/* text-gray-400 on white = 2.9:1 — 不達標 */}

// ⚠️  剛好及格（但只適合大文字）
<p className="text-gray-500">說明文字</p>
{/* text-gray-500 on white = 3.9:1 — 小文字不足，大文字OK */}

// ✅ 安全選擇
<p className="text-gray-600">說明文字</p>
{/* text-gray-600 on white = 5.9:1 ✅ */}

<p className="text-gray-700">主要文字</p>
{/* text-gray-700 on white = 7.3:1 ✅ */}

<p className="text-gray-900">強調文字</p>
{/* text-gray-900 on white = 14.7:1 ✅ */}

// 連結藍色（常見困境）
<a className="text-blue-600">連結文字</a>
{/* text-blue-600 on white = 4.5:1 ✅（剛好達標）*/}

<a className="text-blue-500">連結文字</a>
{/* text-blue-500 on white = 3.1:1 ❌（不達標）*/} `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-4 mt-8">Tailwind CSS 色彩對比速查</h3>
              <div className="space-y-2 mb-6">
                {[
                  { cls: 'text-gray-300', sample: '這段文字很難看到', ratio: '1.9:1', pass: false, bg: 'white' },
                  { cls: 'text-gray-400', sample: '副標題文字樣本', ratio: '2.9:1', pass: false, bg: 'white' },
                  { cls: 'text-gray-500', sample: '說明文字樣本文字', ratio: '3.9:1', pass: false, bg: 'white' },
                  { cls: 'text-gray-600', sample: '說明文字樣本文字', ratio: '5.9:1', pass: true, bg: 'white' },
                  { cls: 'text-gray-700', sample: '主要文字樣本文字', ratio: '7.3:1', pass: true, bg: 'white' },
                  { cls: 'text-blue-600', sample: '連結文字樣本文字', ratio: '4.5:1', pass: true, bg: 'white' },
                ].map(({ cls, sample, ratio, pass }) => (
                  <div key={cls} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                    <code className="text-xs font-mono text-gray-500 w-36 shrink-0">{cls}</code>
                    <p className={`${cls} flex-1 text-sm`}>{sample}</p>
                    <span className="text-xs text-gray-500 w-16 text-center">{ratio}</span>
                    {pass ? (
                      <CheckCircle size={16} className="text-green-500 shrink-0" />
                    ) : (
                      <XCircle size={16} className="text-red-500 shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">推薦工具</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { name: 'Chrome DevTools', desc: 'Accessibility 面板，點選元素直接查看對比度', icon: '🔧' },
                  { name: 'axe DevTools', desc: '瀏覽器擴充，一鍵掃描整頁 a11y 問題', icon: '🪓' },
                  { name: 'Lighthouse', desc: 'Chrome 內建，a11y 評分報告（0-100 分）', icon: '💡' },
                ].map(({ name, desc, icon }) => (
                  <div key={name} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-lg mb-1">{icon}</p>
                    <p className="font-semibold text-gray-700 text-sm">{name}</p>
                    <p className="text-gray-500 text-xs mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：React 最佳實踐 ──────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-teal-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <CheckCircle className="text-teal-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：React 中的 a11y 最佳實踐
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                把前面所學整合到實際的 React 元件中，涵蓋圖片、表單、載入狀態、Skip Navigation 等常見場景的完整無障礙實作。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">1. 圖片 alt 屬性</h3>
              <CodeBlock language="tsx">
{` // ✅ 有意義的圖片：alt 描述圖片傳達的資訊
<img
  src="sales-chart.png"
  alt="2024 年第三季銷售成長 23%，較上季成長 5%"
  className="rounded-lg"
/>

// ✅ 裝飾性圖片：空 alt + role="presentation" 讓螢幕閱讀器跳過
<img
  src="decoration-wave.png"
  alt=""
  role="presentation"
  className="absolute bottom-0 left-0 w-full"
/>

// ✅ icon 按鈕：沒有文字時，用 aria-label 說明
<button
  onClick={handleSearch}
  aria-label="搜尋"
>
  <SearchIcon aria-hidden="true" />  {/* icon 本身用 aria-hidden 隱藏，避免重複播報 */}
</button>

// ✅ 有文字的 icon 按鈕：icon 用 aria-hidden，讓螢幕閱讀器只播報文字
<button onClick={handleDelete}>
  <TrashIcon aria-hidden="true" size={16} />
  <span>刪除</span>
</button> `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">2. 無障礙表單完整實作</h3>
              <CodeBlock language="tsx">
{` // 完整的無障礙表單
function AccessibleForm() {
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form noValidate onSubmit={handleSubmit}>
      {/* label htmlFor 必須對應 input id，點擊 label 也會聚焦 input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          電子郵件
          {/* 星號告知視覺用戶必填，但 aria-hidden 讓螢幕閱讀器跳過 */}
          {/* 螢幕閱讀器改由 aria-required 得知必填資訊 */}
          <span aria-hidden="true" className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          aria-required="true"
          aria-describedby={emailError ? 'email-error' : undefined}
          aria-invalid={!!emailError}
          className={\`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500
            \${emailError ? 'border-red-500' : 'border-gray-300'}\`}
          onBlur={(e) => {
            if (!e.target.value.includes('@')) {
              setEmailError('請輸入有效的電子郵件格式，例如：name@example.com');
            } else {
              setEmailError('');
            }
          }}
        />
        {/* 錯誤訊息：id 對應 aria-describedby，role="alert" 觸發 aria-live */}
        {emailError && (
          <p id="email-error" role="alert" className="text-red-500 text-sm mt-1">
            {emailError}
          </p>
        )}
      </div>

      {/* 3. Loading 狀態的無障礙處理 */}
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg
                   disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isLoading ? (
          <>
            {/* loading icon 對螢幕閱讀器隱藏 */}
            <span aria-hidden="true" className="inline-block animate-spin mr-2">⏳</span>
            {/* 文字描述狀態 */}
            <span>處理中，請稍候...</span>
          </>
        ) : (
          <span>送出表單</span>
        )}
      </button>
    </form>
  );
} `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">3. Skip Navigation — 讓鍵盤用戶跳過導覽</h3>
              <CodeBlock language="tsx">
{` // 放在 <body> 最頂部的第一個元素
// 平常用 sr-only 隱藏，Tab 鍵聚焦時才顯示
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only                           /* 平常對視覺隱藏（screen reader only）*/
        focus:not-sr-only                 /* 聚焦時取消隱藏 */
        focus:absolute focus:top-4 focus:left-4
        focus:z-50
        bg-blue-600 text-white
        px-4 py-2 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-white
      "
    >
      跳到主要內容
    </a>
  );
}

// 在 Layout 中使用
function Layout({ children }) {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {/* tabIndex={-1} 讓 main 可以接收程式化 focus */}
        {children}
      </main>
      <Footer />
    </>
  );
}

// 為什麼需要 Skip Navigation？
// 鍵盤用戶每次到達新頁面，都必須從導覽列的第一個連結開始按 Tab
// 如果導覽列有 20 個連結，需要按 20 次才能到達主要內容
// Skip Navigation 讓他們可以按一次 Tab 就跳過整個導覽 `}
</CodeBlock>

              <div className="mt-6 p-5 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                <p className="font-semibold text-teal-800 mb-3">React 的 a11y 檢查工具</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-teal-700 text-sm font-medium mb-1">eslint-plugin-jsx-a11y</p>
                    <p className="text-teal-600 text-xs">在開發時即時警告常見的無障礙問題，例如缺少 alt、互動元素缺少鍵盤支援等</p>
                    <code className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded mt-1 block">npm install eslint-plugin-jsx-a11y</code>
                  </div>
                  <div>
                    <p className="text-teal-700 text-sm font-medium mb-1">@axe-core/react</p>
                    <p className="text-teal-600 text-xs">在開發模式下自動掃描並在 console 顯示 a11y 問題，零配置</p>
                    <code className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded mt-1 block">npm install @axe-core/react</code>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Tags ───────────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex flex-wrap gap-2">
            {['Accessibility', 'a11y', 'ARIA', 'WCAG', 'Semantic HTML', 'Keyboard Navigation'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-cyan-100 text-cyan-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep28-react-router">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-cyan-300">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-cyan-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.28 React Router</p>
                      <p className="text-xs text-gray-400">SPA 路由完整指南</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/web-dev/ep30-web-security">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-cyan-300">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.30 Web 安全實戰</p>
                      <p className="text-xs text-gray-400">XSS、CSRF、CSP 防禦</p>
                    </div>
                    <ArrowRight className="text-cyan-500 shrink-0" size={20} />
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
