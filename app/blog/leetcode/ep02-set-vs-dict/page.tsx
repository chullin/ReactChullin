'use client';

import { Card, CardBody, Button, Link as HeroLink, Chip, Divider } from '@heroui/react';
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

export default function LeetcodeEP02Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, #a78bfa 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-300 border-violet-500/30 font-bold uppercase text-[10px]">EP.02</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Set vs Dict<br />
              <span className="text-violet-400">選對資料結構，解題事半功倍</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">#217 Contains Duplicate · #242 Valid Anagram</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-violet-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-violet-400" /><span>March 2026</span></div>
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
              刷 #217 Contains Duplicate 的時候，用 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">set</code> 寫出來只需要兩行，但如果不懂 set，不管怎麼寫都很複雜。這一篇把 Python 的 set 和 dict 解釋清楚，並用兩道題展示它們各自最適合的場景。
            </p>

            {/* Set 深度解析 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-violet-500 rounded-full" />
                先搞清楚：set 是什麼？
              </h2>
              <p>Python 有四種基本容器型別，常用的是 list 和 dict，但 <strong>set</strong> 才是做去重和存在性查詢的最佳選擇。</p>

              {/* 四種容器對比 */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-gray-50 font-black text-gray-900 rounded-tl-xl border-b border-gray-200">寫法</th>
                      <th className="text-center p-4 bg-gray-50 font-black text-gray-900 border-b border-gray-200">型別</th>
                      <th className="text-center p-4 bg-gray-50 font-black text-gray-900 border-b border-gray-200">可變？</th>
                      <th className="text-left p-4 bg-gray-50 font-black text-gray-900 rounded-tr-xl border-b border-gray-200">特性</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { code: '[1, 2, 3]', type: 'list', mutable: '✅', note: '有序、可重複、可用 index' },
                      { code: '(1, 2, 3)', type: 'tuple', mutable: '❌', note: '有序、不可變' },
                      { code: '{1, 2, 3}', type: 'set', mutable: '✅', note: '無序、不重複、O(1) 查詢' },
                      { code: '{"a": 1}', type: 'dict', mutable: '✅', note: 'key-value 對應、O(1) 查詢' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0">
                        <td className="p-4 font-mono text-violet-700 font-bold text-xs bg-violet-50/30">{row.code}</td>
                        <td className="p-4 text-center font-bold text-gray-800">{row.type}</td>
                        <td className="p-4 text-center">{row.mutable}</td>
                        <td className="p-4 text-gray-500 text-xs">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 font-medium">
                ⚠️ <strong>常見陷阱：</strong><code>{'{}'}</code> 是空的 <code>dict</code>，不是 set！建立空 set 要用 <code>set()</code>。
              </div>

              <CodeBlock title="set 基本操作" code={`# 建立 set
s = {1, 2, 3}
s = set([1, 2, 3, 3])   # 自動去重 → {1, 2, 3}
s = set()               # 空 set（不能用 {}）

# 常用方法
s.add(4)                # 新增
s.remove(1)             # 刪除（不存在會報錯）
s.discard(99)           # 刪除（不存在不報錯）

# 最重要的操作：存在性查詢，O(1)
3 in s                  # True
99 in s                 # False`} />
            </div>

            {/* 217 題 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-violet-500 rounded-full" />
                #217 Contains Duplicate：set 的主場
              </h2>
              <p>題目：給一個整數陣列，判斷是否有重複元素。</p>

              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock language="text" title="Input / Output" code={`Input:  nums = [1, 2, 3, 1]
Output: True   ← 1 出現兩次

Input:  nums = [1, 2, 3, 4]
Output: False  ← 全都不重複`} />
                </CardBody>
              </Card>

              <p><strong>暴力解</strong>：兩層迴圈，每個元素跟所有其他元素比較，O(n²)。但用 set 可以一行解決：</p>

              <CodeBlock title="set 解法 — O(n)" code={`class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        return len(set(nums)) != len(nums)
        # set 自動去重，如果長度變短代表有重複`} />
              <ComplexityBadge time="O(n)" space="O(n)" />

              <p>或者更明確的寫法，邊走邊查：</p>
              <CodeBlock title="邊走邊查 — 找到重複就提早回傳" code={`class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:     # O(1) 查詢
                return True
            seen.add(num)
        return False`} />

              <Card className="bg-violet-50/50 border-none shadow-none">
                <CardBody className="p-8 relative overflow-hidden">
                  <Quote size={40} className="text-violet-200 absolute -top-2 -left-2 rotate-12" />
                  <p className="text-xl font-black text-violet-900 leading-snug relative z-10">
                    set 的查詢是 O(1)，因為底層是 hash table。list 的查詢是 O(n)，因為要一個一個比。同樣是「有沒有」的問題，選 set 差了整整一個數量級。
                  </p>
                </CardBody>
              </Card>
            </div>

            {/* Set vs Dict 的邊界 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-violet-500 rounded-full" />
                什麼時候用 set，什麼時候用 dict？
              </h2>
              <p>這是很多人模糊的地方：</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-violet-50 rounded-2xl p-6 space-y-3">
                  <p className="font-black text-violet-900">用 set 當你只需要：</p>
                  <ul className="space-y-2 text-sm text-violet-800">
                    <li className="flex items-start gap-2"><span className="font-black">→</span><span>某個值「有沒有出現過」</span></li>
                    <li className="flex items-start gap-2"><span className="font-black">→</span><span>去除重複元素</span></li>
                    <li className="flex items-start gap-2"><span className="font-black">→</span><span>集合運算（交集、聯集）</span></li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
                  <p className="font-black text-blue-900">用 dict 當你需要：</p>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2"><span className="font-black">→</span><span>記錄某個值的「額外資訊」（index、次數）</span></li>
                    <li className="flex items-start gap-2"><span className="font-black">→</span><span>key → value 對應關係</span></li>
                    <li className="flex items-start gap-2"><span className="font-black">→</span><span>Two Sum 那種「查補數」</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 242 題 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-violet-500 rounded-full" />
                #242 Valid Anagram：dict 的主場
              </h2>
              <p>題目：給兩個字串，判斷是不是 anagram（字母異位詞）。Anagram 就是兩個字用一樣的字母，只是排列不同，例如 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">"anagram"</code> 和 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">"nagaram"</code>。</p>

              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock language="text" title="Input / Output" code={`Input:  s = "anagram", t = "nagaram"
Output: True

Input:  s = "rat", t = "car"
Output: False`} />
                </CardBody>
              </Card>

              <p>為什麼不用 set？因為光知道「有沒有這個字母」不夠，還需要知道「各字母出現幾次」。這就是 dict 的用武之地。</p>

              <CodeBlock title="dict 計頻率" code={`class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        count = {}

        for char in s:
            count[char] = count.get(char, 0) + 1   # 計 s 的字母頻率

        for char in t:
            count[char] = count.get(char, 0) - 1   # t 的字母扣掉

        return all(v == 0 for v in count.values())  # 全部歸零才是 anagram`} />
              <ComplexityBadge time="O(n)" space="O(1) — 最多 26 個字母" />

              <p>Python 有個更簡潔的寫法，用 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">Counter</code>：</p>
              <CodeBlock title="Counter 寫法（更 Pythonic）" code={`from collections import Counter

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return Counter(s) == Counter(t)
        # Counter("anagram") → {'a': 3, 'n': 1, 'g': 1, 'r': 1, 'm': 1}`} />

              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-sm text-green-800 font-medium">
                ✅ <code>Counter</code> 是 <code>dict</code> 的子類別，專門用來計頻率。兩個 Counter 直接用 <code>==</code> 比較，內部會逐 key 比對 value，非常方便。
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-[2rem] p-8 space-y-4">
              <p className="font-black text-gray-900 text-lg">本篇重點整理</p>
              <div className="space-y-3">
                {[
                  { emoji: '🔵', text: 'set：只存值，不重複，O(1) 查詢 — 去重、判斷存在' },
                  { emoji: '🟡', text: 'dict：key-value 對，O(1) 查詢 — 計頻率、記額外資訊' },
                  { emoji: '⚠️', text: '{} 是空 dict，空 set 要用 set()' },
                  { emoji: '💡', text: 'Counter 是 dict 子類，計頻率首選' },
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
            <Link href="/blog/leetcode/ep01-two-sum" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.01 — Two Sum</p>
              <p className="text-sm text-gray-500 mt-1">從暴力解到 HashMap 思維</p>
            </Link>
            <Link href="/blog/leetcode/ep03-group-anagrams" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.03 — Group Anagrams</p>
              <p className="text-sm text-gray-500 mt-1">defaultdict 與排序技巧</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'Array', 'Set', 'Dict', 'Counter', 'EP.02'].map((tag) => (
              <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
