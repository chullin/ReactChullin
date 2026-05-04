'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye, Terminal, FileCode, Cpu, ShieldCheck, Activity } from 'lucide-react';
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

export default function EmbeddedEP01() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 via-orange-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.01</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold">嵌入式與系統</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Linux 基礎指令<br />
              <span className="text-orange-400 text-3xl md:text-4xl">嵌入式工程師必知的 20 個指令</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl font-medium">
              進入 Linux 世界的第一步：從檔案管理、權限控制，<br />
              到系統監控與自動化任務執行。
            </p>
            <div className="flex items-center gap-6 text-slate-400 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Terminal size={14} /> Linux · Commands</span>
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
                  「在嵌入式開發中，你通常沒有圖形界面。終端機（Terminal）就是你的雙眼，
                  而指令就是你的雙手。熟練這些指令，能讓你從普通開發者蛻變為系統專家。」
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* 1. File Operations */}
        <section>
          <SectionHeader icon={FileCode} title="1. 檔案與目錄操作" color="text-orange-600 bg-orange-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              這是最基礎的操作。但在嵌入式環境中，我們更常用 <code>grep</code> 和 <code>find</code> 來定位配置文件或日誌。
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <p className="font-bold text-slate-800 mb-2">基礎必知</p>
                <ul className="text-sm space-y-1">
                  <li>• <code>ls -la</code>: 列出所有檔案（含隱藏與詳細資訊）</li>
                  <li>• <code>cp -r</code>: 遞迴複製目錄</li>
                  <li>• <code>mv</code>: 移動或重新命名</li>
                  <li>• <code>rm -rf</code>: 強制刪除（使用請極度小心！）</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <p className="font-bold text-slate-800 mb-2">進階定位</p>
                <ul className="text-sm space-y-1">
                  <li>• <code>grep -r "error" /var/log</code>: 搜尋日誌中的關鍵字</li>
                  <li>• <code>find . -name "*.conf"</code>: 找尋所有設定檔</li>
                  <li>• <code>tail -f log.txt</code>: 即時監控日誌輸出</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Permissions */}
        <section>
          <SectionHeader icon={ShieldCheck} title="2. 權限管理 (Permissions)" color="text-emerald-600 bg-emerald-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Linux 是一個多使用者系統，權限決定了誰能讀寫檔案。嵌入式開發中常見的 <code>Permission Denied</code> 通常與此有關。
            </p>
            <CodeBlock
              title="chmod 權限設定"
              lang="bash"
              code={`# 給予執行權限 (常用於 script)
chmod +x setup.sh

# 755 代表: 擁有者(全能)、群組(讀執)、其他人(讀執)
chmod 755 app_binary

# 變更檔案擁有者 (需要 sudo)
sudo chown joseph:joseph data.txt`}
            />
          </div>
        </section>

        {/* 3. Process & System */}
        <section>
          <SectionHeader icon={Activity} title="3. 系統監控與行程管理" color="text-blue-600 bg-blue-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              當程式跑不起來或卡住時，你需要知道系統發生了什麼事。
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 font-bold text-blue-600">top</div>
                <p className="text-sm self-center">即時顯示系統資源（CPU、RAM）使用狀況。嵌入式建議用 <code>htop</code> 介面更友善。</p>
              </li>
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 font-bold text-blue-600">ps</div>
                <p className="text-sm self-center"><code>ps aux | grep my_app</code>: 找出你的程式在哪個 Process ID (PID) 執行。</p>
              </li>
              <li className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 font-bold text-blue-600">kill</div>
                <p className="text-sm self-center"><code>kill -9 [PID]</code>: 強制結束失控的程式。</p>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Automation (cron) */}
        <section>
          <SectionHeader icon={Clock} title="4. 定時任務 (cron)" color="text-indigo-600 bg-indigo-50" />
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              如果你需要讓 Raspberry Pi 每天晚上備份數據，或是每小時重啟某個服務，你需要 <code>cron</code>。
            </p>
            <CodeBlock
              title="crontab -e"
              lang="bash"
              code={`# 每分鐘執行一次備份腳本
* * * * * /home/pi/backup.sh

# 每天凌晨 3:00 重啟系統
0 3 * * * /sbin/reboot`}
            />
          </div>
        </section>

        {/* 總結 */}
        <section>
          <div className="bg-slate-800 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              🚀 嵌入式工程師的自我修養
            </h2>
            <div className="space-y-4 text-slate-300">
              <p>• <strong>不要依賴 root</strong>：盡量在一般權限下作業，需要時再用 <code>sudo</code>。</p>
              <p>• <strong>熟悉 Tab 鍵</strong>：它能幫你補完路徑與指令，減少打字錯誤。</p>
              <p>• <strong>man 是最好的老師</strong>：不知道指令怎麼用？輸入 <code>man [指令名]</code> 查看說明手冊。</p>
            </div>
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">回到目錄</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">查看所有系列</p>
          </Link>
          <Link href="/blog/embedded/ep02-shell-script" className="group block bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-orange-600 transition-colors">EP.02 — Shell Script 入門</p>
            <p className="text-sm text-gray-500 mt-1">10 個自動化腳本模板</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-orange-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Linux', 'Commands', 'Embedded', 'Cron', 'Permissions', 'EP.01'].map((tag) => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
