'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Globe,
  Languages,
  CheckCircle,
  AlertTriangle,
  Settings,
  FileText,
  LayoutGrid,
  Sparkles,
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

export default function WebDevEP35() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-pink-700 via-rose-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.35</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web 開發系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              國際化（i18n）：<br />
              <span className="text-rose-200">用 next-intl 讓你的網站說多國語言</span>
            </h1>
            <p className="text-rose-100 text-lg mb-8 max-w-2xl">
              next-intl 路由配置、訊息格式化、複數規則、日期貨幣本地化 — 打造真正的多語言 Next.js 應用
            </p>
            <div className="flex items-center gap-6 text-rose-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> i18n · next-intl · 多語言 · 本地化</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：i18n 不只是「翻譯文字」 ─────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Globe className="text-rose-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：i18n 不只是「翻譯文字」
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                很多人以為國際化（Internationalization，縮寫 i18n）只是把字串換成別的語言，但這只是最基礎的一層。真正讓用戶感覺「這個產品是為我打造的」，需要處理五個不同的層面——每一個都有各自的複雜度，也都有對應的工具。
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    title: '文字翻譯',
                    desc: 'hello → 你好 → こんにちは',
                    detail: '最基礎的層面，把 UI 上的文字對應到不同語言的版本。',
                    icon: Languages,
                    color: 'pink',
                    badge: '基礎',
                  },
                  {
                    title: '複數規則',
                    desc: '1 apple vs 2 apples',
                    detail: '英文有 singular/plural 兩種，阿拉伯文竟然有 6 種複數形式！每種語言規則不同。',
                    icon: FileText,
                    color: 'rose',
                    badge: '中等',
                  },
                  {
                    title: '日期格式',
                    desc: '2026/05/07 vs May 7, 2026 vs 07.05.2026',
                    detail: '台灣、美國、德國對日期的書寫順序和分隔符號都有不同慣例。',
                    icon: Calendar,
                    color: 'red',
                    badge: '中等',
                  },
                  {
                    title: '貨幣格式',
                    desc: 'NT$1,500 vs $1,500.00 vs ¥1,500',
                    detail: '貨幣符號的位置、小數點符號（. 還是 ,）、千分位分隔符號都因地而異。',
                    icon: Sparkles,
                    color: 'orange',
                    badge: '中等',
                  },
                  {
                    title: '文字方向',
                    desc: 'LTR vs RTL',
                    detail: '英文從左到右（LTR），阿拉伯文和希伯來文從右到左（RTL），整個版面配置都需要翻轉。',
                    icon: LayoutGrid,
                    color: 'amber',
                    badge: '進階',
                  },
                  {
                    title: '時區與地域',
                    desc: 'UTC+8 vs UTC-5 vs ...',
                    detail: '顯示時間時需要考量用戶所在時區，同一個時間戳在不同地區呈現不同時間。',
                    icon: Globe,
                    color: 'yellow',
                    badge: '進階',
                  },
                ].map(({ title, desc, detail, icon: Icon, color, badge }) => (
                  <div key={title} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`text-${color}-600`} size={16} />
                        <p className={`font-bold text-${color}-800 text-sm`}>{title}</p>
                      </div>
                      <span className={`text-xs bg-${color}-200 text-${color}-700 px-2 py-0.5 rounded-full`}>{badge}</span>
                    </div>
                    <p className={`text-${color}-600 text-xs font-mono mb-2`}>{desc}</p>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>{detail}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-4">next-intl vs 其他方案比較</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-5 bg-slate-800 rounded-xl border border-slate-600 font-mono text-sm">
                  <p className="text-slate-400 text-xs mb-3">react-i18next（最多人用）</p>
                  <div className="space-y-1.5">
                    <p className="text-green-400 text-xs">✓ 生態最大，社群資源豐富</p>
                    <p className="text-green-400 text-xs">✓ 支援眾多框架</p>
                    <p className="text-red-400 text-xs">✗ Next.js 整合需要額外配置</p>
                    <p className="text-red-400 text-xs">✗ 沒有原生 App Router 支援</p>
                    <p className="text-red-400 text-xs">✗ Server Component 中使用較複雜</p>
                  </div>
                </div>
                <div className="p-5 bg-rose-900 rounded-xl border border-rose-600 font-mono text-sm">
                  <p className="text-rose-300 text-xs mb-3">next-intl（最適合 Next.js）</p>
                  <div className="space-y-1.5">
                    <p className="text-green-400 text-xs">✓ 原生支援 App Router</p>
                    <p className="text-green-400 text-xs">✓ Server Component 直接可用</p>
                    <p className="text-green-400 text-xs">✓ TypeScript 型別安全</p>
                    <p className="text-green-400 text-xs">✓ 效能好（Server-side 翻譯）</p>
                    <p className="text-green-400 text-xs">✓ 翻譯 key 輸入錯誤時 TS 報錯</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-rose-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-rose-800 text-sm font-medium mb-1">為什麼 Server-side 翻譯更好？</p>
                    <p className="text-rose-700 text-xs leading-relaxed">
                      傳統 Client-side i18n 需要在瀏覽器下載語言包後才能渲染，用戶會先看到未翻譯的內容（FOUC）。next-intl 讓翻譯在伺服器端就完成，HTML 到瀏覽器時已經是正確語言，載入速度更快、SEO 更好。
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：專案設定與目錄結構 ──────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Settings className="text-rose-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：專案設定與目錄結構
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                next-intl 的核心概念是把所有路由包在 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">[locale]</code> 動態路段下。這個 locale 參數由 Middleware 自動偵測並注入，你的 Page 元件不需要手動處理語言偵測邏輯。
              </p>

              <CodeBlock language="bash">{`npm install next-intl`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-6">目錄結構</h3>

              <CodeBlock language="bash">{`├── app/
│   ├── [locale]/          ← 所有路由包在 locale 下
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   └── layout.tsx         ← 根 layout（不含 locale）
├── messages/
│   ├── en.json            ← 英文翻譯
│   ├── zh-TW.json         ← 繁體中文翻譯
│   └── ja.json            ← 日文翻譯
├── i18n.ts                ← next-intl 配置
└── middleware.ts           ← 語言偵測與路由`}</CodeBlock>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 my-6">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  <p className="text-amber-700 text-xs leading-relaxed">
                    <span className="font-bold">重要：</span>所有需要多語言的 Page 都必須移動到 <code className="bg-amber-100 px-1 rounded font-mono">app/[locale]/</code> 目錄下。原本放在 <code className="bg-amber-100 px-1 rounded font-mono">app/</code> 根目錄的 Page 需要整個搬移，這是 next-intl App Router 整合的必要結構。
                  </p>
                </div>
              </div>

              <CodeBlock language="typescript">{`// i18n.ts — 告訴 next-intl 如何載入翻譯訊息
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(\`../messages/\${locale}.json\`)).default,
}));`}</CodeBlock>

              <div className="h-4" />

              <CodeBlock language="typescript">{`// middleware.ts — 語言偵測與路由重導向
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh-TW', 'ja'],
  defaultLocale: 'zh-TW',
  // 'as-needed': zh-TW（預設語言）的 URL 不加前綴
  // 'always':    所有語言都加前綴（/zh-TW/、/en/、/ja/）
  // 'never':     所有語言都不加前綴（只支援單語言切換）
  localePrefix: 'as-needed',
});

export const config = {
  // 排除 API、Next.js 靜態資源、含副檔名的檔案（圖片、字體等）
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};`}</CodeBlock>

              <div className="h-4" />

              <CodeBlock language="typescript">{`// next.config.ts — 套用 next-intl plugin
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');
export default withNextIntl({
  // 你原本的 Next.js 設定可以繼續放在這裡
});`}</CodeBlock>

              <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 mt-6 font-mono text-sm">
                <p className="text-slate-400 text-xs mb-3">localePrefix: &apos;as-needed&apos; 的 URL 結果</p>
                <div className="space-y-2">
                  {[
                    { locale: 'zh-TW（預設）', url: 'https://example.com/', note: '不加前綴' },
                    { locale: 'en', url: 'https://example.com/en/', note: '加 /en 前綴' },
                    { locale: 'ja', url: 'https://example.com/ja/', note: '加 /ja 前綴' },
                  ].map(({ locale, url, note }) => (
                    <div key={locale} className="flex items-center gap-3">
                      <span className="text-rose-300 text-xs w-32 shrink-0">{locale}</span>
                      <span className="text-green-300 text-xs">{url}</span>
                      <span className="text-slate-500 text-xs">← {note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：訊息檔案設計與使用 ──────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <FileText className="text-rose-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：訊息檔案設計與使用
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                翻譯訊息以 JSON 格式存在 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">messages/</code> 目錄中，每個語言一個檔案。JSON 結構支援巢狀命名空間（namespace），讓你依功能或頁面分組管理翻譯 key。
              </p>

              <CodeBlock language="json">{`// messages/zh-TW.json
{
  "nav": {
    "home": "首頁",
    "about": "關於",
    "blog": "部落格",
    "contact": "聯絡"
  },
  "hero": {
    "title": "歡迎來到我的部落格",
    "subtitle": "分享技術與生活的地方",
    "cta": "開始閱讀"
  },
  "blog": {
    "readMore": "繼續閱讀",
    "publishedAt": "發布於 {date}",
    "minuteRead": "{count, plural, one {# 分鐘} other {# 分鐘}}閱讀",
    "noArticles": "目前沒有文章"
  },
  "error": {
    "404": "找不到頁面",
    "tryAgain": "重新嘗試"
  }
}`}</CodeBlock>

              <div className="h-4" />

              <CodeBlock language="json">{`// messages/en.json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "title": "Welcome to My Blog",
    "subtitle": "A place to share tech and life",
    "cta": "Start Reading"
  },
  "blog": {
    "readMore": "Read More",
    "publishedAt": "Published on {date}",
    "minuteRead": "{count, plural, one {# minute} other {# minutes}} read",
    "noArticles": "No articles yet"
  },
  "error": {
    "404": "Page Not Found",
    "tryAgain": "Try Again"
  }
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-6">在 Server Component 與 Client Component 中使用</h3>

              <CodeBlock language="tsx">{`// app/[locale]/page.tsx — Server Component 版本
// 注意：Server Component 不需要加 'use client'
import { useTranslations } from 'next-intl';

export default function HomePage() {
  // 傳入 namespace 名稱，t() 函式的 key 會在該 namespace 下查找
  const t = useTranslations('hero');

  return (
    <section>
      <h1>{t('title')}</h1>       {/* → "歡迎來到我的部落格" / "Welcome to My Blog" */}
      <p>{t('subtitle')}</p>
      <button>{t('cta')}</button>
    </section>
  );
}

// components/NavBar.tsx — Client Component 版本
'use client';
import { useTranslations } from 'next-intl';

export function NavBar() {
  // Client Component 中的 useTranslations 用法完全相同
  // next-intl 會自動從 Server Component 將翻譯傳遞給 Client
  const t = useTranslations('nav');

  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/about">{t('about')}</a>
      <a href="/blog">{t('blog')}</a>
    </nav>
  );
}`}</CodeBlock>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-800 text-sm font-bold mb-2">Server Component 優勢</p>
                  <ul className="text-green-700 text-xs space-y-1.5 leading-relaxed">
                    <li>• 翻譯包不會被打包進 JS bundle</li>
                    <li>• 沒有語言包的載入延遲</li>
                    <li>• SEO 直接拿到翻譯後的 HTML</li>
                    <li>• 不需要 Suspense 包裹</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-blue-800 text-sm font-bold mb-2">Client Component 注意事項</p>
                  <ul className="text-blue-700 text-xs space-y-1.5 leading-relaxed">
                    <li>• 需要在父層 Server Component 中提供翻譯</li>
                    <li>• 透過 NextIntlClientProvider 傳遞</li>
                    <li>• 可以只傳對應 namespace 的翻譯，節省 bundle 大小</li>
                    <li>• 動態語言切換在 Client Component 中直接生效</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：複數規則與格式化 ─────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Sparkles className="text-rose-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：複數規則與格式化
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                next-intl 使用 ICU（International Components for Unicode）訊息格式，這是業界標準的多語言訊息格式，支援插值、複數、選擇等複雜的本地化需求。理解 ICU 格式是用好 next-intl 的關鍵。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">複數規則（各語言不同）</h3>

              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 mb-4">
                <p className="text-rose-800 text-sm font-bold mb-2">各語言的複數複雜度</p>
                <div className="space-y-2">
                  {[
                    { lang: '中文、日文', forms: '1 種（沒有複數變化）', example: '1個文章、100個文章' },
                    { lang: '英文', forms: '2 種（singular / plural）', example: '1 item / 2 items' },
                    { lang: '俄文、波蘭文', forms: '3~4 種', example: 'один / два / пять предметов' },
                    { lang: '阿拉伯文', forms: '6 種（zero/one/two/few/many/other）', example: '最複雜的複數系統之一' },
                  ].map(({ lang, forms, example }) => (
                    <div key={lang} className="flex items-start gap-3 text-xs">
                      <span className="text-rose-700 font-bold w-32 shrink-0">{lang}</span>
                      <span className="text-rose-600 w-36 shrink-0">{forms}</span>
                      <span className="text-rose-500 italic">{example}</span>
                    </div>
                  ))}
                </div>
              </div>

              <CodeBlock language="tsx">{`// 英文：singular/plural 兩種
// messages/en.json: "minuteRead": "{count, plural, one {# minute} other {# minutes}} read"
// 1 → "1 minute read", 5 → "5 minutes read"

// 中文/日文：沒有複數變化，通常直接加數字
// messages/zh-TW.json: "minuteRead": "{count} 分鐘閱讀"
// 1 → "1 分鐘閱讀", 5 → "5 分鐘閱讀"

// 阿拉伯文：有 6 種複數形式！
// messages/ar.json: "minuteRead": "{count, plural, zero {# دقيقة} one {# دقيقة} two {# دقيقتان} few {# دقائق} many {# دقيقة} other {# دقيقة}} قراءة"

import { useTranslations } from 'next-intl';

function ArticleCount({ count }: { count: number }) {
  const t = useTranslations('blog');

  return (
    <span>
      {t('minuteRead', { count })}
      {/*
        zh-TW: "5 分鐘閱讀"
        en:    "5 minutes read"
        ja:    "5 分閲読"
      */}
    </span>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">日期、時間、貨幣格式化</h3>

              <CodeBlock language="tsx">{`import { useFormatter } from 'next-intl';

function PublishedDate({ date }: { date: Date }) {
  const format = useFormatter();

  return (
    <time>
      {/*
        zh-TW: "2026年5月7日"
        en:    "May 7, 2026"
        ja:    "2026年5月7日"
        de:    "7. Mai 2026"
      */}
      {format.dateTime(date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </time>
  );
}

function Price({ amount, currency }: { amount: number; currency: string }) {
  const format = useFormatter();

  return (
    <span>
      {/*
        zh-TW + TWD: "NT$1,500"
        en    + USD: "$1,500.00"
        ja    + JPY: "¥1,500"
        de    + EUR: "1.500,00 €"（注意：德文小數點用逗號！）
      */}
      {format.number(amount, { style: 'currency', currency })}
    </span>
  );
}

function RelativeTime({ date }: { date: Date }) {
  const format = useFormatter();

  return (
    <span>
      {/*
        zh-TW: "3 天前"
        en:    "3 days ago"
        ja:    "3日前"
      */}
      {format.relativeTime(date)}
    </span>
  );
}

// 數字格式（百分比、小數）
function Stats({ value }: { value: number }) {
  const format = useFormatter();

  return (
    <div>
      {/* 百分比 */}
      <span>{format.number(0.856, { style: 'percent' })}</span>
      {/* zh-TW: "85.6%", en: "85.6%", de: "85,6 %" */}

      {/* 大數字縮寫 */}
      <span>{format.number(1_500_000, { notation: 'compact' })}</span>
      {/* en: "1.5M", zh-TW: "150萬" */}
    </div>
  );
}`}</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：語言切換器與 SEO 配置 ───────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Globe className="text-rose-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：語言切換器與 SEO 配置
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                語言切換器（Locale Switcher）讓用戶手動切換語言。實作的關鍵是：切換語言後，應該停在同一個頁面，只是換成新語言的版本，而不是跳回首頁。next-intl 提供了 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">useRouter</code> 的擴充版本來處理這件事。
              </p>

              <CodeBlock language="tsx">{`// components/LocaleSwitcher.tsx
'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const locales = [
  { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
  { code: 'en',    label: 'English',  flag: '🇺🇸' },
  { code: 'ja',    label: '日本語',   flag: '🇯🇵' },
];

export function LocaleSwitcher() {
  const locale = useLocale();        // 取得目前語言
  const router = useRouter();
  const pathname = usePathname();    // 取得目前路徑（含語言前綴）

  function switchLocale(newLocale: string) {
    // 替換路徑中的語言前綴
    // 例如：/en/blog → /ja/blog（停在同一頁面，換語言）
    const currentLocalePrefix = \`/\${locale}\`;
    const cleanPath = pathname.startsWith(currentLocalePrefix)
      ? pathname.slice(currentLocalePrefix.length) || '/'
      : pathname;

    router.push(\`/\${newLocale}\${cleanPath}\`);
  }

  return (
    <div className="flex gap-2">
      {locales.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          aria-label={\`切換到\${label}\`}
          className={\`px-3 py-1 rounded text-sm transition-colors \${
            locale === code
              ? 'bg-rose-600 text-white font-bold'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }\`}
        >
          {flag} {label}
        </button>
      ))}
    </div>
  );
}`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-6">SEO 多語言 Meta 設定（hreflang）</h3>

              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">hreflang</code> 是告訴 Google「這個頁面有其他語言版本」的標準方式。設定正確的 hreflang 能讓 Google 對不同語言的用戶顯示對應版本的頁面，提升搜尋排名和用戶體驗。
              </p>

              <CodeBlock language="tsx">{`// app/[locale]/layout.tsx
import { getTranslations } from 'next-intl/server';

// generateMetadata 是 Server-side 函式，可以用 async/await
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // 注意：Server Component 中用 getTranslations（非 useTranslations）
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      // 告訴搜尋引擎這個頁面的各語言版本
      canonical: \`https://example.com/\${locale}\`,
      languages: {
        'zh-TW': 'https://example.com/zh-TW',
        'en':    'https://example.com/en',
        'ja':    'https://example.com/ja',
        // x-default 給不匹配任何語言的用戶
        'x-default': 'https://example.com',
      },
    },
    // Open Graph 語言設定
    openGraph: {
      locale: locale,
      alternateLocale: ['zh-TW', 'en', 'ja'].filter((l) => l !== locale),
    },
  };
}`}</CodeBlock>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-blue-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-blue-800 text-sm font-medium mb-1">hreflang 常見錯誤</p>
                    <ul className="text-blue-700 text-xs space-y-1 leading-relaxed">
                      <li>• hreflang 必須是雙向的：zh-TW 版本要指向 en，en 版本也要指向 zh-TW。</li>
                      <li>• 每個語言版本都要包含指向自己的 hreflang（self-referencing）。</li>
                      <li>• x-default 通常指向你的預設語言或語言選擇頁面。</li>
                      <li>• 語言代碼要用標準 BCP 47 格式（zh-TW 而非 zh_TW）。</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：TypeScript 型別安全與最佳實踐 ────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <CheckCircle className="text-rose-700" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：TypeScript 型別安全 + 最佳實踐
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                next-intl 最強大的功能之一是完整的 TypeScript 型別安全。透過一個型別宣告，讓 TypeScript 知道你的翻譯 JSON 結構，之後只要打錯任何 key 名稱，編譯期就會報錯，完全避免「翻譯 key 不存在導致顯示空白」的 Bug。
              </p>

              <CodeBlock language="typescript">{`// types/next-intl.d.ts
// 讓 TypeScript 自動驗證翻譯 key 是否存在

declare module 'next-intl' {
  interface AppConfig {
    // 以 zh-TW.json 作為型別基準（主語言）
    Messages: typeof import('../messages/zh-TW.json');
  }
}

// 效果：
// ✅ 這樣寫完全正常
const t = useTranslations('nav');
t('home');

// ❌ 打錯 namespace 名稱：TypeScript 立刻報錯
const t = useTranslations('navi');
// Error: Argument of type '"navi"' is not assignable to parameter of type '"nav" | "hero" | "blog" | "error"'

// ❌ 打錯 key 名稱：TypeScript 立刻報錯
t('homes');
// Error: Argument of type '"homes"' is not assignable to parameter of type '"home" | "about" | "blog" | "contact"'`}</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-6">翻譯 Key 命名最佳實踐</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-green-700 text-xs font-bold mb-2 flex items-center gap-1"><CheckCircle size={12} /> 好的結構：按功能/頁面分組</p>
                  <CodeBlock language="json">{`{
  "pages": {
    "home": {
      "title": "...",
      "subtitle": "..."
    },
    "about": {
      "title": "...",
      "bio": "..."
    }
  },
  "common": {
    "actions": {
      "submit": "...",
      "cancel": "...",
      "save": "..."
    },
    "status": {
      "loading": "...",
      "error": "...",
      "success": "..."
    }
  }
}`}</CodeBlock>
                </div>
                <div>
                  <p className="text-red-700 text-xs font-bold mb-2 flex items-center gap-1">✗ 不好的結構：一層扁平</p>
                  <CodeBlock language="json">{`{
  "homeTitle": "...",
  "homeSubtitle": "...",
  "aboutTitle": "...",
  "aboutBio": "...",
  "submitButton": "...",
  "cancelButton": "...",
  "saveButton": "...",
  "loadingText": "...",
  "errorText": "...",
  "successText": "..."
}`}</CodeBlock>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-4">常見陷阱與解法</h3>

              <div className="space-y-3">
                {[
                  {
                    problem: '翻譯不同步（英文新增了 key 但中文忘記加）',
                    solution: '使用 i18n Ally（VS Code 擴充套件）或 CI 中加入翻譯完整性檢查腳本，確保所有語言的 key 一致。',
                    color: 'amber',
                  },
                  {
                    problem: '硬編碼字串混入 JSX（忘了用 t()）',
                    solution: '設定 ESLint 規則 i18next/no-literal-string，讓 Linter 提醒你有字串沒有透過翻譯函式。',
                    color: 'orange',
                  },
                  {
                    problem: '翻譯包太大，影響 Client Component 效能',
                    solution: '在 NextIntlClientProvider 中只傳入該 Component 需要的 namespace，而不是整個翻譯包。',
                    color: 'red',
                  },
                  {
                    problem: 'RTL（右到左）語言版面跑版',
                    solution: '在 <html> 標籤加上 dir={locale === "ar" || locale === "he" ? "rtl" : "ltr"}，並使用 Tailwind 的 rtl: 前綴處理鏡像版面。',
                    color: 'purple',
                  },
                ].map(({ problem, solution, color }) => (
                  <div key={problem} className={`p-4 bg-${color}-50 rounded-xl border border-${color}-100`}>
                    <p className={`text-${color}-800 text-xs font-bold mb-1`}>問題：{problem}</p>
                    <p className={`text-${color}-700 text-xs leading-relaxed`}>解法：{solution}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-pink-700/10 to-red-600/10 rounded-xl border border-rose-200">
                <div className="flex items-start gap-3">
                  <Globe className="text-rose-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-gray-800 mb-1">i18n 不是最後才加的功能</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      很多專案會在「需要國際化了」的時候才開始加 i18n，結果發現要重構的地方滿坑滿谷。正確做法是：從第一天起就用 <code className="bg-rose-100 px-1 rounded font-mono">t()</code> 來輸出文字，即使初期只有一種語言也這樣做。等到真的需要多語言支援時，只需要新增翻譯檔，而不是重構整個 UI。
                    </p>
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
            {['i18n', 'next-intl', '多語言', '國際化', 'Next.js', 'TypeScript', 'SEO', '本地化'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-rose-100 text-rose-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation ─────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep34-nextjs-middleware">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-rose-400">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-rose-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.34 Next.js Middleware</p>
                      <p className="text-xs text-gray-400">Middleware · Edge Runtime · Rate Limiting</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <div className="opacity-50 cursor-not-allowed">
              <Card className="shadow border border-gray-200">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right w-full">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-semibold text-gray-500 text-sm">EP.36</p>
                      <p className="text-xs text-gray-400">Coming Soon</p>
                    </div>
                    <ArrowRight className="text-gray-400 shrink-0" size={20} />
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
