import { createHash } from 'node:crypto';
import { marketAccountSchema, type MarketAccountDocument, type MarketAccountSnapshot } from './account-schema';

function credentials() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_KV_REST_API_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.UPSTASH_REDIS_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token || !url.startsWith('https://')) throw new Error('Account storage unavailable');
  return { url, token };
}

async function command(args: (string | number)[]) {
  const { url, token } = credentials();
  const response = await fetch(url, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args), cache: 'no-store', signal: AbortSignal.timeout(8000),
  });
  const body = await response.json();
  if (!response.ok || body.error) throw new Error('Account storage unavailable');
  return body.result;
}

function accountKey(subject: string) {
  return `market-account:v1:${createHash('sha256').update(`google:${subject}`).digest('hex')}`;
}

export async function readMarketAccount(subject: string): Promise<MarketAccountDocument | null> {
  const raw = await command(['GET', accountKey(subject)]);
  if (raw === null) return null;
  const document = JSON.parse(raw) as MarketAccountDocument;
  if (!Number.isSafeInteger(document.revision) || document.revision < 1) throw new Error('Invalid account data');
  return { ...document, snapshot: marketAccountSchema.parse(document.snapshot) };
}

export async function writeMarketAccount(subject: string, revision: number, snapshot: MarketAccountSnapshot) {
  const document: MarketAccountDocument = { revision: revision + 1, updatedAt: new Date().toISOString(), snapshot };
  // A stale device must not overwrite edits saved by another device.
  const script = "local raw=redis.call('GET',KEYS[1]); local rev=0; if raw then rev=cjson.decode(raw).revision end; if rev~=tonumber(ARGV[1]) then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
  const result = await command(['EVAL', script, 1, accountKey(subject), revision, JSON.stringify(document)]);
  return result === 1 ? document : null;
}
