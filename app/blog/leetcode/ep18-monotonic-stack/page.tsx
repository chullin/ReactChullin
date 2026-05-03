'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';



const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

/* 棒狀圖視覺化 */
const BarChart = ({
  values,
  highlights = {},
  labels,
}: {
  values: number[];
  highlights?: Record<number, 'blue' | 'orange' | 'green' | 'red' | 'gray' | 'cyan'>;
  labels?: string[];
}) => {
  const maxVal = Math.max(...values);
  const colorMap: Record<string, string> = {
    blue:   'bg-blue-400',
    orange: 'bg-orange-400',
    green:  'bg-green-400',
    red:    'bg-red-400',
    gray:   'bg-gray-200',
    cyan:   'bg-cyan-400',
  };
  return (
    <div className="flex items-end gap-1.5">
      {values.map((v, i) => {
        const color = highlights[i] ?? 'default';
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-gray-500">{v}</span>
            <div
              className={`w-8 rounded-t-md transition-all ${colorMap[color] ?? 'bg-gray-300'}`}
              style={{ height: `${(v / maxVal) * 80}px` }}
            />
            <span className="text-[10px] text-gray-400 font-mono">[{i}]</span>
            {labels && <span className="text-[9px] text-gray-400">{labels[i]}</span>}
          </div>
        );
      })}
    </div>
  );
};

/* Stack 狀態格 */
const StackState = ({ items, label }: { items: (number | string)[]; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-[10px] font-bold text-gray-400 uppercase">{label}</span>
    <div className="flex flex-col-reverse gap-0.5 min-h-[60px] justify-end">
      {items.length === 0
        ? <span className="text-[10px] text-gray-300 italic">空</span>
        : items.map((item, i) => (
          <div key={i} className="w-14 h-7 rounded-lg bg-cyan-100 border border-cyan-300 flex items-center justify-center font-mono text-xs font-bold text-cyan-700">
            {item}
          </div>
        ))}
    </div>
    <div className="w-14 h-0.5 bg-gray-300 rounded" />
  </div>
);

export default function LeetcodeEP18Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-900 via-sky-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(34,211,238,0.5) 0, rgba(34,211,238,0.5) 1px,
              transparent 0, transparent 50%
            )`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold uppercase text-[10px]">
                LeetCode 刷題日記
              </Chip>
              <Chip size="sm" variant="flat" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold uppercase text-[10px]">
                EP.18
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.18 — Monotonic Stack：<br />
              <span className="text-cyan-300">維持單調的 Stack</span>
            </h1>
            <p className="text-sky-200 text-lg font-medium max-w-2xl mx-auto">
              #739 Daily Temperatures · #496 Next Greater Element · #42 Trapping Rain Water<br />
              — 從 O(n²) 暴力到 O(n) 的關鍵資料結構
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-100 text-cyan-600 p-2.5 rounded-full">
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
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>14 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /> <span>3 題精講</span></div>
          </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            EP.06 學了基礎 Stack，這篇進階：<strong>Monotonic Stack（單調棧）</strong>。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Monotonic Stack 的概念很簡單——在 push 新元素之前，先把 stack 裡所有「不符合單調條件的元素」pop 出來。
            這個 pop 的動作不是多餘的，<strong>每個被 pop 出來的元素，都正好找到了它的「下一個更大值」</strong>。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這個模式能把許多 O(n²) 的「找下一個更大/更小」問題，降到 O(n)。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* 核心概念 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Monotonic Stack 是什麼？</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-cyan-800">單調遞增棧（底大頂小）</p>
              <p className="text-cyan-700 text-sm leading-relaxed">
                Stack 從底到頂值遞減（頂端永遠是最小的）。
                push 時，把所有比新元素<strong>大</strong>的 pop 掉。
                用來找「右邊第一個更大的元素」。
              </p>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-sky-800">單調遞減棧（底小頂大）</p>
              <p className="text-sky-700 text-sm leading-relaxed">
                Stack 從底到頂值遞增（頂端永遠是最大的）。
                push 時，把所有比新元素<strong>小</strong>的 pop 掉。
                用來找「右邊第一個更小的元素」。
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="font-black text-gray-900">通用框架</p>
            <CodeBlock
              title="monotonic_stack_template.py"
              code={`stack = []   # 存 index（不存值，方便計算距離）

