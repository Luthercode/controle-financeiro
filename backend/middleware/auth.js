// ============================================
// middleware/auth.js — Proteção de rotas
// ============================================
// Este middleware verifica se o usuário está logado
// antes de permitir acesso às rotas protegidas.
// Funciona como um "segurança" na porta.

const jwt = require('jsonwebtoken'); // Biblioteca para tokens de autenticação
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Verifica se existe um token no cabeçalho da requisição
  // O token vem no formato: "Bearer eyJhbGciOi..."
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrai o token (remove a palavra "Bearer")
      token = req.headers.authorization.split(' ')[1];

      // Decodifica o token e verifica se é válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca o usuário no banco (sem a senha)
      req.user = await User.findById(decoded.id).select('-password');

      // Se o usuário não existe mais no banco (ex: DB reiniciou)
      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não encontrado. Faça login novamente.' });
      }

      return next(); // Permite continuar para a rota
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido. Faça login novamente.' });
    }
  }

  return res.status(401).json({ message: 'Acesso negado. Você precisa estar logado.' });
};

module.exports = protect;
