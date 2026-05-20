import { ExternalLink, Eye, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: "Air-gapped AI Deployment",
    category: "AI Infrastructure",
    description: "針對高資安要求的工業生產現場，在完全無網路的隔離環境中部署本地 LLM 解決方案 (Ollama & Dify)，在確保商業機密安全的前提下，成功讓工廠端安全導入本地 AI 應用。",
    icon: <ShieldCheck className="text-emerald-500" />,
    tags: ["Ollama", "Dify", "Docker", "Linux"],
    href: "/blog/ai/ep01-airgapped-intro",
  },
  {
    title: "Test Management System (TMS)",
    category: "Automation",
    description: "架構並重構集中化測試管理平台，將複雜分散的工廠測試流程與數據收集全面自動化，大幅減少人工追蹤誤差與溝通成本，顯著提升測試資料管理與決策效率。",
    icon: <Database className="text-blue-500" />,
    tags: ["FastAPI", "PostgreSQL", "React", "Python"],
    href: "/blog/ai/ep09-tms",
  },
  {
    title: "OpenCV Vision Automation",
    category: "Robotics",
    description: "基於 OpenCV 開發高精度 XY 點擊設備的視覺導航系統，將傳統固定座標升級為動態 UI 智慧辨識，大幅改善手機自動化測試流程，顯著降低人工操作與校正成本。",
    icon: <Eye className="text-purple-500" />,
    tags: ["OpenCV", "Python", "Automation", "Computer Vision"],
    href: "/blog/ai/ep10-opencv-robot",
  }
];

export default function HomeProjects() {
  return (
    <section className="py-32 bg-[#fafafa] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
              精選專案 <span className="text-gradient underline decoration-blue-500/10 decoration-8 underline-offset-8">Featured Projects</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              專注於解決智慧製造中的核心痛點，從 AI 基礎設施到自動化視覺系統。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title}>
              <Link href={project.href} className="block h-full group/card relative">
                <div className="h-full border border-slate-200 shadow-sm group-hover/card:shadow-2xl group-hover/card:shadow-blue-500/10 group-hover/card:-translate-y-3 transition-all duration-500 bg-white cursor-pointer overflow-hidden rounded-2xl flex flex-col justify-between">
                  <div className="flex flex-col items-start gap-4 px-8 pt-10 pb-0">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover/card:bg-blue-50 group-hover/card:border-blue-100 transition-colors duration-300">
                      {project.icon}
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{project.category}</p>
                        <ArrowRight
                          size={18}
                          className="text-slate-300 group-hover/card:text-blue-500 group-hover/card:translate-x-1 transition-all duration-300"
                        />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight mt-2 group-hover/card:text-blue-600 transition-colors duration-300">{project.title}</h3>
                    </div>
                  </div>
                  <div className="px-8 py-8 flex flex-col justify-between h-full">
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center bg-slate-100 text-slate-500 font-bold text-[10px] px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Subtle Accent Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 translate-y-1 group-hover/card:translate-y-0 transition-transform duration-300" />
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-bold text-slate-400 hover:text-slate-900 group transition-all text-lg"
          >
            <span>查看更多實戰案例</span>
            <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
