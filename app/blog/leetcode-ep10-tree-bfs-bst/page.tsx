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

export default function LeetcodeEP10Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-orange-900 to-slate-900">
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #f59e0b 40px), repeating-linear-gradient(#f59e0b55, #f59e0b55)`, backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">EP.10</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Tree BFS & BST<br />
              <span className="text-amber-400">層序遍歷、驗證 BST、找共同祖先</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">#102 Level Order · #98 Validate BST · #235 LCA</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-amber-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-amber-400" /><span>2024</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <Button as={Link} href="/blog" variant="light" color="primary" className="font-bold" startContent={<ArrowLeft size={18} />}>Back to Blog</Button>
            <div className="flex gap-2">
              <Button isIconOnly variant="flat" radius="full" color="default"><Bookmark size={18} /></Button>
              <Button isIconOnly variant="flat" radius="full" color="default"><Share2 size={18} /></Button>
            </div>
          </div>

          <div className="space-y-10 text-gray-600 leading-relaxed">
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-amber-600">
              EP.09 用 DFS 打通了遞迴的思維，這篇接著講三個不同的 Tree 主題：BFS 層序遍歷（用 Queue 而非遞迴）、BST 的驗證（Binary Search Tree 的隱含約束），以及 LCA 最近公共祖先（Tree 中最優雅的遞迴之一）。
            </p>

            {/* DFS vs BFS */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-amber-500 rounded-full" />
                DFS vs BFS：兩種遍歷方式
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-3">
                  <p className="font-black text-green-900">DFS（深度優先）</p>
                  <p className="text-sm text-green-800">一路往深處走，到底再回頭。用<strong>遞迴</strong>或 Stack 實作。</p>
                  <div className="font-mono text-xs text-green-700 bg-green-100 rounded-lg p-3">
                    訪問順序：1→2→4→5→3→6→7
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
                  <p className="font-black text-amber-900">BFS（廣度優先）</p>
                  <p className="text-sm text-amber-800">一層一層向外擴，用 <strong>Queue（deque）</strong> 實作。</p>
                  <div className="font-mono text-xs text-amber-700 bg-amber-100 rounded-lg p-3">
                    訪問順序：1→2→3→4→5→6→7
                  </div>
                </div>
              </div>
              <p>「按層」這個特性讓 BFS 天然適合 Level Order Traversal 和「找最短路徑」類的問題。</p>
            </div>

            {/* Level Order */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-amber-500 rounded-full" />
                #102 Binary Tree Level Order Traversal
              </h2>
              <p>按照層次，從上到下、從左到右輸出每一層的節點值。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`     3
    / \\
   9  20
      / \\
     15   7

Output: [[3], [9, 20], [15, 7]]`} />
                </CardBody>
              </Card>

              <p>BFS 的標準實作用 <code className="bg-gray-100 px-1 rounded text-sm font-mono">collections.deque</code>。關鍵是：每次進入 while loop 時，queue 裡剛好放著「當前層的所有節點」。</p>

              <CodeBlock title="#102 Level Order Traversal — BFS" code={`from collections import deque

class Solution:
    def levelOrder(self, root: TreeNode) -> list[list[int]]:
        if not root:
            return []

        result = []
        queue = deque([root])   # 用 deque 當 Queue

        while queue:
            level_size = len(queue)   # 當前層的節點數
            current_level = []

            for _ in range(level_size):
                node = queue.popleft()          # 從左邊取出（FIFO）
                current_level.append(node.val)

                if node.left:
                    queue.append(node.left)     # 下一層的節點放到右邊
                if node.right:
                    queue.append(node.right)

            result.append(current_level)

        return result`} />
              <ComplexityBadge time="O(n)" space="O(n)  最寬的那一層最多 n/2 個節點" />

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 font-medium space-y-2">
                <p><strong>為什麼用 deque 而不是 list？</strong></p>
                <p><code>list.pop(0)</code> 是 O(n)（要搬移所有元素），<code>deque.popleft()</code> 是 O(1)。Queue 的 dequeue 操作一定要用 deque。</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 text-sm space-y-2">
                <p className="font-black text-gray-800">逐步追蹤：</p>
                <div className="font-mono text-xs space-y-1 text-gray-600">
                  {[
                    ['初始',      'queue=[3]',           'result=[]'],
                    ['第1層',     'queue=[9,20]',        'result=[[3]]'],
                    ['第2層',     'queue=[15,7]',        'result=[[3],[9,20]]'],
                    ['第3層',     'queue=[]',            'result=[[3],[9,20],[15,7]] ✅'],
                  ].map(([step, q, r]) => (
                    <div key={step} className="grid grid-cols-3 gap-2">
                      <span className="text-amber-600 font-bold">{step}</span>
                      <span>{q}</span>
                      <span className="text-green-600">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Validate BST */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-amber-500 rounded-full" />
                #98 Validate BST：理解 BST 的真正約束
              </h2>
              <p>BST（Binary Search Tree）的定義：左子樹的所有節點值 &lt; 當前節點值 &lt; 右子樹的所有節點值。</p>
              <p>注意：<strong>是所有節點，不只是直接的左右子節點。</strong></p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="看起來合法，其實不合法" code={`     5
    / \\
   1   4     ← 4 < 5 ✓（看起來沒問題）
      / \\
     3   6   ← 3 < 5 但是！3 在 5 的右子樹，必須 > 5 ✗

→ False（3 違反了 BST 的全局約束）`} />
                </CardBody>
              </Card>

              <p>錯誤解法：只比較 <code className="bg-gray-100 px-1 rounded text-sm font-mono">node.left.val &lt; node.val &lt; node.right.val</code>，這樣會漏掉全局約束。</p>
              <p>正確做法：傳入合法值範圍（min_val, max_val），每往下走一層就縮緊範圍。</p>

              <CodeBlock title="#98 Validate BST — 傳遞範圍約束" code={`class Solution:
    def isValidBST(self, root: TreeNode) -> bool:

        def validate(node, min_val, max_val):
            if not node:
                return True

            # 當前節點必須在 (min_val, max_val) 範圍內
            if not (min_val < node.val < max_val):
                return False

            # 往左走：上界縮緊為當前節點值
            # 往右走：下界縮緊為當前節點值
            return (validate(node.left,  min_val,  node.val) and
                    validate(node.right, node.val, max_val))

        return validate(root, float('-inf'), float('inf'))`} />
              <ComplexityBadge time="O(n)" space="O(h)" />

              <div className="bg-gray-50 rounded-2xl p-5 text-sm space-y-2">
                <p className="font-black text-gray-800">上面那棵有問題的樹，用範圍追蹤：</p>
                <div className="font-mono text-xs space-y-1 text-gray-600">
                  <div>validate(5, -∞, +∞) → 5 在範圍內 ✓</div>
                  <div className="pl-4">validate(1, -∞, 5)   → 1 在範圍內 ✓</div>
                  <div className="pl-4">validate(4, 5, +∞)   → 4 &lt; 5，<span className="text-red-600 font-black">不在範圍 (5, +∞) 內 ✗ → False</span></div>
                </div>
              </div>
            </div>

            {/* LCA */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-amber-500 rounded-full" />
                #235 Lowest Common Ancestor（LCA）
              </h2>
              <p>給 BST 中的兩個節點 p 和 q，找它們的最近公共祖先（LCA）——兩個節點的共同祖先中，最靠近它們的那個。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`        6
       / \\
      2   8
     / \\ / \\
    0  4 7  9
      / \\
     3   5

LCA(2, 8) = 6   ← 6 是最近的共同祖先
LCA(2, 4) = 2   ← 2 本身就是 4 的祖先，所以答案是 2`} />
                </CardBody>
              </Card>

              <p>利用 BST 的性質：</p>
              <div className="space-y-2 pl-4 text-sm">
                {[
                  'p 和 q 都比當前節點小 → LCA 在左子樹',
                  'p 和 q 都比當前節點大 → LCA 在右子樹',
                  '一個比當前節點小、一個比當前節點大（或其中一個就是當前節點）→ 當前節點就是 LCA',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-black shrink-0">→</span>
                    <span className="text-gray-700">{text}</span>
                  </div>
                ))}
              </div>

              <CodeBlock title="#235 LCA of BST" code={`class Solution:
    def lowestCommonAncestor(self, root: TreeNode,
                              p: TreeNode, q: TreeNode) -> TreeNode:
        # p 和 q 都在左邊
        if p.val < root.val and q.val < root.val:
            return self.lowestCommonAncestor(root.left, p, q)

        # p 和 q 都在右邊
        if p.val > root.val and q.val > root.val:
            return self.lowestCommonAncestor(root.right, p, q)

        # 分叉了，或其中一個就是 root → root 就是 LCA
        return root`} />
              <ComplexityBadge time="O(h)  h=樹高" space="O(h)" />

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 font-medium">
                ⚠️ 這題是 <strong>BST</strong> 的 LCA，利用了 BST 的大小關係。如果是普通 Binary Tree（沒有大小關係），需要用不同的解法（Post-order DFS，同時從兩個子樹找）。
              </div>
            </div>

            {/* DFS vs BFS decision */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-amber-500 rounded-full" />
                何時用 DFS，何時用 BFS？
              </h2>
              <div className="grid gap-3">
                {[
                  { when: '需要「按層」處理', use: 'BFS', example: 'Level Order、找最短路徑' },
                  { when: '需要「從底部往上」累積結果', use: 'DFS (Postorder)', example: 'Max Depth、Diameter' },
                  { when: '需要「從頂部往下」傳遞資訊', use: 'DFS (Preorder)', example: 'Validate BST（傳遞範圍）' },
                  { when: '找路徑、找是否存在', use: 'DFS', example: 'Path Sum、Same Tree' },
                  { when: '樹非常深（接近線性），怕 stack overflow', use: 'BFS（迭代）', example: '退化成 Linked List 的樹' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-amber-50/40 rounded-2xl p-5">
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 font-medium">{item.when}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.example}</p>
                    </div>
                    <Chip size="sm" variant="flat" className={`font-bold text-xs shrink-0 ${item.use.startsWith('BFS') ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{item.use}</Chip>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-amber-50/50 border-none shadow-none">
              <CardBody className="p-8 relative overflow-hidden">
                <Quote size={40} className="text-amber-200 absolute -top-2 -left-2 rotate-12" />
                <p className="text-xl font-black text-amber-900 leading-snug relative z-10">
                  BST 題目的核心是利用大小關係「剪枝」——每次可以丟掉一半，把 O(n) 降到 O(h)。這和 Binary Search 的精神完全一樣：每步都能保證目標「不在那裡」，所以可以安全丟掉。
                </p>
              </CardBody>
            </Card>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-[2rem] p-8 space-y-4">
              <p className="font-black text-gray-900 text-lg">本篇重點整理</p>
              <div className="space-y-3">
                {[
                  { emoji: '🔁', text: 'BFS = Queue（deque），popleft() 取出，append() 放入，按層處理' },
                  { emoji: '⚠️', text: 'list.pop(0) 是 O(n)，Queue 操作一定要用 deque.popleft()' },
                  { emoji: '🌲', text: 'Validate BST：傳遞 (min, max) 範圍，每層縮緊，而非只比左右子節點' },
                  { emoji: '🔗', text: 'LCA on BST：p、q 分佈在兩側就是分叉點，純粹利用 BST 大小關係' },
                  { emoji: '🧭', text: '按層 → BFS；底部累積 → Post-order DFS；頂部傳遞 → Pre-order DFS' },
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

          <div className="grid grid-cols-2 gap-4">
            <Link href="/blog/leetcode-ep09-tree-dfs" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.09 — Tree & DFS</p>
              <p className="text-sm text-gray-500 mt-1">遞迴的本質，就是信任自己</p>
            </Link>
            <div className="group block bg-gray-50 rounded-2xl p-6 text-right opacity-50">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-700">EP.11 — Dynamic Programming</p>
              <p className="text-sm text-gray-500 mt-1">即將推出</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'Tree', 'BFS', 'BST', 'Python', 'EP.10'].map((tag) => (
              <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
