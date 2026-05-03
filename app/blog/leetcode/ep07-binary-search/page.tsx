'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, AlertTriangle, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4">
    <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

export default function LeetcodeEP07Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `linear-gradient(to right, #818cf8 1px, transparent 1px), linear-gradient(to bottom, #818cf8 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-bold uppercase text-[10px]">EP.07</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Binary Search<br />
              <span className="text-indigo-400">每次砍掉一半，O(log n) 的魔法</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">#704 Binary Search · #33 Search in Rotated Sorted Array</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-indigo-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-indigo-400" /><span>October 2024</span></div>
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
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-indigo-600">
              Binary Search 的概念每個人都懂——在排序好的陣列裡，每次比較中間的元素，再根據大小丟掉左半或右半，重複直到找到目標。但實際寫出來時，off-by-one error 讓很多人翻車。這篇先把基礎打穩，再看 Rotated Sorted Array 這個變形題。
            </p>

            {/* Why O(log n) */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-indigo-500 rounded-full" />
                為什麼是 O(log n)？
              </h2>
              <p>每一步都把搜尋範圍砍半。從 n 個元素開始，最多幾步才到 1 個？</p>
              <div className="bg-gray-50 rounded-2xl p-6 font-mono text-sm space-y-1">
                <div className="grid grid-cols-3 gap-4 font-black text-gray-500 text-xs mb-3">
                  <span>步數</span><span>剩餘元素</span><span>n=1024 時</span>
                </div>
                {[
                  ['0', 'n', '1024'],
                  ['1', 'n/2', '512'],
                  ['2', 'n/4', '256'],
                  ['3', 'n/8', '128'],
                  ['...', '...', '...'],
                  ['10', '1', '1 ✅'],
                ].map(([step, remain, ex], i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 text-xs py-1 border-t border-gray-100">
                    <span className="text-indigo-600 font-black">{step}</span>
                    <span className="text-gray-600">{remain}</span>
                    <span className={ex.includes('✅') ? 'text-green-600 font-black' : 'text-gray-500'}>{ex}</span>
                  </div>
                ))}
              </div>
              <p>1024 個元素最多只需要 10 步（log₂ 1024 = 10）。如果是 10 億個元素，也只需要 30 步。這就是 O(log n) 的威力。</p>
            </div>

            {/* Basic solution */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-indigo-500 rounded-full" />
                #704 基本解法
              </h2>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`Input:  nums = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4   ← nums[4] = 9

Input:  nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1  ← 不存在`} />
                </CardBody>
              </Card>

              <CodeBlock title="Binary Search — 你的解法" code={`class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = (right - left) // 2 + left   # 防止 overflow
            num = nums[mid]

            if num == target:
                return mid
            elif num < target:
                left = mid + 1    # 目標在右半，丟棄左半
            else:
                right = mid - 1   # 目標在左半，丟棄右半

        return -1`} />
              <ComplexityBadge time="O(log n)" space="O(1)" />
            </div>

            {/* Mid calculation deep dive */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-indigo-500 rounded-full" />
                <code>mid = (right - left) // 2 + left</code> 為什麼不直接寫 <code>(left + right) // 2</code>？
              </h2>
              <p>這是你程式碼裡的一個細節，值得單獨說明。</p>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 font-black text-amber-800">
                  <AlertTriangle size={18} />
                  Integer Overflow 問題
                </div>
                <CodeBlock title="為何不用 (left + right) // 2" code={`# 在 C / Java / C++ 這類語言：
# int 的最大值是 2,147,483,647（約 2.1 億）
# 如果 left = 1,000,000,000, right = 2,000,000,000
# left + right = 3,000,000,000 → 超過 int 最大值 → overflow！

# 安全寫法：
mid = left + (right - left) // 2
# 等同於：
mid = (right - left) // 2 + left

