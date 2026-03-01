// ============================================
// api.js — Instância centralizada do Axios
// ============================================

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR de requisição — adiciona token ANTES de cada chamada
api.interceptors.request.use(
  (config) => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const { token } = JSON.parse(savedUser);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (e) {
      console.error('Erro ao ler token:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR de resposta — trata 401 (token expirado/inválido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o servidor retornou 401, o token é inválido
    // Limpa localStorage e redireciona para login
    if (error.response?.status === 401) {
      console.warn('[API] Token inválido - limpando sessão');
      localStorage.removeItem('user');
      // Só redireciona se não estiver já na página de login
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
