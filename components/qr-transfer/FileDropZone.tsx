'use client';

import { Upload } from 'lucide-react';
import { useRef, useState } from 'react';

interface FileDropZoneProps {
  accept?: string;
  label?: string;
  onFile: (file: File) => void;
}

export default function FileDropZone({ accept, label = 'Drag a file here or click to select', onFile }: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <button
      type="button"
      className={`flex min-h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition ${
        dragging ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 bg-white hover:border-slate-400'
      }`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files.item(0);
        if (file) {
          onFile(file);
        }
      }}
    >
      <Upload className="mb-4 text-slate-500" size={34} />
      <span className="text-lg font-black text-slate-950">{label}</span>
      <span className="mt-2 text-sm font-semibold text-slate-500">100% local. The file never leaves this browser except as QR frames.</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.item(0);
          if (file) {
            onFile(file);
          }
          event.currentTarget.value = '';
        }}
      />
    </button>
  );
}

