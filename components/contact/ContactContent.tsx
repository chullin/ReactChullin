'use client';

import SiteCard from '@/components/SiteCard';
import SitePageHeading from '@/components/SitePageHeading';
import {
    CardBody,
    Button,
    Link,
    Divider,
    Avatar,
} from '@heroui/react';
import { Mail, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

const OneZeroFourLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 54 26"
        width="54"
        height="26"
        {...props}
    >
        <path
            d="M27.782 12.998V13h4.443v-.002c0-6.961-5.639-12.6-12.598-12.6-4.549 0-8.518 2.414-10.734 6.02V.398H4.446L0 4.846h4.445v20.752h4.447v-6.023A12.543 12.543 0 0 1 7.026 13c0-2.621.979-5.01 2.582-6.836.039-.043.08-.09.121-.133a10.164 10.164 0 0 1 .853-.842c.27-.234.551-.459.844-.666.025-.016.047-.035.07-.053.328-.227.67-.438 1.025-.627.014-.008.029-.014.043-.021.318-.168.65-.318.988-.453.102-.041.203-.076.307-.113.26-.096.521-.18.791-.252.125-.035.25-.068.377-.098.27-.063.543-.113.818-.154.117-.018.234-.039.355-.055.395-.045.793-.074 1.199-.074.604 0 1.193.059 1.768.158.074.014.152.018.225.033.1.02.195.049.293.07.859.193 1.682.484 2.443.875l.01.006c.279.143.553.299.818.469.025.016.044.032.068.049.242.156.48.32.709.498.021.016.039.033.059.047.229.18.451.367.664.564.02.016.035.037.053.053.213.199.418.404.611.621.021.025.041.053.063.076.188.213.367.43.537.658.072.096.135.201.205.301.109.16.225.316.328.482.104.172.193.354.291.529.053.102.115.201.166.307.098.197.182.402.266.609.039.09.084.176.119.27.109.291.207.588.291.891.004.01.008.018.01.029.174.627.291 1.275.344 1.945.028.275.042.552.042.835m20.707 3.705V.398h-.74L27.735 20.41h16.313v5.191h4.441V20.41h5.188v-3.707h-5.188zm-4.442 0h-7.416l7.416-7.406v7.406z"
            fill="#686868"
        />
        <path
            d="M27.735 20.408l4.012-4.012c.305-1.084.477-2.219.477-3.398h-4.441c0 4.5-3.648 8.152-8.154 8.152a8.15 8.15 0 0 1-8.152-8.152 8.15 8.15 0 0 1 8.152-8.154c4.221 0 7.689 3.207 8.111 7.314-.428-5.334-4.885-9.535-10.338-9.535-5.734 0-10.375 4.646-10.375 10.375 0 6.957 5.639 12.602 12.602 12.602 4.186 0 7.883-2.049 10.174-5.191h-2.068z"
            fill="#ff7800"
        />
    </svg>
);

const Github = ({ size = 24, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedinIcon = ({ size = 24, ...props }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export default function ContactContent() {
    const { t } = useI18n();

    return (
        <div className="site-page">
            <div className="site-container space-y-10">
                <SitePageHeading
                    eyebrow="Get in Touch"
                    title={t('contactPage.title')}
                    description={t('contactPage.body')}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl"
                >
                    <SiteCard>
                        <CardBody className="space-y-8 p-6 sm:p-10">
                            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                                <Avatar
                                    isBordered
                                    color="primary"
                                    src="/assets/github-avatar.webp"
                                    name="Joseph Chen"
                                    className="h-20 w-20 shrink-0"
                                />
                                <div className="space-y-3">
                                    <p className="text-2xl font-black tracking-tight text-slate-950">Joseph Chen</p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                        <Globe size={16} className="text-orange-700" aria-hidden="true" />
                                        <span>{t('contactPage.locationLabel')} · {t('common.location')}</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                as={Link}
                                href="mailto:fg6ts15@gmail.com"
                                color="primary"
                                size="lg"
                                className="h-12 w-full rounded-xl font-bold sm:w-fit"
                                startContent={<Mail size={20} aria-hidden="true" />}
                            >
                                {t('contactPage.email')}
                            </Button>
                            <div className="flex items-center gap-4">
                                <Divider className="flex-1 opacity-50" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('contactPage.elsewhere')}</span>
                                <Divider className="flex-1 opacity-50" />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button as={Link} href="https://github.com/chullin" isExternal variant="flat" color="primary" className="rounded-xl font-bold" startContent={<Github size={20} aria-hidden="true" />}>
                                    GitHub
                                </Button>
                                <Button as={Link} href="https://profile.104.com.tw/profile/c71bed22-e78d-4e03-acdf-fb9c42e0076d/about?utm_source=104&utm_medium=resumes" isExternal variant="flat" color="primary" className="rounded-xl font-bold" startContent={<OneZeroFourLogo className="h-5 w-10" aria-hidden="true" />}>
                                    104
                                </Button>
                                <Button as={Link} href="https://www.linkedin.com/in/%E6%86%B2%E5%84%84-%E9%99%B3-724511223/?locale=en" isExternal variant="flat" color="primary" className="rounded-xl font-bold" startContent={<LinkedinIcon size={20} aria-hidden="true" />}>
                                    LinkedIn
                                </Button>
                            </div>
                        </CardBody>
                    </SiteCard>
                </motion.div>
            </div>
        </div>
    );
}
