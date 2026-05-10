'use client';

import { Card, CardBody, Chip, Divider, Button, Code } from '@heroui/react';
import { 
  Zap, 
  Activity, 
  Clock, 
  Cpu, 
  Layers, 
  Terminal, 
  ArrowRight, 
  RefreshCcw,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Eye,
  MessageSquare,
  Play,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';
import { useState, useEffect } from 'react';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="space-y-10"
  >
    {children}
  </motion.div>
);

export default function EventLoopPage() {
  const [activeStep, setActiveStep] = useState(0);

  // 模擬 Event Loop 步驟
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 to-indigo-950 text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-8">
              <RefreshCcw className="text-yellow-400 animate-spin" size={16} />
              <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">JavaScript 系列 EP.04</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
              Event Loop：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-400">
                單執行緒的異步奇蹟
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              為什麼 JS 只有一個執行緒卻不會卡死？深入理解 Call Stack、Task Queue 與 Microtasks 的協作模式，掌握前端效能優化的核心。
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-sm font-bold tracking-widest uppercase">
                <Layers size={16} /> Non-Blocking
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 text-sm font-bold tracking-widest uppercase">
                <Clock size={16} /> Asynchronous
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 bg-white -mt-12 rounded-t-[4rem] relative z-20">
        
        {/* Intro: The Pain Point */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
              <AlertTriangle size={28} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">痛點：為什麼我的按鈕沒反應？</h2>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            你是否遇過這樣的情況：網頁在執行一段複雜的運算時，點擊按鈕沒有反應、動畫卡住、甚至瀏覽器跳出「網頁沒有回應」？
            這是因為 <strong className="text-slate-900 underline decoration-red-500 decoration-2 underline-offset-4">JavaScript 是單執行緒 (Single-threaded)</strong>。
          </p>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-slate-300 space-y-6 my-10 border border-slate-800">
            <div className="flex items-center gap-2 text-yellow-400 mb-2">
              <Cpu size={24} />
              <h4 className="text-xl font-black">JS 引擎的限制</h4>
            </div>
            <p className="leading-relaxed">
              JS 引擎（如 Chrome 的 V8）只有一個 **Call Stack**。同一時間只能做一件事。
              如果你在 Stack 裡塞進一個執行 5 秒鐘的 `while(true)`，那這 5 秒內，瀏覽器完全無法處理點擊事件或更新畫面。
            </p>
            <div className="p-6 bg-slate-800/50 rounded-3xl border border-slate-700">
              <p className="text-sm font-mono text-red-400 mb-2">// 🚫 阻塞主執行緒的罪魁禍首</p>
              <p className="text-sm font-mono text-slate-400">while (isComputing) {'{'}</p>
              <p className="text-sm font-mono text-slate-400 ml-4">// 做極其複雜的數學運算...</p>
              <p className="text-sm font-mono text-slate-400">{'}'}</p>
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 1: The Event Loop Visualization */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <RefreshCcw size={28} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">一、視覺化 Event Loop：四大主角</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            為了解決單執行緒的阻塞問題，JS 環境（瀏覽器或 Node.js）提供了一套機制。讓我們看看這四個組件是如何運作的：
          </p>

          <div className="my-12 p-10 bg-slate-50 border border-slate-100 rounded-[3rem] relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {[
                { name: 'Call Stack', icon: <Layers />, desc: '正在執行中的同步程式碼。' },
                { name: 'Web APIs', icon: <Settings />, desc: '處理計時器、DOM 事件、AJAX。' },
                { name: 'Microtasks', icon: <Zap />, desc: 'Promise.then、MutationObserver (優先級高)。' },
                { name: 'Task Queue', icon: <MessageSquare />, desc: 'setTimeout、setInterval (優先級低)。' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`p-6 rounded-3xl border transition-all duration-500 ${
                    activeStep === i ? 'bg-white border-indigo-300 shadow-xl scale-105' : 'bg-slate-100/50 border-transparent opacity-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${activeStep === i ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    {item.icon}
                  </div>
                  <h5 className="font-black text-slate-900">{item.name}</h5>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            {/* The Loop Arrow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <RefreshCcw size={200} className="animate-spin" />
            </div>
          </div>
          
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-3xl">
            <p className="text-indigo-900 font-bold mb-2">Event Loop 的工作只有一件事：</p>
            <p className="text-sm text-indigo-700 leading-relaxed italic">
              「如果 Call Stack 是空的，就去 Microtask Queue 搬東西過來跑；如果 Microtask 也空了，再去 Task Queue 搬東西。」
            </p>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 2: Macro vs Micro Tasks */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Activity size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">二、微任務 vs 宏任務：誰先執行？</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              這是最經典的面試題。你需要記住：<strong className="text-emerald-600 underline decoration-2 underline-offset-4">微任務 (Microtasks) 永遠插隊在宏任務 (Macrotasks) 之前。</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <Card shadow="none" className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
              <h5 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-500" /> Macrotasks (宏任務)
              </h5>
              <ul className="text-sm text-slate-500 space-y-2 list-inside list-disc">
                <li>setTimeout / setInterval</li>
                <li>setImmediate (Node.js)</li>
                <li>I/O 操作</li>
                <li>UI 渲染 (Rendering)</li>
              </ul>
            </Card>
            <Card shadow="none" className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
              <h5 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-yellow-500" /> Microtasks (微任務)
              </h5>
              <ul className="text-sm text-slate-500 space-y-2 list-inside list-disc">
                <li>Promise.then / .catch / .finally</li>
                <li>Async / Await (本質是 Promise)</li>
                <li>process.nextTick (Node.js 優先級最高)</li>
                <li>MutationObserver</li>
              </ul>
            </Card>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-slate-800">測驗：這段程式碼會印出什麼？</h4>
            <CodeBlock 
              title="event_loop_quiz.js" 
              language="javascript" 
              code={`console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise");
});

console.log("4. End");`} 
            />
            <div className="bg-slate-900 p-6 rounded-2xl">
              <p className="text-emerald-400 font-mono text-sm">答案：1 -> 4 -> 3 -> 2</p>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                解析：1 和 4 是同步程式碼先跑。3 是微任務，在同步跑完後立即執行。2 是宏任務，排在最後。
              </p>
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 3: Async/Await and the Stack */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Play size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">三、Async / Await：優雅的包裝</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              `async/await` 讓異步看起來像同步。但它背後依然是 Promise。當執行到 `await` 時，函式會**暫停**，交出執行權，並把剩餘的部分塞進 Microtask Queue。
            </p>
          </div>

          <CodeBlock 
            title="Async 流程解析" 
            language="javascript" 
            code={`async function myFunc() {
  console.log("Inside - Start");
  await Promise.resolve(); // 這裡會暫停
  console.log("Inside - End"); // 這裡被塞進微任務隊列
}

console.log("Global - Start");
myFunc();
console.log("Global - End");`} 
          />
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-sm text-blue-800 italic">
            印出順序：Global - Start -> Inside - Start -> Global - End -> Inside - End
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 4: Performance and Rendering */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Settings size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">四、效能實戰：不要阻塞渲染</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              瀏覽器通常每 16.7 毫秒 (60fps) 會進行一次 **Render (渲染)**。如果你的 JS 執行時間太長，超出了這個視窗，使用者就會感覺到掉幀。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="space-y-4 p-8 border border-slate-100 rounded-[2.5rem] bg-slate-50">
              <h5 className="font-black text-slate-900 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-500" /> 壞習慣：長任務
              </h5>
              <p className="text-sm text-slate-500">一次性處理 10 萬筆資料，導致 Stack 一直是滿的，瀏覽器無法進行 Render。</p>
            </div>
            <div className="space-y-4 p-8 border border-slate-100 rounded-[2.5rem] bg-emerald-50">
              <h5 className="font-black text-slate-900 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" /> 好習慣：任務切分
              </h5>
              <p className="text-sm text-slate-500">使用 `setTimeout` 或 `requestIdleCallback` 將大任務拆成小碎片，讓 Render 有機會插隊進來。</p>
            </div>
          </div>

          <CodeBlock 
            title="優雅處理大量數據" 
            language="javascript" 
            code={`function processInChunks(items) {
  if (items.length === 0) return;

  // 處理 100 筆
  const chunk = items.splice(0, 100);
  doWork(chunk);

  // 將剩下的 100 筆排入下一個 Task，給瀏覽器「喘息 (渲染)」的機會
  setTimeout(() => processInChunks(items), 0);
}`} 
          />
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Conclusion */}
        <SectionWrapper>
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
              <RefreshCcw size={200} />
            </div>
            <h3 className="text-3xl font-black mb-8">總結：理解規則，優化體驗</h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl font-medium">
              Event Loop 是 JavaScript 的「調度員」。理解它的運作邏輯，不僅能幫你通過面試，更能讓你在面對複雜的異步邏輯與效能瓶頸時，清楚知道問題出在哪裡，並寫出更流暢、更穩定的前端應用。
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['JavaScript', 'EventLoop', 'Async', 'Performance', 'V8', 'Microtasks', 'Promise'].map(tag => (
                <Chip key={tag} className="bg-white/10 text-white border border-white/20 font-black">#{tag}</Chip>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Navigation */}
        <div className="mt-24 space-y-12">
          <Divider className="opacity-50" />

          <div className="flex justify-between items-center gap-6">
            <Link 
              href="/blog/js/ep03-closure-scope" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                <ChevronRight className="rotate-180" size={14} /> Previous
              </div>
              <p className="font-black text-slate-900 group-hover:text-yellow-600 transition-colors leading-snug">
                EP.03 — Closure & Scope：掌握 JS 的靈魂核心
              </p>
            </Link>

            <Link 
              href="/blog/js/ep05-promise-async" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all text-right"
            >
              <div className="flex items-center justify-end gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                Next <ChevronRight size={14} />
              </div>
              <p className="font-black text-slate-900 group-hover:text-yellow-600 transition-colors leading-snug">
                EP.05 — Promise & Async：異步程式碼的演進史
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
