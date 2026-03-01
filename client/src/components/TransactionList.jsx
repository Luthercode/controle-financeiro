// ============================================
// components/TransactionList.jsx — Lista de Transações
// ============================================

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return <p className="empty-message">Nenhuma transação encontrada. Adicione a primeira!</p>;
  }

  // Formata valor para moeda euro
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  // Formata data para pt-BR
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="transaction-list">
      <h3>📋 Histórico de Transações</h3>
      
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className={`row-${t.type}`}>
              <td>{formatDate(t.date)}</td>
              <td>{t.description}</td>
              <td>{t.category || 'Outros'}</td>
              <td>
                <span className={`badge badge-${t.type}`}>
                  {t.type === 'receita' ? '🟢 Receita' : '🔴 Despesa'}
                </span>
              </td>
              <td className={`amount-${t.type}`}>
                {t.type === 'receita' ? '+' : '-'} {formatCurrency(t.amount)}
              </td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(t)}>✏️</button>
                <button className="btn-delete" onClick={() => onDelete(t._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
