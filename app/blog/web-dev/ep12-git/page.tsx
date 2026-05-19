import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  GitBranch,
  GitMerge,
  GitCommit
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Git 入門到實戰 版本控制的底層邏輯 | Joseph Chen',
  description: 'commit / branch / merge / rebase — 工程師每天都在用， 面試最常考的 10 個問題',
  alternates: {
    canonical: 'https://chullin.tw/blog/web-dev/ep12-git',
  },
};



/* ── Inline CodeBlock ───────────────────────────────────────────── */

/* ── ConceptBadge ───────────────────────────────────────────────── */
const ConceptBadge = ({ label, color = 'blue' }: { label: string; color?: string }) => {
  const colors: Record<string, string> = {
    blue:   'bg-blue-100 text-blue-700 border-blue-200',
    sky:    'bg-sky-100 text-sky-700 border-sky-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    green:  'bg-green-100 text-green-700 border-green-200',
    amber:  'bg-amber-100 text-amber-700 border-amber-200',
    red:    'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${colors[color] ?? colors.blue}`}>
      {label}
    </span>
  );
};

export default function WebDevEP12Page() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-600">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 1px, transparent 0, transparent 50%)`, backgroundSize: '28px 28px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <FadeIn>
            <div className="flex justify-center gap-2 mb-5">
              <span   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-white/15 text-sky-100 border-white/25 font-bold uppercase text-[10px]">網頁開發實戰</span>
              <span   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-white/15 text-sky-100 border-white/25 font-bold uppercase text-[10px]">EP.12</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Git 入門到實戰<br />
              <span className="text-sky-200">版本控制的底層邏輯</span>
            </h1>
            <p className="text-sky-100 text-lg font-medium max-w-2xl mx-auto">
              commit / branch / merge / rebase — 工程師每天都在用，<br />
              面試最常考的 10 個問題
            </p>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* ── Author Row ────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-sky-100 text-sky-600 p-2.5 rounded-full"><User size={18} /></div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm"><Calendar size={13} /><span>2025</span></div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /><span>12 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /><span>2.4k views</span></div>
          </div>
        </div>

        {/* ── Opening Quote ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50 shadow-none">
          <div className="p-6 space-y-3">
            <Quote size={22} className="text-sky-400" />
            <p className="text-gray-700 text-lg font-medium leading-relaxed italic">
              「Git 不是追蹤你改了什麼文字，而是替你的整個專案拍快照（snapshot）。每次 commit 都是一張快照，branch 是一條時間線，merge 是把兩條時間線合而為一。」
            </p>
            <p className="text-sky-600 text-sm font-black">— 一旦理解這個心智模型，Git 所有指令都會變得直覺。</p>
          </div>
        </div>

        {/* ── 1. Git 是什麼 ─────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Git 是什麼？Snapshot vs Diff</h2>
          <p className="text-gray-700 leading-relaxed">
            很多人以為 Git 是「記錄每次改動了哪幾行」（diff-based），但這是錯的。Git 的底層是
            <strong> snapshot-based</strong>：每一個 commit 是對整個專案當下狀態的一張完整快照（只有沒改動的檔案才共享指標節省空間）。
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-red-800">❌ 錯誤心智模型（Diff-based）</p>
              <p className="text-red-700 text-sm leading-relaxed">「記錄第 12 行從 A 改成 B」— 還原時需要逐一重播所有 diff，越久越慢。</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-green-800">✅ 正確心智模型（Snapshot-based）</p>
              <p className="text-green-700 text-sm leading-relaxed">「在時間點 T 整個專案長這樣」— 切換到任何 commit 都是 O(1)，速度極快。</p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* ── 2. 四個核心區域 ───────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">四個核心區域</h2>
          <p className="text-gray-700 leading-relaxed">
            理解 Git 的關鍵是知道「檔案現在在哪裡」。Git 把你的工作分成四個區域：
          </p>

          {/* Visual Flow */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="font-black text-gray-600 text-xs uppercase tracking-wider mb-2">檔案流動路徑</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: 'Working Directory', sub: '你正在編輯的檔案', bg: 'bg-sky-100 border-sky-300 text-sky-800' },
                { label: '→', sub: '', bg: '' },
                { label: 'Staging Area', sub: 'git add 後', bg: 'bg-blue-100 border-blue-300 text-blue-800' },
                { label: '→', sub: '', bg: '' },
                { label: 'Local Repo', sub: 'git commit 後', bg: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
                { label: '→', sub: '', bg: '' },
                { label: 'Remote Repo', sub: 'git push 後', bg: 'bg-violet-100 border-violet-300 text-violet-800' },
              ].map(({ label, sub, bg }, i) =>
                label === '→'
                  ? <span key={i} className="text-gray-300 font-black text-2xl">→</span>
                  : (
                    <div key={i} className={`border-2 rounded-xl px-4 py-3 text-center min-w-[120px] ${bg}`}>
                      <p className="font-black text-xs">{label}</p>
                      <p className="text-[10px] opacity-75 mt-0.5">{sub}</p>
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="space-y-3">
            {[
              { area: 'Working Directory', cmd: '（檔案修改中）', desc: '你實際編輯的地方，git status 顯示為紅色 modified / untracked。', color: 'sky' },
              { area: 'Staging Area', cmd: 'git add <file>', desc: '暫存區，又叫 Index。你挑選要放進下一個 commit 的改動，可以只 add 部分檔案。', color: 'blue' },
              { area: 'Local Repository', cmd: 'git commit -m "msg"', desc: '本機的 .git 資料庫，存放所有快照歷史。commit 後就永久記錄在這裡。', color: 'indigo' },
              { area: 'Remote Repository', cmd: 'git push / git pull', desc: 'GitHub / GitLab 等遠端伺服器，團隊共享的中央倉庫。', color: 'violet' },
            ].map(({ area, cmd, desc, color }) => (
              <div key={area} className={`rounded-xl p-4 bg-${color}-50 border border-${color}-100`}>
                <div className="flex items-center gap-3 mb-1">
                  <ConceptBadge label={area} color={color === 'sky' ? 'sky' : color === 'violet' ? 'indigo' : color as 'blue' | 'indigo'} />
                  <code className="text-xs font-mono text-gray-500 bg-white px-2 py-0.5 rounded border">{cmd}</code>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* ── 3. 常用指令速查表 ─────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-gray-900">常用指令速查表</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-sky-50">
                <tr>
                  <th className="text-left p-4 font-black text-sky-800">指令</th>
                  <th className="text-left p-4 font-black text-sky-800">作用</th>
                  <th className="text-left p-4 font-black text-sky-800">常見用法</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['git init', '初始化 Git 倉庫', 'git init（空資料夾 → .git）'],
                  ['git clone <url>', '複製遠端 repo 到本機', 'git clone https://github.com/user/repo.git'],
                  ['git add', '加入 Staging Area', 'git add .  /  git add src/index.ts'],
                  ['git commit', '建立快照', 'git commit -m "feat: add login"'],
                  ['git push', '推到遠端', 'git push origin main'],
                  ['git pull', '拉下遠端最新', 'git pull origin main（= fetch + merge）'],
                  ['git branch', '管理分支', 'git branch feat/login  /  git branch -d feat/login'],
                  ['git checkout / switch', '切換分支或 commit', 'git switch main  /  git checkout -b feat/x'],
                  ['git merge', '合併分支', 'git merge feat/login（合進目前分支）'],
                  ['git rebase', '重放 commit 歷史', 'git rebase main（在 feat 上執行）'],
                  ['git stash', '暫存目前工作區', 'git stash / git stash pop'],
                  ['git log --oneline', '精簡歷史紀錄', 'git log --oneline --graph --all'],
                  ['git diff', '查看差異', 'git diff HEAD  /  git diff main feat'],
                  ['git reset', '回退 commit 或 staging', 'git reset --soft HEAD~1'],
                ].map(([cmd, act, usage]) => (
                  <tr key={cmd} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-xs text-sky-700 font-black whitespace-nowrap">{cmd}</td>
                    <td className="p-4 text-gray-700 text-xs font-medium">{act}</td>
                    <td className="p-4 text-gray-400 text-xs font-mono">{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* ── 4. merge vs rebase ────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">merge vs rebase：兩種合併策略</h2>
          <p className="text-gray-700 leading-relaxed">
            這是面試最常問的問題。兩者都能把分支的改動整合進來，但產生的 commit 歷史長得完全不同。
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* merge */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GitMerge size={18} className="text-blue-500" />
                <p className="font-black text-gray-900">git merge feat</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 font-mono text-xs space-y-1">
                <p className="text-gray-400">A — B — C ← main</p>
                <p className="text-gray-400">     \       /</p>
                <p className="text-blue-700 font-black">      D — E — M  ← merge commit</p>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>產生一個新的 <strong>merge commit（M）</strong></li>
                <li>保留完整分岔歷史，可追溯</li>
                <li>歷史較雜，有菱形圖</li>
                <li>適合：open source、需保留 PR 歷史</li>
              </ul>
            </div>
            {/* rebase */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GitCommit size={18} className="text-indigo-500" />
                <p className="font-black text-gray-900">git rebase main</p>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 font-mono text-xs space-y-1">
                <p className="text-gray-400">A — B — C ← main</p>
                <p className="text-gray-400">              \</p>
                <p className="text-indigo-700 font-black">               D' — E'  ← feat（重放）</p>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>把 feat 的 commit 「搬」到 main 前端</li>
                <li>歷史是一條直線，乾淨易讀</li>
                <li>commit hash 會改變（D → D'）</li>
                <li>適合：個人 feature branch、內部開發</li>
              </ul>
            </div>
          </div>

          <CodeBlock lang="bash" title="merge vs rebase — 實際指令" code={`# merge：在 main 上把 feat 合進來
git checkout main
git merge feat
# → 產生 merge commit，保留分岔歷史

# rebase：在 feat 上重放到 main 最新位置
git checkout feat
git rebase main
# → feat 的 commit 被重寫，接在 main 後面

# interactive rebase（整理 commit 歷史）
git rebase -i HEAD~3
# → 可以 squash / reword / drop 最近 3 個 commit`} />
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* ── 5. HEAD 和 detached HEAD ──────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-gray-900">HEAD 是什麼？Detached HEAD？</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>HEAD</strong> 是一個指標，指向你「目前所在的位置」。通常它指向某個 branch 名稱（間接指向該 branch 的最新 commit）。
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-green-800">正常狀態</p>
              <code className="text-xs font-mono text-green-700 block">HEAD → main → commit abc123</code>
              <p className="text-green-700 text-sm">HEAD 指向 branch，commit 後 branch 自動前進，HEAD 跟著走。</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-amber-800">Detached HEAD</p>
              <code className="text-xs font-mono text-amber-700 block">HEAD → commit abc123（直接）</code>
              <p className="text-amber-700 text-sm">當你 <code className="bg-amber-100 px-1 rounded">git checkout &lt;commit-hash&gt;</code> 時，HEAD 脫離 branch，進入「遊離」狀態。此時 commit 不屬於任何 branch，切換後會遺失。</p>
            </div>
          </div>
          <CodeBlock lang="bash" title="HEAD 相關指令" code={`git log --oneline        # 看 HEAD 指向哪
git checkout abc1234     # 進入 detached HEAD（只是查看）
git checkout -b new-feat # 從 detached HEAD 建新 branch，救回改動
git checkout main        # 回到正常狀態`} />
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* ── 6. 面試常考 10 題 ─────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <GitBranch size={22} className="text-sky-500" />
            <h2 className="text-3xl font-black text-gray-900">面試常考題</h2>
          </div>
          <p className="text-gray-500 text-sm">以下 10 題是工程師面試中出現頻率最高的 Git 問題，每題附上標準答案要點。</p>

          <div className="space-y-4">
            {[
              {
                q: 'Q1. git merge 和 git rebase 的差異？',
                a: 'merge 產生一個 merge commit，保留分岔歷史，適合需保留 PR 記錄的場景。rebase 把 commit 重放到目標 branch 前端，歷史是一條直線但 hash 改變，適合個人 branch 保持乾淨歷史。黃金法則：不要對已 push 的 public branch 做 rebase。',
                color: 'sky',
              },
              {
                q: 'Q2. git reset 三種模式（--soft / --mixed / --hard）的差異？',
                a: '--soft：回退 commit，但改動留在 Staging Area（可直接再 commit）。--mixed（預設）：回退 commit，改動退回 Working Directory（需重新 add）。--hard：回退 commit，改動完全丟棄（危險！無法還原）。',
                color: 'blue',
              },
              {
                q: 'Q3. git revert 和 git reset 的差異？',
                a: 'reset 是「修改歷史」，把 HEAD 移到舊 commit；revert 是「新增一個反向 commit」來撤銷改動，不改變歷史。已 push 到遠端時必須用 revert，不能用 reset（否則會讓其他人的歷史出現衝突）。',
                color: 'indigo',
              },
              {
                q: 'Q4. 什麼是 fast-forward merge？',
                a: '當目標 branch 沒有新 commit（main 還停在分岔點），merge 不需要建立 merge commit，只是把 main 的指標向前移。可用 --no-ff 強制產生 merge commit 以保留歷史。',
                color: 'sky',
              },
              {
                q: 'Q5. git stash 做什麼？什麼時候用？',
                a: '把 Working Directory 和 Staging Area 的改動暫時收進 stash stack，讓工作區變乾淨。常見情境：做到一半需要緊急切換 branch 修 bug，又不想 commit 未完成的工作時。用 git stash pop 或 git stash apply 取回。',
                color: 'blue',
              },
              {
                q: 'Q6. cherry-pick 是什麼？',
                a: '把指定的某個 commit（或多個）複製到目前 branch，不需要整個 merge。常用於：hotfix 只需要把修 bug 的那個 commit 搬到其他 branch，而不是整個 feature branch。指令：git cherry-pick <commit-hash>。',
                color: 'indigo',
              },
              {
                q: 'Q7. 如何撤銷已 push 的 commit？',
                a: '使用 git revert <commit-hash> 產生反向 commit，然後再 push。絕對不能對 public branch 用 git reset 然後 force push（會破壞其他人的歷史）。如果是自己私有 branch，可以 git push --force-with-lease（比 --force 安全）。',
                color: 'sky',
              },
              {
                q: 'Q8. .gitignore 的優先順序？',
                a: '已被 Git 追蹤的檔案，.gitignore 不會生效（需要先 git rm --cached <file>）。優先順序：命令列 pattern > 目錄層級 .gitignore（越深越優先）> 上層 .gitignore > ~/.gitignore_global。',
                color: 'blue',
              },
              {
                q: 'Q9. git fetch 和 git pull 的差異？',
                a: 'fetch 只把遠端的新 commit 下載到本機（存在 origin/main 等 remote tracking branch），不修改你的 Working Directory。pull = fetch + merge（或 fetch + rebase，取決於設定）。好習慣：先 fetch，確認差異後再手動 merge，比直接 pull 更安全。',
                color: 'indigo',
              },
              {
                q: 'Q10. branch 是什麼？它儲存的是什麼？',
                a: 'branch 本質上只是一個指標（一個 40 bytes 的 commit hash 文字檔，存在 .git/refs/heads/ 下）。它指向某個 commit。建立 branch 的成本幾乎是零，切換 branch 也只是移動指標。這就是為什麼 Git branching 比其他版控工具快。',
                color: 'sky',
              },
            ].map(({ q, a, color }, i) => (
              <div key={i} className={`border border-${color}-100 bg-${color}-50/40 shadow-none`}>
                <div className="p-5 space-y-3">
                  <p className={`font-black text-${color}-800 text-sm`}>{q}</p>
                  <hr className="border-gray-100 opacity-20"  />
                  <p className="text-gray-700 text-sm leading-relaxed">{a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* ── Key Takeaway ──────────────────────────────────────── */}
        <section>
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-sky-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { icon: '📸', text: 'Git 是 snapshot-based，不是 diff-based。每個 commit 是整個專案的快照。' },
                { icon: '🗂️', text: '四個區域：Working Directory → (git add) → Staging Area → (git commit) → Local Repo → (git push) → Remote Repo。' },
                { icon: '🌿', text: 'branch 只是指向 commit 的指標，建立和切換成本幾乎為零。HEAD 指向你目前在哪。' },
                { icon: '🔀', text: 'merge 保留分岔歷史；rebase 重寫歷史成一條直線。對 public branch 用 merge，個人 branch 可以 rebase。' },
                { icon: '↩️', text: 'reset 修改歷史（三模式：soft/mixed/hard）；revert 建新 commit 撤銷，已 push 只能用 revert。' },
                { icon: '🎯', text: 'cherry-pick 複製指定 commit；stash 暫存工作區；fetch + 手動 merge 比 pull 更安全。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50"  />

        {/* ── Navigation ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/web-dev/ep11-bootstrap" className="group block bg-gray-50 hover:bg-sky-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-sky-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-sky-600 transition-colors">EP.11 — Bootstrap</p>
            <p className="text-sm text-gray-500 mt-1">快速 UI 框架入門</p>
          </Link>
          <Link href="/blog/web-dev/ep13-docker" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">EP.13 — Docker</p>
            <p className="text-sm text-gray-500 mt-1">容器化技術一次搞懂</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Git', '版本控制', 'branch', 'merge', 'rebase', '面試題', 'EP.12'].map((tag) => (
            <span key={tag}   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-bold">{tag}</span>
          ))}
        </div>

      </article>
    </div>
  );
}
