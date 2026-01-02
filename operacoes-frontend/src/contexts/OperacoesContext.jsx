import React, { createContext, useContext, useEffect } from 'react';
import { useOperacoes } from '../hooks/useOperacoes';
import { useConnectionStatus } from '../hooks/useConnectionStatus';

const OperacoesContext = createContext();

/**
 * Provider do contexto de operações
 */
export const OperacoesProvider = ({ children }) => {
  const operacoesHook = useOperacoes();
  const connectionHook = useConnectionStatus();

  // Carregar operações iniciais
  useEffect(() => {
    if (connectionHook.status === 'connected') {
      operacoesHook.carregarOperacoes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionHook.status]);

  const value = {
    ...operacoesHook,
    connectionStatus: connectionHook.status,
    testarConexao: connectionHook.testarConexao,
  };

  return (
    <OperacoesContext.Provider value={value}>
      {children}
    </OperacoesContext.Provider>
  );
};

/**
 * Hook para usar o contexto de operações
 */
export const useOperacoesContext = () => {
  const context = useContext(OperacoesContext);
  if (!context) {
    throw new Error('useOperacoesContext deve ser usado dentro de OperacoesProvider');
  }
  return context;
};
