// ============================================
// context/AuthContext.jsx — Gerenciamento de Login
// ============================================
// O "Context" no React é como uma variável GLOBAL.
// Qualquer componente pode saber se o usuário está logado.

import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

// Cria o contexto
const AuthContext = createContext();

// Provider = o "provedor" que envolve toda a aplicação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Dados do usuário
  const [loading, setLoading] = useState(true);  // Carregando?

  // Quando a página carrega, verifica se tem um token salvo E se ainda é válido
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          // Testa se o token ainda funciona no backend
          const response = await api.get('/auth/profile');
          // Se chegou aqui, token é válido - usa os dados frescos do servidor
          setUser({ ...response.data, token: parsed.token });
        } catch (e) {
          // Token inválido ou servidor fora — limpa tudo
          console.warn('Sessão expirada, fazendo logout');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Função de login
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const userData = response.data;
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  };

  // Função de cadastro
  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    const userData = response.data;
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto em qualquer componente
export const useAuth = () => useContext(AuthContext);
