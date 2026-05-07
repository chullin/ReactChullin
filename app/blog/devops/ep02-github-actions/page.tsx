'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowRight, ArrowLeft, Quote, Clock, Eye, CheckCircle, AlertTriangle, GitBranch, Zap, Play, Settings, Shield, Rocket } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function DevOpsEP02() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      <div className="bg-gradient-to-br from-orange-800 via-orange-600 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.02</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">工程品質與 DevOps</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              CI/CD 入門：GitHub Actions<br />
              <span className="text-amber-200">自動化你的測試與部署流程</span>
            </h1>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl">
              每次 Push 都要手動跑測試、手動部署？這不是工程師該做的事。
              這篇帶你從零開始設定 GitHub Actions，讓 CI/CD 幫你把守每一道關卡。
            </p>
            <div className="flex items-center gap-6 text-amber-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 13 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> CI/CD · GitHub Actions · DevOps · Automation</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening Quote */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-orange-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「如果你的部署流程需要手冊文件，那它本身就是問題所在。
                    好的 CI/CD 應該讓你合併 PR 就等於部署完成，其他的都是自動的。」
                  </p>
                  <p className="text-gray-500 text-sm">— DevOps 實踐原則</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* CI/CD 概念 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">CI/CD 是什麼？為什麼重要？</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            CI/CD 是兩個概念的組合：<strong>Continuous Integration（持續整合）</strong>與
            <strong> Continuous Delivery/Deployment（持續交付/部署）</strong>。
            兩者加在一起，目標只有一個：<span className="text-orange-600 font-semibold">讓程式碼從寫完到上線的距離盡可能短，且過程盡可能安全。</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-md border-l-4 border-orange-500">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <GitBranch size={20} className="text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Continuous Integration (CI)</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  每次有人 Push 或開 PR，自動執行：
                </p>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-orange-500 mt-0.5 shrink-0" /> Lint 與型別檢查</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-orange-500 mt-0.5 shrink-0" /> 單元測試與整合測試</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-orange-500 mt-0.5 shrink-0" /> Build 確保編譯不爆炸</li>
                </ul>
                <div className="mt-3 bg-orange-50 rounded p-2 text-xs text-orange-700">
                  目標：及早發現問題，防止壞程式碼合併進主幹
                </div>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-md border-l-4 border-amber-500">
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Rocket size={20} className="text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Continuous Deployment (CD)</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  CI 通過後，自動部署到對應環境：
                </p>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-amber-500 mt-0.5 shrink-0" /> PR 合併 → staging 環境</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-amber-500 mt-0.5 shrink-0" /> Tag 發布 → production 環境</li>
                  <li className="flex items-start gap-2"><CheckCircle size={14} className="text-amber-500 mt-0.5 shrink-0" /> 部署失敗自動 rollback</li>
                </ul>
                <div className="mt-3 bg-amber-50 rounded p-2 text-xs text-amber-700">
                  目標：消除手動部署，讓交付速度與信心同步提升
                </div>
              </CardBody>
            </Card>
          </div>

          {/* 傳統 vs CI/CD 流程對比 */}
          <Card className="border-0 shadow-md bg-gray-50">
            <CardBody className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">傳統流程 vs CI/CD 流程</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-red-600 font-semibold text-sm mb-3">❌ 傳統手動流程</p>
                  <div className="space-y-2">
                    {['寫完程式碼', 'SSH 連進伺服器', '手動 git pull', 'npm install && npm run build', '重啟服務（希望沒忘步驟）', '手動驗證頁面是否正常', '如果壞了，手忙腳亂 rollback'].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-sm mb-3">✅ CI/CD 自動化流程</p>
                  <div className="space-y-2">
                    {['寫完程式碼', 'git push（就這樣）', '→ GitHub Actions 自動跑 CI', '→ 測試通過後自動部署', '→ Slack 通知部署完成', '→ 部署失敗自動通知並保留舊版'].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* 為什麼選 GitHub Actions */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-4">為什麼選 GitHub Actions？</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            CI/CD 工具不只 GitHub Actions 一種。在決定導入之前，了解它和主流替代方案的差異，
            幫助你在不同情境做出正確選擇。
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-orange-600 text-white">
                  {['工具', '優勢', '劣勢', '最適合'].map(h => (
                    <th key={h} className="text-left p-3 font-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['GitHub Actions ⭐', '與 GitHub 原生整合，YAML 設定，免費額度充足', '僅限 GitHub 倉庫，複雜邏輯 YAML 難維護', '個人專案、開源、小型團隊'],
                  ['GitLab CI', '自帶 GitLab SCM，self-hosted 彈性大', '學習曲線稍陡，需自建 Runner', '企業私有部署、GitLab 用戶'],
                  ['CircleCI', '速度快，平行化能力強，設定簡潔', '免費額度有限，定價較貴', '需要高度客製化平行測試的團隊'],
                  ['Jenkins', '高度彈性，插件生態成熟', '需自建維運，設定複雜，UI 老舊', '大型企業、複雜 on-premise 流程'],
                ].map(([tool, pro, con, fit], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-orange-50/40'}>
                    <td className="p-3 font-black text-gray-900 border-b border-gray-100">{tool}</td>
                    <td className="p-3 text-gray-600 text-xs border-b border-gray-100">{pro}</td>
                    <td className="p-3 text-gray-500 text-xs border-b border-gray-100">{con}</td>
                    <td className="p-3 text-orange-700 text-xs font-bold border-b border-gray-100">{fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
            <p className="font-black text-orange-800 mb-2 text-sm">GitHub Actions 適合你的三個訊號</p>
            <ul className="text-sm text-orange-700 space-y-1.5">
              <li>• 程式碼已在 GitHub 上：零設定即可使用，PR、Issue、Release 事件直接觸發</li>
              <li>• 需要快速上手：市場上 Action 生態豐富（actions/checkout、setup-node 等），大多數常見任務有現成解法</li>
              <li>• 免費額度夠用：公開 repo 無限制；私有 repo 每月 2,000 分鐘（Linux Runner），個人專案通常足夠</li>
            </ul>
          </div>
        </motion.section>

        <Divider />

        {/* GitHub Actions 核心概念 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">GitHub Actions 核心概念</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            GitHub Actions 是 GitHub 原生提供的 CI/CD 平台，設定全部寫在 YAML 檔案裡，
            放在 <code className="bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded text-sm font-mono">.github/workflows/</code> 目錄下。
            理解四個核心概念就能上手 90% 的使用情境。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              {
                term: 'Workflow',
                icon: Settings,
                color: 'orange',
                desc: '整個自動化流程的定義，對應一個 YAML 檔案。',
                detail: '一個 repo 可以有多個 Workflow，例如 ci.yml、deploy.yml、release.yml。'
              },
              {
                term: 'Event（觸發條件）',
                icon: Zap,
                color: 'amber',
                desc: '什麼動作會觸發 Workflow 執行。',
                detail: '常見：push、pull_request、schedule（定時）、workflow_dispatch（手動觸發）。'
              },
              {
                term: 'Job',
                icon: Play,
                color: 'yellow',
                desc: 'Workflow 中的一個執行單位，預設平行執行。',
                detail: '每個 Job 在獨立的 Runner 虛擬機上執行，可設定 needs 讓 Job 依序進行。'
              },
              {
                term: 'Step',
                icon: CheckCircle,
                color: 'orange',
                desc: 'Job 中的一個步驟，依序執行。',
                detail: 'Step 可以執行 shell 命令（run）或使用既有的 Action（uses），例如 actions/checkout@v4。'
              }
            ].map(({ term, icon: Icon, color, desc, detail }) => (
              <Card key={term} className="border-0 shadow-md">
                <CardBody className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon size={18} className={`text-${color}-600`} />
                    </div>
                    <h3 className="font-bold text-gray-800">{term}</h3>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{desc}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{detail}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* 層級關係圖 */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-amber-50">
            <CardBody className="p-6">
              <h3 className="text-base font-bold text-gray-800 mb-4">層級結構</h3>
              <div className="font-mono text-sm space-y-1 text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold">Workflow</span>
                  <span className="text-gray-400">(ci.yml)</span>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <span className="text-gray-400">├─</span>
                  <span className="text-amber-600 font-bold">on:</span>
                  <span className="text-gray-500">push, pull_request ← Event</span>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className="text-amber-600 font-bold">jobs:</span>
                </div>
                <div className="ml-8 flex items-center gap-2">
                  <span className="text-gray-400">├─</span>
                  <span className="text-yellow-700 font-bold">test:</span>
                  <span className="text-gray-500">← Job</span>
                </div>
                <div className="ml-12 flex items-center gap-2">
                  <span className="text-gray-400">│  └─</span>
                  <span className="text-orange-700 font-bold">steps:</span>
                  <span className="text-gray-500">← Step list</span>
                </div>
                <div className="ml-8 flex items-center gap-2">
                  <span className="text-gray-400">└─</span>
                  <span className="text-yellow-700 font-bold">deploy:</span>
                  <span className="text-gray-500">needs: test ← 等 test 完才跑</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* 第一個 Workflow：CI 基本設定 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">實戰 ①：基本 CI Workflow</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            這是一個 Next.js 專案的標準 CI 設定，每次 PR 開啟或更新時，自動執行 Lint、型別檢查和測試。
          </p>

          <CodeBlock
            language="yaml"
            filename=".github/workflows/ci.yml"
            code={`# 這個 Workflow 負責 Continuous Integration
name: CI

# 觸發條件：push 到 main/develop，或任何 PR
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    name: Lint, Type-check & Test
    runs-on: ubuntu-latest   # GitHub 提供的免費 Linux Runner

    strategy:
      matrix:
        node-version: [20.x]  # 可設多個版本同時測試

    steps:
      # 1. 把程式碼 checkout 出來
      - name: Checkout code
        uses: actions/checkout@v4

      # 2. 設定 Node.js 版本
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'  # 快取 node_modules，加速後續執行

      # 3. 安裝依賴
      - name: Install dependencies
        run: npm ci  # 比 npm install 更嚴格，使用 package-lock.json

      # 4. 執行 ESLint
      - name: Run ESLint
        run: npm run lint

      # 5. TypeScript 型別檢查
      - name: Type check
        run: npx tsc --noEmit

      # 6. 跑單元測試，並輸出 coverage 報告
      - name: Run tests
        run: npm test -- --coverage --watchAll=false

      # 7. 上傳 coverage 報告（可選）
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        if: always()  # 就算測試失敗也上傳
        with:
          token: \${{ secrets.CODECOV_TOKEN }}`}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'npm ci vs npm install', content: 'npm ci 嚴格按照 package-lock.json 安裝，不會升級版本，確保 CI 環境與本機完全一致。', color: 'orange' },
              { title: 'matrix strategy', content: '可同時在 Node 18、20、22 上測試。每個版本組合是獨立的 Job，平行執行。', color: 'amber' },
              { title: 'actions/cache', content: 'cache: npm 會快取 ~/.npm，下次執行直接用快取，從 2 分鐘縮到 30 秒。', color: 'yellow' }
            ].map(({ title, content, color }) => (
              <div key={title} className={`bg-${color}-50 rounded-xl p-4 border border-${color}-200`}>
                <h4 className={`text-${color}-800 font-bold text-sm mb-2`}>{title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* CD：部署到 Vercel */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">實戰 ②：自動部署到 Vercel</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            CI 通過後，自動部署到 Vercel。這裡用 Vercel CLI 做部署，
            比 Vercel 官方 GitHub App 更靈活（可自訂部署邏輯）。
          </p>

          {/* Secrets 設定說明 */}
          <Card className="border-0 shadow-md bg-slate-900 mb-6">
            <CardBody className="p-5">
              <p className="text-amber-400 text-sm font-bold mb-3">⚙️ 先在 GitHub 設定 Secrets（Settings → Secrets and variables → Actions）</p>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">VERCEL_TOKEN</span>
                  <span className="text-gray-600">←</span>
                  <span className="text-green-400">Vercel 帳號設定 → Tokens → Create</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">VERCEL_ORG_ID</span>
                  <span className="text-gray-600">←</span>
                  <span className="text-green-400">vercel link 後查看 .vercel/project.json</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">VERCEL_PROJECT_ID</span>
                  <span className="text-gray-600">←</span>
                  <span className="text-green-400">同上，project.json 裡的 projectId</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <CodeBlock
            language="yaml"
            filename=".github/workflows/deploy.yml"
            code={`name: Deploy to Vercel

on:
  push:
    branches: [main]  # 只有 main 合併才部署 production

jobs:
  # 先跑 CI（重用前面的概念）
  ci:
    name: Run CI checks
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test -- --watchAll=false

  # CI 通過才執行 deploy
  deploy:
    name: Deploy to Production
    needs: ci          # 等 ci job 成功才執行
    runs-on: ubuntu-latest
    environment: production  # GitHub Environment，可設 reviewers 審核

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      # 安裝 Vercel CLI
      - name: Install Vercel CLI
        run: npm install -g vercel@latest

      # Pull Vercel 專案設定
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=\${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

      # Build
      - name: Build
        run: vercel build --prod --token=\${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

      # Deploy 預建好的產物
      - name: Deploy to Production
        run: vercel deploy --prebuilt --prod --token=\${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}`}
          />

          <Card className="border-0 shadow-md bg-amber-50 border-l-4 border-amber-500 mt-6">
            <CardBody className="p-5">
              <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                <Shield size={16} /> environment: production 的意義
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                GitHub Environments 讓你可以設定「部署保護規則」：例如要求至少一位 reviewer 核准才能部署，
                或是只允許特定分支觸發。設定路徑：Repository → Settings → Environments。
                對個人專案這步可省略，但團隊協作強烈建議加上。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* Preview Deploy on PR */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">實戰 ③：PR Preview 環境</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            更進階的做法：每個 PR 自動部署一個獨立的 Preview URL，讓 reviewer 可以在真實環境驗證功能，
            而不是只看程式碼。
          </p>

          <CodeBlock
            language="yaml"
            filename=".github/workflows/preview.yml"
            code={`name: Preview Deploy

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  preview:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write  # 需要權限才能留 PR 留言

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci

      - name: Install Vercel CLI
        run: npm install -g vercel@latest

      - name: Deploy Preview
        id: deploy
        run: |
          vercel pull --yes --environment=preview --token=\${{ secrets.VERCEL_TOKEN }}
          vercel build --token=\${{ secrets.VERCEL_TOKEN }}
          PREVIEW_URL=\$(vercel deploy --prebuilt --token=\${{ secrets.VERCEL_TOKEN }})
          echo "url=\$PREVIEW_URL" >> \$GITHUB_OUTPUT
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

      # 把 Preview URL 自動留言在 PR 上
      - name: Comment Preview URL on PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: \`## 🚀 Preview 環境已部署\\n\\n**URL**: \${{ steps.deploy.outputs.url }}\\n\\n> 此 Preview 會在 PR 關閉後自動刪除\`
            })`}
          />

          <div className="mt-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
            <h4 className="font-bold text-gray-800 mb-3">Preview 環境的工作流程</h4>
            <div className="flex flex-wrap gap-3 items-center">
              {['開 PR', '→ 自動跑 CI', '→ 部署 Preview URL', '→ Bot 留言附上連結', '→ Reviewer 在真實環境驗證', '→ 核准 → 合併 → 自動部署 Production'].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="bg-white px-3 py-1.5 rounded-full text-sm text-gray-700 shadow-sm border border-orange-100">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* 進階技巧 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">進階技巧</h2>

          <div className="space-y-6">
            {/* Concurrency */}
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Zap size={18} className="text-orange-500" />
                  避免並發衝突：concurrency 設定
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  同一個 PR 快速連推多次，會同時觸發多個 Workflow。用 <code className="bg-gray-100 px-1 rounded font-mono text-xs">concurrency</code> 確保同一個 PR 只有最新的 run 在跑，舊的自動取消。
                </p>
                <CodeBlock
                  language="yaml"
                  filename=""
                  code={`# 加在 jobs: 同層
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true  # 取消同 group 的舊 run`}
                />
              </CardBody>
            </Card>

            {/* Reusable Workflows */}
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Settings size={18} className="text-amber-500" />
                  可重用 Workflow：避免重複 YAML
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  多個 Workflow 共用相同的 CI 步驟？把它抽成 Reusable Workflow，其他地方 <code className="bg-gray-100 px-1 rounded font-mono text-xs">uses</code> 引用即可。
                </p>
                <CodeBlock
                  language="yaml"
                  filename=".github/workflows/reusable-ci.yml"
                  code={`# 可被呼叫的 Workflow
name: Reusable CI
on:
  workflow_call:  # 關鍵：這個 Workflow 可被其他 Workflow 呼叫
    inputs:
      node-version:
        required: false
        type: string
        default: '20'

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
          cache: 'npm'
      - run: npm ci && npm run lint && npm test -- --watchAll=false`}
                />
                <CodeBlock
                  language="yaml"
                  filename=".github/workflows/deploy.yml（呼叫端）"
                  code={`jobs:
  ci:
    uses: ./.github/workflows/reusable-ci.yml  # 重用
    with:
      node-version: '20'

  deploy:
    needs: ci
    # ... 部署步驟`}
                />
              </CardBody>
            </Card>

            {/* 環境變數與 Secrets */}
            <Card className="border-0 shadow-md">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Shield size={18} className="text-orange-500" />
                  環境變數與 Secrets 的層級
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-orange-50">
                        <th className="text-left p-3 text-orange-900 font-semibold">層級</th>
                        <th className="text-left p-3 text-orange-900 font-semibold">設定位置</th>
                        <th className="text-left p-3 text-orange-900 font-semibold">適用場景</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="p-3 font-mono text-orange-700 text-xs">Organization Secret</td>
                        <td className="p-3 text-gray-600 text-xs">Organization → Settings → Secrets</td>
                        <td className="p-3 text-gray-600 text-xs">多個 repo 共用（例如 NPM_TOKEN）</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-amber-700 text-xs">Repository Secret</td>
                        <td className="p-3 text-gray-600 text-xs">Repo → Settings → Secrets</td>
                        <td className="p-3 text-gray-600 text-xs">該 repo 專屬（最常用）</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-yellow-700 text-xs">Environment Secret</td>
                        <td className="p-3 text-gray-600 text-xs">Repo → Settings → Environments</td>
                        <td className="p-3 text-gray-600 text-xs">Staging / Production 使用不同的值</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-gray-600 text-xs">Workflow env:</td>
                        <td className="p-3 text-gray-600 text-xs">YAML 檔案直接寫</td>
                        <td className="p-3 text-gray-600 text-xs">非敏感設定值（NODE_ENV 等）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 bg-orange-50 rounded-lg p-3 text-xs text-orange-800">
                  <strong>原則：</strong>所有 API Key、Token、密碼一律用 Secrets，永遠不要直接寫在 YAML 或程式碼裡。
                  Secrets 在 log 中會被自動遮蔽顯示為 ***。
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider />

        {/* 常見問題 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">常見錯誤與除錯方式</h2>

          <div className="space-y-4">
            {[
              {
                problem: 'Permission denied / EACCES 錯誤',
                cause: 'Runner 沒有執行特定指令的權限',
                fix: '在 job 層加上 permissions: contents: read（或需要的權限）。GitHub 有預設權限，某些操作需要明確宣告。',
                icon: Shield
              },
              {
                problem: 'Workflow 不觸發',
                cause: 'YAML 縮排錯誤，或 on: 條件設錯',
                fix: '用 yamllint 驗證 YAML 格式。注意 branches 是 list，要用陣列格式：branches: [main]，不是 branches: main。',
                icon: AlertTriangle
              },
              {
                problem: 'Secrets 讀取到空值',
                cause: 'Fork 的 PR 預設無法讀取 parent repo 的 Secrets',
                fix: '這是 GitHub 安全設計。解決方案：用 pull_request_target（注意安全風險），或只針對自己 repo 的 branch 部署。',
                icon: AlertTriangle
              },
              {
                problem: 'Job 執行時間太長',
                cause: '每次都重新安裝 node_modules',
                fix: '確認 cache: npm 有設定，且 cache-dependency-path 指向正確的 package-lock.json 路徑。',
                icon: Zap
              }
            ].map(({ problem, cause, fix, icon: Icon }) => (
              <Card key={problem} className="border-0 shadow-md">
                <CardBody className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">{problem}</h4>
                      <p className="text-gray-500 text-sm mb-2"><strong>原因：</strong>{cause}</p>
                      <p className="text-gray-700 text-sm"><strong className="text-green-600">解法：</strong>{fix}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* 整合全景 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">一張圖理解完整 CI/CD 流程</h2>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <CardBody className="p-8">
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 font-bold w-24 shrink-0">Developer</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-slate-700 px-3 py-1 rounded text-gray-200">git push / open PR</span>
                </div>
                <div className="ml-8 flex items-center gap-2 text-gray-500">↓ triggers</div>
                <div className="flex items-center gap-3">
                  <span className="text-orange-400 font-bold w-24 shrink-0">CI Workflow</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-slate-700 px-3 py-1 rounded text-gray-200">Lint → Type-check → Test → Build</span>
                </div>
                <div className="ml-8 flex items-center gap-2">
                  <span className="text-green-400">✓ Pass</span>
                  <span className="text-gray-500 mx-2">|</span>
                  <span className="text-red-400">✗ Fail → PR 被標記，無法合併</span>
                </div>
                <div className="ml-8 flex items-center gap-2 text-gray-500">↓ on pass</div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 font-bold w-24 shrink-0">CD Workflow</span>
                  <span className="text-gray-400">→</span>
                  <div className="space-y-1">
                    <div className="bg-slate-700 px-3 py-1 rounded text-gray-200">PR → Preview URL（Vercel Preview）</div>
                    <div className="bg-slate-700 px-3 py-1 rounded text-gray-200">main merge → Production Deploy（Vercel Prod）</div>
                  </div>
                </div>
                <div className="ml-8 flex items-center gap-2 text-gray-500">↓</div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 font-bold w-24 shrink-0">Result</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-green-900/50 border border-green-700 px-3 py-1 rounded text-green-300">
                    用戶看到新版本，工程師收到 Slack 通知
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider />

        {/* 重點整理 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <h2 className="text-3xl font-black text-gray-900 mb-6">重點整理</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'CI 的核心價值', content: '讓「壞程式碼」在進入 main 分支前就被攔截，保護主幹的穩定性。', color: 'orange' },
              { title: 'needs: 控制依賴', content: 'CI Job 與 Deploy Job 分離，Deploy 等 CI 完成才執行，失敗就不部署。', color: 'amber' },
              { title: 'Secrets 安全存放', content: '所有敏感資訊放 GitHub Secrets，永不寫在 YAML 或程式碼裡。', color: 'yellow' },
              { title: 'concurrency 防衝突', content: '同一 PR 多次 push 只跑最新一次，節省 Runner 資源。', color: 'orange' },
              { title: 'Preview 環境', content: '每個 PR 部署獨立預覽 URL，讓 code review 從看程式碼升級為驗證功能。', color: 'amber' },
              { title: '從小處開始', content: '先設一個簡單的 npm test CI，上線後再逐步加入 CD、Preview、Slack 通知。', color: 'yellow' }
            ].map(({ title, content, color }) => (
              <div key={title} className={`bg-${color}-50 rounded-xl p-4 border border-${color}-200`}>
                <h4 className={`text-${color}-800 font-bold text-sm mb-2 flex items-center gap-2`}>
                  <CheckCircle size={14} className={`text-${color}-600`} />
                  {title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
          <Divider className="mb-8" />
          <div className="flex justify-between items-center">
            <Link href="/blog/devops/ep01-test-pyramid">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer w-64">
                <CardBody className="p-4">
                  <div className="flex items-center gap-3">
                    <ArrowLeft size={20} className="text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                      <p className="text-sm font-semibold text-gray-700">EP.01 測試金字塔</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
            <div className="flex gap-2">
              <Chip size="sm" color="warning" variant="flat">CI/CD</Chip>
              <Chip size="sm" color="warning" variant="flat">DevOps</Chip>
            </div>
            <div className="w-64" />
          </div>
        </motion.section>

      </article>
    </div>
  );
}
