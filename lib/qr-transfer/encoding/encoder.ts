export interface ChunkEncoder {
  readonly name: string;
  encode(data: Uint8Array): string;
  decode(payload: string): Uint8Array;
}
