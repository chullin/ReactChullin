'use client';

import {
  Card,
  CardBody,
  Button,
  Link,
  Divider,
  Chip,
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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { series, type Post, type Series } from '@/config/blog';

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
        <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
          {post.title}
        </p>
        <p className="text-xs text-gray-400 font-medium truncate">{post.subtitle}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] text-gray-300 font-bold">{post.date}</span>
        {post.isExternal
          ? <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
          : <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />}
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

function SeriesSection({ s, index }: { s: Series; index: number }) {
  const PREVIEW_COUNT = 5;
  const hasMany = s.posts.length > PREVIEW_COUNT;
  const [expanded, setExpanded] = useState(false);

  const visiblePosts = hasMany && !expanded ? s.posts.slice(0, PREVIEW_COUNT) : s.posts;
  const isEpSeries = s.id === 'leetcode' || s.id === 'web';

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

export default function BlogPage() {
  const totalPosts = series.reduce((acc, s) => acc + s.posts.length, 0);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');
    if (savedBookmarks.length > 0) {
      const allPosts = series.flatMap(s => s.posts);
      const matched = savedBookmarks.map((href: string) => allPosts.find(p => p.href === href)).filter(Boolean) as Post[];
      setBookmarkedPosts(matched);
    }
  }, []);

  return (
    <div className="bg-gray-50/30 min-h-screen pt-20 pb-32">
      <div className="max-w-3xl mx-auto px-6 space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-black tracking-tight text-gradient">Blog</h1>
          <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            "How far a person can go, it's all about who you're traveling with."
          </p>
          <div className="flex items-center justify-center gap-6 pt-2">
            {series.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`text-xs font-black ${s.color} opacity-60 hover:opacity-100 transition-opacity`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {series.map(s => (
            <a key={s.id} href={`#${s.id}`} className={`${s.bgColor} rounded-2xl p-4 flex flex-col gap-1 hover:shadow-md transition-shadow`}>
              <div className={`${s.color}`}>{s.icon}</div>
              <p className="text-lg font-black text-gray-800">{s.posts.length}</p>
              <p className="text-[10px] font-bold text-gray-400 leading-tight">{s.label}</p>
            </a>
          ))}
        </motion.div>

        {/* Bookmarks Section */}
        {bookmarkedPosts.length > 0 && (
          <div className="space-y-16">
            <SeriesSection 
              index={0}
              s={{
                id: 'bookmarks',
                label: '我的收藏',
                icon: <Bookmark size={22} />,
                color: 'text-red-500',
                bgColor: 'bg-red-50',
                chipColor: 'danger',
                description: '你儲存在這個瀏覽器中的文章',
                posts: bookmarkedPosts
              }} 
            />
          </div>
        )}

        {/* Series Sections */}
        <div className="space-y-16">
          {series.map((s, i) => (
            <div key={s.id} id={s.id}>
              <SeriesSection s={s} index={i} />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <div className="bg-blue-50 p-12 rounded-[40px] space-y-4">
            <BookOpen size={40} className="mx-auto text-blue-400" />
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
  );
}
