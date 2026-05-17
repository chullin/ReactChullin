import { Metadata } from 'next';
import NextImage from 'next/image';
import { 
  Calendar,
  User,
  ArrowLeft,
  Search,
  Code2,
  Terminal,
  Zap,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  MousePointer2
} from 'lucide-react';

import Link from 'next/link';
import { FadeIn } from '@/components/blog/ScrollAnimation';

export const metadata: Metadata = {
  title: 'Python 與 Shell 正規表達式 (Regex) 完全指南 | 陳憲億 Joseph Chen',
  description: '針對全棧開發初學者的 Regex 入門教學，配合生活化比喻與實際的 Python、Shell 程式碼範例，帶你從零開始掌握這個全棧開發的萬用搜尋魔法鍵。',
  keywords: ['正規表達式', 'Regex', 'Python', 'Shell', 'grep', '全棧開發', '陳憲億', 'Joseph Chen'],
  authors: [{ name: '陳憲億 Joseph Chen' }],
};

export default function RegexMasteryPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header / Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <NextImage
          src="/assets/post-bg.webp"
          alt="Regex Mastery"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-6">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <span className="bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                Software Engineering Foundations EP.04
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Python 與 Shell <br />
              正規表達式 (Regex) 完全指南
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium mt-4">
              從零開始的字串魔法：全棧工程師的萬用搜尋鍵
            </p>
            
            <div className="flex items-center justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-white/80 font-bold">
                <User size={18} className="text-blue-400" />
                <Link href="/" className="hover:text-blue-400 transition-colors">Joseph Chen</Link>
              </div>
              <div className="flex items-center gap-2 text-white/80 font-bold">
                <Calendar size={18} className="text-blue-400" />
                <span>May 15, 2026</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      
      {/* Post Content */}
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* Action Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors py-2 px-4 rounded-xl hover:bg-blue-50"
            >
              <ArrowLeft size={18} />
              <span>Back to Blog</span>
            </Link>
            <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Zap size={16} className="text-yellow-500" /> <span>Core Foundation</span></div>
              <div className="flex items-center gap-1.5"><Search size={16} className="text-blue-500" /> <span>8 min read</span></div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-12">
            
            {/* Section 1: Intro */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                前言：為什麼全棧工程師必須掌握 Regex？
              </h2>
              <p className="text-xl text-gray-900 font-medium leading-relaxed">
                想像一下，你在一個擁有十萬行程式碼的專案中，要找出所有「格式錯誤的 Email」；或是你在伺服器日誌中，要秒查出所有來自特定 IP 的「404 錯誤」。如果你只會用傳統的 <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-600 font-bold">Ctrl+F</code>，那你可能要加班到天亮。
              </p>
              <p>
                這就是 **正規表達式（Regular Expression，簡稱 Regex）** 登場的時刻。它就像是工程師的「魔法搜尋鍵」，能讓你用極簡的代碼描述複雜的文字特徵。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                {[
                  { title: '後端 Python', desc: '資料清理、爬蟲提取、日誌解析', icon: <Code2 className="text-blue-500" /> },
                  { title: '維運 Shell', desc: 'Log 分析、批量檔案更名、系統監控', icon: <Terminal className="text-emerald-500" /> },
                  { title: '前端 React', desc: '表單即時驗證、動態路由匹配', icon: <Zap className="text-yellow-500" /> }
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border-none bg-gray-50 p-6 space-y-3">
                    {item.icon}
                    <h4 className="font-black text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Phase 1 Basics */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-indigo-500 rounded-full" />
                第一階段：從零開始的原子組件
              </h2>
              <p>
                Regex 的本質是「模式匹配」。我們可以把 Regex 看作是由一些**元字符 (Metacharacters)** 組成的積木。
              </p>

              <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 font-black text-gray-900 border-b border-gray-100">類別</th>
                      <th className="p-4 font-black text-gray-900 border-b border-gray-100">元字符</th>
                      <th className="p-4 font-black text-gray-900 border-b border-gray-100">解釋</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-4 font-bold text-gray-700">字元匹配</td>
                      <td className="p-4"><code className="text-pink-600 font-bold">.</code> / <code className="text-pink-600 font-bold">\d</code> / <code className="text-pink-600 font-bold">\w</code></td>
                      <td className="p-4 text-sm">萬用字元 / 數字 / 英數字元</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-gray-700">量詞</td>
                      <td className="p-4"><code className="text-pink-600 font-bold">*</code> / <code className="text-pink-600 font-bold">+</code> / <code className="text-pink-600 font-bold">?</code></td>
                      <td className="p-4 text-sm">0次以上 / 1次以上 / 0或1次</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-gray-700">精確量詞</td>
                      <td className="p-4"><code className="text-pink-600 font-bold">{`{n,m}`}</code></td>
                      <td className="p-4 text-sm">重複 n 到 m 次</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-gray-700">邊界錨點</td>
                      <td className="p-4"><code className="text-pink-600 font-bold">^</code> / <code className="text-pink-600 font-bold">$</code></td>
                      <td className="p-4 text-sm">開頭 / 結尾</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                <Lightbulb className="text-blue-500 shrink-0 mt-1" size={20} />
                <p className="text-sm text-blue-900 font-medium leading-relaxed">
                  **生活化比喻：** <code className="text-pink-600 font-bold">\d{`{4}`}</code> 就像是在說「給我找連續四個數字」。它能匹配「2026」，但匹配不到「Joseph」。
                </p>
              </div>
            </section>

            {/* Section 3: Python 실전 */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-green-500 rounded-full" />
                第二階段：實戰演練 ── Python 篇
              </h2>
              <p>
                在 Python 中，我們使用內建的 <code className="bg-gray-100 px-2 py-0.5 rounded text-green-600 font-bold">re</code> 模組。最常用的三個武器分別是：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><code className="font-bold text-gray-900">re.search()</code>: 找第一個匹配。</li>
                <li><code className="font-bold text-gray-900">re.findall()</code>: 找所有匹配（最常用於爬蟲）。</li>
                <li><code className="font-bold text-gray-900">re.sub()</code>: 替換文字（用於資料清洗）。</li>
              </ul>

              <div className="space-y-4">
                <h4 className="font-black text-gray-900">實戰範例：提取台灣手機號碼</h4>
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-3xl overflow-x-auto shadow-xl font-mono text-sm leading-relaxed">
                  <code className="language-python">{`import re

raw_data = "我的電話是 0912-345-678，他的則是 0988 123 456"

# 模式拆解：
# 09       -> 以 09 開頭
# \\d{2}    -> 接著 2 位數字
# [- ]?    -> 可能有 - 或 空格，或什麼都沒有
# \\d{3}    -> 3 位數字
# [- ]?    -> 同上
# \\d{3}    -> 最後 3 位數字
phone_pattern = r"09\\d{2}[- ]?\\d{3}[- ]?\\d{3}"

results = re.findall(phone_pattern, raw_data)
print(results)  # 輸出: ['0912-345-678', '0988 123 456']`}</code>
                </pre>
              </div>
            </section>

            {/* Section 4: Shell 실전 */}
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-slate-900 rounded-full" />
                第三階段：實戰演練 ── Shell 篇
              </h2>
              <p>
                如果你是在伺服器環境（macOS Zsh 或 Linux Bash），最常組合使用的指令就是 <code className="bg-gray-100 px-2 py-0.5 rounded text-slate-900 font-bold">grep -E</code>。其中 <code className="font-bold">-E</code> 代表 Extended Regex，能支援更豐富的符號。
              </p>
              
              <div className="space-y-4">
                <h4 className="font-black text-gray-900">場景：從 Log 檔案中秒查所有 404 錯誤</h4>
                <pre className="bg-slate-900 text-gray-100 p-6 rounded-3xl overflow-x-auto shadow-xl font-mono text-sm leading-relaxed">
                  <code className="language-bash">{`# 搜尋當前目錄下所有 .log 檔案中含有 "ERROR" 且狀態碼為 "404" 的行數
grep -E "ERROR.*404" server.log

# 如果你想統計到底有多少次
grep -E "ERROR.*404" server.log | wc -l`}</code>
                </pre>
                <p className="text-sm text-gray-500 font-medium">
                  這裡的 <code className="text-pink-600 font-bold">.*</code> 意思是「匹配任意長度的任意字元」，它是 Regex 中最強大的黏合劑。
                </p>
              </div>
            </section>

            {/* Section 5: Challenge */}
            <section className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-white space-y-8 relative overflow-hidden">
               {/* Decorative background */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
               
               <div className="relative z-10 space-y-6">
                 <h2 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
                     <Zap size={24} />
                   </div>
                   Regex 邏輯小挑戰
                 </h2>
                 <p className="text-gray-400 text-lg">
                   看完上面的範例，你現在有信心寫出第一個 Regex 嗎？
                 </p>
                 
                 <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
                   <p className="font-bold text-xl">
                     任務：請寫出一個能同時匹配 <code className="text-blue-400">'cat'</code>、<code className="text-blue-400">'bat'</code> 但排除 <code className="text-red-400">'hat'</code> 的 Regex。
                   </p>
                   <p className="text-sm text-gray-500">
                     提示：可以使用字元集合 <code className="text-gray-300 font-bold">[...]</code> 來限定開頭。
                   </p>
                 </div>

                  <div className="pt-4 flex flex-col md:flex-row items-center gap-6">
                     <p className="text-sm text-gray-400 font-medium flex-1">
                       這類邏輯非常適合在前端用 **React** 實作成一個互動式的「Regex 闖關遊戲」。玩家輸入 Regex，系統即時驗證是否正確匹配目標單字。想知道怎麼實作嗎？
                     </p>
                     <button className="bg-blue-600 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all text-base active:scale-95">
                       實作教學預約中
                     </button>
                  </div>
               </div>
            </section>

            {/* Section 6: Summary */}
            <section className="space-y-8 pt-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">總結與全棧下一步</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    Regex 不是用來死背的，而是用來**拆解特徵**的。掌握了基礎元字符，你就能在不同語言間游刃有餘。
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <ArrowRight size={18} className="text-blue-600" />
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    **下一篇預告：** 我們將把 Regex 帶回瀏覽器，看看如何結合 **React Hook Form** 進行高效的表單即時驗證，以及在 **Next.js** 路由中進行複雜的路徑匹配。
                  </p>
                </div>
              </div>

              <hr className="my-16 border-gray-100" />

              <div className="bg-gray-50 p-10 rounded-[2rem] flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-white shadow-xl p-2 flex items-center justify-center">
                   <NextImage 
                     src="/assets/profile3.webp" 
                     alt="Joseph Chen" 
                     width={80} 
                     height={80} 
                     className="rounded-full" 
                   />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">關於作者：陳憲億 Joseph Chen</h3>
                  <p className="text-gray-500 font-medium max-w-lg">
                    軟體工程師，專注於 AI 應用與自動化系統開發。致力於將複雜的技術知識轉化為任何人都能讀懂的實戰指南。
                  </p>
                </div>
                <div className="flex gap-4">
                   <a href="https://github.com/chullin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-blue-50 text-blue-600 font-bold px-6 py-3 rounded-2xl hover:bg-blue-100 transition-colors text-sm">
                     Follow on GitHub
                   </a>
                   <button className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-2xl hover:bg-gray-50 transition-colors text-sm">
                     Share Article
                   </button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </article>
    </div>
  );
}
