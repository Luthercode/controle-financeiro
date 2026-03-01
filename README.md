# 💰 Sistema de Controle Financeiro

> Aplicação web completa para gerenciamento de finanças pessoais com autenticação, CRUD de transações e dashboard interativo.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** — Runtime JavaScript
- **Express.js** — Framework web
- **MongoDB** + **Mongoose** — Banco de dados NoSQL
- **JWT** — Autenticação segura com tokens
- **bcryptjs** — Criptografia de senhas

### Frontend
- **React 18** — Biblioteca UI
- **Vite** — Build tool moderno e rápido
- **React Router** — Navegação SPA
- **Axios** — Requisições HTTP
- **CSS3** — Design responsivo customizado

## 📋 Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Autenticação JWT com rotas protegidas
- ✅ Adicionar receitas e despesas
- ✅ Editar e excluir transações
- ✅ Dashboard com resumo mensal (receitas, despesas, saldo)
- ✅ Categorização de transações
- ✅ Design responsivo (mobile-friendly)
- ✅ Validação de dados no backend

## 🏗️ Estrutura do Projeto

```
controle-financeiro/
├── backend/
│   ├── config/         # Configuração do banco de dados
│   ├── controllers/    # Lógica de negócio
│   ├── middleware/      # Autenticação JWT
│   ├── models/          # Modelos MongoDB
│   ├── routes/          # Rotas da API
│   ├── server.js        # Servidor Express
│   └── .env             # Variáveis de ambiente
├── client/
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── context/     # Gerenciamento de estado (Auth)
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── App.jsx      # Componente principal
│   │   └── index.css    # Estilos globais
│   └── index.html
└── README.md
```

## ⚡ Como Executar

### Pré-requisitos
- Node.js 18+
- MongoDB (local ou Atlas)

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

O backend roda em `http://localhost:5000` e o frontend em `http://localhost:3000`.

## 🔗 API Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/auth/register` | Cadastrar usuário | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| GET | `/api/auth/profile` | Ver perfil | ✅ |
| GET | `/api/transactions` | Listar transações | ✅ |
| POST | `/api/transactions` | Criar transação | ✅ |
| PUT | `/api/transactions/:id` | Editar transação | ✅ |
| DELETE | `/api/transactions/:id` | Excluir transação | ✅ |
| GET | `/api/dashboard` | Resumo financeiro | ✅ |

## 👨‍💻 Autor

**Luther** — Junior Full Stack Developer

- GitHub: [github.com/luther7](https://github.com/luther7)
- LinkedIn: [linkedin.com/in/luther7](https://linkedin.com/in/luther7)

## 📄 Licença

Este projeto está sob a licença MIT.
