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

  const portfolioLinks = [
    { name: 'Resume', href: '/resume' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
  ];

  const playgroundLinks = [
    { name: 'Snake Game', href: '/snake' },
    { name: 'Vocab Quiz', href: '/vocab-quiz' },
    { name: 'Tetris Battle', href: '/tetris-battle', color: 'danger' as const },
  ];

  const labLinks = [
    { name: 'Demo Hub', href: '/demo' },
    { name: 'Contact Info', href: '/contact' },
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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isActive('/')}>
          <Link
            href="/"
            aria-current={isActive('/') ? 'page' : undefined}
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive('/') 
                ? 'text-primary font-bold bg-primary/5' 
                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
            }`}
          >
            Home
          </Link>
        </NavbarItem>

        <Dropdown>
          <NavbarItem isActive={isGroupActive(['/resume', '/projects', '/blog'])}>
            <DropdownTrigger>
              <Button
                disableRipple
                className={`p-0 bg-transparent data-[hover=true]:bg-transparent h-auto px-3 py-2 rounded-lg transition-colors ${
                  isGroupActive(['/resume', '/projects', '/blog'])
                    ? 'text-primary font-bold bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
                endContent={<ChevronDown size={16} />}
                radius="sm"
                variant="light"
              >
                Portfolio
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Portfolio actions"
            className="w-[200px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {portfolioLinks.map((link) => (
              <DropdownItem
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? "text-primary font-bold" : ""}
              >
                {link.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem isActive={isGroupActive(['/snake', '/vocab-quiz', '/tetris-battle'])}>
            <DropdownTrigger>
              <Button
                disableRipple
                className={`p-0 bg-transparent data-[hover=true]:bg-transparent h-auto px-3 py-2 rounded-lg transition-colors ${
                  isGroupActive(['/snake', '/vocab-quiz', '/tetris-battle'])
                    ? 'text-primary font-bold bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
                endContent={<ChevronDown size={16} />}
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

        <Dropdown>
          <NavbarItem isActive={isGroupActive(['/demo', '/contact'])}>
            <DropdownTrigger>
              <Button
                disableRipple
                className={`p-0 bg-transparent data-[hover=true]:bg-transparent h-auto px-3 py-2 rounded-lg transition-colors ${
                  isGroupActive(['/demo', '/contact'])
                    ? 'text-primary font-bold bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
                endContent={<ChevronDown size={16} />}
                radius="sm"
                variant="light"
              >
                Lab & Connect
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Lab actions"
            className="w-[200px]"
          >
            {labLinks.map((link) => (
              <DropdownItem
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? "text-primary font-bold" : ""}
              >
                {link.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/contact" variant="flat" className="font-bold">
            Hire Me
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {[
          { name: 'Home', href: '/' },
          ...portfolioLinks,
          ...playgroundLinks,
          ...labLinks,
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
