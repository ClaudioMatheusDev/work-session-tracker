import { useState, useCallback } from 'react';
import { operacoesService } from '../services/api';

/**
 * Hook customizado para gerenciar operações
 */
export const useOperacoes = () => {
  const [operacoes, setOperacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Carregar todas as operações
  const carregarOperacoes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await operacoesService.getAll();
      setOperacoes(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar nova operação
  const criarOperacao = useCallback(async (operacao) => {
    setLoading(true);
    setError('');
    try {
      const response = await operacoesService.create(operacao);
      setOperacoes(prev => [...prev, response]);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar operação
  const atualizarOperacao = useCallback(async (id, operacao) => {
    setLoading(true);
    setError('');
    try {
      const response = await operacoesService.update(id, operacao);
      setOperacoes(prev => prev.map(op => op.id === id ? response : op));
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Excluir operação
  const excluirOperacao = useCallback(async (id) => {
    setLoading(true);
    setError('');
    try {
      await operacoesService.delete(id);
      setOperacoes(prev => prev.filter(op => op.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar por ID
  const buscarPorId = useCallback(async (id) => {
    setLoading(true);
    setError('');
    try {
      const data = await operacoesService.getById(id);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpar erro
  const limparErro = useCallback(() => {
    setError('');
  }, []);

  return {
    operacoes,
    loading,
    error,
    carregarOperacoes,
    criarOperacao,
    atualizarOperacao,
    excluirOperacao,
    buscarPorId,
    limparErro,
  };
};
