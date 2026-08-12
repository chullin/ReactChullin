import type { Metadata } from 'next';
import TransfersClient from '@/components/qr-transfer/TransfersClient';

export const metadata: Metadata = {
  title: 'Transfers - QR Transfer',
  description: 'Manage local QR file transfer sessions stored in IndexedDB.',
};

export default function TransfersPage() {
  return <TransfersClient />;
}
