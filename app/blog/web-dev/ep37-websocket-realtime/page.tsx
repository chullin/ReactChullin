'use client';

import { Card, CardBody, Chip, Divider, Button, Avatar, Badge } from '@heroui/react';
import { 
  Zap, 
  MessageSquare, 
  Users, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  ArrowRight, 
  Server, 
  Globe, 
  Clock, 
  Lock,
  Wifi,
  WifiOff,
  Cpu,
  Share2,
  ChevronRight,
  Code2
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
    className="space-y-8"
  >
    {children}
  </motion.div>
);

export default function WebSocketRealtimePage() {
  const [isOnline, setIsOnline] = useState(true);

  // 模擬即時狀態切換
  useEffect(() => {
    const timer = setInterval(() => setIsOnline(prev => !prev), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-800 text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-tighter">Web Dev EP.37</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter">
              WebSocket：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                打造即時互動的心臟
              </span>
            </h1>
            
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
              不再被動等待回應。學習如何透過全雙工通訊，實現毫秒級的即時聊天、通知系統與多人協作功能。
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-black">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 tracking-widest">
                <Zap size={16} /> LOW LATENCY
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 tracking-widest">
                <Users size={16} /> MULTIPLAYER
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10 tracking-widest">
                <Activity size={16} /> REAL-TIME
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 bg-white shadow-2xl shadow-slate-200/50 -mt-16 rounded-[3rem] relative z-20">
        
        {/* Section 1: The Pain of HTTP Polling */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Clock size={24} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight text-center sm:text-left">
              痛點：為什麼 HTTP 不適合「即時」？
            </h2>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            在傳統的 HTTP 協議中，通訊是「半雙工」且「由客戶端發起」的。如果你要寫一個聊天室，最笨的方法是 <strong className="text-slate-900">Polling (輪詢)</strong>：每隔 1 秒問一次伺服器：「有新訊息嗎？」。
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 space-y-8 my-12">
            <h4 className="text-2xl font-black text-slate-900">輪詢的三大罪狀：</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: '資源浪費', icon: <Cpu className="text-rose-500" />, desc: '99% 的請求都回傳「沒有新資料」，白白消耗伺服器頻寬。' },
                { title: '延遲高', icon: <Clock className="text-amber-500" />, desc: '平均會有 0.5 秒的延遲，對於競技遊戲或交易系統太慢了。' },
                { title: 'Server 負擔大', icon: <Server className="text-indigo-500" />, desc: '每次 HTTP 握手都要帶上完整的 Header，效率極低。' },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="p-3 bg-white w-fit rounded-xl shadow-sm">{item.icon}</div>
                  <h5 className="font-bold text-slate-800">{item.title}</h5>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed">
            這就是 <strong className="text-indigo-600">WebSocket</strong> 出現的原因。它只需要一次握手，就能建立一條「長連接」，伺服器有新資料時可以主動推送到前端。
          </p>
        </SectionWrapper>

        <Divider className="my-20" />

        {/* Section 2: Socket.io - The Standard for Real-time */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Share2 size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">一、Socket.io：不只是 WebSocket</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            雖然瀏覽器原生支援 WebSocket API，但業界大多使用 <strong className="text-slate-900">Socket.io</strong>。
            因為它解決了原生 API 最頭痛的問題：<strong className="text-indigo-600">自動斷線重連</strong> 與 <strong className="text-indigo-600">Fallback 機制</strong>。
          </p>

          <div className="space-y-6">
            <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Terminal size={20} /> 後端實作 (Node.js + Socket.io)
            </h4>
            <CodeBlock 
              title="server.js" 
              language="javascript" 
              code={`const io = require('socket.io')(server, {
  cors: { origin: "https://chullin.tw" }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // 監聽訊息
  socket.on('send_message', (data) => {
    // 廣播給「所有人」
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});`} 
            />
          </div>

          <div className="space-y-6 mt-12">
            <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Code2 size={20} /> 前端實作 (React)
            </h4>
            <CodeBlock 
              title="ChatComponent.tsx" 
              language="tsx" 
              code={`import { io } from "socket.io-client";
const socket = io("https://api.chullin.tw");

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 監聽後端推送
    socket.on("receive_message", (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = (text) => {
    socket.emit("send_message", { text, user: "Joseph" });
  };

  return (
    // ... UI 程式碼
  );
}`} 
            />
          </div>
        </SectionWrapper>

        <Divider className="my-20" />

        {/* Section 3: Advanced Feature - Presence System */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Users size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">二、Presence 系統：誰在線上？</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            這是 Slack 或 Discord 最核心的功能。利用 WebSocket 的連線狀態，我們可以即時顯示使用者是 <strong className="text-emerald-500">線上</strong> 還是 <strong className="text-slate-400">離線</strong>。
          </p>

          <div className="my-10 p-10 bg-slate-50 border border-slate-100 rounded-[3rem] text-center">
            <h4 className="text-xl font-black mb-8">即時狀態預覽</h4>
            <div className="flex justify-center items-center gap-12">
              <div className="relative">
                <Badge 
                  content="" 
                  color={isOnline ? "success" : "default"} 
                  shape="circle" 
                  placement="bottom-right"
                  className="w-5 h-5 border-4 border-white"
                >
                  <Avatar 
                    src="/assets/profile3.png" 
                    className="w-24 h-24 text-large shadow-xl"
                  />
                </Badge>
                <p className="mt-4 font-black text-slate-900">Joseph Chen</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
              
              <div className="flex flex-col gap-2 items-center text-slate-300">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOnline ? 'on' : 'off'}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    {isOnline ? <Wifi size={32} className="text-indigo-400" /> : <WifiOff size={32} className="text-slate-300" />}
                  </motion.div>
                </AnimatePresence>
                <div className="h-0.5 w-16 bg-slate-200" />
                <p className="text-[10px] font-black tracking-widest text-slate-400">WS CHANNEL</p>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="space-y-3">
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-500" 
                      animate={{ width: isOnline ? '100%' : '0%' }}
                    />
                  </div>
                  <div className="w-24 h-2 bg-slate-100 rounded-full" />
                </div>
                <p className="mt-4 text-[10px] font-bold text-slate-400">SERVER STATUS</p>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-bold text-slate-800 mb-4">實作邏輯：</h4>
          <ul className="space-y-4 text-slate-600">
            <li className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0">1</div>
              <p>當 Socket <strong className="text-slate-900">connect</strong> 時，將 User ID 與其 Socket ID 存入 Redis。</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0">2</div>
              <p>廣播給所有追蹤者一個 `user_online` 事件。</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black shrink-0">3</div>
              <p>當 Socket <strong className="text-slate-900">disconnect</strong> 時，從 Redis 移除並廣播 `user_offline`。</p>
            </li>
          </ul>
        </SectionWrapper>

        <Divider className="my-20" />

        {/* Section 4: Rooms and Namespaces */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Layers size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">三、房間管理 (Rooms)：精準推送資料</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            你不會希望「所有人」都收到「某兩個人的私訊」。<strong className="text-slate-900">Rooms</strong> 是 Socket.io 提供的最強大機制，讓你將連線分群。
          </p>

          <CodeBlock 
            title="聊天室房間實作" 
            language="javascript" 
            code={`io.on('connection', (socket) => {
  // 加入特定房間
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(\`User joined room: \${roomId}\`);
  });

  // 只傳送訊息給該房間的人
  socket.on('chat_in_room', (data) => {
    socket.to(data.roomId).emit('new_message', data.message);
  });
});`} 
          />

          <div className="p-8 bg-amber-50 border border-amber-100 rounded-3xl mt-10">
            <h5 className="font-black text-amber-900 mb-3 flex items-center gap-2">
              <Info size={20} /> 為什麼要用 Rooms？
            </h5>
            <p className="text-sm text-amber-800 leading-relaxed mb-4">
              如果不用 Rooms，你必須手動記錄每個 User 在哪個頁面，然後用迴圈篩選 Socket ID。這在用戶量大時非常低效。Rooms 是在記憶體中高效管理的，是大型即時應用的唯一選擇。
            </p>
          </div>
        </SectionWrapper>

        <Divider className="my-20" />

        {/* Section 5: Security and Authentication */}
        <SectionWrapper>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Lock size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">四、WebSocket 的安全性</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            很多人以為 WebSocket 是獨立的，其實它一開始也是透過 HTTP 發起。因此，你必須像保護 API 一樣保護它。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <h5 className="font-black text-slate-900 mb-4 flex items-center gap-2 text-lg">
                <ShieldCheck size={20} className="text-emerald-500" /> 身分驗證 (Middleware)
              </h5>
              <p className="text-sm text-slate-500 leading-relaxed">
                在建立連線前，檢查 JWT Token。不合法的連線直接阻斷，節省伺服器資源。
              </p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <h5 className="font-black text-slate-900 mb-4 flex items-center gap-2 text-lg">
                <AlertCircle size={20} className="text-rose-500" /> 流量控制 (Rate Limit)
              </h5>
              <p className="text-sm text-slate-500 leading-relaxed">
                防止惡意客戶端每秒發送數萬個事件造成伺服器崩潰。
              </p>
            </div>
          </div>

          <CodeBlock 
            title="Socket.io Authentication Middleware" 
            language="javascript" 
            code={`io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (isValid(token)) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});`} 
          />
        </SectionWrapper>

        <Divider className="my-20" />

        {/* Conclusion */}
        <SectionWrapper>
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Zap size={150} />
            </div>
            <h3 className="text-3xl font-black mb-8 relative z-10">總結：即時互動的未來</h3>
            <p className="text-slate-400 leading-relaxed mb-10 relative z-10 max-w-2xl">
              WebSocket 是現代網頁開發的必修課。無論是 AI 聊天機器人的逐字輸出、多人線上遊戲，還是股票交易平台，這項技術都讓網頁不再是死板的文檔，而是有生命、會即時回應的「應用程式」。
            </p>
            
            <div className="flex flex-wrap gap-3 relative z-10">
              {['WebSocket', 'Socket.io', 'Node.js', 'React', 'Real-time', 'Redis', 'Scale'].map(tag => (
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
              href="/blog/web-dev/ep36-graphql" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-[0.2em]">
                <ChevronRight className="rotate-180" size={12} /> Previous Post
              </div>
              <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                EP.36 — GraphQL：重新定義 API 互動
              </p>
            </Link>

            <Link 
              href="/blog/web-dev/ep38-trpc-introduction" 
              className="flex-1 group p-10 bg-slate-50 rounded-[2rem] hover:bg-white border border-transparent hover:border-slate-200 transition-all text-right"
            >
              <div className="flex items-center justify-end gap-2 text-slate-400 font-black text-[10px] mb-3 uppercase tracking-[0.2em]">
                Next Post <ChevronRight size={12} />
              </div>
              <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                EP.38 — tRPC：端對端的型別安全 API
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
