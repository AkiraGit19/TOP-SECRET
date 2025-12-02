import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ListaPage from './pages/ListaPage';
import MarcoLegalPage from './pages/MarcoLegalPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lista" element={<ListaPage />} />
          <Route path="/agregar" element={<HomePage />} />
          <Route path="/marco-legal" element={<MarcoLegalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
