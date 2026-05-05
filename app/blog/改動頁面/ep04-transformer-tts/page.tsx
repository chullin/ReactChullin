'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, Clock, Eye, Quote, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? 'code'}</span>
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
  </div>
);

const qaList = [
  {
    q: 'Transformer 相較 RNN 的優勢是什麼？',
    a: '兩個核心優勢：① 並行計算——RNN 必須一步步順序處理序列，無法並行；Transformer 的 Self-Attention 可以同時計算序列中所有位置的關係，訓練速度大幅提升。② 長距依賴——RNN 在序列很長時容易「遺忘」早期資訊（梯度消失問題）；Self-Attention 讓任意兩個位置的距離都是 O(1)，長距依賴建模更直接。',
  },
  {
    q: 'Self-Attention 的計算複雜度是多少？',
    a: 'O(n²d)，其中 n 是序列長度，d 是 embedding 維度。每個位置需要和其他所有 n 個位置計算 attention score，所以複雜度是 n² 級別。這是 Transformer 的主要瓶頸：序列長度一倍，計算量四倍。這也是為什麼後續出現了 Linear Attention、Sparse Attention 等變體，試圖把複雜度降到 O(n log n) 甚至 O(n)。',
  },
  {
    q: '什麼是 Non-autoregressive TTS？優勢是？',
    a: '傳統自回歸（Autoregressive）TTS 如 Tacotron2，每次只生成一個 frame 的 Mel Spectrogram，需要用前一個 frame 的輸出來預測下一個，無法並行。Non-autoregressive 如 FastSpeech2，一次把整個序列的 Mel Spectrogram 都生成出來，速度提升可達 10x 以上。代價是需要額外的 Duration Predictor 來決定每個音素對應幾個 frame，以及 Teacher Forcing 訓練策略。',
  },
  {
    q: '如何評估 TTS 系統的品質？',
    a: '主觀評估用 MOS（Mean Opinion Score）：讓真人聽多段音訊並評分（1–5 分），取平均，是最接近使用者體驗的指標，但費時費力。客觀評估用 MCD（Mel Cepstral Distortion）：計算生成 Mel Spectrogram 和參考音訊之間的距離，數值越低越好，可自動化計算。實務上通常兩者並用：客觀指標用於快速迭代，MOS 用於最終發布前的人工驗證。',
  },
  {
    q: '嵌入式部署 TTS 時主要的挑戰是什麼？',
    a: '三個核心挑戰：① 模型大小——聲學模型 + 聲碼器合計可能超過 100MB，嵌入式儲存有限；② 推論速度——即時 TTS 要求每句話在 200ms 內開始出聲，CPU-only 環境達到這個目標非常難；③ 記憶體——FP32 模型推論時的 activation memory 可能超過設備 RAM。常見解法：量化到 INT8（模型縮小 4x，但音質有損）、ONNX 匯出（消除 PyTorch overhead）、分離聲碼器（只把聲學模型跑在設備上，聲碼器跑在伺服器）。',
  },
];

const inferenceCode = `import torch
model = FastSpeech2().to('cpu')
model.load_state_dict(torch.load('model.pth', map_location='cpu'))
model.eval()

with torch.no_grad():
    text_input = preprocess("Hello world")
    mel_output = model(text_input)
    audio = vocoder(mel_output)`;

