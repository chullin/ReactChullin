'use client';

import { Link, Divider, Button } from '@heroui/react';
import { Phone, Mail, UserCircle } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: "bi-person-circle", href: "https://www.cake.me/s--g59SDSH82OEybvapXS0q5A--/fg6ts15", label: "Cake" },
    { icon: "bi-github", href: "https://github.com/chullin", label: "GitHub" },
    { icon: "bi-linkedin", href: "https://www.linkedin.com/in/%E6%86%B2%E5%84%84-%E9%99%B3-724511223/?locale=en", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">陳憲億 Joseph Chen</h3>
            <p className="text-gray-500 max-w-xs transition-opacity hover:opacity-80">
              Software Engineer specializing in AI, Automation, and Web Development. 
              目前任職於 Foxconn。
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
                <i className={`bi ${social.icon} text-xl`}></i>
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
              <i className="bi bi-eye-fill"></i> 總訪問量：<span id="busuanzi_value_site_pv"></span> 次
            </span>
            <span id="busuanzi_container_site_uv" className="flex items-center gap-2">
              <i className="bi bi-people-fill"></i> 總訪客數：<span id="busuanzi_value_site_uv"></span> 人
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
