export default function ContactPage() {
  return (
    <section className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100dvh - 120px)' }}>
      <div className="container px-4">
        <div className="row justify-content-center">
          <div className="col-auto">
            <div
              className="text-center bg-light rounded-5 border border-light shadow-sm d-flex flex-column align-items-center justify-content-center"
              style={{ width: '520px', height: '520px', padding: '3rem' }}
            >
              <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-circle mb-3 d-inline-flex align-items-center justify-content-center shadow-sm" style={{ width: '52px', height: '52px', fontSize: '20px' }}>
                <i className="bi bi-chat-dots-fill"></i>
              </div>
              <h2 className="fw-bolder mb-2" style={{ letterSpacing: '-0.5px', fontSize: '1.6rem' }}>Let's work together!</h2>
              <p className="text-muted mb-4 fw-light" style={{ fontSize: '0.9rem' }}>
                歡迎隨時聯絡我！不論是技術交流、專案合作<br/>或是任何有趣的想法，都非常樂意討論。
              </p>
              <a
                href="mailto:contact@example.com"
                className="btn btn-dark px-4 py-2 rounded-pill fw-bold shadow mb-4"
              >
                <i className="bi bi-envelope-check-fill me-2"></i> 聯絡我 (Email Me)
              </a>
              <div className="border-top border-light w-100 pt-3">
                <p className="text-secondary small fw-bolder text-uppercase mb-2" style={{ letterSpacing: '2px', fontSize: '0.7rem' }}>
                  Find me elsewhere
                </p>
                <div className="d-flex justify-content-center gap-4">
                  <a href="https://github.com/chullin" target="_blank" rel="noreferrer" className="text-dark fs-4">
                    <i className="bi bi-github"></i>
                  </a>
                  <a href="#" target="_blank" rel="noreferrer" className="text-dark fs-4">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
