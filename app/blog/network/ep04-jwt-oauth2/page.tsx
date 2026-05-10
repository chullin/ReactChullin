'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowLeft,
  Quote,
  Clock,
  Eye,
  Shield,
  Key,
  Lock,
  AlertTriangle
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function NetworkEP04() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50">
      <div className="bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.04</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網路與協定</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              認證與授權：JWT、OAuth2、Session<br />
              <span className="text-sky-200">Cookie vs Token、Refresh Token、第三方登入</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl">
              Authentication（認證）和 Authorization（授權）是兩個不同的問題，卻常被混淆。
              選錯機制不只讓系統不安全，還讓使用者體驗變差。這篇帶你理解每種方案的設計邏輯與適用場景。
            </p>
            <div className="flex items-center gap-6 text-sky-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> JWT · OAuth2 · Session · Cookie · Auth</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-indigo-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「Authentication：你是誰？Authorization：你能做什麼？
                    很多安全漏洞來自於混淆這兩個問題，或者實作其中一個時忘記另一個。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    從傳統的 Session-Cookie，到 JWT Token，到現在普遍的 OAuth2 第三方登入——
                    每種方案都有它的設計取捨。理解原理，才能在不同場景做出正確選擇。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 認證 vs 授權 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">認證 vs 授權：先搞清楚概念</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-blue-50">
              <CardBody className="p-6">
                <p className="font-black text-blue-800 text-lg mb-2">Authentication（認證）</p>
                <p className="text-blue-700 mb-3">你是誰？驗證身份的過程。</p>
                <p className="text-sm text-blue-600">就像進辦公室時門禁刷卡——系統確認「這是員工 Joseph」。</p>
                <div className="mt-3 space-y-1 text-xs text-blue-600">
                  <p>• 帳號密碼登入</p>
                  <p>• Google / GitHub 第三方登入</p>
                  <p>• 手機簡訊 OTP</p>
                  <p>• 生物辨識（Face ID）</p>
                </div>
              </CardBody>
            </Card>
            <Card className="border-0 bg-violet-50">
              <CardBody className="p-6">
                <p className="font-black text-violet-800 text-lg mb-2">Authorization（授權）</p>
                <p className="text-violet-700 mb-3">你能做什麼？在確認身份後，確認你有沒有權限執行特定操作。</p>
                <p className="text-sm text-violet-600">就像進了辦公室後，只有 HR 能開薪資系統。</p>
                <div className="mt-3 space-y-1 text-xs text-violet-600">
                  <p>• 角色控制（RBAC）：admin / user / guest</p>
                  <p>• 資源所有者：只能刪自己的文章</p>
                  <p>• API Scope：只能讀取，不能寫入</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Session-Cookie */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Session-Cookie：傳統有狀態認證</h2>
          <p className="text-gray-600 leading-relaxed">
            Session-Cookie 是最傳統的 Web 認證方式。伺服器「記住」使用者的登入狀態，存在記憶體或 Redis 中。
          </p>

          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
            <p className="font-black text-slate-700 mb-4 text-sm">Session-Cookie 流程</p>
            <div className="space-y-2">
              {[
                ['① 登入', '使用者 POST /login，帶帳號密碼'],
                ['② 驗證', '伺服器驗證成功，建立 Session（session_id + 使用者資料）存在 Redis'],
                ['③ Set-Cookie', '伺服器回傳 Set-Cookie: session_id=abc123; HttpOnly; Secure'],
                ['④ 後續請求', '瀏覽器自動帶上 Cookie: session_id=abc123'],
                ['⑤ 驗證 Session', '伺服器用 session_id 到 Redis 查詢使用者資料，確認登入狀態'],
                ['⑥ 登出', '伺服器刪除 Redis 中的 Session，使 Cookie 立即失效'],
              ].map(([step, desc], i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-slate-100">
                  <span className="text-xs font-black text-slate-600 w-20 shrink-0">{step}</span>
                  <span className="text-sm text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-4">
            <p className="font-black text-slate-800 mb-3 text-sm">Set-Cookie 的三個安全屬性</p>
            <div className="space-y-2 text-sm">
              {[
                { attr: 'HttpOnly', desc: '禁止 JavaScript 讀取 Cookie（document.cookie）。防止 XSS 攻擊竊取 Session ID。' },
                { attr: 'Secure', desc: '只在 HTTPS 連線時傳送 Cookie。防止明文傳輸被中間人竊聽。' },
                { attr: 'SameSite=Strict', desc: '跨站請求（CSRF）不帶 Cookie。Strict：完全禁止跨站帶；Lax（推薦）：允許從外部連結導入，但阻止 POST 跨站請求。' },
              ].map(({ attr, desc }) => (
                <div key={attr} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-slate-100">
                  <code className="text-xs font-black text-slate-700 w-28 shrink-0 font-mono">{attr}</code>
                  <span className="text-xs text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">以上三者應同時設定。省略任何一個都可能留下安全漏洞。</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
              <p className="font-black text-green-800 mb-2 text-sm">✅ Session 的優點</p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 可以立即撤銷（刪除 Redis 中的 Session）</li>
                <li>• 敏感資料存在伺服器端，不暴露給客戶端</li>
                <li>• 瀏覽器自動管理 Cookie，不需要前端處理</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
              <p className="font-black text-red-800 mb-2 text-sm">❌ Session 的缺點</p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• 有狀態（Stateful），水平擴展需要共享 Session 存儲</li>
                <li>• CSRF（跨站請求偽造）攻擊的目標</li>
                <li>• 不適合 API / 行動 App（Cookie 是瀏覽器限定）</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* JWT */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Key className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">JWT：無狀態的 Token 認證</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            JWT（JSON Web Token）把使用者資訊編碼在 Token 本身，伺服器不需要儲存 Session——
            只需要驗證 Token 的簽名是否有效。
          </p>

          <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
            <p className="font-black text-blue-800 mb-4 text-sm">JWT 結構：三段 Base64 用「.」分隔</p>
            <div className="font-mono text-sm break-all mb-4">
              <span className="text-red-600 font-black">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
              <span className="text-gray-400">.</span>
              <span className="text-blue-600 font-black">eyJpZCI6MSwiZW1haWwiOiJqb3NlcGhAZXhhbXBsZS5jb20iLCJleHAiOjE3MDAwMDAwMDB9</span>
              <span className="text-gray-400">.</span>
              <span className="text-green-600 font-black">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-red-50 rounded-xl p-3 border border-red-200">
                <p className="font-black text-red-700 mb-1">Header（紅色）</p>
                <pre className="text-gray-600 whitespace-pre-wrap">{`{\n  "alg": "HS256",\n  "typ": "JWT"\n}`}</pre>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                <p className="font-black text-blue-700 mb-1">Payload（藍色）</p>
                <pre className="text-gray-600 whitespace-pre-wrap">{`{\n  "id": 1,\n  "email": "...",\n  "exp": 1700000000\n}`}</pre>
              </div>
              <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                <p className="font-black text-green-700 mb-1">Signature（綠色）</p>
                <p className="text-gray-600">HMACSHA256(<br />base64(header) + "." + base64(payload),<br /><strong>SECRET_KEY</strong>)</p>
              </div>
            </div>
            <p className="text-xs text-blue-700 mt-3">⚠️ Payload 只是 Base64 編碼（不是加密），任何人都能解碼看到內容！不要放敏感資料（密碼、卡號）。</p>
          </div>

          <CodeBlock
            title="JWT 的正確使用方式（Node.js）"
            lang="typescript"
            code={`import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;  // 至少 32 字元的隨機字串

// ── 登入時：簽發 JWT ──────────────────────────────
async function login(email: string, password: string) {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.hashedPassword)) {
        throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        SECRET,
        { expiresIn: '15m' }   // Access Token 短存活期（15 分鐘）
    );

    const refreshToken = jwt.sign(
        { userId: user.id },
        SECRET,
        { expiresIn: '7d' }    // Refresh Token 長存活期（7 天）
    );

    // Refresh Token 存在 HttpOnly Cookie（更安全）
    // Access Token 存在記憶體或 localStorage
    return { accessToken, refreshToken };
}

// ── 每次請求：驗證 JWT ────────────────────────────
function authenticate(req: Request) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) throw new Error('No token');

    try {
        const payload = jwt.verify(token, SECRET) as { userId: number };
        return payload.userId;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
}

// ── Access Token 過期時：用 Refresh Token 換新的 ──
async function refreshAccessToken(refreshToken: string) {
    const payload = jwt.verify(refreshToken, SECRET) as { userId: number };
    const newAccessToken = jwt.sign({ userId: payload.userId }, SECRET, { expiresIn: '15m' });
    return newAccessToken;
}`}
          />

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-4">
            <p className="font-black text-slate-800 mb-2 text-sm">Refresh Token 撤銷：Redis 黑名單</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              JWT 一旦簽發就無法撤銷（直到過期）。若使用者登出或帳號被停用，
              Access Token 15 分鐘後才會失效。需要撤銷 Refresh Token 來防止換新 Token。
            </p>
            <CodeBlock
              language="typescript"
              filename="Refresh Token 撤銷（Redis 黑名單）"
              code={`// 登出時：把 Refresh Token 加進黑名單
async function logout(refreshToken: string) {
  const payload = jwt.verify(refreshToken, SECRET) as { userId: number; exp: number };
  const ttl = payload.exp - Math.floor(Date.now() / 1000);
  // 只需黑名單到原本的過期時間（7天），TTL到期後自動清除
  await redis.setex(\`blacklist:\${refreshToken}\`, ttl, '1');
}

// 換新 Access Token 時：先檢查黑名單
async function refreshAccessToken(refreshToken: string) {
  const isRevoked = await redis.exists(\`blacklist:\${refreshToken}\`);
  if (isRevoked) throw new Error('Refresh token has been revoked');

  const payload = jwt.verify(refreshToken, SECRET) as { userId: number };
  return jwt.sign({ userId: payload.userId }, SECRET, { expiresIn: '15m' });
}`}
            />
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="font-black text-amber-800 mb-2 flex items-center gap-2"><AlertTriangle size={16} /> JWT 最常見的錯誤</p>
            <ul className="text-sm text-amber-700 space-y-1.5">
              <li>• <strong>存在 localStorage</strong>：容易被 XSS 竊取，改用記憶體（React state）+ Refresh Token in HttpOnly Cookie</li>
              <li>• <strong>存活期太長</strong>：Access Token 應該短（15min），搭配 Refresh Token 延續 session</li>
              <li>• <strong>Payload 放密碼</strong>：Payload 只是 Base64，任何人都能解碼</li>
              <li>• <strong>忘記處理過期</strong>：前端要捕捉 401，自動用 Refresh Token 換新 Access Token</li>
            </ul>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* OAuth2 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="text-violet-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">OAuth2：第三方登入的標準流程</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            OAuth2 是「授權委派」協定——讓使用者授權你的應用存取他在 Google / GitHub / Facebook 的資料，
            而不需要把密碼給你。「使用 Google 登入」就是 OAuth2 的 Authorization Code Flow。
          </p>

          <div className="bg-violet-50 rounded-3xl p-6 border border-violet-100">
            <p className="font-black text-violet-800 mb-4 text-sm">OAuth2 Authorization Code Flow（最安全的流程）</p>
            <div className="space-y-2">
              {[
                ['① 使用者點「用 Google 登入」', '你的 App 把使用者導向 Google 的授權頁'],
                ['② Google 詢問使用者', '「要允許 App 存取你的 email 和 profile 嗎？」'],
                ['③ 使用者同意', 'Google 重定向回 App，帶上一次性的 Authorization Code（短存活期）'],
                ['④ 後端用 Code 換 Token', 'App 後端（不是前端！）向 Google 換取 Access Token 和 ID Token'],
                ['⑤ 取得使用者資料', '用 Access Token 向 Google 的 API 取得使用者的 email、姓名等'],
                ['⑥ 建立 Session', 'App 查詢或建立本地使用者帳號，簽發自己的 JWT / Session'],
              ].map(([step, desc], i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-violet-100">
                  <span className="text-xs font-black text-violet-700 w-40 shrink-0">{step}</span>
                  <span className="text-sm text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="Next.js 用 NextAuth.js 實作 Google 登入（最簡方式）"
            lang="typescript"
            code={`// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // 第一次登入時，account 有 Google 回傳的資料
            if (account && profile) {
                token.userId = await findOrCreateUser(profile.email, profile.name);
            }
            return token;
        },
        async session({ session, token }) {
            session.userId = token.userId;  // 把 userId 帶進 session
            return session;
        },
    },
});

export { handler as GET, handler as POST };

// ── 在組件中使用 ──────────────────────────────────
// 'use client'
import { useSession, signIn, signOut } from 'next-auth/react';

export function AuthButton() {
    const { data: session } = useSession();
    if (session) {
        return <button onClick={() => signOut()}>登出 {session.user?.name}</button>;
    }
    return <button onClick={() => signIn('google')}>用 Google 登入</button>;
}`}
          />
        </section>

        <div className="bg-violet-50 rounded-2xl p-5 border border-violet-200">
          <p className="font-black text-violet-800 mb-2 text-sm">⚠️ OAuth2 和 Session / JWT 的關係</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            OAuth2 解決的是「<strong>使用者授權第三方存取其帳號</strong>」的問題——它本身不規定你要用 Session 還是 JWT。
            第⑥步 NextAuth 拿到 Google 的使用者資料後，<strong>你的 App 自己決定</strong>要簽發 Session（存 Redis）還是 JWT。
            NextAuth 預設使用加密的 Session Cookie（本質是 JWT），你也可以換成 Database Adapter 改用 Redis Session。
          </p>
        </div>

        <Divider className="opacity-30" />

        {/* Session vs JWT 選擇 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900">Session vs JWT：怎麼選？</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {['', 'Session-Cookie', 'JWT'].map(h => (
                    <th key={h} className="text-left p-3 font-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['有無狀態', 'Stateful（需要 Redis）', 'Stateless（伺服器不存資料）'],
                  ['水平擴展', '需要共享 Session Store', '✅ 任一台伺服器都能驗證'],
                  ['立即撤銷', '✅ 刪 Redis 即時生效', '❌ 需等 Token 自然過期（或黑名單）'],
                  ['適合場景', 'Web 應用（傳統 MVC）', 'API、行動 App、微服務'],
                  ['CSRF 風險', '有（Cookie 自動帶上）', '無（需手動帶 Header）'],
                  ['XSS 風險', '低（HttpOnly Cookie）', '高（若存 localStorage）'],
                ].map(([key, session, jwt], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="p-3 font-black text-gray-700 border-b border-gray-100">{key}</td>
                    <td className="p-3 text-gray-600 border-b border-gray-100">{session}</td>
                    <td className="p-3 text-gray-600 border-b border-gray-100">{jwt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <p className="font-black text-blue-800 mb-2 text-sm">實務建議</p>
            <p className="text-sm text-blue-700 leading-relaxed">
              <strong>傳統 Web App（Next.js SSR）</strong>：用 NextAuth.js，它幫你管理 Session-Cookie，簡單安全。<br />
              <strong>Pure API / 行動 App</strong>：用 JWT（短存活 Access Token + HttpOnly Cookie 的 Refresh Token）。<br />
              <strong>第三方登入</strong>：不要自己實作 OAuth2，用 NextAuth.js / Auth.js / Clerk 等成熟方案。
            </p>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-indigo-700 to-blue-700 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '🎭', text: 'Authentication（認證）= 你是誰；Authorization（授權）= 你能做什麼。這是兩個不同的問題，要分開處理。' },
                { emoji: '🍪', text: 'Session-Cookie：有狀態，能立即撤銷，適合 Web；擴展需要共享 Redis，有 CSRF 風險。' },
                { emoji: '🎟️', text: 'JWT 三段結構：Header（演算法）+ Payload（資料，僅 Base64）+ Signature（驗證簽名）。Payload 不是加密！' },
                { emoji: '⏱️', text: 'Access Token 短存活（15min）+ Refresh Token 長存活（7 天，存 HttpOnly Cookie），這是目前最佳實踐。' },
                { emoji: '🌐', text: 'OAuth2 Authorization Code Flow：使用者授權 → Code → 後端換 Token → 取得使用者資料。Code 交換必須在後端做。' },
                { emoji: '🛡️', text: '直接用 NextAuth.js / Clerk，不要自己實作 OAuth2——Auth 的細節太多，自己實作很容易出安全漏洞。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        <div className="flex justify-start">
          <Link href="/blog/network/ep01-http" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6 w-full sm:w-1/2">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">EP.01 — HTTP 深挖</p>
            <p className="text-sm text-gray-500 mt-1">DNS、TCP、TLS、HTTP/1.1 到 HTTP/3</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['JWT', 'OAuth2', 'Session', 'Cookie', 'Authentication', 'Authorization', 'NextAuth', 'EP.04'].map(tag => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
