'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Terminal, CheckCircle, AlertCircle, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-violet-500 text-white flex items-center justify-center font-black text-base shrink-0">{n}</div>
      <h3 className="text-xl font-black text-gray-900">{title}</h3>
    </div>
    <div className="ml-12 space-y-4">{children}</div>
  </div>
);

const Callout = ({ type, children }: { type: 'info' | 'warn' | 'tip'; children: React.ReactNode }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-100 text-blue-800',
    warn: 'bg-amber-50 border-amber-100 text-amber-800',
    tip:  'bg-green-50 border-green-100 text-green-800',
  };
  const icons = { info: '💡', warn: '⚠️', tip: '✅' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl">{icons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export default function WebDevEP02Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Terminal size={400} strokeWidth={0.5} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">個人網頁開發</Chip>
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">EP.02</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              開發環境建置<br />
              <span className="text-violet-300">從零到跑起第一個畫面</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto">
              安裝 Node.js、設定 VS Code、建立 Next.js 專案，<br />
              讓你的電腦能跑和我的個人網頁一樣的技術棧
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-violet-100 text-violet-600 p-2.5 rounded-full"><User size={18} /></div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2024</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Clock size={16} /> <span>5 min read</span></div>
              <div className="flex items-center gap-1.5"><Eye size={16} /> <span>1.2k views</span></div>
            </div>
        </div>

        {/* Prereq */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-gray-900">開始之前</h2>
          <p className="text-gray-700 leading-relaxed">
            這篇假設你有一台電腦（Mac 或 Windows 都可以），沒有任何開發環境。完成這篇之後，你會擁有：
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: '📦', title: 'Node.js', desc: '執行 JavaScript 的環境，Next.js 需要它' },
              { icon: '🖊️', title: 'VS Code', desc: '最流行的程式碼編輯器，功能強大且免費' },
              { icon: '🚀', title: 'Next.js 專案', desc: '一個可以在本機跑的個人網頁骨架' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-5 text-center space-y-2">
                <span className="text-3xl">{icon}</span>
                <p className="font-black text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Steps */}
        <section className="space-y-12">
          <h2 className="text-3xl font-black text-gray-900">一步一步安裝</h2>

          {/* STEP 1: Node.js */}
          <Step n={1} title="安裝 Node.js">
            <p className="text-gray-700 leading-relaxed">
              Node.js 讓你的電腦可以在「瀏覽器之外」執行 JavaScript。Next.js 的開發伺服器和打包工具都需要它。
            </p>
            <Callout type="info">
              <strong>要裝哪個版本？</strong> 建議安裝 LTS（Long-Term Support）版本，目前是 Node.js 22.x。LTS 版本最穩定，不用追最新。
            </Callout>
            <div className="space-y-3">
              <p className="font-bold text-gray-900">下載方式：</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-violet-600 shrink-0">Mac：</span>
                  <span>前往 <code className="bg-gray-100 px-1 rounded font-mono">nodejs.org</code>，點「LTS」版本下載 .pkg 安裝檔，雙擊安裝即可。</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-violet-600 shrink-0">Windows：</span>
                  <span>同樣前往 <code className="bg-gray-100 px-1 rounded font-mono">nodejs.org</code>，下載 .msi 安裝檔，一路「下一步」。</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm">安裝完成後，打開終端機（Mac 的 Terminal 或 Windows 的 PowerShell），輸入以下指令確認安裝成功：</p>
            <CodeBlock title="terminal" code={`node --version
# 應該輸出類似 v22.0.0

npm --version
# 應該輸出類似 10.x.x`} />
            <Callout type="tip">
              Node.js 安裝完會自動附帶 <strong>npm</strong>（Node Package Manager），也就是 JavaScript 的套件管理工具。以後安裝 React、HeroUI 等套件都靠它。
            </Callout>
          </Step>

          {/* STEP 2: VS Code */}
          <Step n={2} title="安裝 VS Code + 推薦擴充套件">
            <p className="text-gray-700 leading-relaxed">
              VS Code 是目前最主流的程式碼編輯器，免費、跨平台、有幾千個擴充套件。
              前往 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">code.visualstudio.com</code> 下載安裝即可。
            </p>
            <p className="font-bold text-gray-900">安裝後，搜尋並安裝這幾個擴充套件（在左側 Extensions 面板搜尋）：</p>
            <div className="space-y-3">
              {[
                { name: 'ES7+ React/Redux/React-Native snippets', desc: '輸入 rafce 自動展開成 React 元件骨架，省去重複打字', must: true },
                { name: 'Tailwind CSS IntelliSense', desc: '寫 Tailwind class 時自動補全，顯示對應的 CSS 值', must: true },
                { name: 'Prettier - Code formatter', desc: '自動排版程式碼，讓每個人的程式碼格式一致', must: true },
                { name: 'GitLens', desc: '讓 Git 的功能直接顯示在程式碼旁邊，看誰寫了哪行', must: false },
              ].map(({ name, desc, must }) => (
                <div key={name} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <CheckCircle size={18} className={must ? 'text-green-500 mt-0.5 shrink-0' : 'text-gray-300 mt-0.5 shrink-0'} />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{name} {must && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-black ml-1">推薦必裝</span>}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Step>

          {/* STEP 3: Create Next.js project */}
          <Step n={3} title="建立 Next.js 專案">
            <p className="text-gray-700 leading-relaxed">
              打開終端機，切換到你想放專案的資料夾（例如桌面），執行以下指令：
            </p>
            <CodeBlock title="terminal — 建立新專案" code={`# 切換到桌面（Mac）
cd ~/Desktop

# 建立 Next.js 專案，把 my-portfolio 換成你想要的專案名稱
npx create-next-app@latest my-portfolio`} />
            <p className="text-gray-700 text-sm">執行後會問你幾個設定選項，照以下方式選：</p>
            <CodeBlock title="互動設定選項" code={`Would you like to use TypeScript? › Yes      # 強烈建議
Would you like to use ESLint? › Yes           # 程式碼品質檢查
Would you like to use Tailwind CSS? › Yes     # 我們要用
Would you like to use the src/ directory? › No # 不需要
Would you like to use App Router? › Yes       # 現代路由系統，選是
Would you like to customize the import alias? › No`} />
            <Callout type="info">
              <strong>npx 是什麼？</strong> npx 是 npm 內建的執行工具，<code>npx create-next-app</code> 意思是「下載並執行 create-next-app 這個建立專案的工具」。你不需要先安裝它，npx 會自動處理。
            </Callout>
          </Step>

          {/* STEP 4: Run */}
          <Step n={4} title="啟動開發伺服器，看到第一個畫面">
            <p className="text-gray-700 leading-relaxed">
              專案建立好之後，進入資料夾並啟動開發伺服器：
            </p>
            <CodeBlock title="terminal" code={`# 進入剛建立的專案資料夾
cd my-portfolio

# 安裝依賴套件（第一次必做，之後不需要）
npm install

# 啟動開發伺服器
npm run dev`} />
            <p className="text-gray-700 text-sm">你應該會看到：</p>
            <CodeBlock title="terminal 輸出" code={`▲ Next.js 16.x.x
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Starting...
✓ Ready in 1234ms`} />
            <p className="text-gray-700 text-sm">
              打開瀏覽器，前往 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">http://localhost:3000</code>，你會看到 Next.js 的預設歡迎頁面。
              <strong>這代表一切正常運作了！</strong>
            </p>
            <Callout type="tip">
              開發伺服器是「Hot Reload」的：你修改程式碼存檔後，瀏覽器會<strong>自動更新</strong>，不需要手動重整。這讓開發效率大幅提升。
            </Callout>
          </Step>

          {/* STEP 5: Open in VS Code */}
          <Step n={5} title="用 VS Code 打開專案">
            <p className="text-gray-700 leading-relaxed">
              在終端機中，執行：
            </p>
            <CodeBlock title="terminal" code={`# 在 VS Code 中打開當前資料夾
code .`} />
            <p className="text-gray-700 text-sm">
              VS Code 會開啟，左側可以看到整個專案的資料夾結構。下一篇我們會詳細說明每個資料夾和檔案的功能。
            </p>
            <Callout type="warn">
              <strong>Mac 用戶注意：</strong>如果 <code>code .</code> 指令找不到，需要在 VS Code 中按 <code>Cmd+Shift+P</code>，搜尋「Shell Command: Install 'code' command in PATH」並執行一次。
            </Callout>
          </Step>
        </section>

        <Divider className="opacity-30" />

        {/* 安裝額外套件 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">安裝我個人網頁用到的套件</h2>
          <p className="text-gray-700 leading-relaxed">
            Create Next App 只給你最基本的 Next.js + Tailwind。要達到和我的網頁一樣的效果，還需要安裝 HeroUI 和 Framer Motion：
          </p>
          <CodeBlock title="terminal — 安裝額外套件" code={`# HeroUI 元件庫（Card、Button、Chip 等 UI 元件）
npm install @heroui/react framer-motion

# Lucide React（icon 圖示庫）
npm install lucide-react`} />
          <p className="text-gray-700 text-sm leading-relaxed">
            安裝完後，還需要在 <code className="bg-gray-100 px-1 rounded font-mono">tailwind.config.ts</code> 加入 HeroUI 的設定。這部分我們在 EP.06 講 HeroUI 時會詳細說明。
          </p>
          <Callout type="info">
            <strong>npm install 在做什麼？</strong> 它會把套件下載到 <code>node_modules/</code> 資料夾，並在 <code>package.json</code> 記錄這個依賴。其他人拿到你的專案後，執行 <code>npm install</code> 就能還原一樣的環境。
          </Callout>
        </section>

        <Divider className="opacity-30" />

        {/* 常見問題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">常見問題</h2>
          <div className="space-y-4">
            {[
              {
                q: '終端機在哪裡？',
                a: 'Mac：Spotlight 搜尋「Terminal」或「iTerm」。Windows：搜尋「PowerShell」或「Windows Terminal」。VS Code 也有內建終端機（Ctrl+` 打開）。',
              },
              {
                q: 'npx create-next-app 很慢，一直在下載？',
                a: '正常的，第一次會下載幾十 MB 的套件。有時候國內連 npm 較慢，可以嘗試換到較好的網路環境，或稍等幾分鐘。',
              },
              {
                q: 'npm run dev 啟動後，改了程式碼但畫面沒更新？',
                a: '確認存檔了（Ctrl+S / Cmd+S）。如果還是沒更新，試試手動刷新瀏覽器（F5 / Cmd+R），或重新啟動 dev server。',
              },
              {
                q: 'port 3000 already in use？',
                a: '代表 port 3000 被其他程式佔用。Next.js 會自動換到 3001，或你可以用 npm run dev -- -p 4000 指定其他 port。',
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 space-y-2">
                <p className="font-black text-gray-900 flex items-start gap-2">
                  <AlertCircle size={18} className="text-amber-500 mt-0.5 shrink-0" />
                  {q}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-violet-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '📦', text: 'Node.js 是跑 Next.js 的底層環境，npm 是它附帶的套件管理工具' },
                { emoji: '🖊️', text: 'VS Code + 4 個擴充套件（snippets、Tailwind IntelliSense、Prettier、GitLens）是標準配備' },
                { emoji: '🏗️', text: 'npx create-next-app 建立專案，npm run dev 啟動開發伺服器，localhost:3000 預覽' },
                { emoji: '🔄', text: 'Hot Reload 讓你存檔就能立即看到變化，開發效率的關鍵' },
                { emoji: '📦', text: 'npm install <package-name> 安裝套件，node_modules 存放下載的依賴' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep01-modern-web" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.01 — 認識現代網頁開發</p>
            <p className="text-sm text-gray-500 mt-1">HTML、CSS、JS 到 React 的演進</p>
          </Link>
          <Link href="/blog/web-dev/ep03-project-structure" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.03 — 認識專案結構</p>
            <p className="text-sm text-gray-500 mt-1">每個資料夾和檔案在做什麼</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Web Dev', 'Node.js', 'VS Code', 'Next.js', '環境建置', 'EP.02'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
