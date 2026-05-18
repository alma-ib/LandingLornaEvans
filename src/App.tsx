import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { LornaEvans } from './pages/LornaEvans';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lornaevans" element={<LornaEvans />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
