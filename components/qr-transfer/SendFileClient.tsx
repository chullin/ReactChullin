'use client';

import { Download, Pause, Play, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FileDropZone from './FileDropZone';
import QRDisplay from './QRDisplay';
import { QR_CONFIG } from '@/lib/qr-transfer/config';
import { base64UrlEncoder } from '@/lib/qr-transfer/encoding/base64';
import { chunkUint8Array } from '@/lib/qr-transfer/file/chunkFile';
import { downloadTransferSession, readTransferSession } from '@/lib/qr-transfer/file/session';
import { sha256Hex } from '@/lib/qr-transfer/file/hashFile';
import { encodeDataChunkMessage, encodeMetadataMessage } from '@/lib/qr-transfer/protocol/codec';
import type { TransferSession } from '@/lib/qr-transfer/protocol/types';
import { createQrDataUrl } from '@/lib/qr-transfer/qr/generator';
import { formatBytes, formatDuration } from '@/lib/qr-transfer/utils/formatBytes';
import { createTransferId, normalizeTransferId } from '@/lib/qr-transfer/utils/transferId';

interface PreparedTransfer {
  file: File;
  bytes: Uint8Array;
  chunks: Uint8Array[];
  session: TransferSession;
}

const speedOptions = [1, 2, 3, 4, 5];

export default function SendFileClient() {
  const [prepared, setPrepared] = useState<PreparedTransfer | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loop, setLoop] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [fps, setFps] = useState(QR_CONFIG.fps);
  const [customTransferId, setCustomTransferId] = useState('');
  const [pendingSession, setPendingSession] = useState<TransferSession | null>(null);
  const [busyText, setBusyText] = useState('');
  const timerRef = useRef<number | null>(null);

  const estimatedSeconds = prepared ? prepared.chunks.length / fps : 0;
  const totalFrames = prepared ? prepared.chunks.length + Math.ceil(prepared.chunks.length / QR_CONFIG.metadataInterval) + 1 : 0;

  const metadataPayload = useMemo(() => {
    if (!prepared) {
      return '';
    }

    return encodeMetadataMessage({
      id: prepared.session.transferId,
      name: prepared.session.fileName,
      mime: prepared.session.mimeType,
      size: prepared.session.fileSize,
      chunks: prepared.session.totalChunks,
      chunkSize: prepared.session.chunkSize,
      sha256: prepared.session.sha256,
    });
  }, [prepared]);

  const buildPayloadForFrame = useCallback(
    (frame: number) => {
      if (!prepared) {
        return '';
      }

      if (frame === 0 || frame % (QR_CONFIG.metadataInterval + 1) === 0) {
        return metadataPayload;
      }

      const dataIndex = (frame - 1 - Math.floor(frame / (QR_CONFIG.metadataInterval + 1))) % prepared.chunks.length;
      return encodeDataChunkMessage({
        id: prepared.session.transferId,
        i: dataIndex,
        d: base64UrlEncoder.encode(prepared.chunks[dataIndex]),
      });
    },
    [metadataPayload, prepared],
  );

  useEffect(() => {
    if (!prepared) {
      return;
    }

    let cancelled = false;
    createQrDataUrl(buildPayloadForFrame(currentFrame)).then((url) => {
      if (!cancelled) {
        setQrDataUrl(url);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [buildPayloadForFrame, currentFrame, prepared]);

  useEffect(() => {
    if (!playing || !prepared) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentFrame((frame) => {
        const next = frame + 1;
        if (next >= totalFrames) {
          setLoop((value) => value + 1);
          return 0;
        }
        return next;
      });
    }, 1000 / fps);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [fps, playing, prepared, totalFrames]);

  const prepareFile = async (file: File) => {
    setBusyText('Reading file and calculating SHA-256...');
    setPlaying(false);

    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const sha256 = await sha256Hex(buffer);
    const chunks = chunkUint8Array(bytes, QR_CONFIG.chunkSize);
    const requestedId = normalizeTransferId(customTransferId || pendingSession?.transferId || '');
    const transferId = requestedId || createTransferId();

    if (pendingSession) {
      if (pendingSession.sha256 !== sha256 || pendingSession.fileSize !== file.size || pendingSession.chunkSize !== QR_CONFIG.chunkSize) {
        setBusyText('Loaded session does not match this file.');
        return;
      }
    }

    const session: TransferSession = {
      v: 1,
      transferId,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || 'application/octet-stream',
      sha256,
      chunkSize: QR_CONFIG.chunkSize,
      totalChunks: chunks.length,
    };

    setPrepared({ file, bytes, chunks, session });
    setCurrentFrame(0);
    setLoop(1);
    setBusyText('');
  };

  const loadSessionFile = async (file: File) => {
    try {
      const session = await readTransferSession(file);
      setPendingSession(session);
      setCustomTransferId(session.transferId);
    } catch (error) {
      setBusyText(error instanceof Error ? error.message : 'Invalid transfer session');
    }
  };

  const currentChunkNumber = prepared
    ? Math.min(prepared.session.totalChunks, Math.max(0, currentFrame - Math.floor(currentFrame / (QR_CONFIG.metadataInterval + 1))))
    : 0;

  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,520px)]">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">Send File</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Pure Frontend QR File Transfer</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                100% 本地處理。檔案不會上傳、不經過伺服器、不儲存在雲端；檔案內容只會透過螢幕顯示的 QR Code 傳輸。
              </p>
            </div>

            <FileDropZone onFile={prepareFile} />

            <div className="grid gap-4 md:grid-cols-2">
              <label className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="text-sm font-black text-slate-700">Resume Existing Transfer ID</span>
                <input
                  value={customTransferId}
                  onChange={(event) => setCustomTransferId(normalizeTransferId(event.target.value))}
                  placeholder="A72F92KD"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold outline-none focus:border-emerald-500"
                />
              </label>
              <label className="rounded-lg border border-slate-200 bg-white p-4">
                <span className="text-sm font-black text-slate-700">Load .qrtransfer.json</span>
                <input
                  type="file"
                  accept=".json,.qrtransfer.json,application/json"
                  className="mt-2 w-full text-sm font-semibold text-slate-600"
                  onChange={(event) => {
                    const file = event.target.files?.item(0);
                    if (file) {
                      loadSessionFile(file);
                    }
                  }}
                />
              </label>
            </div>

            {busyText && <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">{busyText}</p>}

            {prepared && (
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Stat label="File Name" value={prepared.session.fileName} />
                  <Stat label="File Type" value={prepared.session.mimeType} />
                  <Stat label="File Size" value={formatBytes(prepared.session.fileSize)} />
                  <Stat label="SHA-256" value={prepared.session.sha256.slice(0, 18) + '...'} />
                  <Stat label="Transfer ID" value={prepared.session.transferId} />
                  <Stat label="Chunks" value={prepared.session.totalChunks.toLocaleString()} />
                  <Stat label="QR Speed" value={`${fps} QR/s`} />
                  <Stat label="Estimated Time" value={formatDuration(estimatedSeconds)} />
                  <Stat label="Chunk Size" value={formatBytes(prepared.session.chunkSize)} />
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white hover:bg-slate-800" onClick={() => setPlaying(true)}>
                    <Play className="mr-2 inline" size={16} /> Start
                  </button>
                  <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-black text-slate-800 hover:bg-slate-50" onClick={() => setPlaying(false)}>
                    <Pause className="mr-2 inline" size={16} /> Pause
                  </button>
                  <button
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-black text-slate-800 hover:bg-slate-50"
                    onClick={() => {
                      setCurrentFrame(0);
                      setLoop(1);
                    }}
                  >
                    <RotateCcw className="mr-2 inline" size={16} /> Restart
                  </button>
                  <button
                    className="rounded-lg border border-emerald-300 px-4 py-2 text-sm font-black text-emerald-800 hover:bg-emerald-50"
                    onClick={() => downloadTransferSession(prepared.session)}
                  >
                    <Download className="mr-2 inline" size={16} /> Save Transfer Session
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <QRDisplay dataUrl={qrDataUrl} label="QR transfer frame" />
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Status" value={playing ? 'Sending' : 'Paused'} />
                <Stat label="Current Frame" value={prepared ? `${currentChunkNumber} / ${prepared.session.totalChunks}` : '-'} />
                <Stat label="Loop" value={prepared ? String(loop) : '-'} />
                <Stat label="Speed" value={`${fps} QR/s`} />
              </div>
              <div className="mt-5">
                <p className="mb-2 text-sm font-black text-slate-700">Speed</p>
                <div className="flex flex-wrap gap-2">
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      className={`rounded-lg px-3 py-2 text-sm font-black ${fps === speed ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      onClick={() => setFps(speed)}
                    >
                      {speed} QR/s
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg bg-slate-50 p-3">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-black text-slate-950" title={value}>
        {value}
      </p>
    </div>
  );
}

