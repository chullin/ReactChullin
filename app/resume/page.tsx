export default function ResumePage() {
  return (
    <div className="container px-4 my-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bolder mb-0">
          <span className="text-gradient d-inline">Resume</span>
        </h1>
      </div>
      <div className="row gx-5 justify-content-center">
        <div className="col-lg-11 col-xl-9 col-xxl-8">
          {/* Experience Section */}
          <section>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-primary fw-bolder mb-0">Experience</h2>
              <a
                className="btn btn-primary btn-sm px-2 py-2"
                href="https://drive.usercontent.google.com/download?id=1Y7-ZQm6389M_FmAKiWLb_vMu2TzWLVwB&export=download"
              >
                <div className="d-inline-block bi bi-download me-2"></div>
                Download
              </a>
            </div>

            {/* Experience Card 1 */}
            <div className="card border-0 rounded-4 mb-5">
              <div className="card-body p-5">
                <div className="row align-items-center gx-5">
                  <div className="col mb-4 mb-lg-0 margin-top-minus6">
                    <div className="p-0 rounded-4">
                      <div className="text-primary fw-bolder mb-3 fs-8">June 2024 - Present</div>
                      <img className="float-start resume-icon" src="/assets/foxconn.jpg" alt="Foxconn" />
                    </div>
                  </div>
                  <div className="col-lg-9 bg-light rounded-4">
                    <div className="margin-t15-b1 fw-bolder">軟體研發工程師 &middot; 鴻海科技集團 Foxconn</div>
                    <div className="padding-bottom-1">
                      <ul className="font-color-555">
                        <li>負責維護與開發測試管理系統（TMS, Test Management System）</li>
                        <li>撰寫 iPhone 手機腳本與測試腳本</li>
                        <li>進行機械手臂開發</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Card 2 */}
            <div className="card border-0 rounded-4 mb-5">
              <div className="card-body p-5">
                <div className="row align-items-center gx-5">
                  <div className="col mb-4 mb-lg-0 margin-top-minus6">
                    <div className="p-0 rounded-4">
                      <div className="text-primary fw-bolder mb-3 fs-8">Sept 2023 - June 2024</div>
                      <img className="float-start resume-icon" src="/assets/SCT.png" alt="SCT" />
                    </div>
                  </div>
                  <div className="col-lg-9 bg-light rounded-4">
                    <div className="margin-t15-b1 fw-bolder">軟韌體工程師 &middot; Sound Control Technology</div>
                    <div className="padding-bottom-1">
                      <ul className="font-color-555">
                        <li>使用 Tkinter 在 Raspberry Pi 上進行 GUI 開發，可自動化測試和設置測試參數</li>
                        <li>使用 Python 透過 UART 和 I²C 和後端溝通，實現指令發送與接收</li>
                        <li>
                          參與團隊合作、討論，確保測試機器的正常運作，並添加 EDID 新測試項目、更新測試流程，提高產品測試的準確性、品質與可靠性
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Card 3 */}
            <div className="card border-0 rounded-4 mb-5">
              <div className="card-body p-5">
                <div className="row align-items-center gx-5">
                  <div className="col mb-4 mb-lg-0 margin-top-minus6">
                    <div className="p-0 rounded-4">
                      <div className="text-primary fw-bolder mb-3 fs-8">Dec 2020 - Sept 2022</div>
                      <img className="float-start resume-icon" src="/assets/CCU.png" alt="CCU" />
                    </div>
                  </div>
                  <div className="col-lg-9 bg-light rounded-4">
                    <div className="margin-t15-b1 fw-bolder">助理研究員 &middot; 國立中正大學</div>
                    <div className="padding-bottom-1">
                      <ul className="font-color-555">
                        <li>
                          利用 SpecAugment 語料增量技術減少原始語料量，微調神經網路超參數使模型輸出與目標人物 90% 相似，並基於 C 語言將 Transformer TTS 實現於嵌入式系統，與基線系統誤差約 0.01%
                        </li>
                        <li>
                          參與科技部半導體射月計畫，利用低功號晶片以及 AI 技術開發，協助中風、腦性麻痺、構音異常病患，完成日常溝通輔具
                        </li>
                        <li>研究傳統 TTS 發展過程，並與 Transformer-based TTS 比較差異性</li>
                        <li>
                          透過三階段漸進式啟動（聲音喚醒、人聲判斷 VAD、關鍵字識別 KWS）達到低功耗，並使用 C 語言在 Apollo 3 Blue 實現
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-secondary fw-bolder mb-4">Education</h2>
            <div className="card border-0 rounded-4 mb-5">
              <div className="card-body p-5">
                <div className="row align-items-center gx-5">
                  <div className="col mb-4 mb-lg-0 margin-top-minus6">
                    <div className="p-0 rounded-4">
                      <div className="text-primary fw-bolder mb-3 fs-8">July 2020 - Dec 2022</div>
                      <img className="float-start resume-icon" src="/assets/CCU.png" alt="CCU" />
                    </div>
                  </div>
                  <div className="col-lg-9 bg-light rounded-4">
                    <div className="margin-t15-b1 fw-bolder">
                      國立中正大學 &middot; <span className="fs-7 font-color-555">Master's Degree</span>
                    </div>
                    <div className="margin-mt07-b1 fw-bolder fs-7">資訊工程所 (CSIE)</div>
                    <div className="padding-bottom-1">
                      <ul className="font-color-555">
                        <li>Lab：單晶片系統實驗室 System on a Chip (SoC)</li>
                        <li>Professor：林泰吉 副教授兼晶片系統研究中心主任</li>
                        <li>
                          <a
                            href="https://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi?o=dnclcdr&s=id=%22111CCU00392004%22.&searchmode=basic"
                            style={{ color: '#704C39' }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            論文：基於變換器之文字與音轉換研究及其嵌入式實現
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 rounded-4 mb-5">
              <div className="card-body p-5">
                <div className="row align-items-center gx-5">
                  <div className="col mb-4 mb-lg-0 margin-top-minus6">
                    <div className="p-0 rounded-4">
                      <div className="text-primary fw-bolder mb-3 fs-8">Sept 2016 - June 2020</div>
                      <img className="float-start resume-icon" src="/assets/NQU.png" alt="NQU" />
                    </div>
                  </div>
                  <div className="col-lg-9 bg-light rounded-4">
                    <div className="margin-t15-b1 fw-bolder">
                      國立金門大學 &middot; <span className="fs-7 font-color-555">Bachelor's Degree</span>
                    </div>
                    <div className="margin-mt07-b1 fw-bolder fs-7">資訊工程系 (CSIE)</div>
                    <div className="padding-bottom-1">
                      <ul className="font-color-555">
                        <li>Lab：計算智能與人機交互實驗室 CI</li>
                        <li>Professor：趙于翔 副教授兼資工系系主任</li>
                        <li>
                          <a
                            href="https://www.airitilibrary.com/Article/Detail/P20191126001-201911-201911260014-201911260014-223-226"
                            style={{ color: '#704C39' }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            專題：以 LoRa 為基礎之失智老人輔助裝置設計
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <div className="card shadow border-0 rounded-4 mb-5">
              <div className="card-body p-5">
                {/* Languages */}
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
                      <i className="bi bi-tools"></i>
                    </div>
                    <h5 className="fw-bolder mb-0">
                      <span className="text-gradient d-inline">Languages</span>
                    </h5>
                  </div>
                  <div className="row row-cols-1 row-cols-md-3 mb-4 font-color-555">
                    <div className="col mb-4 mb-md-0">
                      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Python</div>
                    </div>
                    <div className="col mb-4 mb-md-0">
                      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">C</div>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">JavaScript</div>
                    </div>
                  </div>
                </div>

                {/* AI */}
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
                      <i className="bi bi-cpu"></i>
                    </div>
                    <h5 className="fw-bolder mb-0">
                      <span className="text-gradient d-inline">Artificial Intelligence</span>
                    </h5>
                  </div>
                  <div className="row row-cols-1 row-cols-md-3 mb-4 font-color-555">
                    <div className="col mb-4 mb-md-0">
                      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Transformer-based TTS</div>
                    </div>
                    <div className="col mb-4 mb-md-0">
                      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Voice Activity Detection (DNN)</div>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Digital Image Processing (CNN)</div>
                    </div>
                  </div>
                </div>

                {/* Embedded */}
                <div className="mb-0">
                  <div className="d-flex align-items-center mb-4">
                    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
                      <i className="bi bi-circuit-board"></i>
                    </div>
                    <h5 className="fw-bolder mb-0">
                      <span className="text-gradient d-inline">Embedded Systems</span>
                    </h5>
                  </div>
                  <div className="row row-cols-1 row-cols-md-3 mb-4 font-color-555">
                    <div className="col mb-4 mb-md-0">
                      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">DNN on ZedBoard for Voice conversion</div>
                    </div>
                    <div className="col mb-4 mb-md-0">
                      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Apollo3 Blue for VAD & KWS</div>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">LoRa & GPS on Seeeduino</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
