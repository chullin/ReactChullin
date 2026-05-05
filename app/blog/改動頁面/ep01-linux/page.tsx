'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar, User, Clock, Quote, ArrowRight, Terminal,
  Shield, Cpu, Network, Search, AlarmClock,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/* ─── Inline CodeBlock ─── */
const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
  <div className="rounded-xl overflow-hidden shadow-lg my-4 font-mono text-sm">
    {/* macOS traffic lights */}
    <div className="flex items-center gap-1.5 bg-[#1e1e1e] px-4 py-2.5 border-b border-white/10">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block" />
      <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block" />
      <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block" />
      {title && <span className="ml-3 text-gray-400 text-xs">{title}</span>}
    </div>
    <div className="bg-[#0d1117] p-5 overflow-x-auto">
      <pre className="text-green-400 leading-relaxed whitespace-pre">{code}</pre>
    </div>
  </div>
);

/* ─── Section Heading ─── */
const SectionHeading = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
    <div className={`w-7 h-1.5 rounded-full ${color}`} />
    {children}
  </h2>
);

/* ─── Info Box ─── */
const InfoBox = ({
  color, children,
}: {
  color: 'blue' | 'teal' | 'yellow' | 'green' | 'red';
  children: React.ReactNode;
}) => {
  const map = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    teal: 'bg-teal-50 border-teal-200 text-teal-900',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    red: 'bg-red-50 border-red-200 text-red-900',
  };
  return (
    <div className={`border rounded-2xl p-5 text-sm font-medium leading-relaxed ${map[color]}`}>
      {children}
    </div>
  );
};

