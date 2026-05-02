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

// Linked List node visualization
const NodeBox = ({ val, isNull = false, arrow = true }: { val: string; isNull?: boolean; arrow?: boolean }) => (
  <div className="flex items-center gap-1">
    <div className={`px-4 py-3 rounded-xl border-2 font-mono text-sm font-black min-w-[60px] text-center ${isNull ? 'border-gray-300 text-gray-400 bg-gray-50' : 'border-blue-400 text-blue-700 bg-blue-50'}`}>
      {val}
    </div>
    {arrow && <span className="text-gray-400 font-black mx-1">→</span>}
  </div>
);

export default function LeetcodeEP08Page() {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `repeating-linear-gradient(90deg, #2dd4bf 0, #2dd4bf 1px, transparent 0, transparent 80px)` }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-teal-500/20 text-teal-300 border-teal-500/30 font-bold uppercase text-[10px]">LeetCode 刷題日記</Chip>
              <Chip size="sm" variant="flat" className="bg-teal-500/20 text-teal-300 border-teal-500/30 font-bold uppercase text-[10px]">EP.08</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Linked List<br />
              <span className="text-teal-400">Pointer 操作的思維方式</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mt-4">#206 Reverse · #21 Merge · #141 Cycle — Linked List 三大核心題</p>
            <div className="flex items-center justify-center gap-6 mt-7">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><User size={14} className="text-teal-400" /><span>Joseph Chen</span></div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm"><Calendar size={14} className="text-teal-400" /><span>2024</span></div>
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
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-teal-600">
              Linked List 題目讓很多人頭痛，不是因為邏輯複雜，而是因為同時在腦海中追蹤多個 pointer 的位置很容易搞亂。這篇用圖示化的方式，把 Reverse、Merge、Cycle 三個核心題的 pointer 操作說清楚。
            </p>

            {/* Structure */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-teal-500 rounded-full" />
                Linked List 的結構
              </h2>
              <p>Linked List 的每個節點（Node）包含兩樣東西：值（val）和指向下一個節點的 pointer（next）。</p>
              <div className="flex items-center flex-wrap gap-1 bg-gray-50 rounded-2xl p-6">
                {[1, 2, 3, 4].map((v, i) => (
                  <NodeBox key={v} val={String(v)} arrow={i < 3} />
                ))}
                <NodeBox val="None" isNull arrow={false} />
              </div>
              <CodeBlock title="Python 的 ListNode 定義" code={`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 建立 1 → 2 → 3 → None
node3 = ListNode(3)
node2 = ListNode(2, node3)
node1 = ListNode(1, node2)
head = node1`} />
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 font-medium">
                ⚠️ LeetCode 的 Linked List 題目，Node 的定義是固定的，你只需要操作 <code>head</code>（第一個 node 的 pointer）。<strong>操作 Linked List 的核心：改變 <code>.next</code> 的指向</strong>，而不是移動資料本身。
              </div>
            </div>

            {/* Reverse Linked List */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-teal-500 rounded-full" />
                #206 Reverse Linked List
              </h2>
              <p>把 <code className="bg-gray-100 px-1 rounded text-sm font-mono">1 → 2 → 3 → 4 → None</code> 變成 <code className="bg-gray-100 px-1 rounded text-sm font-mono">4 → 3 → 2 → 1 → None</code>。</p>
              <p>需要三個 pointer：<code className="bg-gray-100 px-1 rounded text-sm font-mono">prev</code>（前一個）、<code className="bg-gray-100 px-1 rounded text-sm font-mono">curr</code>（當前）、<code className="bg-gray-100 px-1 rounded text-sm font-mono">next_node</code>（暫存下一個，避免斷鏈）。</p>

              {/* Visual trace */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4 overflow-x-auto">
                <p className="font-black text-gray-700 text-sm">指針移動過程（1→2→3→None）：</p>
                {[
                  { step: '初始', prev: 'None', curr: '1', note: '從 head 開始' },
                  { step: '第1輪', prev: '1', curr: '2', note: '1.next = None，curr 往前' },
                  { step: '第2輪', prev: '2', curr: '3', note: '2.next = 1，curr 往前' },
                  { step: '第3輪', prev: '3', curr: 'None', note: '3.next = 2，curr = None 停止' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-6 text-xs">
                    <span className="font-bold text-gray-500 w-14 shrink-0">{row.step}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">prev=</span>
                      <span className={`font-mono font-black px-2 py-1 rounded ${row.prev === 'None' ? 'bg-gray-100 text-gray-400' : 'bg-teal-100 text-teal-700'}`}>{row.prev}</span>
                      <span className="text-gray-400 ml-2">curr=</span>
                      <span className={`font-mono font-black px-2 py-1 rounded ${row.curr === 'None' ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-700'}`}>{row.curr}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{row.note}</span>
                  </div>
                ))}
              </div>

              <CodeBlock title="#206 Reverse Linked List — Iterative" code={`class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        prev = None
        curr = head

        while curr:
            next_node = curr.next   # 1. 先存好下一個，避免斷鏈
            curr.next = prev        # 2. 反轉 pointer
            prev = curr             # 3. prev 往前
            curr = next_node        # 4. curr 往前

        return prev   # curr 變 None 時，prev 就是新的 head`} />
              <ComplexityBadge time="O(n)" space="O(1)" />

              <p>也可以用遞迴解，但 iterative 版本的空間複雜度是 O(1)，是面試首選。</p>
            </div>

            {/* Dummy Node */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-teal-500 rounded-full" />
                Dummy Node：讓邊界情況消失的技巧
              </h2>
              <p>
                Linked List 操作最麻煩的是邊界情況：head 是 None 怎麼辦？要插入第一個節點怎麼辦？<strong>Dummy Node</strong> 是一個虛擬的前置節點，讓你不用對 head 做特殊處理。
              </p>
              <CodeBlock title="Dummy Node 概念" code={`# 沒有 Dummy Node：需要特別處理 head 是 None 的情況
if head is None:
    head = new_node
else:
    # ... 一般邏輯

# 有 Dummy Node：統一處理，不需要特判
dummy = ListNode(0)
dummy.next = head
curr = dummy
# ... 一般邏輯（所有 insert 都是 curr.next = ...）
return dummy.next   # 跳過 dummy，回傳真正的 head`} />
            </div>

            {/* Merge Two Sorted Lists */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-teal-500 rounded-full" />
                #21 Merge Two Sorted Lists
              </h2>
              <p>把兩個排序好的 Linked List 合併成一個排序好的 Linked List。</p>
              <Card className="bg-gray-50 border-none shadow-none">
                <CardBody className="p-6">
                  <CodeBlock title="Input / Output" code={`list1: 1 → 2 → 4 → None
list2: 1 → 3 → 4 → None

output: 1 → 1 → 2 → 3 → 4 → 4 → None`} />
                </CardBody>
              </Card>
              <p>用 Dummy Node + 兩個 pointer 同時遍歷，每次選較小的接上去：</p>
              <CodeBlock title="#21 Merge Two Sorted Lists" code={`class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(0)   # Dummy Node 避免處理 head
        curr = dummy

        while l1 and l2:
            if l1.val <= l2.val:
                curr.next = l1
                l1 = l1.next
            else:
                curr.next = l2
                l2 = l2.next
            curr = curr.next

        # 把剩下的直接接上（不用再逐一比較）
        curr.next = l1 if l1 else l2

        return dummy.next`} />
              <ComplexityBadge time="O(n + m)" space="O(1)" />
            </div>

            {/* Cycle Detection */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-teal-500 rounded-full" />
                #141 Linked List Cycle：快慢指針
              </h2>
              <p>判斷 Linked List 有沒有環（某個節點的 next 指向前面的節點）。</p>
              <p>
                最聰明的解法是 <strong>Floyd's Cycle Detection（龜兔賽跑算法）</strong>：一個慢指針每次走一步，一個快指針每次走兩步。如果有環，快指針一定會追上慢指針；如果沒有環，快指針會先到 None。
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 overflow-x-auto">
                <p className="font-black text-gray-700 text-sm mb-4">有環的情況（1 → 2 → 3 → 4 → 2 loop）：</p>
                <div className="space-y-2 font-mono text-xs">
                  {[
                    { step: '初始', slow: '1', fast: '1' },
                    { step: '第1步', slow: '2', fast: '3' },
                    { step: '第2步', slow: '3', fast: '2 (loop)' },
                    { step: '第3步', slow: '4', fast: '4 ← 相遇！→ 有環' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <span className="text-gray-400 w-14">{row.step}</span>
                      <span className="text-teal-600"><span className="text-gray-400">🐢 slow=</span>{row.slow}</span>
                      <span className="text-orange-600"><span className="text-gray-400">🐇 fast=</span>{row.fast}</span>
                    </div>
                  ))}
                </div>
              </div>

              <CodeBlock title="#141 Linked List Cycle — Floyd's Algorithm" code={`class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next          # 走一步
            fast = fast.next.next     # 走兩步

            if slow == fast:          # 相遇 → 有環
                return True

        return False   # fast 到 None → 無環`} />
              <ComplexityBadge time="O(n)" space="O(1)" />

              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-sm text-teal-800 font-medium space-y-2">
                <p><strong>為什麼快指針一定能追上慢指針？</strong></p>
                <p>進入環之後，每一輪快指針比慢指針多走一步。如果環長度是 k，最多 k 輪之內，快指針就會追上慢指針。</p>
              </div>
            </div>

            {/* Pattern Summary */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-teal-500 rounded-full" />
                Linked List 的四個核心技巧
              </h2>
              <div className="grid gap-3">
                {[
                  {
                    icon: '🔄',
                    title: 'Pointer 反轉',
                    desc: '操作前先存好 next_node，避免斷鏈。三個 pointer：prev、curr、next_node。',
                    usage: 'Reverse Linked List',
                  },
                  {
                    icon: '👻',
                    title: 'Dummy Node',
                    desc: '在 head 前放虛擬節點，統一邊界處理，最後回傳 dummy.next。',
                    usage: 'Merge Two Lists、Remove Nth Node',
                  },
                  {
                    icon: '🐢🐇',
                    title: 'Fast & Slow Pointer',
                    desc: '快指針走兩步、慢指針走一步，用來找環、找中點、找倒數第 k 個。',
                    usage: 'Linked List Cycle、Find Middle',
                  },
                  {
                    icon: '📏',
                    title: '固定間距雙指針',
                    desc: '兩個指針保持固定距離，快指針先走 k 步，再同時移動。',
                    usage: 'Remove Nth Node From End',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-teal-50/40 rounded-2xl p-5">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-black text-gray-900 text-sm">{item.title}</p>
                        <Chip size="sm" variant="flat" className="text-teal-700 bg-teal-100 font-bold text-[10px]">{item.usage}</Chip>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-teal-50/50 border-none shadow-none">
              <CardBody className="p-8 relative overflow-hidden">
                <Quote size={40} className="text-teal-200 absolute -top-2 -left-2 rotate-12" />
                <p className="text-xl font-black text-teal-900 leading-snug relative z-10">
                  Linked List 題目的訣竅：在紙上把節點畫出來，一步一步追蹤 pointer 的位置。寫程式前先確認每一步的狀態，操作前先存好 <code>next</code>，否則一斷鏈就找不回來了。
                </p>
              </CardBody>
            </Card>

            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-[2rem] p-8 space-y-4">
              <p className="font-black text-gray-900 text-lg">本篇重點整理</p>
              <div className="space-y-3">
                {[
                  { emoji: '🔗', text: 'Linked List 操作 = 改變 .next 的指向，不是移動資料' },
                  { emoji: '💾', text: '操作前先 next_node = curr.next，防止斷鏈找不回來' },
                  { emoji: '👻', text: 'Dummy Node 消滅邊界特判，幾乎所有 insert/remove 都用得到' },
                  { emoji: '🐢🐇', text: 'Floyd 快慢指針：有環就會相遇，O(1) 空間解決 Cycle 偵測' },
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
            <Link href="/blog/leetcode-ep07-binary-search" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.07 — Binary Search</p>
              <p className="text-sm text-gray-500 mt-1">每次砍掉一半，O(log n) 的魔法</p>
            </Link>
            <div className="group block bg-gray-50 rounded-2xl p-6 text-right opacity-50">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-700">EP.09 — Tree & DFS/BFS</p>
              <p className="text-sm text-gray-500 mt-1">即將推出</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap pt-4">
            {['LeetCode', 'Linked List', 'Two Pointers', 'Python', 'EP.08'].map((tag) => (
              <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
