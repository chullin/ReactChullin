'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
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
  CheckCircle2
} from 'lucide-react';

import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import BlogRelatedPosts from '@/components/blog/BlogRelatedPosts';

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
      {/* Hero Section - Refined to Industrial Style */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold uppercase text-[10px]">
                Computer Vision
              </Chip>
              <Chip size="sm" variant="flat" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 font-bold uppercase text-[10px]">
                EP.10
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              OpenCV XY Vision Automation<br />
              <span className="text-cyan-400 text-2xl sm:text-3xl font-bold">智慧化視覺辨識與自動化操作系統</span>
            </h1>
            <p className="text-slate-300 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              透過 OpenCV 視覺辨識與座標轉換，讓傳統依賴固定 XY 座標的自動化測試，<br />
              升級為可動態辨識 UI 的智慧化操作系統。
            </p>
          </motion.div>
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
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>12 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /> <span>智慧自動化</span></div>
          </div>
        </div>

        {/* Intro Section - Grounded and Realistic */}
        <section className="space-y-5">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            在手機自動化測試領域中，傳統流程主要依賴 <strong>XY 軸點擊設備 (XY Auto Clicker)</strong> 模擬人工操作。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            然而，過去的座標點擊模式存在明顯缺陷：一旦手機版面微調、螢幕解析度改變或系統更新導致 UI 位移，
            工程師就必須手動重新校正成千上萬個座標點。這種「硬連結 (Hard-linked)」的自動化方式維護成本極高。
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            為了解決這個問題，我開發了一套基於 <strong>OpenCV 的視覺導航系統</strong>，將操作邏輯從「固定座標」轉向「動態辨識」。
          </p>
        </section>

        <Divider className="opacity-30" />

        {/* System Pipeline Section - New Visual Flow */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-gray-900">系統架構流程 (Pipeline)</h2>
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {[
                { icon: <Camera size={20} />, text: 'Camera Stream' },
                { icon: <Layers size={20} />, text: 'OpenCV Processing' },
                { icon: <Target size={20} />, text: 'Coordinate Mapping' },
                { icon: <Cpu size={20} />, text: 'Python Controller' },
                { icon: <Zap size={20} />, text: 'XY Device Action' }
              ].map((step, i, arr) => (
                <div key={step.text} className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-cyan-400 flex items-center justify-center shadow-lg mb-3">
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter text-center">{step.text}</span>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block absolute mt-6 ml-[18%] text-slate-200">
                      <ChevronRight size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Before vs After Scenario - Added Storytelling with Impact */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">實戰案例：維護成本的轉變</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-slate-50 border-none shadow-none p-6">
              <p className="text-xs font-black text-red-500 uppercase mb-3">Before (傳統模式)</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                iPhone 更新後，確認按鈕位移了 20px。由於腳本採用固定座標，導致後續數百筆自動化測試全部失效，工程師需花費整天重新手動校正所有相關座標。
              </p>
            </Card>
            <Card className="bg-cyan-50 border-none shadow-none p-6">
              <p className="text-xs font-black text-cyan-600 uppercase mb-3">After (視覺導航模式)</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                系統透過 OpenCV 自動搜尋「確認」圖示位置。即使 UI 版面微調，系統仍能精確鎖定動態座標並觸發 XY 設備，達成無人值守的零維護轉型。
              </p>
            </Card>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Technical Deep Dive - Enhanced Technical Content */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-gray-900">核心技術細節</h2>
          
          <div className="space-y-4">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                <Maximize2 size={20} className="text-cyan-600" /> 座標映射與校正 (Coordinate Mapping)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                核心難點在於影像像素座標 (Pixel Position) 與實體設備座標 (Physical Coordinate) 的映射。我設計了一套校正邏輯：
              </p>
              <div className="flex flex-wrap gap-2">
                {['比例換算 (Scaling)', 'Offset Calibration', '座標系映射', '透視校正 (Perspective Transform)'].map(t => (
                  <Chip key={t} size="sm" variant="flat" className="bg-white text-slate-500 font-bold border border-slate-200">{t}</Chip>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                <MonitorCheck size={20} className="text-cyan-600" /> 多重辨識驗證 (Hybrid Detection)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                為了避免 Template Matching 在複雜背景下的誤判，系統導入了混合判斷機制：
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                  <span><strong>OCR 文字辨識</strong>：二次確認按鈕上的文字內容，確保目標狀態正確。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                  <span><strong>Feature Matching</strong>：在影像變形或縮放時，提供比單純模板匹配更高的魯棒性。</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* My Work Section - Added Personal Contribution */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">我在專案中負責的工作</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'OpenCV 視覺辨識開發', desc: '實作 Template Matching 與影像預處理流程，提升極端光影下的辨識率。' },
              { title: '座標映射算法設計', desc: '開發像素與實體座標轉換邏輯，實現 ±1mm 內的點擊精度。' },
              { title: 'Python 系統整合', desc: '串接影像處理模組與 Serial Port 控制器，建立完整的自動化閉環。' },
              { title: '校正系統 UI 開發', desc: '設計視覺化校正介面，讓工程師能快速完成攝影機與點擊器的初步對位。' }
            ].map(item => (
              <div key={item.title} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Future Roadmap - Refined Future Direction */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">未來規劃與演進</h2>
          <p className="text-gray-700 leading-relaxed">
            目前的系統已成功驗證「視覺導向自動化」的潛力，未來的發展方向將專注於更高的智慧化程度：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'UI 異常自動檢測系統',
              'OCR + Vision 混合判斷邏輯優化',
              'AI-based UI State Recognition',
              '自動化生成測試操作流',
              '視覺化測試結果熱點圖報告'
            ].map(item => (
              <div key={item} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-600">
                <ArrowRight size={14} className="text-cyan-500" />
                {item}
              </div>
            ))}
          </div>
        </section>

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
          "image": "https://chullin.tw/assets/profile3.png",
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
