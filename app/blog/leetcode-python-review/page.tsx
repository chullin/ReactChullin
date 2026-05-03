'use client';

import { Card, CardBody, Divider, Button, Chip } from '@heroui/react';
import { Calendar, User, ArrowLeft, Code2, AlertTriangle, CheckCircle, Lightbulb, BookOpen, Target, TrendingUp, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({
  code,
  title,
  lang = 'python',
}: {
  code: string;
  title?: string;
  lang?: string;
}) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? lang}</span>
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto leading-relaxed whitespace-pre">
      {code}
    </pre>
  </div>
);

const Callout = ({
  type,
  children,
}: {
  type: 'info' | 'warn' | 'tip' | 'error';
  children: React.ReactNode;
}) => {
  const styles = {
    info: 'bg-blue-50 border-blue-100 text-blue-800',
    warn: 'bg-amber-50 border-amber-100 text-amber-800',
    tip: 'bg-green-50 border-green-100 text-green-800',
    error: 'bg-red-50 border-red-100 text-red-800',
  };
  const icons = { info: '💡', warn: '⚠️', tip: '✅', error: '❌' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0">{icons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const SectionTitle = ({
  icon,
  num,
  children,
}: {
  icon: React.ReactNode;
  num: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="flex items-center gap-2">
      <span className="text-xs font-black text-blue-400 tracking-widest">{num}</span>
      <div className="p-2 rounded-xl bg-blue-50 text-blue-600">{icon}</div>
    </div>
    <h2 className="text-2xl font-black text-gray-900">{children}</h2>
  </div>
);

const ComplexityTable = ({
  rows,
}: {
  rows: { method: string; time: string; space: string; note: string }[];
}) => (
  <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 my-6">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100">
          <th className="text-left px-5 py-3 font-black text-gray-600">解法</th>
          <th className="text-center px-4 py-3 font-black text-gray-600">時間複雜度</th>
          <th className="text-center px-4 py-3 font-black text-gray-600">空間複雜度</th>
          <th className="text-left px-4 py-3 font-black text-gray-600">備註</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-gray-50 transition-colors">
            <td className="px-5 py-3 font-bold text-gray-800">{r.method}</td>
            <td className="px-4 py-3 text-center font-mono text-blue-700 font-bold">{r.time}</td>
            <td className="px-4 py-3 text-center font-mono text-purple-700 font-bold">{r.space}</td>
            <td className="px-4 py-3 text-gray-500 text-xs">{r.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CompareBlock = ({
  bad,
  good,
  badLabel = '❌ 錯誤寫法',
  goodLabel = '✅ 正確解法',
  note,
}: {
  bad: string;
  good: string;
  badLabel?: string;
  goodLabel?: string;
  note?: string;
}) => (
  <div className="space-y-3 my-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-xl overflow-hidden">
        <div className="bg-red-800 px-4 py-2">
          <span className="text-red-200 text-xs font-mono font-bold">{badLabel}</span>
        </div>
        <pre className="bg-red-950 text-red-300 font-mono text-sm px-4 py-4 overflow-x-auto whitespace-pre leading-relaxed">
          {bad}
        </pre>
      </div>
      <div className="rounded-xl overflow-hidden">
        <div className="bg-green-800 px-4 py-2">
          <span className="text-green-200 text-xs font-mono font-bold">{goodLabel}</span>
        </div>
        <pre className="bg-green-950 text-green-300 font-mono text-sm px-4 py-4 overflow-x-auto whitespace-pre leading-relaxed">
          {good}
        </pre>
      </div>
    </div>
    {note && (
      <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 leading-relaxed">{note}</p>
    )}
  </div>
);

export default function LeetcodePythonReviewPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 40%, rgba(99,102,241,0.8) 0%, transparent 50%), radial-gradient(circle at 70% 65%, rgba(59,130,246,0.5) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center gap-2 mb-5">
              <Chip
                size="sm"
                variant="flat"
                className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold uppercase text-[10px]"
              >
                LeetCode
              </Chip>
              <Chip
                size="sm"
                variant="flat"
                className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-bold uppercase text-[10px]"
              >
                Python 復盤
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Python 算法學習復盤<br />
              <span className="text-blue-300">投票、鏈表與 Top-K 的深度解析</span>
            </h1>
            <p className="text-blue-200 text-lg font-medium max-w-2xl mx-auto">
              從真實的學習對話整理而來——Boyer-Moore 投票演算法、<br />
              鏈表虛擬頭節點、Heap vs 桶排序，以及那些讓我踩坑的思維誤區
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">
        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
              J
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Joseph Chen</p>
              <div className="flex items-center gap-2 text-gray-400 text-xs"><Calendar size={12} />
                <span>2026</span>
                <span>·</span>
                <span>Python · LeetCode</span>
                <span>·</span>
                <Clock size={12} />
                <span>5 min read</span>
                <span>·</span>
                <Eye size={12} />
                <span>1.2k views</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" variant="flat" color="primary">Boyer-Moore</Chip>
            <Chip size="sm" variant="flat" color="primary">Linked List</Chip>
            <Chip size="sm" variant="flat" color="primary">Heap / Bucket</Chip>
          </div>
        </motion.div>

        <Divider />

        {/* 一、學習背景與痛點 */}
        <section className="space-y-6">
          <SectionTitle icon={<BookOpen size={18} />} num="01">
            學習背景與痛點
          </SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            這篇復盤來自我在學習 LeetCode 過程中與 AI 的對話紀錄——七段對話，橫跨陣列、鏈表、哈希表三大主題，
            涵蓋了 #2、#26、#49、#169、#229、#242、#347 共七道題目。
            回頭看這些對話，我的問題集中在三個層面：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🧠',
                title: '演算法原理理解',
                items: ['Boyer-Moore 投票邏輯「為什麼這樣就能選出多數元素？」', 'Top-K 問題為什麼 Heap 比排序好？'],
              },
              {
                icon: '🐛',
                title: '程式碼邏輯 Bug',
                items: [
                  'Counter 迭代不等於按頻率排序',
                  'range(nums) 忘記 len()',
                  'defaultdict 用錯 key 名稱',
                ],
              },
              {
                icon: '🔀',
                title: '解法選擇迷茫',
                items: [
                  '哈希表 vs 排序，什麼時候用哪個？',
                  'dummy_head 是必要的嗎？',
                  '原地修改和建新陣列有什麼差別？',
                ],
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-sm border border-gray-100 h-full">
                  <CardBody className="p-5 space-y-3">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-black text-gray-800 text-sm">{item.title}</p>
                    <ul className="space-y-1.5">
                      {item.items.map((it) => (
                        <li key={it} className="text-xs text-gray-500 leading-relaxed flex items-start gap-2">
                          <span className="text-blue-400 shrink-0 mt-0.5">•</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="shadow-sm border border-blue-50 bg-blue-50/30">
            <CardBody className="p-5">
              <p className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">本次復盤涵蓋的題目</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { no: '#2', title: 'Add Two Numbers', tag: 'Linked List' },
                  { no: '#26', title: 'Remove Duplicates', tag: 'Two Pointer' },
                  { no: '#49', title: 'Group Anagrams', tag: 'Hash Table' },
                  { no: '#169', title: 'Majority Element', tag: 'Boyer-Moore' },
                  { no: '#229', title: 'Majority Element II', tag: 'Boyer-Moore' },
                  { no: '#242', title: 'Valid Anagram', tag: 'Hash Table' },
                  { no: '#347', title: 'Top K Frequent', tag: 'Heap / Bucket' },
                ].map((p) => (
                  <div key={p.no} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-blue-100">
                    <span className="text-xs font-black text-blue-600">{p.no}</span>
                    <span className="text-xs font-bold text-gray-700">{p.title}</span>
                    <Chip size="sm" variant="flat" color="primary" className="text-[10px]">{p.tag}</Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* 二、核心知識點拆解 */}
        <section className="space-y-12">
          <SectionTitle icon={<Lightbulb size={18} />} num="02">
            核心知識點拆解
          </SectionTitle>

          {/* 2-1 Boyer-Moore */}
          <div className="space-y-5">
            <h3 className="text-xl font-black text-gray-900">2-1 Boyer-Moore 投票演算法</h3>
            <p className="text-gray-700 leading-relaxed">
              Boyer-Moore Voting Algorithm 是解決「多數元素」問題的最優解，能在 <strong>O(n) 時間、O(1) 空間</strong>內找出答案。
              它的核心思想可以用一個比喻來理解：
            </p>

            <Card className="shadow-sm border border-blue-50 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardBody className="p-6 space-y-3">
                <p className="font-black text-blue-800 text-base">⚔️ 戰爭消消樂比喻</p>
                <p className="text-sm text-blue-700 leading-relaxed">
                  把陣列看成戰場，每個數字是一個士兵。<strong>同一方的士兵互相支援（count +1）</strong>，
                  <strong>不同方的士兵互相抵消（count -1）</strong>。
                  當一個陣營的士兵全數陣亡（count = 0），換一個新的候選人繼續。
                  由於多數元素的數量<em>嚴格超過一半</em>，不管怎麼抵消，最後存活的候選人一定是它。
                </p>
              </CardBody>
            </Card>

            <CodeBlock
              title="#169 Majority Element — Boyer-Moore"
              code={`class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        candidate = None  # 當前候選人
        count = 0         # 候選人的「存活票數」

        for num in nums:
            if count == 0:
                # 上一個候選人全數陣亡，換人
                candidate = num
            # 同陣營 +1，不同陣營 -1
            count += (1 if num == candidate else -1)

        # 嚴格多數（> n/2）保證最後存活的就是答案
        return candidate`}
            />

            <Callout type="warn">
              <strong>適用前提</strong>：Boyer-Moore 只在「多數元素嚴格超過 n/2 次」時保證正確。
              如果題目改成「找出現最多次的元素（相對多數）」，就必須改用 HashMap 計數，不能用 Boyer-Moore。
            </Callout>

            <h4 className="font-black text-gray-800">延伸：#229 Majority Element II（找超過 n/3 的元素）</h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              超過 n/3 的元素最多只有 2 個，所以同時維護<strong>兩個候選人</strong>即可。
              這是 Boyer-Moore 的推廣形式——超過 n/k 的元素最多有 k-1 個，就維護 k-1 個候選人。
            </p>
            <CodeBlock
              title="#229 Majority Element II — 雙候選人 Boyer-Moore"
              code={`class Solution:
    def majorityElement(self, nums: list[int]) -> list[int]:
        # 初始化兩個候選人和各自的票數
        c1, c2, cnt1, cnt2 = None, None, 0, 0

        for num in nums:
            if num == c1:
                cnt1 += 1
            elif num == c2:
                cnt2 += 1
            elif cnt1 == 0:
                # c1 陣亡，換 c1
                c1, cnt1 = num, 1
            elif cnt2 == 0:
                # c2 陣亡，換 c2
                c2, cnt2 = num, 1
            else:
                # 兩個陣營都有士兵，遇到第三方就一起抵消
                cnt1 -= 1
                cnt2 -= 1

        # ⚠️ 第二次遍歷驗證（候選人不一定真的超過 n/3）
        result = []
        for c in [c1, c2]:
            if c is not None and nums.count(c) > len(nums) // 3:
                result.append(c)

        return result`}
            />
            <Callout type="info">
              第二次遍歷是必要的。第一輪只是「篩選出最有可能的候選人」，他們不一定真的超過 n/3。
              第二輪再確認每個候選人的實際出現次數，才能保證答案正確。
            </Callout>
          </div>

          {/* 2-2 LinkedList dummy_head */}
          <div className="space-y-5">
            <h3 className="text-xl font-black text-gray-900">2-2 鏈表虛擬頭節點（dummy_head）模式</h3>
            <p className="text-gray-700 leading-relaxed">
              在學習 #2 Add Two Numbers 時，我一開始想不通為什麼要額外建一個 dummy 節點——
              直接用 <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">head</code> 不行嗎？
            </p>

            <Card className="shadow-sm border border-gray-100">
              <CardBody className="p-6 space-y-4">
                <p className="font-black text-gray-700 text-sm uppercase tracking-widest">為什麼要用 dummy_head？</p>
                <div className="space-y-3">
                  {[
                    {
                      without: '沒有 dummy_head：第一個節點需要特別處理',
                      withDummy: '有 dummy_head：所有節點都用同一套邏輯 current.next = ListNode(val)',
                    },
                    {
                      without: '程式碼需要 if head is None 分支，容易出 bug',
                      withDummy: '不需要任何特殊判斷，程式碼更簡潔一致',
                    },
                  ].map((item, i) => (
                    <div key={i} className="grid grid-cols-2 gap-3">
                      <div className="bg-red-50 rounded-xl px-4 py-3 text-xs text-red-700">
                        <p className="font-bold mb-1">❌ 無 dummy</p>
                        <p className="leading-relaxed">{item.without}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl px-4 py-3 text-xs text-green-700">
                        <p className="font-bold mb-1">✅ 有 dummy</p>
                        <p className="leading-relaxed">{item.withDummy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <CodeBlock
              title="#2 Add Two Numbers — dummy_head 模式"
              code={`class Solution:
    def addTwoNumbers(self, l1, l2):
        # 建立虛擬頭節點：不存資料，只是為了讓後續邏輯統一
        dummy_head = ListNode(0)
        current = dummy_head  # current 指向當前要接新節點的位置
        carry = 0             # 進位值

        while l1 or l2 or carry:
            # 任一鏈表已走完，用 0 補位
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0

            total = val1 + val2 + carry
            carry = total // 10   # 新的進位
            digit = total % 10    # 當前位的數值

            # 直接接到 current.next，不需要判斷是否為第一個節點
            current.next = ListNode(digit)
            current = current.next

            # 兩個指針各自前進（有值就前進，None 就停著）
            if l1: l1 = l1.next
            if l2: l2 = l2.next

        # dummy_head 本身不是答案，從它的 next 才是真正的結果鏈表
        return dummy_head.next`}
            />

            <Callout type="tip">
              <strong>dummy_head 是鏈表題的萬用模板</strong>：凡是要建新鏈表或修改鏈表結構的題目，
              第一步先建 <code className="font-mono">dummy = ListNode(0)</code>、
              <code className="font-mono">current = dummy</code>，最後 return <code className="font-mono">dummy.next</code>。
              這個模式能消除大量邊界判斷。
            </Callout>
          </div>

          {/* 2-3 Hash Table 應用 */}
          <div className="space-y-5">
            <h3 className="text-xl font-black text-gray-900">2-3 哈希表應用：計數、分組、查找</h3>
            <p className="text-gray-700 leading-relaxed">
              #242 Valid Anagram 和 #49 Group Anagrams 都是哈希表的應用，但我在實作時遇到了兩個 Python 語法細節。
            </p>

            <div className="space-y-2">
              <p className="font-bold text-gray-700 text-sm">Python dict 計數的標準寫法</p>
              <CodeBlock
                title="dict-counting-patterns.py"
                code={`# ❌ 初學時的寫法：需要先判斷 key 存不存在
count = {}
for char in s:
    if char in count:
        count[char] += 1
    else:
        count[char] = 0  # ← 還有 bug，應該是 1

# ✅ 方法 1：dict.get(key, default) 預防 KeyError
count = {}
for char in s:
    count[char] = count.get(char, 0) + 1

# ✅ 方法 2：defaultdict(int) 預設值為 0
from collections import defaultdict
count = defaultdict(int)
for char in s:
    count[char] += 1

# ✅ 方法 3：Counter（最 Pythonic）
from collections import Counter
count = Counter(s)
# Counter('abc') → Counter({'a': 1, 'b': 1, 'c': 1})`}
              />
            </div>

            <Callout type="info">
              <strong>defaultdict vs dict</strong>：<code className="font-mono">defaultdict(list)</code> 代表
              「幫我建一個 dict，當 key 不存在時自動建一個空 list 作為預設值」。
              這在分組問題（Group Anagrams）裡特別方便，不需要先 <code className="font-mono">if key not in group: group[key] = []</code>。
            </Callout>
          </div>
        </section>

        <Divider />

        {/* 三、經典例題與程式碼復盤 */}
        <section className="space-y-12">
          <SectionTitle icon={<Code2 size={18} />} num="03">
            經典例題與程式碼復盤
          </SectionTitle>

          {/* 例題 1：#169 */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-black text-gray-900">#169 Majority Element</h3>
              <Chip size="sm" variant="flat" color="success">Easy</Chip>
            </div>

            <p className="text-gray-700 leading-relaxed">
              給定一個陣列，保證有一個元素出現次數超過 ⌊n/2⌋，找出它。
              從最暴力的解法一路演進到 O(1) 空間的 Boyer-Moore。
            </p>

            <ComplexityTable
              rows={[
                { method: '暴力排序取中', time: 'O(n log n)', space: 'O(log n)', note: '排序後中間必是多數元素' },
                { method: 'HashMap 計數', time: 'O(n)', space: 'O(n)', note: '直觀，適合先理解問題' },
                { method: 'Boyer-Moore 投票', time: 'O(n)', space: 'O(1)', note: '最優，需理解原理' },
              ]}
            />

            <h4 className="font-bold text-gray-700">解法 1：排序（暴力但直觀）</h4>
            <CodeBlock
              title="solution1-sort.py"
              code={`def majorityElement(nums):
    # 排序後，多數元素超過一半，所以中間位置一定是它
    nums.sort()
    return nums[len(nums) // 2]

# 時間：O(n log n)  空間：O(log n) (Python timsort 的遞迴棧)
# 優點：三行搞定，面試前三分鐘想不到其他解法時的保底`}
            />

            <h4 className="font-bold text-gray-700">解法 2：HashMap 計數</h4>
            <CodeBlock
              title="solution2-hashmap.py"
              code={`def majorityElement(nums):
    count = {}
    majority_count = len(nums) // 2

    for num in nums:
        count[num] = count.get(num, 0) + 1
        # 邊統計邊檢查，找到就直接回傳
        if count[num] > majority_count:
            return num

    # 題目保證一定有答案，不會走到這裡
    return -1

# 時間：O(n)  空間：O(n)
# 優點：通用，不依賴「絕對多數」的前提`}
            />

            <h4 className="font-bold text-gray-700">解法 3：Boyer-Moore（最優）</h4>
            <CodeBlock
              title="solution3-boyer-moore.py"
              code={`def majorityElement(nums):
    candidate = None
    count = 0

    for num in nums:
        if count == 0:
            # 舊候選人全軍覆沒，換人
            candidate = num
        count += (1 if num == candidate else -1)

    # 「絕對多數」保證：不管如何抵消，最後活下來的就是答案
    return candidate

# 時間：O(n)  空間：O(1)
# 限制：只有嚴格超過 n/2 才保證正確`}
            />
          </div>

          <Divider className="opacity-30" />

          {/* 例題 2：#347 */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-black text-gray-900">#347 Top K Frequent Elements</h3>
              <Chip size="sm" variant="flat" color="warning">Medium</Chip>
            </div>

            <p className="text-gray-700 leading-relaxed">
              給定一個陣列和整數 k，回傳出現頻率最高的 k 個元素。
              Follow-up 要求：時間複雜度必須優於 O(n log n)。
              這道題完美展示了演算法的三個層次。
            </p>

            <ComplexityTable
              rows={[
                { method: '全部排序', time: 'O(n log n)', space: 'O(n)', note: '不符合 Follow-up 要求' },
                { method: 'Min-Heap（堆）', time: 'O(n log k)', space: 'O(n + k)', note: 'k << n 時顯著優於排序' },
                { method: '桶排序（Bucket Sort）', time: 'O(n)', space: 'O(n)', note: '最優，利用頻率範圍固定' },
              ]}
            />

            <h4 className="font-bold text-gray-700">解法 1：全部排序（不符合 Follow-up）</h4>
            <CodeBlock
              title="solution1-sort.py"
              code={`from collections import Counter

def topKFrequent(nums, k):
    count = Counter(nums)
    # most_common(k) 內部用排序，O(n log n)
    return [num for num, _ in count.most_common(k)]`}
            />

            <h4 className="font-bold text-gray-700">解法 2：Min-Heap（符合 Follow-up）</h4>
            <CodeBlock
              title="solution2-heap.py"
              code={`from collections import Counter
import heapq

def topKFrequent(nums, k):
    count = Counter(nums)
    # 最簡寫法：heapq.nlargest 內部用 min-heap
    # 時間：O(n log k)  — 只維護大小為 k 的堆，而非 n
    return heapq.nlargest(k, count.keys(), key=lambda x: count[x])

# 手動 min-heap 的邏輯（理解原理用）：
# heap = []
# for num, freq in count.items():
#     if len(heap) < k:
#         heapq.heappush(heap, (freq, num))
#     elif freq > heap[0][0]:          # 比堆頂（最小頻率）大才換
#         heapq.heapreplace(heap, (freq, num))
# return [num for _, num in heap]`}
            />

            <h4 className="font-bold text-gray-700">解法 3：桶排序（O(n)，最優）</h4>
            <CodeBlock
              title="solution3-bucket-sort.py"
              code={`from collections import Counter

def topKFrequent(nums, k):
    count = Counter(nums)

    # 建立桶：index 代表頻率，最大頻率不超過 len(nums)
    # bucket[i] 裡存所有頻率為 i 的元素
    bucket = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        bucket[freq].append(num)

    # 從高頻率往低頻率收集，收集到 k 個就停
    result = []
    for i in range(len(bucket) - 1, -1, -1):
        result.extend(bucket[i])
        if len(result) >= k:
            return result[:k]  # 截取前 k 個

    return result

# 時間：O(n)  空間：O(n)
# 關鍵洞察：頻率的範圍是固定的 [1, n]，所以可以用桶排序`}
            />

            <Callout type="tip">
              <strong>為什麼桶排序能做到 O(n)？</strong><br />
              一般排序無法突破 O(n log n) 是因為「元素大小的範圍不確定」。
              但這題的「頻率」範圍是固定的——<em>最大只可能是 n（全部相同）</em>。
              範圍固定就能開一個大小為 n+1 的桶陣列，直接映射，不需要比較排序。
            </Callout>
          </div>
        </section>

        <Divider />

        {/* 四、易錯點與避坑指南 */}
        <section className="space-y-8">
          <SectionTitle icon={<AlertTriangle size={18} />} num="04">
            易錯點與避坑指南
          </SectionTitle>

          {/* 坑 1 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">Bug #1</Chip>
                <h4 className="font-black text-gray-800">Counter 迭代 ≠ 按頻率排序</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                我在做 #347 時，以為直接迭代 Counter 就能按頻率從高到低取，結果取到的是插入順序，不是頻率順序。
              </p>
              <CompareBlock
                badLabel="❌ 誤以為前 k 個就是最高頻"
                goodLabel="✅ 必須明確指定排序方式"
                bad={`from collections import Counter

def topKFrequent(nums, k):
    count = Counter(nums)
    result = []
    for num in count:        # ← 迭代順序是插入順序，不是頻率
        if k > 0:
            result.append(num)
            k -= 1
    return result            # ❌ 答案錯誤`}
                good={`from collections import Counter

def topKFrequent(nums, k):
    count = Counter(nums)
    # most_common(k) 才是按頻率由高到低
    return [num for num, _ in count.most_common(k)]`}
                note="Counter 繼承自 dict，Python 3.7+ dict 的迭代順序是插入順序。如果需要按頻率排序，必須用 .most_common(k) 或搭配 heapq.nlargest。"
              />
            </CardBody>
          </Card>

          {/* 坑 2 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">Bug #2</Chip>
                <h4 className="font-black text-gray-800">range(nums) 忘記 len()</h4>
              </div>
              <CompareBlock
                badLabel="❌ 對陣列呼叫 range()"
                goodLabel="✅ range(len(nums))"
                bad={`# 在 #26 Remove Duplicates 中犯的錯
def removeDuplicates(nums):
    slow = 0
    for fast in range(1, nums):  # ← TypeError: 'list' object cannot be
        ...                       #   interpreted as an integer`}
                good={`def removeDuplicates(nums):
    slow = 0
    for fast in range(1, len(nums)):  # ← len() 才能取得陣列長度
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1`}
                note="range() 需要整數，不能傳入 list 本身。這個錯誤在 Python 新手中非常常見，好在 Python 會立刻拋出 TypeError 而不是悄悄給錯誤答案。"
              />
            </CardBody>
          </Card>

          {/* 坑 3 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">Bug #3</Chip>
                <h4 className="font-black text-gray-800">defaultdict 用了錯誤的 key</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                在 #49 Group Anagrams 中，我計算了 key 之後，grouping 時卻把原始字串 i 當成了 key，
                導致每個字串都自成一組。
              </p>
              <CompareBlock
                badLabel="❌ 把 word 本身當 key"
                goodLabel="✅ 用計算出的 key 分組"
                bad={`from collections import defaultdict

def groupAnagrams(strs):
    group = defaultdict(list)
    for i in strs:
        key = ''.join(sorted(i))
        group[i].append(i)   # ❌ 用 i 當 key，每個字串都進自己的桶
    return list(group.values())`}
                good={`from collections import defaultdict

def groupAnagrams(strs):
    group = defaultdict(list)
    for word in strs:
        key = ''.join(sorted(word))
        group[key].append(word)  # ✅ 用排序後的 key 當作分組依據
    return list(group.values())`}
                note="計算 key 之後忘記用 key 分組——這種「算了但沒用到」的 bug 在 review 時很難發現，因為程式碼邏輯看起來是完整的。"
              />
            </CardBody>
          </Card>

          {/* 坑 4 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">Bug #4</Chip>
                <h4 className="font-black text-gray-800">Two Pointer 的指針更新順序</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                在 #26 中，我把 slow 的更新順序搞反了——應該「先移動 slow、再賦值」，
                否則會覆蓋掉 slow 指向的有效元素。
              </p>
              <CompareBlock
                badLabel="❌ 先賦值再移動（覆蓋有效元素）"
                goodLabel="✅ 先移動再賦值"
                bad={`for fast in range(1, len(nums)):
    if nums[fast] != nums[slow]:
        nums[slow] = nums[fast]  # ❌ 先蓋掉 slow 的值
        slow += 1                # 再移動已經太晚了`}
                good={`for fast in range(1, len(nums)):
    if nums[fast] != nums[slow]:
        slow += 1                # ✅ 先移動到下一個空位
        nums[slow] = nums[fast]  # 再填入新的不重複值`}
                note="Two Pointer 的 slow 指針語義是「下一個有效值要放的位置」。賦值之前要先讓 slow 前進一格，讓出空間。"
              />
            </CardBody>
          </Card>

          {/* 坑 5 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">Bug #5</Chip>
                <h4 className="font-black text-gray-800">Boyer-Moore 用在「相對多數」問題上</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Boyer-Moore 有一個不能突破的前提：目標元素必須<strong>嚴格超過 n/2</strong>（或 n/k）。
                如果題目只要求「找出現最多次的元素」，Boyer-Moore 可能給出錯誤答案。
              </p>
              <CodeBlock
                title="boyer-moore-limitation.py"
                code={`nums = [1, 1, 2, 2, 3]  # 1 和 2 各出現 2 次，沒有超過 n/2 的元素

# Boyer-Moore 的結果：
# i=0: candidate=1, count=1
# i=1: candidate=1, count=2
# i=2: candidate=1, count=1
# i=3: candidate=1, count=0
# i=4: candidate=3, count=1  ← 換成了 3！

# 回傳 3，但 3 只出現 1 次，明顯是錯的
# ✅ 這種情況必須用 Counter + max()`}
              />
              <Callout type="warn">
                面試時如果題目沒有明確說「保證存在超過 n/2 的元素」，用 Boyer-Moore 之前要先說明前提，
                否則可能在 edge case 上出錯。
              </Callout>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* 五、總結與延伸 */}
        <section className="space-y-6">
          <SectionTitle icon={<Target size={18} />} num="05">
            總結與延伸
          </SectionTitle>

          <Card className="shadow-sm border border-blue-100 bg-gradient-to-br from-blue-50/30 to-indigo-50/30">
            <CardBody className="p-7 space-y-5">
              <p className="font-black text-gray-800 text-base">這次學習的三個核心收穫</p>
              <div className="space-y-4">
                {[
                  {
                    icon: '⚔️',
                    title: 'Boyer-Moore 投票演算法',
                    body: '「消消樂戰爭」的比喻讓我真正理解它為什麼正確，而不只是背下程式碼。關鍵是記住它的限制：只適用於嚴格絕對多數。',
                  },
                  {
                    icon: '🎭',
                    title: 'dummy_head 是鏈表題的萬用模板',
                    body: '不只 #2，凡是需要建構或修改鏈表的題目，dummy_head + current + dummy.next 這三行幾乎是固定開頭。消除邊界條件的代價只是一個額外節點。',
                  },
                  {
                    icon: '🪣',
                    title: '桶排序突破 O(n log n) 的思路',
                    body: '當排序對象的範圍固定時，可以用空間換時間，用下標直接映射代替比較排序。#347 的桶是「頻率」，未來遇到類似的固定範圍問題可以套用。',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4">
                    <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-black text-gray-800 text-sm mb-1">{item.title}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" />
              <p className="font-black text-gray-800">推薦的延伸練習題</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  no: '#75',
                  title: 'Sort Colors',
                  desc: '三指針 Boyer-Moore 排序思想的直接應用，進一步鞏固多指針操作。',
                  tag: 'Two Pointer',
                  color: 'border-blue-100 bg-blue-50/30',
                },
                {
                  no: '#215',
                  title: 'Kth Largest Element in an Array',
                  desc: '同樣是 Top-K 問題，加入了 QuickSelect 解法，是 Heap 方法的進化版。',
                  tag: 'Heap / QuickSelect',
                  color: 'border-purple-100 bg-purple-50/30',
                },
                {
                  no: '#21',
                  title: 'Merge Two Sorted Lists',
                  desc: 'dummy_head 模式的最基本練習，把兩條鏈表合成一條。',
                  tag: 'Linked List',
                  color: 'border-green-100 bg-green-50/30',
                },
                {
                  no: '#229',
                  title: 'Majority Element II',
                  desc: '雙候選人的 Boyer-Moore，加上第二輪驗證，是 #169 的絕佳延伸。',
                  tag: 'Boyer-Moore',
                  color: 'border-amber-100 bg-amber-50/30',
                },
              ].map((p) => (
                <Card key={p.no} className={`border ${p.color} shadow-sm`}>
                  <CardBody className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-gray-400 text-xs">{p.no}</span>
                      <Chip size="sm" variant="flat" color="primary" className="text-[10px]">{p.tag}</Chip>
                    </div>
                    <p className="font-black text-gray-800 text-sm">{p.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-4">
          <Link href="/blog/leetcode-python-pitfalls">
            <Button
              variant="flat"
              startContent={<ArrowLeft size={16} />}
              className="font-bold text-gray-600 hover:text-gray-900"
            >
              Python 踩坑紀錄
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="flat" className="font-bold text-gray-600 hover:text-gray-900">
              所有文章
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
