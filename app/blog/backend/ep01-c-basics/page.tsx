'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Code, Cpu, Database, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const SectionHeader = ({ icon: Icon, title, color }: { icon: any; title: string; color: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`p-2 rounded-xl ${color} bg-opacity-10`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
    <h2 className="text-3xl font-black text-gray-900">{title}</h2>
  </div>
);

export default function BackendEP01() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.01</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">後端語言系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              C 語言面試必備<br />
              <span className="text-blue-400 text-3xl md:text-4xl">指標、記憶體管理與常見 Coding 題解析</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl font-medium">
              深入計算機底層：掌握 C 語言最核心的靈魂，<br />
              應對韌體、嵌入式與後端效能開發的面試挑戰。
            </p>
            <div className="flex items-center gap-6 text-slate-400 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Code size={14} /> 指標 · 記憶體 · 面試題</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        
        {/* Intro */}
        <section>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-slate-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「C 語言是不會過時的。當你需要極致的效能或操作硬體暫存器時，它永遠是唯一的選擇。
                  而指標（Pointer）則是區分 C 語言高手與新手的唯一準則。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Pointer Basics */}
        <section>
          <SectionHeader icon={Zap} title="1. 指標 (Pointers)：C 的靈魂" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              指標就是一個「儲存記憶體位址」的變數。面試最常考的就是 <code>*</code> 與 <code>&</code> 的操作，以及 <code>Pointer to Pointer</code>。
            </p>
            <CodeBlock
              title="指標基本操作"
              lang="c"
              code={`int a = 10;
int *p = &a;  // p 指向 a 的位址
printf("%d", *p); // 取值 (Dereference) -> 輸出 10

// 陣列與指標
int arr[5] = {1, 2, 3, 4, 5};
int *ptr = arr; // arr 本身就是第一個元素的位址
printf("%d", *(ptr + 1)); // 輸出 2`}
            />
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <p className="font-black text-blue-900 mb-2">面試必考：const int *p vs int * const p</p>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• <code>const int *p</code>：指標指向的東西不能改 (Constant Data)。</li>
                <li>• <code>int * const p</code>：指標本身的位址不能改 (Constant Pointer)。</li>
                <li>• 技巧：由右往左讀。</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Memory Management */}
        <section>
          <SectionHeader icon={Cpu} title="2. 記憶體管理：Stack vs Heap" color="text-slate-600 bg-slate-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              理解記憶體佈局是開發穩定系統的關鍵。
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-0 bg-white shadow-sm">
                <CardBody className="p-6">
                  <p className="font-black text-slate-800 mb-2">Stack (棧)</p>
                  <p className="text-sm text-slate-600 mb-2">自動分配與釋放。存放區域變數、函式參數。</p>
                  <p className="text-xs text-red-500 font-bold">⚠️ 注意 Stack Overflow (遞迴過深)。</p>
                </CardBody>
              </Card>
              <Card className="border-0 bg-white shadow-sm">
                <CardBody className="p-6">
                  <p className="font-black text-slate-800 mb-2">Heap (堆)</p>
                  <p className="text-sm text-slate-600 mb-2">手動分配 (malloc) 與釋放 (free)。</p>
                  <p className="text-xs text-red-500 font-bold">⚠️ 注意 Memory Leak (忘記 free)。</p>
                </CardBody>
              </Card>
            </div>
            <CodeBlock
              title="動態記憶體配置"
              lang="c"
              code={`int *ptr = (int*)malloc(sizeof(int) * 10);
if (ptr == NULL) return -1; // 檢查是否配置成功

// 使用完畢必須釋放
free(ptr);
ptr = NULL; // 良好的習慣：設為 NULL 防止 Dangling Pointer`}
            />
          </div>
        </section>

        {/* 3. Coding Interview Questions */}
        <section>
          <SectionHeader icon={Database} title="3. 常見 Coding 題解析" color="text-green-600 bg-green-50" />
          <div className="space-y-8 text-gray-600 leading-relaxed text-lg">
            
            {/* String Reverse */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Q: 不使用函式庫，反轉字串？</h3>
              <CodeBlock
                lang="c"
                code={`void reverseString(char* s) {
    int n = strlen(s);
    for (int i = 0; i < n / 2; i++) {
        char temp = s[i];
        s[i] = s[n - 1 - i];
        s[n - 1 - i] = temp;
    }
}`}
              />
            </div>

            {/* Bit Manipulation */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Q: 如何檢查一個數是不是 2 的冪次方？</h3>
              <p className="text-sm text-gray-500">提示：使用位元運算可以在 O(1) 時間內完成。</p>
              <CodeBlock
                lang="c"
                code={`bool isPowerOfTwo(int n) {
    if (n <= 0) return false;
    return (n & (n - 1)) == 0;
}`}
              />
            </div>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              💡 C 語言學習心法
            </h2>
            <div className="space-y-4 text-slate-300">
              <p>1. <strong>多畫圖</strong>：理解指標時，在紙上畫出記憶體空間與箭頭，會比在腦袋裡想容易得多。</p>
              <p>2. <strong>注意邊界</strong>：陣列越界、空指標檢查是 C 語言程式碼最常崩潰的原因。</p>
              <p>3. <strong>理解底層</strong>：去看看 C 代碼編譯出的組合語言，你會對記憶體管理有全新的認識。</p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog" className="group block bg-gray-50 hover:bg-slate-100 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-slate-600 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">回到目錄</p>
            <p className="font-black text-gray-900 group-hover:text-slate-800 transition-colors">查看所有文章</p>
          </Link>
          <Link href="/blog/backend/ep02-csharp-aspnet" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.02 — C# 與 ASP.NET</p>
            <p className="text-sm text-gray-500 mt-1">現代化的企業級開發</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['C', 'Pointer', 'Memory Management', 'Interview', 'Algorithm', 'EP.01'].map((tag) => (
            <Chip key={tag} variant="flat" color="default" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
