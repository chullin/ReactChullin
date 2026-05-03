'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

/* 區間條視覺化元件 */
const IntervalBar = ({
  label,
  start,
  end,
  total = 10,
  color = 'blue',
  merged = false,
  removed = false,
}: {
  label: string;
  start: number;
  end: number;
  total?: number;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'violet' | 'gray';
  merged?: boolean;
  removed?: boolean;
}) => {
  const colorMap: Record<string, string> = {
    blue:   'bg-blue-400',
    green:  'bg-green-400',
    orange: 'bg-orange-400',
    red:    'bg-red-400',
    violet: 'bg-violet-400',
    gray:   'bg-gray-300',
  };
  const width = ((end - start) / total) * 100;
  const left = (start / total) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-mono text-gray-500 w-24 shrink-0 text-right">{label}</span>
      <div className="flex-1 relative h-6 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`absolute h-full rounded-full transition-all ${colorMap[color]} ${removed ? 'opacity-30' : 'opacity-80'}`}
          style={{ left: `${left}%`, width: `${width}%` }}
        />
      </div>
      <span className={`text-xs font-mono w-14 shrink-0 ${removed ? 'text-red-400 line-through' : 'text-gray-500'}`}>
        [{start},{end}]
      </span>
      {merged && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">合併</span>}
      {removed && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">移除</span>}
    </div>
  );
};

export default function LeetcodeEP17Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-violet-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(129,140,248,0.5) 0, rgba(129,140,248,0.5) 1px,
              transparent 0, transparent 50%
            )`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-bold uppercase text-[10px]">
                LeetCode 刷題日記
              </Chip>
              <Chip size="sm" variant="flat" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-bold uppercase text-[10px]">
                EP.17
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.17 — Intervals：<br />
              <span className="text-indigo-300">先排序，再掃一遍</span>
            </h1>
            <p className="text-violet-200 text-lg font-medium max-w-2xl mx-auto">
              #56 Merge Intervals · #435 Non-overlapping Intervals · #253 Meeting Rooms II<br />
              — 所有區間題的共同鑰匙：按 start 排序
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-full">
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
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>12 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /> <span>3 題精講</span></div>
          </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            區間（Interval）題是 LeetCode 的一個獨立類型，出現頻率高、變化多，
            但所有題目幾乎都藏著同一把鑰匙：<strong>先把區間按 start 排序，再用一次線性掃描解決問題。</strong>
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            排序之後，重疊判斷就變成只看「當前區間的 start 和前一個區間的 end」——
            不需要兩兩比較，複雜度從 O(n²) 降到 O(n log n)。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這篇用三道題把這個思路吃透。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* 核心概念：重疊判斷 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">前置：區間重疊的判斷條件</h2>
          <p className="text-gray-700 leading-relaxed">
            兩個區間 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">[a, b]</code> 和
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm"> [c, d]</code>（假設 a ≤ c）：
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-3">
              <p className="font-black text-red-800">重疊：b ≥ c</p>
              <div className="space-y-2">
                <IntervalBar label="[1, 4]" start={1} end={4} color="blue" />
                <IntervalBar label="[3, 6]" start={3} end={6} color="orange" />
              </div>
              <p className="text-red-700 text-xs font-mono">b=4 ≥ c=3 → 重疊，合併後 [1,6]</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 space-y-3">
              <p className="font-black text-green-800">不重疊：b {'<'} c</p>
              <div className="space-y-2">
                <IntervalBar label="[1, 2]" start={1} end={2} color="blue" />
                <IntervalBar label="[4, 6]" start={4} end={6} color="green" />
              </div>
              <p className="text-green-700 text-xs font-mono">b=2 {'<'} c=4 → 不重疊，各自獨立</p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
            <p className="font-black text-indigo-800 mb-2">排序後為什麼只需要看相鄰的？</p>
            <p className="text-indigo-700 text-sm leading-relaxed">
              按 start 排序後，如果 i 和 i+2 重疊，那 i 和 i+1 一定也重疊（因為 start[i+1] ≤ start[i+2]）。
              所以只要一個個和「前一個處理完的區間」比較就夠了，不需要兩兩比較所有組合。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 1: Merge Intervals ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔗</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 1 — Merge Intervals</h2>
              <p className="text-gray-500 font-medium">#56 · Medium · 合併所有重疊的區間</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一組區間陣列，合併所有重疊的區間，回傳不重疊的區間陣列。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>Input:  [[1,3],[2,6],[8,10],[15,18]]</p>
                <p>Output: [[1,6],[8,10],[15,18]]</p>
                <p className="text-gray-400 text-xs">（[1,3] 和 [2,6] 重疊，合併成 [1,6]）</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">視覺化：排序後逐一掃描</h3>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-gray-500 uppercase">排序前</p>
            <div className="space-y-2">
              <IntervalBar label="[1,3]"   start={1}  end={3}  total={20} color="blue" />
              <IntervalBar label="[2,6]"   start={2}  end={6}  total={20} color="orange" />
              <IntervalBar label="[8,10]"  start={8}  end={10} total={20} color="violet" />
              <IntervalBar label="[15,18]" start={15} end={18} total={20} color="green" />
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase mt-4">排序後（已按 start 排好，結果一樣）→ 掃描合併</p>
            <div className="space-y-2">
              <IntervalBar label="[1,6]"   start={1}  end={6}  total={20} color="blue"   merged />
              <IntervalBar label="[8,10]"  start={8}  end={10} total={20} color="violet" />
              <IntervalBar label="[15,18]" start={15} end={18} total={20} color="green" />
            </div>
          </div>

          <h3 className="text-xl font-black text-gray-900">演算法步驟</h3>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            {[
              { step: '1', title: '按 start 排序', desc: 'intervals.sort(key=lambda x: x[0])' },
              { step: '2', title: '把第一個區間加入 result', desc: 'result = [intervals[0]]' },
              { step: '3', title: '逐一處理後面每個區間', desc: '和 result 最後一個比較：若重疊就更新 end（取較大值），否則直接 append' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                  {step}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{title}</p>
                  <code className="text-xs text-gray-500 font-mono">{desc}</code>
                </div>
              </div>
            ))}
          </div>

          <CodeBlock
            title="merge_intervals.py"
            code={`def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])   # 按 start 排序
    result = [intervals[0]]

    for start, end in intervals[1:]:
        last_end = result[-1][1]

        if start <= last_end:             # 重疊：start 在前一個 end 之前（或相等）
            result[-1][1] = max(last_end, end)   # 更新 end 為較大值
        else:                             # 不重疊：直接加入
            result.append([start, end])

    return result

