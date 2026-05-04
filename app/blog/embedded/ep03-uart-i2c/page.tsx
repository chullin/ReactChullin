'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Cpu, Database, Zap, Waves, Settings2 } from 'lucide-react';
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

export default function EmbeddedEP03() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 via-orange-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.03</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold font-bold">嵌入式與系統</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              UART & I2C 通訊協定<br />
              <span className="text-orange-400 text-3xl md:text-4xl">硬體溝通原理、Python 實作與面試常考題</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto font-medium">
              硬體與軟體工程師的共同語言：<br />
              掌握 UART 與 I2C 的底層機制與除錯技巧。
            </p>
            <div className="flex items-center justify-center gap-6 text-slate-400 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Waves size={14} /> UART · I2C · Hardware</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-20">
        
        {/* Intro */}
        <section>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-orange-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「即便在雲端與 AI 時代，硬體之間的對話依然靠這些幾十年前發明的協議。
                  如果你不懂 UART 或 I2C，你將無法與感測器、馬達或控制器溝通。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. UART */}
        <section>
          <SectionHeader icon={Zap} title="1. UART：點對點的非同步對話" color="text-orange-600 bg-orange-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              UART (Universal Asynchronous Receiver/Transmitter) 是最簡單的協定。它只需要兩根線：<strong>TX (傳送)</strong> 與 <strong>RX (接收)</strong>。
            </p>
            <div className="bg-slate-50 border rounded-3xl p-6 space-y-4">
              <p className="font-bold text-slate-800">核心特性：</p>
              <ul className="text-sm space-y-2">
                <li>• <strong>非同步</strong>：沒有時鐘線 (Clock)，雙方必須事先約定好 <strong>Baud Rate (鮑率)</strong>。</li>
                <li>• <strong>點對點</strong>：一次只能有兩個設備對話。</li>
                <li>• <strong>距離限制</strong>：通常用於 PCB 板內或短距離連線。</li>
              </ul>
            </div>
            <CodeBlock
              title="Python 讀取 UART (pyserial)"
              lang="python"
              code={`import serial

ser = serial.Serial('/dev/ttyUSB0', 115200, timeout=1)
ser.write(b'Hello Sensor')
data = ser.readline()
print(f"Received: {data}")`}
            />
          </div>
        </section>

        {/* 2. I2C */}
        <section>
          <SectionHeader icon={Settings2} title="2. I2C：主從架構的匯流排" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              I2C (Inter-Integrated Circuit) 使用兩根線：<strong>SDA (數據)</strong> 與 <strong>SCL (時鐘)</strong>。
            </p>
            <div className="bg-slate-50 border rounded-3xl p-6 space-y-4">
              <p className="font-bold text-slate-800">核心特性：</p>
              <ul className="text-sm space-y-2">
                <li>• <strong>同步</strong>：由時鐘線控制速度，比較穩定。</li>
                <li>• <strong>匯流排架構</strong>：可以接多個 Slave 設備，每個設備有唯一的 <strong>Address</strong>。</li>
                <li>• <strong>半雙工</strong>：同一時間只能有一個方向傳輸數據。</li>
              </ul>
            </div>
            <CodeBlock
              title="Python 讀取 I2C (smbus2)"
              lang="python"
              code={`from smbus2 import SMBus

with SMBus(1) as bus:
    # 讀取位址 0x48 的感測器數據
    data = bus.read_byte_data(0x48, 0x00)
    print(f"Temperature: {data}")`}
            />
          </div>
        </section>

        {/* 3. Interview Prep */}
        <section>
          <div className="bg-gradient-to-br from-orange-700 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              🏆 面試常見考題
            </h2>
            <div className="space-y-6 text-orange-50">
              <div>
                <p className="font-black">Q1: UART 為什麼需要約定 Baud Rate？</p>
                <p className="text-sm opacity-90">A: 因為它沒有時鐘線，雙方必須知道一個 Bit 佔用多少時間，才能正確解析信號。</p>
              </div>
              <div>
                <p className="font-black">Q2: I2C 的 Pull-up Resistor 是做什麼用的？</p>
                <p className="text-sm opacity-90">A: I2C 是 Open-drain 架構，需要上拉電阻將信號拉至高電位 (邏輯 1)。</p>
              </div>
              <div>
                <p className="font-black">Q3: UART vs I2C vs SPI 如何選擇？</p>
                <p className="text-sm opacity-90">A: 簡單調試用 UART；接多個低速感測器用 I2C；高速數據傳輸 (如螢幕、SD卡) 用 SPI。</p>
              </div>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/embedded/ep02-shell-script" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.02 — Shell Script 入門</p>
            <p className="text-sm text-gray-500 mt-1">10 個自動化模板</p>
          </Link>
          <Link href="/blog" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">系列結束</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">回到部落格目錄</p>
            <p className="text-sm text-gray-500 mt-1">查看更多文章</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-orange-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['UART', 'I2C', 'Protocol', 'Embedded', 'Python', 'EP.03'].map((tag) => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
