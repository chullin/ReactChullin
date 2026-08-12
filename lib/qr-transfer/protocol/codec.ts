import { QR_PROTOCOL_VERSION } from '../config';
import type { DataChunkMessage, QrTransferMessage, TransferMetadataMessage } from './types';

export function encodeMetadataMessage(message: Omit<TransferMetadataMessage, 'v' | 't'>): string {
  return JSON.stringify({
    v: QR_PROTOCOL_VERSION,
    t: 'meta',
    ...message,
  } satisfies TransferMetadataMessage);
}

export function encodeDataChunkMessage(message: Omit<DataChunkMessage, 'v' | 't'>): string {
  return JSON.stringify({
    v: QR_PROTOCOL_VERSION,
    t: 'd',
    ...message,
  } satisfies DataChunkMessage);
}

export function decodeQrTransferMessage(raw: string): QrTransferMessage | null {
  try {
    const value = JSON.parse(raw) as Partial<QrTransferMessage>;

    if (value.v !== QR_PROTOCOL_VERSION || typeof value.t !== 'string' || typeof value.id !== 'string') {
      return null;
    }

    if (value.t === 'meta') {
      if (
        typeof value.name === 'string' &&
        typeof value.mime === 'string' &&
        typeof value.size === 'number' &&
        typeof value.chunks === 'number' &&
        typeof value.chunkSize === 'number' &&
        typeof value.sha256 === 'string'
      ) {
        return value as TransferMetadataMessage;
      }
    }

    if (value.t === 'd') {
      if (typeof value.i === 'number' && Number.isInteger(value.i) && typeof value.d === 'string') {
        return value as DataChunkMessage;
      }
    }

    return null;
  } catch {
    return null;
  }
}

