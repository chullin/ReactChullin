'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Chip, Progress, Slider, Tooltip } from '@heroui/react';
import {
  Archive,
  CheckCircle2,
  Download,
  FileArchive,
  FileImage,
  ImageDown,
  ImagePlus,
  Presentation,
  RefreshCcw,
  Trash2,
  UploadCloud,
  XCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

type OutputFormat = 'image/webp' | 'image/jpeg' | 'image/png';
type ScaleOption = 1 | 0.75 | 0.5 | 0.25;
type ItemStatus = 'queued' | 'processing' | 'done' | 'error';
type PptxStatus = 'idle' | 'ready' | 'processing' | 'done' | 'error';

type ImageItem = {
  id: string;
  file: File;
  originalUrl: string;
  compressedUrl?: string;
  compressedBlob?: Blob;
  status: ItemStatus;
  width?: number;
  height?: number;
  compressedSize?: number;
  error?: string;
};

type PptxStats = {
  imageCount: number;
  compressedCount: number;
  skippedCount: number;
  originalMediaSize: number;
  compressedMediaSize: number;
  outputSize: number;
};

const formatOptions: Array<{ label: string; value: OutputFormat }> = [
  { label: 'WebP', value: 'image/webp' },
  { label: 'JPEG', value: 'image/jpeg' },
  { label: 'PNG', value: 'image/png' },
];

const scaleOptions: Array<{ label: string; value: ScaleOption }> = [
  { label: '100%', value: 1 },
  { label: '75%', value: 0.75 },
  { label: '50%', value: 0.5 },
  { label: '25%', value: 0.25 },
];

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const extensionByFormat: Record<OutputFormat, string> = {
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const makeDownloadName = (name: string, format: OutputFormat) => {
  const baseName = name.replace(/\.[^.]+$/, '') || 'compressed-image';
  return `${baseName}-compressed.${extensionByFormat[format]}`;
};

const makePptxDownloadName = (name: string) => {
  const baseName = name.replace(/\.pptx$/i, '') || 'compressed-deck';
  return `${baseName}-compressed.pptx`;
};

const getPptxImageFormat = (path: string): OutputFormat | null => {
  const extension = path.split('.').pop()?.toLowerCase();

  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg';
  if (extension === 'png') return 'image/png';
  if (extension === 'webp') return 'image/webp';

  return null;
};

async function decodeImage(file: File) {
  if ('createImageBitmap' in window) {
    try {
      return await createImageBitmap(file);
    } catch {
      // Fall back to HTMLImageElement for formats the browser can display but
      // createImageBitmap cannot decode consistently.
    }
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('這個圖片格式目前無法由瀏覽器解碼。'));
      img.src = objectUrl;
    });

    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function compressImage(file: File, quality: number, scale: ScaleOption, format: OutputFormat) {
  const source = await decodeImage(file);
  const sourceWidth = source.width;
  const sourceHeight = source.height;
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha: format !== 'image/jpeg' });

  if (!context) {
    throw new Error('目前瀏覽器無法建立圖片壓縮環境。');
  }

  canvas.width = width;
  canvas.height = height;

  if (format === 'image/jpeg') {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(source, 0, 0, width, height);

  if ('close' in source && typeof source.close === 'function') {
    source.close();
  }

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error('圖片壓縮失敗，請換一張圖片再試一次。'));
          return;
        }

        resolve(result);
      },
      format,
      format === 'image/png' ? undefined : quality / 100,
    );
  });

  return { blob, width, height };
}

