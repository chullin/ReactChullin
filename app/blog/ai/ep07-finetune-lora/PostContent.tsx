'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Zap, Layers, Cpu, BookOpen, Mic } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function AIEP07() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.07</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">AI 離線部署系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Fine-tuning 實戰：LoRA 與 Adapter<br />
              <span className="text-teal-200">加上 ASR 語音辨識基礎與 Whisper 微調</span>
            </h1>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl">
              大模型已經很強了，為什麼還需要 Fine-tuning？Adapter 和 LoRA 怎麼做到「少訓練少數參數、效果不輸全量微調」？
              最後用 LoRA 微調 Whisper，把 ASR 基礎和 Fine-tuning 技術一次串起來。
            </p>
            <div className="flex items-center gap-6 text-teal-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> LoRA · Adapter · PEFT · Whisper · ASR</span>
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
                <Quote size={32} className="text-teal-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「EP.06 我們把模型壓縮到邊緣裝置上。但有時候問題不是模型太大，
                    而是模型不夠『懂你的行業』。這時候需要的不是壓縮，而是微調。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Fine-tuning 把通用預訓練模型適配到特定任務。
                    但全量微調（Full Fine-tuning）對 GPU 記憶體的要求極高，
                    這催生了 Adapter 和 LoRA 這類參數高效微調（PEFT）方法。
                    這篇結尾用「LoRA 微調 Whisper」把所有概念串成一個可執行的完整案例。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Section 1: 為什麼需要 Fine-tuning */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="text-teal-600" />
            <h2 className="text-3xl font-black text-gray-900">為什麼需要 Fine-tuning？</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            預訓練大模型（Foundation Model）已經學到了海量的通用知識，
            但「通用」也代表它在你的特定領域不夠精準。
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                method: 'Zero-shot',
                desc: '不給任何例子，直接讓模型回答',
                pro: '無需數據，立即可用',
                con: '特定領域準確率低',
                color: 'bg-slate-50 border-slate-200',
                badge: 'bg-slate-100 text-slate-700',
              },
              {
                method: 'Few-shot',
                desc: '在 Prompt 中給幾個示範例子',
                pro: '不需訓練，靈活',
                con: '受限於 context 長度，不穩定',
                color: 'bg-blue-50 border-blue-200',
                badge: 'bg-blue-100 text-blue-700',
              },
              {
                method: 'Fine-tuning',
                desc: '用你的數據真正更新模型權重',
                pro: '準確率高，行為穩定',
                con: '需要標注數據和訓練成本',
                color: 'bg-teal-50 border-teal-300',
                badge: 'bg-teal-200 text-teal-800',
              },
            ].map((item, i) => (
              <Card key={i} className={`border ${item.color}`}>
                <CardBody className="p-5">
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${item.badge}`}>{item.method}</span>
                  <p className="text-sm text-gray-600 mt-3 mb-3">{item.desc}</p>
                  <p className="text-xs text-green-600 font-bold">✅ {item.pro}</p>
                  <p className="text-xs text-red-500 font-bold mt-1">❌ {item.con}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
            <p className="font-black text-red-800 mb-2 text-sm">Full Fine-tuning 的記憶體問題</p>
            <p className="text-sm text-red-700 leading-relaxed">
              全量微調需要儲存<strong>原始權重 + 梯度 + 優化器狀態</strong>（Adam 需要一階/二階動量各一份）。
              以 LLaMA-2 7B 為例：<br />
              · 模型權重：7B × 4 bytes = <strong>28 GB</strong><br />
              · 梯度：同樣 28 GB<br />
              · Adam 優化器狀態：56 GB<br />
              · <strong>合計約 112 GB</strong>——一般消費級 GPU（8–24 GB）完全跑不起來。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 2: PEFT 概覽 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="text-cyan-600" />
            <h2 className="text-3xl font-black text-gray-900">PEFT：參數高效微調的三條路</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            PEFT（Parameter-Efficient Fine-Tuning）的核心思想：
            <strong>凍結原始模型大部分權重，只訓練少量新增或指定的參數</strong>，就能達到接近全量微調的效果。
          </p>

          <div className="bg-cyan-50 rounded-3xl p-6 border border-cyan-100">
            <p className="font-black text-cyan-800 mb-4 text-sm">三種主流 PEFT 方法對比</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b-2 border-cyan-200">
                    <th className="text-left p-3 font-black text-cyan-800">方法</th>
                    <th className="text-left p-3 font-black text-cyan-800">原理</th>
                    <th className="text-left p-3 font-black text-cyan-800">可訓練參數</th>
                    <th className="text-left p-3 font-black text-cyan-800">推理開銷</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Prefix Tuning', '在每一層前插入可學習的「軟提示向量」', '~0.1%', '有（context 加長）'],
                    ['Adapter', '在 Transformer 層後插入小型瓶頸網路', '~1–3%', '有（串聯計算）'],
                    ['LoRA ⭐', '把權重更新矩陣分解為兩個低秩矩陣', '~0.1–1%', '無（可合併）'],
                  ].map(([method, principle, params, cost], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-cyan-50/40'}>
                      <td className="p-3 font-black text-gray-800 border-b border-cyan-100">{method}</td>
                      <td className="p-3 text-gray-600 text-xs border-b border-cyan-100">{principle}</td>
                      <td className="p-3 text-teal-700 font-bold border-b border-cyan-100">{params}</td>
                      <td className="p-3 text-gray-500 border-b border-cyan-100">{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
            <p className="font-black text-indigo-800 mb-2 text-sm">為什麼 LoRA 可以合併但 Adapter 不行？</p>
            <p className="text-sm text-indigo-700 leading-relaxed mb-3">
              LoRA 的更新量 <strong>ΔW = B×A</strong> 是一個與原始權重形狀相同的矩陣，可以直接加回去：
              W' = W₀ + B×A。部署時只需要一個普通的 Linear 層，沒有任何額外模組。
            </p>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Adapter 的瓶頸網路（Down-project → ReLU → Up-project）是<strong>串聯在 Transformer 層後面</strong>的獨立模組，
              它的輸出不是一個「加法更新」，而是一次非線性變換——無法線性合併回原始權重。
              因此推理時每次都要額外執行這個模組，產生固定的推理開銷（延遲 +2–5ms/層）。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 3: Adapter */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="text-blue-600" />
            <h2 className="text-3xl font-black text-gray-900">Adapter：插入瓶頸層</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Adapter（Houlsby et al., 2019）在每個 Transformer 層的 Self-Attention 和 FFN 後面，
            各插入一個小型的「瓶頸網路」（Bottleneck）。訓練時只更新這些插入的模組。
          </p>

          <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
            <p className="font-black text-blue-800 mb-4 text-sm">Adapter 架構（單層示意）</p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1 space-y-1">
                {[
                  { label: '輸入 x（維度 d）', color: 'bg-gray-100 text-gray-700', border: '' },
                  { label: '↓', color: '', border: '' },
                  { label: 'Transformer 層（凍結）', color: 'bg-blue-100 text-blue-800', border: 'border border-blue-200' },
                  { label: '↓', color: '', border: '' },
                  { label: '🔵 Down-project：d → r（r << d）', color: 'bg-teal-100 text-teal-800', border: 'border border-teal-200' },
                  { label: '🔵 非線性激活（ReLU / GELU）', color: 'bg-teal-100 text-teal-800', border: 'border border-teal-200' },
                  { label: '🔵 Up-project：r → d', color: 'bg-teal-100 text-teal-800', border: 'border border-teal-200' },
                  { label: '↓  +  Residual（加回輸入 x）', color: '', border: '' },
                  { label: '輸出（維度 d，形狀不變）', color: 'bg-gray-100 text-gray-700', border: '' },
                ].map((item, i) => (
                  item.label.startsWith('↓') ? (
                    <div key={i} className="flex justify-center py-0.5">
                      <span className="text-gray-400 font-bold text-sm">{item.label}</span>
                    </div>
                  ) : (
                    <div key={i} className={`px-4 py-2 rounded-xl text-sm font-bold text-center ${item.color} ${item.border}`}>
                      {item.label}
                    </div>
                  )
                ))}
              </div>
              <div className="flex-1 space-y-3 text-sm">
                <div className="bg-white rounded-2xl p-4 border border-blue-100">
                  <p className="font-black text-gray-800 mb-2">關鍵設計：瓶頸維度 r</p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    r 通常取 8–64，遠小於 d（768–4096）。<br />
                    例如 d=768, r=64：<br />
                    Adapter 參數量 = 2 × (768 × 64) = <strong>98,304</strong><br />
                    原始層參數量 ≈ 4 × 768² = <strong>2,359,296</strong><br />
                    只需訓練 <strong>4.2%</strong> 的額外參數。
                  </p>
                </div>
                <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
                  <p className="font-black text-teal-800 mb-1 text-xs">為什麼加 Residual？</p>
                  <p className="text-teal-700 text-xs leading-relaxed">
                    初始化時 Down-project 用零初始化，Up-project 用隨機初始化。
                    這讓 Adapter 在訓練開始時輸出接近零，等同於直接 bypass——
                    不會破壞預訓練模型的行為，訓練更穩定。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 4: LoRA */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-teal-600" />
            <h2 className="text-3xl font-black text-gray-900">LoRA：低秩分解的優雅方案</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            LoRA（Low-Rank Adaptation，Hu et al., 2022）從線性代數出發，
            提出一個更巧妙的假設：<strong>大模型在 fine-tuning 時，權重更新矩陣 ΔW 是低秩的。</strong>
            既然 ΔW 是低秩的，就可以用兩個小矩陣的乘積來近似它。
          </p>

          {/* LoRA math visualization */}
          <div className="bg-teal-50 rounded-3xl p-6 border border-teal-100">
            <p className="font-black text-teal-800 mb-5 text-sm">LoRA 核心公式</p>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-teal-100">
                <p className="text-center font-mono text-lg font-black text-gray-800 mb-3">
                  W' = W₀ + ΔW = W₀ + B·A
                </p>
                <div className="grid sm:grid-cols-3 gap-3 text-center text-xs">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="font-black text-gray-700">W₀</p>
                    <p className="text-gray-500 mt-1">原始預訓練權重<br />形狀：d × k<br /><strong>凍結，不更新</strong></p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="font-black text-blue-700">A（右矩陣）</p>
                    <p className="text-blue-600 mt-1">形狀：r × k<br />隨機高斯初始化<br />訓練中更新</p>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-3">
                    <p className="font-black text-teal-700">B（左矩陣）</p>
                    <p className="text-teal-600 mt-1">形狀：d × r<br /><strong>零初始化</strong>（確保訓練開始時 ΔW = 0）<br />訓練中更新</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-teal-100">
                <p className="font-black text-gray-800 mb-3 text-sm">參數量對比（以 GPT-3 175B 的某一層為例）</p>
                <div className="space-y-2 text-sm">
                  {[
                    { label: '原始 W₀', size: 'd=4096, k=4096', params: '4096 × 4096 = 16,777,216', color: 'text-gray-500' },
                    { label: 'LoRA A + B（r=8）', size: 'r=8', params: '(4096×8) + (8×4096) = 65,536', color: 'text-teal-700 font-black' },
                    { label: '壓縮比', size: '', params: '只需 0.39% 的額外參數', color: 'text-green-700 font-black' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-gray-50">
                      <span className="font-bold text-gray-700">{item.label}</span>
                      <span className={`text-xs ${item.color}`}>{item.params}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-green-50">
              <CardBody className="p-5">
                <p className="font-black text-green-800 mb-2">LoRA vs Adapter：關鍵優勢</p>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex gap-2">
                    <span className="shrink-0 font-black">✅</span>
                    <span><strong>推理零開銷</strong>：W' = W₀ + BA 可以在部署前一次性合併，推理時就是一個普通權重矩陣。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0 font-black">✅</span>
                    <span><strong>並行 + 快速切換</strong>：多個任務各自有一組 BA，共用 W₀，隨時切換不同的「外掛」。</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 bg-amber-50">
              <CardBody className="p-5">
                <p className="font-black text-amber-800 mb-2">rank r 怎麼選？</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• r=4–8：極輕量，適合語言風格調整</li>
                  <li>• r=16–32：平衡性好，大多數任務首選</li>
                  <li>• r=64+：接近全量微調效果，參數也更多</li>
                  <li className="pt-1 text-xs">通常先用 r=16 實驗，效果不夠再往上調。</li>
                </ul>
              </CardBody>
            </Card>
          </div>

          <CodeBlock
            title="使用 HuggingFace PEFT 套用 LoRA"
            lang="python"
            code={`from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import get_peft_model, LoraConfig, TaskType

# 1. 載入基礎模型（以 LLaMA 為例）
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    torch_dtype=torch.float16,
    device_map="auto",
)

# 2. 設定 LoRA 配置
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,                         # rank
    lora_alpha=32,                # scaling factor = alpha / r
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"],  # 只加在 Q 和 V 投影矩陣上
    bias="none",
)

