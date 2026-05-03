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

const StackViz = ({ items, highlight }: { items: string[]; highlight?: number }) => (
  <div className="flex flex-col-reverse gap-1 w-24">
    {items.map((item, i) => (
      <div key={i} className={`px-4 py-2 rounded-lg text-center font-mono text-sm font-black border-2 ${i === highlight ? 'bg-yellow-100 border-yellow-400 text-yellow-800' : 'bg-gray-100 border-gray-300 text-gray-700'}`}>
        {item}
      </div>
    ))}
    <div className="border-t-2 border-gray-400 pt-1 text-center text-xs text-gray-400 font-bold">bottom</div>
  </div>
);

export default function LeetcodeEP06Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-900 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, #fb7185 0, #fb7185 1px, transparent 0, transparent 24px), repeating-linear-gradient(90deg, #fb7185 0, #fb7185 1px, transparent 0, transparent 24px)` }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-rose-500/20 text-rose-300 border-rose-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-rose-500/20 text-rose-300 border-rose-500/30 font-bold uppercase text-[10px]">EP.06</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Stack<br />
              <span className="text-rose-400">後進先出，解決「配對」問題</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">#20 Valid Parentheses — Stack 最經典的應用，也是單調棧的入口</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-rose-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-rose-400" /><span>October 2024</span></div>
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
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-rose-500">
              Stack（堆疊）是「後進先出（LIFO）」的資料結構。感覺很抽象，但只要理解一個使用場景，就會豁然開朗：<strong>當你需要記住「最近遇到的東西」，等未來某個時機來配對它</strong>，這就是 Stack 的時機。Valid Parentheses 是最經典的例子。
            </p>

            {/* Problem */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-rose-500 rounded-full" />
                題目
              </h2>
              <p>給一個只包含 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">( ) [ ] {'{ }'}</code> 的字串，判斷括號是否合法配對。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`"[]"       → True
"([{}])"   → True
"[({)"     → False  (順序不對)
"["        → False  (沒有閉合)`} />
                </CardBody>
              </Card>
            </div>

            {/* Stack Concept */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-rose-500 rounded-full" />
                Stack 是什麼？
              </h2>
              <p>Stack 就像一疊盤子——你只能從最上面放（push）和取（pop）。</p>

              <div className="flex items-end gap-12 bg-gray-50 rounded-2xl p-8 justify-center">
                <div className="text-center space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase">push 'a'</p>
                  <StackViz items={['a']} highlight={0} />
                </div>
                <div className="text-center space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase">push 'b'</p>
                  <StackViz items={['a', 'b']} highlight={1} />
                </div>
                <div className="text-center space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase">push 'c'</p>
                  <StackViz items={['a', 'b', 'c']} highlight={2} />
                </div>
                <div className="text-center space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase">pop → 'c'</p>
                  <StackViz items={['a', 'b']} />
                </div>
              </div>

              <CodeBlock title="Python 用 list 模擬 Stack" code={`stack = []

stack.append('a')   # push → ['a']
stack.append('b')   # push → ['a', 'b']
stack.append('c')   # push → ['a', 'b', 'c']

top = stack.pop()   # pop → 'c'，stack = ['a', 'b']
top = stack[-1]     # peek（只看頂端，不取出）→ 'b'

len(stack) == 0     # 判斷 stack 是否為空`} />
            </div>

            {/* Key Insight */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-rose-500 rounded-full" />
                解題關鍵：用 dict 建立閉括號的映射
              </h2>
              <p>
                遇到開括號（<code className="bg-gray-100 px-1 rounded text-sm font-mono">( [ {'{'}</code>）就 push 進去；遇到閉括號（<code className="bg-gray-100 px-1 rounded text-sm font-mono">) ] {'}'}</code>）就和 stack 頂端比對，是不是它對應的開括號。
              </p>
              <p>
                用一個 dict 存「閉括號 → 對應開括號」的映射，讓比對邏輯變得非常乾淨：
              </p>
              <CodeBlock title="映射關係" code={`Map = {
    ')': '(',
    '}': '{',
    ']': '['
}

# 遇到 ')' → 查 Map[')'] = '(' → stack 頂端必須是 '('`} />
            </div>

            {/* Solution */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-rose-500 rounded-full" />
                完整解法
              </h2>
              <CodeBlock title="Valid Parentheses — 你的解法" code={`class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        Map = {
            ')': '(',
            '}': '{',
            ']': '['
        }

        for char in s:
            if char not in Map:
                # 開括號 → push 進 stack
                stack.append(char)
                continue

            # 閉括號 → 比對 stack 頂端
            if not stack or Map[char] != stack.pop():
                return False

        return not stack   # stack 為空代表全部配對完成`} />
              <ComplexityBadge time="O(n)" space="O(n)" />

              <div className="space-y-3">
                {[
                  { label: 'char not in Map', desc: '閉括號才在 Map 裡，所以這個判斷是「遇到開括號」→ push' },
                  { label: 'not stack', desc: 'stack 是空的，沒有東西可以配對，直接回傳 False（例如輸入 ")"）' },
                  { label: 'stack.pop()', desc: '取出 stack 頂端並同時移除，直接和 Map[char] 比較' },
                  { label: 'return not stack', desc: 'stack 為空代表所有開括號都有對應的閉括號，合法' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-rose-50/40 rounded-2xl p-5">
                    <code className="text-rose-700 font-black text-xs shrink-0 mt-0.5 bg-rose-100 px-2 py-1 rounded">{item.label}</code>
                    <span className="text-sm text-gray-600">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trace */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-rose-500 rounded-full" />
                逐步追蹤 <code>"([{'{'}])"</code>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-center p-3 font-black text-gray-900 rounded-tl-xl">char</th>
                      <th className="text-left p-3 font-black text-gray-900">動作</th>
                      <th className="text-left p-3 font-black text-gray-900 rounded-tr-xl">stack</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { char: '(', action: '開括號 → push', stack: "['(']" },
                      { char: '[', action: '開括號 → push', stack: "['(', '[']" },
                      { char: '{', action: '開括號 → push', stack: "['(', '[', '{']" },
                      { char: '}', action: "閉括號 → Map['}']='{'，pop='{' ✅", stack: "['(', '[']" },
                      { char: ']', action: "閉括號 → Map[']']='['，pop='[' ✅", stack: "['(']" },
                      { char: ')', action: "閉括號 → Map[')']='('，pop='(' ✅", stack: '[]' },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="p-3 text-center font-mono text-rose-600 font-black">{row.char}</td>
                        <td className="p-3 text-gray-600 text-xs">{row.action}</td>
                        <td className="p-3 font-mono text-gray-500 text-xs">{row.stack}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-gray-100 bg-green-50">
                      <td colSpan={3} className="p-3 text-center text-green-700 font-black text-sm">stack 為空 → return True ✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monotonic Stack preview */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-rose-500 rounded-full" />
                Stack 的進階：單調棧（Monotonic Stack）
              </h2>
              <p>
                Valid Parentheses 是 Stack 的入門題。進階版是「單調棧」——維護一個<strong>單調遞增或遞減</strong>的 stack，用來解決「找下一個更大/更小的元素」這類問題。
              </p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6 space-y-4">
                  <p className="font-black text-gray-900">Daily Temperatures（日均溫）</p>
                  <p className="text-sm text-gray-600">
                    給一個溫度陣列，對每天求「幾天後會遇到更高的溫度」。用單調遞減棧：把下標存進去，遇到更高溫度時，stack 裡排在前面的天都找到了答案。
                  </p>
                  <CodeBlock title="單調棧模板 — Daily Temperatures" code={`def dailyTemperatures(temps):
    stack = []      # 存 index，維護單調遞減
    result = [0] * len(temps)

    for i, temp in enumerate(temps):
        # 當前溫度比 stack 頂端高 → 頂端找到答案了
        while stack and temps[stack[-1]] < temp:
            idx = stack.pop()
            result[idx] = i - idx   # 等了幾天
        stack.append(i)

    return result`} />
                </CardBody>
              </Card>
            </div>

            <Card className="bg-rose-50/50 border-none shadow-none">
              <CardBody className="p-8 relative overflow-hidden">
                <Quote size={40} className="text-rose-200 absolute -top-2 -left-2 rotate-12" />
                <p className="text-xl font-black text-rose-900 leading-snug relative z-10">
                  Stack 適合的場景有個共同特徵：「現在遇到的東西，需要等未來某個條件成立才能處理」。Valid Parentheses 是等閉括號，單調棧是等更大/更小的元素。認出這個模式，就認出了 Stack。
                </p>
              </CardBody>
            </Card>

            {/* Summary */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-[2rem] p-8 space-y-4">
              <p className="font-black text-gray-900 text-lg">本篇重點整理</p>
              <div className="space-y-3">
                {[
                  { emoji: '📚', text: 'Stack = 後進先出，Python 用 list.append() / list.pop() 實作' },
                  { emoji: '🗺️', text: '用 dict 建閉括號映射，讓配對邏輯變成一行：Map[char] != stack.pop()' },
                  { emoji: '✅', text: '最後 return not stack：空 stack 表示全部配對完成' },
                  { emoji: '🔥', text: '單調棧：解決「找下一個更大/更小元素」的問題，進階必學' },
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
            <Link href="/blog/leetcode/ep05-sliding-window" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.05 — Sliding Window</p>
              <p className="text-sm text-gray-500 mt-1">Best Time to Buy and Sell Stock</p>
            </Link>
            <div className="group block bg-gray-50 rounded-2xl p-6 text-right opacity-50">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-700">EP.07 — Binary Search</p>
              <p className="text-sm text-gray-500 mt-1">即將推出</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'Stack', 'String', 'Python', 'EP.06'].map((tag) => (
              <Chip key={tag} variant="flat" color="danger" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
