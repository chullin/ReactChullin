'use client';

import { Card, CardBody, Divider, Chip, Link } from '@heroui/react';
import {
    User,
    Code,
    Briefcase,
    GraduationCap,
    Mail,
    Globe,
    Cpu,
    Settings,
    ShieldCheck,
    ArrowRight,
    Database,
    Terminal,
    Download
} from 'lucide-react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

const GithubIcon = ({ size = 24, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedinIcon = ({ size = 24, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export default function AboutContent() {
    return (
        <div className="min-h-screen bg-[#fafafa] py-20 px-6 text-slate-800">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <header className="mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                                <img src="/assets/profile3.png" alt="Joseph Chen" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-slate-900 text-white p-3 rounded-xl shadow-xl">
                                <Cpu size={20} />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                                <Chip size="sm" variant="flat" className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">Foxconn</Chip>
                                <Chip size="sm" variant="flat" className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">AI Application</Chip>
                                <Chip size="sm" variant="flat" className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">Smart Factory</Chip>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">陳憲億 Joseph Chen</h1>
                            <p className="text-xl text-slate-500 font-medium mb-6">
                                AI Application & Automation Engineer
                            </p>
                            <div className="flex justify-center md:justify-start gap-4">
                                <Link href="https://drive.usercontent.google.com/download?id=1Y7-ZQm6389M_FmAKiWLb_vMu2TzWLVwB&export=download" target="_blank" className="p-2 bg-slate-900 text-white rounded-lg shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2 px-4 group">
                                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                                    <span className="text-sm font-bold">Download PDF</span>
                                </Link>
                                <Link href="https://github.com/chullin" target="_blank" className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-slate-400 transition-all">
                                    <GithubIcon size={20} />
                                </Link>
                                <Link href="https://www.linkedin.com/in/%E6%86%B2%E5%84%84-%E9%99%B3-724511223/?locale=en" target="_blank" className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-slate-400 transition-all">
                                    <LinkedinIcon size={20} />
                                </Link>
                                <Link href="mailto:josephchen.dev@gmail.com" className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-slate-400 transition-all">
                                    <Mail size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Story & Experience */}
                    <div className="lg:col-span-2 space-y-12">

                        <section>
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <Terminal className="text-slate-400" size={24} /> About Me
                            </h3>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                                <p>
                                    目前任職於 <strong>Foxconn (鴻海精密)</strong>，專注於 <strong>AI 應用整合、自動化系統與智慧製造</strong> 相關開發，具備從前端介面到後端邊緣運算系統的完整建置經驗。
                                </p>
                                <p>
                                    擅長處理複雜的工業環境需求，包含 <strong>離線式 AI 部署 (Air-gapped)</strong>、大規模自動化流程優化與機械視覺整合。曾主導印度 Bangalore 廠區的技術移轉專案，並擔任跨國客戶與研發團隊之間的核心技術窗口。
                                </p>
                                <p>
                                    在技術上，我不斷探索 AI 如何真實落地於工業生產，從開發內部的 Test Management Systems (TMS) 到建構基於 Ollama/Dify 的智慧代理系統，目標是將複雜的系統邏輯轉化為極簡且高效的自動化方案。
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                <Briefcase className="text-slate-400" size={24} /> Work Experience
                            </h3>
                            <div className="space-y-8">
                                {/* Foxconn */}
                                <div className="relative pl-8 border-l-2 border-slate-100">
                                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-4 border-white shadow-sm" />
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <h4 className="text-xl font-bold text-slate-900">Software Engineer / AI Application</h4>
                                        <span className="text-sm font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500">2024 - Present</span>
                                    </div>
                                    <p className="text-md font-bold text-slate-700 mb-4">Foxconn (鴻海精密)</p>
                                    <ul className="space-y-2 text-slate-600 text-sm">
                                        <li className="flex items-start gap-2">
                                            <ArrowRight size={14} className="mt-1 shrink-0 text-slate-300" />
                                            <span>Developed and optimized internal <strong>Test Management Systems (TMS)</strong> and large-scale automation tools.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight size={14} className="mt-1 shrink-0 text-slate-300" />
                                            <span>Engineered <strong>offline/local AI deployment solutions</strong> for air-gapped manufacturing environments.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight size={14} className="mt-1 shrink-0 text-slate-300" />
                                            <span>Led technical transfer projects in <strong>Bangalore, India</strong>, serving as the primary technical window for international clients.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ArrowRight size={14} className="mt-1 shrink-0 text-slate-300" />
                                            <span>Integrated <strong>OpenCV-based robotic vision systems</strong> for high-precision manufacturing alignment.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Sound Control */}
                                <div className="relative pl-8 border-l-2 border-slate-100">
                                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-400 border-4 border-white shadow-sm" />
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                        <h4 className="text-xl font-bold text-slate-900">Software Engineer</h4>
                                        <span className="text-sm font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500">2023 - 2024</span>
                                    </div>
                                    <p className="text-md font-bold text-slate-700 mb-4">Sound Control Technology</p>
                                    <p className="text-sm text-slate-600">
                                        Focused on full-stack development and system integration for smart control solutions.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Special Highlight: AI Infrastructure */}
                        <section className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={120} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                                    <ShieldCheck size={28} className="text-emerald-400" /> AI Infrastructure & Deployment
                                </h3>
                                <p className="text-slate-300 mb-6 text-sm leading-relaxed max-w-xl">
                                    Specialized in deploying large language models and intelligent systems in highly restricted, air-gapped environments where external API access is not an option.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        'Offline LLM Deployment',
                                        'Air-gapped AI Setup',
                                        'Ollama / Dify Integration',
                                        'Local AI Inference Optimization'
                                    ].map(item => (
                                        <div key={item} className="flex items-center gap-2 text-xs font-bold text-slate-100 bg-white/10 p-3 rounded-xl border border-white/5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Skills & Education */}
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <Code className="text-slate-400" size={20} /> Tech Stack & Continuous Learning
                            </h3>
                            <div className="space-y-8">
                                
                                {/* Daily Arsenal: Proficient Technologies */}
                                <div>
                                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" /> Daily Arsenal (實戰主力)
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Python', 'Python Automation', 'Docker', 'Linux', 'Ollama', 'Dify', 'PyTorch'].map(skill => (
                                            <Chip key={skill} size="sm" variant="flat" className="bg-slate-200 text-slate-800 font-bold">{skill}</Chip>
                                        ))}
                                    </div>
                                </div>

                                {/* Exploring & Expanding: Conceptually known or learning */}
                                <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Exploring & Expanding (探索與拓展)
                                    </h4>
                                    <p className="text-[10px] text-slate-500 mb-3 font-medium">
                                        Currently building side projects and expanding architectural knowledge in these areas:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['OpenCV', 'FastAPI', 'PostgreSQL', 'Redis', 'React', 'Next.js', 'Framer Motion'].map(skill => (
                                            <Chip key={skill} size="sm" variant="dot" className="border-slate-200 text-slate-600 font-bold">{skill}</Chip>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <Globe className="text-slate-400" size={20} /> International
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    { title: 'Bangalore Tech Transfer', desc: 'Led manufacturing system migration.' },
                                    { title: 'US Client Communication', desc: 'Direct technical requirements handling.' },
                                    { title: 'Regional Coordination', desc: 'Managing multi-region dev syncs.' }
                                ].map(item => (
                                    <li key={item.title} className="group p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 transition-all shadow-sm">
                                        <p className="text-sm font-black text-slate-900 mb-1">{item.title}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                <GraduationCap className="text-slate-400" size={20} /> Education
                            </h3>
                            <div className="space-y-8">
                                <div className="group">
                                    <h4 className="text-sm font-black text-slate-900 group-hover:text-slate-600 transition-colors">碩士 - 資訊工程</h4>
                                    <p className="text-xs text-slate-500 font-medium mt-1">國立中正大學 | 資訊工程研究所</p>
                                    <div className="mt-2 pl-3 border-l border-slate-200">
                                        <Link
                                            isExternal
                                            href="https://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi?o=dnclcdr&s=id=%22111CCU00392004%22.&searchmode=basic"
                                            className="text-[11px] text-slate-400 hover:text-slate-900 font-bold flex items-center gap-1"
                                        >
                                            Thesis: 基於變換器之文字與音轉換研究及其嵌入式實現
                                        </Link>
                                    </div>
                                </div>
                                <div className="group">
                                    <h4 className="text-sm font-black text-slate-900 group-hover:text-slate-600 transition-colors">學士 - 資訊工程</h4>
                                    <p className="text-xs text-slate-500 font-medium mt-1">國立金門大學 | 資訊工程學系</p>
                                    <div className="mt-2 pl-3 border-l border-slate-200">
                                        <Link
                                            isExternal
                                            href="https://www.airitilibrary.com/Article/Detail/P20191126001-201911-201911260014-201911260014-223-226"
                                            className="text-[11px] text-slate-400 hover:text-slate-900 font-bold flex items-center gap-1"
                                        >
                                            Project: 以 LoRa 為基礎之失智老人輔助裝置設計
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <Divider className="my-20 opacity-50" />

                {/* Footer Section: Why build this site */}
                <section className="text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-black mb-6">為什麼建立這個網站？</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        這個網站不只是我的數位名片，也是我記錄 AI 應用、自動化系統與軟體工程實踐的技術知識庫。我希望將複雜的技術概念轉化為更容易理解的內容，並分享自己在智慧製造、AI 整合與系統開發上的實戰經驗。
                    </p>
                    <div className="flex justify-center gap-2">
                        <Chip size="sm" variant="dot" className="border-slate-200 text-slate-500 font-bold">AI Practice</Chip>
                        <Chip size="sm" variant="dot" className="border-slate-200 text-slate-500 font-bold">System Design</Chip>
                        <Chip size="sm" variant="dot" className="border-slate-200 text-slate-500 font-bold">Automation</Chip>
                    </div>
                </section>
            </div>
        </div>
    );
}
