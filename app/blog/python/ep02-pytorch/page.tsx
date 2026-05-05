'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, ArrowLeft, ArrowRight, Quote, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, title }: { code: string; title?: string }) => (
  <div className="rounded-2xl overflow-hidden my-6 shadow-lg">
    <div className="flex items-center justify-between bg-gray-800 px-5 py-3">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-gray-400 text-xs font-mono">{title ?? 'code'}</span>
    </div>
    <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
  </div>
);

export default function PythonEP02Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-rose-600">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 40% 60%, rgba(251,146,60,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(244,63,94,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-orange-500/20 text-orange-200 border-orange-500/30 font-bold uppercase text-[10px]">
                Python 系列
              </Chip>
              <Chip size="sm" variant="flat" className="bg-orange-500/20 text-orange-200 border-orange-500/30 font-bold uppercase text-[10px]">
                EP.02
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              PyTorch 入門<br />
              <span className="text-orange-200">AI 工程師必備基礎</span>
            </h1>
            <p className="text-orange-200 text-lg font-medium max-w-2xl mx-auto">
              Tensor 操作、autograd、訓練迴圈 — 從 NumPy 思維到深度學習框架
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 text-orange-600 p-2.5 rounded-full">
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
            <div className="flex items-center gap-1.5"><Clock size={16} /><span>12 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /><span>碩士研究實戰</span></div>
          </div>
        </div>

        {/* Opening Quote */}
        <section>
          <Card className="border border-orange-100 bg-gradient-to-br from-orange-50 to-rose-50 shadow-none">
            <CardBody className="p-7">
              <div className="flex items-start gap-4">
                <Quote size={28} className="text-orange-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic font-medium">
                  碩士做 TTS 研究時，每天都在跟 Tensor 打交道。一開始完全搞不懂 grad_fn 是什麼，直到有一天突然理解：PyTorch 會自動幫你記錄每一步計算，然後反推梯度。那一刻，深度學習變得不再神秘。
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider className="opacity-30" />

        {/* Section 1: PyTorch vs NumPy */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">PyTorch vs NumPy</h2>
          <p className="text-gray-700 leading-relaxed">
            許多人學 PyTorch 的起點是：「我已經會 NumPy，PyTorch 有什麼不同？」答案很直接——語法幾乎一樣，但 PyTorch Tensor 多了兩個關鍵能力：<strong>跑在 GPU 上</strong>和<strong>自動微分</strong>。
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">特性</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">NumPy</th>
                  <th className="text-left px-5 py-3 font-black text-orange-700">PyTorch Tensor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['語法相似度', '基準', '非常接近 NumPy'],
                  ['執行裝置', 'CPU only', 'CPU / GPU（CUDA）'],
                  ['自動微分', '不支援', '支援（requires_grad）'],
                  ['主要用途', '數值計算、資料處理', '深度學習訓練與推論'],
                  ['與深度學習框架整合', '需要手動轉換', '原生整合 nn.Module'],
                ].map(([feature, numpy, pytorch], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-bold text-gray-700">{feature}</td>
                    <td className="px-5 py-3 text-gray-500">{numpy}</td>
                    <td className="px-5 py-3 text-orange-700 font-medium">{pytorch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 2: Tensor 基礎操作 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Tensor 基礎操作</h2>
          <p className="text-gray-700 leading-relaxed">
            Tensor 是 PyTorch 的核心資料結構，等同於多維陣列。以下是最常用的建立、形狀操作與數學運算方法：
          </p>
          <CodeBlock
            title="tensor_basics.py"
            code={`import torch

# ── 建立 Tensor ──────────────────────────────────────────
x = torch.tensor([1.0, 2.0, 3.0])          # 從 Python list 建立
z = torch.zeros(3, 4)                       # 全零 3x4
o = torch.ones(2, 3)                        # 全一 2x3
r = torch.rand(4, 4)                        # 均勻隨機 [0, 1)
n = torch.randn(4, 4)                       # 標準常態分佈

# ── 形狀操作 ──────────────────────────────────────────────
t = torch.rand(2, 3, 4)
print(t.shape)                              # torch.Size([2, 3, 4])

t2 = t.reshape(6, 4)                       # reshape（允許不連續記憶體）
t3 = t.view(6, 4)                          # view（要求連續記憶體，更快）
t4 = t.squeeze()                           # 移除所有大小為 1 的維度
t5 = t.unsqueeze(0)                        # 在第 0 軸插入維度

# ── 數學運算 ──────────────────────────────────────────────
a = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
b = torch.tensor([[5.0, 6.0], [7.0, 8.0]])

print(a + b)                               # 元素相加
print(a * b)                               # 元素相乘（Hadamard product）
print(a @ b)                               # 矩陣乘法（等同 torch.matmul）
print(a.sum())                             # 所有元素總和
print(a.mean(dim=0))                       # 沿第 0 軸求平均
print(a.max())                             # 最大值

# ── 裝置移動 ──────────────────────────────────────────────
device = 'cuda' if torch.cuda.is_available() else 'cpu'
a_gpu = a.to(device)                       # 移到 GPU（若可用）
a_cpu = a_gpu.to('cpu')                    # 移回 CPU
a_np  = a_cpu.numpy()                      # 轉換為 NumPy array（需在 CPU）`}
          />
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <p className="font-black text-orange-800 mb-2">注意：view() vs reshape()</p>
            <p className="text-orange-700 text-sm leading-relaxed">
              <code className="bg-orange-100 px-1 rounded">view()</code> 要求 Tensor 在記憶體中是連續的，速度更快。若 Tensor 經過轉置等操作後不連續，呼叫 <code className="bg-orange-100 px-1 rounded">view()</code> 會報錯，這時改用 <code className="bg-orange-100 px-1 rounded">reshape()</code> 即可，它會自動處理不連續情況。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 3: Autograd */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Autograd（自動微分）</h2>
          <p className="text-gray-700 leading-relaxed">
            Autograd 是 PyTorch 最核心的機制——它讓你不用手算偏微分，框架會自動幫你做。理解它，你就理解了深度學習訓練的本質。
          </p>

          <div className="space-y-4">
            {[
              {
                title: 'requires_grad=True 的作用',
                desc: '告訴 PyTorch：「我要追蹤這個 Tensor 的計算過程」。之後每一步運算，PyTorch 都會建立一個計算圖（Computational Graph），記錄「這個值是從哪裡計算出來的」。',
                color: 'bg-blue-50 border-blue-100',
                titleColor: 'text-blue-800',
                descColor: 'text-blue-700',
              },
              {
                title: '計算圖（Computational Graph）',
                desc: '想像一個有向圖，每個節點是一個運算（加法、乘法、ReLU...），每條邊是資料流向。forward pass 建立這張圖；backward pass 沿著這張圖反推每個參數的梯度。',
                color: 'bg-purple-50 border-purple-100',
                titleColor: 'text-purple-800',
                descColor: 'text-purple-700',
              },
              {
                title: 'loss.backward() 如何工作',
                desc: '呼叫 backward() 後，PyTorch 從 loss 出發，沿著計算圖反向傳播，用鏈式法則（Chain Rule）計算每個 requires_grad=True 的 Tensor 對應的梯度，存入 .grad 屬性。',
                color: 'bg-green-50 border-green-100',
                titleColor: 'text-green-800',
                descColor: 'text-green-700',
              },
            ].map((item, i) => (
              <div key={i} className={`border rounded-2xl p-5 ${item.color}`}>
                <p className={`font-black mb-2 ${item.titleColor}`}>{item.title}</p>
                <p className={`text-sm leading-relaxed ${item.descColor}`}>{item.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock
            title="autograd_demo.py"
            code={`import torch

# requires_grad=True：開始追蹤這個 Tensor
x = torch.tensor(3.0, requires_grad=True)
w = torch.tensor(2.0, requires_grad=True)
b = torch.tensor(1.0, requires_grad=True)

# 前向計算（PyTorch 自動建立計算圖）
y = w * x + b          # y = 2*3 + 1 = 7
loss = (y - 5.0) ** 2  # loss = (7-5)^2 = 4

# 反向傳播：計算所有梯度
loss.backward()

# ∂loss/∂w = 2*(y-5)*x = 2*2*3 = 12
print(f"w.grad = {w.grad}")  # tensor(12.)
# ∂loss/∂x = 2*(y-5)*w = 2*2*2 = 8
print(f"x.grad = {x.grad}")  # tensor(8.)
# ∂loss/∂b = 2*(y-5)*1 = 4
print(f"b.grad = {b.grad}")  # tensor(4.)

# !! 為什麼每次都要 zero_grad() !!
# PyTorch 的梯度是「累加」的，不是「覆寫」
# 如果不清除，第二次 backward() 的梯度會加到第一次上面
# 這在 RNN 有時有用，但一般訓練迴圈必須每次清除
optimizer = torch.optim.SGD([w, b], lr=0.01)
optimizer.zero_grad()  # 清除所有參數的 .grad`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 4: 完整訓練迴圈 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">完整訓練迴圈</h2>
          <p className="text-gray-700 leading-relaxed">
            PyTorch 的訓練迴圈固定五步驟，背下來就不會忘：清梯度 → 前向傳播 → 計算損失 → 反向傳播 → 更新參數。
          </p>
          <CodeBlock
            title="training_loop.py"
            code={`import torch
import torch.nn as nn

# 定義一個簡單的全連接網路
class SimpleNet(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden_dim, output_dim),
        )

    def forward(self, x):
        return self.net(x)

# 假資料
X = torch.randn(64, 10)   # 64 筆資料，每筆 10 維特徵
y = torch.randint(0, 3, (64,))  # 3 類分類

model = SimpleNet(input_dim=10, hidden_dim=32, output_dim=3)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

# ── 訓練迴圈 ───────────────────────────────────────────────
for epoch in range(100):
    optimizer.zero_grad()          # 1. 清除梯度（每次必做！）
    output = model(X)              # 2. 前向傳播
    loss = criterion(output, y)    # 3. 計算損失
    loss.backward()                # 4. 反向傳播（計算梯度）
    optimizer.step()               # 5. 更新參數

    if (epoch + 1) % 20 == 0:
        preds = output.argmax(dim=1)
        acc = (preds == y).float().mean()
        print(f"Epoch {epoch+1:3d} | Loss: {loss.item():.4f} | Acc: {acc:.2%}")

# ── 推論模式 ───────────────────────────────────────────────
model.eval()                       # 關閉 Dropout / BatchNorm 的訓練行為
with torch.no_grad():              # 不需要計算梯度，節省記憶體
    test_input = torch.randn(1, 10)
    pred = model(test_input).argmax(dim=1)
    print(f"Prediction: class {pred.item()}")`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 5: nn 模組速查 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">常用 nn 模組速查</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">模組</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">用途</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">關鍵參數</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['nn.Linear', '全連接層', 'in_features, out_features'],
                  ['nn.Conv2d', '2D 卷積層（影像）', 'in_channels, out_channels, kernel_size'],
                  ['nn.ReLU', 'ReLU 激活函數', '—（無需參數）'],
                  ['nn.Dropout', '隨機丟棄（防過擬合）', 'p（丟棄機率，預設 0.5）'],
                  ['nn.BatchNorm1d', '批次正規化（1D）', 'num_features'],
                  ['nn.LSTM', '長短期記憶網路（序列）', 'input_size, hidden_size, num_layers'],
                  ['nn.Embedding', '詞向量嵌入（NLP）', 'num_embeddings, embedding_dim'],
                  ['nn.Softmax', '機率輸出（多分類）', 'dim（沿哪個軸計算）'],
                ].map(([module, usage, params], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-orange-700 font-bold">{module}</td>
                    <td className="px-5 py-3 text-gray-700">{usage}</td>
                    <td className="px-5 py-3 text-gray-500 font-mono text-xs">{params}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 6: GPU 加速 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">GPU 加速</h2>
          <p className="text-gray-700 leading-relaxed">
            在有 NVIDIA GPU 的環境下，訓練速度可以提升 10–100 倍。關鍵是：<strong>model 和資料都必須在同一個裝置上</strong>，不然會報錯。
          </p>
          <CodeBlock
            title="gpu_training.py"
            code={`import torch
import torch.nn as nn

# 自動偵測可用裝置
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"Using device: {device}")

# 查看 GPU 資訊（若有）
if device == 'cuda':
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"VRAM: {torch.cuda.get_device_properties(0).total_memory / 1e9:.1f} GB")

# 模型移到 GPU
model = SimpleNet(10, 32, 3).to(device)

# 資料也必須移到同一個裝置
X = torch.randn(64, 10).to(device)
y = torch.randint(0, 3, (64,)).to(device)

# 訓練迴圈不變，PyTorch 自動使用 GPU 運算
for epoch in range(100):
    optimizer.zero_grad()
    output = model(X)           # GPU 運算
    loss = criterion(output, y)
    loss.backward()
    optimizer.step()

# 儲存模型（移回 CPU 再存，避免裝置相依性問題）
torch.save(model.state_dict(), 'model.pth')

# 載入模型
model.load_state_dict(torch.load('model.pth', map_location='cpu'))
model.to(device)  # 再移回目標裝置`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 7: 面試常考題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">面試常考題</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Tensor 和 NumPy array 的差異？',
                a: '語法幾乎相同，但 PyTorch Tensor 可以放在 GPU 上加速運算，並支援自動微分（requires_grad）。NumPy array 只在 CPU，不支援梯度計算。',
              },
              {
                q: 'optimizer.zero_grad() 為什麼必要？',
                a: 'PyTorch 的梯度是「累加」而非「覆寫」。若不清除，每次 backward() 的梯度都會疊加到 .grad 上，導致梯度錯誤膨脹，參數更新方向完全錯誤。',
              },
              {
                q: 'requires_grad=True 做了什麼？',
                a: '告訴 PyTorch 要追蹤這個 Tensor 的所有後續計算，建立計算圖。呼叫 .backward() 時，PyTorch 沿計算圖反推梯度，存入 .grad 屬性。',
              },
              {
                q: 'batch_size 對訓練有什麼影響？',
                a: '大 batch_size → 梯度估計更準確，但需要更多記憶體，訓練較快；小 batch_size → 梯度有更多雜訊（有正則化效果），可能找到更平坦的最小值，但訓練震盪較大。',
              },
              {
                q: 'overfitting 如何解決？',
                a: '三大方法：(1) Dropout：訓練時隨機丟棄神經元，強迫網路學習冗餘表示；(2) L2 正規化（weight decay）：在 optimizer 裡設定，懲罰過大的權重；(3) Early stopping：監控 validation loss，停止在 val loss 開始上升前。',
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
          <Link href="/blog/python/ep01-opencv-automation">
            <div className="bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6 cursor-pointer group">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-700 group-hover:text-orange-700 transition-colors">EP.01 — OpenCV</p>
              <p className="text-sm text-gray-400 mt-1">電腦視覺自動定位</p>
              <ArrowLeft size={18} className="mt-3 text-gray-300 group-hover:text-orange-400 transition-colors" />
            </div>
          </Link>
          <Link href="/blog/python/ep03-tkinter">
            <div className="bg-gray-50 hover:bg-orange-50 transition-colors rounded-2xl p-6 cursor-pointer group text-right">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
              <p className="font-black text-gray-700 group-hover:text-orange-700 transition-colors">EP.03 — Tkinter</p>
              <p className="text-sm text-gray-400 mt-1">Python 桌面應用開發</p>
              <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-orange-400 transition-colors" />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['PyTorch', 'Tensor', 'autograd', 'AI', '深度學習', 'Python', 'EP.02'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
