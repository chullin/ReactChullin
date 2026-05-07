'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';


export default function LangEP01Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-700 via-slate-700 to-zinc-700">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 40% 60%, rgba(100,116,139,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(113,113,122,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-gray-500/20 text-gray-300 border-gray-500/30 font-bold uppercase text-[10px]">
                後端語言
              </Chip>
              <Chip size="sm" variant="flat" className="bg-gray-500/20 text-gray-300 border-gray-500/30 font-bold uppercase text-[10px]">
                EP.01
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              C 語言面試必備<br />
              <span className="text-gray-300">指標與記憶體管理</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto">
              指標基礎、Stack vs Heap、struct、常見面試 Coding 題解析
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 text-gray-600 p-2.5 rounded-full">
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
            <div className="flex items-center gap-1.5"><Clock size={16} /><span>14 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /><span>大學踩坑紀錄</span></div>
          </div>
        </div>

        {/* Opening Quote */}
        <section>
          <Card className="border border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 shadow-none">
            <CardBody className="p-7">
              <div className="flex items-start gap-4">
                <Quote size={28} className="text-gray-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic font-medium">
                  大學修 C 語言時，指標讓我痛苦了整整一個學期。後來才理解：指標只是一個儲存記憶體地址的變數。搞懂這句話，C 語言就開竅了一半。
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider className="opacity-30" />

        {/* Section 1: C 語言特色 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">C 語言特色</h2>
          <p className="text-gray-700 leading-relaxed">
            C 語言是最接近硬體的高階語言，1972 年誕生，至今仍是作業系統、嵌入式系統、驅動程式的核心語言。了解 C 語言，等於了解電腦底層如何運作。
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">特性</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">C 語言</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">Python（對照）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['型別系統', '靜態型別，需宣告型別', '動態型別，自動推斷'],
                  ['記憶體管理', '手動 malloc/free', '自動垃圾回收（GC）'],
                  ['執行方式', '編譯成機器碼（快）', '直譯執行（慢 10–100x）'],
                  ['硬體存取', '可直接操作記憶體地址', '高度抽象，不直接存取'],
                  ['適合場景', '作業系統、韌體、驅動程式', '腳本、資料科學、Web'],
                  ['學習難度', '高（指標、手動記憶體）', '低（語法簡潔直觀）'],
                ].map(([feature, c, py], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-bold text-gray-700">{feature}</td>
                    <td className="px-5 py-3 text-gray-800 font-medium">{c}</td>
                    <td className="px-5 py-3 text-gray-500">{py}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 2: 指標 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">指標（Pointer）基礎</h2>
          <p className="text-gray-700 leading-relaxed">
            指標是 C 語言最難也最重要的概念。一句話理解：<strong>指標是一個儲存記憶體地址的變數</strong>。它「指向」另一個變數在記憶體中的位置。
          </p>

          {/* 視覺化 */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="font-black text-gray-800">記憶體視覺化</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="border-2 border-blue-300 bg-blue-50 rounded-xl p-4 text-center min-w-[130px]">
                <p className="text-xs text-blue-400 font-mono mb-1">地址: 0x1000</p>
                <p className="font-black text-blue-800 text-xl">42</p>
                <p className="text-xs text-blue-600 font-mono mt-1">int x</p>
              </div>
              <div className="text-gray-400 font-black text-2xl hidden sm:block">→</div>
              <div className="border-2 border-slate-300 bg-slate-50 rounded-xl p-4 text-center min-w-[130px]">
                <p className="text-xs text-slate-400 font-mono mb-1">地址: 0x2000</p>
                <p className="font-black text-slate-800 text-xl font-mono">0x1000</p>
                <p className="text-xs text-slate-600 font-mono mt-1">int *p</p>
              </div>
              <div className="text-gray-400 text-sm leading-relaxed sm:max-w-[200px]">
                <p className="text-gray-500">p 存的是 x 的<strong className="text-gray-700">地址</strong>，不是 x 的<strong className="text-gray-700">值</strong>。*p 才是「透過地址去讀取值」。</p>
              </div>
            </div>
          </div>

          <CodeBlock
            lang="c"
            title="pointer_basics.c"
            code={`#include <stdio.h>

int main() {
    int x = 42;         // 普通變數：x 存的是值 42
    int *p = &x;        // 指標宣告：p 存的是 x 的「地址」
                        // & 是「取地址運算符」
                        // * 在宣告時代表「這是指標型別」

    printf("x 的值    = %d\\n",  x);    // 42
    printf("x 的地址  = %p\\n",  &x);   // 0x...（記憶體地址）
    printf("p 的值    = %p\\n",  p);    // 與 &x 相同
    printf("*p 的值   = %d\\n",  *p);   // 42（* 在使用時代表「解參考」）

    // 透過指標修改原始變數的值
    *p = 100;
    printf("修改後 x  = %d\\n",  x);    // 100（x 被改了！）

    return 0;
}

// ── 指標陷阱 ────────────────────────────────────────────
// 1. 野指標（Wild Pointer）：未初始化的指標，指向未知記憶體
//    int *bad;
//    *bad = 5;  // !! 未定義行為，程式可能崩潰

// 2. NULL 指標：安全的「空指標」，使用前必須檢查
//    int *safe = NULL;
//    if (safe != NULL) { *safe = 5; }  // 安全`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 3: Stack vs Heap */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Stack vs Heap 記憶體</h2>
          <p className="text-gray-700 leading-relaxed">
            C 語言的記憶體分為兩大區域，搞懂它們是理解 C 語言記憶體管理的基礎：
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Stack（堆疊）',
                items: [
                  '自動分配、自動釋放',
                  '函數內宣告的 local 變數',
                  '大小有限（通常 1–8 MB）',
                  '速度極快（只是移動 stack pointer）',
                  '函數返回後記憶體自動收回',
                ],
                color: 'bg-blue-50 border-blue-200',
                tc: 'text-blue-800',
              },
              {
                title: 'Heap（堆積）',
                items: [
                  '手動 malloc() 分配',
                  '手動 free() 釋放（忘記 = 記憶體洩漏）',
                  '大小彈性，可動態調整',
                  '速度較慢（OS 介入管理）',
                  '生命週期跨越函數範圍',
                ],
                color: 'bg-orange-50 border-orange-200',
                tc: 'text-orange-800',
              },
            ].map((item, i) => (
              <div key={i} className={`border rounded-2xl p-5 ${item.color}`}>
                <p className={`font-black text-lg mb-3 ${item.tc}`}>{item.title}</p>
                <ul className="space-y-1.5">
                  {item.items.map((line, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <CodeBlock
            lang="c"
            title="heap_memory.c"
            code={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // ── malloc：分配 n bytes，不初始化（內容是垃圾值）
    int *arr = (int *)malloc(5 * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "記憶體分配失敗\\n");
        return 1;
    }

    // ── calloc：分配並初始化為 0
    int *zeroed = (int *)calloc(5, sizeof(int));
    // zeroed[0] == 0, zeroed[1] == 0 ...

    // ── realloc：重新調整已分配的大小
    arr = (int *)realloc(arr, 10 * sizeof(int));

    // 使用記憶體
    for (int i = 0; i < 10; i++) arr[i] = i * 2;

    // ── free：釋放記憶體（必做！）
    free(arr);
    free(zeroed);

    // 釋放後把指標設為 NULL，避免「懸空指標（Dangling Pointer）」
    arr = NULL;
    zeroed = NULL;

    // !! 記憶體洩漏（Memory Leak）示範（不要這樣做）
    // int *leak = malloc(100);
    // return 0;  // 沒有 free，這 100 bytes 永遠無法回收
    // 短程式影響不大，但長時間運行的 server/嵌入式系統會耗盡記憶體

    return 0;
}`}
          />
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <p className="font-black text-red-800 mb-2">記憶體洩漏（Memory Leak）</p>
            <p className="text-red-700 text-sm leading-relaxed">
              malloc 分配的記憶體若不 free，即使變數超出 scope，記憶體也不會自動回收。在長時間運行的系統（如嵌入式設備、伺服器）裡，累積的洩漏最終會讓系統崩潰。工具：<code className="bg-red-100 px-1 rounded">valgrind</code> 可以自動偵測洩漏。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 4: struct */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">struct（結構體）</h2>
          <p className="text-gray-700 leading-relaxed">
            struct 是 C 語言的自訂複合型別，把相關的資料打包在一起。C++ 的 class、Python 的 dataclass 概念都源自這裡。
          </p>
          <CodeBlock
            lang="c"
            title="struct_demo.c"
            code={`#include <stdio.h>
#include <string.h>

// 定義 struct（慣用 typedef，省去每次寫 struct 關鍵字）
typedef struct {
    int   id;
    char  name[50];
    float gpa;
} Student;

// 函數接收 struct 指標（避免複製整個 struct，效率更好）
void print_student(const Student *s) {
    printf("ID: %d, 姓名: %s, GPA: %.2f\\n", s->id, s->name, s->gpa);
    //        ↑ 用 -> 存取指標的成員（等同 (*s).id）
}

int main() {
    // 初始化方式 1：指定成員
    Student s1 = { .id = 1, .name = "Joseph", .gpa = 3.8 };

    // 初始化方式 2：直接賦值
    Student s2;
    s2.id = 2;
    strcpy(s2.name, "Alice");  // 字串用 strcpy，不能用 =
    s2.gpa = 3.5;

    // . 存取（直接變數）vs -> 存取（指標）
    printf("s1.id = %d\\n", s1.id);          // 用 .
    Student *ptr = &s1;
    printf("ptr->id = %d\\n", ptr->id);      // 用 ->

    print_student(&s1);
    print_student(&s2);

    // Heap 上的 struct
    Student *dynamic = (Student *)malloc(sizeof(Student));
    dynamic->id = 3;
    strcpy(dynamic->name, "Bob");
    free(dynamic);

    return 0;
}`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 5: 常用字串函數 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">常用字串函數速查</h2>
          <p className="text-gray-700 leading-relaxed">
            C 語言的字串是 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">char</code> 陣列，以 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">\0</code>（null terminator）結尾。所有字串函數都在 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">&lt;string.h&gt;</code>。
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">函數</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">用途</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">注意事項</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['strlen(s)', '取得字串長度（不含 \\0）', '返回 size_t，非 int'],
                  ['strcpy(dst, src)', '複製字串', 'dst 空間必須足夠，危險！建議用 strncpy'],
                  ['strcat(dst, src)', '字串串接', '同上，注意緩衝區溢位'],
                  ['strcmp(s1, s2)', '比較字串', '相等返回 0，s1 < s2 返回負數'],
                  ['sprintf(buf, fmt, ...)', '格式化寫入字串', '類似 printf，但寫到 buffer'],
                  ['strtok(s, delim)', '切割字串', '會修改原字串，多執行緒不安全'],
                ].map(([func, usage, note], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-slate-700 font-bold text-xs">{func}</td>
                    <td className="px-5 py-3 text-gray-700">{usage}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 6: C vs C++ vs Python */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">C vs C++ vs Python 比較</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">面向</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">C</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">C++</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">Python</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['OOP', '不支援', '完整支援（class）', '完整支援（class）'],
                  ['記憶體管理', '手動 malloc/free', '手動 + RAII (智能指標)', '自動 GC'],
                  ['執行速度', '最快', '接近 C', '最慢'],
                  ['標準函式庫', '精簡', '龐大（STL）', '龐大（豐富生態系）'],
                  ['適合場景', 'OS/韌體/驅動', '遊戲引擎/系統軟體', '腳本/AI/Web'],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-bold text-gray-700">{row[0]}</td>
                    <td className="px-5 py-3 text-gray-800">{row[1]}</td>
                    <td className="px-5 py-3 text-gray-700">{row[2]}</td>
                    <td className="px-5 py-3 text-gray-500">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 7: 面試常考題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">面試常考題</h2>
          <div className="space-y-4">
            {[
              {
                q: 'int *p 和 int p 的差異？',
                a: 'int p 是普通整數變數，儲存一個整數值。int *p 是指標變數，儲存一個記憶體地址（該地址存放 int）。*p 解參考後才能讀取或修改那個地址的值。',
              },
              {
                q: 'malloc 和 calloc 的差異？',
                a: 'malloc(n) 分配 n bytes，內容不初始化（是垃圾值）。calloc(count, size) 分配 count*size bytes，並將所有 bytes 初始化為 0。calloc 稍慢，但更安全，能避免讀到未初始化值的 bug。',
              },
              {
                q: 'free 之後還能使用那個指標嗎？',
                a: '不行。free 後那塊記憶體被歸還給 OS，繼續使用是「懸空指標（Dangling Pointer）」，屬於未定義行為，可能導致程式崩潰或資料被覆寫。習慣：free 之後立刻 ptr = NULL，使用前先檢查 NULL。',
              },
              {
                q: 'Stack overflow 在什麼情況會發生？',
                a: 'Stack 大小有限（通常 1–8 MB）。最常見原因是無終止條件的遞迴（infinite recursion），每次遞迴都在 Stack 上分配新的 stack frame，最終耗盡 Stack 空間，作業系統發出 SIGSEGV 信號終止程式。',
              },
              {
                q: '如何用 C 實作 swap 函數？',
                a: '必須用指標。void swap(int *a, int *b) { int tmp = *a; *a = *b; *b = tmp; }。若傳值（int a, int b），函數內交換的是副本，呼叫端的值不會改變。這是指標在函數參數的最典型應用。',
              },
              {
                q: 'const int *p 和 int * const p 的差異？',
                a: 'const int *p（pointer to const int）：p 本身可以改變（指向不同地址），但不能透過 p 修改所指的值。int * const p（const pointer to int）：p 本身不可改變（固定指向某地址），但可以透過 p 修改所指的值。',
              },
            ].map((item, i) => (
              <Card key={i} className="border border-gray-100 shadow-none">
                <CardBody className="p-6 space-y-3">
                  <p className="font-black text-gray-900">Q{i + 1}. {item.q}</p>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-400">這是系列第一篇</p>
          </div>
          <Link href="/blog/lang/ep02-csharp">
            <div className="bg-gray-50 hover:bg-slate-100 transition-colors rounded-2xl p-6 cursor-pointer group text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-700 group-hover:text-slate-700 transition-colors">EP.02 — C#</p>
              <p className="text-sm text-gray-400 mt-1">ASP.NET 面試題</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-slate-400 transition-colors" />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['C語言', '指標', '記憶體管理', 'struct', '面試題', 'EP.01'].map((tag) => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
