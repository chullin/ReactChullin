'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider,
  Button,
  Progress } from '@heroui/react';
import { 
  Zap,
  Activity,
  Clock,
  Cpu,
  Layers,
  Terminal,
  ArrowRight,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Play,
  Settings,
  MessageSquare,
  Network,
  FastForward,
  History
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';
import { useState } from 'react';

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

export default function PromiseAsyncPage() {
  const [demoState, setDemoState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  const runDemo = (type: 'success' | 'error') => {
    setDemoState('pending');
    setTimeout(() => {
      setDemoState(type);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-[#002b36] text-white pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <FastForward className="text-emerald-400" size={24} />
              </div>
              <Chip variant="flat" className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 font-black uppercase tracking-widest">
                JavaScript 系列 EP.05
              </Chip>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              Promise & Async：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                異步處理的演進史
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl leading-relaxed mb-12 font-medium">
              從混亂的 Callback Hell 到優雅的 Async/Await。徹底掌握 JavaScript 處理資料請求與長時間任務的終極方案。
            </p>

            <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 border-t border-slate-800 pt-10">
              <div className="flex items-center gap-2"><History size={18} /> 發展歷程</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={18} /> 狀態機制</div>
              <div className="flex items-center gap-2"><Settings size={18} /> 錯誤處理</div>
              <div className="flex items-center gap-2">✍️ Joseph Chen</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 bg-white shadow-2xl shadow-slate-200/50 -mt-16 rounded-[4rem] relative z-20">
        
        {/* Intro: The Callback Hell */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-[2rem] bg-rose-50 text-rose-600 flex items-center justify-center shadow-inner">
              <History size={28} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">痛點：歡迎來到「回呼地獄」</h2>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            在 Promise 出現之前，我們要處理多個相依的非同步任務，程式碼會長得像這樣：
          </p>

          <CodeBlock 
            title="Callback Hell 範例" 
            language="javascript" 
            code={`getData((user) => {
  getOrders(user.id, (orders) => {
    getDetails(orders[0].id, (details) => {
      process(details, (result) => {
        console.log("終於拿到了！");
      });
    });
  });
});`} 
          />

          <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-10 space-y-6 my-10">
            <h4 className="text-2xl font-black text-rose-900">為什麼這很糟糕？</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-bold text-rose-800">1. 難以閱讀與維護</p>
                <p className="text-sm text-rose-700">程式碼不斷向右偏移，形成所謂的「金字塔」結構。</p>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-rose-800">2. 錯誤處理極其困難</p>
                <p className="text-sm text-rose-700">每一層都要寫一次 error callback，漏掉一個就導致整個程式崩潰。</p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 1: Promise Mechanics */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Zap size={28} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">一、Promise：一份未來的契約</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            Promise 本質上是一個「容器」，裡面存著某個未來才會結束的事件（通常是非同步操作）的結果。
          </p>

          <div className="my-10 p-10 bg-slate-50 border border-slate-100 rounded-[3rem] text-center space-y-10">
            <h4 className="text-xl font-black">Promise 狀態機演練</h4>
            <div className="flex justify-center items-center gap-8">
              {[
                { state: 'pending', color: 'bg-blue-500', label: 'Pending (等候中)' },
                { state: 'success', color: 'bg-emerald-500', label: 'Fulfilled (成功)' },
                { state: 'error', color: 'bg-rose-500', label: 'Rejected (失敗)' },
              ].map((item) => (
                <div key={item.state} className={`transition-all duration-500 flex flex-col items-center gap-4 ${demoState === item.state ? 'scale-110 opacity-100' : 'scale-90 opacity-30'}`}>
                  <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center shadow-lg`}>
                    {item.state === 'pending' && <RefreshCcw className="text-white animate-spin" />}
                    {item.state === 'success' && <CheckCircle2 className="text-white" />}
                    {item.state === 'error' && <AlertCircle className="text-white" />}
                  </div>
                  <p className="text-xs font-black text-slate-900">{item.label}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-4">
              <Button color="success" className="font-black h-12 px-8 rounded-2xl" onPress={() => runDemo('success')}>模擬成功</Button>
              <Button color="danger" className="font-black h-12 px-8 rounded-2xl" onPress={() => runDemo('error')}>模擬失敗</Button>
            </div>
            
            {demoState === 'pending' && <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md mx-auto" color="primary" />}
          </div>

          <CodeBlock 
            title="如何創建一個 Promise" 
            language="javascript" 
            code={`const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("任務完成！");
  } else {
    reject("發生錯誤...");
  }
});

myPromise
  .then(res => console.log(res))
  .catch(err => console.error(err));`} 
          />
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 2: Chaining and Error Handling */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Layers size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">二、Promise Chaining：鏈結的力量</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              Promise 最強大的地方在於 `.then()` 會回傳一個新的 Promise，這讓我們可以把非同步操作「扁平化」。
            </p>
          </div>

          <CodeBlock 
            title="解決 Callback Hell 的寫法" 
            language="javascript" 
            code={`getData()
  .then(user => getOrders(user.id))
  .then(orders => getDetails(orders[0].id))
  .then(details => process(details))
  .then(result => console.log("拿到結果：", result))
  .catch(err => console.error("中間任何一步失敗都會到這裡"));`} 
          />

          <div className="bg-slate-900 rounded-3xl p-8 text-slate-300 mt-10">
            <h4 className="text-xl font-black mb-6 text-white flex items-center gap-2">
              <History size={20} className="text-emerald-400" /> 錯誤處理的三個關鍵點
            </h4>
            <div className="space-y-6">
              {[
                { title: '一網打盡', desc: '最後一個 .catch() 可以捕捉到鏈結中任何一個步驟拋出的錯誤。' },
                { title: '斷點復原', desc: '你可以在鏈結中間插入 .catch()，回傳一個預設值，讓後續的 .then() 繼續跑。' },
                { title: 'Finally', desc: '無論成功或失敗，.finally() 都會執行，適合用來關閉 Loading 狀態。' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black text-emerald-400 shrink-0">{i+1}</div>
                  <div>
                    <p className="font-bold text-slate-100">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 3: Advanced Methods */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Cpu size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">三、進階技：並發處理與賽跑</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              當我們需要同時處理多個請求時，Promise 提供了幾個靜態方法。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <Card shadow="none" className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:border-purple-200 transition-colors">
              <h5 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                <Layers size={18} className="text-blue-500" /> Promise.all()
              </h5>
              <p className="text-sm text-slate-500 leading-relaxed">
                <strong className="text-slate-900">「全部都要成功才算成功。」</strong>
                <br />適合一次抓取多份相依資料，若有一個失敗則全部失敗。
              </p>
            </Card>
            <Card shadow="none" className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:border-purple-200 transition-colors">
              <h5 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                <FastForward size={18} className="text-amber-500" /> Promise.race()
              </h5>
              <p className="text-sm text-slate-500 leading-relaxed">
                <strong className="text-slate-900">「誰跑最快就聽誰的。」</strong>
                <br />適合用來實作請求超時 (Timeout) 機制。
              </p>
            </Card>
          </div>

          <CodeBlock 
            title="Promise.all 實戰範例" 
            language="javascript" 
            code={`const [users, posts, config] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchConfig()
]);`} 
          />
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 4: Async/Await Syntax */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Play size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">四、Async / Await：終極優雅</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              ES2017 推出的 `async/await` 讓我們能用同步的寫法處理非同步。它本質上是 Promise 的語法糖，讓程式碼更直覺、更好讀。
            </p>
          </div>

          <div className="space-y-6 mt-8">
            <CodeBlock 
              title="這是目前的標準寫法" 
              language="javascript" 
              code={`async function handleData() {
  try {
    const user = await getData();
    const orders = await getOrders(user.id);
    console.log("我的訂單：", orders);
  } catch (error) {
    console.error("出錯了：", error);
  } finally {
    setLoading(false);
  }
}`} 
            />
            
            <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2.5rem]">
              <h5 className="font-black text-blue-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} /> 必須注意的細節：
              </h5>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  <p><strong className="font-black">Await 會暫停執行</strong>：在同一個函式內，await 之後的程式碼要等前面的跑完才會動。</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  <p><strong className="font-black">Try...Catch</strong>：異步錯誤必須被捕捉，否則會導致 Unhandled Promise Rejection。</p>
                </li>
              </ul>
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Conclusion */}
        <SectionWrapper>
          <div className="bg-[#002b36] rounded-[3rem] p-12 text-white">
            <h3 className="text-3xl font-black mb-8 flex items-center gap-3 text-emerald-400">
              <FastForward size={32} /> 總結：踏上異步的大師之路
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium">
              JavaScript 的異步處理從「回呼」進化到「契約 (Promise)」，最後到達了「同步化 (Async/Await)」。掌握這些工具，你就能在處理複雜的網路請求、檔案操作與定時任務時，保持程式碼的清晰與穩定。
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['JavaScript', 'Promise', 'Async', 'Await', 'CallbackHell', 'Frontend', 'V8'].map(tag => (
                <Chip key={tag} className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black">#{tag}</Chip>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Navigation */}
        <div className="mt-24 space-y-12">
          <Divider className="opacity-50" />

          <div className="flex justify-between items-center gap-6">
            <Link 
              href="/blog/js/ep04-event-loop" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                <ChevronRight className="rotate-180" size={14} /> Previous
              </div>
              <p className="font-black text-slate-900 group-hover:text-emerald-500 transition-colors leading-snug">
                EP.04 — Event Loop：單執行緒下的異步奇蹟
              </p>
            </Link>

            <Link 
              href="/blog/js/ep06-this-keyword" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all text-right"
            >
              <div className="flex items-center justify-end gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                Next <ChevronRight size={14} />
              </div>
              <p className="font-black text-slate-900 group-hover:text-emerald-500 transition-colors leading-snug">
                EP.06 — This 關鍵字：誰才是我的主人？
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
