import { FadeIn } from '@/components/blog/ScrollAnimation';
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
  Layers,
  Database,
  HardDrive,
  Terminal,
  Package,
  Settings,
  Network,
  Server
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Docker Compose： 一個指令啟動整個開發環境 | Joseph Chen',
  description: 'services、volumes、networks、depends_on — 讓前後端 + 資料庫一鍵啟動，告別「在我電腦可以跑」',
  alternates: {
    canonical: 'https://chullin.tw/blog/devops/ep03-docker-compose',
  },
};



const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function DevOpsEP03() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.03</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">工程品質與 DevOps</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Docker Compose：<br />
              <span className="text-cyan-300">一個指令啟動整個開發環境</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              services、volumes、networks、depends_on — 讓前後端 + 資料庫一鍵啟動，告別「在我電腦可以跑」
            </p>
            <div className="flex items-center gap-6 text-cyan-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 16 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Docker Compose · DevOps · Containerization</span>
            </div>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：痛點 ────────────────────────────────────── */}
        <section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 1：痛點 — 「在我電腦上可以跑」的根源</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            你剛加入一個新專案，同事丟給你一份 README，上面寫著：
          </p>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md bg-gray-900 mb-6">
            <div className="p-6">
              <p className="text-green-400 font-mono text-sm mb-2"># Getting Started</p>
              <div className="text-gray-300 font-mono text-sm space-y-1">
                <p className="text-yellow-400"># Prerequisites</p>
                <p>- Node.js 18.x（注意：不能用 19 或 20，會有 breaking change）</p>
                <p>- PostgreSQL 14（不是 15，因為用了 14 才有的功能）</p>
                <p>- Redis 7.0.x</p>
                <p>- RabbitMQ 3.11</p>
                <p>- Python 3.10（backend 服務用）</p>
                <p>- 記得設定 PATH 和 PYTHONPATH…</p>
                <p className="mt-3 text-yellow-400"># Setup</p>
                <p>1. 安裝 PostgreSQL，記得建 user 和 database</p>
                <p>2. 修改 pg_hba.conf（參考 wiki 第 7 頁）</p>
                <p>3. 啟動 Redis，確認 port 6379 沒被占用</p>
                <p>4. 設定 RabbitMQ virtual host…</p>
                <p className="text-red-400 mt-2"># （以下省略 30 步）</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            你跟著做，花了一整天。終於，你執行 <code className="bg-gray-100 px-2 py-0.5 rounded">npm run dev</code>，
            報錯。你問同事，同事說：「奇怪，在我電腦上可以跑啊。」
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            根源很簡單：<strong className="text-blue-700">每個人的電腦環境不同</strong> — 作業系統版本、已安裝的套件版本、環境變數設定、甚至 locale 差異，都可能導致行為不一致。
            這不是人的問題，是「把環境配置寫在腦袋裡」這種做法的問題。
          </p>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-lg border-l-4 border-blue-600">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <Package size={28} className="text-blue-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">類比：工廠的生產線設計圖</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Docker Compose 像是工廠的生產線設計圖（YAML 檔）。你把整個工廠需要的機器、原料、電路配置全部寫進這份設計圖裡。
                    任何人拿到這份設計圖，執行 <code className="bg-gray-100 px-1 rounded text-sm">docker compose up</code>，就能在自己的電腦上蓋出<strong>一模一樣的工廠</strong>——
                    不管他的電腦是 Mac、Windows 還是 Linux。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md border-l-4 border-red-400">
              <div className="p-5">
                <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  沒有 Docker Compose
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 新人 onboarding 花 1–3 天</li>
                  <li>• 版本衝突難以追蹤</li>
                  <li>• 環境差異導致 bug 難以重現</li>
                  <li>• README 永遠過時</li>
                  <li>• 「在我電腦上可以跑」</li>
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md border-l-4 border-green-400">
              <div className="p-5">
                <h4 className="font-bold text-green-600 mb-3 flex items-center gap-2">
                  <CheckCircle size={16} />
                  有了 Docker Compose
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 新人 onboarding：<code className="bg-gray-100 px-1 rounded text-xs">git clone &amp;&amp; docker compose up</code></li>
                  <li>• 所有依賴版本鎖死在 YAML</li>
                  <li>• 任何環境行為完全一致</li>
                  <li>• YAML 就是最新的文件</li>
                  <li>• 永遠可以跑</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ── Section 2：基礎架構 ──────────────────────────────────── */}
        <section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 2：Docker Compose 基礎架構</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            一切從最小可行的 <code className="bg-gray-100 px-2 py-0.5 rounded">docker-compose.yml</code> 開始。
            下面是一個 Web 應用 + 資料庫的基本結構，理解這個就掌握了 80% 的核心概念。
          </p>

          <CodeBlock language="yaml">
{`   version: '3.8'  # Compose 規格版本，建議用 3.8

services:       # 你的應用程式組件，每個 service = 一個 Container
  web:          # 服務名稱（可自定義，會成為容器間互連的 hostname）
    build: .    # 用當前目錄的 Dockerfile 建立 image
    ports:
      - "3000:3000"     # 主機port:容器port（讓外部可以存取容器內的服務）
    environment:
      - NODE_ENV=development
    depends_on:
      - db              # 確保 db 先啟動

  db:
    image: postgres:14  # 直接用 Docker Hub 上的官方 image（不需要 Dockerfile）
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    ports:
      - "5432:5432"     # 讓本機的 DB GUI 工具（TablePlus 等）可以連入   `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">三個核心概念</h3>

          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Server size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">services — 每個 service 就是一個 Container</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      <code className="bg-gray-100 px-1 rounded">services</code> 下的每個鍵（<code className="bg-gray-100 px-1 rounded">web</code>、<code className="bg-gray-100 px-1 rounded">db</code>）對應一個 Container。
                      服務名稱同時也是該 Container 在 Docker 內部網路的 hostname — 所以 <code className="bg-gray-100 px-1 rounded">web</code> 可以用
                      <code className="bg-gray-100 px-1 rounded">postgresql://db:5432/myapp</code> 連接到 <code className="bg-gray-100 px-1 rounded">db</code>，
                      不需要知道容器的 IP。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Package size={16} className="text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">build vs image — 自己的服務 vs 第三方</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      <code className="bg-gray-100 px-1 rounded">build: .</code> 意思是「用這個目錄的 Dockerfile 自己建立 image」，用於你自己開發的服務。
                      <code className="bg-gray-100 px-1 rounded ml-1">image: postgres:14</code> 意思是「直接從 Docker Hub 拉現成的 image」，
                      用於 PostgreSQL、Redis、RabbitMQ 等第三方服務，不需要自己寫 Dockerfile。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Network size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">ports — 「主機:容器」對應格式</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      <code className="bg-gray-100 px-1 rounded">"3000:3000"</code> 意思是：把主機的 3000 port 對應到容器的 3000 port。
                      如果你的主機 3000 port 被占用了，改成 <code className="bg-gray-100 px-1 rounded">"3001:3000"</code>，
                      用主機 3001 連進去容器的 3000。<strong>容器之間互連不需要 ports，只有讓主機（你的瀏覽器）能存取時才需要。</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ── Section 3：完整全端應用 ───────────────────────────────── */}
        <section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-cyan-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 3：完整全端應用範例</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            實際專案的 Compose 檔通常包含 4 個服務：前端、後端、資料庫、快取。
            以下是一個 Next.js + FastAPI + PostgreSQL + Redis 的完整範例，附上每個關鍵設定的說明。
          </p>

          <CodeBlock language="yaml">
{`   version: '3.8'

services:

  # ── Frontend (Next.js) ──────────────────────────────────────────
  frontend:
    build:
      context: ./frontend      # Dockerfile 位置（相對於 docker-compose.yml）
      dockerfile: Dockerfile.dev  # 指定使用開發用的 Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app            # Bind Mount：本機改動即時同步到容器
      - /app/node_modules          # 匿名 Volume：避免主機的 node_modules 覆蓋容器的
    environment:
      # 用服務名稱 "backend" 作為 hostname（而不是 localhost）
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend    # frontend 在 backend 啟動後才啟動

  # ── Backend (FastAPI) ───────────────────────────────────────────
  backend:
    build:
      context: ./backend
    ports:
      - "8000:8000"
    environment:
      # postgres 是 db 服務的名稱，直接作為 hostname 使用
      - DATABASE_URL=postgresql://postgres:secret@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy   # 等到 db 的 healthcheck 通過才啟動
      redis:
        condition: service_started   # redis 只要啟動就行（沒有 healthcheck）
    volumes:
      - ./backend:/app   # 開發時即時同步程式碼

  # ── Database (PostgreSQL) ───────────────────────────────────────
  db:
    image: postgres:14-alpine    # alpine 版本體積更小
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data   # Named Volume 持久化資料
    ports:
      - "5432:5432"              # 方便本機 DB GUI 連入（可選）
    healthcheck:
      # pg_isready 是 PostgreSQL 內建的健康檢查工具
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s    # 每 5 秒檢查一次
      timeout: 5s     # 超過 5 秒視為失敗
      retries: 5      # 連續失敗 5 次才算不健康

  # ── Cache (Redis) ───────────────────────────────────────────────
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    # Redis 預設是 in-memory，重啟資料就消失
    # 如果需要持久化，加上：
    # volumes:
    #   - redis_data:/data
    # command: redis-server --appendonly yes

# ── 頂層 Volumes 宣告 ─────────────────────────────────────────────
# 這裡宣告的 Named Volume 由 Docker 管理
# 即使執行 docker compose down，這些資料也不會消失
# （要清除資料：docker compose down -v）
volumes:
  postgres_data:
  # redis_data:   # 如果 Redis 也要持久化就加這行   `}