for i, val in enumerate(nums):
    # 維護單調性：把不符合條件的 pop 出來
    while stack and nums[stack[-1]] < val:   # 找「下一個更大值」
        idx = stack.pop()
        # nums[idx] 的「右邊第一個更大值」就是 val（在 index i）
        result[idx] = i - idx   # 或其他計算

    stack.append(i)`}
            />
            <p className="text-gray-500 text-sm">
              <strong>關鍵</strong>：stack 裡存的通常是 <strong>index</strong>（不是值），因為我們往往需要計算距離或對應回原陣列的值。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 1: Daily Temperatures ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🌡️</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 1 — Daily Temperatures</h2>
              <p className="text-gray-500 font-medium">#739 · Medium · 幾天後會更暖？</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個每日氣溫陣列 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">temperatures</code>，
                回傳一個陣列 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">answer</code>，
                <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">answer[i]</code> 代表第 i 天之後幾天會迎來更高溫，若之後沒有更高溫則為 0。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>temperatures = [73,74,75,71,69,72,76,73]</p>
                <p>answer       = [1, 1, 4, 2, 1, 1, 0, 0]</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">視覺化：棒狀圖 + stack 變化</h3>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">temperatures = [73, 74, 75, 71, 69, 72, 76, 73]</p>
            <BarChart
              values={[73, 74, 75, 71, 69, 72, 76, 73]}
              highlights={{ 0: 'cyan', 1: 'cyan', 2: 'cyan', 5: 'orange', 6: 'green' }}
            />
            <div className="space-y-2 text-xs font-mono overflow-x-auto">
              <div className="grid grid-cols-4 gap-2 font-bold text-gray-400 min-w-max">
                <span>i / temp</span><span>動作</span><span>stack（index）</span><span>answer 更新</span>
              </div>
              {[
                ['i=0, 73', 'push 0', '[0]', '—'],
                ['i=1, 74', 'pop 0（74>73），push 1', '[1]', 'ans[0]=1-0=1'],
                ['i=2, 75', 'pop 1（75>74），push 2', '[2]', 'ans[1]=2-1=1'],
                ['i=3, 71', 'push 3', '[2,3]', '—'],
                ['i=4, 69', 'push 4', '[2,3,4]', '—'],
                ['i=5, 72', 'pop 4（72>69），pop 3（72>71），push 5', '[2,5]', 'ans[4]=5-4=1, ans[3]=5-3=2'],
                ['i=6, 76', 'pop 5（76>72），pop 2（76>75），push 6', '[6]', 'ans[5]=6-5=1, ans[2]=6-2=4'],
                ['i=7, 73', 'push 7', '[6,7]', '—'],
                ['結束', '剩餘 stack: [6,7]', '—', 'ans[6]=ans[7]=0'],
              ].map(([i, action, stack, upd]) => (
                <div key={i} className={`grid grid-cols-4 gap-2 p-2 rounded-lg min-w-max ${upd !== '—' ? 'bg-cyan-50 text-cyan-700' : 'text-gray-500'}`}>
                  <span className="font-bold">{i}</span>
                  <span>{action}</span>
                  <span className="font-mono">{stack}</span>
                  <span className={upd !== '—' ? 'font-bold' : ''}>{upd}</span>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="daily_temperatures.py"
            code={`def dailyTemperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    answer = [0] * n
    stack = []   # 存 index，單調遞減棧（棧頂是待找答案的最小溫度）

    for i, temp in enumerate(temperatures):
        # 當前溫度比棧頂高 → 棧頂找到了「下一個更高溫」
        while stack and temperatures[stack[-1]] < temp:
            idx = stack.pop()
            answer[idx] = i - idx   # 距離就是天數差

        stack.append(i)

    # stack 剩餘的 index 對應 answer 已預設為 0，不用處理
    return answer`}
          />
          <ComplexityBadge time="O(n)" space="O(n)" />

          <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5">
            <p className="font-black text-cyan-800 mb-2">為什麼是 O(n)？</p>
            <p className="text-cyan-700 text-sm leading-relaxed">
              每個 index 最多被 push 一次、pop 一次，所以 while 迴圈裡的所有 pop 操作加起來也是 O(n)。
              外層 for 迴圈 O(n)，總體 O(n)——這就是 Monotonic Stack 的威力。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 2: Next Greater Element I ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔭</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 2 — Next Greater Element I</h2>
              <p className="text-gray-500 font-medium">#496 · Easy · 找 nums2 中的下一個更大值</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">nums1</code> 是
                <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm"> nums2</code> 的子集。
                對 nums1 中的每個元素，找出它在 nums2 中右邊第一個更大的元素，若不存在回傳 -1。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>nums1 = [4,1,2],  nums2 = [1,3,4,2]</p>
                <p>Output: [-1,3,-1]</p>
                <p className="text-xs text-gray-400">4 的右邊沒有更大的 → -1；1 的右邊第一個更大的是 3；2 的右邊沒有更大的 → -1</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">思路：先預處理 nums2，再查表</h3>
          <p className="text-gray-700 leading-relaxed">
            這題的關鍵不是直接對 nums1 操作，而是先對 nums2 做一次 Monotonic Stack，
            建立一張「每個值 → 其下一個更大值」的 HashMap。
            然後對 nums1 的每個元素，直接查這張表就好。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">nums2 = [1, 3, 4, 2] 的預處理</p>
            <div className="space-y-2 text-xs font-mono">
              <div className="grid grid-cols-3 gap-2 font-bold text-gray-400">
                <span>i / val</span><span>動作</span><span>next_greater 更新</span>
              </div>
              {[
                ['i=0, 1', 'push 1', '—'],
                ['i=1, 3', 'pop 1（3>1），push 3', 'next_greater[1] = 3'],
                ['i=2, 4', 'pop 3（4>3），push 4', 'next_greater[3] = 4'],
                ['i=3, 2', 'push 2（2<4）', '—'],
                ['結束', '剩餘 [4, 2]', 'next_greater[4]=next_greater[2]=-1'],
              ].map(([i, action, upd]) => (
                <div key={i} className={`grid grid-cols-3 gap-2 p-2 rounded-lg ${upd !== '—' ? 'bg-cyan-50 text-cyan-700' : 'text-gray-500'}`}>
                  <span className="font-bold">{i}</span>
                  <span>{action}</span>
                  <span className={upd !== '—' ? 'font-bold' : ''}>{upd}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 pt-1">
              最終 HashMap：<code className="font-mono bg-gray-100 px-1 rounded">{'{1:3, 3:4, 4:-1, 2:-1}'}</code>
            </p>
          </div>

          <CodeBlock
            title="next_greater_element.py"
            code={`def nextGreaterElement(nums1: list[int], nums2: list[int]) -> list[int]:
    # Step 1：對 nums2 做 Monotonic Stack，建 HashMap
    next_greater = {}   # val → 右邊第一個更大值
    stack = []          # 單調遞減棧（存值）

    for val in nums2:
        while stack and stack[-1] < val:
            next_greater[stack.pop()] = val
        stack.append(val)

    # stack 剩餘的元素，右邊沒有更大值
    for val in stack:
        next_greater[val] = -1

    # Step 2：查表
    return [next_greater[x] for x in nums1]`}
          />
          <ComplexityBadge time="O(n + m)" space="O(n)" />

          <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
            <p className="font-black text-gray-900 text-sm">和 #739 的差異</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              #739 存的是 <strong>index</strong>（因為需要計算距離 <code className="bg-gray-100 px-1 rounded font-mono">i - idx</code>）；
              #496 存的是 <strong>值本身</strong>（只需要查「這個值對應的下一個更大值」，不需要位置資訊）。
              根據需求決定 stack 存 index 還是值，是 Monotonic Stack 最常見的判斷點。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 3: Trapping Rain Water ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🌧️</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 3 — Trapping Rain Water</h2>
              <p className="text-gray-500 font-medium">#42 · Hard · 接了多少雨水？</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個表示地形高度的陣列，計算下雨後整個地形能接住多少單位的雨水。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>height = [0,1,0,2,1,0,1,3,1,0,1,2]</p>
                <p>Output: 6</p>
              </div>
            </CardBody>
          </Card>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-gray-500 uppercase">高度示意（height = [0,1,0,2,1,0,1,3,1,0,1,2]）</p>
            <BarChart
              values={[0, 1, 0, 2, 1, 0, 1, 3, 1, 0, 1, 2]}
              highlights={{ 7: 'cyan', 3: 'orange', 11: 'orange' }}
            />
            <p className="text-xs text-gray-400">橘色：左右最高牆；藍色：最高柱。中間低窪處可接水</p>
          </div>

          <h3 className="text-xl font-black text-gray-900">解法一：Two Pointers（推薦記這個）</h3>
          <p className="text-gray-700 leading-relaxed">
            每個位置能接的水量 = <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">min(左邊最高, 右邊最高) - 自身高度</code>。
            用左右兩個指針，從低的那側往中間走，始終能保證當前那側的「最高牆」是確定的。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-gray-500 uppercase">Two Pointers 直覺</p>
            <div className="space-y-2 text-gray-600 text-sm">
              <p>• left 指向左端，right 指向右端，left_max 和 right_max 追蹤各側見過的最大值</p>
              <p>• 若 <code className="bg-gray-100 px-1 rounded font-mono">height[left] {'<'} height[right]</code>：左側牆較矮，左側積水量由 left_max 決定</p>
              <p className="pl-4">→ 積水 = <code className="bg-gray-100 px-1 rounded font-mono">left_max - height[left]</code>，left 右移</p>
              <p>• 反之，處理右側，right 左移</p>
            </div>
          </div>

          <CodeBlock
            title="trapping_rain_water_two_pointers.py"
            code={`def trap(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]     # 更新左側最高牆
            else:
                water += left_max - height[left]   # 積水！
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]   # 更新右側最高牆
            else:
                water += right_max - height[right]  # 積水！
            right -= 1

    return water`}
          />
          <ComplexityBadge time="O(n)" space="O(1)" />

          <h3 className="text-xl font-black text-gray-900 mt-8">解法二：Monotonic Stack</h3>
          <p className="text-gray-700 leading-relaxed">
            用單調遞減棧，當遇到比棧頂更高的柱子時，就可以計算「兩個較高柱子夾著中間凹陷」能接的水量。
            這是<strong>橫向計算積水</strong>（一層一層算），Two Pointers 是縱向（一列一列算）。兩種思路都正確。
          </p>

          <CodeBlock
            title="trapping_rain_water_stack.py"
            code={`def trap(height: list[int]) -> int:
    stack = []   # 單調遞減棧，存 index
    water = 0

    for i, h in enumerate(height):
        while stack and height[stack[-1]] < h:
            mid = stack.pop()               # 凹槽的底部

            if not stack:
                break                       # 左邊沒有牆，積不了水

            left = stack[-1]                # 左牆
            width = i - left - 1            # 凹槽寬度
            bounded_height = min(height[left], h) - height[mid]  # 可積水高度
            water += width * bounded_height

        stack.append(i)

    return water`}
          />
          <ComplexityBadge time="O(n)" space="O(n)" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-cyan-800 text-sm">Two Pointers</p>
              <ul className="text-cyan-700 text-sm space-y-1">
                <li>✅ O(1) 空間，更優</li>
                <li>✅ 程式碼更短，更直觀</li>
                <li>✅ 面試首選解法</li>
              </ul>
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-sky-800 text-sm">Monotonic Stack</p>
              <ul className="text-sky-700 text-sm space-y-1">
                <li>✅ 思維框架和其他題一致</li>
                <li>✅ 橫向計算，適合變形題</li>
                <li>❕ O(n) 空間</li>
              </ul>
            </div>
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
                  <th className="text-left p-4 font-black text-gray-700">Stack 存什麼</th>
                  <th className="text-left p-4 font-black text-gray-700">pop 時做什麼</th>
                  <th className="text-left p-4 font-black text-gray-700">複雜度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold">#739 Daily Temperatures</td>
                  <td className="p-4 font-mono text-xs text-gray-600">index</td>
                  <td className="p-4 text-gray-600"><code className="bg-gray-100 px-1 rounded font-mono text-xs">ans[idx] = i - idx</code></td>
                  <td className="p-4 text-gray-500">O(n) / O(n)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#496 Next Greater Element</td>
                  <td className="p-4 font-mono text-xs text-gray-600">值</td>
                  <td className="p-4 text-gray-600"><code className="bg-gray-100 px-1 rounded font-mono text-xs">map[val] = cur_val</code></td>
                  <td className="p-4 text-gray-500">O(n+m) / O(n)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#42 Trapping Rain Water</td>
                  <td className="p-4 font-mono text-xs text-gray-600">index</td>
                  <td className="p-4 text-gray-600">計算左牆右牆夾住的積水面積</td>
                  <td className="p-4 text-gray-500">O(n) / O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6">
            <p className="font-black text-cyan-800 mb-3">識別 Monotonic Stack 題目的訊號</p>
            <ul className="space-y-2 text-cyan-700 text-sm">
              {[
                '「找右邊（或左邊）第一個更大/更小的元素」',
                '「計算每個元素作為最大/最小值時能影響的範圍」',
                '暴力解是兩層 for loop O(n²)，但感覺「每個元素只會被處理一次」',
                'stack 裡的元素一直在「等待」找到自己的答案（被 pop 時就是找到答案的時刻）',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold mt-0.5">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-cyan-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '📚', text: 'Monotonic Stack 的核心：push 前把不符合單調性的元素 pop 出來，被 pop 的元素「此刻就找到了答案」' },
                { emoji: '🌡️', text: '#739 Daily Temperatures：Stack 存 index，pop 時 ans[idx] = i - idx，O(n) 解決 O(n²) 問題' },
                { emoji: '🔭', text: '#496 Next Greater Element：先對 nums2 建 HashMap，再對 nums1 查表；Stack 存值（不用知道位置）' },
                { emoji: '🌧️', text: '#42 Trapping Rain Water：Two Pointers 是首選（O(1) 空間）；Monotonic Stack 解法思維更統一' },
                { emoji: '💡', text: 'Stack 存 index 還是值？需要計算距離或回查陣列 → 存 index；只需記錄「這個值的答案」→ 存值' },
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
          <Link href="/blog/leetcode/ep17-intervals" className="group block bg-gray-50 hover:bg-cyan-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-cyan-600 transition-colors">EP.17 — Intervals</p>
            <p className="text-sm text-gray-500 mt-1">Merge、Non-overlapping、Meeting Rooms II</p>
          </Link>
          
          <Link href="/blog/leetcode/ep19-trie" className="group block bg-gray-50 hover:bg-cyan-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="ml-auto mb-3 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-cyan-600 transition-colors">EP.19 — Trie</p>
            <p className="text-sm text-gray-500 mt-1">Implement Trie、Add and Search</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Monotonic Stack', 'Daily Temperatures', 'Next Greater', 'Trapping Rain Water', 'Python', 'EP.18'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
