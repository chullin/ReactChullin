'use client';

import { Button, Card, CardBody, Link } from '@heroui/react';
import { Terminal, Briefcase, GraduationCap, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeAbout() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black mb-8 tracking-tight">
            關於 <span className="text-gradient">陳憲億 Joseph Chen</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 font-medium">
            你好！我是<strong>陳憲億（Joseph Chen）</strong>，目前在 <strong>Foxconn (鴻海)</strong> 擔任 Software Engineer。
          </p>

          <Card className="bg-white border-none shadow-xl mb-12">
            <CardBody className="p-8 md:p-12 text-left leading-relaxed text-gray-600 space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
                  <GraduationCap size={20} />
                </div>
                <p>
                  畢業於 <strong>國立中央大學機械工程碩士（自動化組）</strong>，專注於智慧系統與自動化解決方案。
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
            as={Link}
            href="/contact"
            color="primary" 
            variant="flat" 
            radius="full" 
            startContent={<Phone size={18} />}
            className="font-bold"
          >
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
