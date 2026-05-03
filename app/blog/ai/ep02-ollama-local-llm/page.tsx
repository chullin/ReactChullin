'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, Clock, Eye, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

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

export default function AiEP02Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 60% 40%, rgba(168,85,247,0.5) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(99,102,241,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-purple-500/20 text-purple-300 border-purple-500/30 font-bold uppercase text-[10px]">
                AI 離線部署
              </Chip>
              <Chip size="sm" variant="flat" className="bg-purple-500/20 text-purple-300 border-purple-500/30 font-bold uppercase text-[10px]">
                EP.02
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Ollama 本地 LLM 部署全攻略<br />
              <span className="text-purple-300">含離線環境搬檔教學</span>
            </h1>
            <p className="text-purple-200 text-lg font-medium max-w-2xl mx-auto">
              從安裝 Ollama 到在本地跑第一個推論，<br />
              再到如何在完全沒有網路的工廠環境部署模型
            </p>
          </motion.div>
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

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            上一篇說了 Air-gapped 是什麼、工廠為什麼需要離線 AI。這篇進入實作：
            <strong>如何用 Ollama 在本地跑 LLM，以及如何在完全離線的環境部署。</strong>
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Ollama 是目前最方便的本地 LLM 執行工具，一個指令就能跑起 Llama 3、Qwen2、Gemma 2 等主流開源模型。
            但在離線環境裡，這個「一個指令」背後的準備工作需要仔細規劃。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* Ollama 是什麼 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Ollama 是什麼？</h2>
          <p className="text-gray-700 leading-relaxed">
            Ollama 是一個開源工具，讓你可以在本地機器上直接執行大型語言模型。
            它把模型管理、量化、推論引擎全部包裝好，提供一個類似 Docker 的使用體驗。
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '📦', title: '模型管理', desc: '用 pull/list/rm 管理本地模型，和 docker 指令幾乎一樣直覺。', color: 'bg-purple-50 border-purple-100' },
              { icon: '⚡', title: '高效推論', desc: '底層用 llama.cpp，支援 CPU 和 GPU 加速，GGUF 格式模型量化後記憶體需求大幅降低。', color: 'bg-blue-50 border-blue-100' },
              { icon: '🔌', title: 'OpenAI 相容 API', desc: '提供 REST API，格式與 OpenAI 完全相容，現有整合 ChatGPT 的程式碼幾乎不用改。', color: 'bg-green-50 border-green-100' },
            ].map((item) => (
              <div key={item.title} className={`border rounded-2xl p-5 ${item.color}`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-black text-gray-900 mb-2">{item.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 一般安裝流程 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">一般環境安裝（有網路）</h2>
          <p className="text-gray-700 leading-relaxed">先看有網路的情況，這是基礎，也讓你理解「離線版」要複製哪些步驟。</p>

          <div className="space-y-2">
            <p className="font-bold text-gray-700">Step 1：安裝 Ollama</p>
            <CodeBlock
              lang="bash"
              title="macOS / Linux"
              code={`# macOS
curl -fsSL https://ollama.com/install.sh | sh

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# 直接下載 .exe 安裝檔`}
            />
          </div>

          <div className="space-y-2">
            <p className="font-bold text-gray-700">Step 2：下載並執行模型</p>
            <CodeBlock
              lang="bash"
              title="terminal"
              code={`# 下載並執行 Llama 3.2（3B 版，約 2GB）
ollama run llama3.2

# 下載 Qwen2.5（中文效果更好）
ollama run qwen2.5

# 列出本地模型
ollama list

# 查看模型資訊
ollama show llama3.2`}
            />
          </div>

          <div className="space-y-2">
            <p className="font-bold text-gray-700">Step 3：透過 API 呼叫</p>
            <CodeBlock
              lang="bash"
              title="curl"
              code={`# Ollama 原生 API
curl http://localhost:11434/api/generate \\
  -d '{"model":"llama3.2","prompt":"你好","stream":false}'

# OpenAI 相容格式（Dify/LangChain 整合用這個）
curl http://localhost:11434/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama3.2",
    "messages": [{"role":"user","content":"你好"}]
  }'`}
            />
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 離線部署的關鍵 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">離線環境部署：關鍵步驟</h2>
          <p className="text-gray-700 leading-relaxed">
            在沒有網路的環境，你需要事先在有網路的機器準備好所有東西，再搬進去。以下是完整流程：
          </p>

          <InfoBox type="warning">
            <strong>前提</strong>：準備一台有網路的機器（系統架構最好和目標機相同，例如都是 Linux x86_64），
            用它下載所有需要的東西，打包後搬入離線環境。
          </InfoBox>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: '在有網路的機器下載 Ollama 安裝檔',
                code: `# Linux x86_64
curl -L https://github.com/ollama/ollama/releases/latest/download/ollama-linux-amd64.tgz -o ollama-linux-amd64.tgz

# 或下載特定版本（推薦固定版本，避免更新問題）
curl -L https://github.com/ollama/ollama/releases/download/v0.3.14/ollama-linux-amd64.tgz -o ollama.tgz`,
                lang: 'bash',
              },
              {
                step: '02',
                title: '在有網路的機器下載模型',
                code: `# 先在有網路的機器執行 ollama pull
ollama pull qwen2.5:7b

# 模型存放位置（macOS）
~/.ollama/models/

# 模型存放位置（Linux）
/usr/share/ollama/.ollama/models/

# 把整個 models 資料夾打包
tar -czf ollama-models.tar.gz ~/.ollama/models/`,
                lang: 'bash',
              },
              {
                step: '03',
                title: '搬入離線環境並安裝',
                code: `# 解壓縮 Ollama
tar -xzf ollama-linux-amd64.tgz -C /usr/local/bin/

# 解壓縮模型到對應路徑
mkdir -p /usr/share/ollama/.ollama/
tar -xzf ollama-models.tar.gz -C /usr/share/ollama/

# 啟動 Ollama service
ollama serve &

# 驗證模型是否可用
ollama list
ollama run qwen2.5:7b "你好，請用中文回答"`,
                lang: 'bash',
              },
              {
                step: '04',
                title: '設定為系統服務（開機自啟）',
                code: `# 建立 systemd service（Linux）
cat > /etc/systemd/system/ollama.service << 'EOF'
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
ExecStart=/usr/local/bin/ollama serve
User=ollama
Group=ollama
Restart=always
RestartSec=3
Environment="OLLAMA_HOST=0.0.0.0:11434"

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable ollama
systemctl start ollama`,
                lang: 'bash',
              },
            ].map((item) => (
              <div key={item.step}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                    {item.step}
                  </div>
                  <p className="font-black text-gray-900">{item.title}</p>
                </div>
                <CodeBlock lang={item.lang} code={item.code} />
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 模型選擇建議 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">模型怎麼選？</h2>
          <p className="text-gray-700 leading-relaxed">
            在工廠環境，硬體規格通常受限。以下是我的選型經驗：
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-4 font-black text-gray-700 rounded-tl-xl">模型</th>
                  <th className="p-4 font-black text-gray-700">大小</th>
                  <th className="p-4 font-black text-gray-700">RAM 需求</th>
                  <th className="p-4 font-black text-gray-700">中文能力</th>
                  <th className="p-4 font-black text-gray-700 rounded-tr-xl">適合場景</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['qwen2.5:7b', '~4.7 GB', '8 GB+', '⭐⭐⭐⭐⭐', '工廠首選，中文最好'],
                  ['llama3.2:3b', '~2 GB', '4 GB+', '⭐⭐⭐', '硬體資源有限時'],
                  ['llama3.1:8b', '~4.9 GB', '8 GB+', '⭐⭐⭐⭐', '英文場景為主'],
                  ['gemma2:9b', '~5.5 GB', '8 GB+', '⭐⭐⭐', '代碼生成較強'],
                ].map(([model, size, ram, cn, note]) => (
                  <tr key={model} className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-purple-700 font-bold">{model}</td>
                    <td className="p-4 text-gray-600">{size}</td>
                    <td className="p-4 text-gray-600">{ram}</td>
                    <td className="p-4">{cn}</td>
                    <td className="p-4 text-gray-500 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InfoBox type="tip">
            <strong>實戰建議</strong>：工廠環境建議用 <strong>qwen2.5:7b</strong>。
            阿里巴巴開發，中文理解能力最強，7B 參數在 8GB RAM 的機器上跑得起來，
            處理中文 SOP 文件、工程報告效果明顯優於 Llama 系列。
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-purple-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '📦', text: 'Ollama 把模型管理、推論引擎都包裝好，提供 Docker 風格的使用體驗和 OpenAI 相容 API' },
                { emoji: '🔒', text: '離線部署的核心：在有網路的機器下載 Ollama 安裝檔 + 模型檔，打包後搬入，路徑正確就能跑' },
                { emoji: '🇨🇳', text: '工廠中文場景建議選 qwen2.5:7b：中文能力最強，8GB RAM 可跑，是工廠離線 AI 的首選模型' },
                { emoji: '⚙️', text: '設定 systemd service 讓 Ollama 開機自啟，配合 OLLAMA_HOST=0.0.0.0 讓內網其他機器可以存取' },
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
          <Link href="/blog/ai/ep01-airgapped-intro" className="group block bg-gray-50 hover:bg-purple-50 transition-colors rounded-2xl p-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-purple-600 transition-colors">EP.01 — 什麼是 Air-gapped AI？</p>
            <p className="text-sm text-gray-500 mt-1">從工廠內網 LLM 說起</p>
            <ArrowLeft size={18} className="mt-3 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-400">EP.03 — Dify 平台部署</p>
            <p className="text-sm text-gray-400 mt-1">即將推出</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['AI 離線部署', 'Ollama', 'LLM', 'Docker', 'Air-gapped', 'qwen2.5', 'EP.02'].map((tag) => (
            <Chip key={tag} variant="flat" color="secondary" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
