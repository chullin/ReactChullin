'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;
  const isGroupActive = (paths: string[]) => paths.includes(pathname);

  const handleDropdownClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const closeMenu = () => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav ref={navRef} className="navbar navbar-expand-lg tw-sticky tw-top-0 tw-z-50 tw-backdrop-blur-md tw-bg-white/80 tw-border-b tw-border-gray-100 tw-py-2">
      <div className="container px-4">
        <Link className="navbar-brand tw-flex tw-items-center tw-gap-2" href="/" onClick={closeMenu}>
          <span className="fw-bolder tw-tracking-tight tw-text-gray-900">Joseph Chen</span>
        </Link>
        <button
          className="navbar-toggler tw-border-none focus:tw-shadow-none"
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMobileOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 tw-gap-1">
            <li className="nav-item">
              <Link 
                className={`nav-link tw-px-4 tw-rounded-lg tw-transition-colors ${isActive('/') ? 'tw-text-primary tw-bg-primary/5 tw-font-bold' : 'tw-text-gray-600 hover:tw-text-primary hover:tw-bg-gray-50'}`} 
                href="/"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>

            {/* Portfolio Dropdown */}
            <li className="nav-item dropdown">
              <a 
                className={`nav-link dropdown-toggle tw-px-4 tw-rounded-lg tw-transition-colors tw-cursor-pointer ${isGroupActive(['/resume', '/projects', '/blog']) ? 'tw-text-primary tw-bg-primary/5 tw-font-bold' : 'tw-text-gray-600 hover:tw-text-primary hover:tw-bg-gray-50'}`}
                onClick={(e) => handleDropdownClick(e, 'portfolio')}
              >
                Portfolio
              </a>
              <ul className={`dropdown-menu dropdown-menu-end tw-border-none tw-shadow-xl tw-rounded-xl tw-p-2 tw-mt-2 tw-bg-white/95 tw-backdrop-blur-lg ${openDropdown === 'portfolio' ? 'show' : ''}`}>
                <li><Link className={`dropdown-item tw-rounded-md ${isActive('/resume') ? 'tw-bg-primary/10 tw-text-primary tw-font-bold' : ''}`} href="/resume" onClick={closeMenu}>Resume</Link></li>
                <li><Link className={`dropdown-item tw-rounded-md ${isActive('/projects') ? 'tw-bg-primary/10 tw-text-primary tw-font-bold' : ''}`} href="/projects" onClick={closeMenu}>Projects</Link></li>
                <li><Link className={`dropdown-item tw-rounded-md ${isActive('/blog') ? 'tw-bg-primary/10 tw-text-primary tw-font-bold' : ''}`} href="/blog" onClick={closeMenu}>Blog</Link></li>
              </ul>
            </li>

            {/* Playground Dropdown */}
            <li className="nav-item dropdown">
              <a 
                className={`nav-link dropdown-toggle tw-px-4 tw-rounded-lg tw-transition-colors tw-cursor-pointer ${isGroupActive(['/snake', '/tetris-battle']) ? 'tw-text-primary tw-bg-primary/5 tw-font-bold' : 'tw-text-gray-600 hover:tw-text-primary hover:tw-bg-gray-50'}`}
                onClick={(e) => handleDropdownClick(e, 'playground')}
              >
                Playground
              </a>
              <ul className={`dropdown-menu dropdown-menu-end tw-border-none tw-shadow-xl tw-rounded-xl tw-p-2 tw-mt-2 tw-bg-white/95 tw-backdrop-blur-lg ${openDropdown === 'playground' ? 'show' : ''}`}>
                <li><Link className={`dropdown-item tw-rounded-md ${isActive('/snake') ? 'tw-bg-primary/10 tw-text-primary tw-font-bold' : ''}`} href="/snake" onClick={closeMenu}>Snake Game</Link></li>
                <li><Link className={`dropdown-item tw-rounded-md ${isActive('/vocab-quiz') ? 'tw-bg-primary/10 tw-text-primary tw-font-bold' : ''}`} href="/vocab-quiz" onClick={closeMenu}>Vocab Quiz</Link></li>
                <li><Link className={`dropdown-item tw-rounded-md ${isActive('/tetris-battle') ? 'tw-bg-red-50 tw-text-red-600 tw-font-bold' : 'tw-text-red-500'}`} href="/tetris-battle" onClick={closeMenu}>Tetris Battle</Link></li>
              </ul>
            </li>

            {/* Laboratory Dropdown */}
            <li className="nav-item dropdown">
              <a 
                className={`nav-link dropdown-toggle tw-px-4 tw-rounded-lg tw-transition-colors tw-cursor-pointer ${isGroupActive(['/demo', '/contact']) ? 'tw-text-primary tw-bg-primary/5 tw-font-bold' : 'tw-text-gray-600 hover:tw-text-primary hover:tw-bg-gray-50'}`}
                onClick={(e) => handleDropdownClick(e, 'lab')}
              >
                Lab & Connect
              </a>
              <ul className={`dropdown-menu dropdown-menu-end tw-border-none tw-shadow-xl tw-rounded-xl tw-p-2 tw-mt-2 tw-bg-white/95 tw-backdrop-blur-lg ${openDropdown === 'lab' ? 'show' : ''}`}>
                <li><Link className={`dropdown-item tw-rounded-md ${isActive('/demo') ? 'tw-bg-primary/10 tw-text-primary tw-font-bold' : ''}`} href="/demo" onClick={closeMenu}>Demo Hub</Link></li>
                <li><Link className={`dropdown-item tw-rounded-md ${isActive('/contact') ? 'tw-bg-primary/10 tw-text-primary tw-font-bold' : ''}`} href="/contact" onClick={closeMenu}>Contact Info</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
