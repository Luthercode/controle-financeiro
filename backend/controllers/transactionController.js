// ============================================
// controllers/transactionController.js — Lógica de Transações
// ============================================
// CRUD completo de receitas e despesas:
// C = Create (criar)
// R = Read (ler/listar)
// U = Update (editar)
// D = Delete (excluir)

const Transaction = require('../models/Transaction');

// ---- LISTAR TRANSAÇÕES ----
// GET /api/transactions
const getTransactions = async (req, res) => {
  try {
    // Busca todas as transações DO USUÁRIO LOGADO
    // Ordena por data mais recente primeiro
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ date: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar transações', error: error.message });
  }
};

// ---- CRIAR TRANSAÇÃO ----
// POST /api/transactions
const createTransaction = async (req, res) => {
  try {
    const { type, description, amount, category, date } = req.body;

    // Validação
    if (!type || !description || !amount) {
      return res.status(400).json({ message: 'Preencha tipo, descrição e valor' });
    }

    const transaction = await Transaction.create({
      user: req.user._id,  // Associa ao usuário logado
      type,
      description,
      amount,
      category,
      date: date || Date.now(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar transação', error: error.message });
  }
};

// ---- EDITAR TRANSAÇÃO ----
// PUT /api/transactions/:id
const updateTransaction = async (req, res) => {
  try {
    // Busca a transação pelo ID
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    // Verifica se a transação pertence ao usuário logado
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Você não tem permissão para editar esta transação' });
    }

    // Atualiza a transação
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new: true retorna o dado atualizado
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar transação', error: error.message });
  }
};

// ---- EXCLUIR TRANSAÇÃO ----
// DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    // Verifica se pertence ao usuário logado
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Você não tem permissão para excluir esta transação' });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transação excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir transação', error: error.message });
  }
};

module.exports = { getTransactions, createTransaction, updateTransaction, deleteTransaction };
