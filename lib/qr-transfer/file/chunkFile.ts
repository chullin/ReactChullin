export function chunkUint8Array(bytes: Uint8Array, chunkSize: number): Uint8Array[] {
  if (chunkSize <= 0) {
    throw new Error('chunkSize must be greater than zero');
  }

  if (bytes.length === 0) {
    return [new Uint8Array()];
  }

  const chunks: Uint8Array[] = [];

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    chunks.push(bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length)));
  }

  return chunks;
}
