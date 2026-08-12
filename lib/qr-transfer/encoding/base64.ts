import type { ChunkEncoder } from './encoder';

export const base64UrlEncoder: ChunkEncoder = {
  name: 'base64url',
  encode(data) {
    let binary = '';
    const batchSize = 0x8000;

    for (let offset = 0; offset < data.length; offset += batchSize) {
      const batch = data.subarray(offset, offset + batchSize);
      binary += String.fromCharCode(...batch);
    }

    return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
  },
  decode(payload) {
    const padded = payload.replaceAll('-', '+').replaceAll('_', '/').padEnd(Math.ceil(payload.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  },
};
