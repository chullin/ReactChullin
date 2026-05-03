'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Bookmark, Share2, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4">
    <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

// Tree node visualization component
const TreeNode = ({
  val, left, right, highlight = false,
}: {
  val: string; left?: string; right?: string; highlight?: boolean;
}) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${highlight ? 'bg-green-100 border-green-500 text-green-700' : 'bg-blue-50 border-blue-400 text-blue-700'}`}>
      {val}
    </div>
    {(left !== undefined || right !== undefined) && (
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-1">
          {left !== undefined && (
            <>
              <div className="w-px h-4 bg-gray-400" />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${left === 'null' ? 'border-gray-200 text-gray-300 bg-gray-50' : 'bg-blue-50 border-blue-400 text-blue-700'}`}>{left}</div>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-1">
          {right !== undefined && (
            <>
              <div className="w-px h-4 bg-gray-400" />
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${right === 'null' ? 'border-gray-200 text-gray-300 bg-gray-50' : 'bg-blue-50 border-blue-400 text-blue-700'}`}>{right}</div>
            </>
          )}
        </div>
      </div>
    )}
  </div>
);

export default function LeetcodeEP09Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-teal-900 to-slate-900">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='20' r='8' fill='%2334d399'/%3E%3Cline x1='40' y1='28' x2='20' y2='50' stroke='%2334d399' stroke-width='2'/%3E%3Cline x1='40' y1='28' x2='60' y2='50' stroke='%2334d399' stroke-width='2'/%3E%3Ccircle cx='20' cy='58' r='8' fill='%2334d399'/%3E%3Ccircle cx='60' cy='58' r='8' fill='%2334d399'/%3E%3C/svg%3E")`, backgroundSize: '80px 80px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-green-500/20 text-green-300 border-green-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-green-500/20 text-green-300 border-green-500/30 font-bold uppercase text-[10px]">EP.09</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Tree & DFS<br />
              <span className="text-green-400">遞迴的本質，就是信任自己</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">#104 Max Depth · #100 Same Tree · #226 Invert — 三題打通 DFS 思維</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-green-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-green-400" /><span>2024</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <Button as={Link} href="/blog" variant="light" color="primary" className="font-bold" startContent={<ArrowLeft size={18} />}>Back to Blog</Button>
            <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-1.5"><Clock size={16} /> <span>5 min read</span></div>
              <div className="flex items-center gap-1.5"><Eye size={16} /> <span>1.2k views</span></div>
            </div>
          </div>

          <div className="space-y-10 text-gray-600 leading-relaxed">
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-green-600">
              Tree 是 NeetCode 150 裡面被標注「🔥🔥 Super Important」的主題。幾乎所有 Tree 題都可以用遞迴（DFS）解——但「遞迴」對很多人來說是個謎。這篇用三道題，把遞迴的思維方式說清楚：<strong>你只需要定義好「這個函式做什麼」，然後信任它對子節點也成立</strong>。
            </p>

            {/* Tree Structure */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-green-500 rounded-full" />
                Binary Tree 的結構
              </h2>
              <p>每個節點最多有兩個子節點（left 和 right）。沒有子節點的叫葉節點（Leaf）。</p>
              <div className="flex justify-center bg-gray-50 rounded-2xl p-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 bg-green-100 border-green-500 text-green-700">3</div>
                  <div className="flex gap-16">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-px h-5 bg-gray-300" />
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 bg-blue-50 border-blue-400 text-blue-700">9</div>
                      <div className="text-xs text-gray-400 font-bold">left</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-px h-5 bg-gray-300" />
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 bg-blue-50 border-blue-400 text-blue-700">20</div>
                      <div className="text-xs text-gray-400 font-bold">right</div>
                    </div>
                  </div>
                  <div className="flex gap-40 mt-2">
                    <div className="text-xs text-gray-400 font-mono">None None</div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 bg-blue-50 border-blue-400 text-blue-700">15</div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 bg-blue-50 border-blue-400 text-blue-700">7</div>
                    </div>
                  </div>
                </div>
              </div>
              <CodeBlock title="Python 的 TreeNode 定義（LeetCode 固定格式）" code={`class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right`} />
            </div>

            {/* DFS concept */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-green-500 rounded-full" />
                DFS 遞迴的思維方式
              </h2>
              <p>寫 Tree 遞迴題時，很多人的錯誤是「試圖在腦中追蹤所有層的執行過程」——這是不可能的，也不需要。</p>
              <p>正確的思維：</p>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 space-y-3">
                {[
                  { num: '1', text: '定義清楚：這個函式「對一個 node」做什麼、回傳什麼' },
                  { num: '2', text: '寫好 base case：node 是 None 時怎麼辦' },
                  { num: '3', text: '假設：左子樹和右子樹已經得到了正確答案（信任遞迴）' },
                  { num: '4', text: '組合：把左右子樹的答案組合成當前 node 的答案' },
                ].map(item => (
                  <div key={item.num} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-200 text-green-800 font-black text-xs flex items-center justify-center shrink-0">{item.num}</div>
                    <span className="text-green-900 font-medium text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* #104 Max Depth */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-green-500 rounded-full" />
                #104 Maximum Depth of Binary Tree
              </h2>
              <p>一棵 Binary Tree 的「最大深度」= 從 root 到最遠葉節點的層數。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`     3
    / \\
   9  20
      / \\
     15   7

Output: 3   ← root(3) → 20 → 15 or 7，共 3 層`} />
                </CardBody>
              </Card>

              <p>套入思維框架：</p>
              <div className="space-y-2 pl-4">
                {[
                  ['1. 函式定義', 'maxDepth(node) 回傳以 node 為根的子樹最大深度'],
                  ['2. Base case', 'node 是 None → 深度是 0'],
                  ['3. 信任遞迴', '左子樹深度 = maxDepth(node.left)，右子樹深度 = maxDepth(node.right)'],
                  ['4. 組合答案', '當前節點的深度 = max(左深, 右深) + 1（加上自己這層）'],
                ].map(([label, desc]) => (
                  <div key={label} className="flex items-start gap-3 text-sm">
                    <span className="font-black text-green-600 shrink-0 w-24">{label}</span>
                    <span className="text-gray-700">{desc}</span>
                  </div>
                ))}
              </div>

              <CodeBlock title="#104 Maximum Depth of Binary Tree" code={`class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if root is None:            # base case
            return 0

        left_depth  = self.maxDepth(root.left)   # 信任左子樹
        right_depth = self.maxDepth(root.right)  # 信任右子樹

        return max(left_depth, right_depth) + 1  # 組合 + 自己這層`} />
              <ComplexityBadge time="O(n)" space="O(h)  h=樹高，遞迴呼叫棧深度" />

              <div className="bg-gray-50 rounded-2xl p-5 text-sm space-y-2">
                <p className="font-black text-gray-800">遞迴展開過程（上面的範例）：</p>
                <div className="font-mono text-xs space-y-1 text-gray-600">
                  <div>maxDepth(3)</div>
                  <div className="pl-4">→ maxDepth(9) = max(0,0)+1 = <span className="text-green-600 font-black">1</span></div>
                  <div className="pl-4">→ maxDepth(20)</div>
                  <div className="pl-8">→ maxDepth(15) = max(0,0)+1 = <span className="text-green-600 font-black">1</span></div>
                  <div className="pl-8">→ maxDepth(7)  = max(0,0)+1 = <span className="text-green-600 font-black">1</span></div>
                  <div className="pl-4">→ maxDepth(20) = max(1,1)+1 = <span className="text-green-600 font-black">2</span></div>
                  <div>→ maxDepth(3)  = max(1,2)+1 = <span className="text-green-600 font-black">3</span> ✅</div>
                </div>
              </div>
            </div>

            {/* #100 Same Tree */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-green-500 rounded-full" />
                #100 Same Tree
              </h2>
              <p>判斷兩棵樹是否完全相同（結構和值都一樣）。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`p:    1        q:    1
     / \\            / \\
    2   3          2   3
→ True  （完全相同）

p:    1        q:    1
     /              \\
    2                2
→ False （結構不同）`} />
                </CardBody>
              </Card>

              <p>套入思維框架：</p>
              <div className="space-y-2 pl-4">
                {[
                  ['Base case', 'p 和 q 都是 None → True；其中一個是 None → False'],
                  ['信任遞迴', 'isSameTree(p.left, q.left) 和 isSameTree(p.right, q.right)'],
                  ['組合答案', '當前節點值相同 AND 左子樹相同 AND 右子樹相同'],
                ].map(([label, desc]) => (
                  <div key={label} className="flex items-start gap-3 text-sm">
                    <span className="font-black text-green-600 shrink-0 w-20">{label}</span>
                    <span className="text-gray-700">{desc}</span>
                  </div>
                ))}
              </div>

              <CodeBlock title="#100 Same Tree" code={`class Solution:
    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
        # base case：兩個都是 None → 相同
        if not p and not q:
            return True
        # 其中一個是 None，或值不同 → 不相同
        if not p or not q or p.val != q.val:
            return False

        # 信任遞迴，左右子樹都要相同
        return (self.isSameTree(p.left, q.left) and
                self.isSameTree(p.right, q.right))`} />
              <ComplexityBadge time="O(n)" space="O(h)" />
            </div>

            {/* #226 Invert */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-green-500 rounded-full" />
                #226 Invert Binary Tree
              </h2>
              <p>把每個節點的左右子樹互換，遞迴翻轉整棵樹。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`     4                4
    / \\              / \\
   2   7    →      7   2
  / \\ / \\        / \\ / \\
 1  3 6  9      9  6 3  1`} />
                </CardBody>
              </Card>

              <p>套入思維框架：</p>
              <div className="space-y-2 pl-4">
                {[
                  ['Base case', 'node 是 None → 直接回傳 None'],
                  ['信任遞迴', 'invertTree(node.left) 回傳翻轉後的左子樹；invertTree(node.right) 同理'],
                  ['組合答案', '把兩個翻轉後的子樹交叉接回：node.left = 翻轉右，node.right = 翻轉左'],
                ].map(([label, desc]) => (
                  <div key={label} className="flex items-start gap-3 text-sm">
                    <span className="font-black text-green-600 shrink-0 w-20">{label}</span>
                    <span className="text-gray-700">{desc}</span>
                  </div>
                ))}
              </div>

              <CodeBlock title="#226 Invert Binary Tree" code={`class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if root is None:
            return None

        # 先翻轉左右子樹（信任遞迴）
        left  = self.invertTree(root.left)
        right = self.invertTree(root.right)

        # 交叉接回
        root.left  = right
        root.right = left

        return root`} />
              <ComplexityBadge time="O(n)" space="O(h)" />

              <p>或者用一行 Python 同時完成：</p>
              <CodeBlock title="更簡潔的寫法" code={`class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if root is None:
            return None

        # Python tuple 先求值右邊再賦值（還記得 EP.01 的 swap 嗎？）
        root.left, root.right = (
            self.invertTree(root.right),
            self.invertTree(root.left)
        )
        return root`} />
            </div>

            {/* Three DFS traversals */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-green-500 rounded-full" />
                DFS 的三種遍歷順序
              </h2>
              <p>根據「何時處理當前節點」分成三種，<strong>只差一行的位置</strong>：</p>
              <CodeBlock title="Pre / In / Post-order DFS" code={`def dfs(node):
    if not node:
        return

    # ── Preorder（前序）：先處理自己，再遞迴子樹
    process(node.val)
    dfs(node.left)
    dfs(node.right)

    # ── Inorder（中序）：左 → 自己 → 右
    dfs(node.left)
    process(node.val)
    dfs(node.right)

    # ── Postorder（後序）：先遞迴子樹，最後處理自己
    dfs(node.left)
    dfs(node.right)
    process(node.val)`} />
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { name: 'Preorder', order: 'root → left → right', usage: 'Clone tree、Serialize tree' },
                  { name: 'Inorder', order: 'left → root → right', usage: 'BST → Sorted array（BST 的特性）' },
                  { name: 'Postorder', order: 'left → right → root', usage: 'Max Depth、Bottom-up 計算' },
                ].map((item) => (
                  <div key={item.name} className="bg-green-50/60 rounded-2xl p-4 space-y-1">
                    <p className="font-black text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-green-700 font-mono">{item.order}</p>
                    <p className="text-xs text-gray-500">{item.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-green-50/50 border-none shadow-none">
              <CardBody className="p-8 relative overflow-hidden">
                <Quote size={40} className="text-green-200 absolute -top-2 -left-2 rotate-12" />
                <p className="text-xl font-black text-green-900 leading-snug relative z-10">
                  遞迴寫 Tree 題的關鍵心態：不要試圖在腦中追蹤所有層的狀態。你只需要問：「如果左右子樹都已經給出了正確答案，我怎麼把它們組合起來？」這一步想清楚，剩下的交給 Python 的呼叫棧。
                </p>
              </CardBody>
            </Card>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-[2rem] p-8 space-y-4">
              <p className="font-black text-gray-900 text-lg">本篇重點整理</p>
              <div className="space-y-3">
                {[
                  { emoji: '🌳', text: 'Tree DFS = 遞迴，四步：定義、base case、信任遞迴、組合答案' },
                  { emoji: '📏', text: 'Max Depth：max(左深, 右深) + 1，Postorder 思維' },
                  { emoji: '🪞', text: 'Same Tree：值相同 AND 左子樹相同 AND 右子樹相同' },
                  { emoji: '🔄', text: 'Invert：翻轉左右子樹後，交叉接回 root.left / root.right' },
                  { emoji: '📋', text: 'Pre/In/Post-order 只差「何時 process(node)」，放的位置不同' },
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
            <Link href="/blog/leetcode/ep08-linked-list" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.08 — Linked List</p>
              <p className="text-sm text-gray-500 mt-1">Pointer 操作與 Dummy Node</p>
            </Link>
            <Link href="/blog/leetcode/ep10-tree-bfs-bst" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.10 — Tree BFS & BST</p>
              <p className="text-sm text-gray-500 mt-1">Level Order、Validate BST、LCA</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'Tree', 'DFS', 'Recursion', 'Python', 'EP.09'].map((tag) => (
              <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
