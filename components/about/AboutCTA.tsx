'use client';

import { motion } from 'framer-motion';
import { Button, Link } from '@heroui/react';
import { Mail, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function AboutCTA() {
  const { t } = useI18n();

  return (
    <section className="py-20 px-6 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[260px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/45 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-700">{t('about.cta.eyebrow')}</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            {t('about.cta.title')}
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            {t('about.cta.body')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as={Link}
              href="mailto:fg6ts15@gmail.com"
              size="lg"
              className="bg-slate-900 text-white font-bold h-14 px-8 rounded-xl hover:scale-105 transition-transform"
              startContent={<Mail size={20} />}
            >
              {t('about.cta.email')}
            </Button>
            
            <Button
              as={Link}
              href="/contact"
              variant="bordered"
              size="lg"
              className="border-slate-200 font-bold h-14 px-8 rounded-xl hover:bg-slate-50 transition-colors"
              endContent={<ArrowRight size={20} />}
            >
              {t('about.cta.contact')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
