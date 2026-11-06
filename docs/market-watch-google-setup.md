# Market Watch Google 登入與跨裝置同步

## 已準備的功能

- Auth.js Google OAuth，只請求 `openid email profile`。
- 每個 Google 帳號使用獨立 Redis key，後端從已驗證 session 取出帳號識別，不接受前端指定其他使用者。
- 同步清單、標的、排序、置頂、通知條件、篩選與顯示模式；不儲存報價快取。
- 首次登入自動保存登入前頁面的清單與設定，OAuth 跳轉前以同分頁 sessionStorage 暫存完整快照；已有帳號載入雲端版本。
- 700ms debounce 儲存，頁面聚焦及每 30 秒檢查更新。Redis CAS revision 防止舊裝置覆蓋新清單。
- 同步失敗保留畫面變更並提供重試；衝突時明確選擇載入雲端版本。
- 訪客本機清單與登入後的雲端清單分離，登出後返回原本的訪客清單。

## 管理者設定

可開啟本目錄的 [設定小抄](./market-watch-google-setup.html)，逐欄複製。

1. 在 [Google Cloud OAuth Clients](https://console.cloud.google.com/auth/clients) 選擇網站使用的專案；如尚未設定 Google Auth Platform，先填 Branding 與 Audience（External）。只要基本身分範圍，不需 Drive/Gmail API 或權限。
2. 建立 **Web application** OAuth Client，名稱 `Chullin Market Watch`。
3. Authorized JavaScript origins：`https://chullin.tw`。
4. Authorized redirect URIs：`https://chullin.tw/api/auth/callback/google`。
5. 在 [Vercel Environment Variables](https://vercel.com/chullins-projects/chullin/settings/environment-variables) 新增 Production 的 Secret：

| 變數 | 值 |
| --- | --- |
| `AUTH_GOOGLE_ID` | 剛建立的 Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | 相同 Client 的 Client Secret |
| `AUTH_SECRET` | 至少 32 位元組隨機值；本次已由代理安全產生並直接存入 Vercel，勿覆寫 |
| `AUTH_URL` | `https://chullin.tw`；本次已設定 |

既有 Redis 可直接使用，支援 `UPSTASH_REDIS_REST_URL/TOKEN`、`UPSTASH_REDIS_KV_REST_API_URL/TOKEN` 或 `KV_REST_API_URL/TOKEN`，不需要另一個資料庫。不要將 Client Secret 或任何 token 貼到聊天、截圖或 Git。

6. 若 Google Audience 仍為 Testing，將要測試的 Google 帳號加入 Test users；要提供所有 Google 使用者登入時，改為正式發布，並依 Google 顯示的要求完成網站、品牌與網域設定。首頁 `https://chullin.tw`、隱私說明 `https://chullin.tw/market-watch/privacy`。此說明頁需在新版本部署後才存在。
7. 設定完成後部署程式，再驗證 Google 登入、首次清單自動保存與第二部裝置載入。不能用 build 通過代替實際 OAuth 驗證。

Google 設定依據：[Auth.js Google provider](https://authjs.dev/getting-started/providers/google)。

## 本機驗證

登入流程回歸測試執行 `node scripts/check-market-login.cjs`（首次自動保存、既有帳號載入、失敗保留與登入前快照）。既有離線檢查可執行 `node scripts/check-market-account.cjs`（已驗證 Google 身分條件、帳號隔離、跨來源拒絕、陳舊 revision 衝突與請求大小上限），另執行 `npm run build`。這些檢查不連線或修改正式 Google／Redis 資料。

本機用獨立測試 OAuth Client 與測試 Redis；在 Google 加入 `http://localhost:3000/api/auth/callback/google`，於 gitignored 的 `.env.local` 設定 `AUTH_GOOGLE_ID`、`AUTH_GOOGLE_SECRET`、`AUTH_SECRET`、`AUTH_URL=http://localhost:3000`。不要下載或複製正式環境的 Secret 到本機。

未設定憑證時，頁面顯示「準備中」，訪客功能仍可使用。登入 API 不提供開發用假帳號或驗證繞過。

## 限制與資料上限

最多 30 個清單、每個清單 300 個標的、500 個通知，請求上限 256 KB。資料模型版本為 1。帳號資料不設自動到期；刪除申請透過聯絡頁處理。通知條件會同步，但仍由開啟中的頁面執行，不提供關閉網頁後的背景通知。CAS 衝突不自動合併，以免重新加入已刪除的標的或覆蓋排序。