</CodeBlock>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md mt-6 bg-blue-50">
            <div className="p-6">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <BookOpen size={16} />
                為什麼 backend 用服務名稱 "db" 連資料庫，而不是 "localhost"？
              </h4>
              <p className="text-blue-700 text-sm leading-relaxed">
                Docker Compose 會自動為所有服務建立一個內部網路（default network）。
                在這個網路裡，<strong>每個服務的名稱就是它的 hostname</strong>。
                backend 容器和 db 容器是兩個不同的 Container，各自有獨立的 network namespace，
                所以 backend 裡的 <code className="bg-white/70 px-1 rounded">localhost</code> 指的是 backend 容器本身，不是 db 容器。
                要連到 db 容器，必須用 <code className="bg-white/70 px-1 rounded">db</code>（服務名稱）作為 hostname。
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ── Section 4：Volumes ───────────────────────────────────── */}
        <section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <HardDrive size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 4：Volumes — 三種掛載方式</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Volumes 是 Docker 中最容易讓初學者搞混的概念。問題的核心是：
            <strong> 容器預設是暫時的（ephemeral）</strong> — 容器刪掉，裡面的資料就消失。
            Volumes 就是「讓資料在容器生命週期之外存活」的機制。
          </p>

          {/* Bind Mount */}
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            Bind Mount — 開發時的即時同步
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            把本機的目錄「掛進」容器，本機改動的檔案會即時同步到容器裡（反之亦然）。
            開發時最常用，讓你不需要重新 build image 就能看到改動效果。
          </p>
          <CodeBlock language="yaml">
{`   services:
  frontend:
    volumes:
      - ./frontend:/app       # 本機 ./frontend 掛到容器的 /app
      # 格式：本機路徑:容器路徑
      # 本機改動 src/page.tsx → 容器內 /app/src/page.tsx 即時更新
      # Next.js / Vite 的 hot reload 就靠這個   `}
