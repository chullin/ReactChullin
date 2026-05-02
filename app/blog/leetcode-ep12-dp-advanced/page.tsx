'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? 'python'}</span>
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
  </div>
);

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4">
    <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

const DPRow = ({ cells, highlight }: { cells: string[]; highlight?: number }) => (
  <div className="flex gap-2 items-center flex-wrap">
    {cells.map((c, i) => (
      <div key={i} className="flex flex-col items-center gap-1">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-base border-2
          ${i === highlight ? 'bg-indigo-500 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
          {c}
        </div>
        <span className="text-xs text-gray-400 font-mono">{i}</span>
      </div>
    ))}
  </div>
);

export default function LeetcodeEP12Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)` }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-bold uppercase text-[10px]">EP.12</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.12 — DP 進階：<br />
              <span className="text-indigo-300">最佳化、序列、分割</span>
            </h1>
            <p className="text-blue-200 text-lg font-medium max-w-2xl mx-auto">
              #322 Coin Change · #300 Longest Increasing Subsequence · #139 Word Break
              <br />— 三種進階 DP 模板，處理無限選擇、序列比對、字串分割
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-full"><User size={18} /></div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2024</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button isIconOnly variant="light" size="sm"><Bookmark size={18} /></Button>
            <Button isIconOnly variant="light" size="sm"><Share2 size={18} /></Button>
          </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            EP.11 打好了 1D DP 的基礎：Climbing Stairs 和 House Robber 都是「每格只依賴前一兩格」的直線型 DP。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            但現實的 DP 題更複雜。有的題目允許「無限重複選同一個元素」，有的需要在序列中找到「最長遞增的子序列」，有的要判斷「字串能不能被切成字典裡的詞」。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這三種模板，對應三道 Medium，也是進階 DP 最核心的思維跳躍。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 1: COIN CHANGE ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🪙</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 1 — Coin Change</h2>
              <p className="text-gray-500 font-medium">#322 · Medium · 無限揹包（Unbounded Knapsack）</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個硬幣面額陣列 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">coins</code> 和目標金額 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">amount</code>，
                每種硬幣可以無限使用，求最少需要幾枚硬幣能湊出 amount。無解則返回 -1。
              </p>
              <p className="text-gray-500 text-sm font-mono">coins = [1, 5, 11], amount = 15 → 3（5+5+5）</p>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900 mt-8">狀態定義</h3>
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono">dp[i]</code> = 湊出金額 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">i</code> 所需的最少硬幣數。
          </p>
          <p className="text-gray-700 leading-relaxed">
            答案是 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">dp[amount]</code>。
          </p>

          <h3 className="text-xl font-black text-gray-900">轉移方程</h3>
          <p className="text-gray-700 leading-relaxed">
            對每個金額 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">i</code>，嘗試每一枚硬幣 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">c</code>：
          </p>
          <CodeBlock
            title="轉移方程"
            code={`dp[i] = min(dp[i], dp[i - c] + 1)  # 假設你已經湊好了 i-c，再加一枚 c 就能湊到 i`}
          />
          <p className="text-gray-700 leading-relaxed">
            Base case：<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">dp[0] = 0</code>（湊出 0 元需要 0 枚），其餘初始化為 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">float('inf')</code>（代表「目前無法湊出」）。
          </p>

          <h3 className="text-xl font-black text-gray-900">可視化</h3>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">coins = [1, 5, 11]，amount = 15</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-mono text-gray-400 mb-2">初始：dp[0]=0，其餘=∞</p>
                <DPRow cells={['0', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞']} />
              </div>
              <div>
                <p className="text-xs font-mono text-gray-400 mb-2">填完後：dp[5]=1（一枚5），dp[10]=2（兩枚5），dp[15]=3</p>
                <DPRow cells={['0', '1', '2', '3', '4', '1', '2', '3', '4', '5', '2', '1', '2', '3', '4', '3']} highlight={15} />
              </div>
            </div>
          </div>

          <CodeBlock
            title="coin_change.py"
            code={`def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], dp[i - c] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1`}
          />
          <ComplexityBadge time="O(amount × len(coins))" space="O(amount)" />

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-indigo-800">為什麼叫「無限揹包」？</p>
            <p className="text-indigo-700 leading-relaxed">
              經典揹包問題每件物品只能用一次（0/1 揹包）。這裡每種硬幣可以無限次使用，所以叫「完全揹包」或「無限揹包」。
              關鍵差異在於：外層 loop 是 <strong>金額 i</strong>，內層 loop 是 <strong>每種硬幣</strong>，
              因為當我們計算 <code className="bg-indigo-100 px-1 rounded font-mono text-sm">dp[i]</code> 時，
              <code className="bg-indigo-100 px-1 rounded font-mono text-sm">dp[i-c]</code> 已經允許用過同一枚硬幣了。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 2: LIS ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📈</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 2 — Longest Increasing Subsequence</h2>
              <p className="text-gray-500 font-medium">#300 · Medium · 序列型 DP</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個整數陣列 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">nums</code>，
                找出最長的嚴格遞增子序列（subsequence，不要求連續）的長度。
              </p>
              <p className="text-gray-500 text-sm font-mono">nums = [10, 9, 2, 5, 3, 7, 101, 18] → 4（[2, 3, 7, 101] 或 [2, 5, 7, 101]）</p>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900 mt-8">狀態定義</h3>
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono">dp[i]</code> = 以 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">nums[i]</code> 為結尾的最長遞增子序列長度。
          </p>
          <p className="text-gray-700 leading-relaxed">
            注意：這裡 dp[i] 不是「前 i 個的答案」，而是「<strong>強制把 nums[i] 當結尾</strong>」的最長長度。答案是所有 dp[i] 的最大值。
          </p>

          <h3 className="text-xl font-black text-gray-900">轉移方程</h3>
          <p className="text-gray-700 leading-relaxed">
            往回掃所有 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">j &lt; i</code>，如果 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">nums[j] &lt; nums[i]</code>，代表 nums[i] 可以接在 j 的子序列後面：
          </p>
          <CodeBlock
            title="轉移方程"
            code={`dp[i] = max(dp[j] + 1)  for all j < i where nums[j] < nums[i]`}
          />
          <p className="text-gray-700 leading-relaxed">
            Base case：每個元素自成一個序列，所以 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">dp[i] = 1</code>。
          </p>

          <h3 className="text-xl font-black text-gray-900">可視化</h3>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">nums = [10, 9, 2, 5, 3, 7, 101, 18]</p>
            <div className="overflow-x-auto">
              <table className="text-sm font-mono w-full">
                <thead>
                  <tr className="text-gray-400">
                    <th className="text-left p-2 font-bold">i</th>
                    <th className="text-left p-2 font-bold">nums[i]</th>
                    <th className="text-left p-2 font-bold">dp[i]</th>
                    <th className="text-left p-2 font-bold">說明</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    [0, 10, 1, '自己一個'],
                    [1, 9, 1, '9 < 10，無法接在 10 後面'],
                    [2, 2, 1, '2 比前面都小，自己一個'],
                    [3, 5, 2, '5 > 2，接在 dp[2]=1 後，長度 2'],
                    [4, 3, 2, '3 > 2，接在 dp[2]=1 後，長度 2'],
                    [5, 7, 3, '7 > 2,5,3；接在 dp[3]=2 或 dp[4]=2 後，長度 3'],
                    [6, 101, 4, '101 > 所有；接在 dp[5]=3 後，長度 4'],
                    [7, 18, 4, '18 > 2,5,3,7；接在 dp[5]=3 後，長度 4'],
                  ].map(([i, n, d, note]) => (
                    <tr key={String(i)} className={d === 4 ? 'bg-indigo-50' : ''}>
                      <td className="p-2">{i}</td>
                      <td className="p-2 font-bold">{n}</td>
                      <td className={`p-2 font-black ${d === 4 ? 'text-indigo-600' : 'text-gray-900'}`}>{d}</td>
                      <td className="p-2 text-gray-500 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-indigo-700 font-bold">答案 = max(dp) = 4</p>
          </div>

          <CodeBlock
            title="lis.py"
            code={`def lengthOfLIS(nums: list[int]) -> int:
    n = len(nums)
    dp = [1] * n  # 每個元素至少自成長度 1 的序列

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)`}
          />
          <ComplexityBadge time="O(n²)" space="O(n)" />

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-amber-800">🚀 進階：O(n log n) 的 Patience Sorting</p>
            <p className="text-amber-700 leading-relaxed">
              面試有時會追問能不能做到 O(n log n)。答案是用「耐心排序」概念維護一個 <code className="bg-amber-100 px-1 rounded font-mono text-sm">tails</code> 陣列，每次用 binary search 找插入位置。
              但原理需要另開一篇解釋，面試前知道「有這個方法、複雜度 O(n log n)」就已足夠。
            </p>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-indigo-800">序列型 DP 的通用思路</p>
            <p className="text-indigo-700 leading-relaxed">
              LIS 的思路可以推廣到所有「以第 i 個元素為結尾，往前找能轉移過來的 j」的問題。
              關鍵在於：<strong>dp[i] 不是「前 i 個」的最優，而是「強制以 i 結尾」的最優</strong>。
              這個定義方式讓轉移方向變得清晰。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 3: WORD BREAK ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">✂️</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 3 — Word Break</h2>
              <p className="text-gray-500 font-medium">#139 · Medium · 字串分割型 DP</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個字串 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">s</code> 和一個字典 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">wordDict</code>，
                判斷 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">s</code> 能否被分割成一個或多個字典裡的詞。
              </p>
              <p className="text-gray-500 text-sm font-mono">s = "leetcode", wordDict = ["leet","code"] → True</p>
              <p className="text-gray-500 text-sm font-mono">s = "applepenapple", wordDict = ["apple","pen"] → True</p>
              <p className="text-gray-500 text-sm font-mono">s = "catsandog", wordDict = ["cats","dog","sand","cat","an"] → False</p>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900 mt-8">狀態定義</h3>
          <p className="text-gray-700 leading-relaxed">
            <code className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono">dp[i]</code> = 字串前 i 個字元（<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">s[0:i]</code>）能否被成功分割。
          </p>
          <p className="text-gray-700 leading-relaxed">
            注意：dp 的長度是 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">len(s) + 1</code>，因為要包含「空字串」的 Base case：
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">dp[0] = True</code>（空字串不需要任何詞就「可以」被分割）。
          </p>

          <h3 className="text-xl font-black text-gray-900">轉移方程</h3>
          <p className="text-gray-700 leading-relaxed">
            要判斷 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">dp[i]</code>，就往前找所有切割點 j，如果 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">dp[j]</code> 為 True 且 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">s[j:i]</code> 在字典裡，則 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">dp[i] = True</code>：
          </p>
          <CodeBlock
            title="轉移方程"
            code={`dp[i] = True  if dp[j] == True and s[j:i] in wordDict
                  for any j in range(0, i)`}
          />

          <h3 className="text-xl font-black text-gray-900">可視化</h3>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">s = "leetcode", wordDict = {'{'}leet, code{'}'}</p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex gap-2 items-start">
                <span className="text-gray-400 w-20">dp[0]=T</span>
                <span className="text-gray-600">空字串，Base case</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-gray-400 w-20">dp[4]=T</span>
                <span className="text-gray-600">j=0 → dp[0]=T，s[0:4]="leet" ∈ dict ✅</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-gray-400 w-20">dp[8]=T</span>
                <span className="text-gray-600">j=4 → dp[4]=T，s[4:8]="code" ∈ dict ✅</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-indigo-600 font-bold w-20">return T</span>
                <span className="text-indigo-700 font-bold">dp[8] = dp[len(s)] = True</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-mono text-gray-400 mb-3">dp 陣列（i=0..8）</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { i: 0, v: 'T', sub: '' },
                  { i: 1, v: 'F', sub: 'l' },
                  { i: 2, v: 'F', sub: 'le' },
                  { i: 3, v: 'F', sub: 'lee' },
                  { i: 4, v: 'T', sub: 'leet' },
                  { i: 5, v: 'F', sub: 'leetc' },
                  { i: 6, v: 'F', sub: 'leetco' },
                  { i: 7, v: 'F', sub: 'leetcod' },
                  { i: 8, v: 'T', sub: 'leetcode' },
                ].map(({ i, v, sub }) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm border-2
                      ${v === 'T' ? 'bg-green-500 border-green-600 text-white' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
                      {v}
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <CodeBlock
            title="word_break.py"
            code={`def wordBreak(s: str, wordDict: list[str]) -> bool:
    word_set = set(wordDict)  # O(1) lookup
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True  # 空字串可以被分割

    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break  # 找到一個就夠了

    return dp[n]`}
          />
          <ComplexityBadge time="O(n² × w)" space="O(n + |dict|)" />
          <p className="text-sm text-gray-500">w = 字典中最長的詞長度（字串切片的比較成本）</p>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-indigo-800">為什麼要把 wordDict 轉成 set？</p>
            <p className="text-indigo-700 leading-relaxed">
              <code className="bg-indigo-100 px-1 rounded font-mono text-sm">s[j:i] in wordDict</code> 對 list 是 O(n) 查找；
              轉成 <code className="bg-indigo-100 px-1 rounded font-mono text-sm">set</code> 後變成 O(1)。
              這個轉換在所有「字典查找」類 DP 題都應該是反射動作。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== DP 模板比較 ===== */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">三種 DP 模板對比</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">題目</th>
                  <th className="text-left p-4 font-black text-gray-700">dp[i] 含義</th>
                  <th className="text-left p-4 font-black text-gray-700">轉移特點</th>
                  <th className="text-left p-4 font-black text-gray-700">類型</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold text-gray-900">Coin Change</td>
                  <td className="p-4 text-gray-600 font-mono text-xs">湊出金額 i 的最少硬幣</td>
                  <td className="p-4 text-gray-600">每種 coin 都可以無限選，外層枚舉目標</td>
                  <td className="p-4"><Chip size="sm" variant="flat" color="primary">最佳化（無限選）</Chip></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-900">LIS</td>
                  <td className="p-4 text-gray-600 font-mono text-xs">以 nums[i] 結尾的最長序列</td>
                  <td className="p-4 text-gray-600">往前找所有合法的 j，取最大</td>
                  <td className="p-4"><Chip size="sm" variant="flat" color="secondary">序列比對</Chip></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-900">Word Break</td>
                  <td className="p-4 text-gray-600 font-mono text-xs">前 i 個字元能否分割</td>
                  <td className="p-4 text-gray-600">往前找切割點 j，判斷子字串是否合法</td>
                  <td className="p-4"><Chip size="sm" variant="flat" color="success">字串分割</Chip></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key takeaway */}
        <section>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-black text-gray-900">這三題學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🪙', text: 'Coin Change：dp[i] = min(dp[i - c] + 1)，無限揹包就是「外層枚舉目標，內層枚舉選擇」' },
                { emoji: '📈', text: 'LIS：dp[i] 定義為「以 i 結尾」，往前找所有合法 j 取最大，是序列型 DP 的通用框架' },
                { emoji: '✂️', text: 'Word Break：dp[i] 代表前 i 字可分割，枚舉切割點 j，轉移依賴 dp[j] + 字典查找' },
                { emoji: '⚡', text: '字典查找務必轉成 set；dp 長度是 amount+1 或 len(s)+1，不要少一格' },
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
          <Link href="/blog/leetcode-ep11-dp-basics" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.11 — DP 入門</p>
            <p className="text-sm text-gray-500 mt-1">Climbing Stairs、House Robber</p>
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 text-right opacity-50">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-500">敬請期待</p>
            <p className="text-sm text-gray-400 mt-1">Graph、Backtracking...</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'DP', 'Python', 'Coin Change', 'LIS', 'Word Break', 'EP.12'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
