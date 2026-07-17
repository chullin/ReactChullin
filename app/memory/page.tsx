import { Metadata } from 'next';
import MemoryClient from '@/components/memory/MemoryClient';

export const metadata: Metadata = {
  title: '記憶中心 | Joseph Chen',
  description: '管理本機個人化記憶、偏好與操作習慣推論。',
  alternates: {
    canonical: 'https://chullin.tw/memory',
  },
};

export default function MemoryPage() {
  return <MemoryClient />;
}
