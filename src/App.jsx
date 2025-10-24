import './App.css';

function App() {
  return (
    <>
      {/* Header */}
      <header>
        <img className="logo" src="/src/assets/images/logo.png" alt="Logo" />
        <h1 className="title">Memory Card</h1>
      </header>
      {/* Main Content */}

      {/* Footer */}
      <footer>
        &copy; 2025 Designed and developed by
        <a
          href="https://github.com/Alex-Huaracha"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <svg className="icon" aria-hidden="true">
            <use href="#icon-github"></use>
          </svg>
          Alex Huaracha
        </a>
      </footer>
    </>
  );
}

export default App;
