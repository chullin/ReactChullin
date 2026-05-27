'use client';

import Link from 'next/link';
import { Terminal, Briefcase, GraduationCap, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function HomeAbout() {
    const { t } = useI18n();

    return (
        <section className="bg-white py-24 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div>
                    <h2 className="text-4xl font-black mb-8 tracking-tight text-slate-900">
                        {t('homeAbout.titlePrefix')} <span className="text-gradient">{t('homeAbout.titleName')}</span>
                    </h2>

                    <p className="text-xl text-slate-500 mb-12 font-medium leading-relaxed">
                        {t('homeAbout.subtitle')}
                    </p>

                    <div className="bg-[#fafafa] border border-slate-100 shadow-sm mb-12 overflow-visible rounded-2xl">
                        <div className="p-8 md:p-12 text-left leading-relaxed text-slate-600">
                            <div className="space-y-10">
                                <div className="flex items-start gap-6 group">
                                    <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg mt-1 group-hover:scale-110 transition-transform duration-300">
                                        <GraduationCap size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 mb-1.5 text-lg">{t('homeAbout.educationTitle')}</h4>
                                        <p className="text-sm leading-relaxed text-slate-500">
                                            {t('homeAbout.educationBody')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg mt-1 group-hover:scale-110 transition-transform duration-300">
                                        <Briefcase size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 mb-1.5 text-lg">{t('homeAbout.workTitle')}</h4>
                                        <p className="text-sm leading-relaxed text-slate-500">
                                            {t('homeAbout.workBody')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-lg mt-1 group-hover:scale-110 transition-transform duration-300">
                                        <Terminal size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 mb-1.5 text-lg">{t('homeAbout.techTitle')}</h4>
                                        <p className="text-sm leading-relaxed text-slate-500">
                                            {t('homeAbout.techBody')}
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
                            {t('homeAbout.learnMore')}
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 justify-center font-bold border border-slate-200 text-slate-600 px-8 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            <Phone size={18} />
                            <span>{t('homeAbout.contact')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
