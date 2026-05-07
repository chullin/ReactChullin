'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Zap, Layers, Music, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function AIEP05() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.05</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">AI 離線部署系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              聲碼器演進與端到端 TTS<br />
              <span className="text-indigo-200">從 WaveNet 到 VITS 的設計革命</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl">
              Tacotron2、FastSpeech2、WaveNet、HiFi-GAN、VITS——五大模型的核心設計邏輯，
              以及為什麼 TTS 最終走向端到端（End-to-End）架構。
            </p>
            <div className="flex items-center gap-6 text-indigo-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> Vocoder · FastSpeech2 · HiFi-GAN · VITS</span>
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
                <Quote size={32} className="text-indigo-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「EP.04 我們搞懂了 Transformer 的注意力機制——但 Transformer 只是『翻譯員』，
                    把文字轉成 Mel 頻譜。真正讓聲音從電腦裡發出來的，是聲碼器（Vocoder）。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    這篇會帶你走過五個關鍵模型的演進：從 Tacotron2 的注意力對齊、WaveNet 的逐樣本生成、
                    FastSpeech2 的並行推理突破、HiFi-GAN 的對抗訓練，到 VITS 的端到端統一框架。
                    每個模型的出現，都在解決前一個的痛點。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* 演進時間軸 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-indigo-600" />
            <h2 className="text-3xl font-black text-gray-900">TTS 模型演進總覽</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            TTS 的歷史可以拆成三個世代。每個世代的分水嶺，都是「推理速度」與「音質」的重新平衡。
          </p>

          <div className="relative">
            {/* Timeline */}
            <div className="flex flex-col gap-0">
              {[
                { year: '2016', model: 'WaveNet', label: '第一代：自回歸聲碼器', desc: '音質首次逼近人聲，但速度慘不忍睹（比實時慢 2000×）', color: 'bg-slate-100 border-slate-300', badge: 'bg-slate-200 text-slate-700' },
                { year: '2017', model: 'Tacotron → Tacotron2', label: '第二代：seq2seq + 注意力', desc: '文字直接轉 Mel 頻譜，搭配 WaveNet 聲碼器，端到端訓練', color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700' },
                { year: '2020', model: 'FastSpeech2', label: '第三代：非自回歸並行合成', desc: '並行生成 Mel 頻譜，速度提升 38×，同時加入音高/能量控制', color: 'bg-violet-50 border-violet-200', badge: 'bg-violet-100 text-violet-700' },
                { year: '2020', model: 'HiFi-GAN', label: '第三代：GAN 神經聲碼器', desc: '用對抗訓練取代自回歸，實時生成且音質接近 WaveNet', color: 'bg-indigo-50 border-indigo-200', badge: 'bg-indigo-100 text-indigo-700' },
                { year: '2021', model: 'VITS', label: '第四代：端到端統一', desc: '文字直接輸出波形，不再需要分開訓練聲學模型和聲碼器', color: 'bg-purple-50 border-purple-300', badge: 'bg-purple-200 text-purple-800' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-stretch">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-400 mt-5 shrink-0" />
                    {i < 4 && <div className="w-0.5 flex-1 bg-indigo-200 my-1" />}
                  </div>
                  <div className={`flex-1 border rounded-2xl p-4 mb-3 ${item.color}`}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${item.badge}`}>{item.year}</span>
                      <span className="font-black text-gray-900 text-sm">{item.model}</span>
                      <span className="text-xs text-gray-500 font-bold">{item.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Tacotron2 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Music className="text-blue-600" />
            <h2 className="text-3xl font-black text-gray-900">Tacotron2：seq2seq + 注意力對齊</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Tacotron2（2018，Google）是第一個被廣泛部署的神經 TTS 系統。
            它把「文字→Mel 頻譜」這一步做成一個 Encoder-Decoder 架構，並用注意力機制做對齊。
          </p>

          {/* Architecture diagram */}
          <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
            <p className="font-black text-blue-800 mb-4 text-sm">Tacotron2 架構流程</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {['音素/字元輸入', '→', 'Encoder\n(CBHG)', '→', 'Location-Sensitive\nAttention', '→', 'Decoder\n(自回歸)', '→', 'Mel 頻譜', '→', 'WaveNet\n聲碼器', '→', '波形輸出'].map((item, i) => (
                item === '→' ? (
                  <span key={i} className="text-blue-400 font-black text-lg">→</span>
                ) : (
                  <div key={i} className="bg-white border border-blue-200 rounded-xl px-3 py-2 text-center">
                    <p className="text-xs font-black text-blue-800 whitespace-pre-line leading-tight">{item}</p>
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-green-50">
              <CardBody className="p-5">
                <p className="font-black text-green-800 mb-2">✅ 優點</p>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• 自然度高，注意力對齊穩定</li>
                  <li>• 端到端訓練文字→Mel 頻譜</li>
                  <li>• 不需要人工設計音素規則</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 bg-red-50">
              <CardBody className="p-5">
                <p className="font-black text-red-800 mb-2">❌ 缺點</p>
                <ul className="space-y-1 text-sm text-red-700">
                  <li>• 自回歸解碼：逐幀生成，極慢</li>
                  <li>• 注意力有時對齊失敗（跳字、重複）</li>
                  <li>• 仍需外掛 WaveNet 聲碼器</li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="font-black text-amber-800 mb-2 text-sm">Location-Sensitive Attention 是什麼？</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              普通注意力每一步都從頭掃全部輸入。Location-Sensitive Attention 額外加入「上一步注意力在哪裡」作為卷積特徵，
              讓注意力更傾向往前移動，避免卡住或倒退——這解決了 Tacotron1 常見的對齊崩壞問題。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* WaveNet */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Activity className="text-slate-600" />
            <h2 className="text-3xl font-black text-gray-900">WaveNet：膨脹因果卷積的聲碼器</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            WaveNet（2016，DeepMind）是神經聲碼器的開山之作。它直接在原始波形（raw waveform）上建模，
            而不是先轉成頻率特徵，因此音質極高——但代價是速度極慢。
          </p>

          <div className="space-y-4">
            <p className="font-black text-gray-800">膨脹因果卷積（Dilated Causal Convolution）</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>因果（Causal）</strong>：生成第 t 個樣本時，只能看 t 之前的樣本，不能「偷看未來」。<br />
              <strong>膨脹（Dilated）</strong>：每一層的感受野以指數倍增長，用少量層數覆蓋極長的上下文。
            </p>

            {/* Dilation visual */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 overflow-x-auto">
              <p className="font-black text-slate-700 mb-4 text-sm">膨脹率（Dilation Rate）視覺化</p>
              <div className="space-y-3 min-w-[500px]">
                {[
                  { d: 1, label: '第 1 層  dilation=1', boxes: 16, active: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], connected: [[14,15]], receptive: 2 },
                  { d: 2, label: '第 2 層  dilation=2', boxes: 16, connected: [[12,14]], receptive: 4 },
                  { d: 4, label: '第 3 層  dilation=4', boxes: 16, connected: [[8,12]], receptive: 8 },
                  { d: 8, label: '第 4 層  dilation=8', boxes: 16, connected: [[0,8]], receptive: 16 },
                ].map((row, ri) => (
                  <div key={ri} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 w-40 shrink-0">{row.label}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: row.boxes }).map((_, ci) => {
                        const isLast = ci === row.boxes - 1;
                        const isConnected = row.connected.some(([a]) => ci === a || ci === row.connected[0][1]);
                        return (
                          <div
                            key={ci}
                            className={`w-6 h-6 rounded text-[9px] flex items-center justify-center font-bold border
                              ${isLast ? 'bg-indigo-500 text-white border-indigo-600' :
                                isConnected ? 'bg-indigo-200 text-indigo-800 border-indigo-300' :
                                'bg-white text-slate-400 border-slate-200'}`}
                          >
                            {ci}
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-xs text-slate-400 font-bold shrink-0">感受野={row.receptive}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3">紫色格子 = 當前計算節點，藍色 = 它直接看到的樣本。4 層後感受野已達 16 個樣本。</p>
            </div>
          </div>

          <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
            <p className="font-black text-red-800 mb-2 text-sm">WaveNet 的致命弱點：自回歸生成</p>
            <p className="text-sm text-red-700 leading-relaxed">
              生成 1 秒的音頻需要輸出 <strong>24,000 個樣本</strong>（24kHz）。因為每個樣本依賴前一個，
              無法並行——原始 WaveNet 生成 1 秒音頻需要幾十分鐘。
              這導致它在 2016–2019 年只能在 Google 的伺服器上運行，無法部署到邊緣裝置。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* FastSpeech2 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-violet-600" />
            <h2 className="text-3xl font-black text-gray-900">FastSpeech2：非自回歸的並行突破</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            FastSpeech2（2020，微軟）直接拋棄了自回歸解碼，改用<strong>顯式預測 Duration（時長）</strong>的方式，
            讓所有 Mel 幀可以同時並行生成，速度提升約 38 倍。
          </p>

          {/* FastSpeech2 Architecture */}
          <div className="bg-violet-50 rounded-3xl p-6 border border-violet-100">
            <p className="font-black text-violet-800 mb-4 text-sm">FastSpeech2 核心設計</p>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center text-violet-800 font-black text-sm shrink-0">1</div>
                <div>
                  <p className="font-black text-gray-800 text-sm">Feed-Forward Transformer Encoder</p>
                  <p className="text-xs text-gray-500 mt-0.5">音素序列 → 隱藏表示（每個音素一個向量）</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-violet-300 rounded-full flex items-center justify-center text-violet-900 font-black text-sm shrink-0">2</div>
                <div>
                  <p className="font-black text-gray-800 text-sm">Variance Adaptor（方差適配器）</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    同時預測：<strong>Duration</strong>（每個音素幾幀）、<strong>Pitch F0</strong>（音高曲線）、<strong>Energy</strong>（能量強度）
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-violet-400 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">3</div>
                <div>
                  <p className="font-black text-gray-800 text-sm">Length Regulator（長度調節器）</p>
                  <p className="text-xs text-gray-500 mt-0.5">根據 Duration 把音素向量「複製展開」到 Mel 幀序列長度，無需注意力對齊</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">4</div>
                <div>
                  <p className="font-black text-gray-800 text-sm">Feed-Forward Transformer Decoder</p>
                  <p className="text-xs text-gray-500 mt-0.5">並行輸出所有 Mel 幀 → 接 HiFi-GAN 聲碼器</p>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            title="FastSpeech2 Length Regulator 概念（Pseudo-code）"
            lang="python"
            code={`def length_regulator(phoneme_hidden, durations):
    """
    phoneme_hidden: shape [N, hidden_dim]  # N 個音素
    durations:      shape [N]              # 每個音素對應幾個 Mel frame

    回傳 shape [sum(durations), hidden_dim] — 展開後的序列
    """
    expanded = []
    for i, d in enumerate(durations):
        # 把第 i 個音素的向量重複 d 次
        expanded.append(phoneme_hidden[i].unsqueeze(0).expand(d, -1))
    return torch.cat(expanded, dim=0)  # 全部拼接

# 舉例：音素 ['h', 'e', 'l', 'o'] duration=[2, 3, 4, 2]
# → Mel 幀序列長度 = 2+3+4+2 = 11 幀
# → 全部 11 幀同時並行解碼，不再自回歸！`}
          />

          <div className="grid sm:grid-cols-3 gap-4 text-center">
            {[
              { label: '推理速度', value: '38×', sub: '比 Tacotron2 快', color: 'bg-green-50 text-green-700' },
              { label: '音高控制', value: 'F0 曲線', sub: '可精細調整語調', color: 'bg-blue-50 text-blue-700' },
              { label: '語速控制', value: 'Duration', sub: '直接縮放倍率', color: 'bg-violet-50 text-violet-700' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 ${item.color}`}>
                <p className="text-2xl font-black">{item.value}</p>
                <p className="font-black text-sm mt-1">{item.label}</p>
                <p className="text-xs opacity-70 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* HiFi-GAN */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Activity className="text-indigo-600" />
            <h2 className="text-3xl font-black text-gray-900">HiFi-GAN：高保真神經聲碼器</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            HiFi-GAN（2020，Jungil Kong et al.）用 GAN（生成對抗網路）徹底取代了 WaveNet 的自回歸生成，
            實現了「<strong>實時 + 高音質</strong>」的雙重突破。它是目前部署最廣泛的聲碼器之一。
          </p>

          {/* GAN diagram */}
          <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
            <p className="font-black text-indigo-800 mb-5 text-sm">HiFi-GAN 訓練框架</p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-indigo-600 text-white rounded-2xl p-4">
                  <p className="font-black text-sm mb-1">🎭 Generator</p>
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    輸入 Mel 頻譜 → 輸出原始波形<br />
                    架構：多個 Upsampling 轉置卷積 + 殘差塊（MRF）<br />
                    目標：騙過 Discriminator
                  </p>
                </div>
                <div className="bg-white border border-indigo-200 rounded-2xl p-4">
                  <p className="font-black text-indigo-800 text-sm mb-1">📏 MPD（多週期鑑別器）</p>
                  <p className="text-xs text-indigo-600">
                    把波形以週期 p = {'{'}2,3,5,7,11{'}'} 重排成 2D<br />
                    捕捉不同頻率的週期性結構
                  </p>
                </div>
                <div className="bg-white border border-indigo-200 rounded-2xl p-4">
                  <p className="font-black text-indigo-800 text-sm mb-1">📐 MSD（多尺度鑑別器）</p>
                  <p className="text-xs text-indigo-600">
                    在原始 + 2× + 4× 下採樣波形上分別鑑別<br />
                    捕捉不同時間粒度的特徵
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <div className="bg-white rounded-2xl p-4 border border-indigo-100">
                  <p className="font-black text-gray-800 text-sm mb-2">訓練損失函數</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>GAN Loss</strong>：Generator vs Discriminator 對抗</li>
                    <li>• <strong>Feature Matching Loss</strong>：中間層特徵對齊真實音頻</li>
                    <li>• <strong>Mel-Spectrogram Loss</strong>：直接對比 Mel 頻譜</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                  <p className="font-black text-green-800 text-sm">結果</p>
                  <p className="text-xs text-green-700 mt-1">
                    V1 模型：推理速度是實時的 <strong>13.4×</strong><br />
                    MOS 分數比 WaveNet 高，且速度快 100 倍以上
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-black text-gray-700 border-b-2 border-gray-200">聲碼器</th>
                  <th className="text-left p-3 font-black text-gray-700 border-b-2 border-gray-200">速度</th>
                  <th className="text-left p-3 font-black text-gray-700 border-b-2 border-gray-200">音質</th>
                  <th className="text-left p-3 font-black text-gray-700 border-b-2 border-gray-200">備註</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Griffin-Lim', '⚡ 極快', '⭐⭐ 普通', '無需訓練，音質機械感重'],
                  ['WaveNet', '🐢 極慢', '⭐⭐⭐⭐⭐ 最高', '開創性，但無法實時'],
                  ['Parallel WaveNet', '⚡⚡ 快', '⭐⭐⭐⭐ 高', '知識蒸餾加速，Google 部署版'],
                  ['WaveGlow', '⚡⚡ 快', '⭐⭐⭐⭐ 高', 'Flow-based，NVIDIA 出品'],
                  ['HiFi-GAN', '⚡⚡⚡ 極快', '⭐⭐⭐⭐⭐ 極高', '目前最主流，VITS 內建採用'],
                ].map(([model, speed, quality, note], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="p-3 font-bold text-gray-800 border-b border-gray-100">{model}</td>
                    <td className="p-3 text-gray-600 border-b border-gray-100">{speed}</td>
                    <td className="p-3 text-gray-600 border-b border-gray-100">{quality}</td>
                    <td className="p-3 text-gray-500 text-xs border-b border-gray-100">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* VITS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-purple-600" />
            <h2 className="text-3xl font-black text-gray-900">VITS：端到端的終極方案</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            VITS（Variational Inference with adversarial learning for end-to-end Text-to-Speech，2021，Kakao）
            是目前最被廣泛採用的開源 TTS 架構。它的核心突破是：<strong>文字直接輸出波形，不再需要分開訓練聲學模型和聲碼器</strong>。
          </p>

          <div className="bg-purple-50 rounded-3xl p-6 border border-purple-100">
            <p className="font-black text-purple-800 mb-4 text-sm">VITS 為什麼是「端到端」？</p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-black text-gray-500 uppercase mb-3">傳統 2-stage 管線</p>
                <div className="space-y-2">
                  {['文字/音素', 'Acoustic Model\n(FastSpeech2)', 'Mel 頻譜', 'Vocoder\n(HiFi-GAN)', '波形'].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      {i > 0 && <div className="w-0.5 h-3 bg-gray-300" />}
                      <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 w-full text-center">
                        <p className="text-xs font-bold text-gray-700 whitespace-pre-line leading-tight">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-red-500 mt-2 font-bold">❌ 兩套模型分開訓練，誤差累積</p>
              </div>
              <div>
                <p className="text-xs font-black text-gray-500 uppercase mb-3">VITS 端到端</p>
                <div className="space-y-2">
                  {['文字/音素', 'Prior Encoder\n(Text → latent)', 'MAS 對齊\n(無需手動標注)', 'Flow Decoder\n+ HiFi-GAN Generator', '波形'].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      {i > 0 && <div className="w-0.5 h-3 bg-purple-300" />}
                      <div className="bg-purple-100 border border-purple-200 rounded-xl px-4 py-2 w-full text-center">
                        <p className="text-xs font-bold text-purple-800 whitespace-pre-line leading-tight">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-green-600 mt-2 font-bold">✅ 單一模型，聯合最佳化</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-black text-gray-800">VITS 的三個核心技術</p>
            <div className="space-y-3">
              {[
                {
                  title: '1. 條件變分自編碼器（CVAE）',
                  color: 'bg-blue-50 border-blue-200',
                  titleColor: 'text-blue-800',
                  content: '訓練時：音頻 → Posterior Encoder → 潛在變數 z（VAE 的 reparameterization trick）。推理時：文字 → Prior Encoder → 估計 z 的分布，從中採樣。',
                },
                {
                  title: '2. Normalizing Flow（規範化流）',
                  color: 'bg-violet-50 border-violet-200',
                  titleColor: 'text-violet-800',
                  content: '把複雜的潛在分布轉換成簡單高斯分布（可逆映射）。讓 Prior Encoder 能夠精確估計 Posterior 的分布，縮小 KL Divergence。',
                },
                {
                  title: '3. Monotonic Alignment Search（MAS）',
                  color: 'bg-purple-50 border-purple-200',
                  titleColor: 'text-purple-800',
                  content: '不用人工標注音素時長。用動態規劃自動找出文字與 Mel 幀之間的單調對齊路徑，與模型聯合訓練。這解決了 FastSpeech2 需要外部 MFA 對齊工具的問題。',
                },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                  <p className={`font-black text-sm mb-2 ${item.titleColor}`}>{item.title}</p>
                  <p className="text-sm text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="VITS 損失函數組合（訓練目標）"
            lang="python"
            code={`# VITS 同時最佳化四種損失
total_loss = (
    # 1. 重建損失：Mel 頻譜與真實值的 L1 距離
    mel_loss * 45.0

    # 2. KL Divergence：Prior 與 Posterior 分布對齊
    + kl_loss * 1.0

    # 3. Duration 預測損失
    + duration_loss * 1.0

    # 4. GAN 對抗損失（Generator）
    + generator_adv_loss * 1.0

    # 5. Feature Matching 損失（來自 HiFi-GAN）
    + feat_match_loss * 2.0
)
# 同時訓練 Discriminator (MPD + MSD)
# → 一個模型，五種訊號，端到端聯合最佳化`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 總比較表 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-gray-600" />
            <h2 className="text-3xl font-black text-gray-900">五大模型完整對比</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  {['模型', '年份', '類型', '推理速度', '音質 (MOS)', '訓練難度', '現況'].map(h => (
                    <th key={h} className="text-left p-3 font-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['WaveNet', '2016', '自回歸聲碼器', '🐢 極慢', '4.6/5', '中', '已被取代'],
                  ['Tacotron2', '2018', 'seq2seq 聲學', '🐢 慢', '4.5/5', '中', '教學用'],
                  ['FastSpeech2', '2020', '非自回歸聲學', '⚡⚡ 快', '4.4/5', '中高', '仍廣泛使用'],
                  ['HiFi-GAN', '2020', 'GAN 聲碼器', '⚡⚡⚡ 極快', '4.5/5', '高', '主流聲碼器'],
                  ['VITS', '2021', '端到端', '⚡⚡⚡ 極快', '4.7/5', '高', '⭐ 目前最佳'],
                ].map(([model, year, type, speed, mos, diff, status], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="p-3 font-black text-gray-900 border-b border-gray-100">{model}</td>
                    <td className="p-3 text-gray-500 border-b border-gray-100">{year}</td>
                    <td className="p-3 text-gray-600 border-b border-gray-100">{type}</td>
                    <td className="p-3 text-gray-600 border-b border-gray-100">{speed}</td>
                    <td className="p-3 font-bold text-gray-700 border-b border-gray-100">{mos}</td>
                    <td className="p-3 text-gray-500 border-b border-gray-100">{diff}</td>
                    <td className="p-3 text-gray-600 text-xs border-b border-gray-100">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '🌊', text: 'WaveNet：膨脹因果卷積開創神經聲碼器，音質極高但自回歸生成速度慘不忍睹。' },
                { emoji: '🗣️', text: 'Tacotron2：seq2seq + Location-Sensitive Attention，首個實用的神經 TTS，仍需外掛聲碼器。' },
                { emoji: '⚡', text: 'FastSpeech2：Duration Predictor + Length Regulator，並行生成快 38×，還能控制語速音調。' },
                { emoji: '🎭', text: 'HiFi-GAN：MPD + MSD 多尺度鑑別器，GAN 訓練實現實時高保真聲碼器，目前最主流。' },
                { emoji: '🏆', text: 'VITS：CVAE + Flow + MAS + HiFi-GAN，端到端聯合訓練，音質最高且速度最快，現為業界標準。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-indigo-200 text-sm">
                下一篇：EP.06 將進入<strong className="text-white">嵌入式部署實戰</strong>——
                這麼好的模型，怎麼壓縮到邊緣裝置上跑？Pruning、Quantization、知識蒸餾的取捨是什麼？
              </p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/ai/ep04-transformer-tts" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">EP.04 — TTS 基礎與 Transformer</p>
            <p className="text-sm text-gray-500 mt-1">自注意力機制與編解碼架構</p>
          </Link>
          <Link href="/blog/ai/ep06-tts-edge-deploy" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-indigo-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">EP.06 — 嵌入式落地實戰</p>
            <p className="text-sm text-gray-500 mt-1">模型壓縮、量化與邊緣部署</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['TTS', 'WaveNet', 'FastSpeech2', 'HiFi-GAN', 'VITS', 'Neural Vocoder', 'GAN', 'EP.05'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
