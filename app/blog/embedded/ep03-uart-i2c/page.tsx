import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  Eye,
  Info
} from 'lucide-react';

import Link from 'next/link';
import CodeBlock from '@/components/blog/CodeBlock';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UART &amp; I2C 嵌入式硬體溝通基礎原理 | Joseph Chen',
  description: '不需要深入硬體，只需理解軟體工程師該懂的通訊概念 — Python pyserial / smbus 實作',
  alternates: {
    canonical: 'https://chullin.tw/blog/embedded/ep03-uart-i2c',
  },
};



/* ─── Inline Components ─────────────────────────────────────── */

const InfoBox = ({
  color,
  title,
  children,
}: {
  color: 'blue' | 'amber' | 'cyan' | 'red' | 'green';
  title: string;
  children: React.ReactNode;
}) => {
  const styles = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    amber: 'bg-amber-50 border-amber-200 text-amber-900',
    cyan: 'bg-cyan-50 border-cyan-200 text-cyan-900',
    red: 'bg-red-50 border-red-200 text-red-900',
    green: 'bg-green-50 border-green-200 text-green-900',
  };
  return (
    <div className={`border rounded-2xl p-6 ${styles[color]}`}>
      <p className="font-black mb-3">{title}</p>
      <div className="text-sm leading-relaxed space-y-1.5">{children}</div>
    </div>
  );
};

/* ─── Page ──────────────────────────────────────────────────── */

