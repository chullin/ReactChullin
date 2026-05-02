'use client';

import { DifficultyCategory } from '@/data/wordData';
import { 
  Button, 
  Chip
} from '@heroui/react';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  CheckCircle2, 
  AlertCircle,
  Star,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

type ResultViewProps = {
  score: number;
  totalQuestions?: number;
  category: DifficultyCategory;
  onRestart: () => void;
  onReplay: () => void;
};

export default function ResultView({ score, totalQuestions = 10, category, onRestart, onReplay }: ResultViewProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let title = "再接再厲！";
  let colorClass = "text-red-500";
  let bgClass = "bg-red-50";
  let borderClass = "border-red-100";
  let barClass = "bg-red-400";
  let Icon = AlertCircle;

  if (percentage >= 90) {
    title = "卓越表現！";
    colorClass = "text-green-500";
    bgClass = "bg-green-50";
    borderClass = "border-green-100";
    barClass = "bg-green-400";
    Icon = Trophy;
  } else if (percentage >= 70) {
    title = "非常棒！";
    colorClass = "text-blue-500";
    bgClass = "bg-blue-50";
    borderClass = "border-blue-100";
    barClass = "bg-blue-400";
    Icon = Star;
  } else if (percentage >= 50) {
    title = "不錯喔！";
    colorClass = "text-amber-500";
    bgClass = "bg-amber-50";
    borderClass = "border-amber-100";
    barClass = "bg-amber-400";
    Icon = Award;
  }


  // Map barClass to actual hex color for SVG stroke
  const strokeColor = 
    percentage >= 90 ? '#22c55e' :
    percentage >= 70 ? '#3b82f6' :
    percentage >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="max-w-sm mx-auto px-4 py-4 flex flex-col gap-5">

      {/* Icon + Title */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex flex-col items-center gap-2 pt-2"
      >
        <div className={`p-5 rounded-full ${bgClass} ${colorClass}`}>
          <Icon size={52} strokeWidth={2.5} />
        </div>
        <h2 className={`text-3xl font-black tracking-tight ${colorClass}`}>{title}</h2>
        <p className="text-gray-400 font-medium text-sm text-center">
          您已完成 {category.title} 的所有挑戰
        </p>
      </motion.div>

      {/* Score Circle (Custom SVG — no clipping issues) */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke={strokeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-black ${colorClass}`}>{percentage}%</span>
            <span className="text-[10px] font-bold text-gray-400">總體正確率</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`rounded-2xl p-4 border ${bgClass} ${borderClass} flex flex-col items-center gap-1`}>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">答對題數</p>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="text-green-500" size={18} />
            <span className="text-2xl font-black text-gray-800">{score}</span>
            <span className="text-sm text-gray-400 font-bold">/ {totalQuestions}</span>
          </div>
        </div>
        <div className="rounded-2xl p-4 border bg-gray-50 border-gray-100 flex flex-col items-center gap-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">獲得成就</p>
          <Chip
            size="sm"
            className={`font-bold text-xs mt-1 ${bgClass} ${colorClass} border-0`}
          >
            {percentage >= 50 ? '解鎖勳章 🏅' : '繼續加油 💪'}
          </Chip>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          color="primary"
          size="lg"
          className="w-full font-black shadow-lg shadow-blue-500/20"
          onPress={onReplay}
          startContent={<RotateCcw size={18} />}
        >
          再次挑戰
        </Button>
        <Button
          variant="flat"
          size="lg"
          className="w-full font-bold text-gray-600"
          onPress={onRestart}
          startContent={<Home size={18} />}
        >
          返回首頁
        </Button>
      </div>

    </div>
  );
}
