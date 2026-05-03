'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Button, 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerBody,
  useDisclosure,
  Accordion,
  AccordionItem,
  Chip,
  Tooltip
} from '@heroui/react';
import { Menu, LayoutList, ChevronRight, Hash, Bookmark, Search, X } from 'lucide-react';
import Link from 'next/link';
import { series, type Post, type Series } from '@/config/blog';
import { Input } from '@heroui/react';

export default function FloatingNav() {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [bookmarkedHrefs, setBookmarkedHrefs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Only show on article pages
  const isArticlePage = pathname !== '/blog' && pathname.startsWith('/blog/');
  
  useEffect(() => {
    if (!isArticlePage) return;
    const bookmarks = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');
    setBookmarkedHrefs(bookmarks);
    
    const handleStorage = () => {
      const b = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');
      setBookmarkedHrefs(b);
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('bookmarkChange', handleStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('bookmarkChange', handleStorage);
    };
  }, [pathname, isArticlePage]);

  if (!isArticlePage) return null;

  // Filter series and posts based on search term
  const filteredSeries = series.map(s => ({
    ...s,
    posts: s.posts.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(s => s.posts.length > 0);

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed top-24 right-4 sm:right-8 z-50">
        <Tooltip content="文章導覽 / 切換類別" placement="left">
          <Button
            isIconOnly
            color="primary"
            variant="shadow"
            radius="full"
            className="w-12 h-12 shadow-xl bg-white/90 backdrop-blur-md text-primary"
            onPress={onOpen}
          >
            <LayoutList size={22} />
          </Button>
        </Tooltip>
      </div>

      {/* Sidebar Drawer */}
      <Drawer 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="right"
        size="sm"
        backdrop="blur"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-primary">
                    <LayoutList size={20} />
                    <span className="font-black">部落格導覽</span>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">快速切換分類與文章</p>
                </div>
                
                <Input
                  size="sm"
                  variant="flat"
                  placeholder="搜尋文章..."
                  startContent={<Search size={16} className="text-gray-400" />}
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  endContent={
                    searchTerm && (
                      <button onClick={() => setSearchTerm('')}>
                        <X size={14} className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )
                  }
                  classNames={{
                    inputWrapper: "bg-gray-100/50 hover:bg-gray-100 group-data-[focus=true]:bg-white group-data-[focus=true]:shadow-sm transition-all"
                  }}
                />
              </DrawerHeader>
              <DrawerBody className="pb-8">
                {filteredSeries.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
                    <Search size={40} strokeWidth={1} />
                    <p className="text-sm font-medium">找不到相符的文章</p>
                  </div>
                ) : (
                  <Accordion 
                    selectionMode="multiple" 
                    defaultExpandedKeys={series.map(s => s.id)}
                    itemClasses={{
                      title: "font-black text-sm text-gray-700",
                      trigger: "py-2",
                      content: "pb-4"
                    }}
                  >
                    {filteredSeries.map((s) => (
                      <AccordionItem 
                        key={s.id} 
                        aria-label={s.label}
                        title={
                          <div className="flex items-center gap-2">
                            <span className={s.color}>{s.icon}</span>
                            <span>{s.label}</span>
                            <Chip size="sm" variant="flat" color={s.chipColor} className="h-5 text-[10px] font-bold">
                              {s.posts.length}
                            </Chip>
                          </div>
                        }
                      >
                        <div className="flex flex-col gap-1 ml-4 border-l-2 border-gray-100 pl-4">
                          {s.posts.map((post, idx) => {
                            const isActive = pathname === post.href;
                            const isBookmarked = bookmarkedHrefs.includes(post.href);
                            
                            return (
                              <Link
                                key={idx}
                                href={post.href}
                                onClick={onClose}
                                className={`group relative flex flex-col py-2 px-3 rounded-xl transition-all ${
                                  isActive 
                                    ? 'bg-primary-50 text-primary shadow-sm' 
                                    : 'hover:bg-gray-50 text-gray-600'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className={`text-xs font-bold leading-snug ${isActive ? 'text-primary' : 'group-hover:text-primary'}`}>
                                    {post.ep ? `${post.ep} — ` : ''}{post.title}
                                  </span>
                                  {isBookmarked && (
                                    <Bookmark size={10} className="text-danger shrink-0" fill="currentColor" />
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
