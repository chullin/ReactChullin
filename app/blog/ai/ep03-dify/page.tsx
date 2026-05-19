import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  Clock,
  Eye,
  Quote,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dify 工作流程設計 在本地 LLM 前加 Orchestration 層 | Joseph Chen',
  description: 'No-code AI Pipeline、Knowledge Base、Agent 串接 打造可控的企業級 AI 應用',
  alternates: {
    canonical: 'https://chullin.tw/blog/ai/ep03-dify',
  },
};



const nodeTypes = [
  { label: 'Start', color: 'bg-emerald-100 border-emerald-300 text-emerald-800', desc: '工作流的起點，定義輸入變數與使用者傳入的資料格式。' },
  { label: 'LLM 節點', color: 'bg-purple-100 border-purple-300 text-purple-800', desc: '呼叫語言模型（Ollama / OpenAI / Claude），傳入 Prompt 並取得回應。' },
  { label: 'Knowledge Base（RAG）', color: 'bg-blue-100 border-blue-300 text-blue-800', desc: '向量資料庫相似度搜尋，把相關段落注入 LLM 上下文。' },
  { label: 'IF / ELSE', color: 'bg-yellow-100 border-yellow-300 text-yellow-800', desc: '條件分支，根據前一節點輸出決定流程走向。' },
  { label: 'Code（Python / JS）', color: 'bg-orange-100 border-orange-300 text-orange-800', desc: '執行自訂程式邏輯，做資料清洗、格式轉換、計算等。' },
  { label: 'Answer', color: 'bg-rose-100 border-rose-300 text-rose-800', desc: '工作流終點，把結果回應給使用者或呼叫端 API。' },
];

const qaList = [
  {
    q: '什麼是 RAG？為什麼 LLM 需要它？',
    a: 'RAG（Retrieval-Augmented Generation）是在 LLM 推論前先從外部知識庫搜尋相關文本，把它塞進 Prompt 一起送給模型。這解決了兩個核心問題：① LLM 訓練截止日期後的新知識無法回答；② 企業私有資料（合約、SOP、內部文件）不可能出現在公開訓練資料裡。有了 RAG，LLM 就能「讀」你的私有知識庫再回答。',
  },
  {
    q: 'Dify 的 Workflow 和 Agent 模式有何不同？',
    a: 'Workflow 是「確定性流程」——你事先設計好每個步驟，輸入進去就照著跑，輸出可預測、可重現，適合文件摘要、格式轉換等一次性任務。Agent 是「自主決策」——你給它一個目標和一組工具（搜尋、計算、API 呼叫），它自己決定要用哪個工具、用幾次、按什麼順序，適合複雜、多步驟的開放性問題。簡單說：Workflow = 流水線；Agent = 自動駕駛。',
  },
  {
    q: '如何評估 RAG 系統的品質？',
    a: '主要看兩個指標：① 召回率（Recall）——相關的段落有沒有被撈出來，如果召回率低，LLM 拿不到足夠資訊就會亂答。② 精確率（Precision）——撈出來的段落有多少是真的相關，如果 Precision 低會塞入太多雜訊。實務上還會加上 Answer Faithfulness（最終回答和撈出的資料是否一致，偵測幻覺）和 Answer Relevance（回答和問題的相關性）。',
  },
  {
    q: '在離線 / 隔離環境部署 Dify + Ollama 需要準備什麼？',
    a: '① 提前在有網路的機器用 docker pull 把所有需要的 image 拉下來（dify-api, dify-web, postgres, redis, weaviate/qdrant）；② 用 docker save 打包成 .tar，搬到離線環境後 docker load；③ Ollama 安裝檔和模型檔（~/.ollama/models/）同樣要預先打包搬入；④ 在 Dify 的設定頁面把 LLM Provider 指向 Ollama 的內網 IP + Port；⑤ 確認向量資料庫（Weaviate / Qdrant）的 compose 設定正確，知識庫功能才能用。',
  },
];

const dockerComposeCode = `version: '3'
services:
  dify-api:
    image: langgenius/dify-api:latest
    environment:
      - SECRET_KEY=your-secret-key
      - DB_USERNAME=postgres
      - DB_PASSWORD=difyai123456
      - DB_HOST=db
      - REDIS_HOST=redis
      - VECTOR_STORE=weaviate
    depends_on:
      - db
      - redis

  dify-web:
    image: langgenius/dify-web:latest
    ports:
      - "3000:3000"
    environment:
      - CONSOLE_API_URL=http://localhost:5001

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=difyai123456
      - POSTGRES_DB=dify

  redis:
    image: redis:alpine
    command: redis-server --requirepass difyai123456`;

