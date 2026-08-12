import type { StoredChunk } from '../protocol/types';
import { CHUNK_STORE, idbRequest, idbTransactionDone, openQrTransferDb, TRANSFER_STORE } from './indexedDb';
import { getTransfer } from './transferRepository';

export async function hasChunk(transferId: string, index: number): Promise<boolean> {
  const db = await openQrTransferDb();
  const key = [transferId, index];
  const existingKey = await idbRequest<IDBValidKey | undefined>(
    db.transaction(CHUNK_STORE).objectStore(CHUNK_STORE).getKey(key),
  );
  return existingKey !== undefined;
}

export async function saveChunkIfMissing(chunk: StoredChunk): Promise<boolean> {
  if (await hasChunk(chunk.transferId, chunk.index)) {
    return false;
  }

  const transfer = await getTransfer(chunk.transferId);
  if (!transfer) {
    return false;
  }

  const db = await openQrTransferDb();
  const transaction = db.transaction([TRANSFER_STORE, CHUNK_STORE], 'readwrite');
  transaction.objectStore(CHUNK_STORE).put(chunk);
  transaction.objectStore(TRANSFER_STORE).put({
    ...transfer,
    receivedChunks: Math.min(transfer.receivedChunks + 1, transfer.totalChunks),
    updatedAt: Date.now(),
    status: transfer.receivedChunks + 1 >= transfer.totalChunks ? 'completed' : 'receiving',
  });
  await idbTransactionDone(transaction);
  return true;
}

export async function getChunksForTransfer(transferId: string): Promise<StoredChunk[]> {
  const db = await openQrTransferDb();
  const chunks = await idbRequest<StoredChunk[]>(
    db.transaction(CHUNK_STORE).objectStore(CHUNK_STORE).index('by-transfer').getAll(transferId),
  );
  return chunks.toSorted((a, b) => a.index - b.index);
}

export async function getMissingChunkIndexes(transferId: string, totalChunks: number, limit = 300): Promise<number[]> {
  const chunks = await getChunksForTransfer(transferId);
  const received = new Set(chunks.map((chunk) => chunk.index));
  const missing: number[] = [];

  for (let index = 0; index < totalChunks && missing.length < limit; index += 1) {
    if (!received.has(index)) {
      missing.push(index);
    }
  }

  return missing;
}

export async function getStoredBytes(transferId: string): Promise<number> {
  const chunks = await getChunksForTransfer(transferId);
  return chunks.reduce((total, chunk) => total + chunk.data.byteLength, 0);
}
