'use client';

import { DifficultyCategory } from '@/data/wordData';
import { 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  CardHeader, 
  Divider, 
  CircularProgress,
  Chip
} from '@heroui/react';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  Share2, 
  CheckCircle2, 
  AlertCircle,
  Star,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

type ResultViewProps = {
  score: number;
  category: DifficultyCategory;
  onRestart: () => void;
  onReplay: () => void;
};

export default function ResultView({ score, category, onRestart, onReplay }: ResultViewProps) {
  const percentage = (score / 10) * 100; // Note: In a real app this should be totalQuestions, but 10 is default
  
  let title = "再接再厲！";
  let color: "danger" | "warning" | "success" | "primary" = "danger";
  let Icon = AlertCircle;

  if (percentage >= 90) {
    title = "卓越表現！";
    color = "success";
    Icon = Trophy;
  } else if (percentage >= 70) {
    title = "非常棒！";
    color = "primary";
    Icon = Star;
  } else if (percentage >= 50) {
    title = "不錯喔！";
    color = "warning";
    Icon = Award;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card className="border-none shadow-2xl bg-white overflow-visible">
        <CardHeader className="flex flex-col items-center p-12 bg-blue-50/30 rounded-b-[40px]">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`p-6 rounded-full mb-8 bg-${color}/10 text-${color}`}
          >
            <Icon size={80} strokeWidth={2.5} />
          </motion.div>
          
          <h2 className="text-4xl font-black tracking-tight mb-2">{title}</h2>
          <p className="text-gray-400 font-medium italic">您已完成 {category.title} 的所有挑戰</p>
        </CardHeader>

        <CardBody className="p-12 -mt-10">
          <div className="flex flex-col items-center gap-12 text-center">
            <CircularProgress
              classNames={{
                svg: "w-48 h-48 drop-shadow-md",
                indicator: `stroke-${color}`,
                track: "stroke-gray-100",
                value: "text-4xl font-black text-gray-700",
              }}
              value={percentage}
              strokeWidth={4}
              showValueLabel={true}
              label="總體正確率"
            />

            <div className="grid grid-cols-2 gap-8 w-full">
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">答對題數</p>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="text-success" size={24} />
                  <span className="text-3xl font-black text-gray-800">{score} 題</span>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:shadow-md">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">獲得成就</p>
                <Chip color={color} variant="flat" size="lg" className="font-bold">
                  {percentage >= 50 ? '解鎖勳章' : '努力學習'}
                </Chip>
              </div>
            </div>
          </div>
        </CardBody>

        <Divider className="opacity-50" />

        <CardFooter className="p-8 flex flex-col sm:flex-row gap-4">
          <Button
            color="primary"
            size="lg"
            className="w-full text-xl font-black py-8 shadow-xl shadow-blue-500/20"
            onPress={onReplay}
            startContent={<RotateCcw size={24} />}
          >
            再次挑戰
          </Button>
          <Button
            variant="flat"
            size="lg"
            className="w-full text-xl font-bold py-8 text-gray-600"
            onPress={onRestart}
            startContent={<Home size={24} />}
          >
            返回首頁
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
