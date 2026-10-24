import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '暫存空間資料使用說明',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://chullin.tw/temporary-files/privacy' },
};

export default function TemporaryFilesPrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-32 text-slate-900">
      <article className="mx-auto max-w-3xl space-y-8 rounded-2xl border border-slate-200 bg-white p-6 leading-8 shadow-sm sm:p-10">
        <header>
          <p className="text-sm font-semibold text-teal-700">檔案暫存空間</p>
          <h1 className="mt-2 text-3xl font-bold">資料使用說明</h1>
          <p className="mt-3 text-sm text-slate-500">更新日期：2026 年 10 月 24 日</p>
        </header>
        <section>
          <h2 className="text-xl font-bold">用途與處理的資料</h2>
          <p>本功能供網站管理者及獲得網站專用密碼的人員暫存檔案與文字。上傳時，網站伺服器會處理檔案名稱、大小及內容，並將資料存入管理者指定的 Google Drive 資料夾。貼上的文字會依使用者提供的名稱存成文字檔。</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Google Drive 授權</h2>
          <p>Google 授權由管理者設定；一般上傳者使用網站專用密碼。此版本的管理者授權使用 Drive 完整存取範圍。網站程式只實作向指定資料夾建立檔案的操作，沒有瀏覽其他資料夾、公開分享或刪除 Drive 檔案的介面。OAuth 密鑰與更新權杖保存在伺服器的私密環境設定中，不提供給上傳頁面的瀏覽器。</p>
          <p>管理者可在 <a className="text-teal-700 underline" href="https://myaccount.google.com/connections">Google 帳戶的第三方連線設定</a>撤銷應用程式授權。撤銷後網站無法繼續取得 Drive 存取權杖，已上傳的檔案仍需在 Drive 中自行管理。</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">儲存、保留與移除</h2>
          <p>檔案經由網站後端分段傳送至 Google Drive。程式不將整個檔案另存到 Vercel 的本機磁碟。檔案沒有自動到期或自動刪除功能，會保留在管理者的 Drive 中，直到管理者自行移除。請僅上傳自己有權處理的資料；需要移除檔案時，請聯絡網站管理者。</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">登入與連線紀錄</h2>
          <p>網站使用有效期 24 小時的 HttpOnly 登入 Cookie，並以 IP 位址的雜湊值計算短期登入嘗試次數，計數資料於 15 分鐘後到期。Cookie 用於驗證上傳權限；Google 密鑰不會放入 Cookie。上傳頁面的進度保存在目前分頁的記憶體中，關閉或重新整理頁面後不保留。</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">服務提供者</h2>
          <p>Vercel 提供網站與 API 執行環境，Google Drive 儲存檔案，Upstash Redis 保存短期登入嘗試計數。服務提供者可能依其政策處理連線與使用紀錄。網站共用版型也載入 Google Analytics 進行網站流量分析；暫存功能沒有將檔案內容、檔名、密碼或 Google 授權憑證送入分析事件的程式。</p>
          <p>Google API 資料用於上述暫存功能，不用於出售、廣告投放或訓練 AI 模型。</p>
        </section>
        <section>
          <h2 className="text-xl font-bold">聯絡管理者</h2>
          <p>對檔案、授權或資料使用有疑問，請透過網站的 <Link className="text-teal-700 underline" href="/contact">聯絡頁面</Link>與管理者聯絡。</p>
        </section>
        <Link className="inline-block font-semibold text-teal-700 underline" href="/temporary-files">返回檔案暫存空間</Link>
      </article>
    </main>
  );
}
