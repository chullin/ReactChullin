# 個人檔案暫存空間：Vercel 設定

## 功能範圍

頁面：/temporary-files。使用網站專用密碼登入後，將檔案或文字存入指定 Google Drive 資料夾。
單檔上限 **2,000,000,000 bytes（2 GB）**，每段 **2 MiB**。所有檔案傳輸都走同源 /api/temporary-files；使用端不需要連 Google。
第一版只有上傳，沒有網站內檔案列表、下載或自動刪除。請在可以使用 Google 的環境管理 Drive 檔案。
中斷或暫停後，保持原分頁與檔案即可繼續；刷新、關閉頁面或更換裝置後不保留續傳狀態。登入最長有效 24 小時，但開放時間到期後立即禁止新的 API 請求。

## 只在需要時開放

功能預設關閉。每個 API 請求都必須同時滿足以下條件，否則回傳 `503 UPLOAD_DISABLED`，不呼叫 Google 或 Redis，也不接受已有 Cookie／上傳票證繼續傳輸：

1. `TEMP_UPLOAD_ENABLED` 精確設為 `true`。
2. `TEMP_UPLOAD_EXPIRES_AT` 是有效、包含時區、尚未到期的 ISO 8601 時間。

開放時，在 Vercel 正式環境填入這兩個值並重新部署。例如希望在某天晚上 11 點關閉，填入該日期的 `YYYY-MM-DDT23:00:00+08:00`（必須換成實際日期），建議只開放需要的 1–2 小時。
使用完畢後可將 `TEMP_UPLOAD_ENABLED` 改成 `false` 並重新部署；即使忘記手動關閉，到期後目前這個部署也會自行拒絕後續請求。不要使用註解程式碼或只隱藏上傳按鈕作為開關。

**Vercel 修改環境變數只會影響新部署，並不是即時急停。** 等新部署生效前，舊部署仍使用原設定；舊部署網址也保留原設定直到其到期時間。到期檢查發生在請求開始時，已接受的一段傳輸可能完成，之後的段落會被拒絕。

每次開放請設定新的截止時間；更改截止時間會使前一個開放時段發出的登入 Cookie 與上傳票證失效，需要重新登入並上傳。

這個開關縮短公開 API 可用的時間，但不會撤銷 Google 授權、刪除 Drive 檔案或消除伺服器憑證外洩風險。目前 Google token 仍是完整 Drive scope；若要在 Google 層級限制存取，應改做 Google Picker + `drive.file` 的授權流程，或使用只存放暫存資料的獨立 Google 帳號。尚未實作此縮限流程。

## Vercel 環境變數

在 Project → Settings → Environment Variables 設定以下值，再重新部署。所有值都只供伺服器使用，**不要加 NEXT_PUBLIC_ 前綴、不要提交到 Git、不要貼進聊天**。

| 名稱 | 用途 |
| --- | --- |
| TEMP_UPLOAD_ENABLED | 預設關閉；只有 `true` 才可能啟用 |
| TEMP_UPLOAD_EXPIRES_AT | 啟用時必填的截止時間，包含時區；未設定、格式錯誤或到期都關閉 |
| TEMP_UPLOAD_PASSWORD | 網站登入密碼，至少 16 字元，建議密碼管理器產生的隨機密碼 |
| TEMP_UPLOAD_SECRET | 至少 32 字元的獨立隨機金鑰；加密登入與上傳工作 |
| GOOGLE_DRIVE_FOLDER_ID | 1auq7r82jwMMAlK3XuLonQtZJY1zKl_3w |
| GOOGLE_DRIVE_CLIENT_ID | 自己 Google Cloud 專案的 OAuth Client ID |
| GOOGLE_DRIVE_CLIENT_SECRET | 相同 OAuth Client Secret |
| GOOGLE_DRIVE_REFRESH_TOKEN | 由資料夾擁有者授權取得的 refresh token |
| UPSTASH_REDIS_REST_URL | Upstash Redis 的 HTTPS REST endpoint |
| UPSTASH_REDIS_REST_TOKEN | 相同 Redis 的 REST token |

Preview 建議使用獨立測試資料夾、密碼與金鑰；Production 才指向正式資料夾。
變更密碼、金鑰或開放截止時間會使既有登入及上傳工作失效。所有 API 都不快取；頁面設定 noindex。

## Google 授權：在能使用 Google 的環境設定

這是管理者的一次性設定流程，不是上傳頁面要求使用者登入 Google。
Google 的 OAuth 授權可被撤銷或過期；失效時需重新設定 refresh token。

1. 在自己的 Google Cloud 專案啟用 Google Drive API，設定 OAuth 同意畫面。
2. 建立 Web application OAuth client。若用下述官方 OAuth Playground 取得授權，加入 redirect URI：
   https://developers.google.com/oauthplayground
