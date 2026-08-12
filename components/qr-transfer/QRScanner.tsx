'use client';

import jsQR from 'jsqr';
import { Camera, CameraOff } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { QR_CONFIG } from '@/lib/qr-transfer/config';

interface QRScannerProps {
  active: boolean;
  onScan: (payload: string) => void;
  onStatus?: (status: string) => void;
}

type BarcodeDetectorCtor = new (options?: { formats?: string[] }) => {
  detect(source: CanvasImageSource): Promise<Array<{ rawValue?: string }>>;
};

declare global {
  interface Window {
    BarcodeDetector?: BarcodeDetectorCtor;
  }
}

export default function QRScanner({ active, onScan, onStatus }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastScanAtRef = useRef(0);
  const lastPayloadRef = useRef('');
  const [error, setError] = useState('');

  const stopCamera = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (!active) {
      stopCamera();
      return;
    }

    let cancelled = false;
    const detector = typeof window !== 'undefined' && window.BarcodeDetector ? new window.BarcodeDetector({ formats: ['qr_code'] }) : null;

    async function start() {
      try {
        setError('');
        onStatus?.(detector ? 'Using BarcodeDetector' : 'Using jsQR fallback');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const scan = async (now: number) => {
          if (cancelled || !videoRef.current) {
            return;
          }

          const intervalMs = 1000 / QR_CONFIG.scannerFps;
          if (now - lastScanAtRef.current >= intervalMs && videoRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            lastScanAtRef.current = now;
            const payload = await scanCurrentFrame(videoRef.current, detector);

            if (payload && payload !== lastPayloadRef.current) {
              lastPayloadRef.current = payload;
              onScan(payload);
            }
          }

          rafRef.current = requestAnimationFrame(scan);
        };

        rafRef.current = requestAnimationFrame(scan);
      } catch (reason) {
        const message = reason instanceof Error ? reason.message : 'Camera unavailable';
        setError(message);
        onStatus?.(message);
      }
    }

    async function scanCurrentFrame(video: HTMLVideoElement, detector: InstanceType<BarcodeDetectorCtor> | null) {
      if (detector) {
        try {
          const codes = await detector.detect(video);
          const value = codes[0]?.rawValue;
          if (value) {
            return value;
          }
        } catch {
          onStatus?.('BarcodeDetector failed, using jsQR fallback');
        }
      }

      const canvas = canvasRef.current ?? document.createElement('canvas');
      canvasRef.current = canvas;
      const width = video.videoWidth;
      const height = video.videoHeight;

      if (!width || !height) {
        return null;
      }

      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        return null;
      }

      context.drawImage(video, 0, 0, width, height);
      const imageData = context.getImageData(0, 0, width, height);
      return jsQR(imageData.data, width, height)?.data ?? null;
    }

    start();

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [active, onScan, onStatus, stopCamera]);

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
      <div className="relative aspect-[4/3] w-full">
        <video ref={videoRef} className="h-full w-full object-cover" playsInline muted />
        {!active && (
          <div className="absolute inset-0 grid place-items-center bg-slate-900 text-white">
            <div className="text-center">
              <CameraOff className="mx-auto mb-3" size={34} />
              <p className="text-sm font-bold">Camera paused</p>
            </div>
          </div>
        )}
        {active && (
          <div className="pointer-events-none absolute inset-8 rounded-lg border-2 border-emerald-400/80 shadow-[0_0_0_999px_rgba(15,23,42,0.25)]" />
        )}
      </div>
      <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-sm font-bold text-slate-200">
        <span className="inline-flex items-center gap-2">
          <Camera size={16} /> {active ? 'Scanning' : 'Paused'}
        </span>
        {error && <span className="text-rose-300">{error}</span>}
      </div>
    </div>
  );
}

