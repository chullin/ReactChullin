import type { StoredChunk } from '../protocol/types';

export function rebuildBlobFromChunks(chunks: StoredChunk[], mimeType: string): Blob {
  const ordered = chunks.toSorted((a, b) => a.index - b.index);
  return new Blob(
    ordered.map((chunk) => chunk.data),
    { type: mimeType || 'application/octet-stream' },
  );
}

