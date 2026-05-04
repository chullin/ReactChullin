'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Cpu, Radio, Zap, Waves } from 'lucide-react';
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

export default function AiEP04Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-6">
              <Chip size="sm" variant="flat" className="bg-white/20 text-white font-black px-4 py-1.5 rounded-full text-xs">EP.04</Chip>
              <Chip size="sm" variant="flat" className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold">AI 技術深化</Chip>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Transformer & TTS<br />
              <span className="text-blue-300 text-3xl md:text-4xl">語音合成架構原理與嵌入式推論</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto font-medium">
              從 Encoder-Decoder 到梅爾頻譜圖：<br />
              解析如何讓機器說出自然、動聽的人聲。
            </p>
            <div className="flex items-center justify-center gap-6 text-blue-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 20 min read</span>
              <span className="flex items-center gap-1.5"><Waves size={14} /> TTS · Transformer · Embedded AI</span>
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
                <Quote size={32} className="text-indigo-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「文字轉語音 (TTS) 是人機互動的最後一哩路。從傳統的銜接式合成到基於 Transformer 的端到端模型，
                  我們正處於語音技術從『能聽懂』進化到『有情感』的轉折點。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Architecture Overview */}
        <section>
          <SectionHeader icon={Radio} title="1. 現代 TTS 架構概覽" color="text-indigo-600 bg-indigo-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              現代端到端 (End-to-End) TTS 通常分為兩個主要部分：
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="font-black text-slate-800">聲學模型 (Acoustic Model)</p>
                <p className="text-sm">將<strong>文字</strong>轉換成<strong>梅爾頻譜圖 (Mel-spectrogram)</strong>。</p>
                <p className="text-xs text-indigo-600 font-bold italic">代表模型：FastSpeech 2, Transformer-TTS</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="font-black text-slate-800">聲碼器 (Vocoder)</p>
                <p className="text-sm">將<strong>梅爾頻譜圖</strong>轉換成最終的<strong>音訊波形</strong>。</p>
                <p className="text-xs text-indigo-600 font-bold italic">代表模型：HiFi-GAN, WaveGlow</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Encoder-Decoder with Attention */}
        <section>
          <SectionHeader icon={Zap} title="2. Encoder-Decoder 與注意力機制" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              為什麼 Transformer 適合 TTS？關鍵在於 <strong>Self-Attention</strong> 能捕捉文字間的長距離依賴關係。
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1 text-xs font-bold text-blue-600">1</div>
                <p><strong>Encoder</strong>：負責提取文本的特徵（Phoneme Embedding）。</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1 text-xs font-bold text-blue-600">2</div>
                <p><strong>Duration Predictor</strong>：預測每個字該說多久。這是解決「對齊」問題的核心。</p>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1 text-xs font-bold text-blue-600">3</div>
                <p><strong>Decoder</strong>：生成對應的頻譜圖。</p>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Embedded Inference */}
        <section>
          <SectionHeader icon={Cpu} title="3. 嵌入式環境下的推論優化" color="text-slate-600 bg-slate-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              在資源受限的嵌入式設備上，我們不能直接跑巨大的 Transformer。優化策略包含：
            </p>
            <div className="bg-slate-900 rounded-3xl p-8 text-slate-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span>模型量化 (Quantization)</span>
                  <span className="text-emerald-400 font-mono text-sm">FP32 → INT8</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span>模型剪枝 (Pruning)</span>
                  <span className="text-emerald-400 font-mono text-sm">移除冗餘權重</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span>知識蒸餾 (Distillation)</span>
                  <span className="text-emerald-400 font-mono text-sm">大帶小教學</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-slate-800 to-indigo-950 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6">實戰洞察</h2>
            <div className="space-y-4 text-blue-100 font-medium">
              <p>• <strong>穩定性勝過一切</strong>：在工業應用中，FastSpeech 2 這種非自回歸 (Non-autoregressive) 的架構，因為不會產生跳字或重讀，比原生的 Transformer 更受歡迎。</p>
              <p>• <strong>硬體加速</strong>：利用 NPU 或專屬的 DSP 指令集，能讓 TTS 的即時率 (RTF) 提升 5 倍以上。</p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/ai/ep03-dify-orchestration" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">EP.03 — Dify 工作流程</p>
            <p className="text-sm text-gray-500 mt-1">打造可控的 AI Agent</p>
          </Link>
          <Link href="/blog" className="group block bg-gray-50 hover:bg-indigo-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">系列結束</p>
            <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">回到部落格目錄</p>
            <p className="text-sm text-gray-500 mt-1">查看更多文章</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-indigo-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['TTS', 'Transformer', 'DL', 'Audio', 'Optimization', 'EP.04'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
