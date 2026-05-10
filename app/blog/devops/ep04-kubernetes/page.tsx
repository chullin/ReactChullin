'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
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
  BookOpen,
  Terminal,
  Server,
  Network,
  Layers,
  Settings,
  Package,
  BarChart3,
  Globe,
  HardDrive,
  Database
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

export default function DevOpsEP04() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-blue-800 via-indigo-800 to-violet-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.04</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">工程品質與 DevOps</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Kubernetes 入門：<br />
              <span className="text-indigo-300">Container 編排的下一步</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              Pod、Deployment、Service、Ingress — 從 Docker Compose 到 K8s 的思維轉換，以及為什麼大公司都在用
            </p>
            <div className="flex items-center gap-6 text-indigo-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Kubernetes · K8s · Container · DevOps</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Section 1: Docker Compose 的限制 */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 1：Docker Compose 的限制
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            Docker Compose 解決了「一個指令啟動整個開發環境」的問題，但當你把它用在生產環境，
            很快就會遇到它的天花板。
          </p>

          <p className="text-slate-700 font-semibold mb-3">在開發環境很好用，但生產環境呢？</p>
          <CodeBlock language="yaml">
{`   # docker-compose.yml 在開發環境很好，但生產環境...
services:
  web:
    image: myapp:latest
    ports:
      - "3000:3000"
    # ❌ 容器掛了就掛了，沒有自動重啟保障
    # ❌ 高流量來了，無法自動增加實例
    # ❌ 更新映像時需要停機，有 downtime
    # ❌ 只能在單台機器上運行，機器掛了服務就停了

  db:
    image: postgres:16
    # ❌ 資料庫單點故障，沒有 HA（高可用性）
    # ❌ 無法跨機器複製狀態

  redis:
    image: redis:7
    # ❌ 記憶體暫存也是單點，無法叢集   `}
</CodeBlock>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <Card className="border border-red-200 bg-red-50">
              <CardBody className="p-5">
                <p className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-red-500" />
                  Docker Compose 的生產問題
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>容器崩潰需要人工介入重啟</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>無法根據流量自動擴展</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>更新時有服務中斷</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>只能運行在單台主機</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border border-indigo-200 bg-indigo-50">
              <CardBody className="p-5">
                <p className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-indigo-500" />
                  Kubernetes 解決的問題
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">✓</span>
                    <span>容器崩潰自動重啟，自我修復</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">✓</span>
                    <span>HPA 根據 CPU/記憶體自動擴縮</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">✓</span>
                    <span>滾動更新，零 downtime 部署</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">✓</span>
                    <span>跨多台機器調度，高可用</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <Card className="border border-indigo-200 bg-indigo-50">
            <CardBody className="p-5">
              <p className="text-slate-700 leading-relaxed">
                <strong>一句話定位：</strong>
                Docker Compose 是「開發環境的工具」，Kubernetes 是「生產環境的 Docker Compose」——
                但多了自動重啟、自動擴展、滾動更新、跨機器排程，以及一套宣告式的期望狀態管理機制。
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 2: K8s 核心概念架構圖 */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <Layers size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 2：Kubernetes 核心概念圖
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            K8s 由兩種節點組成：<strong>Control Plane（Master）</strong> 負責管理決策，
            <strong>Worker Nodes</strong> 負責實際跑程式。你的應用程式永遠跑在 Worker Node 上。
          </p>

          <p className="text-slate-700 font-semibold mb-3">K8s Cluster 架構：</p>
          <CodeBlock language="text">
{`   Kubernetes Cluster
├── Control Plane（Master）
│   ├── API Server       ← 所有指令的唯一入口（kubectl 就是在跟它說話）
│   ├── Scheduler        ← 決定新的 Pod 要排程到哪台 Worker Node
│   ├── etcd             ← 分散式 KV 儲存，保存整個 cluster 的所有狀態
│   └── Controller Manager
│       ├── ReplicaSet Controller  ← 確保 Pod 數量符合期望值
│       ├── Deployment Controller  ← 管理滾動更新
│       └── Node Controller        ← 偵測 Node 是否健康
│
└── Worker Nodes（實際跑程式的機器）
    ├── Node 1
    │   ├── Pod A（含 1-N 個 Container）
    │   ├── Pod B
    │   ├── kube-proxy    ← 管理 Node 的網路規則（Service 路由）
    │   └── kubelet       ← Node 的管理 agent，與 API Server 溝通
    ├── Node 2
    │   ├── Pod C
    │   └── Pod D
    └── Node 3
        └── Pod E   `}
