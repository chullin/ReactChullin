'use client';

import { Card, CardBody, CardHeader, Chip, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: "Air-gapped AI Deployment",
    category: "AI Infrastructure",
    description: "Built and deployed offline Large Language Model (LLM) solutions using Ollama and Dify for secure, air-gapped manufacturing environments.",
    icon: <ShieldCheck className="text-emerald-500" />,
    tags: ["Ollama", "Dify", "Docker", "Linux"],
    href: "/blog/ai/ep01-airgapped-intro",
  },
  {
    title: "Test Management System (TMS)",
    category: "Automation",
    description: "Architected a comprehensive test management platform to streamline factory-wide testing processes and data collection for global production lines.",
    icon: <Database className="text-blue-500" />,
    tags: ["FastAPI", "PostgreSQL", "React", "Python"],
    href: "/blog/ai/ep09-tms",
  },
  {
    title: "OpenCV Vision Automation",
    category: "Robotics",
    description: "Developed high-precision vision systems for XY automation devices using OpenCV, enabling dynamic UI recognition and automated mobile testing.",
    icon: <Eye className="text-purple-500" />,
    tags: ["OpenCV", "Python", "Automation", "Computer Vision"],
    href: "/blog/ai/ep10-opencv-robot",
  }
];

export default function HomeProjects() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-black mb-4 tracking-tight text-slate-900">
              精選專案 <span className="text-gradient">Featured Projects</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              專注於解決智慧製造中的核心痛點，從 AI 基礎設施到自動化視覺系統。
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={project.href} className="block h-full group/card">
                <Card className="h-full border border-slate-200 shadow-sm group-hover/card:shadow-xl group-hover/card:-translate-y-2 transition-all duration-300 bg-white cursor-pointer">
                  <CardHeader className="flex gap-3 px-6 pt-8 pb-0">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      {project.icon}
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{project.category}</p>
                      <h3 className="text-xl font-black text-slate-900 leading-tight mt-1">{project.title}</h3>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-300 group-hover/card:text-slate-700 group-hover/card:translate-x-1 transition-all duration-200 mt-1 shrink-0"
                    />
                  </CardHeader>
                  <CardBody className="px-6 py-8">
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <Chip key={tag} size="sm" variant="flat" className="bg-slate-100 text-slate-600 font-bold text-[10px]">
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button
            as={Link}
            href="/blog"
            variant="light"
            radius="lg"
            className="font-bold text-slate-500 group"
            endContent={<ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />}
          >
            查看更多實戰案例
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
