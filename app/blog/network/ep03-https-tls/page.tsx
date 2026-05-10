'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Shield, Lock, AlertTriangle, Key, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function NetworkEP03() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.03</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">網路系列</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              HTTPS 是怎麼加密的？<br />
              <span className="text-emerald-200">TLS 握手完全解析</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              對稱加密、非對稱加密、憑證鏈——理解 HTTPS 安全的完整原理。
              從「為什麼需要加密」開始，到 TLS 握手的每一步，一次全部說清楚。
            </p>
            <div className="flex items-center gap-6 text-emerald-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 14 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> HTTPS · TLS · SSL · 加密 · 憑證</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening Quote */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-emerald-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-3">
                    「你知道 HTTPS 比 HTTP 安全，但你說得出為什麼嗎？面試問到『HTTPS 的加密原理』，你會嗎？
                    這篇從最基本的『為什麼需要加密』開始，到 TLS 握手的每一步，全部說清楚。」
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    HTTPS 是現代 Web 的基礎設施。不管你是前端、後端還是全端，理解 TLS 的運作原理，
                    能讓你看懂瀏覽器的紅色警告、知道憑證過期的影響，以及在面試中自信地回答安全性問題。
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* Section 1: HTTP 的問題 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">HTTP 的問題：明信片寄信</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            HTTP 傳輸就像用<strong>明信片寄信</strong>——中間任何人都能看到內容。
            你在咖啡廳用 HTTP 登入某個網站，同一個 WiFi 上的任何人都能截獲你的帳號密碼。
            這不是理論上的威脅，是真實發生的攻擊：<strong>中間人攻擊（Man-in-the-Middle Attack）</strong>。
          </p>

          <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
            <p className="font-black text-red-700 mb-4 text-sm flex items-center gap-2">
              <AlertTriangle size={16} /> HTTP 封包明文範例（任何中間節點都能看到）
            </p>
            <CodeBlock
              title="HTTP 登入請求（明文傳輸）"
              lang="http"
              code={`POST /login HTTP/1.1
Host: example.com
Content-Type: application/json

{"username": "joseph", "password": "mypassword123"}

← 任何位於網路路徑上的節點（路由器、WiFi AP、ISP）
  都能完整看到這份內容，包含你的密碼。`}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: '竊聽（Eavesdropping）', desc: '攻擊者讀取你的帳密、信用卡號、私訊內容', icon: '👁️', color: 'bg-red-50 border-red-100' },
              { title: '篡改（Tampering）', desc: '攻擊者修改傳輸中的內容，注入惡意程式碼', icon: '✏️', color: 'bg-orange-50 border-orange-100' },
              { title: '偽裝（Spoofing）', desc: '攻擊者假裝是你的銀行，你以為自己在登入真網站', icon: '🎭', color: 'bg-yellow-50 border-yellow-100' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${item.color}`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-black text-gray-800 text-sm mb-2">{item.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
            <p className="font-black text-emerald-800 mb-2 text-sm">HTTPS 解決了這三個問題</p>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              {[
                ['機密性（Confidentiality）', '加密傳輸，攔截也看不懂'],
                ['完整性（Integrity）', '資料被篡改立刻被發現'],
                ['身份驗證（Authentication）', '憑證確認你真的在跟台大醫院講話'],
              ].map(([title, desc], i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-800">{title}</p>
                    <p className="text-xs text-emerald-700">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 2: 加密基本概念 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <Key className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">加密的兩種方式</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            要理解 HTTPS，你必須先搞懂兩種加密方式的差別：對稱加密和非對稱加密。
            它們各有優缺點，TLS 聰明地把兩者結合在一起。
          </p>

          {/* 對稱加密 */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">對稱加密：同一把鑰匙</h3>
            <p className="text-gray-600 leading-relaxed">
              就像<strong>保險箱</strong>——你用鑰匙鎖，對方用同一把鑰匙開。加解密速度非常快（AES 幾乎沒有效能負擔）。
              問題只有一個：<strong>你怎麼安全地把鑰匙給對方？</strong>如果通訊本來就不安全，你傳鑰匙的過程也不安全。
            </p>
            <CodeBlock
              title="對稱加密概念"
              lang="text"
              code={`原文 + 密鑰 → 密文
密文 + 同一把密鑰 → 原文

Alice: "你好" + key123 → "Xf7#@!" → 傳給 Bob
Bob:  "Xf7#@!" + key123 → "你好" ✅

問題：Alice 怎麼把 key123 安全地傳給 Bob？
如果傳輸過程被攔截，密鑰就曝光了。`}
            />
          </div>

          {/* 非對稱加密 */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">非對稱加密：公鑰加密，私鑰解密</h3>
            <p className="text-gray-600 leading-relaxed">
              Bob 有一個特殊的信箱：<strong>任何人都能投信進去（公鑰），但只有 Bob 能開（私鑰）</strong>。
              Alice 把訊息用 Bob 的公鑰加密，傳給 Bob，只有 Bob 能解。攻擊者攔到密文？沒有私鑰，算不出來。
            </p>
            <CodeBlock
              title="非對稱加密概念"
              lang="text"
              code={`Bob 公開：公鑰（Public Key）← 任何人都能拿
Bob 保密：私鑰（Private Key）← 只有 Bob 有

Alice 加密：訊息 + Bob 的公鑰 → 密文
Bob 解密：密文 + Bob 的私鑰 → 原文 ✅
被攔截的攻擊者：密文 + ??? → 無法解密（沒有私鑰）`}
            />
          </div>

          {/* 對比 Card */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-0 bg-blue-50">
              <CardBody className="p-5">
                <p className="font-black text-blue-800 mb-3">對稱加密（Symmetric）</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-green-700"><CheckCircle size={14} /> 速度快（AES-256 幾乎零負擔）</div>
                  <div className="flex items-center gap-2 text-green-700"><CheckCircle size={14} /> 適合大量資料傳輸</div>
                  <div className="flex items-center gap-2 text-red-600"><span className="text-base">✗</span> 金鑰分發問題：如何安全地傳鑰匙？</div>
                </div>
                <p className="text-xs text-blue-600 mt-3 font-medium">常見演算法：AES-128, AES-256, ChaCha20</p>
              </CardBody>
            </Card>
            <Card className="border-0 bg-purple-50">
              <CardBody className="p-5">
                <p className="font-black text-purple-800 mb-3">非對稱加密（Asymmetric）</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-green-700"><CheckCircle size={14} /> 公鑰可以公開，不怕被截獲</div>
                  <div className="flex items-center gap-2 text-green-700"><CheckCircle size={14} /> 解決金鑰分發問題</div>
                  <div className="flex items-center gap-2 text-red-600"><span className="text-base">✗</span> 速度慢（比對稱加密慢 100–1000 倍）</div>
                </div>
                <p className="text-xs text-purple-600 mt-3 font-medium">常見演算法：RSA-2048, ECDSA, ECDH</p>
              </CardBody>
            </Card>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
            <p className="font-black text-emerald-800 mb-2 text-sm">TLS 的聰明做法：兩者混用</p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              用<strong>非對稱加密</strong>解決「金鑰分發問題」，安全地協商出一個臨時的對稱密鑰（Session Key）；
              之後用<strong>對稱加密</strong>傳輸實際資料。安全性 + 效能兼顧。
            </p>
          </div>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 3: TLS 握手 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="text-teal-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">TLS 握手：HTTPS 的核心</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            HTTPS = HTTP + TLS（Transport Layer Security）。TLS 握手的目的是：
            在開始傳資料之前，<strong>安全地協商出一個「只有你和伺服器知道」的對稱密鑰</strong>，
            然後用這把密鑰加密後續的所有通訊。
          </p>

          <div className="bg-teal-50 rounded-3xl p-6 border border-teal-100">
            <p className="font-black text-teal-800 mb-5 text-sm">TLS 1.3 握手步驟（簡化版）</p>
            <CodeBlock
              title="TLS 1.3 握手流程"
              lang="text"
              code={`1. Client Hello
   瀏覽器：「我支援 TLS 1.3，我的隨機數是 [Random-C]，
            我支援這些加密套件（e.g. AES-256-GCM）」

2. Server Hello + Certificate + Key Share
   伺服器：「好，用 TLS 1.3，我的隨機數是 [Random-S]，
            這是我的憑證（公鑰在裡面），
            這是我的 DH Key Share（Diffie-Hellman 公開參數）」

3. Client 驗證憑證 + 計算共同密鑰
   瀏覽器：「驗證憑證有效（由可信的 CA 簽發），
            用 DH 算法計算出 Session Key
            （只有我和伺服器知道這把 key）」

4. Client Finished
   瀏覽器：「握手完成，之後用 Session Key 加密通訊」

5. 之後全部用對稱加密（Session Key）傳輸
   → 快速（非對稱加密慢，對稱加密快）
   → 安全（Session Key 從未以明文傳輸過）`}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">Diffie-Hellman：公開頻道上的秘密</h3>
            <p className="text-gray-600 leading-relaxed">
              這是非對稱加密最神奇的地方——<strong>你和伺服器可以在公開頻道上協商出一個只有你們知道的秘密</strong>，
              即使有人全程監聽，也算不出那個秘密。
            </p>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <p className="font-black text-slate-700 mb-3 text-sm">DH 的顏色比喻（直覺理解）</p>
              <div className="space-y-2 text-sm text-gray-600">
                {[
                  ['①', '公開的底色：黃色（所有人都知道）'],
                  ['②', 'Alice 加上自己的秘密色：藍色 → 混出「青色」公開傳出去'],
                  ['③', 'Bob 加上自己的秘密色：紅色 → 混出「橙色」公開傳出去'],
                  ['④', 'Alice 拿到 Bob 的橙色，加上自己的藍色 → 混出「棕色」'],
                  ['⑤', 'Bob 拿到 Alice 的青色，加上自己的紅色 → 也混出「棕色」'],
                  ['⑥', '攻擊者只看到黃色、青色、橙色，無法還原棕色（數學上極難反推）'],
                ].map(([num, desc], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-black text-slate-500 shrink-0 w-5">{num}</span>
                    <span>{desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">實際上是基於離散對數難題（ECDH），「棕色」就是 Session Key。</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <p className="font-black text-green-800 mb-2 text-sm">前向保密（Forward Secrecy）</p>
              <p className="text-sm text-green-700 leading-relaxed">
                TLS 1.3 強制使用 ECDH 的<strong>暫時密鑰</strong>——每次握手都產生新的 Session Key，
                握手完成後立刻丟棄。即使私鑰未來被洩漏，過去的通訊紀錄也無法被解密。
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="font-black text-blue-800 mb-2 text-sm">0-RTT（TLS 1.3 新特性）</p>
              <p className="text-sm text-blue-700 leading-relaxed">
                再次連線到同一個伺服器時，可以重用上次的加密參數，
                把握手的 1 RTT 降到 0 RTT，<strong>第一個請求和資料一起送出</strong>。
                代價：無法防止重放攻擊（Replay Attack），適用於讀取操作。
              </p>
            </div>
          </div>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 4: SSL 憑證 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="text-emerald-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">SSL 憑證：誰說你是你？</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            你說你是台大醫院，但我怎麼知道你真的是台大醫院？你出示<strong>衛生署核發的執照（憑證）</strong>。
            衛生署（CA，Certificate Authority）我信任，所以透過它簽發的執照，我也信任你的身份。
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">憑證鏈（Chain of Trust）</h3>
            <p className="text-gray-600 leading-relaxed">
              瀏覽器內建了一份「根 CA 清單」（Root CA Store），這份清單裡的機構是被作業系統或瀏覽器廠商預先信任的。
              你的網站憑證不需要直接由根 CA 簽發，只要能追溯到信任的根 CA 即可。
            </p>
            <CodeBlock
              title="憑證鏈結構"
              lang="text"
              code={`根 CA（Root CA）
  ← 瀏覽器/OS 內建信任（Google、Microsoft、Apple 都有自己的根 CA 清單）
  └── 中間 CA（Intermediate CA）
       ← 由 Root CA 簽發，根 CA 不直接簽發網站憑證（安全考量）
       └── 你的憑證（example.com）
            ← 由中間 CA 簽發，裡面包含你的公鑰與域名

驗證過程：
瀏覽器收到 example.com 憑證
  → 憑證是由「Let's Encrypt 中間 CA」簽的，我信任嗎？
  → 中間 CA 是由「ISRG Root X1」（根 CA）簽的，我信任嗎？
  → ISRG Root X1 在我的根 CA 清單裡 ✅
  → 整條鏈可信，憑證有效`}
            />
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <p className="font-black text-slate-800 mb-3 text-sm">憑證裡面有什麼？</p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
              {[
                ['域名（Subject）', 'example.com（或 *.example.com）'],
                ['公鑰', '伺服器的公鑰，用於 DH 交換'],
                ['有效期限', '發行日 ~ 到期日（Let\'s Encrypt 是 90 天）'],
                ['簽發機構（Issuer）', '哪個 CA 簽的（如 Let\'s Encrypt）'],
                ['CA 的數位簽章', '用 CA 私鑰簽名，確保憑證未被篡改'],
                ['SANs（可選）', 'Subject Alternative Names，一張憑證涵蓋多個域名'],
              ].map(([field, desc], i) => (
                <div key={i} className="flex gap-2">
                  <span className="font-bold text-gray-700 shrink-0">{field}：</span>
                  <span className="text-gray-500">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-800">Let&#39;s Encrypt：免費憑證改變了一切</h3>
            <p className="text-gray-600 leading-relaxed">
              以前 SSL 憑證很貴（每年幾千塊），導致許多小網站不願意部署 HTTPS。
              2016 年 Let&apos;s Encrypt 開始提供<strong>免費、自動化的 SSL 憑證</strong>，這件事加速了 HTTPS 的全面普及。
              現在全球超過 60% 的網站使用 Let&apos;s Encrypt 憑證。
            </p>
            <CodeBlock
              title="使用 certbot 申請 Let's Encrypt 免費憑證"
              lang="bash"
              code={`# 安裝 certbot（以 Ubuntu + Nginx 為例）
sudo apt install certbot python3-certbot-nginx

# 申請憑證並自動設定 Nginx
sudo certbot --nginx -d example.com -d www.example.com

# certbot 會自動：
# 1. 向 Let's Encrypt 驗證你擁有這個域名（HTTP-01 挑戰）
# 2. 下載憑證到 /etc/letsencrypt/live/example.com/
# 3. 修改 Nginx 設定，啟用 HTTPS
# 4. 設定自動更新 Cron job（憑證每 90 天到期）

# 手動測試自動更新
sudo certbot renew --dry-run`}
            />
          </div>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 5: 常見攻擊 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-orange-500" size={28} />
            <h2 className="text-3xl font-black text-gray-900">常見的 HTTPS 相關攻擊</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            HTTPS 不是銀彈。以下三種攻擊是工程師面試常考、實務常見的安全漏洞，理解它們才能知道如何防禦。
          </p>

          <div className="space-y-4">
            {/* 攻擊 1 */}
            <Card className="border-0 shadow-sm border-l-4 border-l-red-400 bg-red-50">
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0">🎭</span>
                  <div className="flex-1">
                    <p className="font-black text-red-800 mb-2">攻擊 1：中間人攻擊（MITM）</p>
                    <p className="text-sm text-red-700 leading-relaxed mb-3">
                      攻擊者用偽造的憑證冒充你的伺服器，建立兩條 TLS 連線：一條到你，一條到真伺服器。
                      所有流量經過攻擊者中繼，雙方都以為在安全通訊。
                    </p>
                    <div className="bg-white rounded-xl p-3 text-xs text-gray-600">
                      <strong>瀏覽器的防禦：</strong>憑證驗證。攻擊者的假憑證不是由可信 CA 簽發，瀏覽器會顯示紅色警告。
                      <strong className="text-red-700">看到警告請不要繼續！</strong>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* 攻擊 2 */}
            <Card className="border-0 shadow-sm border-l-4 border-l-orange-400 bg-orange-50">
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0">⬇️</span>
                  <div className="flex-1">
                    <p className="font-black text-orange-800 mb-2">攻擊 2：SSL Strip（降級攻擊）</p>
                    <p className="text-sm text-orange-700 leading-relaxed mb-3">
                      攻擊者把你和伺服器之間的 HTTPS 連線降級為 HTTP。
                      你的瀏覽器以為在用 HTTP（位址列無鎖頭），實際上在跟攻擊者通訊。
                    </p>
                    <CodeBlock
                      title="解法：HSTS（HTTP Strict Transport Security）"
                      lang="nginx"
                      code={`# Nginx 設定 HSTS Header
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# 瀏覽器收到這個 Header 後，記住：
# 「這個網站接下來 31536000 秒（1 年）內只能用 HTTPS」
# 即使你輸入 http://，瀏覽器也自動改成 https://
# 攻擊者無法再插入降級中間人`}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* 攻擊 3 */}
            <Card className="border-0 shadow-sm border-l-4 border-l-yellow-400 bg-yellow-50">
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0">⏰</span>
                  <div className="flex-1">
                    <p className="font-black text-yellow-800 mb-2">攻擊 3：憑證過期</p>
                    <p className="text-sm text-yellow-700 leading-relaxed mb-3">
                      Let&apos;s Encrypt 憑證每 90 天到期。過期後瀏覽器顯示安全警告，用戶無法正常訪問，
                      Google 等搜尋引擎也會降低排名。<strong>這是一個完全可以自動化預防的問題。</strong>
                    </p>
                    <CodeBlock
                      title="設定自動更新（certbot）"
                      lang="bash"
                      code={`# certbot 安裝後通常自動設定 Cron job 或 systemd timer
# 手動確認自動更新是否正常運作
sudo certbot renew --dry-run

# 或手動加入 Cron（每天凌晨 2 點檢查更新）
0 2 * * * /usr/bin/certbot renew --quiet`}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="opacity-30" />

        {/* Section 6: TLS 1.2 vs 1.3 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">TLS 1.2 vs TLS 1.3</h2>

          <p className="text-gray-600 leading-relaxed">
            EP.01 HTTP 文章裡提到過 TLS 握手的 RTT 成本。現在你已經理解握手的細節，
            就能真正看懂為什麼 TLS 1.3 更快：<strong>它把握手從 2 RTT 降到 1 RTT</strong>，
            少了一個來回。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-emerald-700 text-white">
                  <th className="text-left p-3 font-black">比較項目</th>
                  <th className="text-left p-3 font-black">TLS 1.2</th>
                  <th className="text-left p-3 font-black">TLS 1.3</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['握手往返次數', '2 RTT', '1 RTT', false],
                  ['支援的加密套件', '多（含弱加密，如 RC4、3DES）', '少但全部是強加密', false],
                  ['前向保密（Forward Secrecy）', '可選（不強制）', '強制（每次握手新密鑰）', false],
                  ['0-RTT 重連', '不支援', '支援（適用於讀取操作）', false],
                  ['舊版相容', '廣泛支援（IE 11+）', '現代瀏覽器均支援', false],
                  ['現狀', '仍廣泛使用，但應遷移', '推薦使用', false],
                ].map(([item, v12, v13], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'}>
                    <td className="p-3 font-bold text-gray-700 border-b border-emerald-100">{item}</td>
                    <td className="p-3 text-gray-600 border-b border-emerald-100">{v12}</td>
                    <td className="p-3 text-emerald-700 font-medium border-b border-emerald-100">{v13}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-teal-50 rounded-2xl p-5 border border-teal-200">
            <p className="font-black text-teal-800 mb-2 text-sm">實務提醒</p>
            <p className="text-sm text-teal-700 leading-relaxed">
              Nginx 設定 <code className="bg-teal-100 px-1.5 py-0.5 rounded font-mono">ssl_protocols TLSv1.2 TLSv1.3;</code> 可以同時支援兩者。
              現代 CDN（Cloudflare、Vercel）預設啟用 TLS 1.3，瀏覽器支援率超過 95%。
              如果你的系統不需要支援超舊的環境，可以只保留 TLS 1.3。
            </p>
          </div>
        </motion.section>

        {/* 總結 */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                { icon: '🔓', text: 'HTTP 是明文傳輸，任何中間節點都能竊聽、篡改、偽裝。HTTPS = HTTP + TLS 解決了這三個問題。' },
                { icon: '🔑', text: '對稱加密速度快，非對稱加密安全。TLS 混用兩者：非對稱交換金鑰，對稱加密傳資料。' },
                { icon: '🤝', text: 'TLS 握手用 DH 算法讓雙方在公開頻道協商出只有彼此知道的 Session Key，中間人全程監聽也算不出來。' },
                { icon: '📜', text: 'SSL 憑證由 CA 簽發，建立信任鏈（Root CA → 中間 CA → 你的憑證）。Let\'s Encrypt 提供免費自動化憑證。' },
                { icon: '🛡️', text: 'HSTS 防止 SSL Strip 降級攻擊。certbot 自動更新防止憑證過期。面試要能說出 MITM 的防禦原理。' },
                { icon: '⚡', text: 'TLS 1.3 比 1.2 少一次 RTT 往返，強制前向保密，加密套件全部是強加密——這是應該遷移的理由。' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link href="/blog/network/ep02-dns-ip" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 sm:w-1/2">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.02 — DNS 與 IP</p>
            <p className="text-sm text-gray-500 mt-1">域名解析全流程，從輸入網址到找到伺服器</p>
          </Link>
          <Link href="/blog/network/ep04-jwt-oauth2" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 sm:w-1/2 text-right">
            <ArrowRight size={18} className="mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors ml-auto" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.04 — JWT 與 OAuth2</p>
            <p className="text-sm text-gray-500 mt-1">認證與授權的正確打開方式</p>
          </Link>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['HTTPS', 'TLS', 'SSL', '加密', '憑證', '網路安全', '面試', 'EP.03'].map(tag => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>

      </article>
    </div>
  );
}