export default function EmbeddedEP03Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.03</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium">嵌入式與系統</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
              UART &amp; I2C<br />
              <span className="text-cyan-200">嵌入式硬體溝通基礎原理</span>
            </h1>
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl">
              不需要深入硬體，只需理解軟體工程師該懂的通訊概念 —<br />
              Python pyserial / smbus 實作
            </p>
            <div className="flex items-center gap-6 text-cyan-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 10 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> UART · I2C · Python · Raspberry Pi</span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Article ── */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Opening Quote */}
        <section   >
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-lg">
            <div className="p-8">
              <div className="flex gap-4">
                <Quote size={32} className="text-cyan-300 shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-4">
                    「在 SCT 工作時，第一次用 Python 控制硬體設備，才發現程式碼和硬體之間需要一種「共同語言」——通訊協定。不需要懂電路，只要知道資料是如何被打包和傳送的，就能寫出穩定的通訊程式。」
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    UART 和 I2C 是嵌入式系統最基礎的兩種通訊協定。這篇從軟體工程師的視角切入，
                    不講電氣規格，而是聚焦在「如何用 Python 與硬體溝通」、「兩種協定的使用場景差異」、
                    以及「實際工作中最常遇到的排查問題」。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 1. 為什麼軟體工程師要懂通訊協定 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">1. 為什麼軟體工程師要懂通訊協定</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            隨著 Raspberry Pi 和 Arduino 普及，軟體工程師越來越常需要寫程式控制硬體。
            了解通訊協定的基礎概念，讓你能夠快速排查問題、選對工具。
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-sm bg-cyan-50">
              <div className="p-6 space-y-2">
                <p className="font-black text-cyan-800">Raspberry Pi 控制感測器</p>
                <p className="text-sm text-cyan-700 leading-relaxed">
                  溫濕度、距離、加速度感測器大多透過 UART 或 I2C 介面連接，
                  Python 幾行程式就能讀取數據。
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-sm bg-teal-50">
              <div className="p-6 space-y-2">
                <p className="font-black text-teal-800">測試儀器 UART Console</p>
                <p className="text-sm text-teal-700 leading-relaxed">
                  嵌入式設備的 debug console 幾乎都走 UART，
                  透過 pyserial 可以自動化擷取設備 log 與發送指令。
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-sm bg-emerald-50">
              <div className="p-6 space-y-2">
                <p className="font-black text-emerald-800">I2C 多感測器整合</p>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  一條 I2C bus 可同時連接多個感測器，用地址區分，
                  特別適合 IoT 設備中需要整合多種感測器的場景。
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 2. UART */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">2. UART — 點對點非同步通訊</h2>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-cyan-50 shadow-sm">
            <div className="p-6">
              <p className="font-black text-cyan-800 text-lg mb-2">一句話理解 UART</p>
              <p className="text-cyan-700 text-base">
                「兩條線，Tx 發、Rx 收，點對點非同步通訊。雙方不需要共用時鐘，但必須事先約定好相同的 Baud rate。」
              </p>
            </div>
          </div>

          {/* 關鍵參數表格 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-cyan-100 text-cyan-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl">參數</th>
                  <th className="text-left px-4 py-3 font-black">常用值</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">說明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Baud rate', '9600 / 115200 bps', '每秒傳輸的符號數，雙方必須一致，否則資料亂碼'],
                  ['Data bits', '8 bits（幾乎固定）', '每次傳輸的資料位元數'],
                  ['Stop bits', '1 bit', '標記每個資料框的結束，常見值為 1 或 2'],
                  ['Parity', 'None（最常見）', '奇偶校驗，用於基礎錯誤檢測，多數場景設 None'],
                  ['Flow control', 'None / RTS-CTS', '流量控制，簡單場景不需要'],
                ].map(([param, val, desc]) => (
                  <tr key={param} className="bg-white hover:bg-cyan-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-cyan-700">{param}</td>
                    <td className="px-4 py-3 font-mono text-teal-600 text-xs font-bold">{val}</td>
                    <td className="px-4 py-3 text-gray-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 視覺化：Tx/Rx 連接方式 */}
          <div className="space-y-3">
            <p className="font-black text-gray-700 text-sm uppercase tracking-wide">連接方式：交叉接線（Cross-connection）</p>
            <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300 font-bold w-24">Device A</span>
                  <span className="text-green-400">[Tx] ──────────────→ [Rx]</span>
                  <span className="text-teal-300 font-bold w-24">Device B</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300 font-bold w-24">Device A</span>
                  <span className="text-yellow-400">[Rx] ←────────────── [Tx]</span>
                  <span className="text-teal-300 font-bold w-24">Device B</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300 font-bold w-24">Device A</span>
                  <span className="text-gray-400">[GND] ─────────────── [GND]</span>
                  <span className="text-teal-300 font-bold w-24">Device B</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-4">⚠ Tx 接 Rx，不能 Tx 接 Tx（常見接錯）</p>
            </div>
          </div>

          {/* Python pyserial */}
          <p className="text-gray-600 leading-relaxed">
            Python 的 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">pyserial</code> 套件封裝了 UART 操作，
            安裝後幾行程式碼就能與設備通訊：
          </p>

          <CodeBlock lang="python"
            title="pyserial 基本使用"
            code={`import serial
import time

# 開啟串口
# Windows: 'COM3'、Linux/Mac: '/dev/ttyUSB0' 或 '/dev/ttyAMA0'
ser = serial.Serial(
    port='/dev/ttyUSB0',
    baudrate=115200,
    bytesize=serial.EIGHTBITS,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    timeout=1          # 讀取逾時（秒），None = 永久等待
)

# 傳送資料（bytes，記得加 \\n 結尾）
ser.write(b'HELLO\\n')

# 讀取一行回應
response = ser.readline().decode('utf-8').strip()
print(f'Device replied: {response}')

# 讀取固定長度的資料
raw_bytes = ser.read(10)

# 清空緩衝區
ser.flushInput()

# 完成後關閉
ser.close()`}
          />

          <InfoBox color="red" title="UART 最常見的問題">
            <p>• <strong>Baud rate 不一致</strong>：資料亂碼（出現奇怪字元）的第一個排查點，確認雙方設定完全相同。</p>
            <p>• <strong>Tx 接 Tx（接錯線）</strong>：完全收不到資料，記住要交叉接——A 的 Tx 接 B 的 Rx。</p>
            <p>• <strong>權限問題（Linux）</strong>：<code>Permission denied: '/dev/ttyUSB0'</code>，執行 <code>sudo usermod -aG dialout $USER</code> 後重新登入。</p>
            <p>• <strong>找不到設備</strong>：執行 <code>ls /dev/tty*</code>，USB 轉 UART 通常是 <code>/dev/ttyUSB0</code>，板載是 <code>/dev/ttyAMA0</code>。</p>
          </InfoBox>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 3. I2C */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">3. I2C — 一主多從匯流排</h2>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 bg-teal-50 shadow-sm">
            <div className="p-6">
              <p className="font-black text-teal-800 text-lg mb-2">一句話理解 I2C</p>
              <p className="text-teal-700 text-base">
                「兩條線（SDA 資料 + SCL 時鐘），一個主設備（Master）可以連接最多 127 個從設備（Slave），用 7-bit 地址區分每個設備。」
              </p>
            </div>
          </div>

          {/* 視覺化：I2C Bus */}
          <div className="space-y-3">
            <p className="font-black text-gray-700 text-sm uppercase tracking-wide">I2C 匯流排拓撲</p>
            <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm">
              <div className="space-y-1">
                <div className="text-cyan-300 font-bold mb-3">Master (Raspberry Pi)</div>
                <div className="flex flex-col gap-1 ml-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">SDA ────────┬────────────┬────────────┐</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">SCL ────────┼────────────┼────────────┤</span>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <span className="text-gray-500 w-24"></span>
                    <div className="flex gap-16">
                      <div className="text-teal-300 text-center">
                        <div>│</div>
                        <div className="border border-teal-500 rounded px-2 py-1 text-xs mt-1">Slave</div>
                        <div className="text-teal-400 text-xs">0x3C</div>
                        <div className="text-gray-500 text-xs">OLED</div>
                      </div>
                      <div className="text-emerald-300 text-center">
                        <div>│</div>
                        <div className="border border-emerald-500 rounded px-2 py-1 text-xs mt-1">Slave</div>
                        <div className="text-emerald-400 text-xs">0x48</div>
                        <div className="text-gray-500 text-xs">ADC</div>
                      </div>
                      <div className="text-cyan-300 text-center">
                        <div>│</div>
                        <div className="border border-cyan-500 rounded px-2 py-1 text-xs mt-1">Slave</div>
                        <div className="text-cyan-400 text-xs">0x68</div>
                        <div className="text-gray-500 text-xs">MPU6050</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 常見感測器地址表 */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-teal-100 text-teal-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl">I2C 地址</th>
                  <th className="text-left px-4 py-3 font-black">設備</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">用途</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['0x3C / 0x3D', 'SSD1306 OLED 顯示器', '小型顯示模組，0x3C 最常見'],
                  ['0x48', 'ADS1115 ADC', '類比轉數位，讀取類比感測器'],
                  ['0x68 / 0x69', 'MPU-6050 / MPU-6500', '六軸陀螺儀 + 加速度計'],
                  ['0x76 / 0x77', 'BME280', '溫度 + 濕度 + 氣壓三合一感測器'],
                  ['0x27 / 0x3F', 'PCF8574 LCD 背包', 'I2C 轉 LCD 1602 介面'],
                ].map(([addr, dev, use]) => (
                  <tr key={addr} className="bg-white hover:bg-teal-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-teal-700">{addr}</td>
                    <td className="px-4 py-3 font-bold text-gray-800">{dev}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Python smbus2 */}
          <p className="text-gray-600 leading-relaxed">
            Python 的 <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">smbus2</code> 套件封裝了 I2C 操作，
            透過地址與暫存器編號讀寫設備：
          </p>

          <CodeBlock lang="python"
            title="smbus2 基本使用"
            code={`import smbus2

# 開啟 I2C bus（Raspberry Pi 通常是 bus 1）
# /dev/i2c-1 對應 bus=1
bus = smbus2.SMBus(1)

address = 0x48   # ADS1115 的 I2C 地址

# 讀取單一 byte（從指定暫存器）
data = bus.read_byte_data(address, 0x00)
print(f'Register 0x00: {data:#04x}')

# 讀取 2 bytes（word，大多數感測器用 16-bit 資料）
word = bus.read_word_data(address, 0x00)

# 讀取多個 bytes（block read）
block = bus.read_i2c_block_data(address, 0x00, 6)  # 讀 6 bytes

# 寫入 byte 到暫存器
bus.write_byte_data(address, 0x01, 0xFF)

# 寫入 word（2 bytes）
bus.write_word_data(address, 0x01, 0x8385)

# 完成後關閉
bus.close()`}
          />

          <InfoBox color="cyan" title="掃描所有 I2C 設備：i2cdetect">
            <p>在 Raspberry Pi 上可以用指令掃描 bus 上所有設備的地址：</p>
            <p className="mt-2 font-mono bg-gray-900 text-green-400 px-3 py-2 rounded-lg text-xs">
              $ i2cdetect -y 1
            </p>
            <p className="mt-2">輸出會顯示一個地址表，有設備的格子會顯示 hex 地址（如 <code>3c</code>），空的格子顯示 <code>--</code>。</p>
            <p className="mt-1">如果沒有安裝：<code>sudo apt install i2c-tools</code></p>
          </InfoBox>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 4. UART vs I2C 比較表 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">4. UART vs I2C 比較</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            兩種協定都是兩條線，但設計目的完全不同：UART 是簡單的點對點串列通訊，I2C 是可以連接多個設備的匯流排通訊。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-cyan-100 text-cyan-900">
                  <th className="text-left px-4 py-3 font-black rounded-tl-xl w-1/4">面向</th>
                  <th className="text-left px-4 py-3 font-black">UART</th>
                  <th className="text-left px-4 py-3 font-black rounded-tr-xl">I2C</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['線數', '2 條（Tx / Rx）', '2 條（SDA / SCL）'],
                  ['通訊模式', '非同步（Asynchronous）', '同步（Synchronous，有時鐘線）'],
                  ['設備數量', '點對點（1 對 1）', '1 Master 最多 127 個 Slave'],
                  ['速度', '最高 ~1 Mbps（常用 115200 bps）', '100 Kbps（Standard）/ 400 Kbps（Fast）/ 1 Mbps（Fast+）'],
                  ['定址', '不需要（直接通訊）', '7-bit 地址區分設備'],
                  ['適用場景', 'GPS 模組、藍牙模組、系統 debug console', '溫濕度感測器、EEPROM、顯示器、IMU'],
                  ['Python 套件', 'pyserial', 'smbus2'],
                ].map(([aspect, uart, i2c]) => (
                  <tr key={aspect} className="bg-white hover:bg-cyan-50 transition-colors">
                    <td className="px-4 py-3 font-black text-gray-800">{aspect}</td>
                    <td className="px-4 py-3 text-gray-600">{uart}</td>
                    <td className="px-4 py-3 text-gray-600">{i2c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 5. 常見問題排查 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">5. 軟體工程師最常遇到的問題</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            以下是實際工作中最常遇到的坑，每一個都可能讓你卡一個小時，但解法其實很簡單。
          </p>

          <div className="space-y-4">
            <InfoBox color="amber" title="找不到設備 / 無法開啟串口">
              <p>• <strong>UART</strong>：執行 <code>ls /dev/tty*</code> 確認設備檔案是否存在。USB 轉 UART 晶片通常是 <code>/dev/ttyUSB0</code>，Raspberry Pi 板載 UART 是 <code>/dev/ttyAMA0</code>（或 <code>/dev/serial0</code>）。</p>
              <p>• <strong>I2C</strong>：執行 <code>i2cdetect -y 1</code> 掃描 bus，確認設備地址顯示在輸出表格中。如果什麼都沒有，先檢查接線是否正確（特別是 SDA / SCL 有沒有接反）。</p>
              <p>• 也可以用 <code>dmesg | grep tty</code> 或 <code>dmesg | grep i2c</code> 查看 kernel 識別設備的日誌。</p>
            </InfoBox>

            <InfoBox color="red" title="Linux 權限問題">
              <p>• <strong>UART 權限</strong>：<code>Permission denied: '/dev/ttyUSB0'</code>，需要把用戶加入 dialout 群組：</p>
              <p className="mt-1.5 font-mono bg-gray-900 text-green-400 px-3 py-2 rounded-lg text-xs">
                $ sudo usermod -aG dialout $USER
              </p>
              <p className="mt-1.5">執行後需要登出再重新登入才生效。如果急著測試，可以用 <code>sudo</code> 暫時執行。</p>
              <p className="mt-1.5">• <strong>I2C 權限</strong>：同樣的方式，加入 i2c 群組：<code>sudo usermod -aG i2c $USER</code></p>
            </InfoBox>

            <InfoBox color="green" title="資料亂碼（UART 特有）">
              <p>• 症狀：<code>readline()</code> 回傳奇怪的字元或亂碼。</p>
              <p>• 第一步：確認雙方的 Baud rate 設定完全相同。115200 和 9600 都是常見值，兩邊任何一邊設錯都會亂碼。</p>
              <p>• 第二步：確認 Data bits（8）、Stop bits（1）、Parity（None）設定一致。</p>
              <p>• 第三步：確認接線是交叉接（A 的 Tx 接 B 的 Rx），不是平行接。</p>
            </InfoBox>
          </div>
        </section>

        <hr className="border-gray-100 opacity-30"  />

        {/* 6. 面試常考題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">6. 面試常考題 Q&amp;A</h2>
          <p className="text-gray-600 leading-relaxed">嵌入式或系統相關職位常問的通訊協定問題，附上軟體工程師視角的完整答案。</p>

          <div className="space-y-4">
            {[
              {
                q: 'UART 和 I2C 的主要差異？',
                a: 'UART 是點對點的非同步通訊，不需要時鐘線，雙方約定相同的 Baud rate 後各自用內部時鐘計時，適合一對一的簡單通訊（GPS、藍牙模組）。I2C 是同步的多從設備匯流排，有一條共用時鐘線（SCL）讓所有設備同步，用 7-bit 地址區分設備，一條 bus 最多可連 127 個從設備，適合連接多種感測器（溫濕度、IMU、OLED）的場景。',
              },
              {
                q: 'I2C 如何區分連接在同一條 bus 上的多個設備？',
                a: '每個 I2C 設備出廠時都有一個固定的 7-bit 地址（0x00–0x7F），Master 發起通訊時會先傳送目標 Slave 的地址，只有地址匹配的 Slave 才會回應，其他設備忽略。部分設備（如 BME280 可以是 0x76 或 0x77）提供地址選擇引腳，讓同型號的兩個設備可以共存在同一條 bus 上。',
              },
              {
                q: '如何用 Python 讀取 UART 設備的資料？',
                a: '用 pyserial 套件：先 import serial，然後用 serial.Serial() 建立連線，傳入 port（如 "/dev/ttyUSB0"）、baudrate（如 115200）、timeout 等參數；用 ser.write(b"command\\n") 發送指令；用 ser.readline() 讀取一行回應並 decode("utf-8") 轉成字串；完成後呼叫 ser.close()。要注意發送的資料必須是 bytes（用 b"" 前綴），讀回來的也是 bytes，需要 decode 才能當字串處理。',
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white shadow-sm border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-cyan-100 text-cyan-700 font-black text-sm px-2.5 py-1 rounded-full shrink-0">Q{i + 1}</span>
                    <p className="font-black text-gray-900">{q}</p>
                  </div>
                  <div className="pl-10">
                    <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50"  />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/embedded/ep02-shell" className="group block bg-gray-50 hover:bg-cyan-50 transition-colors rounded-2xl p-6">
            <ArrowLeft size={18} className="mb-3 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-cyan-600 transition-colors">EP.02 — Shell Script 自動化</p>
            <p className="text-sm text-gray-500 mt-1">Bash 語法、變數、迴圈、實用腳本範例</p>
          </Link>
          <div className="block bg-gray-50 rounded-2xl p-6 text-right opacity-50 cursor-not-allowed">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-500">EP.04 — Coming Soon</p>
            <p className="text-sm text-gray-400 mt-1">下一篇文章準備中...</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['UART', 'I2C', 'Python', 'pyserial', 'smbus', '嵌入式', 'Raspberry Pi', 'EP.03'].map((tag) => (
            <span key={tag}   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 font-bold">{tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
}
