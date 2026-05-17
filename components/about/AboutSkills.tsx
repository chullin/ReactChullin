'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "AI & Infrastructure Stack",
    skills: [
      { name: "Ollama / LLM Deployment", level: 82, status: "Primary Stack" },
      { name: "Dify / RAG Workflow", level: 78, status: "Production Ready" },
      { name: "PyTorch / ML Foundation", level: 65, status: "Practical Experience" },
    ],
    color: "bg-emerald-600"
  },
  {
    title: "Core Engineering & Vision",
    skills: [
      { name: "Python Systems", level: 88, status: "Primary Stack" },
      { name: "OpenCV / Vision", level: 75, status: "Practical Application" },
      { name: "Docker / Linux Ops", level: 80, status: "Production Ready" },
    ],
    color: "bg-blue-600"
  }
];

export default function AboutSkills() {
  return (
    <section className="py-12 px-10 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Capability Indication */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm">
              JS
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Technical Exposure
            </h2>
          </div>
          
          <div className="space-y-12">
            {skillCategories.map((cat, i) => (
              <div key={i}>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-8 flex items-center gap-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${cat.color}`} />
                  {cat.title}
                </h4>
                <div className="space-y-8">
                  {cat.skills.map((skill, si) => (
                    <motion.div 
                      key={si} 
                      className="group/skill space-y-3 cursor-default"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="flex justify-between items-end">
                        <span className="text-slate-900 font-bold tracking-tight group-hover/skill:text-blue-600 transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] group-hover/skill:text-slate-600 transition-colors">
                          {skill.status}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (si * 0.1) }}
                          className={`h-full ${cat.color} opacity-80 relative group-hover/skill:opacity-100 transition-opacity`}
                        >
                          {/* Inner Glow on hover */}
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/skill:opacity-100 transition-opacity" />
                        </motion.div>
                        
                        {/* Outer Glow Effect */}
                        <div className={`absolute inset-0 ${cat.color} opacity-0 blur-md group-hover/skill:opacity-20 transition-opacity -z-10`} style={{ width: `${skill.level}%` }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Block - Refined dark theme with line-level interaction */}
        <div className="lg:sticky lg:top-32">
          <div className="w-full rounded-[2.5rem] overflow-hidden border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group/terminal bg-[#08080e]">
            {/* Terminal Header */}
            <div className="bg-slate-900/95 backdrop-blur-md px-6 py-4 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-inner" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner" />
              </div>
              <div className="mx-auto text-[9px] font-mono text-slate-500 font-black tracking-widest uppercase pl-4">
                session — joseph@foxconn
              </div>
            </div>
            {/* Terminal Content */}
            <div className="p-8 md:p-12 font-mono text-sm leading-relaxed overflow-x-auto text-slate-100 relative">
                {/* Subtle emerald glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] pointer-events-none" />
              
              <motion.div 
                whileHover={{ scale: 1.05, x: 5, color: "#10b981" }}
                className="flex gap-3 mb-6 cursor-default transition-all duration-300 origin-left"
              >
                <span className="text-emerald-500 font-bold">$</span>
                <span className="text-white italic">finger joseph</span>
              </motion.div>

              <div className="space-y-1">
                {[
                  { label: "Login", val: "joseph" },
                  { label: "Name", val: "Joseph Chen" },
                  { label: "Role", val: "Software Engineer / AI Infra" },
                  { label: "Location", val: "Kaohsiung, Taiwan" },
                  { label: "Status", val: "Engineering intelligent automation" }
                ].map((line, i) => (
                  <motion.p 
                    key={i}
                    whileHover={{ scale: 1.05, x: 5, color: "#10b981", fontWeight: 800 }}
                    className="cursor-default transition-all duration-300 origin-left"
                  >
                    <span className="text-slate-400 font-bold">{line.label}:</span> {line.val}
                  </motion.p>
                ))}
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05, x: 5, color: "#10b981" }}
                className="mt-10 flex gap-3 cursor-default transition-all duration-300 origin-left"
              >
                <span className="text-emerald-500 font-bold">$</span>
                <span className="text-white">cat philosophy.txt</span>
              </motion.div>

              <motion.p 
                whileHover={{ scale: 1.02, color: "#60a5fa" }}
                className="mt-3 text-slate-300 italic leading-relaxed cursor-default transition-all duration-300"
              >
                "Bridging AI research and industrial implementation through robust, secure infrastructure."
              </motion.p>

              <div className="mt-6 flex gap-3">
                <span className="text-emerald-500 font-bold">$</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
