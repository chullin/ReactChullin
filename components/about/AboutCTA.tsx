'use client';

import { motion } from 'framer-motion';
import { Button, Link } from '@heroui/react';
import { Mail, ArrowRight } from 'lucide-react';

export default function AboutCTA() {
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
          <span className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-700">Let's Connect</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Building secure AI and automation systems for real-world production.
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            I'm open to discussing AI infrastructure, industrial automation, system migration, and practical software problems that need to work beyond the demo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as={Link}
              href="mailto:fg6ts15@gmail.com"
              size="lg"
              className="bg-slate-900 text-white font-bold h-14 px-8 rounded-xl hover:scale-105 transition-transform"
              startContent={<Mail size={20} />}
            >
              Get in Touch
            </Button>
            
            <Button
              as={Link}
              href="/contact"
              variant="bordered"
              size="lg"
              className="border-slate-200 font-bold h-14 px-8 rounded-xl hover:bg-slate-50 transition-colors"
              endContent={<ArrowRight size={20} />}
            >
              View Contact
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
