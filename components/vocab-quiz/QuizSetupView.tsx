'use client';

import { useState } from 'react';
import { DifficultyCategory } from '@/data/wordData';
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  RadioGroup, 
  Radio, 
  Slider,
  Chip
} from '@heroui/react';
import { 
  ChevronLeft, 
  Play, 
  Languages, 
  Hash, 
  Timer,
  Globe
} from 'lucide-react';

export type QuizMode = 'eng-to-chi' | 'chi-to-eng';

type QuizSetupViewProps = {
  category: DifficultyCategory;
  onStart: (mode: QuizMode, count: number) => void;
  onBack: () => void;
};

export default function QuizSetupView({ category, onStart, onBack }: QuizSetupViewProps) {
  const [mode, setMode] = useState<QuizMode>('eng-to-chi');
  const [count, setCount] = useState<number>(10);

  const maxQuestions = Math.min(category.words.length, 50);
  const marks = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: maxQuestions, label: `${maxQuestions}` },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button
        variant="light"
        color="default"
        onPress={onBack}
        startContent={<ChevronLeft size={18} />}
        className="font-medium text-gray-500 hover:text-primary transition-colors"
      >
        返回選擇難度
      </Button>

      <Card className="border-none shadow-2xl bg-white overflow-visible">
        <CardHeader className="flex gap-4 p-8 bg-blue-50/50">
          <div className={`p-3 rounded-2xl ${category.color} bg-opacity-10 text-primary`}>
            <Globe className={`w-8 h-8 ${category.color.replace('bg-', 'text-')}`} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-black tracking-tight">{category.title}</h2>
            <p className="text-sm text-gray-500 font-medium">設定您的測驗偏好</p>
          </div>
          <Chip color="primary" variant="flat" className="ml-auto font-bold">
            {category.words.length} 單字量
          </Chip>
        </CardHeader>
        
        <Divider className="opacity-50" />
        
        <CardBody className="p-8 space-y-12">
          {/* Quiz Mode Selection */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Languages className="text-blue-500" size={24} />
              <h3 className="text-xl font-bold">測驗模式</h3>
            </div>
            
            <RadioGroup
              value={mode}
              onValueChange={(val) => setMode(val as QuizMode)}
              orientation="horizontal"
              color="primary"
              classNames={{
                wrapper: "gap-6",
              }}
            >
              <Radio 
                value="eng-to-chi" 
                classNames={{
                  base: "inline-flex m-0 bg-gray-50/50 hover:bg-blue-50/50 items-center justify-between flex-row-reverse cursor-pointer rounded-2xl gap-4 p-4 border-2 border-transparent data-[selected=true]:border-primary transition-all",
                  label: "font-bold text-gray-700",
                }}
              >
                英文出題 → 中文選答
              </Radio>
              <Radio 
                value="chi-to-eng"
                classNames={{
                  base: "inline-flex m-0 bg-gray-50/50 hover:bg-blue-50/50 items-center justify-between flex-row-reverse cursor-pointer rounded-2xl gap-4 p-4 border-2 border-transparent data-[selected=true]:border-primary transition-all",
                  label: "font-bold text-gray-700",
                }}
              >
                中文出題 → 英文選答
              </Radio>
            </RadioGroup>
          </div>

          {/* Question Count Selection */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Hash className="text-blue-500" size={24} />
              <h3 className="text-xl font-bold">題目數量</h3>
            </div>
            
            <div className="px-2 pt-2 pb-10">
              <Slider 
                step={1} 
                maxValue={maxQuestions} 
                minValue={5} 
                value={count}
                onChange={(val) => setCount(val as number)}
                showSteps={true}
                marks={marks}
                color="primary"
                size="lg"
                className="max-w-full"
                classNames={{
                  label: "font-bold text-gray-600 mb-2",
                  value: "text-2xl font-black text-primary",
                }}
                label="選擇想要挑戰題數"
              />
            </div>
          </div>

          <Button
            color="primary"
            size="lg"
            className="w-full text-xl font-black py-8 shadow-xl shadow-blue-500/20"
            onPress={() => onStart(mode, count)}
            startContent={<Play size={24} fill="white" />}
          >
            開始測驗
          </Button>
        </CardBody>
      </Card>

      <Card className="bg-blue-50/30 border-none shadow-none">
        <CardBody className="p-4 flex flex-row items-center gap-4 text-sm text-blue-800">
          <Timer size={20} className="text-blue-500 shrink-0" />
          <p className="font-medium">
            提示：測驗開始後將會計分。答題速度與正確率將會影響您的最終成績表現！
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
