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

這個開關縮短公開 API 可用的時間，但不會撤銷 Google 授權、刪除 Drive 檔案或消除伺服器憑證外洩風險。本版本只接受單獨 `drive.file` scope，拒絕舊的完整 Drive token。程式更新不會自動撤銷 Google 端的舊授權；必須完成下方遷移流程。

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

目的地在程式中固定為上表資料夾；環境變數不符會拒絕上傳。Preview 請保持關閉，模擬測試不會使用真實資料夾。
變更密碼、金鑰、Google refresh token 或開放截止時間會使既有登入及上傳工作失效。此次權限版本更新也會使舊的 Cookie 與票證失效，不能透過舊工作繼續使用先前的授權。所有 API 都不快取；頁面設定 noindex。

## Google 授權：在能使用 Google 的環境設定

這是管理者的一次性設定流程，不是上傳頁面要求使用者登入 Google。
Google 的 OAuth 授權可被撤銷或過期；失效時需重新設定 refresh token。

### 從完整 Drive 授權遷移

1. 維持 `TEMP_UPLOAD_ENABLED=false`。先在 [Google 帳戶第三方連線](https://myaccount.google.com/connections)撤銷 **Chullin Temporary Storage** 的舊授權。只把請求 scope 改小或覆蓋 Vercel token，不能保證舊的完整授權已撤銷。撤銷會影響同一應用程式的其他有效授權，務必先撤銷，再取得新的 token。
2. 同一 Google Cloud 專案啟用 **Google Drive API**、**Google Picker API**。OAuth 同意畫面的資料存取範圍只保留 `https://www.googleapis.com/auth/drive.file`。
3. 在既有 Web OAuth 用戶端加入 JavaScript origin `http://localhost:17865`，redirect URI `http://localhost:17865/oauth/callback`。本機工具不需要公開網站的管理者 API。
4. 建立 API key：API restrictions 只允許 **Google Picker API**；網站來源限制加入 `http://localhost:17865/*` 與 `https://docs.google.com/*`（Picker iframe 所需）。API key、OAuth 用戶端及 project number 必須屬於同一專案。
5. 在可以連線 Google 的管理者電腦執行 `node scripts/setup-drive-picker.cjs`，開啟 `http://localhost:17865`。工具只監聽 127.0.0.1，30 分鐘後失效，不會寫入憑證檔案。用戶端密鑰及 refresh token 留在本機程序記憶體；只有短效 `drive.file` access token 交給本機管理者的 Picker。
6. 填入既有 Client ID、Client Secret、Picker API key 與 Cloud project number。工具使用 state、PKCE、offline access，只請求 `drive.file`，不合併既有授權；Google 回傳其他 scope 或沒有 refresh token 時拒絕完成。
7. 使用資料夾擁有者登入，在 Picker **只選取** `1auq7r82jwMMAlK3XuLonQtZJY1zKl_3w`。工具會拒絕其他 ID，並透過 Google API 確認它是未移除且可新增檔案的資料夾。Picker 選取其他項目本身可能已對該項目授權；若選錯，撤銷本次授權並重新操作。
8. 成功頁只在通過資料夾驗證後顯示新的 `GOOGLE_DRIVE_REFRESH_TOKEN`；直接存入 Vercel Production 的同名私密設定，沿用同一組 Client ID / Secret。不要貼到聊天、截圖、日誌或 Git。關閉分頁並按 Ctrl+C 結束工具，以釋放記憶體中的憑證。設定期間勿開放其他人使用電腦。
9. 保持功能關閉，重新部署新程式與設定；檢查範圍後再開短時間窗口測試小檔案。Google Cloud 本機來源與回呼、Picker API key 可在一次性設定後移除或停用；日後重授權時再設定。

**權限邊界：** `drive.file` 是 Google 的每檔案授權，涵蓋 Picker 選取及應用程式建立的項目；不是「單一資料夾 OAuth scope」，也不等於授權整個資料夾內所有既有檔案。此網站後端只向固定資料夾新增檔案，不提供其他資料夾、檔案列表、分享、刪除操作。一般上傳者只得到網站的上傳權限，沒有取得 Google ACL、OAuth token 或 Picker。被竊取的 OAuth 憑證仍可能被用來操作應用程式可存取的項目或建立新檔案，因此仍需保護憑證。

不要公開分享資料夾以替代 OAuth。External OAuth app 在 Testing 狀態的 refresh token 通常只有 7 天效期；正式長期使用需依 Google 個人用途及發布要求設定，token 仍可能撤銷或過期。

目前程式修改不代表雲端授權已完成遷移：舊廣泛 token 會被新後端以 `DRIVE_SCOPE_MISMATCH` 拒絕，直到上述設定完成。測試只模擬 Google 回應，不會自動改動雲端設定。

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
- node --test tests/temporary-files.test.cjs tests/drive-picker-setup.test.cjs
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

- https://developers.google.com/workspace/drive/picker/guides/web-picker
