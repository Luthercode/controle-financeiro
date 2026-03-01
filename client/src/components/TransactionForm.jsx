// ============================================
// components/TransactionForm.jsx — Formulário de Receita/Despesa
// ============================================

import { useState, useEffect } from 'react';
import api from '../api';

const defaultForm = {
  type: 'despesa',
  description: '',
  amount: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
};

const TransactionForm = ({ onTransactionAdded, editingTransaction, onCancelEdit }) => {
  const [formData, setFormData] = useState(editingTransaction || defaultForm);
  const [error, setError] = useState('');

  // Atualiza o form quando o editingTransaction muda
  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    } else {
      setFormData({ ...defaultForm, date: new Date().toISOString().split('T')[0] });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingTransaction) {
        await api.put(`/transactions/${editingTransaction._id}`, formData);
      } else {
        const payload = {
          ...formData,
          amount: parseFloat(formData.amount),
        };
        await api.post('/transactions', payload);
      }

      // Limpa o formulário
      setFormData({
        type: 'despesa',
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });

      // Avisa o componente pai que deu certo
      onTransactionAdded();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Erro ao salvar transação';
      setError(msg);
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h3>{editingTransaction ? '✏️ Editar Transação' : '➕ Nova Transação'}</h3>
      
      {error && <p className="error-message">{error}</p>}

      <div className="form-row">
        <div className="form-group">
          <label>Tipo</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="despesa">🔴 Despesa</option>
            <option value="receita">🟢 Receita</option>
          </select>
        </div>

        <div className="form-group">
          <label>Valor (€)</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Descrição</label>
        <input
          type="text"
          name="description"
          placeholder="Ex: Almoço, Salário, Aluguel..."
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Categoria</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Selecione...</option>
            <option value="Alimentação">🍕 Alimentação</option>
            <option value="Transporte">🚗 Transporte</option>
            <option value="Moradia">🏠 Moradia</option>
            <option value="Salário">💼 Salário</option>
            <option value="Freelance">💻 Freelance</option>
            <option value="Lazer">🎮 Lazer</option>
            <option value="Saúde">🏥 Saúde</option>
            <option value="Educação">📚 Educação</option>
            <option value="Outros">📦 Outros</option>
          </select>
        </div>

        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingTransaction ? 'Salvar Alterações' : 'Adicionar'}
        </button>
        {editingTransaction && (
          <button type="button" className="btn-secondary" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
