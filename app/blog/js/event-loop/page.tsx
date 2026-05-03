'use client';

import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { Calendar, ArrowLeft, ArrowRight, Code2, Lightbulb, AlertTriangle, CheckCircle, RefreshCw, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CodeBlock from '@/components/blog/CodeBlock';

const Callout = ({ type, children }: { type: 'info' | 'warn' | 'tip' | 'error'; children: React.ReactNode }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-100 text-blue-800',
    warn: 'bg-amber-50 border-amber-100 text-amber-800',
    tip: 'bg-green-50 border-green-100 text-green-800',
    error: 'bg-red-50 border-red-100 text-red-800',
  };
  const icons = { info: '💡', warn: '⚠️', tip: '✅', error: '❌' };
  return (
    <div className={`border rounded-2xl p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0">{icons[type]}</span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 rounded-xl bg-amber-100 text-amber-700">{icon}</div>
    <h2 className="text-2xl font-black text-gray-800">{children}</h2>
  </div>
);

const QueueBox = ({ label, color, items, badge }: { label: string; color: string; items: string[]; badge?: string }) => (
  <div className={`rounded-2xl border-2 ${color} p-4 space-y-2`}>
    <div className="flex items-center justify-between">
      <p className="text-xs font-black uppercase tracking-widest text-gray-500">{label}</p>
      {badge && <Chip size="sm" variant="flat" className="text-[10px] font-bold">{badge}</Chip>}
    </div>
    {items.length === 0
      ? <p className="text-xs text-gray-300 font-mono italic">（空）</p>
      : items.map((item, i) => (
        <div key={i} className="bg-white rounded-lg px-3 py-2 font-mono text-xs text-gray-700 shadow-sm border border-gray-100">
          {item}
        </div>
      ))}
  </div>
);

const steps = [
  {
    step: 1,
    label: '開始執行',
    desc: '同步程式碼進 Call Stack 執行',
    callStack: ['console.log("start")', '全域執行環境'],
    macroQueue: [],
    microQueue: [],
    output: ['start'],
  },
  {
    step: 2,
    label: 'setTimeout 登記',
    desc: 'setTimeout 交給 Web API，0ms 後把 callback 放進 Macro Queue',
    callStack: ['全域執行環境'],
    macroQueue: ['cb: console.log("timeout")'],
    microQueue: [],
    output: ['start'],
  },
  {
    step: 3,
    label: 'Promise 登記',
    desc: 'Promise.resolve().then() 把 callback 放進 Micro Queue',
    callStack: ['全域執行環境'],
    macroQueue: ['cb: console.log("timeout")'],
    microQueue: ['cb: console.log("promise")'],
    output: ['start'],
  },
  {
    step: 4,
    label: '同步碼結束',
    desc: 'console.log("end") 執行，Call Stack 清空',
    callStack: [],
    macroQueue: ['cb: console.log("timeout")'],
    microQueue: ['cb: console.log("promise")'],
    output: ['start', 'end'],
  },
  {
    step: 5,
    label: '清空 Micro Queue',
    desc: 'Call Stack 空了，Event Loop 先清空 Micro Queue',
    callStack: ['cb: console.log("promise")'],
    macroQueue: ['cb: console.log("timeout")'],
    microQueue: [],
    output: ['start', 'end', 'promise'],
  },
  {
    step: 6,
    label: '執行 Macro Queue',
    desc: 'Micro Queue 清空後，取出 Macro Queue 第一個 callback',
    callStack: ['cb: console.log("timeout")'],
    macroQueue: [],
    microQueue: [],
    output: ['start', 'end', 'promise', 'timeout'],
  },
];

export default function JSEventLoopPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const s = steps[currentStep];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-900 to-slate-900">
        <motion.div
          className="absolute inset-0 opacity-15"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(251,191,36,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(234,179,8,0.4) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                JavaScript 深度
              </Chip>
              <Chip size="sm" variant="flat" className="bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold uppercase text-[10px]">
                Event Loop
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Event Loop 完整圖解<br />
              <span className="text-amber-300">JS 如何做到「非同步」</span>
            </h1>
            <p className="text-yellow-200 text-lg font-medium max-w-2xl mx-auto">
              為什麼 setTimeout 0ms 不是真的立刻執行？<br />
              Promise 和 setTimeout 誰先誰後？用互動圖解一次說清楚
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white font-black text-sm">
              J
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Joseph Chen</p>
              <div className="flex items-center gap-2 text-gray-400 text-xs"><Calendar size={12} />
                <span>2026</span>
                <span>·</span>
                <span>JavaScript 深度系列</span>
                <span>·</span>
                <Clock size={12} />
                <span>5 min read</span>
                <span>·</span>
                <Eye size={12} />
                <span>1.2k views</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" variant="flat" color="warning">Event Loop</Chip>
            <Chip size="sm" variant="flat" color="warning">非同步</Chip>
            <Chip size="sm" variant="flat" color="warning">Microtask</Chip>
          </div>
        </motion.div>

        <Divider />

        {/* 一、JS 是單執行緒 */}
        <section className="space-y-6">
          <SectionTitle icon={<Code2 size={18} />}>一、JS 是單執行緒，卻能「同時」做很多事</SectionTitle>

          <p className="text-gray-700 leading-relaxed text-base">
            JavaScript 是<strong>單執行緒（Single-threaded）</strong>語言，也就是說，
            它一次只能做一件事。但我們天天寫 <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">setTimeout</code>、
            <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">fetch</code>、
            <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">addEventListener</code>——這些明明看起來是「同時在跑」的，這是怎麼做到的？
          </p>

          <p className="text-gray-700 leading-relaxed">
            答案是：JS 本身確實只有一條執行緒，但它所在的<strong>宿主環境</strong>（瀏覽器或 Node.js）
            提供了額外的能力——<strong>Web APIs</strong>。這些 API 可以在背景執行耗時操作，
            完成後把結果透過 <strong>Event Loop</strong> 通知 JS。
          </p>

          {/* 架構圖 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-sm border border-gray-100">
              <CardBody className="p-6">
                <p className="text-sm font-black text-gray-500 uppercase tracking-widest mb-5 text-center">
                  JS Runtime 架構示意
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="border border-blue-100 bg-blue-50/50 shadow-none">
                    <CardBody className="p-4 space-y-2">
                      <p className="text-xs font-black text-blue-600 uppercase tracking-wider">JS Engine（V8）</p>
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg px-3 py-2 text-xs font-mono text-gray-600 border border-blue-100">Call Stack</div>
                        <div className="bg-white rounded-lg px-3 py-2 text-xs font-mono text-gray-600 border border-blue-100">Memory Heap</div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="border border-green-100 bg-green-50/50 shadow-none">
                    <CardBody className="p-4 space-y-2">
                      <p className="text-xs font-black text-green-600 uppercase tracking-wider">Web APIs</p>
                      <div className="space-y-2">
                        {['setTimeout / setInterval', 'fetch / XMLHttpRequest', 'DOM Events', 'requestAnimationFrame'].map((api) => (
                          <div key={api} className="bg-white rounded-lg px-3 py-2 text-xs font-mono text-gray-600 border border-green-100">{api}</div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="border border-amber-100 bg-amber-50/50 shadow-none">
                    <CardBody className="p-4 space-y-2">
                      <p className="text-xs font-black text-amber-600 uppercase tracking-wider">Event Loop</p>
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg px-3 py-2 text-xs font-mono text-gray-600 border border-amber-100">Microtask Queue</div>
                        <div className="bg-white rounded-lg px-3 py-2 text-xs font-mono text-gray-600 border border-amber-100">Macrotask Queue</div>
                        <div className="bg-amber-100 rounded-lg px-3 py-2 text-xs font-mono text-amber-700 border border-amber-200 font-bold">Event Loop</div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <p className="text-xs text-center text-gray-400 mt-4">
                  Web APIs 完成後把 callback 放進 Queue，Event Loop 看到 Call Stack 空了就把 Queue 裡的任務搬進來執行
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </section>

        {/* 二、Call Stack */}
        <section className="space-y-6">
          <SectionTitle icon={<Lightbulb size={18} />}>二、Call Stack：JS 的執行順序管理員</SectionTitle>

          <p className="text-gray-700 leading-relaxed">
            <strong>Call Stack（呼叫堆疊）</strong>是 JS 追蹤「現在執行到哪個函式」的資料結構，
            遵循<strong>後進先出（LIFO）</strong>原則——最後呼叫的函式最先結束。
          </p>

          <CodeBlock
            title="call-stack.js — 執行順序追蹤"
            code={`function c() { console.log('c'); }
function b() { c(); console.log('b'); }
function a() { b(); console.log('a'); }

a();
// Call Stack 的變化：
// → a() 進 Stack
//   → b() 進 Stack
//     → c() 進 Stack → 印出 'c' → c() 出 Stack
//   → 印出 'b' → b() 出 Stack
// → 印出 'a' → a() 出 Stack

// 輸出順序：c → b → a`}
          />

          <Callout type="warn">
            <strong>Stack Overflow</strong>：如果函式無限遞迴，Call Stack 會不斷堆疊直到超出上限，
            瀏覽器拋出 <code className="font-mono">Maximum call stack size exceeded</code>。
            這就是 Stack Overflow 的由來（也是那個著名 QA 網站的名稱來源）。
          </Callout>
        </section>

        {/* 三、Macro vs Micro */}
        <section className="space-y-6">
          <SectionTitle icon={<RefreshCw size={18} />}>三、Macrotask vs Microtask：兩種任務佇列</SectionTitle>

          <p className="text-gray-700 leading-relaxed">
            非同步任務完成後，callback 會被放進「佇列（Queue）」等待執行。
            但佇列不只一個——JS 有兩種優先級不同的佇列：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border border-purple-100 bg-purple-50/30 shadow-sm">
              <CardBody className="p-5 space-y-3">
                <div>
                  <Chip size="sm" variant="flat" className="bg-purple-100 text-purple-700 font-bold mb-2">優先度：高</Chip>
                  <p className="font-black text-gray-800">Microtask Queue</p>
                  <p className="text-xs text-gray-400 font-mono">微任務佇列</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  每次 Call Stack 清空後，<strong>必須把 Microtask Queue 全部清空</strong>，才能執行下一個 Macrotask。
                </p>
                <div className="space-y-1.5">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wider">屬於 Microtask 的 API</p>
                  {['Promise.then / .catch / .finally', 'queueMicrotask()', 'MutationObserver'].map((api) => (
                    <div key={api} className="bg-white rounded-lg px-3 py-2 text-xs font-mono text-purple-700 border border-purple-100">{api}</div>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Card className="border border-orange-100 bg-orange-50/30 shadow-sm">
              <CardBody className="p-5 space-y-3">
                <div>
                  <Chip size="sm" variant="flat" className="bg-orange-100 text-orange-700 font-bold mb-2">優先度：低</Chip>
                  <p className="font-black text-gray-800">Macrotask Queue</p>
                  <p className="text-xs text-gray-400 font-mono">宏任務佇列（Task Queue）</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  每次只取出<strong>一個</strong> Macrotask 執行，執行完後再去清空 Microtask Queue，如此循環。
                </p>
                <div className="space-y-1.5">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wider">屬於 Macrotask 的 API</p>
                  {['setTimeout / setInterval', 'setImmediate（Node.js）', 'DOM 事件 callback', 'I/O callback'].map((api) => (
                    <div key={api} className="bg-white rounded-lg px-3 py-2 text-xs font-mono text-orange-700 border border-orange-100">{api}</div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="shadow-sm border border-gray-100 bg-gray-50/50">
            <CardBody className="p-5">
              <p className="text-sm font-black text-gray-600 mb-3">Event Loop 的完整循環邏輯（虛擬碼）</p>
              <CodeBlock
                title="event-loop-pseudocode.js"
                code={`while (true) {
  // 1. 執行 Call Stack 裡的同步程式碼
  executeSyncCode();

  // 2. 清空所有 Microtask（可能產生新的 Microtask，繼續清空）
  while (microtaskQueue.length > 0) {
    microtaskQueue.shift()();
  }

  // 3. 取出 Macrotask Queue 的第一個任務執行
  if (macrotaskQueue.length > 0) {
    macrotaskQueue.shift()();
  }

  // 4. 回到步驟 2（清空可能新增的 Microtask）
  // → 如此無限循環
}`}
              />
            </CardBody>
          </Card>
        </section>

        {/* 四、互動圖解 */}
        <section className="space-y-6">
          <SectionTitle icon={<RefreshCw size={18} />}>四、互動圖解：這段程式碼的執行順序</SectionTitle>

          <CodeBlock
            title="execution-order.js — 猜猜輸出順序？"
            code={`console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('end');

// 答案：start → end → promise → timeout`}
          />

          <p className="text-gray-700 leading-relaxed">
            很多人以為 <code className="font-mono">setTimeout 0</code> 等於「立刻執行」，
            但實際上 <code className="font-mono">promise</code> 永遠比 <code className="font-mono">timeout</code> 先印出來。
            下面的互動圖解一步步說明原因：
          </p>

          {/* 互動圖解 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-gray-800">步驟 {s.step} / {steps.length}</p>
                  <p className="text-sm font-bold text-amber-600">{s.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    variant="flat"
                    size="sm"
                    isDisabled={currentStep === 0}
                    onPress={() => setCurrentStep(p => p - 1)}
                    className="font-bold"
                  >
                    ‹
                  </Button>
                  <Button
                    isIconOnly
                    variant="flat"
                    size="sm"
                    isDisabled={currentStep === steps.length - 1}
                    onPress={() => setCurrentStep(p => p + 1)}
                    className="font-bold"
                  >
                    ›
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <QueueBox
                  label="Call Stack"
                  color="border-blue-200 bg-blue-50/50"
                  items={s.callStack}
                  badge="LIFO"
                />
                <QueueBox
                  label="Microtask Queue"
                  color="border-purple-200 bg-purple-50/50"
                  items={s.microQueue}
                  badge="優先"
                />
                <QueueBox
                  label="Macrotask Queue"
                  color="border-orange-200 bg-orange-50/50"
                  items={s.macroQueue}
                  badge="延後"
                />
              </div>

              <div className="bg-gray-900 rounded-2xl px-5 py-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">目前輸出</p>
                <div className="flex flex-wrap gap-2">
                  {s.output.map((o, i) => (
                    <motion.span
                      key={`${i}-${o}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="font-mono text-green-400 text-sm bg-gray-800 px-3 py-1 rounded-lg"
                    >
                      &apos;{o}&apos;
                    </motion.span>
                  ))}
                  {s.output.length === 0 && (
                    <span className="text-gray-600 text-sm font-mono italic">（尚無輸出）</span>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === currentStep ? 'bg-amber-500' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* 五、常見陷阱 */}
        <section className="space-y-8">
          <SectionTitle icon={<AlertTriangle size={18} />}>五、Event Loop 常見陷阱</SectionTitle>

          {/* 陷阱 1 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #1</Chip>
                <h4 className="font-black text-gray-800">setTimeout 0ms 不是「立刻執行」</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                <code className="font-mono">setTimeout(fn, 0)</code> 只是說「把 fn 放進 Macrotask Queue，
                盡快執行」。但它必須等到 Call Stack 清空、Microtask Queue 也清空之後才會執行。
                <strong>0ms 只是最短等待時間，不是實際執行時間。</strong>
              </p>
              <CodeBlock
                title="settimeout-0.js"
                code={`// setTimeout 0 的實際含義
setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));
console.log('C');

// 輸出：C → B → A
// C：同步，立刻執行
// B：Microtask，Call Stack 清空後立刻執行
// A：Macrotask，Microtask 清空後才執行`}
              />
            </CardBody>
          </Card>

          {/* 陷阱 2 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #2</Chip>
                <h4 className="font-black text-gray-800">無限 Microtask 會阻塞頁面渲染</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                瀏覽器的畫面重繪（re-render）是在 Macrotask 之間執行的。
                如果 Microtask Queue 一直有任務（例如 then 裡面不斷 resolve 新 Promise），
                畫面就永遠不會更新——頁面「卡死」。
              </p>
              <CodeBlock
                title="infinite-microtask.js"
                code={`// ❌ 危險：無限遞迴 Microtask，頁面卡死
function loop() {
  Promise.resolve().then(loop); // 不斷往 Microtask Queue 塞
}
loop();

// ✅ 如果需要「盡快但允許渲染」的定時任務
// 改用 setTimeout 讓瀏覽器有機會重繪
function loopSafe() {
  // do something
  setTimeout(loopSafe, 0); // Macrotask，中間讓瀏覽器喘口氣
}`}
              />
            </CardBody>
          </Card>

          {/* 陷阱 3 */}
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat" color="danger">陷阱 #3</Chip>
                <h4 className="font-black text-gray-800">長時間同步運算阻塞 UI</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                JS 是單執行緒，同步程式碼執行期間，Event Loop 完全停擺——使用者的點擊、滾動、動畫全部凍結。
              </p>
              <CodeBlock
                title="blocking-sync.js"
                code={`// ❌ 問題：同步迴圈阻塞 3 秒，UI 凍結
function heavyWork() {
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // 空轉 3 秒，這段期間頁面完全無回應
  }
}
heavyWork();

// ✅ 解法 1：分批處理，讓 Event Loop 有空隙
async function heavyWorkChunked(items) {
  for (let i = 0; i < items.length; i++) {
    process(items[i]);
    if (i % 100 === 0) {
      await new Promise(r => setTimeout(r, 0)); // 讓出控制權
    }
  }
}

// ✅ 解法 2：Web Worker（真正的多執行緒）
// 把耗時計算移到 Worker，不阻塞主執行緒`}
              />
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* 六、進階：async/await 與 Event Loop */}
        <section className="space-y-6">
          <SectionTitle icon={<CheckCircle size={18} />}>六、async/await 底層就是 Promise + Microtask</SectionTitle>

          <p className="text-gray-700 leading-relaxed">
            <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono text-sm">async/await</code> 是 Promise 的語法糖。
            <code className="font-mono">await</code> 的本質是：暫停函式執行，把後面的程式碼包進 <code className="font-mono">.then()</code>，
            放進 Microtask Queue 等待。
          </p>

          <CodeBlock
            title="async-await-event-loop.js"
            code={`async function asyncFunc() {
  console.log('A');          // ① 同步執行
  await Promise.resolve();   // ② 暫停，把後面的程式碼放進 Microtask Queue
  console.log('B');          // ③ Microtask：等 await 解決後執行
}

console.log('start');
asyncFunc();
console.log('end');

// 輸出：start → A → end → B
// 因為 await 之後的 console.log('B')
// 等同於 Promise.resolve().then(() => console.log('B'))
// 是個 Microtask，等同步碼（end）執行完後才跑`}
          />

          <Card className="shadow-sm border border-amber-100 bg-amber-50/30">
            <CardBody className="p-6 space-y-3">
              <p className="text-sm font-black text-amber-700 uppercase tracking-widest">核心重點整理</p>
              {[
                { key: 'Call Stack', val: 'JS 執行同步程式碼的地方，LIFO，一次只跑一個函式' },
                { key: 'Web APIs', val: '瀏覽器提供，在背景執行 setTimeout、fetch 等，完成後把 callback 放進 Queue' },
                { key: 'Microtask Queue', val: 'Promise.then 的 callback，Call Stack 清空後立刻全部清空（優先於 Macrotask）' },
                { key: 'Macrotask Queue', val: 'setTimeout / 事件 callback，每次只取一個執行，執行完先清空 Microtask' },
                { key: 'Event Loop', val: '不停地問：Call Stack 空了嗎？空了就先清 Microtask，再取一個 Macrotask' },
                { key: 'setTimeout 0', val: '不是立刻執行，是「Call Stack 和 Microtask 都清空後」才執行' },
                { key: 'async/await', val: 'await 暫停函式，把之後的程式碼丟進 Microtask Queue，本質是 Promise.then' },
              ].map((r) => (
                <div key={r.key} className="flex items-start gap-4 bg-white rounded-xl px-4 py-3">
                  <code className="font-mono text-sm font-black text-amber-700 w-32 shrink-0 mt-0.5">{r.key}</code>
                  <p className="text-sm text-gray-600 flex-1 leading-relaxed">{r.val}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-4">
          <Link href="/blog/js/closure-scope">
            <Button variant="flat" startContent={<ArrowLeft size={16} />} className="font-bold text-gray-600 hover:text-gray-900">
              閉包與作用域
            </Button>
          </Link>
          <Link href="/blog/js/promise-async">
            <Button variant="flat" endContent={<ArrowRight size={16} />} className="font-bold text-gray-600 hover:text-gray-900">
              Promise vs async/await
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
