import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: 'https://work-session-tracker-production.up.railway.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para requests
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Requisição: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptador para responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Serviços específicos para operações
export const operacoesService = {
  // Buscar todas as operações
  getAll: async () => {
    try {
      const response = await api.get('/operacoes');
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar operações: ${error.response?.data?.message || error.message}`);
    }
  },

  // Buscar operação por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/operacoes/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`Operação com ID ${id} não encontrada`);
      }
      throw new Error(`Erro ao buscar operação: ${error.response?.data?.message || error.message}`);
    }
  },

  // Criar nova operação
  create: async (operacao) => {
    try {
      const response = await api.post('/operacoes', operacao);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao criar operação: ${error.response?.data?.message || error.message}`);
    }
  },
};

export { api };
export default api;