# 3. 套用 LoRA（凍結原始權重，只有 LoRA 矩陣可訓練）
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable params: 4,194,304 || all params: 6,742,609,920 || trainable%: 0.0622%

# 4. 正常訓練...
# trainer = Trainer(model=model, ...)

# 5. 推理前合併（消除推理開銷）
model = model.merge_and_unload()  # W' = W₀ + BA，回到普通模型`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* QLoRA 簡介 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900">QLoRA：在消費級 GPU 上微調 70B 模型</h2>
          <p className="text-gray-600 leading-relaxed">
            QLoRA（Dettmers et al., 2023）在 LoRA 基礎上再加一層 4-bit 量化，
            讓一張 24GB 的 RTX 3090 就能微調 65B 參數的模型。
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'NF4 量化', desc: '用「Normal Float 4」格式儲存凍結的 W₀（比 INT4 對正態分佈的精度更好）', icon: '🔢' },
              { title: '雙重量化', desc: '連量化用的 scale 常數也再量化一次，進一步壓縮記憶體', icon: '🗜️' },
              { title: 'Paged Optimizer', desc: '用 NVIDIA 統一記憶體管理，防止梯度計算時的 OOM crash', icon: '📄' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="font-black text-gray-800 text-sm mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <CodeBlock
            title="QLoRA 載入方式（BitsAndBytes）"
            lang="python"
            code={`from transformers import BitsAndBytesConfig
from peft import prepare_model_for_kbit_training

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,   # 雙重量化
    bnb_4bit_quant_type="nf4",        # NF4 格式
    bnb_4bit_compute_dtype=torch.bfloat16,
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-70b-hf",
    quantization_config=bnb_config,
    device_map="auto",
)

# 為 k-bit 訓練做準備（凍結非 LoRA 層、設定 gradient checkpointing）
model = prepare_model_for_kbit_training(model)
# 接著套用 LoRA config，同前...`}
          />

          <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
            <p className="font-black text-red-800 mb-2 text-sm">⚠️ QLoRA 的部署限制：4-bit 模型無法直接合併</p>
            <p className="text-sm text-red-700 leading-relaxed mb-2">
              一般 LoRA 訓練後可以用 <code className="bg-red-100 px-1 rounded font-mono text-xs">model.merge_and_unload()</code> 把
              B×A 合併回 W₀，得到一個普通的全精度模型，方便直接部署。
            </p>
            <p className="text-sm text-red-700 leading-relaxed">
              QLoRA 的 W₀ 是以 NF4 4-bit 格式儲存的——若直接呼叫 merge_and_unload()，
              會把 LoRA 更新加到量化後的低精度 W₀ 上，導致精度損失放大。
              正確做法是先把 W₀ 反量化回 float16，完成合併後再重新量化；
              或以 <strong>LoRA adapter 分開部署</strong>（不合併），載入時動態套用，保留最大彈性。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* ASR 基礎 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Mic className="text-blue-600" />
            <h2 className="text-3xl font-black text-gray-900">語音辨識（ASR）基礎</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            ASR（Automatic Speech Recognition）把音頻波形轉成文字。
            從 HMM 時代到深度學習，再到 Transformer 的 Whisper，整個演進脈絡和 TTS 有很多鏡像關係——
            只是方向相反（TTS：文字→語音；ASR：語音→文字）。
          </p>

          {/* ASR 演進 */}
          <div className="space-y-3">
            {[
              {
                era: '第一代（1980s–2010s）',
                method: 'HMM + GMM',
                desc: '把語音拆成音素序列，每個音素用高斯混合模型建模。需要大量人工標注音素邊界，泛化性差。',
                color: 'bg-slate-50 border-slate-200',
              },
              {
                era: '第二代（2010s）',
                method: 'DNN + CTC',
                desc: '用深度神經網路取代 GMM，引入 CTC loss 解決「文字與音頻不等長對齊」問題，不再需要人工對齊。',
                color: 'bg-blue-50 border-blue-200',
              },
              {
                era: '第三代（2017–）',
                method: 'Seq2Seq + Attention（LAS、Transformer）',
                desc: '端到端 Encoder-Decoder 架構，注意力機制自動學習對齊。準確率大幅提升，尤其在長句和口音上。',
                color: 'bg-teal-50 border-teal-200',
              },
              {
                era: '第四代（2022–）',
                method: 'Whisper（大規模弱監督）',
                desc: '用 680,000 小時的網路音頻進行弱監督訓練，同時學習 ASR + 翻譯 + 語言辨識，泛化性極強。',
                color: 'bg-cyan-50 border-cyan-300',
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <span className="text-xs font-black text-gray-500">{item.era}</span>
                  <span className="text-sm font-black text-gray-900">{item.method}</span>
                </div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTC 說明 */}
          <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
            <p className="font-black text-blue-800 mb-4 text-sm">CTC（Connectionist Temporal Classification）是什麼？</p>
            <p className="text-blue-700 text-sm mb-4 leading-relaxed">
              語音幀（frame）的數量遠大於文字的數量。例如 1 秒有 100 個音頻幀，但可能只對應 5 個字。
              CTC 的做法是引入一個特殊的「blank」token，允許模型輸出比目標文字更長的序列，
              再通過去除重複和 blank 來還原原始文字。
            </p>
            <div className="bg-white rounded-2xl p-4 border border-blue-100 font-mono text-xs">
              <p className="text-gray-500 mb-2">CTC 解碼示例：</p>
              <p className="text-blue-800 mb-1">模型輸出：h h _ e _ l l _ l _ o _ _</p>
              <p className="text-gray-500 mb-1">步驟一 去 blank：h h e l l l o</p>
              <p className="text-gray-500 mb-1">步驟二 去重複：h e l o</p>
              <p className="text-green-700 font-black">最終結果：hello</p>
              <p className="text-gray-400 mt-2">（_ 代表 blank token）</p>
            </div>
          </div>

          {/* Whisper 架構 */}
          <div className="space-y-4">
            <p className="font-black text-gray-800 text-lg">Whisper 架構：Transformer Encoder-Decoder</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Whisper（OpenAI, 2022）用的是標準的 Transformer Encoder-Decoder，
              和 EP.04 介紹的架構完全相同——差別只在輸入是音頻 Mel 頻譜而非文字 token。
            </p>

            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                <div className="flex-1 space-y-2">
                  <p className="font-black text-gray-700 text-sm text-center mb-3">Encoder（理解音頻）</p>
                  {[
                    '音頻波形',
                    '→ Log-Mel Spectrogram\n（80 mel bins, 30s = 3000 frames）',
                    '→ 2× Conv1D（降採樣）',
                    '→ Positional Embedding',
                    '→ N × Transformer Block',
                    '音頻特徵序列（凍結後用於解碼）',
                  ].map((step, i) => (
                    <div key={i} className={`px-3 py-2 rounded-xl text-xs font-bold text-center whitespace-pre-line leading-tight
                      ${i === 0 || i === 5 ? 'bg-gray-200 text-gray-700' : 'bg-white border border-gray-200 text-gray-700'}`}>
                      {step}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center text-2xl font-black text-gray-300">⟷</div>
                <div className="flex-1 space-y-2">
                  <p className="font-black text-gray-700 text-sm text-center mb-3">Decoder（生成文字）</p>
                  {[
                    '特殊 token：<|transcribe|>\n或 <|translate|>（多任務標記）',
                    '→ Token Embedding',
                    '→ N × Transformer Block\n（含 Cross-Attention 對齊音頻）',
                    '→ 線性 + Softmax',
                    '→ 自回歸生成下一個文字 token',
                    '輸出文字',
                  ].map((step, i) => (
                    <div key={i} className={`px-3 py-2 rounded-xl text-xs font-bold text-center whitespace-pre-line leading-tight
                      ${i === 0 || i === 5 ? 'bg-teal-100 text-teal-800' : 'bg-white border border-teal-100 text-gray-700'}`}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { title: '多任務訓練', desc: 'ASR（原語言逐字稿）+ 翻譯（翻成英文）+ 語言辨識，用特殊 token 區分任務', icon: '🎯' },
                { title: '弱監督數據', desc: '從網路上收集 680K 小時音頻-文字對，不需要人工精確對齊，用 Encoder-Decoder 自動學習', icon: '🌐' },
                { title: '多語言支援', desc: '99 種語言，包含普通話、台語（有限）。模型大小從 tiny (39M) 到 large-v3 (1.5B)', icon: '🌏' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <p className="text-xl mb-2">{item.icon}</p>
                  <p className="font-black text-gray-800 text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 實戰：LoRA Fine-tune Whisper */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-cyan-600" />
            <h2 className="text-3xl font-black text-gray-900">實戰：LoRA 微調 Whisper 識別特定領域</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Whisper 在通用語音上表現很好，但對於特定領域的術語（醫療、法律、工廠用語）辨識率會下降。
            用 LoRA 微調只需要少量標注音頻，就能大幅提升領域準確率。
          </p>

          <div className="bg-cyan-50 rounded-2xl p-5 border border-cyan-100">
            <p className="font-black text-cyan-800 mb-3 text-sm">適合用 LoRA 微調 Whisper 的場景</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                '工廠設備維修的語音下單系統（充滿型號、代碼）',
                '醫院病歷語音輸入（醫療術語、藥名）',
                '台語/客語/特定口音的辨識優化',
                '客服電話逐字稿（產品名稱、客訴用語）',
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-2 bg-white rounded-xl p-3 border border-cyan-100">
                  <span className="text-cyan-500 font-black shrink-0">→</span>
                  <span className="text-sm text-gray-700">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            title="LoRA 微調 Whisper 完整流程"
            lang="python"
            code={`from transformers import (
    WhisperForConditionalGeneration, WhisperProcessor,
    Seq2SeqTrainer, Seq2SeqTrainingArguments
)
from peft import get_peft_model, LoraConfig, TaskType
import torch

# ── 1. 載入模型與處理器 ──────────────────────────────────
model = WhisperForConditionalGeneration.from_pretrained(
    "openai/whisper-small",          # 可換成 medium / large
    torch_dtype=torch.float16,
)
processor = WhisperProcessor.from_pretrained("openai/whisper-small")

# ── 2. 套用 LoRA（只加在 Decoder 的 Q/V 投影上）──────────
lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.SEQ_2_SEQ_LM,
)
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable params: 884,736 / 241,734,912 (0.37%)

# ── 3. 準備數據集（假設已有 audio + transcript 對）────────
def preprocess(batch):
    audio = batch["audio"]["array"]
    # 轉換音頻為 Mel 頻譜輸入特徵
    inputs = processor(audio, sampling_rate=16000, return_tensors="pt")
    batch["input_features"] = inputs.input_features[0]
    # Tokenize 文字標籤
    batch["labels"] = processor.tokenizer(batch["sentence"]).input_ids
    return batch

# ── 4. 訓練 ─────────────────────────────────────────────
training_args = Seq2SeqTrainingArguments(
    output_dir="./whisper-lora-finetuned",
    per_device_train_batch_size=8,
    num_train_epochs=3,
    learning_rate=1e-3,          # LoRA 通常用比全量微調更高的 lr
    fp16=True,
    predict_with_generate=True,
)
trainer = Seq2SeqTrainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
)
trainer.train()

# ── 5. 合併 LoRA 權重並儲存 ─────────────────────────────
model = model.merge_and_unload()
model.save_pretrained("./whisper-lora-merged")`}
          />

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <p className="font-black text-amber-800 mb-2 text-sm">實務建議</p>
            <ul className="text-sm text-amber-700 space-y-1.5">
              <li>• 數據量：50–200 小時的領域音頻就能有顯著改善（相比全量微調需要更少）</li>
              <li>• 只微調 Decoder：Encoder 的聲學特徵提取已經很強，Decoder 是語言模型部分，更容易適配新詞彙</li>
              <li>• 用 whisper-small 或 whisper-medium 作起點；large-v3 效果最好但 GPU 需求也更高</li>
              <li>• 評估指標：WER（Word Error Rate），越低越好；中文用 CER（Character Error Rate）</li>
            </ul>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { emoji: '🧊', text: 'Full Fine-tuning 記憶體需求是模型本身的 3–4 倍，消費級 GPU 幾乎跑不起來。' },
                { emoji: '🔌', text: 'Adapter：在 Transformer 層後插入瓶頸網路（d→r→d），訓練時只更新插入的部分，推理有輕微額外開銷。' },
                { emoji: '🎯', text: 'LoRA：把 ΔW 分解為 B×A（低秩矩陣乘積），可訓練參數 < 1%，推理前可直接合併回 W₀，無推理開銷。' },
                { emoji: '⚡', text: 'QLoRA：4-bit 量化 + LoRA，讓消費級 GPU（24GB）能微調 70B 級別的模型。' },
                { emoji: '🎙️', text: 'ASR 演進：HMM → CTC → Seq2Seq Transformer → Whisper（680K 小時弱監督多任務訓練）。' },
                { emoji: '🔗', text: 'LoRA × Whisper：只需調整 0.37% 的參數，就能讓 Whisper 學會特定領域術語，是工業落地最實用的組合。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-teal-200 text-sm">
                下一篇 EP.08 把視野再拉大——從 TTS 的 Transformer 起點，延伸到 BERT、GPT 系列、RLHF、ChatGPT 的整個 LLM 演進史。
              </p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/ai/ep06-tts-edge-deploy" className="group block bg-gray-50 hover:bg-teal-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-teal-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-teal-600 transition-colors">EP.06 — 嵌入式落地實戰</p>
            <p className="text-sm text-gray-500 mt-1">模型壓縮、量化與邊緣部署</p>
          </Link>
          <Link href="/blog/ai/ep08-transformer-to-gpt" className="group block bg-gray-50 hover:bg-teal-50 transition-colors rounded-2xl p-6 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-teal-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-teal-600 transition-colors">EP.08 — 從 Transformer 到 ChatGPT</p>
            <p className="text-sm text-gray-500 mt-1">BERT、GPT、LLM 的演進史</p>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Fine-tuning', 'LoRA', 'Adapter', 'PEFT', 'QLoRA', 'ASR', 'Whisper', 'EP.07'].map((tag) => (
            <Chip key={tag} variant="flat" color="primary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
