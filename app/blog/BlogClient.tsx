'use client';

import {
  Card,
  CardBody,
  Button,
  Link,
  Divider,
  Chip,
  Input,
} from '@heroui/react';
import {
  Calendar,
  ArrowRight,
  BookOpen,
  ExternalLink,
  ChevronRight,
  User as UserIcon,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Search,
  Tags,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { series, type Post, type Series } from '@/config/blog';

type BlogSearchResult = {
  href: string;
  score: number;
};

const normalizeSearchText = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

// Compact row for EP posts
function EpRow({ post, color }: { post: Post; color: string }) {
  return (
    <Link
      href={post.href}
      className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-colors group"
    >
      {post.ep && (
        <span className={`text-[10px] font-black tracking-widest w-12 shrink-0 ${color} opacity-70`}>
          {post.ep}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 group-hover:text-orange-700 transition-colors truncate">
          {post.title}
        </p>
        <p className="text-xs text-gray-400 font-medium truncate">{post.subtitle}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] text-gray-300 font-bold">{post.date}</span>
        {post.isExternal
          ? <ExternalLink size={14} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
          : <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-500 transition-colors" />}
      </div>
    </Link>
  );
}

// Full card for featured / non-EP posts
function PostCard({ post }: { post: Post }) {
  return (
    <Card
      isPressable
      as={Link}
      href={post.href}
      target={post.isExternal ? '_blank' : undefined}
      rel={post.isExternal ? 'noopener noreferrer' : undefined}
      className="border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white w-full"
    >
      <CardBody className="p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-black text-gray-900 leading-snug">{post.title}</h3>
            {post.isExternal
              ? <ExternalLink size={16} className="text-gray-300 shrink-0 mt-0.5" />
              : <ChevronRight size={18} className="text-gray-300 shrink-0 mt-0.5" />}
          </div>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">{post.subtitle}</p>
          <Divider className="opacity-40" />
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <UserIcon size={12} />
            <span className="font-bold">{post.author}</span>
            <span className="opacity-50">·</span>
            <Calendar size={12} />
            <span>{post.date}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function SeriesSection({ s, index, isSearching }: { s: Series; index: number; isSearching?: boolean }) {
  const PREVIEW_COUNT = 5;
  const hasMany = s.posts.length > PREVIEW_COUNT;
  const [expanded, setExpanded] = useState(false);

  // When searching, we show all matching posts instead of collapsing
  const visiblePosts = (hasMany && !expanded && !isSearching) ? s.posts.slice(0, PREVIEW_COUNT) : s.posts;
  const isEpSeries = ['leetcode', 'web', 'web-dev', 'js', 'ai', 'embedded', 'python', 'lang', 'devops', 'network', 'system-design', 'database'].includes(s.id);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-10 h-10 rounded-2xl ${s.bgColor} ${s.color} flex items-center justify-center shrink-0`}>
          {s.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className={`text-xl font-black ${s.color}`}>{s.label}</h2>
            <Chip size="sm" variant="flat" color={s.chipColor} className="font-bold text-[10px]">
              {s.posts.length} 篇{s.comingSoon && s.comingSoon.length > 0 ? ` · ${s.comingSoon.length} 即將推出` : ''}
            </Chip>
          </div>
          <p className="text-sm text-gray-400 font-medium mt-0.5">{s.description}</p>
        </div>
      </div>

      {/* Posts */}
      {s.posts.length === 0 ? (
        <div className="bg-gray-50/60 rounded-3xl p-8 text-center space-y-2">
          <p className="text-sm font-bold text-gray-400">敬請期待</p>
          {s.comingSoon && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {s.comingSoon.map(t => (
                <Chip key={t} size="sm" variant="flat" color="default" className="text-[10px] font-bold opacity-60">{t}</Chip>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={`bg-white rounded-3xl shadow-sm overflow-hidden ${isEpSeries ? 'divide-y divide-gray-50' : 'grid sm:grid-cols-2 gap-3 bg-transparent shadow-none'}`}>
          {isEpSeries ? (
            <>
              {visiblePosts.map((post, i) => (
                <EpRow key={i} post={post} color={s.color} />
              ))}
              {hasMany && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-black ${s.color} opacity-70 hover:opacity-100 transition-opacity`}
                >
                  {expanded ? (
                    <><ChevronUp size={14} /> 收起</>
                  ) : (
                    <><ChevronDown size={14} /> 展開全部 {s.posts.length} 篇</>
                  )}
                </button>
              )}
              {/* Coming Soon for EP series */}
              {s.comingSoon && s.comingSoon.length > 0 && (
                <div className="px-4 py-3 flex items-center gap-3 flex-wrap opacity-40">
                  {s.comingSoon.map(t => (
                    <span key={t} className="text-xs font-bold text-gray-400 border border-dashed border-gray-300 px-3 py-1 rounded-full">
                      {t} — 即將推出
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            visiblePosts.map((post, i) => <PostCard key={i} post={post} />)
          )}
        </div>
      )}
    </motion.section>
  );
}

function CategoryNav({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <nav aria-label="Blog categories" className={compact ? 'w-full' : 'space-y-3'}>
      {!compact && (
        <div className="flex items-center gap-2 px-1 text-xs font-black uppercase tracking-[0.18em] text-gray-400">
          <Tags size={14} />
          分類
        </div>
      )}
      <div className={compact ? 'flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden' : 'space-y-2'}>
        {series.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={[
              'group flex items-center gap-3 bg-white/80 shadow-sm ring-1 ring-gray-100 transition-all hover:bg-white hover:shadow-md',
              compact ? 'min-w-max rounded-full px-3 py-2' : 'rounded-2xl px-3 py-3',
            ].join(' ')}
          >
            <span className={`${s.bgColor} ${s.color} flex h-8 w-8 shrink-0 items-center justify-center rounded-xl`}>
              {s.icon}
            </span>
            <span className={compact ? 'text-xs font-black text-gray-700' : 'min-w-0 flex-1'}>
              <span className={compact ? '' : 'block truncate text-sm font-black text-gray-800 group-hover:text-gray-950'}>
                {s.label}
              </span>
              {!compact && (
                <span className="block text-[11px] font-bold text-gray-400">
                  {s.posts.length} 篇文章
                </span>
              )}
            </span>
            {!compact && <ChevronRight size={15} className="shrink-0 text-gray-300 group-hover:text-gray-500" />}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function BlogPage() {
  const totalPosts = series.reduce((acc, s) => acc + s.posts.length, 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [contentResults, setContentResults] = useState<BlogSearchResult[]>([]);
  const [isContentSearching, setIsContentSearching] = useState(false);
  const [isSearchDocked, setIsSearchDocked] = useState(false);
  const [sidebarExitProgress, setSidebarExitProgress] = useState(0);
  const [showCategoryFade, setShowCategoryFade] = useState(false);
  const categoryScrollerRef = useRef<HTMLDivElement | null>(null);

  const normalizedSearchQuery = normalizeSearchText(searchQuery.trim());
  const isSearching = normalizedSearchQuery.length > 0;
  const contentMatchHrefs = useMemo(
    () => new Set(contentResults.map(result => result.href)),
    [contentResults]
  );

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');
    if (savedBookmarks.length > 0) {
      const allPosts = series.flatMap(s => s.posts);
      const matched = savedBookmarks.map((href: string) => allPosts.find(p => p.href === href)).filter(Boolean) as Post[];
      setBookmarkedPosts(matched);
    }
  }, []);

  useEffect(() => {
    let frameId: number | null = null;

    const updateSearchDock = () => {
      setIsSearchDocked(window.scrollY > 96);

      const footer = document.querySelector('footer');
      const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const fadeDistance = 260;
      const progress = Math.min(Math.max((window.innerHeight + 80 - footerTop) / fadeDistance, 0), 1);
      setSidebarExitProgress(progress);
    };

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateSearchDock();
      });
    };

    updateSearchDock();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    const scroller = categoryScrollerRef.current;

    if (!scroller) {
      return;
    }

    const updateCategoryFade = () => {
      const hasMoreContent = scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 8;
      setShowCategoryFade(hasMoreContent);
    };

    updateCategoryFade();
    scroller.addEventListener('scroll', updateCategoryFade, { passive: true });
    window.addEventListener('resize', updateCategoryFade);

    return () => {
      scroller.removeEventListener('scroll', updateCategoryFade);
      window.removeEventListener('resize', updateCategoryFade);
    };
  }, []);

  useEffect(() => {
    if (!isSearching) {
      setContentResults([]);
      setIsContentSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsContentSearching(true);

      try {
        const response = await fetch(`/api/blog-search?q=${encodeURIComponent(searchQuery.trim())}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          setContentResults([]);
          return;
        }

        const data = await response.json() as { results?: BlogSearchResult[] };
        setContentResults(data.results ?? []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setContentResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsContentSearching(false);
        }
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [isSearching, searchQuery]);

  const isPostMatch = (post: Post) =>
    normalizeSearchText(post.title).includes(normalizedSearchQuery) ||
    normalizeSearchText(post.subtitle).includes(normalizedSearchQuery) ||
    contentMatchHrefs.has(post.href);

  const filteredSeries = series.map(s => {
    const isSeriesMatch = normalizeSearchText(s.label).includes(normalizedSearchQuery) ||
                         normalizeSearchText(s.description).includes(normalizedSearchQuery);
    
    // If series matches, show all its posts. Otherwise, filter posts by title/subtitle.
    const filteredPosts = isSeriesMatch 
      ? s.posts 
      : s.posts.filter(isPostMatch);

    return { ...s, posts: filteredPosts };
  }).filter(s => s.posts.length > 0);

  const filteredBookmarks = bookmarkedPosts.filter(isPostMatch);

  return (
    <div className="bg-gray-50/30 min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center space-y-4"
        >
          <h1 className="text-5xl font-black tracking-tight text-gradient">Blog</h1>
          <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            "How far a person can go, it's all about who you're traveling with."
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={[
            'sticky top-16 z-30 mx-[calc(50%-50vw)] mt-8 px-5 pb-4 pt-3 transition-all duration-300 sm:px-6 lg:px-8',
            isSearchDocked
              ? 'border-b border-white/40 bg-white/[0.72] backdrop-blur-sm'
              : 'border-b border-transparent bg-transparent backdrop-blur-0',
          ].join(' ')}
        >
          <div className="mx-auto max-w-3xl space-y-3">
            <Input
              value={searchQuery}
              onValueChange={setSearchQuery}
              placeholder="搜尋標題、類別或文章內容 (如: python Counter, Tailwind, Ollama)..."
              radius="lg"
              size="lg"
              variant="flat"
              className="group"
              classNames={{
                inputWrapper: [
                  'relative overflow-hidden rounded-[24px] border border-white/[0.34] bg-white/[0.18] shadow-[0_16px_42px_rgba(251,146,60,0.18),0_3px_12px_rgba(234,88,12,0.10)] backdrop-blur-[3px]',
                  'outline outline-1 -outline-offset-1 outline-white/[0.16] transition-[background,border-color,border-radius,box-shadow,transform] duration-300 ease-out',
                  'before:pointer-events-none before:absolute before:inset-px before:rounded-[23px] before:border before:border-white/[0.26] before:content-[""]',
                  'after:pointer-events-none after:absolute after:inset-0 after:rounded-[24px] after:bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.52),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.22),transparent_38%,rgba(255,255,255,0.12)_68%,transparent)] after:opacity-70 after:content-[""]',
                  'hover:[transform:scale(1.006)] hover:rounded-[28px] hover:border-white/[0.48] hover:!bg-white/[0.26] hover:shadow-[0_20px_48px_rgba(251,146,60,0.22),0_5px_16px_rgba(234,88,12,0.13)]',
                  'data-[hover=true]:[transform:scale(1.006)] data-[hover=true]:rounded-[28px] data-[hover=true]:border-white/[0.48] data-[hover=true]:!bg-white/[0.26] data-[hover=true]:shadow-[0_20px_48px_rgba(251,146,60,0.22),0_5px_16px_rgba(234,88,12,0.13)]',
                  'group-hover:before:rounded-[27px] group-hover:after:rounded-[28px] group-active:[transform:scale(0.998)]',
                ].join(' '),
                innerWrapper: "relative z-10",
                input: "font-medium text-gray-700",
              }}
              startContent={<Search size={20} className="text-gray-400 group-hover:text-orange-600 transition-colors" />}
              isClearable
            />
            {isContentSearching && (
              <p className="px-1 text-xs font-bold text-gray-400">正在搜尋文章內容...</p>
            )}
            <div className="lg:hidden">
              <CategoryNav compact />
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <aside className="hidden lg:sticky lg:top-40 lg:flex lg:h-[calc(100vh-11rem)] lg:min-h-0 lg:flex-col lg:space-y-4">
            <div
              className="flex min-h-0 flex-1 flex-col space-y-4 transition-[opacity,transform] duration-300 ease-out"
              style={{
                opacity: 1 - sidebarExitProgress * 0.86,
                transform: `translateY(${sidebarExitProgress * 18}px)`,
                pointerEvents: sidebarExitProgress > 0.85 ? 'none' : 'auto',
              }}
            >
            <div className="shrink-0 rounded-2xl bg-white/85 p-4 shadow-sm ring-1 ring-gray-100">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-400">Total</p>
              <p className="mt-1 text-2xl font-black text-gray-900">{totalPosts}</p>
              <p className="mt-1 text-xs font-bold text-gray-400">篇文章，依主題快速切換。</p>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <div
                ref={categoryScrollerRef}
                className="blog-scrollbar-hidden h-full overflow-y-auto overscroll-contain pb-5 pr-1 [scroll-padding-bottom:1.25rem]"
              >
                <CategoryNav />
              </div>
              {showCategoryFade && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-50/95 via-gray-50/70 to-transparent" />
              )}
            </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-12">
            {/* Bookmarks Section */}
            {filteredBookmarks.length > 0 && (
              <div className="space-y-16">
                <SeriesSection 
                  index={0}
                  isSearching={isSearching}
                  s={{
                    id: 'bookmarks',
                    label: '我的收藏',
                    icon: <Bookmark size={22} />,
                    color: 'text-red-500',
                    bgColor: 'bg-red-50',
                    chipColor: 'danger',
                    description: '你儲存在這個瀏覽器中的文章',
                    posts: filteredBookmarks
                  }} 
                />
              </div>
            )}

            {/* Series Sections */}
            <div className="space-y-16">
              {filteredSeries.length > 0 ? (
                filteredSeries.map((s, i) => (
                  <div key={s.id} id={s.id} className="scroll-mt-40 lg:scroll-mt-28">
                    <SeriesSection s={s} index={i} isSearching={isSearching} />
                  </div>
                ))
              ) : (
                <div className="text-center py-20 space-y-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Search size={32} className="text-gray-300" />
                  </div>
                  <p className="text-gray-400 font-bold text-lg italic">找不到與「{searchQuery}」相關的文章</p>
                  <Button 
                    variant="light" 
                    color="primary" 
                    className="font-bold"
                    onClick={() => setSearchQuery('')}
                  >
                    清除搜尋
                  </Button>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center"
            >
              <div className="bg-orange-50 p-12 rounded-[40px] space-y-4">
                <BookOpen size={40} className="mx-auto text-orange-400" />
                <h3 className="text-xl font-black text-gray-900">持續更新中</h3>
                <p className="text-gray-400 font-medium text-sm">
                  目前共 {totalPosts} 篇文章，新主題持續增加。
                </p>
                <Button as={Link} href="/" color="primary" radius="full" className="font-bold px-8" variant="shadow">
                  返回首頁
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
