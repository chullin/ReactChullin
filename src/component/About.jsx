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
              <p
                className="text-muted mb-4 font-color-555"
                style={{
                  textAlign: "left", // 文字靠左
                  lineHeight: "1.8em", // 行距，增加可讀性
                  maxWidth: "500px", // 限制段落寬度，避免太長難讀
                  margin: "0 auto", // 讓整個區塊仍然置中，但文字靠左
                }}
              >
                <strong>學歷背景</strong>
                <br />
                畢業於國立中正大學資訊工程所晶片系統組
                <br />
                碩士論文研究方向：
                <br />
                - Transformer-based TTS，探討基於 Transformer 的文字轉語音方法
                <br />
                - 以 C 語言實作
                <br />
                - 具備 Transformer 神經網路微調與嵌入式系統開發經驗
                <br />
                <br />
                <strong>工作經歷</strong>
                <br />
                <u>2023 年</u>｜美商 Sound Control Technology，軟韌體工程師
                <br />
                - 開發 Automated Multi-Interface Test & Control System
                <br />
                - 使用 Python 進行 GUI 開發與 Raspberry Pi 控制
                <br />
                - 負責系統測試與優化
                <br />
                <br />
                <u>目前</u>｜鴻海精密工業，軟體工程師
                <br />
                - 維護與開發測試管理系統（TMS, Test Management System）
                <br />
                - iPhone 測試腳本撰寫
                <br />
                - 跨部門協調與專案支援
                <br />
                - 曾短期派駐印度富士康，協助建廠並代理測試課課長半年
                <br />
                <br />
                <strong>技能專長</strong>
                <br />
                Python、Linux、Git、C
                <br />
                擅長測試系統開發與自動化
                <br />
                <br />
                <strong>未來職涯方向</strong>
                <br />
                軟體工程師、前端工程師
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
