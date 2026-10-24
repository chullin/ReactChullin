import { NextRequest, NextResponse } from 'next/server';
import { CHUNK_BYTES, SESSION_SECONDS } from '../../../lib/temporary-files/constants';
import { UploadError, limitLogin, metadata, passwordMatches, readBody, requireUploadsEnabled, seal, startUpload, transfer, unseal, uploadTicket, validateChunk } from '../../../lib/temporary-files/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
const COOKIE = 'temporary-files-session';
function json(value: object, status = 200) {
  return NextResponse.json(value, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
function failure(error: unknown) {
  return json({ error: error instanceof UploadError ? error.message : '服務暫時無法使用，請稍後重試。', ...(error instanceof UploadError && error.code ? { code: error.code } : {}) }, error instanceof UploadError ? error.status : 503);
}
function origin(request: NextRequest) {
  if (request.headers.get('origin') !== new URL(request.url).origin) throw new UploadError('請從本站頁面操作。', 403);
}
function authenticated(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value;
  if (!token || !unseal<{ authenticated: boolean }>(token, 'session').authenticated)
    throw new UploadError('請先輸入密碼登入。', 401);
}
function cookie(response: NextResponse, value: string, maxAge: number) {
  response.cookies.set(COOKIE, value, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/api/temporary-files', maxAge });
  return response;
}
export async function GET(request: NextRequest) {
  try { requireUploadsEnabled(); authenticated(request); return json({ authenticated: true }); }
  catch (error) { return failure(error); }
}
export async function POST(request: NextRequest) {
  try {
    requireUploadsEnabled();
    origin(request);
    let input;
    try { input = JSON.parse(new TextDecoder().decode(await readBody(request, 8192))); }
    catch (error) { if (error instanceof UploadError) throw error; throw new UploadError('請求格式錯誤。'); }
    if (!input || typeof input !== 'object') throw new UploadError('請求格式錯誤。');
    if (input.action === 'login') {
      await limitLogin(request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'local');
      if (!passwordMatches(input.password)) throw new UploadError('密碼不正確。', 401);
      return cookie(json({ authenticated: true }), seal({ authenticated: true }, 'session', SESSION_SECONDS), SESSION_SECONDS);
    }
    if (input.action === 'logout') return cookie(json({ authenticated: false }), '', 0);
    authenticated(request);
    if (input.action === 'start') {
      metadata(input);
      return json({ ticket: await startUpload(input), offset: 0, complete: false });
    }
    if (input.action === 'status' && typeof input.ticket === 'string') return json(await transfer(uploadTicket(input.ticket)));
    throw new UploadError('不支援的操作。');
  } catch (error) { return failure(error); }
}
export async function PUT(request: NextRequest) {
  try {
    requireUploadsEnabled();
    origin(request); authenticated(request);
    const ticket = uploadTicket(request.headers.get('x-upload-ticket') || '');
    const rawOffset = request.headers.get('x-upload-offset');
    if (!rawOffset || !/^\d+$/.test(rawOffset)) throw new UploadError('缺少上傳位置。');
    const offset = Number(rawOffset);
    const body = await readBody(request, CHUNK_BYTES);
    validateChunk(ticket, offset, body.length);
    return json(await transfer(ticket, body, offset));
  } catch (error) { return failure(error); }
}