async function compressPptxImages(file: File, quality: number, scale: ScaleOption) {
  const { default: JSZip } = await import('jszip');
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const imageEntries = Object.values(zip.files).filter((entry) => {
    const imageFormat = getPptxImageFormat(entry.name);
    return !entry.dir && entry.name.startsWith('ppt/media/') && Boolean(imageFormat);
  });

  let compressedCount = 0;
  let skippedCount = 0;
  let originalMediaSize = 0;
  let compressedMediaSize = 0;

  for (const entry of imageEntries) {
    const imageFormat = getPptxImageFormat(entry.name);
    if (!imageFormat) continue;

    const originalBlob = await entry.async('blob');
    originalMediaSize += originalBlob.size;

    try {
      const imageFile = new File([originalBlob], entry.name.split('/').pop() ?? 'slide-image', {
        type: imageFormat,
      });
      const { blob } = await compressImage(imageFile, quality, scale, imageFormat);

      if (blob.size < originalBlob.size) {
        zip.file(entry.name, blob);
        compressedCount += 1;
        compressedMediaSize += blob.size;
      } else {
        skippedCount += 1;
        compressedMediaSize += originalBlob.size;
      }
    } catch {
      skippedCount += 1;
      compressedMediaSize += originalBlob.size;
    }
  }

  const outputBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  });

  return {
    blob: outputBlob,
    stats: {
      imageCount: imageEntries.length,
      compressedCount,
      skippedCount,
      originalMediaSize,
      compressedMediaSize,
      outputSize: outputBlob.size,
    },
  };
}

