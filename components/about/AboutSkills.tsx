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
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Capability Indication */}
        <div>
          <div className="flex items-center gap-4 mb-12">
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
                    <div key={si} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-slate-900 font-bold tracking-tight">{skill.name}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">{skill.status}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (si * 0.1) }}
                          className={`h-full ${cat.color} opacity-80`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Block - Refined dark theme */}
        <div className="lg:sticky lg:top-32">
          <div className="w-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-slate-900/95 backdrop-blur-md px-6 py-4 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>
              <div className="mx-auto text-[9px] font-mono text-slate-500 font-black tracking-widest uppercase">
                session — joseph.bash
              </div>
            </div>
            {/* Terminal Content */}
            <div className="bg-[#08080e] p-8 md:p-12 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300">
              <div className="flex gap-3 mb-6">
                <span className="text-emerald-500 font-bold">$</span>
                <span className="text-slate-100 italic">finger joseph</span>
              </div>
              <div className="space-y-1 opacity-90">
                <p><span className="text-slate-500">Login:</span> joseph</p>
                <p><span className="text-slate-500">Name:</span> Joseph Chen</p>
                <p><span className="text-slate-500">Role:</span> Software Engineer / AI Infra</p>
                <p><span className="text-slate-500">Location:</span> Taipei, Taiwan</p>
                <p><span className="text-slate-500">Status:</span> Engineering intelligent automation</p>
              </div>
              
              <div className="mt-8 flex gap-3">
                <span className="text-emerald-500 font-bold">$</span>
                <span className="text-slate-100">cat philosophy.txt</span>
              </div>
              <p className="mt-2 text-slate-400 italic leading-relaxed">
                "Bridging AI research and industrial implementation through robust, secure infrastructure."
              </p>
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
