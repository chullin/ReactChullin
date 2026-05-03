'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4">
    <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

const DPCell = ({ label, val, highlight = false }: { label: string; val: string; highlight?: boolean }) => (
  <div className={`flex flex-col items-center gap-1`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 transition-all
      ${highlight ? 'bg-blue-500 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
      {val}
    </div>
    <span className="text-xs text-gray-400 font-mono">{label}</span>
  </div>
);

export default function LeetcodeEP11Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `linear-gradient(135deg, #8b5cf6 25%, transparent 25%), linear-gradient(225deg, #8b5cf6 25%, transparent 25%), linear-gradient(315deg, #8b5cf6 25%, transparent 25%), linear-gradient(45deg, #8b5cf6 25%, transparent 25%)`, backgroundSize: '20px 20px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">EP.11</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Dynamic Programming<br />
              <span className="text-violet-400">把大問題拆成子問題，然後記住答案</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">#70 Climbing Stairs · #198 House Robber — 用兩題打通 1D DP 的思維</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-violet-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-violet-400" /><span>2024</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <Button as={Link} href="/blog" variant="light" color="primary" className="font-bold" startContent={<ArrowLeft size={18} />}>Back to Blog</Button>
            <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Clock size={16} /> <span>5 min read</span></div>
              <div className="flex items-center gap-1.5"><Eye size={16} /> <span>1.2k views</span></div>
            </div>
          </div>

          <div className="space-y-10 text-gray-600 leading-relaxed">
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-violet-600">
              Dynamic Programming（DP）是很多人覺得最難的主題，但它的核心其實只有兩件事：<strong>① 找到子問題的結構</strong>，<strong>② 把子問題的答案存起來避免重複計算</strong>。這篇用 Climbing Stairs 和 House Robber 兩道經典題，從「為什麼遞迴會超時」出發，解釋 DP 的必要性。
            </p>

            {/* What is DP */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-violet-500 rounded-full" />
                DP 解決的問題類型
              </h2>
              <p>DP 適用於「<strong>最優子結構</strong>」的問題：大問題的最優解可以由子問題的最優解推導出來，而且子問題之間有重疊。</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { icon: '🔁', title: '重疊子問題', desc: '同樣的子問題被計算多次' },
                  { icon: '🏆', title: '最優子結構', desc: '大問題的最優解包含子問題的最優解' },
                  { icon: '💾', title: '記憶化', desc: '子問題算過就存起來，避免重複' },
                ].map((item) => (
                  <div key={item.title} className="bg-violet-50/60 rounded-2xl p-5 space-y-2">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-black text-gray-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Climbing Stairs */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-violet-500 rounded-full" />
                #70 Climbing Stairs
              </h2>
              <p>爬 n 階樓梯，每次可以爬 1 階或 2 階，有幾種方法？</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="範例" code={`n = 3
→ 3 種：(1+1+1)、(1+2)、(2+1)

n = 4
→ 5 種：(1+1+1+1)、(1+1+2)、(1+2+1)、(2+1+1)、(2+2)`} />
                </CardBody>
              </Card>

              <p>先嘗試暴力遞迴的思維：到達第 n 階，只可能從第 n-1 階跨一步上來，或從第 n-2 階跨兩步上來。所以：</p>
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 font-mono text-center text-lg font-black text-violet-900">
                climbStairs(n) = climbStairs(n-1) + climbStairs(n-2)
              </div>

              <CodeBlock title="暴力遞迴 — 正確但超時 O(2ⁿ)" code={`def climbStairs(n):
    if n <= 2:
        return n
    return climbStairs(n - 1) + climbStairs(n - 2)

# 問題：climbStairs(5) 的呼叫樹：
# climbStairs(5)
# ├─ climbStairs(4)
# │   ├─ climbStairs(3)  ← 重複計算！
# │   └─ climbStairs(2)
# └─ climbStairs(3)      ← 重複計算！
#     ├─ climbStairs(2)
#     └─ climbStairs(1)`} />

              <p>子問題大量重複計算，指數級爆炸。解法：把算過的答案存起來（Memoization），或由小到大填表（Tabulation）。</p>

              <div className="space-y-6">
                <div>
                  <p className="font-black text-gray-900 mb-2">解法一：Top-Down Memoization（遞迴 + 快取）</p>
                  <CodeBlock title="Top-Down" code={`def climbStairs(n: int) -> int:
    memo = {}

    def dp(i):
        if i <= 2:
            return i
        if i in memo:       # 算過就直接回傳
            return memo[i]
        memo[i] = dp(i - 1) + dp(i - 2)
        return memo[i]

    return dp(n)`} />
                </div>

                <div>
                  <p className="font-black text-gray-900 mb-2">解法二：Bottom-Up Tabulation（由小到大填表）</p>
                  <CodeBlock title="Bottom-Up" code={`def climbStairs(n: int) -> int:
    if n <= 2:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1   # 1 階有 1 種方法
    dp[2] = 2   # 2 階有 2 種方法

    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]   # 狀態轉移方程

    return dp[n]`} />
                  <ComplexityBadge time="O(n)" space="O(n)" />
                </div>
              </div>

              {/* DP table visualization */}
              <p>n=6 時的填表過程：</p>
              <div className="flex gap-2 bg-gray-50 rounded-2xl p-6 overflow-x-auto justify-center">
                {[
                  { label: 'dp[1]', val: '1' },
                  { label: 'dp[2]', val: '2' },
                  { label: 'dp[3]', val: '3' },
                  { label: 'dp[4]', val: '5' },
                  { label: 'dp[5]', val: '8' },
                  { label: 'dp[6]', val: '13', highlight: true },
                ].map((cell) => (
                  <DPCell key={cell.label} label={cell.label} val={cell.val} highlight={cell.highlight} />
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center">每格 = 前兩格相加。這其實就是 Fibonacci 數列！</p>

              <div>
                <p className="font-black text-gray-900 mb-2">解法三：空間優化（只需保留前兩個值）</p>
                <CodeBlock title="Space O(1)" code={`def climbStairs(n: int) -> int:
    if n <= 2:
        return n

    prev2, prev1 = 1, 2   # dp[1], dp[2]

    for _ in range(3, n + 1):
        curr  = prev1 + prev2
        prev2 = prev1
        prev1 = curr

    return prev1`} />
                <ComplexityBadge time="O(n)" space="O(1)" />
              </div>
            </div>

            {/* DP framework */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-violet-500 rounded-full" />
                DP 的解題框架
              </h2>
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 space-y-3">
                {[
                  { num: '1', title: '定義狀態', desc: 'dp[i] 代表什麼？（通常是「到第 i 個位置為止，某個問題的最優答案」）' },
                  { num: '2', title: '找出狀態轉移方程', desc: 'dp[i] 和 dp[i-1]、dp[i-2]... 之間的關係是什麼？' },
                  { num: '3', title: '初始化 base case', desc: 'dp[0]、dp[1] 等邊界值是什麼？' },
                  { num: '4', title: '決定計算順序', desc: '通常由小到大（確保算 dp[i] 時，依賴的子問題都已計算完）' },
                  { num: '5', title: '回傳答案', desc: '通常是 dp[n] 或 dp 陣列中的最大/最小值' },
                ].map(item => (
                  <div key={item.num} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-200 text-violet-800 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">{item.num}</div>
                    <div>
                      <span className="font-black text-violet-900 text-sm">{item.title}：</span>
                      <span className="text-violet-800 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House Robber */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-violet-500 rounded-full" />
                #198 House Robber
              </h2>
              <p>一排房子，每間有不同金額。你不能搶相鄰的兩間（會觸發警報），求能搶到的最大金額。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="範例" code={`nums = [2, 7, 9, 3, 1]
→ 12：搶 index 0(2) + index 2(9) + index 4(1)

nums = [1, 2, 3, 1]
→ 4：搶 index 0(1) + index 2(3)`} />
                </CardBody>
              </Card>

              <p>套入 DP 框架：</p>
              <div className="space-y-3 pl-4 text-sm">
                {[
                  ['狀態定義', 'dp[i] = 搶到第 i 間房子為止，能得到的最大金額'],
                  ['轉移方程', 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])，要麼跳過這間，要麼搶這間（就不能搶前一間）'],
                  ['Base case', 'dp[0] = nums[0]（只有一間，直接搶）\ndp[1] = max(nums[0], nums[1])（兩間取較大的）'],
                ].map(([label, desc]) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="font-black text-violet-600 shrink-0 w-20">{label}</span>
                    <span className="text-gray-700 whitespace-pre-line">{desc}</span>
                  </div>
                ))}
              </div>

              <CodeBlock title="#198 House Robber" code={`class Solution:
    def rob(self, nums: list[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        dp = [0] * len(nums)
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])

        for i in range(2, len(nums)):
            # 選擇一：跳過這間（繼承前一間的最大值）
            # 選擇二：搶這間（前兩間的最大值 + 這間）
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])

        return dp[-1]`} />
              <ComplexityBadge time="O(n)" space="O(n)" />

              {/* Trace for [2,7,9,3,1] */}
              <p>nums = [2, 7, 9, 3, 1] 的填表過程：</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 font-black text-gray-700 text-left rounded-tl-xl">i</th>
                      <th className="p-3 font-black text-gray-700 text-center">nums[i]</th>
                      <th className="p-3 font-black text-gray-700 text-center">dp[i-2]+nums[i]</th>
                      <th className="p-3 font-black text-gray-700 text-center">dp[i-1]</th>
                      <th className="p-3 font-black text-gray-700 text-center rounded-tr-xl">dp[i]</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['0', '2', '—', '—', '2'],
                      ['1', '7', '—', '2', '7'],
                      ['2', '9', '2+9=11', '7', '11'],
                      ['3', '3', '7+3=10', '11', '11'],
                      ['4', '1', '11+1=12', '11', '12 ✅'],
                    ].map(([i, n, opt2, opt1, dp], idx) => (
                      <tr key={i} className={`border-t border-gray-100 ${idx === 4 ? 'bg-violet-50' : ''}`}>
                        <td className="p-3 font-mono text-violet-600 font-black">{i}</td>
                        <td className="p-3 text-center font-mono">{n}</td>
                        <td className="p-3 text-center font-mono text-gray-500 text-xs">{opt2}</td>
                        <td className="p-3 text-center font-mono text-gray-500 text-xs">{opt1}</td>
                        <td className={`p-3 text-center font-mono font-black ${idx === 4 ? 'text-violet-700' : 'text-gray-700'}`}>{dp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <p className="font-black text-gray-900 mb-2">空間優化版（同樣的 O(1) 技巧）：</p>
                <CodeBlock title="Space O(1)" code={`class Solution:
    def rob(self, nums: list[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        prev2 = nums[0]
        prev1 = max(nums[0], nums[1])

        for i in range(2, len(nums)):
            curr  = max(prev1, prev2 + nums[i])
            prev2 = prev1
            prev1 = curr

        return prev1`} />
                <ComplexityBadge time="O(n)" space="O(1)" />
              </div>
            </div>

            {/* Climbing Stairs vs House Robber */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-violet-500 rounded-full" />
                兩題的共同模式
              </h2>
              <p>Climbing Stairs 和 House Robber 看起來不一樣，但轉移方程的結構幾乎相同：</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 font-black text-gray-900 text-left rounded-tl-xl">題目</th>
                      <th className="p-3 font-black text-gray-900 text-left">dp[i] 定義</th>
                      <th className="p-3 font-black text-gray-900 text-left rounded-tr-xl">轉移方程</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="p-3 font-bold">Climbing Stairs</td>
                      <td className="p-3 text-gray-600">爬到第 i 階的方法數</td>
                      <td className="p-3 font-mono text-xs text-violet-700">dp[i] = dp[i-1] + dp[i-2]</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="p-3 font-bold">House Robber</td>
                      <td className="p-3 text-gray-600">搶到第 i 間的最大金額</td>
                      <td className="p-3 font-mono text-xs text-violet-700">dp[i] = max(dp[i-1], dp[i-2]+nums[i])</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>兩者的核心都是：<strong>dp[i] 只依賴 dp[i-1] 和 dp[i-2]</strong>，因此都可以用兩個變數把空間壓到 O(1)。這個優化技巧幾乎適用所有 1D DP。</p>
            </div>

            <Card className="bg-violet-50/50 border-none shadow-none">
              <CardBody className="p-8 relative overflow-hidden">
                <Quote size={40} className="text-violet-200 absolute -top-2 -left-2 rotate-12" />
                <p className="text-xl font-black text-violet-900 leading-snug relative z-10">
                  DP 最難的不是寫程式，而是想出「狀態定義」和「轉移方程」。只要這兩件事清楚，程式幾乎自己寫出來。每次看到 DP 題，先問：「dp[i] 代表什麼，它和更小的子問題之間的關係是什麼？」
                </p>
              </CardBody>
            </Card>

            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-[2rem] p-8 space-y-4">
              <p className="font-black text-gray-900 text-lg">本篇重點整理</p>
              <div className="space-y-3">
                {[
                  { emoji: '🧩', text: 'DP = 把大問題拆成子問題，存起來避免重複計算' },
                  { emoji: '📋', text: '五步框架：狀態定義 → 轉移方程 → Base case → 計算順序 → 回傳答案' },
                  { emoji: '🪜', text: 'Climbing Stairs：dp[i] = dp[i-1] + dp[i-2]，本質是 Fibonacci' },
                  { emoji: '🏠', text: 'House Robber：dp[i] = max(跳過, 搶這間)，兩個選擇取最大' },
                  { emoji: '💡', text: '只依賴前兩個 dp 值時，用兩個變數把 O(n) 空間壓到 O(1)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider className="my-12 opacity-50" />

          <div className="grid grid-cols-2 gap-4">
            <Link href="/blog/leetcode/ep10-tree-bfs-bst" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.10 — Tree BFS & BST</p>
              <p className="text-sm text-gray-500 mt-1">層序遍歷、驗證 BST、找共同祖先</p>
            </Link>
            <Link href="/blog/leetcode/ep12-dp-advanced" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.12 — DP 進階</p>
              <p className="text-sm text-gray-500 mt-1">Coin Change、LIS、Word Break</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'DP', 'Python', '1D DP', 'EP.11'].map((tag) => (
              <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
