'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Globe, Settings, Database, Terminal, ArrowRight } from 'lucide-react';

const capabilities = [
  {
    icon: <ShieldCheck size={24} />,
    title: "AI Infrastructure & Secure Deployment",
    desc: "Deploying production LLM systems (Ollama/Dify) in strictly air-gapped, high-security industrial zones.",
    tag: "Security Focus",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    icon: <Globe size={24} />,
    title: "Global Tech Transfer & Migration",
    desc: "Leading large-scale software system migration and technical team establishment in Bangalore, India.",
    tag: "Scalability",
    color: "text-violet-600",
    bg: "bg-violet-50"
  },
  {
    icon: <Cpu size={24} />,
    title: "Robotic Vision & Industrial Alignment",
    desc: "Developing OpenCV-based high-precision vision systems for automated manufacturing robotic lines.",
    tag: "Precision",
    color: "text-blue-600",
    bg: "bg-blue-50"
  }
];

export default function AboutCapabilities() {
  return (
    <section className="py-8 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-10 h-1 bg-slate-900 rounded-full mb-3" 
            />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Core Competencies</h2>
        </div>

        <div className="space-y-3">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-3xl hover:bg-white transition-all duration-500 border border-transparent hover:border-slate-100 hover:shadow-lg"
            >
              <div className={`w-14 h-14 shrink-0 rounded-2xl ${cap.bg} ${cap.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                {cap.icon}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900">{cap.title}</h3>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                    {cap.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-2xl font-medium">
                  {cap.desc}
                </p>
              </div>

              <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500">
                <ArrowRight size={18} className="text-slate-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Tech Strips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 pt-2 border-t border-slate-100">
            {[
              { icon: <Settings size={16} />, title: "Automation", desc: "Python-driven" },
              { icon: <Database size={16} />, title: "TMS Systems", desc: "Architecture" },
              { icon: <Terminal size={16} />, title: "Linux Systems", desc: "Secure Edge" }
            ].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 px-2">
                <div className="text-slate-300">{tech.icon}</div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 tracking-tight uppercase leading-none mb-1">{tech.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold leading-none">{tech.desc}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
