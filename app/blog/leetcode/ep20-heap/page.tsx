'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';



const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

/* Heap 樹狀節點 */
const HeapNode = ({
  val,
  color = 'default',
}: {
  val: number | string;
  color?: 'default' | 'orange' | 'blue' | 'green' | 'red';
}) => {
  const colorMap: Record<string, string> = {
    default: 'bg-white border-gray-200 text-gray-700',
    orange:  'bg-orange-100 border-orange-400 text-orange-800',
    blue:    'bg-blue-100 border-blue-400 text-blue-800',
    green:   'bg-green-100 border-green-400 text-green-800',
    red:     'bg-red-100 border-red-400 text-red-800',
  };
  return (
    <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black text-sm ${colorMap[color]}`}>
      {val}
    </div>
  );
};

export default function LeetcodeEP20Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              30deg,
              rgba(251,146,60,0.5) 0, rgba(251,146,60,0.5) 1px,
              transparent 0, transparent 50%
            )`,
            backgroundSize: '22px 22px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-bold uppercase text-[10px]">
                LeetCode 刷題日記
              </Chip>
              <Chip size="sm" variant="flat" className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-bold uppercase text-[10px]">
                EP.20
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.20 — Heap：<br />
              <span className="text-orange-300">永遠能找到最大或最小</span>
            </h1>
            <p className="text-red-200 text-lg font-medium max-w-2xl mx-auto">
              #215 Kth Largest Element · #347 Top K Frequent · #295 Find Median from Data Stream<br />
              — heapq 實戰，從 K 大值到雙 Heap 中位數
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 text-orange-600 p-2.5 rounded-full">
              <User size={18} />
            </div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2026</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /><span>13 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /><span>3 題精講</span></div>
          </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            EP.17 的 Meeting Rooms II 用了 min-heap，EP.20 把 Heap 從頭到尾打透。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Heap（堆）是一種特殊的完全二元樹，保證<strong>根節點永遠是最大（max-heap）或最小（min-heap）值</strong>。
            插入和刪除都是 O(log n)，查看最大 / 最小值是 O(1)。
            這讓它成為所有「需要動態維護前 K 大/小」問題的首選。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Python 的 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">heapq</code> 只有 min-heap，
            但只要把值取負，就能模擬 max-heap——這是 Python 刷題最常見的技巧之一。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* Heap 基礎速查 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Python heapq 速查</h2>

          <CodeBlock
            title="heapq_cheatsheet.py"
            code={`import heapq

# === Min-Heap（預設）===
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)

heap[0]               # 查看最小值，O(1)  → 1
heapq.heappop(heap)   # 彈出最小值，O(log n) → 1

# 直接從 list 建 heap，O(n)（比逐一 push 快）
nums = [3, 1, 4, 1, 5]
heapq.heapify(nums)   # in-place，O(n)

# heapreplace：pop + push，比分開做快（只做一次 sift）
heapq.heapreplace(heap, new_val)

# === Max-Heap（用負值模擬）===
max_heap = []
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -1)
heapq.heappush(max_heap, -4)

-max_heap[0]          # 最大值 → 4
-heapq.heappop(max_heap)  # 彈出最大值 → 4

# === 帶 key 的元素（存 tuple）===
# tuple 比較從第一個元素開始，第一個相同才比第二個
heapq.heappush(heap, (freq, word))  # 先按 freq 排序`}
          />

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">操作</th>
                  <th className="text-left p-4 font-black text-gray-700">函式</th>
                  <th className="text-left p-4 font-black text-gray-700">複雜度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['查看堆頂（最小值）', 'heap[0]', 'O(1)'],
                  ['插入元素', 'heappush(heap, val)', 'O(log n)'],
                  ['彈出最小值', 'heappop(heap)', 'O(log n)'],
                  ['建堆（from list）', 'heapify(list)', 'O(n)'],
                  ['彈出最小 + 插入', 'heapreplace(heap, val)', 'O(log n)'],
                  ['取前 k 小', 'heapq.nsmallest(k, iterable)', 'O(n log k)'],
                  ['取前 k 大', 'heapq.nlargest(k, iterable)', 'O(n log k)'],
                ].map(([op, fn, cplx]) => (
                  <tr key={String(op)}>
                    <td className="p-4 text-gray-700">{op}</td>
                    <td className="p-4 font-mono text-xs text-orange-600">{fn}</td>
                    <td className="p-4 text-gray-500">{cplx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 1: Kth Largest ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏆</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 1 — Kth Largest Element</h2>
              <p className="text-gray-500 font-medium">#215 · Medium · 找第 K 大的元素</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個整數陣列和整數 k，找出陣列中第 k 大的元素（不是第 k 個不重複的）。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>nums = [3,2,1,5,6,4], k = 2  → 5</p>
                <p>nums = [3,2,3,1,2,4,5,5,6], k = 4  → 4</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">思路：維護一個大小為 k 的 min-heap</h3>
          <p className="text-gray-700 leading-relaxed">
            關鍵直覺：<strong>「第 k 大」= 最小的那個 heap 的頂端</strong>。
            維護一個大小恰好為 k 的 min-heap，裡面存的是目前見過的前 k 大元素。
            堆頂（最小值）就是第 k 大。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">nums=[3,2,1,5,6,4], k=2 的過程</p>
            <div className="space-y-3">
              {[
                { step: 'push 3', heap: '[3]',     size: 1, action: 'heap 小於 k，直接 push' },
                { step: 'push 2', heap: '[2, 3]',  size: 2, action: 'heap 小於 k，直接 push' },
                { step: 'push 1', heap: '[2, 3]',  size: 2, action: '1 ≤ heap[0]=2，比堆頂小，不用換，丟掉' },
                { step: 'push 5', heap: '[3, 5]',  size: 2, action: '5 > heap[0]=2，heapreplace：pop 2，push 5' },
                { step: 'push 6', heap: '[5, 6]',  size: 2, action: '6 > heap[0]=3，heapreplace：pop 3，push 6' },
                { step: 'push 4', heap: '[5, 6]',  size: 2, action: '4 ≤ heap[0]=5，丟掉' },
                { step: '結果',   heap: '[5, 6]',  size: 2, action: 'heap[0] = 5，即第 2 大 ✅' },
              ].map(({ step, heap, action }, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${step === '結果' ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-100'}`}>
                  <span className="text-xs font-black text-gray-400 w-16 shrink-0 font-mono">{step}</span>
                  <code className="text-xs font-mono text-orange-600 w-20 shrink-0">{heap}</code>
                  <p className={`text-xs ${step === '結果' ? 'text-green-700 font-bold' : 'text-gray-500'}`}>{action}</p>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="kth_largest.py"
            code={`import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    heap = []   # min-heap，大小維持在 k

    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)   # 彈出最小的，保留前 k 大

    return heap[0]   # 堆頂就是第 k 大

# 更簡潔的寫法：heapq.nlargest 直接搞定
def findKthLargest_v2(nums: list[int], k: int) -> int:
    return heapq.nlargest(k, nums)[-1]   # 前 k 大中最小的`}
          />
          <ComplexityBadge time="O(n log k)" space="O(k)" />

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <p className="font-black text-orange-800 mb-2">為什麼不直接排序？</p>
            <p className="text-orange-700 text-sm leading-relaxed">
              排序是 O(n log n)，heap 解法是 O(n log k)。當 k 遠小於 n 時（例如找前 10 大 out of 百萬筆），
              heap 明顯更快。而且 heap 支援<strong>串流資料</strong>——不需要一次拿到所有資料，
              可以邊接收新資料邊維護前 k 大，排序做不到這點。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 2: Top K Frequent ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 2 — Top K Frequent Elements</h2>
              <p className="text-gray-500 font-medium">#347 · Medium · 出現頻率前 K 高的元素</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個整數陣列，回傳出現頻率最高的前 k 個元素，答案可以任意順序。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>nums = [1,1,1,2,2,3], k = 2  → [1, 2]</p>
                <p>nums = [1], k = 1              → [1]</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">解法一：HashMap + Min-Heap（O(n log k)）</h3>
          <p className="text-gray-700 leading-relaxed">
            先用 Counter 統計頻率，再用大小為 k 的 min-heap 維護「頻率前 k 大的元素」。
            heap 裡存 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">(freq, num)</code> tuple，
            Python tuple 比較從第一個元素（freq）開始，完美符合需求。
          </p>

          <CodeBlock
            title="top_k_frequent_heap.py"
            code={`from collections import Counter
import heapq

def topKFrequent(nums: list[int], k: int) -> list[int]:
    # Step 1：統計頻率
    count = Counter(nums)   # {num: freq}

    # Step 2：min-heap（按頻率排），維持大小 k
    heap = []
    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)   # 踢掉頻率最低的

    return [num for freq, num in heap]

# nums=[1,1,1,2,2,3], k=2
# count = {1:3, 2:2, 3:1}
# 最終 heap = [(2,2), (3,1)]（頻率 2 和 3）
# 回傳 [2, 1]`}
          />
          <ComplexityBadge time="O(n log k)" space="O(n)" />

          <h3 className="text-xl font-black text-gray-900 mt-8">解法二：Bucket Sort（O(n)，面試加分）</h3>
          <p className="text-gray-700 leading-relaxed">
            頻率最大只有 n（所有元素都一樣），可以用「頻率當 index」的桶排序，
            把每個數字放進對應頻率的桶，再從高頻率桶往低頻率桶取 k 個元素。
          </p>

          <CodeBlock
            title="top_k_frequent_bucket.py"
            code={`def topKFrequent_bucket(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)

    # bucket[i] = 出現頻率恰好為 i 的所有元素
    bucket = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        bucket[freq].append(num)

    # 從高頻率往低頻率取，直到取夠 k 個
    result = []
    for freq in range(len(bucket) - 1, 0, -1):
        result.extend(bucket[freq])
        if len(result) >= k:
            return result[:k]

    return result

# nums=[1,1,1,2,2,3], k=2
# bucket[1]=[3], bucket[2]=[2], bucket[3]=[1]
# 從後往前：取 bucket[3]=[1] → result=[1]
#           取 bucket[2]=[2] → result=[1,2]，夠了！`}
          />
          <ComplexityBadge time="O(n)" space="O(n)" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-orange-800 text-sm">Heap 解法</p>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>✅ O(n log k)，通用性強</li>
                <li>✅ 支援串流資料</li>
                <li>✅ k 很小時特別快</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-red-800 text-sm">Bucket Sort 解法</p>
              <ul className="text-red-700 text-sm space-y-1">
                <li>✅ O(n)，理論最快</li>
                <li>✅ 面試說出來加分</li>
                <li>❕ 只適用於頻率有上限的場景</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 3: Find Median from Data Stream ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚖️</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 3 — Find Median from Data Stream</h2>
              <p className="text-gray-500 font-medium">#295 · Hard · 動態資料流的中位數</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                設計一個支援持續插入數字的資料結構，每次插入後都能在 O(log n) 內回傳當前所有數字的中位數。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>addNum(1) → addNum(2) → findMedian() → 1.5</p>
                <p>addNum(3) → findMedian() → 2.0</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">核心想法：兩個 Heap 夾住中位數</h3>
          <p className="text-gray-700 leading-relaxed">
            這是這篇最精妙的題目。用兩個 heap 把數字分成兩半：
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-blue-800">left：Max-Heap（較小的一半）</p>
              <p className="text-blue-700 text-sm leading-relaxed">
                存所有較小的數字，堆頂是其中最大的。
                Python 用負值模擬 max-heap。
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-orange-800">right：Min-Heap（較大的一半）</p>
              <p className="text-orange-700 text-sm leading-relaxed">
                存所有較大的數字，堆頂是其中最小的。
                標準 min-heap 即可。
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
            <p className="font-black text-gray-900 text-sm">兩個 Heap 的不變式</p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold text-gray-400 shrink-0">1.</span>
                <span><code className="bg-gray-100 px-1 rounded font-mono">left</code> 的所有元素 ≤ <code className="bg-gray-100 px-1 rounded font-mono">right</code> 的所有元素</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-gray-400 shrink-0">2.</span>
                <span>大小差最多 1：<code className="bg-gray-100 px-1 rounded font-mono">len(left)</code> 和 <code className="bg-gray-100 px-1 rounded font-mono">len(right)</code> 相差不超過 1</span>
              </li>
            </ul>
            <p className="text-gray-500 text-sm pt-1">
              維持這兩個不變式後，中位數就是：
              若兩側等長 → <code className="bg-gray-100 px-1 rounded font-mono">(-left[0] + right[0]) / 2</code>；
              若 left 多一個 → <code className="bg-gray-100 px-1 rounded font-mono">-left[0]</code>。
            </p>
          </div>

          {/* 視覺化 */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
            <p className="text-sm font-bold text-gray-500 uppercase">addNum(1, 2, 3) 的雙 Heap 狀態</p>
            <div className="space-y-4">
              {[
                {
                  step: 'addNum(1)',
                  left: [-1],
                  right: [],
                  leftShow: ['1'],
                  rightShow: [],
                  median: '1.0',
                  note: 'left 先 push，left 有多 → 不平衡，left 頂移到 right？不，left 可以多一個',
                },
                {
                  step: 'addNum(2)',
                  left: [-1],
                  right: [2],
                  leftShow: ['1'],
                  rightShow: ['2'],
                  median: '1.5',
                  note: '2 > left 頂 1，push 到 right。左右等長 → 中位數 = (1+2)/2 = 1.5',
                },
                {
                  step: 'addNum(3)',
                  left: [-2],
                  right: [3],
                  leftShow: ['2'],
                  rightShow: ['3'],
                  median: '2.0',
                  note: '3 先 push 到 right，right 多一個 → 把 right 頂 3 移到 left？不對，3>2。left 頂到 right。最終 left=[2], right=[3]，middle=2.0',
                },
              ].map(({ step, leftShow, rightShow, median, note }) => (
                <div key={step} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
                  <p className="font-black text-gray-900 text-sm">{step}</p>
                  <div className="flex items-end gap-8 flex-wrap">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-blue-500 uppercase">left（max-heap）</p>
                      <div className="flex gap-1">
                        {leftShow.length === 0
                          ? <span className="text-xs text-gray-300 italic">空</span>
                          : leftShow.map((v, i) => (
                            <HeapNode key={i} val={v} color={i === 0 ? 'blue' : 'default'} />
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center self-center pb-2">
                      <span className="text-2xl font-black text-gray-300">|</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-orange-500 uppercase">right（min-heap）</p>
                      <div className="flex gap-1">
                        {rightShow.length === 0
                          ? <span className="text-xs text-gray-300 italic">空</span>
                          : rightShow.map((v, i) => (
                            <HeapNode key={i} val={v} color={i === 0 ? 'orange' : 'default'} />
                          ))}
                      </div>
                    </div>
                    <div className="ml-auto self-center">
                      <span className="text-xs font-bold text-gray-400">中位數</span>
                      <p className="text-xl font-black text-green-600">{median}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="find_median_data_stream.py"
            code={`import heapq

class MedianFinder:
    def __init__(self):
        self.left  = []   # max-heap（存負值）：較小的一半
        self.right = []   # min-heap：較大的一半

    def addNum(self, num: int) -> None:
        # Step 1：先 push 到 left（max-heap）
        heapq.heappush(self.left, -num)

        # Step 2：確保 left 的最大值 ≤ right 的最小值
        if self.right and (-self.left[0]) > self.right[0]:
            val = -heapq.heappop(self.left)
            heapq.heappush(self.right, val)

        # Step 3：平衡大小，讓 left 最多比 right 多 1 個
        if len(self.left) > len(self.right) + 1:
            val = -heapq.heappop(self.left)
            heapq.heappush(self.right, val)
        elif len(self.right) > len(self.left):
            val = heapq.heappop(self.right)
            heapq.heappush(self.left, -val)

    def findMedian(self) -> float:
        if len(self.left) > len(self.right):
            return -self.left[0]             # left 多一個，它就是中位數
        return (-self.left[0] + self.right[0]) / 2.0   # 兩側等長，取平均`}
          />
          <ComplexityBadge time="addNum O(log n)，findMedian O(1)" space="O(n)" />

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <p className="font-black text-orange-800 mb-2">為什麼不直接用排序陣列？</p>
            <p className="text-orange-700 text-sm leading-relaxed">
              若用排序陣列，每次 addNum 插入需要 O(n)（保持排序），n 次操作就是 O(n²)。
              雙 Heap 方案讓每次 addNum 只需 O(log n)，findMedian O(1)，
              n 次操作總計 O(n log n)——差距在百萬筆資料時極為明顯。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 三題對比 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">三題統一對比</h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">題目</th>
                  <th className="text-left p-4 font-black text-gray-700">Heap 類型</th>
                  <th className="text-left p-4 font-black text-gray-700">Heap 大小</th>
                  <th className="text-left p-4 font-black text-gray-700">答案在哪</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold">#215 Kth Largest</td>
                  <td className="p-4 text-gray-600">Min-Heap</td>
                  <td className="p-4 font-mono text-xs text-gray-500">k</td>
                  <td className="p-4 text-gray-600"><code className="bg-gray-100 px-1 rounded font-mono text-xs">heap[0]</code></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#347 Top K Frequent</td>
                  <td className="p-4 text-gray-600">Min-Heap（按頻率）</td>
                  <td className="p-4 font-mono text-xs text-gray-500">k</td>
                  <td className="p-4 text-gray-600">heap 裡的所有元素</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#295 Find Median</td>
                  <td className="p-4 text-gray-600">Max-Heap + Min-Heap</td>
                  <td className="p-4 font-mono text-xs text-gray-500">n/2 各</td>
                  <td className="p-4 text-gray-600">兩堆堆頂的平均或左堆頂</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
            <p className="font-black text-orange-800 mb-3">識別 Heap 題目的訊號</p>
            <ul className="space-y-2 text-orange-700 text-sm">
              {[
                '「第 K 大 / 小」、「前 K 個最...」——大小固定為 k 的 heap',
                '「動態資料流」、「持續插入，隨時查詢最值」——heap 是唯一 O(log n) 的動態結構',
                '「中位數」——雙 heap（左 max + 右 min），堆頂夾住中位數',
                '需要反覆取最大或最小，且資料還在變化——優先考慮 heap，不要排序',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold mt-0.5">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-orange-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🔧', text: 'Python heapq 只有 min-heap；模擬 max-heap 只需把值取負後 push，pop 後再取負還原' },
                { emoji: '🏆', text: '#215 Kth Largest：維護大小 k 的 min-heap，踢掉超出的最小值，堆頂就是第 k 大' },
                { emoji: '📊', text: '#347 Top K Frequent：Counter 統計頻率，min-heap 按 (freq, num) 排序，bucket sort 可做到 O(n)' },
                { emoji: '⚖️', text: '#295 Find Median：左 max-heap + 右 min-heap，維護「左 ≤ 右」且大小差 ≤ 1 的不變式，中位數在兩堆堆頂' },
                { emoji: '💡', text: 'Heap vs 排序：動態資料 / 只需前 k 個 → heap O(n log k)；靜態一次性 → sort O(n log n) 程式碼更短' },
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
          <Link href="/blog/leetcode/ep19-trie" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.19 — Trie</p>
            <p className="text-sm text-gray-500 mt-1">Implement Trie、Add and Search、Replace Words</p>
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-400">EP.21 — 即將推出</p>
            <p className="text-sm text-gray-400 mt-1">敬請期待</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Heap', 'Priority Queue', 'Kth Largest', 'Top K', 'Median', 'Python', 'EP.20'].map((tag) => (
            <Chip key={tag} variant="flat" color="danger" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
