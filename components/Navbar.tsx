'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, LoaderCircle, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/lib/i18n/I18nProvider';

type NavItem = {
  name: string;
  href: string;
  color?: 'danger';
};

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isToolkitOpen, setIsToolkitOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    let previousTouchY: number | null = null;

    const handleTouchStart = (event: TouchEvent) => {
      previousTouchY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const menu = mobileMenuRef.current;
      const currentTouchY = event.touches[0]?.clientY;

      if (!menu || !(event.target instanceof Node) || !menu.contains(event.target)) {
        event.preventDefault();
        return;
      }

      if (currentTouchY === undefined || previousTouchY === null) return;

      const movingDown = currentTouchY > previousTouchY;
      const movingUp = currentTouchY < previousTouchY;
      const atTop = menu.scrollTop <= 0;
      const atBottom = menu.scrollTop + menu.clientHeight >= menu.scrollHeight - 1;

      previousTouchY = currentTouchY;

      if ((atTop && movingDown) || (atBottom && movingUp)) {
        event.preventDefault();
      }
    };

    const clearTouchPosition = () => {
      previousTouchY = null;
    };

    const handleWheel = (event: WheelEvent) => {
      const menu = mobileMenuRef.current;

      if (!menu || !(event.target instanceof Node) || !menu.contains(event.target)) {
        event.preventDefault();
        return;
      }

      const atTop = menu.scrollTop <= 0;
      const atBottom = menu.scrollTop + menu.clientHeight >= menu.scrollHeight - 1;

      if ((atTop && event.deltaY < 0) || (atBottom && event.deltaY > 0)) {
        event.preventDefault();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', clearTouchPosition, { passive: true });
    document.addEventListener('touchcancel', clearTouchPosition, { passive: true });
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', clearTouchPosition);
      document.removeEventListener('touchcancel', clearTouchPosition);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;
  const isGroupActive = (paths: string[]) => paths.includes(pathname);

  const toolkitLinks: NavItem[] = [
    { name: '檔案暫存空間', href: '/temporary-files' },
    { name: 'QR File Transfer', href: '/qr-transfer' },
    { name: t('nav.imageCompressor'), href: '/image-compressor' },
    { name: t('nav.demoHub'), href: '/demo' },
    { name: t('nav.videoPlayer'), href: '/video-player' },
    { name: t('nav.segmentedVideoPlayer'), href: '/segmented-video-player' },
  ];

  const stockLinks: NavItem[] = [
    { name: t('nav.marketWatch'), href: '/market-watch' },
    { name: t('nav.stockHealth'), href: '/stock-health' },
    { name: t('nav.tradingCost'), href: '/trading-cost' },
  ];

  const playLinks: NavItem[] = [
    { name: t('nav.snake'), href: '/snake' },
    { name: t('nav.vocabQuiz'), href: '/vocab-quiz' },
    { name: t('nav.tetrisBattle'), href: '/tetris-battle', color: 'danger' as const },
    { name: t('nav.flashcards'), href: '/flashcards' },
  ];

  const dropdownLinks = [...toolkitLinks, ...playLinks];
  const stockPaths = stockLinks.map((link) => link.href);
  const workLinks: NavItem[] = [
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.about'), href: '/about' },
  ];
  const workPaths = workLinks.map((link) => link.href);

  const mainLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.blog'), href: '/blog' },
  ];
  const compactLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.blog'), href: '/blog' },
  ];
  const compactMoreGroups = [
    {
      label: t('nav.siteInfo'),
      links: workLinks,
    },
    { label: t('nav.stockTools'), links: stockLinks },
    { label: t('nav.tools'), links: toolkitLinks },
    { label: t('nav.gamesPractice'), links: playLinks },
    {
      label: t('nav.other'),
      links: [
        { name: t('nav.memory'), href: '/memory' },
        { name: t('nav.contact'), href: '/contact' },
      ],
    },
  ];
  const compactMoreLinks = compactMoreGroups.flatMap((group) => group.links);
  const utilityLinks = [
    { name: t('nav.memory'), href: '/memory' },
  ];

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsWorkOpen(false);
    setIsToolkitOpen(false);
    setIsStockOpen(false);
    setIsMoreOpen(false);
  };

  const handleNavClick = (href: string) => {
    closeMenus();

    if (href !== pathname) {
      setPendingHref(href);
    }
  };

  const navLinkClass = (active: boolean, pending = false) =>
    `whitespace-nowrap px-3 py-2 rounded-lg transition-colors text-sm font-semibold ${
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-5 xl:gap-4 xl:px-6">
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
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
            className="shrink-0 whitespace-nowrap text-2xl font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-80"
            onClick={() => handleNavClick('/')}
          >
            <span className="sm:hidden">Joseph</span>
            <span className="hidden sm:inline">Joseph Chen</span>
          </Link>
        </div>

        <div className="hidden min-w-0 items-center gap-1 sm:flex min-[1040px]:!hidden">
          {compactLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              aria-busy={pendingHref === link.href}
              className={`${navLinkClass(isActive(link.href), pendingHref === link.href)} inline-flex items-center gap-2 px-2.5`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.name}
              {pendingHref === link.href && <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
          >
            <button
              type="button"
              className={`${navLinkClass(
                compactMoreLinks.some((link) => isActive(link.href)),
                compactMoreLinks.some((link) => pendingHref === link.href),
              )} inline-flex items-center gap-2 px-2.5`}
              aria-haspopup="menu"
              aria-expanded={isMoreOpen}
              onClick={() => setIsMoreOpen((open) => !open)}
            >
              {t('nav.more')}
              <ChevronDown size={14} />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 top-full w-56 pt-2">
                <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                  {compactMoreGroups.map((group) => (
                    <div key={group.label} className="py-1">
                      <p className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{group.label}</p>
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          aria-busy={pendingHref === link.href}
                          className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-50 ${
                            isActive(link.href) || pendingHref === link.href ? 'text-[var(--theme-primary)]' : 'text-gray-600'
                          } ${'color' in link && link.color === 'danger' ? 'hover:text-rose-600' : ''}`}
                          onClick={() => handleNavClick(link.href)}
                        >
                          <span>{link.name}</span>
                          {pendingHref === link.href && <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden items-center gap-2 min-[1040px]:flex">
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
            onMouseEnter={() => setIsWorkOpen(true)}
            onMouseLeave={() => setIsWorkOpen(false)}
          >
            <button
              type="button"
              className={`${navLinkClass(isGroupActive(workPaths))} inline-flex items-center gap-2`}
              aria-haspopup="menu"
              aria-expanded={isWorkOpen}
              onClick={() => setIsWorkOpen((open) => !open)}
            >
              {t('nav.workAbout')}
              <ChevronDown size={14} />
            </button>

            {isWorkOpen && (
              <div className="absolute left-0 top-full w-48 pt-2">
                <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                  {workLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-busy={pendingHref === link.href}
                      className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-50 ${
                        isActive(link.href) || pendingHref === link.href ? 'text-[var(--theme-primary)]' : 'text-gray-600'
                      }`}
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

          <div
            className="relative"
            onMouseEnter={() => setIsStockOpen(true)}
            onMouseLeave={() => setIsStockOpen(false)}
          >
            <button
              type="button"
              className={`${navLinkClass(isGroupActive(stockPaths))} inline-flex items-center gap-2`}
              aria-haspopup="menu"
              aria-expanded={isStockOpen}
              onClick={() => setIsStockOpen((open) => !open)}
            >
              {t('nav.stockTools')}
              <ChevronDown size={14} />
            </button>

            {isStockOpen && (
              <div className="absolute left-0 top-full w-60 pt-2">
                <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                  {stockLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-busy={pendingHref === link.href}
                      className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-emerald-50 ${
                        isActive(link.href) || pendingHref === link.href ? 'text-emerald-700' : 'text-gray-600 hover:text-emerald-700'
                      }`}
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

          <div
            className="relative"
            onMouseEnter={() => setIsToolkitOpen(true)}
            onMouseLeave={() => setIsToolkitOpen(false)}
          >
            <button
              type="button"
              className={`${navLinkClass(isGroupActive(dropdownLinks.map((link) => link.href)))} inline-flex items-center gap-2`}
              aria-haspopup="menu"
              aria-expanded={isToolkitOpen}
              onClick={() => setIsToolkitOpen((open) => !open)}
            >
              {t('nav.toolsAndPlay')}
              <ChevronDown size={14} />
            </button>

            {isToolkitOpen && (
              <div className="absolute left-0 top-full w-64 pt-2">
                <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                  {[
                    [t('nav.tools'), toolkitLinks],
                    [t('nav.gamesPractice'), playLinks],
                  ].map(([label, links]) => (
                    <div key={label as string} className="py-1">
                      <p className="px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label as string}</p>
                      {(links as typeof dropdownLinks).map((link) => (
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
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/contact"
            aria-busy={pendingHref === '/contact'}
            className={`hidden h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-orange-50 px-4 text-sm font-bold text-[var(--theme-primary)] transition-colors hover:bg-orange-100 min-[1040px]:inline-flex ${pendingHref === '/contact' ? 'cursor-wait ring-1 ring-orange-200' : ''}`}
            onClick={() => handleNavClick('/contact')}
          >
            {t('nav.cta')}
            {pendingHref === '/contact' && <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />}
          </Link>
        </div>
      </div>

      {isMenuOpen && createPortal(
        <div
          ref={mobileMenuRef}
          className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto overscroll-contain border-t border-gray-100 bg-white px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg [touch-action:pan-y] sm:hidden"
        >
          <div className="space-y-3">
            <div>
              {mainLinks.map((item) => (
                <Link
                  key={item.href}
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
              ))}
            </div>

            {[
              { label: t('nav.siteInfo'), links: workLinks },
              { label: t('nav.stockTools'), links: stockLinks },
              { label: t('nav.tools'), links: toolkitLinks },
              { label: t('nav.gamesPractice'), links: playLinks },
              { label: t('nav.other'), links: [...utilityLinks, { name: t('nav.contact'), href: '/contact' }] },
            ].map((group) => (
              <div key={group.label} className="border-t border-slate-100 pt-3">
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{group.label}</p>
                {group.links.map((item) => (
                  <Link
                    key={item.href}
                    aria-busy={pendingHref === item.href}
                    className={`flex w-full items-center justify-between rounded-lg py-2 text-base font-semibold ${
                      isActive(item.href) || pendingHref === item.href ? 'text-[var(--theme-primary)]' : 'text-gray-600'
                    }`}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                  >
                    <span>{item.name}</span>
                    {pendingHref === item.href && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </nav>
  );
}
