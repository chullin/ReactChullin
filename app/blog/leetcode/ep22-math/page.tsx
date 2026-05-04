'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

/* 數字格 */
const DigitBox = ({
  val,
  color = 'default',
}: {
  val: string | number;
  color?: 'default' | 'green' | 'emerald' | 'gray' | 'red';
}) => {
  const map: Record<string, string> = {
    default:  'bg-white border-gray-200 text-gray-700',
    green:    'bg-green-100 border-green-400 text-green-800',
    emerald:  'bg-emerald-100 border-emerald-400 text-emerald-800',
    gray:     'bg-gray-100 border-gray-300 text-gray-400',
    red:      'bg-red-100 border-red-400 text-red-800',
  };
  return (
    <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black text-sm ${map[color]}`}>
      {val}
    </div>
  );
};

export default function LeetCodeEP22() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.22</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">LeetCode 刷題日記</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Math<br />
              <span className="text-emerald-200">數學解題技巧</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              #9 Palindrome Number · #50 Pow(x, n) · #202 Happy Number · #204 Count Primes
              — 快速冪、篩法、Floyd 判環，把數學性質變成演算法武器
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Fast Power · Sieve · Cycle Detection</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* 開場 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-emerald-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「計算 2 的 100 次方。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    如果你用迴圈乘 100 次，沒有問題。但如果是 2 的 10 億次方呢？
                    快速冪告訴我們：先算 2²=4，再算 4²=16，再算 16²=256……
                    每次「平方」就把指數減半，只需要 log₂(n) 步。
                    這就是 Math 類題目的精髓——觀察數學規律，把 O(n) 壓縮成 O(log n) 甚至 O(1)。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="opacity-30" />

        {/* 問題一：#9 Palindrome Number */}
        <section className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="bg-emerald-600 text-white font-black px-4 py-2 rounded-xl text-lg shrink-0">#9</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Palindrome Number</h2>
              <p className="text-gray-500 mt-1">判斷一個整數是否是回文數，不能轉成字串</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="font-black text-gray-700">範例</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-gray-500 mb-2">121 → True</p>
                <div className="flex gap-1">
                  {['1','2','1'].map((d, i) => <DigitBox key={i} val={d} color="emerald" />)}
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-2">-121 → False</p>
                <div className="flex gap-1">
                  {['-','1','2','1'].map((d, i) => <DigitBox key={i} val={d} color={d === '-' ? 'red' : 'gray'} />)}
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-2">120 → False（結尾 0）</p>
                <div className="flex gap-1">
                  {['1','2','0'].map((d, i) => <DigitBox key={i} val={d} color={d === '0' ? 'red' : 'gray'} />)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <p className="font-black text-gray-900 text-lg">關鍵思路：只反轉後半段</p>
            <p className="text-gray-600 leading-relaxed">
              不需要完整反轉整個數字。把後半段的數字逐位「撥進」 <code className="bg-gray-100 px-1 rounded font-mono">reversed_half</code>，
              直到 <code className="bg-gray-100 px-1 rounded font-mono">x &lt;= reversed_half</code>（代表後半段已處理完畢）。
              最後比較前後兩半是否相等。
            </p>

            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">x = 1221 的過程</p>
              {[
                { x: 1221, rev: 0, note: '初始' },
                { x: 122,  rev: 1, note: 'rev = 0*10 + 1%10 = 1，x = 1221//10 = 122' },
                { x: 12,   rev: 12, note: 'rev = 1*10 + 2 = 12，x = 12' },
              ].map(({ x, rev, note }, i) => (
                <div key={i} className="flex flex-wrap gap-4 items-center text-sm font-mono">
                  <span className="text-gray-500 w-6">{i}</span>
                  <span className="text-emerald-700">x={x}</span>
                  <span className="text-gray-400">rev={rev}</span>
                  <span className="text-gray-400 text-xs font-sans">{note}</span>
                </div>
              ))}
              <p className="text-emerald-700 font-black text-sm">x (12) == rev (12) → True ✓</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-black text-amber-800 text-sm mb-2">Edge Case：先排除這兩種情況</p>
              <ul className="text-amber-700 text-sm space-y-1 list-disc list-inside">
                <li>負數：<code className="font-mono">x &lt; 0</code> → False</li>
                <li>末尾為 0 且非 0：<code className="font-mono">x % 10 == 0 and x != 0</code> → False（反轉後前面會有多餘的 0）</li>
              </ul>
            </div>

            <p className="text-gray-500 text-sm">
              奇數位數（如 121）：迴圈結束時 <code className="bg-gray-100 px-1 rounded font-mono">x = 1</code>，
              <code className="bg-gray-100 px-1 rounded font-mono">rev = 12</code>，
              比較 <code className="bg-gray-100 px-1 rounded font-mono">x == rev // 10</code> 即可（忽略中間那位）。
            </p>
            <ComplexityBadge time="O(log n)" space="O(1)" />
          </div>

          <CodeBlock
            title="palindrome_number.py"
            code={`def isPalindrome(x: int) -> bool:
    if x < 0 or (x % 10 == 0 and x != 0):
        return False

    reversed_half = 0
    while x > reversed_half:
        reversed_half = reversed_half * 10 + x % 10
        x //= 10

    # 偶數位：x == reversed_half
    # 奇數位：x == reversed_half // 10（忽略中間那位）
    return x == reversed_half or x == reversed_half // 10`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 問題二：#50 Pow(x, n) */}
        <section className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="bg-green-600 text-white font-black px-4 py-2 rounded-xl text-lg shrink-0">#50</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Pow(x, n)</h2>
              <p className="text-gray-500 mt-1">實作 pow(x, n)，n 可能為負整數</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="text-gray-700 font-black mb-2">Input: x = 2.0, n = 10 → Output: 1024.0</p>
            <p className="text-gray-700 font-black">Input: x = 2.0, n = -2 → Output: 0.25</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <p className="font-black text-gray-900 text-lg">快速冪（Binary Exponentiation）</p>
            <p className="text-gray-600 leading-relaxed">
              核心思路：<strong>每次把指數減半，底數自乘</strong>。
            </p>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="font-black text-green-800 text-sm mb-2">遞推公式</p>
              <div className="font-mono text-sm space-y-1 text-gray-700">
                <p>x^n = (x²)^(n/2)          &nbsp; 若 n 為偶數</p>
                <p>x^n = x · (x²)^((n-1)/2)  &nbsp; 若 n 為奇數</p>
                <p>x^0 = 1                    &nbsp; 基底</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-100 space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">2^10 的計算過程</p>
              {[
                { n: 10, x: '2',   note: 'n 偶 → 2^10 = (2²)^5', next: '4^5' },
                { n: 5,  x: '4',   note: 'n 奇 → 4^5 = 4 · (4²)^2', next: '4 · 16^2' },
                { n: 2,  x: '16',  note: 'n 偶 → 16^2 = (16²)^1', next: '256^1' },
                { n: 1,  x: '256', note: 'n 奇 → 256^1 = 256 · (256²)^0', next: '256 · 1 = 256' },
              ].map(({ n, x, note, next }) => (
                <div key={n} className="flex flex-wrap gap-3 items-center text-sm">
                  <span className="font-mono text-green-700 w-16">n={n}</span>
                  <span className="font-mono text-gray-600 w-8">x={x}</span>
                  <span className="text-gray-400 text-xs">{note}</span>
                  <span className="text-gray-300">→</span>
                  <span className="font-mono text-green-600 font-bold">{next}</span>
                </div>
              ))}
              <p className="text-green-700 font-black text-sm">4 · 256 = 1024 ✓（回溯收集奇數位的餘數）</p>
            </div>

            <ComplexityBadge time="O(log n)" space="O(log n) 遞迴 / O(1) 迭代" />
          </div>

          <CodeBlock
            title="pow_x_n.py"
            code={`# 遞迴版（面試常考）
def myPow(x: float, n: int) -> float:
    if n == 0:
        return 1.0
    if n < 0:
        x, n = 1 / x, -n

    if n % 2 == 0:
        return myPow(x * x, n // 2)
    else:
        return x * myPow(x * x, n // 2)


# 迭代版（O(1) space，更優）
def myPow_iter(x: float, n: int) -> float:
    if n < 0:
        x, n = 1 / x, -n

    result = 1.0
    while n:
        if n & 1:          # n 為奇數：把目前的 x 乘進 result
            result *= x
        x *= x             # 底數平方
        n >>= 1            # 指數右移（除以 2）
    return result`}
          />

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="font-black text-amber-800 mb-2">迭代版的位元思維</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              把 n 看成二進位。例如 10 = 1010₂。從最低位開始，遇到 1 就把當前的 x 乘進 result，
              然後底數平方。等效於 x^8 · x^2 = x^10，
              因為 8+2=10，恰好對應二進位的 1 的位置。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 問題三：#202 Happy Number */}
        <section className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="bg-emerald-500 text-white font-black px-4 py-2 rounded-xl text-lg shrink-0">#202</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Happy Number</h2>
              <p className="text-gray-500 mt-1">反覆對各位數字的平方和做替換，若最終到達 1 則是 happy number</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="font-black text-gray-700">Input: n = 19</p>
            <div className="flex flex-wrap gap-2 items-center text-sm font-mono text-gray-600">
              {['19', '1²+9²=82', '8²+2²=68', '6²+8²=100', '1²+0²+0²=1'].map((s, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-gray-300">→</span>}
                  <span className={s === '1' ? 'text-emerald-600 font-black' : ''}>{s}</span>
                </span>
              ))}
            </div>
            <p className="text-emerald-600 font-black text-sm">最終到達 1 → True（happy number）</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <p className="font-black text-gray-900 text-lg">核心問題：會無限循環嗎？</p>
            <p className="text-gray-600 leading-relaxed">
              是的。不是 happy number 的數，一定會進入一個循環，永遠不會到達 1。
              只要能偵測循環，就能判斷結果。
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="font-black text-gray-800 mb-3">方法一：HashSet</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  把每次計算的結果存入 set。
                  若再次出現 → 進入循環 → False。
                  若出現 1 → True。
                </p>
                <ComplexityBadge time="O(log n)" space="O(log n)" />
              </div>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <p className="font-black text-emerald-800 mb-3">方法二：Floyd 判環（O(1) space）</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  同 Linked List Cycle 技巧：slow 走一步，fast 走兩步。
                  若 fast 到達 1 → True。
                  若 slow == fast（相遇）→ 進入循環 → False。
                </p>
                <ComplexityBadge time="O(log n)" space="O(1)" />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 space-y-3">
            <p className="font-black text-emerald-800 mb-3">Floyd 判環視覺化（n=4，非 happy）</p>
            <div className="space-y-2 text-sm font-mono">
              {[
                { step: 0, slow: 4,  fast: 4,  note: '初始' },
                { step: 1, slow: 16, fast: 37, note: 'slow=next(4)=16，fast=next(next(4))=next(16)=37' },
                { step: 2, slow: 37, fast: 58, note: 'slow=next(16)=37，fast=next(37)=58' },
                { step: 3, slow: 58, fast: 37, note: 'slow=next(37)=58，fast=next(58)=89→next=145→next=42→next=20→next=4→next=16→next=37' },
              ].map(({ step, slow, fast, note }) => (
                <div key={step} className="flex flex-wrap gap-4 items-center">
                  <span className="text-gray-400 w-4">{step}</span>
                  <span className="text-emerald-700">slow={slow}</span>
                  <span className="text-green-700">fast={fast}</span>
                  <span className="text-gray-400 text-xs font-sans">{note}</span>
                </div>
              ))}
              <p className="text-red-600 font-black pt-1">slow == fast（循環）→ False</p>
            </div>
          </div>

          <CodeBlock
            title="happy_number.py"
            code={`def isHappy(n: int) -> bool:
    def get_next(num: int) -> int:
        total = 0
        while num:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    # 方法一：HashSet
    seen = set()
    while n != 1:
        if n in seen:
            return False
        seen.add(n)
        n = get_next(n)
    return True


def isHappy_floyd(n: int) -> bool:
    def get_next(num: int) -> int:
        total = 0
        while num:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    # 方法二：Floyd 判環（O(1) space）
    slow, fast = n, get_next(n)
    while fast != 1 and slow != fast:
        slow = get_next(slow)
        fast = get_next(get_next(fast))
    return fast == 1`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 問題四：#204 Count Primes */}
        <section className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="bg-teal-600 text-white font-black px-4 py-2 rounded-xl text-lg shrink-0">#204</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Count Primes</h2>
              <p className="text-gray-500 mt-1">計算小於 n 的質數個數</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="text-gray-700 font-black mb-2">Input: n = 10</p>
            <p className="text-gray-600">小於 10 的質數：2, 3, 5, 7 → 共 <span className="font-black text-teal-700">4</span> 個</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <p className="font-black text-gray-900 text-lg">Sieve of Eratosthenes（埃拉托斯特尼篩法）</p>
            <p className="text-gray-600 leading-relaxed">
              建立布林陣列 <code className="bg-gray-100 px-1 rounded font-mono">is_prime[0..n-1]</code>，初始全為 True。
              從 2 開始，把每個質數的<strong>所有倍數</strong>標記為 False。
              最後數一下還是 True 的個數。
            </p>

            <div className="bg-teal-50 rounded-xl p-5 border border-teal-100 space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase">n=20 的篩法過程</p>

              {/* 視覺化格子 */}
              {[
                { label: '初始（2~19）', crossed: [], prime: 2 },
                { label: '篩掉 2 的倍數', crossed: [4,6,8,10,12,14,16,18], prime: 3 },
                { label: '篩掉 3 的倍數', crossed: [4,6,8,9,10,12,14,15,16,18], prime: 5 },
                { label: '篩掉 5 的倍數（5²=25>20，結束）', crossed: [4,6,8,9,10,12,14,15,16,18], prime: null },
              ].map(({ label, crossed, prime }, si) => (
                <div key={si}>
                  <p className="text-xs text-gray-500 mb-2">{label}</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({length: 18}, (_, i) => i + 2).map(num => (
                      <div
                        key={num}
                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center font-bold text-xs
                          ${crossed.includes(num)
                            ? 'bg-gray-100 border-gray-200 text-gray-300 line-through'
                            : num === prime
                              ? 'bg-teal-200 border-teal-500 text-teal-900'
                              : 'bg-white border-gray-200 text-gray-700'
                          }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-teal-700 font-black text-sm">剩餘質數：2,3,5,7,11,13,17,19 → 共 8 個（小於 20）</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <p className="font-black text-amber-800 text-sm">兩個關鍵優化</p>
              <ul className="text-amber-700 text-sm space-y-1 list-disc list-inside">
                <li>外層迴圈只需到 <code className="font-mono">√n</code>（若 i &gt; √n，i 的最小倍數 i² 已超過 n）</li>
                <li>內層從 <code className="font-mono">i*i</code> 開始標記，而非 2*i（2i 在處理 2 時已標記過了）</li>
              </ul>
            </div>
            <ComplexityBadge time="O(n log log n)" space="O(n)" />
          </div>

          <CodeBlock
            title="count_primes.py"
            code={`def countPrimes(n: int) -> int:
    if n < 2:
        return 0

    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False

    i = 2
    while i * i < n:           # 只需到 √n
        if is_prime[i]:
            j = i * i          # 從 i² 開始，而非 2i
            while j < n:
                is_prime[j] = False
                j += i
        i += 1

    return sum(is_prime)

# 例：n=10 → 4（質數：2,3,5,7）`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 模板總結 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Math 解題技巧速查</h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-emerald-50">
                  <th className="text-left px-5 py-3 font-black text-emerald-800">技巧</th>
                  <th className="text-left px-5 py-3 font-black text-emerald-800">對應題型</th>
                  <th className="text-center px-5 py-3 font-black text-emerald-800">Time</th>
                  <th className="text-center px-5 py-3 font-black text-emerald-800">Space</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['反轉後半段數字', '#9 Palindrome Number', 'O(log n)', 'O(1)'],
                  ['快速冪（迭代）', '#50 Pow(x, n)', 'O(log n)', 'O(1)'],
                  ['HashSet 判循環', '#202 Happy Number', 'O(log n)', 'O(log n)'],
                  ['Floyd 判環', '#202 Happy Number', 'O(log n)', 'O(1)'],
                  ['Sieve 篩法', '#204 Count Primes', 'O(n log log n)', 'O(n)'],
                ].map(([tech, problem, time, space], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-3 font-bold text-gray-900">{tech}</td>
                    <td className="px-5 py-3 text-emerald-600">{problem}</td>
                    <td className="px-5 py-3 text-center font-mono text-gray-600 text-xs">{time}</td>
                    <td className="px-5 py-3 text-center font-mono text-gray-600 text-xs">{space}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '🪞', text: 'Palindrome Number：只反轉後半段，用 x > reversed_half 當停止條件，O(1) 空間' },
                { emoji: '⚡', text: '快速冪：n 奇數就乘進 result，n 偶數就底數平方，指數右移，O(log n) 解決 10 億次方' },
                { emoji: '🔄', text: 'Happy Number：不是 happy 一定進入循環；Floyd 判環比 HashSet 省空間（O(1) vs O(n)）' },
                { emoji: '🧮', text: 'Count Primes：篩法外層只到 √n，內層從 i² 開始，是最經典的空間換時間' },
                { emoji: '💡', text: 'Math 題通用策略：先找規律（奇偶/正負/邊界），再考慮能否用位移或平方壓縮複雜度' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/leetcode/ep21-bit-manipulation" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.21 — Bit Manipulation</p>
            <p className="text-sm text-gray-500 mt-1">XOR、Brian Kernighan、Missing Number</p>
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-400">EP.23 — 即將推出</p>
            <p className="text-sm text-gray-400 mt-1">敬請期待</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Math', 'Palindrome', 'Fast Power', 'Happy Number', 'Sieve', 'Python', 'EP.22'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
