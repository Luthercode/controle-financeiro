// ============================================
// controllers/authController.js — Lógica de Login/Cadastro
// ============================================
// Aqui ficam as funções que realmente fazem o trabalho:
// - Cadastrar novo usuário
// - Fazer login
// - Pegar dados do perfil

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Função auxiliar: gerar token JWT
// O token é como um "crachá digital" que prova que você está logado
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expira em 30 dias
  });
};

// ---- CADASTRO ----
// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    // Verifica se o email já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Este email já está cadastrado' });
    }

    // Cria o usuário no banco
    const user = await User.create({ name, email, password });

    // Retorna os dados + token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// ---- LOGIN ----
// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se os campos foram preenchidos
    if (!email || !password) {
      return res.status(400).json({ message: 'Preencha email e senha' });
    }

    // Busca o usuário pelo email
    const user = await User.findOne({ email });

    // Verifica se existe e se a senha está correta
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email ou senha incorretos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// ---- PERFIL ----
// GET /api/auth/profile
const getProfile = async (req, res) => {
  // req.user já foi preenchido pelo middleware de autenticação
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
};

module.exports = { register, login, getProfile };
