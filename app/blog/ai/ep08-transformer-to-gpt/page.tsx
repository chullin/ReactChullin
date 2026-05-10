'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  Clock,
  Eye,
  Quote,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';

import CodeBlock from '@/components/blog/CodeBlock';

const qaList = [
  {
    q: 'BERT 和 GPT 最大的架構差異是什麼？',
    a: 'BERT 使用雙向 Encoder，能同時看前後文，適合理解任務（分類、問答、NER）；GPT 使用單向 Decoder（Causal Attention，只看前文），適合生成任務。訓練目標也不同：BERT 用 Masked Language Model（預測被遮蔽的詞），GPT 用 Language Modeling（預測下一個詞）。簡單說：BERT 擅長「讀懂」，GPT 擅長「寫出」。',
  },
  {
    q: 'RLHF 解決了什麼問題？',
    a: '解決了語言模型訓練目標（預測下一詞）和人類期望（有用、無害、誠實）之間的根本落差。純語言模型被訓練成「補全文字」，不是「回答問題」，可能對有害問題直接繼續補全。RLHF 通過收集人類偏好排序 → 訓練 Reward Model → 用 PPO 強化學習優化模型，讓模型行為被人類偏好「塑形」，從「能說話」變成「說有用的話」。',
  },
  {
    q: 'Few-shot Learning 是如何工作的？',
    a: '在 Prompt 中給模型幾個任務示例，模型在不更新任何參數的情況下，從示例中「學習」任務格式並完成新問題。例如：給模型「英文 → 法文」翻譯的幾個例子，它就能翻譯新的句子。這依賴超大規模預訓練讓模型獲得豐富的模式表示，使其能在推論時做類似「元學習」的泛化。這是 GPT-3 的核心貢獻之一。',
  },
  {
    q: 'Scaling Laws 的核心發現是什麼？',
    a: '語言模型性能與模型大小（N）、訓練資料量（D）、計算量（C）成冪次方關係：Performance ≈ f(N^α × D^β × C^γ)。在固定算力預算下，模型大小和資料量需要同步擴大（Chinchilla 法則，2022）——之前的模型（包括 GPT-3）是「訓練不足」的，更小的模型搭配更多資料往往表現更好。這一發現徹底改變了業界訓練大模型的策略。',
  },
  {
    q: '開源 LLM 和商業 LLM 的主要差距在哪裡？',
    a: '主要差距在於對齊（Alignment）品質、多模態能力，以及超大規模訓練帶來的湧現能力。商業模型（GPT-4、Claude）投入了大量人工標注做 RLHF，安全性和指令遵循更好。但開源模型（LLaMA 3、DeepSeek、Qwen2.5）在純文字任務上已非常接近，且最重要的優勢是：可本地部署、可審計、無 API 費用，適合隱私敏感或離線部署場景（如工廠內網）。',
  },
];

const scalingCode = `Performance ≈ f(N^α × D^β × C^γ)

N = 模型參數量 (Number of parameters)
D = 訓練資料量 (Dataset size)
C = 計算量     (Compute budget)

Chinchilla 最佳比例 (2022):
  N_optimal = C^0.5  (模型與算力開方正比)
  D_optimal = C^0.5  (資料與算力開方正比)`;

