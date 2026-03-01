// ============================================
// models/User.js — Modelo do Usuário
// ============================================
// Define como um "usuário" é salvo no banco de dados.
// Pense como uma ficha de cadastro: nome, email, senha.

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para criptografar a senha

// Schema = estrutura/molde dos dados
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,         // Remove espaços extras
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,       // Não pode ter dois emails iguais
    lowercase: true,    // Salva sempre em minúsculo
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

// ANTES de salvar, criptografa a senha
// Isso é importante para segurança — nunca salvar senha pura no banco
userSchema.pre('save', async function () {
  // Só criptografa se a senha foi modificada
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar senha na hora do login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