# [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]`}
          />
          <ComplexityBadge time="O(n log n)" space="O(n)" />

          <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
            <p className="font-black text-gray-900 text-sm">為什麼更新 end 要取 max？</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              考慮 <code className="bg-gray-100 px-1 rounded font-mono">[[1,10],[2,3]]</code>，後者完全被前者包含。
              排序後處理 [2,3] 時，<code className="bg-gray-100 px-1 rounded font-mono">last_end=10 {'>'} end=3</code>，
              若直接用 end 更新就錯了。<code className="bg-gray-100 px-1 rounded font-mono">max(last_end, end)</code> 確保不會縮短。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 2: Non-overlapping Intervals ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">✂️</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 2 — Non-overlapping Intervals</h2>
              <p className="text-gray-500 font-medium">#435 · Medium · 最少移除幾個區間讓剩下的不重疊？</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一組區間，找出需要移除的<strong>最少區間數量</strong>，使得剩餘的區間互不重疊。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>Input:  [[1,2],[2,3],[3,4],[1,3]]</p>
                <p>Output: 1（移除 [1,3]，剩下三個互不重疊）</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">Greedy 直覺：遇到重疊，優先保留 end 較小的</h3>
          <p className="text-gray-700 leading-relaxed">
            遇到兩個重疊的區間，要移除哪一個？
            <strong>移除 end 較大的那個</strong>——因為 end 越大，它越可能和後面的區間繼續重疊，留著麻煩更多。
            等價地：保留 end 最小的，讓「已確定的邊界」盡量靠左，給後面的區間更多空間。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">按 end 排序後的掃描過程（input: [[1,2],[1,3],[2,3],[3,4]]）</p>
            <div className="space-y-3">
              {[
                { interval: '[1,2]', action: '加入，cur_end = 2', color: 'green' as const, removed: false },
                { interval: '[1,3]', action: 'start=1 ≤ cur_end=2，重疊！移除（end 較大的 [1,3]）', color: 'red' as const, removed: true },
                { interval: '[2,3]', action: 'start=2 ≤ cur_end=2，重疊！移除', color: 'red' as const, removed: true },
                { interval: '[3,4]', action: 'start=3 > cur_end=2，不重疊，加入，cur_end = 4', color: 'green' as const, removed: false },
              ].map(({ interval, action, color, removed }) => (
                <div key={interval} className={`flex items-start gap-3 p-3 rounded-xl ${removed ? 'bg-red-50' : 'bg-green-50'}`}>
                  <span className={`text-xs font-mono font-bold shrink-0 w-12 ${removed ? 'text-red-500 line-through' : 'text-green-600'}`}>
                    {interval}
                  </span>
                  <p className={`text-sm ${removed ? 'text-red-600' : 'text-green-700'}`}>{action}</p>
                </div>
              ))}
              <p className="text-sm font-bold text-gray-500 pt-1">移除 2 個 → 答案：2</p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
            <p className="font-black text-indigo-800 mb-2">⚠️ 這題按 end 排序，不是按 start！</p>
            <p className="text-indigo-700 text-sm leading-relaxed">
              按 end 排序是為了讓「最早結束的區間」優先被保留。
              這和 Merge Intervals 的按 start 排序不同，是這題最容易搞錯的地方。
              口訣：<strong>想保留最多區間 → 按 end 排序，貪心保留最早結束的。</strong>
            </p>
          </div>

          <CodeBlock
            title="non_overlapping_intervals.py"
            code={`def eraseOverlapIntervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda x: x[1])   # 按 end 排序！
    removed = 0
    cur_end = float('-inf')              # 目前保留的最後一個區間的 end

    for start, end in intervals:
        if start < cur_end:              # 重疊（start 在 cur_end 之前）
            removed += 1                 # 移除這個（end 較大的，因為已排序）
            # cur_end 不更新：繼續保留前一個 end 較小的
        else:                            # 不重疊：保留，更新 cur_end
            cur_end = end

    return removed`}
          />
          <ComplexityBadge time="O(n log n)" space="O(1)" />

          <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
            <p className="font-black text-gray-900 text-sm">為什麼 cur_end 用 -inf 初始化？</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              確保第一個區間一定被保留（<code className="bg-gray-100 px-1 rounded font-mono">start {'>'} -inf</code> 永遠成立）。
              也可以直接 <code className="bg-gray-100 px-1 rounded font-mono">cur_end = intervals[0][1]</code> 從第二個開始，效果相同。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 3: Meeting Rooms II ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📅</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 3 — Meeting Rooms II</h2>
              <p className="text-gray-500 font-medium">#253 · Medium · 最少需要幾間會議室？</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一組會議的時間區間，找出同時進行的會議最多有幾場，即<strong>最少需要幾間會議室</strong>。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>intervals = [[0,30],[5,10],[15,20]]</p>
                <p>→ 2（[0,30] 和 [5,10] 同時進行，需要 2 間）</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">解法一：Min-Heap（最直觀）</h3>
          <p className="text-gray-700 leading-relaxed">
            把「正在進行的會議的結束時間」放進 min-heap。
            處理新會議時，如果 heap 頂端（最早結束的那場）已經結束，就可以釋放那間會議室，
            否則就得開新房間。Heap 的大小就是當前需要的會議室數。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">intervals = [[0,30],[5,10],[15,20]]，按 start 排序後掃描</p>
            <div className="space-y-3">
              {[
                {
                  meeting: '[0,30]',
                  heap: '[30]',
                  rooms: 1,
                  note: 'Heap 空，直接開新房間，push end=30',
                },
                {
                  meeting: '[5,10]',
                  heap: '[10, 30]',
                  rooms: 2,
                  note: 'start=5 < heap[0]=30，有重疊，再開一間，push end=10',
                },
                {
                  meeting: '[15,20]',
                  heap: '[20, 30]',
                  rooms: 2,
                  note: 'start=15 > heap[0]=10，[5,10] 已結束，pop 10，push 20。房間數不變',
                },
              ].map(({ meeting, heap, rooms, note }) => (
                <div key={meeting} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-black text-indigo-600 font-mono">{meeting}</span>
                    <span className="text-xs text-gray-400">heap: <code className="font-mono">{heap}</code></span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rooms === 2 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                      需要 {rooms} 間
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="meeting_rooms_ii_heap.py"
            code={`import heapq

def minMeetingRooms(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0

    intervals.sort(key=lambda x: x[0])   # 按 start 排序
    heap = []   # min-heap，存放「正在進行的會議的結束時間」

    for start, end in intervals:
        if heap and heap[0] <= start:
            # 最早結束的那場會議已結束，釋放會議室（替換成新的 end）
            heapq.heapreplace(heap, end)
        else:
            # 沒有可用的會議室，新開一間
            heapq.heappush(heap, end)

    return len(heap)   # heap 大小 = 最多同時進行的會議數`}
          />
          <ComplexityBadge time="O(n log n)" space="O(n)" />

          <h3 className="text-xl font-black text-gray-900 mt-8">解法二：事件掃描線（更優雅）</h3>
          <p className="text-gray-700 leading-relaxed">
            把每個區間的 start 和 end 分開，視為「+1（有人進來）」和「-1（有人離開）」的事件，
            排序後掃描，追蹤同時在場的最大人數。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-gray-500 uppercase">事件列表（intervals=[[0,30],[5,10],[15,20]]）</p>
            <div className="space-y-1 font-mono text-xs">
              {[
                ['t=0',  '+1', '進入 [0,30]',  'count=1'],
                ['t=5',  '+1', '進入 [5,10]',  'count=2  ← max'],
                ['t=10', '-1', '離開 [5,10]',  'count=1'],
                ['t=15', '+1', '進入 [15,20]', 'count=2  ← max'],
                ['t=20', '-1', '離開 [15,20]', 'count=1'],
                ['t=30', '-1', '離開 [0,30]',  'count=0'],
              ].map(([t, delta, desc, count]) => (
                <div key={t} className={`grid grid-cols-4 gap-2 p-2 rounded-lg ${delta === '+1' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'}`}>
                  <span className="font-bold">{t}</span>
                  <span className={`font-black ${delta === '+1' ? 'text-blue-600' : 'text-gray-400'}`}>{delta}</span>
                  <span>{desc}</span>
                  <span className={`font-bold ${count.includes('max') ? 'text-orange-600' : ''}`}>{count}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">重點：t=10 離開和 t=10 進入同一時刻，先處理離開（-1 在前）</p>
          </div>

          <CodeBlock
            title="meeting_rooms_ii_sweep.py"
            code={`def minMeetingRooms(intervals: list[list[int]]) -> int:
    events = []
    for start, end in intervals:
        events.append((start, 1))    # 會議開始：+1
        events.append((end, -1))     # 會議結束：-1

    # 排序：同時刻時，-1（結束）排在 +1（開始）之前
    # 避免「上一場 10 點結束、下一場 10 點開始」被算成重疊
    events.sort(key=lambda x: (x[0], x[1]))

    count = 0
    max_rooms = 0
    for _, delta in events:
        count += delta
        max_rooms = max(max_rooms, count)

    return max_rooms`}
          />
          <ComplexityBadge time="O(n log n)" space="O(n)" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-indigo-800 text-sm">Min-Heap 解法適合</p>
              <ul className="text-indigo-700 text-sm space-y-1">
                <li>• 面試最常見，概念直觀</li>
                <li>• 可以延伸追蹤「哪間房間被分配出去」</li>
                <li>• heapq 操作 O(log n)</li>
              </ul>
            </div>
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-violet-800 text-sm">掃描線解法適合</p>
              <ul className="text-violet-700 text-sm space-y-1">
                <li>• 程式碼更短、更優雅</li>
                <li>• 延伸到「任意時刻有多少人在場」</li>
                <li>• 概念通用，可解很多類似問題</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 三題統一對比 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">三題統一對比</h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">題目</th>
                  <th className="text-left p-4 font-black text-gray-700">排序依據</th>
                  <th className="text-left p-4 font-black text-gray-700">核心操作</th>
                  <th className="text-left p-4 font-black text-gray-700">複雜度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold">#56 Merge Intervals</td>
                  <td className="p-4 text-gray-600">按 <code className="font-mono bg-gray-100 px-1 rounded">start</code> 升序</td>
                  <td className="p-4 text-gray-600">重疊則更新 result 最後一個的 end</td>
                  <td className="p-4 text-gray-500">O(n log n) / O(n)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#435 Non-overlapping</td>
                  <td className="p-4 text-gray-600">按 <code className="font-mono bg-gray-100 px-1 rounded">end</code> 升序</td>
                  <td className="p-4 text-gray-600">重疊則移除（count++），保留 end 較小的</td>
                  <td className="p-4 text-gray-500">O(n log n) / O(1)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#253 Meeting Rooms II</td>
                  <td className="p-4 text-gray-600">按 <code className="font-mono bg-gray-100 px-1 rounded">start</code> 升序</td>
                  <td className="p-4 text-gray-600">min-heap 追蹤 end，heap size = 房間數</td>
                  <td className="p-4 text-gray-500">O(n log n) / O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
            <p className="font-black text-indigo-800 mb-3">記憶口訣</p>
            <div className="space-y-2 text-indigo-700 text-sm">
              <p>• <strong>合併區間</strong>（Merge）→ 按 start 排，更新 end 取 max</p>
              <p>• <strong>最少移除</strong>（Non-overlapping）→ 按 end 排，貪心保留最早結束的</p>
              <p>• <strong>最多房間</strong>（Meeting Rooms II）→ 按 start 排 + min-heap 追蹤 end，或掃描線 +1/-1</p>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🔑', text: '所有區間題的共同鑰匙：先排序（按 start 或 end），再一次線性掃描，複雜度 O(n log n)' },
                { emoji: '🔗', text: '#56 Merge Intervals：按 start 排，重疊就更新 result 最後一個的 end（取 max 避免縮短）' },
                { emoji: '✂️', text: '#435 Non-overlapping：按 end 排，遇到重疊移除 end 較大的，保留最早結束的區間' },
                { emoji: '📅', text: '#253 Meeting Rooms II：min-heap 追蹤進行中會議的 end，heap size 就是所需房間數' },
                { emoji: '⚡', text: '掃描線法（+1/-1 事件）是更通用的框架，可解「任意時刻同時進行幾件事」類問題' },
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
          <Link href="/blog/leetcode/ep16-greedy" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">EP.16 — Greedy</p>
            <p className="text-sm text-gray-500 mt-1">Jump Game、Gas Station</p>
          </Link>
          
          <Link href="/blog/leetcode/ep18-monotonic-stack" className="group block bg-gray-50 hover:bg-cyan-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="ml-auto mb-3 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-cyan-600 transition-colors">EP.18 — Monotonic Stack</p>
            <p className="text-sm text-gray-500 mt-1">Daily Temperatures、Next Greater</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Intervals', 'Merge', 'Greedy', 'Heap', '掃描線', 'Python', 'EP.17'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
