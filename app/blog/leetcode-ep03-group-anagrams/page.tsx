'use client';

import { Card, CardBody, Button, Link as HeroLink, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Lightbulb, Clock, Eye } from 'lucide-react';
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

const Step = ({ num, title, children }: { num: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center shrink-0">{num}</div>
    <div className="flex-1">
      <p className="font-black text-gray-900 mb-2">{title}</p>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

export default function LeetcodeEP03Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(45deg, #34d399 25%, transparent 25%), linear-gradient(-45deg, #34d399 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #34d399 75%), linear-gradient(-45deg, transparent 75%, #34d399 75%)`, backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold uppercase text-[10px]">EP.03</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              #49 Group Anagrams<br />
              <span className="text-emerald-400">defaultdict 的正確用法</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">排序作為 key，用 defaultdict 分組——理解這兩件事就解開這題</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-emerald-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-emerald-400" /><span>March 2026</span></div>
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
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-emerald-600">
              Group Anagrams 是 Valid Anagram（EP.02）的進階版。上一題只需要判斷兩個字串是不是 anagram，這一題要把一組字串裡所有 anagram 分到同一組。解這題需要同時理解「如何找出 anagram 的共同特徵」和「Python 的 defaultdict 怎麼用」。
            </p>

            {/* Problem */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-emerald-500 rounded-full" />
                題目理解
              </h2>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock language="text" title="Input / Output" code={`Input:  strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

說明：eat、tea、ate 是同一組 anagram（用了相同的字母 a, e, t）
     tan、nat 是同一組 anagram（用了相同的字母 a, n, t）
     bat 自成一組`} />
                </CardBody>
              </Card>
            </div>

            {/* Key Insight */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-emerald-500 rounded-full" />
                關鍵問題：如何讓 anagram 有相同的 key？
              </h2>
              <p>
                Anagram 的本質：<strong>相同的字母，不同的排列順序</strong>。所以如果把每個字排序，所有 anagram 排序後都會得到一樣的字串。
              </p>

              <CodeBlock title="排序作為 key 的概念" code={`"eat"  → sorted → ['a', 'e', 't'] → tuple → ('a', 'e', 't')
"tea"  → sorted → ['a', 'e', 't'] → tuple → ('a', 'e', 't')  ✅ 相同
"ate"  → sorted → ['a', 'e', 't'] → tuple → ('a', 'e', 't')  ✅ 相同
"tan"  → sorted → ['a', 'n', 't'] → tuple → ('a', 'n', 't')  ← 不同組
"bat"  → sorted → ['a', 'b', 't'] → tuple → ('a', 'b', 't')  ← 不同組`} />

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 font-medium">
                ⚠️ <strong>為什麼不用 str 而用 tuple？</strong><br />
                <code>sorted("eat")</code> 回傳的是 <strong>list</strong>（<code>['a', 'e', 't']</code>），而 list 不能當 dict 的 key（list 是可變的，不能 hash）。<br />
                用 <code>tuple(sorted(s))</code> 轉成 tuple，就可以當 key 了。
              </div>
            </div>

            {/* defaultdict */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-emerald-500 rounded-full" />
                defaultdict：不用再寫 if key not in dict
              </h2>
              <p>
                普通 dict 存取不存在的 key 會拋 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">KeyError</code>。每次要新增一個 key 都要先判斷它存不存在：
              </p>
              <CodeBlock title="普通 dict — 需要手動初始化" code={`# 用普通 dict 分組，每次要先判斷
result = {}
for s in strs:
    key = tuple(sorted(s))
    if key not in result:        # 每次都要檢查
        result[key] = []
    result[key].append(s)`} />

              <p><code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">defaultdict</code> 讓你指定「當 key 不存在時，自動建立什麼預設值」，省掉那個 if 判斷：</p>

              <CodeBlock title="defaultdict — 自動初始化" code={`from collections import defaultdict

result = defaultdict(list)    # key 不存在時，自動建立空 list

for s in strs:
    key = tuple(sorted(s))
    result[key].append(s)     # 不用判斷，直接 append`} />

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-sm text-emerald-800 font-medium">
                ✅ <code>defaultdict(list)</code> 的意思是：傳入 <code>list</code> 這個函式。當存取不存在的 key 時，自動呼叫 <code>list()</code> 建立空 list。<br /><br />
                常見用法：<code>defaultdict(list)</code>、<code>defaultdict(int)</code>（預設 0）、<code>defaultdict(set)</code>（預設空 set）
              </div>
            </div>

            {/* Full Solution */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-emerald-500 rounded-full" />
                完整解法
              </h2>
              <div className="space-y-4">
                <Step num={1} title="建立 defaultdict(list)，key 是排序後的 tuple">
                  每個 anagram 群組共享一個 key
                </Step>
                <Step num={2} title="遍歷所有字串，計算 key 並分組">
                  <code>tuple(sorted(s))</code> 當 key，把字串 append 到對應的 list
                </Step>
                <Step num={3} title="回傳 dict 的所有 values">
                  每個 value 就是一個 anagram 群組
                </Step>
              </div>

              <CodeBlock title="Group Anagrams — 完整解法" code={`from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        result = defaultdict(list)

        for s in strs:
            key = tuple(sorted(s))    # 所有 anagram 會有相同的 key
            result[key].append(s)

        return list(result.values())`} />
              <ComplexityBadge time="O(n · k log k)  n=字串數量, k=平均字串長度" space="O(n · k)" />
            </div>

            {/* Step by Step Trace */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-emerald-500 rounded-full" />
                逐步追蹤執行過程
              </h2>
              <p>用範例 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">["eat","tea","tan","ate","nat","bat"]</code> 走一遍：</p>
              <CodeBlock title="執行追蹤" code={`strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
result = defaultdict(list)

# 1. "eat" → key = ('a','e','t') → result[('a','e','t')] = ["eat"]
# 2. "tea" → key = ('a','e','t') → result[('a','e','t')] = ["eat", "tea"]
# 3. "tan" → key = ('a','n','t') → result[('a','n','t')] = ["tan"]
# 4. "ate" → key = ('a','e','t') → result[('a','e','t')] = ["eat", "tea", "ate"]
# 5. "nat" → key = ('a','n','t') → result[('a','n','t')] = ["tan", "nat"]
# 6. "bat" → key = ('a','b','t') → result[('a','b','t')] = ["bat"]

# result.values() →
# [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]`} />
            </div>

            {/* Bonus: Counter Key */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-emerald-500 rounded-full" />
                進階解法：用字母頻率當 key
              </h2>
              <p>
                排序需要 O(k log k)，但其實可以用「26 個字母的頻率陣列」當 key，降到 O(k)：
              </p>
              <CodeBlock title="字母頻率 key — O(n·k)" code={`class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        result = defaultdict(list)

        for s in strs:
            count = [0] * 26
            for c in s:
                count[ord(c) - ord('a')] += 1   # a=0, b=1, ..., z=25
            result[tuple(count)].append(s)       # list 不能當 key，轉 tuple

        return list(result.values())`} />

              <div className="flex items-start gap-3 bg-emerald-50 rounded-2xl p-5">
                <Lightbulb size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-800 font-medium">
                  <strong>ord(c) - ord('a')</strong> 是把字母轉成 0-25 的 index 的慣用技巧。<br />
                  <code>ord('a') = 97</code>，<code>ord('z') = 122</code>，相減就是字母在字母表中的位置。
                </div>
              </div>
            </div>

            {/* Quote */}
            <Card className="bg-emerald-50/50 border-none shadow-none">
              <CardBody className="p-8 relative overflow-hidden">
                <Quote size={40} className="text-emerald-200 absolute -top-2 -left-2 rotate-12" />
                <p className="text-xl font-black text-emerald-900 leading-snug relative z-10">
                  Group Anagrams 的精髓不是演算法，而是「找到一個能代表整個群組的 key」。這種把問題轉換成 key 設計問題的思維，在後面的 Sliding Window 和 Two Pointers 也會一直出現。
                </p>
              </CardBody>
            </Card>

            {/* Summary */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-[2rem] p-8 space-y-4">
              <p className="font-black text-gray-900 text-lg">本篇重點整理</p>
              <div className="space-y-3">
                {[
                  { emoji: '🔑', text: 'Anagram 的共同 key = tuple(sorted(s))，排序後相同就是同組' },
                  { emoji: '📦', text: 'defaultdict(list) — key 不存在時自動建立空 list，省掉 if 判斷' },
                  { emoji: '⚠️', text: 'list 不能當 dict key（可變、不能 hash），要先轉 tuple' },
                  { emoji: '🚀', text: '進階：26個字母頻率陣列當 key，可從 O(k log k) 降到 O(k)' },
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

          {/* Series Nav */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/blog/leetcode-ep02-set-vs-dict" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.02 — Set vs Dict</p>
              <p className="text-sm text-gray-500 mt-1">選對資料結構，解題事半功倍</p>
            </Link>
            <div className="group block bg-gray-50 rounded-2xl p-6 text-right opacity-50">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-700">EP.04 — Two Pointers</p>
              <p className="text-sm text-gray-500 mt-1">即將推出</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'HashMap', 'defaultdict', 'Sorting', 'Python', 'EP.03'].map((tag) => (
              <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
