'use client';

import { Button, Card, CardBody, Link } from '@heroui/react';
import { Terminal, Briefcase, GraduationCap, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeAbout() {
    return (
        <section className="bg-white py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-black mb-8 tracking-tight text-slate-900">
                        關於 <span className="text-gradient">陳憲億 Joseph Chen</span>
                    </h2>

                    <p className="text-xl text-slate-500 mb-12 font-medium">
                        AI Application & Automation Engineer specializing in intelligent systems and smart manufacturing solutions.
                    </p>

                    <Card className="bg-[#fafafa] border border-slate-100 shadow-sm mb-12">
                        <CardBody className="p-8 md:p-12 text-left leading-relaxed text-slate-600 space-y-8">
                            <div className="flex items-start gap-5">
                                <div className="bg-slate-900 p-2.5 rounded-xl text-white shadow-lg mt-1">
                                    <GraduationCap size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1 text-lg">學歷背景</h4>
                                    <p className="text-sm">
                                        <strong>國立中正大學資訊工程研究所碩士</strong>。研究方向涵蓋 Transformer-based TTS 與嵌入式系統實作，致力於將先進 AI 技術導入實際硬體環境。
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="bg-slate-900 p-2.5 rounded-xl text-white shadow-lg mt-1">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1 text-lg">工作經驗</h4>
                                    <p className="text-sm">
                                        現任職於 <strong>Foxconn (鴻海精密)</strong>，負責開發測試管理系統 (TMS)、視覺導引機械手臂系統，以及 <strong>離線式 AI 平台 (Offline AI)</strong> 的部署。曾赴印度執行技術轉移，並擔任跨國客戶與研發團隊之技術窗口。
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="bg-slate-900 p-2.5 rounded-xl text-white shadow-lg mt-1">
                                    <Terminal size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1 text-lg">核心技術</h4>
                                    <p className="text-sm">
                                        熟悉 <strong>Python 自動化開發</strong> 與 <strong>OpenCV 機械視覺</strong>。擅長使用 Docker、Linux、Ollama 與 Dify 建構邊緣運算與智慧代理方案，為智慧工廠提供穩定且高效的解決方案。
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <div className="flex justify-center gap-4">
                        <Button
                            as={Link}
                            href="/about"
                            color="primary"
                            variant="solid"
                            radius="lg"
                            className="font-bold px-8"
                        >
                            了解更多
                        </Button>
                        <Button
                            as={Link}
                            href="/contact"
                            variant="bordered"
                            radius="lg"
                            startContent={<Phone size={18} />}
                            className="font-bold border-slate-200 text-slate-600 px-8"
                        >
                            與我聯繫
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
