export default function About() {
  return (
    <section className="bg-light">
      <div className="container px-3">
        <div className="row gx-5 justify-content-center">
          <div className="col-xxl-8">
            <div className="text-center my-5">
              <h2
                className="display-5 fw-bolder"
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                <span className="text-gradient d-inline">About Me</span>
              </h2>
              <p className="lead fw-light">Hello~ 🙌 我叫 陳憲億</p>
              <p className="text-muted mb-4 font-color-555">
                2022 年畢業於中正大學資訊工程學碩士晶片系統組，具備 2
                年嵌入式系統開發經驗（Raspberry Pi、Nexys 4、Apollo 3） 與
                Transformer-based TTS 的使用與編寫經驗。 2023 年任職於 Sound
                Control Technology，擔任軟韌體研發工程師；
                而目前在鴻海精密工業擔任軟體開發工程師，負責維護與開發測試管理系統（TMS,
                Test Management System）、撰寫 iPhone
                手機腳本與測試腳本、機械手臂開發，並與美國客戶進行技術溝通。
                擅長 Python，具備 Python 模組化、圖形化介面開發經驗（如
                tkinter）。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
