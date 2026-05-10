'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Zap,
  Terminal,
  Server,
  Layers,
  Settings,
  BarChart3,
  GitBranch,
  RefreshCw,
  Flag,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Activity,
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

export default function DevOpsEP05() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.05</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">DevOps 系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              藍綠部署與 Canary Release：<br />
              <span className="text-zinc-300">零 Downtime 上線策略</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              藍綠切換、Canary 灰度發布、Feature Flag、滾動更新 — 讓每次部署都可以安全回滾
            </p>
            <div className="flex items-center gap-6 text-gray-400 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Blue-Green · Canary · Feature Flag · DevOps</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* ── Section 1：傳統部署的風險 ─────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-2 rounded-lg">
              <AlertTriangle className="text-red-600" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">1. 傳統部署的風險</h2>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">
            大多數初學者對「部署」的理解，就是 SSH 進伺服器、拉最新程式碼、重啟服務。這種方式簡單直覺，
            但在流量大的生產環境中是不可接受的操作模式。
          </p>

          <CodeBlock language="bash">
{` # 傳統部署（In-place deployment）
ssh production-server
git pull origin main
npm run build
pm2 restart app    # 這段時間：服務中斷！

# 問題：
# 1. 部署期間有 downtime（可能幾秒到幾分鐘）
# 2. 新版有 bug → 回滾需要重新部署（又是 downtime）
# 3. 用戶可能在操作到一半時遭遇中斷 `}
</CodeBlock>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-red-200 bg-red-50">
              <CardBody className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="text-red-500" size={18} />
                  <span className="font-semibold text-red-700 text-sm">服務中斷</span>
                </div>
                <p className="text-xs text-red-600">pm2 restart 期間，所有進來的請求都會收到 connection refused 或 502</p>
              </CardBody>
            </Card>
            <Card className="border border-orange-200 bg-orange-50">
              <CardBody className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="text-orange-500" size={18} />
                  <span className="font-semibold text-orange-700 text-sm">回滾成本高</span>
                </div>
                <p className="text-xs text-orange-600">新版出問題要 git revert + 重新 build + 重新部署，整個流程再來一遍</p>
              </CardBody>
            </Card>
            <Card className="border border-yellow-200 bg-yellow-50">
              <CardBody className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-yellow-600" size={18} />
                  <span className="font-semibold text-yellow-700 text-sm">業務損失</span>
                </div>
                <p className="text-xs text-yellow-700">用戶在購物車結帳時遭遇中斷，這筆訂單大概就丟了</p>
              </CardBody>
            </Card>
          </div>

          <div className="mt-6 bg-slate-800 text-white rounded-xl p-6">
            <div className="flex items-start gap-3">
              <BarChart3 className="text-red-400 mt-0.5 shrink-0" size={20} />
              <div>
                <p className="font-bold text-white mb-1">業務影響試算</p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  一個電商網站，平均每秒 <span className="text-yellow-300 font-mono font-bold">$500 GMV</span>，
                  10 分鐘部署 downtime = <span className="text-red-400 font-mono font-bold">$300,000 潛在損失</span>。
                  這還不算用戶信任度的損耗與 SEO 的負面影響。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 2：藍綠部署 ───────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Server className="text-blue-600" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">2. 藍綠部署（Blue-Green Deployment）</h2>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">
            藍綠部署的核心思路是：<strong>永遠維持兩個完整的生產環境</strong>，一個跑目前版本（藍色），
            一個準備新版本（綠色）。切換流量只需要更新 Load Balancer 的指向，
            整個過程對用戶而言是無感的。
          </p>

          <Card className="mb-6 bg-slate-900 border-0">
            <CardBody className="p-6">
              <p className="text-xs font-mono text-slate-400 mb-3">架構示意圖</p>
              <pre className="text-sm font-mono text-green-400 leading-relaxed overflow-x-auto">{`                Load Balancer
                      │
         ┌────────────┴────────────┐
         ▼                         ▼
   Blue（v1.0）              Green（v1.1）← 新版本在這裡
   [目前的 Production]        [準備好了但沒有流量]`}</pre>
            </CardBody>
          </Card>

          <div className="mb-6">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <CheckCircle className="text-blue-500" size={18} />
              部署流程（共 6 步）
            </h3>
            <div className="space-y-3">
              {[
                { step: '1', text: '維持藍色環境（v1.0）服務所有流量，用戶完全無感' },
                { step: '2', text: '在綠色環境部署 v1.1（不影響任何現有流量）' },
                { step: '3', text: '在綠色環境跑 smoke test，確認服務健康' },
                { step: '4', text: '把 Load Balancer 切換指向綠色（瞬間切換，零 downtime）' },
                { step: '5', text: '監控 15–30 分鐘，觀察錯誤率與 latency' },
                { step: '6', text: 'OK → 綠色成為新的「藍色」；有問題 → 切回藍色（秒級回滾）' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">{step}</span>
                  <p className="text-slate-600 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Terminal className="text-slate-500" size={18} />
            GitHub Actions 實作
          </h3>

          <CodeBlock language="yaml">
{` # .github/workflows/blue-green-deploy.yml
name: Blue-Green Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Build new image
        run: |
          docker build -t myapp:\\${{ github.sha }} .
          docker push registry.example.com/myapp:\\${{ github.sha }}

      - name: Deploy to Green environment
        run: |
          kubectl set image deployment/myapp-green \\
            web=registry.example.com/myapp:\\${{ github.sha }}
          kubectl rollout status deployment/myapp-green

      - name: Run smoke tests on Green
        run: |
          GREEN_URL=\$(kubectl get service myapp-green -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
          curl -f "\$GREEN_URL/health" || exit 1
          ./scripts/smoke-test.sh "\$GREEN_URL"

      - name: Switch traffic to Green
        run: |
          # 更新 Ingress 指向 Green service
          kubectl patch ingress myapp-ingress \\
            --type='json' \\
            -p='[{"op": "replace", "path": "/spec/rules/0/http/paths/0/backend/service/name", "value": "myapp-green"}]'

      - name: Monitor for 5 minutes
        run: sleep 300

      - name: Rename Green to Blue (for next deployment)
        run: |
          # 更新 label，讓下次部署知道哪個是「穩定版」
          kubectl label deployment myapp-green role=blue --overwrite
          kubectl label deployment myapp-blue role=green --overwrite `}
</CodeBlock>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-blue-200 bg-blue-50">
              <CardBody className="p-4">
                <p className="font-semibold text-blue-700 text-sm mb-2">優點</p>
                <ul className="space-y-1 text-xs text-blue-600">
                  <li>• 回滾只需更改 Load Balancer 指向，速度秒級</li>
                  <li>• 新舊版本完全隔離，不存在混合版本問題</li>
                  <li>• 可以在綠色環境做充分的預熱（warm-up）</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border border-orange-200 bg-orange-50">
              <CardBody className="p-4">
                <p className="font-semibold text-orange-700 text-sm mb-2">缺點</p>
                <ul className="space-y-1 text-xs text-orange-600">
                  <li>• 資源成本翻倍（永遠有兩套完整環境）</li>
                  <li>• 資料庫 migration 要特別小心（兩版本都要能讀同一份 DB）</li>
                  <li>• Session / 狀態管理需要考慮切換時的用戶影響</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 3：Canary Release ─────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Activity className="text-yellow-600" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">3. Canary Release（金絲雀發布）</h2>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🐤</span>
              <div>
                <p className="font-bold text-yellow-800 mb-1">名稱的由來</p>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  礦工下礦前會帶一隻金絲雀——金絲雀對有毒氣體極度敏感，如果牠死了礦工就知道前方有危險。
                  Canary Release 採用同樣的邏輯：先讓<strong>少數用戶（5–10%）</strong>接觸新版本，
                  如果這批「先鋒用戶」沒遇到問題，再逐步把流量全部切過去。
                </p>
              </div>
            </div>
          </div>

          <Card className="mb-6 bg-slate-900 border-0">
            <CardBody className="p-6">
              <p className="text-xs font-mono text-slate-400 mb-3">流量分配示意</p>
              <pre className="text-sm font-mono text-green-400 leading-relaxed overflow-x-auto">{`Load Balancer
    │
    ├── 90% → Stable (v1.0)
    └── 10% → Canary (v1.1)   ← 只有 10% 用戶看到新版`}</pre>
            </CardBody>
          </Card>

          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Layers className="text-slate-500" size={18} />
            Kubernetes 實作：副本數控制流量比例
          </h3>

          <CodeBlock language="yaml">
{` # stable-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-stable
  labels:
    app: myapp
    version: stable
spec:
  replicas: 9        # 90% 流量
  template:
    metadata:
      labels:
        app: myapp
        version: stable
    spec:
      containers:
        - name: web
          image: myapp:1.0.0

---
# canary-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-canary
  labels:
    app: myapp
    version: canary
spec:
  replicas: 1        # 10% 流量（1 out of 10 total pods）
  template:
    metadata:
      labels:
        app: myapp
        version: canary
    spec:
      containers:
        - name: web
          image: myapp:1.1.0

---
# service.yaml（同一個 Service 路由到兩個 Deployment）
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp         # 同時選中 stable 和 canary（pod 比例決定流量比例）
  ports:
    - port: 80
      targetPort: 3000 `}
</CodeBlock>

          <div className="mt-6">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <BarChart3 className="text-slate-500" size={18} />
              Canary 的監控（這才是關鍵）
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              部署 Canary 後不能就放著不管。要盯著這三類指標至少 30 分鐘，才能決定全量推出或回滾。
            </p>

            <CodeBlock language="bash">
{` # 在 Canary 部署後監控這些指標（30 分鐘）
- 5xx Error Rate（應該 < 0.1%）
- P99 Latency（應該沒有顯著升高）
- Business Metrics（訂單轉換率、用戶行為）

# 全量推出：
kubectl scale deployment myapp-canary --replicas=10
kubectl scale deployment myapp-stable --replicas=0

# 回滾：
kubectl scale deployment myapp-canary --replicas=0 `}
</CodeBlock>
          </div>

          <div className="mt-6 bg-gradient-to-r from-slate-800 to-zinc-800 text-white rounded-xl p-5">
            <p className="font-bold mb-2 flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-400" />
              Canary 的進階做法
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              更精細的 Canary 不只用副本數控制，而是透過 <strong className="text-white">Nginx Ingress 的 annotation</strong> 或
              <strong className="text-white"> Istio</strong> 做精準的流量百分比控制（例如 5.3%）。
              也可以針對特定用戶群（如 Beta 用戶、內部員工）做定向灰度，而非隨機 10%。
            </p>
          </div>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 4：Feature Flag ───────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <Flag className="text-green-600" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">4. Feature Flag（功能旗標）</h2>
          </div>

          <p className="text-slate-600 leading-relaxed mb-4">
            Canary Release 是在基礎設施層面控制流量；Feature Flag 則更深一層，讓你在<strong>應用程式層</strong>控制功能的開關。
            最重要的一個概念是：<strong>「部署」和「功能發布」可以分離。</strong>
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <p className="font-bold text-green-800 mb-2">為什麼需要分離？</p>
            <p className="text-green-700 text-sm leading-relaxed">
              你可以把還沒開發完的功能藏在 Feature Flag 後面，先部署到生產環境（但功能關閉），
              避免長期維持一個超大 feature branch。等功能完全就緒，只需要翻轉一個 flag，不用重新部署。
            </p>
          </div>

          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Settings className="text-slate-500" size={18} />
            自製簡易 Feature Flag 系統
          </h3>

          <CodeBlock language="typescript">
{` // lib/featureFlags.ts
type FeatureFlag = {
  enabled: boolean;
  rolloutPercentage: number;  // 0-100，向多少 % 用戶開放
  allowList?: string[];       // 特定用戶 ID 白名單
};

const flags: Record<string, FeatureFlag> = {
  'new-checkout-flow': {
    enabled: true,
    rolloutPercentage: 10,    // 先開 10% 用戶
    allowList: ['admin@example.com'],
  },
  'ai-recommendations': {
    enabled: false,           // 還沒準備好
    rolloutPercentage: 0,
  },
};

export function isFeatureEnabled(flagName: string, userId: string): boolean {
  const flag = flags[flagName];
  if (!flag || !flag.enabled) return false;

  // 白名單用戶永遠開啟
  if (flag.allowList?.includes(userId)) return true;

  // 根據 userId 的 hash 決定（確保同一個用戶永遠看到同樣結果）
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (hash % 100) < flag.rolloutPercentage;
} `}
</CodeBlock>

          <div className="mt-6">
            <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Zap className="text-slate-500" size={18} />
              在元件中使用
            </h3>

            <CodeBlock language="tsx">
{` function CheckoutPage({ userId }) {
  const showNewCheckout = isFeatureEnabled('new-checkout-flow', userId);

  return showNewCheckout ? <NewCheckoutFlow /> : <OldCheckoutFlow />;
} `}
</CodeBlock>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-slate-700 mb-4">推薦的 Feature Flag 服務</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-slate-200">
                <CardBody className="p-4">
                  <div className="font-bold text-slate-800 mb-1">LaunchDarkly</div>
                  <p className="text-xs text-slate-500 mb-2">業界標準，功能最完整</p>
                  <Chip size="sm" color="warning" variant="flat">付費</Chip>
                </CardBody>
              </Card>
              <Card className="border border-slate-200">
                <CardBody className="p-4">
                  <div className="font-bold text-slate-800 mb-1">Flagsmith</div>
                  <p className="text-xs text-slate-500 mb-2">開源，可自行部署</p>
                  <Chip size="sm" color="success" variant="flat">開源</Chip>
                </CardBody>
              </Card>
              <Card className="border border-slate-200">
                <CardBody className="p-4">
                  <div className="font-bold text-slate-800 mb-1">Vercel Edge Config</div>
                  <p className="text-xs text-slate-500 mb-2">與 Vercel 生態深度整合</p>
                  <Chip size="sm" color="primary" variant="flat">平台內建</Chip>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>注意：</strong>Flag 要有人管理，部署完成後記得清理不再需要的 flag。
                長期累積的 feature flag 會讓程式碼可讀性急速下降，這也是「技術債」的常見來源之一。
              </p>
            </div>
          </div>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 5：Rolling Update ─────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <RefreshCw className="text-purple-600" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">5. 滾動更新（Rolling Update）</h2>
          </div>

          <p className="text-slate-600 leading-relaxed mb-4">
            Kubernetes 的 Rolling Update 是<strong>最容易入門的零 downtime 部署方式</strong>，也是 Kubernetes Deployment 的預設策略。
            概念是：逐批替換舊版 Pod，而非一次全部下線。在 EP.04 中我們提過這個策略，這裡深入看它的參數控制。
          </p>

          <CodeBlock language="yaml">
{` strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 25%        # 最多比 replicas 多 25% 的 Pod（新版）
    maxUnavailable: 0    # 零 downtime：不允許任何 Pod 不可用

# 10 個 Pod 的滾動過程：
# Step 1: 啟動 3 個新版 Pod → 共 13 個（10+3）
# Step 2: 關閉 3 個舊版 Pod → 共 10 個（7+3）
# Step 3: 啟動 3 個新版 Pod → 共 13 個（7+6）
# ...直到全部換完 `}
</CodeBlock>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-purple-200 bg-purple-50">
              <CardBody className="p-4">
                <p className="font-semibold text-purple-700 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle size={14} /> 優點
                </p>
                <ul className="space-y-1 text-xs text-purple-600">
                  <li>• K8s 預設支援，幾乎不需要額外設定</li>
                  <li>• 不需要雙倍資源（藍綠才需要）</li>
                  <li>• 過程可以用 <code className="bg-purple-100 px-1 rounded">kubectl rollout status</code> 監控</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border border-red-200 bg-red-50">
              <CardBody className="p-4">
                <p className="font-semibold text-red-700 text-sm mb-2 flex items-center gap-1.5">
                  <AlertCircle size={14} /> 注意事項
                </p>
                <ul className="space-y-1 text-xs text-red-600">
                  <li>• 部署期間新舊版本<strong>同時存在</strong></li>
                  <li>• 必須確保兩版本的 API 相容（向後兼容）</li>
                  <li>• DB schema 異動要特別謹慎</li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <div className="mt-5 bg-slate-800 text-white rounded-xl p-5">
            <p className="font-bold mb-2 flex items-center gap-2">
              <GitBranch size={16} className="text-purple-400" />
              快速回滾指令
            </p>
            <CodeBlock language="bash">
{` # 查看部署歷史
kubectl rollout history deployment/myapp

# 回滾到上一個版本（不需要重新 build！）
kubectl rollout undo deployment/myapp

# 回滾到指定版本
kubectl rollout undo deployment/myapp --to-revision=3 `}
</CodeBlock>
          </div>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Section 6：各策略比較與選擇指南 ─────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <BarChart3 className="text-indigo-600" size={22} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">6. 各策略比較與選擇指南</h2>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">
            四種策略各有適用場景，沒有「最好的」，只有「最適合當下團隊規模與業務風險」的那一個。
          </p>

          <Card className="mb-6 overflow-hidden">
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="text-left px-4 py-3 font-semibold">比較項目</th>
                      <th className="px-4 py-3 font-semibold text-center">In-place</th>
                      <th className="px-4 py-3 font-semibold text-center">Rolling Update</th>
                      <th className="px-4 py-3 font-semibold text-center text-blue-300">Blue-Green</th>
                      <th className="px-4 py-3 font-semibold text-center text-yellow-300">Canary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">Downtime</td>
                      <td className="px-4 py-3 text-center"><Chip size="sm" color="danger" variant="flat">有</Chip></td>
                      <td className="px-4 py-3 text-center"><Chip size="sm" color="success" variant="flat">零</Chip></td>
                      <td className="px-4 py-3 text-center"><Chip size="sm" color="success" variant="flat">零</Chip></td>
                      <td className="px-4 py-3 text-center"><Chip size="sm" color="success" variant="flat">零</Chip></td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">回滾速度</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">慢（重新部署）</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">慢（重新 rollout）</td>
                      <td className="px-4 py-3 text-center text-blue-600 font-bold text-xs">秒級</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">快</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">資源成本</td>
                      <td className="px-4 py-3 text-center"><Chip size="sm" color="success" variant="flat">最低</Chip></td>
                      <td className="px-4 py-3 text-center"><Chip size="sm" color="success" variant="flat">低</Chip></td>
                      <td className="px-4 py-3 text-center"><Chip size="sm" color="danger" variant="flat">2 倍</Chip></td>
                      <td className="px-4 py-3 text-center"><Chip size="sm" color="success" variant="flat">低</Chip></td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">複雜度</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">最低</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">低</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">中</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">高</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">風險控制</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">無</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">少</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">中（全切換）</td>
                      <td className="px-4 py-3 text-center text-yellow-600 font-bold text-xs">最佳</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">適合場景</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">非關鍵系統</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">一般服務</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">需快速回滾</td>
                      <td className="px-4 py-3 text-center text-slate-500 text-xs">高風險更新</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <div className="bg-gradient-to-br from-slate-800 to-zinc-900 text-white rounded-2xl p-6">
            <p className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-green-400" />
              2026 年的建議選擇
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-slate-600 text-slate-200 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">個人專案 / MVP</div>
                <p className="text-slate-300 text-sm">
                  <strong className="text-white">Rolling Update</strong>（Kubernetes 預設）—— 成本最低，夠用就好，別過早優化。
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-700 text-blue-200 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">中型產品</div>
                <p className="text-slate-300 text-sm">
                  <strong className="text-white">Blue-Green</strong> —— 安全回滾機制是必要的，2 倍資源成本在這個階段完全值得。
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-yellow-700 text-yellow-200 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">大型 / 高風險功能</div>
                <p className="text-slate-300 text-sm">
                  <strong className="text-white">Canary + Feature Flag</strong> —— 最精細的風險控制，Netflix、Google、Spotify 標準做法。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <Divider className="my-8" />

        {/* ── Tags ──────────────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex flex-wrap gap-2">
            {['Blue-Green', 'Canary Release', 'Feature Flag', 'Zero Downtime', 'DevOps', 'Kubernetes'].map((tag) => (
              <Chip key={tag} variant="flat" color="default" size="sm">{tag}</Chip>
            ))}
          </div>
        </motion.div>

        {/* ── Navigation ────────────────────────────────────────── */}
        <motion.div {...fadeInUp}>
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <Link href="/blog/devops/ep04-kubernetes">
              <Card className="border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer">
                <CardBody className="p-4 flex flex-row items-center gap-3">
                  <ArrowLeft size={18} className="text-slate-500 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">上一篇</p>
                    <p className="text-sm font-semibold text-slate-700">EP.04 Kubernetes 入門</p>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/devops/ep01-test-pyramid">
              <Card className="border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all cursor-pointer">
                <CardBody className="p-4 flex flex-row items-center gap-3 justify-end">
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-0.5">跳轉</p>
                    <p className="text-sm font-semibold text-slate-700">EP.01 測試金字塔</p>
                  </div>
                  <ArrowRight size={18} className="text-slate-500 shrink-0" />
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
