// ============================================
// config/db.js — Conexão com o banco de dados
// ============================================
// MongoDB é um banco de dados que guarda informações
// como usuários, receitas e despesas.
// Este arquivo conecta nossa API ao MongoDB.
//
// Em DESENVOLVIMENTO usa MongoDB em memória (não precisa instalar nada!)
// Em PRODUÇÃO usa MongoDB Atlas (nuvem)

const mongoose = require('mongoose'); // Biblioteca para trabalhar com MongoDB
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer; // Guarda a instância do servidor em memória

const connectDB = async () => {
  try {
    let uri;

    if (process.env.MONGO_URI && process.env.MONGO_URI.startsWith('mongodb+srv')) {
      // PRODUÇÃO — Usa MongoDB Atlas (nuvem)
      uri = process.env.MONGO_URI;
      console.log('🌐 Usando MongoDB Atlas (produção)');
    } else {
      // DESENVOLVIMENTO — Usa MongoDB em memória
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('🧪 Usando MongoDB em memória (desenvolvimento)');
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1); // Fecha o servidor se não conseguir conectar
  }
};

module.exports = connectDB;
