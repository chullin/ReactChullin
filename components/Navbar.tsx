'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  const isActive = (path: string) => pathname === path;
  const isGroupActive = (paths: string[]) => paths.includes(pathname);

  const playgroundLinks = [
    { name: t('nav.imageCompressor'), href: '/image-compressor' },
    { name: t('nav.snake'), href: '/snake' },
    { name: t('nav.vocabQuiz'), href: '/vocab-quiz' },
    { name: t('nav.tetrisBattle'), href: '/tetris-battle', color: 'danger' as const },
    { name: t('nav.demoHub'), href: '/demo' },
  ];

  const mainLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.blog'), href: '/blog' },
  ];

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsPlaygroundOpen(false);
  };

  const navLinkClass = (active: boolean) =>
    `px-3 py-2 rounded-lg transition-colors text-sm font-semibold ${
      active
        ? 'text-[var(--theme-primary)] font-bold bg-orange-50'
        : 'text-gray-600 hover:text-[var(--theme-primary)] hover:bg-orange-50/70'
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-50 sm:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-80"
            onClick={closeMenus}
          >
            Joseph Chen
          </Link>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={navLinkClass(isActive(link.href))}
              onClick={closeMenus}
            >
              {link.name}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsPlaygroundOpen(true)}
            onMouseLeave={() => setIsPlaygroundOpen(false)}
          >
            <button
              type="button"
              className={`${navLinkClass(isGroupActive(playgroundLinks.map((link) => link.href)))} inline-flex items-center gap-2`}
              aria-haspopup="menu"
              aria-expanded={isPlaygroundOpen}
              onClick={() => setIsPlaygroundOpen((open) => !open)}
            >
              {t('nav.playground')}
              <ChevronDown size={14} />
            </button>

            {isPlaygroundOpen && (
              <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                {playgroundLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-50 ${
                      isActive(link.href) ? 'text-[var(--theme-primary)]' : 'text-gray-600'
                    } ${link.color === 'danger' ? 'hover:text-rose-600' : ''}`}
                    onClick={closeMenus}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            aria-current={isActive('/contact') ? 'page' : undefined}
            className={navLinkClass(isActive('/contact'))}
            onClick={closeMenus}
          >
            {t('nav.contact')}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="hidden h-10 items-center justify-center rounded-xl bg-orange-50 px-4 text-sm font-bold text-[var(--theme-primary)] transition-colors hover:bg-orange-100 md:inline-flex"
            onClick={closeMenus}
          >
            {t('nav.cta')}
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 shadow-lg sm:hidden">
        {[
          ...mainLinks,
          ...playgroundLinks,
          { name: t('nav.contact'), href: '/contact' },
        ].map((item, index) => (
          <div key={`${item.name}-${index}`}>
            <Link
              className={`block w-full rounded-lg py-2 text-lg ${
                isActive(item.href) ? 'font-bold text-[var(--theme-primary)]' : 'text-gray-600'
              }`}
              href={item.href}
              onClick={closeMenus}
            >
              {item.name}
            </Link>
          </div>
        ))}
        </div>
      )}
    </nav>
  );
}
