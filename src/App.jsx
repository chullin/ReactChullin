import logo from "./logo.svg";
import "./App.css";
// 需要先下載 bootstrap npm install bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// 自定義 css
import "./mainPage.css";

import Navbar from "./component/Navbar";
import Header from "./component/Header";
import About from "./component/About";
import Footer from "./component/Footer";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div className="d-flex flex-column h-100">
      <main className="flex-shrink-0">
        <Navbar />
        <Header />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
