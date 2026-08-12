'use client';

import Image from 'next/image';

interface QRDisplayProps {
  dataUrl: string;
  label: string;
}

export default function QRDisplay({ dataUrl, label }: QRDisplayProps) {
  return (
    <div className="mx-auto w-full max-w-[520px] rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      {dataUrl ? (
        <Image src={dataUrl} alt={label} width={512} height={512} className="h-auto w-full" unoptimized priority />
      ) : (
        <div className="grid aspect-square place-items-center bg-slate-100 text-sm font-bold text-slate-500">QR will appear here</div>
      )}
    </div>
  );
}
