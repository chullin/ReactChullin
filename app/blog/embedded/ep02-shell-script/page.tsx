'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Terminal, Code2, Zap, Layout, Bot } from 'lucide-react';
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

export default function EmbeddedEP02() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 via-orange-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.02</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold">嵌入式與系統</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Shell Script 入門<br />
              <span className="text-orange-400 text-3xl md:text-4xl">10 個讓工作自動化的腳本模板</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl font-medium">
              告別重複勞動：掌握 Bash 腳本核心語法，<br />
              打造高效的自動化開發與伺服器運維環境。
            </p>
            <div className="flex items-center gap-6 text-slate-400 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 12 min read</span>
              <span className="flex items-center gap-1.5"><Code2 size={14} /> Bash · Automation</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        
        {/* Intro */}
        <section>
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardBody className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-orange-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  「如果你必須執行同一個操作超過三次，那就寫個腳本。
                  Shell Script 是系統工程師最有價值的數位資產，它是實現自動化的第一道防線。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. Basics */}
        <section>
          <SectionHeader icon={Terminal} title="1. 核心語法速成" color="text-orange-600 bg-orange-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              一個 Bash 腳本的第一行永遠是 <code>#! /bin/bash</code> (Shebang)，告訴系統要用哪個解釋器。
            </p>
            <CodeBlock
              title="變數與判斷"
              lang="bash"
              code={`#! /bin/bash

NAME="Joseph"
echo "Hello, $NAME"

# 條件判斷 (注意空格！)
if [ "$NAME" == "Joseph" ]; then
    echo "Welcome back."
else
    echo "Unauthorized."
fi`}
            />
          </div>
        </section>

        {/* 2. Loops */}
        <section>
          <SectionHeader icon={Zap} title="2. 迴圈的力量" color="text-amber-600 bg-amber-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              迴圈讓你能夠一次處理成千上萬個檔案。
            </p>
            <CodeBlock
              title="批次處理檔案"
              lang="bash"
              code={`# 將目錄下所有 .jpg 檔案重新命名為 .old.jpg
for file in *.jpg; do
    mv "$file" "\${file%.jpg}.old.jpg"
    echo "Processed $file"
done`}
            />
          </div>
        </section>

        {/* 3. Automation Templates */}
        <section>
          <SectionHeader icon={Bot} title="3. 自動化模板精選" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            
            <div className="space-y-8">
              {/* Template 1: Backup */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-l-4 border-orange-500 pl-4">模板 #1：自動化數據備份</h3>
                <p className="text-sm">壓縮並備份目錄，並在檔名加上時間戳記。</p>
                <CodeBlock
                  lang="bash"
                  code={`#! /bin/bash
TARGET="/home/pi/data"
DEST="/home/pi/backups"
TIME=$(date +%Y%m%d_%H%M)

tar -czf "$DEST/backup_$TIME.tar.gz" "$TARGET"
echo "Backup saved to $DEST"`}
                />
              </div>

              {/* Template 2: Service Monitor */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-l-4 border-orange-500 pl-4">模板 #2：服務監控與重啟</h3>
                <p className="text-sm">檢查特定程式是否在執行，若掛掉則重新啟動。</p>
                <CodeBlock
                  lang="bash"
                  code={`#! /bin/bash
if pgrep -x "my_service" > /dev/null; then
    echo "Service is running."
else
    echo "Service down! Restarting..."
    systemctl restart my_service
fi`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-orange-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              🛠️ 腳本編寫小技巧
            </h2>
            <div className="space-y-4 text-orange-50">
              <p>1. <strong>引號很重要</strong>：處理路徑或變數時，儘量使用雙引號 <code>"$VAR"</code>，防止空格導致的報錯。</p>
              <p>2. <strong>權限記得開</strong>：寫完後記得執行 <code>chmod +x script.sh</code>。</p>
              <p>3. <strong>使用 Exit Code</strong>：腳本執行完畢後傳回 <code>exit 0</code> 代表成功，<code>exit 1</code> 代表失敗，方便外部監控。</p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/embedded/ep01-linux-basics" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.01 — Linux 基礎指令</p>
            <p className="text-sm text-gray-500 mt-1">20 個核心工具</p>
          </Link>
          <Link href="/blog/embedded/ep03-uart-i2c" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.03 — UART & I2C 協定</p>
            <p className="text-sm text-gray-500 mt-1">硬體溝通原理與面試題</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-orange-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Shell', 'Bash', 'Automation', 'DevOps', 'Scripts', 'EP.02'].map((tag) => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