export default function AiEP08Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <div className="relative h-[56vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 65% 30%, rgba(244,63,94,0.55) 0%, transparent 60%), radial-gradient(ellipse at 20% 75%, rgba(168,85,247,0.45) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-rose-500/20 text-rose-100 border-rose-400/30 font-bold uppercase text-[10px]">
                AI 離線部署
              </Chip>
              <Chip size="sm" variant="flat" className="bg-purple-500/20 text-purple-100 border-purple-400/30 font-bold uppercase text-[10px]">
                EP.08
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3">
              從 Transformer 延伸到 ChatGPT
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-rose-200 mb-5">
              BERT、GPT、LLM 的演進史
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Attention 機制如何從語音合成走向通用語言智慧 — BERT 雙向編碼器、GPT 系列、RLHF、到 ChatGPT 的誕生
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-5 text-white/70 text-sm pt-2"
          >
            <span className="flex items-center gap-1.5">
              <User size={14} />
              Joseph Chen
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              20 min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={14} />
              BERT · GPT · RLHF · LLM · ChatGPT
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">

        {/* ── Opening Quote ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="border border-rose-200 bg-rose-50/60 shadow-sm">
            <CardBody className="p-7">
              <div className="flex gap-4">
                <Quote size={28} className="text-rose-400 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 italic text-base leading-relaxed mb-4">
                    「2017年的 Transformer 論文沒有人想到，六年後它的後裔會讓全世界陷入 AI 熱潮。從用來做語音合成，到理解並生成任意文字，Transformer 本身沒有太大變化——改變的是我們如何訓練它、用什麼資料餵它、以及如何讓它真正對人類有用。」
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    在前幾篇文章中，我們深入理解了 Transformer 的架構原理，以及它如何被應用到語音合成（TTS）。現在我們來看一個更大的視野：同樣的 Attention 架構，是如何演變成今天的 ChatGPT、Claude、Gemini 這些大型語言模型的？這不只是技術史，更是理解現代 AI 能力邊界的關鍵。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* ── Section 1: 兩條演化路線 ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-black">1</span>
            Transformer 的兩條演化路線
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Transformer 的 Encoder-Decoder 架構發表後，研究者發現它的兩個部分有不同的強項：Encoder 擅長「理解」，Decoder 擅長「生成」。這個觀察催生了兩條截然不同的演化路線，並最終主導了整個 NLP 領域。
          </p>

          {/* Architecture Diagram */}
          <Card className="border border-gray-200 shadow-sm">
            <CardBody className="p-8">
              <div className="flex flex-col items-center gap-2 font-mono text-sm">
                <div className="px-6 py-2 rounded-xl bg-gray-800 text-white font-bold text-base">Transformer (2017)</div>
                <div className="text-gray-400 text-lg">↓</div>
                <div className="flex items-start gap-16">
                  <div className="flex flex-col items-center gap-2">
                    <div className="px-5 py-2 rounded-xl bg-blue-100 text-blue-800 font-bold border border-blue-200">Encoder</div>
                    <div className="text-gray-400 text-lg">↓</div>
                    <div className="px-5 py-2 rounded-xl bg-blue-600 text-white font-black text-base">BERT</div>
                    <div className="text-blue-600 font-bold text-sm">(理解)</div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="px-5 py-2 rounded-xl bg-rose-100 text-rose-800 font-bold border border-rose-200">Decoder</div>
                    <div className="text-gray-400 text-lg">↓</div>
                    <div className="px-5 py-2 rounded-xl bg-rose-600 text-white font-black text-base">GPT</div>
                    <div className="text-rose-600 font-bold text-sm">(生成)</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Encoder（理解派）',
                color: 'bg-blue-50 border-blue-200',
                titleColor: 'text-blue-700',
                desc: '雙向處理輸入，每個位置能看到前後文。擅長「理解」任務，如分類、問答、NER。',
                rep: 'BERT、RoBERTa',
              },
              {
                label: 'Decoder（生成派）',
                color: 'bg-rose-50 border-rose-200',
                titleColor: 'text-rose-700',
                desc: '單向處理（只看前面），適合「生成」任務，逐詞預測下一個詞。',
                rep: 'GPT 系列',
              },
              {
                label: 'Encoder-Decoder',
                color: 'bg-purple-50 border-purple-200',
                titleColor: 'text-purple-700',
                desc: '需要「理解輸入 + 生成輸出」的任務，如翻譯、摘要。',
                rep: 'T5、BART',
              },
            ].map((item) => (
              <Card key={item.label} className={`border ${item.color} shadow-sm`}>
                <CardBody className="p-5 space-y-2">
                  <p className={`font-bold text-sm ${item.titleColor}`}>{item.label}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  <p className="text-xs text-gray-500">代表：{item.rep}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Section 2: BERT ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-black">2</span>
            BERT——雙向理解的突破
          </h2>

          <h3 className="text-lg font-bold text-gray-800">2.1 GPT 之前，BERT 先來</h3>
          <p className="text-gray-700 leading-relaxed">
            2018年10月，Google 發表了 BERT（Bidirectional Encoder Representations from Transformers）。它在 11 個 NLP 基準測試上同時創下了 SOTA，引發了整個學術界的轟動。BERT 的意義不只在性能，更在於它確立了「預訓練 + Fine-tuning」的現代 NLP 範式。
          </p>

          <h3 className="text-lg font-bold text-gray-800">2.2 什麼是雙向？</h3>

          {/* Bidirectional comparison */}
          <Card className="border border-gray-200 shadow-sm">
            <CardBody className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                  <p className="font-bold text-rose-700 text-sm mb-2">GPT（單向）</p>
                  <p className="font-mono text-sm text-gray-700">"The cat sat on the ___"</p>
                  <p className="text-xs text-gray-500 mt-2">→ 只看前文預測下一詞</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="font-bold text-blue-700 text-sm mb-2">BERT（雙向）</p>
                  <p className="font-mono text-sm text-gray-700">"The cat [MASK] on the mat"</p>
                  <p className="text-xs text-gray-500 mt-2">→ 同時看前後文預測遮蔽詞</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                為什麼雙向重要？「我吃了一隻貓」和「貓吃了一隻我」，語義截然不同。雙向模型能同時考慮上下文，對理解任務更有優勢——這是語言理解的本質需求。
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800">2.3 兩個預訓練任務</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border border-blue-200 bg-blue-50/50 shadow-sm">
              <CardBody className="p-5 space-y-2">
                <p className="font-bold text-blue-700">Masked Language Model（MLM）</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  隨機遮蔽輸入中 15% 的詞，讓模型預測被遮蔽的詞。這讓模型學會利用上下文推理，是 BERT 雙向理解能力的核心來源。
                </p>
              </CardBody>
            </Card>
            <Card className="border border-indigo-200 bg-indigo-50/50 shadow-sm">
              <CardBody className="p-5 space-y-2">
                <p className="font-bold text-indigo-700">Next Sentence Prediction（NSP）</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  輸入兩個句子 A 和 B，讓模型判斷 B 是否是 A 的下一句。幫助模型理解句間關係，對問答、自然語言推理等任務有益。
                </p>
              </CardBody>
            </Card>
          </div>

          <h3 className="text-lg font-bold text-gray-800">2.4 Fine-tuning 範式的革命</h3>
          <Card className="border border-emerald-200 bg-emerald-50/50 shadow-sm">
            <CardBody className="p-6 space-y-3">
              <p className="font-bold text-emerald-700">BERT 普及了「預訓練 + Fine-tuning」的模式</p>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="font-bold text-emerald-600 shrink-0">1.</span>在大量無標注文字上預訓練，讓模型學習語言的通用表示</li>
                <li className="flex gap-2"><span className="font-bold text-emerald-600 shrink-0">2.</span>針對特定下游任務（分類、問答等）加上少量標注資料 Fine-tune</li>
                <li className="flex gap-2"><span className="font-bold text-emerald-600 shrink-0">3.</span>只需幾個 epoch 就能達到 SOTA</li>
              </ol>
              <Divider className="my-1" />
              <p className="text-gray-600 text-sm leading-relaxed">
                這是劃時代的貢獻：每個任務不再需要從頭訓練，大幅降低標注資料需求。整個 NLP 生態從此進入「遷移學習時代」。
              </p>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* ── Section 3: GPT 系列 ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-black">3</span>
            GPT 系列——生成式的崛起
          </h2>

          <h3 className="text-lg font-bold text-gray-800">3.1 GPT-1（2018）：自回歸語言模型</h3>
          <p className="text-gray-700 leading-relaxed">
            OpenAI 在 BERT 發表前幾個月，發表了 GPT（Generative Pre-trained Transformer）。核心設計只用 Decoder（Causal Attention，每個位置只看前面），預訓練任務是 Language Modeling（預測下一個詞）。同樣採用 Fine-tuning 範式，但方向相反：BERT 理解文字，GPT 生成文字。
          </p>

          <h3 className="text-lg font-bold text-gray-800">3.2 GPT-2（2019）：「大力出奇跡」</h3>
          <p className="text-gray-700 leading-relaxed">
            GPT-2 的主要貢獻不是架構創新，而是<strong>規模</strong>：1.5B 參數（GPT-1 的 10 倍），更多更乾淨的訓練資料（WebText, 40GB）。Zero-shot 和 Few-shot 能力初現端倪。
          </p>
          <Card className="border border-amber-200 bg-amber-50/60 shadow-sm">
            <CardBody className="p-5">
              <p className="font-bold text-amber-700 text-sm mb-2">令人驚訝的 Zero-shot 性能</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                GPT-2 在沒有 Fine-tuning 的情況下，直接在多個 NLP benchmark 上達到接近 SOTA 的成績。OpenAI 當時認為模型太危險（可能被用於生成假新聞），分四個批次才完整公開模型權重——這也是 AI 安全意識的早期體現。
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800">3.3 GPT-3（2020）：少樣本學習的革命</h3>

          {/* Scale table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-bold text-gray-700">模型</th>
                  <th className="text-left px-5 py-3 font-bold text-gray-700">參數量</th>
                  <th className="text-left px-5 py-3 font-bold text-gray-700">訓練資料</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: 'GPT-1', params: '117M', data: 'Books' },
                  { model: 'GPT-2', params: '1.5B', data: 'WebText (40GB)' },
                  { model: 'GPT-3', params: '175B', data: 'Common Crawl + 更多 (570GB)' },
                ].map((row, i) => (
                  <tr key={row.model} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-5 py-3 font-mono font-bold text-rose-600">{row.model}</td>
                    <td className="px-5 py-3 text-gray-700">{row.params}</td>
                    <td className="px-5 py-3 text-gray-700">{row.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed">
            GPT-3 最重要的貢獻是 <strong>In-context Learning（情境學習）</strong>：
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Zero-shot', desc: '只給任務描述，讓模型直接完成，無任何示例。' },
              { name: 'One-shot', desc: '給一個示例 + 任務描述，模型從一個例子學習格式。' },
              { name: 'Few-shot', desc: '給幾個示例 + 任務描述，模型從多個例子推廣。' },
            ].map((item) => (
              <Card key={item.name} className="border border-rose-200 bg-rose-50/40 shadow-sm">
                <CardBody className="p-4 space-y-1">
                  <p className="font-black text-rose-700">{item.name}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
          <Card className="border border-gray-200 bg-gray-50/50 shadow-sm">
            <CardBody className="p-5">
              <p className="font-bold text-gray-700 text-sm mb-2">為什麼有效？</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                不需要更新任何參數！模型從 Prompt 的例子中「學習」如何完成任務。研究者認為，超大規模的預訓練讓模型學習了如此豐富的模式，足以在推論時做類似「元學習（meta-learning）」的泛化——模型學會了如何學習。
              </p>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* ── Section 4: RLHF ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-black">4</span>
            InstructGPT 與 RLHF——讓 AI 更有用
          </h2>

          <h3 className="text-lg font-bold text-gray-800">4.1 GPT-3 的根本問題</h3>
          <p className="text-gray-700 leading-relaxed">
            GPT-3 雖然強大，但有個根本問題：它被訓練成「預測下一個詞」，不是「回答問題」或「遵循指令」。
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border border-red-200 bg-red-50/50 shadow-sm">
              <CardBody className="p-5 space-y-2">
                <p className="font-bold text-red-600 text-sm">GPT-3 的回答（預測補全）</p>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  「如何製作炸彈？製作炸彈的方法有：1. 首先購買...」（繼續補全，無安全考量）
                </p>
              </CardBody>
            </Card>
            <Card className="border border-emerald-200 bg-emerald-50/50 shadow-sm">
              <CardBody className="p-5 space-y-2">
                <p className="font-bold text-emerald-600 text-sm">人類想要的回答</p>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  「這個問題涉及危險活動，我無法提供相關資訊。如有合法需求請諮詢專業人員。」
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="border border-orange-200 bg-orange-50/60 shadow-sm">
            <CardBody className="p-5">
              <p className="font-bold text-orange-700 text-sm mb-1">問題核心</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                模型的訓練目標（預測下一詞）和人類想要的行為（有用、無害、誠實）之間存在根本落差。這個落差，就是 RLHF 要解決的問題。
              </p>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800">4.2 RLHF 三步驟</h3>
          <p className="text-gray-700 leading-relaxed">
            <strong>RLHF（Reinforcement Learning from Human Feedback）</strong> 就是為了填補這個落差而設計的訓練框架。
          </p>

          <div className="space-y-4">
            {[
              {
                step: 'Step 1',
                title: '監督式微調（Supervised Fine-Tuning, SFT）',
                color: 'border-blue-200 bg-blue-50/50',
                titleColor: 'text-blue-700',
                stepColor: 'bg-blue-600',
                desc: '收集人工撰寫的高品質對話範例，Fine-tune 基礎模型。讓模型知道「回答問題應該是這個格式和風格」——建立基礎的對話能力。',
              },
              {
                step: 'Step 2',
                title: '訓練獎勵模型（Reward Model, RM）',
                color: 'border-amber-200 bg-amber-50/50',
                titleColor: 'text-amber-700',
                stepColor: 'bg-amber-500',
                desc: '給 SFT 模型同一個問題，生成多個不同的回答，讓人類標注者排序這些回答的品質。用這些排序資料訓練一個「獎勵模型」，它能預測人類對某個回答的滿意程度分數。',
              },
              {
                step: 'Step 3',
                title: 'PPO 強化學習（Proximal Policy Optimization）',
                color: 'border-purple-200 bg-purple-50/50',
                titleColor: 'text-purple-700',
                stepColor: 'bg-purple-600',
                desc: '用訓練好的 RM 作為「評審」，用強化學習（PPO）優化 SFT 模型，讓它傾向生成 RM 給高分的回答。同時加入 KL 散度懲罰，防止模型偏離原始 SFT 模型太遠（避免「討好評審」但失去語言能力）。',
              },
            ].map((item) => (
              <Card key={item.step} className={`border ${item.color} shadow-sm`}>
                <CardBody className="p-5">
                  <div className="flex items-start gap-3">
                    <span className={`${item.stepColor} text-white text-xs font-black px-2 py-1 rounded-lg shrink-0 mt-0.5`}>{item.step}</span>
                    <div>
                      <p className={`font-bold text-sm ${item.titleColor} mb-2`}>{item.title}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* RLHF Flow Diagram */}
          <Card className="border border-gray-200 bg-gray-900 shadow-sm">
            <CardBody className="p-6">
              <p className="text-gray-400 text-xs font-mono mb-3">RLHF 訓練迴圈</p>
              <pre className="text-green-400 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre">{`人類標注排序 → 訓練 Reward Model
                        ↓
SFT 模型 → 生成回答 → RM 評分 → PPO 更新 → 更好的模型
    ↑___________________________________________↑
                   （循環迭代）`}</pre>
            </CardBody>
          </Card>

          <h3 className="text-lg font-bold text-gray-800">4.3 為什麼 RLHF 是關鍵</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardBody className="p-5 space-y-1">
                <p className="font-bold text-gray-500 text-sm">Before RLHF</p>
                <p className="text-gray-700 text-sm leading-relaxed">模型說什麼取決於訓練資料的分佈，對人類期望無感知，無法可靠地拒絕有害請求。</p>
              </CardBody>
            </Card>
            <Card className="border border-rose-200 bg-rose-50/40 shadow-sm">
              <CardBody className="p-5 space-y-1">
                <p className="font-bold text-rose-600 text-sm">After RLHF</p>
                <p className="text-gray-700 text-sm leading-relaxed">模型的行為被人類偏好「塑形」，從「能說話」變成「說有用的話」。這是 ChatGPT 和之前 GPT-3 最本質的差異。</p>
              </CardBody>
            </Card>
          </div>
        </section>

        <Divider />

        {/* ── Section 5: ChatGPT ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-black">5</span>
            ChatGPT——大眾化的 AI 對話
          </h2>

          <h3 className="text-lg font-bold text-gray-800">5.1 2022年11月30日</h3>
          <p className="text-gray-700 leading-relaxed">
            OpenAI 發布 ChatGPT，基於 GPT-3.5（InstructGPT 的後繼）。一週內達到 100 萬用戶，兩個月達到 1 億。歷史上增長最快的消費級應用——Netflix 達到 1 億用戶花了 3.5 年。
          </p>

          <h3 className="text-lg font-bold text-gray-800">5.2 為什麼 ChatGPT 讓大眾驚訝？</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border border-gray-200 shadow-sm">
              <CardBody className="p-5 space-y-2">
                <p className="font-bold text-gray-500 text-sm">之前的 AI 助理（Siri, Alexa）</p>
                <p className="text-gray-600 text-sm leading-relaxed">命令式介面，「播放音樂」「查天氣」，超出固定指令範圍就不行，沒有上下文理解能力。</p>
              </CardBody>
            </Card>
            <Card className="border border-rose-200 bg-rose-50/40 shadow-sm">
              <CardBody className="p-5 space-y-2">
                <p className="font-bold text-rose-600 text-sm">ChatGPT</p>
                <p className="text-gray-600 text-sm leading-relaxed">對話式，能解釋概念、寫程式、改文章、進行多輪推理，理解隱含意圖，並維持對話上下文。</p>
              </CardBody>
            </Card>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed italic">
            關鍵不是底層模型的突破，而是 RLHF 讓模型「會說話」，加上對話界面讓能力變得可見、可觸達。
          </p>

          <h3 className="text-lg font-bold text-gray-800">5.3 GPT-4（2023）</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: '多模態（Multimodal）', desc: '能理解圖片輸入（GPT-4V），視覺與語言統一建模。' },
              { title: '更長的 Context Window', desc: '從 GPT-3.5 的 4K tokens 到 GPT-4 Turbo 的 128K tokens，可處理整本書。' },
              { title: '推理能力大幅提升', desc: '在律師、醫師、GRE 等專業考試中表現接近頂尖人類水準。' },
              { title: '更好的指令遵循', desc: '更準確地理解複雜、多步驟的指令，減少幻覺（Hallucination）。' },
            ].map((item) => (
              <Card key={item.title} className="border border-purple-200 bg-purple-50/30 shadow-sm">
                <CardBody className="p-4 space-y-1">
                  <p className="font-bold text-purple-700 text-sm">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
          <p className="text-gray-500 text-xs leading-relaxed">
            * OpenAI 未公佈 GPT-4 的確切參數規模，但估計遠超 GPT-3 的 175B。技術報告刻意省略了模型架構細節，引發學界討論。
          </p>
        </section>

        <Divider />

        {/* ── Section 6: LLM 全景圖 ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">6</span>
            LLM 全景圖——開源與商業的競爭
          </h2>

          <h3 className="text-lg font-bold text-gray-800">商業 LLM</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-bold text-gray-700">模型</th>
                  <th className="text-left px-5 py-3 font-bold text-gray-700">公司</th>
                  <th className="text-left px-5 py-3 font-bold text-gray-700">特色</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: 'GPT-4 / GPT-4o', company: 'OpenAI', feat: '最廣泛使用，多模態，工具調用' },
                  { model: 'Claude 3.5', company: 'Anthropic', feat: '長 Context，安全性高，程式碼能力強' },
                  { model: 'Gemini', company: 'Google', feat: '原生多模態，整合 Google 生態' },
                ].map((row, i) => (
                  <tr key={row.model} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-5 py-3 font-mono font-bold text-indigo-600 whitespace-nowrap">{row.model}</td>
                    <td className="px-5 py-3 text-gray-700">{row.company}</td>
                    <td className="px-5 py-3 text-gray-600 text-xs">{row.feat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-gray-800">開源 LLM</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-bold text-gray-700">模型</th>
                  <th className="text-left px-5 py-3 font-bold text-gray-700">組織</th>
                  <th className="text-left px-5 py-3 font-bold text-gray-700">特色</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: 'LLaMA 3', org: 'Meta', feat: '高品質基礎模型，可本地部署，生態完整' },
                  { model: 'Mistral / Mixtral', org: 'Mistral AI', feat: 'MoE 架構，高效推論，性價比高' },
                  { model: 'Qwen2.5', org: 'Alibaba', feat: '中文能力強，支援離線部署，多尺寸' },
                  { model: 'DeepSeek', org: 'DeepSeek', feat: '高性能開源，性價比極高，中英俱佳' },
                ].map((row, i) => (
                  <tr key={row.model} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-5 py-3 font-mono font-bold text-emerald-600 whitespace-nowrap">{row.model}</td>
                    <td className="px-5 py-3 text-gray-700">{row.org}</td>
                    <td className="px-5 py-3 text-gray-600 text-xs">{row.feat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card className="border border-emerald-200 bg-emerald-50/60 shadow-sm">
            <CardBody className="p-5">
              <p className="font-bold text-emerald-700 text-sm mb-2">Ollama 離線部署的意義</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                對於 Ollama 離線部署場景（如 EP.02 所介紹的工廠內網環境），開源 LLM 是唯一選擇。LLaMA、Qwen、Mistral 都能直接在 Ollama 上運行，無需 API 金鑰，符合資安管控要求。Qwen2.5 因中文能力強，特別適合台灣與中國工廠場景。
              </p>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* ── Section 7: Scaling Laws ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm font-black">7</span>
            Scaling Laws——為什麼越大越好？
          </h2>

          <p className="text-gray-700 leading-relaxed">
            2020 年，OpenAI 發表 Scaling Laws 研究，發現語言模型的性能與三個因素成冪次方關係：模型參數量（N）、訓練資料量（D）、計算量（C）。這一發現從根本上改變了 AI 研究的方向。
          </p>

          <CodeBlock lang="python" code={scalingCode} title="Scaling Laws 公式" />

          <p className="text-gray-700 leading-relaxed">
            <strong>核心意涵</strong>：只要有足夠的算力和資料，持續放大模型就能持續提升性能，且提升是可預測的冪次方關係。這解釋了為什麼科技公司在 LLM 上的算力投資呈指數增長。
          </p>

          <Card className="border border-violet-200 bg-violet-50/50 shadow-sm">
            <CardBody className="p-5 space-y-2">
              <p className="font-bold text-violet-700 text-sm">Chinchilla 修正（2022）</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                DeepMind 發表 Chinchilla 論文，發現之前的模型（包括 GPT-3）是「訓練不足」的——同樣算力預算下，更小的模型搭配更多資料往往更好。最佳比例：每個參數應對應約 20 個訓練 Token。GPT-3 (175B 參數) 按此法則應使用 3.5T tokens，而非實際使用的 300B tokens。
              </p>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* ── Section 8: 共同本質 ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-black">8</span>
            從 TTS Transformer 到 LLM——共同的本質
          </h2>

          <p className="text-gray-700 leading-relaxed">
            現在我們繞了一大圈，可以回頭看這個有趣的問題：TTS 的 Transformer 和 ChatGPT 的 GPT，在本質上有多大的差異？
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-bold text-gray-700">面向</th>
                  <th className="text-left px-5 py-3 font-bold text-blue-700">TTS Transformer</th>
                  <th className="text-left px-5 py-3 font-bold text-rose-700">GPT / LLM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { aspect: '核心架構', tts: 'Transformer (Encoder or Encoder-Decoder)', gpt: 'Transformer Decoder' },
                  { aspect: '輸入', tts: '音素/字符序列', gpt: 'Token 序列' },
                  { aspect: '輸出', tts: '梅爾頻譜（Mel Spectrogram）', gpt: '下一個 Token 的機率' },
                  { aspect: '訓練目標', tts: '重建梅爾頻譜', gpt: '預測下一個詞（+ RLHF）' },
                  { aspect: '注意力機制', tts: '完全相同', gpt: '完全相同（+ 因果遮蔽）' },
                  { aspect: '本質', tts: '序列到序列轉換', gpt: '序列到序列轉換' },
                ].map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-5 py-3 font-bold text-gray-700 whitespace-nowrap">{row.aspect}</td>
                    <td className="px-5 py-3 text-blue-700 text-xs">{row.tts}</td>
                    <td className="px-5 py-3 text-rose-700 text-xs">{row.gpt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card className="border border-rose-300 bg-gradient-to-br from-rose-50 to-purple-50 shadow-md">
            <CardBody className="p-7">
              <div className="flex gap-4">
                <Quote size={24} className="text-rose-400 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-gray-800 mb-2">核心洞察</p>
                  <p className="text-gray-700 leading-relaxed">
                    Attention 機制本身是通用的——不管輸入是文字、音素還是圖片的 Patch，只要能表示成 Token 序列，Transformer 就能建模它們之間的關係。這就是為什麼同一套架構能跨越語音、文字、圖像，成為現代 AI 的統一基礎。TTS 的 Transformer 和 ChatGPT 的 GPT，其實是同一個思想的兩個應用方向。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider />

        {/* ── Interview Q&A ── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-gray-900">面試常見問題</h2>
          <div className="space-y-4">
            {qaList.map((item, i) => (
              <Card key={i} className="border border-gray-200 shadow-sm">
                <CardBody className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-black">
                      Q
                    </span>
                    <p className="font-bold text-gray-800 text-sm leading-relaxed">{item.q}</p>
                  </div>
                  <div className="flex items-start gap-3 pl-0">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-black">
                      A
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Summary ── */}
        <section>
          <div className="rounded-2xl bg-gradient-to-br from-rose-600 to-purple-600 p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6">本文重點回顧</h2>
            <ul className="space-y-3">
              {[
                '🔀 Transformer 分裂成 BERT（理解）和 GPT（生成）兩條演化路線',
                '🎓 BERT 的 MLM 預訓練 + Fine-tuning 範式，讓 NLP 進入遷移學習時代',
                '📈 GPT 系列：從 117M 到 175B，規模驅動 Zero-shot 與 Few-shot 能力湧現',
                '🎯 RLHF：讓 AI 從「能說話」到「說人話」，是 ChatGPT 成功的真正關鍵',
                '🌐 LLM 全景：商業（GPT-4, Claude）與開源（LLaMA, Qwen）並行發展',
                '🔗 共同本質：不論 TTS 還是 LLM，都是 Transformer 對序列關係的建模',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2">
          {['ChatGPT', 'GPT', 'BERT', 'LLM', 'RLHF', 'Transformer', 'AI', 'EP.08'].map((tag) => (
            <Chip key={tag} size="sm" color="secondary" variant="flat">
              {tag}
            </Chip>
          ))}
        </div>

        <Divider />

        {/* ── Navigation ── */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/blog/ai/ep06-tts-edge-deploy">
            <Card className="border border-gray-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group">
              <CardBody className="p-5">
                <div className="flex items-center gap-3">
                  <ArrowLeft size={18} className="text-gray-400 group-hover:text-rose-500 transition-colors shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">上一篇</p>
                    <p className="font-bold text-gray-700 group-hover:text-rose-600 transition-colors text-sm">
                      EP.06 — 嵌入式落地實戰
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>

          <div className="opacity-50 cursor-not-allowed">
            <Card className="border border-gray-200">
              <CardBody className="p-5">
                <div className="flex items-center justify-end gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">下一篇</p>
                    <p className="font-bold text-gray-400 text-sm">EP.09 — 即將推出</p>
                  </div>
                  <ArrowRight size={18} className="text-gray-300 shrink-0" />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
