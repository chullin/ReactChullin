'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

const TreeRow = ({ items }: { items: { label: string; color?: string; indent?: number }[] }) => (
  <div className="flex items-center gap-2 flex-wrap">
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-1" style={{ marginLeft: item.indent ? item.indent * 16 : 0 }}>
        {item.indent ? <span className="text-gray-300 font-mono text-xs">{'└─'}</span> : null}
        <span className={`px-3 py-1 rounded-lg font-mono text-xs font-bold border ${
          item.color === 'green' ? 'bg-green-100 border-green-300 text-green-700' :
          item.color === 'teal' ? 'bg-teal-100 border-teal-300 text-teal-700' :
          item.color === 'gray' ? 'bg-gray-100 border-gray-200 text-gray-500' :
          'bg-white border-gray-200 text-gray-700'
        }`}>{item.label}</span>
      </div>
    ))}
  </div>
);

export default function LeetcodeEP15Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              60deg,
              rgba(20,184,166,0.4) 0, rgba(20,184,166,0.4) 1px,
              transparent 0, transparent 50%
            )`,
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-teal-500/20 text-teal-300 border-teal-500/30 font-bold uppercase text-[10px]">
                LeetCode 刷題日記
              </Chip>
              <Chip size="sm" variant="flat" className="bg-teal-500/20 text-teal-300 border-teal-500/30 font-bold uppercase text-[10px]">
                EP.15
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.15 — Backtracking：<br />
              <span className="text-teal-300">走不通就退回來</span>
            </h1>
            <p className="text-emerald-200 text-lg font-medium max-w-2xl mx-auto">
              #78 Subsets · #46 Permutations · #39 Combination Sum<br />
              — 一個框架搞定所有「列出所有可能」的問題
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 text-teal-600 p-2.5 rounded-full">
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
            學完 Graph 的拓撲排序，下一個大主題是 <strong>Backtracking（回溯）</strong>。
            這類題目的特徵很明顯：「列出所有可能的組合 / 排列 / 子集」。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Backtracking 的核心思想其實很像人做選擇：往前走一步，看看這條路能不能通；
            不行的話，<strong>退回來（backtrack）</strong>，換下一個選擇再試。
            這個「退回來」的動作，在程式裡就是 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">path.pop()</code>。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這篇用三道題把這個框架從頭到尾打通。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* 核心框架 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Backtracking 通用框架</h2>
          <p className="text-gray-700 leading-relaxed">
            先把框架背起來，後面所有題目都是這個框架的變形：
          </p>

          <CodeBlock
            title="backtracking_template.py"
            code={`def backtrack(start, path):
    # 1. 收集結果（什麼時候把 path 加入 result？）
    result.append(path[:])   # 注意：要複製，不是傳引用

    # 2. 枚舉選擇
    for i in range(start, len(nums)):
        # 3. 做選擇
        path.append(nums[i])

        # 4. 遞迴（進入下一層）
        backtrack(i + 1, path)

        # 5. 撤銷選擇（關鍵！）
        path.pop()`}
          />

          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 space-y-4">
            <p className="font-black text-teal-800">框架三個核心問題</p>
            <div className="space-y-3">
              {[
                { q: '什麼時候收集結果？', a: '每進入一層就收集（Subsets）、只在特定條件下收集（Combination Sum 加到 target）、到葉節點收集（Permutations）' },
                { q: '枚舉什麼？', a: '從 start 開始枚舉，避免重複選取之前的元素（組合題）；或枚舉所有未選過的元素（排列題）' },
                { q: '如何剪枝？', a: '加總超過 target 就不繼續（Combination Sum）；遇到重複元素就跳過（有重複的 Subsets/Permutations 變形）' },
              ].map(({ q, a }) => (
                <div key={q} className="bg-white rounded-xl p-4 space-y-1">
                  <p className="font-black text-gray-900 text-sm">Q: {q}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">A: {a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 1: Subsets ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🌿</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 1 — Subsets</h2>
              <p className="text-gray-500 font-medium">#78 · Medium · 列出所有子集</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個不含重複元素的整數陣列 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">nums</code>，
                返回所有可能的子集（冪集）。結果不能有重複的子集。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>Input: nums = [1, 2, 3]</p>
                <p>Output: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">思路：每一層都是一個答案</h3>
          <p className="text-gray-700 leading-relaxed">
            Subsets 和一般 backtracking 最大的不同是：<strong>每進入一層遞迴，當下的 path 就是一個合法的子集</strong>。
            不用等到葉節點才收集，一進函式就收集。
          </p>

          {/* 樹狀圖可視化 */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 overflow-x-auto">
            <p className="text-sm font-bold text-gray-500 uppercase">nums = [1, 2, 3] 的遞迴樹</p>
            <div className="space-y-3 text-xs font-mono min-w-max">
              <TreeRow items={[{ label: '[] ✓', color: 'green' }]} />
              <div className="space-y-2 pl-4">
                <TreeRow items={[{ label: '[1] ✓', color: 'green' }, { label: '[2] ✓', color: 'green' }, { label: '[3] ✓', color: 'green' }]} />
                <div className="pl-4 space-y-1">
                  <TreeRow items={[{ label: '[1,2] ✓', color: 'teal' }, { label: '[1,3] ✓', color: 'teal' }, { label: '[2,3] ✓', color: 'teal' }]} />
                  <div className="pl-4">
                    <TreeRow items={[{ label: '[1,2,3] ✓', color: 'teal' }]} />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              每個節點進入時立刻收集 → 共 2³ = 8 個子集（空集合 + 7 個）
            </p>
          </div>

          <CodeBlock
            title="subsets.py"
            code={`def subsets(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(start, path):
        result.append(path[:])   # 每一層都收集（不管 path 是不是空的）

        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)   # i+1：不往回選，只選後面的元素
            path.pop()               # 撤銷選擇

    backtrack(0, [])
    return result

