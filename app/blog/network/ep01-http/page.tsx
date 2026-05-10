'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Globe,
  Zap,
  Shield,
  Layers
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function NetworkEP01() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50">
      <div className="bg-gradient-to-br from-sky-700 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.01</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網路與協定</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              HTTP 深挖：從輸入網址到畫面出現<br />
              <span className="text-sky-200">DNS、TCP、TLS、HTTP/1.1、HTTP/2、HTTP/3</span>
            </h1>
            <p className="text-sky-100 text-lg mb-8 max-w-2xl">
              每次瀏覽器請求都走過一條你看不見的旅程。理解這條路上發生了什麼，
              才能真正排查效能問題、理解 HTTPS 的意義，以及為什麼 HTTP/2 比 HTTP/1.1 快。
            </p>
            <div className="flex items-center gap-6 text-sky-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> HTTP · DNS · TCP · TLS · HTTP/2</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-sky-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「你的網頁為什麼慢？CDN 能解決什麼問題？HTTPS 是怎麼加密的？
                    這些問題的答案，都藏在瀏覽器的第一個請求裡。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    HTTP 是 Web 開發的底層基礎，但很多工程師對它的理解停在「request/response 模型」。
                    這篇帶你走過一次完整的瀏覽器請求旅程，從 DNS 解析到頁面渲染，每一步都拆解清楚。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 整體旅程 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Globe className="text-sky-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">完整旅程：輸入網址到畫面出現</h2>
          </div>

          <div className="space-y-2">
            {[
              { step: '①', title: 'DNS 解析', desc: '把 chullin.tw 翻譯成 IP 位址（如 76.76.21.21）', time: '~50ms（無快取）', color: 'bg-sky-100 text-sky-800' },
              { step: '②', title: 'TCP 三向握手', desc: '與伺服器建立可靠的連線（SYN → SYN-ACK → ACK）', time: '1× RTT', color: 'bg-blue-100 text-blue-800' },
              { step: '③', title: 'TLS 握手（HTTPS）', desc: '協商加密方式、驗證憑證、交換金鑰', time: '1–2× RTT', color: 'bg-indigo-100 text-indigo-800' },
              { step: '④', title: 'HTTP 請求', desc: '發送 GET / POST 請求，帶上 Headers（Cookie、Accept-Language 等）', time: '1× RTT', color: 'bg-violet-100 text-violet-800' },
              { step: '⑤', title: '伺服器處理', desc: '路由匹配、DB 查詢、業務邏輯、回傳 Response', time: '視業務邏輯而定', color: 'bg-purple-100 text-purple-800' },
              { step: '⑥', title: '瀏覽器渲染', desc: '解析 HTML → 建構 DOM → 載入 CSS/JS → 渲染畫面', time: '視資源大小而定', color: 'bg-pink-100 text-pink-800' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5 ${item.color}`}>{item.step}</span>
                <div className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="font-black text-gray-800 text-sm">{item.title}</p>
                    <span className="text-xs text-gray-400 font-mono">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* DNS */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">DNS：網路的電話簿</h2>
          <p className="text-gray-600 leading-relaxed">
            DNS（Domain Name System）把人類可讀的域名翻譯成機器可用的 IP 位址。
            DNS 查詢有層層快取——瀏覽器快取 → OS 快取 → 路由器快取 → ISP DNS → 權威 DNS。
          </p>

          <div className="bg-sky-50 rounded-3xl p-6 border border-sky-100">
            <p className="font-black text-sky-800 mb-4 text-sm">DNS 查詢流程（無快取情況）</p>
            <div className="space-y-2 text-sm">
              {[
                ['瀏覽器', '問 OS：chullin.tw 的 IP 是多少？'],
                ['OS', '問 ISP DNS Server（遞迴解析器）'],
                ['ISP DNS', '問根名稱伺服器（Root）：.app 在哪？'],
                ['Root', '回答：.app 的 TLD Server 在這裡'],
                ['ISP DNS', '問 .app TLD Server：vercel.app 在哪？'],
                ['TLD', '回答：vercel.app 的權威 DNS 在這裡'],
                ['ISP DNS', '問 Vercel 的權威 DNS：chullin.tw 的 IP？'],
                ['Vercel DNS', '回答：76.76.21.21（並設定 TTL，例如 300s）'],
                ['ISP DNS', '快取結果並回傳給 OS，OS 再回傳給瀏覽器'],
              ].map(([from, msg], i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-sky-100">
                  <span className="text-xs font-black text-sky-700 w-20 shrink-0">{from}</span>
                  <span className="text-xs text-gray-600">{msg}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="font-black text-amber-800 mb-2 text-sm">💡 DNS TTL 與快取</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              TTL（Time To Live）決定 DNS 記錄快取多久。設太長（例如 86400s = 1 天）：換 IP 時更新慢。設太短（例如 60s）：查詢次數增加，有延遲。
              部署新服務前，建議先把 TTL 降低，確認沒問題再恢復。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* TCP */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">TCP 三向握手：建立可靠連線</h2>
          <p className="text-gray-600 leading-relaxed">
            HTTP 跑在 TCP 之上。TCP 的「可靠性」來自於連線建立時的三向握手，以及傳輸過程中的確認（ACK）和重傳機制。
          </p>

          <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
            <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
              {[
                { step: 'SYN', from: '客戶端 → 伺服器', desc: '「我想連線，我的序號是 X」', color: 'bg-blue-600' },
                { step: 'SYN-ACK', from: '伺服器 → 客戶端', desc: '「好的，我收到了 X，我的序號是 Y」', color: 'bg-indigo-600' },
                { step: 'ACK', from: '客戶端 → 伺服器', desc: '「收到 Y，連線建立！」', color: 'bg-violet-600' },
              ].map((item, i) => (
                <div key={i}>
                  <div className={`${item.color} text-white font-black px-4 py-2 rounded-xl mb-2`}>{item.step}</div>
                  <p className="text-xs text-gray-500 mb-1">{item.from}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-blue-700 mt-4 font-medium">
              三向握手需要 1.5× RTT（Round Trip Time）——這是 HTTP/1.1 的固定延遲成本。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* TLS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">TLS：HTTPS 的加密原理</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            HTTPS = HTTP + TLS（Transport Layer Security）。TLS 在 TCP 連線建立後，
            透過握手過程協商加密方式，保證通訊內容無法被中間人竊聽或篡改。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-slate-50">
              <CardBody className="p-5">
                <p className="font-black text-slate-800 mb-3">TLS 握手做了什麼？</p>
                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                  <li>Client 發送支援的加密套件清單</li>
                  <li>Server 選擇加密套件，回傳數位憑證（含公鑰）</li>
                  <li>Client 驗證憑證是否由可信的 CA 簽發</li>
                  <li>雙方用非對稱加密（RSA / ECDH）交換「預主密鑰」</li>
                  <li>雙方各自計算出相同的「對話金鑰（Session Key）」</li>
                  <li>後續所有資料用對話金鑰做對稱加密（AES）傳輸</li>
                </ol>
              </CardBody>
            </Card>
            <Card className="border-0 bg-indigo-50">
              <CardBody className="p-5">
                <p className="font-black text-indigo-800 mb-3">為什麼非對稱 + 對稱混用？</p>
                <p className="text-sm text-indigo-700 leading-relaxed mb-3">
                  <strong>非對稱加密</strong>（RSA/ECDH）：安全但慢，只用於握手階段交換金鑰。
                </p>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  <strong>對稱加密</strong>（AES）：快但需要雙方都有同一把金鑰，透過非對稱加密安全交換。
                </p>
                <p className="text-sm text-indigo-600 mt-3 font-medium">結果：安全性 + 效能兼顧。</p>
              </CardBody>
            </Card>
          </div>
        </section>

        <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-200">
          <p className="font-black text-indigo-800 mb-3 text-sm">TCP + TLS 的累積 RTT 成本</p>
          <div className="space-y-2 text-sm">
            {[
              { label: 'TCP 三向握手', rtt: '1× RTT', note: '每次建立新連線都要付', color: 'bg-blue-100 text-blue-700' },
              { label: 'TLS 1.2 握手', rtt: '+ 2× RTT', note: '驗證憑證 + 交換金鑰（兩個來回）', color: 'bg-indigo-100 text-indigo-700' },
              { label: 'TLS 1.3 握手', rtt: '+ 1× RTT', note: '簡化握手流程，減少一個來回', color: 'bg-violet-100 text-violet-700' },
              { label: 'HTTP 請求', rtt: '+ 1× RTT', note: '發出請求才收到第一個 byte', color: 'bg-purple-100 text-purple-700' },
            ].map(({ label, rtt, note, color }) => (
              <div key={label} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-indigo-100">
                <span className="text-xs text-gray-700 w-32 shrink-0">{label}</span>
                <span className={`text-xs font-black px-2 py-0.5 rounded font-mono ${color}`}>{rtt}</span>
                <span className="text-xs text-gray-500">{note}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-indigo-700 mt-3 leading-relaxed">
            結論：使用 TLS 1.2 時，第一個請求需要 <strong>4.5× RTT</strong> 才能收到資料（TCP 1 + TLS 1.2 2 + HTTP 1 + 0.5 ACK）。
            TLS 1.3 降至 <strong>3.5× RTT</strong>，HTTP/2 + TLS 1.3 + 連線復用可降至 <strong>2.5× RTT</strong>（後續請求 1× RTT）。
            這就是為什麼 <code className="bg-indigo-100 px-1 rounded">keep-alive</code>、HTTP/2、以及 TLS 1.3 對頁面速度影響巨大。
          </p>
        </div>

        <Divider className="opacity-30" />

        {/* HTTP 版本演進 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">HTTP/1.1 → HTTP/2 → HTTP/3</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                version: 'HTTP/1.1（1997）',
                problem: 'Head-of-Line Blocking：同一個 TCP 連線一次只能處理一個請求。瀏覽器用「開多條連線」（6個）繞過，但有 TCP 握手 overhead。',
                feature: '持久連線（Connection: keep-alive）、分塊傳輸',
                color: 'bg-slate-50 border-slate-200',
                badge: 'bg-slate-200 text-slate-700',
              },
              {
                version: 'HTTP/2（2015）',
                problem: '',
                feature: '多路復用（Multiplexing）：同一個 TCP 連線可以並行傳多個請求/回應，解決 HOL Blocking。Header 壓縮（HPACK）。Server Push（伺服器主動推送資源）已於 2022 年被 Chrome 移除，實際採用率極低，可忽略。',
                color: 'bg-blue-50 border-blue-200',
                badge: 'bg-blue-200 text-blue-700',
              },
              {
                version: 'HTTP/3（2022）',
                problem: '',
                feature: '改用 QUIC（UDP-based）取代 TCP，解決 TCP 層的 HOL Blocking。0-RTT 重連（快取的連線資訊可以重用）。網路切換（WiFi↔4G）不中斷連線。',
                color: 'bg-indigo-50 border-indigo-300',
                badge: 'bg-indigo-200 text-indigo-800',
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${item.badge} mb-2 inline-block`}>{item.version}</span>
                {item.problem && <p className="text-sm text-red-600 mb-2">❌ 問題：{item.problem}</p>}
                <p className="text-sm text-gray-700">✅ {item.feature}</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
            <p className="font-black text-emerald-800 mb-2 text-sm">實務：Vercel 已全面支援 HTTP/2 和 HTTP/3</p>
            <p className="text-sm text-emerald-700">
              部署到 Vercel 後，你的站點自動支援 HTTP/2（甚至 HTTP/3）。
              在 Chrome DevTools → Network → Protocol 欄位可以看到 h2（HTTP/2）或 h3（HTTP/3）。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* HTTP 訊息結構 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-sky-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">HTTP 訊息結構：Request & Response</h2>
          </div>

          <CodeBlock
            title="HTTP Request 結構"
            lang="http"
            code={`GET /api/users/1 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
Cookie: session_id=abc123
User-Agent: Mozilla/5.0 ...

(body，GET 通常沒有 body)`}
          />

          <div className="bg-sky-50 rounded-2xl p-5 border border-sky-200">
            <p className="font-black text-sky-800 mb-2 text-sm">Cache-Control 與 ETag：瀏覽器快取的兩層機制</p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <p className="font-bold text-gray-700 mb-1">Cache-Control: max-age=3600</p>
                <p className="leading-relaxed">「這份資源在 <strong>3600 秒（1 小時）內直接用快取</strong>，不需要再問伺服器。」
                  瀏覽器在 TTL 內連請求都不發出，速度最快。</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-1">ETag: "33a64df..."</p>
                <p className="leading-relaxed">快取過期後，瀏覽器帶著 ETag 問伺服器：「這個版本還有效嗎？」
                  若資源未更動，伺服器回 <strong>304 Not Modified</strong>（不傳 body），省頻寬。</p>
              </div>
            </div>
            <p className="text-xs text-sky-700 mt-2">兩者常搭配使用：max-age 控制「多久不用問」，ETag 控制「問了之後要不要重傳」。</p>
          </div>

          <CodeBlock
            title="HTTP Response 結構"
            lang="http"
            code={`HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: max-age=3600, public
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
X-Request-Id: 7e9f1a2b-...
Set-Cookie: session_id=xyz789; HttpOnly; Secure; SameSite=Strict

{
  "id": 1,
  "name": "Joseph",
  "email": "joseph@example.com"
}`}
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-sky-700 text-white">
                  <th className="text-left p-3 font-black">狀態碼</th>
                  <th className="text-left p-3 font-black">含義</th>
                  <th className="text-left p-3 font-black">常見情境</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['200 OK', '請求成功', 'GET 成功回傳資料'],
                  ['201 Created', '建立成功', 'POST 新增資源'],
                  ['204 No Content', '成功但無回傳內容', 'DELETE 成功'],
                  ['301 Moved Permanently', '永久重定向', 'HTTP → HTTPS、舊網址換新網址'],
                  ['304 Not Modified', '快取有效，不需回傳內容', 'ETag / Last-Modified 快取命中'],
                  ['400 Bad Request', '請求格式錯誤', '缺少必填欄位、格式錯誤'],
                  ['401 Unauthorized', '未認證', '沒帶 Token 或 Token 過期'],
                  ['403 Forbidden', '已認證但無權限', '一般使用者存取管理員頁面'],
                  ['404 Not Found', '資源不存在', '找不到 /users/999'],
                  ['409 Conflict', '狀態衝突', '重複建立、並發修改衝突'],
                  ['429 Too Many Requests', '超過速率限制', 'API Rate Limiting'],
                  ['500 Internal Server Error', '伺服器內部錯誤', '程式碼例外、DB 連線失敗'],
                  ['503 Service Unavailable', '服務暫時不可用', '部署中、過載'],
                ].map(([code, meaning, scenario], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-sky-50/30'}>
                    <td className="p-3 font-mono font-black text-sky-700 border-b border-sky-100">{code}</td>
                    <td className="p-3 text-gray-700 border-b border-sky-100">{meaning}</td>
                    <td className="p-3 text-gray-500 text-xs border-b border-sky-100">{scenario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-sky-700 to-blue-700 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '🗺️', text: '一次瀏覽器請求：DNS 解析 → TCP 握手 → TLS 握手 → HTTP 請求/回應 → 渲染。每一步都有延遲成本。' },
                { emoji: '📖', text: 'DNS 把域名翻譯成 IP，有多層快取（瀏覽器→OS→ISP→根→TLD→權威）。TTL 控制快取時間。' },
                { emoji: '🤝', text: 'TCP 三向握手建立可靠連線（SYN→SYN-ACK→ACK），需要 1.5× RTT，是 HTTP 的固定延遲成本。' },
                { emoji: '🔐', text: 'TLS = 非對稱加密交換金鑰 + 對稱加密傳輸資料。驗證憑證保護你不被中間人攻擊。' },
                { emoji: '⚡', text: 'HTTP/2 多路復用解決 HOL Blocking；HTTP/3 改用 QUIC（UDP）更進一步，網路切換不斷線。' },
                { emoji: '📊', text: '熟悉狀態碼：200/201/204 是成功，3xx 是重定向，4xx 是客戶端問題，5xx 是伺服器問題。' },
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

        <div className="flex justify-end">
          <Link href="/blog/network/ep04-jwt-oauth2" className="group block bg-gray-50 hover:bg-sky-50 transition-colors rounded-2xl p-6 w-full sm:w-1/2 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-sky-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-sky-600 transition-colors">EP.04 — 認證與授權</p>
            <p className="text-sm text-gray-500 mt-1">JWT、OAuth2、Session 的正確使用</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['HTTP', 'DNS', 'TCP', 'TLS', 'HTTPS', 'HTTP/2', 'HTTP/3', 'Network', 'EP.01'].map(tag => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
