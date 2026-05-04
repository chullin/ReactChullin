'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Cpu, Database, Zap, BrainCircuit } from 'lucide-react';
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

export default function PythonEP08() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.08</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold">Python 系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              PyTorch 入門<br />
              <span className="text-emerald-200 text-3xl md:text-4xl">Tensor 操作、autograd 與訓練迴圈實戰</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl font-medium">
              進入深度學習的世界：掌握 PyTorch 的核心機制，<br />
              從基礎運算到親手搭建第一個神經網路。
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><BrainCircuit size={14} /> PyTorch · AI Engineering</span>
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
                <Quote size={32} className="text-emerald-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「PyTorch 的魅力在於它的 Pythonic。它不像 TensorFlow 那樣有厚重的封裝感，
                  它讓開發者覺得自己是在寫一般的 Python 代碼，只是這些代碼具備了 GPU 加速與自動微分的能力。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Tensor 操作 */}
        <section>
          <SectionHeader icon={Database} title="1. Tensor：PyTorch 的基本粒子" color="text-emerald-600 bg-emerald-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Tensor (張量) 就像是 NumPy 的 ndarray，但它可以在 GPU 上運算，並且支援自動求導。
            </p>
            <CodeBlock
              title="Tensor 基本操作"
              lang="python"
              code={`import torch

# 建立 Tensor
x = torch.tensor([1, 2, 3])
y = torch.ones(2, 3)

# GPU 加速
if torch.cuda.is_available():
    device = torch.device("cuda")
    x = x.to(device)

# 維度變換 (非常常用)
z = y.view(3, 2) # 類似 reshape`}
            />
          </div>
        </section>

        {/* 2. Autograd 自動微分 */}
        <section>
          <SectionHeader icon={Zap} title="2. Autograd：深度學習的引擎" color="text-amber-600 bg-amber-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              PyTorch 最強大的地方在於它的自動微分系統 (autograd)。只要你在建立 Tensor 時設定 <code>requires_grad=True</code>，它就會記錄下所有的運算軌跡。
            </p>
            <CodeBlock
              title="自動微分示例"
              lang="python"
              code={`x = torch.tensor(2.0, requires_grad=True)
y = x ** 2 + 5

y.backward() # 開始反向傳播
print(x.grad) # 輸出 4.0 (即 dy/dx = 2x)`}
            />
            <p className="text-gray-500 text-sm italic">
              💡 核心思維：你只需要定義 Forward (前向傳播)，PyTorch 就會幫你搞定 Backward (反向傳播)。
            </p>
          </div>
        </section>

        {/* 3. Training Loop */}
        <section>
          <SectionHeader icon={BrainCircuit} title="3. 訓練迴圈：讓模型學習" color="text-teal-600 bg-teal-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              一個標準的 PyTorch 訓練流程包含五個步驟：
            </p>
            <div className="space-y-4">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-teal-600 font-black">1.</span>
                  <div>
                    <span className="font-bold text-gray-800">Forward</span>
                    <p className="text-sm">將數據輸入模型，得到預測結果。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal-600 font-black">2.</span>
                  <div>
                    <span className="font-bold text-gray-800">Loss Calculation</span>
                    <p className="text-sm">計算預測結果與真實標籤的差距。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal-600 font-black">3.</span>
                  <div>
                    <span className="font-bold text-gray-800">Zero Grad</span>
                    <p className="text-sm">清除上一次的梯度（<code>optimizer.zero_grad()</code>）。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal-600 font-black">4.</span>
                  <div>
                    <span className="font-bold text-gray-800">Backward</span>
                    <p className="text-sm">計算梯度（<code>loss.backward()</code>）。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal-600 font-black">5.</span>
                  <div>
                    <span className="font-bold text-gray-800">Optimizer Step</span>
                    <p className="text-sm">更新參數（<code>optimizer.step()</code>）。</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-emerald-900">
               AI 工程師的心法
            </h2>
            <div className="space-y-4 text-emerald-800">
              <p>• <strong>理解數據形狀 (Shape)</strong>：90% 的 PyTorch 錯誤都來自 Tensor 形狀不匹配。</p>
              <p>• <strong>模型與數據要在同一個 Device</strong>：不要讓 GPU 上的模型去讀取 CPU 上的數據。</p>
              <p>• <strong>善用官方文檔</strong>：PyTorch 的 API 設計非常直覺，通常猜一個名字就是對的。</p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/python/ep01-opencv-automation" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.01 — OpenCV 自動化</p>
            <p className="text-sm text-gray-500 mt-1">從影像辨識到座標轉換</p>
          </Link>
          <Link href="/blog/python/ep09-tkinter-gui" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.09 — Tkinter GUI 開發</p>
            <p className="text-sm text-gray-500 mt-1">Raspberry Pi 自動化測試應用</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-emerald-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['PyTorch', 'Tensor', 'Deep Learning', 'AI', 'Training Loop', 'EP.08'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
