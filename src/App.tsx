import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import PDFPage from './pages/pdf/pdf';
import HomePage from './pages/Home';
import CounterpartyPage from './pages/counterparty';
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Головна</Link>
            </li>
            <li>
              <Link to="/pdf">PDF</Link>
            </li>
            <li>
              <Link to="/counterparty+group">Counterparty+Group</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pdf" element={<PDFPage />} />
          <Route path="//counterparty+group" element={<CounterpartyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;