'use client';

import SitePageHeading from '@/components/SitePageHeading';
import { useEffect, useState } from 'react';
import TransferCard from './TransferCard';
import type { StoredTransfer } from '@/lib/qr-transfer/protocol/types';
import { deleteTransfer, listTransfers } from '@/lib/qr-transfer/storage/transferRepository';

export default function TransfersClient() {
  const [transfers, setTransfers] = useState<StoredTransfer[]>([]);

  const refresh = async () => {
    setTransfers(await listTransfers());
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="site-page">
      <section className="site-container">
        <div className="mb-8">
          <SitePageHeading
            eyebrow="Transfers"
            title="Local transfer manager"
            description={<>
              這裡列出目前裝置 IndexedDB 中的未完成與已完成紀錄。刪除會移除 metadata 與 chunk，釋放瀏覽器儲存空間。
            </>}
          />
        </div>

        <div className="grid gap-4">
          {transfers.map((transfer) => (
            <TransferCard
              key={transfer.id}
              transfer={transfer}
              onDelete={async (id) => {
                await deleteTransfer(id);
                await refresh();
              }}
            />
          ))}
          {transfers.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-black text-slate-950">No local transfers found.</p>
              <p className="mt-2 text-sm font-semibold text-slate-500">Start receiving QR chunks and they will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
