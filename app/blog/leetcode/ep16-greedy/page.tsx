'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

const ArrayViz = ({
  cells,
  highlights = {},
}: {
  cells: (number | string)[];
  highlights?: Record<number, 'green' | 'blue' | 'orange' | 'red' | 'gray'>;
}) => {
  const colorMap: Record<string, string> = {
    green:  'bg-green-100 border-green-400 text-green-800',
    blue:   'bg-blue-100 border-blue-400 text-blue-800',
    orange: 'bg-orange-100 border-orange-400 text-orange-800',
    red:    'bg-red-100 border-red-400 text-red-800',
    gray:   'bg-gray-100 border-gray-300 text-gray-400',
  };
  return (
    <div className="flex gap-1 flex-wrap">
      {cells.map((val, i) => {
        const color = highlights[i] ?? 'default';
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black text-sm
                ${colorMap[color] ?? 'bg-white border-gray-200 text-gray-700'}`}
            >
              {val}
            </div>
            <span className="text-[10px] text-gray-400 font-mono">[{i}]</span>
          </div>
        );
      })}
    </div>
  );
};

export default function LeetcodeEP16Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              rgba(244,63,94,0.4) 0, rgba(244,63,94,0.4) 1px,
              transparent 0, transparent 50%
            )`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-rose-500/20 text-rose-300 border-rose-500/30 font-bold uppercase text-[10px]">
                LeetCode 刷題日記
              </Chip>
              <Chip size="sm" variant="flat" className="bg-rose-500/20 text-rose-300 border-rose-500/30 font-bold uppercase text-[10px]">
                EP.16
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.16 — Greedy：<br />
              <span className="text-rose-300">每一步都選當下最好的</span>
            </h1>
            <p className="text-pink-200 text-lg font-medium max-w-2xl mx-auto">
              #55 Jump Game · #45 Jump Game II · #134 Gas Station<br />
              — 貪心演算法不是亂猜，是有數學保證的局部最優
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 text-rose-600 p-2.5 rounded-full">
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
            Backtracking 是「列出所有可能再找答案」，Greedy（貪心）則是反過來：
            <strong>每一步都直接選當下看起來最好的選擇，不回頭，不窮舉</strong>。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這聽起來很冒險——局部最優真的能推到全局最優嗎？多數情況下不行，
            但 Greedy 題目的設計保證了這件事成立。
            <strong>難點不是寫程式，而是想出「貪什麼」這個關鍵直覺。</strong>
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這篇用三道 Jump Game 家族 + Gas Station 把 Greedy 的核心思維打通。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* Greedy 思維 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Greedy 的思維方式</h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🔍',
                title: '找「貪心選擇」',
                desc: '在每個決策點，找一個局部最優的選擇，而且這個選擇不會讓全局答案變差。',
                color: 'bg-rose-50 border-rose-100',
              },
              {
                icon: '🚫',
                title: '不回頭',
                desc: '選了就選了，不像 DP 維護所有可能狀態，不像 Backtracking 撤銷再試。',
                color: 'bg-pink-50 border-pink-100',
              },
              {
                icon: '✅',
                title: '用反證法驗證',
                desc: '如果選了最大的 X，假設選更小的 Y 能更好，會矛盾嗎？若矛盾，貪心就是對的。',
                color: 'bg-red-50 border-red-100',
              },
            ].map((item) => (
              <div key={item.title} className={`border rounded-2xl p-5 ${item.color}`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-black text-gray-900 mb-2">{item.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-black text-gray-900 mb-2">Greedy vs DP：什麼時候用哪個？</p>
            <div className="space-y-2 text-gray-600 text-sm">
              <p>• <strong>Greedy</strong>：局部最優 = 全局最優（有數學保證），O(n) 或 O(n log n)</p>
              <p>• <strong>DP</strong>：局部最優不保證全局最優，需要維護所有子問題的解，O(n²) 或更高</p>
              <p>• 判斷方法：試著用反證法推，如果能證明 Greedy 選擇不會讓答案更差，就用 Greedy</p>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 1: Jump Game ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🐸</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 1 — Jump Game</h2>
              <p className="text-gray-500 font-medium">#55 · Medium · 能不能跳到終點？</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個非負整數陣列 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">nums</code>，
                你站在第 0 格，<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">nums[i]</code>
                代表你在第 i 格最多可以往右跳幾步。判斷能否到達最後一格。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>nums = [2,3,1,1,4] → True（0→1→4 或 0→2→3→4）</p>
                <p>nums = [3,2,1,0,4] → False（第 3 格必定卡住）</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">Greedy 直覺：維護「最遠能到哪」</h3>
          <p className="text-gray-700 leading-relaxed">
            不需要模擬每一種跳法，只需要在走過的每一格，更新「到目前為止能到達的最遠位置」。
            如果走到某格時，這格的 index 已經超過最遠位置，代表走不到這裡，回傳 False。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">nums = [2, 3, 1, 1, 4] 的過程</p>
            <div className="space-y-4">
              {[
                { i: 0, val: 2, max_reach: 2, note: 'i=0, nums[0]=2 → max_reach = max(0, 0+2) = 2' },
                { i: 1, val: 3, max_reach: 4, note: 'i=1, nums[1]=3 → max_reach = max(2, 1+3) = 4' },
                { i: 2, val: 1, max_reach: 4, note: 'i=2, nums[2]=1 → max_reach = max(4, 2+1) = 4' },
                { i: 3, val: 1, max_reach: 4, note: 'i=3, nums[3]=1 → max_reach = max(4, 3+1) = 4' },
                { i: 4, val: 4, max_reach: 4, note: 'i=4 ≤ max_reach=4 → 到達終點 ✅' },
              ].map(({ i, val, max_reach, note }) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0
                    ${i === 4 ? 'bg-green-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {i}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 font-mono text-xs">{note}</p>
                  </div>
                  <div className="shrink-0 text-xs font-bold text-gray-400">
                    max={max_reach}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-bold text-gray-700">卡住的情況（nums = [3,2,1,0,4]）：</p>
            <ArrayViz
              cells={[3, 2, 1, 0, 4]}
              highlights={{ 0: 'blue', 1: 'blue', 2: 'blue', 3: 'orange', 4: 'gray' }}
            />
            <p className="text-gray-500 text-sm">
              i=3 時 max_reach 只有 3，但從 index 3（值為 0）出發跳不到更遠，
              後面 i=4 時 4 {'>'} max_reach → False
            </p>
          </div>

          <CodeBlock
            title="jump_game.py"
            code={`def canJump(nums: list[int]) -> bool:
    max_reach = 0   # 目前能到達的最遠 index

    for i in range(len(nums)):
        if i > max_reach:       # 這格根本到不了
            return False
        max_reach = max(max_reach, i + nums[i])

    return True  # 走完所有可達格都沒卡住`}
          />
          <ComplexityBadge time="O(n)" space="O(1)" />

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
            <p className="font-black text-rose-800 mb-2">貪心保證：為什麼維護 max_reach 就夠了？</p>
            <p className="text-rose-700 text-sm leading-relaxed">
              因為我們不在意「怎麼到達」某一格，只在意「能不能到達」。
              只要某格在 max_reach 範圍內，就一定能到（可以從前面某個格跳過來）。
              所以追蹤「最遠能到哪裡」就完整地表達了所有可能的跳法。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 2: Jump Game II ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🚀</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 2 — Jump Game II</h2>
              <p className="text-gray-500 font-medium">#45 · Medium · 最少幾跳能到終點？</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                同樣的陣列設定，但這次保證一定能到達終點，問<strong>最少需要幾跳</strong>。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>nums = [2,3,1,1,4] → 2（0→1→4，跳 2 次）</p>
                <p>nums = [2,3,0,1,4] → 2（0→1→4）</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">思路：把每一跳視為一個「層」（BFS 概念）</h3>
          <p className="text-gray-700 leading-relaxed">
            這題的 Greedy 直覺很像 BFS 的層級：
            <strong>在當前這一跳能覆蓋的範圍裡，找到下一跳能到達的最遠位置。</strong>
            走到當前跳的邊界時，就必須跳一次，邊界更新為「下一跳能到的最遠」。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
            <p className="text-sm font-bold text-gray-500 uppercase">nums = [2, 3, 1, 1, 4]，模擬過程</p>

            <div className="space-y-3">
              {[
                {
                  label: '初始',
                  jumps: 0, cur_end: 0, far: 0,
                  note: '站在 index 0，0 跳，當前覆蓋邊界 = 0',
                  cells: [0],
                },
                {
                  label: '走 i=0',
                  jumps: 1, cur_end: 2, far: 2,
                  note: 'i=0，far = max(0, 0+2) = 2。i 到達 cur_end(0)，跳一次，cur_end → far = 2',
                  cells: [0, 1, 2],
                },
                {
                  label: '走 i=1,2',
                  jumps: 1, cur_end: 2, far: 4,
                  note: 'i=1，far = max(2, 1+3) = 4。i=2，far = max(4, 2+1) = 4。',
                  cells: [0, 1, 2, 3, 4],
                },
                {
                  label: 'i=2 到邊界',
                  jumps: 2, cur_end: 4, far: 4,
                  note: 'i(2) == cur_end(2)，再跳一次，cur_end → 4。已覆蓋終點 → 答案 = 2',
                  cells: [],
                },
              ].map(({ label, jumps, cur_end, far, note }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-gray-400 uppercase w-20 shrink-0">{label}</span>
                    <div className="flex gap-3 text-xs flex-wrap">
                      <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">jumps={jumps}</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">cur_end={cur_end}</span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">far={far}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed pl-24">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="jump_game_ii.py"
            code={`def jump(nums: list[int]) -> int:
    jumps = 0
    cur_end = 0   # 當前這一跳覆蓋的最遠邊界
    far = 0       # 在當前跳範圍內，下一跳能到的最遠位置

    for i in range(len(nums) - 1):   # 不需要走到最後一格
        far = max(far, i + nums[i])

        if i == cur_end:   # 走到邊界了，必須跳一次
            jumps += 1
            cur_end = far  # 邊界更新為下一跳能到的最遠

    return jumps`}
          />
          <ComplexityBadge time="O(n)" space="O(1)" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-rose-800 text-sm">為什麼不走最後一格？</p>
              <p className="text-rose-700 text-sm leading-relaxed">
                <code className="bg-rose-100 px-1 rounded font-mono">range(len(nums) - 1)</code>：
                到達倒數第二格後如果 cur_end 已經 ≥ 最後一格，就不用再跳了。
                多走一格會多算一跳。
              </p>
            </div>
            <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-pink-800 text-sm">和 #55 的差異</p>
              <p className="text-pink-700 text-sm leading-relaxed">
                #55 只問「能不能到」，只需要 max_reach。
                #45 問「最少幾跳」，需要額外追蹤「當前跳的邊界」來計算跳躍次數。
              </p>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 3: Gas Station ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⛽</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 3 — Gas Station</h2>
              <p className="text-gray-500 font-medium">#134 · Medium · 從哪個加油站出發能繞一圈？</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                n 個加油站排成一圈，
                <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">gas[i]</code> 是第 i 站的油量，
                <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">cost[i]</code> 是從第 i 站到第 i+1 站的耗油。
                找出能<strong>繞完整圈</strong>的起始站 index，若不存在回傳 -1。答案唯一。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>gas  = [1,2,3,4,5]</p>
                <p>cost = [3,4,5,1,2]</p>
                <p>→ 3（從 index 3 出發可繞一圈）</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">兩個關鍵觀察</h3>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
              <p className="font-black text-gray-900">觀察一：全局可行性判斷</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                如果 <code className="bg-gray-100 px-1 rounded font-mono">sum(gas) {'<'} sum(cost)</code>，
                無論從哪裡出發都走不完，直接回傳 -1。
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                反過來，只要 <code className="bg-gray-100 px-1 rounded font-mono">sum(gas) {'≥'} sum(cost)</code>，
                <strong>答案一定存在且唯一</strong>。這是這題最重要的數學保證。
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
              <p className="font-black text-gray-900">觀察二：局部失敗 → 重設起點</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                從某個起點 <code className="bg-gray-100 px-1 rounded font-mono">start</code> 出發，邊走邊累積油量差（<code className="bg-gray-100 px-1 rounded font-mono">tank += gas[i] - cost[i]</code>）。
                如果某一步 <code className="bg-gray-100 px-1 rounded font-mono">tank {'<'} 0</code>，代表從 start 到 i 之間任何一個起點都無法到達 i+1。
                <strong>直接把 start 設為 i+1，重新開始。</strong>
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                為什麼可以跳過 start 到 i 之間的所有點？
                因為如果從 start 出發到 i 都是虧的（tank {'<'} 0），那從 start 和 i 之間任何一個中間點出發，
                到 i 的時候油量只會更少（少了前段的正貢獻）。
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 overflow-x-auto">
            <p className="text-sm font-bold text-gray-500 uppercase">gas=[1,2,3,4,5], cost=[3,4,5,1,2] 模擬</p>
            <div className="space-y-2 text-xs font-mono">
              <div className="grid grid-cols-6 gap-2 font-bold text-gray-500">
                <span>i</span><span>gas[i]</span><span>cost[i]</span><span>diff</span><span>tank</span><span>動作</span>
              </div>
              {[
                [0, 1, 3, -2, -2, 'tank<0，start→1，tank=0'],
                [1, 2, 4, -2, -2, 'tank<0，start→2，tank=0'],
                [2, 3, 5, -2, -2, 'tank<0，start→3，tank=0'],
                [3, 4, 1,  3,  3, 'ok'],
                [4, 5, 2,  3,  6, 'ok，走完 → 回傳 start=3'],
              ].map(([i, g, c, d, t, note]) => (
                <div
                  key={String(i)}
                  className={`grid grid-cols-6 gap-2 p-2 rounded-lg ${
                    String(note).includes('tank<0') ? 'bg-red-50 text-red-600' :
                    String(note).includes('回傳') ? 'bg-green-50 text-green-700 font-bold' :
                    'text-gray-600'
                  }`}
                >
                  <span>{i}</span>
                  <span>{g}</span>
                  <span>{c}</span>
                  <span>{d}</span>
                  <span>{t}</span>
                  <span className="col-span-1 text-[10px]">{note}</span>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="gas_station.py"
            code={`def canCompleteCircuit(gas: list[int], cost: list[int]) -> int:
    # 全局判斷：油不夠就直接不可能
    if sum(gas) < sum(cost):
        return -1

    tank = 0
    start = 0

    for i in range(len(gas)):
        tank += gas[i] - cost[i]

        if tank < 0:       # 從 start 無法到達 i+1
            start = i + 1  # 重設起點
            tank = 0       # 重設油量

    return start`}
          />
          <ComplexityBadge time="O(n)" space="O(1)" />

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
            <p className="font-black text-rose-800 mb-2">為什麼最後的 start 一定是正確答案？</p>
            <p className="text-rose-700 text-sm leading-relaxed">
              因為我們已知 sum(gas) ≥ sum(cost)，答案存在。
              演算法從前往後找，每次 tank {'<'} 0 就把 start 往後移，
              最終剩下的 start 是「沒有被淘汰的最後一個候選起點」。
              而我們已經證明答案存在，所以這個候選點就是答案。
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
                  <th className="text-left p-4 font-black text-gray-700">貪什麼</th>
                  <th className="text-left p-4 font-black text-gray-700">維護的變數</th>
                  <th className="text-left p-4 font-black text-gray-700">複雜度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold">#55 Jump Game</td>
                  <td className="p-4 text-gray-600">每格都更新最遠可達位置</td>
                  <td className="p-4 font-mono text-xs text-gray-500">max_reach</td>
                  <td className="p-4 text-gray-500">O(n) / O(1)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#45 Jump Game II</td>
                  <td className="p-4 text-gray-600">在當前跳範圍內，最大化下一跳邊界</td>
                  <td className="p-4 font-mono text-xs text-gray-500">jumps, cur_end, far</td>
                  <td className="p-4 text-gray-500">O(n) / O(1)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#134 Gas Station</td>
                  <td className="p-4 text-gray-600">tank 變負時直接跳過所有可能的劣解起點</td>
                  <td className="p-4 font-mono text-xs text-gray-500">tank, start</td>
                  <td className="p-4 text-gray-500">O(n) / O(1)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-black text-gray-900 mb-3">識別 Greedy 題目的訊號</p>
            <ul className="space-y-2 text-gray-600 text-sm">
              {[
                '問最大值、最小值、最少次數、能否達成（而非所有可能）',
                '每一步的選擇不影響之前已確定的選擇（無後效性）',
                '直覺上「每次選最好的」能讓整體也最好',
                '暴力解是 O(n²) 或更高，但感覺一次掃描就夠了',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold mt-0.5">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-rose-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🧠', text: 'Greedy 難點在「貪什麼」，不是程式本身。要能用反證法說服自己局部最優 = 全局最優' },
                { emoji: '🐸', text: '#55 Jump Game：維護 max_reach，走到超出 max_reach 的格子就回傳 False' },
                { emoji: '🚀', text: '#45 Jump Game II：BFS 層的概念，走到 cur_end 邊界才跳一次，跳到 far 更新邊界' },
                { emoji: '⛽', text: '#134 Gas Station：sum(gas) < sum(cost) 直接 -1；tank < 0 就把 start 重設為 i+1' },
                { emoji: '⚡', text: '三題都是 O(n) 時間、O(1) 空間，這是 Greedy 相較 DP 最大的優勢' },
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
          <Link href="/blog/leetcode/ep15-backtracking" className="group block bg-gray-50 hover:bg-rose-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-rose-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-rose-600 transition-colors">EP.15 — Backtracking</p>
            <p className="text-sm text-gray-500 mt-1">Subsets、Permutations、Combination Sum</p>
          </Link>
          <Link href="/blog/leetcode/ep17-intervals" className="group block bg-gray-50 hover:bg-rose-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-rose-600 transition-colors">EP.17 — Intervals</p>
            <p className="text-sm text-gray-500 mt-1">Merge Intervals、Non-overlapping</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-rose-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Greedy', 'Jump Game', 'Gas Station', 'Python', 'EP.16'].map((tag) => (
            <Chip key={tag} variant="flat" color="danger" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
