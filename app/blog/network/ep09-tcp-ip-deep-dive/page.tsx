'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider,
  Button,
  Tabs,
  Tab } from '@heroui/react';
import { 
  Globe,
  Activity,
  Zap,
  ShieldCheck,
  RefreshCcw,
  Terminal,
  ArrowRight,
  Layers,
  Cpu,
  Network,
  Clock,
  ArrowDownUp,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ChevronRight,
  Code2,
  Database,
  Search
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
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

export default function TcpIpDeepDivePage() {
  const [handshakeStep, setHandshakeStep] = useState(0);

  // 模擬三次握手流程
  useEffect(() => {
    const timer = setInterval(() => {
      setHandshakeStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-[#0f172a] text-white pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center gap-3 mb-8">
              <Chip variant="flat" className="bg-sky-500/10 text-sky-400 border-sky-500/20 font-black uppercase tracking-widest">
                網路協定 EP.09
              </Chip>
              <Chip variant="flat" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-black uppercase tracking-widest">
                傳輸層核心
              </Chip>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
              TCP/IP 深度解析：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                從握手到揮手的旅程
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              為什麼網路傳輸需要這麼繁雜的步驟？深入探討可靠傳輸背後的設計哲學，掌握擁塞控制與視窗機制。
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-500 border-t border-slate-800 pt-10">
              <div className="flex items-center gap-2"><ArrowDownUp size={18} /> 三向交握</div>
              <div className="flex items-center gap-2"><Activity size={18} /> 擁塞控制</div>
              <div className="flex items-center gap-2"><Layers size={18} /> OSI 七層模型</div>
              <div className="flex items-center gap-2">✍️ Joseph Chen</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 bg-white shadow-2xl shadow-slate-200/50 -mt-16 rounded-[4rem] relative z-20">
        
        {/* Intro: The Foundation */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-[2rem] bg-sky-50 text-sky-600 flex items-center justify-center shadow-inner">
              <Network size={28} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">網路的契約：可靠性的保證</h2>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            如果說 IP (Internet Protocol) 是將信件送到地址的快遞員，那麼 <strong className="text-slate-900 italic underline decoration-sky-400 decoration-4 underline-offset-4">TCP (Transmission Control Protocol)</strong> 就是確保對方真的收到信、且信件順序沒亂掉的「掛號機制」。
          </p>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white my-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10"><RefreshCcw size={120} /></div>
            <h4 className="text-2xl font-black mb-6">TCP 的四大核心特點</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">1</div>
                <div>
                  <p className="font-bold text-white mb-1">面向連接 (Connection-Oriented)</p>
                  <p className="text-sm">資料傳輸前，雙方必須先建立一條虛擬的雙向通道。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">2</div>
                <div>
                  <p className="font-bold text-white mb-1">可靠傳輸 (Reliable Delivery)</p>
                  <p className="text-sm">丟包重傳、重複包過濾、損壞包檢測。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">3</div>
                <div>
                  <p className="font-bold text-white mb-1">流量控制 (Flow Control)</p>
                  <p className="text-sm">防止發送者發得太快，導致接收者處理不過來。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">4</div>
                <div>
                  <p className="font-bold text-white mb-1">擁塞控制 (Congestion Control)</p>
                  <p className="text-sm">根據網路塞車情況，動態調整發送速度。</p>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 1: 3-way Handshake */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-100 text-sky-600 rounded-xl"><ArrowDownUp size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">一、三向交握 (3-way Handshake)</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              這是 TCP 建立連線的過程。為什麼非得要「三向」不可？因為這能保證雙方的「發送」與「接收」能力都是正常的。
            </p>
          </div>

          {/* Handshake Visualizer */}
          <div className="my-12 p-12 bg-slate-50 border border-slate-100 rounded-[3rem]">
            <div className="flex flex-col items-center gap-12 max-w-md mx-auto">
              <div className="flex justify-between w-full">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100"><Cpu className="text-sky-600" /></div>
                  <p className="text-[10px] font-black text-slate-400">CLIENT</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100"><Database className="text-indigo-600" /></div>
                  <p className="text-[10px] font-black text-slate-400">SERVER</p>
                </div>
              </div>

              <div className="w-full space-y-6 relative">
                {/* Steps */}
                <div className={`transition-all duration-500 ${handshakeStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-10 translate-x-10'}`}>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-sky-100">
                    <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-black">1</div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-sky-600">SYN (Synchronize)</p>
                      <p className="text-[10px] text-slate-400">"聽得到嗎？我想跟你連線。"</p>
                    </div>
                    <ArrowRight className="text-slate-300" size={16} />
                  </div>
                </div>

                <div className={`transition-all duration-500 ${handshakeStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-10 -translate-x-10'}`}>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-indigo-100 flex-row-reverse text-right">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-black">2</div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-indigo-600">SYN-ACK</p>
                      <p className="text-[10px] text-slate-400">"聽到了！我也想跟你連線。"</p>
                    </div>
                    <ArrowRight className="text-slate-300 rotate-180" size={16} />
                  </div>
                </div>

                <div className={`transition-all duration-500 ${handshakeStep >= 3 ? 'opacity-100 translate-x-0' : 'opacity-10 translate-x-10'}`}>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-sky-100">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">3</div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-emerald-600">ACK (Acknowledge)</p>
                      <p className="text-[10px] text-slate-400">"OK！那我們開始吧。"</p>
                    </div>
                    <CheckCircle2 className="text-emerald-500" size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-amber-50 border border-amber-100 rounded-[2.5rem] mt-10">
            <h5 className="font-black text-amber-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} /> 為什麼不能兩次交握？
            </h5>
            <p className="text-sm text-amber-800 leading-relaxed">
              想像 Client 發送了第一個 SYN 但網路太塞沒及時到，Client 又發了第二個 SYN。過了一陣子 Server 收到了遲到的第一個 SYN 並回覆 ACK。
              如果是兩次交握，Server 此時就會開啟資源等資料。但 Client 可能早就無視第一個 SYN 了。
              <strong className="text-amber-900 font-black">三向交握是為了防止「已失效的連線請求」突然又傳到 Server 造成資源浪費。</strong>
            </p>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 2: 4-way Handshake */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl"><RefreshCcw size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">二、四次揮手 (4-way Handshake)</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              連線容易，分手難。釋放連線需要四個步驟，因為 TCP 是「全雙工」，雙方都必須獨立關閉自己的發送通道。
            </p>
          </div>

          <CodeBlock 
            title="揮手流程指令" 
            language="text" 
            code={`1. Client -> FIN (我要掛電話了)
2. Server -> ACK (我知道了，但我這邊可能還有資料沒傳完)
... Server 傳完最後的資料 ...
3. Server -> FIN (我也準備好掛電話了)
4. Client -> ACK (收到，拜拜！) -> 進入 TIME_WAIT`} 
          />

          <div className="bg-slate-900 rounded-3xl p-8 text-white mt-10">
            <h5 className="font-black mb-4 flex items-center gap-2 text-rose-400">
              <Clock size={20} /> TIME_WAIT：最後的溫柔
            </h5>
            <p className="text-sm text-slate-400 leading-relaxed">
              Client 在送出最後一個 ACK 後，不會立刻消失，而是會等 2MSL (約 4 分鐘)。
              這是為了確保 Server 真的收到了最後那個 ACK。如果沒收到，Server 會重發 FIN，Client 還能補送 ACK。
            </p>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 3: Sliding Window and Flow Control */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Layers size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">三、流量控制：滑動視窗 (Sliding Window)</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              如果發送端是一台超級電腦，接收端是一台舊手機，發送端如果不控制速度，手機的 Buffer 會瞬間爆掉。
              TCP 使用 <strong className="text-emerald-600">Window Size</strong> 來動態告知對方：「我目前還有多少空間可以收資料」。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <h5 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                <ArrowRight size={18} className="text-sky-500" /> 零視窗 (Zero Window)
              </h5>
              <p className="text-sm text-slate-500">當接收端 Buffer 滿了，會回傳 Window=0，這時發送端會停止傳送，並定期詢問「有空位了嗎？」。</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <h5 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                <Search size={18} className="text-sky-500" /> 視窗縮放 (Scaling)
              </h5>
              <p className="text-sm text-slate-500">在高速網路下，傳統 16-bit 的 Window Size 太小，現代 TCP 會使用 Scaling Option 來擴展到 GB 等級。</p>
            </div>
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Section 4: Congestion Control */}
        <SectionWrapper>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Activity size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">四、擁塞控制：網路塞車怎麼辦？</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              流量控制是為了「對手」，擁塞控制則是為了「整個網路環境」。
            </p>
          </div>

          <div className="space-y-8 mt-10">
            {[
              { title: '慢啟動 (Slow Start)', desc: '一開始只傳 1 個包，沒事就加倍 (1->2->4->8)，直到觸發門檻。', icon: <Zap className="text-amber-500" /> },
              { title: '擁塞避免 (Congestion Avoidance)', desc: '達到門檻後，改為線性增加 (+1)，謹慎測試網路極限。', icon: <Activity className="text-blue-500" /> },
              { title: '快重傳 (Fast Retransmit)', desc: '當收到 3 個重複的 ACK，不等計時器到，直接重傳遺失的包。', icon: <RefreshCcw className="text-emerald-500" /> },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 border border-slate-50 rounded-3xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">{item.icon}</div>
                <div>
                  <h5 className="font-black text-slate-900 mb-1">{item.title}</h5>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <Divider className="my-20 opacity-50" />

        {/* Conclusion */}
        <SectionWrapper>
          <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Globe size={180} />
            </div>
            <h3 className="text-3xl font-black mb-8">總結：致敬精妙的底層設計</h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-3xl font-medium">
              TCP/IP 協議族設計於數十年前，卻依然支撐著現代龐大的網際網路。它優雅地平衡了可靠性與效率，處理了無數種複雜的網路狀況。作為軟體工程師，理解這些底層邏輯，能幫你在 Debug 網路逾時、最佳化 API 效能時，擁有更廣闊的視野。
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['TCP', 'IP', 'Network', 'Reliability', 'Handshake', 'CongestionControl', 'CS101'].map(tag => (
                <Chip key={tag} className="bg-sky-500/10 text-sky-400 border border-sky-500/20 font-black">#{tag}</Chip>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Navigation */}
        <div className="mt-24 space-y-12">
          <Divider className="opacity-50" />

          <div className="flex justify-between items-center gap-6">
            <Link 
              href="/blog/network/ep08-security-headers" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                <ChevronRight className="rotate-180" size={14} /> Previous Post
              </div>
              <p className="font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                EP.08 — Security Headers：網頁安全的隱形防線
              </p>
            </Link>

            <Link 
              href="/blog/network/ep10-http3-quic" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all text-right"
            >
              <div className="flex items-center justify-end gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-widest">
                Next Post <ChevronRight size={14} />
              </div>
              <p className="font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                EP.10 — HTTP/3 與 QUIC：網路傳輸的新紀元
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