</CodeBlock>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md mt-4 bg-blue-50">
            <div className="p-4">
              <p className="text-blue-700 text-sm">
                <strong>注意：</strong>Bind Mount 的路徑是相對於 <code className="bg-white/70 px-1 rounded">docker-compose.yml</code> 的位置。
                <code className="bg-white/70 px-1 rounded ml-1">./frontend</code> 表示「跟 docker-compose.yml 同層的 frontend 資料夾」。
              </p>
            </div>
          </div>

          {/* Named Volume */}
          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Named Volume — 資料持久化
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            由 Docker 管理的磁碟空間，有自己的名字，不跟特定主機路徑綁定。
            最常用於資料庫資料 — 你刪掉 Container，資料還在；下次 <code className="bg-gray-100 px-1 rounded">docker compose up</code>，
            資料庫的資料自動恢復。
          </p>
          <CodeBlock language="yaml">
{`   services:
  db:
    image: postgres:14-alpine
    volumes:
      # Named Volume：把資料庫的資料目錄掛到 "postgres_data" 這個 Volume
      - postgres_data:/var/lib/postgresql/data

# ── 頂層必須宣告使用的 Named Volume ─────────────────────────────
# 這告訴 Docker：「這個 Volume 由你管理，不是 Bind Mount」
volumes:
  postgres_data:    # 宣告後 Docker 會自動建立這個 Volume
  # 等同於 docker volume create postgres_data

# ── 生命週期 ───────────────────────────────────────────────────
# docker compose down       → Container 刪除，Volume 保留（資料安全）
# docker compose down -v    → Container 和 Volume 都刪除（清空資料庫）
# docker volume ls          → 查看所有 Volume
# docker volume inspect postgres_data → 查看 Volume 詳細資訊   `}
</CodeBlock>

          {/* 匿名 Volume */}
          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            匿名 Volume — 避免主機覆蓋容器
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            這是最容易被忽略但非常重要的技巧。當你用 Bind Mount 把本機目錄掛進容器時，
            本機的<code className="bg-gray-100 px-1 rounded mx-1">node_modules</code>也會被掛進去，
            可能蓋掉容器內正確安裝的<code className="bg-gray-100 px-1 rounded mx-1">node_modules</code>。
          </p>
          <CodeBlock language="yaml">
{`   services:
  frontend:
    volumes:
      - ./frontend:/app          # Bind Mount：把整個 frontend 目錄掛進去
      - /app/node_modules        # 匿名 Volume：「保護」這個路徑，不讓 Bind Mount 覆蓋

# ── 為什麼 node_modules 需要特別保護？ ──────────────────────────
#
# 你的 Mac 上安裝的 node_modules 是 macOS 的 binary
# 容器內是 Linux，需要的是 Linux 的 binary
# 如果讓 Mac 的 node_modules 覆蓋容器的，很多 native module 會無法執行
#
# 加上 - /app/node_modules 之後：
# Docker 會用匿名 Volume 「佔住」這個路徑
# Bind Mount 就無法覆蓋到這個目錄了
# 容器在 RUN npm install 時安裝的 Linux binary 得以保留   `}
</CodeBlock>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md mt-6">
            <div className="p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Layers size={16} className="text-blue-600" />
                三種 Volume 對比
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 text-gray-600 font-semibold">類型</th>
                      <th className="text-left py-2 pr-4 text-gray-600 font-semibold">語法</th>
                      <th className="text-left py-2 pr-4 text-gray-600 font-semibold">用途</th>
                      <th className="text-left py-2 text-gray-600 font-semibold">資料持久</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500">
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-blue-600">Bind Mount</td>
                      <td className="py-2.5 pr-4 font-mono text-xs">./src:/app/src</td>
                      <td className="py-2.5 pr-4">開發時即時同步</td>
                      <td className="py-2.5">是（在主機上）</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-cyan-600">Named Volume</td>
                      <td className="py-2.5 pr-4 font-mono text-xs">pg_data:/var/lib/...</td>
                      <td className="py-2.5 pr-4">資料庫持久化</td>
                      <td className="py-2.5">是（Docker 管理）</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-indigo-600">匿名 Volume</td>
                      <td className="py-2.5 pr-4 font-mono text-xs">/app/node_modules</td>
                      <td className="py-2.5 pr-4">避免主機覆蓋容器</td>
                      <td className="py-2.5">否（容器刪掉消失）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ── Section 5：常用指令 ───────────────────────────────────── */}
        <section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Terminal size={20} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 5：常用指令速查表</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            日常開發中你 90% 的時間只會用到下面這些指令。遇到問題時，先看 logs，再進容器除錯。
          </p>

          <CodeBlock language="bash">
{`   # ── 啟動 & 停止 ─────────────────────────────────────────────────

# 啟動所有服務（背景執行，推薦）
docker compose up -d

# 啟動並強制重新 build image（改了 Dockerfile 或 package.json 後要加 --build）
docker compose up -d --build

# 只啟動特定服務（會自動帶起它的 depends_on）
docker compose up -d db redis

# 停止所有服務（Container 停止，但不刪除，下次 up 很快）
docker compose stop

# 停止並刪除 Container（下次 up 要重新建立）
docker compose down

# 停止、刪除 Container，並刪除所有 Named Volume（資料庫資料清空！）
docker compose down -v

# ── 查看狀態 ────────────────────────────────────────────────────

# 查看所有服務的運行狀態
docker compose ps

# 查看指定服務的 logs（-f 表示持續輸出，像 tail -f）
docker compose logs -f backend

# 查看所有服務的 logs
docker compose logs -f

# 只看最後 50 行
docker compose logs --tail=50 backend

# ── 進容器除錯 ──────────────────────────────────────────────────

# 進入 backend 容器的 bash（常用於除錯）
docker compose exec backend bash

# 進入 db 容器執行 psql
docker compose exec db psql -U postgres -d myapp

# 在容器裡執行一次性指令（不進互動模式）
docker compose exec backend python manage.py migrate

# ── 其他常用 ────────────────────────────────────────────────────

# 查看各服務的 image 和 build 狀態
docker compose images

# 重新啟動特定服務（不 rebuild）
docker compose restart backend

# 查看服務的資源使用量（CPU、Memory）
docker stats   `}
</CodeBlock>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-lg mt-8">
            <div className="p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap size={16} className="text-blue-600" />
                Compose 指令 vs 單獨 Docker 指令
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                在有 docker-compose.yml 之前，你需要用 <code className="bg-gray-100 px-1 rounded">docker run</code> 逐一啟動每個 Container，
                還要手動建立網路讓它們互連。Compose 把這些全部自動化了。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-red-500 mb-2">沒有 Compose（手動啟動 4 個服務）</p>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400 space-y-1">
                    <p>docker network create myapp-net</p>
                    <p>docker run -d --name db \</p>
                    <p className="pl-4">--network myapp-net \</p>
                    <p className="pl-4">-e POSTGRES_PASSWORD=secret \</p>
                    <p className="pl-4">postgres:14</p>
                    <p>docker run -d --name redis \</p>
                    <p className="pl-4">--network myapp-net redis:7</p>
                    <p>docker run -d --name backend \</p>
                    <p className="pl-4">--network myapp-net \</p>
                    <p className="pl-4">-e DATABASE_URL=... \</p>
                    <p className="pl-4">./backend</p>
                    <p className="text-gray-500"># ... 繼續</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-green-500 mb-2">有 Compose（一個指令）</p>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400">
                    <p>docker compose up -d</p>
                    <p className="text-gray-500 mt-2"># 自動建立 network</p>
                    <p className="text-gray-500"># 自動按 depends_on 順序啟動</p>
                    <p className="text-gray-500"># 自動設定服務間 hostname</p>
                    <p className="text-gray-500"># 自動掛 volumes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ── Section 6：最佳實踐 ──────────────────────────────────── */}
        <section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <Settings size={20} className="text-cyan-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 6：開發效率最佳實踐</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            掌握了基礎之後，這三個進階技巧可以讓你的 Docker Compose 工作流程更專業、
            更接近生產環境的實際做法。
          </p>

          {/* Tip 1: Override */}
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            Override 檔案：區分開發與生產環境
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            開發環境需要 Bind Mount（即時同步）、暴露 debug port；生產環境需要 CPU/Memory 限制、
            不暴露不必要的 port。用 Override 機制，讓同一套 Compose 設定適應不同環境，
            不需要維護兩份完全不同的 YAML。
          </p>
          <CodeBlock language="yaml">
{`   # docker-compose.yml（基本設定，開發/生產共用）
version: '3.8'
services:
  backend:
    image: myapp/backend:latest
    environment:
      - DATABASE_URL=\${DATABASE_URL}

  db:
    image: postgres:14-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:   `}
