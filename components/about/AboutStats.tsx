'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function AboutStats() {
  const { tArray } = useI18n();
  const stats = tArray<{ label: string; value: string; sub: string }>('about.stats');

  return (
    <section className="px-6 relative z-10">
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -3, backgroundColor: "#FFFFFF", borderColor: "#CBD5E1" }}
            className="bg-white/60 backdrop-blur-md border border-white/70 shadow-sm p-4 md:p-5 rounded-2xl text-center group transition-all"
          >
            <p className="text-[9px] md:text-[10px] font-black text-orange-700 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-1 group-hover:text-orange-700 transition-colors">
              {stat.value}
            </h3>
            <p className="text-[11px] md:text-xs text-slate-400 font-bold leading-snug">
              {stat.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
