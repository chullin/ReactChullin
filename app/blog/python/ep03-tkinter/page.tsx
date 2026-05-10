'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowLeft,
  Quote,
  Clock,
  Eye
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function PythonEP03Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-sky-600">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 40% 60%, rgba(20,184,166,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(14,165,233,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-teal-500/20 text-teal-200 border-teal-500/30 font-bold uppercase text-[10px]">
                Python 系列
              </Chip>
              <Chip size="sm" variant="flat" className="bg-teal-500/20 text-teal-200 border-teal-500/30 font-bold uppercase text-[10px]">
                EP.03
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Tkinter GUI 開發<br />
              <span className="text-teal-200">Python 桌面應用</span>
            </h1>
            <p className="text-teal-200 text-lg font-medium max-w-2xl mx-auto">
              事件驅動設計、Grid 佈局、與 Raspberry Pi 自動化測試的實際整合
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 text-teal-600 p-2.5 rounded-full">
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
            <div className="flex items-center gap-1.5"><Clock size={16} /><span>10 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /><span>工廠測試實戰</span></div>
          </div>
        </div>

        {/* Opening Quote */}
        <section>
          <Card className="border border-teal-100 bg-gradient-to-br from-teal-50 to-sky-50 shadow-none">
            <CardBody className="p-7">
              <div className="flex items-start gap-4">
                <Quote size={28} className="text-teal-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic font-medium">
                  在 SCT 做測試工程師時，第一個任務是把原本靠人工操作的測試流程包成一個 GUI。用 Tkinter 做出第一個視窗，讓測試員點一個按鈕就能跑完整個流程——那種成就感到現在都記得。
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider className="opacity-30" />

        {/* Section 1: Tkinter 是什麼 */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-gray-900">Tkinter 是什麼</h2>
          <p className="text-gray-700 leading-relaxed">
            Tkinter 是 Python <strong>內建</strong>的 GUI 函式庫，安裝 Python 就有，不需要額外 pip install。它基於 Tk GUI toolkit，跨平台支援 Windows / macOS / Linux。
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '✅', title: '適合場景', desc: '快速開發內部工具、測試介面、自動化控制台、小型桌面應用', color: 'bg-green-50 border-green-100' },
              { icon: '⚡', title: '最大優勢', desc: '零額外依賴，Python 安裝就能跑。嵌入式環境（Raspberry Pi）的首選', color: 'bg-teal-50 border-teal-100' },
              { icon: '⚠️', title: '限制', desc: '外觀較老舊，複雜 UI 建議用 PyQt6 或 customtkinter，商業 App 不適合', color: 'bg-yellow-50 border-yellow-100' },
            ].map((item, i) => (
              <div key={i} className={`border rounded-2xl p-5 ${item.color}`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-black text-gray-800 mb-1">{item.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 2: 基本視窗架構 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">基本視窗架構</h2>
          <p className="text-gray-700 leading-relaxed">
            所有 Tkinter 程式的骨架都一樣：建立 root window → 加入 Widget → 呼叫 mainloop() 進入事件迴圈。
          </p>
          <CodeBlock lang="python"
            title="basic_window.py"
            code={`import tkinter as tk
from tkinter import ttk  # themed widgets（外觀更好看）

# 建立主視窗
root = tk.Tk()
root.title("自動化測試工具 v1.0")
root.geometry("600x400")       # 寬x高（像素）
root.resizable(True, True)     # 允許調整大小
root.minsize(400, 300)         # 最小視窗大小

# 設定視窗背景色
root.configure(bg="#f0f0f0")

# 加入一個標籤
label = ttk.Label(root, text="歡迎使用自動化測試系統", font=("Arial", 16, "bold"))
label.pack(pady=20)

# 進入事件迴圈（程式從這裡開始「等待使用者操作」）
# mainloop() 會一直執行，直到視窗被關閉
root.mainloop()
print("視窗已關閉，程式結束")  # mainloop() 結束後才執行到這裡`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 3: 佈局管理器 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">四大佈局管理器</h2>
          <p className="text-gray-700 leading-relaxed">
            Tkinter 有三種佈局方式（加上 Frame 容器概念共四種）。<strong>實際開發幾乎只用 grid</strong>，它最靈活且可預測。
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">佈局</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">原理</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">適合場景</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">推薦度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['pack()', '由上到下或左到右依序堆疊', '簡單的垂直/水平排列', '★★☆☆☆'],
                  ['grid()', '表格定位，指定 row 和 column', '複雜表單、控制面板', '★★★★★'],
                  ['place()', '絕對像素座標定位', '需要精確位置的特殊需求', '★★☆☆☆'],
                ].map(([name, desc, use, rating], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-teal-700 font-bold">{name}</td>
                    <td className="px-5 py-3 text-gray-700">{desc}</td>
                    <td className="px-5 py-3 text-gray-500">{use}</td>
                    <td className="px-5 py-3 text-amber-500 font-mono">{rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CodeBlock lang="python"
            title="grid_layout.py"
            code={`import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.title("Grid 佈局示範")

# grid(row, column, columnspan, sticky, padx, pady)
# sticky: "nsew" 讓 widget 填滿格子（N/S/E/W 方向延伸）

ttk.Label(root, text="測試項目：").grid(row=0, column=0, sticky="w", padx=10, pady=5)
ttk.Combobox(root, values=["燒機測試", "I/O 測試", "RF 測試"]).grid(row=0, column=1, columnspan=2, sticky="ew", padx=10)

ttk.Label(root, text="序號：").grid(row=1, column=0, sticky="w", padx=10, pady=5)
ttk.Entry(root).grid(row=1, column=1, sticky="ew", padx=10)
ttk.Button(root, text="掃描").grid(row=1, column=2, padx=5)

# 讓第 1 欄自動延展（填滿剩餘空間）
root.columnconfigure(1, weight=1)

root.mainloop()`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 4: 常用 Widget */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">常用 Widget 速查</h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">Widget</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">用途</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">關鍵用法</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['ttk.Label', '顯示文字或圖片', 'text="..." / textvariable=var'],
                  ['ttk.Button', '按鈕（觸發函數）', 'command=my_func'],
                  ['ttk.Entry', '單行文字輸入框', '.get() 取值 / .delete(0, END)'],
                  ['tk.Text', '多行文字輸入/輸出', '.insert(END, text) / .get(1.0, END)'],
                  ['ttk.Combobox', '下拉選單', 'values=[...] / .get() 取目前選項'],
                  ['ttk.Checkbutton', '勾選框', 'variable=IntVar()'],
                  ['ttk.Radiobutton', '單選按鈕', 'variable=var, value="A"'],
                  ['ttk.Frame', '容器（分區使用）', '可在裡面繼續用 grid/pack'],
                  ['tk.Scrollbar', '捲軸', '需與 Text/Listbox 連接'],
                  ['tk.Canvas', '繪圖畫布', '.create_line / create_rectangle'],
                ].map(([widget, usage, key], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-teal-700 font-bold text-xs">{widget}</td>
                    <td className="px-5 py-3 text-gray-700">{usage}</td>
                    <td className="px-5 py-3 text-gray-500 font-mono text-xs">{key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CodeBlock lang="python"
            title="widgets_demo.py"
            code={`import tkinter as tk
from tkinter import ttk

root = tk.Tk()

# StringVar：雙向綁定，Widget 更新 → 變數更新，程式設定 → Widget 自動更新
status_var = tk.StringVar(value="等待測試...")

# Label 綁定 StringVar
status_label = ttk.Label(root, textvariable=status_var, font=("Arial", 12))
status_label.pack(pady=10)

# 程式改變 StringVar，Label 自動更新（不需要手動 .config(text=...)）
def update_status():
    status_var.set("測試執行中...")

ttk.Button(root, text="開始測試", command=update_status).pack()

# Combobox
combo_var = tk.StringVar()
combo = ttk.Combobox(root, textvariable=combo_var, values=["燒機測試", "I/O 測試"])
combo.set("燒機測試")  # 設定預設值
combo.pack(pady=5)

print(combo_var.get())  # 取目前選擇值

root.mainloop()`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 5: 事件驅動設計 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">事件驅動設計</h2>
          <p className="text-gray-700 leading-relaxed">
            Tkinter 是事件驅動模型：程式在 mainloop() 裡等待使用者操作，有事件發生就呼叫對應的 callback 函數。理解這個模型是 GUI 開發的核心。
          </p>

          <div className="space-y-4">
            {[
              {
                title: 'mainloop() 是什麼',
                desc: 'mainloop() 是一個無限迴圈，持續監聽作業系統的事件佇列（滑鼠點擊、鍵盤輸入、視窗關閉等），有事件就分派給對應的 Widget 或 callback 處理。',
                color: 'bg-blue-50 border-blue-100',
                tc: 'text-blue-800',
                dc: 'text-blue-700',
              },
              {
                title: 'command= vs bind()',
                desc: 'command= 只用於 Button，綁定點擊事件。bind() 更通用，可以綁定任何事件（鍵盤、滑鼠移動、視窗大小改變）到任意 Widget，例如 widget.bind("<Return>", handler)。',
                color: 'bg-purple-50 border-purple-100',
                tc: 'text-purple-800',
                dc: 'text-purple-700',
              },
              {
                title: '多執行緒：最重要的陷阱',
                desc: 'GUI 的 mainloop() 跑在主執行緒。若在主執行緒執行長時間任務（串口通訊、等待 I/O），mainloop() 無法處理事件，視窗會「凍結」。解法：把長任務放到 threading.Thread 裡，用 root.after() 或 Queue 回傳結果給主執行緒更新 UI。',
                color: 'bg-red-50 border-red-100',
                tc: 'text-red-800',
                dc: 'text-red-700',
              },
            ].map((item, i) => (
              <div key={i} className={`border rounded-2xl p-5 ${item.color}`}>
                <p className={`font-black mb-2 ${item.tc}`}>{item.title}</p>
                <p className={`text-sm leading-relaxed ${item.dc}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 6: 完整範例 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">實際範例：自動化測試 GUI</h2>
          <p className="text-gray-700 leading-relaxed">
            以下是在 SCT 類似場景的簡化版本：選擇測試項目 → 點開始 → 背景執行測試（不凍結 UI）→ 結果顯示在 Text widget。
          </p>
          <CodeBlock lang="python"
            title="test_gui.py"
            code={`import tkinter as tk
from tkinter import ttk
import threading
import time
import queue

class TestGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("自動化測試系統")
        self.root.geometry("600x480")
        self.result_queue = queue.Queue()

        self._build_ui()
        self._poll_queue()   # 開始定期檢查背景執行緒的結果

    def _build_ui(self):
        # 頂部：選擇測試項目
        frame_top = ttk.LabelFrame(self.root, text="測試設定", padding=10)
        frame_top.pack(fill="x", padx=15, pady=10)

        ttk.Label(frame_top, text="測試項目：").grid(row=0, column=0, sticky="w")
        self.combo = ttk.Combobox(frame_top, values=["燒機測試", "I/O 測試", "RF 測試"], width=20)
        self.combo.set("燒機測試")
        self.combo.grid(row=0, column=1, padx=10)

        # 開始按鈕
        self.btn_start = ttk.Button(frame_top, text="開始測試", command=self._start_test)
        self.btn_start.grid(row=0, column=2, padx=5)

        # 進度狀態
        self.status_var = tk.StringVar(value="等待測試...")
        ttk.Label(self.root, textvariable=self.status_var, foreground="gray").pack(anchor="w", padx=15)

        # 進度條
        self.progress = ttk.Progressbar(self.root, mode="indeterminate")
        self.progress.pack(fill="x", padx=15, pady=5)

        # 結果輸出區
        frame_result = ttk.LabelFrame(self.root, text="測試結果", padding=10)
        frame_result.pack(fill="both", expand=True, padx=15, pady=5)

        self.result_text = tk.Text(frame_result, height=12, font=("Courier", 10))
        scrollbar = ttk.Scrollbar(frame_result, command=self.result_text.yview)
        self.result_text.configure(yscrollcommand=scrollbar.set)
        self.result_text.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

    def _start_test(self):
        """點擊開始按鈕 → 在背景執行緒跑測試，避免凍結 UI"""
        test_name = self.combo.get()
        self.btn_start.config(state="disabled")
        self.progress.start(10)
        self.status_var.set(f"執行中：{test_name}...")
        self.result_text.delete(1.0, tk.END)

        # 把長任務交給背景執行緒
        thread = threading.Thread(target=self._run_test, args=(test_name,), daemon=True)
        thread.start()

    def _run_test(self, test_name):
        """背景執行緒：執行測試，結果放入 queue"""
        steps = ["初始化硬體...", "執行第 1 階段測試...", "執行第 2 階段測試...", "生成報告..."]
        for step in steps:
            time.sleep(0.8)  # 模擬耗時操作（實際是串口通訊等）
            self.result_queue.put(("log", step))
        self.result_queue.put(("done", f"[PASS] {test_name} 完成"))

    def _poll_queue(self):
        """主執行緒定期（每 100ms）檢查 queue，更新 UI"""
        try:
            while True:
                msg_type, msg = self.result_queue.get_nowait()
                self.result_text.insert(tk.END, msg + "\\n")
                self.result_text.see(tk.END)
                if msg_type == "done":
                    self.progress.stop()
                    self.status_var.set("測試完成")
                    self.btn_start.config(state="normal")
        except queue.Empty:
            pass
        self.root.after(100, self._poll_queue)  # 100ms 後再次檢查

if __name__ == "__main__":
    root = tk.Tk()
    app = TestGUI(root)
    root.mainloop()`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 7: 面試常考題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">面試常考題</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Tkinter 的 mainloop() 做什麼？',
                a: 'mainloop() 是一個持續運行的事件迴圈，不斷監聽作業系統送來的事件（點擊、鍵盤、計時器等），並分派給對應的 callback 函數處理。呼叫 mainloop() 後程式才「活起來」，關閉視窗後 mainloop() 才返回。',
              },
              {
                q: '如何避免 GUI 在執行長任務時凍結？',
                a: '使用 threading.Thread 把長任務（I/O、計算、串口通訊）移到背景執行緒，主執行緒繼續跑 mainloop()。背景執行緒完成後透過 Queue + root.after() 回傳結果到主執行緒更新 UI。注意：絕對不能在背景執行緒直接操作 Tkinter Widget（非執行緒安全）。',
              },
              {
                q: 'StringVar 和普通變數有什麼差？',
                a: 'StringVar 是 Tkinter 的「可觀察變數」，與 Widget 雙向綁定。改變 StringVar 的值（.set()），綁定的 Label/Entry 會自動更新顯示；使用者在 Entry 輸入，StringVar 也會自動同步。普通 Python 變數改變後 Widget 不會自動更新，需要手動 .config(text=...)。',
              },
              {
                q: 'grid() 的 sticky 參數是什麼？',
                a: 'sticky 決定 Widget 在格子內如何對齊或延伸，使用 "n"（上）/"s"（下）/"e"（右）/"w"（左）或組合。sticky="ew" 讓 Widget 水平填滿格子；sticky="nsew" 讓 Widget 四個方向都填滿，通常配合 columnconfigure(weight=1) 使用。',
              },
            ].map((item, i) => (
              <Card key={i} className="border border-gray-100 shadow-none">
                <CardBody className="p-6 space-y-3">
                  <p className="font-black text-gray-900">Q{i + 1}. {item.q}</p>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/python/ep02-pytorch">
            <div className="bg-gray-50 hover:bg-teal-50 transition-colors rounded-2xl p-6 cursor-pointer group">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-700 group-hover:text-teal-700 transition-colors">EP.02 — PyTorch</p>
              <p className="text-sm text-gray-400 mt-1">AI 工程師必備基礎</p>
              <ArrowLeft size={18} className="mt-3 text-gray-300 group-hover:text-teal-400 transition-colors" />
            </div>
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-400">EP.04</p>
            <p className="text-sm text-gray-400 mt-1">即將推出</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Tkinter', 'Python', 'GUI', '自動化測試', 'Raspberry Pi', 'EP.03'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
