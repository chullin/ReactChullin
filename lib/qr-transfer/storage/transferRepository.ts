import type { StoredTransfer, TransferMetadataMessage } from '../protocol/types';
import { CHUNK_STORE, idbRequest, idbTransactionDone, openQrTransferDb, TRANSFER_STORE } from './indexedDb';

export async function listTransfers(): Promise<StoredTransfer[]> {
  const db = await openQrTransferDb();
  const transfers = await idbRequest<StoredTransfer[]>(db.transaction(TRANSFER_STORE).objectStore(TRANSFER_STORE).getAll());
  return transfers.toSorted((a, b) => b.updatedAt - a.updatedAt);
}

export async function getTransfer(id: string): Promise<StoredTransfer | undefined> {
  const db = await openQrTransferDb();
  return idbRequest<StoredTransfer | undefined>(db.transaction(TRANSFER_STORE).objectStore(TRANSFER_STORE).get(id));
}

export async function upsertTransferFromMetadata(message: TransferMetadataMessage): Promise<StoredTransfer> {
  const existing = await getTransfer(message.id);
  const now = Date.now();
  const transfer: StoredTransfer = existing
    ? {
        ...existing,
        fileName: message.name,
        mimeType: message.mime,
        fileSize: message.size,
        totalChunks: message.chunks,
        chunkSize: message.chunkSize,
        sha256: message.sha256,
        updatedAt: now,
        status: existing.status === 'completed' ? 'completed' : 'receiving',
      }
    : {
        id: message.id,
        fileName: message.name,
        mimeType: message.mime,
        fileSize: message.size,
        totalChunks: message.chunks,
        chunkSize: message.chunkSize,
        sha256: message.sha256,
        receivedChunks: 0,
        createdAt: now,
        updatedAt: now,
        status: 'receiving',
      };

  const db = await openQrTransferDb();
  const transaction = db.transaction(TRANSFER_STORE, 'readwrite');
  transaction.objectStore(TRANSFER_STORE).put(transfer);
  await idbTransactionDone(transaction);
  return transfer;
}

export async function updateTransfer(transfer: StoredTransfer): Promise<void> {
  const db = await openQrTransferDb();
  const transaction = db.transaction(TRANSFER_STORE, 'readwrite');
  transaction.objectStore(TRANSFER_STORE).put({ ...transfer, updatedAt: Date.now() });
  await idbTransactionDone(transaction);
}

export async function deleteTransfer(id: string): Promise<void> {
  const db = await openQrTransferDb();
  const transaction = db.transaction([TRANSFER_STORE, CHUNK_STORE], 'readwrite');
  transaction.objectStore(TRANSFER_STORE).delete(id);

  const chunkStore = transaction.objectStore(CHUNK_STORE);
  const index = chunkStore.index('by-transfer');
  const cursorRequest = index.openCursor(IDBKeyRange.only(id));

  cursorRequest.onsuccess = () => {
    const cursor = cursorRequest.result;
    if (!cursor) {
      return;
    }
    cursor.delete();
    cursor.continue();
  };

  await idbTransactionDone(transaction);
}

