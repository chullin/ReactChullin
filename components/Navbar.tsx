'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown, LoaderCircle, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

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

  const handleNavClick = (href: string) => {
    closeMenus();

    if (href !== pathname) {
      setPendingHref(href);
    }
  };

  const navLinkClass = (active: boolean, pending = false) =>
    `px-3 py-2 rounded-lg transition-colors text-sm font-semibold ${
      active || pending
        ? 'text-[var(--theme-primary)] font-bold bg-orange-50'
        : 'text-gray-600 hover:text-[var(--theme-primary)] hover:bg-orange-50/70'
    } ${pending ? 'cursor-wait ring-1 ring-orange-200' : ''}`;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      {pendingHref && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-orange-100">
          <div className="h-full w-1/2 animate-[nav-progress_1s_ease-in-out_infinite] bg-gradient-to-r from-orange-500 via-rose-500 to-orange-500" />
        </div>
      )}
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
            onClick={() => handleNavClick('/')}
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
              aria-busy={pendingHref === link.href}
              className={`${navLinkClass(isActive(link.href), pendingHref === link.href)} inline-flex items-center gap-2`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.name}
              {pendingHref === link.href && <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />}
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
              <div className="absolute left-0 top-full w-52 pt-2">
                <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                  {playgroundLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-busy={pendingHref === link.href}
                      className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-50 ${
                        isActive(link.href) || pendingHref === link.href ? 'text-[var(--theme-primary)]' : 'text-gray-600'
                      } ${link.color === 'danger' ? 'hover:text-rose-600' : ''}`}
                      onClick={() => handleNavClick(link.href)}
                    >
                      <span>{link.name}</span>
                      {pendingHref === link.href && <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            aria-current={isActive('/contact') ? 'page' : undefined}
            aria-busy={pendingHref === '/contact'}
            className={`${navLinkClass(isActive('/contact'), pendingHref === '/contact')} inline-flex items-center gap-2`}
            onClick={() => handleNavClick('/contact')}
          >
            {t('nav.contact')}
            {pendingHref === '/contact' && <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/contact"
            aria-busy={pendingHref === '/contact'}
            className={`hidden h-10 items-center justify-center gap-2 rounded-xl bg-orange-50 px-4 text-sm font-bold text-[var(--theme-primary)] transition-colors hover:bg-orange-100 md:inline-flex ${pendingHref === '/contact' ? 'cursor-wait ring-1 ring-orange-200' : ''}`}
            onClick={() => handleNavClick('/contact')}
          >
            {t('nav.cta')}
            {pendingHref === '/contact' && <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />}
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
              aria-busy={pendingHref === item.href}
              className={`flex w-full items-center justify-between rounded-lg py-2 text-lg ${
                isActive(item.href) || pendingHref === item.href ? 'font-bold text-[var(--theme-primary)]' : 'text-gray-600'
              }`}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
            >
              <span>{item.name}</span>
              {pendingHref === item.href && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />}
            </Link>
          </div>
        ))}
        </div>
      )}
    </nav>
  );
}
