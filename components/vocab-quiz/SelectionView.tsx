'use client';

import SiteCard from '@/components/SiteCard';
import SitePageHeading from '@/components/SitePageHeading';
import { wordData, DifficultyCategory } from '@/data/wordData';
import { 
  Baby, 
  School, 
  BookOpen, 
  Trophy, 
  Briefcase, 
  TrendingUp, 
  Crown,
  Users,
  Utensils,
  Trees,
  MapPin,
  Activity,
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react';
import { 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Button, 
  Chip,
  Link
} from '@heroui/react';

const iconMap = {
  Baby: Baby,
  School: School,
  BookOpen: BookOpen,
  Trophy: Trophy,
  Briefcase: Briefcase,
  TrendingUp: TrendingUp,
  Crown: Crown,
  Users: Users,
  Utensils: Utensils,
  Trees: Trees,
  MapPin: MapPin,
  Activity: Activity,
  Sparkles: Sparkles,
  Clock: Clock,
};

type SelectionViewProps = {
  onSelect: (category: DifficultyCategory) => void;
  title?: string;
  description?: string;
  modeSwitchPath?: string;
  modeSwitchText?: string;
  headingLevel?: 'h1' | 'h2';
};

export default function SelectionView({ 
  onSelect, 
  title = "英文單字測驗", 
  description = "請選擇難度開始挑戰！",
  modeSwitchPath,
  modeSwitchText,
  headingLevel = 'h1'
}: SelectionViewProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <SitePageHeading eyebrow="Learn & Practice" title={title} description={description} headingLevel={headingLevel} />
        
        {modeSwitchPath && modeSwitchText && (
          <Button
            as={Link}
            href={modeSwitchPath}
            color="primary"
            variant="flat"
            radius="full"
            className="font-bold"
            endContent={<ArrowRight size={18} />}
          >
            {modeSwitchText}
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wordData.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BookOpen;
          
          return (
            <SiteCard
              key={category.id}
              isPressable
              isHoverable
              className="hover:border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              onPress={() => onSelect(category)}
            >
              <CardBody className="p-6 items-center text-center">
                <div className="mb-6 rounded-2xl bg-orange-50 p-4 text-orange-700">
                  <IconComponent className="h-10 w-10" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
              </CardBody>
              <Divider className="opacity-50" />
              <CardFooter className="justify-center py-4 bg-gray-50/50">
                <Chip 
                  variant="flat" 
                  color="default" 
                  size="sm" 
                  className="font-bold text-gray-600"
                >
                  {category.words.length} 個單字
                </Chip>
              </CardFooter>
            </SiteCard>
          );
        })}
      </div>
    </div>
  );
}

// Helper to avoid duplicate Divider name collision if already imported elsewhere (though Hero UI handles it)
function Divider({ className }: { className?: string }) {
  return <div className={`h-px w-full bg-gray-100 ${className}`} />;
}
