export default function ResumePage() {
  return (
    <div className="container px-4 my-5" style={{ maxWidth: '900px' }}>
      <div className="text-center mb-5 pb-4">
        <h1 className="display-4 fw-bolder mb-2">
          <span className="text-gradient d-inline">Resume</span>
        </h1>
        <p className="text-muted lead fw-light">My professional journey and skills</p>
      </div>

      {/* Experience Section */}
      <section className="mb-5 pb-4">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h2 className="fw-bold mb-0" style={{ letterSpacing: '-0.5px' }}>Experience</h2>
          <a
            className="btn btn-sm px-4 py-2 rounded-pill fw-medium"
            href="https://drive.usercontent.google.com/download?id=1Y7-ZQm6389M_FmAKiWLb_vMu2TzWLVwB&export=download"
            style={{ border: '1.5px solid #cbd5e1', color: '#64748b' }}
          >
            <i className="bi bi-download me-2"></i>Download PDF
          </a>
        </div>

        <div className="position-relative">
          {/* Vertical Timeline Line */}
          <div className="position-absolute h-100" style={{ left: '28px', borderLeft: '2px solid #f1f3f5', zIndex: -1 }}></div>

          {/* Item 1 */}
          <div className="row gx-5 mb-5 align-items-start position-relative">
            <div className="col-md-3 mb-3 mb-md-0 position-relative">
              <div className="rounded-circle position-absolute" style={{ width: '12px', height: '12px', left: '23px', top: '8px', border: '3px solid white', background: '#94a3b8', boxShadow: '0 0 0 2px #94a3b8' }}></div>
              <div className="ps-5">
                <div className="text-muted fw-bold mb-2 small text-uppercase tracking-wide">Jun 2024 - Present</div>
                <img className="rounded-3 shadow-sm border border-1 border-light" src="/assets/foxconn.jpg" alt="Foxconn" style={{ width: '56px', height: '56px', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="col-md-9">
              <h4 className="fw-bold mb-1">軟體研發工程師</h4>
              <h6 className="mb-3" style={{ color: '#64748b' }}>鴻海科技集團 Foxconn</h6>
              <p className="fw-light lh-lg mb-0 text-justify" style={{ color: '#6b7280' }}>
                &bull; 負責維護與開發測試管理系統（TMS, Test Management System）<br/>
                &bull; 撰寫 iPhone 手機腳本與測試腳本<br/>
                &bull; 進行機械手臂開發
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="row gx-5 mb-5 align-items-start position-relative">
            <div className="col-md-3 mb-3 mb-md-0 position-relative">
              <div className="rounded-circle position-absolute" style={{ width: '12px', height: '12px', left: '23px', top: '8px', border: '3px solid white', background: '#94a3b8', boxShadow: '0 0 0 2px #94a3b8' }}></div>
              <div className="ps-5">
                <div className="text-muted fw-bold mb-2 small text-uppercase tracking-wide">Sep 2023 - Jun 2024</div>
                <img className="rounded-3 shadow-sm border border-1 border-light bg-white p-1" src="/assets/SCT.png" alt="SCT" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
              </div>
            </div>
            <div className="col-md-9">
              <h4 className="fw-bold mb-1">軟韌體工程師</h4>
              <h6 className="mb-3" style={{ color: '#64748b' }}>Sound Control Technology</h6>
              <p className="fw-light lh-lg mb-0 text-justify" style={{ color: '#6b7280' }}>
                &bull; 使用 Tkinter 在 Raspberry Pi 上進行 GUI 開發，可自動化測試和設置參數<br/>
                &bull; 使用 Python 透過 UART 和 I²C 和後端溝通，實現指令發送與接收<br/>
                &bull; 參與團隊合作確保機器正常運作，並添加 EDID 新測試項目與流程更新
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="row gx-5 mb-5 align-items-start position-relative">
            <div className="col-md-3 mb-3 mb-md-0 position-relative">
              <div className="rounded-circle position-absolute" style={{ width: '12px', height: '12px', left: '23px', top: '8px', border: '3px solid white', background: '#94a3b8', boxShadow: '0 0 0 2px #94a3b8' }}></div>
              <div className="ps-5">
                <div className="text-muted fw-bold mb-2 small text-uppercase tracking-wide">Dec 2020 - Sep 2022</div>
                <img className="rounded-3 shadow-sm border border-1 border-light bg-white p-1" src="/assets/CCU.png" alt="CCU" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
              </div>
            </div>
            <div className="col-md-9">
              <h4 className="fw-bold mb-1">助理研究員</h4>
              <h6 className="mb-3" style={{ color: '#64748b' }}>國立中正大學</h6>
              <p className="fw-light lh-lg mb-0 text-justify" style={{ color: '#6b7280' }}>
                &bull; 利用 SpecAugment 減少原始語料量，微調模型使輸出與目標 90% 相似，並於嵌入式系統實現 Transformer TTS<br/>
                &bull; 參與科技部計畫，結合 AI 開發中風/腦性麻痺患者日常溝通輔具<br/>
                &bull; 研究傳統 TTS 並於 Apollo 3 Blue 實現低功耗三階段漸進式啟動 (VAD/KWS)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Breakline */}
      <hr className="my-5 border-light" />

      {/* Education Section */}
      <section className="mb-5 pb-4">
        <div className="d-flex align-items-center mb-5">
          <h2 className="fw-bold mb-0" style={{ letterSpacing: '-0.5px' }}>Education</h2>
        </div>

        <div className="position-relative">
          {/* Vertical Timeline Line */}
          <div className="position-absolute h-100" style={{ left: '28px', borderLeft: '2px solid #f1f3f5', zIndex: -1 }}></div>

          {/* Item 1 */}
          <div className="row gx-5 mb-5 align-items-start position-relative">
            <div className="col-md-3 mb-3 mb-md-0 position-relative">
              <div className="rounded-circle position-absolute" style={{ width: '12px', height: '12px', left: '23px', top: '8px', border: '3px solid white', background: '#94a3b8', boxShadow: '0 0 0 2px #94a3b8' }}></div>
              <div className="ps-5">
                <div className="text-muted fw-bold mb-2 small text-uppercase tracking-wide">Jul 2020 - Dec 2022</div>
                <img className="rounded-3 shadow-sm border border-1 border-light bg-white p-1" src="/assets/CCU.png" alt="CCU" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
              </div>
            </div>
            <div className="col-md-9">
              <h4 className="fw-bold mb-1">國立中正大學</h4>
              <h6 className="text-muted mb-3">資訊工程所 (CSIE) &middot; Master's Degree</h6>
              <div className="bg-light p-4 rounded-4 fw-light text-sm" style={{ color: '#6b7280' }}>
                <p className="mb-1"><span className="fw-medium text-dark">Lab:</span> 單晶片系統實驗室 System on a Chip (SoC)</p>
                <p className="mb-2"><span className="fw-medium text-dark">Advisor:</span> 林泰吉 副教授</p>
                <p className="mb-0">
                  <span className="fw-medium text-dark">Thesis:</span>{' '}
                  <a href="https://ndltd.ncl.edu.tw/cgi-bin/gs32/gsweb.cgi?o=dnclcdr&s=id=%22111CCU00392004%22.&searchmode=basic" className="text-decoration-none pb-1" style={{ color: '#7c5c3e', borderBottom: '1px solid #c4a882' }} target="_blank" rel="noopener noreferrer">
                    基於變換器之文字與音轉換研究及其嵌入式實現
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="row gx-5 mb-5 align-items-start position-relative">
            <div className="col-md-3 mb-3 mb-md-0 position-relative">
              <div className="rounded-circle position-absolute" style={{ width: '12px', height: '12px', left: '23px', top: '8px', border: '3px solid white', background: '#94a3b8', boxShadow: '0 0 0 2px #94a3b8' }}></div>
              <div className="ps-5">
                <div className="text-muted fw-bold mb-2 small text-uppercase tracking-wide">Sep 2016 - Jun 2020</div>
                <img className="rounded-3 shadow-sm border border-1 border-light bg-white p-1" src="/assets/NQU.png" alt="NQU" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
              </div>
            </div>
            <div className="col-md-9">
              <h4 className="fw-bold mb-1">國立金門大學</h4>
              <h6 className="text-muted mb-3">資訊工程系 (CSIE) &middot; Bachelor's Degree</h6>
              <div className="bg-light p-4 rounded-4 fw-light text-sm" style={{ color: '#6b7280' }}>
                <p className="mb-1"><span className="fw-medium text-dark">Lab:</span> 計算智能與人機交互實驗室 CI</p>
                <p className="mb-2"><span className="fw-medium text-dark">Advisor:</span> 趙于翔 副教授</p>
                <p className="mb-0">
                  <span className="fw-medium text-dark">Project:</span>{' '}
                  <a href="https://www.airitilibrary.com/Article/Detail/P20191126001-201911-201911260014-201911260014-223-226" className="text-decoration-none pb-1" style={{ color: '#7c5c3e', borderBottom: '1px solid #c4a882' }} target="_blank" rel="noopener noreferrer">
                    以 LoRa 為基礎之失智老人輔助裝置設計
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breakline */}
      <hr className="my-5 border-light" />

      {/* Skills Section */}
      <section>
        <div className="d-flex align-items-center mb-5">
          <h2 className="fw-bold mb-0" style={{ letterSpacing: '-0.5px' }}>Technical Skills</h2>
        </div>
        
        <div className="row gx-5 bg-gradient-light p-4 pb-2 rounded-4 border border-light shadow-sm">
          {/* Languages */}
          <div className="col-12 mb-4">
            <h6 className="fw-bolder text-muted text-uppercase tracking-widest mb-3 small" style={{ letterSpacing: '1px' }}>Languages</h6>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-medium">Python</span>
              <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-medium">C</span>
              <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-medium">JavaScript</span>
            </div>
          </div>

          {/* AI */}
          <div className="col-12 mb-4">
            <h6 className="fw-bolder text-muted text-uppercase tracking-widest mb-3 small" style={{ letterSpacing: '1px' }}>Artificial Intelligence</h6>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-medium">Transformer-based TTS</span>
              <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-medium">Voice Activity Detection (DNN)</span>
              <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-medium">Digital Image Processing (CNN)</span>
            </div>
          </div>

          {/* Embedded */}
          <div className="col-12 mb-4">
            <h6 className="fw-bolder text-muted text-uppercase tracking-widest mb-3 small" style={{ letterSpacing: '1px' }}>Embedded Systems</h6>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-medium">DNN on ZedBoard</span>
              <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-medium">Apollo3 Blue VAD & KWS</span>
              <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fw-medium">LoRa & GPS on Seeeduino</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