const systemPromptCode = `# 角色定義
你是一名工廠設備維護助理，專門協助工程師查詢設備 SOP 與故障排查。

# 行為規範
- 只回答與設備維護、操作規範相關的問題
- 若知識庫沒有相關資料，明確告知使用者「資料庫無此資訊」，不要猜測
- 回答使用繁體中文，技術術語保留英文原文

# 輸出格式
1. 直接回答問題（2–3 句）
2. 若有 SOP 步驟，用編號清單呈現
3. 附上知識庫來源文件名稱

# 可用變數
- {{user_name}}：呼叫者姓名
- {{equipment_id}}：設備編號
- {{context}}：知識庫檢索結果（自動注入）`;

export default function AiEP03Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-violet-700 to-fuchsia-700">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 65% 35%, rgba(192,132,252,0.5) 0%, transparent 60%), radial-gradient(ellipse at 25% 75%, rgba(217,70,239,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <FadeIn>
            <div className="flex justify-center gap-2 mb-5">
              <span   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-purple-500/20 text-purple-200 border-purple-400/30 font-bold uppercase text-[10px]">
                AI 離線部署
              </span>
              <span   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-fuchsia-500/20 text-purple-200 border-fuchsia-400/30 font-bold uppercase text-[10px]">
                EP.03
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Dify 工作流程設計<br />
              <span className="text-purple-200">在本地 LLM 前加 Orchestration 層</span>
            </h1>
            <p className="text-purple-200 text-lg font-medium max-w-2xl mx-auto">
              No-code AI Pipeline、Knowledge Base、Agent 串接<br />
              打造可控的企業級 AI 應用
            </p>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 text-purple-600 p-2.5 rounded-full">
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
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>14 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /> <span>實戰筆記</span></div>
          </div>
        </div>

        {/* Opening Quote */}
        <section>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-l-4 border-l-purple-500 bg-purple-50 shadow-none rounded-2xl">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <Quote size={28} className="text-purple-400 shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed text-lg italic font-medium">
                  部署了 Ollama 之後，我發現直接讓使用者跟 LLM 對話其實很危險——你無法控制輸入，也無法保證輸出格式。
                  Dify 就是在這中間加了一層：讓 AI 的行為變得可以設計、可以監控、可以迭代。
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 1: Dify 是什麼 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Dify 是什麼？</h2>
          <p className="text-gray-700 leading-relaxed">
            Dify 是一個開源的 LLM Application Platform，讓你可以用視覺化介面設計 AI 應用，
            而不需要從零開始寫 Prompt Engineering 框架、串接 RAG 管道、管理對話記憶體。
            它是 Ollama 的最佳搭檔——一個負責跑模型，一個負責控制模型的行為。
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🧩',
                title: 'LLM Orchestration',
                desc: '把提示詞、工具、資料庫包成一個可視化工作流，讓 AI 的行為可以設計、版本控制、A/B 測試。',
                color: 'bg-purple-50 border-purple-100',
              },
              {
                icon: '🖱️',
                title: 'No-code 設計',
                desc: '拖拉節點連線，非工程師也能建立 AI 應用。提示詞修改不需要重新部署程式碼。',
                color: 'bg-fuchsia-50 border-fuchsia-100',
              },
              {
                icon: '🔗',
                title: '支援多個 LLM',
                desc: 'OpenAI / Ollama / Claude / Gemini 統一介面管理，切換模型只需改一個設定，程式碼不變。',
                color: 'bg-violet-50 border-violet-100',
              },
            ].map((item) => (
              <div key={item.title} className={`border rounded-2xl p-5 ${item.color}`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-black text-gray-900 mb-2">{item.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 2: 核心架構概念 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">核心架構概念</h2>
          <p className="text-gray-700 leading-relaxed">
            Dify 的工作流是由「節點（Node）」組成的有向圖。資料從 Start 節點流入，
            經過各類處理節點，最終由 Answer 節點輸出結果。每個節點的輸出可以作為下一個節點的輸入。
          </p>

          {/* Flow diagram */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">工作流示意圖</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {['用戶輸入', '前處理節點', 'LLM 節點', '後處理 / 條件節點', '輸出'].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2 text-sm font-bold text-gray-700 whitespace-nowrap">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-gray-400 font-bold text-lg">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed font-medium">Dify 提供以下幾類核心節點：</p>
          <div className="space-y-3">
            {nodeTypes.map((node) => (
              <div key={node.label} className={`border rounded-xl px-5 py-4 flex items-start gap-4 ${node.color}`}>
                <span className="font-black text-sm shrink-0 pt-0.5">{node.label}</span>
                <span className="text-sm leading-relaxed">{node.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 3: Knowledge Base / RAG */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Knowledge Base（知識庫 / RAG）</h2>

          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <strong>RAG（Retrieval-Augmented Generation）</strong> 是現代企業 AI 應用的核心技術。
              原理是：不改動 LLM 本身，而是在每次推論前先去「查資料」，把查到的相關段落塞進 Prompt，
              讓模型帶著「參考資料」回答問題。
            </p>
          </div>

          {/* RAG Flow */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">RAG 完整流程</p>
            <div className="space-y-2">
              {[
                { step: '建庫', label: '文件 → 分塊（Chunking）→ 向量化（Embedding）→ 存入向量資料庫' },
                { step: '查詢', label: '使用者問題 → 向量化 → 相似度搜尋（Cosine Similarity）→ 取前 K 個相關段落' },
                { step: '生成', label: '相關段落 + 使用者問題 → 組合成 Prompt → 送給 LLM → 回答' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white text-xs font-black px-2 py-1 rounded-md shrink-0 mt-0.5">{item.step}</span>
                  <span className="text-sm text-blue-900 leading-relaxed">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
              <p className="font-black text-gray-800">Dify 支援的文件格式</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {['PDF', 'Word（.docx）', 'TXT / Markdown', 'HTML（網頁直接匯入）', 'Web Scraping（爬蟲抓取）'].map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-purple-500 font-bold">•</span>{f}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-3">
              <p className="font-black text-gray-800">為什麼需要 RAG？</p>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  'LLM 有訓練截止日期，無法知道最新資訊',
                  '企業私有資料不在公開訓練資料裡',
                  'Hallucination 減少：有原文依據，比亂猜準確',
                  '可追溯來源，提升回答可信度',
                ].map((r) => (
                  <li key={r} className="flex items-start gap-2"><span className="text-purple-500 font-bold shrink-0 mt-0.5">•</span>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 4: 三種常用應用類型 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">實戰：三種常用應用類型</h2>
          <div className="space-y-4">
            {[
              {
                icon: '💬',
                title: 'Chatbot（對話機器人）',
                color: 'bg-purple-50 border-purple-100',
                badge: 'bg-purple-100 text-purple-700',
                badgeText: '有記憶',
                points: [
                  '支援多輪對話，Dify 自動管理對話歷史（Memory）',
                  'System Prompt 控制角色定位與行為邊界',
                  '適合：客服機器人、知識問答助手、內部 FAQ Bot',
                ],
              },
              {
                icon: '⚙️',
                title: 'Workflow（工作流）',
                color: 'bg-violet-50 border-violet-100',
                badge: 'bg-violet-100 text-violet-700',
                badgeText: '一次性任務',
                points: [
                  '輸入進去，按照設計的節點流程跑，輸出結果',
                  '確定性強、可重現，輸出格式固定',
                  '適合：文件摘要、多語翻譯、格式轉換、資料抽取',
                ],
              },
              {
                icon: '🤖',
                title: 'Agent（自主代理）',
                color: 'bg-fuchsia-50 border-fuchsia-100',
                badge: 'bg-fuchsia-100 text-fuchsia-700',
                badgeText: '自主決策',
                points: [
                  '能使用工具（Web 搜尋、計算機、自訂 API）',
                  'LLM 自主決定要呼叫哪個工具、呼叫幾次',
                  '適合：複雜研究任務、多步驟自動化、需要即時資料的場景',
                ],
              },
            ].map((item) => (
              <div key={item.title} className={`border ${item.color} shadow-none`}>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-black text-gray-900 text-lg">{item.title}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.badge}`}>{item.badgeText}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {item.points.map((p) => (
                      <li key={p} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-purple-400 font-bold shrink-0 mt-0.5">→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 5: 離線環境部署 Dify */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">離線環境部署 Dify</h2>
          <p className="text-gray-700 leading-relaxed">
            Dify 官方提供 Docker Compose 部署方式，在離線環境下只需提前把 image 打包好搬進去即可。
            以下是 docker-compose.yml 的核心片段：
          </p>

          <CodeBlock lang="json" code={dockerComposeCode} title="docker-compose.yml（重點片段）" />

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
            <p className="font-black text-amber-800">離線部署注意事項</p>
            <ul className="space-y-2 text-sm text-amber-900">
              {[
                '提前在有網路的機器用 docker pull 拉取所有 image，再用 docker save 打包成 .tar',
                '離線環境用 docker load 載入 .tar 後再執行 docker compose up',
                '在 Dify 的 Settings → Model Providers 頁面，把 LLM 指向 Ollama 內網 IP（例如 http://192.168.1.100:11434）',
                '向量資料庫（Weaviate / Qdrant）的 compose 設定需正確，否則 Knowledge Base 功能無法使用',
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="bg-amber-400 text-white text-xs font-black w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 6: Prompt Engineering */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Prompt Engineering 關鍵技巧</h2>
          <p className="text-gray-700 leading-relaxed">
            在 Dify 裡，System Prompt 是控制 AI 行為的核心。一個結構良好的 System Prompt 能讓模型的回應更穩定、
            更符合預期。以下是我在實務中常用的模板結構：
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-2">
            {[
              { label: '角色定義', desc: '告訴模型它是誰、能做什麼、不能做什麼', color: 'bg-purple-50 border-purple-100 text-purple-800' },
              { label: '行為規範', desc: '設定邊界：不回答範圍外的問題，不猜測，引用來源', color: 'bg-violet-50 border-violet-100 text-violet-800' },
              { label: '輸出格式', desc: '指定回答結構（段落 / 清單 / JSON），確保輸出可被解析', color: 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-800' },
            ].map((item) => (
              <div key={item.label} className={`border rounded-xl p-4 ${item.color}`}>
                <p className="font-black text-sm mb-1">{item.label}</p>
                <p className="text-xs leading-relaxed opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock lang="json" code={systemPromptCode} title="system-prompt-template.txt" />

          <p className="text-gray-600 text-sm leading-relaxed">
            注意 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-purple-700">{'{{context}}'}</code> 和{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-purple-700">{'{{user_name}}'}</code>{' '}
            這類變數由 Dify 在執行時動態注入，不需要手動填。Knowledge Base 的搜尋結果也會自動綁定到 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-purple-700">{'{{context}}'}</code>。
          </p>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* Section 7: 面試常考題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">面試常考題</h2>
          <div className="space-y-4">
            {qaList.map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-gray-100 shadow-sm rounded-2xl">
                <div className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-purple-600 text-white text-xs font-black w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5">Q</span>
                    <p className="font-black text-gray-900">{item.q}</p>
                  </div>
                  <div className="flex items-start gap-3 pl-9">
                    <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section>
          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-purple-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '🧩', text: 'Dify 是 Ollama 的最佳搭檔——Ollama 跑模型，Dify 控制模型行為，把 AI 應用變得可設計、可監控' },
                { emoji: '📚', text: 'RAG 解決了 LLM 的兩大核心問題：訓練截止日期限制 + 企業私有資料無法存取' },
                { emoji: '⚙️', text: 'Workflow = 確定性流水線；Agent = 自主決策代理；Chatbot = 帶記憶的多輪對話' },
                { emoji: '🔒', text: '離線部署關鍵：提前 docker save 打包所有 image，搬入後 docker load，再把 Ollama endpoint 指向內網 IP' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50"  />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/ai/ep02-ollama-local-llm" className="group block bg-gray-50 hover:bg-purple-50 transition-colors rounded-2xl p-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">EP.02 — Ollama 本地 LLM 部署</p>
            <p className="text-sm text-gray-500 mt-1">含離線環境搬檔教學</p>
            <ArrowLeft size={18} className="mt-3 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </Link>
          <Link href="/blog/ai/ep04-transformer-tts" className="group block bg-gray-50 hover:bg-purple-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">EP.04 — Transformer TTS</p>
            <p className="text-sm text-gray-500 mt-1">語音合成架構原理</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Dify', 'RAG', 'LLM', 'Ollama', 'AI', 'Orchestration', 'EP.03'].map((tag) => (
            <span key={tag}   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-bold">{tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
}
