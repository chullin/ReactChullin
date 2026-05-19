import { FadeIn } from '@/components/blog/ScrollAnimation';
import { 
  Zap,
  Layers,
  Lock,
  Cpu,
  Terminal,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Package,
  Activity,
  ChevronRight,
  Database,
  Eye,
  Key,
  Info
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Closure & Scope： 掌握 JS 的靈魂核心 | Joseph Chen',
  description: '為什麼函式執行完畢後，還能「記得」外部的變數？這不是魔法，而是 JavaScript 最強大也最令人困惑的機制：閉包與作用域。',
  alternates: {
    canonical: 'https://chullin.tw/blog/js/ep03-closure-scope',
  },
};



const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <FadeIn>
    {children}
  </FadeIn>
);

export default function ClosureScopePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-[#0a192f] text-white pt-36 pb-28 overflow-hidden">
        {/* JS Themed Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-[150px] opacity-20" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#f7df1e] text-black font-black flex items-center justify-center text-xl rounded-xl shadow-[0_0_20px_rgba(247,223,30,0.3)]">
                JS
              </div>
              <span  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-yellow-400/10 text-yellow-400 border-yellow-400/20 font-black uppercase tracking-widest">
                JavaScript 系列 EP.03
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
              Closure & Scope：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7df1e] to-white">
                掌握 JS 的靈魂核心
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl leading-relaxed mb-12 font-medium">
              為什麼函式執行完畢後，還能「記得」外部的變數？這不是魔法，而是 JavaScript 最強大也最令人困惑的機制：閉包與作用域。
            </p>

            <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 border-t border-slate-800 pt-10">
              <div className="flex items-center gap-2"><Layers size={18} /> 作用域鏈</div>
              <div className="flex items-center gap-2"><Lock size={18} /> 閉包應用</div>
              <div className="flex items-center gap-2"><Cpu size={18} /> 記憶體機制</div>
              <div className="flex items-center gap-2">✍️ Joseph Chen</div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 bg-white shadow-2xl shadow-slate-200/50 -mt-16 rounded-[4rem] relative z-20">
        
        {/* Intro: The Scope Concept */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-[2rem] bg-yellow-50 text-yellow-600 flex items-center justify-center shadow-inner">
              <Search size={28} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Scope：你的變數住在哪裡？</h2>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            <strong className="text-slate-900 italic underline decoration-yellow-400 decoration-4 underline-offset-4">Scope (作用域)</strong> 決定了變數的「可見性」。在 JavaScript 中，如果你在錯誤的地方呼叫變數，就會遇到經典的 <code className="bg-red-50 text-red-600 px-2 py-0.5 rounded">ReferenceError</code>。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            {[
              { type: 'Global', desc: '全域作用域', detail: '整個程式碼都看得到，像空氣一樣。' },
              { type: 'Function', desc: '函式作用域', detail: '只有函式內部才看得到，外部無法窺探。' },
              { type: 'Block', desc: '區塊作用域 (ES6+)', detail: 'if/for 大括號內部的變數，由 let/const 守護。' },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-yellow-200 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-yellow-600 transition-colors mb-4 shadow-sm font-black text-xs">0{i+1}</div>
                <h4 className="text-xl font-black text-slate-900 mb-2">{item.type}</h4>
                <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">{item.desc}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Terminal size={20} className="text-yellow-500" /> 程式碼範例：
            </h4>
            <CodeBlock 
              title="scope_example.js" 
              language="javascript" 
              code={`const globalVar = "I'm Global";

function outer() {
  const outerVar = "I'm in Outer Function";
  
  if (true) {
    const blockVar = "I'm in Block Scope";
    console.log(globalVar); // ✅ 正常
    console.log(outerVar);  // ✅ 正常
  }
  
  console.log(blockVar); // ❌ ReferenceError: blockVar is not defined
}

outer();`} 
            />
          </div>
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 1: Lexical Scope */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Layers size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">一、Lexical Scope：決定身分的基因</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              JavaScript 採用的是 <strong className="text-slate-900">Lexical Scope (語彙作用域)</strong>。
              簡單來說：<strong className="text-indigo-600">一個變數的作用域是在「寫下程式碼的那一刻」就決定的，而不是在執行時決定。</strong>
            </p>
          </div>

          <div className="bg-indigo-900 rounded-[3rem] p-10 text-white my-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10"><Database size={120} /></div>
            <h4 className="text-2xl font-black mb-6">為什麼這很重要？</h4>
            <p className="text-indigo-200 leading-relaxed mb-8">因為它決定了函式在尋找變數時，會往哪一個「外層」去找。這個「尋找」的過程，我們稱為 <strong className="text-white underline underline-offset-4">Scope Chain (作用域鏈)</strong>。</p>
            
            <CodeBlock 
              title="語彙作用域測驗" 
              language="javascript" 
              code={`const name = "Global";

function sayName() {
  console.log(name);
}

function wrapper() {
  const name = "Wrapper";
  sayName(); // 這裡會印出什麼？
}

wrapper(); // 答案是 "Global"！`} 
            />
            <p className="mt-6 text-sm text-indigo-300 italic">
              * 因為 sayName 被定義在全域，它的外層就是全域，即便在 wrapper 內部呼叫，它依然只會找它「定義時」的外層。
            </p>
          </div>
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 2: What is Closure? */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl"><Key size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">二、Closure：打破生命週期的契約</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              當一個函式可以「記得」並「存取」語彙作用域，即使這個函式是在原始作用域之外執行，這就是 <strong className="text-slate-900">Closure (閉包)</strong>。
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 space-y-6">
            <p className="text-slate-600 leading-relaxed">
              正常情況下，函式執行完畢後，記憶體會被回收。但閉包就像是一張「便利貼」，把函式執行時所需的環境變數給「黏」住了，不讓垃圾回收機制 (GC) 帶走它。
            </p>
            <CodeBlock 
              title="簡單的閉包範例" 
              language="javascript" 
              code={`function createCounter() {
  let count = 0; // 這個變數被「黏」住了
  
  return function() {
    count++; // 每次呼叫都會存取同一個 count
    console.log(count);
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3`} 
            />
            <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 p-4 rounded-2xl text-sm font-bold">
              <Info size={18} />
              雖然 createCounter 已經執行完了，但返回的匿名函式依然握著 count 的存取權。
            </div>
          </div>
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 3: Practical Application - Private Variables */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Lock size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">三、閉包實戰：建立私有變數</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              在現代 JS 推出 `#private` 語法之前，閉包是唯一實現「資料封裝」的方法。這在寫模組或套件時非常重要。
            </p>
          </div>

          <CodeBlock 
            title="Module Pattern (模組模式)" 
            language="javascript" 
            code={`const BankAccount = (initialBalance) => {
  let balance = initialBalance; // 外部無法直接修改 balance

  return {
    deposit: (amount) => {
      balance += amount;
      console.log(\`存入 \${amount}，餘額 \${balance}\`);
    },
    withdraw: (amount) => {
      if (amount > balance) return console.error("餘額不足");
      balance -= amount;
      console.log(\`取出 \${amount}，餘額 \${balance}\`);
    },
    getBalance: () => balance
  };
};

const myAcc = BankAccount(1000);
myAcc.deposit(500); // 餘額 1500
console.log(myAcc.balance); // undefined (安全！)
`} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <h5 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-500" /> 優點：安全性
              </h5>
              <p className="text-sm text-slate-500 leading-relaxed">
                保護內部狀態不被外部隨意篡改，只能透過你定義的 API (methods) 來更動資料。
              </p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <h5 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-500" /> 缺點：記憶體消耗
              </h5>
              <p className="text-sm text-slate-500 leading-relaxed">
                只要閉包函式還在，內部的變數就不會被回收。如果建立太多沒在用的閉包，會影響效能。
              </p>
            </div>
          </div>
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 4: The Closure Loop Problem */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-xl"><AlertCircle size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">四、經典陷阱：迴圈中的閉包</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              這是一個面試必考題：為什麼 setTimeout 裡的 `i` 總是印出最後一個數字？
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
            <div className="space-y-4">
              <p className="text-sm font-bold text-red-500">❌ 錯誤的寫法 (使用 var)</p>
              <CodeBlock 
                language="javascript" 
                code={`for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i); // 會印出 4, 4, 4
  }, 1000);
}`} 
              />
              <p className="text-xs text-slate-500 italic leading-relaxed">
                * var 是函式作用域，整個迴圈共用同一個 i。當 setTimeout 執行時，i 已經變成 4 了。
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold text-emerald-500">✅ 正確的寫法 (使用 let)</p>
              <CodeBlock 
                language="javascript" 
                code={`for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i); // 會印出 1, 2, 3
  }, 1000);
}`} 
              />
              <p className="text-xs text-slate-500 italic leading-relaxed">
                * let 是區塊作用域，每次迭代都會產生一個新的 i，並被當前的閉包「黏」住。
              </p>
            </div>
          </div>
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Conclusion */}
        <SectionWrapper>
          <div className="bg-yellow-400 rounded-[3rem] p-12 text-black">
            <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
              <Zap size={32} /> 總結：閉包的哲學
            </h3>
            <p className="text-black/80 text-lg leading-relaxed mb-10 font-medium">
              閉包不是什麼高深莫測的技巧，它是 JavaScript 為了讓函式變得「有生命」而設計的機制。理解了閉包，你就能從單純的「寫 Code」進階到「設計模式」，寫出更優雅、更具防護性的程式碼。
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['JavaScript', 'Closure', 'Scope', 'LexicalScope', 'MemoryManagement', 'Frontend'].map(tag => (
                <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-black text-white font-black">#{tag}</span>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Navigation */}
        <div className="mt-24 space-y-12">
          <hr className="border-gray-100 opacity-50"  />

          <div className="flex justify-between items-center gap-6">
            <Link 
              href="/blog/js/ep02-hoisting-tdz" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                <ChevronRight className="rotate-180" size={14} /> Previous
              </div>
              <p className="font-black text-slate-900 group-hover:text-yellow-600 transition-colors leading-snug">
                EP.02 — Hoisting 與 TDZ：變數提升的背後真相
              </p>
            </Link>

            <Link 
              href="/blog/js/ep04-event-loop" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all text-right"
            >
              <div className="flex items-center justify-end gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                Next <ChevronRight size={14} />
              </div>
              <p className="font-black text-slate-900 group-hover:text-yellow-600 transition-colors leading-snug">
                EP.04 — Event Loop：單執行緒下的異步奇蹟
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
