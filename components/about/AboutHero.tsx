'use client';

import { motion } from 'framer-motion';
import { Link, Button } from '@heroui/react';
import NextImage from 'next/image';
import { Mail, Download } from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function AboutHero() {
  return (
    <section className="relative pt-10 pb-0 px-6 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="identity-card max-w-2xl w-full rounded-[3rem] p-8 md:p-10 relative overflow-hidden group"
      >
        {/* Subtle inner layers for glass depth */}
        <div className="absolute inset-0 bg-white/20 pointer-events-none" />
        
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Availability Badge */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-[0.15em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Identity Verified & Active
            </div>
          </div>

          {/* Avatar Section */}
          <div className="relative mb-6 group/avatar cursor-default">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-[2.5rem] overflow-hidden border border-white shadow-xl relative z-10 bg-white p-1.5">
              <NextImage 
                src="/assets/profile3.webp" 
                alt="Joseph Chen" 
                fill
                sizes="(max-width: 768px) 112px, 128px"
                className="object-cover rounded-[2.2rem]" 
                priority
              />
            </div>
            
            {/* Outer Ring 1 - Slower */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-5 border border-dashed border-cyan-400/20 rounded-[3.5rem] pointer-events-none opacity-40 group-hover/avatar:opacity-80 transition-opacity"
            />
            
            {/* Inner Ring 2 - Opposite direction */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 border border-dashed border-blue-400/30 rounded-[3rem] pointer-events-none opacity-50 group-hover/avatar:opacity-100 transition-opacity"
              style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.2))' }}
            />
          </div>

          {/* Identity Info */}
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Joseph Chen <span className="text-slate-400 font-light">/</span> 陳憲億
            </h1>
            <p className="text-md md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 leading-none">
              AI Application & Automation Engineer
            </p>
            <p className="text-xs text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
              Specialized in Intelligent Manufacturing Infrastructure & <br className="hidden sm:block" />
              Scalable Automation Systems for Global Industrial Scale.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="https://drive.usercontent.google.com/download?id=1Y7-ZQm6389M_FmAKiWLb_vMu2TzWLVwB&export=download" isExternal target="_blank">
              <Button
                className="h-12 px-7 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-800 transition-all group"
                startContent={<Download size={18} className="group-hover:translate-y-0.5 transition-transform" />}
              >
                Resume PDF
              </Button>
            </Link>
            <div className="flex gap-2">
              {[
                { icon: <GithubIcon />, href: "https://github.com/chullin", label: "GitHub" },
                { icon: <LinkedinIcon />, href: "https://www.linkedin.com/in/%E6%86%B2%E5%84%84-%E9%99%B3-724511223/?locale=en", label: "LinkedIn" },
                { icon: <Mail size={18} />, href: "mailto:fg6ts15@gmail.com", label: "Email" }
              ].map((social, i) => (
                <Link key={i} href={social.href} isExternal target="_blank" className="p-0">
                  <Button
                    isIconOnly
                    className="w-12 h-12 bg-white border border-slate-100 text-slate-600 rounded-2xl shadow-sm hover:border-slate-300 hover:text-slate-900 transition-all"
                  >
                    {social.icon}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
