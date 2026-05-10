'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Quote,
  Clock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Server,
  Globe,
  Scale,
  Zap,
  Shield,
  RefreshCw
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function SystemDesignEP02() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50">
      <div className="bg-gradient-to-br from-purple-800 via-violet-700 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.02</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">系統設計</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              負載均衡：<br />
              <span className="text-violet-200">讓流量自己找到出路</span>
            </h1>
            <p className="text-violet-100 text-lg mb-8 max-w-2xl">
              一台伺服器撐不住？加一台就好。但加了之後，誰決定每個請求去哪？
              這篇深入負載均衡的演算法、健康檢查、L4 vs L7 差異，
              以及在系統設計面試中如何正確使用它。
            </p>
            <div className="flex items-center gap-6 text-violet-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 12 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Load Balancer · Round Robin · Scalability · High Availability</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-violet-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「負載均衡不只是把流量分散到多台伺服器。
                    真正的挑戰在於：如何在機器故障時自動切換、
                    如何讓有狀態的請求（Session）還是落在同一台、
                    如何在不停機的情況下滾動升級。」
                  </p>
                  <p className="text-gray-500 text-sm">— 分散式系統工程師必修課</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 為什麼需要 LB */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">為什麼需要負載均衡？</h2>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            單台伺服器有三個根本限制：<strong>CPU 上限</strong>、<strong>記憶體上限</strong>、<strong>網路頻寬上限</strong>。
            垂直擴展（Scale Up，換更大的機器）可以緩解，但有天花板，且貴。
            水平擴展（Scale Out，加更多機器）是解法，但前提是需要有人分配流量——這就是負載均衡器的工作。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: '提升吞吐量',
                icon: Zap,
                color: 'violet',
                desc: '10 台各能處理 1K QPS 的伺服器，加上 LB 後理論可達 10K QPS。水平擴展的基礎。'
              },
              {
                title: '高可用性',
                icon: Shield,
                color: 'purple',
                desc: '一台機器掛掉，LB 自動把流量切到其他健康的機器。對用戶透明，感知不到故障。'
              },
              {
                title: '零停機部署',
                icon: RefreshCw,
                color: 'indigo',
                desc: '滾動升級時，LB 先把流量從目標機器移走，升級完再加回來，用戶不中斷。'
              }
            ].map(({ title, icon: Icon, color, desc }) => (
              <Card key={title} className="border-0 shadow-md">
                <CardBody className="p-5">
                  <div className={`w-10 h-10 bg-${color}-100 rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={20} className={`text-${color}-600`} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* 架構圖 */}
          <Card className="border-0 shadow-lg bg-slate-900 text-white">
            <CardBody className="p-6">
              <p className="text-violet-300 text-sm font-bold mb-6">有 / 無 負載均衡的架構對比</p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-red-400 text-xs font-bold mb-4">❌ 無 LB（單點）</p>
                  <div className="space-y-2 text-center">
                    <div className="bg-slate-700 rounded p-2 text-xs">100K Users</div>
                    <div className="text-gray-500 text-xs">→ 全部流量</div>
                    <div className="bg-red-900/50 border border-red-600 rounded p-2 text-xs">
                      Server A<br /><span className="text-red-400 text-xs">過載 / 單點故障</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-green-400 text-xs font-bold mb-4">✅ 有 LB（水平擴展）</p>
                  <div className="space-y-2">
                    <div className="bg-slate-700 rounded p-2 text-xs text-center">100K Users</div>
                    <div className="text-gray-500 text-xs text-center">↓</div>
                    <div className="bg-violet-900/50 border border-violet-500 rounded p-2 text-xs text-center font-bold">
                      Load Balancer
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-green-900/40 border border-green-600 rounded p-2 text-xs text-center flex-1">Server A<br /><span className="text-xs text-gray-400">33K</span></div>
                      <div className="bg-green-900/40 border border-green-600 rounded p-2 text-xs text-center flex-1">Server B<br /><span className="text-xs text-gray-400">33K</span></div>
                      <div className="bg-green-900/40 border border-green-600 rounded p-2 text-xs text-center flex-1">Server C<br /><span className="text-xs text-gray-400">34K</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* 演算法 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">負載均衡演算法</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            LB 怎麼決定把請求送到哪台？不同演算法有不同的適用場景：
          </p>

          <div className="space-y-5">
            {[
              {
                name: 'Round Robin（輪詢）',
                badge: '最常見',
                badgeColor: 'violet',
                desc: '依序輪流分配，A→B→C→A→B→C...。假設所有伺服器性能相同。',
                when: '服務無狀態、所有機器規格一致、請求處理時間相近',
                weak: '忽略機器當前負載，可能把請求分到已過載的機器',
                visual: [
                  { req: 'Req 1', server: 'A' },
                  { req: 'Req 2', server: 'B' },
                  { req: 'Req 3', server: 'C' },
                  { req: 'Req 4', server: 'A' },
                ]
              },
              {
                name: 'Weighted Round Robin（加權輪詢）',
                badge: '進階版',
                badgeColor: 'purple',
                desc: '高規格機器分到更多請求。A(weight=3):B(weight=1) → A 分到 75% 流量。',
                when: '機器規格不同（混合機型）、不同機器承載能力差異大',
                weak: '靜態設定，不能即時反映機器運行狀態',
                visual: null
              },
              {
                name: 'Least Connections（最少連線）',
                badge: '動態感知',
                badgeColor: 'indigo',
                desc: '把新請求分給當前「活躍連線數最少」的機器。動態感知負載，更智慧。',
                when: '請求處理時間差異大（例如 API 有快有慢）、長連線場景',
                weak: '需要追蹤每台機器的活躍連線數，LB 本身有額外開銷',
                visual: null
              },
              {
                name: 'IP Hash（IP 雜湊）',
                badge: 'Session 黏性',
                badgeColor: 'violet',
                desc: '根據客戶端 IP 的 hash 值決定送哪台伺服器。同一個 IP 永遠到同一台機器。',
                when: '有狀態的服務（Session 存在機器本地、不共享）、需要保持 Sticky Session',
                weak: '機器增減時 hash 對應改變，造成 Session 遺失；IP NAT 後可能負載不均',
                visual: null
              }
            ].map(({ name, badge, badgeColor, desc, when, weak, visual }) => (
              <Card key={name} className="border-0 shadow-md">
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800">{name}</h3>
                    <Chip size="sm" color={badgeColor as 'default'} variant="flat">{badge}</Chip>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{desc}</p>

                  {visual && (
                    <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                      {visual.map(({ req, server }) => (
                        <div key={req} className="flex items-center gap-1 shrink-0">
                          <span className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-xs font-mono">{req}</span>
                          <span className="text-gray-400 text-xs">→</span>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">Server {server}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 rounded p-3">
                      <p className="text-xs font-bold text-green-700 mb-1">✅ 適合</p>
                      <p className="text-xs text-gray-600">{when}</p>
                    </div>
                    <div className="bg-red-50 rounded p-3">
                      <p className="text-xs font-bold text-red-600 mb-1">⚠️ 弱點</p>
                      <p className="text-xs text-gray-600">{weak}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-md bg-violet-50 border border-violet-200 mt-2">
            <CardBody className="p-5">
              <p className="text-violet-800 font-semibold mb-3">從哪個演算法開始？</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• <strong>預設選 Round Robin</strong>：Nginx 和 AWS ALB 的預設值，無狀態服務 + 同規格機器的首選，夠用就不要過度設計。</p>
                <p>• <strong>請求處理時間差異大（有快有慢）→ 改用 Least Connections</strong>：避免慢請求堆積到同一台機器。</p>
                <p>• <strong>機器規格不同 → 用 Weighted Round Robin</strong>：依硬體能力分配比例流量，通常設定在 Nginx upstream 的 weight 參數。</p>
                <p>• <strong>不要用 IP Hash 解決 Session 問題</strong>：機器增減時 hash 對應改變，Session 仍會遺失，這是治標不治本的方案。</p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* L4 vs L7 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">L4 vs L7 負載均衡</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            「L4」和「L7」指的是 OSI 模型的第 4 層（傳輸層）和第 7 層（應用層）。
            兩者的核心差異是：LB 看得到多少請求內容，決定路由的資訊豐富程度。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left p-4 text-violet-900 font-bold">比較項目</th>
                  <th className="text-left p-4 text-violet-900 font-bold">L4（傳輸層）</th>
                  <th className="text-left p-4 text-violet-900 font-bold">L7（應用層）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['路由依據', 'IP + Port', 'HTTP Header / URL / Cookie / Body'],
                  ['看得到的資訊', 'TCP/UDP 封包', 'HTTP Method、Path、Host、User-Agent'],
                  ['TLS 解密', '不解密，直接轉發', '在 LB 終止 TLS，再轉給後端（TLS Termination）'],
                  ['效能', '極高（不解析封包內容）', '稍低（需解析 HTTP 請求）'],
                  ['智慧路由', '無法做內容路由', '可按 /api/* → API 服務、/static/* → CDN'],
                  ['代表產品', 'AWS NLB、HAProxy (TCP)', 'Nginx、AWS ALB、Traefik、Envoy'],
                  ['使用場景', 'TCP 長連線、遊戲伺服器、DB Proxy', 'Web API、微服務、A/B Testing'],
                ].map(([item, l4, l7]) => (
                  <tr key={String(item)} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{item}</td>
                    <td className="p-4 text-gray-600">{l4}</td>
                    <td className="p-4 text-violet-700">{l7}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-violet-50 rounded-2xl p-5 border border-violet-200 mb-4">
            <p className="text-violet-800 font-semibold mb-2">L4 + L7 通常是疊起來用的</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              這不是二選一的問題。生產環境常見的組合是：
              <strong>DNS 層（Route 53）→ L4 LB（AWS NLB，處理 TCP 連線）→ L7 LB（Nginx / ALB，做 HTTP 路由與 TLS Termination）→ Application Servers</strong>。
              L4 在外層承受大量 TCP 連線的建立與分發，L7 在內層做更智慧的 HTTP 內容路由。
              面試時說「L7 ALB 前面還有一層 L4 NLB 做 DDoS 防護」能讓回答更完整。
            </p>
          </div>

          {/* L7 路由範例 */}
          <Card className="border-0 shadow-md">
            <CardBody className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">L7 路由能力示例：Nginx 設定</h3>
              <CodeBlock
                language="nginx"
                filename="nginx.conf"
                code={`upstream api_servers {
    least_conn;  # 使用 Least Connections 演算法
    server api-1.internal:3000 weight=2;
    server api-2.internal:3000 weight=2;
    server api-3.internal:3000 weight=1;  # 規格較低的機器
}

upstream static_servers {
    server cdn-1.internal:8080;
    server cdn-2.internal:8080;
}

server {
    listen 443 ssl;

    # 根據 URL 路徑路由到不同後端
    location /api/ {
        proxy_pass http://api_servers;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static/ {
        proxy_pass http://static_servers;
        expires 30d;  # 靜態資源加 Cache-Control
    }

    # 健康檢查端點不進行路由
    location /health {
        return 200 'OK';
    }
}`}
              />
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* 健康檢查 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">健康檢查（Health Check）</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            負載均衡器必須知道哪些後端機器是健康的，才能正確路由。
            健康檢查分兩種：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-0 shadow-md border-l-4 border-violet-500">
              <CardBody className="p-5">
                <h3 className="font-bold text-gray-800 mb-2">被動健康檢查（Passive）</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  LB 觀察正常請求的回應。連續 N 次失敗（超時 / 5xx）就標記為不健康。
                </p>
                <div className="bg-gray-50 rounded p-3 text-xs text-gray-600 space-y-1">
                  <p>✅ 不需要額外流量</p>
                  <p>✅ 反映真實用戶請求的健康狀況</p>
                  <p>⚠️ 已有真實請求失敗才會偵測到</p>
                </div>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md border-l-4 border-purple-500">
              <CardBody className="p-5">
                <h3 className="font-bold text-gray-800 mb-2">主動健康檢查（Active）</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  LB 定時發送探測請求（例如 GET /health 每 5 秒），在真實流量受影響前就偵測到故障。
                </p>
                <div className="bg-gray-50 rounded p-3 text-xs text-gray-600 space-y-1">
                  <p>✅ 提前偵測，不影響真實用戶</p>
                  <p>✅ 可檢查 DB 連線、依賴服務等深層狀態</p>
                  <p>⚠️ 需要後端實作 /health 端點</p>
                </div>
              </CardBody>
            </Card>
          </div>

          <CodeBlock
            language="typescript"
            filename="app/api/health/route.ts（Next.js 健康檢查端點）"
            code={`import { db } from '@/lib/db';

export async function GET() {
  try {
    // 淺層健康：服務本身在線
    const status: Record<string, string> = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };

    // 深層健康：檢查 DB 連線
    await db.query('SELECT 1');
    status.database = 'ok';

    // 可選：檢查 Redis、外部 API 等依賴
    // await redis.ping();
    // status.cache = 'ok';

    return Response.json(status, { status: 200 });
  } catch (error) {
    return Response.json(
      { status: 'error', message: String(error) },
      { status: 503 }  // Service Unavailable，讓 LB 知道要下線這台
    );
  }
}`}
          />

          <Card className="border-0 shadow-md bg-violet-50 border border-violet-200 mt-4">
            <CardBody className="p-4">
              <p className="font-semibold text-violet-800 mb-2 text-sm">建議的健康檢查參數</p>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                {[
                  { label: '探測間隔', value: '5 秒', note: '太頻繁會增加後端負載' },
                  { label: '失敗閾值', value: '連續 2 次', note: '才下線，避免偶發超時誤判' },
                  { label: '回應期限', value: '< 100ms', note: '/health 本身要夠快' },
                ].map(({ label, value, note }) => (
                  <div key={label} className="bg-white rounded-xl p-3 border border-violet-100">
                    <p className="text-violet-700 font-black text-base">{value}</p>
                    <p className="font-bold text-gray-700 mt-1">{label}</p>
                    <p className="text-gray-400 mt-0.5">{note}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border-0 shadow-md bg-amber-50 border-l-4 border-amber-500 mt-4">
            <CardBody className="p-5">
              <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} /> 健康檢查的常見陷阱
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• <strong>只檢查 HTTP 200：</strong>服務可能在線但 DB 斷線，用戶請求還是全部失敗。</p>
                <p>• <strong>健康檢查頻率太低：</strong>30 秒一次，故障後等 30 秒才切換，期間所有請求都失敗。</p>
                <p>• <strong>健康檢查本身造成負載：</strong>10 台機器、1 秒一次的深層檢查，等於額外 10 QPS 的 DB 查詢。</p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* Sticky Session 問題 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">Sticky Session 問題與解法</h2>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            如果應用有狀態（Session 存在機器記憶體），負載均衡後同一個用戶的請求可能落在不同機器上，
            導致「明明登入了，下一個請求卻要重新登入」。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: '方案一：IP Hash（Sticky Session）',
                desc: '同 IP 永遠到同台機器，狀態不丟失。但機器故障 Session 仍消失，且 IP NAT 後負載不均。',
                verdict: '⚠️ 治標不治本',
                color: 'orange'
              },
              {
                title: '方案二：集中式 Session Store',
                desc: '把 Session 存到 Redis（而非本地記憶體）。任何機器都能讀取 Session，LB 可自由分配請求。',
                verdict: '✅ 推薦做法',
                color: 'green'
              },
              {
                title: '方案三：JWT（無狀態 Token）',
                desc: '用 JWT 取代 Session，Token 本身包含狀態。LB 無需關心，服務也無需共享 Session Store。',
                verdict: '✅ 現代 API 首選',
                color: 'green'
              }
            ].map(({ title, desc, verdict, color }) => (
              <Card key={title} className={`border-0 shadow-md border-l-4 border-${color}-400`}>
                <CardBody className="p-5">
                  <h3 className="font-bold text-gray-800 text-sm mb-2">{title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{desc}</p>
                  <span className={`text-xs font-bold text-${color}-600`}>{verdict}</span>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-4">
            <p className="font-semibold text-amber-800 mb-1 text-sm">⚠️ JWT（方案三）的隱藏限制：無法即時撤銷</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              JWT 讓 LB 不需要關心 Session，看起來很美好——但代價是：
              使用者登出時，你只能清除前端的 Token，<strong>伺服器無法讓已簽發的 JWT 立即失效</strong>。
              如果 Access Token 存活期設 1 小時，被盜的 Token 在 1 小時內仍然有效。
              解法：Access Token 設短存活期（15 分鐘）+ Refresh Token 搭配 Redis 黑名單，
              登出時把 Refresh Token 加進黑名單，讓惡意方無法換取新 Token。
            </p>
          </div>

          <CodeBlock
            language="typescript"
            filename="集中式 Session：Redis 配置（Next.js + iron-session）"
            code={`// lib/session.ts
import { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'myapp-session',
  // Session 資料存在加密的 Cookie 中（等同 JWT 做法）
  // 若需要 server-side invalidation，改用 Redis：
  // cookieOptions: { maxAge: undefined }
  // 並在 Redis 存 session data，Cookie 只存 session ID
};

// 或使用 next-auth + Redis adapter
// import { RedisAdapter } from '@next-auth/redis-adapter';
// import { createClient } from 'redis';
// const client = createClient({ url: process.env.REDIS_URL });`}
          />
        </motion.section>

        <Divider />

        {/* 多層 LB 架構 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">生產環境的多層負載均衡</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            大型系統通常不只一層 LB，而是多層組合：
          </p>

          <Card className="border-0 shadow-lg bg-slate-900 text-white">
            <CardBody className="p-8">
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-gray-400" />
                  <span className="text-gray-300">Internet → DNS（Geo-based routing → 就近 Region）</span>
                </div>
                <div className="ml-5 text-gray-500">↓</div>
                <div className="flex items-center gap-3">
                  <Scale size={16} className="text-violet-400" />
                  <span className="text-violet-300">Global LB（AWS Route 53 / Cloudflare）— DNS 層分流</span>
                </div>
                <div className="ml-5 text-gray-500">↓</div>
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-blue-400" />
                  <span className="text-blue-300">Edge LB / CDN（Cloudflare / AWS CloudFront）— 靜態資源快取、DDoS 防護</span>
                </div>
                <div className="ml-5 text-gray-500">↓</div>
                <div className="flex items-center gap-3">
                  <Scale size={16} className="text-amber-400" />
                  <span className="text-amber-300">L7 LB（AWS ALB / Nginx）— HTTP 路由、TLS Termination、WAF</span>
                </div>
                <div className="ml-5 text-gray-500">↓</div>
                <div className="flex items-center gap-3">
                  <Server size={16} className="text-green-400" />
                  <span className="text-green-300">Application Servers（API 服務、Microservices）</span>
                </div>
                <div className="ml-5 text-gray-500">↓</div>
                <div className="flex items-center gap-3">
                  <Scale size={16} className="text-teal-400" />
                  <span className="text-teal-300">Internal L4 LB（服務間通訊 / DB 前的 Proxy）</span>
                </div>
                <div className="ml-5 text-gray-500">↓</div>
                <div className="flex items-center gap-3">
                  <Server size={16} className="text-gray-400" />
                  <span className="text-gray-300">Database Cluster（Primary / Replica）</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-0 shadow-md bg-violet-50 border border-violet-200 mt-4">
            <CardBody className="p-5">
              <p className="text-violet-800 font-semibold mb-2">面試時的說法</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                「在 DNS 層做 Geo-routing 把流量分到最近的 Region，
                每個 Region 內用 L7 LB（AWS ALB）把流量分到多台 API 服務，
                健康檢查設 5 秒一次，連續 3 次失敗則下線。
                Session 用 Redis Cluster 集中存放，讓 LB 可以自由分配請求而不需要 Sticky Session。」
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* 重點整理 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">重點整理</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Round Robin 是基礎', content: '無狀態服務的預設選擇。加權版（Weighted）應對機器規格不均；Least Connections 應對請求耗時不均。' },
              { title: 'L7 才能做智慧路由', content: 'L4 只看 IP:Port，L7 能看 HTTP Header、URL、Cookie，可做 A/B Testing、藍綠部署、微服務路由。' },
              { title: '主動健康檢查是關鍵', content: '每 5 秒探測，連續 2 次失敗就下線。/health 端點要檢查真實依賴（DB、Redis），不能只回 200。' },
              { title: 'Session 問題用 Redis 解', content: '不要用 Sticky Session（IP Hash）打補丁，把 Session 搬到 Redis，讓服務真正無狀態才是正解。' },
            ].map(({ title, content }) => (
              <div key={title} className="bg-violet-50 rounded-xl p-4 border border-violet-200">
                <h4 className="text-violet-800 font-bold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle size={14} className="text-violet-600" />
                  {title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          <Divider className="mb-8" />
          <div className="flex justify-between items-center">
            <Link href="/blog/system-design/ep01-intro">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer w-64">
                <CardBody className="p-4">
                  <div className="flex items-center gap-3">
                    <ArrowLeft size={20} className="text-violet-500" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="text-sm font-semibold text-gray-700">EP.01 系統設計思維</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <div className="flex gap-2">
              <Chip size="sm" color="secondary" variant="flat">Load Balancer</Chip>
              <Chip size="sm" color="secondary" variant="flat">System Design</Chip>
            </div>
            <Link href="/blog/system-design/ep03-cache">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer w-64">
                <CardBody className="p-4">
                  <div className="flex items-center justify-end gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">下一篇</p>
                      <p className="text-sm font-semibold text-gray-700">EP.03 快取策略</p>
                    </div>
                    <ArrowRight size={20} className="text-violet-500" />
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
