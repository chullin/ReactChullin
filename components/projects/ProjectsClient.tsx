'use client';

import { Button, Chip } from '@heroui/react';
import NextImage from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Eye,
  Layers,
  Mic2,
  Navigation,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';

const featuredProjects = [
  {
    image: '/assets/ollama.webp',
    tags: ['Ollama', 'Dify', 'Docker', 'Linux', 'Offline AI'],
    icon: <ShieldCheck size={22} />,
    href: '/blog/ai/ep01-airgapped-intro',
  },
  {
    image: '/assets/Tester.webp',
    tags: ['TMS', 'Python', 'React', 'Automation', 'Traceability'],
    icon: <Database size={22} />,
    href: '/blog/ai/ep09-tms',
  },
  {
    image: '/assets/personal_demo.webp',
    tags: ['OpenCV', 'Python', 'Vision', 'Robotics', 'Testing'],
    icon: <Eye size={22} />,
    href: '/blog/ai/ep10-opencv-robot',
  },
];

const archiveProjects = [
  {
    image: '/assets/Tester.webp',
    tags: ['Python', 'Tkinter', 'Raspberry Pi', 'Hardware Control'],
    icon: <Zap className="text-amber-500" size={22} />,
  },
  {
    image: '/assets/Tranformer.webp',
    tags: ['AI', 'PyTorch', 'C Language', 'Embedded'],
    icon: <Layers className="text-orange-600" size={22} />,
  },
  {
    image: '/assets/VC.webp',
    tags: ['MATLAB', 'Zedboard', 'C Language', 'Signal Processing'],
    icon: <Mic2 className="text-rose-600" size={22} />,
  },
  {
    image: '/assets/VAD_KWS.webp',
    tags: ['Low Power', 'Apollo3 Blue', 'DNN', 'VAD/KWS'],
    icon: <Code2 className="text-emerald-600" size={22} />,
  },
  {
    image: '/assets/LoRa.webp',
    tags: ['LoRa', 'Arduino', 'GPS', 'IoT'],
    icon: <Navigation className="text-red-500" size={22} />,
  },
];

export default function ProjectsClient() {
  const { t, tArray } = useI18n();
  const statsCopy = tArray<{ label: string; value: string }>('projects.stats');
  const featuredCopy = tArray<{
    title: string;
    kicker: string;
    summary: string;
    problem: string;
    role: string;
    outcome: string;
  }>('projects.featuredItems');
  const archiveCopy = tArray<{
    title: string;
    category: string;
    description: string;
  }>('projects.archiveItems');
  const labels = {
    problem: t('projects.labels.problem'),
    role: t('projects.labels.role'),
    outcome: t('projects.labels.outcome'),
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <section className="relative bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_72%)] px-6 pb-20 pt-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            <div className="inline-flex rounded-full border border-orange-100 bg-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-orange-700 shadow-sm backdrop-blur">
              {t('projects.heroEyebrow')}
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-slate-950 md:text-7xl">
                {t('projects.heroTitle')}
              </h1>
              <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
                {t('projects.heroBody')}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                as={Link}
                href="#featured"
                className="h-12 rounded-xl bg-[var(--theme-primary)] px-6 font-bold text-white shadow-lg shadow-orange-700/20"
                endContent={<ArrowRight size={18} />}
              >
                {t('projects.caseStudies')}
              </Button>
              <Button
                as={Link}
                href="/contact"
                variant="bordered"
                className="h-12 rounded-xl border-orange-100 bg-white/60 px-6 font-bold text-orange-700"
              >
                {t('projects.discuss')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="rounded-[2rem] border border-white/80 bg-white/65 p-5 shadow-[0_24px_80px_rgba(194,65,12,0.09)] backdrop-blur"
          >
            <div className="grid gap-3">
              {statsCopy.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-orange-100/70 bg-orange-50/45 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">{stat.label}</p>
                  <p className="mt-2 text-xl font-black text-slate-950">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="featured" className="px-6 py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-700">{t('projects.featuredEyebrow')}</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{t('projects.featuredTitle')}</h2>
            </div>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-500">
              {t('projects.featuredBody')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {featuredProjects.map((project, index) => {
              const copy = featuredCopy[index];

              return (
              <motion.article
                key={copy.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange-100 hover:shadow-[0_28px_80px_rgba(194,65,12,0.1)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="space-y-8 p-8 md:p-10 lg:p-12">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-700 ring-1 ring-orange-100">
                        {project.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-500">{copy.kicker}</p>
                        <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{copy.title}</h3>
                      </div>
                    </div>

                    <p className="max-w-3xl text-lg font-semibold leading-relaxed text-slate-700">{copy.summary}</p>

                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        [labels.problem, copy.problem],
                        [labels.role, copy.role],
                        [labels.outcome, copy.outcome],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">{label}</p>
                          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Chip key={tag} size="sm" variant="flat" color="primary" className="font-bold">
                          {tag}
                        </Chip>
                      ))}
                    </div>

                    <Link
                      href={project.href}
                      className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-orange-700 transition-colors hover:text-orange-900"
                    >
                      {t('projects.labels.read')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-orange-50/45 p-8 lg:p-10">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-100/60 blur-3xl" />
                    <div className="absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-orange-200/45 blur-3xl" />
                    <div className="relative h-full min-h-[260px] w-full max-w-[440px]">
                      <NextImage
                        src={project.image}
                        alt={copy.title}
                        fill
                        sizes="(max-width: 1024px) 90vw, 440px"
                        className="rounded-2xl bg-white object-contain p-5 shadow-2xl ring-1 ring-orange-100/70 transition-transform duration-700 group-hover:scale-[1.025]"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa] px-6 py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-rose-700">{t('projects.archiveEyebrow')}</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{t('projects.archiveTitle')}</h2>
            </div>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-500">
              {t('projects.archiveBody')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {archiveProjects.map((project, index) => {
              const copy = archiveCopy[index];

              return (
              <motion.article
                key={copy.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-xl"
              >
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-orange-50/45">
                  <NextImage
                    src={project.image}
                    alt={copy.title}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 360px"
                    className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                      {project.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{copy.category}</p>
                      <h3 className="mt-1 text-xl font-black leading-tight text-slate-950">{copy.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-500">{copy.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[var(--theme-primary)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.14),transparent_32%)]" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
          <Bot className="mb-6 text-orange-100" size={42} />
          <h2 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            {t('projects.ctaTitle')}
          </h2>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-orange-100">
            {t('projects.ctaBody')}
          </p>
          <Button
            as={Link}
            href="/contact"
            size="lg"
            className="mt-10 rounded-full bg-white px-10 py-7 text-lg font-black text-[var(--theme-primary)] shadow-2xl transition-transform hover:scale-105"
            endContent={<ExternalLink size={22} />}
          >
            {t('projects.ctaButton')}
          </Button>
        </div>
      </section>
    </div>
  );
}
