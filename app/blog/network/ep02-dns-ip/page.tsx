import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Globe,
  Wifi,
  Server,
  Zap,
  Shield,
  Network
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '你輸入 google.com 接下來 0.1 秒發生了什麼？ | Joseph Chen',
  description: 'DNS 解析、IP 路由、TCP 握手——最經典面試題的完整解答。 很多人能說個大概，但說不完整。這篇從頭到尾把每一步說清楚。',
  alternates: {
    canonical: 'https://chullin.tw/blog/network/ep02-dns-ip',
  },
};



export default function NetworkEP02() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.02</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網路系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              你輸入 google.com<br />
              <span className="text-sky-200">接下來 0.1 秒發生了什麼？</span>
            </h1>
            <p className="text-sky-100 text-lg mb-8 max-w-2xl">
              DNS 解析、IP 路由、TCP 握手——最經典面試題的完整解答。
              很多人能說個大概，但說不完整。這篇從頭到尾把每一步說清楚。
            </p>
            <div className="flex items-center gap-6 text-sky-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> DNS · IP · TCP · CDN · 面試必考</span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* 開場 Quote */}
        <section   >
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-lg">
            <div className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-sky-400 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「『從瀏覽器輸入 URL 到頁面顯示，中間發生了什麼？』——這是軟體工程師面試最常見的問題之一。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    很多人能說「DNS 解析、TCP 連線、發 HTTP Request」，但面試官要的是細節：
                    DNS 是怎麼查的？TCP 為什麼要三次握手？CDN 是在哪個環節介入的？
                    這篇把每一步完整拆解，讓你下次不只是說個大概。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* Section 1: 整體流程 */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <Globe className="text-sky-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">整體流程鳥瞰</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            輸入 URL 到頁面出現，一共走過 6 個大步驟。這篇專注在前三步（DNS、TCP、IP），
            HTTP 在 EP.01 已經說過，HTTPS/TLS 在 EP.03 繼續。
          </p>

          <div className="space-y-2">
            {[
              {
                num: '01',
                title: 'DNS 解析',
                desc: '把 google.com 這個「名字」翻譯成 142.250.185.14 這個「地址」',
                badge: '本篇重點',
                color: 'from-sky-500 to-blue-500',
                badgeColor: 'bg-sky-100 text-sky-700',
                highlight: true,
              },
              {
                num: '02',
                title: '建立 TCP 連接（三次握手）',
                desc: '確認你和伺服器之間的連線是通的，雙方都準備好收發資料',
                badge: '本篇重點',
                color: 'from-blue-500 to-indigo-500',
                badgeColor: 'bg-blue-100 text-blue-700',
                highlight: true,
              },
              {
                num: '03',
                title: 'TLS 握手（HTTPS 才有）',
                desc: '協商加密方式、驗證憑證，建立加密通道，詳見 EP.03',
                badge: 'EP.03',
                color: 'from-indigo-400 to-purple-400',
                badgeColor: 'bg-indigo-100 text-indigo-600',
                highlight: false,
              },
              {
                num: '04',
                title: '發出 HTTP Request',
                desc: 'GET / POST 請求，帶上 Headers（Cookie、Accept 等），詳見 EP.01',
                badge: 'EP.01',
                color: 'from-purple-400 to-pink-400',
                badgeColor: 'bg-purple-100 text-purple-600',
                highlight: false,
              },
              {
                num: '05',
                title: '伺服器處理並回應',
                desc: '路由匹配、DB 查詢、業務邏輯、組成 HTML/JSON 回傳',
                badge: '後端範疇',
                color: 'from-pink-400 to-rose-400',
                badgeColor: 'bg-pink-100 text-pink-600',
                highlight: false,
              },
              {
                num: '06',
                title: '瀏覽器解析 HTML + 渲染',
                desc: '建構 DOM Tree、載入 CSS/JS、計算 Layout、繪製畫面',
                badge: '前端渲染',
                color: 'from-rose-400 to-orange-400',
                badgeColor: 'bg-rose-100 text-rose-600',
                highlight: false,
              },
            ].map((item, i) => (
              <FadeIn>
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-black text-sm shrink-0`}>
                  {item.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-gray-800">{item.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.badgeColor}`}>{item.badge}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* Section 2: DNS */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <Network className="text-sky-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">DNS——網路的「電話本」</h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md bg-sky-50">
            <div className="p-6">
              <p className="text-sky-800 leading-relaxed">
                <strong>生活化比喻：</strong>你知道一間餐廳叫「麥當勞」，但你不知道它的地址。
                你查了 Google Maps，得到地址「台北市信義路 X 號」。
                <strong>DNS 就是網路的 Google Maps</strong>——把名字（域名 google.com）
                轉換成地址（IP 142.250.185.14）。沒有 DNS，你就必須記住每個網站的 IP，
                沒有人做得到。
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800">DNS 解析的完整過程</h3>

          <p className="text-gray-600 leading-relaxed">
            查詢 DNS 不是問一個伺服器那麼簡單，而是一層一層往上問，
            直到有人知道答案。越高層的 DNS 伺服器知道的越少，
            但最終一定能找到。
          </p>

          <CodeBlock
            title="DNS 解析路徑（無快取情況）"
            lang="bash"
            code={`你的瀏覽器
  ↓ 1. 先查瀏覽器自己的 DNS 快取（幾分鐘前去過就有）
  ↓    沒有 → 問 OS
  ↓ 2. 查 OS 的快取（包括 /etc/hosts 設定）
  ↓    沒有 → 問 Router
  ↓ 3. 問你家 Router 的 DNS（通常是 ISP 給的 192.168.x.x）
  ↓    沒有 → 問 ISP 的遞迴 DNS 伺服器
  ↓ 4. ISP 遞迴 DNS（Recursive Resolver）
  ↓    這台伺服器負責幫你問到底
  ↓    它先問 Root DNS Server（13 組，全球都有備份）
  ↓
Root DNS：「我不知道 google.com 在哪，但 .com 的伺服器我知道，去問它」
  ↓
TLD DNS (.com)：「我不知道 google.com，但 google.com 的授權 DNS 我知道，去問它」
  ↓
Authoritative DNS（Google 的 DNS）：
  「google.com = 142.250.185.14，TTL 300 秒」
  ↓
← 層層回傳，最終告訴你的瀏覽器：
   google.com → 142.250.185.14`}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-6">
                <p className="font-bold text-gray-800 mb-3">為什麼要分這麼多層？</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  全球有幾億個域名。如果只有一台 DNS 伺服器，每次查詢都打去同一台，
                  早就被流量打掛了。分層設計讓查詢分散，
                  快取讓大部分查詢在 ISP 層就結束，不需要每次都問到 Root。
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-6">
                <p className="font-bold text-gray-800 mb-3">TTL（Time to Live）</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  每條 DNS 記錄都有 TTL，單位是秒。TTL 300 = 快取 5 分鐘後過期。
                  過期後下次查詢才會重新問。遷移網站時記得先把 TTL 調低（例如 60 秒），
                  這樣換 IP 後才能快速生效。
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800">常見 DNS Record 類型</h3>

          <CodeBlock
            title="DNS Record 速查表"
            lang="bash"
            code={`# A Record：域名 → IPv4（最常見）
A     www.example.com  →  93.184.216.34

# AAAA Record：域名 → IPv6
AAAA  www.example.com  →  2606:2800:220:1:248:1893:25c8:1946

# CNAME：別名，指向另一個域名（而不是 IP）
# 常見用途：shop.example.com 指向 CDN 或 Shopify
CNAME shop.example.com  →  example.myshopify.com

# MX：郵件伺服器（寄信去哪台）
MX    example.com       →  mail.example.com  (優先級 10)

# TXT：文字記錄，常用於驗證（Google 驗證、SPF 防偽造信件）
TXT   example.com       →  "v=spf1 include:_spf.google.com ~all"

# TTL：快取多久（秒）
TTL   300               →  5 分鐘後過期，重新查詢`}
          />

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-l-4 border-l-amber-400 bg-amber-50 border-0 shadow-none">
            <div className="p-6">
              <p className="font-bold text-amber-800 mb-2">CNAME vs A Record 怎麼選？</p>
              <p className="text-amber-700 text-sm leading-relaxed">
                如果你的服務 IP 會變動（例如 Vercel、Cloudflare 托管），用 CNAME 指向他們給你的 hostname。
                這樣他們改 IP 你不需要動任何設定。
                如果你的伺服器 IP 固定（例如自架 VPS），用 A Record 直接指 IP 比較乾淨。
                注意：根域名（<code className="bg-amber-100 px-1 rounded font-mono">example.com</code>，不帶 www）通常不能設 CNAME，要用 A Record 或特殊的 ALIAS 記錄。
              </p>
            </div>
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* Section 3: IP */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <Server className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">IP 地址——你在哪裡</h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md bg-blue-50">
            <div className="p-6">
              <p className="text-blue-800 leading-relaxed">
                <strong>比喻：</strong>IP 地址就像快遞地址。
                IPv4 是舊式地址（四段數字，如 <code className="bg-blue-100 px-1 rounded font-mono">192.168.1.1</code>），
                總共只有 42 億個，早就快用完了。IPv6 是新式地址，長度更長、數量幾乎無限。
                Port 就像「幾樓幾號」——同一台電腦可以同時運行網頁伺服器、資料庫、SSH 等多個服務，
                用 Port 區分哪個服務要接哪個連線。
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-6">
                <p className="font-bold text-gray-800 mb-3">IPv4 vs IPv6</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">格式</span>
                    <span className="font-mono text-gray-700">192.168.1.1</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">位元數</span>
                    <span className="font-mono text-gray-700">32 bits</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">總數量</span>
                    <span className="font-mono text-gray-700">~42 億</span>
                  </div>
                  <div className="mt-4 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-400 mb-2">IPv6</p>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">格式</span>
                    <span className="font-mono text-gray-700 text-xs">2001:db8::1</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">位元數</span>
                    <span className="font-mono text-gray-700">128 bits</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">總數量</span>
                    <span className="font-mono text-gray-700">3.4 × 10³⁸</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-6">
                <p className="font-bold text-gray-800 mb-3">常見 Port 速查</p>
                <div className="space-y-1.5 font-mono text-sm">
                  {[
                    { port: '80', service: 'HTTP（網頁）' },
                    { port: '443', service: 'HTTPS（加密網頁）' },
                    { port: '22', service: 'SSH（遠端登入）' },
                    { port: '3306', service: 'MySQL' },
                    { port: '5432', service: 'PostgreSQL' },
                    { port: '27017', service: 'MongoDB' },
                    { port: '3000', service: 'Next.js / React 開發伺服器' },
                    { port: '8080', service: '後端 API 常見開發 port' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold w-14 shrink-0">{item.port}</span>
                      <span className="text-gray-500 text-xs">→</span>
                      <span className="text-gray-600 text-xs">{item.service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            你平常連 <code className="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded font-mono">http://localhost:3000</code>，
            就是在連你自己電腦（localhost = 127.0.0.1）的 3000 port。
            瀏覽器連 <code className="bg-gray-100 text-blue-700 px-1.5 py-0.5 rounded font-mono">https://google.com</code> 不帶 port，
            是因為 HTTPS 預設就是 443，瀏覽器自動補上。
          </p>
        </section>

        <hr  className="border-gray-100" />

        {/* Section 4: TCP 三次握手 */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <Wifi className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">TCP 三次握手——打電話確認連線</h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md bg-indigo-50">
            <div className="p-6">
              <p className="text-indigo-800 leading-relaxed">
                <strong>比喻：</strong>打電話確認連線。你打電話（SYN），
                對方說「有聽到嗎？」（SYN-ACK），你說「有聽到，開始說吧」（ACK）——
                然後才開始真正的對話。這三個步驟確保雙方都能收發，才開始傳真正的資料。
              </p>
            </div>
          </div>

          <CodeBlock
            title="TCP 三次握手流程"
            lang="bash"
            code={`Client（你的瀏覽器）              Server（Google 的伺服器）

Client → Server : SYN
  「我想跟你連線，序號從 1000 開始」
                                    ↓
                   Server → Client : SYN-ACK
                     「收到了！我的序號從 2000 開始
                      確認你的序號是 1001」
                                    ↓
Client → Server : ACK
  「收到！確認你的序號是 2001」

[連線建立，雙方都確認能收發，可以開始傳 HTTP 資料了]`}
          />

          <h3 className="text-xl font-bold text-gray-800">為什麼需要三次，不是兩次？</h3>

          <p className="text-gray-600 leading-relaxed">
            這是個好問題，很多面試官會追問。用情境解釋：
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md bg-red-50">
              <div className="p-6">
                <p className="font-bold text-red-800 mb-3">兩次握手的問題</p>
                <ol className="space-y-2 text-sm text-red-700">
                  <li className="flex items-start gap-2"><span className="font-bold shrink-0">1.</span> Client 發 SYN（舊的，因為網路延遲才到）</li>
                  <li className="flex items-start gap-2"><span className="font-bold shrink-0">2.</span> Server 收到，回 SYN-ACK，以為連線建立</li>
                  <li className="flex items-start gap-2"><span className="font-bold shrink-0">3.</span> 但 Client 早就放棄這個連線了（太舊了）</li>
                  <li className="flex items-start gap-2"><span className="font-bold shrink-0">4.</span> Server 白白開著一個半連接等 Client，浪費資源</li>
                </ol>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md bg-green-50">
              <div className="p-6">
                <p className="font-bold text-green-800 mb-3">三次握手的保障</p>
                <ol className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2"><span className="font-bold shrink-0">1.</span> Client 確認 Server 收到了 SYN（靠 SYN-ACK）</li>
                  <li className="flex items-start gap-2"><span className="font-bold shrink-0">2.</span> Server 確認 Client 收到了 SYN-ACK（靠 ACK）</li>
                  <li className="flex items-start gap-2"><span className="font-bold shrink-0">3.</span> 雙方都確認對方能收發，才建立連線</li>
                  <li className="flex items-start gap-2"><span className="font-bold shrink-0">4.</span> Server 不會為舊的 SYN 白開連線</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-l-4 border-l-indigo-500 border-0 shadow-none bg-indigo-50">
            <div className="p-6">
              <p className="font-bold text-indigo-800 mb-2">TCP vs UDP——什麼時候不需要握手？</p>
              <p className="text-indigo-700 text-sm leading-relaxed">
                TCP 可靠但較慢（三次握手的額外往返）。UDP 直接送不管有沒有收到，
                很快但不可靠。視訊通話、線上遊戲、DNS 查詢用 UDP——
                偶爾掉幾個封包比等重傳更可接受。一般網頁（HTTP/HTTPS）用 TCP——
                確保資料完整很重要。HTTP/3（QUIC 協議）則是在 UDP 上自己實現可靠傳輸，
                兼顧速度和可靠性。
              </p>
            </div>
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* Section 5: CDN */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <div className="flex items-center gap-3">
            <Zap className="text-sky-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">CDN——讓台灣連美國網站也快</h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md bg-sky-50">
            <div className="p-6">
              <p className="text-sky-800 leading-relaxed">
                <strong>比喻：</strong>McDonald's 在全球各地都有分店，你不用飛去美國總部買漢堡。
                CDN（Content Delivery Network）就是網路的麥當勞——
                把內容分發到全球各地的伺服器，你連最近的那台就好。
                台灣的用戶連台灣的 CDN 節點，不需要跨太平洋連美國，延遲從 200ms 降到 20ms。
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800">CDN 怎麼知道要回應哪台伺服器？</h3>

          <p className="text-gray-600 leading-relaxed">
            這裡 DNS 又出現了。CDN 的神奇之處在於：
            <strong>相同的域名，對不同地區的用戶，DNS 會回傳不同的 IP</strong>。
          </p>

          <CodeBlock
            title="CDN 工作原理——從 DNS 到就近節點"
            lang="bash"
            code={`你（台灣用戶）請求 cdn.example.com/image.jpg

Step 1. DNS 解析
  你的 DNS 請求打到 CDN 的 Authoritative DNS
  CDN DNS 根據你的 IP 判斷地理位置：「這個 IP 在台灣」
  回傳距你最近的 CDN 節點 IP：例如 Cloudflare 台北節點

Step 2. 連線到就近節點
  你連到台北的 CDN 伺服器（延遲 < 30ms）
  而不是美國的原始伺服器（延遲 ~200ms）

Step 3. 快取命中或回源
  [快取命中] CDN 已有這個檔案的副本 → 直接回應，超快
  [快取未命中] CDN 去原始伺服器拿 → 存起來 → 回應給你

同一個請求：
  無 CDN：台灣 → 美國伺服器（200ms）
  有 CDN：台灣 → 台北 CDN 節點（20ms）`}
          />

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: '靜態資源加速',
                desc: '圖片、CSS、JS、字型這類不常變的東西最適合 CDN。一旦快取就可以服務全球用戶。',
                color: 'bg-sky-50 border-sky-200',
              },
              {
                title: 'DDoS 防護',
                desc: '大量惡意流量打進來，CDN 節點分散吸收，原始伺服器看不到攻擊。Cloudflare 就是這樣保護網站的。',
                color: 'bg-blue-50 border-blue-200',
              },
              {
                title: 'Edge Computing',
                desc: '現代 CDN（Cloudflare Workers、Vercel Edge）甚至可以在節點上執行程式碼，讓計算也在用戶附近完成。',
                color: 'bg-indigo-50 border-indigo-200',
              },
            ].map((item, i) => (
              <div key={i} className={`border ${item.color} shadow-none`}>
                <div className="p-5">
                  <p className="font-bold text-gray-800 mb-2 text-sm">{item.title}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr  className="border-gray-100" />

        {/* 總結：完整流程串起來 */}
        <section
          className="space-y-6"
          
          
          
          
        >
          <h2 className="text-3xl font-black text-gray-900">完整流程總覽——把這些全串起來</h2>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white">
            <div className="p-8">
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: '你輸入 google.com，按下 Enter',
                    detail: '瀏覽器先查自己的 DNS 快取，有就跳過後面幾步',
                  },
                  {
                    step: '02',
                    title: 'DNS 解析：名字 → IP',
                    detail: '瀏覽器 → OS → Router → ISP Resolver → Root DNS → .com TLD → Google Authoritative DNS → 142.250.185.14',
                  },
                  {
                    step: '03',
                    title: 'CDN 介入（如有）',
                    detail: 'DNS 根據你的地理位置，回傳最近的 CDN 節點 IP，不一定是 Google 美國總部',
                  },
                  {
                    step: '04',
                    title: 'TCP 三次握手',
                    detail: 'SYN → SYN-ACK → ACK，確保雙方都能收發，建立可靠連線',
                  },
                  {
                    step: '05',
                    title: 'TLS 握手（HTTPS）',
                    detail: '協商加密演算法、驗證伺服器憑證、交換金鑰，建立加密通道（詳見 EP.03）',
                  },
                  {
                    step: '06',
                    title: 'HTTP Request',
                    detail: 'GET / HTTP/2 帶上 Headers，伺服器回傳 HTML',
                  },
                  {
                    step: '07',
                    title: '瀏覽器渲染',
                    detail: '解析 HTML → DOM，下載 CSS/JS，計算 Layout，繪製畫面，頁面出現',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="bg-white/20 text-white text-xs font-black px-2 py-1 rounded shrink-0 mt-0.5">{item.step}</span>
                    <div>
                      <p className="font-bold text-white mb-0.5">{item.title}</p>
                      <p className="text-sky-200 text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
            <div className="p-6">
              <p className="font-bold text-gray-800 mb-3">面試回答建議</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                面試時不用把每一步說得一樣詳細。重點是：
                <strong>先給出完整的步驟清單（讓面試官知道你有全局觀）</strong>，
                再針對你最熟的部分（DNS、TCP、HTTP）深入說明。
                如果對方追問某一步，再展開說。
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                能說出「DNS 分層查詢」、「TCP 三次握手的必要性」、「CDN 透過 DNS anycast 實現就近存取」的候選人，
                已經比大部分人說得更完整了。
              </p>
            </div>
          </div>
        </section>

        {/* Tags */}
        <section
          
          
          
          
        >
          <hr className="border-gray-100 mb-8"  />
          <div className="flex flex-wrap gap-2">
            {['網路', 'DNS', 'IP', 'TCP', '三次握手', 'CDN', 'Port', '面試必考', '網路系列', 'EP.02'].map(tag => (
              <span key={tag}    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-medium">{tag}</span>
            ))}
          </div>
        </section>

        {/* Nav */}
        <section
          
          
          
          
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/network/ep01-http">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <ArrowLeft size={18} className="text-gray-400 group-hover:text-sky-600 transition-colors" />
                    <div>
                      <p className="text-xs text-gray-400 mb-1">上一篇</p>
                      <p className="font-bold text-gray-700 group-hover:text-sky-700 transition-colors text-sm">EP.01 HTTP 深挖</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/blog/network/ep03-https-tls">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="p-5">
                  <div className="flex items-center justify-end gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">下一篇</p>
                      <p className="font-bold text-gray-700 group-hover:text-sky-700 transition-colors text-sm">EP.03 HTTPS 與 TLS</p>
                    </div>
                    <ArrowRight size={18} className="text-gray-400 group-hover:text-sky-600 transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

      </article>
    </div>
  );
}
