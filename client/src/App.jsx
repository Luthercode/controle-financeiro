// ============================================
// App.jsx — Componente principal
// ============================================
// Define todas as rotas (páginas) da aplicação.
// Usa React Router para navegar entre páginas sem recarregar.

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';

// Componente que protege rotas — só permite acesso se estiver logado
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="loading">Carregando...</div>;
  
  // Se não estiver logado, redireciona para o login
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas protegidas (precisa estar logado) */}
            <Route path="/dashboard" element={
              <PrivateRoute><Dashboard /></PrivateRoute>
            } />
            <Route path="/transactions" element={
              <PrivateRoute><Transactions /></PrivateRoute>
            } />

            {/* Rota padrão — redireciona para dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