export default function AiEP04Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 60% 35%, rgba(99,102,241,0.5) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(6,182,212,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-indigo-500/20 text-indigo-200 border-indigo-400/30 font-bold uppercase text-[10px]">
                AI 離線部署
              </Chip>
              <Chip size="sm" variant="flat" className="bg-cyan-500/20 text-indigo-200 border-cyan-400/30 font-bold uppercase text-[10px]">
                EP.04
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Transformer & TTS<br />
              <span className="text-indigo-200">語音合成架構原理</span>
            </h1>
            <p className="text-indigo-200 text-lg font-medium max-w-2xl mx-auto">
              Encoder-Decoder、Self-Attention、從論文到嵌入式推論<br />
              碩士論文主題精華整理
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-full">
              <User size={18} />
            </div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2026</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>16 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /> <span>論文精華</span></div>
          </div>
        </div>

        {/* Opening Quote */}
        <section>
          <Card className="border-l-4 border-l-indigo-500 bg-indigo-50 shadow-none rounded-2xl">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <Quote size={28} className="text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed text-lg italic font-medium">
                  我的碩士論文研究 Transformer-based TTS，那時候每天都在看 attention map，
                  試圖理解為什麼模型能把文字的韻律資訊捕捉得如此精準。
                  現在回頭看，這段研究讓我對深度學習架構有了截然不同的理解。
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider className="opacity-30" />

        {/* Section 1: TTS Pipeline */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">TTS 是什麼</h2>
          <p className="text-gray-700 leading-relaxed">
            TTS（Text-to-Speech）是把文字轉換為語音波形的技術。現代 TTS 系統通常分為兩個獨立模型：
            <strong>聲學模型</strong>（文字 → Mel Spectrogram）和<strong>聲碼器</strong>（Mel Spectrogram → 音訊波形）。
          </p>

          {/* Pipeline flow */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 space-y-4">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">TTS 完整 Pipeline</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {[
                { label: '文字', sub: 'Text' },
                { label: '前處理 / G2P', sub: 'Grapheme-to-Phoneme' },
                { label: '聲學模型', sub: 'Acoustic Model' },
                { label: 'Mel Spectrogram', sub: '頻譜圖' },
                { label: '聲碼器', sub: 'Vocoder' },
                { label: '音訊波形', sub: 'Waveform' },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="bg-white border border-indigo-200 shadow-sm rounded-xl px-4 py-2.5 text-center">
                    <p className="text-sm font-black text-gray-800 whitespace-nowrap">{step.label}</p>
                    <p className="text-[10px] text-indigo-500 font-mono whitespace-nowrap">{step.sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-indigo-400 font-bold text-lg">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
              <p className="font-black text-gray-800">傳統方法</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  '拼接式合成（Concatenative）：把錄製音節拼接',
                  '參數式合成（Parametric）：統計模型預測聲學特徵',
                  '問題：音質受限、缺乏韻律自然感',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2"><span className="text-gray-400 shrink-0">•</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 space-y-2">
              <p className="font-black text-indigo-800">深度學習方法</p>
              <ul className="space-y-1.5 text-sm text-indigo-900">
                {[
                  '端對端學習（End-to-End）：直接從文字學語音',
                  'Transformer 捕捉長距韻律依賴',
                  '音質接近人聲，韻律更自然',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2"><span className="text-indigo-400 shrink-0">•</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 2: Transformer */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Transformer 架構核心</h2>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-2">
            <p className="font-black text-amber-800">為什麼 Transformer 取代 RNN？</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              {[
                { label: 'RNN 的問題', points: ['必須逐步處理序列，無法並行', '序列過長時梯度消失，遺忘早期資訊', '訓練慢，GPU 利用率低'], bad: true },
                { label: 'Transformer 的解法', points: ['Self-Attention 同時計算所有位置關係', '任意兩位置距離 O(1)，長距依賴直接建模', '高度可並行，充分利用 GPU'], bad: false },
              ].map((col) => (
                <div key={col.label}>
                  <p className={`text-sm font-black mb-2 ${col.bad ? 'text-red-600' : 'text-green-600'}`}>{col.label}</p>
                  <ul className="space-y-1">
                    {col.points.map((p) => (
                      <li key={p} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className={`shrink-0 font-bold ${col.bad ? 'text-red-400' : 'text-green-400'}`}>{col.bad ? '✗' : '✓'}</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Self-Attention visualization */}
          <div className="space-y-3">
            <h3 className="text-xl font-black text-gray-800">Self-Attention 直覺解釋</h3>
            <p className="text-gray-700 leading-relaxed">
              Self-Attention 讓序列中的每個詞都去問：「我和其他每個詞的相關性有多高？」
              這個「相關性」就是 attention score，再用它對 Value 向量做加權平均，得到這個詞的新表示。
            </p>

            {/* Visual example */}
            <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
              <p className="text-gray-400 text-xs font-mono">// 範例："The cat sat on the mat"</p>
              <p className="text-gray-400 text-xs font-mono">// "cat" 對 "sat" 的 attention score 高（主詞→動詞關係）</p>
              <div className="flex flex-wrap gap-3 mt-4">
                {['The', 'cat', 'sat', 'on', 'the', 'mat'].map((word) => (
                  <div key={word + Math.random()} className={`rounded-xl px-4 py-2.5 text-sm font-mono font-bold border-2 ${
                    word === 'cat' ? 'bg-indigo-600 text-white border-indigo-400' :
                    word === 'sat' ? 'bg-cyan-600 text-white border-cyan-400' :
                    'bg-gray-800 text-gray-300 border-gray-700'
                  }`}>
                    {word}
                    {word === 'cat' && <span className="block text-[9px] text-indigo-300 mt-0.5 font-normal">Query</span>}
                    {word === 'sat' && <span className="block text-[9px] text-cyan-300 mt-0.5 font-normal">high score</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-2">
              {[
                { label: 'Query (Q)', desc: '當前詞在「問」什麼：我在找哪種相關的詞？', color: 'bg-indigo-50 border-indigo-100 text-indigo-800' },
                { label: 'Key (K)', desc: '每個詞「宣傳」自己的特徵：我是什麼樣的詞？', color: 'bg-cyan-50 border-cyan-100 text-cyan-800' },
                { label: 'Value (V)', desc: '實際攜帶的語意資訊，attention score 高就多取這個詞的 Value。', color: 'bg-blue-50 border-blue-100 text-blue-800' },
              ].map((item) => (
                <div key={item.label} className={`border rounded-xl p-4 ${item.color}`}>
                  <p className="font-black text-sm mb-1">{item.label}</p>
                  <p className="text-xs leading-relaxed opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="font-black text-gray-800 text-sm mb-1">Multi-Head Attention</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                與其只跑一個 Attention，不如並行跑多個（例如 8 個 head），每個 head 學到序列中不同類型的關係
                （句法結構、語意相似性、指代關係等），最後把所有 head 的結果 concat 起來，表達能力更豐富。
              </p>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 3: FastSpeech2 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Transformer-based TTS：FastSpeech2</h2>
          <p className="text-gray-700 leading-relaxed">
            FastSpeech2 是微軟研究院在 2021 年提出的非自回歸 TTS 架構，
            解決了前代 Tacotron2 推論速度慢、需要逐幀生成的瓶頸。
            它是我碩士論文的核心研究對象之一。
          </p>

          {/* Architecture diagram */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 space-y-4">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">FastSpeech2 架構</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {[
                { label: 'Text', color: 'bg-white border-gray-200' },
                { label: 'Encoder', color: 'bg-indigo-100 border-indigo-300' },
                { label: 'Duration Predictor', color: 'bg-amber-100 border-amber-300' },
                { label: 'Length Regulator', color: 'bg-orange-100 border-orange-300' },
                { label: 'Decoder', color: 'bg-indigo-100 border-indigo-300' },
                { label: 'Mel Spectrogram', color: 'bg-white border-gray-200' },
              ].map((node, i, arr) => (
                <div key={node.label} className="flex items-center gap-2">
                  <div className={`border-2 rounded-xl px-3 py-2 text-center ${node.color}`}>
                    <p className="text-xs font-black text-gray-800 whitespace-nowrap">{node.label}</p>
                  </div>
                  {i < arr.length - 1 && <span className="text-indigo-400 font-bold">→</span>}
                </div>
              ))}
            </div>
            <p className="text-xs text-indigo-600 text-center">
              Pitch Predictor 和 Energy Predictor 並行接在 Encoder 後，提供韻律控制
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-2">
            <p className="font-black text-amber-800">Duration Predictor 是什麼？</p>
            <p className="text-sm text-amber-900 leading-relaxed">
              每個音素（Phoneme）在語音中佔據不同時間長度，例如「A」可能對應 8 個 Mel frame，「T」可能只有 3 個。
              Duration Predictor 預測每個音素要「拉長」成幾個 frame，Length Regulator 再據此複製對應次數，
              使 Encoder 輸出的音素序列長度對齊 Mel Spectrogram 的時間步長——這是韻律節奏控制的核心機制。
            </p>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-4 font-black text-gray-700 rounded-tl-xl">特性</th>
                  <th className="p-4 font-black text-gray-700">Tacotron2</th>
                  <th className="p-4 font-black text-gray-700 rounded-tr-xl">FastSpeech2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['推論方式', '自回歸（逐幀生成）', '非自回歸（一次生成全部）'],
                  ['推論速度', '慢（速度與序列長度成正比）', '快（約 10x 加速）'],
                  ['韻律控制', '隱式（Attention 自動學習）', '顯式（Pitch / Energy / Duration Predictor）'],
                  ['訓練複雜度', '較簡單（不需 Duration Aligner）', '需要 Duration Aligner（MFA 對齊工具）'],
                  ['音質穩定性', '偶有 skipping / repeating 現象', '穩定，無自回歸累積誤差'],
                ].map(([feature, tacotron, fastspeech]) => (
                  <tr key={feature} className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-700">{feature}</td>
                    <td className="p-4 text-gray-600">{tacotron}</td>
                    <td className="p-4 text-indigo-700 font-medium">{fastspeech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 4: Vocoder */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">聲碼器（Vocoder）</h2>
          <p className="text-gray-700 leading-relaxed">
            聲學模型輸出的是 Mel Spectrogram——一種壓縮過的頻譜表示，人耳無法直接聆聽。
            聲碼器負責把它還原成 24kHz 或 44.1kHz 的音訊波形。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'WaveNet',
                badge: '自回歸',
                badgeColor: 'bg-red-100 text-red-700',
                color: 'bg-gray-50 border-gray-200',
                points: [
                  'Google 2016 年提出，里程碑式成果',
                  '音質極高，接近人聲',
                  '逐樣本自回歸生成，24kHz 音訊需要 24000 次推論/秒',
                  '實時因子（RTF）遠大於 1，無法即時推論',
                ],
              },
              {
                title: 'HiFi-GAN',
                badge: 'GAN-based',
                badgeColor: 'bg-green-100 text-green-700',
                color: 'bg-green-50 border-green-100',
                points: [
                  'Jungil Kong 等人 2020 年提出',
                  'GAN 架構：Generator 生成波形，Discriminator 判別真偽',
                  'RTF < 0.1，比實時快 10 倍以上',
                  '音質比 WaveNet 稍低，但工程實用性高得多',
                ],
              },
            ].map((item) => (
              <div key={item.title} className={`border rounded-2xl p-5 ${item.color} space-y-3`}>
                <div className="flex items-center gap-2">
                  <p className="font-black text-gray-900 text-lg">{item.title}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                </div>
                <ul className="space-y-1.5">
                  {item.points.map((p) => (
                    <li key={p} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-gray-400 shrink-0 mt-0.5">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 5: Embedded deployment */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">嵌入式部署挑戰</h2>
          <p className="text-gray-700 leading-relaxed">
            在 Raspberry Pi 或工廠邊緣設備上跑 TTS，比在伺服器上難一個數量級。
            以下是我在研究嵌入式推論時遇到的主要挑戰與解法：
          </p>

          <div className="space-y-4">
            {[
              {
                icon: '⚖️',
                title: '模型大小 vs 推論速度取捨',
                content: 'FastSpeech2 + HiFi-GAN 合計可能超過 150MB。嵌入式儲存有限，但壓縮模型會影響音質。實務上先砍 HiFi-GAN 的 channel 數（從 512 降到 128），音質可接受，模型縮小 4x。',
                color: 'border-indigo-100 bg-indigo-50',
              },
              {
                icon: '🔢',
                title: '量化（Quantization）：FP32 → INT8',
                content: '把模型權重從 32-bit 浮點數壓縮到 8-bit 整數，模型大小減少 4x，推論速度在 CPU 上可提升 2–3x。代價是音質輕微下降（MCD 分數約增加 0.3–0.8dB）。PyTorch 的 torch.quantization 模組可處理靜態量化。',
                color: 'border-blue-100 bg-blue-50',
              },
              {
                icon: '📤',
                title: 'ONNX 匯出（Framework Agnostic 推論）',
                content: '把 PyTorch 模型匯出為 ONNX 格式，使用 ONNX Runtime 推論，消除 PyTorch 的 overhead，並支援各種硬體加速後端（ARM CPU、Intel OpenVINO、NVIDIA TensorRT）。嵌入式環境通常比 PyTorch 快 20–40%。',
                color: 'border-cyan-100 bg-cyan-50',
              },
              {
                icon: '🍓',
                title: 'Raspberry Pi 上跑 TTS 的瓶頸',
                content: 'Raspberry Pi 4（4GB RAM）的 CPU 是 ARM Cortex-A72，跑 FastSpeech2 + HiFi-GAN（量化後）的 RTF 約 0.8–1.2，勉強接近實時但不穩定。主要瓶頸是 HiFi-GAN 的上採樣卷積層。解法之一是把聲碼器部分移到邊緣伺服器，設備只跑聲學模型。',
                color: 'border-purple-100 bg-purple-50',
              },
            ].map((item) => (
              <Card key={item.title} className={`border ${item.color} shadow-none`}>
                <CardBody className="p-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="font-black text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pl-8">{item.content}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 6: Code */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-gray-900">PyTorch 模型推論基本流程</h2>
          <p className="text-gray-700 leading-relaxed">
            以下是 FastSpeech2 + Vocoder 推論的核心程式碼結構。
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-indigo-700 text-sm">torch.no_grad()</code>{' '}
            確保推論時不計算梯度，節省記憶體；
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-indigo-700 text-sm">map_location='cpu'</code>{' '}
            讓在 GPU 訓練的模型可以在無 GPU 環境載入。
          </p>
          <CodeBlock code={inferenceCode} title="inference.py" />
        </section>

        <Divider className="opacity-30" />

        {/* Section 7: Interview QA */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">面試常考題</h2>
          <div className="space-y-4">
            {qaList.map((item, i) => (
              <Card key={i} className="border border-gray-100 shadow-sm rounded-2xl">
                <CardBody className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-indigo-600 text-white text-xs font-black w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5">Q</span>
                    <p className="font-black text-gray-900">{item.q}</p>
                  </div>
                  <div className="pl-9">
                    <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section>
          <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-indigo-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🎙️', text: 'TTS Pipeline = 文字 → G2P → 聲學模型（→ Mel Spectrogram）→ 聲碼器 → 音訊；兩個模型分工合作' },
                { emoji: '🧠', text: 'Transformer 用 Self-Attention 解決了 RNN 的並行計算和長距依賴兩大問題，是現代 AI 架構的基石' },
                { emoji: '⚡', text: 'FastSpeech2 的核心創新是 Non-autoregressive 生成 + Duration Predictor，速度比 Tacotron2 快 10x' },
                { emoji: '📦', text: '嵌入式部署關鍵：量化（FP32 → INT8）+ ONNX 匯出 + 聲碼器卸載到伺服器，三管齊下才能達到邊緣即時推論' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/ai/ep03-dify" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">EP.03 — Dify 工作流程設計</p>
            <p className="text-sm text-gray-500 mt-1">在本地 LLM 前加 Orchestration 層</p>
            <ArrowLeft size={18} className="mt-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-400">EP.05 — 即將推出</p>
            <p className="text-sm text-gray-400 mt-1">Coming Soon</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Transformer', 'TTS', 'FastSpeech2', 'Attention', 'PyTorch', 'AI', 'EP.04'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
