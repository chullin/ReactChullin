'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from '@heroui/react';
import { ArrowLeft, ArrowUp, Bookmark, Share2, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Simple Line & Threads icons
const LineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="18" width="18">
    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.53 8.892 8.441 9.619.329.073.784.225.897.514.1.258.064.665.031.931l-.147.887c-.042.247-.197.986.866.539 1.064-.448 5.733-3.376 7.685-5.69 1.47-1.748 2.227-3.487 2.227-5.461M8.196 12.569H6.182c-.378 0-.686-.308-.686-.686V8.04c0-.378.308-.686.686-.686h2.014c.378 0 .686.308.686.686 0 .378-.308.686-.686.686H6.868v1.07h1.328c.378 0 .686.308.686.686 0 .378-.308.686-.686.686H6.868v1.07h1.328c.378 0 .686.308.686.686 0 .378-.308.686-.686.686M12.18 12.569h-1.38c-.378 0-.686-.308-.686-.686V8.04c0-.378.308-.686.686-.686h1.38c.378 0 .686.308.686.686v3.843c0 .378-.308.686-.686.686M16.924 12.569h-1.428c-.28 0-.528-.168-.63-.42l-1.637-2.61v2.344c0 .378-.308.686-.686.686 0-.378-.686-.308-.686-.686V8.04c0-.378.308-.686.686-.686 0 .378.686.308.686.686v2.344l1.637-2.61c.102-.252.35-.42.63-.42h1.428c.196 0 .322.21.21.378l-1.931 2.659 1.931 2.659c.112.168-.014.378-.21.378M21.579 12.569h-2.014c-.378 0-.686-.308-.686-.686V8.04c0-.378.308-.686.686-.686h2.014c.378 0 .686.308.686.686 0 .378-.308.686-.686.686h-1.328v1.07h1.328c.378 0 .686.308.686.686 0 .378-.308.686-.686.686h-1.328v1.07h1.328c.378 0 .686.308.686.686 0 .378-.308.686-.686.686" />
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="18" width="18">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14c-1.326 0-2.483-.692-3.155-1.745l1.63-1.075C10.824 13.824 11.377 14.195 12 14.195c1.11 0 1.98-.946 1.98-2.095V12h-3.41c-1.611 0-2.88-1.282-2.88-2.905S8.979 6.19 10.59 6.19h.33v1.8h-.33c-.618 0-1.08.482-1.08 1.105 0 .622.462 1.105 1.08 1.105h3.41v1.895C14 13.244 13.11 14.195 12 14.195zm2.846-5.81h-1.554V7.99h1.554v2.2zM15 12v.195c0 1.83-1.48 3.31-3.31 3.31-1.83 0-3.31-1.48-3.31-3.31S9.86 8.885 11.69 8.885h.33v-1.8h-.33C8.866 7.085 6.585 9.366 6.585 12.195c0 2.828 2.28 5.11 5.105 5.11 2.828 0 5.11-2.282 5.11-5.11V12h-1.8z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="18" width="18">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function BlogOverlay({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Only show overlay on article pages, not the blog index
  const isArticlePage = pathname !== '/blog' && pathname.startsWith('/blog/');

  useEffect(() => {
    if (!isArticlePage) return;

    // Check initial scroll
    setIsScrolled(window.scrollY > 200);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isArticlePage]);

  // Load bookmark status on mount
  useEffect(() => {
    if (!isArticlePage) return;
    const bookmarks = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(pathname));
  }, [pathname, isArticlePage]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');
    let newBookmarks;
    if (bookmarks.includes(pathname)) {
      newBookmarks = bookmarks.filter((p: string) => p !== pathname);
      setIsBookmarked(false);
    } else {
      newBookmarks = [...bookmarks, pathname];
      setIsBookmarked(true);
    }
    localStorage.setItem('blogBookmarks', JSON.stringify(newBookmarks));
  };

  const shareToLine = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://line.me/R/msg/text/?${url}`, '_blank');
  };

  const shareToThreads = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this article: ');
    window.open(`https://threads.net/intent/post?text=${text}${url}`, '_blank');
  };

  const shareToIG = async () => {
    const url = window.location.href;
    const title = document.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err: any) {
        if (err.name === 'AbortError') {
          // User cancelled the share, do nothing
          return;
        }
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback
      copyLink();
      alert('已複製連結！您可以打開 Instagram 貼上連結分享。');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('連結已複製到剪貼簿！'))
      .catch(() => alert('複製連結失敗，請手動複製網址。'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {children}
      
      {isArticlePage && (
        <>
          {/* Top Left Floating Back Button */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="fixed top-24 left-4 sm:left-8 z-50"
              >
                <Tooltip content="返回 Blog 首頁" placement="right">
                  <Button
                    as={Link}
                    href="/blog"
                    isIconOnly
                    color="primary"
                    variant="flat"
                    radius="full"
                    className="shadow-lg bg-white/80 backdrop-blur-md hover:bg-primary-50"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                </Tooltip>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Right Floating Actions */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            {/* Share Menu */}
            <Dropdown placement="left-end" className="z-50">
              <DropdownTrigger>
                <Button 
                  isIconOnly 
                  color="default" 
                  variant="flat" 
                  radius="full" 
                  className="shadow-lg bg-white/80 backdrop-blur-md"
                >
                  <Share2 size={20} className="text-gray-600" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Share Actions">
                <DropdownItem 
                  key="line" 
                  startContent={<LineIcon />}
                  onPress={shareToLine}
                >
                  分享到 Line
                </DropdownItem>
                <DropdownItem 
                  key="threads" 
                  startContent={<ThreadsIcon />}
                  onPress={shareToThreads}
                >
                  分享到 Threads
                </DropdownItem>
                <DropdownItem 
                  key="ig" 
                  startContent={<InstagramIcon />}
                  onPress={shareToIG}
                >
                  分享到 IG
                </DropdownItem>
                <DropdownItem 
                  key="copy" 
                  startContent={<LinkIcon size={18} />}
                  onPress={copyLink}
                >
                  複製連結
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Bookmark Button */}
            <Tooltip content={isBookmarked ? "移除收藏" : "加入收藏"} placement="left">
              <Button
                isIconOnly
                color={isBookmarked ? "danger" : "default"}
                variant="flat"
                radius="full"
                className={`shadow-lg bg-white/80 backdrop-blur-md ${isBookmarked ? 'text-danger' : 'text-gray-600'}`}
                onPress={toggleBookmark}
              >
                <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
              </Button>
            </Tooltip>

            {/* Back to Top */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Tooltip content="回到頂部" placement="left">
                    <Button
                      isIconOnly
                      color="primary"
                      radius="full"
                      className="shadow-lg shadow-primary/30"
                      onPress={scrollToTop}
                    >
                      <ArrowUp size={20} />
                    </Button>
                  </Tooltip>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </>
  );
}
