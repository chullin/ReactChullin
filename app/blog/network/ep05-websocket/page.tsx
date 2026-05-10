'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Radio,
  Zap,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Wifi,
  Server
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function NetworkEP05() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-800 via-teal-700 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.05</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網路系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              WebSocket 與 SSE：<br />
              <span className="text-teal-200">即時通訊的兩種選擇</span>
            </h1>
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl">
              WebSocket 雙向連線、Server-Sent Events 單向推送 — 聊天室 vs 即時更新，選對工具
            </p>
            <div className="flex items-center gap-6 text-teal-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> WebSocket · SSE · Socket.io · 即時通訊</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening Quote */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-teal-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「你有沒有試過用 setInterval 每秒打一個 API 來模擬即時通知？
                    能動，但就像用水桶一杓一杓地把海水舀空——你永遠在做無用功。
                    99% 的時候伺服器根本沒有新資料，你還是每秒發出一次請求。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    HTTP 的設計是「請求-回應」模式：客戶端主動問，伺服器被動答。
                    但即時應用需要的是「有事才通知」——伺服器主動推送。
                    這篇帶你理解 WebSocket 和 SSE 這兩個為即時通訊設計的協議，
                    以及在實際工程中如何選擇和實作它們。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Section 1: HTTP 的問題 */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
              <RefreshCw size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 1：HTTP 的問題 — 為什麼需要 WebSocket</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            在 WebSocket 出現之前，開發者用「輪詢（Polling）」來實作即時功能。
            這個方案能動，但代價很高。
          </p>

          <Card className="border-0 shadow-md mb-6">
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={18} className="text-red-500" />
                <h3 className="font-bold text-gray-800">用 HTTP Polling 模擬即時更新</h3>
              </div>
              <CodeBlock language="javascript">
{`   // ❌ 每秒輪詢：浪費頻寬，有延遲
setInterval(async () => {
  const messages = await fetch('/api/messages').then(r => r.json());
  setMessages(messages);
}, 1000);

// 問題 1：每次都建立新的 TCP 連線（HTTP 握手 overhead）
// 問題 2：大多數時候伺服器沒有新資料（99% 的請求是無效的）
// 問題 3：延遲：最長可達 1 秒才能收到新訊息
// 問題 4：10 個用戶 × 1 秒 1 次 = 每秒 10 個請求
//         1000 個用戶 = 每秒 1000 個請求（純粹是在轟炸伺服器）   `}
</CodeBlock>
            </CardBody>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-0 shadow-md bg-red-50">
              <CardBody className="p-6">
                <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  HTTP Polling 的問題
                </h4>
                <ul className="text-red-600 text-sm space-y-2">
                  <li>每次請求都要 TCP 三次握手</li>
                  <li>每次請求都要 HTTP Headers（幾百 bytes）</li>
                  <li>大部分回應是「沒有新資料」</li>
                  <li>延遲等於輪詢間隔（至少幾百 ms）</li>
                  <li>伺服器資源被大量浪費</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-green-50">
              <CardBody className="p-6">
                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle size={16} />
                  WebSocket 的優勢
                </h4>
                <ul className="text-green-600 text-sm space-y-2">
                  <li>只需一次握手建立持久連線</li>
                  <li>訊息 overhead 極小（2-10 bytes header）</li>
                  <li>只在有新資料時傳輸</li>
                  <li>延遲幾乎為零（毫秒級）</li>
                  <li>伺服器可主動推送</li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <Card className="border-l-4 border-teal-500 bg-teal-50 shadow-sm">
            <CardBody className="p-6">
              <p className="text-teal-800 font-medium text-lg leading-relaxed">
                HTTP Polling 像是你每秒打電話問「有新消息嗎」，對方說「沒有」，掛掉。
              </p>
              <p className="text-teal-700 mt-2 leading-relaxed">
                WebSocket 像是打了一個不掛斷的電話，有新消息對方直接說。
                你不需要一直問，對方有事就通知你。
              </p>
            </CardBody>
          </Card>

          <p className="text-gray-600 text-sm mt-4 leading-relaxed">
            補充：還有一種折衷方案叫 <strong>Long Polling</strong>——伺服器收到請求後不立即回應，
            等到有新資料或超時才回應。比 Polling 好一點，但依然有連線 overhead 問題。
            現在已被 WebSocket / SSE 取代。
          </p>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 2: WebSocket 協議原理 */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Wifi size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 2：WebSocket 協議原理</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            WebSocket 不是憑空建立的——它建立在 HTTP 之上，先用 HTTP 做「升級握手」，
            然後把連線轉換成持久的雙向通道。這個設計讓 WebSocket 可以穿越大多數的防火牆和代理伺服器（因為一開始看起來像普通 HTTP）。
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">WebSocket 連線建立過程</h3>
            <CodeBlock language="text">
{`   步驟 1：客戶端發送 HTTP 升級請求

GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket            ← 要求升級協議
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==   ← 隨機 Base64 key
Sec-WebSocket-Version: 13

---

步驟 2：伺服器回應 101，確認升級

HTTP/1.1 101 Switching Protocols    ← 101 表示「協議升級成功」
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=  ← 驗證 key

---

步驟 3：連線升級完成

TCP 連線保持開放，不再是 HTTP 請求/回應模式
→ 持久雙向通訊開始
→ 任何一方都可以隨時發送訊息框架（Frame）
→ 直到其中一方發送 Close Frame 才關閉   `}
</CodeBlock>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">WebSocket 的關鍵特性</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-sm bg-slate-50">
                <CardBody className="p-5">
                  <h4 className="font-bold text-teal-700 mb-3">連線特性</h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li><strong>長連線</strong>：建立一次，持續使用，不需要每次握手</li>
                    <li><strong>雙向</strong>：客戶端和伺服器都可以主動發訊息</li>
                    <li><strong>低延遲</strong>：毫秒級，因為沒有 HTTP 握手 overhead</li>
                    <li><strong>有訊息邊界</strong>：不像 TCP stream，每個訊息是獨立的 Frame</li>
                  </ul>
                </CardBody>
              </Card>
              <Card className="border-0 shadow-sm bg-slate-50">
                <CardBody className="p-5">
                  <h4 className="font-bold text-teal-700 mb-3">訊息框架（Frame）</h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li><strong>Text Frame</strong>：UTF-8 文字（JSON 字串）</li>
                    <li><strong>Binary Frame</strong>：二進位資料（圖片、檔案）</li>
                    <li><strong>Ping/Pong Frame</strong>：心跳檢測，確認連線存活</li>
                    <li><strong>Close Frame</strong>：優雅關閉連線，附帶原因碼</li>
                  </ul>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-5 text-sm">
            <p className="text-gray-300 mb-2 font-mono font-bold text-xs">WebSocket URL 格式</p>
            <div className="space-y-2 font-mono">
              <div>
                <span className="text-yellow-300">ws://</span>
                <span className="text-white">example.com/chat</span>
                <span className="text-gray-400 ml-4">← HTTP 環境</span>
              </div>
              <div>
                <span className="text-green-300">wss://</span>
                <span className="text-white">example.com/chat</span>
                <span className="text-gray-400 ml-4">← HTTPS 環境（WebSocket Secure，必須用於生產）</span>
              </div>
            </div>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 3: 瀏覽器 WebSocket API */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 3：瀏覽器 WebSocket API</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            瀏覽器原生支援 WebSocket API，不需要任何額外套件。但直接使用原生 API 在生產環境有一些挑戰，
            例如斷線重連、錯誤處理等，以下先展示如何正確封裝它。
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">WebSocket Manager：封裝重連邏輯</h3>
            <CodeBlock language="typescript">
{`   class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private messageHandlers: ((data: any) => void)[] = [];

  connect(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('WebSocket 連線成功');
      this.reconnectAttempts = 0;  // 重置重連計數
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // 通知所有訊息處理器
        this.messageHandlers.forEach(handler => handler(data));
      } catch {
        console.error('訊息解析失敗', event.data);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket 錯誤', error);
      // onclose 會在 onerror 後自動觸發，在那裡處理重連
    };

    this.ws.onclose = (event) => {
      console.log(\`連線關閉，code: \${event.code}, reason: \${event.reason}\`);

      // 1000 = 正常關閉，不需要重連
      if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
        // 指數退避（Exponential Backoff）：
        // 第 1 次：1 秒後重試
        // 第 2 次：2 秒後重試
        // 第 3 次：4 秒後重試
        // 最長不超過 30 秒
        const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30000);
        console.log(\`\${delay / 1000} 秒後嘗試重連（第 \${this.reconnectAttempts + 1} 次）\`);
        setTimeout(() => this.connect(url), delay);
        this.reconnectAttempts++;
      }
    };
  }

  send(data: object) {
    // 確認連線狀態再發送
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket 尚未連線，無法發送訊息');
    }
  }

  onMessage(handler: (data: any) => void) {
    this.messageHandlers.push(handler);
    // 回傳取消訂閱函式
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  disconnect() {
    // 1000 = 正常關閉，阻止 onclose 觸發重連
    this.ws?.close(1000, '用戶主動關閉');
    this.ws = null;
  }
}

// WebSocket 連線狀態常數
// WebSocket.CONNECTING = 0 → 正在連線
// WebSocket.OPEN = 1       → 已連線，可以收發訊息
// WebSocket.CLOSING = 2    → 正在關閉
// WebSocket.CLOSED = 3     → 已關閉   `}
</CodeBlock>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">React Hook 封裝</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              在 React 中，WebSocket 需要配合 <code className="bg-gray-100 px-1 rounded text-sm">useRef</code> 和 <code className="bg-gray-100 px-1 rounded text-sm">useEffect</code>
              來管理連線生命週期，確保元件卸載時正確關閉連線，避免 memory leak。
            </p>
            <CodeBlock language="typescript">
{`   import { useState, useEffect, useRef, useCallback } from 'react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

function useWebSocket(url: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => setIsConnected(true);

    wsRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data) as Message;
      // 使用 functional update 避免 stale closure 問題
      setMessages(prev => [...prev, msg]);
    };

    wsRef.current.onclose = () => setIsConnected(false);

    // Cleanup：元件卸載時關閉連線（非常重要！）
    // 如果忘記這個，每次元件 remount 都會建立新連線
    return () => {
      wsRef.current?.close(1000, '元件卸載');
    };
  }, [url]);  // url 改變時重新建立連線

  const sendMessage = useCallback((text: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        text,
        timestamp: Date.now(),
      }));
    }
  }, []);

  return { messages, sendMessage, isConnected };
}

// 使用方式
function ChatRoom({ roomId }: { roomId: string }) {
  const { messages, sendMessage, isConnected } = useWebSocket(
    \`wss://api.example.com/chat/\${roomId}\`
  );

  return (
    <div>
      <div className="text-sm text-gray-500">
        {isConnected ? '✅ 已連線' : '🔴 連線中斷'}
      </div>
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <button onClick={() => sendMessage('Hello!')}>發送</button>
    </div>
  );
}   `}
</CodeBlock>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 4: SSE */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center">
              <Radio size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 4：Server-Sent Events（SSE）— 單向推送的輕量選擇</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            SSE 是建立在 HTTP 之上的單向串流協議：伺服器可以持續推送訊息給客戶端，但客戶端不能反向傳訊息。
            聽起來像限制，但很多場景其實只需要這樣——通知、報價、進度更新都是伺服器單向推送的需求。
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="border-0 shadow-sm bg-sky-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-sky-700 mb-3">SSE 的優勢</h4>
                <ul className="text-sky-600 text-sm space-y-2">
                  <li>建立在標準 HTTP 上，無需特殊協議升級</li>
                  <li>原生支援斷線自動重連</li>
                  <li>瀏覽器支援良好，包含舊版</li>
                  <li>通過 HTTP/2 可多工（multiplexing）</li>
                  <li>實作簡單，後端一個 Stream 就夠</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-sm bg-amber-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-amber-700 mb-3">SSE 的限制</h4>
                <ul className="text-amber-600 text-sm space-y-2">
                  <li>只能伺服器 → 客戶端（單向）</li>
                  <li>只能傳文字（不能傳 Binary）</li>
                  <li>每個連線佔用一個 HTTP 連線</li>
                  <li>IE / Edge 舊版不支援（現在基本無影響）</li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">SSE 的使用場景</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {['即時通知', '股票報價', '進度條', 'AI 串流輸出（ChatGPT 效果）', '社群媒體 Feed 更新', '伺服器狀態監控'].map(tag => (
                <span key={tag} className="bg-cyan-100 text-cyan-700 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">後端實作（Next.js App Router API Route）</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              SSE 的關鍵在於 <code className="bg-gray-100 px-1 rounded">Content-Type: text/event-stream</code> 和
              特定的資料格式（<code className="bg-gray-100 px-1 rounded">data: ...\n\n</code>）。
              每個事件以兩個換行符結尾。
            </p>
            <CodeBlock language="typescript">
{`   // app/api/events/route.ts（Next.js App Router）
export async function GET(req: Request) {
  const stream = new ReadableStream({
    start(controller) {
      // 輔助函式：推送一個 SSE 事件
      const send = (data: object, event?: string) => {
        if (event) {
          controller.enqueue(\`event: \${event}\n\`);
        }
        controller.enqueue(\`data: \${JSON.stringify(data)}\n\n\`);
        // 格式：
        //   event: eventName  （可選，客戶端可用 addEventListener 監聽）
        //   data: { ... }     （必須）
        //   id: 123           （可選，斷線重連後告訴伺服器上次收到哪條）
        //                     （兩個 \n\n 表示一個完整事件結束）
      };

      // 範例 1：每秒推送股票價格
      const priceInterval = setInterval(() => {
        send({
          symbol: 'AAPL',
          price: (150 + Math.random() * 10).toFixed(2),
          change: (Math.random() * 2 - 1).toFixed(2),
          time: new Date().toISOString(),
        }, 'price-update');
      }, 1000);

      // 範例 2：推送系統通知
      setTimeout(() => {
        send({
          type: 'notification',
          message: '您的訂單已出貨',
          orderId: 'ORD-12345',
        }, 'notification');
      }, 3000);

      // 客戶端斷線時清理資源（非常重要，否則 interval 會一直跑）
      req.signal.addEventListener('abort', () => {
        clearInterval(priceInterval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',  // 必須
      'Cache-Control': 'no-cache',           // 不能被快取
      'Connection': 'keep-alive',            // 保持連線
      'X-Accel-Buffering': 'no',             // 關閉 Nginx 緩衝（重要！）
    },
  });
}   `}
</CodeBlock>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">前端實作（EventSource API）</h3>
            <CodeBlock language="typescript">
{`   import { useState, useEffect } from 'react';

// 通用的 SSE Hook
function useSSE<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => setIsConnected(true);

    // 監聽預設事件（對應後端沒有設 event 名稱的）
    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data) as T);
    };

    // 監聽自訂事件（對應後端設了 event: price-update 的）
    eventSource.addEventListener('price-update', (event) => {
      setData(JSON.parse(event.data) as T);
    });

    eventSource.addEventListener('notification', (event) => {
      const notification = JSON.parse(event.data);
      alert(\`通知：\${notification.message}\`);
    });

    eventSource.onerror = () => {
      setIsConnected(false);
      setError('連線中斷');
      // EventSource 會自動嘗試重連（預設 3 秒後）
      // 如果不想重連，呼叫 eventSource.close()
    };

    return () => {
      eventSource.close();  // 元件卸載時關閉
    };
  }, [url]);

  return { data, error, isConnected };
}

// 使用範例：即時股票報價
interface StockData {
  symbol: string;
  price: string;
  change: string;
  time: string;
}

function StockTicker() {
  const { data: stock, isConnected } = useSSE<StockData>('/api/events');

  return (
    <div className="p-4">
      <div className="text-xs text-gray-400 mb-2">
        {isConnected ? '● 即時更新中' : '○ 連線中...'}
      </div>
      {stock && (
        <div>
          <span className="text-2xl font-bold">{stock.symbol}</span>
          <span className="text-xl ml-3">\${stock.price}</span>
          <span className={stock.change.startsWith('-') ? 'text-red-500 ml-2' : 'text-green-500 ml-2'}>
            {stock.change}
          </span>
        </div>
      )}
    </div>
  );
}   `}
</CodeBlock>
          </div>

          <Card className="border-l-4 border-cyan-400 bg-cyan-50 shadow-sm">
            <CardBody className="p-5">
              <p className="text-cyan-800 font-semibold mb-2">SSE 的自動重連機制</p>
              <p className="text-cyan-700 text-sm leading-relaxed">
                瀏覽器的 EventSource 原生支援自動重連——斷線後會自動嘗試重新連線。
                伺服器可以用 <code className="bg-cyan-100 px-1 rounded font-mono">retry: 5000</code> 指定重連間隔（毫秒）。
                如果事件有 <code className="bg-cyan-100 px-1 rounded font-mono">id:</code> 欄位，重連時會帶 <code className="bg-cyan-100 px-1 rounded font-mono">Last-Event-ID</code> header，
                讓伺服器知道從哪條事件繼續推送，避免資料遺失。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 5: Socket.io */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Server size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 5：Socket.io — 生產環境的首選</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            直接使用原生 WebSocket API 在生產環境有以下挑戰：需要自己實作重連邏輯、自己管理 heartbeat、
            不同環境（有些代理不支援 WebSocket）行為不一致、沒有 room / namespace 概念、
            規模化需要自己處理跨伺服器的訊息廣播。
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Socket.io 是一個封裝在 WebSocket 上的函式庫，解決了所有這些問題，
            並在 WebSocket 不可用時自動退回 HTTP Long Polling。
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">後端（Node.js + Socket.io）</h3>
            <CodeBlock language="typescript">
{`   // server.ts（獨立 Node.js 伺服器）
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
  // 心跳設定：每 25 秒 ping 一次，10 秒內沒回應就斷線
  pingTimeout: 10000,
  pingInterval: 25000,
});

// Middleware：連線時驗證 JWT
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = await verifyJWT(token);
    socket.data.user = user;  // 把用戶資訊掛到 socket 上
    next();
  } catch {
    next(new Error('認證失敗'));
  }
});

io.on('connection', (socket: Socket) => {
  const user = socket.data.user;
  console.log(\`用戶 \${user.name} 連線，ID: \${socket.id}\`);

  // 加入聊天室（Socket.io 的 Room 概念）
  socket.on('join-room', (roomId: string) => {
    socket.join(roomId);
    // 通知聊天室其他人
    socket.to(roomId).emit('user-joined', {
      userId: user.id,
      userName: user.name,
    });
  });

  // 離開聊天室
  socket.on('leave-room', (roomId: string) => {
    socket.leave(roomId);
    socket.to(roomId).emit('user-left', { userId: user.id });
  });

  // 發送訊息給聊天室所有人
  socket.on('send-message', ({ roomId, message }: { roomId: string; message: string }) => {
    const msg = {
      id: crypto.randomUUID(),
      text: message,
      sender: { id: user.id, name: user.name },
      timestamp: Date.now(),
    };

    // io.to(roomId) 廣播給聊天室所有人（包含自己）
    // socket.to(roomId) 廣播給除自己以外的所有人
    io.to(roomId).emit('new-message', msg);
  });

  // 打字中提示
  socket.on('typing', ({ roomId }: { roomId: string }) => {
    socket.to(roomId).emit('user-typing', { userName: user.name });
  });

  socket.on('disconnect', (reason) => {
    console.log(\`用戶 \${user.name} 斷線，原因：\${reason}\`);
    // reason: 'transport close'（網路問題）/ 'client namespace disconnect'（主動離開）
  });
});

httpServer.listen(4000, () => console.log('Socket.io 伺服器啟動於 port 4000'));   `}
</CodeBlock>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">前端（React + Socket.io-client）</h3>
            <CodeBlock language="tsx">
{`   import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  text: string;
  sender: { id: string; name: string };
  timestamp: number;
}

// 把 Socket 連線抽成 Hook
function useSocketRoom(roomId: string, token: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 建立連線，帶 JWT token
    socketRef.current = io('http://localhost:4000', {
      auth: { token },
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      socket.emit('join-room', roomId);
    });

    socket.on('new-message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('user-joined', ({ userName }: { userName: string }) => {
      setOnlineUsers(prev => [...prev, userName]);
    });

    socket.on('user-left', ({ userId }: { userId: string }) => {
      setOnlineUsers(prev => prev.filter(u => u !== userId));
    });

    socket.on('user-typing', ({ userName }: { userName: string }) => {
      setTypingUser(userName);
      // 3 秒後清除打字提示
      setTimeout(() => setTypingUser(null), 3000);
    });

    return () => {
      socket.emit('leave-room', roomId);
      socket.disconnect();
    };
  }, [roomId, token]);

  const sendMessage = useCallback((text: string) => {
    socketRef.current?.emit('send-message', { roomId, message: text });
  }, [roomId]);

  const notifyTyping = useCallback(() => {
    socketRef.current?.emit('typing', { roomId });
  }, [roomId]);

  return { messages, onlineUsers, typingUser, sendMessage, notifyTyping };
}

// 聊天室元件
function ChatRoom({ roomId, token }: { roomId: string; token: string }) {
  const [input, setInput] = useState('');
  const { messages, typingUser, sendMessage, notifyTyping } = useSocketRoom(roomId, token);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(msg => (
          <div key={msg.id} className="mb-3">
            <span className="text-xs text-gray-500">{msg.sender.name}</span>
            <p className="bg-white rounded-lg p-3 shadow-sm">{msg.text}</p>
          </div>
        ))}
        {typingUser && (
          <p className="text-xs text-gray-400 italic">{typingUser} 正在輸入...</p>
        )}
      </div>
      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={e => { setInput(e.target.value); notifyTyping(); }}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="輸入訊息..."
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button onClick={handleSend} className="bg-teal-600 text-white px-4 py-2 rounded-lg">
          發送
        </button>
      </div>
    </div>
  );
}   `}
</CodeBlock>
          </div>

          <Card className="border-l-4 border-violet-400 bg-violet-50 shadow-sm">
            <CardBody className="p-5">
              <p className="text-violet-800 font-semibold mb-2">Socket.io 解決了哪些原生 WebSocket 的痛點</p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="text-violet-700 space-y-1">
                  <p>✅ 自動重連，有指數退避邏輯</p>
                  <p>✅ 內建 Heartbeat（Ping/Pong）</p>
                  <p>✅ Namespace：同一連線多個頻道</p>
                  <p>✅ Room：分組廣播</p>
                </div>
                <div className="text-violet-700 space-y-1">
                  <p>✅ 降級支援：WebSocket → Long Polling</p>
                  <p>✅ Acknowledgement：確認訊息已收到</p>
                  <p>✅ Redis Adapter：多節點水平擴展</p>
                  <p>✅ 完整的 TypeScript 支援</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Section 6: 選擇指南 */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <CheckCircle size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Section 6：選擇指南</h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            現在你了解了三種方案的特性，以下這份表格幫你在具體需求下快速做出選擇：
          </p>

          <Card className="border-0 shadow-lg mb-8">
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-cyan-700 to-teal-600 text-white">
                      <th className="text-left p-4 font-semibold">需求場景</th>
                      <th className="text-center p-4 font-semibold">建議方案</th>
                      <th className="text-left p-4 font-semibold">原因</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">聊天室、即時訊息</td>
                      <td className="p-4 text-center"><span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs font-bold">Socket.io</span></td>
                      <td className="p-4 text-gray-500 text-xs">雙向通訊，需要 Room 管理，生產環境穩定</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">即時通知（系統推送）</td>
                      <td className="p-4 text-center"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-bold">SSE</span></td>
                      <td className="p-4 text-gray-500 text-xs">單向推送，實作簡單，HTTP 友好</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">股票報價、即時數據流</td>
                      <td className="p-4 text-center"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-bold">SSE</span></td>
                      <td className="p-4 text-gray-500 text-xs">伺服器單向推送，低延遲，簡單易維護</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">多人協作（Google Docs 類）</td>
                      <td className="p-4 text-center"><span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-bold">WebSocket</span></td>
                      <td className="p-4 text-gray-500 text-xs">需要雙向低延遲，操作變換同步</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">進度條、任務狀態更新</td>
                      <td className="p-4 text-center"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-bold">SSE</span></td>
                      <td className="p-4 text-gray-500 text-xs">伺服器推進度，客戶端不需要傳資料</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">遊戲、低延遲互動</td>
                      <td className="p-4 text-center"><span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-bold">WebSocket</span></td>
                      <td className="p-4 text-gray-500 text-xs">毫秒級延遲，雙向高頻訊息</td>
                    </tr>
                    <tr className="hover:bg-slate-50 border-b">
                      <td className="p-4 font-medium text-gray-700">AI 串流輸出（打字效果）</td>
                      <td className="p-4 text-center"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs font-bold">SSE</span></td>
                      <td className="p-4 text-gray-500 text-xs">伺服器逐步推 token，ChatGPT 就是這樣做的</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-medium text-gray-700">需要水平擴展的生產環境</td>
                      <td className="p-4 text-center"><span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded text-xs font-bold">Socket.io + Redis</span></td>
                      <td className="p-4 text-gray-500 text-xs">Redis Adapter 讓多個 Node.js 實例可以廣播</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* 注意事項 */}
          <Card className="border-0 shadow-md border-t-4 border-amber-400">
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-amber-500" />
                <h3 className="font-bold text-gray-800 text-lg">生產環境注意事項</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">連線管理</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>
                      <strong>連線數限制</strong>：每個 WebSocket 連線佔用伺服器 file descriptor 和記憶體。
                      一台普通伺服器能穩定支援約 1 萬個並發連線，超過需要水平擴展。
                    </li>
                    <li>
                      <strong>記憶體估算</strong>：每個 Socket.io 連線約佔 20-30 KB 記憶體。
                      10 萬個連線 ≈ 2-3 GB RAM。
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">架構考量</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>
                      <strong>Load Balancer</strong>：WebSocket 需要設定 sticky session（同一用戶的請求路由到同一節點），
                      或使用 Redis Pub/Sub 讓所有節點共享訊息。
                    </li>
                    <li>
                      <strong>HTTPS 環境</strong>：生產環境必須用 <code className="bg-gray-100 px-1 rounded font-mono">wss://</code>（WebSocket Secure）。
                      純 HTTP 的 <code className="bg-gray-100 px-1 rounded font-mono">ws://</code> 在 HTTPS 頁面會被瀏覽器阻擋（Mixed Content）。
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-100">
                <h4 className="font-semibold text-gray-700 mb-2">水平擴展架構（Socket.io + Redis）</h4>
                <CodeBlock language="typescript">
{`   import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

// 生產環境：用 Redis 讓多個 Node.js 實例可以互相廣播
const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

io.adapter(createAdapter(pubClient, subClient));
// 現在 io.to(roomId).emit() 會廣播到所有節點上的連線   `}
</CodeBlock>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* Tags */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-2 mb-10">
            {['WebSocket', 'Server-Sent Events', 'Socket.io', '即時通訊', 'Network', 'Node.js'].map(tag => (
              <Chip
                key={tag}
                variant="flat"
                className="bg-teal-100 text-teal-700 font-medium"
              >
                {tag}
              </Chip>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link href="/blog/network/ep04-jwt-oauth2">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5 flex items-center gap-3">
                  <ArrowLeft size={18} className="text-teal-500 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">上一篇</p>
                    <p className="text-sm font-bold text-gray-700">EP.04 JWT 與 OAuth2</p>
                  </div>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/network/ep01-http">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5 flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">從頭開始補完</p>
                    <p className="text-sm font-bold text-gray-700">EP.01 HTTP 完全指南</p>
                  </div>
                  <ArrowRight size={18} className="text-teal-500 group-hover:translate-x-1 transition-transform" />
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
