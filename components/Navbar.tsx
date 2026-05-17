'use client';

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="bg-white/80 backdrop-blur-md border-b border-gray-100"
      position="sticky"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link 
            href="/" 
            className="font-bold text-2xl tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            Joseph Chen
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        {mainLinks.map((link) => (
          <NavbarItem key={link.href} isActive={isActive(link.href)}>
            <Link
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`px-3 py-2 rounded-lg transition-colors text-sm font-semibold ${
                isActive(link.href) 
                  ? 'text-primary font-bold bg-primary/5' 
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}

        <Dropdown>
          <NavbarItem isActive={isGroupActive(playgroundLinks.map(l => l.href))}>
            <DropdownTrigger>
              <Button
                disableRipple
                className={`p-0 bg-transparent data-[hover=true]:bg-transparent h-auto px-3 py-2 rounded-lg transition-colors text-sm font-semibold ${
                  isGroupActive(playgroundLinks.map(l => l.href))
                    ? 'text-primary font-bold bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
                endContent={<ChevronDown size={14} />}
                radius="sm"
                variant="light"
              >
                Playground
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Playground actions"
            className="w-[200px]"
          >
            {playgroundLinks.map((link) => (
              <DropdownItem
                key={link.href}
                href={link.href}
                color={link.color}
                className={isActive(link.href) ? "text-primary font-bold" : ""}
              >
                {link.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <NavbarItem isActive={isActive('/contact')}>
          <Link
            href="/contact"
            aria-current={isActive('/contact') ? 'page' : undefined}
            className={`px-3 py-2 rounded-lg transition-colors text-sm font-semibold ${
              isActive('/contact') 
                ? 'text-primary font-bold bg-primary/5' 
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
            }`}
          >
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/contact" className="p-0">
            <Button color="primary" variant="flat" className="font-bold">
              Let’s Talk
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {[
          ...mainLinks,
          ...playgroundLinks,
          { name: 'Contact', href: '/contact' },
        ].map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className={`w-full py-2 ${
                isActive(item.href) ? 'text-primary font-bold' : 'text-gray-600'
              }`}
              href={item.href}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
}

