'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  const isActive = (path: string) => pathname === path;
  const isGroupActive = (paths: string[]) => paths.includes(pathname);

  const playgroundLinks = [
    { name: 'Snake Game', href: '/snake' },
    { name: 'Vocab Quiz', href: '/vocab-quiz' },
    { name: 'Tetris Battle', href: '/tetris-battle', color: 'danger' as const },
    { name: 'Demo Hub', href: '/demo' },
  ];

  const mainLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
  ];

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsPlaygroundOpen(false);
  };

  const navLinkClass = (active: boolean) =>
    `px-3 py-2 rounded-lg transition-colors text-sm font-semibold ${
      active
        ? 'text-[#006FEE] font-bold bg-blue-50'
        : 'text-gray-600 hover:text-[#006FEE] hover:bg-gray-50'
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
              Playground
              <ChevronDown size={14} />
            </button>

            {isPlaygroundOpen && (
              <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                {playgroundLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-50 ${
                      isActive(link.href) ? 'text-[#006FEE]' : 'text-gray-600'
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
            Contact
          </Link>
        </div>

        <Link
          href="/contact"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-sm font-bold text-[#006FEE] transition-colors hover:bg-blue-100"
          onClick={closeMenus}
        >
          Let's Talk
        </Link>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 shadow-lg sm:hidden">
        {[
          ...mainLinks,
          ...playgroundLinks,
          { name: 'Contact', href: '/contact' },
        ].map((item, index) => (
          <div key={`${item.name}-${index}`}>
            <Link
              className={`block w-full rounded-lg py-2 text-lg ${
                isActive(item.href) ? 'font-bold text-[#006FEE]' : 'text-gray-600'
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
