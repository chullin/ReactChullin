'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, MapPinned } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

const experiences = [
  {
    featured: true
  },
  {
    featured: false
  }
];

export default function AboutTimeline() {
  const { t, tArray } = useI18n();
  const experienceCopy = tArray<{
    company: string;
    role: string;
    period: string;
    desc: string;
    achievements: string[];
  }>('about.timeline.experiences');

  return (
    <section className="py-12 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-rose-700">{t('about.timeline.eyebrow')}</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{t('about.timeline.title')}</h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-relaxed text-slate-500">
            {t('about.timeline.subtitle')}
          </p>
        </div>

        <div className="relative space-y-5">
          <div className="absolute left-5 top-5 bottom-5 hidden w-px bg-slate-200 md:block" />

          {experiences.map((exp, i) => {
            const copy = experienceCopy[i];

            return (
            <motion.article
              key={copy.company}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg md:ml-14 ${
                exp.featured ? 'border-orange-100' : 'border-white/70'
              }`}
            >
              <div className={`absolute -left-[45px] top-7 hidden h-10 w-10 items-center justify-center rounded-xl border-4 border-[#F8FAFC] md:flex ${
                exp.featured ? 'bg-orange-600 text-white shadow-[0_0_18px_rgba(194,65,12,0.28)]' : 'bg-slate-200 text-slate-500'
              }`}>
                {exp.featured ? <MapPinned size={18} /> : <Building2 size={18} />}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{copy.period}</span>
                  <h3 className="mt-2 text-2xl font-black leading-tight text-slate-900">{copy.role}</h3>
                  <p className="mt-2 text-sm font-bold text-slate-500">{copy.company}</p>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">{copy.desc}</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {copy.achievements.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <ArrowRight size={14} className="mt-1 shrink-0 text-orange-700" />
                      <span className="text-sm font-medium leading-relaxed text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
