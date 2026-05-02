'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? 'python'}</span>
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

const GridCell = ({ val, state }: { val: string; state: 'land' | 'water' | 'visited' | 'current' }) => {
  const styles = {
    land:    'bg-green-400 text-white border-green-500',
    water:   'bg-blue-100 text-blue-400 border-blue-200',
    visited: 'bg-gray-300 text-gray-500 border-gray-400',
    current: 'bg-orange-400 text-white border-orange-500 shadow-lg shadow-orange-200 scale-110',
  };
  return (
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm border-2 transition-all ${styles[state]}`}>
      {val}
    </div>
  );
};

export default function LeetcodeEP13Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(52,211,153,0.3) 25%, rgba(52,211,153,0.3) 26%, transparent 27%, transparent 74%, rgba(52,211,153,0.3) 75%, rgba(52,211,153,0.3) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(52,211,153,0.3) 25%, rgba(52,211,153,0.3) 26%, transparent 27%, transparent 74%, rgba(52,211,153,0.3) 75%, rgba(52,211,153,0.3) 76%, transparent 77%)`, backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold uppercase text-[10px]">EP.13</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.13 — Graph 入門：<br />
              <span className="text-emerald-300">DFS 在圖上長什麼樣子</span>
            </h1>
            <p className="text-teal-200 text-lg font-medium max-w-2xl mx-auto">
              #200 Number of Islands · #133 Clone Graph
              <br />— Grid DFS、visited 集合、adjacency list 三個核心概念
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-full"><User size={18} /></div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2024</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button isIconOnly variant="light" size="sm"><Bookmark size={18} /></Button>
            <Button isIconOnly variant="light" size="sm"><Share2 size={18} /></Button>
          </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Tree 章節我們學了 DFS 和 BFS。Graph 是 Tree 的廣義版本：Tree 的每個節點只有一個父節點，而 Graph 的節點可以有任意多個鄰居，甚至形成環。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            也因為 Graph 可能有環，DFS 在 Graph 上有一個 Tree 上不需要的額外步驟：<strong>visited 集合</strong>，防止無限遞迴。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這篇從最常見的兩種 Graph 題型入手：Grid（二維矩陣）和 Adjacency List（鄰接表）。
          </p>
        </section>

        {/* Graph 基礎概念 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Graph 的兩種表示法</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 space-y-3">
              <p className="font-black text-emerald-800 text-lg">Grid（矩陣）</p>
              <p className="text-emerald-700 leading-relaxed text-sm">
                二維陣列，每個格子是一個節點。鄰居是上下左右四個方向。Number of Islands 就是這種形式。
              </p>
              <code className="block bg-emerald-100 rounded-xl p-3 font-mono text-xs text-emerald-800 whitespace-pre">{`grid = [
  ["1","1","0"],
  ["1","0","0"],
  ["0","0","1"]
]`}</code>
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 space-y-3">
              <p className="font-black text-teal-800 text-lg">Adjacency List（鄰接表）</p>
              <p className="text-teal-700 leading-relaxed text-sm">
                每個節點存一個鄰居列表。Clone Graph 就是這種形式。
              </p>
              <code className="block bg-teal-100 rounded-xl p-3 font-mono text-xs text-teal-800 whitespace-pre">{`# Node(val=1, neighbors=[2,4])
# Node(val=2, neighbors=[1,3])
# Node(val=3, neighbors=[2,4])
# Node(val=4, neighbors=[1,3])`}</code>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 1: NUMBER OF ISLANDS ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏝️</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 1 — Number of Islands</h2>
              <p className="text-gray-500 font-medium">#200 · Medium · Grid DFS</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個二維字元矩陣，<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">"1"</code> 代表陸地，<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">"0"</code> 代表水。
                上下左右相連的陸地算一座島嶼，回傳島嶼總數。
              </p>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900 mt-8">思路：把「找到一塊陸地」變成「淹沒整座島」</h3>
          <p className="text-gray-700 leading-relaxed">
            遍歷整個 Grid。每次遇到 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">"1"</code>，就進行一次 DFS，把這座島上所有相連的 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">"1"</code> 都標記成已訪問（直接改成 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">"0"</code>），然後 count +1。
          </p>
          <p className="text-gray-700 leading-relaxed">
            這樣每座島只會被計算一次，因為 DFS 會把整座島「淹掉」，之後不會再碰到它的任何格子。
          </p>

          <h3 className="text-xl font-black text-gray-900">可視化</h3>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
            <p className="text-sm font-bold text-gray-500 uppercase">步驟展示</p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-gray-400 mb-3">初始 Grid（3×4，含 3 座島）</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    ['land','land','water','water'],
                    ['land','water','water','land'],
                    ['water','water','land','land'],
                  ].map((row, r) => (
                    <div key={r} className="flex gap-1.5">
                      {row.map((s, c) => (
                        <GridCell key={c} val={s === 'land' ? '1' : '0'} state={s as 'land' | 'water'} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-orange-400" />
                    <span className="text-gray-600">DFS 起點（遇到 "1" 觸發）</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-300" />
                    <span className="text-gray-600">已淹沒（改為 "0"）</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-400" />
                    <span className="text-gray-600">待淹沒陸地</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-3 font-mono text-sm space-y-1">
                  <p className="text-gray-500 text-xs">遍歷流程</p>
                  <p className="text-orange-600">(0,0) → DFS → 淹 (0,0),(1,0) → count=1</p>
                  <p className="text-orange-600">(1,3) → DFS → 淹 (1,3),(2,3),(2,2) → count=2</p>
                  <p className="text-orange-600">找不到更多 → count=2... 等等！</p>
                  <p className="text-gray-400 text-xs">（此 Grid 結果為 2，非 3）</p>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            title="number_of_islands.py"
            code={`def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        # 邊界或水域，直接返回
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # 標記為已訪問（淹掉）
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1  # 每次觸發 DFS = 找到一座新島

    return count`}
          />
          <ComplexityBadge time="O(m × n)" space="O(m × n)" />
          <p className="text-sm text-gray-500">空間複雜度來自 DFS 遞迴的 call stack 深度，最壞情況是整個 Grid 都是陸地。</p>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-emerald-800">為什麼直接改 grid 而不用 visited set？</p>
            <p className="text-emerald-700 leading-relaxed">
              把 <code className="bg-emerald-100 px-1 rounded font-mono text-sm">"1"</code> 改成 <code className="bg-emerald-100 px-1 rounded font-mono text-sm">"0"</code> 就相當於標記已訪問，省下了額外的 set 空間。
              不過這會修改原始輸入。如果題目要求不能修改，就改用 <code className="bg-emerald-100 px-1 rounded font-mono text-sm">visited = set()</code> 另外記錄 <code className="bg-emerald-100 px-1 rounded font-mono text-sm">(r, c)</code>。
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-amber-800">BFS 版本也完全可以</p>
            <p className="text-amber-700 leading-relaxed">
              DFS 用遞迴，BFS 用 deque。Grid DFS/BFS 都是 O(m×n)，選哪個都行。
              面試中 DFS 寫起來更短，BFS 在超大 Grid 時不會有 stack overflow 風險。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 2: CLONE GRAPH ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔗</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 2 — Clone Graph</h2>
              <p className="text-gray-500 font-medium">#133 · Medium · Graph BFS + HashMap</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個無向圖的起始節點（每個節點有 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">val</code> 和 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">neighbors</code> 列表），
                深度複製整個圖並返回新圖的起始節點。
              </p>
              <p className="text-gray-500 text-sm">注意：Graph 可能有環（節點之間互相指向），所以不能無腦遞迴。</p>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900 mt-8">關鍵挑戰：有環怎麼辦？</h3>
          <p className="text-gray-700 leading-relaxed">
            如果節點 1 和節點 2 互相是鄰居（構成環），DFS 會：
            進入 1 → 進入 2 → 再次嘗試進入 1 → 無限循環。
          </p>
          <p className="text-gray-700 leading-relaxed">
            解法：用一個 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">old_to_new</code> HashMap，記錄「原節點 → 新節點」的對應。每次要複製節點前，先查這個 map，如果已經複製過就直接回傳，不再重複處理。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">圖結構可視化（4個節點的環形圖）</p>
            <div className="flex justify-center">
              <div className="relative w-48 h-48">
                {/* 四個節點 */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shadow-lg">1</div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-black shadow-lg">2</div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-black shadow-lg">3</div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-black shadow-lg">4</div>
                {/* 邊線 */}
                <div className="absolute inset-8 border-2 border-gray-300 rounded-full" />
              </div>
            </div>
            <p className="text-xs text-center text-gray-400 font-mono">1↔2, 2↔3, 3↔4, 4↔1（每個節點連兩個鄰居）</p>
          </div>

          <h3 className="text-xl font-black text-gray-900">DFS 解法</h3>
          <CodeBlock
            title="clone_graph_dfs.py"
            code={`class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors else []

def cloneGraph(node: Node) -> Node:
    if not node:
        return None

    old_to_new = {}  # 原節點 → 新節點的對應表

    def dfs(node):
        if node in old_to_new:      # 已複製過，直接回傳（避免無限遞迴）
            return old_to_new[node]

        clone = Node(node.val)      # 建立新節點（先不處理 neighbors）
        old_to_new[node] = clone    # 先放進 map，防止後續環形遞迴

        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))  # 遞迴複製每個鄰居

        return clone

    return dfs(node)`}
          />
          <ComplexityBadge time="O(V + E)" space="O(V)" />
          <p className="text-sm text-gray-500">V = 節點數，E = 邊數。每個節點和每條邊只處理一次。</p>

          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 space-y-3">
            <p className="font-black text-teal-800">關鍵順序：先放進 map，再處理 neighbors</p>
            <p className="text-teal-700 leading-relaxed">
              注意程式碼中 <code className="bg-teal-100 px-1 rounded font-mono text-sm">old_to_new[node] = clone</code> 必須在遞迴處理 neighbors <strong>之前</strong>執行。
              如果先處理 neighbors 才放進 map，遇到環就還是會無限遞迴。
              這和 Tree 的 Clone 不同，是 Graph 特有的防環邏輯。
            </p>
          </div>

          <h3 className="text-xl font-black text-gray-900">BFS 版本</h3>
          <CodeBlock
            title="clone_graph_bfs.py"
            code={`from collections import deque

def cloneGraph(node: Node) -> Node:
    if not node:
        return None

    old_to_new = {node: Node(node.val)}
    queue = deque([node])

    while queue:
        curr = queue.popleft()
        for neighbor in curr.neighbors:
            if neighbor not in old_to_new:
                old_to_new[neighbor] = Node(neighbor.val)
                queue.append(neighbor)
            old_to_new[curr].neighbors.append(old_to_new[neighbor])

    return old_to_new[node]`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Graph DFS 模板 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Graph DFS 通用模板</h2>
          <p className="text-gray-700 leading-relaxed">
            不管是 Grid 還是 Adjacency List，Graph DFS 的框架都一樣：
          </p>
          <CodeBlock
            title="graph_dfs_template.py"
            code={`# Grid 版本
def dfs_grid(grid, r, c, visited):
    if (r, c) in visited or 越界 or 無效格子:
        return
    visited.add((r, c))
    for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
        dfs_grid(grid, r + dr, c + dc, visited)

# Adjacency List 版本
def dfs_graph(node, visited):
    if node in visited:
        return
    visited.add(node)
    for neighbor in node.neighbors:
        dfs_graph(neighbor, visited)`}
          />
          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-black text-gray-900 mb-4">三個必做的事</p>
            <div className="space-y-3">
              {[
                { n: '1', t: '檢查是否已訪問', d: '避免無限遞迴，這是 Graph DFS 和 Tree DFS 最大的差異' },
                { n: '2', t: '標記為已訪問', d: '在遞迴鄰居之前就要標記，防止環形回訪' },
                { n: '3', t: '遍歷所有鄰居', d: 'Grid 用四個方向，Adjacency List 用 neighbors 列表' },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-sm flex-shrink-0">{n}</div>
                  <div>
                    <p className="font-bold text-gray-900">{t}</p>
                    <p className="text-gray-500 text-sm">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-emerald-400" />
              <h2 className="text-2xl font-black text-gray-900">這兩題學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🏝️', text: 'Number of Islands：Grid DFS 模板，遇到 "1" 就淹整座島，count++ 計算觸發次數' },
                { emoji: '🔗', text: 'Clone Graph：防環關鍵在 old_to_new HashMap，先把新節點放進去再處理 neighbors' },
                { emoji: '🔄', text: 'Graph DFS 三步驟：檢查 visited → 加入 visited → 遍歷鄰居' },
                { emoji: '📍', text: 'visited 的存法：Grid 可以直接改值（改為 "0"），Adjacency List 用 set 或 dict' },
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
          <Link href="/blog/leetcode-ep12-dp-advanced" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.12 — DP 進階</p>
            <p className="text-sm text-gray-500 mt-1">Coin Change、LIS、Word Break</p>
          </Link>
          <Link href="/blog/leetcode-ep14-graph-topo" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.14 — Graph 進階</p>
            <p className="text-sm text-gray-500 mt-1">Course Schedule、拓撲排序、Cycle Detection</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Graph', 'DFS', 'BFS', 'Grid', 'Python', 'EP.13'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