3. 開啟 Google 官方 OAuth Playground，齒輪中勾選 **Use your own OAuth credentials**，填入自己的 Client ID / Client Secret，選擇 offline access。
4. 此版本沒有 Google Picker 授權介面。為了直接使用已存在的指定資料夾，Playground 設定流程使用 https://www.googleapis.com/auth/drive scope。
   **這個 scope 授予該 OAuth 應用廣泛的 Drive 存取權，不是 Google 層級的單一資料夾授權。** 網站程式只向環境變數指定的資料夾建立檔案，沒有接受使用者傳入資料夾或任意網址的介面。
   如果不接受廣泛授權，先不要授權；可改做 Google Picker + drive.file 的管理者設定流程，讓 Google 層級也限制可存取的檔案。
5. 使用該資料夾擁有者的帳號授權，交換 authorization code 取得 refresh token；將三個 OAuth 值直接存入 Vercel。
6. External app 處於 Testing 狀態時，Drive 授權的 refresh token 通常只有 7 天效期。正式長期使用前，依 Google 的個人用途規則與同意畫面要求設定發布狀態；不要假設發布後 token 永不過期。
7. 不要公開分享資料夾以替代 OAuth，也不要使用沒有個人 Drive 儲存配額的 service account 來寫入此 My Drive 資料夾。

## 登入嘗試限制

建立並連接 Upstash Redis，將 REST URL 與 token 放入上表的兩個環境變數。
透過 Vercel Marketplace 連接且使用 `UPSTASH_REDIS` 前綴時，程式也會直接讀取 `UPSTASH_REDIS_KV_REST_API_URL` 與 `UPSTASH_REDIS_KV_REST_API_TOKEN`；不必複製或改名整合服務管理的密鑰。未使用自訂前綴的 `KV_REST_API_URL` / `KV_REST_API_TOKEN` 也支援。手動設定的標準名稱優先。
Redis 只保存雜湊後 IP 的短期嘗試計數，不儲存檔案、密碼或 Google token。
每個 IP 在 15 分鐘內最多 10 次登入嘗試（成功也計入），跨 Vercel instances 共用。
正式環境缺少 Redis 或 Redis 無法連線時拒絕登入。開發環境未設定 Redis 時才使用程序內計數。
可信 IP 來自 Vercel 的 x-vercel-forwarded-for；若日後移到其他主機，需重新檢查代理信任設定。

## 傳輸設計與成本

- Vercel Function 的單次 body 上限為 4.5 MB，因此使用 2 MiB 原始二進位區塊，不使用 base64。
- 後端以 Google resumable upload 建立工作，將 URL 加密後傳給瀏覽器；不暴露 Google 存取 token 或原始 upload session URL。
- 每段都重新驗證 cookie、同源 Origin、加密 ticket、總大小和 Content-Range。Google 確認的 Range 是續傳位置來源。
- 每次 Function 最長 60 秒，Google 上傳請求逾時 40 秒；分段逾時後使用者可按繼續，先查詢 Google 已收到的位置。
- 2 GB 約需要 954 次區塊請求，另有建立工作與進度查詢。Vercel 的傳輸流量、Function 使用量及 Redis 依方案計費；這不是免費流量保證。
- 檔案使用 Drive 帳號的剩餘空間。Drive 上傳錯誤時保留原分頁，先檢查授權、剩餘空間與配額。
- 上傳 API 固定寫入指定資料夾，沒有任意網址代理、刪除或分享檔案的功能。
- 空檔案不接受；文字內容最多 500,000 字元。大檔案只讀當前片段，不整檔載入記憶體。

## 驗證與上線

本機安裝套件後可執行：
- node --test tests/temporary-files.test.cjs
- npx tsc --noEmit --incremental false
- npm run build

模擬測試驗證授權、大小限制、分段、續傳及錯誤；不代表真實 Google / Vercel 已測通。
正式設定後先使用小檔案驗證，再測 2 GB 檔案、中斷續傳，並核對 Drive 中大小及下載後的 SHA-256。
最後在 Google 被封鎖的網路中測試，確認瀏覽器檔案傳輸只連自己的網域。上傳是否可行仍取決於該網路的實際規則。
不會由程式自動推送 GitHub 或部署。

## 官方文件

- https://developers.google.com/workspace/drive/api/guides/manage-uploads
- https://developers.google.com/identity/protocols/oauth2/web-server
- https://developers.google.com/identity/protocols/oauth2#expiration
- https://developers.google.com/workspace/drive/api/guides/api-specific-auth
- https://vercel.com/docs/functions/limitations
- https://vercel.com/docs/environment-variables/managing-environment-variables
- https://vercel.com/docs/headers/request-headers
- https://upstash.com/docs/redis/features/restapi
