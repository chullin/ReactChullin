'use client';

import { Card, CardBody, Chip, Divider, Tab, Tabs, Button } from '@heroui/react';
import { 
  ShieldAlert, 
  Globe, 
  Lock, 
  Key, 
  ShieldCheck, 
  Terminal, 
  ExternalLink, 
  Info, 
  AlertCircle,
  FileText,
  Zap,
  RefreshCcw,
  Fingerprint,
  Layers,
  ChevronRight,
  Code2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="space-y-8"
  >
    {children}
  </motion.div>
);

export default function SecurityHeadersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center gap-3 mb-8">
              <Chip variant="flat" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold uppercase tracking-wider">
                網路協定 EP.08
              </Chip>
              <Chip variant="flat" className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold uppercase tracking-wider">
                資安實戰
              </Chip>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              Security Headers：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-400">
                網頁安全的隱形防線
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
              為什麼加了幾個 Header 就能防禦 90% 的攻擊？從 CORS、CSP 到 HSTS，深度解析現代瀏覽器的安全機制與正確配置方法。
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500 border-t border-slate-800 pt-10">
              <div className="flex items-center gap-2"><Globe size={18} /> 傳輸層安全</div>
              <div className="flex items-center gap-2"><ShieldCheck size={18} /> 深度防禦</div>
              <div className="flex items-center gap-2"><Lock size={18} /> 隱私保護</div>
              <div className="flex items-center gap-2">✍️ Joseph Chen</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 bg-white shadow-xl shadow-slate-200/50 -mt-12 rounded-t-[3rem] relative z-20">
        
        {/* Intro: The Invisible Barrier */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <ShieldAlert size={24} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">隱形防線：瀏覽器與伺服器的契約</h2>
          </div>
          
          <p className="text-xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-slate-200 pl-6 my-8">
            「最好的安全防禦，是讓攻擊者連出手的機會都沒有。」
          </p>

          <p className="text-lg text-slate-700 leading-relaxed">
            當你在瀏覽器輸入網址，伺服器回傳的不只有 HTML，還有一堆隱藏在背後的 <strong className="text-slate-900 italic">HTTP Headers</strong>。
            這些 Headers 就像是伺服器給瀏覽器的「行為準則」：哪些 Script 可以跑、哪些網站可以讀取資料、連線是否必須加密。
          </p>

          <div className="bg-slate-900 rounded-3xl p-8 text-slate-300 space-y-6 border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-3 text-emerald-400">
              <Zap size={20} />
              <h4 className="font-black text-lg">為什麼你需要 Security Headers？</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
                <p className="font-bold text-white mb-2">1. 成本最低的防禦</p>
                <p>不需要修改業務邏輯，只需要在伺服器設定（Nginx/Next.js）加幾行字。</p>
              </div>
              <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
                <p className="font-bold text-white mb-2">2. 深度防禦 (Defense in Depth)</p>
                <p>即便你的程式碼有 XSS 漏洞，正確的 CSP 也能阻止駭客執行惡意腳本。</p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-16" />

        {/* Section 1: CORS - The Most Misunderstood Header */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><RefreshCcw size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900">一、CORS：不是用來阻擋駭客的</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              <strong className="text-slate-900">CORS (Cross-Origin Resource Sharing)</strong> 大概是前端工程師最討厭的錯誤。
              但請記住一個核心概念：<strong className="text-red-600 underline decoration-2 underline-offset-4">CORS 是一種放寬限制的機制，而不是一種防護機制。</strong>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 space-y-4">
            <h4 className="text-xl font-bold text-blue-900">痛點：為什麼會有 CORS 錯誤？</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              瀏覽器預設遵守「同源政策 (Same-Origin Policy)」，不允許 Domain A 的網頁去讀取 Domain B 的 API 資料。
              這是為了防止駭客在惡意網站寫一段 JS 去偷讀你在銀行網站的個人資訊。
            </p>
            <div className="p-6 bg-white rounded-2xl border border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-4">駭客眼中的 CORS：</p>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  「如果我能把 Access-Control-Allow-Origin 設成 *，我就能從任何地方發請求。」
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-slate-800">最佳實踐：如何正確設定 CORS</h4>
            <CodeBlock 
              title="Next.js next.config.js 設定" 
              language="javascript" 
              code={`const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // ❌ 千萬不要設成 "*"
          // { key: "Access-Control-Allow-Origin", value: "*" },
          
          // ✅ 設定特定信任的網域
          { key: "Access-Control-Allow-Origin", value: "https://app.chullin.tw" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Content-Type, Authorization" },
        ]
      }
    ]
  }
}`} 
            />
          </div>
        </SectionWrapper>

        <Divider className="my-16" />

        {/* Section 2: CSP - Content Security Policy */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-xl"><Layers size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900">二、CSP：網頁安全的「白名單」</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              <strong className="text-slate-900">CSP (Content Security Policy)</strong> 是防禦 XSS (跨站腳本攻擊) 的大殺器。
              它告訴瀏覽器：「只有這份名單上的來源可以執行 Script 或讀取圖片，其他的通通不准跑。」
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl">
              <h5 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-500" /> 沒有 CSP 的風險
              </h5>
              <p className="text-sm text-slate-600 leading-relaxed">
                駭客在評論區留下一段程式碼，瀏覽器會乖乖執行它，把使用者的 Cookie 傳到駭客伺服器。
              </p>
            </div>
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
              <h5 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" /> 有 CSP 的保護
              </h5>
              <p className="text-sm text-slate-600 leading-relaxed">
                瀏覽器看到該 Script 來源不在白名單內，直接報錯阻斷，駭客無功而返。
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-slate-800">一個嚴謹的 CSP 範例：</h4>
            <CodeBlock 
              title="Content-Security-Policy" 
              language="http" 
              code={`Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' https://trusted.cdn.com; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https://images.chullin.tw;
  connect-src 'self' https://api.chullin.tw;
  frame-ancestors 'none';`} 
            />
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-sm text-amber-800">
              <p className="font-bold mb-1">⚠️ 小提醒：</p>
              如果要完全防止 XSS，應盡量避免使用 <code className="bg-amber-100 px-1 rounded">'unsafe-inline'</code>，
              改用 <strong className="font-black italic">Nonce (一次性隨機字串)</strong> 或 <strong className="font-black italic">Hash</strong>。
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-16" />

        {/* Section 3: HSTS - Forced HTTPS */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-100 text-sky-600 rounded-xl"><RefreshCcw size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900">三、HSTS：強制加密，杜絕中間人攻擊</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              你以為把網站轉址到 HTTPS 就安全了嗎？駭客可以利用「SSL Stripping」攻擊，在使用者發出第一個 HTTP 請求時就將其劫持。
              <strong className="text-slate-900">HSTS (HTTP Strict Transport Security)</strong> 告訴瀏覽器：「在接下來的一年內，這個網站的所有請求都必須直接走 HTTPS，連嘗試 HTTP 都不准。」
            </p>
          </div>

          <CodeBlock 
            title="HSTS Header" 
            language="http" 
            code={`# max-age: 存留時間 (秒), 31536000 代表一年
# includeSubDomains: 套用到所有子網域
# preload: 申請加入瀏覽器內建的 HSTS 名單
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`} 
          />
        </SectionWrapper>

        <Divider className="my-16" />

        {/* Section 4: Cookie Security */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 text-rose-600 rounded-xl"><Fingerprint size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900">四、Cookie Security：保護使用者的憑證</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              Cookie 存載著 Session ID，是駭客最垂涎的目標。如果你沒有正確設定以下三個屬性，使用者的帳號就像沒鎖門一樣危險。
            </p>
          </div>

          <div className="space-y-6 mt-8">
            {[
              { 
                name: 'HttpOnly', 
                desc: '禁止 JavaScript 存取 Cookie。', 
                effect: '防止 XSS 攻擊者利用 document.cookie 偷走 Session ID。',
                tag: '防偷取'
              },
              { 
                name: 'Secure', 
                desc: '強制 Cookie 只能在加密的 HTTPS 連線中傳輸。', 
                effect: '防止在不安全的 Wi-Fi 環境下被中間人監聽抓到明文 Cookie。',
                tag: '防監聽'
              },
              { 
                name: 'SameSite', 
                desc: '限制第三方網站是否能帶上這個 Cookie。', 
                effect: '設為 "Strict" 或 "Lax" 是防禦 CSRF (跨站請求偽造) 的最佳利器。',
                tag: '防偽造'
              }
            ].map((item, i) => (
              <div key={i} className="group p-6 border border-slate-100 rounded-3xl hover:border-rose-200 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    {item.name}
                  </h5>
                  <Chip size="sm" color="danger" variant="flat" className="font-bold">{item.tag}</Chip>
                </div>
                <p className="text-slate-600 font-medium mb-2">{item.desc}</p>
                <p className="text-sm text-slate-400 italic">{item.effect}</p>
              </div>
            ))}
          </div>

          <CodeBlock 
            title="伺服器端設定 Cookie" 
            language="javascript" 
            code={`// 在 Express 中
res.cookie('sessionId', 'abc123xyz', {
  httpOnly: true,
  secure: true,
  sameSite: 'Lax',
  maxAge: 3600000 // 1 hour
});`} 
          />
        </SectionWrapper>

        <Divider className="my-16" />

        {/* Section 5: The "No-Brainer" Headers */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl"><Zap size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900">五、那些「不用思考也該加」的 Headers</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              最後這兩個 Header 設定非常簡單，但能解決一些特定的瀏覽器漏洞。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="space-y-4">
              <h5 className="font-black text-slate-800 text-lg flex items-center gap-2">
                <Info size={18} className="text-indigo-500" /> X-Frame-Options
              </h5>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
                <p className="text-sm text-slate-600">防止 Clickjacking (點擊劫持)。禁止別人的網站用 iframe 嵌入你的頁面，然後在上面覆蓋一層透明按鈕來騙取點擊。</p>
                <CodeBlock language="http" code="X-Frame-Options: DENY" />
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="font-black text-slate-800 text-lg flex items-center gap-2">
                <Info size={18} className="text-indigo-500" /> X-Content-Type-Options
              </h5>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-3">
                <p className="text-sm text-slate-600">防止 MIME Sniffing。告訴瀏覽器：「不要猜測檔案類型，我說它是什麼就是什麼」，防止駭客偽裝成圖片的惡意 Script 被執行。</p>
                <CodeBlock language="http" code="X-Content-Type-Options: nosniff" />
              </div>
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-16" />

        {/* Summary: Implementation Strategy */}
        <SectionWrapper>
          <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[2.5rem] p-10 text-white space-y-8">
            <div className="flex items-center gap-3">
              <ShieldCheck size={32} className="text-emerald-400" />
              <h2 className="text-3xl font-black">實戰懶人包：如何快速落地？</h2>
            </div>
            
            <p className="text-slate-300 leading-relaxed">
              不用覺得頭大，如果你是使用 Next.js，你可以直接在 `next.config.js` 中一次性解決所有問題：
            </p>

            <CodeBlock 
              title="next.config.js 萬用安全配置" 
              language="javascript" 
              code={`const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: res.cloudinary.com; font-src 'self' fonts.gstatic.com; connect-src 'self'; media-src 'none'; object-src 'none'; frame-src 'none';" }
];

module.exports = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  }
};`} 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">1</div>
                <p className="text-sm font-medium">先在 Dev 環境測試</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">2</div>
                <p className="text-sm font-medium">使用 SecurityHeaders.com 檢測</p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Article Footer */}
        <div className="mt-24 space-y-12">
          <div className="flex flex-wrap gap-2">
            {['網路協議', '資安', 'HTTP', 'HTTPS', 'CORS', 'CSP', 'Cookie', 'Next.js'].map(tag => (
              <Chip key={tag} variant="flat" className="bg-slate-100 text-slate-500 font-black px-4 py-1">#{tag}</Chip>
            ))}
          </div>

          <Divider className="opacity-50" />

          <div className="flex justify-between items-center gap-6">
            <Link 
              href="/blog/network/ep07-http3-quic" 
              className="flex-1 group p-8 bg-slate-50 rounded-3xl hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <div className="flex items-center gap-2 text-slate-400 font-black text-xs mb-3 uppercase tracking-widest">
                <ChevronRight className="rotate-180" size={14} /> 上一篇
              </div>
              <p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                EP.07 — HTTP/3 與 QUIC：為什麼 UDP 變快了？
              </p>
            </Link>

            <Link 
              href="/blog/network/ep09-tcp-ip-deep-dive" 
              className="flex-1 group p-8 bg-slate-50 rounded-3xl hover:bg-white border border-transparent hover:border-slate-200 transition-all text-right"
            >
              <div className="flex items-center justify-end gap-2 text-slate-400 font-black text-xs mb-3 uppercase tracking-widest">
                下一篇 <ChevronRight size={14} />
              </div>
              <p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                EP.09 — TCP/IP 深度解析：從握手到揮手的完整旅程
              </p>
            </Link>
          </div>

          <div className="text-center py-12 px-6 bg-blue-50 rounded-[3rem] border border-blue-100">
            <h4 className="text-2xl font-black text-blue-900 mb-4">覺得這篇文章有幫助嗎？</h4>
            <p className="text-blue-700 mb-8 max-w-xl mx-auto">
              在這個 Bootcamp 系列中，我們持續分享軟體開發的核心技術。如果有任何問題，歡迎在 LinkedIn 上與我交流！
            </p>
            <div className="flex justify-center gap-4">
              <Button color="primary" variant="shadow" className="font-black px-10 h-12 rounded-2xl">
                關注我的 LinkedIn
              </Button>
              <Button color="primary" variant="flat" className="font-black px-10 h-12 rounded-2xl">
                分享給朋友
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
