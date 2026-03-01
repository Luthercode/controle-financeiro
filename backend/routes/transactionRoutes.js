// ============================================
// routes/transactionRoutes.js — Rotas de Transações
// ============================================
// Todas as rotas aqui são PROTEGIDAS (precisa estar logado).

const express = require('express');
const router = express.Router();
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');
const protect = require('../middleware/auth');

// Aplica proteção em TODAS as rotas abaixo
router.use(protect);

// GET /api/transactions     — Listar todas
// POST /api/transactions    — Criar nova
router.route('/').get(getTransactions).post(createTransaction);

// PUT /api/transactions/:id    — Editar
// DELETE /api/transactions/:id — Excluir
router.route('/:id').put(updateTransaction).delete(deleteTransaction);

module.exports = router;
