import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  Clock,
  Eye,
  Quote,
  ArrowRight,
  Info,
  ShieldCheck,
  Server,
  Network,
  Cpu,
  FileCode2,
  AlertOctagon,
  CheckCircle2,
  CornerDownRight
} from 'lucide-react';

import Link from 'next/link';
import Script from 'next/script';
import BlogRelatedPosts from '@/components/blog/BlogRelatedPosts';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '什麼是 Air-gapped AI？ 從工廠內網 LLM 說起 | Joseph Chen',
  description: '為什麼有些企業的 AI 不能連網？什麼是隔離網路？ 從我在鴻海深圳廠的實際部署經驗說起',
  alternates: {
    canonical: 'https://chullin.tw/blog/ai/ep01-airgapped-intro',
  },
};

const InfoBox = ({ type, children }: { type: 'tip' | 'warning' | 'info'; children: React.ReactNode }) => {
  const styles = {
    tip: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' };
  return (
    <div className={`border rounded-2xl p-5 my-4 ${styles[type]}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
};

export default function AiEP01Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero / 標題區 */}
      <div className="relative h-[52vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(99,102,241,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <FadeIn>
            <div className="flex justify-center gap-2 mb-5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase text-[10px]">
                AI 離線部署
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase text-[10px]">
                EP.01
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              什麼是 Air-gapped AI？<br />
              <span className="text-purple-300">從工廠內網 LLM 說起</span>
            </h1>
            <p className="text-purple-200 text-lg font-medium max-w-2xl mx-auto">
              為什麼有些企業的 AI 不能連網？什麼是隔離網路？<br />
              從我在鴻海深圳廠的實際部署經驗說起
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
                <span>2025</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>12 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /> <span>實戰筆記</span></div>
          </div>
        </div>

        {/* 2. 這篇文章要解決什麼問題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-purple-600 pl-4">這篇文章要解決什麼問題</h2>
          <p className="text-gray-700 leading-relaxed font-medium">
            在生成式 AI (Generative AI) 爆發的時代，大多數開發者早已習慣直接呼叫 OpenAI、Claude 或 Gemini 等雲端 SaaS API。只要綁定信用卡、取得 API Key，幾行代碼就能建立一個強大的智能客服或知識助手。
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            但在製造業、金融業、智慧醫療或國防領域，事情完全不是這樣。想像一下，你手中有涉及新一代手機量產的機密良率報告、關鍵晶片的底層測試日誌，或是客戶極其私密的安全驗證憑證。如果將這些資料直接上傳到公有雲端 AI，哪怕服務商聲稱「不會用於模型訓練」，在合規與資安稽核面前也絕對是無法妥協的紅線。
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            因此，這些大型企業會要求核心開發環境與生產線網段必須與外界 Internet 徹底切斷，實行物理隔離。這在資安領域被稱為 <strong>Air-gap (氣隙隔離)</strong>。
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            這篇文章要探討的核心問題是：<strong>當我們失去了 `pip install`、`docker pull` 與外網 API 呼叫的便利後，要如何在一台物理隔離、沒有任何外網訊號的內網伺服器上，成功架設並運行起一個商用級的本地化 LLM 推論與 Orchestration 平台？</strong>
          </p>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 3. 真實案例或 Joseph 的經驗 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-purple-600 pl-4">真實案例與 Joseph 的現場經驗</h2>
          <p className="text-gray-700 leading-relaxed">
            2024 年，我加入鴻海深圳廠，接下了一個核心任務：在無聯網的自動化測試機房中部署一套能夠自主判讀異常 Log、提供 SOP 操作指引的本地 LLM 助手。
          </p>
          <p className="text-gray-700 leading-relaxed">
            我還記得第一天踏入該網段機房時的震撼：所有的伺服器主機皆沒有插上實體網線，無線網卡在 BIOS 階段就被直接禁用，甚至所有 USB 連接埠都被貼上了帶有警示字樣的物理封條。在這樣的環境下，任何一次的軟體部署都像是戴著鐐銬跳舞。
          </p>
          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 text-purple-950 space-y-3">
            <p className="font-bold">💡 現場血淚經驗：部署痛點不在 AI 模型，而在運維依賴</p>
            <p className="text-sm leading-relaxed">
              我一開始也以為部署 AI 不過就是把 llama3 跑起來，直到我被擋在第一關：沒有外網。我沒辦法直接跑 `pip install requests`。在有網路的辦公室寫好的程式，帶進生產線時，只因為少了一個極小的 C-binding 函式庫，整套系統就直接崩潰。
            </p>
            <p className="text-sm leading-relaxed">
              在這種極端的 Air-gapped 環境下，任何軟體與模型的移入都必須經過層層審批：首先在有限度聯網的「開發機」下載所有的套件 Wheels 與 Docker 映像檔，經過公司的多重毒性掃描與人工代碼稽核後，打包成大壓縮檔，再透過特許的內部網路安全通道（跳板伺服器）單向傳輸進生產內網。
            </p>
            <p className="text-sm leading-relaxed font-semibold">
              這段經歷讓我深刻體會到：在工廠端部署 AI，核心阻礙往往不是演算法的精準度，而是如何確保系統在零外網依賴下，依然具備 100% 的健壯度與可運維性。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 4. 核心概念解釋 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-purple-600 pl-4">核心概念解釋：氣隙網絡 (Air-gap) 的架構</h2>
          <p className="text-gray-700 leading-relaxed">
            要做到物理隔離，企業內部通常會將網段切分為不同的信任等級。典型的製造業工廠網段拓撲如下：
          </p>

          {/* Flowchart 區塊 - 使用 Tailwind 繪製 */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 my-6">
            <p className="text-sm font-black text-slate-400 uppercase tracking-wider mb-6 text-center">Air-Gapped AI 部署流程與拓撲架構</p>
            
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 relative">
              {/* Step 1 */}
              <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs font-black text-purple-600 uppercase">Step 01 / 辦公網段</span>
                  <h4 className="font-black text-slate-800 text-sm mt-1 mb-2">Office Network</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">可正常存取外網。在此下載所需的 Python Wheel 依賴套件、Docker 映像檔，以及開源模型權重 (.gguf)。</p>
                </div>
                <div className="mt-4 text-xs font-bold text-slate-400 border-t pt-2 bg-slate-50/50 -mx-5 -mb-5 p-3 rounded-b-2xl">
                  💾 輸出轉存離線壓縮包
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center md:rotate-0 rotate-90 text-purple-300">
                <ArrowRight size={24} />
              </div>

              {/* Step 2 */}
              <div className="flex-1 bg-purple-50 p-5 rounded-2xl border border-purple-200 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs font-black text-purple-700 uppercase">Step 02 / 資安審查</span>
                  <h4 className="font-black text-purple-900 text-sm mt-1 mb-2">Security Gate</h4>
                  <p className="text-xs text-purple-700 leading-relaxed">將打包的壓縮包與模型檔案送交資安團隊。執行 MD5 校驗、木馬毒性掃描與防洩密檢查，通過後傳送至特許跳板機。</p>
                </div>
                <div className="mt-4 text-xs font-bold text-purple-700 border-t pt-2 bg-purple-100/50 -mx-5 -mb-5 p-3 rounded-b-2xl">
                  🛡️ 雙重簽章與 MD5 驗證
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center md:rotate-0 rotate-90 text-purple-300">
                <ArrowRight size={24} />
              </div>

              {/* Step 3 */}
              <div className="flex-1 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-lg text-white">
                <div>
                  <span className="text-xs font-black text-purple-400 uppercase">Step 03 / 生產網段</span>
                  <h4 className="font-black text-white text-sm mt-1 mb-2">Production (Air-gapped)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">完全斷網。使用特許傳入的離線資源包，安裝 Python Wheels，載入本地 Docker 鏡像，拉起本地 Ollama 推論引擎。</p>
                </div>
                <div className="mt-4 text-xs font-bold text-purple-300 border-t border-slate-800 pt-2 bg-slate-950 -mx-5 -mb-5 p-3 rounded-b-2xl">
                  🔒 物理隔離，100% 本地推論
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            在有網路的 Office Net 裡，我們能輕易進行軟體組裝；一旦要把程式搬移到完全斷網的 Production Net，就必須提前將以下三大核心資源進行「靜態化」與「離線打包」：
          </p>
          <ul className="space-y-3 pl-6 text-gray-700 list-disc">
            <li><strong>運行庫依賴 (Runtime Dependencies)</strong>：所有的 Python `.whl` 封裝，需包含底層的 C 延伸模組。</li>
            <li><strong>運行環境 (Runtime Environment)</strong>：包含基礎的 Docker base images、Ollama 二進位檔、及相關後台資料庫。</li>
            <li><strong>AI 模型權重 (Model Weights)</strong>：一般為預先量化好的 GGUF 格式。量化不僅能壓縮體積，更大幅降低了對生產線伺服器顯示卡記憶體 (VRAM) 的硬體要求。</li>
          </ul>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 5. 程式碼範例 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-purple-600 pl-4">程式碼實戰：從線上安裝到離線打包自動化</h2>
          <p className="text-gray-700 leading-relaxed">
            以下我們用程式碼來展示兩者的差距。第一段是開發階段常見的「直覺寫法」，這在離線環境會直接觸發網路連線錯誤；第二段則是我們實際採用的「離線分階段自動化打包腳本」。
          </p>

          <div className="space-y-4">
            <p className="font-bold text-red-600 flex items-center gap-1.5">
              <AlertOctagon size={18} /> 錯誤的寫法：依賴外部即時下載與 API 呼叫（離線環境直接崩潰）
            </p>
            <pre className="bg-slate-950 text-slate-100 p-5 rounded-2xl overflow-x-auto text-xs leading-relaxed font-mono">
{`# ❌ 在生產線執行此腳本會直接 Crash，因為無法與 PyPI 或 Docker Hub 建立連線
import os
import requests

# 1. 現場嘗試線上安裝缺失套件
# os.system("pip install requests langchain langchain-community") 
# ConnectionTimeoutError: Failed to establish a new connection...

# 2. 嘗試呼叫外部公有雲 API
def call_online_llm(prompt):
    api_key = "sk-xxxxxxxxxxxxxxxxxxxxxxxx"
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-4o",
        "messages": [{"role": "user", "content": prompt}]
    }
    
    # 這裡在 Air-gapped 環境下會直接丟出 ConnectionError
    response = requests.post(url, headers=headers, json=data, timeout=5)
    return response.json()

if __name__ == "__main__":
    try:
        res = call_online_llm("分析當前工廠測試機台異常日誌")
        print(res)
    except Exception as e:
        print(f"❌ 部署失敗：找不到外部網絡連接。錯誤詳情: {e}")`}
            </pre>
          </div>

          <div className="space-y-4">
            <p className="font-bold text-green-600 flex items-center gap-1.5">
              <CheckCircle2 size={18} /> 改良後寫法：分階段下載、本地加載模型與離線部署自動化
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              我們將整個部署拆分為「有網開發機」的下載腳本，與「無網生產機」的本地安裝載入腳本：
            </p>
            <pre className="bg-slate-950 text-slate-100 p-5 rounded-2xl overflow-x-auto text-xs leading-relaxed font-mono">
{`# 🚀 步驟一：【在有網路的 Office 開發機執行】下載腳本
# download_assets.sh
# ----------------------------------------------------
# 1. 下載所有 Python wheels（包含所有子依賴，強制使用 binary 避免現場編譯）
# pip download -d ./offline_wheels -r requirements.txt --only-binary=:all:
#
# 2. 拉取並保存 Docker 映像檔
# docker pull ollama/ollama:latest
# docker save -o ollama_image.tar ollama/ollama:latest

# 🚀 步驟二：【在無網路的 Air-gapped 生產機執行】本地加載與推論 Python 腳本
# run_local_llm.py
# ----------------------------------------------------
import subprocess
import os
from openai import OpenAI

def init_offline_environment():
    print("📦 正在執行本地依賴包離線安裝...")
    # 在生產主機本地安裝準備好的 wheels，不連網且忽略 index
    # subprocess.run(["pip", "install", "--no-index", "--find-links=./offline_wheels", "-r", "requirements.txt"])
    
    print("🐳 正在導入離線 Docker 映像檔...")
    # subprocess.run(["docker", "load", "-i", "ollama_image.tar"])
    
    print("✅ 本地運維環境就緒。")

# 使用 Ollama Modelfile 載入特許搬入的本地 GGUF 模型檔
# 本地 Modelfile 內容：
# FROM /app/models/qwen2.5-7b-instruct.gguf
# PARAMETER temperature 0.3
# SYSTEM "你是一位精通半導體測試機台日誌分析的資深助理。"

def run_local_inference(prompt):
    # 呼叫已經在生產網伺服器背景運行起的本地 Ollama 服務 (127.0.0.1:11434)
    client = OpenAI(
        base_url="http://127.0.0.1:11434/v1",
        api_key="ollama" # 本地推論無須外網金鑰
    )
    
    response = client.chat.completions.create(
        model="qwen2.5-7b-custom",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    # 模擬本地初始化與離線推論
    # init_offline_environment()
    
    log_sample = "ERR 2026-05-19 22:15:50 [SYS] Serial port write timeout on controller board XY-04."
    print("🤖 送出分析日誌請求...")
    analysis = run_local_inference(f"請分析以下機台錯誤並給出除錯建議：\\n{log_sample}")
    print("\\n=== 本地 AI 分析結果 ===")
    print(analysis)`}
            </pre>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 6. 技術比較表 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-purple-600 pl-4">技術方案比較</h2>
          <p className="text-gray-700 leading-relaxed">
            不同 AI 部署方案在開發效率、安全合規與維護成本上各有優劣，以下為實戰經驗整理：
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-black">部署方案</th>
                  <th className="px-6 py-4 font-black">優點</th>
                  <th className="px-6 py-4 font-black">缺點</th>
                  <th className="px-6 py-4 font-black">適合場景</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-gray-900">雲端 SaaS API (OpenAI)</td>
                  <td className="px-6 py-4 text-green-700">免硬體成本、開發極快、模型能力最強</td>
                  <td className="px-6 py-4 text-red-700">資料外洩風險高、依賴外網穩定性、費用高</td>
                  <td className="px-6 py-4 text-slate-700">新創產品驗證、無隱私限制的公開業務</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-gray-900">企業內網/私有雲部署</td>
                  <td className="px-6 py-4 text-green-700">資料不出企業網、能與內部帳號 SSO 整合</td>
                  <td className="px-6 py-4 text-red-700">需自備高階 GPU 伺服器、內部網路需打通通道</td>
                  <td className="px-6 py-4 text-slate-700">一般企業內部的 ERP、HR 助手、內部文件庫</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-gray-900">物理隔離 (Air-gapped) 本地部署</td>
                  <td className="px-6 py-4 text-green-700">100% 防止資料外洩、極高資安合規、免授權費</td>
                  <td className="px-6 py-4 text-red-700">初次部署門檻極高、無法自動更新、資源受限</td>
                  <td className="px-6 py-4 text-slate-700">智慧工廠生產線、核心金融系統、國家防務</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 7. 常見錯誤與踩坑 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-purple-600 pl-4">常見錯誤與踩坑實錄</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-2xl mt-1">🔴</span>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">只用 `pip download` 下載源碼卻缺少編譯工具</h4>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  我第一次打包 Python 套件時，直接執行了下載。到現場才發現，某些套件在安裝時需要呼叫本機的 `gcc` 或 `make` 來編譯 C 語言擴充模組。但生產線伺服器是最小化安裝版（Minimal OS），根本沒有編譯環境。
                  <br />
                  <strong>正解：</strong> 必須在下載時加上 `--only-binary=:all:` 參數，強迫下載預先編譯好的二進位 Wheel 檔。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl mt-1">🔴</span>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">容器內外時區不同步導致憑證過期</h4>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  在隔離環境下，我們部署了 Dify 容器。結果有些 API 呼叫本地資料庫時一直報錯。最後排查才發現，宿主機時區是 UTC+8，但 Docker 容器預設採用 UTC 時區。由於時間相差 8 小時，觸發了內部安全憑證的逾期保護機制。
                  <br />
                  <strong>正解：</strong> 在 Docker Compose 的 `volumes` 中，將本機的 `/etc/localtime` 單向掛載進容器中，強制時區一致。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl mt-1">🔴</span>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">未作大模型檔案的雜湊值校驗 (Checksum)</h4>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  有一次搬運一個 14B 的 GGUF 大模型（約 9GB）。傳入工廠內網後，Ollama 載入時一直拋出 `segmentation fault` 核心崩潰。查了半天程式，最後才發現是隨身碟因多次插拔損壞，導致寫入的檔案少了幾個 bytes。
                  <br />
                  <strong>正解：</strong> 在 Office 網段打包時，先計算檔案的 MD5 雜湊值（`md5sum model.gguf`）。搬運進生產伺服器後，必須重新計算比對，一致才允許運行。
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 8. 實務建議 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-purple-600 pl-4">實務操作建議</h2>
          <p className="text-gray-700 leading-relaxed">
            要在 Air-gapped 環境長期維持 AI 系統穩定，建議將以下工作寫入維運標準 SOP：
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 text-purple-600 p-1.5 rounded-lg mt-0.5"><ShieldCheck size={16} /></div>
              <div>
                <p className="font-bold text-gray-900">建立私有離線倉庫鏡像 (Private Mirror)</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">當工廠端規模擴大時，頻繁用隨身碟搬運 wheel 檔極易出錯。建議在工廠的特許中繼網段架設內部 Nexus Repository 或 PyPI 私有鏡像，統一集中管理依賴版本。</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-purple-100 text-purple-600 p-1.5 rounded-lg mt-0.5"><Server size={16} /></div>
              <div>
                <p className="font-bold text-gray-900">一鍵 Compose 化部署與備份</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">生產線伺服器不容許繁雜的手動設定。務必使用 Docker Compose 將 Ollama、Dify、PostgreSQL、Redis 整套架構服務容器化，並實作一鍵啟動與狀態定期備份腳本。</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-purple-100 text-purple-600 p-1.5 rounded-lg mt-0.5"><Network size={16} /></div>
              <div>
                <p className="font-bold text-gray-900">模型與業務代碼分離 (Model Decoupling)</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">不要將 GGUF 權重檔包進業務 Docker image。應透過磁碟路徑掛載將模型目錄映射進推論容器，未來模型升級（如從 Qwen-7B 升級到 Qwen-14B）時，只需替換檔案並重啟 Ollama，不需重新構建映像檔。</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 9. 與本系列其他文章的關聯 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-purple-600 pl-4">與本系列其他文章的關聯</h2>
          <p className="text-gray-700 leading-relaxed">
            這篇文章是整個「AI 離線實戰系列」的開篇。當你理解了隔離網路的運維限制後，接下來我們將進入更具體的實作章節：
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog/ai/ep02-ollama-local-llm" className="group p-5 bg-slate-50 hover:bg-purple-50 rounded-2xl border border-slate-100 transition-all flex flex-col justify-between">
              <div>
                <p className="text-xs font-black text-purple-600 mb-1">系列下一篇 EP.02</p>
                <h4 className="font-black text-gray-900 text-sm group-hover:text-purple-600 transition-colors">Ollama 本地模型部署</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">深入探討如何離線管理 GGUF、撰寫 Modelfile，以及針對不同硬體進行 GPU 參數調優。</p>
              </div>
              <span className="text-[10px] font-black text-purple-500 mt-4 flex items-center gap-1">
                開始閱讀 <ArrowRight size={10} />
              </span>
            </Link>

            <Link href="/blog/ai/ep09-tms" className="group p-5 bg-slate-50 hover:bg-purple-50 rounded-2xl border border-slate-100 transition-all flex flex-col justify-between">
              <div>
                <p className="text-xs font-black text-purple-600 mb-1">應用結合實戰 EP.09</p>
                <h4 className="font-black text-gray-900 text-sm group-hover:text-purple-600 transition-colors">TMS 測試管理系統重構</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">分享我們如何將這套離線 AI 能力，以安全合規的方式嵌入到工廠底層的核心測試排程管理系統中。</p>
              </div>
              <span className="text-[10px] font-black text-purple-500 mt-4 flex items-center gap-1">
                開始閱讀 <ArrowRight size={10} />
              </span>
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/blog/ai/ep03-dify" className="text-purple-600 hover:text-purple-700 text-sm font-bold flex items-center gap-1">
              <CornerDownRight size={14} /> 延伸閱讀：EP.03 — Dify 知識庫建立與 RAG 工作流整合
            </Link>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 10. 總結 */}
        <section>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-purple-400" />
              <h2 className="text-2xl font-black text-gray-900">總結</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed font-medium">
              <p>
                物理隔離 (Air-gapped) 並不代表與現代技術絕緣。相反地，它迫使我們回到軟體工程的底層邏輯，以更清晰、低耦合的方式進行架構設計。
              </p>
              <p>
                透過離線包預編譯、Docker 鏡像映射以及本地 Ollama 引擎，我們不僅在無網的工廠深處順利跑起了大模型，更建立了一套符合企業資安紅線的 AI 運維架構。這套經驗除了適用於製造業，對隱私要求極高的金融與醫療產業同樣有高度參考價值。
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50" />

        {/* Related Posts */}
        <BlogRelatedPosts currentPostHref="/blog/ai/ep01-airgapped-intro" category="ai" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 pt-10">
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-400 italic">這是系列的第一篇</p>
          </div>
          <Link href="/blog/ai/ep02-ollama-local-llm" className="group block bg-gray-50 hover:bg-purple-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">EP.02 — Ollama 本地模型部署</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['AI 離線部署', 'Air-gapped', 'LLM', 'Ollama', 'Dify', '企業 AI', 'EP.01'].map((tag) => (
            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{tag}</span>
          ))}
        </div>
      </article>

      {/* Structured Data for SEO */}
      <Script id="blog-json-ld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "AI 離線部署系列 EP.01：架構簡介與環境整備",
          "description": "探討在無網路環境下（Air-gapped）部署 AI 模型的技術挑戰與解決方案。第一篇：基礎架構與硬體評估。",
          "author": {
            "@type": "Person",
            "name": "陳憲億 Joseph Chen"
          },
          "datePublished": "2024-03-20",
          "image": "https://chullin.tw/assets/profile3.webp",
          "publisher": {
            "@type": "Organization",
            "name": "Joseph Chen Portfolio",
            "logo": {
              "@type": "ImageObject",
              "url": "https://chullin.tw/favicon.ico"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://chullin.tw/blog/ai/ep01-airgapped-intro"
          }
        })}
      </Script>
    </div>
  );
}
