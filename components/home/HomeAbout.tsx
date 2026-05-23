import Link from 'next/link';
import { Terminal, Briefcase, GraduationCap, Phone } from 'lucide-react';

export default function HomeAbout() {
    return (
        <section className="bg-white py-24 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div>
                    <h2 className="text-4xl font-black mb-8 tracking-tight text-slate-900">
                        關於 <span className="text-gradient">陳憲億 Joseph Chen</span>
                    </h2>

                    <p className="text-xl text-slate-500 mb-12 font-medium leading-relaxed">
                        AI Application & Automation Engineer specializing in intelligent systems and smart manufacturing solutions.
                    </p>

                    <div className="bg-[#fafafa] border border-slate-100 shadow-sm mb-12 overflow-visible rounded-2xl">
                        <div className="p-8 md:p-12 text-left leading-relaxed text-slate-600">
                            <div className="space-y-10">
                                <div className="flex items-start gap-6 group">
                                    <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg mt-1 group-hover:scale-110 transition-transform duration-300">
                                        <GraduationCap size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 mb-1.5 text-lg">學歷背景</h4>
                                        <p className="text-sm leading-relaxed text-slate-500">
                                            <strong className="text-slate-700">國立中正大學資訊工程研究所碩士</strong>。研究方向涵蓋 Transformer-based TTS 與嵌入式系統實作，致力於將先進 AI 技術導入實際硬體環境。
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg mt-1 group-hover:scale-110 transition-transform duration-300">
                                        <Briefcase size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 mb-1.5 text-lg">工作經驗</h4>
                                        <p className="text-sm leading-relaxed text-slate-500">
                                            現任職於 <strong className="text-slate-700">Foxconn (鴻海精密)</strong>，負責開發測試管理系統 (TMS)、視覺導引機械手臂系統，以及 <strong className="text-slate-700">離線式 AI 平台 (Offline AI)</strong> 的部署。
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg mt-1 group-hover:scale-110 transition-transform duration-300">
                                        <Terminal size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 mb-1.5 text-lg">核心技術</h4>
                                        <p className="text-sm leading-relaxed text-slate-500">
                                            熟悉 <strong className="text-slate-700">Python 自動化開發</strong> 與 <strong className="text-slate-700">OpenCV 機械視覺</strong>。擅長使用 Docker、Linux、Ollama 與 Dify 建構邊緣運算與智慧代理方案。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center font-bold px-8 py-3 bg-[var(--theme-primary)] text-white rounded-xl hover:bg-[var(--theme-primary-hover)] transition-colors shadow-lg shadow-orange-700/20"
                        >
                            了解更多
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 justify-center font-bold border border-slate-200 text-slate-600 px-8 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            <Phone size={18} />
                            <span>與我聯繫</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
