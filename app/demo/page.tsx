'use client';

import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Link, 
  Image, 
  Divider,
  Chip,
  Badge
} from '@heroui/react';
import { 
  Play, 
  Download, 
  ExternalLink, 
  Video, 
  Layers, 
  Cpu, 
  FileVideo,
  MonitorPlay,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DemoPage() {
  const demos = [
    {
      title: "Ollama Demo",
      description: "展示基於 Ollama 的模型應用與實作效果。",
      image: "/assets/ollama.png",
      href: "https://chullin.github.io/fullVideo/ollama-demo_small.mp4",
      isExternal: true,
      color: "primary",
      icon: <Cpu size={24} />,
      type: "Model Demo"
    },
    {
      title: "影之強者 第一集",
      description: "陰の実力者になりたくて！ (一次載入，速度慢)",
      image: "/assets/shadow.jpg",
      href: "https://chullin.github.io/fullVideo/shadow.mp4",
      isExternal: true,
      color: "success",
      icon: <FileVideo size={24} />,
      type: "Anime Demo"
    },
    {
      title: "Segmented Video Player",
      description: "自製影片分段播放器，可流暢播放多段串流內容。",
      image: null,
      href: "/video-player",
      isExternal: false,
      color: "danger",
      icon: <MonitorPlay size={24} />,
      type: "Web Tool"
    }
  ];

  const downloads = [
    {
      label: "Download BarCode_中英文版.7z",
      href: "https://drive.usercontent.google.com/download?id=1667ESrfPS-oUpMkiJE-BvNbUp1bJhQ8v&export=download&authuser=0",
      size: "Large"
    },
    {
      label: "Download BarCode_Code.7z",
      href: "https://drive.usercontent.google.com/download?id=10IwoqmqRAe8G60iHKecVa8Vf2j2QgfzA&export=download&authuser=0&confirm=t",
      size: "Source"
    }
  ];

  return (
    <div className="bg-gray-50/30 min-h-screen pt-20 pb-32 px-6">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip 
              variant="flat" 
              color="primary" 
              size="lg" 
              className="font-black uppercase tracking-widest px-6"
            >
              Demo Showcase
            </Chip>
            <h1 className="text-5xl font-black tracking-tight text-gray-900 mt-6 mb-4">🎬 實作展示中心</h1>
            <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              匯集了各種技術研究、專案演示與多媒體工具的展示平台。
            </p>
          </motion.div>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                isHoverable 
                className="border-none shadow-sm hover:shadow-2xl transition-all duration-300 bg-white group h-full"
              >
                <CardBody className="p-8 flex flex-col items-center text-center space-y-6">
                  <div className={`p-4 rounded-3xl bg-${demo.color}/10 text-${demo.color} mb-2 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                    {demo.icon}
                  </div>
                  
                  {demo.image ? (
                    <div className="relative group/img overflow-hidden rounded-2xl border border-gray-100 shadow-inner p-2 bg-gray-50">
                      <Image
                        src={demo.image}
                        alt={demo.title}
                        className="w-full max-h-[120px] object-contain rounded-xl group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="w-full h-[120px] bg-red-50 rounded-2xl flex items-center justify-center border border-red-100 p-8">
                       <Layers size={48} className="text-red-300" />
                    </div>
                  )}

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-center gap-2">
                       <h3 className="text-xl font-black text-gray-900 leading-tight">
                         {demo.title}
                       </h3>
                    </div>
                    <p className="text-gray-500 font-medium text-sm">
                      {demo.description}
                    </p>
                    <Chip size="sm" variant="dot" color={demo.color as any} className="font-bold border-none text-[10px]">
                      {demo.type}
                    </Chip>
                  </div>

                  <Button
                    as={Link}
                    href={demo.href}
                    target={demo.isExternal ? "_blank" : undefined}
                    rel={demo.isExternal ? "noopener noreferrer" : undefined}
                    color={demo.color as any}
                    variant="shadow"
                    className="w-full font-black py-6 rounded-2xl shadow-xl shadow-opacity-20"
                    endContent={demo.isExternal ? <ExternalLink size={18} /> : <ArrowRight size={18} />}
                  >
                    {demo.isExternal ? 'Watch Demo' : 'Open Player'}
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Download Section */}
        <section className="pt-20">
          <Card className="border-none bg-blue-600 shadow-2xl p-8 sm:p-16 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-800 rounded-full blur-3xl opacity-50" />
            
            <CardBody className="p-0 flex flex-col items-center text-center space-y-10 relative z-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-white tracking-tight">Resources & Source Code</h2>
                <p className="text-blue-100 text-lg font-medium">取得專案相關的檔案與原始碼資源袋。</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
                {downloads.map((dl, i) => (
                  <Button
                    key={i}
                    as={Link}
                    href={dl.href}
                    className="flex-1 bg-white text-blue-600 font-bold py-8 text-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform group"
                    startContent={<Download className="group-hover:translate-y-0.5 transition-transform" size={24} />}
                  >
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[10px] uppercase font-black tracking-widest opacity-60 text-blue-400">{dl.size} Package</span>
                      <span>{dl.label.replace('Download ', '')}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  );
}
