import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <>
      <section className="py-5">
        <div className="container px-4 mb-5">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bolder mb-0">
              <span className="text-gradient d-inline">Projects</span>
            </h1>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-11 col-xl-9 col-xxl-8">
              {/* Project Card 1 */}
              <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                <div className="card-body p-0">
                  <div className="d-flex align-items-center project-card-flex">
                    <div className="p-5 project-text">
                      <h4 className="fw-bolder">Automated Multi-Interface Test and Control System</h4>
                      <p className="fw-bolder">專案說明</p>
                      <ul className="font-color-555">
                        <li>
                          Tester 為自動化測試系統，用於測試公司產品的各種介面，例如網路、音訊、視訊（Video、HDMI）、供電、晶片指令、產品連線狀態等等
                        </li>
                        <li>系統基於 Raspberry Pi 控制板，並搭配 Raspberry Pi 觸控面板實現</li>
                      </ul>

                      <p className="fw-bolder">負責項目</p>
                      <ul className="font-color-555">
                        <li>開發 GUI 介面：</li>
                        <ul>
                          <li>使用 Python 和 Tkinter 開發 GUI 介面，可自動化測試和設置測試參數</li>
                        </ul>
                        <li>控制 Raspberry Pi：</li>
                        <ul>
                          <li>使用 Python 控制 Raspberry Pi，包含啟動、停止、收集測試數據、控制硬體設備等等</li>
                          <li>使用 UART 和 I2C 與後端進行通訊傳輸，實現指令的發送與接收</li>
                        </ul>
                        <li>測試機器維護與優化</li>
                      </ul>
                    </div>
                    <img className="img-fluid project-img" src="/assets/Tester.png" alt="Tester" />
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                <div className="card-body p-0">
                  <div className="d-flex align-items-center project-card-flex">
                    <div className="p-5 project-text">
                      <h4 className="fw-bolder">Study of transformer-based TTS and its embedded implementation</h4>
                      <p className="fw-bolder">專案說明</p>
                      <ul className="font-color-555">
                        <li>
                          使用少量語料對特定人士進行訓練，完成文字語音轉換系統，達到轉換後音色、音調與目標對象相似度高達 90%，並將 Transformer 移植到嵌入式系統中
                        </li>
                      </ul>

                      <p className="fw-bolder">負責項目</p>
                      <ul className="font-color-555">
                        <li>訓練平台為 Linux 系統，並使用他人基於 PyTorch 架構完成的 Transformer-based TTS</li>
                        <li>
                          為將 Transformer 移植至嵌入式系統，因此將 Python 版本訓練完成參數搬移至自行完成的 C 語言版本的 Transformer 中
                        </li>
                      </ul>
                    </div>
                    <img className="img-fluid project-img" src="/assets/Tranformer.png" alt="Transformer" />
                  </div>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                <div className="card-body p-0">
                  <div className="d-flex align-items-center project-card-flex">
                    <div className="p-5 project-text">
                      <h4 className="fw-bolder">構音異常溝通輔具之人工智慧系統</h4>
                      <p className="fw-bolder">專案說明</p>
                      <ul className="font-color-555">
                        <li>參與科技部旗艦型半導體射月計畫</li>
                        <li>利用低功耗晶片以及人工智慧技術開發，協助中風及腦性麻痺、構音異常病患之日常溝通輔具</li>
                      </ul>

                      <p className="fw-bolder">負責項目</p>
                      <ul className="font-color-555">
                        <li>使用 MATLAB 讀取錄製音檔、統計語料特性，並執行陽明交通大學提供的 VC 轉換</li>
                        <li>Audacity 對音檔做前處理，並使用 C 編寫 FFT、IFFT、Pre Norm / Post Norm、DNN 等區塊</li>
                        <li>
                          使用 Zedboard，按下按鈕時錄音，讓 Zedboard 能夠進行 VC 運算，放開並播放轉換後的聲音
                        </li>
                      </ul>
                    </div>
                    <img className="img-fluid project-img" src="/assets/VC.png" alt="VC" />
                  </div>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                <div className="card-body p-0">
                  <div className="d-flex align-items-center project-card-flex">
                    <div className="p-5 project-text">
                      <h4 className="fw-bolder">Voice Switch Based on Hierarchical KWS</h4>
                      <p className="fw-bolder">專案說明</p>
                      <ul className="font-color-555">
                        <li>
                          「使聲控裝置以及低的功耗運作」讓此裝置結合其他產品時可以很省電，因此讓系統平時處於功耗極低的睡眠狀態，並透過睡眠、人聲判斷、關鍵字辨識漸進式開啟來降低功耗；3 個階段由省電到耗電
                        </li>
                      </ul>

                      <p className="fw-bolder">負責項目</p>
                      <ul className="font-color-555">
                        <li>透過訓練 DNN 達成人聲語音識別（VAD）</li>
                        <li>先辨識 VAD 再辨識關鍵字，同樣使用 DNN 達成 Key Keyword Spotting（KWS）</li>
                        <li>語音辨識訓練量大相當耗電，因此使用 Apollo 3 Blue 板達到低功耗</li>
                        <li>接手大學專題生專題，並測試、維護、交接說明文件、開發</li>
                      </ul>
                    </div>
                    <img className="img-fluid project-img" src="/assets/VAD_KWS.png" alt="VAD KWS" />
                  </div>
                </div>
              </div>

              {/* Project Card 5 */}
              <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                <div className="card-body p-0">
                  <div className="d-flex align-items-center project-card-flex">
                    <div className="p-5 project-text">
                      <h4 className="fw-bolder">以 LoRa 為基礎之失智老人輔助裝置設計</h4>
                      <p className="fw-bolder">專案說明</p>
                      <ul className="font-color-555">
                        <li>
                          為解決老人失智在外走失事件越發頻繁的問題，而設計一款使用 LoRa 具有低功號且傳輸範圍廣的傳輸技術，並搭配 GPS 定位技術的失智老人輔助裝置，希望使老人家配戴無感並可以長時間使用
                        </li>
                      </ul>

                      <p className="fw-bolder">負責項目</p>
                      <ul className="font-color-555">
                        <li>使用 C 語言編寫 Arduino（LoRa 傳輸、GPS 定位技術）</li>
                        <li>LoRa 距離測試</li>
                      </ul>
                    </div>
                    <img className="img-fluid project-img" src="/assets/LoRa.png" alt="LoRa" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-5 bg-gradient-primary-to-secondary text-white">
        <div className="container px-4 my-5">
          <div className="text-center">
            <h4 className="display-7 fw-bolder mb-4">Let&apos;s build something together</h4>
            <Link className="btn btn-outline-light btn-lg px-4 py-3 fs-6 fw-bolder" href="/contact">
              Contact me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
