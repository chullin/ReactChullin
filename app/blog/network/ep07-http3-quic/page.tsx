'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Wifi,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Shield,
  Activity,
  Server,
  TrendingUp,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function NetworkEP07() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50">

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-br from-sky-700 via-blue-700 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">
                EP.07
              </span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                網路系列
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              HTTP/3 與 QUIC：下一代網路協定完全解析
              <br />
              <span className="text-sky-200">為什麼 HTTP/3 比 HTTP/2 快？</span>
            </h1>
            <p className="text-sky-100 text-lg mb-8 max-w-2xl">
              QUIC 協定原理、0-RTT 連線、多路複用解決 Head-of-Line Blocking —
              從 TCP 的致命缺陷說起，解析 HTTP/3 如何從根本上重新設計網路傳輸層，
              並帶來連線遷移、0-RTT 等革命性特性。
            </p>
            <div className="flex items-center gap-6 text-sky-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5">
                <User size={14} /> Joseph Chen
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 16 min read
              </span>
              <span className="flex items-center gap-1.5">
                <Wifi size={14} /> HTTP/3 · QUIC · UDP · 0-RTT
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ─── Section 1: 演進史 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="text-sky-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">從 HTTP/1.1 到 HTTP/3 的演進史</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            HTTP 是網際網路的基礎協定，每一次版本升級都是為了解決上一個版本的根本限制。
            理解這段演進史，才能真正看懂 HTTP/3 做了什麼、解決了什麼、又帶來了什麼新問題。
          </p>

          <div className="space-y-4">
            {[
              {
                version: 'HTTP/1.1',
                year: '1997',
                color: 'border-gray-300 bg-gray-50',
                headerColor: 'text-gray-700',
                badgeColor: 'bg-gray-200 text-gray-700',
                points: [
                  '每個請求需要一個 TCP 連線（1.0 是），1.1 引入 Keep-Alive 持久連線',
                  'Pipelining（管線化）理論上可以發多個請求，但實作上幾乎沒瀏覽器啟用',
                  '瀏覽器並行開 6 個 TCP 連線來加速（Hack，不是設計）',
                  'Head-of-Line Blocking（HOL Blocking）：同一連線的後續請求要等前面的回應完成',
                  'Header 不壓縮，每個請求都重複傳送大量相同的 Header（User-Agent、Cookie 等）',
                ],
                verdict: '瓶頸：HTTP 層的 HOL Blocking + 無壓縮 Header',
                verdictColor: 'text-red-600',
              },
              {
                version: 'HTTP/2',
                year: '2015',
                color: 'border-blue-300 bg-blue-50',
                headerColor: 'text-blue-700',
                badgeColor: 'bg-blue-200 text-blue-700',
                points: [
                  '多路複用（Multiplexing）：一個 TCP 連線可以並行傳輸多個請求/回應（Stream）',
                  'Header 壓縮（HPACK）：重複的 Header 只傳差異，大幅減少傳輸量',
                  'Server Push：伺服器主動推送資源（已被 Chrome 移除支援）',
                  '二進位格式（Binary Framing）：替代文字格式，解析更高效',
                  '解決了 HTTP 層的 HOL Blocking，但 TCP 層的 HOL Blocking 依然存在！',
                ],
                verdict: '瓶頸：TCP 層的 HOL Blocking（丟包時所有 Stream 都要等）',
                verdictColor: 'text-orange-600',
              },
              {
                version: 'HTTP/3',
                year: '2022 (RFC 9114)',
                color: 'border-sky-400 bg-sky-50',
                headerColor: 'text-sky-700',
                badgeColor: 'bg-sky-200 text-sky-700',
                points: [
                  '基於 UDP + QUIC 協定（告別 TCP，從根本解決 TCP 的限制）',
                  '真正解決所有層次的 HOL Blocking（每個 Stream 獨立追蹤丟包）',
                  '0-RTT 連線（第二次連線可以直接傳資料，不需要握手）',
                  '連線遷移（Connection Migration）：切換網路不斷線',
                  'TLS 1.3 內建（安全性是設計的一部分，不是附加功能）',
                ],
                verdict: '現況：主流瀏覽器和 CDN 已全面支援，佔全球 HTTP 流量 ~30%',
                verdictColor: 'text-green-600',
              },
            ].map(({ version, year, color, headerColor, badgeColor, points, verdict, verdictColor }) => (
              <Card key={version} className={`border-2 ${color} shadow-sm`}>
                <CardBody className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-2xl font-black ${headerColor}`}>{version}</h3>
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${badgeColor}`}>{year}</span>
                  </div>
                  <ul className="space-y-2">
                    {points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="text-gray-400 mt-1 flex-shrink-0">→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className={`text-sm font-black ${verdictColor} border-t border-gray-200 pt-3`}>
                    {verdict}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 2: HOL Blocking ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">TCP 的致命缺陷 — Head-of-Line Blocking</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            HTTP/2 的多路複用解決了 HTTP 層的 HOL Blocking，但它依然建立在 TCP 之上。
            TCP 保證資料按序到達，這個保證本身就是 HOL Blocking 的根源。
            要理解為什麼，需要先理解 TCP 如何處理丟包。
          </p>

          <CodeBlock
            title="HTTP/2 的 TCP 層 HOL Blocking（丟包場景）"
            lang="text"
            code={`HTTP/2 有三個並行的 Stream（同一個 TCP 連線）：

  Stream 1 傳輸 CSS：[Packet 1][Packet 2][Packet 3]  → 資料完整
  Stream 2 傳輸 JS ：[Packet A][Packet B][Packet C]  → 資料完整
  Stream 3 傳輸圖片：[Packet X]   [丟包！]   [Packet Z]  → Packet Y 丟失！

TCP 的反應：
  TCP 發現 Packet Y 遺失（收到 Packet Z 但缺少 Y，亂序）
  TCP 要求重傳 Packet Y
  在 Packet Y 重傳並到達之前，TCP 緩衝區停止往上層（HTTP/2）傳送任何資料

  → Stream 1 的 CSS 已完整，但 HTTP/2 無法取用（TCP 卡住了）
  → Stream 2 的 JS 已完整，但 HTTP/2 無法取用（TCP 卡住了）
  → 整個頁面的渲染因為一張圖片的一個封包丟失而延遲！

  這就是 TCP 層的 HOL Blocking：
  所有 HTTP/2 的 Stream 共用同一條 TCP 連線，
  TCP 一旦因丟包暫停，所有 Stream 都跟著停。

──────────────────────────────────────────────────────────

HTTP/3（QUIC）的解決方案：每個 Stream 獨立追蹤丟包

  Stream 1 傳輸 CSS：[Packet 1][Packet 2][Packet 3]  → 立刻交給應用層
  Stream 2 傳輸 JS ：[Packet A][Packet B][Packet C]  → 立刻交給應用層
  Stream 3 傳輸圖片：[Packet X]   [丟包！]   [Packet Z]  → 只有 Stream 3 等待重傳

  → Stream 1 和 2 不受影響，CSS 和 JS 立刻渲染
  → 只有圖片（Stream 3）在等待，其他資源正常處理
  → 整體頁面體驗：只有圖片慢，不是整個頁面都卡住`}
          />

          <p className="text-gray-600 leading-relaxed">
            為什麼 QUIC 能做到這一點？因為 QUIC 是在 UDP 之上自己實作了可靠傳輸，
            而且每個 Stream 的流量控制和丟包重傳是完全獨立的。
            TCP 則是在 OS 核心層實作，無法針對個別應用層的 Stream 做差異化處理。
          </p>

          <Card className="border-l-4 border-red-400 bg-red-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-red-800 mb-2 flex items-center gap-2">
                <Info size={16} /> HOL Blocking 在什麼網路環境最明顯？
              </p>
              <p className="text-red-700 text-sm leading-relaxed">
                丟包率越高，HOL Blocking 的影響越嚴重。4G/5G 行動網路的丟包率約 0.5~2%，
                WiFi 環境在干擾多時可達 1~3%，長途跨洋線路也有 0.5~1% 的丟包率。
                在這些場景下，HTTP/3 對 HTTP/2 的效能優勢最為顯著（可達 30~50%）。
                在低延遲、低丟包的同機房環境，差距相對不明顯。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 3: QUIC 協定 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Zap className="text-blue-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">QUIC 協定 — 為什麼要建構在 UDP 上？</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            選擇 UDP 作為 QUIC 的基礎，不是因為 UDP 更可靠，而是因為 UDP 更「空白」。
            UDP 沒有連線概念、沒有流量控制、沒有可靠傳輸，這反而讓 QUIC 可以在應用層自由定義這些行為，
            不受 OS 核心 TCP 實作的限制。
          </p>

          <CodeBlock
            title="TCP vs UDP 的根本差異，以及 QUIC 的定位"
            lang="text"
            code={`TCP（Transmission Control Protocol）：
  ✓ 可靠傳輸：保證封包送達、按序交付
  ✓ 流量控制：防止傳送速度超過接收方的處理能力
  ✓ 擁塞控制：偵測網路擁塞並自動降速
  ✗ 連線建立：三次握手（1.5 RTT 的延遲開銷）
  ✗ 協定邏輯在 OS 核心層：要更新協定就要更新 OS（極慢）
  ✗ HOL Blocking：一旦丟包，所有資料都要等

UDP（User Datagram Protocol）：
  ✓ 速度快：沒有連線建立、沒有確認機制
  ✓ 協定邏輯在應用層：可以快速迭代更新
  ✗ 不保證送達：封包可能丟失
  ✗ 不保證順序：封包可能亂序到達
  ✗ 沒有流量控制和擁塞控制

QUIC = UDP + 在應用層重新實作上面 TCP 的優點 + TLS 1.3

  QUIC 的可靠傳輸：自己實作 ACK + 重傳，但以 Stream 為粒度（非連線粒度）
  QUIC 的流量控制：Stream 級別 + 連線級別，兩層控制
  QUIC 的擁塞控制：預設 Cubic（同 TCP），但可熱更新成 BBR 等演算法
  QUIC 的加密：TLS 1.3 內建，不能關閉（所有 HTTP/3 流量都是加密的）
  QUIC 的更新：協定邏輯在使用者空間，Chrome 更新就能升級協定邏輯（不需要等 OS 更新）`}
          />

          <h3 className="text-2xl font-black text-gray-800">連線建立的延遲比較</h3>
          <p className="text-gray-600 leading-relaxed">
            RTT（Round-Trip Time）是封包從客戶端發出、到伺服器、再回到客戶端的時間。
            連線建立所需的 RTT 越少，第一個 byte 到達的延遲就越低。
          </p>

          <CodeBlock
            title="各協定連線建立流程比較"
            lang="text"
            code={`──────────────────────────────────────────────────────────
TCP + TLS 1.2（舊方式，共需 3 RTT）
──────────────────────────────────────────────────────────

  客戶端                          伺服器
    │                                │
    │ ──── SYN ──────────────────→  │  ← TCP 握手第 1 步
    │ ←─── SYN-ACK ──────────────  │  ← TCP 握手第 2 步
    │ ──── ACK ──────────────────→  │  ← TCP 握手第 3 步（1.5 RTT 完成 TCP）
    │                                │
    │ ──── ClientHello ──────────→  │  ← TLS 握手第 1 步
    │ ←─── ServerHello + Cert ───   │  ← TLS 握手第 2 步
    │ ──── Key Exchange ─────────→  │  ← TLS 握手第 3 步
    │ ←─── Finished ─────────────   │  （又 1.5 RTT 完成 TLS）
    │                                │
    │ ──── HTTP Request ─────────→  │  ← 終於可以開始傳資料
    │ ←─── HTTP Response ─────────  │
    │                                │
  總計：3 RTT 後才收到第一個 byte

──────────────────────────────────────────────────────────
TCP + TLS 1.3（改進版，共需 2 RTT）
──────────────────────────────────────────────────────────

  TLS 1.3 把握手合併到 2 步：
  客戶端 → 伺服器：ClientHello（含 Key Share）
  伺服器 → 客戶端：ServerHello + Certificate + Finished（含加密資料）
  但 TCP 握手的 1.5 RTT 依然無法消除

  總計：2.5 RTT（TCP 1.5 RTT + TLS 1.3 握手 1 RTT）

──────────────────────────────────────────────────────────
QUIC 初次連線（1-RTT）
──────────────────────────────────────────────────────────

  QUIC 把 TCP 握手和 TLS 握手合併成一個步驟！

  客戶端                          伺服器
    │                                │
    │ ── QUIC Initial + ClientHello → │  ← QUIC + TLS 握手合併，一次發送
    │ ← QUIC + ServerHello + Data ── │  ← 伺服器回應同時包含加密資料
    │                                │
    │ 之後的請求可以直接傳送           │
    │                                │
  總計：1 RTT 後開始收到有效資料

──────────────────────────────────────────────────────────
QUIC 0-RTT（再次連線，0 RTT）
──────────────────────────────────────────────────────────

  你曾經連線過這個伺服器（例如昨天訪問過這個網站）
  QUIC 把上一次的 Session Ticket 儲存在瀏覽器中

  客戶端                          伺服器
    │                                │
    │ ── 0-RTT Data（帶 Session Ticket）→ │  ← 直接傳資料，不需要握手！
    │ ←── Response ──────────────── │
    │                                │
  總計：0 RTT → 第一個請求的延遲接近於 0！`}
          />

          <Card className="border-l-4 border-blue-400 bg-blue-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-blue-800 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} /> 0-RTT 的安全注意事項
              </p>
              <p className="text-blue-700 text-sm leading-relaxed">
                0-RTT 有一個安全限制：它容易受到「重放攻擊」（Replay Attack）。
                攻擊者可以截取 0-RTT 的資料並重新發送。因此，0-RTT 只適合「冪等請求」（Idempotent）：
                GET 請求（讀取資料）是安全的，但 POST 付款、POST 下單這類有副作用的請求不應使用 0-RTT。
                瀏覽器和 QUIC 實作通常會自動處理這個限制。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 4: 連線遷移 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Wifi className="text-sky-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">連線遷移（Connection Migration）</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            這是 HTTP/3 最被低估的特性之一。在行動設備普及的今天，
            用戶從 WiFi 切換到行動網路是日常操作，但 TCP 連線在這種情況下會直接斷開。
            QUIC 用一個優雅的設計完全解決了這個問題。
          </p>

          <CodeBlock
            title="TCP 連線 vs QUIC 連線的識別方式"
            lang="text"
            code={`──────────────────────────────────────────────────────────
TCP 連線的識別：四元組（4-tuple）
──────────────────────────────────────────────────────────

  一條 TCP 連線由這四個元素唯一識別：
  (Source IP, Source Port, Destination IP, Destination Port)

  你在咖啡廳連 WiFi，IP = 192.168.1.100
  正在下載一個大檔案，連線識別：
  (192.168.1.100, 54321, 93.184.216.34, 443)

  你切換到手機行動網路，IP 變成 10.0.0.50
  TCP 連線識別變成：
  (10.0.0.50, 54321, 93.184.216.34, 443)  ← 完全是另一條連線！

  → TCP 根本不知道這是「同一個用戶換了網路」
  → 原本的 TCP 連線被丟棄（Timeout 或 RST）
  → 需要重新建立 TCP + TLS 握手（2~3 RTT）
  → 正在下載的資料中斷，需要重新開始或靠應用層斷點續傳

──────────────────────────────────────────────────────────
QUIC 連線的識別：Connection ID（64-bit 隨機值）
──────────────────────────────────────────────────────────

  一條 QUIC 連線由一個隨機產生的 64-bit Connection ID 識別
  這個 ID 由客戶端選擇，與 IP 和 Port 完全無關

  你在咖啡廳連 WiFi，QUIC Connection ID = 0xABCDEF1234567890
  你切換到手機行動網路，IP 改變了，但 Connection ID 不變！

  QUIC 的流程：
  1. 客戶端偵測到 IP 改變（Source IP 從 WiFi 地址變成行動網路地址）
  2. 客戶端繼續使用相同的 Connection ID 發送資料
  3. 伺服器收到來自新 IP 的封包，但 Connection ID 相同
  4. 伺服器認可這是連線遷移，更新對應的 IP 記錄
  5. 連線繼續，幾乎沒有中斷！

  → 用戶體驗：短暫的傳輸停頓（幾十毫秒），然後自動恢復
  → 不需要重新握手，不需要重新傳資料`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-red-200 bg-red-50">
              <CardBody className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="text-red-500" size={22} />
                  <h3 className="font-black text-red-800">HTTP/2 + WiFi → 4G</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1 flex-shrink-0">×</span>
                    TCP 連線因 IP 改變而斷開
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1 flex-shrink-0">×</span>
                    需要重新 TCP + TLS 握手（~200ms RTT × 2）
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1 flex-shrink-0">×</span>
                    正在上傳/下載的資料中斷
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1 flex-shrink-0">×</span>
                    視訊通話斷線，需要重新撥打
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1 flex-shrink-0">×</span>
                    遊戲中斷線，需要重新登入
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardBody className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={22} />
                  <h3 className="font-black text-green-800">HTTP/3 + WiFi → 4G</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                    Connection ID 不變，連線識別不中斷
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                    短暫停頓（幾十毫秒）後自動恢復
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                    檔案傳輸無縫繼續
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                    視訊通話幾乎感覺不到切換
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                    遊戲角色可能有短暫延遲，但不斷線
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <p className="text-gray-600 leading-relaxed">
            連線遷移對行動使用者的影響是真實且可測量的。
            在捷運、公車等移動場景中，用戶頻繁切換基地台和 WiFi 熱點，
            HTTP/3 的連線遷移讓這些切換過程對應用層完全透明，使用者幾乎感覺不到網路的切換。
          </p>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 5: 實際專案配置 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Server className="text-indigo-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">在實際專案中支援 HTTP/3</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            啟用 HTTP/3 有幾種難度不同的方式，從一鍵啟用（Cloudflare）到自行編譯 Nginx。
            在動手之前，先確認你的網站是否已經支援 HTTP/3，以及如何驗證。
          </p>

          <CodeBlock
            title="驗證網站是否支援 HTTP/3"
            lang="bash"
            code={`# 方法一：curl（需要 curl 7.66+ 且編譯時包含 QUIC 支援）
curl -I --http3 https://www.google.com
# 成功時 HTTP 版本欄位會顯示 HTTP/3

# 查看 curl 是否有 QUIC 支援
curl --version | grep -i quic
# 應看到類似：Features: ... HTTP3 ...

# 方法二：Chrome DevTools（最常用的方式）
# 1. 打開 Chrome，前往目標網站
# 2. 按 F12 → Network tab
# 3. 找到 Protocol 欄位（若沒有，右鍵欄位標題 → 勾選 Protocol）
# 4. 看到 "h3" 就是 HTTP/3，"h2" 是 HTTP/2

# 方法三：使用 curl 查看 Alt-Svc 回應 Header
curl -sI https://www.cloudflare.com | grep -i alt-svc
# 回應範例：
# alt-svc: h3=":443"; ma=86400
# 這表示伺服器支援 HTTP/3，且下次連線可以直接用（ma=86400 是快取時間）

# 方法四：線上工具
# https://http3check.net → 輸入你的網域，直接測試
# https://www.http3check.net

# 方法五：Chrome 的 net-internals
# chrome://net-internals/#quic → 查看當前所有 QUIC 連線狀態`}
          />

          <CodeBlock
            title="Nginx 配置（啟用 HTTP/3 / QUIC）"
            lang="nginx"
            code={`# 前置需求：
# Nginx 1.25.0+ 已內建 QUIC 支援（不需要額外 patch）
# 或使用 nginx-quic 分支（1.25.0 之前）

# /etc/nginx/nginx.conf
events {
  worker_connections 1024;
}

http {
  server {
    # 同時監聽 TCP（HTTP/1.1 和 HTTP/2）和 QUIC（HTTP/3）
    listen 443 ssl;             # TCP + TLS（HTTP/1.1 和 HTTP/2 的 fallback）
    listen 443 quic reuseport;  # UDP + QUIC（HTTP/3）
    # reuseport 讓多個 worker process 共享同一個 UDP Port，提高吞吐量

    server_name example.com;

    ssl_certificate     /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    # HTTP/3 強制要求 TLS 1.3（QUIC 內建 TLS 1.3，無法降級）
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    # 關鍵 Header：告訴瀏覽器「這台伺服器支援 HTTP/3」
    # 瀏覽器下一次訪問會優先嘗試 HTTP/3
    # ma=86400 表示這個資訊快取 86400 秒（1天）
    add_header Alt-Svc 'h3=":443"; ma=86400';

    # 啟用 HTTP/2（同一個伺服器提供 HTTP/2 fallback）
    http2 on;

    location / {
      proxy_pass http://backend;

      # 傳遞真實 IP（QUIC 連線遷移時 IP 可能改變，記錄 Connection ID 更準確）
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }

  # HTTP → HTTPS 強制跳轉
  server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
  }
}`}
          />

          <CodeBlock
            title="Cloudflare 的 HTTP/3（最簡單，一鍵啟用）"
            lang="text"
            code={`對於已使用 Cloudflare 作為 CDN 的網站，啟用 HTTP/3 只需要：

  1. 登入 Cloudflare Dashboard（dash.cloudflare.com）
  2. 選擇你的 Domain
  3. 前往 Speed → Optimization → Protocol Optimization
  4. 找到「HTTP/3 (with QUIC)」→ 開啟

就這樣！所有流量自動升級，不需要在伺服器端做任何改動。

Cloudflare 會在它的邊緣節點（Edge）處理 HTTP/3，
然後用 HTTP/1.1 或 HTTP/2 和你的 Origin Server 通訊。
（稱為「HTTP/3 Termination at Edge」）

這是最推薦的方式，因為：
  ✓ 不需要維護自己的 QUIC 實作
  ✓ Cloudflare 的 QUIC 實作持續更新和優化
  ✓ 自動處理瀏覽器 fallback（不支援 HTTP/3 的客戶端自動降級）
  ✓ 沒有額外費用（免費方案也包含）

其他 CDN 的支援：
  AWS CloudFront：支援 HTTP/3（2022 年開始）
  Fastly        ：支援 HTTP/3
  Vercel        ：自動支援 HTTP/3（無需配置）
  Netlify       ：自動支援 HTTP/3（無需配置）`}
          />

          <CodeBlock
            title="Next.js 專案確認 HTTP/3 支援（Vercel 部署）"
            lang="typescript"
            code={`// Next.js 部署到 Vercel 時，HTTP/3 自動啟用，不需要任何配置

// 你可以用以下方式在 API Route 中記錄協定資訊
// app/api/debug/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    // Vercel 會在請求 Header 中注入 HTTP 版本資訊
    protocol: request.headers.get('x-forwarded-proto'),
    // 真實連線資訊
    via: request.headers.get('via'),
    // Cloudflare 用戶可以看這個
    cfRay: request.headers.get('cf-ray'),
    // 連線使用的 TLS 版本
    cfTlsVersion: request.headers.get('cf-tls-version'),
  });
}

// 在前端取得協定資訊（瀏覽器端）
// 注意：瀏覽器沒有直接 API 取得 HTTP 版本
// 需要用 Chrome DevTools 的 Network tab 觀察 Protocol 欄位
// 或使用 Performance API 觀察 nextHopProtocol

const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
if (entries.length > 0) {
  console.log('Protocol:', entries[0].nextHopProtocol);
  // 'h3' = HTTP/3, 'h2' = HTTP/2, 'http/1.1' = HTTP/1.1
}`}
          />
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 6: 效能數據與局限性 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Activity className="text-green-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">HTTP/3 效能數據與局限性</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            HTTP/3 在實測中確實帶來了可量化的效能提升，但效益因網路環境不同而差異很大。
            這裡提供真實的數據和誠實的局限性分析，幫助你判斷是否值得在你的情境中啟用。
          </p>

          <h3 className="text-xl font-black text-gray-800">實測效能對比</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                scenario: '3G 網路（高延遲、高丟包）',
                bgColor: 'bg-amber-50',
                borderColor: 'border-amber-200',
                data: [
                  { label: 'HTTP/1.1', value: '4.5 秒', color: 'bg-red-400', width: 'w-full' },
                  { label: 'HTTP/2', value: '3.2 秒', color: 'bg-orange-400', width: 'w-4/5' },
                  { label: 'HTTP/3', value: '2.1 秒', color: 'bg-green-500', width: 'w-1/2' },
                ],
                note: 'HTTP/3 比 HTTP/2 快 34%',
                noteColor: 'text-green-700',
              },
              {
                scenario: 'WiFi（低延遲、低丟包）',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
                data: [
                  { label: 'HTTP/1.1', value: '1.2 秒', color: 'bg-red-400', width: 'w-full' },
                  { label: 'HTTP/2', value: '0.9 秒', color: 'bg-orange-400', width: 'w-9/12' },
                  { label: 'HTTP/3', value: '0.85 秒', color: 'bg-green-500', width: 'w-8/12' },
                ],
                note: 'WiFi 環境差距較小（5~10%）',
                noteColor: 'text-blue-700',
              },
              {
                scenario: '重複訪問（0-RTT 效果）',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                data: [
                  { label: 'HTTP/2（首次）', value: '200ms 握手', color: 'bg-orange-400', width: 'w-full' },
                  { label: 'HTTP/3（首次）', value: '100ms 握手', color: 'bg-blue-400', width: 'w-1/2' },
                  { label: 'HTTP/3（重連）', value: '~0ms 握手', color: 'bg-green-500', width: 'w-1/12' },
                ],
                note: '0-RTT 使重複訪問延遲幾乎為零',
                noteColor: 'text-green-700',
              },
            ].map(({ scenario, bgColor, borderColor, data, note, noteColor }) => (
              <Card key={scenario} className={`border-2 ${borderColor} ${bgColor} shadow-sm`}>
                <CardBody className="p-5 space-y-4">
                  <p className="font-black text-gray-800 text-sm">{scenario}</p>
                  <div className="space-y-3">
                    {data.map(({ label, value, color, width }) => (
                      <div key={label} className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{label}</span>
                          <span className="font-black">{value}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${color} ${width} rounded-full`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className={`text-xs font-black ${noteColor}`}>{note}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-black text-gray-800">HTTP/3 的局限性（誠實面對）</h3>

          <CodeBlock
            title="HTTP/3 不是萬能的——這些場景要注意"
            lang="text"
            code={`──────────────────────────────────────────────────────────
問題 1：UDP 被企業防火牆封鎖
──────────────────────────────────────────────────────────

  很多企業網路、VPN、政府機構的防火牆預設封鎖 UDP 443 Port
  QUIC 跑在 UDP 上，所以在這些環境中 HTTP/3 完全無法使用

  不用擔心：瀏覽器會自動 Fallback
  瀏覽器嘗試 HTTP/3 失敗後，會自動降級到 HTTP/2（TCP）
  對使用者透明，只是少了 HTTP/3 的效能優勢

  影響範圍：部分企業用戶（估計 5~10%）

──────────────────────────────────────────────────────────
問題 2：Server 端支援需要特殊版本或配置
──────────────────────────────────────────────────────────

  Nginx：需要 1.25.0+（有 QUIC 內建支援）或 nginx-quic 分支
  Apache：透過 mod_quic，支援程度不如 Nginx 成熟
  老舊的 Load Balancer / WAF 可能不支援 QUIC

  自建伺服器的挑戰：
  ✗ 並非所有主機商都提供支援 QUIC 的 Nginx 版本
  ✗ QUIC 的 UDP 需要特殊的 kernel 調優（socket buffer size）

──────────────────────────────────────────────────────────
問題 3：低延遲環境效益不明顯
──────────────────────────────────────────────────────────

  HTTP/3 的優勢主要來自：
  1. 減少握手 RTT（0-RTT）→ 初始延遲越高，效益越大
  2. 解決 HOL Blocking → 丟包率越高，效益越大
  3. 連線遷移 → 行動網路場景效益大

  反過來說，在以下場景效益不明顯：
  ✗ 同機房的微服務通訊（延遲 < 1ms，丟包率接近 0）
  ✗ 已有優化的有線網路辦公環境
  ✗ 短小的 API 請求（資料量小，效能瓶頸不在傳輸上）

──────────────────────────────────────────────────────────
問題 4：CPU 消耗略高
──────────────────────────────────────────────────────────

  QUIC 的加密、封包分割、ACK 處理都在應用層（User Space）
  TCP 的這些操作由 OS 核心處理，可以用 GSO / GRO 等硬體加速

  結果：QUIC 的 CPU 消耗比 TCP 高約 10~20%
  對於 CPU 已是瓶頸的伺服器，啟用 HTTP/3 可能反而帶來負面影響`}
          />

          <h3 className="text-xl font-black text-gray-800">何時值得啟用 HTTP/3？</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardBody className="p-5 space-y-3">
                <h4 className="font-black text-green-800 flex items-center gap-2">
                  <CheckCircle size={18} /> 值得啟用的場景
                </h4>
                <ul className="space-y-2">
                  {[
                    '服務全球用戶或以行動裝置為主的使用者（延遲高）',
                    '有大量 CSS/JS/圖片資源的前端網站（多路複用效益大）',
                    '已使用 Cloudflare / Vercel / Netlify（一鍵啟用，零成本）',
                    'SaaS 產品需要優化用戶首次載入體驗',
                    '遊戲或即時通訊應用（連線遷移特性有價值）',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card className="border-2 border-red-200 bg-red-50">
              <CardBody className="p-5 space-y-3">
                <h4 className="font-black text-red-800 flex items-center gap-2">
                  <XCircle size={18} /> 效益有限的場景
                </h4>
                <ul className="space-y-2">
                  {[
                    '純後端微服務間的 API 通訊（用 gRPC/HTTP2 更合適）',
                    '受嚴格企業防火牆管控的 Intranet 系統',
                    'API Gateway 到 Origin Server 的內部通訊（低延遲環境）',
                    'CPU 已是伺服器瓶頸的場景（QUIC 的 User Space 處理消耗更多 CPU）',
                    '主要用戶在公司辦公室使用有線網路（穩定低丟包）',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>

          <Card className="border-l-4 border-sky-400 bg-sky-50 border-0">
            <CardBody className="p-5">
              <p className="font-black text-sky-800 mb-2 flex items-center gap-2">
                <Globe size={16} /> HTTP/3 的普及現況（2026）
              </p>
              <p className="text-sky-700 text-sm leading-relaxed">
                根據 W3Techs 的數據，HTTP/3 已佔全球 HTTP 流量的約 30%。
                Google、Facebook、Cloudflare、YouTube 都已大規模部署。
                主流瀏覽器（Chrome 87+、Firefox 88+、Safari 14+、Edge 90+）全面支援。
                對於新專案，如果你用 Vercel 或 Cloudflare，HTTP/3 是免費自動啟用的，
                沒有理由不用。對於自建伺服器，優先考慮 Nginx 1.25+ 或使用 CDN 終止 QUIC。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Tags ─── */}
        <motion.section
          className="space-y-4"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-black text-gray-700">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['HTTP/3', 'QUIC', 'UDP', '0-RTT', 'Head-of-Line Blocking', 'Connection Migration', 'TLS 1.3', 'Nginx'].map(
              (tag) => (
                <Chip key={tag} variant="flat" color="primary" size="sm">
                  {tag}
                </Chip>
              ),
            )}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Navigation ─── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link
              href="/blog/network/ep06-grpc"
              className="flex items-center gap-3 p-5 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              <ArrowLeft
                className="text-sky-500 group-hover:-translate-x-1 transition-transform"
                size={20}
              />
              <div>
                <p className="text-xs text-gray-400 font-medium">上一篇</p>
                <p className="font-black text-gray-800 text-sm">EP.06 gRPC 與 Protocol Buffers</p>
              </div>
            </Link>

            <div className="flex items-center gap-3 p-5 rounded-2xl bg-gray-50 border border-dashed border-gray-200 opacity-60">
              <div className="text-right">
                <p className="text-xs text-gray-400 font-medium">下一篇</p>
                <p className="font-black text-gray-500 text-sm">EP.08（Coming Soon）</p>
              </div>
              <ArrowRight className="text-gray-400" size={20} />
            </div>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
