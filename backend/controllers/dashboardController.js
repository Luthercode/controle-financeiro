// ============================================
// controllers/dashboardController.js — Resumo Financeiro
// ============================================
// Calcula o total de receitas, despesas e saldo mensal.
// É o que aparece no Dashboard do sistema.

const Transaction = require('../models/Transaction');

// GET /api/dashboard
const getDashboard = async (req, res) => {
  try {
    // Pega o mês e ano atuais (ou os enviados pelo frontend)
    const { month, year } = req.query;
    
    const now = new Date();
    const targetMonth = month ? parseInt(month) - 1 : now.getMonth(); // 0-11
    const targetYear = year ? parseInt(year) : now.getFullYear();

    // Define o início e fim do mês em UTC (evita problemas de fuso horário)
    const startDate = new Date(Date.UTC(targetYear, targetMonth, 1));
    const endDate = new Date(Date.UTC(targetYear, targetMonth + 1, 0, 23, 59, 59, 999));

    // Busca transações do usuário naquele mês
    const transactions = await Transaction.find({
      user: req.user._id,
      date: { $gte: startDate, $lte: endDate },
    });

    // Calcula os totais
    let totalReceitas = 0;
    let totalDespesas = 0;

    transactions.forEach((t) => {
      if (t.type === 'receita') {
        totalReceitas += t.amount;
      } else {
        totalDespesas += t.amount;
      }
    });

    const saldo = totalReceitas - totalDespesas;

    // Retorna o resumo
    res.json({
      month: targetMonth + 1,
      year: targetYear,
      totalReceitas: totalReceitas.toFixed(2),
      totalDespesas: totalDespesas.toFixed(2),
      saldo: saldo.toFixed(2),
      totalTransactions: transactions.length,
      transactions, // Também retorna as transações do mês
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar dashboard', error: error.message });
  }
};

module.exports = { getDashboard };