# Output for [1, 2, 3]:
# [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]`}
          />
          <ComplexityBadge time="O(n × 2ⁿ)" space="O(n)" />

          <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
            <p className="font-black text-gray-900 text-sm">為什麼 Time 是 O(n × 2ⁿ)？</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              n 個元素的子集共有 2ⁿ 個。每個子集最多有 n 個元素需要複製（<code className="bg-gray-100 px-1 rounded font-mono">path[:]</code>），
              所以總時間是 O(n × 2ⁿ)。Space O(n) 是遞迴深度（不計結果本身）。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 2: Permutations ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔀</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 2 — Permutations</h2>
              <p className="text-gray-500 font-medium">#46 · Medium · 全排列</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個不含重複數字的陣列 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">nums</code>，
                返回所有可能的全排列。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>Input: nums = [1, 2, 3]</p>
                <p>Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">Subsets vs Permutations 的差異</h3>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700"></th>
                  <th className="text-left p-4 font-black text-gray-700">Subsets（組合）</th>
                  <th className="text-left p-4 font-black text-gray-700">Permutations（排列）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold text-gray-700">順序重要嗎？</td>
                  <td className="p-4 text-gray-600">❌ [1,2] 和 [2,1] 是同一個</td>
                  <td className="p-4 text-gray-600">✅ [1,2] 和 [2,1] 不同</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-700">如何避免重複？</td>
                  <td className="p-4 text-gray-600">傳 <code className="font-mono bg-gray-100 px-1 rounded">start</code>，只選後面的元素</td>
                  <td className="p-4 text-gray-600">用 <code className="font-mono bg-gray-100 px-1 rounded">used</code> 集合，標記已選元素</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-700">何時收集結果？</td>
                  <td className="p-4 text-gray-600">每一層都收集</td>
                  <td className="p-4 text-gray-600">path 長度等於 nums 長度時</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-700">答案數量</td>
                  <td className="p-4 text-gray-600">2ⁿ 個</td>
                  <td className="p-4 text-gray-600">n! 個</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock
            title="permutations.py"
            code={`def permute(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(path, used):
        # 收集條件：path 已選滿所有元素
        if len(path) == len(nums):
            result.append(path[:])
            return

        for i in range(len(nums)):
            if i in used:        # 這個元素已經在 path 裡了，跳過
                continue

            used.add(i)
            path.append(nums[i])
            backtrack(path, used)
            path.pop()           # 撤銷
            used.remove(i)       # 撤銷

    backtrack([], set())
    return result`}
          />
          <ComplexityBadge time="O(n × n!)" space="O(n)" />

          {/* 遞迴樹可視化 */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-3 overflow-x-auto">
            <p className="text-sm font-bold text-gray-500 uppercase">nums = [1, 2, 3]，以選 1 開頭為例</p>
            <div className="space-y-2 text-xs font-mono min-w-max">
              <TreeRow items={[{ label: 'start: []', color: 'gray' }]} />
              <div className="pl-4 space-y-2">
                <TreeRow items={[{ label: 'path=[1]', color: 'teal' }, { label: 'used={0}' }]} />
                <div className="pl-6 space-y-2">
                  <TreeRow items={[{ label: 'path=[1,2]', color: 'teal' }, { label: 'used={0,1}' }]} />
                  <div className="pl-6">
                    <TreeRow items={[{ label: 'path=[1,2,3] ✓', color: 'green' }]} />
                  </div>
                  <TreeRow items={[{ label: 'path=[1,3]', color: 'teal' }, { label: 'used={0,2}' }]} />
                  <div className="pl-6">
                    <TreeRow items={[{ label: 'path=[1,3,2] ✓', color: 'green' }]} />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400">以此類推，以 2、3 開頭各有 2 條路 → 共 3! = 6 個排列</p>
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
            <p className="font-black text-teal-800 mb-2">💡 用 set 還是 boolean array？</p>
            <p className="text-teal-700 text-sm leading-relaxed">
              上面用 <code className="bg-teal-100 px-1 rounded font-mono">set()</code> 儲存已用的 index。
              另一種常見寫法是用 <code className="bg-teal-100 px-1 rounded font-mono">used = [False] * len(nums)</code>，
              效能稍好（O(1) 查詢 vs 平均 O(1) 但 worst case 略差）。
              面試時兩種都可以，但 boolean array 更直觀。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 3: Combination Sum ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 3 — Combination Sum</h2>
              <p className="text-gray-500 font-medium">#39 · Medium · 湊到 target 的所有組合</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個不含重複元素的正整數陣列 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">candidates</code> 和目標數
                <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm"> target</code>。
                找出所有加總等於 target 的組合，<strong>每個元素可以重複使用</strong>。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>Input: candidates = [2,3,6,7], target = 7</p>
                <p>Output: [[2,2,3], [7]]</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">兩個關鍵點</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-emerald-800">1. 元素可以重複使用</p>
              <p className="text-emerald-700 text-sm leading-relaxed">
                遞迴時傳的是 <code className="bg-emerald-100 px-1 rounded font-mono">i</code> 而不是 <code className="bg-emerald-100 px-1 rounded font-mono">i+1</code>，
                允許在同一層繼續選同一個元素。
              </p>
              <code className="block bg-gray-900 text-green-400 font-mono text-xs p-2 rounded-xl">
                backtrack(i, path)  # 可以再選 i
              </code>
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-teal-800">2. 剪枝：超過 target 就停</p>
              <p className="text-teal-700 text-sm leading-relaxed">
                如果目前加總已經超過 target，這條路不可能成功，直接 return。
                先排序 candidates 可以讓剪枝更早發生。
              </p>
              <code className="block bg-gray-900 text-green-400 font-mono text-xs p-2 rounded-xl">
                if remain {'<'} 0: return  # 剪枝
              </code>
            </div>
          </div>

          <CodeBlock
            title="combination_sum.py"
            code={`def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    result = []
    candidates.sort()   # 排序後可以更早剪枝

    def backtrack(start, path, remain):
        if remain == 0:              # 剛好湊到 target
            result.append(path[:])
            return
        if remain < 0:               # 超過了，剪枝
            return

        for i in range(start, len(candidates)):
            # 小優化：candidates 已排序，若當前元素就超了，後面更不用看
            if candidates[i] > remain:
                break

            path.append(candidates[i])
            backtrack(i, path, remain - candidates[i])  # 注意：傳 i，不是 i+1
            path.pop()

    backtrack(0, [], target)
    return result

# candidates = [2,3,6,7], target = 7
# 路徑：2 → 2 → 2 → 2 (remain=-1, 剪枝)
#                 → 3 (remain=0, 收集 [2,2,3] ✓)
#             → 3 → (remain=0? 2+2+3... 不對，繼續)
#        → 3 → ...
#        → 6 → ...
#        → 7 → (remain=0, 收集 [7] ✓)`}
          />
          <ComplexityBadge time="O(n^(T/M))" space="O(T/M)" />

          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="font-black text-gray-900 text-sm mb-2">複雜度說明</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              T 是 target，M 是最小的 candidate。最壞情況下遞迴樹深度是 T/M，每層最多有 n 個選擇，
              所以是 O(n^(T/M))。空間是遞迴深度 O(T/M)。
            </p>
          </div>

          {/* 可視化 */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 overflow-x-auto">
            <p className="text-sm font-bold text-gray-500 uppercase">candidates=[2,3,6,7], target=7 部分遞迴樹</p>
            <div className="space-y-2 text-xs font-mono min-w-max">
              <TreeRow items={[{ label: 'remain=7', color: 'gray' }]} />
              <div className="pl-4 space-y-2">
                <TreeRow items={[{ label: 'pick 2, remain=5', color: 'teal' }]} />
                <div className="pl-6 space-y-2">
                  <TreeRow items={[{ label: 'pick 2, remain=3', color: 'teal' }]} />
                  <div className="pl-8 space-y-2">
                    <TreeRow items={[{ label: 'pick 2, remain=1', color: 'teal' }]} />
                    <div className="pl-8">
                      <TreeRow items={[{ label: 'pick 2, remain=-1 ✂️ 剪枝', color: 'gray' }]} />
                      <TreeRow items={[{ label: 'pick 3, remain=-2 ✂️ 剪枝', color: 'gray' }]} />
                    </div>
                    <TreeRow items={[{ label: 'pick 3, remain=0 → [2,2,3] ✓', color: 'green' }]} />
                  </div>
                </div>
                <TreeRow items={[{ label: '... 其他分支', color: 'gray' }]} />
              </div>
              <div className="pl-4">
                <TreeRow items={[{ label: 'pick 7, remain=0 → [7] ✓', color: 'green' }]} />
              </div>
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
                  <th className="text-left p-4 font-black text-gray-700">何時收集</th>
                  <th className="text-left p-4 font-black text-gray-700">避免重複</th>
                  <th className="text-left p-4 font-black text-gray-700">遞迴參數</th>
                  <th className="text-left p-4 font-black text-gray-700">剪枝</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold">#78 Subsets</td>
                  <td className="p-4 text-gray-600">每進一層</td>
                  <td className="p-4 text-gray-600">傳 start，往後選</td>
                  <td className="p-4 font-mono text-xs text-gray-500">backtrack(i+1, path)</td>
                  <td className="p-4 text-gray-400">無</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#46 Permutations</td>
                  <td className="p-4 text-gray-600">path 填滿時</td>
                  <td className="p-4 text-gray-600">used set 標記</td>
                  <td className="p-4 font-mono text-xs text-gray-500">backtrack(path, used)</td>
                  <td className="p-4 text-gray-400">used 檢查</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#39 Combination Sum</td>
                  <td className="p-4 text-gray-600">remain == 0</td>
                  <td className="p-4 text-gray-600">傳 start，往後選</td>
                  <td className="p-4 font-mono text-xs text-gray-500">backtrack(i, path, remain)</td>
                  <td className="p-4 text-gray-600">remain {'<'} 0 return</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-teal-800">識別 Backtracking 題目的訊號</p>
            <ul className="space-y-2 text-teal-700 text-sm">
              {[
                '「列出所有...」「找出所有可能的...」「返回所有組合...」',
                '輸入是陣列或字串，輸出是「list of list」',
                '暴力做法是多層 for loop，但層數不固定',
                '問題可以用「選或不選」這個決策樹來建模',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold mt-0.5">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 常見陷阱 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">常見陷阱</h2>

          <div className="space-y-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-3">
              <p className="font-black text-red-800">❌ 忘記複製 path</p>
              <CodeBlock
                title="wrong_way.py"
                code={`# 錯誤：直接 append path（引用）
result.append(path)    # path 之後被 pop 修改，result 裡的也會變！

# 正確：append 複製
result.append(path[:])
result.append(list(path))  # 這兩種都可以`}
              />
              <p className="text-red-700 text-sm">
                這是 backtracking 最常見的 bug。<code className="bg-red-100 px-1 rounded font-mono">path</code> 是可變物件，
                直接 append 只是存了引用，之後 pop 操作會同步影響 result 裡的值。
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 space-y-3">
              <p className="font-black text-yellow-800">⚠️ Combination Sum：傳 i 而非 i+1</p>
              <CodeBlock
                title="combination_sum_key.py"
                code={`# Subsets 和一般組合題：傳 i+1（不允許重複使用同元素）
backtrack(i + 1, path)

# Combination Sum：傳 i（允許重複使用同元素）
backtrack(i, path, remain - candidates[i])`}
              />
              <p className="text-yellow-700 text-sm">
                這個細節決定「元素能不能重複選」，是這題和 Subsets 最大的不同。
              </p>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-teal-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🌿', text: 'Backtracking 本質是枚舉 + 撤銷：做選擇 → 遞迴 → 撤銷，三個動作缺一不可' },
                { emoji: '📋', text: 'Subsets：每層都收集；Permutations：用 used 標記，長度填滿才收集；Combination Sum：remain==0 才收集' },
                { emoji: '🔀', text: '組合題傳 start（不回頭選），排列題傳 used（全範圍但跳過已選），這是避免重複的核心差異' },
                { emoji: '✂️', text: '剪枝讓效率大幅提升：Combination Sum 先排序，remain < 0 直接 return，candidates[i] > remain 直接 break' },
                { emoji: '⚠️', text: '永遠記得 result.append(path[:])，直接 append path 是 backtracking 最常見的 bug' },
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
          <Link href="/blog/leetcode/ep14-graph-topo" className="group block bg-gray-50 hover:bg-teal-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-teal-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-teal-600 transition-colors">EP.14 — Graph 拓撲排序</p>
            <p className="text-sm text-gray-500 mt-1">Course Schedule、Kahn's Algorithm</p>
          </Link>
          <Link href="/blog/leetcode/ep16-greedy" className="group block bg-gray-50 hover:bg-teal-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-teal-600 transition-colors">EP.16 — Greedy</p>
            <p className="text-sm text-gray-500 mt-1">Jump Game、Gas Station</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-teal-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Backtracking', 'Subsets', 'Permutations', 'Combination Sum', 'Python', 'EP.15'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
