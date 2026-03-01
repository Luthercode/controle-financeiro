// ============================================
// models/Transaction.js — Modelo de Transação
// ============================================
// Define como cada receita ou despesa é salva no banco.
// Cada transação pertence a um usuário.

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Referência ao usuário dono
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['receita', 'despesa'],  // Só aceita esses dois valores
    required: [true, 'Tipo é obrigatório (receita ou despesa)'],
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Valor é obrigatório'],
    min: [0.01, 'Valor deve ser maior que zero'],
  },
  category: {
    type: String,
    default: 'Outros',
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now, // Se não informar, usa a data atual
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Transaction', transactionSchema);
