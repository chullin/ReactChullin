import { FadeIn } from '@/components/blog/ScrollAnimation';
import { 
  ShieldCheck,
  Lock,
  Search,
  Activity,
  AlertTriangle,
  ChevronRight,
  Terminal,
  Cpu,
  Server,
  Key,
  Eye,
  FileCode,
  Box,
  CheckCircle2
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevSecOps： 將安全植入自動化流程 | Joseph Chen',
  description: '不要讓「安全」成為部署的阻礙。學習如何在 CI/CD 的每一秒鐘，自動偵測漏洞、掃描秘密資訊與保護容器鏡像。',
  alternates: {
    canonical: 'https://chullin.tw/blog/devops/ep08-devsecops',
  },
};



const SectionWrapper = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <FadeIn>
    {children}
  </FadeIn>
);

export default function DevSecOpsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white py-24 px-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn>
            <span 
               
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6 font-bold"
            >
              EP.08 — DevOps 實戰系列
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              DevSecOps：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                將安全植入自動化流程
              </span>
            </h1>
            <p className="text-xl text-slate-300 font-medium mb-8 leading-relaxed max-w-2xl">
              不要讓「安全」成為部署的阻礙。學習如何在 CI/CD 的每一秒鐘，自動偵測漏洞、掃描秘密資訊與保護容器鏡像。
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">📅</div>
                2026 年 5 月
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs">✍️</div>
                Joseph Chen
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs">⏱</div>
                25 分鐘閱讀
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Intro Section: The Pain Point */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">痛點：最後一刻的「安全檢查」是部署的噩夢</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            在傳統的開發流程中，安全檢查通常發生在最後一刻。想像一下：你花了三週開發新功能，程式碼已經準備好上線，QA 也測過了，結果資安部門突然說：
            <strong className="text-slate-900">「這段程式碼有 SQL Injection 風險，還有三個過時的套件有嚴重漏洞，不能部署。」</strong>
          </p>
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 space-y-4">
            <h4 className="font-black text-slate-900 text-xl">這會導致什麼後果？</h4>
            <ul className="space-y-3">
              {[
                { title: '部署中斷', desc: '原本計畫好的發佈時間被迫延後，影響業務目標。' },
                { title: '高昂的修補成本', desc: '在開發後期修補漏洞的成本，是開發初期的 10 倍以上。' },
                { title: '團隊對立', desc: '開發團隊覺得資安是「阻礙者」，資安團隊覺得開發是「風險製造者」。' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <p className="text-slate-600"><strong className="text-slate-800">{item.title}：</strong>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            這就是為什麼我們需要 <strong className="text-blue-600">DevSecOps</strong>。它的核心理念是 <strong className="text-slate-900">「左移 (Shift-Left Security)」</strong> —— 
            從寫下第一行程式碼開始，就把安全性整合到自動化流程中。
          </p>
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 1: SAST - Static Analysis Security Testing */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <FileCode size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">一、SAST：在程式碼編譯前找出問題</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            <strong className="text-slate-900">SAST (Static Analysis Security Testing)</strong> 就像是資安版的 Linter。它不需要執行程式碼，而是直接掃描源碼，尋找不安全的寫法。
          </p>
          
          <h4 className="text-xl font-bold text-slate-800 mt-8 mb-4">為什麼 SAST 很重要？</h4>
          <p className="text-slate-600">
            它可以抓到常見的人為錯誤，例如：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div  className="rounded-2xl border border-gray-100 bg-white shadow-sm bg-slate-50 border border-slate-100">
              <div className="p-6">
                <p className="font-black text-red-600 mb-2">❌ 不安全的寫法 (SQLi)</p>
                <CodeBlock language="typescript" code={`// 極度危險！直接拼接字串
const query = "SELECT * FROM users WHERE id = '" + userInput + "'";
db.execute(query);`} />
              </div>
            </div>
            <div  className="rounded-2xl border border-gray-100 bg-white shadow-sm bg-slate-50 border border-slate-100">
              <div className="p-6">
                <p className="font-black text-emerald-600 mb-2">✅ 安全的寫法 (Prepared Statement)</p>
                <CodeBlock language="typescript" code={`// 安全：使用參數化查詢
const query = "SELECT * FROM users WHERE id = ?";
db.execute(query, [userInput]);`} />
              </div>
            </div>
          </div>

          <p className="text-slate-600">
            在 GitHub Actions 中，我們可以使用開源工具如 <strong className="text-slate-900">SonarQube</strong> 或 <strong className="text-slate-900">Semgrep</strong> 來自動執行：
          </p>
          <CodeBlock 
            title=".github/workflows/security.yml" 
            language="yaml" 
            code={`name: Security Scan
on: [push, pull_request]

jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Semgrep
        run: |
          docker run --rm -v "$(pwd):/src" returntocorp/semgrep semgrep \
            --config=p/default \
            --error`} 
          />
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 2: SCA - Software Composition Analysis */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              <Box size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">二、SCA：掃描你的第三方套件漏洞</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            現代應用程式 80% 的程式碼其實來自開源套件。你可能寫了完美的程式碼，但如果你依賴的 <code className="bg-slate-100 px-1 rounded text-sm font-mono text-red-600">npm</code> 套件有後門或漏洞，你的整個系統都是脆弱的。
          </p>
          <p className="text-slate-600">
            <strong className="text-slate-900">SCA (Software Composition Analysis)</strong> 會比對你的依賴清單（如 package.json）與全球漏洞資料庫 (CVE)。
          </p>

          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 my-6">
            <h4 className="font-black text-amber-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} /> 實戰建議：GitHub Dependabot
            </h4>
            <p className="text-amber-800 text-sm leading-relaxed">
              這是最簡單的 SCA 工具。在 GitHub Repo 的 Settings -&gt; Security 中開啟它，它會自動偵測漏洞，甚至幫你開 Pull Request 自動更新套件版本。
            </p>
          </div>

          <h4 className="text-xl font-bold text-slate-800 mb-4">手動執行掃描：</h4>
          <CodeBlock 
            title="終端機指令" 
            language="bash" 
            code={`# Node.js 內建檢查
npm audit

# 使用 Snyk (業界常用工具)
snyk test`} 
          />
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 3: Secret Detection */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
              <Key size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">三、Secret Detection：防止 API Key 外洩</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            這是最常見的慘案：工程師不小心把 <strong className="text-slate-900">AWS Access Key</strong> 或 <strong className="text-slate-900">Database Password</strong> 寫在程式碼裡，然後 `git push` 到公開倉庫。
            <br />
            駭客通常在 1 分鐘內就會掃描到並盜用你的帳號。
          </p>

          <div  className="rounded-2xl border border-gray-100 bg-white shadow-sm bg-slate-900 text-slate-300 border-none my-6">
            <div className="p-8">
              <p className="font-mono text-sm mb-4 text-red-400 font-bold">// ❌ 千萬不要這樣做！</p>
              <p className="font-mono text-sm mb-2">const STRIPE_API_KEY = "sk_test_51...your_secret_key";</p>
              <p className="font-mono text-sm mb-4 text-emerald-400 font-bold">// ✅ 正確做法：使用環境變數</p>
              <p className="font-mono text-sm">const STRIPE_API_KEY = process.env.STRIPE_SECRET;</p>
            </div>
          </div>

          <p className="text-slate-600">
            我們可以使用 <strong className="text-slate-900">gitleaks</strong> 這樣的工具，在 CI 流程中阻斷包含敏感資訊的提交：
          </p>
          <CodeBlock 
            title=".github/workflows/secret-scan.yml" 
            language="yaml" 
            code={`name: Secret Scan
on: [push]
jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`} 
          />
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 4: Container Security */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sky-100 text-sky-600 rounded-xl">
              <Cpu size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">四、Container Security：保護你的運行環境</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            在 DevOps 世界，我們把程式碼包進 Docker Image。但如果你的 Base Image (例如舊版的 Ubuntu 或 Node) 本身就有漏洞呢？
          </p>
          <p className="text-slate-600 mb-6">
            我們需要掃描 Docker Image。這兩年最受歡迎的工具是 <strong className="text-slate-900">Trivy</strong>。它不僅能掃描 OS 漏洞，還能檢查配置錯誤。
          </p>

          <CodeBlock 
            title="使用 Trivy 掃描 Docker Image" 
            language="bash" 
            code={`# 掃描本地 Image 的漏洞
trivy image my-app:latest

# 只顯示「嚴重 (Critical)」等級的漏洞，並產生 JSON 報告
trivy image --severity CRITICAL --format json --output results.json my-app:latest`} 
          />

          <div className="bg-slate-900 rounded-3xl p-8 text-white mt-10">
            <h4 className="text-xl font-black mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" /> Dockerfile 安全實戰清單
            </h4>
            <div className="space-y-6">
              {[
                { 
                  title: '不要使用 Root 使用者', 
                  desc: '在 Dockerfile 中使用 USER 指令切換至非特權使用者。這可以防止駭客即便攻破應用程式，也無法獲得主機的完整權限。',
                  code: 'RUN useradd -m appuser && USER appuser'
                },
                { 
                  title: '固定版本號 (Immutable Tags)', 
                  desc: '不要使用 node:latest，因為它每天都在變。使用 node:20.11.0-alpine 確保環境一致性且減少體積。',
                  code: 'FROM node:20.11.0-alpine'
                },
                { 
                  title: '移除不必要的工具', 
                  desc: '不要在 Production 鏡像中留下 curl、wget 或 git。駭客進入容器後會利用這些工具下載惡意程式。',
                  code: 'RUN apk del curl'
                },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs shrink-0">{i+1}</div>
                    <p className="font-bold text-slate-100">{item.title}</p>
                  </div>
                  <p className="text-sm text-slate-400 ml-10">{item.desc}</p>
                  <div className="ml-10 bg-black/30 rounded-lg p-3 font-mono text-xs text-blue-300 border border-slate-700">
                    {item.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 5: IaC Scanning - Infrastructure as Code Security */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-100 text-pink-600 rounded-xl">
              <Server size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">五、IaC Scanning：基礎設施也要掃描</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            現代 DevOps 使用 <strong className="text-slate-900">Terraform</strong>, <strong className="text-slate-900">Kubernetes (K8s)</strong> 或 <strong className="text-slate-900">CloudFormation</strong> 來定義機器。
            <br />
            如果你的 S3 Bucket 被設定成「公開讀取」，或者你的 K8s Pod 擁有過大的權限，這就是嚴重的安全威脅。
          </p>

          <h4 className="text-xl font-bold text-slate-800 mt-6 mb-4">實戰範例：使用 Checkov 掃描 Terraform</h4>
          <p className="text-slate-600 mb-4">
            Checkov 是一個強大的開源工具，可以在你部署到 AWS 之前，先檢查你的設定檔是否符合資安最佳實踐。
          </p>
          
          <CodeBlock 
            title="Terraform 安全檢查" 
            language="bash" 
            code={`# 安裝 Checkov
pip install checkov

# 掃描目前的目錄
checkov -d . --check CKV_AWS_20,CKV_AWS_52`} 
          />

          <div className="border-l-4 border-pink-500 bg-pink-50 p-6 rounded-r-3xl my-6">
            <p className="font-bold text-pink-900 mb-2">💡 常見的 IaC 配置錯誤：</p>
            <ul className="text-sm text-pink-800 space-y-2 list-inside list-disc">
              <li>S3 Bucket 開放公共訪問 (Public Read)</li>
              <li>Security Group 開放 0.0.0.0/0 存取資料庫埠號</li>
              <li>IAM Role 權限過大 (使用 AdministratorAccess)</li>
              <li>EBS 磁碟未加密</li>
            </ul>
          </div>
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 6: Software Supply Chain Security */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
              <Activity size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">六、軟體供應鏈安全：保護整個流程</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            2021 年的 **SolarWinds** 案告訴我們：即便程式碼沒問題，如果駭客攻進了你的 **CI/CD Server (GitHub Actions/Jenkins)**，他們就能在打包時偷偷塞進木馬。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {[
              { 
                title: '二進位檔簽名', 
                icon: <ShieldCheck className="text-emerald-500" />,
                desc: '使用 Sigstore/Cosign 為你的 Docker Image 簽名，確保沒人中途掉包。'
              },
              { 
                title: 'SLSA 框架', 
                icon: <Activity className="text-blue-500" />,
                desc: '遵照 SLSA 標準，為建置過程提供不可篡改的證據。'
              },
              { 
                title: 'SBOM (軟體清單)', 
                icon: <Box className="text-purple-500" />,
                desc: '產生軟體物料清單，清楚記錄每一層依賴關係。'
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center space-y-3">
                <div className="mx-auto w-10 h-10 flex items-center justify-center">{item.icon}</div>
                <h5 className="font-black text-slate-900 text-sm">{item.title}</h5>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock 
            title="產生 SBOM (Software Bill of Materials)" 
            language="bash" 
            code={`# 使用 Syft 產生 SBOM
syft my-app:latest -o json > sbom.json

# 檢視所有依賴套件與版本
cat sbom.json | jq '.artifacts[].name'`} 
          />
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Section 7: DAST - Dynamic Analysis Security Testing */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <Eye size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">七、DAST：從外部模擬駭客攻擊</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            與 SAST 不同，<strong className="text-slate-900">DAST (Dynamic Analysis Security Testing)</strong> 是在應用程式「執行中」進行掃描。它不知道你的程式碼長怎樣，而是像駭客一樣從外面發送請求。
          </p>
          <p className="text-slate-600">
            在 CI/CD 中，我們通常在部署到 Staging 環境後，自動觸發掃描：
          </p>

          <CodeBlock 
            title="OWASP ZAP 掃描範例" 
            language="bash" 
            code={`# 使用 Docker 執行快速掃描
docker run -t owasp/zap2docker-stable zap-baseline.py \\
    -t https://staging.chullin.tw \\
    -r report.html`} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="p-6 border border-slate-100 rounded-3xl bg-slate-50">
              <h5 className="font-black text-slate-900 mb-2">SAST (內部掃描)</h5>
              <p className="text-sm text-slate-500 italic mb-4">「這行程式碼看起來不安全，可能會有 XSS 問題。」</p>
              <div className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded inline-block">早期發現、速度快</div>
            </div>
            <div className="p-6 border border-slate-100 rounded-3xl bg-slate-50">
              <h5 className="font-black text-slate-900 mb-2">DAST (外部掃描)</h5>
              <p className="text-sm text-slate-500 italic mb-4">「我試著注入腳本，結果伺服器真的執行了！這是漏洞。」</p>
              <div className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded inline-block">真實性高、但較晚執行</div>
            </div>
          </div>
        </SectionWrapper>

        <hr className="border-gray-100 my-20 opacity-50"  />

        {/* Conclusion: The Full Lifecycle */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-900 text-white rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">總結：DevSecOps 是全生命週期的守護</h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            DevSecOps 不只是一堆工具的堆疊，而是一種文化的轉變。身為軟體工程師，我們有責任寫出安全的程式碼，而身為 DevOps 工程師，我們有責任建立一個「讓安全變得簡單」的自動化流程。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '寫 Code', icon: <FileCode />, task: 'IDE Plugin / pre-commit' },
              { label: '提交 PR', icon: <Terminal />, task: 'SAST + SCA' },
              { label: '構建 Image', icon: <Box />, task: 'Container Scanning' },
              { label: '部署後', icon: <Server />, task: 'DAST + Monitoring' },
            ].map((step, i) => (
              <div key={i} className="text-center p-6 border border-slate-100 rounded-3xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
                  {step.icon}
                </div>
                <p className="font-black text-slate-900">{step.label}</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">{step.task}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Footer: Tags and Navigation */}
        <div className="mt-20 pt-10 border-t border-slate-100">
          <div className="flex flex-wrap gap-2 mb-12">
            {['DevOps', 'Security', 'CI/CD', 'GitHub Actions', 'Docker', 'DevSecOps', 'SAST', 'SCA'].map(tag => (
              <span key={tag}  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-slate-100 text-slate-600 font-bold">#{tag}</span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link 
              href="/blog/devops/ep07-monitoring-logging" 
              className="group p-6 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-2">
                <ChevronRight className="rotate-180" size={16} /> 上一篇
              </div>
              <p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                EP.07 — 系統監控與日誌收集：Prometheus 與 ELK
              </p>
            </Link>
            <Link 
              href="/blog/devops/ep09-sre-introduction" 
              className="group p-6 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-colors text-right"
            >
              <div className="flex items-center justify-end gap-2 text-slate-400 text-sm font-bold mb-2">
                下一篇 <ChevronRight size={16} />
              </div>
              <p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                EP.09 — SRE 入門：SLO、SLA 與 Error Budget
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
