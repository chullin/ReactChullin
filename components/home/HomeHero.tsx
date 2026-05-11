'use client';

import { Button, Card, CardBody, Chip, Image, Link } from '@heroui/react';
import { Code2, Cpu, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "circOut" } as any
  },
};

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div variants={itemVariants}>
            <Chip 
              variant="flat" 
              color="primary" 
              className="mb-6 font-bold uppercase tracking-widest text-[10px]"
              size="sm"
            >
              Software Engineer @ Foxconn
            </Chip>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-black mb-4 leading-[1.1] tracking-tight"
          >
            陳憲億 <span className="text-gradient">Joseph Chen</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-500 mb-10 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            AI Application & Automation Engineer <br className="hidden md:block" />
            <span className="text-slate-400 text-lg lg:text-xl">Focused on Intelligent Manufacturing & Smart Systems</span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
            <Button
              as={Link}
              href="/about"
              color="primary"
              size="lg"
              className="font-bold px-8 h-14 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
              endContent={<ArrowRight size={20} />}
            >
              View About / CV
            </Button>
            <Button
              as={Link}
              href="/blog"
              variant="flat"
              color="primary"
              size="lg"
              className="font-bold px-8 h-14 w-full sm:w-auto hover:bg-blue-100 transition-colors"
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
              className="font-bold px-8 h-14 w-full sm:w-auto hover:bg-slate-50 transition-colors border-slate-200"
            >
              Projects
            </Button>
          </motion.div>
        </motion.div>

        {/* Profile Visual with Refined Animations */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.2, ease: "circOut", delay: 0.4 } as any}
          className="flex justify-center relative pt-10 lg:pt-0"
        >
          <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] group">
            {/* Outer Breathing Ring */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full blur-xl"
            />
            {/* Inner Breathing Ring */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-16px)] h-[calc(100%-16px)] bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full blur-md"
            />

            {/* Profile Image */}
            <div className="absolute inset-3 bg-white rounded-full p-2 shadow-2xl ring-4 ring-blue-100/50 overflow-hidden relative z-10">
              <Image
                src="/assets/profile3.png"
                alt="Joseph Chen Profile"
                className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
            </div>

            {/* Floating Cards with Individual Hover and Entry */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -12, 0] }}
              transition={{ 
                x: { delay: 0.8, duration: 0.8 },
                opacity: { delay: 0.8, duration: 0.8 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-6 -right-8 z-20 hidden sm:block"
            >
              <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-md hover:scale-105 transition-transform duration-300">
                <CardBody className="flex flex-row items-center gap-3 p-4">
                  <div className="bg-blue-500 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-900 leading-none">AI Integration</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1.5">Specialist</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, 12, 0] }}
              transition={{ 
                x: { delay: 1, duration: 0.8 },
                opacity: { delay: 1, duration: 0.8 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
              className="absolute -bottom-6 -left-8 z-20 hidden sm:block"
            >
              <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-md hover:scale-105 transition-transform duration-300">
                <CardBody className="flex flex-row items-center gap-3 p-4">
                  <div className="bg-slate-900 text-white p-2.5 rounded-2xl shadow-lg">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-900 leading-none">Automation</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1.5">Smart Systems</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
