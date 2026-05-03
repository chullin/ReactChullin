'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';



const ComplexityBadge = ({ time, space }: { time: string; space: string }) => (
  <div className="flex gap-3 my-4 flex-wrap">
    <span className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-bold">⏱ Time: {time}</span>
    <span className="px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">💾 Space: {space}</span>
  </div>
);

/* Trie 節點視覺化 */
const TrieNode = ({
  char,
  isEnd = false,
  color = 'default',
}: {
  char: string;
  isEnd?: boolean;
  color?: 'default' | 'blue' | 'green' | 'orange' | 'gray';
}) => {
  const colorMap: Record<string, string> = {
    default: 'bg-white border-gray-200 text-gray-700',
    blue:    'bg-blue-100 border-blue-400 text-blue-800',
    green:   'bg-green-100 border-green-400 text-green-800',
    orange:  'bg-orange-100 border-orange-400 text-orange-800',
    gray:    'bg-gray-100 border-gray-300 text-gray-400',
  };
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black text-sm relative ${colorMap[color]}`}>
        {char}
        {isEnd && (
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white text-[7px] text-white flex items-center justify-center font-black">
            ✓
          </span>
        )}
      </div>
    </div>
  );
};

export default function LeetcodeEP19Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(251,191,36,0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                LeetCode 刷題日記
              </Chip>
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                EP.19
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              EP.19 — Trie：<br />
              <span className="text-amber-300">為字串搜尋而生的樹</span>
            </h1>
            <p className="text-yellow-200 text-lg font-medium max-w-2xl mx-auto">
              #208 Implement Trie · #211 Add and Search Words · #648 Replace Words<br />
              — 從零實作 Trie，到 DFS 萬用字元搜尋
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 text-amber-600 p-2.5 rounded-full">
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
            <div className="flex items-center gap-1.5"><Clock size={16} /><span>13 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /><span>3 題精講</span></div>
          </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            你有沒有想過，Google 搜尋框的自動補全是怎麼做的？
            輸入「app」，立刻出現「apple」「application」「approach」……
            背後的資料結構就是 <strong>Trie（前綴樹 / 字典樹）</strong>。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Trie 是一種專門為<strong>字串前綴搜尋</strong>設計的樹狀結構。
            它能在 O(L)（L 為字串長度）的時間內完成插入和搜尋，不管你存了幾百萬個單字。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這篇從零實作 Trie，再接兩道進階題打通。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* Trie 結構說明 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Trie 長什麼樣子？</h2>
          <p className="text-gray-700 leading-relaxed">
            假設要儲存 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">["app", "apple", "apt", "bat"]</code>：
          </p>

          {/* 樹狀圖 */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 overflow-x-auto">
            <p className="text-sm font-bold text-gray-500 uppercase">Trie 結構示意（綠點 ✓ = 是某個單字的結尾）</p>
            <div className="font-mono text-sm text-gray-600 space-y-1 min-w-max">
              <div className="flex items-center gap-1">
                <TrieNode char="root" />
              </div>
              <div className="pl-4 flex items-start gap-8">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-0.5 h-4 bg-gray-300" />
                  <TrieNode char="a" color="blue" />
                  <div className="pl-4 flex items-start gap-4 mt-1">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-0.5 h-4 bg-gray-300" />
                      <TrieNode char="p" color="blue" />
                      <div className="pl-2 flex items-start gap-3 mt-1">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-0.5 h-4 bg-gray-300" />
                          <TrieNode char="p" color="green" isEnd />
                          <div className="flex flex-col items-center gap-1 mt-1">
                            <div className="w-0.5 h-4 bg-gray-300" />
                            <TrieNode char="l" color="blue" />
                            <div className="flex flex-col items-center gap-1 mt-1">
                              <div className="w-0.5 h-4 bg-gray-300" />
                              <TrieNode char="e" color="green" isEnd />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-0.5 h-4 bg-gray-300" />
                          <TrieNode char="t" color="green" isEnd />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              「app」和「apple」共享 root→a→p→p 的前綴節點。Trie 的核心就是<strong>共享前綴</strong>。
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '🌳', title: '每個節點', desc: '代表一個字元。根節點不代表任何字元，只是起點。' },
              { icon: '✅', title: 'is_end 旗標', desc: '標記「到這個節點為止，是一個完整的單字」。沒有 is_end 就只是前綴。' },
              { icon: '📦', title: 'children 字典', desc: '每個節點最多有 26 個子節點（小寫英文字母）。通常用 dict 或長度 26 的陣列實作。' },
            ].map((item) => (
              <div key={item.title} className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-black text-gray-900 mb-1 text-sm">{item.title}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 1: Implement Trie ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏗️</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 1 — Implement Trie</h2>
              <p className="text-gray-500 font-medium">#208 · Medium · 從零實作前綴樹</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                實作一個 Trie 類別，支援三個操作：
              </p>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li><code className="bg-gray-100 px-2 py-0.5 rounded font-mono">insert(word)</code>：插入一個單字</li>
                <li><code className="bg-gray-100 px-2 py-0.5 rounded font-mono">search(word)</code>：搜尋整個單字是否存在，回傳 True/False</li>
                <li><code className="bg-gray-100 px-2 py-0.5 rounded font-mono">startsWith(prefix)</code>：搜尋是否存在以 prefix 開頭的單字</li>
              </ul>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">TrieNode 設計</h3>
          <p className="text-gray-700 leading-relaxed">
            每個節點只需要兩個屬性：<code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">children</code>（子節點字典）
            和 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">is_end</code>（是否為單字結尾）。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">insert("app") 的過程</p>
            <div className="space-y-3">
              {[
                { step: '從 root 出發', char: 'a', action: 'root.children 沒有 "a"，建立新節點', state: 'root → a' },
                { step: '移動到 a', char: 'p', action: 'a.children 沒有 "p"，建立新節點', state: 'root → a → p' },
                { step: '移動到 p', char: 'p', action: 'p.children 沒有 "p"，建立新節點', state: 'root → a → p → p' },
                { step: '字串走完', char: '—', action: '在最後的 p 節點設 is_end = True', state: 'p.is_end = ✓' },
              ].map(({ step, char, action, state }) => (
                <div key={step} className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-mono text-xs font-black shrink-0">
                    {char}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-700 text-sm">{step}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{action}</p>
                  </div>
                  <code className="text-xs font-mono text-amber-600 shrink-0">{state}</code>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="implement_trie.py"
            code={`class TrieNode:
    def __init__(self):
        self.children = {}   # char → TrieNode
        self.is_end = False  # 是否為某個單字的結尾


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True   # 走完單字，標記結尾

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False   # 某個字元不存在，搜尋失敗
            node = node.children[ch]
        return node.is_end    # 走完還要確認是完整單字（非只是前綴）

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True           # 不管 is_end，只要前綴存在就 True


# 使用範例
trie = Trie()
trie.insert("apple")
trie.search("apple")    # True
trie.search("app")      # False（app 的 is_end=False）
trie.startsWith("app")  # True
trie.insert("app")
trie.search("app")      # True（insert 後 is_end=True）`}
          />
          <ComplexityBadge time="insert/search: O(L)" space="O(ALPHABET × L × N)" />

          <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
            <p className="font-black text-gray-900 text-sm">search vs startsWith 的唯一差異</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              兩個函式的迴圈邏輯完全一樣，唯一差異是最後的回傳值：
              <code className="bg-gray-100 px-1 rounded font-mono">search</code> 回傳 <code className="bg-gray-100 px-1 rounded font-mono">node.is_end</code>（必須是完整單字），
              <code className="bg-gray-100 px-1 rounded font-mono">startsWith</code> 直接回傳 <code className="bg-gray-100 px-1 rounded font-mono">True</code>（只需前綴存在）。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 2: Add and Search Words ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔍</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 2 — Add and Search Words</h2>
              <p className="text-gray-500 font-medium">#211 · Medium · 支援萬用字元 '.' 的 Trie</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                設計一個支援 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">addWord(word)</code> 和
                <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm"> search(word)</code> 的資料結構。
                search 中的 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">'.'</code> 可以匹配任意一個字元。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>addWord("bad"), addWord("dad"), addWord("mad")</p>
                <p>search("pad") → False</p>
                <p>search(".ad") → True（匹配 bad / dad / mad）</p>
                <p>search("b..") → True（匹配 bad）</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">關鍵：遇到 '.' 要分支 DFS</h3>
          <p className="text-gray-700 leading-relaxed">
            一般字元走一條確定的路，但遇到 <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-sm">'.'</code> 時，
            必須對<strong>當前節點所有的 children</strong> 都試一遍——這就是 DFS 回溯。
            任何一條路最終回傳 True，整體就是 True。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-gray-500 uppercase">search(".ad") 的 DFS 過程（已 insert bad/dad/mad）</p>
            <div className="space-y-2 text-sm">
              {[
                { depth: 0, char: '.', note: '萬用字元，對 root 的所有 children（b, d, m）各走一遍', color: 'bg-orange-50 border-orange-100' },
                { depth: 1, char: 'a', note: '從 b 走 → b→a 存在；從 d 走 → d→a 存在；從 m 走 → m→a 存在', color: 'bg-blue-50 border-blue-100' },
                { depth: 2, char: 'd', note: '繼續走 → b→a→d.is_end=True ✅ 找到，回傳 True', color: 'bg-green-50 border-green-100' },
              ].map(({ depth, char, note, color }) => (
                <div key={depth} className={`flex items-start gap-3 border rounded-xl p-3 ${color}`} style={{ marginLeft: depth * 16 }}>
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-mono text-xs font-black shrink-0">{char}</div>
                  <p className="text-gray-700 text-xs leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="add_and_search_words.py"
            code={`class WordDictionary:
    def __init__(self):
        self.root = TrieNode()   # 複用上面的 TrieNode

    def addWord(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        return self._dfs(word, 0, self.root)

    def _dfs(self, word: str, idx: int, node: TrieNode) -> bool:
        # 走完整個 word
        if idx == len(word):
            return node.is_end

        ch = word[idx]

        if ch == '.':
            # 萬用字元：對所有子節點遞迴嘗試
            for child in node.children.values():
                if self._dfs(word, idx + 1, child):
                    return True
            return False
        else:
            # 一般字元：走確定的路
            if ch not in node.children:
                return False
            return self._dfs(word, idx + 1, node.children[ch])`}
          />
          <ComplexityBadge time="addWord O(L)，search O(26^L) 最壞" space="O(L × N)" />

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <p className="font-black text-amber-800 mb-2">最壞情況為什麼是 O(26^L)？</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              如果搜尋的是全部都是 <code className="bg-amber-100 px-1 rounded font-mono">'.'..'</code>（全萬用字元），
              每個位置最多分支 26 次，深度為 L，所以是 O(26^L)。
              但實際情況下 Trie 裡的節點數有限，真正的複雜度接近 O(N × L)（N 為插入的單字數）。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ===== PART 3: Replace Words ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔄</span>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Part 3 — Replace Words</h2>
              <p className="text-gray-500 font-medium">#648 · Medium · 用最短前綴取代單字</p>
            </div>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-black text-gray-900 text-lg">題目</p>
              <p className="text-gray-700 leading-relaxed">
                給一個字根（root）清單和一個句子。
                對句子中的每個單字，如果它以清單中某個字根開頭，就把它換成那個最短字根；否則保持不變。
              </p>
              <div className="font-mono text-sm text-gray-500 space-y-1">
                <p>dictionary = ["cat","bat","rat"]</p>
                <p>sentence   = "the cattle was rattled by the battery"</p>
                <p>Output: "the cat was rat by the bat"</p>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-900">為什麼用 Trie 而不是 Set？</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-red-800 text-sm">❌ 暴力法（Set）</p>
              <p className="text-red-700 text-sm leading-relaxed">
                對每個單字，從長度 1 開始逐一截前綴，查 set 看有沒有字根。
                假設單字最長 L，每次查詢 O(L²)，句子有 W 個單字，總體 O(W × L²)。
              </p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-green-800 text-sm">✅ Trie</p>
              <p className="text-green-700 text-sm leading-relaxed">
                把所有字根插入 Trie。搜尋時一個字元一個字元走，
                一旦遇到 <code className="bg-green-100 px-1 rounded font-mono">is_end=True</code> 就立刻停止，返回已走過的前綴。
                每個單字只需 O(L) 一次掃描。
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-gray-500 uppercase">搜尋 "cattle" 的過程（字根 Trie 中有 "cat"）</p>
            <div className="space-y-2 text-sm">
              {[
                { char: 'c', note: 'root.children["c"] 存在，移動', found: false },
                { char: 'a', note: 'c_node.children["a"] 存在，移動', found: false },
                { char: 't', note: 'a_node.children["t"] 存在，移動，且 t_node.is_end = True ← 找到字根！', found: true },
              ].map(({ char, note, found }) => (
                <div key={char} className={`flex items-center gap-3 p-3 rounded-xl ${found ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-100'}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-black shrink-0 ${found ? 'bg-green-500 text-white' : 'bg-amber-400 text-white'}`}>
                    {char}
                  </div>
                  <p className={`text-sm ${found ? 'text-green-700 font-bold' : 'text-gray-600'}`}>{note}</p>
                </div>
              ))}
              <p className="text-xs text-gray-400 pt-1">
                遇到 is_end=True 立刻停，回傳 "cat"，不再繼續往後走 "tle"。
              </p>
            </div>
          </div>

          <CodeBlock
            title="replace_words.py"
            code={`class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

def replaceWords(dictionary: list[str], sentence: str) -> str:
    # Step 1：把所有字根插入 Trie
    root = TrieNode()
    for word in dictionary:
        node = root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    # Step 2：對句子每個單字，找最短字根前綴
    def find_root(word: str) -> str:
        node = root
        for i, ch in enumerate(word):
            if ch not in node.children:
                break                 # 沒有對應字根，保留原字
            node = node.children[ch]
            if node.is_end:
                return word[:i + 1]  # 找到字根，立刻回傳
        return word                   # 沒找到字根，原字不變

    return ' '.join(find_root(w) for w in sentence.split())`}
          />
          <ComplexityBadge time="O(D×L + S×L)" space="O(D×L)" />

          <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
            <p className="font-black text-gray-900 text-sm">複雜度說明</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              D = 字根數，S = 句子單字數，L = 最長字串長度。
              建 Trie O(D×L)，每個單字查詢 O(L)，總查詢 O(S×L)，合計 O((D+S)×L)。
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
                  <th className="text-left p-4 font-black text-gray-700">核心操作</th>
                  <th className="text-left p-4 font-black text-gray-700">特殊處理</th>
                  <th className="text-left p-4 font-black text-gray-700">查詢複雜度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="p-4 font-bold">#208 Implement Trie</td>
                  <td className="p-4 text-gray-600">insert / search / startsWith</td>
                  <td className="p-4 text-gray-600">search 需查 is_end，startsWith 不需要</td>
                  <td className="p-4 text-gray-500">O(L)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#211 Add and Search Words</td>
                  <td className="p-4 text-gray-600">addWord / search（含 '.'）</td>
                  <td className="p-4 text-gray-600">遇 '.' 分支 DFS 所有 children</td>
                  <td className="p-4 text-gray-500">O(26^L) 最壞</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">#648 Replace Words</td>
                  <td className="p-4 text-gray-600">建 Trie + 逐字查最短字根</td>
                  <td className="p-4 text-gray-600">遇 is_end 立刻停，回傳前綴</td>
                  <td className="p-4 text-gray-500">O(L) per word</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <p className="font-black text-amber-800 mb-3">什麼情況下要用 Trie？</p>
            <ul className="space-y-2 text-amber-700 text-sm">
              {[
                '需要「前綴搜尋」或「自動補全」：Trie 是唯一直覺的選擇',
                '需要對大量字串做重複的前綴查詢：比 set 每次截前綴高效',
                '需要匹配萬用字元（.）：在 Trie 上做 DFS 比正則更可控',
                '題目提到 dictionary、word list、prefix：高機率是 Trie',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Key Takeaway */}
        <section>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-amber-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🌳', text: 'Trie 的每個節點存 children（dict）和 is_end（bool），核心是「共享前綴」的樹狀結構' },
                { emoji: '🏗️', text: '#208 基礎實作：insert 走完設 is_end=True；search 最後查 is_end；startsWith 直接回傳 True' },
                { emoji: '🔍', text: '#211 遇到 "." 就對所有 children DFS，任何一條路 True 就回傳 True——這是 Trie + 回溯的組合拳' },
                { emoji: '🔄', text: '#648 建好 Trie 後，逐字掃描遇 is_end 立刻停，O(L) 就找到最短字根，比逐一截前綴查 set 快' },
                { emoji: '💡', text: '面試遇到「大量字串 + 前綴操作」，先考慮 Trie；遇到萬用字元搜尋，Trie + DFS 是標準解法' },
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
          <Link href="/blog/leetcode/ep18-monotonic-stack" className="group block bg-gray-50 hover:bg-amber-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-amber-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-amber-600 transition-colors">EP.18 — Monotonic Stack</p>
            <p className="text-sm text-gray-500 mt-1">Daily Temperatures、Trapping Rain Water</p>
          </Link>
          
          <Link href="/blog/leetcode/ep20-heap" className="group block bg-gray-50 hover:bg-amber-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="ml-auto mb-3 text-gray-400 group-hover:text-amber-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-amber-600 transition-colors">EP.20 — Heap</p>
            <p className="text-sm text-gray-500 mt-1">Kth Largest、Top K Frequent</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['LeetCode', 'Trie', '前綴樹', 'DFS', '字串搜尋', 'Python', 'EP.19'].map((tag) => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
