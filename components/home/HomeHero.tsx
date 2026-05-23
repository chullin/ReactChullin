import Link from 'next/link';
import NextImage from 'next/image';
import { Code2, Cpu, ArrowRight, BookOpen } from 'lucide-react';
import personalPortrait from '@/src/images/personalQ.png';

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Static Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
        <div 
          className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[120px]" 
        />
        <div 
          className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div>
            <div className="mb-6 inline-flex h-6 items-center rounded-full bg-blue-50 px-3 text-[10px] font-bold uppercase tracking-widest text-blue-600">
              Software Engineer @ Foxconn
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black mb-4 leading-[1.1] tracking-tight">
            陳憲億 <span className="text-gradient">Joseph Chen</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 mb-10 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
            專注於將 AI、自動化與軟體系統落地到製造現場，包含離線 LLM 部署、測試管理平台與 OpenCV 視覺自動化。<br className="hidden md:block" />
            <span className="text-slate-400 text-base lg:text-lg block mt-3 font-normal">
              I build secure AI and automation systems for manufacturing environments, from air-gapped LLM deployment to vision-based testing workflows.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
            <Link
              href="/about"
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#006FEE] px-8 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-500/40 sm:w-auto"
            >
              View About / CV
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-blue-50 px-8 text-base font-bold text-blue-600 transition-colors hover:bg-blue-100 sm:w-auto"
            >
              <BookOpen size={18} />
              Read Blog
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-14 w-full items-center justify-center rounded-xl border border-slate-200 px-8 text-base font-bold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
            >
              Projects
            </Link>
          </div>
        </div>

        {/* Profile Visual with Refined Animations */}
        <div className="flex justify-center relative pt-10 lg:pt-0">
          <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] group flex items-center justify-center">
            {/* Outer Ring (Static Glow) */}
            <div
              className="absolute inset-0 w-full h-full bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-20 pointer-events-none"
            />
            
            {/* Inner Ring (Static Glow) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-[calc(100%-16px)] h-[calc(100%-16px)] bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full blur-xl opacity-35" />
            </div>

            {/* Profile Image Wrapper */}
            <div className="relative w-[calc(100%-24px)] h-[calc(100%-24px)] bg-white rounded-full p-2 shadow-2xl ring-4 ring-blue-100/50 overflow-hidden z-10">
              <NextImage
                src={personalPortrait}
                alt="Joseph Chen Profile"
                fill
                sizes="(max-width: 768px) 260px, 340px"
                className="object-cover rounded-full hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Floating Cards with Entry */}
            <div className="absolute -top-6 -right-8 z-20 hidden sm:block">
              <div className="rounded-2xl bg-white/95 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
                <div className="flex flex-row items-center gap-3 p-4">
                  <div className="bg-blue-500 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-900 leading-none">AI Integration</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1.5">Specialist</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-8 z-20 hidden sm:block">
              <div className="rounded-2xl bg-white/95 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
                <div className="flex flex-row items-center gap-3 p-4">
                  <div className="bg-slate-900 text-white p-2.5 rounded-2xl shadow-lg">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-900 leading-none">Automation</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1.5">Smart Systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
