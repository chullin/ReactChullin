'use client';

export default function Footer() {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const phoneNumber = e.currentTarget.getAttribute('data-phone');
    alert('聯絡方式：' + phoneNumber);
  };

  return (
    <footer className="bg-white py-4 mt-auto">
      <div className="container px-4">
        <div className="row align-items-center justify-content-between flex-column flex-sm-row">
          <div className="col-auto">
            <div className="small m-0 text-muted">
              Copyright &copy; Joseph Chen 2024
            </div>
            <div className="small m-0 text-muted" style={{ opacity: 0.8, fontSize: '0.75rem' }}>
              <span id="busuanzi_container_site_pv" style={{ marginRight: '15px' }}>
                <i className="bi bi-eye-fill"></i> 總訪問量：<span id="busuanzi_value_site_pv"></span> 次
              </span>
              <span id="busuanzi_container_site_uv">
                <i className="bi bi-people-fill"></i> 總訪客數：<span id="busuanzi_value_site_uv"></span> 人
              </span>
            </div>
          </div>
          <div className="col-auto" style={{ fontSize: '1.7em', marginRight: '10px' }}>
            <a
              className="text-gradient"
              href="https://www.cake.me/s--g59SDSH82OEybvapXS0q5A--/fg6ts15"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-person-circle" style={{ marginRight: '10px' }}></i>
            </a>
            <a
              className="text-gradient"
              href="https://github.com/chullin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-github" style={{ marginRight: '10px' }}></i>
            </a>
            <a
              className="text-gradient"
              href="https://www.facebook.com/profile.php?id=100002930302460"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook" style={{ marginRight: '10px' }}></i>
            </a>
            <a
              id="contact-link"
              className="text-gradient"
              href="#"
              data-phone="(+886) 960-967-058"
              onClick={handleContactClick}
            >
              <i className="bi bi-telephone" style={{ marginRight: '10px' }}></i>
            </a>
            <a className="text-gradient" href="mailto:fg6ts15@gmail.com">
              <i className="bi bi-envelope" style={{ marginRight: '10px' }}></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
