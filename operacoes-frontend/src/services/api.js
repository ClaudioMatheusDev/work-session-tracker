import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://work-session-tracker-production.up.railway.app/api',
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
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
    console.error('❌ Erro na resposta:', error);
    
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      console.error('Erro de rede - possível problema de CORS ou conectividade');
    }
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Requisição feita mas sem resposta:', error.request);
    }
    
    return Promise.reject(error);
  }
);

// Serviços específicos para operações
export const operacoesService = {
  // Buscar todas as operações
  getAll: async () => {
    try {
      const response = await api.get('/operacoes');
      // Se a resposta for paginada, retorna apenas o array de dados
      if (response.data && response.data.data) {
        return response.data.data;
      }
      // Se for um array direto, retorna como está
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('❌ Erro ao buscar operações:', error);
      if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        throw new Error('Erro de conectividade: Não foi possível conectar com o servidor. Verifique sua conexão.');
      }
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
      if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        throw new Error('Erro de conectividade: Não foi possível conectar com o servidor.');
      }
      throw new Error(`Erro ao buscar operação: ${error.response?.data?.message || error.message}`);
    }
  },

  // Criar nova operação
  create: async (operacao) => {
    try {
      console.log('📝 Enviando operação:', operacao);
      
      // Garantir que as datas estão no formato correto
      const operacaoFormatada = {
        descricao: operacao.descricao.trim(),
        horaInicio: new Date(operacao.horaInicio).toISOString(),
        horaFim: new Date(operacao.horaFim).toISOString(),
      };
      
      console.log('📝 Operação formatada:', operacaoFormatada);
      
      const response = await api.post('/operacoes', operacaoFormatada);
      console.log('✅ Operação criada:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar operação:', error);
      
      if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        throw new Error('Erro de conectividade: Não foi possível conectar com o servidor. Verifique se a API está rodando e sua conexão com a internet.');
      }
      
      if (error.response?.status === 400) {
        const validationErrors = error.response.data?.errors;
        if (validationErrors) {
          const errorMessages = Object.values(validationErrors).flat();
          throw new Error(`Erro de validação: ${errorMessages.join(', ')}`);
        }
      }
      
      if (error.response?.status === 500) {
        throw new Error('Erro interno do servidor. Tente novamente em alguns instantes.');
      }
      
      throw new Error(`Erro ao criar operação: ${error.response?.data?.title || error.response?.data?.message || error.message}`);
    }
  },

  // Atualizar operação existente
  update: async (id, operacao) => {
    try {
      console.log('✏️ Atualizando operação:', id, operacao);
      
      const operacaoFormatada = {
        id: parseInt(id),
        descricao: operacao.descricao.trim(),
        horaInicio: new Date(operacao.horaInicio).toISOString(),
        horaFim: new Date(operacao.horaFim).toISOString(),
      };
      
      const response = await api.put(`/operacoes/${id}`, operacaoFormatada);
      console.log('✅ Operação atualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar operação:', error);
      
      if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        throw new Error('Erro de conectividade: Não foi possível conectar com o servidor.');
      }
      
      if (error.response?.status === 404) {
        throw new Error('Operação não encontrada para atualização');
      }
      
      if (error.response?.status === 400) {
        throw new Error('Dados inválidos para atualização');
      }
      
      if (error.response?.status === 409) {
        throw new Error('Conflito: A operação foi modificada por outro usuário');
      }
      
      throw new Error(`Erro ao atualizar operação: ${error.response?.data?.title || error.response?.data?.message || error.message}`);
    }
  },

  // Excluir operação
  delete: async (id) => {
    try {
      console.log('🗑️ Excluindo operação:', id);
      
      await api.delete(`/operacoes/${id}`);
      console.log('✅ Operação excluída com sucesso');
      return true;
    } catch (error) {
      console.error('❌ Erro ao excluir operação:', error);
      
      if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        throw new Error('Erro de conectividade: Não foi possível conectar com o servidor.');
      }
      
      if (error.response?.status === 404) {
        throw new Error('Operação não encontrada para exclusão');
      }
      
      throw new Error(`Erro ao excluir operação: ${error.response?.data?.title || error.response?.data?.message || error.message}`);
    }
  },

  // Método para testar conectividade
  testConnection: async () => {
    try {
      await api.get('/operacoes');
      return { success: true, message: 'Conexão OK' };
    } catch (error) {
      return { 
        success: false, 
        message: error.code === 'NETWORK_ERROR' ? 'Erro de rede' : error.message 
      };
    }
  },
};

export { api };
export default api;