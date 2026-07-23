import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { LornaEvans } from './pages/LornaEvans';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ContentDetail } from './pages/ContentDetail/ContentDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lornaevans" element={<LornaEvans />} />
            <Route path="/cursos/:id" element={<ContentDetail table="courses" />} />
            <Route path="/eventos/:id" element={<ContentDetail table="events" />} />
            <Route path="/noticias/:id" element={<ContentDetail table="news" />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
