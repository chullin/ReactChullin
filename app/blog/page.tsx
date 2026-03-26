import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="container px-4 my-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bolder mb-0">
          <span className="text-gradient d-inline">Blog</span>
        </h1>
        <br />
        <span className="subheading">
          How far a person can go, It&apos;s all about who you&apos;re traveling with.
        </span>
      </div>
      <div className="row gx-5 justify-content-center">
        <div className="col-lg-11 col-xl-9 col-xxl-8">
          <section>
            {/* Blog Card 1 */}
            <div className="card border-0 rounded-4 mb-5">
              <div className="card-body p-5">
                <div className="post-preview">
                  <a href="https://chullin.github.io/Exploring-Neural-Networks/" target="_blank" rel="noopener noreferrer">
                    <span className="fw-bolder mb-0 blog-title">錄製音檔、安裝 TensorFlow、設置 Python 虛擬環境</span>
                    <br />
                    <span className="post-subtitle">
                      請確保您已經安裝了適當的 GPU 驅動程序，並且您的 GPU 支持 CUDA
                    </span>
                  </a>
                  <p className="post-meta">
                    Posted by <Link href="/">Joseph Chen</Link> on December 16, 2023
                  </p>
                </div>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="card border-0 rounded-4 mb-5">
              <div className="card-body p-5">
                <div className="post-preview">
                  <Link href="/blog/man-must-explore">
                    <span className="fw-bolder mb-0 blog-title">
                      Man must explore, and this is exploration at its greatest
                    </span>
                    <br />
                    <span className="post-subtitle">Problems look mighty small from 150 miles up</span>
                  </Link>
                  <p className="post-meta">
                    Posted by <Link href="/">Joseph Chen</Link> on August 24, 2023
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
