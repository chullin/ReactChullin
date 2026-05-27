'use client';

import { ExternalLink, Eye, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nProvider';

const projects = [
  {
    icon: <ShieldCheck className="text-emerald-500" />,
    tags: ["Ollama", "Dify", "Docker", "Linux"],
    href: "/blog/ai/ep01-airgapped-intro",
  },
  {
    icon: <Database className="text-orange-600" />,
    tags: ["FastAPI", "PostgreSQL", "React", "Python"],
    href: "/blog/ai/ep09-tms",
  },
  {
    icon: <Eye className="text-purple-500" />,
    tags: ["OpenCV", "Python", "Automation", "Computer Vision"],
    href: "/blog/ai/ep10-opencv-robot",
  }
];

export default function HomeProjects() {
  const { t, tArray } = useI18n();
  const translatedProjects = tArray<{ title: string; category: string; description: string }>('homeProjects.items');

  return (
    <section className="py-32 bg-[#fafafa] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
              {t('homeProjects.titlePrefix')} <span className="text-gradient underline decoration-orange-500/10 decoration-8 underline-offset-8">{t('homeProjects.titleAccent')}</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              {t('homeProjects.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const translated = translatedProjects[index];

            return (
            <div key={translated.title}>
              <Link href={project.href} className="block h-full group/card relative">
                <div className="relative h-full border border-slate-200 shadow-sm group-hover/card:shadow-2xl group-hover/card:shadow-orange-700/10 group-hover/card:-translate-y-3 transition-all duration-500 bg-white cursor-pointer overflow-hidden rounded-2xl flex flex-col justify-between">
                  <div className="flex flex-col items-start gap-4 px-8 pt-10 pb-0">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover/card:bg-orange-50 group-hover/card:border-orange-100 transition-colors duration-300">
                      {project.icon}
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{translated.category}</p>
                        <ArrowRight
                          size={18}
                          className="text-slate-300 group-hover/card:text-orange-600 group-hover/card:translate-x-1 transition-all duration-300"
                        />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight mt-2 group-hover/card:text-orange-700 transition-colors duration-300">{translated.title}</h3>
                    </div>
                  </div>
                  <div className="px-8 py-8 flex flex-col justify-between h-full">
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                      {translated.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center bg-slate-100 text-slate-500 font-bold text-[10px] px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Subtle Accent Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 origin-bottom scale-y-0 bg-gradient-to-r from-orange-600 to-rose-700 group-hover/card:scale-y-100 transition-transform duration-300" />
                </div>
              </Link>
            </div>
            );
          })}
        </div>
        
        <div className="text-center mt-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-bold text-slate-400 hover:text-slate-900 group transition-all text-lg"
          >
            <span>{t('homeProjects.viewMore')}</span>
            <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
