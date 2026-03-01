// ============================================
// routes/authRoutes.js — Rotas de Autenticação
// ============================================
// Define os "endereços" para login e cadastro.

const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const protect = require('../middleware/auth');

// POST /api/auth/register — Cadastrar novo usuário
router.post('/register', register);

// POST /api/auth/login — Fazer login
router.post('/login', login);

// GET /api/auth/profile — Ver perfil (precisa estar logado)
router.get('/profile', protect, getProfile);

module.exports = router;
