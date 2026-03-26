import Link from 'next/link';

export default function DemoPage() {
  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container px-5">
        <h1 className="fw-bold text-center mb-5">🎬 Demo Showcase</h1>

        <div className="row g-4 mb-5">
          {/* Demo 1 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 hover-shadow">
              <div className="card-body text-center">
                <img
                  src="/assets/ollama.png"
                  alt="Ollama Demo"
                  style={{
                    width: '2.5rem',
                    height: '4rem',
                    borderRadius: '10px',
                    objectFit: 'contain',
                  }}
                />
                <h5 className="card-title mt-3">Ollama Demo</h5>
                <p className="card-text text-muted small">
                  展示基於 Ollama 的模型應用與執行效果。
                </p>
                <a
                  href="https://chullin.github.io/fullVideo/ollama-demo_small.mp4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  Watch Demo
                </a>
              </div>
            </div>
          </div>

          {/* Demo 2 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 hover-shadow">
              <div className="card-body text-center">
                <img
                  src="/assets/shadow.jpg"
                  alt="陰の実力者になりたくて！"
                  style={{
                    width: '6rem',
                    height: 'auto',
                    borderRadius: '10px',
                    objectFit: 'contain',
                  }}
                />
                <h5
                  className="card-title mt-3"
                  style={{
                    fontFamily: "'Noto Sans JP', 'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 'large',
                    color: '#2c3e50',
                    letterSpacing: '1px',
                  }}
                >
                  陰の実力者になりたくて！
                </h5>
                <p className="card-text text-muted small">
                  影之強者 - 第一集 (一次載入，速度慢)
                </p>
                <a
                  href="https://chullin.github.io/fullVideo/shadow.mp4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-success btn-sm"
                >
                  Watch Demo
                </a>
              </div>
            </div>
          </div>

          {/* Demo 3 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 hover-shadow">
              <div className="card-body text-center">
                <i
                  className="bi bi-play-circle text-danger"
                  style={{ fontSize: '2.5rem' }}
                ></i>
                <h5 className="card-title mt-3">Segmented Video Player</h5>
                <p className="card-text text-muted small">
                  自製影片分段播放器，可播放多段串流內容。
                </p>
                <Link
                  href="/video-player"
                  className="btn btn-outline-danger btn-sm"
                >
                  Open Player
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 d-flex flex-column gap-3 align-items-center">
             <a
                className="btn btn-primary px-4 py-2"
                href="https://drive.usercontent.google.com/download?id=1667ESrfPS-oUpMkiJE-BvNbUp1bJhQ8v&export=download&authuser=0"
              >
                <div className="d-inline-block bi bi-download me-2"></div>
                Download BarCode_中英文版.7z
              </a>

              <a
                className="btn btn-primary px-4 py-2"
                href="https://drive.usercontent.google.com/download?id=10IwoqmqRAe8G60iHKecVa8Vf2j2QgfzA&export=download&authuser=0&confirm=t"
              >
                <div className="d-inline-block bi bi-download me-2"></div>
                Download BarCode_Code.7z
              </a>
          </div>
        </div>
      </div>
    </section>
  );
}
