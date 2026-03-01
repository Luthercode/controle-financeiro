import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração do Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend roda na porta 3000
    proxy: {
      // Quando o frontend chamar /api/..., redireciona para o backend na porta 5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