export default function EmbeddedEP01Page() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[54vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-700 via-cyan-700 to-sky-700">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-white/20 text-white border-white/30 font-bold uppercase text-[10px]">
                嵌入式與系統
              </Chip>
              <Chip size="sm" variant="flat" className="bg-teal-300/30 text-teal-100 border-teal-300/40 font-bold uppercase text-[10px]">
                EP.01
              </Chip>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Linux 基礎指令<br />
              <span className="text-cyan-200 text-3xl md:text-4xl">嵌入式工程師必知的 20 個指令</span>
            </h1>

            <p className="text-base md:text-lg text-white/70 font-medium mt-4">
              檔案操作、權限管理、cron 排程、process 管理 — 附面試常考題
            </p>

            <div className="flex items-center justify-center gap-6 mt-7 flex-wrap">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm">
                <User size={14} className="text-cyan-300" />
                <span>Joseph Chen</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm">
                <Calendar size={14} className="text-cyan-300" />
                <span>2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm">
                <Clock size={14} className="text-cyan-300" />
                <span>12 min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-14">

          {/* Opening Quote */}
          <Card className="border border-teal-100 shadow-sm bg-teal-50/40">
            <CardBody className="p-7 relative overflow-hidden">
              <Quote size={44} className="text-teal-200 absolute -top-2 -left-1 rotate-6" />
              <p className="text-lg font-black text-teal-900 leading-snug relative z-10">
                「會用 Linux 指令，就能和嵌入式板子對話。不會，你只是在猜。」
              </p>
              <p className="text-sm text-teal-600 mt-3 font-medium relative z-10">— 每個用 Raspberry Pi 踩過坑的工程師</p>
            </CardBody>
          </Card>

          <div className="space-y-12 text-gray-600 leading-relaxed">

            {/* Section 1 */}
            <section className="space-y-4">
              <SectionHeading color="bg-teal-500">為什麼軟體工程師需要懂 Linux</SectionHeading>
              <p>
                不管你是做 Web 後端、還是嵌入式開發，幾乎都繞不開 Linux。Raspberry Pi 跑的是 Raspberry Pi OS（基於 Debian）、工廠的嵌入式控制板通常跑 Embedded Linux、你的 AWS/GCP server 也是 Linux。
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: <Cpu size={20} className="text-teal-600" />, title: 'Raspberry Pi / 嵌入式', desc: '操作 GPIO、讀取 sensor、管理服務，全靠指令列' },
                  { icon: <Terminal size={20} className="text-cyan-600" />, title: '伺服器部署', desc: 'SSH 進機器、查 log、重啟服務、設定 cron' },
                  { icon: <Search size={20} className="text-sky-600" />, title: '除錯與監控', desc: 'ps/top 看 process、grep 搜 log、find 找檔案' },
                ].map((item, i) => (
                  <Card key={i} className="border border-gray-100 shadow-none">
                    <CardBody className="p-5 space-y-2">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-black text-gray-900 text-sm">{item.title}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-5">
              <SectionHeading color="bg-cyan-500">檔案與目錄操作速查</SectionHeading>
              <p>這 10 個指令你每天都會用到，背起來：</p>

              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-black text-gray-900">指令</th>
                      <th className="text-left p-4 font-black text-gray-900">說明</th>
                      <th className="text-left p-4 font-black text-gray-900">常用範例</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['ls -la', '列出所有檔案（含隱藏），含詳細資訊', 'ls -la /var/log'],
                      ['cd', '切換目錄', 'cd /home/pi && cd ..'],
                      ['pwd', '顯示目前路徑', 'pwd'],
                      ['mkdir -p', '建立目錄（含父層）', 'mkdir -p /opt/app/config'],
                      ['rm -rf', '強制刪除目錄與內容', 'rm -rf /tmp/build'],
                      ['cp -r', '複製目錄（遞迴）', 'cp -r /src /backup'],
                      ['mv', '移動或重命名', 'mv old.txt new.txt'],
                      ['find', '搜尋檔案', 'find /var -name "*.log" -mtime +7'],
                      ['cat / less / tail -f', '查看檔案內容 / 即時追蹤', 'tail -f /var/log/syslog'],
                      ['grep', '文字搜尋（支援 regex）', 'grep -r "ERROR" /var/log/'],
                    ].map(([cmd, desc, ex], i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
                        <td className="p-4 font-mono text-teal-700 font-bold text-xs">{cmd}</td>
                        <td className="p-4 text-gray-700 font-medium">{desc}</td>
                        <td className="p-4 font-mono text-gray-500 text-xs">{ex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <CodeBlock
                title="terminal — 常見操作範例"
                code={`# 找出 7 天前的 log 並刪除
find /var/log -name "*.log" -mtime +7 -exec rm {} \\;

# 即時追蹤應用 log（Ctrl+C 結束）
tail -f /var/log/app/production.log

# 遞迴找出所有包含 "ERROR" 的行
grep -rn "ERROR" /var/log/ --include="*.log"

# 列出目前目錄，按大小排序
ls -lhS`}
              />
            </section>

            {/* Section 3 */}
            <section className="space-y-5">
              <SectionHeading color="bg-sky-500">
                <Shield size={22} className="text-sky-500" />
                權限管理
              </SectionHeading>

              <p>
                Linux 的權限系統是最常被初學者跳過、也最常在面試出現的主題。核心是三組 rwx：
              </p>

              {/* Permission visual */}
              <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-3 text-xs">$ ls -la script.sh</div>
                <div className="text-green-400 text-base md:text-lg">
                  -<span className="text-blue-400">rwx</span><span className="text-yellow-400">r-x</span><span className="text-red-400">r--</span>  1 joseph staff  1234 Jan 01 10:00 script.sh
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
                  <div className="text-gray-500">檔案類型</div>
                  <div className="text-blue-400">User (owner)</div>
                  <div className="text-yellow-400">Group</div>
                  <div className="text-red-400">Other</div>
                  <div className="text-gray-400 font-bold">-</div>
                  <div className="text-blue-300">rwx = 7</div>
                  <div className="text-yellow-300">r-x = 5</div>
                  <div className="text-red-300">r-- = 4</div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-black text-gray-900">權限值</th>
                      <th className="text-left p-4 font-black text-gray-900">rwx 組合</th>
                      <th className="text-left p-4 font-black text-gray-900">意義</th>
                      <th className="text-left p-4 font-black text-gray-900">適用場景</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['755', 'rwxr-xr-x', 'owner 全權，group/other 可讀執行', '可執行腳本、可執行目錄'],
                      ['644', 'rw-r--r--', 'owner 可讀寫，group/other 唯讀', '一般設定檔、文字檔'],
                      ['600', 'rw-------', 'owner 可讀寫，其他人無權限', 'SSH private key、密碼檔'],
                      ['777', 'rwxrwxrwx', '所有人全權（危險！）', '除錯用，正式環境禁用'],
                    ].map(([val, rwx, desc, scene], i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="p-4 font-mono font-black text-teal-700">{val}</td>
                        <td className="p-4 font-mono text-gray-600 text-xs">{rwx}</td>
                        <td className="p-4 text-gray-700">{desc}</td>
                        <td className="p-4 text-gray-500 text-xs">{scene}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <CodeBlock
                title="terminal — 權限操作"
                code={`# 給腳本執行權限
chmod +x deploy.sh
chmod 755 deploy.sh       # 等效

# 遞迴改變目錄擁有者
chown -R pi:pi /home/pi/project

# 切換成 root（謹慎使用）
sudo su -

# 以 root 身份執行單一指令
sudo systemctl restart nginx`}
              />

              <InfoBox color="yellow">
                <strong>chmod 數字計算：</strong> r=4, w=2, x=1，三個數字加起來分別代表 user/group/other。<br />
                例如 755 = <strong>7（rwx）</strong> + <strong>5（r-x）</strong> + <strong>5（r-x）</strong>
              </InfoBox>
            </section>

            {/* Section 4 */}
            <section className="space-y-5">
              <SectionHeading color="bg-purple-500">文字處理三劍客</SectionHeading>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    name: 'grep',
                    color: 'border-teal-200 bg-teal-50',
                    title: '搜尋',
                    desc: '從檔案或 stdin 搜尋符合 pattern 的行',
                    example: 'grep -n "ERROR" app.log',
                  },
                  {
                    name: 'sed',
                    color: 'border-purple-200 bg-purple-50',
                    title: '取代 / 刪除',
                    desc: '串流編輯器，最常用來取代字串',
                    example: "sed -i 's/old/new/g' config.txt",
                  },
                  {
                    name: 'awk',
                    color: 'border-orange-200 bg-orange-50',
                    title: '欄位處理',
                    desc: '按欄位（空格分隔）拆解與計算，適合處理表格資料',
                    example: "awk '{print $1, $3}' access.log",
                  },
                ].map((item) => (
                  <div key={item.name} className={`rounded-xl border p-5 ${item.color}`}>
                    <div className="font-black text-gray-900 text-lg font-mono mb-1">{item.name}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase mb-2">{item.title}</div>
                    <p className="text-sm text-gray-700 mb-3">{item.desc}</p>
                    <code className="text-xs font-mono bg-white/70 px-2 py-1 rounded text-gray-800 block">
                      {item.example}
                    </code>
                  </div>
                ))}
              </div>

              <CodeBlock
                title="terminal — 三劍客組合技"
                code={`# 找出 access.log 中 500 錯誤的 IP，並計算次數
grep "500" access.log | awk '{print $1}' | sort | uniq -c | sort -rn

# 批次取代設定檔中的 IP
sed -i 's/192.168.1.1/10.0.0.1/g' /etc/app/config.ini

# 印出 CSV 第 2 欄
awk -F',' '{print $2}' data.csv`}
              />
            </section>

            {/* Section 5 */}
            <section className="space-y-5">
              <SectionHeading color="bg-orange-500">
                <Cpu size={22} className="text-orange-500" />
                Process 管理
              </SectionHeading>

              <p>在嵌入式或伺服器環境，你常常需要確認哪個 process 在佔用 CPU/記憶體、強制結束某個卡住的程式。</p>

              <CodeBlock
                title="terminal — process 管理"
                code={`# 列出所有執行中的 process（含完整路徑）
ps aux

# 按記憶體排序（由高到低）
ps aux --sort=-%mem | head -10

# 互動式即時監控（按 q 離開）
top
# 推薦安裝 htop（更友善的 UI）
htop

# 終止 process（先用 ps 找 PID）
kill 1234          # 送 SIGTERM（優雅結束）
kill -9 1234       # 送 SIGKILL（強制結束）
killall nginx      # 以名稱結束所有同名 process

# 讓指令在背景執行
./long_task.sh &
# 把背景工作帶回前景
fg
# 把前景工作送到背景（先 Ctrl+Z 暫停再 bg）
bg`}
              />

              <InfoBox color="teal">
                <strong>kill -9 vs kill：</strong><br />
                <code className="font-mono">kill PID</code>（SIGTERM）會讓程式有機會做清理後結束；
                <code className="font-mono"> kill -9 PID</code>（SIGKILL）是直接從 kernel 層強制殺掉，
                程式沒有機會做任何清理動作。優先用 SIGTERM，SIGKILL 是最後手段。
              </InfoBox>
            </section>

            {/* Section 6 */}
            <section className="space-y-5">
              <SectionHeading color="bg-indigo-500">
                <AlarmClock size={22} className="text-indigo-500" />
                cron 排程
              </SectionHeading>

              <p>
                <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">cron</code> 是 Linux 的內建排程器，讓你在指定時間自動執行腳本。用 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">crontab -e</code> 編輯。
              </p>

              {/* Cron syntax visual */}
              <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 text-xs mb-3">crontab 語法格式：</div>
                <div className="text-green-400 text-base mb-4">* * * * * /path/to/command</div>
                <div className="grid grid-cols-5 gap-2 text-xs text-center">
                  {[
                    { label: '分鐘', range: '0–59', color: 'text-blue-400' },
                    { label: '小時', range: '0–23', color: 'text-yellow-400' },
                    { label: '日', range: '1–31', color: 'text-green-400' },
                    { label: '月', range: '1–12', color: 'text-red-400' },
                    { label: '星期', range: '0–7 (0,7=日)', color: 'text-purple-400' },
                  ].map((col) => (
                    <div key={col.label}>
                      <div className={`font-black ${col.color} text-lg`}>*</div>
                      <div className="text-gray-300 mt-1 font-bold">{col.label}</div>
                      <div className="text-gray-500 mt-0.5">{col.range}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-black text-gray-900">cron 表達式</th>
                      <th className="text-left p-4 font-black text-gray-900">執行時機</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['0 2 * * *', '每天凌晨 2:00'],
                      ['*/5 * * * *', '每 5 分鐘執行一次'],
                      ['0 9 * * 1', '每週一早上 9:00'],
                      ['0 0 1 * *', '每月 1 日午夜'],
                      ['30 18 * * 1-5', '週一到週五，每天 18:30'],
                    ].map(([expr, desc], i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="p-4 font-mono text-indigo-700 font-bold text-xs">{expr}</td>
                        <td className="p-4 text-gray-700">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <CodeBlock
                title="crontab -e — 每天凌晨 2 點備份"
                code={`# 每天凌晨 2:00 執行備份腳本，輸出導到 log
0 2 * * * /home/pi/scripts/backup.sh >> /var/log/backup.log 2>&1

# 編輯 crontab
crontab -e

# 查看目前的 crontab
crontab -l

# 刪除所有 crontab
crontab -r`}
              />
            </section>

            {/* Section 7 */}
            <section className="space-y-5">
              <SectionHeading color="bg-blue-500">
                <Network size={22} className="text-blue-500" />
                常用網路指令
              </SectionHeading>

              <CodeBlock
                title="terminal — 網路操作"
                code={`# 測試連線是否通
ping -c 4 8.8.8.8

# 下載檔案 / 測試 API
curl -s https://api.example.com/status | python3 -m json.tool
wget https://example.com/firmware.bin -O /tmp/firmware.bin

# SSH 連線到遠端機器
ssh pi@192.168.1.100
ssh -i ~/.ssh/id_rsa user@server.com

# 安全複製（本機 → 遠端）
scp ./deploy.sh pi@192.168.1.100:/home/pi/

# 查看 port 使用狀況
ss -tulnp
netstat -tulnp`}
              />

              <InfoBox color="blue">
                <strong>ssh -i</strong> 指定私鑰檔案；<br />
                <strong>scp</strong> 語法 = <code className="font-mono">scp [來源] [目標]</code>，遠端路徑格式為 <code className="font-mono">user@host:/path/to/file</code>
              </InfoBox>
            </section>

            {/* Section 8 — Interview Q&A */}
            <section className="space-y-6">
              <SectionHeading color="bg-rose-500">面試常考題</SectionHeading>

              {[
                {
                  q: 'Q1. chmod 755 代表什麼？',
                  a: 'r=4, w=2, x=1，三組分別對應 user/group/other。755 = rwx(7) r-x(5) r-x(5)。Owner 可讀、寫、執行；group 和 other 可讀、執行，但不能修改。',
                  code: null,
                },
                {
                  q: 'Q2. 如何找出佔用最多記憶體的 process？',
                  a: '有幾種方法，最常用的是 ps aux 排序，或直接看 top/htop：',
                  code: `# 按記憶體佔用比率排序（由高到低），取前 5 個
ps aux --sort=-%mem | head -5

# 或用 top，按 M 鍵就能切成記憶體排序`,
                },
                {
                  q: 'Q3. find 和 grep 的差別？',
                  a: 'find 是找「檔案本身」（依名稱、路徑、時間、大小等條件）；grep 是找「檔案內容」中符合 pattern 的行。兩者常搭配使用：先 find 找到目標檔案，再 grep 搜尋內容。',
                  code: `# 找到所有 .log 檔中包含 "FATAL" 的行
find /var/log -name "*.log" | xargs grep "FATAL"`,
                },
                {
                  q: 'Q4. 如何讓腳本在背景持續執行，即使 SSH 斷線也不停？',
                  a: '直接用 & 放背景，SSH 斷線後 process 會收到 SIGHUP 而結束。要讓它持續跑，需要用 nohup 或 screen/tmux：',
                  code: `# nohup：忽略 hangup 訊號，輸出寫到 nohup.out
nohup ./server.sh &

# 或用 screen（更推薦，可以重連）
screen -S mySession
./server.sh
# Ctrl+A, D 暫時離開
screen -r mySession  # 重新連回`,
                },
                {
                  q: 'Q5. /etc/hosts 是做什麼的？',
                  a: '/etc/hosts 是本機的 DNS 覆寫表。在 DNS 查詢之前，系統會先查這個檔案。嵌入式環境常用它來把 hostname 對應到 IP，也常用來 block 某些網域（如廣告攔截）。',
                  code: `# /etc/hosts 範例
127.0.0.1       localhost
192.168.1.100   raspberrypi.local
10.0.0.5        build-server`,
                },
              ].map((item, i) => (
                <Card key={i} className="border border-gray-100 shadow-sm">
                  <CardBody className="p-6 space-y-3">
                    <p className="font-black text-gray-900 text-base">{item.q}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                    {item.code && <CodeBlock code={item.code} />}
                  </CardBody>
                </Card>
              ))}
            </section>

            {/* Closing highlight */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-[2rem] p-8 space-y-3">
              <p className="font-black text-gray-900 text-lg">這 20 個指令的核心原則</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                {[
                  '懂 rwx 三組權限，chmod 數字就不會再算錯',
                  'ps aux + kill 處理 90% 的 process 問題',
                  'grep + find + awk 組合，log 分析無難題',
                  'cron 設定搭配 2>&1 >> log 做好輸出記錄',
                  'SSH + scp 是遠端操作嵌入式設備的基本功',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-500 font-black mt-0.5">→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Divider className="my-12 opacity-40" />

          {/* Series Navigation */}
          <div className="grid grid-cols-2 gap-4">
            {/* No prev for EP.01 */}
            <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
              <p className="text-sm text-gray-400 font-medium">← 這是第一篇</p>
            </div>

            <Link
              href="/blog/embedded/ep02-shell"
              className="group block bg-gray-50 hover:bg-teal-50 transition-colors rounded-2xl p-6 text-right"
            >
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-900 group-hover:text-teal-700 transition-colors">
                EP.02 — Shell Script
              </p>
              <p className="text-sm text-gray-500 mt-1">讓工作自動化，10 個實用腳本模板</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-teal-500 transition-colors" />
            </Link>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-3 flex-wrap pt-2">
            {['Linux', 'Shell', '嵌入式', 'chmod', 'cron', 'Raspberry Pi', 'EP.01'].map((tag) => (
              <Chip key={tag} variant="flat" color="default" className="font-bold">{tag}</Chip>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
