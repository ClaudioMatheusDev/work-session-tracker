import { useState, useCallback, useEffect } from 'react';
import { operacoesService } from '../services/api';

/**
 * Hook para gerenciar o status da conexão com a API
 */
export const useConnectionStatus = () => {
  const [status, setStatus] = useState('checking');

  const testarConexao = useCallback(async () => {
    setStatus('checking');
    try {
      const result = await operacoesService.testConnection();
      setStatus(result.success ? 'connected' : 'disconnected');
      return result;
    } catch (error) {
      setStatus('disconnected');
      return { success: false, message: error.message };
    }
  }, []);

  // Testar conexão ao montar o componente
  useEffect(() => {
    testarConexao();
  }, [testarConexao]);

  return {
    status,
    testarConexao,
  };
};
