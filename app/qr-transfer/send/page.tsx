import type { Metadata } from 'next';
import SendFileClient from '@/components/qr-transfer/SendFileClient';

export const metadata: Metadata = {
  title: 'Send File - QR Transfer',
  description: 'Send a file as a local QR code stream without backend upload.',
};

export default function SendFilePage() {
  return <SendFileClient />;
}
