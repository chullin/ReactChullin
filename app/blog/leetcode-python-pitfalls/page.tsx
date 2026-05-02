'use client';

import {
  Card,
  CardBody,
  Divider,
  Button,
  Link as HeroLink,
  Chip,
} from '@heroui/react';
import {
  Calendar,
  User,
  ArrowLeft,
  Bookmark,
  Share2,
  Code2,
  Quote,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, language = 'python' }: { code: string; language?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center gap-2 bg-gray-800 px-5 py-3">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
      <span className="ml-3 text-gray-400 text-xs font-mono">{language}</span>
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto leading-relaxed">
      {code}
    </pre>
  </div>
);

const Callout = ({
  type,
  children,
}: {
  type: 'warning' | 'tip';
  children: React.ReactNode;
}) => (
  <div
    className={`flex gap-4 p-6 rounded-2xl my-6 ${
      type === 'warning'
        ? 'bg-amber-50 border border-amber-200'
        : 'bg-green-50 border border-green-200'
    }`}
  >
    <div className="shrink-0 mt-0.5">
      {type === 'warning' ? (
        <AlertTriangle size={20} className="text-amber-500" />
      ) : (
        <CheckCircle size={20} className="text-green-500" />
      )}
    </div>
    <div
      className={`text-sm font-medium leading-relaxed ${
        type === 'warning' ? 'text-amber-800' : 'text-green-800'
      }`}
    >
      {children}
    </div>
  </div>
);

export default function LeetcodePythonPitfallsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f9cf9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center gap-2 mb-6">
              <Chip size="sm" variant="flat" className="bg-blue-500/20 text-blue-300 border-blue-500/30 font-bold uppercase text-[10px]">
                Algorithm
              </Chip>
              <Chip size="sm" variant="flat" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 font-bold uppercase text-[10px]">
                Python
              </Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              LeetCode Python 踩坑紀錄
            </h1>
            <p className="text-xl text-gray-400 font-medium mt-4">
              那些刷題時讓我卡關的 Python 細節，整理給自己也給你
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-white/70 font-bold">
                <User size={16} className="text-blue-400" />
                <span>Joseph Chen</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 font-bold">
                <Calendar size={16} className="text-blue-400" />
                <span>April 30, 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Action Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <Button
              as={Link}
              href="/blog"
              variant="light"
              color="primary"
              className="font-bold"
              startContent={<ArrowLeft size={18} />}
            >
              Back to Blog
            </Button>
            <div className="flex gap-2">
              <Button isIconOnly variant="flat" radius="full" color="default">
                <Bookmark size={18} />
              </Button>
              <Button isIconOnly variant="flat" radius="full" color="default">
                <Share2 size={18} />
              </Button>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-10">
            {/* Intro */}
            <p className="text-xl text-gray-900 font-medium leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
              用 Python 刷 LeetCode 本來應該是最輕鬆的選擇，語法簡潔、標準庫豐富。但有幾個細節讓我在某些題目上連錯好幾次，最後整理成這份紀錄，希望你不要踩同樣的坑。
            </p>

            <p>
              這份筆記來自我的 GitHub repo{' '}
              <HeroLink href="https://github.com/chullin/leetcode" isExternal className="font-bold text-blue-600">
                chullin/leetcode
              </HeroLink>
              ，持續更新中。目前已完成 11 題，每題都嘗試用不同解法（Way1、Way2、Way3）來加深理解。
            </p>

            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                #1　pass by object reference（第 27 題）
              </h2>
              <p>
                這是我踩的第一個大坑。題目要求 in-place 修改陣列，我很直覺地寫：
              </p>
              <CodeBlock code={`# ❌ 這樣寫無法修改原本的 list
nums = new_nums`} />
              <Callout type="warning">
                Python 是 <strong>pass by object reference</strong>。<code>nums = new_nums</code> 只是把區域變數 <code>nums</code> 的指向改掉，原本傳進來的那個 list 完全沒有被動到。
              </Callout>
              <p>
                正確做法是用切片賦值，直接修改原本那塊記憶體的內容：
              </p>
              <CodeBlock code={`# ✅ 切片賦值才能真正改掉原本的陣列
nums[:] = new_nums`} />
              <Callout type="tip">
                記住：<code>nums[:]</code> 是在操作「這個 list 的內容」，而 <code>nums =</code> 是在操作「這個變數指向誰」。兩件完全不同的事。
              </Callout>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                #2　整數除法與四捨五入（第 3643 題）
              </h2>
              <p>
                Python 3 的除法行為和很多語言不同，<code>/</code> 一律回傳 float，而 <code>//</code> 才是整數除法：
              </p>
              <CodeBlock code={`9 / 2   # → 4.5  (float)
9 // 2  # → 4   (integer, floor division)

# 需要 ceil/floor 時要 import math
import math
math.ceil(9 / 2)   # → 5
math.floor(9 / 2)  # → 4`} />
              <p>
                四捨五入更要小心，Python 內建的 <code>round()</code> 使用「銀行家捨入法」（四捨六入五取偶），不是你想像中的普通四捨五入：
              </p>
              <CodeBlock code={`round(2.5)  # → 2  (不是 3！)
round(3.5)  # → 4
round(4.5)  # → 4  (不是 5！)`} />
              <Callout type="warning">
                如果你的答案需要「標準四捨五入」，用 <code>math.floor(x + 0.5)</code> 比 <code>round()</code> 更可靠。
              </Callout>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                #3　Python 的 Tuple Swap（第 3643 題）
              </h2>
              <p>
                這個是 Python 特有的語法糖，用來交換兩個變數超方便，在 Two Pointer 題型裡很常用：
              </p>
              <CodeBlock code={`# 其他語言通常需要暫存變數
temp = list[a]
list[a] = list[b]
list[b] = temp

# Python 可以這樣寫
list[a], list[b] = list[b], list[a]`} />
              <Callout type="tip">
                Python 會先把右邊打包成 tuple <code>(list[b], list[a])</code>，再同時 unpack 到左邊。這個「先求值右邊」的特性保證了交換的正確性，不需要暫存變數。
              </Callout>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                #4　Two Pointer 的思維（第 80、88 題）
              </h2>
              <p>
                做排序相關的題目時，in-place 操作幾乎都要用到 Two Pointer。關鍵是理解 slow / fast 兩個指針各自的職責：
              </p>
              <CodeBlock code={`# slow：下一個有效值要放的位置
# fast：目前正在掃描的位置

# 第 88 題（Merge Sorted Array）：從後往前填
# 因為 nums1 後面有空間，從後面開始才不會蓋掉還沒處理的資料
p1, p2, p = m - 1, n - 1, m + n - 1
while p1 >= 0 and p2 >= 0:
    if nums1[p1] > nums2[p2]:
        nums1[p] = nums1[p1]
        p1 -= 1
    else:
        nums1[p] = nums2[p2]
        p2 -= 1
    p -= 1`} />
              <p>
                第 80 題（Remove Duplicates II）的技巧是：因為每個元素最多出現兩次，陣列前兩個元素一定合法，所以 slow 從 index 2 開始，直接比較 <code>nums[fast]</code> 與 <code>nums[slow - 2]</code>。
              </p>
            </div>

            {/* Quote */}
            <Card className="bg-blue-50/50 border-none shadow-none my-12">
              <CardBody className="p-10 relative overflow-hidden">
                <Quote size={48} className="text-blue-200 absolute -top-2 -left-2 rotate-12" />
                <div className="relative z-10">
                  <p className="text-2xl font-black text-blue-900 leading-snug">
                    "刷題的目的不是背解法，而是把各種思維模式內化成直覺。"
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Progress */}
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-1.5 bg-blue-500 rounded-full" />
                目前進度
              </h2>
              <p>
                目前以 NeetCode 150 的順序為主，已完成：
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { no: '1', title: 'Two Sum', ways: 3 },
                  { no: '12', title: 'Roman to Integer', ways: 3 },
                  { no: '9', title: 'Palindrome Number', ways: 3 },
                  { no: '53', title: 'Maximum Subarray', ways: 2 },
                  { no: '27', title: 'Remove Element', ways: 1 },
                  { no: '217', title: 'Contains Duplicate', ways: 1 },
                  { no: '2', title: 'Add Two Numbers', ways: 1 },
                  { no: '169', title: 'Majority Element', ways: 1 },
                ].map((item) => (
                  <div key={item.no} className="flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4">
                    <span className="text-xs font-black text-gray-400 w-8">#{item.no}</span>
                    <span className="text-sm font-bold text-gray-800 flex-1">{item.title}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: item.ways }).map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-blue-500" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium pt-2">
                * 每個藍點代表一種解法，目標是每題都找到至少兩種解法。
              </p>
            </div>
          </div>

          <Divider className="my-16 opacity-50" />

          <div className="flex items-center gap-4 flex-wrap">
            {['Python', 'LeetCode', 'Algorithm', 'Two Pointer', 'Array'].map((tag) => (
              <Chip key={tag} variant="flat" color="primary" className="font-bold">
                {tag}
              </Chip>
            ))}
          </div>

          <div className="bg-gray-50 p-10 rounded-[2rem] flex flex-col items-center text-center space-y-6">
            <Code2 size={48} className="text-blue-500" />
            <h3 className="text-2xl font-black text-gray-900">看完有收穫嗎？</h3>
            <p className="text-gray-500 font-medium">
              歡迎去 GitHub 看完整的題解紀錄，或繼續閱讀其他文章。
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button
                as={HeroLink}
                href="https://github.com/chullin/leetcode"
                isExternal
                color="primary"
                radius="full"
                size="lg"
                className="font-black px-8"
              >
                View on GitHub
              </Button>
              <Button
                as={Link}
                href="/blog"
                variant="flat"
                size="lg"
                radius="full"
                className="font-bold"
              >
                More Posts
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
