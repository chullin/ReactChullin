'use client';

import { Card, CardBody, Button, Link as HeroLink, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Zap, TrendingDown, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, language = 'python', title }: { code: string; language?: string; title?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? language}</span>
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

export default function LeetcodeEP01Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f9cf9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-green-500/20 text-green-300 border-green-500/30 font-bold uppercase text-[10px]">EP.01</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              #1 Two Sum<br />
              <span className="text-blue-400">從暴力解到 HashMap 思維</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">同一題三種解法，複雜度從 O(n²) 降到 O(n)</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-blue-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-blue-400" /><span>November 2023</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Action Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <Button as={Link} href="/blog" variant="light" color="primary" className="font-bold" startContent={<ArrowLeft size={18} />}>Back to Blog</Button>
            <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Clock size={16} /> <span>5 min read</span></div>
              <div className="flex items-center gap-1.5"><Eye size={16} /> <span>1.2k views</span></div>
            </div>
          </div>

          <div className="space-y-10 text-gray-600 leading-relaxed">
            {/* Intro */}
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
              Two Sum 是 LeetCode 上的第 1 題，也是幾乎所有人的第一題。題目很簡單：給一個整數陣列 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">nums</code> 和一個目標值 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">target</code>，找出兩個數字的 index，使它們相加等於 target。
            </p>

            <Card className="bg-gray-50 border-none shadow-none">
              <CardBody className="p-6">
                <p className="font-black text-gray-900 mb-3">題目範例</p>
                <CodeBlock language="text" title="Input / Output" code={`Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]

說明: nums[0] + nums[1] = 2 + 7 = 9`} />
              </CardBody>
            </Card>

            {/* Way 1 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-red-400 rounded-full" />
                Way 1：暴力解（Brute Force）
              </h2>
              <p>最直覺的想法：兩層迴圈，每兩個數字都試試看加起來等不等於 target。</p>
              <CodeBlock title="Way1 — 暴力解 O(n²)" code={`class Solution(object):
    def twoSum(self, nums, target):
        for i in range(len(nums) - 1):
            for y in range(i + 1, len(nums)):
                if nums[i] + nums[y] == target:
                    return i, y`} />
              <ComplexityBadge time="O(n²)" space="O(1)" />
              <p>這是我想的第一個解法，也是最直覺的暴力破解。雖然正確，但效率最差。外層迴圈跑 n 次，內層迴圈再跑 n 次，總共 n² 次比較。</p>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-sm text-red-800 font-medium">
                ⚠️ 當 nums 有 10,000 個元素，最壞情況要比較 <strong>1 億次</strong>。面試時給出這個解沒問題，但面試官一定會要你優化。
              </div>
            </div>

            {/* Way 2 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-yellow-400 rounded-full" />
                Way 2：Two-Pass HashMap
              </h2>
              <p>
                關鍵思維轉換：與其「找兩個數字」，不如改成「對每個數字，去查有沒有它的搭檔」。搭檔 = <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">target - nums[i]</code>。
              </p>
              <p>用 HashMap（Python 的 dict）把每個數字和它的 index 存起來，查詢只需要 O(1)。</p>
              <CodeBlock title="Way2 — Two-Pass HashMap" code={`class Solution:
    def twoSum(self, nums, target):
        numMap = {}

        # 第一輪：把所有數字和 index 存入 dict
        for i in range(len(nums)):
            numMap[nums[i]] = i

        # 第二輪：找每個數字的補數
        for i in range(len(nums)):
            complement = target - nums[i]
            # 補數存在，且不能是自己
            if complement in numMap and numMap[complement] != i:
                return [i, numMap[complement]]

        return []`} />
              <ComplexityBadge time="O(n)" space="O(n)" />
              <p>
                用空間換時間的經典策略。多用了一個 dict（O(n) 空間），換來 O(n) 的時間。<br />
                注意 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">numMap[complement] != i</code> 這個條件：確保找到的是不同的兩個 index，避免同一個元素被用兩次。
              </p>
            </div>

            {/* Way 3 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-green-500 rounded-full" />
                Way 3：One-Pass HashMap（最佳解）
              </h2>
              <p>再進一步：不需要先建好整個 dict，邊走邊查。</p>
              <CodeBlock title="Way3 — One-Pass HashMap" code={`class Solution:
    def twoSum(self, nums, target):
        numMap = {}  # value → index

        for i in range(len(nums)):
            complement = target - nums[i]

            # 先查有沒有搭檔
            if complement in numMap:
                return [numMap[complement], i]

            # 沒有就把自己存進去，等後面的數字來配對
            numMap[nums[i]] = i

        return []`} />
              <ComplexityBadge time="O(n)" space="O(n)" />

              <Card className="bg-blue-50/50 border-none shadow-none">
                <CardBody className="p-8 relative overflow-hidden">
                  <Quote size={40} className="text-blue-200 absolute -top-2 -left-2 rotate-12" />
                  <p className="text-xl font-black text-blue-900 leading-snug relative z-10">
                    One-Pass 的精妙之處：存進 dict 的每個數字，都是在「等待」未來某個數字來配對它。只需要一次遍歷。
                  </p>
                </CardBody>
              </Card>
            </div>

            {/* Comparison */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                三種解法比較
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-black text-gray-900 rounded-tl-xl">解法</th>
                      <th className="text-center p-4 font-black text-gray-900">Time</th>
                      <th className="text-center p-4 font-black text-gray-900">Space</th>
                      <th className="text-left p-4 font-black text-gray-900 rounded-tr-xl">適合場景</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Way 1 暴力解', time: 'O(n²)', space: 'O(1)', note: '理解題意用，面試別只給這個' },
                      { name: 'Way 2 Two-Pass', time: 'O(n)', space: 'O(n)', note: '好理解，分兩步走' },
                      { name: 'Way 3 One-Pass', time: 'O(n)', space: 'O(n)', note: '最佳，面試首選' },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="p-4 font-bold text-gray-800">{row.name}</td>
                        <td className="p-4 text-center font-mono text-blue-600 font-bold">{row.time}</td>
                        <td className="p-4 text-center font-mono text-purple-600 font-bold">{row.space}</td>
                        <td className="p-4 text-gray-500">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Python Insight */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                Python 細節：型別提示與 class 語法
              </h2>
              <p>剛接觸 LeetCode 時，看到題目給的模板有點矇：</p>
              <CodeBlock title="LeetCode 模板" code={`class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        ...`} />
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="font-black text-gray-900 mb-2"><code>nums: list[int]</code></p>
                  <p className="text-gray-600">參數型別提示（type hint）。Python 不強制，只是讓人看懂。<code>list[int]</code> 表示這是一個整數 list。</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="font-black text-gray-900 mb-2"><code>-&gt; list[int]</code></p>
                  <p className="text-gray-600">回傳值型別提示。<code>-&gt;</code> 後面說明這個函式會回傳什麼型別。同樣不強制，但能讓 IDE 幫你做靜態分析。</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="font-black text-gray-900 mb-2"><code>self</code></p>
                  <p className="text-gray-600">Python class 裡，每個 method 的第一個參數固定是 <code>self</code>，代表「這個 instance 本身」。LeetCode 用 class 包裝是慣例，實際解題邏輯都在 method 裡面。</p>
                </div>
              </div>
            </div>

            {/* Insight */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[2rem] p-8 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={20} className="text-blue-500" />
                <span className="font-black text-gray-900">HashMap 思維的核心</span>
              </div>
              <p className="text-gray-700 font-medium">
                Two Sum 教會我的不只是這道題的解法，而是一種思維模式：
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-blue-500 font-black mt-0.5">→</span><span>遇到「查詢某個值存不存在」的需求，優先想 HashMap</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-500 font-black mt-0.5">→</span><span>把問題轉換：「找兩個數」 = 「對每個數，查它的補數」</span></li>
                <li className="flex items-start gap-2"><span className="text-blue-500 font-black mt-0.5">→</span><span>用空間換時間是演算法最常見的優化策略</span></li>
              </ul>
            </div>
          </div>

          <Divider className="my-12 opacity-50" />

          {/* Series Nav */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-start-2">
              <Link href="/blog/leetcode-ep02-set-vs-dict" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
                <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.02 — Set vs Dict</p>
                <p className="text-sm text-gray-500 mt-1">Contains Duplicate 教你選對資料結構</p>
                <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'Array', 'HashMap', 'Python', 'EP.01'].map((tag) => (
              <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
