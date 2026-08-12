export type TransferStatus = 'receiving' | 'paused' | 'completed' | 'corrupted';

export interface TransferMetadataMessage {
  v: 1;
  t: 'meta';
  id: string;
  name: string;
  mime: string;
  size: number;
  chunks: number;
  chunkSize: number;
  sha256: string;
}

export interface DataChunkMessage {
  v: 1;
  t: 'd';
  id: string;
  i: number;
  d: string;
}

export type QrTransferMessage = TransferMetadataMessage | DataChunkMessage;

export interface TransferSession {
  v: 1;
  transferId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  sha256: string;
  chunkSize: number;
  totalChunks: number;
}

export interface StoredTransfer {
  id: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  totalChunks: number;
  chunkSize: number;
  sha256: string;
  receivedChunks: number;
  createdAt: number;
  updatedAt: number;
  status: TransferStatus;
}

export interface StoredChunk {
  transferId: string;
  index: number;
  data: ArrayBuffer;
}

export interface StorageEstimateInfo {
  usage?: number;
  quota?: number;
  persisted?: boolean;
}
