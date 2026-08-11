'use client';

import Link from 'next/link';
import { Button, Chip } from '@heroui/react';
import {
  ArrowRight,
  BookOpenText,
  Brain,
  BriefcaseBusiness,
  Calculator,
  CandlestickChart,
  Gamepad2,
  ImageDown,
  LineChart,
  MonitorPlay,
  PlaySquare,
  Puzzle,
  Search,
  Sparkles,
  Star,
  WalletCards,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';

type HubItemCopy = {
  title: string;
  description: string;
  meta: string;
};

type HubSectionCopy = {
  title: string;
  description: string;
  items: HubItemCopy[];
};

const featuredLinks = [
  { href: '/image-compressor', icon: <ImageDown size={20} /> },
  { href: '/market-watch', icon: <LineChart size={20} /> },
  { href: '/blog', icon: <BookOpenText size={20} /> },
  { href: '/projects', icon: <BriefcaseBusiness size={20} /> },
];

const hubSections = [
  {
    tone: 'orange',
    icon: <Sparkles size={24} />,
    items: [
      { href: '/image-compressor', icon: <ImageDown size={18} /> },
      { href: '/memory', icon: <Brain size={18} /> },
      { href: '/demo', icon: <PlaySquare size={18} /> },
      { href: '/video-player', icon: <MonitorPlay size={18} /> },
      { href: '/segmented-video-player', icon: <MonitorPlay size={18} /> },
    ],
  },
  {
    tone: 'emerald',
    icon: <CandlestickChart size={24} />,
    items: [
      { href: '/market-watch', icon: <LineChart size={18} /> },
      { href: '/stock-health', icon: <CandlestickChart size={18} /> },
      { href: '/tool/stock/stock-watchlist', icon: <Star size={18} /> },
      { href: '/trading-cost', icon: <Calculator size={18} /> },
    ],
  },
  {
    tone: 'rose',
    icon: <Gamepad2 size={24} />,
    items: [
      { href: '/snake', icon: <Gamepad2 size={18} /> },
      { href: '/tetris-battle', icon: <Puzzle size={18} /> },
      { href: '/vocab-quiz', icon: <Brain size={18} /> },
      { href: '/flashcards', icon: <WalletCards size={18} /> },
    ],
  },
  {
    tone: 'sky',
    icon: <BookOpenText size={24} />,
    items: [
      { href: '/blog', icon: <BookOpenText size={18} /> },
      { href: '/projects', icon: <BriefcaseBusiness size={18} /> },
      { href: '/about', icon: <Search size={18} /> },
      { href: '/contact', icon: <ArrowRight size={18} /> },
    ],
  },
];

const toneClasses = {
  orange: {
    icon: 'bg-orange-50 text-orange-700 ring-orange-100',
    chip: 'bg-orange-50 text-orange-700',
    hover: 'group-hover:border-orange-200 group-hover:bg-orange-50/50',
  },
  emerald: {
    icon: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    chip: 'bg-emerald-50 text-emerald-700',
    hover: 'group-hover:border-emerald-200 group-hover:bg-emerald-50/50',
  },
  rose: {
    icon: 'bg-rose-50 text-rose-700 ring-rose-100',
    chip: 'bg-rose-50 text-rose-700',
    hover: 'group-hover:border-rose-200 group-hover:bg-rose-50/50',
  },
  sky: {
    icon: 'bg-sky-50 text-sky-700 ring-sky-100',
    chip: 'bg-sky-50 text-sky-700',
    hover: 'group-hover:border-sky-200 group-hover:bg-sky-50/50',
  },
} as const;

export default function HubClient() {
  const { t, tArray } = useI18n();
  const featuredCopy = tArray<HubItemCopy>('hub.featured');
  const sectionCopy = tArray<HubSectionCopy>('hub.sections');

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_72%)] px-6 pb-16 pt-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <Chip className="bg-white font-black uppercase tracking-[0.22em] text-slate-500 shadow-sm" variant="flat">
              {t('hub.eyebrow')}
            </Chip>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-slate-950 md:text-7xl">
                {t('hub.title')}
              </h1>
              <p className="max-w-2xl text-lg font-semibold leading-relaxed text-slate-500">
                {t('hub.subtitle')}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                as={Link}
                href="#sections"
                className="h-12 rounded-xl bg-slate-950 px-6 font-bold text-white shadow-lg shadow-slate-900/15"
                endContent={<ArrowRight size={18} />}
              >
                {t('hub.browse')}
              </Button>
              <Button
                as={Link}
                href="/blog"
                variant="bordered"
                className="h-12 rounded-xl border-slate-200 bg-white px-6 font-bold text-slate-700"
              >
                {t('hub.readLatest')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {featuredLinks.map((link, index) => {
              const copy = featuredCopy[index];

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-700/10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-700 ring-1 ring-orange-100">
                      {link.icon}
                    </div>
                    <ArrowRight size={18} className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-orange-600" />
                  </div>
                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{copy?.meta}</p>
                  <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">{copy?.title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">{copy?.description}</p>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="sections" className="px-6 py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">{t('hub.sectionsEyebrow')}</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{t('hub.sectionsTitle')}</h2>
            </div>
            <p className="max-w-xl text-sm font-semibold leading-relaxed text-slate-500">{t('hub.sectionsBody')}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {hubSections.map((section, sectionIndex) => {
              const copy = sectionCopy[sectionIndex];
              const tone = toneClasses[section.tone as keyof typeof toneClasses];

              return (
                <motion.section
                  key={copy?.title ?? sectionIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: sectionIndex * 0.06 }}
                  className="rounded-[1.75rem] border border-slate-100 bg-slate-50/55 p-5"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${tone.icon}`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight text-slate-950">{copy?.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">{copy?.description}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {section.items.map((item, itemIndex) => {
                      const itemCopy = copy?.items[itemIndex];

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`group rounded-2xl border border-white bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${tone.hover}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone.chip}`}>
                              {item.icon}
                            </div>
                            <ArrowRight size={16} className="mt-2 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-slate-700" />
                          </div>
                          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{itemCopy?.meta}</p>
                          <h4 className="mt-1 text-lg font-black tracking-tight text-slate-900">{itemCopy?.title}</h4>
                          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">{itemCopy?.description}</p>
                        </Link>
                      );
                    })}
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
