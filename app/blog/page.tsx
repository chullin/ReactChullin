'use client';

import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Link, 
  User, 
  Divider,
  Chip
} from '@heroui/react';
import { 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  User as UserIcon,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const posts = [
    {
      title: "LeetCode Python 踩坑紀錄",
      subtitle: "那些刷題時讓我卡關的 Python 細節，整理給自己也給你",
      date: "April 30, 2026",
      author: "Joseph Chen",
      type: "Internal",
      href: "/blog/leetcode-python-pitfalls",
      isExternal: false,
      category: "Algorithm"
    },
    {
      title: "用 React + Next.js 打造個人作品集",
      subtitle: "從零開始，到 Vercel 部署上線的完整過程",
      date: "March 2026",
      author: "Joseph Chen",
      type: "Internal",
      href: "/blog/building-react-portfolio",
      isExternal: false,
      category: "Web Dev"
    },
    {
      title: "錄製音檔、安裝 TensorFlow、設置 Python 虛擬環境",
      subtitle: "請確保您已經安裝了適當的 GPU 驅動程序，並且您的 GPU 支持 CUDA",
      date: "December 16, 2023",
      author: "Joseph Chen",
      type: "External",
      href: "https://chullin.github.io/Exploring-Neural-Networks/",
      isExternal: true,
      category: "AI & Setup"
    },
    {
      title: "Man must explore, and this is exploration at its greatest",
      subtitle: "Problems look mighty small from 150 miles up",
      date: "August 24, 2023",
      author: "Joseph Chen",
      type: "Internal",
      href: "/blog/man-must-explore",
      isExternal: false,
      category: "Exploration"
    }
  ];

  return (
    <div className="bg-gray-50/30 min-h-screen pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-black tracking-tight mb-4 text-gradient">Blog</h1>
            <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              "How far a person can go, It's all about who you're traveling with."
            </p>
          </motion.div>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                isPressable
                as={Link}
                href={post.href}
                target={post.isExternal ? "_blank" : undefined}
                rel={post.isExternal ? "noopener noreferrer" : undefined}
                className="border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white w-full overflow-visible"
              >
                <CardBody className="p-8 sm:p-10">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Chip size="sm" variant="flat" color="primary" className="font-bold border-none uppercase text-[10px]">
                          {post.category}
                        </Chip>
                        <Chip size="sm" variant="dot" color={post.isExternal ? "warning" : "success"} className="font-bold border-none text-[10px]">
                          {post.type}
                        </Chip>
                      </div>
                      <div className="text-gray-400 group-hover:text-primary transition-colors">
                        {post.isExternal ? <ExternalLink size={20} /> : <ChevronRight size={24} />}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-lg leading-relaxed font-medium">
                        {post.subtitle}
                      </p>
                    </div>

                    <Divider className="opacity-50" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="bg-blue-50 text-blue-500 p-2 rounded-full">
                           <UserIcon size={16} />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-sm font-bold text-gray-700">{post.author}</span>
                           <div className="flex items-center gap-2 text-gray-400 text-xs">
                             <Calendar size={12} />
                             <span>{post.date}</span>
                           </div>
                         </div>
                      </div>
                      
                      <Button 
                        variant="light" 
                        color="primary" 
                        size="sm" 
                        className="font-bold"
                        endContent={<ArrowRight size={16} />}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State / Newsletter (Optional) */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="text-center pt-20"
        >
          <div className="bg-blue-50 p-12 rounded-[40px] space-y-6">
            <BookOpen size={48} className="mx-auto text-blue-500" />
            <h3 className="text-2xl font-black text-gray-900">More stories coming soon</h3>
            <p className="text-gray-500 font-medium">Stay tuned for more updates on AI, Embedded systems, and development tips.</p>
            <Button as={Link} href="/" color="primary" radius="full" className="font-bold px-8" variant="shadow">
              Explore Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
