'use client';

import { Download, Pause, Play, Share2, ShieldCheck, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import QRScanner from './QRScanner';
import TransferCard from './TransferCard';
import TransferProgress from './TransferProgress';
import { base64UrlEncoder } from '@/lib/qr-transfer/encoding/base64';
import { rebuildBlobFromChunks } from '@/lib/qr-transfer/file/rebuildFile';
import { sha256Hex } from '@/lib/qr-transfer/file/hashFile';
import { decodeQrTransferMessage } from '@/lib/qr-transfer/protocol/codec';
import type { StoredTransfer, StorageEstimateInfo, TransferMetadataMessage } from '@/lib/qr-transfer/protocol/types';
import { getChunksForTransfer, getMissingChunkIndexes, getStoredBytes, hasChunk, saveChunkIfMissing } from '@/lib/qr-transfer/storage/chunkRepository';
import { deleteTransfer, getTransfer, listTransfers, updateTransfer, upsertTransferFromMetadata } from '@/lib/qr-transfer/storage/transferRepository';
import { getStorageEstimate, requestPersistentStorage } from '@/lib/qr-transfer/storage/quota';
import { formatBytes } from '@/lib/qr-transfer/utils/formatBytes';

interface CompletedFile {
  blob: Blob;
  url: string;
  sha256: string;
  verified: boolean;
}

export default function ReceiveFileClient() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get('id');
  const [scannerActive, setScannerActive] = useState(false);
  const [currentTransfer, setCurrentTransfer] = useState<StoredTransfer | null>(null);
  const [unfinishedTransfers, setUnfinishedTransfers] = useState<StoredTransfer[]>([]);
  const [storedBytes, setStoredBytes] = useState(0);
  const [missing, setMissing] = useState<number[]>([]);
  const [duplicates, setDuplicates] = useState(0);
  const [invalidCount, setInvalidCount] = useState(0);
  const [scanCount, setScanCount] = useState(0);
  const [scanRate, setScanRate] = useState(0);
  const [status, setStatus] = useState('');
  const [wrongTransfer, setWrongTransfer] = useState<TransferMetadataMessage | null>(null);
  const [completedFile, setCompletedFile] = useState<CompletedFile | null>(null);
  const [storageEstimate, setStorageEstimate] = useState<StorageEstimateInfo>({});
  const scanWindowRef = useRef<number[]>([]);
  const reconstructingRef = useRef(false);

  const refreshTransfers = useCallback(async () => {
    const transfers = await listTransfers();
    setUnfinishedTransfers(transfers.filter((transfer) => transfer.status !== 'completed'));

    if (requestedId && !currentTransfer) {
      const transfer = await getTransfer(requestedId);
      if (transfer) {
        setCurrentTransfer(transfer);
      }
    }
  }, [currentTransfer, requestedId]);

  const refreshCurrentStats = useCallback(async (transfer: StoredTransfer | null) => {
    if (!transfer) {
      setStoredBytes(0);
      setMissing([]);
      return;
    }

    const [bytes, missingIndexes] = await Promise.all([
      getStoredBytes(transfer.id),
      getMissingChunkIndexes(transfer.id, transfer.totalChunks, 250),
    ]);
    setStoredBytes(bytes);
    setMissing(missingIndexes);
  }, []);

  useEffect(() => {
    refreshTransfers();
    getStorageEstimate().then(setStorageEstimate);
  }, [refreshTransfers]);

  useEffect(() => {
    refreshCurrentStats(currentTransfer);
  }, [currentTransfer, refreshCurrentStats]);

  useEffect(() => {
    return () => {
      if (completedFile) {
        URL.revokeObjectURL(completedFile.url);
      }
    };
  }, [completedFile]);

  const noteScan = () => {
    const now = Date.now();
    scanWindowRef.current = [...scanWindowRef.current.filter((time) => now - time < 5000), now];
    setScanRate(scanWindowRef.current.length / 5);
    setScanCount((value) => value + 1);
  };

  const reconstructIfComplete = useCallback(async (transfer: StoredTransfer) => {
    if (reconstructingRef.current || transfer.receivedChunks < transfer.totalChunks) {
      return;
    }

    reconstructingRef.current = true;
    setStatus('Reconstructing file...');
    const chunks = await getChunksForTransfer(transfer.id);

    if (chunks.length !== transfer.totalChunks) {
      reconstructingRef.current = false;
      return;
    }

    const blob = rebuildBlobFromChunks(chunks, transfer.mimeType);
    const sha256 = await sha256Hex(blob);
    const verified = sha256 === transfer.sha256;

    if (!verified) {
      await updateTransfer({ ...transfer, status: 'corrupted' });
      setCurrentTransfer({ ...transfer, status: 'corrupted' });
      setStatus('File verification failed. The reconstructed file may be corrupted.');
      reconstructingRef.current = false;
      return;
    }

    const url = URL.createObjectURL(blob);
    setCompletedFile((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous.url);
      }
      return { blob, url, sha256, verified };
    });
    await updateTransfer({ ...transfer, status: 'completed' });
    setCurrentTransfer({ ...transfer, status: 'completed' });
    setScannerActive(false);
    setStatus('Transfer complete. SHA-256 verified.');
    reconstructingRef.current = false;
  }, []);

  const handleMetadata = async (message: TransferMetadataMessage) => {
    if (currentTransfer && currentTransfer.id !== message.id) {
      setWrongTransfer(message);
      return;
    }

    const transfer = await upsertTransferFromMetadata(message);
    setCurrentTransfer(transfer);
    await refreshTransfers();
    await refreshCurrentStats(transfer);
  };

  const handleScan = useCallback(
    async (payload: string) => {
      noteScan();
      const message = decodeQrTransferMessage(payload);

      if (!message) {
        setInvalidCount((value) => value + 1);
        return;
      }

      if (message.t === 'meta') {
        await handleMetadata(message);
        return;
      }

      const transfer = currentTransfer ?? (await getTransfer(message.id));
      if (!transfer) {
        setStatus('Waiting for metadata QR before storing data chunks.');
        return;
      }

      if (transfer.id !== message.id) {
        setWrongTransfer({
          v: 1,
          t: 'meta',
          id: message.id,
          name: 'Unknown transfer',
          mime: '',
          size: 0,
          chunks: 0,
          chunkSize: 0,
          sha256: '',
        });
        return;
      }

      if (message.i < 0 || message.i >= transfer.totalChunks) {
        setInvalidCount((value) => value + 1);
        return;
      }

      if (await hasChunk(transfer.id, message.i)) {
        setDuplicates((value) => value + 1);
        return;
      }

      const bytes = base64UrlEncoder.decode(message.d);
      const data = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(data).set(bytes);
      const saved = await saveChunkIfMissing({
        transferId: transfer.id,
        index: message.i,
        data,
      });

      if (!saved) {
        setDuplicates((value) => value + 1);
        return;
      }

      const updated = await getTransfer(transfer.id);
      if (updated) {
        setCurrentTransfer(updated);
        await refreshCurrentStats(updated);
        await reconstructIfComplete(updated);
      }
    },
    [currentTransfer, reconstructIfComplete, refreshCurrentStats],
  );

  const pauseTransfer = async () => {
    setScannerActive(false);
    if (currentTransfer) {
      const paused = { ...currentTransfer, status: 'paused' as const, updatedAt: Date.now() };
      await updateTransfer(paused);
      setCurrentTransfer(paused);
      setStatus('Transfer paused. Progress safely saved on this device.');
    }
  };

  const shareFile = async () => {
    if (!currentTransfer || !completedFile) {
      return;
    }

    const file = new File([completedFile.blob], currentTransfer.fileName, {
      type: currentTransfer.mimeType || 'application/octet-stream',
    });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: currentTransfer.fileName });
    }
  };

  const storageAvailable = useMemo(() => {
    if (!storageEstimate.quota || !storageEstimate.usage) {
      return undefined;
    }
    return storageEstimate.quota - storageEstimate.usage;
  }, [storageEstimate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Receive File</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Scan QR stream and rebuild locally</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Chunk 會立即寫入 IndexedDB，不只存在 React State。關閉相機、重新整理、甚至稍後再回來，都可以依 Transfer ID 繼續。
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-emerald-300 bg-white px-4 py-3 text-sm font-black text-emerald-800 hover:bg-emerald-50"
            onClick={async () => {
              const persisted = await requestPersistentStorage();
              setStorageEstimate((value) => ({ ...value, persisted }));
            }}
          >
            <ShieldCheck className="mr-2 inline" size={17} /> Request Persistent Storage
          </button>
        </div>

        {unfinishedTransfers.length > 0 && !currentTransfer && (
          <div className="mb-8 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">Continue Transfer</p>
            <div className="mt-4 grid gap-4">
              {unfinishedTransfers.slice(0, 2).map((transfer) => (
                <TransferCard key={transfer.id} transfer={transfer} />
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,560px)_1fr]">
          <div className="space-y-5">
            <QRScanner active={scannerActive} onScan={handleScan} onStatus={setStatus} />
            <div className="flex flex-wrap gap-3">
              <button className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white hover:bg-slate-800" onClick={() => setScannerActive(true)}>
                <Play className="mr-2 inline" size={16} /> Start Camera
              </button>
              <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-black text-slate-800 hover:bg-white" onClick={pauseTransfer}>
                <Pause className="mr-2 inline" size={16} /> Pause Transfer
              </button>
            </div>
            {status && <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">{status}</p>}
            {wrongTransfer && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="font-black text-amber-900">Different transfer detected.</p>
                <p className="mt-1 text-sm font-semibold text-amber-800">
                  Current: {currentTransfer?.fileName ?? 'None'} · Detected: {wrongTransfer.name} ({wrongTransfer.id})
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    className="rounded-lg bg-amber-900 px-3 py-2 text-sm font-black text-white"
                    onClick={async () => {
                      const transfer = await upsertTransferFromMetadata(wrongTransfer);
                      setCurrentTransfer(transfer);
                      setWrongTransfer(null);
                    }}
                  >
                    Switch Transfer
                  </button>
                  <button className="rounded-lg border border-amber-300 px-3 py-2 text-sm font-black text-amber-900" onClick={() => setWrongTransfer(null)}>
                    Keep Current
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5">
            {currentTransfer ? (
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-2xl font-black text-slate-950">{currentTransfer.fileName}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {formatBytes(currentTransfer.fileSize)} · {currentTransfer.id} · {currentTransfer.mimeType}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-600">
                    {currentTransfer.status}
                  </span>
                </div>
                <div className="mt-6">
                  <TransferProgress
                    receivedChunks={currentTransfer.receivedChunks}
                    totalChunks={currentTransfer.totalChunks}
                    storedBytes={storedBytes}
                    fileSize={currentTransfer.fileSize}
                  />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Metric label="Scan Rate" value={`${scanRate.toFixed(1)} QR/s`} />
                  <Metric label="Duplicates" value={duplicates.toLocaleString()} />
                  <Metric label="Invalid QR" value={invalidCount.toLocaleString()} />
                  <Metric label="Missing" value={(currentTransfer.totalChunks - currentTransfer.receivedChunks).toLocaleString()} />
                </div>
                {missing.length > 0 && (
                  <div className="mt-5 rounded-lg bg-slate-50 p-4">
                    <p className="text-sm font-black text-slate-700">View Missing Chunks</p>
                    <p className="mt-2 max-h-24 overflow-auto text-sm font-semibold leading-6 text-slate-600">
                      {missing.join(', ')}
                      {currentTransfer.totalChunks - currentTransfer.receivedChunks > missing.length ? ' ...' : ''}
                    </p>
                  </div>
                )}
                {completedFile && completedFile.verified && (
                  <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <p className="font-black text-emerald-900">Transfer Complete · SHA-256 Verified</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={completedFile.url}
                        download={currentTransfer.fileName}
                        className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-black text-white hover:bg-emerald-800"
                      >
                        <Download className="mr-2 inline" size={16} /> Download File
                      </a>
                      <button className="rounded-lg border border-emerald-300 px-4 py-2 text-sm font-black text-emerald-800" onClick={shareFile}>
                        <Share2 className="mr-2 inline" size={16} /> Share
                      </button>
                      <button
                        className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-black text-rose-700"
                        onClick={async () => {
                          await deleteTransfer(currentTransfer.id);
                          setCurrentTransfer(null);
                          setCompletedFile(null);
                          await refreshTransfers();
                        }}
                      >
                        <Trash2 className="mr-2 inline" size={16} /> Delete Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
                <p className="text-lg font-black text-slate-950">Start camera and scan the Sender metadata QR.</p>
                <p className="mt-2 text-sm font-semibold text-slate-500">Receiver will automatically resume an existing Transfer ID from IndexedDB.</p>
              </div>
            )}

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Browser Storage</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Metric label="Used" value={storageEstimate.usage !== undefined ? formatBytes(storageEstimate.usage) : 'Unknown'} />
                <Metric label="Available" value={storageAvailable !== undefined ? formatBytes(storageAvailable) : 'Unknown'} />
                <Metric label="Persistent" value={storageEstimate.persisted === undefined ? 'Unknown' : storageEstimate.persisted ? 'Yes' : 'No'} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-1 text-base font-black text-slate-950">{value}</p>
    </div>
  );
}
