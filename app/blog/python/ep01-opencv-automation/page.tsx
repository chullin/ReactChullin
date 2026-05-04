'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, User, Clock, Eye, Quote, ArrowRight } from 'lucide-react';
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

export default function PythonEP01Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-teal-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 40% 60%, rgba(16,185,129,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(20,184,166,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-green-500/20 text-green-300 border-green-500/30 font-bold uppercase text-[10px]">
                Python 自動化
              </Chip>
              <Chip size="sm" variant="flat" className="bg-green-500/20 text-green-300 border-green-500/30 font-bold uppercase text-[10px]">
                EP.01
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              OpenCV + 機械手臂<br />
              <span className="text-green-300">電腦視覺自動定位系統實戰</span>
            </h1>
            <p className="text-green-200 text-lg font-medium max-w-2xl mx-auto">
              如何用 Python + OpenCV 讓機械手臂「看到」目標並自動移動到正確位置，<br />
              從影像辨識到 XY 軸座標轉換的完整技術拆解
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-600 p-2.5 rounded-full">
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
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>10 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /> <span>工廠實戰</span></div>
          </div>
        </div>

        {/* Intro */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            在鴻海深圳廠，有一個需求：讓機械手臂自動找到 iPhone 主板上的某個特定點位並精準觸碰。
            人工操作太慢、容易出錯，而且品質不穩定。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            解法是：<strong>視覺引導（Vision-guided）系統</strong>。
            用攝影機拍下目標，用 OpenCV 算出目標的像素座標，再轉換成機械手臂的實際 XY 軸座標，自動移動過去。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            這篇文章把這個系統的核心技術拆解清楚。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* 系統架構 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">系統架構概覽</h2>
          <p className="text-gray-700 leading-relaxed">整個系統分三個主要模組：</p>

          <div className="space-y-3">
            {[
              {
                num: '01',
                title: '影像擷取',
                desc: 'USB 攝影機或工業相機擷取即時影像，固定在機台上方，與機械手臂的座標系統對齊校準。',
                icon: '📷',
                color: 'bg-blue-500',
              },
              {
                num: '02',
                title: 'OpenCV 影像處理',
                desc: '對影像做預處理（灰階、模糊、邊緣偵測），再用輪廓偵測或模板比對找到目標的像素座標（cx, cy）。',
                icon: '🔍',
                color: 'bg-green-500',
              },
              {
                num: '03',
                title: '座標轉換 + 機械手臂控制',
                desc: '將像素座標轉換成機械手臂的實際毫米座標，透過 Serial 或 TCP 發送移動指令到控制器。',
                icon: '🤖',
                color: 'bg-orange-500',
              },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-5 bg-gray-50 rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center font-black text-sm shrink-0`}>
                  {item.num}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <p className="font-black text-gray-900">{item.title}</p>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* OpenCV 核心：找目標 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Step 1：用 OpenCV 找到目標位置</h2>
          <p className="text-gray-700 leading-relaxed">
            最常用的兩種方法：<strong>輪廓偵測</strong>（找形狀）和<strong>模板比對</strong>（找特定圖案）。
            以下以輪廓偵測為例，找到影像中最大的圓形目標：
          </p>

          <CodeBlock
            lang="python"
            title="find_target.py"
            code={`import cv2
import numpy as np

def find_circle_target(frame):
    """
    在影像中找到圓形目標，返回中心座標 (cx, cy)。
    """
    # 1. 灰階化
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 2. 高斯模糊（降噪）
    blurred = cv2.GaussianBlur(gray, (11, 11), 0)

    # 3. Canny 邊緣偵測
    edges = cv2.Canny(blurred, 50, 150)

    # 4. 找輪廓
    contours, _ = cv2.findContours(
        edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
    )

    if not contours:
        return None

    # 5. 找最大輪廓（假設目標是最顯眼的物體）
    largest = max(contours, key=cv2.contourArea)

    # 6. 計算最小外接圓
    (cx, cy), radius = cv2.minEnclosingCircle(largest)

    # 過濾太小的目標（可能是雜訊）
    if radius < 10:
        return None

    return int(cx), int(cy), int(radius)

# 測試
cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    result = find_circle_target(frame)
    if result:
        cx, cy, r = result
        cv2.circle(frame, (cx, cy), r, (0, 255, 0), 2)
        cv2.circle(frame, (cx, cy), 3, (0, 0, 255), -1)
        print(f"Target found at pixel: ({cx}, {cy})")
    cv2.imshow("Vision", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break`}
          />

          <InfoBox type="tip">
            <strong>實際踩坑</strong>：工廠光線複雜，直接用 Canny 很容易誤偵測。
            建議加上 HSV 色彩過濾，先把目標的顏色範圍濾出來再做輪廓偵測，準確率從 60% 提升到 95%。
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 座標轉換 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Step 2：像素座標 → 機械手臂座標</h2>
          <p className="text-gray-700 leading-relaxed">
            影像的像素座標和機械手臂的實際毫米座標是不同的座標系，需要做<strong>仿射變換（Affine Transform）</strong>校準。
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <p className="font-black text-gray-900">校準原理</p>
            <ol className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2"><span className="font-bold text-gray-400 shrink-0">1.</span><span>讓機械手臂移到 3–4 個已知點位（例如四個角）</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-gray-400 shrink-0">2.</span><span>記錄每個點的機械手臂座標（mm）和對應的像素座標（px）</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-gray-400 shrink-0">3.</span><span>用 cv2.getAffineTransform 計算變換矩陣</span></li>
              <li className="flex items-start gap-2"><span className="font-bold text-gray-400 shrink-0">4.</span><span>之後任意像素座標都可以轉換成機械手臂座標</span></li>
            </ol>
          </div>

          <CodeBlock
            lang="python"
            title="calibration.py"
            code={`import numpy as np
import cv2

# 校準點：[機械手臂座標(mm), 對應像素座標(px)]
# 需要手動校準一次，之後存成設定檔
CALIBRATION_POINTS = [
    # (robot_x, robot_y), (pixel_x, pixel_y)
    ((100, 100), (120, 95)),
    ((200, 100), (240, 95)),
    ((100, 200), (120, 200)),
]

def build_transform_matrix(calibration_points):
    """
    從校準點計算仿射變換矩陣。
    需要至少 3 個不共線的對應點。
    """
    robot_pts = np.float32([p[0] for p in calibration_points[:3]])
    pixel_pts = np.float32([p[1] for p in calibration_points[:3]])

    # 從像素座標到機械手臂座標的變換矩陣
    M = cv2.getAffineTransform(pixel_pts, robot_pts)
    return M

def pixel_to_robot(pixel_x, pixel_y, M):
    """
    將像素座標轉換為機械手臂座標（mm）。
    """
    pt = np.array([[[float(pixel_x), float(pixel_y)]]], dtype=np.float32)
    robot_pt = cv2.transform(pt, M)
    robot_x = robot_pt[0][0][0]
    robot_y = robot_pt[0][0][1]
    return robot_x, robot_y

# 使用方式
M = build_transform_matrix(CALIBRATION_POINTS)
target_pixel = (180, 150)
robot_x, robot_y = pixel_to_robot(*target_pixel, M)
print(f"Robot should move to: ({robot_x:.2f}mm, {robot_y:.2f}mm)")`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* 機械手臂控制 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Step 3：控制機械手臂移動</h2>
          <p className="text-gray-700 leading-relaxed">
            算出目標座標後，透過序列埠（Serial）或 TCP Socket 發送指令到機械手臂控制器。
            不同廠牌的指令格式不同，這裡以通用的 ASCII 指令格式示範：
          </p>

          <CodeBlock
            lang="python"
            title="robot_control.py"
            code={`import serial
import time

class RobotArm:
    def __init__(self, port='/dev/ttyUSB0', baudrate=115200):
        self.ser = serial.Serial(port, baudrate, timeout=1)
        time.sleep(2)  # 等待連線穩定

    def send_command(self, cmd: str):
        """發送指令並等待回應"""
        self.ser.write((cmd + '\\n').encode())
        response = self.ser.readline().decode().strip()
        return response

    def move_to(self, x: float, y: float, z: float = 50.0, speed: int = 50):
        """
        移動到指定 XYZ 座標（mm）。
        z 預設 50mm 安全高度，避免撞到工件。
        """
        # 先提高 Z 軸（安全移動）
        self.send_command(f"MOVZ {z:.2f} {speed}")
        time.sleep(0.5)
        # 移動 XY
        self.send_command(f"MOVXY {x:.2f} {y:.2f} {speed}")
        time.sleep(1.0)
        return True

    def close(self):
        self.ser.close()

# 完整整合：找目標 → 轉座標 → 移動
def auto_targeting(camera_index=0):
    cap = cv2.VideoCapture(camera_index)
    robot = RobotArm('/dev/ttyUSB0')
    M = build_transform_matrix(CALIBRATION_POINTS)

    ret, frame = cap.read()
    result = find_circle_target(frame)

    if result:
        cx, cy, _ = result
        robot_x, robot_y = pixel_to_robot(cx, cy, M)
        print(f"Target at pixel ({cx}, {cy}) → robot ({robot_x:.1f}, {robot_y:.1f})")
        robot.move_to(robot_x, robot_y)
        print("✅ Movement complete")
    else:
        print("❌ Target not found")

    cap.release()
    robot.close()`}
          />

          <InfoBox type="warning">
            <strong>安全注意事項</strong>：在生產環境操控機械手臂，<strong>一定要設定速度限制和行程限制</strong>（Software Limit）。
            建議所有自動移動前先手動確認一次，加入緊急停止按鈕，並在低速模式下先跑一輪驗證座標正確。
          </InfoBox>
        </section>

        <Divider className="opacity-30" />

        {/* 實際成果 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">實際成果與優化</h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { metric: '精度', before: '±2mm（手動）', after: '±0.3mm（自動）', color: 'bg-green-50 border-green-100', icon: '🎯' },
              { metric: '速度', before: '30 sec/次', after: '5 sec/次', color: 'bg-blue-50 border-blue-100', icon: '⚡' },
              { metric: '成功率', before: '約 85%', after: '約 97%', color: 'bg-purple-50 border-purple-100', icon: '✅' },
            ].map((item) => (
              <div key={item.metric} className={`border rounded-2xl p-5 ${item.color}`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-black text-gray-900 mb-3">{item.metric}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-red-600">❌ 之前：{item.before}</p>
                  <p className="text-green-600">✅ 之後：{item.after}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="font-black text-gray-900">主要優化點：</p>
            <ul className="space-y-3 text-gray-600 text-sm">
              {[
                '加入 HSV 色彩過濾：排除工廠環境的光線干擾，只保留目標顏色範圍',
                '多幀平均：連拍 5 幀，取目標位置的平均值，降低單幀誤差',
                '增量移動：不直接跳到目標，用小步驟移動 + 重新偵測，類似閉迴路控制',
                '校準檔案：每次開機載入上次的校準矩陣，不需要每次重新校準',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* 總結 */}
        <section>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-green-400" />
              <h2 className="text-2xl font-black text-gray-900">這篇學到什麼</h2>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '📷', text: '視覺引導系統的核心三步驟：影像擷取 → OpenCV 偵測目標像素座標 → 仿射變換轉成機械手臂座標' },
                { emoji: '🔍', text: 'OpenCV 工廠場景建議：用 HSV 色彩過濾再做輪廓偵測，比直接用 Canny 更穩定' },
                { emoji: '📐', text: '仿射變換校準只需要 3 個對應點，之後任意位置都能自動轉換，是整個系統最重要的一步' },
                { emoji: '🔒', text: '生產環境一定要加速度限制 + 行程限制 + 緊急停止，安全永遠優先於效率' },
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
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-400">這是系列第一篇</p>
          </div>
          <Link href="/blog/python/ep08-pytorch-basics" className="group block bg-gray-50 hover:bg-emerald-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors">EP.08 — PyTorch 入門</p>
            <p className="text-sm text-gray-500 mt-1">Tensor 操作與訓練迴圈</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-300 group-hover:text-emerald-500 transition-colors" />
          </Link>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['Python 自動化', 'OpenCV', '電腦視覺', '機械手臂', '工廠自動化', '仿射變換', 'EP.01'].map((tag) => (
            <Chip key={tag} variant="flat" color="success" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
