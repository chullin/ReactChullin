'use client';

import Link from 'next/link';
import type { StoredTransfer } from '@/lib/qr-transfer/protocol/types';
import { formatBytes } from '@/lib/qr-transfer/utils/formatBytes';
import TransferProgress from './TransferProgress';

interface TransferCardProps {
  transfer: StoredTransfer;
  onDelete?: (id: string) => void;
}

export default function TransferCard({ transfer, onDelete }: TransferCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="truncate text-lg font-black text-slate-950">{transfer.fileName}</p>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {formatBytes(transfer.fileSize)} · {transfer.id} · Updated {new Date(transfer.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/qr-transfer/receive?id=${transfer.id}`}
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white hover:bg-slate-800"
          >
            Continue
          </Link>
          {onDelete && (
            <button
              type="button"
              className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-black text-rose-700 hover:bg-rose-50"
              onClick={() => onDelete(transfer.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="mt-5">
        <TransferProgress receivedChunks={transfer.receivedChunks} totalChunks={transfer.totalChunks} />
      </div>
    </article>
  );
}