</CodeBlock>

          <CodeBlock language="yaml">
{`   # docker-compose.override.yml（開發覆蓋，執行 "docker compose up" 時自動載入）
version: '3.8'
services:
  backend:
    build: ./backend            # 開發時從原始碼 build
    volumes:
      - ./backend:/app          # Bind Mount 即時同步
    ports:
      - "5678:5678"             # 暴露 debugger port
    environment:
      - DEBUG=true

  db:
    ports:
      - "5432:5432"             # 開發時讓 GUI 工具可以連   `}
</CodeBlock>

          <CodeBlock language="yaml">
{`   # docker-compose.prod.yml（生產設定）
version: '3.8'
services:
  backend:
    image: myapp/backend:\${GIT_SHA}   # 生產用固定版本的 image
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    restart: always              # 容器崩潰自動重啟   `}
</CodeBlock>

          <CodeBlock language="bash">
{`   # 開發：自動合併 docker-compose.yml + docker-compose.override.yml
docker compose up -d

# 生產：手動指定合併哪些檔案
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d   `}
</CodeBlock>

          {/* Tip 2: healthcheck */}
          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            健康檢查 + depends_on：確保啟動順序正確
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            <code className="bg-gray-100 px-1 rounded">depends_on</code> 預設只等 Container「啟動」，不等服務「就緒」。
            PostgreSQL Container 啟動後還需要幾秒初始化資料庫，在這段時間內如果 backend 試圖連線，就會失敗崩潰。
            搭配 healthcheck 可以確保「服務真的 ready 了才啟動下一個」。
          </p>
          <CodeBlock language="yaml">
{`   services:
  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_PASSWORD: secret
    healthcheck:
      # pg_isready 會嘗試連線到 PostgreSQL，連線成功就是 healthy
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s      # 每 5 秒檢查一次
      timeout: 5s       # 單次檢查超過 5 秒算失敗
      retries: 5        # 連續 5 次失敗才標記為 unhealthy
      start_period: 10s # 容器啟動後的寬限期（這段時間失敗不算數）

  backend:
    build: ./backend
    depends_on:
      db:
        condition: service_healthy   # 等 db 的 healthcheck 變成 healthy 才啟動
      redis:
        condition: service_started   # redis 沒設 healthcheck，用 started 就好

# ── 常見服務的 healthcheck 寫法 ────────────────────────────────
# PostgreSQL：pg_isready -U postgres
# MySQL：mysqladmin ping -h localhost
# Redis：redis-cli ping
# HTTP 服務：curl -f http://localhost:8080/health || exit 1   `}
</CodeBlock>

          {/* Tip 3: Multi-stage Dockerfile */}
          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            開發/生產分離的 Dockerfile
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            開發 Dockerfile 著重快速迭代（熱重載、dev dependencies 全裝）；
            生產 Dockerfile 著重體積最小化、安全性（移除 devDependencies、multi-stage build）。
            兩者應該分開維護，不要用同一個 Dockerfile 塞一堆條件判斷。
          </p>
          <CodeBlock language="dockerfile">
{`   # Dockerfile.dev（開發用，含 hot reload，約 400–600 MB）
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 先複製 package.json，讓 npm install 可以被 Docker cache
# （只有 package.json 改變時才重新 install，加速 rebuild）
COPY package*.json ./
RUN npm install   # 安裝包含 devDependencies 的完整套件

# 不需要 COPY . .（因為用 Bind Mount 即時同步）

EXPOSE 3000
CMD ["npm", "run", "dev"]   # 帶 hot reload 的開發指令   `}
</CodeBlock>

          <CodeBlock language="dockerfile">
{`   # Dockerfile（生產用，多階段 build，約 50–150 MB）

# ── 第一階段：建立 ────────────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production   # 只裝 production 依賴，更快更安全
COPY . .
RUN npm run build              # 產生 .next 目錄

# ── 第二階段：執行（只複製必要檔案，image 最小化）────────────
FROM node:18-alpine AS runner
WORKDIR /app

# 建立非 root 用戶（安全性最佳實踐）
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 只複製 build 產出，不包含原始碼和 devDependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

USER nextjs    # 以非 root 用戶執行
EXPOSE 3000
CMD ["node", "server.js"]   `}
</CodeBlock>

          {/* 後續主題 */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-lg mt-10 bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
            <div className="p-6">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-cyan-300" />
                掌握 Compose 之後，下一步可以探索
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h5 className="font-bold text-cyan-300 mb-2">Container Registry</h5>
                  <p className="text-blue-100 text-xs leading-relaxed">
                    把 build 好的 image 推到 Docker Hub 或 AWS ECR，讓 CI/CD pipeline 和生產伺服器可以拉取固定版本的 image。
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h5 className="font-bold text-cyan-300 mb-2">Kubernetes</h5>
                  <p className="text-blue-100 text-xs leading-relaxed">
                    Compose 適合單機開發環境；Kubernetes 是 Compose 的「生產等級進化版」，支援多節點、自動擴縮容、滾動更新。
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h5 className="font-bold text-cyan-300 mb-2">Docker Swarm</h5>
                  <p className="text-blue-100 text-xs leading-relaxed">
                    Docker 官方的叢集管理工具，比 Kubernetes 簡單，適合中小型團隊從 Compose 升級到多機部署的過渡方案。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ── Tags ──────────────────────────────────────────────────── */}
        <section {...fadeInUp}>
          <h3 className="text-lg font-bold text-gray-700 mb-4">本篇涵蓋技術</h3>
          <div className="flex flex-wrap gap-2">
            {['Docker Compose', 'Docker', 'PostgreSQL', 'Redis', 'DevOps', 'Containerization'].map((tag) => (
              <span
                key={tag}
                
                
               className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 my-8"  />

        {/* ── Navigation ───────────────────────────────────────────── */}
        <section {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/devops/ep02-github-actions">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <ArrowLeft size={14} />
                    <span>上一篇</span>
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    EP.02 GitHub Actions CI/CD
                  </p>
                  <p className="text-gray-400 text-xs mt-1">自動化你的測試與部署流程</p>
                </div>
              </div>
            </Link>

            <Link href="/blog/devops/ep01-test-pyramid">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-400 text-xs mb-2">
                    <span>補完系列</span>
                    <ArrowRight size={14} />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    EP.01 測試金字塔
                  </p>
                  <p className="text-gray-400 text-xs mt-1">單元測試 / 整合測試 / E2E 測試</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

      </article>
    </div>
  );
}
