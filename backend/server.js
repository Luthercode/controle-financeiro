// ============================================
// server.js — O CORAÇÃO do backend
// ============================================
// Este é o arquivo principal. Ele:
// 1. Configura o Express (framework web)
// 2. Conecta ao banco de dados MongoDB
// 3. Define as rotas da API
// 4. Inicia o servidor na porta 5000

const express = require('express');     // Framework para criar APIs
const cors = require('cors');           // Permite o frontend acessar o backend
const dotenv = require('dotenv');       // Carrega variáveis de ambiente (.env)
const connectDB = require('./config/db'); // Função que conecta ao MongoDB

// Carrega as configurações do arquivo .env
dotenv.config();

// Conecta ao banco de dados
connectDB();

// Cria a aplicação Express
const app = express();

// MIDDLEWARES (funções que rodam antes das rotas)
app.use(cors());              // Libera acesso do frontend
app.use(express.json());      // Permite receber dados JSON no body

// ROTAS — cada rota cuida de uma parte do sistema
app.use('/api/auth', require('./routes/authRoutes'));             // Login e cadastro
app.use('/api/transactions', require('./routes/transactionRoutes')); // Receitas e despesas
app.use('/api/dashboard', require('./routes/dashboardRoutes'));   // Dashboard/resumo

// Rota inicial — só para testar se o servidor está rodando
app.get('/', (req, res) => {
  res.json({ message: '🟢 API do Controle Financeiro está rodando!' });
});

// Define a porta (usa a do .env ou 5000 como padrão)
const PORT = process.env.PORT || 5000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
