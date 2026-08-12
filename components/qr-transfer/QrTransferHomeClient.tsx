'use client';

import Link from 'next/link';
import { ArrowDownToLine, ArrowUpFromLine, ListRestart, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import TransferCard from './TransferCard';
import type { StoredTransfer } from '@/lib/qr-transfer/protocol/types';
import { listTransfers } from '@/lib/qr-transfer/storage/transferRepository';

export default function QrTransferHomeClient() {
  const [unfinished, setUnfinished] = useState<StoredTransfer[]>([]);

  useEffect(() => {
    listTransfers().then((transfers) => {
      setUnfinished(transfers.filter((transfer) => transfer.status !== 'completed'));
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Offline Optical File Transfer</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">Pure Frontend QR File Transfer</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              不需要 backend、server、database、cloud storage、WebSocket、WebRTC，也不需要兩台裝置在同一個網路。Sender 顯示 QR stream，Receiver 用相機掃描並將 chunk 持久化在本機 IndexedDB。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/qr-transfer/send" className="inline-flex items-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800">
                <ArrowUpFromLine className="mr-2" size={18} /> Send File
              </Link>
              <Link href="/qr-transfer/receive" className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-700">
                <ArrowDownToLine className="mr-2" size={18} /> Receive File
              </Link>
              <Link href="/qr-transfer/transfers" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 hover:bg-slate-100">
                <ListRestart className="mr-2" size={18} /> Transfers
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                <Lock size={22} />
              </div>
              <div>
                <p className="text-xl font-black text-slate-950">100% Local</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  檔案不會上傳。不經過伺服器。不儲存在雲端。檔案內容只會透過螢幕顯示的 QR Code 傳輸。
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm font-bold text-slate-600">
              <p>&lt; 100 KB: Excellent</p>
              <p>100 KB - 500 KB: Fast</p>
              <p>500 KB - 2 MB: Acceptable</p>
              <p>2 MB - 10 MB: Slow</p>
              <p>&gt; 10 MB: Very Slow</p>
            </div>
          </div>
        </div>

        {unfinished.length > 0 && (
          <div className="mt-10 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">Continue Transfer</p>
            <div className="mt-4 grid gap-4">
              {unfinished.slice(0, 2).map((transfer) => (
                <TransferCard key={transfer.id} transfer={transfer} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
