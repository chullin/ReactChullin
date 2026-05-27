'use client';

import { motion } from 'framer-motion';
import { Bot, Boxes, Code2, Cpu, LockKeyhole, MonitorCog, Network, Workflow } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

const skillGroups = [
  {
    icon: <Bot size={18} />,
    skills: ["Ollama", "Dify", "RAG Workflow", "Model Serving"],
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    icon: <Workflow size={18} />,
    skills: ["Python", "Tkinter", "OpenCV", "Test Tools"],
    color: "text-orange-700",
    bg: "bg-orange-50"
  },
  {
    icon: <MonitorCog size={18} />,
    skills: ["TMS", "API Design", "System Migration", "Operations"],
    color: "text-rose-700",
    bg: "bg-rose-50"
  },
  {
    icon: <Code2 size={18} />,
    skills: ["Next.js", "React", "Docker", "Linux"],
    color: "text-amber-700",
    bg: "bg-amber-50"
  }
];

const focusItems = [
  {
    icon: <LockKeyhole size={16} />,
  },
  {
    icon: <Cpu size={16} />,
  },
  {
    icon: <Network size={16} />,
  },
  {
    icon: <Boxes size={16} />,
  }
];

export default function AboutSkills() {
  const { t, tArray } = useI18n();
  const groupCopy = tArray<{ title: string; desc: string }>('about.skills.groups');
  const focusCopy = tArray<{ title: string; desc: string }>('about.skills.focusItems');

  return (
    <section className="py-14 px-6 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        <div>
          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-700">{t('about.skills.eyebrow')}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
              {t('about.skills.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              {t('about.skills.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillGroups.map((group, i) => {
              const copy = groupCopy[i];

              return (
              <motion.div
                key={copy.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/70 bg-white/65 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:bg-white hover:shadow-lg"
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${group.bg} ${group.color}`}>
                  {group.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900">{copy.title}</h3>
                <p className="mt-2 min-h-[60px] text-sm font-medium leading-relaxed text-slate-500">
                  {copy.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-28 rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.22)]"
        >
          <div className="mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-400">{t('about.skills.focusEyebrow')}</span>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-white">
              {t('about.skills.focusTitle')}
            </h3>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400">
              {t('about.skills.focusBody')}
            </p>
          </div>

          <div className="space-y-3">
            {focusItems.map((item, i) => {
              const copy = focusCopy[i];

              return (
              <motion.div
                key={copy.title}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="mt-0.5 text-emerald-400">{item.icon}</div>
                <div>
                  <h4 className="text-sm font-black text-white">{copy.title}</h4>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-400">{copy.desc}</p>
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
