'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Zap, Cpu, Scale, Layers, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function AIEP06() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.06</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">AI 離線部署系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              嵌入式落地實戰<br />
              <span className="text-emerald-200">模型壓縮、量化與邊緣部署</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              VITS 音質再好，也必須壓縮才能跑在智慧穿戴裝置上。
              Pruning、Quantization、Knowledge Distillation——三大壓縮技術的原理與取捨，以及 NPU/DSP 部署的實戰眉角。
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Model Compression · NPU · Edge AI</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* 開場 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-emerald-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「一個 VITS 模型動輒 200MB+，一塊智慧手錶只有 2MB 的 SRAM。
                    這中間的落差，就是模型壓縮要解決的問題。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    EP.05 我們看完了五大 TTS 模型的演進。但即使是目前最佳的 VITS，
                    它的模型大小與記憶體需求，對嵌入式裝置來說仍然遙不可及。
                    這篇是整個 TTS 系列的「工程落地」收尾篇——
                    從壓縮技術、硬體加速，到真實部署遇到的坑。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 為什麼需要壓縮 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Scale className="text-emerald-600" />
            <h2 className="text-3xl font-black text-gray-900">為什麼需要模型壓縮？</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            邊緣裝置（Edge Device）與雲端伺服器的差距，遠比你想像的大。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {['規格', '雲端伺服器 (A100)', '邊緣 SoC (典型)', '智慧手錶 MCU'].map(h => (
                    <th key={h} className="text-left p-3 font-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['記憶體（RAM）', '80 GB HBM', '4–16 GB LPDDR', '256 KB – 2 MB SRAM'],
                  ['算力（TOPS）', '312 TFLOPS FP16', '10–50 TOPS INT8', '0.1–5 TOPS INT8'],
                  ['功耗', '400 W', '5–15 W', '10–100 mW'],
                  ['適合模型大小', '> 10 GB', '100 MB – 2 GB', '< 5 MB'],
                  ['典型裝置', 'AWS / GCP GPU', 'Raspberry Pi, Jetson', 'Apple Watch, 助聽器'],
                ].map(([spec, cloud, edge, mcu], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="p-3 font-bold text-gray-700 border-b border-gray-100">{spec}</td>
                    <td className="p-3 text-gray-600 border-b border-gray-100">{cloud}</td>
                    <td className="p-3 text-gray-600 border-b border-gray-100">{edge}</td>
                    <td className="p-3 text-red-600 font-bold border-b border-gray-100">{mcu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
            <p className="font-black text-emerald-800 mb-2 text-sm">壓縮的目標不只是「縮小」</p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              壓縮有三個維度的目標：<strong>模型大小</strong>（Flash 佔用）、<strong>記憶體峰值</strong>（Runtime RAM）、<strong>推理延遲</strong>（Latency）。
              這三個指標彼此關聯但不等價——一個量化後的模型可能大小縮了 4×，但因為使用非硬體友好的運算，
              延遲反而變差。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Pruning */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-teal-600" />
            <h2 className="text-3xl font-black text-gray-900">剪枝（Pruning）：移除不重要的連接</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            神經網路中有大量權重接近零，對輸出幾乎沒有貢獻。
            剪枝就是找出這些「冗餘權重」並將它們設為零（或直接移除），以降低計算量。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-blue-50">
              <CardBody className="p-6">
                <p className="font-black text-blue-800 mb-3">非結構化剪枝（Unstructured）</p>
                <div className="bg-white rounded-xl p-4 mb-3 font-mono text-xs text-center space-y-1">
                  <div className="flex gap-1 justify-center">
                    {[0.8, 0.0, 0.3, 0.0, 0.7].map((v, i) => (
                      <div key={i} className={`w-10 h-10 rounded flex items-center justify-center font-bold ${v === 0.0 ? 'bg-gray-100 text-gray-300' : 'bg-blue-100 text-blue-700'}`}>
                        {v}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-[10px]">灰色 = 被剪掉的權重</p>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✅ 壓縮率高（可剪 90%+）</li>
                  <li>❌ 產生稀疏矩陣，需要特殊硬體支援才能加速</li>
                  <li>❌ 一般 CPU/GPU 無法直接加速稀疏運算</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 bg-teal-50">
              <CardBody className="p-6">
                <p className="font-black text-teal-800 mb-3">結構化剪枝（Structured）</p>
                <div className="bg-white rounded-xl p-4 mb-3 font-mono text-xs text-center space-y-1">
                  <div className="grid grid-cols-4 gap-1">
                    {[1,1,0,1, 1,1,0,1, 0,0,0,0, 1,1,0,1].map((v, i) => (
                      <div key={i} className={`h-6 rounded flex items-center justify-center font-bold text-[10px] ${v === 0 ? 'bg-gray-100 text-gray-300' : 'bg-teal-100 text-teal-700'}`}>
                        {v === 0 ? '✕' : '●'}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-[10px]">整行/列被移除</p>
                </div>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>✅ 產生密集矩陣，標準 BLAS 即可加速</li>
                  <li>✅ 直接縮小模型維度，真正降低 FLOPs</li>
                  <li>❌ 壓縮率較低，精度損失也較大</li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="font-black text-amber-800 mb-2 text-sm">實務建議：邊緣部署優先選結構化剪枝</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              除非你的目標硬體有稀疏加速單元（如 NVIDIA A100 Ampere 架構），否則非結構化剪枝在邊緣裝置上幾乎無法帶來速度提升。
              結構化剪枝雖然壓縮率較低，但產出的模型可以直接在所有硬體上跑得更快。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Quantization */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-cyan-600" />
            <h2 className="text-3xl font-black text-gray-900">量化（Quantization）：降低數字精度</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            量化是目前邊緣部署最常用、效益最高的技術。原理很直觀：
            把原本用 FP32（32位元浮點數）儲存的權重，降低到 INT8（8位元整數）甚至 INT4。
          </p>

          {/* Quantization visual */}
          <div className="bg-cyan-50 rounded-3xl p-6 border border-cyan-100">
            <p className="font-black text-cyan-800 mb-4 text-sm">量化的效益</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { from: 'FP32', to: 'INT8', ratio: '4×', desc: '模型大小縮小', color: 'bg-cyan-100 text-cyan-700' },
                { from: 'FP32', to: 'INT8', ratio: '2–4×', desc: '推理速度提升', color: 'bg-teal-100 text-teal-700' },
                { from: 'FP32', to: 'INT8', ratio: '75%', desc: '記憶體頻寬節省', color: 'bg-emerald-100 text-emerald-700' },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl p-4 ${item.color}`}>
                  <p className="text-2xl font-black">{item.ratio}</p>
                  <p className="text-xs font-bold mt-1">{item.desc}</p>
                  <p className="text-[10px] mt-0.5 opacity-70">{item.from} → {item.to}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-white rounded-2xl p-4 border border-cyan-100">
              <p className="font-black text-gray-700 text-sm mb-2">量化的數學</p>
              <p className="text-xs text-gray-500 leading-relaxed font-mono">
                INT8 值 = round( FP32 值 / scale ) + zero_point<br />
                FP32 值 ≈ ( INT8 值 - zero_point ) × scale<br /><br />
                <span className="text-gray-400"># scale 和 zero_point 是從校準數據集（calibration dataset）統計出來的</span>
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-slate-50">
              <CardBody className="p-6">
                <p className="font-black text-slate-800 mb-2">訓練後量化（PTQ）</p>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                  模型訓練完畢後再量化。只需要少量校準數據（~100 筆），不用重新訓練。
                  適合快速驗證，但精度損失較大。
                </p>
                <div className="bg-slate-100 rounded-xl p-3 text-xs font-mono text-slate-700">
                  model → calibrate → INT8 model
                </div>
              </CardBody>
            </Card>
            <Card className="border-0 bg-emerald-50">
              <CardBody className="p-6">
                <p className="font-black text-emerald-800 mb-2">量化感知訓練（QAT）</p>
                <p className="text-sm text-emerald-600 mb-3 leading-relaxed">
                  訓練過程中模擬量化誤差（Fake Quantization），讓模型學會在量化環境下準確推理。
                  精度損失極小，但需要重新訓練幾個 epoch。
                </p>
                <div className="bg-emerald-100 rounded-xl p-3 text-xs font-mono text-emerald-700">
                  model → fake quant training → INT8 model
                </div>
              </CardBody>
            </Card>
          </div>

          <CodeBlock
            title="PyTorch PTQ 量化（Static Quantization）"
            lang="python"
            code={`import torch
from torch.quantization import quantize_dynamic, prepare, convert

# 方法一：動態量化（Dynamic Quantization）
# 只量化線性層，activation 在運行時動態量化
model_int8 = quantize_dynamic(
    model,
    qconfig_spec={torch.nn.Linear},
    dtype=torch.qint8
)

# 方法二：靜態量化（Static Quantization）需要校準步驟
model.qconfig = torch.quantization.get_default_qconfig('fbgemm')
model_prepared = prepare(model)

# 跑一批校準數據
with torch.no_grad():
    for data in calibration_loader:
        model_prepared(data)

# 轉換為真正的 INT8 模型
model_int8 = convert(model_prepared)

# 驗證：模型大小縮小 ~4×
print(f"FP32 大小: {get_size_mb(model):.1f} MB")
print(f"INT8 大小: {get_size_mb(model_int8):.1f} MB")`}
          />

          <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
            <div className="flex gap-3">
              <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-red-800 mb-2 text-sm">量化陷阱：不是所有層都適合量化</p>
                <p className="text-sm text-red-700 leading-relaxed">
                  LayerNorm、Softmax、Positional Encoding 等包含除法與指數運算的層，量化後精度損失會很大。
                  實務上通常保留這些層為 FP32，只量化卷積層和線性層（即<strong>混合精度量化</strong>）。
                  TTS 模型更要注意：Vocoder 的後幾層對精度非常敏感，輕率量化會導致明顯的音質下降。
                </p>
              </div>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Knowledge Distillation */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-emerald-700" />
            <h2 className="text-3xl font-black text-gray-900">知識蒸餾（Knowledge Distillation）</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            知識蒸餾的概念很優雅：用一個大模型（Teacher）的輸出來指導一個小模型（Student）訓練，
            讓 Student 學到 Teacher 「在各個類別之間的相對關係」，而不只是學硬標籤（0 或 1）。
          </p>

          {/* Teacher-Student diagram */}
          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
            <p className="font-black text-emerald-800 mb-5 text-sm">Teacher-Student 訓練框架</p>
            <div className="flex flex-col sm:flex-row gap-6 items-start justify-center">
              <div className="flex-1 space-y-2">
                <div className="bg-emerald-600 text-white rounded-2xl p-4 text-center">
                  <p className="font-black text-lg">Teacher Model</p>
                  <p className="text-emerald-200 text-xs mt-1">VITS 完整版（200MB）</p>
                  <p className="text-emerald-200 text-xs">已訓練好，凍結參數</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">輸出 Soft Labels</p>
                  <p className="text-xs text-gray-400 font-mono">[0.7, 0.2, 0.08, 0.02]</p>
                  <p className="text-xs text-gray-400">（softmax with temperature T&gt;1）</p>
                </div>
              </div>

              <div className="flex items-center justify-center sm:mt-8">
                <div className="text-2xl font-black text-gray-300">→</div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="bg-white border-2 border-emerald-300 rounded-2xl p-4 text-center">
                  <p className="font-black text-lg text-emerald-800">Student Model</p>
                  <p className="text-emerald-600 text-xs mt-1">精簡版（20MB）</p>
                  <p className="text-emerald-600 text-xs">學習 Teacher 的分布</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Loss = α × Hard Loss + β × KL(Student ‖ Teacher)</p>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-white rounded-2xl p-4 border border-emerald-100">
              <p className="font-black text-gray-700 text-sm mb-2">為什麼 Soft Labels 比 Hard Labels 好？</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Hard Label：貓 = [1, 0, 0, 0]（告訴你「只有貓對」）<br />
                Soft Label：貓 = [0.70, 0.20, 0.08, 0.02]（告訴你「最像貓，但也有點像狗」）<br /><br />
                Soft Labels 包含 Teacher 學到的「類別間相似度」資訊，
                讓 Student 在同樣的訓練數據量下學到更豐富的知識。
              </p>
            </div>
          </div>

          <CodeBlock
            title="Knowledge Distillation Loss 實作"
            lang="python"
            code={`import torch.nn.functional as F

def distillation_loss(student_logits, teacher_logits, labels, T=4.0, alpha=0.5):
    """
    T: Temperature（溫度）—— 越高，Soft Labels 越平滑，包含更多「暗知識」
    alpha: Hard Loss 的權重，(1-alpha) 給 Soft Loss
    """
    # Hard Loss：Student 輸出 vs 真實標籤
    hard_loss = F.cross_entropy(student_logits, labels)

    # Soft Loss：Student 與 Teacher 的輸出分布 KL 散度
    soft_student = F.log_softmax(student_logits / T, dim=-1)
    soft_teacher = F.softmax(teacher_logits / T, dim=-1)
    soft_loss = F.kl_div(soft_student, soft_teacher, reduction='batchmean') * (T ** 2)

    return alpha * hard_loss + (1 - alpha) * soft_loss`}
          />

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
            <p className="font-black text-blue-800 mb-2 text-sm">TTS 中的蒸餾應用：Parallel WaveNet</p>
            <p className="text-sm text-blue-700 leading-relaxed">
              Google 的 Parallel WaveNet 正是用知識蒸餾解決了 WaveNet 速度問題：
              用慢而準的自回歸 WaveNet 作 Teacher，訓練一個可以並行生成的 IAF（Inverse Autoregressive Flow）Student。
              結果：音質幾乎不變，但速度提升 1000×。這是蒸餾在工業界最知名的成功案例之一。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* NPU/DSP */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="text-teal-700" />
            <h2 className="text-3xl font-black text-gray-900">NPU/DSP 硬體加速</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            壓縮只是第一步，要真正跑得快，還需要讓模型運算落在<strong>正確的硬體單元</strong>上。
            現代 SoC 通常包含多種運算核心，各有擅長的任務。
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🧠',
                name: 'CPU',
                full: 'Central Processing Unit',
                good: '通用控制邏輯，序列運算',
                bad: '矩陣乘法效率差',
                color: 'bg-slate-50 border-slate-200',
                header: 'bg-slate-100',
              },
              {
                icon: '🖥️',
                name: 'DSP',
                full: 'Digital Signal Processor',
                good: '音訊處理、FFT、濾波器，極低功耗',
                bad: '程式設計複雜，不適合大矩陣乘法',
                color: 'bg-teal-50 border-teal-200',
                header: 'bg-teal-100',
              },
              {
                icon: '⚡',
                name: 'NPU',
                full: 'Neural Processing Unit',
                good: 'INT8/INT4 矩陣乘法，TFLite/ONNX Runtime 支援',
                bad: '只支援固定格式，靈活性差',
                color: 'bg-emerald-50 border-emerald-200',
                header: 'bg-emerald-100',
              },
            ].map((item, i) => (
              <Card key={i} className={`border ${item.color}`}>
                <CardBody className="p-0">
                  <div className={`${item.header} p-4 rounded-t-xl`}>
                    <p className="text-2xl mb-1">{item.icon}</p>
                    <p className="font-black text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.full}</p>
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <p className="text-xs font-black text-green-600 mb-1">擅長</p>
                      <p className="text-xs text-gray-600">{item.good}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-red-500 mb-1">不擅長</p>
                      <p className="text-xs text-gray-600">{item.bad}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="bg-teal-50 rounded-2xl p-5 border border-teal-100">
            <p className="font-black text-teal-800 mb-3 text-sm">TTS 管線的硬體分工策略</p>
            <div className="space-y-2">
              {[
                { stage: '文字前處理（Text Normalization）', hw: 'CPU', reason: '規則型邏輯，不需要矩陣運算' },
                { stage: '聲學模型（FastSpeech2 / VITS Prior）', hw: 'NPU', reason: 'INT8 矩陣乘法，NPU 最高效' },
                { stage: '聲碼器（HiFi-GAN Generator）', hw: 'NPU / DSP', reason: '卷積運算密集，NPU 優先；若 NPU 不支援則 DSP' },
                { stage: '音訊後處理（EQ、降噪）', hw: 'DSP', reason: 'DSP 原生支援 FIR/IIR 濾波' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-teal-100">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 mt-0.5 ${
                    item.hw === 'CPU' ? 'bg-slate-200 text-slate-700' :
                    item.hw === 'NPU' ? 'bg-emerald-200 text-emerald-800' :
                    item.hw === 'NPU / DSP' ? 'bg-teal-200 text-teal-800' :
                    'bg-teal-100 text-teal-700'
                  }`}>{item.hw}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{item.stage}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="TFLite 模型轉換與 NPU 部署（Android 示例）"
            lang="python"
            code={`import tensorflow as tf

# 1. 將 PyTorch/ONNX 模型轉為 TFLite + INT8
converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.int8]

# 2. 提供校準數據集（必須是真實數據，~100 筆即可）
def calibration_data_gen():
    for sample in calibration_dataset:
        yield [sample]

converter.representative_dataset = calibration_data_gen
tflite_model = converter.convert()

# 3. 儲存模型
with open('tts_model_int8.tflite', 'wb') as f:
    f.write(tflite_model)

# --- Android 端使用 NNAPI（自動路由到 NPU）---
# val options = Interpreter.Options().apply {
#     addDelegate(NnApiDelegate())  // 自動選擇 NPU/DSP/GPU
# }
# val interpreter = Interpreter(loadModel("tts_model_int8.tflite"), options)`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 常見坑 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-600" />
            <h2 className="text-3xl font-black text-gray-900">實戰踩坑：邊緣部署常見問題</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'OOM（Out of Memory）：模型過大無法載入',
                color: 'bg-red-50 border-red-200',
                titleColor: 'text-red-800',
                icon: '💾',
                solution: [
                  '使用 mmap（記憶體映射）載入模型，避免一次性全部載入 RAM',
                  '拆分模型成多個子圖（Graph Partition），分段推理',
                  '對 Embedding Table 單獨量化（往往是最大的張量）',
                ],
              },
              {
                title: '延遲過高：模型跑了但太慢',
                color: 'bg-amber-50 border-amber-200',
                titleColor: 'text-amber-800',
                icon: '⏱️',
                solution: [
                  '使用 TFLite Profiler 或 ONNX Runtime profiling 找出瓶頸層',
                  '檢查是否有 CPU Fallback（NPU 不支援的算子自動退回 CPU，速度大跌）',
                  'Reshape / Transpose 操作往往是隱藏殺手，嘗試調整模型佈局（NHWC vs NCHW）',
                ],
              },
              {
                title: '音質下降：量化後聲音失真或有雜音',
                color: 'bg-violet-50 border-violet-200',
                titleColor: 'text-violet-800',
                icon: '🔊',
                solution: [
                  '對 Vocoder 最後幾層保留 FP16/FP32（混合精度量化）',
                  '增加校準數據集的多樣性（不同說話者、語速、情緒）',
                  '嘗試 QAT 而非 PTQ，讓模型學會補償量化誤差',
                ],
              },
              {
                title: '推理結果不一致：PC 測試好但裝置上有問題',
                color: 'bg-blue-50 border-blue-200',
                titleColor: 'text-blue-800',
                icon: '🐛',
                solution: [
                  '確認 FP32 與 INT8 的數值範圍：edge case 的輸入（極短句、特殊字元）可能導致整數溢位',
                  '確認輸入前處理（normalize、padding）與訓練時完全一致',
                  '注意端序（Endianness）與資料對齊問題（某些 DSP 要求 8-byte aligned）',
                ],
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <p className={`font-black mb-3 flex items-center gap-2 ${item.titleColor}`}>
                  <span>{item.icon}</span> {item.title}
                </p>
                <ul className="space-y-1">
                  {item.solution.map((s, si) => (
                    <li key={si} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 效能取捨 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Scale className="text-gray-600" />
            <h2 className="text-3xl font-black text-gray-900">效能三角：品質、速度、功耗的取捨</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            邊緣 AI 部署沒有完美解，只有最適合<strong>你的應用場景</strong>的折衷方案。
          </p>

          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
            {/* Triangle visualization */}
            <div className="flex justify-center mb-6">
              <div className="relative w-64 h-52">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full font-black text-sm">音質</div>
                <div className="absolute bottom-0 left-0 bg-blue-500 text-white px-4 py-2 rounded-full font-black text-sm">速度</div>
                <div className="absolute bottom-0 right-0 bg-amber-500 text-white px-4 py-2 rounded-full font-black text-sm">功耗</div>
                {/* Triangle lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 208">
                  <polygon points="128,20 20,188 236,188" fill="none" stroke="#d1d5db" strokeWidth="2" strokeDasharray="6,4" />
                </svg>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mb-4">三個頂點只能同時做好兩個</p>
            <div className="space-y-3">
              {[
                { scenario: '智慧音箱（接電源）', priority: '音質 + 速度', sacrifice: '功耗（不重要）', approach: 'FP16 量化 + NPU，不需要激進壓縮' },
                { scenario: '智慧手錶（電池）', priority: '功耗 + 速度', sacrifice: '音質（可接受降級）', approach: 'INT4 量化 + 剪枝 50% + 較小的聲碼器' },
                { scenario: '助聽器（極小電池）', priority: '功耗', sacrifice: '音質 + 速度', approach: '高度剪枝 + DSP 固定點運算 + 降採樣（16kHz→8kHz）' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col sm:flex-row gap-3">
                  <div className="sm:w-36 shrink-0">
                    <p className="font-black text-gray-800 text-sm">{item.scenario}</p>
                  </div>
                  <div className="flex-1 grid sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="font-bold text-green-600">優先</p>
                      <p className="text-gray-600">{item.priority}</p>
                    </div>
                    <div>
                      <p className="font-bold text-red-500">犧牲</p>
                      <p className="text-gray-600">{item.sacrifice}</p>
                    </div>
                    <div>
                      <p className="font-bold text-blue-600">策略</p>
                      <p className="text-gray-600">{item.approach}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 未來展望 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900">未來趨勢</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: '神經架構搜索（NAS）', desc: '自動設計最適合目標硬體的模型架構，取代人工設計壓縮策略', icon: '🔍' },
              { title: '硬體感知量化（HAQ）', desc: '根據不同層的敏感度與硬體支援，自動決定每層的量化位元數', icon: '🎯' },
              { title: 'On-device 微調', desc: '在裝置上用極少數語音樣本快速個人化 TTS 音色，無需雲端', icon: '🎙️' },
              { title: '統一框架（ONNX Runtime Mobile）', desc: '一次導出，跨 iOS/Android/MCU 自動適配最佳後端', icon: '📱' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="font-black text-gray-800 text-sm mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '✂️', text: '剪枝（Pruning）：移除冗餘權重。邊緣部署優先選結構化剪枝，因為非結構化剪枝需要特殊硬體才能加速。' },
                { emoji: '🔢', text: '量化（Quantization）：FP32 → INT8 縮小 4× 且加速 2–4×。PTQ 快速驗證，QAT 保精度；敏感層保留 FP32。' },
                { emoji: '🎓', text: '知識蒸餾（KD）：Teacher 的 Soft Labels 包含「暗知識」，讓 Student 在同等數據下學得更好。' },
                { emoji: '⚡', text: 'NPU/DSP 分工：聲學模型跑 NPU（INT8 矩陣乘法），音訊後處理跑 DSP（原生 FIR/IIR），別讓 CPU 做它不擅長的事。' },
                { emoji: '⚖️', text: '效能三角：品質、速度、功耗只能同時優化兩個。壓縮策略必須根據應用場景（手錶 vs 音箱 vs 助聽器）做出明確取捨。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-emerald-200 text-sm">
                至此，AI 離線 TTS 系列的技術核心已全部涵蓋：<br />
                EP.03 Dify 工作流 → EP.04 Transformer 基礎 → EP.05 TTS 模型演進 → EP.06 嵌入式落地。<br />
                EP.08 將把視野拉大，從 TTS 的 Encoder-Decoder 出發，延伸到 BERT、GPT、LLM 的整個語言模型演進史。
              </p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/ai/ep05-tts-models" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.05 — 聲碼器演進</p>
            <p className="text-sm text-gray-500 mt-1">WaveNet、HiFi-GAN、VITS 五大模型</p>
          </Link>
          <Link href="/blog/ai/ep08-transformer-to-gpt" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.08 — 從 Transformer 到 ChatGPT</p>
            <p className="text-sm text-gray-500 mt-1">BERT、GPT、LLM 的演進史</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Model Compression', 'Pruning', 'Quantization', 'Knowledge Distillation', 'NPU', 'Edge AI', 'TFLite', 'EP.06'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
