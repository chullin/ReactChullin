import { Metadata } from 'next';
import ImageCompressorClient from '@/components/tools/ImageCompressorClient';

export const metadata: Metadata = {
  title: '圖片與 PPTX 壓縮工具 | Joseph Chen',
  description: '支援拖曳、多檔選取、圖片壓縮與 PPTX 內嵌圖片壓縮的瀏覽器端工具，可調整品質、尺寸比例與輸出格式。',
  alternates: {
    canonical: 'https://chullin.tw/image-compressor',
  },
};

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}
