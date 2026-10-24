import type { Metadata } from 'next';
import TemporaryFilesClient from '@/components/tools/TemporaryFilesClient';

export const metadata: Metadata = {
  title: '檔案暫存空間',
  description: '以密碼保護的個人檔案與文字暫存空間。',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://chullin.tw/temporary-files' },
};
export default function TemporaryFilesPage() { return <TemporaryFilesClient />; }
