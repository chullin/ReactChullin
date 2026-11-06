import Link from 'next/link';

export const metadata = { title: '市場清單帳號與同步資料說明', robots: { index: false, follow: false } };

export default function MarketWatchPrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 text-slate-700">
      <Link href="/market-watch" className="text-sm font-bold text-orange-700">← 返回市場觀察清單</Link>
      <h1 className="mt-6 text-3xl font-black text-slate-900">帳號與同步資料說明</h1>
      <div className="mt-8 space-y-6 text-sm leading-7">
        <p>Google 登入只要求基本帳號識別、姓名、電子郵件與頭像權限，用於辨識你的帳號及顯示登入狀態，不會要求存取 Google Drive、Gmail 或其他 Google 資料。網站不會取得你的 Google 密碼。</p>
        <p>登入後，自選標的、清單名稱與分類、排序、置頂、通知條件、顯示模式及篩選設定，會儲存在本網站使用的雲端資料庫。Google 的固定帳號識別碼經雜湊後用來區分帳號，資料庫不另存姓名或電子郵件。資料僅供你的登入帳號讀寫。</p>
        <p>同一個帳號在不同裝置登入後，可載入這些設定。首次登入可選擇帶入本機清單或使用預設清單。若兩部裝置同時修改，網站會提示重新載入雲端版本，避免覆蓋較新的變更。</p>
        <p>未登入時，清單儲存在此瀏覽器，不會同步到其他裝置。登出後返回本機清單；已登入的個人清單不會寫入共用的本機清單。登入 Cookie 最長維持 30 天，可使用登出按鈕結束此裝置的登入狀態。</p>
        <p>通知條件會同步，但通知判斷仍由開啟中的頁面執行；這項功能不提供關閉網頁後的背景推播。</p>
        <p>雲端設定會保留供下次登入使用。若希望刪除帳號同步資料，請透過<Link href="/contact" className="font-bold text-orange-700 underline">聯絡頁面</Link>提出申請。清除瀏覽器資料或登出不會自動刪除雲端清單。</p>
      </div>
    </article>
  );
}
