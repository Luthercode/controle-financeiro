// ============================================
// components/Navbar.jsx — Barra de navegação
// ============================================

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">💰 Controle Financeiro</Link>
      </div>
      
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/transactions">Transações</Link>
            <span className="navbar-user">Olá, {user.name}</span>
            <button onClick={handleLogout} className="btn-logout">
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
