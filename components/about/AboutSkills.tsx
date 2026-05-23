'use client';

import { motion } from 'framer-motion';
import { Bot, Boxes, Code2, Cpu, LockKeyhole, MonitorCog, Network, Workflow } from 'lucide-react';

const skillGroups = [
  {
    icon: <Bot size={18} />,
    title: "AI Infrastructure",
    desc: "Local LLM services, RAG workflows, and offline deployment patterns.",
    skills: ["Ollama", "Dify", "RAG Workflow", "Model Serving"],
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    icon: <Workflow size={18} />,
    title: "Automation Systems",
    desc: "Python tooling for test flows, manufacturing operations, and repeatable process control.",
    skills: ["Python", "Tkinter", "OpenCV", "Test Tools"],
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: <MonitorCog size={18} />,
    title: "Industrial Software",
    desc: "Production-facing systems where reliability, traceability, and team handoff are essential.",
    skills: ["TMS", "API Design", "System Migration", "Operations"],
    color: "text-violet-600",
    bg: "bg-violet-50"
  },
  {
    icon: <Code2 size={18} />,
    title: "Web & Platform",
    desc: "Modern web interfaces and deployment foundations for internal and external products.",
    skills: ["Next.js", "React", "Docker", "Linux"],
    color: "text-cyan-600",
    bg: "bg-cyan-50"
  }
];

const focusItems = [
  {
    icon: <LockKeyhole size={16} />,
    title: "Secure by default",
    desc: "Designing AI deployment flows for isolated and auditable environments."
  },
  {
    icon: <Cpu size={16} />,
    title: "Production first",
    desc: "Prioritizing maintainability, operator experience, and controlled rollout."
  },
  {
    icon: <Network size={16} />,
    title: "Transferable systems",
    desc: "Turning one-site solutions into repeatable processes for global teams."
  },
  {
    icon: <Boxes size={16} />,
    title: "Practical integration",
    desc: "Connecting models, tools, and existing factory systems without overcomplication."
  }
];

export default function AboutSkills() {
  return (
    <section className="py-14 px-6 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        <div>
          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-600">Technical Stack</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Tools I use to ship reliable systems
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Instead of rating skills by abstract percentages, this stack is organized by the kind of production problems I usually solve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/70 bg-white/65 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:bg-white hover:shadow-lg"
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${group.bg} ${group.color}`}>
                  {group.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900">{group.title}</h3>
                <p className="mt-2 min-h-[60px] text-sm font-medium leading-relaxed text-slate-500">
                  {group.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-28 rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.22)]"
        >
          <div className="mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-400">Current Focus</span>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-white">
              Engineering AI for controlled production environments.
            </h3>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400">
              My strongest work sits between software engineering, AI deployment, and the practical constraints of manufacturing sites.
            </p>
          </div>

          <div className="space-y-3">
            {focusItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="mt-0.5 text-emerald-400">{item.icon}</div>
                <div>
                  <h4 className="text-sm font-black text-white">{item.title}</h4>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
