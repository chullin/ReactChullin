import { Suspense } from 'react';
import type { Metadata } from 'next';
import ReceiveFileClient from '@/components/qr-transfer/ReceiveFileClient';

export const metadata: Metadata = {
  title: 'Receive File - QR Transfer',
  description: 'Receive QR file chunks into IndexedDB and resume across browser reloads.',
};

export default function ReceiveFilePage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm font-bold text-slate-600">Loading receiver...</div>}>
      <ReceiveFileClient />
    </Suspense>
  );
}
