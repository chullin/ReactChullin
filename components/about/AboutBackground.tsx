'use client';

import { motion } from 'framer-motion';

export default function AboutBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#FFF7ED]" />
      
      {/* Grid Pattern with radial mask */}
      <div className="absolute inset-0 grid-bg opacity-100" />

      {/* Floating Blobs - Very Light and Refined */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-100/35 rounded-full blur-[140px]"
      />
      
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-[5%] right-[-10%] w-[700px] h-[700px] bg-rose-50/30 rounded-full blur-[150px]"
      />
    </div>
  );
}
