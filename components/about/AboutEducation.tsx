'use client';

import { motion } from 'framer-motion';
import { Link } from '@heroui/link';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

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
  const { t, tArray } = useI18n();
  const educationCopy = tArray<{
    degree: string;
    school: string;
    period: string;
    work: string;
  }>('about.education.items');

  return (
    <section className="py-10 px-6 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* Left Column: Typography driven education list */}
          <div className="md:col-span-7 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">{t('about.education.title')}</h2>
                <div className="w-12 h-1 bg-orange-600 rounded-full" />
            </motion.div>

            <div className="space-y-8">
              {education.map((edu, i) => {
                const copy = educationCopy[i];

                return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{copy.period}</span>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-700 transition-colors">{copy.degree}</h3>
                    <p className="text-slate-500 font-bold text-sm mb-4">{copy.school}</p>
                    <Link
                      isExternal
                      href={edu.link}
                      className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-700 transition-colors font-medium border-b border-slate-100 pb-1 w-fit group/link"
                    >
                      <span>{copy.work}</span>
                      <ArrowUpRight size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
                );
              })}
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
                    <h3 className="text-3xl md:text-5xl font-normal text-slate-900 leading-[1.1] tracking-normal font-playfair italic">
                        "{t('about.education.quote')}"
                    </h3>
                    <div className="space-y-4">
                        <p className="text-slate-500 leading-relaxed font-medium">
                            {t('about.education.body')}
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
