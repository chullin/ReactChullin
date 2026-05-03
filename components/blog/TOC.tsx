'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TOC() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Only target headings within the article content to avoid nav/sidebar headings
    const article = document.querySelector('article');
    const container = article || document.body;
    const elements = Array.from(container.querySelectorAll('h2, h3'));
    
    const items: TOCItem[] = elements.map((el, i) => {
      // Ensure element has a unique ID for linking
      // If it has an ID, we use it. If not, we generate one.
      if (!el.id) {
        // Create a unique ID using index and prefix to avoid collisions
        el.id = `toc-heading-${i}`;
      }
      return {
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName.replace('H', '')),
      };
    });
    setHeadings(items);

    // Intersection Observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block fixed top-24 left-[calc(50%+420px)] w-64 z-10">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-gray-400">
          <List size={16} />
          <span className="text-xs font-black uppercase tracking-wider">本文目錄</span>
        </div>
        <nav className="space-y-1">
          {headings.map((h, i) => (
            <a
              key={`${h.id}-${i}`}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block text-xs py-1.5 transition-all relative ${
                activeId === h.id
                  ? 'text-primary font-bold pl-4'
                  : 'text-gray-500 hover:text-gray-800 pl-4'
              } ${h.level === 3 ? 'ml-3' : ''}`}
            >
              {activeId === h.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                />
              )}
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
