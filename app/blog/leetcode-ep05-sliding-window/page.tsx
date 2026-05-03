'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, TrendingUp, Clock, Eye } from 'lucide-react';
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

export default function LeetcodeEP05Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-900 via-sky-900 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(ellipse at 20% 50%, #06b6d4 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #0284c7 0%, transparent 60%)` }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold uppercase text-[10px]">EP.05</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Sliding Window<br />
              <span className="text-cyan-400">用一個視窗掃過整個陣列</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">#121 Best Time to Buy and Sell Stock — Sliding Window 最直觀的入門題</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-cyan-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-cyan-400" /><span>September 2024</span></div>
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
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-cyan-600">
              Sliding Window 是一個把 O(n²) 的暴力雙迴圈，壓縮成 O(n) 單次遍歷的技巧。核心概念很簡單：維護一個「視窗」，根據條件動態調整它的左右邊界，不需要每次都從頭掃。Best Time to Buy and Sell Stock 是這個模式最直觀的入門題。
            </p>

            {/* Problem */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-cyan-500 rounded-full" />
                題目
              </h2>
              <p>給一個陣列 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">prices</code>，<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">prices[i]</code> 代表第 i 天的股票價格。你只能買賣一次，求最大獲利。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`Input:  prices = [10, 1, 5, 6, 7, 1]
Output: 6
# 第 2 天買（price=1），第 5 天賣（price=7）→ 獲利 7-1=6

Input:  prices = [10, 8, 7, 5, 2]
Output: 0
# 一路跌，無論如何都獲利不了 → 回傳 0`} />
                </CardBody>
              </Card>
            </div>

            {/* Brute Force */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-red-400 rounded-full" />
                暴力解：兩層迴圈 O(n²)
              </h2>
              <p>最直覺的做法：枚舉所有買入和賣出的組合。</p>
              <CodeBlock title="暴力解 — O(n²)" code={`def maxProfit(prices):
    max_profit = 0
    for i in range(len(prices)):
        for j in range(i + 1, len(prices)):
            profit = prices[j] - prices[i]
            max_profit = max(max_profit, profit)
    return max_profit`} />
              <ComplexityBadge time="O(n²)" space="O(1)" />
              <p>這樣做會超時（LeetCode 會 TLE）。問題在於：每次移動買入點，賣出點都要從頭掃。但我們根本不需要這樣——賣出的最佳時機，就是在「當前買入點之後的最高價」，而這可以用一次遍歷追蹤。</p>
            </div>

            {/* Sliding Window Concept */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-cyan-500 rounded-full" />
                Sliding Window 思維
              </h2>
              <p>用兩個指針：<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">min_price</code>（目前最低買入價）和當前遍歷到的價格。</p>
              <p>規則很簡單：</p>
              <div className="space-y-3 pl-4">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-500 font-black mt-0.5">→</span>
                  <span>遇到更低的價格，更新 <code className="bg-gray-100 px-1 rounded text-sm font-mono">min_price</code>（視窗左邊界往右移）</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-500 font-black mt-0.5">→</span>
                  <span>否則計算當前獲利，更新最大值</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 font-mono text-xs space-y-1 overflow-x-auto">
                <div className="text-gray-400 mb-3">prices = [10, 1, 5, 6, 7, 1]</div>
                <div className="grid grid-cols-5 gap-2 text-center font-bold text-gray-500 mb-1 text-[11px]">
                  <span>day</span><span>price</span><span>min</span><span>profit</span><span>max</span>
                </div>
                {[
                  ['0', '10', '10', '0', '0'],
                  ['1', '1', '1↓', '0', '0'],
                  ['2', '5', '1', '4', '4↑'],
                  ['3', '6', '1', '5', '5↑'],
                  ['4', '7', '1', '6', '6↑'],
                  ['5', '1', '1↓', '0', '6'],
                ].map(([day, price, min, profit, max], i) => (
                  <div key={i} className="grid grid-cols-5 gap-2 text-center text-[11px] py-1 border-t border-gray-200">
                    <span className="text-gray-400">{day}</span>
                    <span className="text-cyan-600 font-black">{price}</span>
                    <span className={min.includes('↓') ? 'text-orange-500 font-black' : 'text-gray-600'}>{min}</span>
                    <span className="text-gray-600">{profit}</span>
                    <span className={max.includes('↑') ? 'text-green-500 font-black' : 'text-gray-600'}>{max}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-cyan-500 rounded-full" />
                解法
              </h2>
              <CodeBlock title="Sliding Window — O(n)" code={`class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = prices[0]
        profit = 0

        for price in prices:
            if price < min_price:
                min_price = price          # 遇到更低價，更新買入點
            else:
                profit = max(profit, price - min_price)  # 計算當前獲利

        return profit`} />
              <ComplexityBadge time="O(n)" space="O(1)" />

              <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5 text-sm text-cyan-800 font-medium">
                ✅ 這是你的 GitHub 上的解法。用 <code>min</code> 作為變數名的版本是一樣的邏輯，只是 <code>min</code> 是 Python 內建函式，建議改用 <code>min_price</code> 避免覆蓋內建名稱。
              </div>
            </div>

            {/* Sliding Window Pattern */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-cyan-500 rounded-full" />
                Sliding Window 的通用模板
              </h2>
              <p>Buy and Sell Stock 是「固定視窗右端，動態更新左端」的變形。更通用的 Sliding Window 是<strong>動態調整視窗大小</strong>的版本，適用於「最長/最短子字串」類型的題目：</p>
              <CodeBlock title="通用 Sliding Window 模板" code={`def sliding_window(s):
    window = {}      # 視窗內的狀態（通常是 dict 或計數器）
    left = 0
    result = 0

    for right in range(len(s)):
        # 1. 把 s[right] 加入視窗
        window[s[right]] = window.get(s[right], 0) + 1

        # 2. 當視窗不符合條件，縮小左邊界
        while window_is_invalid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0:
                del window[s[left]]
            left += 1

        # 3. 更新結果（視窗大小 = right - left + 1）
        result = max(result, right - left + 1)

    return result`} />

              <div className="grid gap-3">
                {[
                  { title: 'Longest Substring Without Repeating Characters', note: '視窗內不能有重複字元，遇到重複就縮小左邊' },
                  { title: 'Minimum Window Substring', note: '視窗內要包含所有目標字元，滿足條件後縮小左邊找最短' },
                  { title: 'Longest Repeating Character Replacement', note: '視窗內替換次數不超過 k，超過就縮小左邊' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-cyan-50/40 rounded-2xl p-5">
                    <TrendingUp size={18} className="text-cyan-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-cyan-50/50 border-none shadow-none">
              <CardBody className="p-8 relative overflow-hidden">
                <Quote size={40} className="text-cyan-200 absolute -top-2 -left-2 rotate-12" />
                <p className="text-xl font-black text-cyan-900 leading-snug relative z-10">
                  Sliding Window 的精髓：右邊界推進「擴大」視窗，左邊界推進「縮小」視窗。整個過程，left 和 right 都只往右走，總共最多走 2n 步，所以是 O(n)。
                </p>
              </CardBody>
            </Card>

            {/* Summary */}
            <div className="bg-gradient-to-r from-cyan-50 to-sky-50 rounded-[2rem] p-8 space-y-4">
              <p className="font-black text-gray-900 text-lg">本篇重點整理</p>
              <div className="space-y-3">
                {[
                  { emoji: '🪟', text: 'Sliding Window = 動態視窗，right 擴大，left 縮小' },
                  { emoji: '📈', text: 'Buy and Sell Stock：追蹤當前最低買入點，同時計算獲利' },
                  { emoji: '⚠️', text: '別用 min 當變數名，會覆蓋 Python 內建函式' },
                  { emoji: '🔄', text: '通用模板：right 每次推進一格，left 在違反條件時縮進' },
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
            <Link href="/blog/leetcode-ep04-two-pointers" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.04 — Two Pointers</p>
              <p className="text-sm text-gray-500 mt-1">從 "0P" 踩坑說起</p>
            </Link>
            <Link href="/blog/leetcode-ep06-stack" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.06 — Stack</p>
              <p className="text-sm text-gray-500 mt-1">Valid Parentheses 與單調棧</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'Sliding Window', 'Array', 'Python', 'EP.05'].map((tag) => (
              <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
