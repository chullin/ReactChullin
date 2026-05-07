'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, Quote, Clock, Eye, Box, Layers, Terminal } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

/* ── Inline CodeBlock ───────────────────────────────────────────── */


/* ── ConceptBadge ───────────────────────────────────────────────── */
const ConceptBadge = ({ label, color = 'slate' }: { label: string; color?: string }) => {
  const colors: Record<string, string> = {
    slate:  'bg-slate-100 text-slate-700 border-slate-200',
    zinc:   'bg-zinc-100 text-zinc-700 border-zinc-200',
    blue:   'bg-blue-100 text-blue-700 border-blue-200',
    green:  'bg-green-100 text-green-700 border-green-200',
    amber:  'bg-amber-100 text-amber-700 border-amber-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${colors[color] ?? colors.slate}`}>
      {label}
    </span>
  );
};

export default function WebDevEP13Page() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-700 via-zinc-700 to-gray-700">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.3) 0, rgba(255,255,255,0.3) 1px, transparent 0, transparent 50%)`, backgroundSize: '24px 24px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-white/15 text-gray-200 border-white/25 font-bold uppercase text-[10px]">網頁開發實戰</Chip>
              <Chip size="sm" variant="flat" className="bg-white/15 text-gray-200 border-white/25 font-bold uppercase text-[10px]">EP.13</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Docker 入門：Image、Container、Compose<br />
              <span className="text-gray-300">容器化技術一次搞懂</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto">
              Image 是食譜，Container 是料理 — 從 Hello World 到 docker-compose 部署，<br />
              附面試必備概念
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* ── Author Row ────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 text-slate-600 p-2.5 rounded-full"><User size={18} /></div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm"><Calendar size={13} /><span>2025</span></div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /><span>14 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /><span>1.8k views</span></div>
          </div>
        </div>

        {/* ── Opening Quote ─────────────────────────────────────── */}
        <Card className="border border-slate-100 bg-gradient-to-br from-slate-50 to-zinc-50 shadow-none">
          <CardBody className="p-6 space-y-3">
            <Quote size={22} className="text-slate-400" />
            <p className="text-gray-700 text-lg font-medium leading-relaxed italic">
              「『在我電腦可以跑』是工程師最讓人頭痛的一句話。Docker 解決的就是這個問題 — 把整個執行環境打包起來一起出貨，讓它在哪裡都能跑。」
            </p>
            <p className="text-slate-600 text-sm font-black">— 容器化技術的核心價值：環境一致性（Environment Parity）。</p>
          </CardBody>
        </Card>

        {/* ── 1. 為什麼需要 Docker ──────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">為什麼需要 Docker？</h2>
          <p className="text-gray-700 leading-relaxed">
            你在本機開發的 Python 3.11 應用程式，部署到伺服器後發現對方是 Python 3.8，某個套件不支援，整個炸掉。這就是「環境不一致」問題。
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '💻', title: '開發環境', desc: 'macOS + Python 3.11 + 套件 A v2.0', color: 'bg-blue-50 border-blue-100' },
              { icon: '🧪', title: '測試環境', desc: 'Ubuntu + Python 3.9 + 套件 A v1.8', color: 'bg-amber-50 border-amber-100' },
              { icon: '🌍', title: '生產環境', desc: 'CentOS + Python 3.8 + 套件 A v1.5', color: 'bg-red-50 border-red-100' },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className={`border rounded-2xl p-5 space-y-2 ${color}`}>
                <span className="text-2xl">{icon}</span>
                <p className="font-black text-gray-800">{title}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-800 text-green-400 font-mono text-sm rounded-2xl px-6 py-4 text-center font-black">
            Docker：把應用程式 + 所有相依套件 + 執行環境打包成一個 Image → 在任何機器上都一模一樣地跑。
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ── 2. VM vs Container ────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">VM vs Container：架構比較</h2>
          <p className="text-gray-700 leading-relaxed">
            Docker Container 和虛擬機（VM）都能提供隔離環境，但底層架構完全不同：
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* VM 架構 */}
            <div className="space-y-3">
              <p className="font-black text-gray-800 flex items-center gap-2"><Layers size={16} className="text-amber-500" />Virtual Machine</p>
              <div className="border-2 border-dashed border-amber-200 rounded-2xl p-4 space-y-1.5 text-center text-xs font-mono">
                <div className="bg-amber-100 text-amber-800 rounded-lg px-3 py-2 font-black">App A</div>
                <div className="bg-amber-100 text-amber-800 rounded-lg px-3 py-2 font-black">App B</div>
                <div className="bg-amber-200 text-amber-900 rounded-lg px-3 py-2 font-black">Guest OS × 2（各自完整）</div>
                <div className="bg-orange-200 text-orange-900 rounded-lg px-3 py-2 font-black">Hypervisor（VMware / VirtualBox）</div>
                <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2 font-black">Host OS + 實體硬體</div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>每個 VM 含完整 OS，體積 GB 級</li>
                <li>啟動需 1–2 分鐘</li>
                <li>隔離性最強（不同 Kernel）</li>
              </ul>
            </div>
            {/* Container 架構 */}
            <div className="space-y-3">
              <p className="font-black text-gray-800 flex items-center gap-2"><Box size={16} className="text-slate-500" />Docker Container</p>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 space-y-1.5 text-center text-xs font-mono">
                <div className="bg-slate-100 text-slate-800 rounded-lg px-3 py-2 font-black">Container A</div>
                <div className="bg-slate-100 text-slate-800 rounded-lg px-3 py-2 font-black">Container B</div>
                <div className="bg-zinc-200 text-zinc-900 rounded-lg px-3 py-2 font-black">Docker Engine（共用 Host Kernel）</div>
                <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2 font-black">Host OS + 實體硬體</div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>共用 Host Kernel，體積 MB 級</li>
                <li>啟動只需秒級（甚至毫秒）</li>
                <li>Process-level 隔離（namespace + cgroup）</li>
              </ul>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">比較項目</th>
                  <th className="text-left p-4 font-black text-amber-700">VM</th>
                  <th className="text-left p-4 font-black text-slate-700">Container</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {[
                  ['體積', 'GB 級（含完整 OS）', 'MB 級（只含應用層）'],
                  ['啟動時間', '1–2 分鐘', '秒級甚至更快'],
                  ['隔離程度', '強（獨立 Kernel）', '中（共用 Kernel）'],
                  ['資源消耗', '高', '低'],
                  ['可攜性', '依賴 Hypervisor', '任何有 Docker 的機器都能跑'],
                  ['使用場景', '需要不同 OS、強隔離', '微服務、CI/CD、快速部署'],
                ].map(([item, vm, container]) => (
                  <tr key={item} className="hover:bg-gray-50">
                    <td className="p-4 font-black text-gray-700">{item}</td>
                    <td className="p-4 text-amber-700">{vm}</td>
                    <td className="p-4 text-slate-700">{container}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ── 3. 三個核心概念 ───────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">三個核心概念：Dockerfile → Image → Container</h2>
          <p className="text-gray-700 leading-relaxed">
            Docker 的世界只有三個主角，搞懂他們的關係就懂了 80%：
          </p>

          {/* Visual Flow */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="font-black text-gray-500 text-xs uppercase tracking-wider">建置與執行流程</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: 'Dockerfile', sub: '食譜（文字檔）', bg: 'bg-slate-100 border-slate-300 text-slate-800' },
                { label: '→\ndocker build', sub: '', bg: '' },
                { label: 'Image', sub: '快照（唯讀）', bg: 'bg-zinc-200 border-zinc-400 text-zinc-900' },
                { label: '→\ndocker run', sub: '', bg: '' },
                { label: 'Container', sub: '執行中的實例', bg: 'bg-green-100 border-green-300 text-green-800' },
              ].map(({ label, sub, bg }, i) =>
                label.startsWith('→')
                  ? (
                    <div key={i} className="text-center">
                      <p className="text-gray-400 font-black text-lg">→</p>
                      <p className="text-[10px] font-mono text-gray-400 whitespace-nowrap">{label.replace('→\n', '')}</p>
                    </div>
                  )
                  : (
                    <div key={i} className={`border-2 rounded-xl px-4 py-3 text-center min-w-[100px] ${bg}`}>
                      <p className="font-black text-sm">{label}</p>
                      <p className="text-[10px] opacity-75 mt-0.5">{sub}</p>
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Dockerfile',
                badge: '食譜',
                color: 'slate',
                desc: '一個純文字的指令檔，告訴 Docker「怎麼建這個 Image」。FROM 哪個 base image、要 RUN 哪些指令安裝套件、要 COPY 哪些檔案進去。',
              },
              {
                title: 'Image',
                badge: '快照（唯讀）',
                color: 'zinc',
                desc: 'docker build 執行 Dockerfile 後產生的唯讀快照，由多個 layer 堆疊而成。可以 push 到 Docker Hub 分享給別人。',
              },
              {
                title: 'Container',
                badge: '執行中的實例',
                color: 'green',
                desc: 'docker run 從 Image 啟動的執行實例，有自己的 process、network、filesystem。同一個 Image 可以同時啟動多個 Container。',
              },
            ].map(({ title, badge, color, desc }) => (
              <div key={title} className={`rounded-xl p-5 bg-${color === 'zinc' ? 'gray' : color}-50 border border-${color === 'zinc' ? 'gray' : color}-100`}>
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-black text-gray-900 text-lg">{title}</p>
                  <ConceptBadge label={badge} color={color === 'zinc' ? 'slate' : color as 'slate' | 'green'} />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ── 4. 常用指令速查表 ─────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-gray-900">常用指令速查表</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-black text-slate-800">指令</th>
                  <th className="text-left p-4 font-black text-slate-800">作用</th>
                  <th className="text-left p-4 font-black text-slate-800">常用參數</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['docker build -t <name> .', '從 Dockerfile 建 Image', '-t 指定名稱:tag，. = 當前目錄'],
                  ['docker run <image>', '從 Image 啟動 Container', '-d 背景執行，-p 8080:80 port 對應，-v 掛載 volume'],
                  ['docker ps', '列出執行中的 Container', '-a 顯示全部（含已停止）'],
                  ['docker stop <id>', '停止 Container', 'docker stop $(docker ps -q) 停全部'],
                  ['docker rm <id>', '刪除 Container', '-f 強制刪除執行中的'],
                  ['docker images', '列出本機所有 Image', ''],
                  ['docker rmi <image>', '刪除 Image', '-f 強制刪除'],
                  ['docker exec -it <id> sh', '進入執行中的 Container', '-it = interactive + tty'],
                  ['docker logs <id>', '查看 Container 輸出日誌', '-f 追蹤即時輸出'],
                  ['docker pull <image>', '從 Registry 下載 Image', 'docker pull node:18-alpine'],
                  ['docker push <image>', '推 Image 到 Registry', '需先 docker login'],
                ].map(([cmd, desc, note]) => (
                  <tr key={cmd} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-xs text-slate-700 font-black whitespace-nowrap">{cmd}</td>
                    <td className="p-4 text-gray-700 text-xs font-medium">{desc}</td>
                    <td className="p-4 text-gray-400 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ── 5. Dockerfile 語法 ────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-gray-900">Dockerfile 基礎語法</h2>
          <p className="text-gray-700 leading-relaxed">
            Dockerfile 的每一行指令都會建立一個 layer。以下是最常用的關鍵字：
          </p>
          <CodeBlock lang="dockerfile" title="Dockerfile — Node.js 應用範例" code={`# FROM：指定 base image（起點）
FROM node:18-alpine

# WORKDIR：設定容器內的工作目錄
WORKDIR /app

# COPY：把本機檔案複製進容器
# 先複製 package.json，利用 layer cache 加速 build
COPY package*.json ./

# RUN：在建置階段執行指令（安裝套件）
RUN npm ci --only=production

# 再複製其他原始碼（改動頻繁的放後面）
COPY . .

# EXPOSE：宣告容器對外的 port（只是文件，不真正開放）
EXPOSE 3000

# CMD：容器啟動時執行的預設指令（只有最後一個 CMD 生效）
CMD ["node", "server.js"]`} />

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-black text-slate-800">指令</th>
                  <th className="text-left p-4 font-black text-slate-800">說明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {[
                  ['FROM', '指定 base image，每個 Dockerfile 都必須有。alpine 版本體積更小。'],
                  ['WORKDIR', '設定後續指令的工作目錄，不存在時自動建立。'],
                  ['COPY', '複製本機檔案/目錄到容器內。'],
                  ['ADD', '和 COPY 類似，但支援 URL 和自動解壓 tar，一般優先用 COPY。'],
                  ['RUN', '建置階段執行的 shell 指令，每個 RUN 建立一個 layer。'],
                  ['ENV', '設定環境變數，Container 執行時也會存在。'],
                  ['EXPOSE', '宣告 port（僅文件用途，需要 -p 才真正對應到主機）。'],
                  ['CMD', '容器啟動的預設指令，可被 docker run 後面的參數覆蓋。'],
                  ['ENTRYPOINT', '容器入口點，不易被覆蓋，常和 CMD 搭配使用。'],
                ].map(([kw, desc]) => (
                  <tr key={kw} className="hover:bg-gray-50">
                    <td className="p-4 font-mono font-black text-slate-700">{kw}</td>
                    <td className="p-4 text-gray-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ── 6. docker-compose.yml ─────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-gray-900">docker-compose：多服務一起管理</h2>
          <p className="text-gray-700 leading-relaxed">
            實際專案往往有前端、後端、資料庫三個服務。docker-compose 讓你用一個 YAML 檔宣告所有服務，一行指令全部啟動。
          </p>
          <CodeBlock lang="dockerfile" title="docker-compose.yml — 前後端 + PostgreSQL" code={`version: '3.8'

services:
  # ── 前端（Next.js）
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend

  # ── 後端（FastAPI / Node.js）
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db

  # ── 資料庫（PostgreSQL）
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`} />
          <CodeBlock lang="dockerfile" title="常用 compose 指令" code={`docker compose up -d        # 背景啟動所有服務
docker compose down          # 停止並移除 Container
docker compose logs -f       # 追蹤所有服務的日誌
docker compose ps            # 查看所有服務狀態
docker compose build         # 重新 build 所有 Image`} />
        </section>

        <Divider className="opacity-30" />

        {/* ── 7. Volume vs Bind Mount ───────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-gray-900">Volume vs Bind Mount：資料持久化</h2>
          <p className="text-gray-700 leading-relaxed">
            Container 本身是無狀態的，刪除後資料就消失。要讓資料持久化，需要掛載外部儲存：
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-3">
              <p className="font-black text-blue-900 flex items-center gap-2"><Terminal size={15} />Named Volume</p>
              <CodeBlock lang="dockerfile" title="" code={`# docker-compose.yml
volumes:
  - mydata:/app/data

# Docker 管理儲存位置
# ✅ 推薦用於：資料庫、持久化資料`} />
              <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li>由 Docker 管理，可跨平台</li>
                <li>性能較佳</li>
                <li>用 docker volume ls 管理</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-3">
              <p className="font-black text-amber-900 flex items-center gap-2"><Terminal size={15} />Bind Mount</p>
              <CodeBlock lang="dockerfile" title="" code={`# docker-compose.yml
volumes:
  - ./src:/app/src

# 把本機目錄直接掛進去
# ✅ 推薦用於：開發時熱更新`} />
              <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                <li>本機路徑直接對應</li>
                <li>開發時即時同步</li>
                <li>跨平台路徑問題需注意</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ── 8. 面試常考題 ─────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Box size={22} className="text-slate-500" />
            <h2 className="text-3xl font-black text-gray-900">面試常考題</h2>
          </div>
          <p className="text-gray-500 text-sm">以下是 Docker / DevOps 相關面試中最常出現的概念題，每題附標準答案要點。</p>

          <div className="space-y-4">
            {[
              {
                q: 'Q1. Image 和 Container 的差異？',
                a: 'Image 是唯讀的靜態快照（食譜），由 Dockerfile build 產生，存在 registry 可以分享。Container 是 Image 的執行實例（料理），有自己的 process、network、可寫 filesystem layer。同一個 Image 可以同時 run 多個 Container，彼此獨立。',
                color: 'slate',
              },
              {
                q: 'Q2. CMD 和 ENTRYPOINT 的差異？',
                a: 'CMD 是容器的預設指令，可以被 docker run 後面傳入的參數完全覆蓋。ENTRYPOINT 是固定的入口點，傳入的參數會附加在後面而不是替換。常見搭配：ENTRYPOINT ["python"] + CMD ["app.py"]，這樣可以 docker run myapp other.py 來執行不同的腳本。',
                color: 'zinc',
              },
              {
                q: 'Q3. Docker layer 是什麼？為何要把 COPY package.json 放在 COPY . . 前？',
                a: 'Dockerfile 每一個指令（FROM/RUN/COPY）都建立一個 layer，Docker 會 cache 每層。如果某層輸入沒變，直接用快取跳過。package.json 改動頻率遠低於原始碼，把它先 COPY 並 RUN npm install，只要 package.json 沒變就直接使用 cache，大幅加速 CI/CD 的 build 時間。',
                color: 'slate',
              },
              {
                q: 'Q4. Container 之間如何通訊？',
                a: '使用 docker-compose 時，同一個 compose file 的 Container 預設在同一個 network，可以直接用 service name 當 hostname（例如後端連 db:5432）。若是手動啟動，需要 docker network create 建立自訂 network，再用 --network 參數指定。',
                color: 'zinc',
              },
              {
                q: 'Q5. docker-compose 和 Kubernetes 的差異？',
                a: 'docker-compose 適合本機開發和小型部署，管理單台機器上的多個 Container，設定簡單。Kubernetes（K8s）是生產級的容器編排系統，管理多台機器（cluster）、自動 scaling、rolling update、自我修復（Pod 掛了自動重啟）、服務發現、負載平衡。學習曲線差距很大。',
                color: 'slate',
              },
              {
                q: 'Q6. 什麼是 multi-stage build？為什麼用它？',
                a: 'Multi-stage build 是在同一個 Dockerfile 裡用多個 FROM 分成不同階段。例如先用 node:18 build React app（含所有 devDependencies），再用 nginx:alpine 只複製 build 產物，最終 Image 不含任何 Node.js 環境。效果：把數百 MB 的 build 環境 Image 縮到幾十 MB 的精簡 Image，減少攻擊面積與部署時間。',
                color: 'zinc',
              },
            ].map(({ q, a, color }, i) => (
              <Card key={i} className={`border border-${color}-200 bg-${color}-50/40 shadow-none`}>
                <CardBody className="p-5 space-y-3">
                  <p className={`font-black text-${color}-900 text-sm`}>{q}</p>
                  <Divider className="opacity-20" />
                  <p className="text-gray-700 text-sm leading-relaxed">{a}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ── Key Takeaway ──────────────────────────────────────── */}
        <section>
          <div className="bg-gradient-to-br from-slate-50 to-zinc-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-slate-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { icon: '🎯', text: 'Docker 解決「在我電腦可以跑」問題，把應用程式 + 執行環境打包成可攜的 Image。' },
                { icon: '🏗️', text: 'Container 比 VM 輕量：共用 Host Kernel，體積 MB 級，秒級啟動。' },
                { icon: '📦', text: 'Dockerfile → docker build → Image（唯讀快照）→ docker run → Container（執行實例）。' },
                { icon: '🔢', text: 'Layer cache 加速 build：把不常改動的 COPY package.json 和 RUN npm install 放前面。' },
                { icon: '🎼', text: 'docker-compose.yml 一個檔管理多服務，docker compose up -d 一行全啟動。' },
                { icon: '🔬', text: 'Multi-stage build：build 環境和執行環境分開，最終 Image 只含必要的產物，體積最小化。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* ── Navigation ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep12-git" className="group block bg-gray-50 hover:bg-slate-100 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-slate-600 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-slate-700 transition-colors">EP.12 — Git</p>
            <p className="text-sm text-gray-500 mt-1">版本控制的底層邏輯</p>
          </Link>
          <div className="block bg-gray-50 rounded-2xl p-6 text-right opacity-50 cursor-not-allowed">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-500">Coming Soon...</p>
            <p className="text-sm text-gray-400 mt-1">敬請期待下一篇</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Docker', 'Container', 'DevOps', 'Image', 'Compose', 'Dockerfile', 'EP.13'].map((tag) => (
            <Chip key={tag} variant="flat" color="default" className="font-bold">{tag}</Chip>
          ))}
        </div>

      </article>
    </div>
  );
}
