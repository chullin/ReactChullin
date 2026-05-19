import { FadeIn } from '@/components/blog/ScrollAnimation';
import {
  Calendar,
  User,
  Clock,
  Quote,
  ArrowLeft,
  ArrowRight,
  Terminal,
  AlertTriangle,
  Lightbulb,
  FileCode,
  Info
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shell Script 入門 讓工作自動化 | Joseph Chen',
  description: '變數、迴圈、條件判斷、函數 — 10 個工程師實際用到的腳本模板',
  alternates: {
    canonical: 'https://chullin.tw/blog/embedded/ep02-shell',
  },
};



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
  color: 'blue' | 'slate' | 'yellow' | 'green' | 'red';
  children: React.ReactNode;
}) => {
  const map = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    slate: 'bg-slate-50 border-slate-200 text-slate-900',
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

/* ─── Script Template Card ─── */
const ScriptCard = ({
  num, title, code,
}: {
  num: number;
  title: string;
  code: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-black flex-shrink-0">
        {num}
      </div>
      <p className="font-black text-gray-900">{title}</p>
    </div>
    <CodeBlock lang="bash" code={code} />
  </div>
);

export default function EmbeddedEP02Page() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <div className="relative h-[54vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-700 via-gray-700 to-zinc-700">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <FadeIn>
            <div className="flex justify-center gap-2 mb-5">
              <span   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-white/20 text-white border-white/30 font-bold uppercase text-[10px]">
                嵌入式與系統
              </span>
              <span   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 bg-slate-300/30 text-slate-100 border-slate-300/40 font-bold uppercase text-[10px]">
                EP.02
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Shell Script 入門<br />
              <span className="text-gray-300 text-3xl md:text-4xl">讓工作自動化</span>
            </h1>

            <p className="text-base md:text-lg text-white/70 font-medium mt-4">
              變數、迴圈、條件判斷、函數 — 10 個工程師實際用到的腳本模板
            </p>

            <div className="flex items-center justify-center gap-6 mt-7 flex-wrap">
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm">
                <User size={14} className="text-slate-300" />
                <span>Joseph Chen</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm">
                <Calendar size={14} className="text-slate-300" />
                <span>2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 font-bold text-sm">
                <Clock size={14} className="text-slate-300" />
                <span>15 min read</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Article Body ── */}
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-14">

          {/* Opening Quote */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-slate-100 shadow-sm bg-slate-50/50">
            <div className="p-7 relative overflow-hidden">
              <Quote size={44} className="text-slate-200 absolute -top-2 -left-1 rotate-6" />
              <p className="text-lg font-black text-slate-900 leading-snug relative z-10">
                「一個會寫 Shell Script 的工程師，等於多了一個 24 小時不休息的助手。」
              </p>
              <p className="text-sm text-slate-500 mt-3 font-medium relative z-10">— 每個深夜還在手動備份資料的工程師</p>
            </div>
          </div>

          <div className="space-y-12 text-gray-600 leading-relaxed">

            {/* Section 1 — 什麼是 Shell Script */}
            <section className="space-y-5">
              <SectionHeading color="bg-slate-500">
                <Terminal size={22} className="text-slate-500" />
                什麼是 Shell Script
              </SectionHeading>

              <p>
                Shell Script 就是把一連串的 Linux 指令寫進一個 <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">.sh</code> 檔案，讓它自動依序執行。不需要編譯，直接由 shell（通常是 bash）解讀執行。
              </p>

              <CodeBlock lang="bash"
                title="hello.sh — 第一個 Shell Script"
                code={`#!/bin/bash
# shebang：告訴系統用 bash 來執行這個檔案

echo "Hello, World!"
echo "今天是 $(date)"
echo "目前目錄：$(pwd)"`}
              />

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    step: '1',
                    title: '新增 shebang',
                    desc: '第一行寫 #!/bin/bash，告訴系統用哪個 shell 執行',
                    color: 'bg-slate-50 border-slate-200',
                  },
                  {
                    step: '2',
                    title: 'chmod +x',
                    desc: '給腳本執行權限，否則會拒絕執行',
                    color: 'bg-gray-50 border-gray-200',
                  },
                  {
                    step: '3',
                    title: './script.sh',
                    desc: '用 ./ 指定當前目錄執行；或 bash script.sh',
                    color: 'bg-zinc-50 border-zinc-200',
                  },
                ].map((item) => (
                  <div key={item.step} className={`rounded-xl border p-5 ${item.color}`}>
                    <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-black mb-3">
                      {item.step}
                    </div>
                    <p className="font-black text-gray-900 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <CodeBlock lang="bash"
                title="terminal — 執行流程"
                code={`# 建立腳本
nano hello.sh

# 給執行權限
chmod +x hello.sh

# 執行
./hello.sh

# 或直接用 bash 執行（不需要 chmod）
bash hello.sh`}
              />
            </section>

            {/* Section 2 — 基礎語法 */}
            <section className="space-y-6">
              <SectionHeading color="bg-gray-500">
                <FileCode size={22} className="text-gray-500" />
                基礎語法速查
              </SectionHeading>

              {/* 2a 變數 */}
              <div className="space-y-3">
                <p className="font-black text-gray-900 text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-slate-600 text-white flex items-center justify-center text-[10px] font-black">A</span>
                  變數
                </p>
                <InfoBox color="yellow">
                  <strong>重要：</strong>等號兩側不能有空格！<code className="font-mono">NAME = "Joseph"</code> 是錯的，<code className="font-mono">NAME="Joseph"</code> 才是對的。
                </InfoBox>
                <CodeBlock lang="bash"
                  title="variables.sh — 變數基礎"
                  code={`#!/bin/bash

# 定義變數（不加 $，不加空格）
NAME="Joseph"
AGE=28
PI=3.14

# 讀取變數（加 $）
echo "My name is $NAME"
echo "Age: \${AGE}"         # 大括號明確標示變數範圍

# 腳本參數（$0 是腳本名，$1 是第一個參數）
echo "腳本名稱：$0"
echo "第一個參數：$1"
echo "第二個參數：$2"

# 執行：./script.sh hello world
# $1 = hello, $2 = world

# 命令替換：把指令結果存成變數
TODAY=$(date +%Y-%m-%d)
HOSTNAME=$(hostname)
echo "今天是 $TODAY，在 $HOSTNAME 上執行"`}
                />
              </div>

              {/* 2b 條件判斷 */}
              <div className="space-y-3">
                <p className="font-black text-gray-900 text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-slate-600 text-white flex items-center justify-center text-[10px] font-black">B</span>
                  條件判斷
                </p>
                <CodeBlock lang="bash"
                  title="conditions.sh — if/elif/else"
                  code={`#!/bin/bash

FILE="/etc/hosts"
VALUE=10

# 檔案/目錄檢查
if [ -f "$FILE" ]; then
    echo "$FILE 存在"
elif [ -d "$FILE" ]; then
    echo "$FILE 是目錄"
else
    echo "$FILE 不存在"
fi

# 字串檢查
NAME=""
if [ -z "$NAME" ]; then      # -z：字串為空
    echo "NAME 是空的"
fi

NAME="Joseph"
if [ -n "$NAME" ]; then      # -n：字串非空
    echo "NAME 不為空：$NAME"
fi

# 數值比較
if [ $VALUE -eq 10 ]; then   # -eq: 等於
    echo "VALUE 等於 10"
elif [ $VALUE -gt 5 ]; then  # -gt: 大於
    echo "VALUE 大於 5"
elif [ $VALUE -lt 20 ]; then # -lt: 小於
    echo "VALUE 小於 20"
fi

# -ne（不等於）, -ge（>=）, -le（<=） 同理`}
                />

                <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-4 font-black text-gray-900">條件旗標</th>
                        <th className="text-left p-4 font-black text-gray-900">意義</th>
                        <th className="text-left p-4 font-black text-gray-900">範例</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['-f', '檔案存在且是一般檔案', '[ -f config.txt ]'],
                        ['-d', '目錄存在', '[ -d /tmp/logs ]'],
                        ['-e', '檔案或目錄存在', '[ -e /etc/hosts ]'],
                        ['-z', '字串為空', '[ -z "$VAR" ]'],
                        ['-n', '字串非空', '[ -n "$VAR" ]'],
                        ['-eq', '數值等於', '[ $A -eq $B ]'],
                        ['-ne', '數值不等於', '[ $A -ne 0 ]'],
                        ['-gt / -lt', '大於 / 小於', '[ $N -gt 10 ]'],
                      ].map(([flag, desc, ex], i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="p-4 font-mono text-slate-700 font-bold text-xs">{flag}</td>
                          <td className="p-4 text-gray-700">{desc}</td>
                          <td className="p-4 font-mono text-gray-500 text-xs">{ex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2c 迴圈 */}
              <div className="space-y-3">
                <p className="font-black text-gray-900 text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-slate-600 text-white flex items-center justify-center text-[10px] font-black">C</span>
                  迴圈
                </p>
                <CodeBlock lang="bash"
                  title="loops.sh — for / while"
                  code={`#!/bin/bash

# for 迴圈：數字範圍
for i in {1..5}; do
    echo "第 $i 次"
done

# for 迴圈：處理目錄中的檔案
for file in /var/log/*.log; do
    echo "處理：$file"
    # 可加實際處理邏輯
done

# for 迴圈：陣列
SERVERS=("web01" "web02" "db01")
for server in "\${SERVERS[@]}"; do
    echo "連線到 $server"
    # ssh "$server" "uptime"
done

# while 迴圈：計數
COUNT=0
while [ $COUNT -lt 5 ]; do
    echo "Count: $COUNT"
    COUNT=$((COUNT + 1))   # 算術運算用 $((...))
done

# while 迴圈：讀取檔案每行
while IFS= read -r line; do
    echo "行內容：$line"
done < /etc/hosts`}
                />
              </div>

              {/* 2d 函數 */}
              <div className="space-y-3">
                <p className="font-black text-gray-900 text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-slate-600 text-white flex items-center justify-center text-[10px] font-black">D</span>
                  函數定義與呼叫
                </p>
                <CodeBlock lang="bash"
                  title="functions.sh — 函數"
                  code={`#!/bin/bash

# 定義函數
greet() {
    local name=$1       # local：限制變數作用域在函數內
    echo "Hello, $name!"
}

# 有回傳值的函數（透過 echo + 命令替換）
get_timestamp() {
    echo $(date +%Y%m%d_%H%M%S)
}

# 呼叫函數
greet "Joseph"
greet "World"

# 取得函數輸出
TS=$(get_timestamp)
echo "現在時間戳：$TS"

# 函數也可以有 return（只能回傳 0-255 的整數）
check_file() {
    if [ -f "$1" ]; then
        return 0    # 成功
    else
        return 1    # 失敗
    fi
}

check_file "/etc/hosts"
if [ $? -eq 0 ]; then
    echo "檔案存在"
fi`}
                />
              </div>
            </section>

            {/* Section 3 — Special Variables */}
            <section className="space-y-5">
              <SectionHeading color="bg-zinc-500">特殊變數速查表</SectionHeading>

              <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-black text-gray-900">變數</th>
                      <th className="text-left p-4 font-black text-gray-900">意義</th>
                      <th className="text-left p-4 font-black text-gray-900">範例值</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['$0', '腳本本身的名稱', './deploy.sh'],
                      ['$1 ... $9', '第 1 ~ 9 個傳入參數', '$1 = "production"'],
                      ['$#', '傳入參數的數量', '3（傳了三個參數）'],
                      ['$@', '所有參數（陣列形式）', '"arg1" "arg2" "arg3"'],
                      ['$?', '上一個指令的結束碼（exit code）', '0 = 成功，非 0 = 失敗'],
                      ['$$', '目前 shell 的 PID', '12345'],
                      ['$!', '最後一個背景執行的 PID', '12346'],
                      ['$HOME', '目前使用者的家目錄', '/home/joseph'],
                      ['$PATH', '可執行檔搜尋路徑', '/usr/bin:/usr/local/bin...'],
                    ].map(([v, desc, ex], i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
                        <td className="p-4 font-mono font-black text-slate-700">{v}</td>
                        <td className="p-4 text-gray-700">{desc}</td>
                        <td className="p-4 font-mono text-gray-500 text-xs">{ex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 — 10 Script Templates */}
            <section className="space-y-8">
              <SectionHeading color="bg-emerald-500">10 個實用腳本模板</SectionHeading>
              <p>
                這 10 個模板都是實際工作中常用的，直接複製後改參數就能用。
              </p>

              <ScriptCard
                num={1}
                title="備份資料夾 → 帶時間戳的 zip"
                code={`#!/bin/bash
# 用法：./backup.sh /path/to/source /path/to/backup/dir

SOURCE=$1
DEST=$2
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILENAME="backup_\${TIMESTAMP}.tar.gz"

if [ -z "$SOURCE" ] || [ -z "$DEST" ]; then
    echo "用法：$0 <來源目錄> <備份目標目錄>"
    exit 1
fi

mkdir -p "$DEST"
tar -czf "\${DEST}/\${FILENAME}" "$SOURCE"
echo "備份完成：\${DEST}/\${FILENAME}"`}
              />

              <ScriptCard
                num={2}
                title="批次重命名檔案（加前綴）"
                code={`#!/bin/bash
# 把當前目錄的 .log 檔案都加上日期前綴

PREFIX=$(date +%Y%m%d)_
for file in *.log; do
    if [ -f "$file" ]; then
        mv "$file" "\${PREFIX}\${file}"
        echo "重命名：$file → \${PREFIX}\${file}"
    fi
done`}
              />

              <ScriptCard
                num={3}
                title="監控磁碟空間，超過閾值寫入 alert log"
                code={`#!/bin/bash
# 監控 / 磁碟使用率，超過 80% 就寫入警告

THRESHOLD=80
LOG="/var/log/disk_alert.log"
USAGE=$(df / | awk 'NR==2 {print $5}' | tr -d '%')

if [ "$USAGE" -gt "$THRESHOLD" ]; then
    MSG="[$(date)] ALERT: 磁碟使用率 \${USAGE}%，已超過 \${THRESHOLD}%"
    echo "$MSG" >> "$LOG"
    echo "$MSG"
fi`}
              />

              <ScriptCard
                num={4}
                title="等待服務啟動後再執行下一步"
                code={`#!/bin/bash
# 等待 nginx 啟動（最多等 30 秒）

SERVICE="nginx"
MAX_WAIT=30
ELAPSED=0

echo "等待 $SERVICE 啟動..."
until systemctl is-active --quiet "$SERVICE"; do
    sleep 1
    ELAPSED=$((ELAPSED + 1))
    if [ $ELAPSED -ge $MAX_WAIT ]; then
        echo "逾時：$SERVICE 未在 \${MAX_WAIT}s 內啟動"
        exit 1
    fi
done
echo "$SERVICE 已啟動，繼續執行後續步驟"`}
              />

              <ScriptCard
                num={5}
                title="讀取 CSV 逐行處理"
                code={`#!/bin/bash
# CSV 格式：name,age,email
# 跳過標題行，逐行解析

CSV_FILE="users.csv"
LINE_NUM=0

while IFS=',' read -r name age email; do
    LINE_NUM=$((LINE_NUM + 1))
    [ $LINE_NUM -eq 1 ] && continue   # 跳過 header

    echo "姓名：$name | 年齡：$age | Email：$email"
    # 可在這裡加實際處理邏輯（如發信、匯入 DB 等）
done < "$CSV_FILE"`}
              />

              <ScriptCard
                num={6}
                title="自動 git commit + push"
                code={`#!/bin/bash
# 自動 commit 所有變更並 push

BRANCH=$(git rev-parse --abbrev-ref HEAD)
MSG="\${1:-Auto commit: $(date '+%Y-%m-%d %H:%M')}"

git add -A
git commit -m "$MSG"

if [ $? -eq 0 ]; then
    git push origin "$BRANCH"
    echo "成功 push 到 $BRANCH"
else
    echo "沒有變更需要 commit"
fi`}
              />

              <ScriptCard
                num={7}
                title="環境變數檢查腳本（部署前確認）"
                code={`#!/bin/bash
# 確認必要的環境變數都已設定

REQUIRED_VARS=("DB_HOST" "DB_USER" "DB_PASS" "API_KEY")
MISSING=0

for var in "\${REQUIRED_VARS[@]}"; do
    if [ -z "\${!var}" ]; then    # \${!var} 間接取值
        echo "❌ 缺少環境變數：$var"
        MISSING=$((MISSING + 1))
    else
        echo "✅ $var 已設定"
    fi
done

if [ $MISSING -gt 0 ]; then
    echo "共缺少 $MISSING 個環境變數，中止部署"
    exit 1
fi
echo "所有環境變數已就緒，繼續部署"`}
              />

              <ScriptCard
                num={8}
                title="批次 SSH 遠端執行指令"
                code={`#!/bin/bash
# 對多台主機執行同一個指令

SERVERS=("192.168.1.101" "192.168.1.102" "192.168.1.103")
CMD="uptime && df -h / | tail -1"
USER="deploy"

for host in "\${SERVERS[@]}"; do
    echo "=== $host ==="
    ssh -o ConnectTimeout=5 "\${USER}@\${host}" "$CMD" 2>&1 || echo "連線失敗：$host"
    echo ""
done`}
              />

              <ScriptCard
                num={9}
                title="解壓縮並移動到指定目錄"
                code={`#!/bin/bash
# 用法：./extract.sh archive.tar.gz /opt/app

ARCHIVE=$1
DEST=$2

if [ ! -f "$ARCHIVE" ]; then
    echo "找不到檔案：$ARCHIVE"
    exit 1
fi

mkdir -p "$DEST"

case "$ARCHIVE" in
    *.tar.gz|*.tgz)  tar -xzf "$ARCHIVE" -C "$DEST" ;;
    *.tar.bz2)       tar -xjf "$ARCHIVE" -C "$DEST" ;;
    *.zip)           unzip -q "$ARCHIVE" -d "$DEST" ;;
    *)               echo "不支援的格式：$ARCHIVE"; exit 1 ;;
esac

echo "解壓縮完成 → $DEST"`}
              />

              <ScriptCard
                num={10}
                title="每隔 N 秒輪詢，直到條件成立"
                code={`#!/bin/bash
# 等待某個 URL 回應 200（適合等待服務上線）

URL="http://localhost:8080/health"
INTERVAL=5
MAX_RETRIES=12

for i in $(seq 1 $MAX_RETRIES); do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
    if [ "$STATUS" = "200" ]; then
        echo "服務已就緒 (\${URL})"
        exit 0
    fi
    echo "等待中... ($i/\${MAX_RETRIES}) 狀態碼：$STATUS"
    sleep $INTERVAL
done

echo "逾時：服務未在預期時間內就緒"
exit 1`}
              />
            </section>

            {/* Section 5 — Debug */}
            <section className="space-y-5">
              <SectionHeading color="bg-red-500">
                <AlertTriangle size={22} className="text-red-500" />
                常見錯誤與 Debug 技巧
              </SectionHeading>

              <p>Shell Script 最難的不是邏輯，而是各種隱藏的「空白問題」和靜默失敗。這幾個技巧可以幫你快速定位問題：</p>

              <CodeBlock lang="bash"
                title="debug.sh — set -e 與 set -x"
                code={`#!/bin/bash
set -e    # 遇到任何指令錯誤（exit code != 0）立即停止整個腳本
set -x    # Debug 模式：執行前先把每行指令印出來（加上 + 號前綴）
set -u    # 使用未定義變數時立即報錯（推薦加上）

# 建議在正式腳本頂端加：
# set -euo pipefail
# -o pipefail：確保 pipe 中間若有失敗也能被 set -e 捕捉

echo "開始執行"
cp /etc/hosts /tmp/hosts_backup
echo "備份完成"

# 若 cp 失敗，set -e 會讓腳本在這裡停下來
# 不會繼續執行到 "備份完成"`}
              />

              <div className="space-y-4">
                <p className="font-black text-gray-900">最常見的變數空白 Bug</p>
                <InfoBox color="red">
                  <strong>為什麼要加引號？</strong><br />
                  變數值含有空格時，不加引號會被 shell 拆成多個參數。
                  例如 <code className="font-mono">FILE="my file.txt"</code>，
                  <code className="font-mono"> rm $FILE</code> 等於 <code className="font-mono">rm my file.txt</code>（兩個參數），
                  但 <code className="font-mono">rm "$FILE"</code> 才是正確的（一個參數）。
                </InfoBox>
                <CodeBlock lang="bash"
                  title="quotes.sh — 變數引號的重要性"
                  code={`#!/bin/bash

FILENAME="my report 2026.txt"

# 錯誤：shell 會把它拆成 "my"、"report"、"2026.txt" 三個參數
cp $FILENAME /tmp/      # ❌ 會出錯

# 正確：用雙引號包住，保持為一個參數
cp "$FILENAME" /tmp/    # ✅ 正確

# 同理，條件判斷也要加引號
VAR=""
if [ $VAR = "" ]; then    # ❌ VAR 為空時，這行會變成 [ = "" ]，語法錯誤
if [ "$VAR" = "" ]; then  # ✅ 正確`}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    cmd: 'set -e',
                    color: 'border-red-200 bg-red-50',
                    desc: '遇到錯誤立即停止。防止在某步驟失敗後繼續執行，造成更大災難',
                  },
                  {
                    cmd: 'set -x',
                    color: 'border-blue-200 bg-blue-50',
                    desc: 'Debug 模式。逐行印出即將執行的指令，方便看腳本執行到哪一步出問題',
                  },
                  {
                    cmd: 'set -u',
                    color: 'border-yellow-200 bg-yellow-50',
                    desc: '未定義變數報錯。避免打錯變數名卻默默當空字串使用',
                  },
                ].map((item) => (
                  <div key={item.cmd} className={`rounded-xl border p-5 ${item.color}`}>
                    <p className="font-mono font-black text-gray-900 mb-2">{item.cmd}</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6 — Interview Q&A */}
            <section className="space-y-6">
              <SectionHeading color="bg-rose-500">
                <Lightbulb size={22} className="text-rose-500" />
                面試常考題
              </SectionHeading>

              {[
                {
                  q: 'Q1. $? 是什麼？0 代表什麼？',
                  a: '$? 是上一個指令的 exit code（結束碼）。0 代表成功，任何非 0 的值代表失敗（具體數值由程式自定義，通常 1 是一般錯誤，2 是用法錯誤）。這是腳本中做錯誤判斷的最基本機制。',
                  code: `# 判斷上一個指令是否成功
cp source.txt dest.txt
if [ $? -eq 0 ]; then
    echo "複製成功"
else
    echo "複製失敗"
fi

# 更簡潔的寫法
cp source.txt dest.txt && echo "成功" || echo "失敗"`,
                },
                {
                  q: 'Q2. 如何接收腳本參數？',
                  a: '用 $1, $2... 取得位置參數，$# 取得參數個數，$@ 取得全部參數（陣列形式）。在腳本開頭做參數個數檢查是好習慣。',
                  code: `#!/bin/bash
if [ $# -ne 2 ]; then
    echo "用法：$0 <環境> <版本號>"
    echo "範例：$0 production v1.2.3"
    exit 1
fi

ENV=$1
VERSION=$2
echo "部署 $VERSION 到 $ENV 環境"`,
                },
                {
                  q: 'Q3. 2>/dev/null 是什麼意思？',
                  a: 'Linux 有三個標準 I/O 串流：0=stdin, 1=stdout, 2=stderr。2>/dev/null 把 stderr（錯誤輸出）導向 /dev/null（黑洞，丟棄所有輸入）。常用於「不想看到錯誤訊息，只關心是否成功」的場景。',
                  code: `# 只丟棄 stderr
command 2>/dev/null

# 把 stderr 合併到 stdout（常用於 cron log）
command >> /var/log/app.log 2>&1

# 同時丟棄 stdout 和 stderr
command > /dev/null 2>&1`,
                },
                {
                  q: 'Q4. heredoc 中 EOF 的用法？',
                  a: 'Heredoc（Here Document）讓你在 shell script 中直接嵌入多行文字，不需要轉義引號。EOF 是慣用的結束標記（可以用任何字串），結束標記必須獨立一行且頂格。',
                  code: `#!/bin/bash

# 用 heredoc 寫入多行文字到檔案
cat > /tmp/config.ini << 'EOF'
[database]
host = 192.168.1.100
port = 5432
name = myapp
EOF

# 用 heredoc 傳給指令（注意：EOF 不加引號時，$變數 會被展開）
mysql -u root -p << EOF
USE mydb;
SELECT COUNT(*) FROM users;
EOF`,
                },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white shadow-sm border border-gray-100 shadow-sm">
                  <div className="p-6 space-y-3">
                    <p className="font-black text-gray-900 text-base">{item.q}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                    {item.code && <CodeBlock lang="bash" code={item.code} />}
                  </div>
                </div>
              ))}
            </section>

            {/* Closing highlight */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-[2rem] p-8 space-y-3">
              <p className="font-black text-gray-900 text-lg">Shell Script 的核心原則</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                {[
                  '永遠在腳本頂端加 set -euo pipefail，讓錯誤無所遁形',
                  '變數一律加雙引號，避免空格造成的隱性 bug',
                  '腳本開頭做參數個數驗證，提前失敗好過靜默錯誤',
                  '用 $? 或 && / || 做流程控制，而非假設每個指令都成功',
                  'Debug 時用 set -x，上線前記得移除或關掉',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-600 font-black mt-0.5">→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-gray-100 my-12 opacity-40"  />

          {/* Series Navigation */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/blog/embedded/ep01-linux"
              className="group block bg-gray-50 hover:bg-slate-100 transition-colors rounded-2xl p-6"
            >
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-900 group-hover:text-slate-700 transition-colors">
                EP.01 — Linux 基礎指令
              </p>
              <p className="text-sm text-gray-500 mt-1">嵌入式工程師必知的 20 個指令</p>
              <ArrowLeft size={18} className="mt-3 text-gray-400 group-hover:text-slate-500 transition-colors" />
            </Link>

            <Link
              href="/blog/embedded/ep03-uart-i2c"
              className="group block bg-gray-50 hover:bg-slate-100 transition-colors rounded-2xl p-6 text-right"
            >
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-900 group-hover:text-slate-700 transition-colors">
                EP.03 — UART & I2C
              </p>
              <p className="text-sm text-gray-500 mt-1">嵌入式通訊協定實戰</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-slate-500 transition-colors" />
            </Link>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-3 flex-wrap pt-2">
            {['Shell Script', 'Bash', '自動化', 'Linux', '嵌入式', 'EP.02'].map((tag) => (
              <span key={tag}   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-bold">{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
