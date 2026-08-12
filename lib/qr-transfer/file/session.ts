import type { TransferSession } from '../protocol/types';

export function downloadTransferSession(session: TransferSession): void {
  const blob = new Blob([JSON.stringify(session, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${session.transferId}.qrtransfer.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function readTransferSession(file: File): Promise<TransferSession> {
  const parsed = JSON.parse(await file.text()) as Partial<TransferSession>;

  if (
    parsed.v !== 1 ||
    typeof parsed.transferId !== 'string' ||
    typeof parsed.fileName !== 'string' ||
    typeof parsed.fileSize !== 'number' ||
    typeof parsed.sha256 !== 'string' ||
    typeof parsed.chunkSize !== 'number' ||
    typeof parsed.totalChunks !== 'number'
  ) {
    throw new Error('Invalid .qrtransfer.json file');
  }

  return {
    mimeType: parsed.mimeType ?? '',
    ...parsed,
  } as TransferSession;
}
