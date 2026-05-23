import { FadeIn } from '@/components/blog/ScrollAnimation';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EP.20 — Heap：從 Top K Frequent 到 heapq 底層 | Joseph Chen',
  description: '#347 Top K Frequent Elements — 從 Counter.most_common、串列生成式、heapq.nlargest，一路理解 heappush、heappop 與 binary heap 結構',
  alternates: {
    canonical: 'https://chullin.tw/blog/leetcode/ep20-heap',
  },
};

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold">Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-bold">Space: {space}</span>
  </div>
);

const HeapNode = ({
  val,
  color = 'default',
}: {
  val: number | string;
  color?: 'default' | 'orange' | 'blue' | 'green' | 'red';
}) => {
  const colorMap: Record<string, string> = {
    default: 'bg-white border-gray-200 text-gray-700',
    orange: 'bg-orange-100 border-orange-400 text-orange-800',
    blue: 'bg-blue-100 border-blue-400 text-blue-800',
    green: 'bg-green-100 border-green-400 text-green-800',
    red: 'bg-red-100 border-red-400 text-red-800',
  };

  return (
    <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-black text-xs text-center leading-tight ${colorMap[color]}`}>
      {val}
    </div>
  );
};

const learningPath = [
  ['1', '先解題', 'Counter(nums).most_common(k)', '先拿到能過題目的版本，建立 Top K Frequent 的問題感。'],
  ['2', '整理答案', '[num for num, freq in ...]', '用串列生成式把 tuple 清成 LeetCode 需要的答案格式。'],
  ['3', '看往底層', 'heapq.nlargest(k, ...)', '不用 most_common 時，改用 heap 思維取前 k 大。'],
  ['4', '手刻 nlargest', 'heappush / heappop', '理解 heap 如何只保留最有價值的 k 個元素。'],
  ['5', '看結構', 'binary heap', '把 list index 和完全二元樹對起來，理解 heapq 為什麼能 O(log k)。'],
] as const;

const heapSteps = [
  { step: 'push (3, 1)', heap: ['(3,1)'], action: '1 出現 3 次，heap 還沒滿，直接放入。' },
  { step: 'push (2, 2)', heap: ['(2,2)', '(3,1)'], action: '2 出現 2 次，heap 大小剛好到 k=2。' },
  { step: 'push (1, 3)', heap: ['(1,3)', '(3,1)', '(2,2)'], action: '3 出現 1 次，先 push 進來檢查。' },
  { step: 'pop', heap: ['(2,2)', '(3,1)'], action: 'heap 超過 k，pop 掉頻率最小的 (1,3)。' },
  { step: 'result', heap: ['(2,2)', '(3,1)'], action: 'heap 裡剩下的就是頻率最高的 2 個元素：2 和 1。' },
] as const;

export default function LeetcodeEP20Page() {
  return (
    <div className="bg-white min-h-screen">
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
          <FadeIn>
            <div className="flex justify-center gap-2 mb-5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 font-bold uppercase text-[10px]">
                LeetCode 刷題日記
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 font-bold uppercase text-[10px]">
                EP.20
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.20 — Heap：<br />
              <span className="text-orange-300">從 Top K Frequent 往底層理解</span>
            </h1>
            <p className="text-red-200 text-lg font-medium max-w-2xl mx-auto">
              #347 Top K Frequent Elements<br />
              從 Counter.most_common、串列生成式、heapq.nlargest，到 binary heap 長什麼樣子
            </p>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">
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
            <div className="flex items-center gap-1.5"><Clock size={16} /><span>12 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /><span>1 題深挖</span></div>
          </div>
        </div>

        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            我第一次真正碰到 Heap，不是從資料結構課本開始，而是從 <strong>#347 Top K Frequent Elements</strong> 開始。
            題目問的是：給一串數字，找出出現頻率最高的前 k 個元素。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            一開始我其實沒有想到 Heap。最直覺的做法是：先用 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">Counter</code> 統計每個數字出現幾次，
            再用 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">most_common(k)</code> 直接拿前 k 高頻的元素。
            這個解法很好懂，也很適合當作這篇文章的起點。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            但如果只停在 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">most_common()</code>，會知道「怎麼用」，卻不一定知道「底層為什麼可以做到」。
            所以這篇會照著我的學習路線：先從能過題目的寫法開始，再往下看 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">heapq.nlargest()</code>，
            最後自己用 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">heappush</code> 和 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">heappop</code> 實作一次。
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">這篇文章的學習順序</h2>
          <div className="space-y-3">
            {learningPath.map(([no, title, code, desc]) => (
              <div key={no} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
                  {no}
                </div>
                <div className="space-y-1">
                  <p className="font-black text-gray-900">{title}</p>
                  <code className="text-xs font-mono text-orange-600">{code}</code>
                  <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <p className="font-black text-orange-800 mb-2">我覺得這個順序更適合初學者</p>
            <p className="text-orange-700 text-sm leading-relaxed">
              因為它不是一開始就丟出抽象的 Heap 定義，而是先從你真的遇到的題目和 Python 函式開始。
              讀者會先知道「這題到底要解什麼」，再逐步理解「為什麼 Top K 問題會需要 Heap」。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30" />

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Step 1 — 用 Counter 統計頻率</h2>
            <p className="text-gray-500 font-medium mt-2">先把「每個數字出現幾次」算出來</p>
          </div>

          <CodeBlock
            title="counter_basic.py"
            code={`from collections import Counter

nums = [1, 1, 1, 2, 2, 3]
count = Counter(nums)

print(count)
# Counter({1: 3, 2: 2, 3: 1})`}
          />

          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">Counter</code> 可以把 iterable 裡的元素拿來計數。
            在這題裡，key 是數字本身，value 是出現次數。
            所以 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">Counter([1,1,1,2,2,3])</code> 會得到
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">1:3, 2:2, 3:1</code>。
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">用法</th>
                  <th className="text-left p-4 font-black text-gray-700">意思</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-mono text-xs text-orange-600">Counter(nums)</td>
                  <td className="p-4 text-gray-600">統計 nums 裡每個元素出現幾次</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-xs text-orange-600">count[1]</td>
                  <td className="p-4 text-gray-600">查詢 1 出現幾次，這裡會得到 3</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-xs text-orange-600">count.items()</td>
                  <td className="p-4 text-gray-600">取得所有 (num, freq)，例如 (1, 3)、(2, 2)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Step 2 — most_common(k) 直接拿前 k 高頻</h2>
            <p className="text-gray-500 font-medium mt-2">這是最直覺，也最適合先理解題目的寫法</p>
          </div>

          <CodeBlock
            title="top_k_most_common.py"
            code={`from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    top_k = count.most_common(k)

    return [num for num, freq in top_k]

# nums = [1,1,1,2,2,3], k = 2
# count.most_common(2) -> [(1, 3), (2, 2)]
# return [1, 2]`}
          />
          <ComplexityBadge time="O(n log n) 或依實作優化" space="O(n)" />

          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">most_common(k)</code> 會回傳一個 list，
            裡面每個元素都是 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">(元素, 次數)</code> 的 tuple，
            並且已經按照次數由高到低排列。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">拆開看</p>
            <div className="space-y-3">
              {[
                ['Counter(nums)', 'Counter({1: 3, 2: 2, 3: 1})'],
                ['count.most_common(2)', '[(1, 3), (2, 2)]'],
                ['[num for num, freq in top_k]', '[1, 2]'],
              ].map(([left, right]) => (
                <div key={left} className="grid gap-2 rounded-xl border border-gray-100 bg-white p-4 sm:grid-cols-[180px_1fr]">
                  <code className="text-xs font-mono text-orange-600">{left}</code>
                  <code className="text-xs font-mono text-gray-500">{right}</code>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Step 3 — 串列生成式怎麼理解？</h2>
            <p className="text-gray-500 font-medium mt-2">把「迴圈產生新 list」寫成一行</p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">most_common(k)</code> 回傳的是
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">[(num, freq), ...]</code>，
            但 LeetCode 要的答案通常只需要數字本身，所以要把每個 tuple 裡的 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">num</code> 抽出來。
          </p>

          <CodeBlock
            title="list_comprehension.py"
            code={`top_k = [(1, 3), (2, 2)]

# 寫法一：一般 for loop
result = []
for num, freq in top_k:
    result.append(num)

# 寫法二：串列生成式
result = [num for num, freq in top_k]

# result = [1, 2]`}
          />

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <p className="font-black text-orange-800 mb-2">串列生成式的閱讀方式</p>
            <p className="text-orange-700 text-sm leading-relaxed">
              <code className="bg-white/70 px-1 rounded font-mono">[num for num, freq in top_k]</code> 可以讀成：
              「對 top_k 裡的每一組 (num, freq)，我只把 num 放進新的 list」。
              前面的 <code className="bg-white/70 px-1 rounded font-mono">num</code> 是你要收集的結果，
              後面的 <code className="bg-white/70 px-1 rounded font-mono">for num, freq in top_k</code> 是資料從哪裡來。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30" />

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Step 4 — 不用 most_common，改用 heapq.nlargest</h2>
            <p className="text-gray-500 font-medium mt-2">這一步開始進入 Heap 思維</p>
          </div>

          <CodeBlock
            title="top_k_nlargest.py"
            code={`from collections import Counter
import heapq

def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)

    return heapq.nlargest(
        k,
        count.keys(),
        key=lambda num: count[num],
    )

# count.keys()              -> dict_keys([1, 2, 3])
# key=lambda num: count[num] -> 用出現次數當作比較標準
# heapq.nlargest(...)       -> 回傳出現次數最大的 k 個 key`}
          />
          <ComplexityBadge time="O(n log k)" space="O(n)" />

          <p className="text-gray-700 leading-relaxed">
            這段程式的重點是 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">key</code>。
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">heapq.nlargest(k, iterable, key=...)</code> 不是直接比較元素本身，
            而是先把元素丟進 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">key</code> 函式，拿回來的值才是排序和比較依據。
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">片段</th>
                  <th className="text-left p-4 font-black text-gray-700">意思</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-mono text-xs text-orange-600">k</td>
                  <td className="p-4 text-gray-600">要取前幾大的元素</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-xs text-orange-600">count.keys()</td>
                  <td className="p-4 text-gray-600">候選元素，也就是所有不重複的數字</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-xs text-orange-600">key=lambda num: count[num]</td>
                  <td className="p-4 text-gray-600">比較時看的是 num 的出現頻率，不是 num 的大小</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Step 5 — 自己實作 heapq.nlargest</h2>
            <p className="text-gray-500 font-medium mt-2">用 heappush / heappop 維護最頂端的 k 個值</p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            要理解 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">nlargest</code>，核心就是一句話：
            <strong>用一個大小最多為 k 的 min-heap，保存目前看過的前 k 大元素。</strong>
            因為 heap 頂端永遠是這 k 個元素裡最小的，所以一旦 heap 超過 k，就把最小的 pop 掉。
          </p>

          <CodeBlock
            title="manual_nlargest.py"
            code={`import heapq

def my_nlargest(k, iterable, key=lambda x: x):
    heap = []

    for item in iterable:
        score = key(item)
        heapq.heappush(heap, (score, item))

        if len(heap) > k:
            heapq.heappop(heap)

    return [item for score, item in heap]

def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    return my_nlargest(k, count.keys(), key=lambda num: count[num])`}
          />

          <p className="text-gray-700 leading-relaxed">
            這裡 heap 裡放的是 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">(score, item)</code>。
            對 #347 來說，<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">score</code> 就是出現頻率，
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">item</code> 就是數字本身。
            Python tuple 比較會先比第一個值，所以 heap 會自動用頻率維持大小順序。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">nums=[1,1,1,2,2,3], k=2 的 heap 維護過程</p>
            <div className="space-y-3">
              {heapSteps.map(({ step, heap, action }) => (
                <div key={step} className={`rounded-xl border p-4 ${step === 'result' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <span className="w-24 shrink-0 text-xs font-black text-gray-400 font-mono">{step}</span>
                    <code className="text-xs font-mono text-orange-600">[{heap.join(', ')}]</code>
                  </div>
                  <p className={`mt-2 text-sm ${step === 'result' ? 'text-green-700 font-bold' : 'text-gray-500'}`}>{action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Step 6 — Binary Heap 長什麼樣子？</h2>
            <p className="text-gray-500 font-medium mt-2">heapq 表面上是 list，邏輯上是一棵完全二元樹</p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Python 的 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">heapq</code> 不會真的建立 TreeNode。
            它底層就是一個 list，但用 index 關係把 list 當成 binary tree 來看。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <HeapNode val="(2,2)" color="orange" />
              </div>
              <div className="mx-auto h-6 w-px bg-gray-300" />
              <div className="flex justify-center gap-12">
                <HeapNode val="(3,1)" color="default" />
                <HeapNode val="(4,4)" color="default" />
              </div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <code className="text-sm text-gray-600">heap = [(2, 2), (3, 1), (4, 4)]</code>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-gray-100 p-5">
              <p className="font-black text-gray-900">parent</p>
              <code className="text-xs text-orange-600 font-mono">(i - 1) // 2</code>
            </div>
            <div className="rounded-2xl border border-gray-100 p-5">
              <p className="font-black text-gray-900">left child</p>
              <code className="text-xs text-orange-600 font-mono">2 * i + 1</code>
            </div>
            <div className="rounded-2xl border border-gray-100 p-5">
              <p className="font-black text-gray-900">right child</p>
              <code className="text-xs text-orange-600 font-mono">2 * i + 2</code>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Min-heap 的規則是：每個 parent 都要小於或等於自己的 children。
            所以 list 的第 0 個位置永遠是整個 heap 裡最小的元素。
            當我們維護「前 k 大」時，這個最小值就是目前 Top K 裡最弱的那個。
          </p>

          <CodeBlock
            title="heap_push_pop_intuition.py"
            code={`# heappush：先放到最後，再往上調整
heapq.heappush(heap, (1, 3))

# heappop：拿走 heap[0]，把最後一個補到 root，再往下調整
smallest = heapq.heappop(heap)

# 所以每次調整只會走樹高
# 完全二元樹高度約為 log k
# 因此 heappush / heappop 都是 O(log k)`}
          />
        </section>

        <hr className="border-gray-100 opacity-30" />

        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-black text-gray-900">延伸：如果不是查最大，而是查最小呢？</h2>
            <p className="text-gray-500 font-medium mt-2">Top K 類型可以分成 Top K Largest 和 Top K Smallest</p>
          </div>

          <CodeBlock
            title="largest_vs_smallest.py"
            code={`import heapq

nums = [5, 1, 9, 3, 7]

# 查前 k 大
largest = heapq.nlargest(2, nums)
# [9, 7]

# 查前 k 小
smallest = heapq.nsmallest(2, nums)
# [1, 3]`}
          />

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">需求</th>
                  <th className="text-left p-4 font-black text-gray-700">直覺寫法</th>
                  <th className="text-left p-4 font-black text-gray-700">自己維護 heap 時</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold">找前 k 大</td>
                  <td className="p-4 font-mono text-xs text-orange-600">heapq.nlargest(k, nums)</td>
                  <td className="p-4 text-gray-600">用大小 k 的 min-heap，超過 k 就 pop 最小</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">找前 k 小</td>
                  <td className="p-4 font-mono text-xs text-orange-600">heapq.nsmallest(k, nums)</td>
                  <td className="p-4 text-gray-600">可用 max-heap 概念，Python 常用負值模擬</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-orange-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                'Counter 負責統計頻率，most_common(k) 可以直接取前 k 高頻元素。',
                '串列生成式可以把 [(num, freq), ...] 轉成 LeetCode 要的 [num, ...]。',
                'heapq.nlargest(k, iterable, key=...) 可以用指定的 key 取前 k 大。',
                '手刻 nlargest 的核心是大小為 k 的 min-heap，超過 k 就 pop 掉目前最小的。',
                'heapq 底層是 list，但邏輯上是一棵完全二元樹，因此 push/pop 是 O(log k)。',
              ].map((text, i) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-orange-700">{i + 1}</span>
                  <span className="text-gray-700 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50" />

        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/leetcode/ep19-trie" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.19 — Trie</p>
            <p className="text-sm text-gray-500 mt-1">Implement Trie、Add and Search、Replace Words</p>
          </Link>
          <Link href="/blog/leetcode/ep21-bit-manipulation" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="ml-auto mb-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.21 — Bit Manipulation</p>
            <p className="text-sm text-gray-500 mt-1">XOR、位移、Counting Bits</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Heap', 'Priority Queue', 'Top K', 'Counter', 'heapq', 'Python', 'EP.20'].map((tag) => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
}
