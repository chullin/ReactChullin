import PhotoCarousel from "./PhotoCarousel";

export default function Header() {
  return (
    <header className="py-5">
      <div className="container px-5 pb-5">
        <div className="row gx-5 align-items-center">
          <div className="col-xxl-5">
            <div className="text-center text-xxl-start">
              <span className="badge bg-gradient-primary-to-secondary text-white mb-4 text-uppercase">
                Software · Engineer
              </span>
              <div className="fs-3 fw-light text-muted">
                陳憲億 (Sian-Yi Chen)
              </div>
              <h1 className="display-3 fw-bolder mb-5">
                <span className="text-gradient d-inline">
                  I think, therefore I am
                </span>
              </h1>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                <a
                  className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder"
                  href="/resume"
                >
                  Resume
                </a>
                <a
                  className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder"
                  href="/projects"
                >
                  Projects
                </a>
              </div>
            </div>
          </div>
          <div className="col-xxl-7">
            <PhotoCarousel />
          </div>
        </div>
      </div>
    </header>
  );
}
