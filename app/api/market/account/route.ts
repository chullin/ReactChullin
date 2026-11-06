import { z } from 'zod';
import { auth, marketAuthConfigured } from '@/lib/market/auth';
import { marketAccountSchema } from '@/lib/market/account-schema';
import { readMarketAccount, writeMarketAccount } from '@/lib/market/account-store';

const bodySchema = z.object({ revision: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER - 1), snapshot: marketAccountSchema });
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });

export async function GET() {
  if (!marketAuthConfigured()) return json({ error: '帳號同步尚未完成設定。' }, 503);
  const session = await auth();
  if (!session?.user?.id) return json({ error: '請先登入 Google。' }, 401);
  try {
    return json({ document: await readMarketAccount(session.user.id) });
  } catch {
    return json({ error: '雲端清單暫時無法讀取，請稍後重試。' }, 503);
  }
}

export async function PUT(request: Request) {
  // Cookie-authenticated writes require an exact same-origin browser request.
  if (request.headers.get('origin') !== new URL(request.url).origin) return json({ error: '無效的請求來源。' }, 403);
  if (!marketAuthConfigured()) return json({ error: '帳號同步尚未完成設定。' }, 503);
  const session = await auth();
  if (!session?.user?.id) return json({ error: '請先登入 Google。' }, 401);
  if (Number(request.headers.get('content-length')) > 256_000) return json({ error: '清單資料過大。' }, 413);
  let input;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: '缺少清單資料。' }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 256_000) { await reader.cancel(); return json({ error: '清單資料過大。' }, 413); }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
    input = bodySchema.parse(JSON.parse(Buffer.concat(chunks).toString('utf8')));
  } catch { return json({ error: '清單格式不正確或超過上限。' }, 400); }
  try {
    const document = await writeMarketAccount(session.user.id, input.revision, input.snapshot);
    if (!document) return json({ error: '另一部裝置已更新清單，請先載入最新版本。' }, 409);
    return json({ document });
  } catch { return json({ error: '儲存失敗，變更仍保留在目前畫面，請重試。' }, 503); }
}
