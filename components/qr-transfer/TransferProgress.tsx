'use client';

import { formatBytes } from '@/lib/qr-transfer/utils/formatBytes';

interface TransferProgressProps {
  receivedChunks: number;
  totalChunks: number;
  storedBytes?: number;
  fileSize?: number;
}

export default function TransferProgress({ receivedChunks, totalChunks, storedBytes, fileSize }: TransferProgressProps) {
  const percent = totalChunks > 0 ? Math.min(100, (receivedChunks / totalChunks) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-500">Progress</p>
          <p className="text-2xl font-black text-slate-950">{percent.toFixed(1)}%</p>
        </div>
        <p className="text-sm font-bold text-slate-600">
          {receivedChunks.toLocaleString()} / {totalChunks.toLocaleString()} chunks
        </p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
      {storedBytes !== undefined && fileSize !== undefined && (
        <p className="text-sm font-semibold text-slate-500">
          Stored on this device: {formatBytes(storedBytes)} / {formatBytes(fileSize)}
        </p>
      )}
    </div>
  );
}
