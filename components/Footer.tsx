'use client';

import { Link, Divider, Button } from '@heroui/react';
import { Mail, UserCircle, Eye, Users } from 'lucide-react';

const Github = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const Linkedin = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export default function Footer({ className }: { className?: string }) {
    const socialLinks = [
        { icon: <UserCircle size={20} />, href: "https://www.cake.me/s--g59SDSH82OEybvapXS0q5A--/fg6ts15", label: "Cake" },
        { icon: <Github size={20} />, href: "https://github.com/chullin", label: "GitHub" },
        { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/%E6%86%B2%E5%84%84-%E9%99%B3-724511223/?locale=en", label: "LinkedIn" },
    ];

    return (
        <footer className={`bg-white pt-16 pb-8 border-t border-gray-100 ${className}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">陳憲億 Joseph Chen</h3>
                        <p className="text-gray-500 max-w-xs transition-opacity hover:opacity-80">
                            Software Engineer focused on AI Applications & Automation at Hon Hai Technology Group.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {socialLinks.map((social) => (
                            <Button
                                key={social.label}
                                isIconOnly
                                as={Link}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="flat"
                                color="primary"
                                radius="full"
                                className="bg-primary/5 hover:bg-primary/10"
                            >
                                {social.icon}
                            </Button>
                        ))}
                        <Button
                            isIconOnly
                            as={Link}
                            href="mailto:fg6ts15@gmail.com"
                            variant="flat"
                            color="primary"
                            radius="full"
                            className="bg-primary/5 hover:bg-primary/10"
                        >
                            <Mail size={20} />
                        </Button>
                    </div>
                </div>

                <Divider className="my-8 opacity-50" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">
                        Copyright &copy; 陳憲億 Joseph Chen 2026
                    </p>

                    <div className="flex gap-6 text-sm text-gray-400">
                        <span id="busuanzi_container_site_pv" className="flex items-center gap-2">
                            <Eye size={16} /> 總訪問量：<span id="busuanzi_value_site_pv"></span> 次
                        </span>
                        <span id="busuanzi_container_site_uv" className="flex items-center gap-2">
                            <Users size={16} /> 總訪客數：<span id="busuanzi_value_site_uv"></span> 人
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
