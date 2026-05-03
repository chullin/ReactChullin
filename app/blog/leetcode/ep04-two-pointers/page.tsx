'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Bug, CheckCircle, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4">
    <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

export default function LeetcodeEP04Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, #f97316 0, #f97316 1px, transparent 0, transparent 50%)`, backgroundSize: '20px 20px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-bold uppercase text-[10px]">EP.04</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Two Pointers<br />
              <span className="text-orange-400">從 "0P" 踩坑說起</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">#125 Valid Palindrome — 一個 Bug 讓我徹底理解 Two Pointers</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-orange-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-orange-400" /><span>August 2024</span></div>
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
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-orange-500">
              這題一開始我寫出來的答案通過了 22/31 個測試，卡在一個很簡單的輸入：<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">"0P"</code>。我的程式回傳 True，正確答案是 False。找到 bug 的過程，讓我徹底理解了 Two Pointers 的思維。
            </p>

            {/* Problem */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-orange-500 rounded-full" />
                題目
              </h2>
              <p>給一個字串，只考慮英文字母和數字（忽略大小寫、忽略所有其他符號），判斷它是不是回文（Palindrome）。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`Input:  "Was it a car or a cat I saw?"
Output: True
# 只取英數字，全小寫 → "wasitacaroracatisaw" → 是回文

Input:  "0P"
Output: False
# 只取英數字，全小寫 → "0p" → 不是回文`} />
                </CardBody>
              </Card>
            </div>

            {/* First attempt */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-red-400 rounded-full" />
                第一版：通過 22/31，卡在 "0P"
              </h2>
              <p>我的第一個想法：先把字串整理成只含英文字母的 list，再反轉比較。</p>

              <CodeBlock title="第一版 — 有 Bug" code={`class Solution:
    def isPalindrome(self, s: str) -> bool:
        arr = []
        arr2 = []
        input1 = s.lower()

        for i in input1:
            if i >= "A" and i <= "z":   # ← Bug 就在這裡
                arr.append(i)

        for i in reversed(arr):
            if i >= "A" and i <= "z":
                arr2.append(i)

        for i in range(len(arr)):
            if arr[i] == arr2[i]:
                pass
            else:
                return False
        return True`} />

              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-red-800 font-black">
                  <Bug size={18} />
                  Bug 分析：<code>i &gt;= "A" and i &lt;= "z"</code>
                </div>
                <p className="text-sm text-red-700 font-medium">
                  這個範圍檢查是用 ASCII 碼比較。問題在於字串已經 <code>.lower()</code> 過，所以全是小寫。但條件寫的是 <code>"A"</code> 而非 <code>"a"</code>。
                </p>
                <CodeBlock title="ASCII 碼對照" code={`'0' → ASCII 48
'9' → ASCII 57
'A' → ASCII 65   ← 下界
'Z' → ASCII 90
'a' → ASCII 97
'z' → ASCII 122  ← 上界

# '0' 的 ASCII (48) < 'A' 的 ASCII (65)
# 所以 '0' >= 'A' → False
# → 數字 '0' 被過濾掉了！

# 對 "0P".lower() → "0p"：
# '0' 被過濾 → arr = ['p']
# reversed(['p']) = ['p']
# 比較 ['p'] == ['p'] → True  ← 錯誤答案`} />
                <p className="text-sm text-red-700 font-medium">
                  題目說「英文字母和數字都要考慮」，但我的版本把數字全過濾掉了。只要有數字的測試案例都可能答錯。
                </p>
              </div>
            </div>

            {/* Why extra space is wasteful */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-orange-500 rounded-full" />
                除了 Bug，還有個問題：多餘的空間
              </h2>
              <p>
                就算修好 Bug，第一版還是建立了兩個額外的 list（<code>arr</code> 和 <code>arr2</code>），空間複雜度 O(n)。判斷回文根本不需要額外空間——Two Pointers 可以做到 O(1)。
              </p>
            </div>

            {/* Two Pointers concept */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-orange-500 rounded-full" />
                Two Pointers 的核心思維
              </h2>
              <p>
                兩個指針，一個從左、一個從右，向中間靠攏。每次比較左右兩個字元是否相同，不同就回傳 False，相同就繼續往中間走。
              </p>
              <div className="bg-gray-50 rounded-2xl p-6 font-mono text-sm space-y-2">
                <div className="text-gray-500"># 以 "racecar" 為例</div>
                <div><span className="text-orange-500 font-black">r</span>aceca<span className="text-orange-500 font-black">r</span>  → l=0, r=6 → 'r'=='r' ✅</div>
                <div>r<span className="text-blue-500 font-black">a</span>cec<span className="text-blue-500 font-black">a</span>r  → l=1, r=5 → 'a'=='a' ✅</div>
                <div>ra<span className="text-green-500 font-black">c</span>e<span className="text-green-500 font-black">c</span>ar  → l=2, r=4 → 'c'=='c' ✅</div>
                <div>rac<span className="text-purple-500 font-black">e</span>car  → l=3, r=3 → l &gt;= r，結束 → True</div>
              </div>
            </div>

            {/* Best Solution */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-orange-500 rounded-full" />
                Best Solution：Two Pointers
              </h2>

              <CodeBlock title="Best Solution — Two Pointers, O(1) Space" code={`class Solution:
    def isPalindrome(self, s: str) -> bool:
        l = 0
        r = len(s) - 1

        while l < r:
            # 跳過非英數字的字元
            while l < r and not s[l].isalnum():
                l += 1
            while r > l and not s[r].isalnum():
                r -= 1

            # 比較左右兩端
            if s[l].lower() != s[r].lower():
                return False

            l, r = l + 1, r - 1

        return True`} />
              <ComplexityBadge time="O(n)" space="O(1)" />

              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 font-black text-green-800">
                  <CheckCircle size={18} />
                  關鍵改進
                </div>
                <div className="space-y-2 text-sm text-green-700 font-medium">
                  <div className="flex items-start gap-2"><span className="font-black">→</span><span><code>s[l].isalnum()</code> 正確處理英文字母 <strong>和</strong> 數字，沒有 ASCII 範圍的問題</span></div>
                  <div className="flex items-start gap-2"><span className="font-black">→</span><span>不建立任何額外的 list，空間 O(1)</span></div>
                  <div className="flex items-start gap-2"><span className="font-black">→</span><span>內層 while 跳過無效字元後才比較，邏輯更清晰</span></div>
                </div>
              </div>
            </div>

            {/* isalnum deep dive */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-orange-500 rounded-full" />
                <code>isalnum()</code> vs 手動範圍判斷
              </h2>
              <p>Python 內建的字串方法，比自己寫 ASCII 範圍判斷更可靠、更易讀：</p>
              <CodeBlock title="字串方法對照" code={`# 判斷英數字
'a'.isalnum()   # True   (字母)
'3'.isalnum()   # True   (數字)
'!'.isalnum()   # False  (符號)
' '.isalnum()   # False  (空白)

# 其他常用
'A'.isalpha()   # True   (只有字母)
'3'.isdigit()   # True   (只有數字)
'a'.islower()   # True
'A'.isupper()   # True
'abc'.lower()   # 'abc'
'ABC'.upper()   # 'ABC'`} />
            </div>

            {/* Two Pointers pattern */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-orange-500 rounded-full" />
                Two Pointers 的使用時機
              </h2>
              <p>Palindrome 只是 Two Pointers 的入門。這個模式能解的題型很多：</p>
              <div className="grid gap-3">
                {[
                  { title: '從兩端向中間', example: 'Valid Palindrome、Container With Most Water', icon: '↔️' },
                  { title: '快慢指針（Slow & Fast）', example: 'Linked List Cycle、Remove Duplicates', icon: '🐢🐇' },
                  { title: '固定間距', example: 'Remove Nth Node From End', icon: '📏' },
                  { title: '分割條件（Partition）', example: '3Sum、Sort Colors', icon: '✂️' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-orange-50/50 rounded-2xl p-5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-black text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-orange-50/50 border-none shadow-none">
              <CardBody className="p-8 relative overflow-hidden">
                <Quote size={40} className="text-orange-200 absolute -top-2 -left-2 rotate-12" />
                <p className="text-xl font-black text-orange-900 leading-snug relative z-10">
                  踩坑的那次 "0P" 讓我記住：永遠用語言內建的方法（<code>isalnum()</code>）而不是自己推 ASCII 範圍。內建方法有完整的邊界處理，自己推很容易遺漏。
                </p>
              </CardBody>
            </Card>
          </div>

          <Divider className="my-12 opacity-50" />

          <div className="grid grid-cols-2 gap-4">
            <Link href="/blog/leetcode/ep03-group-anagrams" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.03 — Group Anagrams</p>
              <p className="text-sm text-gray-500 mt-1">defaultdict 的正確用法</p>
            </Link>
            <Link href="/blog/leetcode/ep05-sliding-window" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.05 — Sliding Window</p>
              <p className="text-sm text-gray-500 mt-1">Best Time to Buy and Sell Stock</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'Two Pointers', 'String', 'Python', 'EP.04'].map((tag) => (
              <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
