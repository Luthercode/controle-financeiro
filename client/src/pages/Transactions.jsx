// ============================================
// pages/Transactions.jsx — Página de Transações
// ============================================
// Aqui o usuário pode:
// - Ver todas as transações
// - Adicionar nova
// - Editar existente
// - Excluir

import { useState, useEffect } from 'react';
import api from '../api';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null); // Transação sendo editada
  const [loading, setLoading] = useState(true);

  // Função que busca transações
  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  // Busca as transações quando a página carrega
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Quando uma transação é adicionada/editada, recarrega a lista
  const handleTransactionAdded = () => {
    fetchTransactions();
    setEditing(null);
  };

  // Quando clica em editar
  const handleEdit = (transaction) => {
    setEditing({
      ...transaction,
      date: transaction.date.split('T')[0], // Formata a data para o input
    });
  };

  // Quando clica em excluir
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      try {
        await api.delete(`/transactions/${id}`);
        fetchTransactions(); // Recarrega a lista
      } catch (error) {
        console.error('Erro ao excluir:', error);
      }
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="transactions-page">
      <h2>💳 Transações</h2>

      <TransactionForm
        onTransactionAdded={handleTransactionAdded}
        editingTransaction={editing}
        onCancelEdit={() => setEditing(null)}
      />

      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Transactions;