</CodeBlock>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Card className="border border-blue-200">
              <CardBody className="p-5">
                <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Server size={16} className="text-blue-500" />
                  Control Plane 各元件職責
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-slate-700">API Server</p>
                    <p className="text-slate-500">所有操作的門面，提供 REST API，kubectl 就是在呼叫它</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Scheduler</p>
                    <p className="text-slate-500">根據資源需求、親和性規則決定 Pod 跑在哪個 Node</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">etcd</p>
                    <p className="text-slate-500">Cluster 的「真相來源」，所有狀態都存在這裡</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="border border-blue-200">
              <CardBody className="p-5">
                <p className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <HardDrive size={16} className="text-indigo-500" />
                  Worker Node 各元件職責
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-slate-700">kubelet</p>
                    <p className="text-slate-500">在每個 Node 上跑的 agent，確保 Pod 按照規格運行</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">kube-proxy</p>
                    <p className="text-slate-500">維護 iptables 規則，實現 Service 的 load balancing</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">Container Runtime</p>
                    <p className="text-slate-500">實際跑 container（通常是 containerd 或 Docker）</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="mt-6 border border-amber-200 bg-amber-50">
            <CardBody className="p-5">
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>K8s 的核心設計哲學：宣告式（Declarative）而非命令式（Imperative）。</strong>
                你告訴 K8s「我要 3 個 Pod」，K8s 負責讓實際狀態達到期望狀態，並持續監控維護。
                如果一個 Pod 掛了，Controller 會自動建立新的 Pod 來補齊。
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 3: Pod 和 Deployment */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 3：Pod 和 Deployment
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            <strong>Pod</strong> 是 K8s 最小的部署單位——1 到 N 個 container 的集合，共享網路和儲存空間。
            但你通常不直接建立 Pod，而是透過 <strong>Deployment</strong> 來管理它。
          </p>

          <p className="text-slate-700 font-semibold mb-3">Pod 定義（了解結構即可，通常不直接使用）：</p>
          <CodeBlock language="yaml">
{`   # pod.yaml（通常不直接用，而是透過 Deployment）
apiVersion: v1
kind: Pod
metadata:
  name: my-app-pod
  labels:
    app: my-app
spec:
  containers:
    - name: web
      image: myapp:1.0.0
      ports:
        - containerPort: 3000
      env:
        - name: NODE_ENV
          value: production
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:         # 從 Secret 讀取，不要直接寫明文
              name: db-secret
              key: url   `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-8">Deployment — 生產環境真正使用的資源：</p>
          <CodeBlock language="yaml">
{`   # deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
spec:
  replicas: 3        # 同時維持 3 個 Pod 副本

  selector:
    matchLabels:
      app: my-app    # 選取有 app: my-app 標籤的 Pod

  template:          # Pod 的模板
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: web
          image: myapp:1.0.0
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production
          resources:
            requests:            # 排程時的最低需求
              memory: "128Mi"
              cpu: "250m"        # 250m = 0.25 顆 CPU
            limits:              # 硬性上限，超過會被 kill
              memory: "256Mi"
              cpu: "500m"
          livenessProbe:         # 健康檢查：失敗則重啟 container
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 30

  strategy:
    type: RollingUpdate          # 滾動更新：保持服務不中斷
    rollingUpdate:
      maxSurge: 1                # 更新時最多多跑 1 個新版 Pod
      maxUnavailable: 0          # 不允許 Pod 數量低於 replicas（零 downtime）   `}
</CodeBlock>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card className="border border-violet-200 bg-violet-50">
              <CardBody className="p-4 text-center">
                <p className="text-2xl font-black text-violet-600 mb-1">replicas</p>
                <p className="text-slate-600 text-sm">指定副本數，K8s 自動維持這個數量</p>
              </CardBody>
            </Card>
            <Card className="border border-violet-200 bg-violet-50">
              <CardBody className="p-4 text-center">
                <p className="text-2xl font-black text-violet-600 mb-1">resources</p>
                <p className="text-slate-600 text-sm">requests 用於排程，limits 防止資源濫用</p>
              </CardBody>
            </Card>
            <Card className="border border-violet-200 bg-violet-50">
              <CardBody className="p-4 text-center">
                <p className="text-2xl font-black text-violet-600 mb-1">RollingUpdate</p>
                <p className="text-slate-600 text-sm">新版 Pod 一個個替換舊版，用戶無感</p>
              </CardBody>
            </Card>
          </div>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 4: Service */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Network size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 4：Service — 讓 Pod 可以互相通訊
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            Pod 的 IP 是不固定的——Pod 每次重啟、重新排程，IP 就會變。
            <strong> Service</strong> 提供一個穩定的 DNS 名稱和 Virtual IP，
            讓其他服務可以用一致的方式找到你的 Pod，不論 Pod 實際 IP 是什麼。
          </p>

          <p className="text-slate-700 font-semibold mb-3">Service 定義：</p>
          <CodeBlock language="yaml">
{`   # service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
  namespace: production
spec:
  selector:
    app: my-app         # 流量會分發到所有 label 為 app: my-app 的 Pod

  ports:
    - protocol: TCP
      port: 80          # Service 對外暴露的 port
      targetPort: 3000  # 轉發到 Pod 的 port

  type: ClusterIP       # 只在 cluster 內部可訪問（預設值）   `}
</CodeBlock>

          <p className="text-slate-600 mb-6 leading-relaxed mt-4">
            建立 Service 後，其他 Pod 可以用
            <code className="bg-slate-100 px-2 py-0.5 rounded mx-1">http://my-app-service</code>
            或完整 DNS
            <code className="bg-slate-100 px-2 py-0.5 rounded mx-1">http://my-app-service.production.svc.cluster.local</code>
            來存取。
          </p>

          <p className="text-slate-700 font-semibold mb-4">三種 Service 類型：</p>
          <Card className="border border-slate-200">
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">Type</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">可訪問範圍</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">典型用途</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 font-mono text-blue-700 bg-blue-50">ClusterIP</td>
                      <td className="px-4 py-3 text-slate-600">Cluster 內部</td>
                      <td className="px-4 py-3 text-slate-600">微服務間通訊（預設，最常用）</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 font-mono text-orange-700 bg-orange-50">NodePort</td>
                      <td className="px-4 py-3 text-slate-600">每個 Node 的固定 Port（30000-32767）</td>
                      <td className="px-4 py-3 text-slate-600">開發測試、簡單暴露</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-green-700 bg-green-50">LoadBalancer</td>
                      <td className="px-4 py-3 text-slate-600">外部網際網路</td>
                      <td className="px-4 py-3 text-slate-600">雲端 LB（AWS ELB、GCP LB、Azure LB）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <p className="text-slate-700 font-semibold mb-3 mt-8">前後端服務各自的 Service 範例：</p>
          <CodeBlock language="yaml">
{`   # backend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP    # API 不需要對外，只讓 frontend 和 Ingress 存取

---
# frontend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP    # 同樣只讓 Ingress 存取，不直接對外   `}
</CodeBlock>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 5: Ingress */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 5：Ingress — 統一的流量入口
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            如果每個 Service 都開一個 LoadBalancer，你會需要很多個 IP 和很多筆 DNS 記錄——費用也會很可觀。
            Ingress 讓你用一個 Load Balancer 同時服務多個 Service，根據 domain 或 path 路由流量。
          </p>

          <p className="text-slate-700 font-semibold mb-3">Ingress 設定（需先安裝 ingress-nginx controller）：</p>
          <CodeBlock language="yaml">
{`   # ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  namespace: production
  annotations:
    # 使用 nginx ingress controller
    nginx.ingress.kubernetes.io/rewrite-target: /
    # 自動申請 Let's Encrypt SSL 憑證（需要 cert-manager）
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts:
        - myapp.com
        - api.myapp.com
      secretName: myapp-tls-secret   # cert-manager 自動管理憑證

  rules:
    # API 流量路由到 backend
    - host: api.myapp.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 80

    # 前端流量路由到 frontend
    - host: myapp.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80   `}
</CodeBlock>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card className="border border-emerald-200 bg-emerald-50">
              <CardBody className="p-5">
                <CheckCircle size={18} className="text-emerald-500 mb-2" />
                <p className="font-semibold text-slate-800 mb-1">節省費用</p>
                <p className="text-slate-600 text-sm">一個 Load Balancer 服務所有 Service，不需要每個 Service 各一個 LB</p>
              </CardBody>
            </Card>
            <Card className="border border-emerald-200 bg-emerald-50">
              <CardBody className="p-5">
                <CheckCircle size={18} className="text-emerald-500 mb-2" />
                <p className="font-semibold text-slate-800 mb-1">SSL 集中管理</p>
                <p className="text-slate-600 text-sm">TLS 終止在 Ingress 層，後端 Service 不需要各自管理憑證</p>
              </CardBody>
            </Card>
            <Card className="border border-emerald-200 bg-emerald-50">
              <CardBody className="p-5">
                <CheckCircle size={18} className="text-emerald-500 mb-2" />
                <p className="font-semibold text-slate-800 mb-1">靈活路由</p>
                <p className="text-slate-600 text-sm">根據 host 或 path 路由，/api/* → backend，/* → frontend</p>
              </CardBody>
            </Card>
          </div>

          <Card className="mt-6 border border-amber-200 bg-amber-50">
            <CardBody className="p-5">
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>安裝 ingress-nginx：</strong>
                Ingress 資源只是定義路由規則，需要搭配 Ingress Controller 才能運作。
                最常用的是 <code className="bg-slate-200 px-1 rounded text-xs">ingress-nginx</code>，
                可以用 Helm 安裝：<code className="bg-slate-200 px-1 rounded text-xs">helm install ingress-nginx ingress-nginx/ingress-nginx</code>。
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 6: kubectl 速查 */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
              <Terminal size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 6：常用 kubectl 指令速查
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            <code className="bg-slate-100 px-2 py-0.5 rounded">kubectl</code> 是與 K8s API Server 溝通的 CLI 工具。
            掌握以下指令，足以應付日常開發和 debug 的需求。
          </p>

          <p className="text-slate-700 font-semibold mb-3">部署與更新：</p>
          <CodeBlock language="bash">
{`   # 套用 YAML 設定（建立或更新資源）
kubectl apply -f deployment.yaml

# 套用整個目錄下的所有 YAML
kubectl apply -f ./k8s/

# 查看部署進度（會等待直到完成）
kubectl rollout status deployment/my-app

# 暫停滾動更新（例如發現問題想先停止）
kubectl rollout pause deployment/my-app

# 繼續暫停的更新
kubectl rollout resume deployment/my-app   `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-6">查看資源狀態：</p>
          <CodeBlock language="bash">
{`   # 列出所有 Pod
kubectl get pods

# 帶有更多資訊（IP、Node、年齡）
kubectl get pods -o wide

# 持續 watch（每 2 秒刷新）
kubectl get pods -w

# 查看 Pod 詳細資訊（Events 欄位最有用，排查錯誤靠這個）
kubectl describe pod my-app-abc123-xyz

# 列出 Service 和 Deployment
kubectl get services
kubectl get deployments

# 列出所有 namespace 的資源
kubectl get pods -A   `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-6">查看 logs / 進入 container：</p>
          <CodeBlock language="bash">
{`   # 查看 Pod logs（最後 100 行）
kubectl logs my-app-abc123 --tail=100

# Follow mode（即時串流，Ctrl+C 停止）
kubectl logs -f my-app-abc123

# 多個 container 的 Pod，指定 container 名稱
kubectl logs my-app-abc123 -c web

# 進入 container 執行 shell（類似 docker exec -it）
kubectl exec -it my-app-abc123 -- bash

# 在 container 中執行單一指令
kubectl exec my-app-abc123 -- env | grep NODE   `}
</CodeBlock>

          <p className="text-slate-700 font-semibold mb-3 mt-6">常用操作：</p>
          <CodeBlock language="bash">
{`   # 直接更新 Deployment 的 image（觸發滾動更新）
kubectl set image deployment/my-app web=myapp:1.1.0

# 查看 rollout 歷史
kubectl rollout history deployment/my-app

# 回滾到上一個版本
kubectl rollout undo deployment/my-app

# 回滾到指定版本
kubectl rollout undo deployment/my-app --to-revision=2

# 手動擴展副本數
kubectl scale deployment my-app --replicas=5

# 強制刪除 Pod（讓它重新建立）
kubectl delete pod my-app-abc123

# 刪除整個 Deployment
kubectl delete deployment my-app

# 套用 YAML 時刪除資源（等同 kubectl delete -f）
kubectl delete -f deployment.yaml

# 臨時 port-forward（本機訪問 cluster 內的 Service，用於 debug）
kubectl port-forward service/my-app-service 8080:80   `}
</CodeBlock>
        </motion.div>

        <Divider className="my-8" />

        {/* Section 7: HPA 自動水平擴展 */}
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">
              Section 7：HPA — 自動水平擴展
            </h2>
          </div>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            Horizontal Pod Autoscaler（HPA）是 K8s 最能體現價值的功能之一：
            根據 CPU、記憶體使用率，或自定義指標，自動增減 Pod 數量。
            流量高峰時自動擴展，離峰時自動縮減，兼顧效能與成本。
          </p>

          <p className="text-slate-700 font-semibold mb-3">HPA 設定：</p>
          <CodeBlock language="yaml">
{`   # hpa.yaml（Horizontal Pod Autoscaler）
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app          # 要自動擴縮的 Deployment

  minReplicas: 2          # 最少保持 2 個 Pod（避免單點故障）
  maxReplicas: 10         # 最多擴展到 10 個 Pod（控制成本上限）

  metrics:
    # 根據 CPU 使用率擴縮
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70   # 平均 CPU 超過 70% 就加 Pod

    # 也可以同時設定 Memory 指標
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80   # 平均 Memory 超過 80% 就加 Pod

  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60    # 等待 60 秒確認後再 scale up
      policies:
        - type: Pods
          value: 2
          periodSeconds: 60             # 每分鐘最多加 2 個 Pod
    scaleDown:
      stabilizationWindowSeconds: 300   # scale down 更保守，等 5 分鐘
      policies:
        - type: Percent
          value: 20
          periodSeconds: 60             # 每分鐘最多減少 20%   `}
</CodeBlock>

          <Card className="mt-6 mb-8 border border-amber-200 bg-amber-50">
            <CardBody className="p-5">
              <p className="font-semibold text-slate-800 mb-2">HPA 運作前提</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                HPA 需要 Deployment 的 Pod 設定了 <code className="bg-slate-200 px-1 rounded text-xs">resources.requests</code>，
                才能計算使用率百分比。同時 cluster 需要安裝 <code className="bg-slate-200 px-1 rounded text-xs">metrics-server</code>
                才能收集 Pod 的即時資源使用數據。
              </p>
            </CardBody>
          </Card>

          <p className="text-slate-700 font-semibold mb-4">Docker Compose vs Kubernetes 功能完整對比：</p>
          <Card className="border border-slate-200">
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700">功能</th>
                      <th className="text-center px-4 py-3 font-semibold text-slate-700">Docker Compose</th>
                      <th className="text-center px-4 py-3 font-semibold text-slate-700">Kubernetes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-700 font-medium">容器管理</td>
                      <td className="px-4 py-3 text-center text-green-600">✅</td>
                      <td className="px-4 py-3 text-center text-green-600">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="px-4 py-3 text-slate-700 font-medium">自動重啟</td>
                      <td className="px-4 py-3 text-center text-amber-600">需手動配置 restart policy</td>
                      <td className="px-4 py-3 text-center text-green-600">✅ 內建，自動</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-700 font-medium">跨機器部署</td>
                      <td className="px-4 py-3 text-center text-red-500">❌ 單台主機</td>
                      <td className="px-4 py-3 text-center text-green-600">✅ 多 Node 叢集</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="px-4 py-3 text-slate-700 font-medium">滾動更新</td>
                      <td className="px-4 py-3 text-center text-red-500">❌ 停機更新</td>
                      <td className="px-4 py-3 text-center text-green-600">✅ 零 downtime</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-700 font-medium">自動擴展</td>
                      <td className="px-4 py-3 text-center text-red-500">❌</td>
                      <td className="px-4 py-3 text-center text-green-600">✅ HPA 自動擴縮</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="px-4 py-3 text-slate-700 font-medium">負載均衡</td>
                      <td className="px-4 py-3 text-center text-red-500">❌</td>
                      <td className="px-4 py-3 text-center text-green-600">✅ Service + Ingress</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-700 font-medium">服務發現 / DNS</td>
                      <td className="px-4 py-3 text-center text-amber-600">限 docker-compose 網路</td>
                      <td className="px-4 py-3 text-center text-green-600">✅ CoreDNS 自動解析</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="px-4 py-3 text-slate-700 font-medium">機密管理</td>
                      <td className="px-4 py-3 text-center text-amber-600">環境變數 / .env 檔</td>
                      <td className="px-4 py-3 text-center text-green-600">✅ Secret 資源</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-700 font-medium">健康檢查</td>
                      <td className="px-4 py-3 text-center text-amber-600">基本 healthcheck</td>
                      <td className="px-4 py-3 text-center text-green-600">✅ Liveness + Readiness Probe</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <td className="px-4 py-3 text-slate-700 font-medium">學習曲線</td>
                      <td className="px-4 py-3 text-center text-green-600">低，1 天可上手</td>
                      <td className="px-4 py-3 text-center text-amber-600">高，需要數週</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-slate-700 font-medium">適合環境</td>
                      <td className="px-4 py-3 text-center text-slate-600">開發 / 小規模生產</td>
                      <td className="px-4 py-3 text-center text-slate-600">中大型生產環境</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <Card className="mt-6 border border-indigo-200 bg-indigo-50">
            <CardBody className="p-5">
              <p className="font-semibold text-slate-800 mb-2">什麼時候該從 Compose 遷移到 K8s？</p>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-indigo-500 shrink-0" />
                  <span>流量不穩定，需要彈性擴縮</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-indigo-500 shrink-0" />
                  <span>服務數量超過 5-10 個，需要統一管理</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-indigo-500 shrink-0" />
                  <span>要求高可用性（99.9%+ SLA）</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-indigo-500 shrink-0" />
                  <span>多個環境（dev/staging/prod）需要一致的部署方式</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <Divider className="my-8" />

        {/* Tags */}
        <motion.div {...fadeInUp}>
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-3">Tags</p>
          <div className="flex flex-wrap gap-2">
            {['Kubernetes', 'K8s', 'Docker', 'DevOps', 'Container', 'HPA', 'Deployment'].map(tag => (
              <Chip key={tag} size="sm" variant="flat" className="bg-indigo-100 text-indigo-800">
                {tag}
              </Chip>
            ))}
          </div>
        </motion.div>

        <Divider className="my-8" />

        {/* Navigation */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/blog/devops/ep03-docker-compose">
              <Card className="border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer h-full">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                    <ArrowLeft size={14} />
                    <span>上一篇</span>
                  </div>
                  <p className="font-semibold text-slate-800">EP.03 Docker Compose</p>
                  <p className="text-slate-500 text-sm mt-1">一個指令啟動整個開發環境</p>
                </CardBody>
              </Card>
            </Link>
            <Link href="/blog/devops/ep01-test-pyramid">
              <Card className="border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer h-full">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-2 justify-end">
                    <span>回到系列起點</span>
                    <ArrowRight size={14} />
                  </div>
                  <p className="font-semibold text-slate-800 text-right">EP.01 測試金字塔</p>
                  <p className="text-slate-500 text-sm mt-1 text-right">DevOps 系列從這裡開始</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
