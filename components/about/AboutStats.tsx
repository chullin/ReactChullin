'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Global Scale', value: '3+', sub: 'Technical Transfers' },
  { label: 'Deployment', value: '100%', sub: 'Air-gap Security' },
  { label: 'AI Solutions', value: '5+', sub: 'Production Systems' },
  { label: 'Academic', value: 'M.Sc.', sub: 'CS Research @CCU' },
];

export default function AboutStats() {
  return (
    <section className="py-1 px-6 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, backgroundColor: "#F8FAFC", borderColor: "#E2E8F0" }}
            className="bg-white border border-slate-100 shadow-md p-6 rounded-3xl text-center group transition-all"
          >
            <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <h3 className="text-3xl font-black text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">
              {stat.value}
            </h3>
            <p className="text-xs text-slate-400 font-bold">
              {stat.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
