'use client';

import { 
  Card, 
  CardBody, 
  Button, 
  Chip, 
  Image, 
  Link,
  Divider
} from '@heroui/react';
import { 
  Code2, 
  Cpu, 
  ArrowRight, 
  ExternalLink,
  Layers,
  Zap,
  Mic2,
  Navigation
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const projects = [
    {
      title: "Automated Multi-Interface Test and Control System",
      description: "這是一款自動化測試系統，用於測試公司產品的各種介面，例如網路、音訊、視訊 (Video、HDMI)、供電、晶圓指令、產品連線狀態等等。系統基於 Raspberry Pi 控制板，搭配觸控面板實現全方位自動化檢測。",
      responsibilities: [
        "使用 Python 和 Tkinter 開發 GUI 介面，實現自動化測試和設置測試參數。",
        "控制 Raspberry Pi 啟動、停止、收集數據，並整合硬體設備。",
        "使用 UART 和 I2C 與後端通訊，達成高效的指令發送與接收。",
        "負責測試機台的長期維護與性能優化。"
      ],
      image: "/assets/Tester.png",
      tags: ["Python", "Tkinter", "Raspberry Pi", "Hardware Control"],
      icon: <Zap className="text-yellow-500" size={24} />
    },
    {
      title: "Study of Transformer-based TTS and Embedded Implementation",
      description: "研究 Transformer 架構在語音合成 (TTS) 領域的應用。利用少量語料對特定人士進行微調訓練，使合成音色與目標對象相似度高達 90%，並成功將複雜模型移植至資源有限的嵌入式系統中。",
      responsibilities: [
        "基於 Linux 平台與 PyTorch 框架進行模型訓練與研究。",
        "將 Python 訓練完成的參數搬移至自行開發的 C 語言版本 Transformer 中。",
        "優化嵌入式系統上的運算效率，達成即時語音合成。"
      ],
      image: "/assets/Tranformer.png",
      tags: ["AI", "PyTorch", "C Language", "Embeded"],
      icon: <Layers className="text-blue-500" size={24} />
    },
    {
      title: "溝通輔具之人工智慧系統 (VC 轉換)",
      description: "參與科技部旗艦型計畫，開發協助中風、腦性麻痺及構音異常病患的溝通輔具。透過 AI 技術進行語音轉換 (Voice Conversion)，提升患者語音的清晰度與可理解度。",
      responsibilities: [
        "使用 MATLAB 分析語詞特性，並執行 VC 轉換演算法。",
        "使用 C 語言實作關鍵運算模組：FFT、IFFT、Norm、DNN。",
        "整合 Zedboard 硬體開發板，實現即時錄音、運算與播放流程。"
      ],
      image: "/assets/VC.png",
      tags: ["MATLAB", "Zedboard", "C Language", "Signal Processing"],
      icon: <Mic2 className="text-purple-500" size={24} />
    },
    {
      title: "Voice Switch Based on Hierarchical KWS",
      description: "開發極低功耗的聲控裝置，結合睡眠、人聲判斷 (VAD) 與關鍵字辨識 (KWS) 的漸進式開啟機制。系統平時處於深度睡眠，僅在偵測到人聲與關鍵字時才逐步喚醒，大幅延長續航力。",
      responsibilities: [
        "訓練 DNN 模型達成精確的人聲語音識別 (VAD)。",
        "開發高效的關鍵字辨識 (KWS) 演算法。",
        "於 Apollo 3 Blue 超低功耗晶片上實作並優化系統。",
        "負責專案交接之開發測試與完整說明文件撰寫。"
      ],
      image: "/assets/VAD_KWS.png",
      tags: ["Low Power", "Apollo3 Blue", "DNN", "VAD/KWS"],
      icon: <Code2 className="text-green-500" size={24} />
    },
    {
      title: "以 LoRa 為基礎之失智老人輔助裝置設計",
      description: "運用 LoRa 低功耗廣域網路技術，結合 GPS 定位研發的一款失智老人輔助裝置。旨在解決失智者走失問題，提供超長續航力與廣域追蹤能力，提升佩戴者的安全性。",
      responsibilities: [
        "使用 C 語言編寫 Arduino 韌體，整合 LoRa 傳輸與 GPS 模組。",
        "進行實地 LoRa 通訊距離測試與訊號優化。",
        "確保裝置在極端環境下的定位準確性與通訊穩定性。"
      ],
      image: "/assets/LoRa.png",
      tags: ["LoRa", "Arduino", "GPS", "IoT"],
      icon: <Navigation className="text-red-500" size={24} />
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-20 pb-0">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-black tracking-tight mb-4 text-gradient">Projects</h1>
            <p className="text-gray-500 text-xl font-medium">Turning complex theories into working solutions.</p>
          </motion.div>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden group">
                <CardBody className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0">
                    <div className="p-10 lg:p-16 space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-50 p-3 rounded-2xl">
                          {project.icon}
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <Chip key={tag} variant="flat" color="primary" size="sm" className="font-bold border-none capitalize">
                            {tag}
                          </Chip>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-black text-blue-600 text-sm uppercase tracking-widest flex items-center gap-2">
                            <span className="w-4 h-0.5 bg-blue-600" /> 專案說明
                          </h4>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        <div className="space-y-2 pt-4">
                          <h4 className="font-black text-blue-600 text-sm uppercase tracking-widest flex items-center gap-2">
                            <span className="w-4 h-0.5 bg-blue-600" /> 負責項目
                          </h4>
                          <ul className="space-y-3">
                            {project.responsibilities.map((res, i) => (
                              <li key={i} className="flex items-start gap-3 text-gray-600">
                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                <span className="text-base font-medium">{res}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50/50 flex items-center justify-center p-8 lg:p-16 relative overflow-hidden group-hover:bg-blue-50/50 transition-colors duration-500">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="w-full max-w-[450px] shadow-2xl rounded-2xl border-none object-contain transition-all duration-500 p-4 bg-white"
                        />
                      </motion.div>
                      {/* Decorative elements */}
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hero CTA section */}
      <section className="mt-32 py-32 relative overflow-hidden bg-white text-center">
        <div className="absolute inset-0 bg-blue-600 -skew-y-3 origin-center scale-110 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Let's build something <br />
            amazing together.
          </h2>
          <Button
            as={Link}
            href="/contact"
            color="secondary"
            variant="shadow"
            size="lg"
            className="bg-white text-blue-600 font-bold px-12 py-8 text-xl rounded-full shadow-2xl hover:scale-105 transition-transform"
            endContent={<ExternalLink size={24} />}
          >
            Contact Me
          </Button>
        </div>
      </section>
    </div>
  );
}
