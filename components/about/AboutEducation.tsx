'use client';

import { motion } from 'framer-motion';
import { Link } from '@heroui/react';
import { ArrowUpRight } from 'lucide-react';

const education = [
  {
    degree: "碩士 - 資訊工程研究所",
    school: "國立中正大學 National Chung Cheng University",
    period: "2022 - 2024",
    thesis: "基於變換器之文字與音轉換研究及其嵌入式實現",
    link: "https://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi?o=dnclcdr&s=id=%22111CCU00392004%22.&searchmode=basic"
  },
  {
    degree: "學士 - 資訊工程學系",
    school: "國立金門大學 National Quemoy University",
    period: "2018 - 2022",
    project: "以 LoRa 為基礎之失智老人輔助裝置設計",
    link: "https://www.airitilibrary.com/Article/Detail/P20191126001-201911-201911260014-201911260014-223-226"
  }
];

export default function AboutEducation() {
  return (
    <section className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* Left Column: Typography driven education list */}
          <div className="md:col-span-7 space-y-16">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Academic Foundation</h2>
                <div className="w-12 h-1 bg-cyan-500 rounded-full" />
            </motion.div>

            <div className="space-y-16">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{edu.period}</span>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{edu.degree}</h3>
                    <p className="text-slate-500 font-bold text-sm mb-4">{edu.school}</p>
                    <Link
                      isExternal
                      href={edu.link}
                      className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-600 transition-colors font-medium border-b border-slate-100 pb-1 w-fit group/link"
                    >
                      <span>{edu.thesis || edu.project}</span>
                      <ArrowUpRight size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial personal philosophy */}
          <div className="md:col-span-5 flex flex-col justify-end">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
            >
                {/* Decorative Quote Mark */}
                <div className="absolute -top-12 -left-8 text-8xl font-serif text-slate-100 italic pointer-events-none select-none">
                    "
                </div>
                
                <div className="relative z-10 space-y-6">
                    <h3 className="text-3xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-normal" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        "Bridging the gap between <br />
                        <span className="text-blue-600" style={{ fontFamily: "'Dancing Script', cursive" }}>AI Innovation</span> <br className="hidden md:block" />
                        & <span className="text-cyan-600" style={{ fontFamily: "'Dancing Script', cursive" }}>Industrial Implementation</span>"
                    </h3>
                    <div className="space-y-4">
                        <p className="text-slate-500 leading-relaxed font-medium">
                            這個網站不只是我的數位名片，也是我記錄 AI 應用、自動化系統與軟體工程實踐的技術知識庫。我致力於將複雜的 AI 技術轉化為工業現場可實踐的解決方案。
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['AI Strategy', 'Robotics', 'Automation'].map(tag => (
                                <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 rounded-full border border-slate-100">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