# Python 的 int 沒有 overflow 問題（任意精度整數）
# 但這是面試標準寫法，養成習慣很重要`} />
                <p className="text-sm text-amber-800 font-medium">
                  Python 的整數沒有 overflow，所以兩種寫法結果一樣。但這是面試的標準寫法，Java/C++ 面試時寫錯會被扣分。
                </p>
              </div>
            </div>

            {/* Off-by-one */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-indigo-500 rounded-full" />
                Off-by-one：最常見的 Binary Search Bug
              </h2>
              <p>Binary Search 有兩種終止條件，容易搞混：</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-3">
                  <p className="font-black text-green-900">while left <span className="text-green-600">{'<='}</span> right</p>
                  <p className="text-sm text-green-800">搜尋範圍包含 left == right 的情況（只剩一個元素還要檢查）。找「精確值」用這個。</p>
                  <div className="font-mono text-xs text-green-700 bg-green-100 rounded-lg p-3">
                    left=3, right=3 → 還會進 loop<br/>
                    left=4, right=3 → 停止
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                  <p className="font-black text-blue-900">while left <span className="text-blue-600">{'<'}</span> right</p>
                  <p className="text-sm text-blue-800">搜尋範圍不包含 left == right。找「邊界」（第一個 ≥ target 的位置）用這個。</p>
                  <div className="font-mono text-xs text-blue-700 bg-blue-100 rounded-lg p-3">
                    left=3, right=3 → 直接停止<br/>
                    回傳 left 作為答案
                  </div>
                </div>
              </div>
              <CodeBlock title="逐步追蹤：nums=[-1,0,3,5,9,12], target=9" code={`left=0, right=5 → mid=2, nums[2]=3 < 9 → left=3
left=3, right=5 → mid=4, nums[4]=9 == 9 → return 4 ✅`} />
            </div>

            {/* Rotated Array */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-indigo-500 rounded-full" />
                變形題：#33 Search in Rotated Sorted Array
              </h2>
              <p>如果陣列被「旋轉」過呢？</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`# 原本：[0, 1, 2, 4, 5, 6, 7]
# 旋轉：[4, 5, 6, 7, 0, 1, 2]  ← 從 index 4 切開並旋轉

Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4

Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1`} />
                </CardBody>
              </Card>

              <p>直接用 Binary Search 行不行？不行——旋轉後整個陣列已經不是單調遞增了，mid 的大小無法直接告訴你目標在左還是右。</p>

              <p>關鍵觀察：<strong>旋轉後，陣列的左半和右半，其中一邊一定是有序的。</strong> 利用這個性質，先判斷哪一半有序，再決定要往哪邊走。</p>

              <CodeBlock title="Search in Rotated Sorted Array" code={`class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = (right - left) // 2 + left

            if nums[mid] == target:
                return mid

            # 判斷左半是否有序
            if nums[left] <= nums[mid]:
                # 左半有序，且 target 在左半範圍內
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                # 右半有序，且 target 在右半範圍內
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1

        return -1`} />
              <ComplexityBadge time="O(log n)" space="O(1)" />

              <div className="bg-indigo-50 rounded-2xl p-6 space-y-3">
                <p className="font-black text-indigo-900">思維步驟</p>
                {[
                  'nums[mid] == target → 直接回傳',
                  'nums[left] <= nums[mid] → 左半有序',
                  '→ target 在左半範圍內 → right = mid - 1',
                  '→ 否則去右半 → left = mid + 1',
                  'nums[left] > nums[mid] → 右半有序',
                  '→ target 在右半範圍內 → left = mid + 1',
                  '→ 否則去左半 → right = mid - 1',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-indigo-800">
                    <span className="font-black text-indigo-400 shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-indigo-50/50 border-none shadow-none">
              <CardBody className="p-8 relative overflow-hidden">
                <Quote size={40} className="text-indigo-200 absolute -top-2 -left-2 rotate-12" />
                <p className="text-xl font-black text-indigo-900 leading-snug relative z-10">
                  Binary Search 的所有變形題，核心都是同一件事：<strong>在每一步，確保你能丟掉「目標一定不在那裡」的那一半</strong>。條件怎麼寫，取決於你能做出什麼保證。
                </p>
              </CardBody>
            </Card>

            {/* Summary */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-[2rem] p-8 space-y-4">
              <p className="font-black text-gray-900 text-lg">本篇重點整理</p>
              <div className="space-y-3">
                {[
                  { emoji: '✂️', text: '每次砍掉一半 → O(log n)，10 億個元素只需 30 步' },
                  { emoji: '🔢', text: 'mid = left + (right - left) // 2，防 overflow 的面試標準寫法' },
                  { emoji: '⚠️', text: 'while left <= right 找精確值；while left < right 找邊界' },
                  { emoji: '🔄', text: 'Rotated Array：先判斷哪一半有序，再決定往哪邊走' },
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
            <Link href="/blog/leetcode/ep06-stack" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.06 — Stack</p>
              <p className="text-sm text-gray-500 mt-1">Valid Parentheses 與單調棧</p>
            </Link>
            <Link href="/blog/leetcode/ep08-linked-list" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.08 — Linked List</p>
              <p className="text-sm text-gray-500 mt-1">Pointer 操作與 Dummy Node</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'Binary Search', 'Array', 'Python', 'EP.07'].map((tag) => (
              <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
