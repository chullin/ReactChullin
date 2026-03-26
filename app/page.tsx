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
                <div className="profile bg-gradient-primary-to-secondary">
                  <img
                    className="profile-img"
                    src="/assets/profile3.png"
                    alt="Joseph Chen Profile"
                  />
                  <div className="dots-1">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 191.6 1215.4"
                      xmlSpace="preserve"
                    >
                      <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                        <path d="M227.7,12788.6c-105-35-200-141-222-248c-43-206,163-412,369-369c155,32,275,190,260,339c-11,105-90,213-190,262 C383.7,12801.6,289.7,12808.6,227.7,12788.6z"></path>
                        {/* ... Path data simplified for the dots ... */}
                        <path d="M1507.7,12788.6c-151-50-253-216-222-362c25-119,136-230,254-255c194-41,395,142,375,339c-11,105-90,213-190,262 C1663.7,12801.6,1569.7,12808.6,1507.7,12788.6z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="dots-2">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 191.6 1215.4"
                      xmlSpace="preserve"
                    >
                      <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                        <path d="M227.7,12788.6c-105-35-200-141-222-248c-43-206,163-412,369-369c155,32,275,190,260,339c-11,105-90,213-190,262 C383.7,12801.6,289.7,12808.6,227.7,12788.6z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="dots-3">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 191.6 1215.4"
                      xmlSpace="preserve"
                    >
                      <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                        <path d="M227.7,12788.6c-105-35-200-141-222-248c-43-206,163-412,369-369c155,32,275,190,260,339c-11,105-90,213-190,262 C383.7,12801.6,289.7,12808.6,227.7,12788.6z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="dots-4">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 191.6 1215.4"
                      xmlSpace="preserve"
                    >
                      <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                        <path d="M227.7,12788.6c-105-35-200-141-222-248c-43-206,163-412,369-369c155,32,275,190,260,339c-11,105-90,213-190,262 C383.7,12801.6,289.7,12808.6,227.7,12788.6z"></path>
                      </g>
                    </svg>
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
