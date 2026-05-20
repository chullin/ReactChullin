import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  Clock,
  Eye,
  Quote,
  ArrowRight,
  Target,
  Maximize2,
  Cpu,
  MonitorCheck,
  ChevronRight,
  Settings,
  Camera,
  Layers,
  Zap,
  CheckCircle2,
  AlertTriangle,
  CornerDownRight
} from 'lucide-react';

import Link from 'next/link';
import Script from 'next/script';
import BlogRelatedPosts from '@/components/blog/BlogRelatedPosts';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenCV XY Vision Automation | 智慧化視覺辨識與自動化操作系統 | Joseph Chen',
  description: '透過 OpenCV 視覺辨識與座標轉換，讓傳統依賴固定 XY 座標的自動化測試，升級為可動態辨識 UI 的智慧化操作系統。',
  alternates: {
    canonical: 'https://chullin.tw/blog/ai/ep10-opencv-robot',
  },
};

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

export default function AiEP10Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero / 標題區 */}
      <div className="relative h-[52vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-955">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <FadeIn>
            <div className="flex justify-center gap-2 mb-5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase text-[10px]">
                Computer Vision
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase text-[10px]">
                EP.10
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              OpenCV XY Vision Automation<br />
              <span className="text-cyan-400 text-2xl sm:text-3xl font-bold">智慧化視覺辨識與自動化操作系統</span>
            </h1>
            <p className="text-slate-300 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              透過 OpenCV 視覺辨識與座標轉換，讓傳統依賴固定 XY 座標的自動化測試，<br />
              升級為可動態辨識 UI 的智慧化操作系統。
            </p>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {/* Author Metadata */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 text-slate-600 p-2.5 rounded-full">
              <User size={18} />
            </div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2024 - 2025</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>13 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /> <span>智慧自動化</span></div>
          </div>
        </div>

        {/* 2. 這篇文章要解決什麼問題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-cyan-500 pl-4">這篇文章要解決什麼問題</h2>
          <p className="text-gray-700 leading-relaxed font-medium">
            在消費性電子與手機出廠自動化測試中，軟體腳本通常必須透過實體機械手臂或 XY 軸點擊器 (Physical XY Clicker) 來模擬人手觸控螢幕。
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            過去，自動化點擊完全依賴「硬連結座標 (Hardcoded Coordinates)」—— 例如，命令手臂在 `X=450, Y=1200` 的像素位置進行點擊。這種作法看似直觀，卻存在極為脆弱的硬傷：一旦測試手機換了型號、螢幕解析度改變、APP UI 發生微小改版，或者是系統更新彈出了系統通知，原本的座標點擊就會直接落空。
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            工程師們不得不花費大量工作天重新校正數以千計的座標點。為了解決這個問題，我開發了一套基於 **OpenCV 電腦視覺辨識與空間座標映射** 的智慧導航系統。
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            我們要解決的核心問題是：<strong>如何利用相機鏡頭對手機螢幕進行即時畫面擷取，使用 OpenCV 自動找出 UI 按鈕的像素位置，並透過仿射與透視矩陣轉換，計算出機械手臂在實體物理空間的真實運動座標，實現免除手動校正的閉環自動化系統？</strong>
          </p>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 3. 真實案例或 Joseph 的經驗 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-cyan-500 pl-4">真實案例與 Joseph 的現場經驗</h2>
          <p className="text-gray-700 leading-relaxed">
            在工廠自動化測試的現場，最大的敵人往往不是代碼 Bug，而是實體環境的物理變化。
          </p>
          <p className="text-gray-700 leading-relaxed">
            我曾遇過一個棘手案例：我們需要對一系列不同解析度（從 iPhone SE 到 Pro Max 尺寸）的手機進行 APP 點擊測試。由於固定座標在版面微調後會直接失效，起初團隊只能為每款手機寫一套專屬座標配置文件。更糟糕的是，因為相機架設在測試機台上方，容易受到現場日光燈反光的折射干擾，或者因為機台運轉震動導致相機镜头發生微小的角度偏斜。
          </p>
          <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-100 text-slate-900 space-y-3">
            <p className="font-bold text-cyan-950">💡 現場血淚經驗：演算法只是起點，環境魯棒性才是關鍵</p>
            <p className="text-sm leading-relaxed text-slate-700">
              我一開始也以為這不過是跑個 cv2.matchTemplate 罷了。但到了生產線當天就遭遇滑鐵盧：工廠上空的日光燈反光，導致按鈕在相機畫面中形成一片白斑，模板比對直接失敗。
            </p>
            <p className="text-sm leading-relaxed text-slate-700 font-semibold">
              後來，我對輸入的影像進行了動態直方圖等化（CLAHE）與 Canny 邊緣檢測，消除反光色差的影響；並設計了「三點動態物理校正法 (Three-point Physical Calibration)」：開局時讓機械手點擊螢幕上三個基準點，透過觸控事件取得手機內部座標，再比對相機拍到的像素座標，當場求解出 Perspective Matrix（透視變換矩陣）。這讓我們的點擊精準度達到了 ±0.5mm 以內。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 4. 核心概念解釋 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-cyan-500 pl-4">核心概念解釋：影像處理與座標空間變換</h2>
          <p className="text-gray-700 leading-relaxed">
            這套自動化系統的背後是一套嚴謹的影像處理與數學變換閉環。以下是從相機輸入到機械臂點擊的視覺閉環流程圖：
          </p>

          {/* Flowchart 區塊 - 使用 Tailwind 繪製 */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 my-6">
            <p className="text-sm font-black text-slate-400 uppercase tracking-wider mb-6 text-center">OpenCV 智慧定位與實體映射 Pipeline</p>
            
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 relative">
              {/* Step 1 */}
              <div className="flex-1 bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs font-black text-cyan-600 uppercase">Step 01 / 圖像採集</span>
                  <h4 className="font-black text-slate-800 text-sm mt-1 mb-2">Camera Grab</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">工業相機即時擷取測試手機畫面，轉換為 OpenCV 灰階圖，並使用高斯模糊去除鏡頭噪點。</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center md:rotate-0 rotate-90 text-cyan-300">
                <ArrowRight size={24} />
              </div>

              {/* Step 2 */}
              <div className="flex-1 bg-cyan-50/50 p-5 rounded-2xl border border-cyan-100 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs font-black text-cyan-700 uppercase">Step 02 / 模板匹配</span>
                  <h4 className="font-black text-cyan-900 text-sm mt-1 mb-2">Template Matching</h4>
                  <p className="text-xs text-cyan-700 leading-relaxed">使用 cv2.matchTemplate 匹配目標按鈕邊緣，並以 MinMaxLoc 找出匹配係數大於 0.85 的像素中心點 (u, v)。</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center md:rotate-0 rotate-90 text-cyan-300">
                <ArrowRight size={24} />
              </div>

              {/* Step 3 */}
              <div className="flex-1 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-lg text-white">
                <div>
                  <span className="text-xs font-black text-cyan-400 uppercase">Step 03 / 座標映射與點擊</span>
                  <h4 className="font-black text-white text-sm mt-1 mb-2">Coordinate Transform</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">藉由透視變換矩陣，將 (u, v) 映射為實體物理空間的機械手座標 (X, Y)，隨後透過 Serial Port 發送點擊指令。</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            我們使用了三個核心影像技術來確保辨識率與穩定性：
          </p>
          <ul className="space-y-3 pl-6 text-gray-700 list-disc">
            <li><strong>直方圖均衡化 (Equalization)</strong>：特別是限制對比度自適應直方圖均衡化 (CLAHE)，能大幅減少工廠局部陰影與燈光反光的影響。</li>
            <li><strong>透視變換 (Perspective Transformation)</strong>：由於相機架設難以保證絕對垂直，畫面通常存在傾斜。透視矩陣可校正梯形變形，將偏斜的像素面轉換為正投影實體面。</li>
            <li><strong>匹配閾值卡點 (Confidence Thresholding)</strong>：僅在相似度高於設定閾值時觸發，避免在背景紋理複雜時產生誤判點擊。</li>
          </ul>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 5. 程式碼範例 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-cyan-500 pl-4">程式碼實戰：影像處理與實體點擊</h2>
          <p className="text-gray-700 leading-relaxed">
            以下是我們在專案中應用的核心代碼。第一段是傳統的 RGB 色值區間硬比對（容易因亮度稍微改變而完全抓不到點）；第二段是 OpenCV 模板比對配合矩陣映射的完整實現。
          </p>

          <div className="space-y-4">
            <p className="font-bold text-red-600 flex items-center gap-1.5">
              <AlertTriangle size={18} /> 錯誤的寫法：直覺的固定像素 RGB 比對（光影或按鈕微小變色即失效）
            </p>
            <pre className="bg-slate-950 text-slate-100 p-5 rounded-2xl overflow-x-auto text-xs leading-relaxed font-mono">
{`# ❌ 舊型自動化腳本片段：RGB 色值硬比對
import cv2
import numpy as np

def find_button_naive(screenshot_path):
    img = cv2.imread(screenshot_path)
    # 嘗試尋找畫面中接近特定藍色 (R:0, G:120, B:255) 的區域
    # 在工廠日光燈反光或變色主題下，色值稍微偏差 5 個單位就完全失效
    lower_blue = np.array([115, 50, 50])
    upper_blue = np.array([125, 255, 255])
    
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, lower_blue, upper_blue)
    
    # 尋找輪廓並點擊幾何中心
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        M = cv2.moments(largest)
        if M["m00"] != 0:
            cX = int(M["m10"] / M["m00"])
            cY = int(M["m01"] / M["m00"])
            return cX, cY # 返回像素坐標，沒有與手臂座標校準映射
    return None`}
            </pre>
          </div>

          <div className="space-y-4">
            <p className="font-bold text-green-600 flex items-center gap-1.5">
              <CheckCircle2 size={18} /> 改良後寫法：OpenCV 模板匹配與透視變換座標計算
            </p>
            <pre className="bg-slate-950 text-slate-100 p-5 rounded-2xl overflow-x-auto text-xs leading-relaxed font-mono">
{`# 🚀 現代化視覺定位與實體映射模組
import cv2
import numpy as np

class VisionLocator:
    def __init__(self, perspective_matrix_path=None):
        # 載入預先校正好的 3x3 透視變換矩陣
        if perspective_matrix_path and os.path.exists(perspective_matrix_path):
            self.M = np.load(perspective_matrix_path)
        else:
            # 預設單位矩陣 (不做轉換)
            self.M = np.eye(3, dtype=np.float32)

    def set_calibration(self, src_pts: np.ndarray, dst_pts: np.ndarray):
        """傳入三個/四個基準像素坐標(src)與對應手臂坐標(dst)，動態計算轉換矩陣"""
        self.M, _ = cv2.findHomography(src_pts, dst_pts)

    def locate_and_convert(self, scene_img_path, template_img_path, threshold=0.85):
        # 1. 讀取並轉為灰階
        scene = cv2.imread(scene_img_path)
        template = cv2.imread(template_img_path)
        
        scene_gray = cv2.cvtColor(scene, cv2.COLOR_BGR2GRAY)
        template_gray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
        
        # 2. 進行限制對比度直方圖等化 (CLAHE) 以消除反光
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        scene_gray = clahe.apply(scene_gray)
        template_gray = clahe.apply(template_gray)

        # 3. 模板匹配
        w, h = template_gray.shape[::-1]
        res = cv2.matchTemplate(scene_gray, template_gray, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

        # 判斷匹配度是否合規
        if max_val < threshold:
            print(f"⚠️ 辨識置信度不足: {max_val:.2f} < {threshold}")
            return None

        # 取得匹配中心點像素坐標 (u, v)
        pixel_x = max_loc[0] + w // 2
        pixel_y = max_loc[1] + h // 2
        
        # 4. 關鍵步驟：利用 Homography Matrix 將像素坐標轉換為物理空間坐標
        pixel_vector = np.array([pixel_x, pixel_y, 1.0], dtype=np.float32)
        physical_vector = np.dot(self.M, pixel_vector)
        
        # 歸一化齊次坐標
        physical_x = physical_vector[0] / physical_vector[2]
        physical_y = physical_vector[1] / physical_vector[2]
        
        return (pixel_x, pixel_y), (float(physical_x), float(physical_y))

if __name__ == "__main__":
    locator = VisionLocator()
    
    # 模擬動態校正過程：定義手機畫面上的三個角點像素坐標，以及對應實體點擊器的 XY 坐標 (mm)
    pixel_points = np.array([[100, 100], [900, 100], [500, 1800]], dtype=np.float32)
    physical_points = np.array([[10.0, 15.0], [90.0, 15.0], [50.0, 190.0]], dtype=np.float32)
    locator.set_calibration(pixel_points, physical_points)
    
    # 執行定位與映射
    # result = locator.locate_and_convert("scene.jpg", "confirm_btn.jpg")
    # if result:
    #     pixel_pos, robot_pos = result
    #     print(f"🎯 成功識別按鈕像素: {pixel_pos} -> 機械手實體座標: {robot_pos} mm")`}
            </pre>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 6. 技術比較表 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-cyan-500 pl-4">視覺與點擊自動化方案比較</h2>
          <p className="text-gray-700 leading-relaxed">
            對於不同預算、速度與精度要求的生產線，常見的自動化定位方案如下：
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-black">定位方案</th>
                  <th className="px-6 py-4 font-black">優點</th>
                  <th className="px-6 py-4 font-black">缺點</th>
                  <th className="px-6 py-4 font-black">適合場景</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-gray-900">硬編碼固定座標點擊</td>
                  <td className="px-6 py-4 text-green-700">執行速度極快（微秒級）、程式碼最簡單</td>
                  <td className="px-6 py-4 text-red-700">對版面與機台震動的容錯率為零、需要频繁重新校正</td>
                  <td className="px-6 py-4 text-slate-700">治具與手機完全固定、UI 永不變更的封閉測試</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-gray-900">OpenCV 傳統視覺辨識</td>
                  <td className="px-6 py-4 text-green-700">不需大算力顯卡、位置定位精準度高 (±0.5mm)、適應 UI 位移</td>
                  <td className="px-6 py-4 text-red-700">對環境光線敏感、影像形變過大或角度偏差時可能誤判</td>
                  <td className="px-6 py-4 text-slate-700">APP 介面微調、機台存在微小震動、多解析度適配測試</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-gray-900">深度學習目標檢測 (YOLO / SAM)</td>
                  <td className="px-6 py-4 text-green-700">對角度變形與反光的容錯率極高、能識別複雜不規則物件</td>
                  <td className="px-6 py-4 text-red-700">需高階 GPU 硬體、需要預先標註訓練資料、單次推論耗時較長</td>
                  <td className="px-6 py-4 text-slate-700">非標準化實體包裝外觀檢查、多變性極高的動態 3D UI 辨識</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 7. 常見錯誤與踩坑 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-cyan-500 pl-4">常見錯誤與踩坑實錄</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-2xl mt-1">🔴</span>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">模板圖片與相機拍攝解析度不匹配</h4>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  開發時，我們直接將 APP UI 設計圖上的按鈕切圖作為比對 Template。但現場相機拍到的按鈕，因為鏡頭物理對焦、距離遠近，其像素面積比原始設計圖縮小了將近 30%，導致比對相似度直接跌破 0.5。
                  <br />
                  <strong>正解：</strong> 必須在現場相機就定位後，實地擷取一張「真實拍到的」按鈕作為 Template，或在代碼中進行多尺度 (Multi-scale) 模板匹配。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl mt-1">🔴</span>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">誤把單純的縮放比例當成座標變換</h4>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  一開始我們圖方便，只用簡易的比例公式轉換：`手臂X = 像素X * 比例`。但實際上，由於相機架設存在微小的傾斜角（Pitch & Roll），會產生遠小近大的透視投影形變。這導致螢幕中心的點擊很準，但邊角的點擊偏移了將近 3mm，弄壞了測試探針。
                  <br />
                  <strong>正解：</strong> 必須嚴格使用 `cv2.findHomography` 求解 3x3 透視變換矩陣，利用齊次矩陣乘法計算點擊位置。
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 8. 實務建議 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-cyan-500 pl-4">實務操作建議</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-cyan-100 text-cyan-700 p-1.5 rounded-lg mt-0.5"><Settings size={16} /></div>
              <div>
                <p className="font-bold text-gray-900">加裝相機專用物理遮光罩</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">演算法寫得再好，也比不上優質的物理光源輸入。在鏡頭外圍加裝 LED 環形光源與遮光罩，將反射干擾降低 90% 以上，是讓 OpenCV 相似度常年穩定在 0.95 以上的最省力方法。</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-cyan-100 text-cyan-700 p-1.5 rounded-lg mt-0.5"><Maximize2 size={16} /></div>
              <div>
                <p className="font-bold text-gray-900">開機自檢動態校正</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">機台運行時間久了難免有物理位移。建議在測試流程開頭，設計一段 30 秒的自檢程序：讓手臂點擊螢幕邊角的校正圓點，自動重新計算並更新 Homography Matrix，實現零人工維護成本。</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 9. 與本系列其他文章的關聯 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-cyan-500 pl-4">與本系列其他文章的關聯</h2>
          <p className="text-gray-700 leading-relaxed">
            視覺自動化是智慧工廠大版圖的關鍵一環，你可以進一步了解以下相關技術：
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog/ai/ep09-tms" className="group p-5 bg-slate-50 hover:bg-cyan-50 rounded-2xl border border-slate-100 transition-all flex flex-col justify-between">
              <div>
                <p className="text-xs font-black text-cyan-600 mb-1">系列前置篇 EP.09</p>
                <h4 className="font-black text-gray-900 text-sm group-hover:text-cyan-600 transition-colors">TMS 測試管理系統</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">看看我們如何將本篇 OpenCV 取得的動態點擊與測試進度結果，即時上傳並同步到 TMS 數據庫，完成完整的流程控制。</p>
              </div>
              <span className="text-[10px] font-black text-cyan-500 mt-4 flex items-center gap-1">
                開始閱讀 <ArrowRight size={10} />
              </span>
            </Link>

            <Link href="/blog/python/ep01-opencv-automation" className="group p-5 bg-slate-50 hover:bg-cyan-50 rounded-2xl border border-slate-100 transition-all flex flex-col justify-between">
              <div>
                <p className="text-xs font-black text-cyan-600 mb-1">Python 基礎實作篇</p>
                <h4 className="font-black text-gray-900 text-sm group-hover:text-cyan-600 transition-colors">OpenCV 影像處理基礎</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">如果您對 cv2.matchTemplate、灰階化與高斯模糊等基礎語法還不熟悉，這篇文章有詳盡的代碼操作示範。</p>
              </div>
              <span className="text-[10px] font-black text-cyan-500 mt-4 flex items-center gap-1">
                開始閱讀 <ArrowRight size={10} />
              </span>
            </Link>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 10. 總結 */}
        <section>
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 border border-slate-800 rounded-3xl p-8 space-y-6 text-white">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-cyan-400" />
              <h2 className="text-2xl font-black text-white">總結</h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed font-medium">
              <p>
                「固定座標」是自動化測試的初級階段，而「動態視覺導航」則是走向智慧工廠的必然選擇。
              </p>
              <p>
                透過 OpenCV 模板匹配、CLAHE 反光消除以及 Homography 透視矩陣，我們成功為機械手臂裝上了「眼睛」，讓它能夠在 UI 變動與複雜的光影干擾中，精準無誤地完成點擊測試。這不僅消除了無謂的重複校正人力，更為接下來導入基於 AI 的異常檢測打下了穩固的底座。
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50" />

        {/* Related Posts */}
        <BlogRelatedPosts currentPostHref="/blog/ai/ep10-opencv-robot" category="ai" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 pt-10">
          <Link href="/blog/ai/ep09-tms" className="group block bg-gray-50 hover:bg-slate-100 transition-colors rounded-2xl p-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-cyan-600 transition-colors">EP.09 — Test Management System (TMS)</p>
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-400 italic">更多精彩實戰，敬請期待...</p>
          </div>
        </div>
      </article>

      {/* Structured Data for SEO */}
      <Script id="blog-json-ld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "OpenCV Vision Automation | 智慧化視覺辨識與自動化操作系統",
          "description": "透過 OpenCV 視覺辨識與座標轉換，實現高彈性的自動化測試。",
          "author": {
            "@type": "Person",
            "name": "陳憲億 Joseph Chen"
          },
          "datePublished": "2025-05-10",
          "image": "https://chullin.tw/assets/profile3.webp",
          "publisher": {
            "@type": "Organization",
            "name": "Joseph Chen Portfolio",
            "logo": {
              "@type": "ImageObject",
              "url": "https://chullin.tw/favicon.ico"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://chullin.tw/blog/ai/ep10-opencv-robot"
          }
        })}
      </Script>
    </div>
  );
}
