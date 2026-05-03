'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Clock, Eye } from 'lucide-react';
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

const NodeBox = ({ label, color = 'gray', sub }: { label: string; color?: string; sub?: string }) => {
  const colors: Record<string, string> = {
    gray:   'bg-gray-100 border-gray-300 text-gray-700',
    blue:   'bg-blue-100 border-blue-300 text-blue-700',
    green:  'bg-green-100 border-green-300 text-green-700',
    red:    'bg-red-100 border-red-300 text-red-700',
    orange: 'bg-orange-100 border-orange-300 text-orange-700',
  };
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`px-4 py-2 rounded-xl border-2 font-black text-sm ${colors[color]}`}>{label}</div>
      {sub && <span className="text-xs text-gray-400 font-mono">{sub}</span>}
    </div>
  );
};

export default function LeetcodeEP14Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-900 via-amber-900 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, rgba(251,146,60,0.3) 0, rgba(251,146,60,0.3) 1px, transparent 0, transparent 50%)`, backgroundSize: '20px 20px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-bold uppercase text-[10px]">EP.14</Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.14 — Graph 進階：<br />
              <span className="text-orange-300">拓撲排序與環的偵測</span>
            </h1>
            <p className="text-amber-200 text-lg font-medium max-w-2xl mx-auto">
              #207 Course Schedule · #210 Course Schedule II
              <br />— Kahn's Algorithm、DFS Cycle Detection、有向圖的排序問題
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 text-orange-600 p-2.5 rounded-full"><User size={18} /></div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2024</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Clock size={16} /> <span>5 min read</span></div>
              <div className="flex items-center gap-1.5"><Eye size={16} /> <span>1.2k views</span></div>
            </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            EP.13 學了 Graph DFS 的基礎：visited 集合防環、Grid 與 Adjacency List 兩種形式。這篇進入「有向圖」的核心問題：
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            <strong>「這些任務能不能被排出一個合法的完成順序？」</strong>
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            如果任務之間存在循環依賴（A 需要 B 先完成，B 需要 A 先完成），就無解。這就是拓撲排序（Topological Sort）要解決的問題，也是面試最常考的 Graph 進階題。
          </p>
        </section>

        {/* 前置知識 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">前置概念：In-degree（入度）</h2>
          <p className="text-gray-700 leading-relaxed">
            有向圖中，一個節點的「入度」是指有多少條邊指向它。
            入度為 0 的節點代表「沒有任何前置條件」，可以最先被處理。
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">例：修課依賴圖</p>
            <div className="flex items-center gap-4 flex-wrap">
              <NodeBox label="數學" color="blue" sub="in=0" />
              <span className="text-gray-400 font-bold">→</span>
              <NodeBox label="線性代數" color="gray" sub="in=1" />
              <span className="text-gray-400 font-bold">→</span>
              <NodeBox label="機器學習" color="gray" sub="in=2" />
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <NodeBox label="統計學" color="blue" sub="in=0" />
              <span className="text-gray-400 font-bold">──────────────────────→</span>
            </div>
            <p className="text-sm text-gray-500">
              「機器學習」有兩條前置（線性代數＋統計學），所以入度 = 2。
              要學機器學習，必須先把入度降到 0。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 1: COURSE SCHEDULE ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 1 — Course Schedule</h2>
              <p className="text-gray-500 font-medium">#207 · Medium · 能否完成所有課程？</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                有 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">numCourses</code> 門課，
                <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">prerequisites[i] = [a, b]</code> 代表「修 a 之前必須先修 b」。
                判斷是否能完成所有課程（即依賴關係中是否存在環）。
              </p>
              <div className="space-y-1 font-mono text-sm text-gray-500">
                <p>numCourses=2, prerequisites=[[1,0]] → True（先修0再修1）</p>
                <p>numCourses=2, prerequisites=[[1,0],[0,1]] → False（互相依賴，有環）</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900 mt-8">解法一：Kahn's Algorithm（BFS 拓撲排序）</h3>
          <p className="text-gray-700 leading-relaxed">
            核心思路：每次從圖中移除入度為 0 的節點，直到圖為空（成功）或卡住（有環）。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
            <p className="text-sm font-bold text-gray-500 uppercase">Kahn's 演算法步驟</p>
            <div className="space-y-3">
              {[
                { step: '1', title: '建圖 + 計算每個節點的 in-degree', code: 'graph[b].append(a)  # b → a（修b才能修a）' },
                { step: '2', title: '把所有 in-degree=0 的節點加入 queue', code: 'queue = deque([i for i in range(n) if indegree[i] == 0])' },
                { step: '3', title: 'BFS：處理節點，更新鄰居 in-degree', code: '# 每移除一個節點，其鄰居的 in-degree -= 1\n# 若鄰居 in-degree 變 0，加入 queue' },
                { step: '4', title: '最後檢查：處理的節點數是否等於 numCourses', code: '# 如果有環，環裡的節點永遠 in-degree > 0，不會被處理' },
              ].map(({ step, title, code }) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5">{step}</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 mb-1">{title}</p>
                    <code className="block bg-gray-800 text-green-400 rounded-xl p-3 font-mono text-xs">{code}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="course_schedule_bfs.py"
            code={`from collections import deque, defaultdict

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    graph = defaultdict(list)
    indegree = [0] * numCourses

    for a, b in prerequisites:
        graph[b].append(a)   # b → a（修完 b 才能修 a）
        indegree[a] += 1

    # 入度為 0 的課程可以先修
    queue = deque([i for i in range(numCourses) if indegree[i] == 0])
    finished = 0

    while queue:
        course = queue.popleft()
        finished += 1
        for next_course in graph[course]:
            indegree[next_course] -= 1
            if indegree[next_course] == 0:
                queue.append(next_course)

    return finished == numCourses  # 所有課都處理到才代表無環`}
          />
          <ComplexityBadge time="O(V + E)" space="O(V + E)" />

          <h3 className="text-xl font-black text-gray-900">Kahn's 演算法可視化</h3>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 overflow-x-auto">
            <p className="text-sm font-bold text-gray-500 uppercase">prerequisites = [[1,0],[2,1],[3,1]]</p>
            <div className="space-y-3 text-sm font-mono min-w-max">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 w-16">初始</span>
                <NodeBox label="0" color="orange" sub="in=0" />
                <span className="text-gray-300">→</span>
                <NodeBox label="1" color="gray" sub="in=1" />
                <span className="text-gray-300">→</span>
                <NodeBox label="2" color="gray" sub="in=1" />
                <span className="text-gray-300 ml-1">也</span>
                <span className="text-gray-300">→</span>
                <NodeBox label="3" color="gray" sub="in=1" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 w-16">移除 0</span>
                <NodeBox label="0" color="green" sub="done" />
                <span className="text-gray-300">→</span>
                <NodeBox label="1" color="orange" sub="in=0" />
                <span className="text-gray-300">→</span>
                <NodeBox label="2" color="gray" sub="in=1" />
                <span className="text-gray-300 ml-1"> </span>
                <span className="text-gray-300">→</span>
                <NodeBox label="3" color="gray" sub="in=1" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 w-16">移除 1</span>
                <NodeBox label="0" color="green" sub="done" />
                <span className="text-gray-300"> </span>
                <NodeBox label="1" color="green" sub="done" />
                <span className="text-gray-300"> </span>
                <NodeBox label="2" color="orange" sub="in=0" />
                <NodeBox label="3" color="orange" sub="in=0" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 w-16">完成</span>
                <span className="text-green-600 font-bold">finished=4 == numCourses → True ✅</span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-black text-gray-900">解法二：DFS 環偵測（三色標記法）</h3>
          <p className="text-gray-700 leading-relaxed">
            另一種思路：用 DFS 遍歷圖，用三種狀態標記每個節點——未訪問、正在訪問中（在當前 DFS 路徑上）、已完成。如果遇到「正在訪問中」的節點，代表有環。
          </p>

          <CodeBlock
            title="course_schedule_dfs.py"
            code={`def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    graph = defaultdict(list)
    for a, b in prerequisites:
        graph[b].append(a)

    # 0 = 未訪問, 1 = 正在訪問中（當前路徑上）, 2 = 已完成（安全）
    state = [0] * numCourses

    def dfs(node) -> bool:
        if state[node] == 1:   # 在當前路徑上再次遇到 → 有環
            return False
        if state[node] == 2:   # 已確認安全，不用再訪
            return True

        state[node] = 1        # 標記為「正在訪問」
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        state[node] = 2        # DFS 完成，標記為「安全」
        return True

    return all(dfs(i) for i in range(numCourses))`}
          />
          <ComplexityBadge time="O(V + E)" space="O(V + E)" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-orange-800">Kahn's（BFS）適合用在</p>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• 需要輸出排序結果（Course Schedule II）</li>
                <li>• 邏輯直觀，容易理解</li>
                <li>• 不需要遞迴，無 stack overflow 風險</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-amber-800">DFS 三色標記適合用在</p>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• 只判斷有無環，不需要排序</li>
                <li>• 面試偏好 DFS 的考官</li>
                <li>• 邏輯上更貼近「回溯路徑」的直覺</li>
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 2: COURSE SCHEDULE II ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📋</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 2 — Course Schedule II</h2>
              <p className="text-gray-500 font-medium">#210 · Medium · 輸出拓撲排序結果</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            和 #207 幾乎一樣，差別在於不只要回傳「能否完成」，還要回傳「一個合法的修課順序」。如果有環則回傳空陣列。
          </p>
          <p className="text-gray-700 leading-relaxed">
            用 Kahn's Algorithm 的話，只要把 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">queue.popleft()</code> 的節點順序收集起來就是答案。
          </p>

          <CodeBlock
            title="course_schedule_ii.py"
            code={`from collections import deque, defaultdict

def findOrder(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    graph = defaultdict(list)
    indegree = [0] * numCourses

    for a, b in prerequisites:
        graph[b].append(a)
        indegree[a] += 1

    queue = deque([i for i in range(numCourses) if indegree[i] == 0])
    order = []

    while queue:
        course = queue.popleft()
        order.append(course)          # 收集處理順序
        for next_course in graph[course]:
            indegree[next_course] -= 1
            if indegree[next_course] == 0:
                queue.append(next_course)

    return order if len(order) == numCourses else []  # 有環則回傳 []`}
          />
          <ComplexityBadge time="O(V + E)" space="O(V + E)" />
        </section>

        <Divider className="opacity-30" />

        {/* 拓撲排序模板 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">拓撲排序通用模板</h2>
          <p className="text-gray-700 leading-relaxed">
            遇到「有依賴關係的任務排序」或「判斷是否有循環依賴」，直接套這個框架：
          </p>
          <CodeBlock
            title="topological_sort_template.py"
            code={`from collections import deque, defaultdict

def topological_sort(n: int, edges: list[tuple]) -> list[int]:
    graph = defaultdict(list)
    indegree = [0] * n

    for src, dst in edges:           # src → dst（src 是 dst 的前置）
        graph[src].append(dst)
        indegree[dst] += 1

    queue = deque([i for i in range(n) if indegree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return result if len(result) == n else []  # [] 代表有環`}
          />
          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="font-black text-gray-900">模板要注意的地方</p>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>• <strong>邊的方向</strong>：要確認 graph 中 edge 的方向。Course Schedule 裡 <code className="bg-gray-100 px-1 rounded font-mono">[a, b]</code> 代表「先修 b 才能修 a」，所以要建 b → a 的邊。</p>
              <p>• <strong>in-degree 初始化</strong>：必須先遍歷所有邊，才能正確算出每個節點的入度。</p>
              <p>• <strong>結果長度判斷</strong>：<code className="bg-gray-100 px-1 rounded font-mono">len(result) == n</code> 是唯一正確的有環判斷方式，不要另外另 check。</p>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Graph 系列總結 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Graph 兩篇總結</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-black text-gray-700">題目</th>
                  <th className="text-left p-4 font-black text-gray-700">Graph 類型</th>
                  <th className="text-left p-4 font-black text-gray-700">核心技術</th>
                  <th className="text-left p-4 font-black text-gray-700">關鍵資料結構</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold">Number of Islands</td>
                  <td className="p-4 text-gray-600">無向 Grid</td>
                  <td className="p-4 text-gray-600">DFS / BFS 淹島</td>
                  <td className="p-4 text-gray-500 font-mono text-xs">set / 直接改值</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Clone Graph</td>
                  <td className="p-4 text-gray-600">無向圖</td>
                  <td className="p-4 text-gray-600">DFS + HashMap 防環</td>
                  <td className="p-4 text-gray-500 font-mono text-xs">dict{'{'}old: new{'}'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Course Schedule</td>
                  <td className="p-4 text-gray-600">有向圖（DAG 判斷）</td>
                  <td className="p-4 text-gray-600">Kahn's / DFS 三色</td>
                  <td className="p-4 text-gray-500 font-mono text-xs">indegree[], deque</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Course Schedule II</td>
                  <td className="p-4 text-gray-600">有向圖（拓撲排序）</td>
                  <td className="p-4 text-gray-600">Kahn's，收集順序</td>
                  <td className="p-4 text-gray-500 font-mono text-xs">indegree[], deque, result[]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-orange-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '📚', text: 'Course Schedule 本質是「有向圖有無環」，有環代表有循環依賴，無法完成' },
                { emoji: '🔢', text: 'Kahn\'s Algorithm：每次移除入度為 0 的節點，最後看處理數量是否等於總節點數' },
                { emoji: '🎨', text: 'DFS 三色標記：未訪問(0) → 訪問中(1) → 已完成(2)，遇到狀態 1 代表有環' },
                { emoji: '📋', text: 'Course Schedule II 只是在 Kahn\'s 基礎上多收集一個 order 陣列' },
                { emoji: '⚠️', text: '有向圖必須注意邊的方向，[a, b] 代表「先修 b 再修 a」，建圖方向別搞反' },
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
          <Link href="/blog/leetcode-ep13-graph-dfs" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.13 — Graph 入門</p>
            <p className="text-sm text-gray-500 mt-1">Number of Islands、Clone Graph</p>
          </Link>
          <Link href="/blog/leetcode-ep15-backtracking" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.15 — Backtracking</p>
            <p className="text-sm text-gray-500 mt-1">Subsets、Permutations、Combination Sum</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Graph', 'Topological Sort', 'BFS', 'Python', 'EP.14'].map((tag) => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
