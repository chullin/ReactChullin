export default function Footer() {
  return (
    <footer className="bg-white py-4 mt-auto">
      <div className="container px-4">
        <div className="row align-items-center justify-content-between flex-column flex-sm-row">
          <div className="col-auto">
            <div className="small m-0">Copyright &copy; Joseph Chen 2024</div>
          </div>
          <div
            className="col-auto"
            style={{ fontSize: "1.7em", marginRight: 10 }}
          >
            <a
              className="text-gradient"
              href="https://www.cake.me/s--g59SDSH82OEybvapXS0q5A--/fg6ts15"
            >
              <i
                className="bi bi-person-circle"
                style={{ marginRight: 10 }}
              ></i>
            </a>
            <a className="text-gradient" href="https://github.com/chullin">
              <i className="bi bi-github" style={{ marginRight: 10 }}></i>
            </a>
            <a
              className="text-gradient"
              href="https://www.facebook.com/profile.php?id=100002930302460"
            >
              <i className="bi bi-facebook" style={{ marginRight: 10 }}></i>
            </a>
            <a className="text-gradient" href="tel:+886960967058">
              <i className="bi bi-telephone" style={{ marginRight: 10 }}></i>
            </a>
            <a className="text-gradient" href="mailto:fg6ts15@gmail.com">
              <i className="bi bi-envelope" style={{ marginRight: 10 }}></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
