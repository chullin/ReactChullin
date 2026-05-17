'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

const experiences = [
  {
    company: "Foxconn (鴻海精密)",
    role: "Software Engineer / AI Application",
    period: "2024 - Present",
    desc: "Spearheading AI application integration and intelligent manufacturing development at industrial scale.",
    achievements: [
      "Optimized internal Test Management Systems (TMS) for global efficiency.",
      "Architected offline AI deployment for high-security, air-gapped zones.",
      "Lead technical consultant for Bangalore team establishment.",
      "Engineered high-precision OpenCV robotic vision alignment."
    ],
    color: "from-blue-600 to-cyan-500"
  },
  {
    company: "Sound Control Technology",
    role: "Software Engineer",
    period: "2023 - 2024",
    desc: "Developed full-stack smart control solutions and system integration platforms.",
    achievements: [
      "Built cross-platform smart device management systems.",
      "Optimized legacy API performance for better scalability."
    ],
    color: "from-slate-400 to-slate-200"
  }
];

export default function AboutTimeline() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="py-8 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center text-white">
              <ArrowRight size={20} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Professional Roadmap</h2>
        </div>

        <div className="relative pl-8 space-y-8">
          {/* Vertical Line - Subtler */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-200" />

          {experiences.map((exp, i) => (
            <div key={i} className="relative">
              {/* Dot - Minimal */}
              <div className={`absolute -left-[35.5px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white z-20 ${i === 0 ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-slate-300'}`} />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`bg-white border border-slate-100/80 shadow-sm rounded-[2rem] overflow-hidden transition-all duration-500 ${expanded === i ? 'shadow-xl border-slate-200' : 'hover:border-slate-200 hover:shadow-md'}`}
              >
                <div 
                  className="p-8 cursor-pointer flex justify-between items-center"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{exp.period}</span>
                    <h3 className="text-xl font-black text-slate-900">{exp.role}</h3>
                    <p className="text-md font-bold text-slate-500">{exp.company}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expanded === i ? 180 : 0 }}
                    className={`p-2 rounded-full transition-colors ${expanded === i ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="px-8 pb-8"
                    >
                      <div className="pt-6 border-t border-slate-50 space-y-6">
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">{exp.desc}</p>
                        <div className="grid grid-cols-1 gap-3">
                          {exp.achievements.map((item, ai) => (
                            <div key={ai} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group transition-all">
                              <ArrowRight size={14} className="mt-1 shrink-0 text-cyan-600 group-hover:translate-x-1 transition-transform" />
                              <span className="text-sm text-slate-600 font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
