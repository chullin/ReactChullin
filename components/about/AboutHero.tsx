'use client';

import { motion } from 'framer-motion';
import { Link, Button } from '@heroui/react';
import NextImage from 'next/image';
import { Download, Mail } from 'lucide-react';
import aboutPortrait from '@/src/images/about.png';

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

const skills = ["AI Infrastructure", "Automation", "Industrial Software"];

export default function AboutHero() {
  return (
    <section className="relative flex justify-center px-6 pb-8 pt-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.012 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="identity-card group relative w-full max-w-5xl overflow-hidden rounded-[2rem] p-3 transition-[border-color,box-shadow,transform] duration-700 md:rounded-[2.35rem] md:p-4"
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
        <div className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-orange-100/55 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
        <div className="pointer-events-none absolute -bottom-36 left-1/2 h-72 w-[34rem] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.76),transparent_42%)] opacity-80" />

        <div className="relative z-10 grid grid-cols-1 gap-3 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex min-h-[340px] items-center justify-center overflow-visible md:min-h-[360px] lg:min-h-[520px]">
            <div className="pointer-events-none absolute left-[6%] top-[8%] h-5 w-5 rounded-full bg-orange-200/55 blur-[1px]" />
            <div className="pointer-events-none absolute right-[9%] top-[18%] h-3 w-3 rounded-full bg-slate-300/35 blur-[0.5px]" />
            <div className="pointer-events-none absolute bottom-[16%] left-[14%] h-4 w-4 rounded-full bg-rose-200/45 blur-[1px]" />
            <div className="pointer-events-none absolute bottom-[10%] right-[16%] h-2.5 w-2.5 rounded-full bg-orange-300/55" />
            <div className="pointer-events-none absolute left-[3%] top-[44%] h-2 w-2 rounded-full bg-slate-300/35" />
            <div className="pointer-events-none absolute right-[5%] top-[53%] h-6 w-6 rounded-full bg-white/45 blur-md" />

            <div className="watercolor-blob-mask absolute inset-[3%] bg-orange-200/35 blur-2xl" />
            <div className="watercolor-blob-mask absolute inset-[7%] bg-slate-300/20 blur-xl" />
            <div className="watercolor-blob-mask relative h-[88%] min-h-[300px] w-[92%] overflow-hidden bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] md:min-h-[330px] lg:min-h-[470px]">
              <NextImage
                src={aboutPortrait}
                alt="Joseph Chen portrait"
                fill
                sizes="(max-width: 767px) 92vw, (max-width: 1024px) 42vw, 430px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/18" />
              <div className="watercolor-paper-texture pointer-events-none absolute inset-0 opacity-70" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_18%,rgba(255,255,255,0.32),transparent_34%),radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.16),transparent_38%)]" />
            </div>

            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-md md:left-7 md:top-7">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-600 shadow-[0_0_12px_rgba(194,65,12,0.35)]" />
              Digital Identity
            </div>
          </div>

          <div className="flex flex-col justify-center px-5 py-9 text-left md:px-7 md:py-9 lg:px-11 lg:py-12">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] lg:mb-7">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-600 shadow-[0_0_12px_rgba(194,65,12,0.35)]" />
              Premium Profile
            </div>

            <div className="mb-6 space-y-3 lg:mb-7 lg:space-y-4">
              <h1 className="max-w-xl text-[2.6rem] font-bold leading-[0.98] tracking-tight text-slate-950 md:text-[3rem] lg:text-6xl">
                Joseph Chen <span className="font-light text-slate-400">/</span> 陳憲億
              </h1>
              <p className="text-sm font-medium tracking-[0.02em] text-orange-700 md:text-base">
                AI Application & Automation Engineer
              </p>
              <p className="max-w-lg text-sm font-normal leading-7 text-slate-500 lg:text-[15px]">
                Building secure AI infrastructure and automation systems for real-world manufacturing environments.
              </p>
            </div>

            <div className="mb-7 flex flex-wrap gap-2 lg:mb-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/70 bg-white/45 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="https://drive.usercontent.google.com/download?id=1Y7-ZQm6389M_FmAKiWLb_vMu2TzWLVwB&export=download" isExternal target="_blank">
                <Button
                  className="h-12 rounded-full bg-slate-950 px-7 font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition-all duration-500 hover:bg-slate-800"
                  startContent={<Download size={17} />}
                >
                  Resume PDF
                </Button>
              </Link>
              <div className="flex gap-2">
                {[
                  { icon: <GithubIcon size={18} />, href: "https://github.com/chullin", label: "GitHub" },
                  { icon: <LinkedinIcon size={18} />, href: "https://www.linkedin.com/in/%E6%86%B2%E5%84%84-%E9%99%B3-724511223/?locale=en", label: "LinkedIn" },
                  { icon: <Mail size={17} />, href: "mailto:fg6ts15@gmail.com", label: "Email" }
                ].map((social, i) => (
                  <Link key={i} href={social.href} isExternal target="_blank" aria-label={social.label} className="p-0">
                    <Button
                      isIconOnly
                      aria-label={social.label}
                      className="h-12 w-12 rounded-full border border-white/70 bg-white/55 text-slate-500 shadow-[0_8px_20px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-500 hover:border-white hover:bg-white hover:text-slate-950"
                    >
                      {social.icon}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
