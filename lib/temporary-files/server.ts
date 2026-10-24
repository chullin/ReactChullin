import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { CHUNK_BYTES, MAX_FILE_BYTES, DRIVE_FILE_SCOPE, TEMPORARY_FOLDER_ID } from './constants';

export class UploadError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status = 400, code?: string) { super(message); this.status = status; this.code = code; }
}
export function requireUploadsEnabled(now = Date.now()) {
  const deadline = process.env.TEMP_UPLOAD_EXPIRES_AT ?? '';
  // A timezone is required so the administrator's intended deadline is unambiguous.
  const parts = /^(\d{4})-(\d{2})-(\d{2})T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.exec(deadline);
  const month = Number(parts?.[2]);
  const day = Number(parts?.[3]);
  const validDate = parts && month >= 1 && month <= 12 && day >= 1 &&
    day <= new Date(Date.UTC(Number(parts[1]), month, 0)).getUTCDate();
  const expiresAt = validDate ? Date.parse(deadline) : NaN;
  if (process.env.TEMP_UPLOAD_ENABLED !== 'true' || !Number.isFinite(expiresAt) || expiresAt <= now) {
    throw new UploadError('暫存空間目前未開放，請在需要使用時由管理者啟用。', 503, 'UPLOAD_DISABLED');
  }
}
function configuredValue(name: string) {
  const aliases: Record<string, string[]> = {
    UPSTASH_REDIS_REST_URL: ['UPSTASH_REDIS_KV_REST_API_URL', 'KV_REST_API_URL'],
    UPSTASH_REDIS_REST_TOKEN: ['UPSTASH_REDIS_KV_REST_API_TOKEN', 'KV_REST_API_TOKEN'],
  };
  return [name, ...(aliases[name] ?? [])].map(key => process.env[key]).find(Boolean);
}
export function setting(name: string) {
  const value = configuredValue(name);
  if (!value) throw new UploadError('暫存空間尚未設定完成，請聯絡網站管理者。', 503);
  return value;
}
function key() {
  const secret = setting('TEMP_UPLOAD_SECRET');
  if (secret.length < 32) throw new UploadError('網站金鑰設定不完整。', 503);
  // Changing the grant, destination or opening window revokes previous sessions/tickets.
  return createHash('sha256').update([DRIVE_FILE_SCOPE, TEMPORARY_FOLDER_ID, secret,
    setting('TEMP_UPLOAD_PASSWORD'), process.env.TEMP_UPLOAD_EXPIRES_AT ?? '',
    process.env.GOOGLE_DRIVE_REFRESH_TOKEN ?? ''].join('\0')).digest();
}
export function seal(value: object, purpose: string, seconds: number) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key(), iv);
  cipher.setAAD(Buffer.from(purpose));
  const data = Buffer.from(JSON.stringify({ ...value, exp: Date.now() + seconds * 1000 }));
  return Buffer.concat([iv, cipher.update(data), cipher.final(), cipher.getAuthTag()]).toString('base64url');
}
export function unseal<T>(token: string, purpose: string): T {
  try {
    if (token.length > 12000) throw new Error();
    const data = Buffer.from(token, 'base64url');
    const decipher = createDecipheriv('aes-256-gcm', key(), data.subarray(0, 12));
    decipher.setAAD(Buffer.from(purpose));
    decipher.setAuthTag(data.subarray(-16));
    const payload = JSON.parse(Buffer.concat([decipher.update(data.subarray(12, -16)), decipher.final()]).toString());
    if (!Number.isFinite(payload.exp) || payload.exp <= Date.now()) throw new Error();
    return payload;
  } catch {
    throw new UploadError('登入或上傳工作已失效，請重新登入或重新選擇檔案。', 401);
  }
}
export function passwordMatches(input: unknown) {
  const password = setting('TEMP_UPLOAD_PASSWORD');
  if (password.length < 16) throw new UploadError('網站密碼至少需設定 16 個字元。', 503);
  if (typeof input !== 'string' || input.length > 1024) return false;
  return timingSafeEqual(createHash('sha256').update(input).digest(), createHash('sha256').update(password).digest());
}
export function metadata(input: { name?: unknown; size?: unknown }) {
  if (typeof input.name !== 'string' || !input.name.trim() || input.name.length > 180 || /[\x00-\x1f\x7f/\\]/.test(input.name))
    throw new UploadError('檔名不可空白、過長或包含路徑符號。');
  if (typeof input.size !== 'number' || !Number.isSafeInteger(input.size) || input.size <= 0 || input.size > MAX_FILE_BYTES)
    throw new UploadError('請選擇非空白且不超過 2 GB 的檔案。');
  return { name: input.name.trim(), size: input.size };
}
export async function readBody(request: Request, limit: number) {
  if (Number(request.headers.get('content-length')) > limit) throw new UploadError('資料超過單次傳輸上限。', 413);
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.length;
      if (size > limit) { await reader.cancel(); throw new UploadError('資料超過單次傳輸上限。', 413); }
      chunks.push(part.value);
    }
  } finally { reader.releaseLock(); }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.length; }
  return result;
}
const localAttempts = new Map<string, { count: number; until: number }>();
export async function limitLogin(ip: string) {
  const bucket = createHash('sha256').update(ip).digest('hex');
  if (process.env.NODE_ENV !== 'production' && !configuredValue('UPSTASH_REDIS_REST_URL')) {
    const now = Date.now();
    for (const [k, v] of localAttempts) if (v.until < now) localAttempts.delete(k);
    const value = localAttempts.get(bucket) ?? { count: 0, until: now + 900000 };
    value.count++; localAttempts.set(bucket, value);
    if (value.count > 10) throw new UploadError('嘗試次數過多，請 15 分鐘後再試。', 429);
    return;
  }
  // Shared across serverless instances; fail closed when the limiter is unavailable.
  const url = setting('UPSTASH_REDIS_REST_URL');
  if (!url.startsWith('https://')) throw new UploadError('登入保護設定錯誤。', 503);
  try {
    const result = await fetch(url, {
      method: 'POST', headers: { Authorization: 'Bearer ' + setting('UPSTASH_REDIS_REST_TOKEN'), 'Content-Type': 'application/json' },
      body: JSON.stringify(['EVAL', "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n", '1', 'temporary-files:login:' + bucket]),
      signal: AbortSignal.timeout(8000), cache: 'no-store',
    });
    const body = await result.json();
    if (!result.ok || body.error || !Number.isInteger(body.result)) throw new Error();
    if (body.result > 10) throw new UploadError('嘗試次數過多，請 15 分鐘後再試。', 429);
  } catch (error) {
    if (error instanceof UploadError) throw error;
    throw new UploadError('登入保護暫時無法使用，請稍後重試。', 503);
  }
}
export async function accessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', body: new URLSearchParams({
      client_id: setting('GOOGLE_DRIVE_CLIENT_ID'), client_secret: setting('GOOGLE_DRIVE_CLIENT_SECRET'),
      refresh_token: setting('GOOGLE_DRIVE_REFRESH_TOKEN'), grant_type: 'refresh_token',
    }), signal: AbortSignal.timeout(15000), cache: 'no-store',
  });
  if (!response.ok) throw new UploadError('Google Drive 授權失效或暫時無法使用，請管理者檢查授權。', 503);
  const body = await response.json();
  if (typeof body.access_token !== 'string') throw new UploadError('無法取得儲存空間授權。', 503);
  // Do not silently keep using a previous full-Drive grant after migration.
  if (typeof body.scope !== 'string' || body.scope.trim() !== DRIVE_FILE_SCOPE)
    throw new UploadError('Google 授權範圍不符，請管理者重新完成 drive.file 與資料夾選取設定。', 503, 'DRIVE_SCOPE_MISMATCH');
  return body.access_token as string;
}
export type Ticket = { url: string; size: number };
function safeSession(url: string) {
  const target = new URL(url);
  if (target.origin !== 'https://www.googleapis.com' || target.pathname !== '/upload/drive/v3/files' || !target.searchParams.get('upload_id'))
    throw new UploadError('儲存服務回傳了無效的上傳工作。', 502);
}
export async function startUpload(input: { name?: unknown; size?: unknown }) {
  const file = metadata(input);
  const folder = setting('GOOGLE_DRIVE_FOLDER_ID');
  if (folder !== TEMPORARY_FOLDER_ID) throw new UploadError('儲存資料夾必須是指定的暫存資料夾。', 503);
  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,size', {
    method: 'POST', headers: {
      Authorization: 'Bearer ' + await accessToken(), 'Content-Type': 'application/json',
      'X-Upload-Content-Type': 'application/octet-stream', 'X-Upload-Content-Length': String(file.size),
    }, body: JSON.stringify({ name: file.name, parents: [folder] }),
    redirect: 'manual', signal: AbortSignal.timeout(20000), cache: 'no-store',
  });
  if (!response.ok) throw new UploadError('無法建立上傳工作，請檢查 Drive 資料夾權限及剩餘空間。', 502);
  const url = response.headers.get('location');
  if (!url) throw new UploadError('無法建立上傳工作。', 502);
  safeSession(url);
  return seal({ url, size: file.size }, 'upload', 6 * 24 * 3600);
}
export function uploadTicket(token: string) {
  let ticket: Ticket;
  try { ticket = unseal<Ticket>(token, 'upload'); }
  catch { throw new UploadError('上傳工作已失效，請重新開始上傳。', 410); }
  safeSession(ticket.url);
  if (!Number.isSafeInteger(ticket.size) || ticket.size < 1 || ticket.size > MAX_FILE_BYTES)
    throw new UploadError('無效的上傳大小。');
  return ticket;
}
export function validateChunk(ticket: Ticket, offset: number, length: number) {
  if (!Number.isSafeInteger(offset) || offset < 0 || offset % (256 * 1024) !== 0 ||
      length < 1 || length > CHUNK_BYTES || offset + length > ticket.size ||
      (offset + length < ticket.size && length % (256 * 1024) !== 0))
    throw new UploadError('檔案分段範圍不正確。');
}
export async function transfer(ticket: Ticket, body?: Uint8Array, offset = 0) {
  const response = await fetch(ticket.url, {
    method: 'PUT', headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Range': body ? 'bytes ' + offset + '-' + (offset + body.length - 1) + '/' + ticket.size : 'bytes */' + ticket.size,
    }, body: body ? Buffer.from(body) : new Uint8Array(),
    redirect: 'manual', signal: AbortSignal.timeout(40000), cache: 'no-store',
  });
  if (response.status === 308) {
    const range = response.headers.get('range');
    const match = range?.match(/^bytes=0-(\d+)$/);
    if (range && !match) throw new UploadError('無法確認上傳進度，請稍後重試。', 502);
    const next = match ? Number(match[1]) + 1 : 0;
    if (!Number.isSafeInteger(next) || next < 0 || next > ticket.size) throw new UploadError('上傳進度異常。', 502);
    return { complete: false, offset: next };
  }
  if (response.status === 200 || response.status === 201) {
    const result = await response.json();
    if (typeof result.id !== 'string') throw new UploadError('無法確認檔案儲存結果。', 502);
    return { complete: true, offset: ticket.size };
  }
  if (response.status === 404 || response.status === 410) throw new UploadError('上傳工作已過期，請重新選擇檔案開始上傳。', 410);
  throw new UploadError('傳輸暫時中斷，請按繼續上傳；若持續失敗，請檢查 Drive 空間與授權。', 503);
}
