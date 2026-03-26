import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="py-5">
        <div className="container px-5 pb-5">
          <div className="row gx-5 align-items-center">
            <div className="col-xxl-5">
              <div className="text-center text-xxl-start">
                <div className="badge bg-gradient-primary-to-secondary text-white mb-4">
                  <div className="text-uppercase">
                    Software &middot; engineer
                  </div>
                </div>
                <div className="fs-3 fw-light text-muted">
                  陳憲億( Sian-Yi Chen)
                </div>
                <h1 className="display-3 fw-bolder mb-5">
                  <span className="text-gradient d-inline">I think, therefore I am</span>
                </h1>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                  <Link
                    className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder"
                    href="/resume"
                  >
                    Resume
                  </Link>
                  <Link
                    className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder"
                    href="/projects"
                  >
                    Projects
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-7">
              <div className="d-flex justify-content-center mt-5 mt-xxl-0">
                <div className="position-relative" style={{ width: '380px', height: '380px' }}>
                  {/* Vibrant Gradient Circle Background */}
                  <div 
                    className="position-absolute top-50 start-50 translate-middle rounded-circle shadow-lg" 
                    style={{ 
                      width: '320px', height: '320px', 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      zIndex: 0 
                    }}
                  ></div>
                  
                  {/* Profile Image */}
                  <div 
                    className="position-absolute top-50 start-50 translate-middle overflow-hidden rounded-circle shadow" 
                    style={{ width: '300px', height: '300px', zIndex: 1, border: '6px solid white' }}
                  >
                    <img
                      className="w-100 h-100"
                      src="/assets/profile3.png"
                      alt="Joseph Chen Profile"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Floating Card 1 (Top Right - overlaps circle edge) */}
                  <div 
                    className="position-absolute bg-white rounded-4 shadow-lg p-3 d-flex align-items-center" 
                    style={{ top: '5%', right: '-22%', zIndex: 2, transform: 'rotate(5deg)', border: '1px solid rgba(0,0,0,0.05)' }}
                  >
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style={{ width: '42px', height: '42px' }}>
                      <i className="bi bi-code-slash fs-5"></i>
                    </div>
                    <div>
                      <div className="fw-bolder fs-6 text-dark lh-1 mb-1">Software</div>
                      <div className="text-muted small fw-medium lh-1">Engineer</div>
                    </div>
                  </div>

                  {/* Floating Card 2 (Bottom Left - overlaps circle edge) */}
                  <div 
                    className="position-absolute bg-white rounded-4 shadow-lg p-3 d-flex align-items-center" 
                    style={{ bottom: '5%', left: '-22%', zIndex: 2, transform: 'rotate(-5deg)', border: '1px solid rgba(0,0,0,0.05)' }}
                  >
                    <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style={{ width: '42px', height: '42px' }}>
                      <i className="bi bi-cpu fs-5"></i>
                    </div>
                    <div>
                      <div className="fw-bolder fs-6 text-dark lh-1 mb-1">Embedded</div>
                      <div className="text-muted small fw-medium lh-1">2+ Years Exp.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-light">
        <div className="container px-3">
          <div className="row gx-5 justify-content-center">
            <div className="col-xxl-8">
              <div className="text-center my-5">
                <h2 className="display-5 fw-bolder" style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <span className="text-gradient d-inline">About Me</span>
                </h2>
                <p className="lead fw-light">
                  Hello~ 🙌 我叫 陳憲億
                </p>
                <p className="text-muted mb-4 font-color-555">
                  2022 年畢業於中正大學資訊工程學碩士晶片系統組，具備 2 年嵌入式系統開發經驗（Raspberry Pi、Nexys 4、Apollo 3）與 Transformer-based TTS 的使用與編寫經驗。
                  2023 年任職於 Sound Control Technology，擔任軟韌體研發工程師；而目前在鴻海精密工業擔任軟體開發工程師，負責維護與開發測試管理系統（TMS, Test Management System）、撰寫 iPhone 手機腳本與測試腳本、機械手臂開發，並與美國客戶進行技術溝通。
                  擅長 Python，具備 Python 模組化、圖形化介面開發經驗（如 tkinter）。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
