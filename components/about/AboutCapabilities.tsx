'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Globe, Settings, Database, Terminal } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

const capabilities = [
  {
    icon: <ShieldCheck size={24} />,
    tags: ["Ollama", "Dify", "Air-gapped"],
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "hover:border-emerald-200"
  },
  {
    icon: <Globe size={24} />,
    tags: ["Migration", "Training", "Scale"],
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "hover:border-rose-200"
  },
  {
    icon: <Cpu size={24} />,
    tags: ["Python", "OpenCV", "Robotics"],
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "hover:border-orange-200"
  }
];

export default function AboutCapabilities() {
  const { t, tArray } = useI18n();
  const capabilityCopy = tArray<{ title: string; desc: string; note: string }>('about.capabilities.cards');
  const techCopy = tArray<{ title: string; desc: string }>('about.capabilities.tech');

  return (
    <section className="pt-16 pb-10 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-10 h-1 bg-slate-900 rounded-full mb-3"
          />
          <span className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-orange-700">{t('about.capabilities.eyebrow')}</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('about.capabilities.title')}</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-500 font-medium leading-relaxed">
            {t('about.capabilities.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => {
            const copy = capabilityCopy[i];

            return (
            <motion.div
              key={copy.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative flex min-h-[290px] flex-col justify-between gap-8 rounded-2xl border border-white/70 bg-white/65 p-6 shadow-sm backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-xl ${cap.border}`}
            >
              <div className="space-y-5">
                <div className={`w-12 h-12 shrink-0 rounded-xl ${cap.bg} ${cap.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
                  {cap.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-black leading-tight text-slate-900">{copy.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-500">
                    {copy.desc}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="border-t border-slate-100 pt-4 text-xs font-bold leading-relaxed text-slate-400">
                  {copy.note}
                </p>
              </div>
            </motion.div>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 md:grid-cols-3">
          {[
            { icon: <Settings size={16} /> },
            { icon: <Database size={16} /> },
            { icon: <Terminal size={16} /> }
          ].map((tech, i) => {
            const copy = techCopy[i];

            return (
            <motion.div
              key={copy.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="flex items-center gap-3 rounded-xl bg-white/40 px-4 py-3"
            >
              <div className="text-slate-300">{tech.icon}</div>
              <div>
                <h4 className="mb-1 text-[10px] font-black uppercase leading-none tracking-widest text-slate-900">{copy.title}</h4>
                <p className="text-[11px] font-bold leading-none text-slate-400">{copy.desc}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
