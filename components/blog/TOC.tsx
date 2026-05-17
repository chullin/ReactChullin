'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TOC() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [articleOffset, setArticleOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const scanHeadings = () => {
      const article = document.querySelector('article');
      if (!article) {
        setHeadings([]);
        return;
      }

      // Update article offset for positioning
      setArticleOffset(article.offsetTop);

      const elements = Array.from(article.querySelectorAll('h2, h3'));
      const items: TOCItem[] = elements.map((el, i) => {
        if (!el.id) {
          el.id = `toc-heading-${i}`;
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: parseInt(el.tagName.replace('H', '')),
        };
      });
      setHeadings(items);
      setIsLoaded(true);

      // Setup Intersection Observer for active heading
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
      return observer;
    };

    const timer = setTimeout(() => {
      const observer = scanHeadings();
      return () => observer?.disconnect();
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="hidden xl:block absolute left-[calc(50%+450px)] w-64 z-10 bottom-0"
          style={{ top: articleOffset }}
        >
          <div className="sticky top-32">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <List size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">本文目錄</span>
              </div>
              <nav className="space-y-1">
                {headings.map((h, i) => (
                  <a
                    key={`${h.id}-${i}`}
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(h.id);
                      if (el) {
                        const offset = 100;
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = el.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className={`block text-xs py-2 transition-all duration-300 relative group ${
                      activeId === h.id
                        ? 'text-primary font-bold pl-4'
                        : 'text-gray-400 hover:text-gray-900 pl-4'
                    } ${h.level === 3 ? 'ml-3' : ''}`}
                  >
                    {activeId === h.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{h.text}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
