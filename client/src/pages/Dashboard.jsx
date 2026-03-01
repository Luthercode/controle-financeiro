// ============================================
// pages/Dashboard.jsx — Painel Principal
// ============================================
// Mostra o resumo financeiro do mês:
// Total de receitas, despesas e saldo.

import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation(); // Detecta mudança de rota
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Função que busca dados do dashboard
  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/dashboard');
      setDashboard(response.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Erro desconhecido';
      setError(`Erro ao carregar dashboard: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca dados SEMPRE que a página é acessada (navegação ou refresh)
  useEffect(() => {
    if (user) {
      fetchDashboard();
    }
  }, [user, location.key, fetchDashboard]);

  // Formata valor para moeda euro
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h2>📊 Dashboard</h2>
          <p>Bem-vindo, {user?.name}! Aqui está seu resumo financeiro.</p>
        </div>
        <button className="btn-refresh" onClick={fetchDashboard}>🔄 Atualizar</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="dashboard-cards">
        <div className="card card-income">
          <h3>🟢 Receitas</h3>
          <p className="card-value">{formatCurrency(dashboard?.totalReceitas || 0)}</p>
        </div>

        <div className="card card-expense">
          <h3>🔴 Despesas</h3>
          <p className="card-value">{formatCurrency(dashboard?.totalDespesas || 0)}</p>
        </div>

        <div className={`card ${parseFloat(dashboard?.saldo) >= 0 ? 'card-positive' : 'card-negative'}`}>
          <h3>💰 Saldo</h3>
          <p className="card-value">{formatCurrency(dashboard?.saldo || 0)}</p>
        </div>

        <div className="card card-info">
          <h3>📋 Transações</h3>
          <p className="card-value">{dashboard?.totalTransactions || 0}</p>
        </div>
      </div>

      {/* Lista as últimas transações do mês */}
      {dashboard?.transactions?.length > 0 && (
        <div className="dashboard-recent">
          <h3>Últimas transações do mês</h3>
          <ul>
            {dashboard.transactions.slice(0, 5).map((t) => (
              <li key={t._id} className={`recent-${t.type}`}>
                <span>{t.description}</span>
                <span className={`amount-${t.type}`}>
                  {t.type === 'receita' ? '+' : '-'} {formatCurrency(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
