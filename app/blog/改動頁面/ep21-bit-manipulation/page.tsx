'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import CodeBlock from '@/components/blog/CodeBlock';

const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-fuchsia-100 text-fuchsia-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

/* 位元格，逐位顯示 */
const BinaryRow = ({
  label,
  bits,
  highlight = [],
  color = 'violet',
}: {
  label: string;
  bits: string;
  highlight?: number[];
  color?: 'violet' | 'fuchsia' | 'green' | 'red' | 'gray';
}) => {
  const colorMap: Record<string, string> = {
    violet:  'bg-violet-200 text-violet-900 border-violet-400',
    fuchsia: 'bg-fuchsia-200 text-fuchsia-900 border-fuchsia-400',
    green:   'bg-green-200 text-green-900 border-green-400',
    red:     'bg-red-200 text-red-900 border-red-400',
    gray:    'bg-gray-100 text-gray-600 border-gray-300',
  };
  const dimClass  = 'bg-white text-gray-300 border-gray-200';
  const bitArr    = bits.split('');

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-bold text-gray-500 w-28 shrink-0">{label}</span>
      <div className="flex gap-1">
        {bitArr.map((b, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center font-black text-sm
              ${highlight.includes(i) ? colorMap[color] : (b === '0' ? dimClass : 'bg-white border-gray-300 text-gray-700')}`}
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LeetCodeEP21() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-fuchsia-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.21</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">LeetCode 刷題日記</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Bit Manipulation<br />
              <span className="text-violet-200">位元操作的魔法</span>
            </h1>
            <p className="text-violet-100 text-lg mb-8 max-w-2xl">
              #191 Number of 1 Bits · #338 Counting Bits · #268 Missing Number · #136 Single Number
              — 用 XOR 與位移取代迴圈，寫出令人拍案的 O(1) 解法
            </p>
            <div className="flex items-center gap-6 text-violet-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Bit Ops · XOR · Brian Kernighan</span>
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
                <Quote size={32} className="text-violet-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「你知道怎麼找出陣列裡唯一出現一次的那個數字嗎？」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    面試官問這道題時，我第一直覺是用 HashMap。結果他說：「能不能不用額外空間？」
                    我卡住了。答案只需要一個 XOR 操作：把所有數字都 XOR 一遍，
                    相同的就抵消成 0，唯一剩下的就是答案。
                    這就是 Bit Manipulation 的魔法——用二進位的性質，把複雜問題變成一行。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 基礎概念 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">位元操作基礎</h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            在深入題目之前，把最常用的位元操作整理成一張速查表。
            這六個操作是 Bit Manipulation 題目的全部武器庫。
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left px-5 py-3 font-black text-violet-800">操作</th>
                  <th className="text-left px-5 py-3 font-black text-violet-800">符號</th>
                  <th className="text-left px-5 py-3 font-black text-violet-800">範例</th>
                  <th className="text-left px-5 py-3 font-black text-violet-800">常見用途</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['AND', 'a & b',  '5 & 3 = 1 (101 & 011)',  '取特定位、判斷奇偶 n & 1'],
                  ['OR',  'a | b',  '5 | 3 = 7 (101 | 011)',  '設定特定位'],
                  ['XOR', 'a ^ b',  '5 ^ 3 = 6 (101 ^ 011)',  '找唯一值、swap、missing number'],
                  ['NOT', '~a',     '~5 = -6 (反轉所有位)',    'Python 少用，注意補數'],
                  ['左移', 'a << k', '1 << 3 = 8 (× 2^k)',    '快速計算 2 的冪次'],
                  ['右移', 'a >> k', '8 >> 2 = 2 (÷ 2^k)',    '取高位 / DP counting bits'],
                ].map(([op, sym, ex, use], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-3 font-black text-gray-900">{op}</td>
                    <td className="px-5 py-3 font-mono text-violet-700 font-bold">{sym}</td>
                    <td className="px-5 py-3 font-mono text-gray-600 text-xs">{ex}</td>
                    <td className="px-5 py-3 text-gray-500">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* XOR 性質 */}
          <div className="bg-violet-50 rounded-2xl p-6 border border-violet-100">
            <p className="font-black text-violet-800 mb-4 text-lg">XOR 三大性質（背起來！）</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { rule: 'a ^ a = 0',   desc: '相同值抵消',  use: '→ 找重複 / missing' },
                { rule: 'a ^ 0 = a',   desc: '與 0 XOR 不變', use: '→ 初始值設 0' },
                { rule: 'XOR 可交換結合', desc: 'a^b^c = c^a^b', use: '→ 順序不影響結果' },
              ].map(({ rule, desc, use }) => (
                <div key={rule} className="bg-white rounded-xl p-4 border border-violet-100">
                  <p className="font-black font-mono text-violet-700 text-base mb-1">{rule}</p>
                  <p className="text-sm text-gray-600">{desc}</p>
                  <p className="text-xs text-violet-500 font-bold mt-1">{use}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 問題一：#191 Number of 1 Bits */}
        <section className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="bg-violet-600 text-white font-black px-4 py-2 rounded-xl text-lg shrink-0">#191</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Number of 1 Bits</h2>
              <p className="text-gray-500 mt-1">給一個整數，計算其二進位表示中有幾個 1（Hamming Weight）</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-black text-gray-700 mb-4">Input: n = 11 (二進位 0b1011)</p>
            <div className="space-y-2">
              <BinaryRow label="n = 11" bits="00001011" highlight={[4, 6, 7]} color="violet" />
              <p className="text-gray-500 text-sm pl-32">三個位置有 1 → 回傳 3</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <p className="font-black text-gray-900 text-lg">方法一：逐位右移（直覺解）</p>
            <p className="text-gray-600 leading-relaxed">
              每次用 <code className="bg-gray-100 px-1 rounded font-mono">n & 1</code> 取最低位，
              再 <code className="bg-gray-100 px-1 rounded font-mono">n &gt;&gt;= 1</code> 右移，直到 n 為 0。
            </p>
            <ComplexityBadge time="O(32) = O(1)" space="O(1)" />
          </div>

          <div className="bg-violet-50 rounded-2xl border border-violet-200 p-6 shadow-sm space-y-4">
            <p className="font-black text-violet-900 text-lg">方法二：Brian Kernighan 演算法（面試最愛）</p>
            <p className="text-gray-700 leading-relaxed">
              關鍵觀察：<code className="bg-violet-100 px-1 rounded font-mono">n & (n-1)</code> 會
              <strong>移除 n 的最低位的 1</strong>。
              所以執行幾次操作、n 就變 0，次數就是 1 的個數。
            </p>

            <div className="space-y-2 bg-white rounded-xl p-4 border border-violet-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-3">n = 12（1100）的過程</p>
              {[
                { n: '1100', nm1: '1011', result: '1000', count: 1, note: '移除最低 1（位置 2）' },
                { n: '1000', nm1: '0111', result: '0000', count: 2, note: '移除最低 1（位置 3）' },
              ].map(({ n: nv, nm1, result, count, note }) => (
                <div key={count} className="grid grid-cols-4 gap-2 items-center text-sm">
                  <span className="font-mono text-gray-700">{nv}</span>
                  <span className="font-mono text-gray-400">& {nm1}</span>
                  <span className="font-mono text-violet-700 font-bold">= {result}</span>
                  <span className="text-gray-400 text-xs">{note}</span>
                </div>
              ))}
              <p className="text-violet-700 font-black text-sm mt-2">count = 2 ✓（12 = 1100 只有 2 個 1）</p>
            </div>

            <ComplexityBadge time="O(k)，k = 1 的個數" space="O(1)" />
          </div>

          <CodeBlock
            title="number_of_1_bits.py"
            code={`def hammingWeight(n: int) -> int:
    count = 0
    while n:
        n &= (n - 1)   # 移除最低位的 1
        count += 1
    return count

# 直覺版（逐位右移）
def hammingWeight_v2(n: int) -> int:
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count

# Python 內建（面試不算分）
def hammingWeight_builtin(n: int) -> int:
    return bin(n).count('1')`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 問題二：#338 Counting Bits */}
        <section className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="bg-fuchsia-600 text-white font-black px-4 py-2 rounded-xl text-lg shrink-0">#338</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Counting Bits</h2>
              <p className="text-gray-500 mt-1">給 n，回傳一個長度 n+1 的陣列，ans[i] = i 的二進位中 1 的個數</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-black text-gray-700 mb-4">Input: n = 5</p>
            <div className="overflow-x-auto">
              <table className="text-sm w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-3 py-2 font-black text-gray-500">i</th>
                    {[0,1,2,3,4,5].map(i => <th key={i} className="px-4 py-2 font-black text-gray-700">{i}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-bold text-gray-500 text-xs">二進位</td>
                    {['0','1','10','11','100','101'].map((b, i) => (
                      <td key={i} className="px-4 py-2 font-mono text-fuchsia-600 text-center">{b}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-bold text-gray-500 text-xs">ans[i]</td>
                    {[0,1,1,2,1,2].map((v, i) => (
                      <td key={i} className="px-4 py-2 font-black text-gray-900 text-center">{v}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <p className="font-black text-gray-900 text-lg">DP 解：右移 + 最低位</p>
            <p className="text-gray-600 leading-relaxed">
              核心規律：<strong>把 i 右移一位（i &gt;&gt; 1）就是把最低位去掉</strong>，
              所以 <code className="bg-gray-100 px-1 rounded font-mono">ans[i] = ans[i &gt;&gt; 1] + (i & 1)</code>。
            </p>

            <div className="bg-fuchsia-50 rounded-xl p-5 border border-fuchsia-100 space-y-2">
              <p className="font-black text-fuchsia-800 text-sm mb-3">遞推驗證</p>
              {[
                { i: 2, binary: '10', shift: 1, shiftBin: '1',  lsb: 0, ans: 1, note: 'ans[1]=1, 最低位=0' },
                { i: 3, binary: '11', shift: 1, shiftBin: '1',  lsb: 1, ans: 2, note: 'ans[1]=1, 最低位=1' },
                { i: 4, binary: '100', shift: 2, shiftBin: '10', lsb: 0, ans: 1, note: 'ans[2]=1, 最低位=0' },
                { i: 5, binary: '101', shift: 2, shiftBin: '10', lsb: 1, ans: 2, note: 'ans[2]=1, 最低位=1' },
              ].map(({ i, binary, shift, lsb, ans, note }) => (
                <div key={i} className="flex flex-wrap gap-3 items-center text-sm">
                  <span className="font-mono text-fuchsia-700 font-bold w-12">i={i}</span>
                  <span className="font-mono text-gray-500 text-xs">{binary}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-mono text-xs">ans[{shift}] + {lsb}</span>
                  <span className="text-gray-400">=</span>
                  <span className="font-black text-fuchsia-700">{ans}</span>
                  <span className="text-gray-400 text-xs">（{note}）</span>
                </div>
              ))}
            </div>

            <ComplexityBadge time="O(n)" space="O(n)" />
          </div>

          <CodeBlock
            title="counting_bits.py"
            code={`def countBits(n: int) -> list[int]:
    ans = [0] * (n + 1)
    for i in range(1, n + 1):
        ans[i] = ans[i >> 1] + (i & 1)
    return ans

# 例：n=5 → [0, 1, 1, 2, 1, 2]`}
          />

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="font-black text-amber-800 mb-2">為什麼這個 DP 成立？</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              任何整數 i 的二進位，去掉最低位（i &gt;&gt; 1）就是 i/2 的二進位。
              它的 1 的個數只比 i 多或少最低位那一個。
              所以 <code className="bg-amber-100 px-1 rounded font-mono">ans[i] = ans[i/2] + (i是奇數?1:0)</code>，
              而且因為 i/2 一定比 i 小，前面的值已經計算好了，DP 成立。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 問題三：#268 Missing Number */}
        <section className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="bg-violet-500 text-white font-black px-4 py-2 rounded-xl text-lg shrink-0">#268</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Missing Number</h2>
              <p className="text-gray-500 mt-1">陣列包含 0 到 n 中的 n 個不同數字，找出缺少的那一個</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-black text-gray-700 mb-3">Input: nums = [3, 0, 1]（n=3）</p>
            <p className="text-gray-600">應該有 0,1,2,3 四個數，但只有三個 → 缺少的是 <span className="font-black text-violet-700">2</span></p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <p className="font-black text-gray-900 text-lg">方法一：數學公式（簡單）</p>
            <p className="text-gray-600 leading-relaxed">
              0～n 的總和 = <code className="bg-gray-100 px-1 rounded font-mono">n*(n+1)//2</code>，
              減去陣列實際的總和，差值就是缺少的數字。
            </p>
            <ComplexityBadge time="O(n)" space="O(1)" />
          </div>

          <div className="bg-violet-50 rounded-2xl border border-violet-200 p-6 shadow-sm space-y-4">
            <p className="font-black text-violet-900 text-lg">方法二：XOR（面試加分）</p>
            <p className="text-gray-700 leading-relaxed">
              把 <strong>「理想值 0,1,2,...,n」</strong>和<strong>「實際陣列值」</strong>全部 XOR 在一起。
              出現兩次的數字互相抵消，只剩下缺少的那一個。
            </p>

            <div className="bg-white rounded-xl p-5 border border-violet-100 space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">nums=[3,0,1] 的 XOR 過程</p>
              <div className="font-mono text-sm space-y-1.5">
                <p className="text-gray-500">result = 0</p>
                <p className="text-gray-500">i=0: result ^= 0 ^ nums[0] = 0 ^ 0 ^ 3 = <span className="text-violet-700 font-bold">3</span></p>
                <p className="text-gray-500">i=1: result ^= 1 ^ nums[1] = 3 ^ 1 ^ 0 = <span className="text-violet-700 font-bold">2</span></p>
                <p className="text-gray-500">i=2: result ^= 2 ^ nums[2] = 2 ^ 2 ^ 1 = <span className="text-violet-700 font-bold">1</span></p>
                <p className="text-gray-500">最後: result ^= n = 1 ^ 3 = <span className="text-violet-700 font-bold">2</span> ✓</p>
              </div>
            </div>

            <p className="text-violet-700 text-sm">
              等效於：<code className="bg-violet-100 px-1 rounded font-mono">(0^1^2^3) ^ (3^0^1) = 2</code>，
              0,1,3 各出現兩次被抵消，只剩 2。
            </p>
            <ComplexityBadge time="O(n)" space="O(1)" />
          </div>

          <CodeBlock
            title="missing_number.py"
            code={`def missingNumber(nums: list[int]) -> int:
    n = len(nums)

    # 方法一：數學公式（推薦）
    return n * (n + 1) // 2 - sum(nums)

def missingNumber_xor(nums: list[int]) -> int:
    n = len(nums)

    # 方法二：XOR
    result = n          # 先放入 n，讓 result = 0^1^...^n
    for i, num in enumerate(nums):
        result ^= i ^ num   # ^= i：加入理想值；^= num：抵消實際值
    return result`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 問題四：#136 Single Number */}
        <section className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="bg-fuchsia-500 text-white font-black px-4 py-2 rounded-xl text-lg shrink-0">#136</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Single Number</h2>
              <p className="text-gray-500 mt-1">陣列中每個數字都出現兩次，只有一個數字出現一次，找出它</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="font-black text-gray-700 mb-3">Input: nums = [4, 1, 2, 1, 2]</p>
            <div className="flex flex-wrap gap-2">
              {[4,1,2,1,2].map((n, i) => (
                <span key={i} className={`px-4 py-2 rounded-xl font-black text-sm ${n === 4 ? 'bg-fuchsia-200 text-fuchsia-800' : 'bg-gray-200 text-gray-600'}`}>
                  {n}
                </span>
              ))}
              <span className="px-4 py-2 rounded-xl font-black text-sm text-gray-400">→ 回傳 4</span>
            </div>
          </div>

          <div className="bg-fuchsia-50 rounded-2xl border border-fuchsia-200 p-6 shadow-sm space-y-4">
            <p className="font-black text-fuchsia-900 text-lg">XOR 一行解</p>
            <p className="text-gray-700 leading-relaxed">
              利用 XOR 的交換結合律，把所有數字 XOR 在一起。
              出現兩次的數字 <code className="bg-fuchsia-100 px-1 rounded font-mono">a ^ a = 0</code>，
              只剩唯一出現一次的那個。
            </p>

            <div className="bg-white rounded-xl p-5 border border-fuchsia-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-3">nums=[4,1,2,1,2] XOR 過程</p>
              <div className="font-mono text-sm space-y-1.5 text-gray-600">
                <p>4 ^ 1 ^ 2 ^ 1 ^ 2</p>
                <p>= 4 ^ (1 ^ 1) ^ (2 ^ 2)  &nbsp; <span className="text-gray-400">← 重新排列</span></p>
                <p>= 4 ^ <span className="text-fuchsia-600 font-bold">0</span> ^ <span className="text-fuchsia-600 font-bold">0</span></p>
                <p>= <span className="font-black text-fuchsia-700 text-base">4</span> ✓</p>
              </div>
            </div>
            <ComplexityBadge time="O(n)" space="O(1)" />
          </div>

          <CodeBlock
            title="single_number.py"
            code={`def singleNumber(nums: list[int]) -> int:
    result = 0
    for num in nums:
        result ^= num
    return result

# Python 一行版
def singleNumber_oneliner(nums: list[int]) -> int:
    from functools import reduce
    import operator
    return reduce(operator.xor, nums)`}
          />

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <p className="font-black text-red-800 mb-2">面試追問：如果有一個出現三次呢？（#137 Single Number II）</p>
            <p className="text-red-700 text-sm leading-relaxed">
              需要對每個 bit 位取模 3：用兩個變數 <code className="bg-red-100 px-1 rounded font-mono">ones, twos</code>，
              分別記錄出現 1 次和 2 次的 bits，出現 3 次的 bit 就被清掉。
              這是進階題，掌握基本 XOR 後再挑戰。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 模板總結 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Bit Manipulation 解題模板</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: '取最低位的 1',
                code: 'lowest_bit = n & (-n)\n# 或: n & ~(n-1)',
                usage: '統計 1 的個數、找特定位',
                color: 'violet',
              },
              {
                title: '移除最低位的 1',
                code: 'n &= (n - 1)\n# 每次移除最低的 1',
                usage: '#191 Number of 1 Bits',
                color: 'fuchsia',
              },
              {
                title: '取第 k 位',
                code: 'bit_k = (n >> k) & 1\n# k 從 0 開始',
                usage: 'DP Counting Bits',
                color: 'violet',
              },
              {
                title: 'XOR 找唯一值',
                code: 'result = 0\nfor num in nums:\n    result ^= num',
                usage: '#136 Single Number、#268 Missing',
                color: 'fuchsia',
              },
            ].map(({ title, code, usage, color }) => (
              <div key={title} className={`rounded-2xl p-5 border ${color === 'violet' ? 'bg-violet-50 border-violet-100' : 'bg-fuchsia-50 border-fuchsia-100'}`}>
                <p className={`font-black text-sm mb-3 ${color === 'violet' ? 'text-violet-800' : 'text-fuchsia-800'}`}>{title}</p>
                <pre className={`font-mono text-xs p-3 rounded-xl mb-2 ${color === 'violet' ? 'bg-violet-100 text-violet-900' : 'bg-fuchsia-100 text-fuchsia-900'}`}>{code}</pre>
                <p className="text-gray-500 text-xs">{usage}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 複雜度比較 */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-gray-900">各題解法比較</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-violet-50">
                  <th className="text-left px-5 py-3 font-black text-violet-800">題目</th>
                  <th className="text-left px-5 py-3 font-black text-violet-800">最優解法</th>
                  <th className="text-center px-5 py-3 font-black text-violet-800">Time</th>
                  <th className="text-center px-5 py-3 font-black text-violet-800">Space</th>
                  <th className="text-left px-5 py-3 font-black text-violet-800">關鍵技巧</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['#191 Number of 1 Bits', 'Brian Kernighan', 'O(k)', 'O(1)', 'n &= (n-1)'],
                  ['#338 Counting Bits', 'DP + 右移', 'O(n)', 'O(n)', 'ans[i] = ans[i>>1] + (i&1)'],
                  ['#268 Missing Number', '數學公式', 'O(n)', 'O(1)', 'n*(n+1)/2 - sum'],
                  ['#136 Single Number', 'XOR All', 'O(n)', 'O(1)', 'a^a=0，成對抵消'],
                ].map(([q, sol, time, space, key], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-3 font-bold text-gray-900">{q}</td>
                    <td className="px-5 py-3 text-violet-600 font-bold">{sol}</td>
                    <td className="px-5 py-3 text-center font-mono text-gray-600 text-xs">{time}</td>
                    <td className="px-5 py-3 text-center font-mono text-gray-600 text-xs">{space}</td>
                    <td className="px-5 py-3 font-mono text-fuchsia-600 text-xs">{key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '⚡', text: 'Brian Kernighan：n &= (n-1) 每次移除最低位的 1，比逐位右移快' },
                { emoji: '🔢', text: 'Counting Bits DP：ans[i] = ans[i>>1] + (i&1)，右移一位就是去掉最低位' },
                { emoji: '✨', text: 'XOR 三性質：a^a=0、a^0=a、可交換結合 — 用來找唯一值或缺少的數' },
                { emoji: '🎯', text: 'Missing Number 兩解法：數學公式更直覺，XOR 是面試加分的進階解' },
                { emoji: '💡', text: 'Bit Manipulation 適用場景：只需 O(1) 空間、資料是整數、需要找「差異」或「唯一」' },
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
          <Link href="/blog/leetcode/ep20-heap" className="group block bg-gray-50 hover:bg-violet-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-violet-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-violet-600 transition-colors">EP.20 — Heap</p>
            <p className="text-sm text-gray-500 mt-1">Kth Largest、Top K Frequent、Find Median</p>
          </Link>
          <Link href="/blog/leetcode/ep22-math" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.22 — Math</p>
            <p className="text-sm text-gray-500 mt-1">Palindrome Number、快速冪、Happy Number、Count Primes</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Bit Manipulation', 'XOR', 'Brian Kernighan', 'DP', 'Python', 'EP.21'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