export default function ImageCompressorClient() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pptxInputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<ImageItem[]>([]);
  const [pptxFile, setPptxFile] = useState<File | null>(null);
  const [pptxStatus, setPptxStatus] = useState<PptxStatus>('idle');
  const [pptxResultUrl, setPptxResultUrl] = useState<string | null>(null);
  const [pptxStats, setPptxStats] = useState<PptxStats | null>(null);
  const [pptxError, setPptxError] = useState<string | null>(null);
  const [quality, setQuality] = useState(72);
  const [scale, setScale] = useState<ScaleOption>(1);
  const [format, setFormat] = useState<OutputFormat>('image/webp');
  const [isDragging, setIsDragging] = useState(false);
  const [isPptxDragging, setIsPptxDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const completedItems = useMemo(() => items.filter((item) => item.status === 'done' && item.compressedUrl), [items]);
  const totalOriginalSize = useMemo(() => items.reduce((sum, item) => sum + item.file.size, 0), [items]);
  const totalCompressedSize = useMemo(
    () => completedItems.reduce((sum, item) => sum + (item.compressedSize ?? 0), 0),
    [completedItems],
  );
  const savedRatio = totalOriginalSize > 0 && totalCompressedSize > 0
    ? Math.max(0, Math.round((1 - totalCompressedSize / totalOriginalSize) * 100))
    : 0;

  useEffect(() => {
    return () => {
      items.forEach((item) => {
        URL.revokeObjectURL(item.originalUrl);
        if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
      });
    };
  }, [items]);

  useEffect(() => {
    return () => {
      if (pptxResultUrl) URL.revokeObjectURL(pptxResultUrl);
    };
  }, [pptxResultUrl]);

  const addFiles = useCallback((fileList: FileList | File[]) => {
    const imageFiles = Array.from(fileList).filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length === 0) return;

    setItems((currentItems) => [
      ...currentItems,
      ...imageFiles.map((file) => ({
        id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
        file,
        originalUrl: URL.createObjectURL(file),
        status: 'queued' as const,
      })),
    ]);
  }, []);

  const addPptxFile = useCallback((fileList: FileList | File[]) => {
    const nextFile = Array.from(fileList).find((file) => file.name.toLowerCase().endsWith('.pptx'));

    if (!nextFile) {
      setPptxStatus('error');
      setPptxError('請選擇 .pptx 檔案，目前不支援舊版 .ppt。');
      return;
    }

    if (pptxResultUrl) URL.revokeObjectURL(pptxResultUrl);

    setPptxFile(nextFile);
    setPptxStatus('ready');
    setPptxResultUrl(null);
    setPptxStats(null);
    setPptxError(null);
  }, [pptxResultUrl]);

  const clearItems = () => {
    items.forEach((item) => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
    });
    setItems([]);
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => {
      const target = currentItems.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalUrl);
        if (target.compressedUrl) URL.revokeObjectURL(target.compressedUrl);
      }

      return currentItems.filter((item) => item.id !== id);
    });
  };

  const runCompression = async () => {
    if (items.length === 0 || isCompressing) return;

    setIsCompressing(true);
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);

        return {
          ...item,
          compressedUrl: undefined,
          compressedBlob: undefined,
          compressedSize: undefined,
          error: undefined,
          status: 'queued',
        };
      }),
    );

    for (const item of items) {
      setItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem.id === item.id ? { ...currentItem, status: 'processing' } : currentItem,
        ),
      );

      try {
        const result = await compressImage(item.file, quality, scale, format);
        const compressedUrl = URL.createObjectURL(result.blob);

        setItems((currentItems) =>
          currentItems.map((currentItem) =>
            currentItem.id === item.id
              ? {
                  ...currentItem,
                  compressedUrl,
                  compressedBlob: result.blob,
                  compressedSize: result.blob.size,
                  width: result.width,
                  height: result.height,
                  status: 'done',
                }
              : currentItem,
          ),
        );
      } catch (error) {
        setItems((currentItems) =>
          currentItems.map((currentItem) =>
            currentItem.id === item.id
              ? {
                  ...currentItem,
                  status: 'error',
                  error: error instanceof Error ? error.message : '圖片壓縮失敗。',
                }
              : currentItem,
          ),
        );
      }
    }

    setIsCompressing(false);
  };

  const downloadItem = (item: ImageItem) => {
    if (!item.compressedUrl) return;

    const link = document.createElement('a');
    link.href = item.compressedUrl;
    link.download = makeDownloadName(item.file.name, format);
    link.click();
  };

  const downloadAll = () => {
    completedItems.forEach((item, index) => {
      window.setTimeout(() => downloadItem(item), index * 140);
    });
  };

  const runPptxCompression = async () => {
    if (!pptxFile || pptxStatus === 'processing') return;

    if (pptxResultUrl) URL.revokeObjectURL(pptxResultUrl);

    setPptxStatus('processing');
    setPptxResultUrl(null);
    setPptxStats(null);
    setPptxError(null);

    try {
      const result = await compressPptxImages(pptxFile, quality, scale);
      setPptxStats(result.stats);

      if (result.stats.imageCount === 0) {
        setPptxStatus('error');
        setPptxError('這份 PPTX 沒有找到可壓縮的 JPG、PNG 或 WebP 圖片。');
        return;
      }

      setPptxResultUrl(URL.createObjectURL(result.blob));
      setPptxStatus('done');
    } catch (error) {
      setPptxStatus('error');
      setPptxError(error instanceof Error ? error.message : 'PPTX 壓縮失敗，請確認檔案是否可正常開啟。');
    }
  };

  const downloadPptx = () => {
    if (!pptxFile || !pptxResultUrl) return;

    const link = document.createElement('a');
    link.href = pptxResultUrl;
    link.download = makePptxDownloadName(pptxFile.name);
    link.click();
  };

  const clearPptx = () => {
    if (pptxResultUrl) URL.revokeObjectURL(pptxResultUrl);
    setPptxFile(null);
    setPptxStatus('idle');
    setPptxResultUrl(null);
    setPptxStats(null);
    setPptxError(null);
  };

  const progressValue = items.length === 0 ? 0 : Math.round((completedItems.length / items.length) * 100);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_74%)] px-6 pb-16 pt-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-7"
          >
            <div className="inline-flex rounded-full border border-orange-100 bg-white/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-orange-700 shadow-sm">
              Browser Tool
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black leading-[1.03] tracking-tight text-slate-950 md:text-7xl">
                圖片與 PPTX 壓縮工具
              </h1>
              <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
                批次處理圖片大小，也能壓縮 PPTX 內嵌圖片；檔案只在你的瀏覽器中轉換，適合快速整理簡報、網頁素材與分享圖片。
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-3 gap-3">
              {[
                ['原始大小', totalOriginalSize ? formatFileSize(totalOriginalSize) : '0 B'],
                ['壓縮後', totalCompressedSize ? formatFileSize(totalCompressedSize) : '0 B'],
                ['節省', `${savedRatio}%`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-orange-100 bg-white/70 p-4 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">{label}</p>
                  <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-[0_24px_80px_rgba(194,65,12,0.09)]"
          >
            <div
              role="button"
              tabIndex={0}
              className={`flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-8 text-center transition-all ${
                isDragging
                  ? 'border-orange-500 bg-orange-50 shadow-inner'
                  : 'border-orange-100 bg-slate-50/70 hover:border-orange-300 hover:bg-orange-50/45'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') fileInputRef.current?.click();
              }}
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                addFiles(event.dataTransfer.files);
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) addFiles(event.target.files);
                  event.currentTarget.value = '';
                }}
              />
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-700/20">
                <UploadCloud size={30} />
              </div>
              <p className="text-2xl font-black tracking-tight text-slate-950">拖曳圖片到這裡</p>
              <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-slate-500">
                或點選下方按鈕選擇一張或多張圖片。
              </p>
              <Button
                className="mt-7 h-12 rounded-xl bg-[var(--theme-primary)] px-6 font-bold text-white shadow-lg shadow-orange-700/20"
                startContent={<ImagePlus size={18} />}
                onPress={() => fileInputRef.current?.click()}
              >
                選擇圖片
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto mb-10 max-w-7xl">
          <div className="grid gap-6 rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm lg:grid-cols-[0.85fr_1.15fr] lg:p-6">
            <div
              role="button"
              tabIndex={0}
              className={`flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-7 text-center transition-all ${
                isPptxDragging
                  ? 'border-orange-500 bg-orange-50 shadow-inner'
                  : 'border-orange-100 bg-slate-50/70 hover:border-orange-300 hover:bg-orange-50/45'
              }`}
              onClick={() => pptxInputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') pptxInputRef.current?.click();
              }}
              onDragEnter={(event) => {
                event.preventDefault();
                setIsPptxDragging(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsPptxDragging(true);
              }}
              onDragLeave={() => setIsPptxDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsPptxDragging(false);
                addPptxFile(event.dataTransfer.files);
              }}
            >
              <input
                ref={pptxInputRef}
                type="file"
                accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) addPptxFile(event.target.files);
                  event.currentTarget.value = '';
                }}
              />
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
                <Presentation size={28} />
              </div>
              <p className="text-2xl font-black tracking-tight text-slate-950">PPTX 圖片壓縮</p>
              <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-slate-500">
                拖曳或選擇 .pptx，系統會壓縮簡報內的 JPG、PNG、WebP 圖片，並重新輸出可下載的簡報。
              </p>
              <Button
                className="mt-6 h-12 rounded-xl bg-slate-950 px-6 font-bold text-white shadow-lg shadow-slate-900/15"
                startContent={<FileArchive size={18} />}
                onPress={() => pptxInputRef.current?.click()}
              >
                選擇 PPTX
              </Button>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-[1.5rem] bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] p-6 ring-1 ring-orange-100/70">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Chip variant="flat" color={pptxStatus === 'error' ? 'danger' : pptxStatus === 'done' ? 'success' : 'primary'} className="font-bold">
                    {pptxStatus === 'idle' && 'No PPTX'}
                    {pptxStatus === 'ready' && 'Ready'}
                    {pptxStatus === 'processing' && 'Processing'}
                    {pptxStatus === 'done' && 'Done'}
                    {pptxStatus === 'error' && 'Failed'}
                  </Chip>
                  <p className="min-w-0 truncate text-xl font-black tracking-tight text-slate-950">
                    {pptxFile ? pptxFile.name : '尚未選擇簡報'}
                  </p>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-slate-500">
                  PPTX 模式會保留簡報內部路徑與關聯，只替換同一個媒體檔案內容。JPEG 會套用品質設定，PNG 主要透過尺寸比例縮小。
                </p>
              </div>

              {pptxStatus === 'processing' && (
                <Progress
                  aria-label="PPTX 壓縮中"
                  isIndeterminate
                  classNames={{ indicator: 'bg-orange-600' }}
                />
              )}

              {pptxStats && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    ['圖片數', `${pptxStats.imageCount}`],
                    ['已壓縮', `${pptxStats.compressedCount}`],
                    ['圖片節省', `${Math.max(0, Math.round((1 - pptxStats.compressedMediaSize / Math.max(1, pptxStats.originalMediaSize)) * 100))}%`],
                    ['輸出大小', formatFileSize(pptxStats.outputSize)],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-orange-100 bg-white/80 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">{label}</p>
                      <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {pptxError && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{pptxError}</p>}

              <div className="grid gap-3 sm:grid-cols-3">
                <Button
                  className="h-12 rounded-xl bg-[var(--theme-primary)] font-bold text-white shadow-lg shadow-orange-700/20 sm:col-span-1"
                  startContent={pptxStatus === 'processing' ? <RefreshCcw className="animate-spin" size={18} /> : <ImageDown size={18} />}
                  isDisabled={!pptxFile || pptxStatus === 'processing'}
                  onPress={runPptxCompression}
                >
                  {pptxStatus === 'processing' ? '壓縮中' : '壓縮 PPTX'}
                </Button>
                <Button
                  variant="flat"
                  className="h-12 rounded-xl bg-emerald-50 font-bold text-emerald-700"
                  startContent={<Download size={18} />}
                  isDisabled={!pptxResultUrl}
                  onPress={downloadPptx}
                >
                  下載簡報
                </Button>
                <Button
                  variant="flat"
                  className="h-12 rounded-xl bg-slate-100 font-bold text-slate-700"
                  startContent={<Trash2 size={18} />}
                  isDisabled={!pptxFile || pptxStatus === 'processing'}
                  onPress={clearPptx}
                >
                  清除
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                  <Archive size={21} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-600">Settings</p>
                  <h2 className="text-xl font-black tracking-tight text-slate-950">壓縮設定</h2>
                </div>
              </div>

              <div className="mt-7 space-y-7">
                <Slider
                  label="圖片品質"
                  step={1}
                  minValue={20}
                  maxValue={95}
                  value={quality}
                  onChange={(value) => setQuality(Array.isArray(value) ? value[0] : value)}
                  classNames={{
                    label: 'font-bold text-slate-700',
                    value: 'font-black text-orange-700',
                  }}
                  getValue={(value) => `${value}%`}
                />

                <div>
                  <p className="mb-3 text-sm font-bold text-slate-700">尺寸比例</p>
                  <div className="grid grid-cols-4 gap-2">
                    {scaleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`h-10 rounded-xl text-sm font-black transition-colors ${
                          scale === option.value
                            ? 'bg-orange-600 text-white shadow-lg shadow-orange-700/20'
                            : 'bg-slate-50 text-slate-600 hover:bg-orange-50 hover:text-orange-700'
                        }`}
                        onClick={() => setScale(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-bold text-slate-700">輸出格式</p>
                  <div className="grid grid-cols-3 gap-2">
                    {formatOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`h-10 rounded-xl text-sm font-black transition-colors ${
                          format === option.value
                            ? 'bg-slate-950 text-white'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                        onClick={() => setFormat(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-3">
                <Button
                  className="h-12 w-full rounded-xl bg-[var(--theme-primary)] font-bold text-white shadow-lg shadow-orange-700/20"
                  startContent={isCompressing ? <RefreshCcw className="animate-spin" size={18} /> : <ImageDown size={18} />}
                  isDisabled={items.length === 0 || isCompressing}
                  onPress={runCompression}
                >
                  {isCompressing ? '壓縮中' : '開始壓縮'}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="flat"
                    className="h-11 rounded-xl bg-emerald-50 font-bold text-emerald-700"
                    startContent={<Download size={17} />}
                    isDisabled={completedItems.length === 0}
                    onPress={downloadAll}
                  >
                    全部下載
                  </Button>
                  <Button
                    variant="flat"
                    className="h-11 rounded-xl bg-slate-100 font-bold text-slate-700"
                    startContent={<Trash2 size={17} />}
                    isDisabled={items.length === 0 || isCompressing}
                    onPress={clearItems}
                  >
                    清空
                  </Button>
                </div>
              </div>

              {items.length > 0 && (
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                    <span>Progress</span>
                    <span>{completedItems.length}/{items.length}</span>
                  </div>
                  <Progress
                    aria-label="壓縮進度"
                    value={progressValue}
                    classNames={{
                      indicator: 'bg-orange-600',
                    }}
                  />
                </div>
              )}
            </div>
          </aside>

          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-rose-700">Queue</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">圖片清單</h2>
              </div>
              <Chip variant="flat" color="primary" className="w-fit font-bold">
                {items.length} files
              </Chip>
            </div>

            {items.length === 0 ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/70 p-8 text-center">
                <FileImage size={48} className="text-slate-300" />
                <p className="mt-5 text-xl font-black text-slate-950">尚未選擇圖片</p>
                <p className="mt-2 max-w-md text-sm font-semibold leading-relaxed text-slate-500">
                  加入圖片後，這裡會顯示每張圖的壓縮狀態與下載按鈕。
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {items.map((item) => {
                  const saved = item.compressedSize
                    ? Math.max(0, Math.round((1 - item.compressedSize / item.file.size) * 100))
                    : 0;

                  return (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:grid-cols-[116px_1fr_auto]"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
                        <img src={item.originalUrl} alt={item.file.name} className="h-full w-full object-cover" />
                      </div>

                      <div className="min-w-0 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {item.status === 'done' && (
                            <Chip size="sm" color="success" variant="flat" startContent={<CheckCircle2 size={14} />} className="font-bold">
                              Done
                            </Chip>
                          )}
                          {item.status === 'processing' && (
                            <Chip size="sm" color="warning" variant="flat" className="font-bold">
                              Processing
                            </Chip>
                          )}
                          {item.status === 'queued' && (
                            <Chip size="sm" variant="flat" className="font-bold">
                              Ready
                            </Chip>
                          )}
                          {item.status === 'error' && (
                            <Chip size="sm" color="danger" variant="flat" startContent={<XCircle size={14} />} className="font-bold">
                              Failed
                            </Chip>
                          )}
                          <p className="truncate text-base font-black text-slate-950">{item.file.name}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                          <span className="rounded-full bg-slate-50 px-3 py-1">原始 {formatFileSize(item.file.size)}</span>
                          {item.width && item.height && (
                            <span className="rounded-full bg-slate-50 px-3 py-1">
                              {item.width} x {item.height}
                            </span>
                          )}
                          {item.compressedSize && (
                            <>
                              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                                壓縮後 {formatFileSize(item.compressedSize)}
                              </span>
                              <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">節省 {saved}%</span>
                            </>
                          )}
                        </div>

                        {item.status === 'processing' && (
                          <Progress
                            aria-label={`${item.file.name} 壓縮中`}
                            isIndeterminate
                            classNames={{ indicator: 'bg-orange-600' }}
                          />
                        )}
                        {item.error && <p className="text-sm font-semibold text-rose-600">{item.error}</p>}
                      </div>

                      <div className="flex items-center gap-2 sm:flex-col sm:justify-center">
                        <Tooltip content="下載壓縮後圖片">
                          <Button
                            isIconOnly
                            aria-label="下載壓縮後圖片"
                            className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700"
                            isDisabled={!item.compressedUrl}
                            onPress={() => downloadItem(item)}
                          >
                            <Download size={18} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="移除圖片">
                          <Button
                            isIconOnly
                            aria-label="移除圖片"
                            className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600"
                            isDisabled={isCompressing}
                            onPress={() => removeItem(item.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </Tooltip>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
