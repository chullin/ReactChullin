'use client';

import { 
  Button, 
  Card, 
  CardBody, 
  Chip, 
  Image, 
  Link, 
  Divider 
} from '@heroui/react';
import { 
  Code2, 
  Cpu, 
  ArrowRight, 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  Phone,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const handleContactAlert = () => {
    alert('聯絡方式：(+886) 960-967-058');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <Chip 
              variant="flat" 
              color="primary" 
              className="mb-6 font-bold uppercase tracking-wider"
              size="lg"
            >
              Software &middot; Engineer
            </Chip>
            
            <h2 className="text-2xl font-medium text-gray-500 mb-2">
              陳憲億 (Sian-Yi Chen)
            </h2>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="text-gradient">I think,</span><br />
              therefore I am
            </h1>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              <Button
                as={Link}
                href="/resume"
                color="primary"
                size="lg"
                className="font-bold px-8 shadow-lg shadow-blue-500/20 w-full sm:w-auto"
                endContent={<ArrowRight size={20} />}
              >
                View Resume
              </Button>
              <Button
                as={Link}
                href="/blog"
                variant="flat"
                color="primary"
                size="lg"
                className="font-bold px-8 w-full sm:w-auto"
                startContent={<BookOpen size={18} />}
              >
                Read Blog
              </Button>
              <Button
                as={Link}
                href="/projects"
                variant="bordered"
                color="default"
                size="lg"
                className="font-bold px-8 w-full sm:w-auto"
              >
                Projects
              </Button>
            </div>
          </motion.div>

          {/* Profile Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center relative"
          >
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              {/* Animated Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-2xl opacity-10 animate-pulse" />
              
              <div className="absolute inset-4 bg-white rounded-full p-2 shadow-xl ring-8 ring-blue-50/50 overflow-hidden">
                <Image
                  src="/assets/profile3.png"
                  alt="Joseph Chen Profile"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-12 z-20"
              >
                <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-sm">
                  <CardBody className="flex flex-row items-center gap-3 p-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                      <Code2 size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-none">Software</p>
                      <p className="text-gray-500 text-xs mt-1">Engineer</p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-12 z-20"
              >
                <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-sm">
                  <CardBody className="flex flex-row items-center gap-3 p-3">
                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-none">Python</p>
                      <p className="text-gray-500 text-xs mt-1">2+ Years Exp.</p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black mb-8 tracking-tight">
              About <span className="text-gradient">Me</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 font-medium">
              Hello~ 🙌 我叫 陳憲億
            </p>

            <Card className="bg-white border-none shadow-xl mb-12">
              <CardBody className="p-8 md:p-12 text-left leading-relaxed text-gray-600 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
                    <GraduationCap size={20} />
                  </div>
                  <p>
                    2022 年畢業於 <strong>中正大學資訊工程學碩士晶片系統組</strong>，具備 2 年嵌入式系統開發經驗（Raspberry Pi、Nexys 4、Apollo 3）與 Transformer-based TTS 的使用與編寫經驗。
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1">
                    <Briefcase size={20} />
                  </div>
                  <p>
                    曾任職於 <strong>Sound Control Technology</strong> 軟韌體研發工程師，目前於 <strong>鴻海精密工業</strong> 擔任軟體開發工程師，負責維護與開發測試管理系統（TMS）、撰寫 iPhone 手機腳本與測試腳本、機械手臂開發，並與美國客戶進行技術溝通。
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
                    <Terminal size={20} />
                  </div>
                  <p>
                    擅長 <strong>Python</strong>，具備 Python 模組化、圖形化介面開發經驗（如 tkinter），致力於打造高效且穩定的軟體解決方案。
                  </p>
                </div>
              </CardBody>
            </Card>

            <Button 
              color="primary" 
              variant="flat" 
              radius="full" 
              startContent={<Phone size={18} />}
              onClick={handleContactAlert}
              className="font-bold"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
