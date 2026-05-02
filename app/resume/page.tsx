'use client';

import { 
  Card, 
  CardBody, 
  Button, 
  Chip, 
  Divider, 
  Link, 
  Image 
} from '@heroui/react';
import { 
  Download, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Cpu, 
  Globe, 
  Calendar,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumePage() {
  const experiences = [
    {
      company: "鴻海科技集團 Foxconn",
      title: "軟體研發工程師",
      period: "Jun 2024 - Present",
      logo: "/assets/foxconn.jpg",
      description: [
        "負責維護與開發測試管理系統（TMS, Test Management System）",
        "撰寫 iPhone 手機腳本與測試腳本",
        "進行機械手臂開發"
      ]
    },
    {
      company: "Sound Control Technology",
      title: "軟韌體工程師",
      period: "Sep 2023 - Jun 2024",
      logo: "/assets/SCT.png",
      description: [
        "使用 Tkinter 在 Raspberry Pi 上進行 GUI 開發，可自動化測試和設置參數",
        "使用 Python 透過 UART 和 I²C 和後端溝通，實現指令發送與接收",
        "參與團隊合作確保機器正常運作，並添加 EDID 新測試項目與流程更新"
      ]
    },
    {
      company: "國立中正大學",
      title: "助理研究員",
      period: "Dec 2020 - Sep 2022",
      logo: "/assets/CCU.png",
      description: [
        "利用 SpecAugment 減少原始語料量，微調模型使輸出與目標 90% 相似，並於嵌入式系統實現 Transformer TTS",
        "參與科技部計畫，結合 AI 開發中風/腦性麻痺患者日常溝通輔具",
        "研究傳統 TTS 並於 Apollo 3 Blue 實現低功耗三階段漸進式啟動 (VAD/KWS)"
      ]
    }
  ];

  const education = [
    {
      school: "國立中正大學",
      degree: "資訊工程所 (CSIE) · Master's Degree",
      period: "Jul 2020 - Dec 2022",
      logo: "/assets/CCU.png",
      details: {
        lab: "單晶片系統實驗室 System on a Chip (SoC)",
        advisor: "林泰吉 副教授",
        thesis: {
          title: "基於變換器之文字與音轉換研究及其嵌入式實現",
          link: "https://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi?o=dnclcdr&s=id=%22111CCU00392004%22.&searchmode=basic"
        }
      }
    },
    {
      school: "國立金門大學",
      degree: "資訊工程系 (CSIE) · Bachelor's Degree",
      period: "Sep 2016 - Jun 2020",
      logo: "/assets/NQU.png",
      details: {
        lab: "計算智能與人機交互實驗室 CI",
        advisor: "趙於翔 副教授",
        project: {
          title: "以 LoRa 為基礎之失智老人輔助裝置設計",
          link: "https://www.airitilibrary.com/Article/Detail/P20191126001-201911-201911260014-201911260014-223-226"
        }
      }
    }
  ];

  return (
    <div className="bg-gray-50/30 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-black tracking-tight mb-4 text-gradient">Resume</h1>
            <p className="text-gray-500 text-xl font-medium">My professional journey and skills</p>
          </motion.div>
        </div>

        {/* Experience Section */}
        <section className="space-y-12">
          <div className="flex items-center justify-between border-l-4 border-blue-500 pl-6">
            <div className="flex items-center gap-3">
              <Briefcase size={32} className="text-blue-500" />
              <h2 className="text-3xl font-black tracking-tight">Experience</h2>
            </div>
            <Button
              as={Link}
              href="https://drive.usercontent.google.com/download?id=1Y7-ZQm6389M_FmAKiWLb_vMu2TzWLVwB&export=download"
              variant="flat"
              color="primary"
              radius="full"
              className="font-bold"
              startContent={<Download size={18} />}
            >
              Download PDF
            </Button>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white group">
                  <CardBody className="p-8 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-8">
                    <div className="flex flex-col items-center gap-4">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        className="w-16 h-16 object-contain rounded-xl p-1 bg-white shadow-sm border border-gray-50"
                      />
                      <Chip size="sm" variant="flat" color="default" className="font-bold text-[10px] uppercase">
                        {exp.period.split(" - ")[0]}
                      </Chip>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="text-2xl font-black text-gray-800">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-primary font-bold bg-primary/5 px-3 py-1 rounded-full text-sm">
                          <Globe size={14} />
                          {exp.company}
                        </div>
                      </div>
                      <Divider className="opacity-50" />
                      <ul className="space-y-3">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="space-y-12">
          <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-6">
            <GraduationCap size={32} className="text-blue-500" />
            <h2 className="text-3xl font-black tracking-tight">Education</h2>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                  <CardBody className="p-8 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-8">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <Image
                        src={edu.logo}
                        alt={edu.school}
                        className="w-16 h-16 object-contain rounded-xl p-1 bg-white shadow-sm border border-gray-50"
                      />
                      <Chip size="sm" variant="flat" color="default" className="font-bold text-[10px] uppercase">
                        {edu.period.split(" - ")[0]}
                      </Chip>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="text-2xl font-black text-gray-800">{edu.school}</h3>
                        <div className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full text-sm">
                          <Calendar size={14} />
                          {edu.period}
                        </div>
                      </div>
                      <p className="text-gray-500 font-bold">{edu.degree}</p>
                      
                      <div className="bg-gray-50 p-6 rounded-2xl space-y-2 border border-gray-100">
                        <p className="text-sm font-medium text-gray-600">
                          <span className="font-bold text-gray-900">Lab:</span> {edu.details.lab}
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                          <span className="font-bold text-gray-900">Advisor:</span> {edu.details.advisor}
                        </p>
                        {edu.details.thesis && (
                          <div className="text-sm pt-2">
                            <span className="font-bold text-gray-900 block mb-2">Thesis:</span>
                            <Link 
                              isExternal 
                              href={edu.details.thesis.link} 
                              className="text-primary font-bold flex items-center gap-2 hover:underline"
                            >
                              {edu.details.thesis.title}
                              <ExternalLink size={14} />
                            </Link>
                          </div>
                        )}
                        {edu.details.project && (
                          <div className="text-sm pt-2">
                            <span className="font-bold text-gray-900 block mb-2">Project:</span>
                            <Link 
                              isExternal 
                              href={edu.details.project.link} 
                              className="text-primary font-bold flex items-center gap-2 hover:underline"
                            >
                              {edu.details.project.title}
                              <ExternalLink size={14} />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-12">
          <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-6">
            <Code2 size={32} className="text-blue-500" />
            <h2 className="text-3xl font-black tracking-tight">Technical Skills</h2>
          </div>

          <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50/30">
            <CardBody className="p-10 space-y-10">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Languages</h4>
                <div className="flex flex-wrap gap-3">
                  {["Python", "C", "JavaScript"].map(skill => (
                    <Chip key={skill} variant="shadow" color="default" className="font-bold border-none bg-white text-gray-800 px-4 py-1" size="lg">
                      {skill}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Artificial Intelligence</h4>
                <div className="flex flex-wrap gap-3">
                  {["Transformer-based TTS", "Voice Activity Detection (DNN)", "Digital Image Processing (CNN)"].map(skill => (
                    <Chip key={skill} variant="shadow" color="default" className="font-bold border-none bg-white text-gray-800 px-4 py-1" size="lg">
                      {skill}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Embedded Systems</h4>
                <div className="flex flex-wrap gap-3">
                  {["DNN on ZedBoard", "Apollo3 Blue VAD & KWS", "LoRa & GPS on Seeeduino"].map(skill => (
                    <Chip key={skill} variant="shadow" color="default" className="font-bold border-none bg-white text-gray-800 px-4 py-1" size="lg">
                      {skill}
                    </Chip>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  );
}
