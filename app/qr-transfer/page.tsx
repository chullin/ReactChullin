import type { Metadata } from 'next';
import QrTransferHomeClient from '@/components/qr-transfer/QrTransferHomeClient';

export const metadata: Metadata = {
  title: 'Pure Frontend QR File Transfer',
  description: 'Offline optical file transfer using QR streams, IndexedDB resume, and SHA-256 verification.',
  alternates: {
    canonical: 'https://chullin.tw/qr-transfer',
  },
};

export default function QrTransferPage() {
  return <QrTransferHomeClient />;
}
