'use client';

import { Card, CardBody, Divider, Chip } from '@heroui/react';
import { User, Code, Briefcase, GraduationCap, Mail, Heart, Globe } from 'lucide-react';
import Link from 'next/link';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

const GithubIcon = ({ size = 24, ...props }: IconProps) => (
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

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">關於我 About Me</h1>
          <p className="text-xl text-gray-600">我是陳憲億 Joseph Chen，一名熱愛解決問題的軟體工程師。</p>
        </header>

        <Card className="border-none shadow-xl mb-12 overflow-hidden">
          <CardBody className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="bg-primary p-12 text-white flex flex-col justify-center items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white/20 shadow-2xl">
                  <img src="/assets/profile3.png" alt="Joseph Chen" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold mb-2">陳憲億</h2>
                <p className="text-primary-foreground/80 mb-6">Joseph Chen</p>
                <div className="flex gap-4">
                  <Link href="https://github.com/chullin" target="_blank" className="hover:scale-110 transition-transform">
                    <GithubIcon size={24} />
                  </Link>
                  <Link href="https://www.linkedin.com/in/%E6%86%B2%E5%84%84-%E9%99%B3-724511223/?locale=en" target="_blank" className="hover:scale-110 transition-transform">
                    <LinkedinIcon size={24} />
                  </Link>
                  <Link href="mailto:josephchen.dev@gmail.com" className="hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </Link>
                </div>
              </div>
              <div className="col-span-2 p-8 md:p-12 bg-white">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <User className="text-primary" /> 個人簡介
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  您好！我是<strong>陳憲億（Joseph Chen）</strong>。目前在 <strong>Foxconn (鴻海精密)</strong> 擔任 <strong>Software Engineer</strong>。
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  我致力於利用 AI 與自動化技術來提升生產效率與系統效能。在開發過程中，我追求代碼的簡潔與系統的可維護性，並享受從 0 到 1 打造解決方案的過程。
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <Code size={18} className="text-primary" /> 技術專長
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'PyTorch', 'Docker', 'Git'].map(skill => (
                        <Chip key={skill} size="sm" variant="flat" color="primary">{skill}</Chip>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <Briefcase size={18} className="text-primary" /> 目前專注
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>AI 模型部署與優化</li>
                      <li>工業自動化系統開發</li>
                      <li>高效能 Web 應用架構</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="text-primary" /> 工作經驗
            </h3>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-primary/20">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary" />
                <h4 className="font-bold text-gray-900">Software Engineer</h4>
                <p className="text-sm text-primary font-medium">Foxconn (鴻海精密) | 2022 - 現在</p>
                <p className="text-sm text-gray-600 mt-2">
                  負責 AI 與自動化系統的設計與開發，優化內部生產流程。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="text-primary" /> 學歷背景
            </h3>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-primary/20">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary" />
                <h4 className="font-bold text-gray-900">碩士 - 機械工程 / 自動化</h4>
                <p className="text-sm text-primary font-medium">國立中央大學</p>
              </div>
              <div className="relative pl-6 border-l-2 border-primary/20">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary" />
                <h4 className="font-bold text-gray-900">學士 - 機械工程</h4>
                <p className="text-sm text-primary font-medium">國立屏東科技大學</p>
              </div>
            </div>
          </section>
        </div>

        <Divider className="my-12" />

        <section className="text-center">
          <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
            <Heart className="text-red-500 fill-red-500" /> 為什麼建立這個網站？
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            這個網站是我的數位筆記本。我深信「教是最好的學」，透過將複雜的技術知識整理成部落格文章，我不僅能鞏固自己的理解，也能幫助到在這個領域中探索的人。這裡記錄了我在 AI、軟體工程與系統設計上的每一步成長。
          </p>
        </section>
      </div>
    </div>
  );
}
