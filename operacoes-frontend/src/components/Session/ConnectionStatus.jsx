import React from 'react';
import './ConnectionStatus.css';
import { Button } from '../UI';

/**
 * Componente que exibe o status da conexão com a API
 */
const ConnectionStatus = ({ status, onTest, loading }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'checking':
        return { icon: '🔄', text: 'Verificando conexão...', className: 'checking' };
      case 'connected':
        return { icon: '🟢', text: 'API conectada', className: 'connected' };
      case 'disconnected':
        return { icon: '🔴', text: 'API desconectada', className: 'disconnected' };
      default:
        return { icon: '⚪', text: 'Status desconhecido', className: 'unknown' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`connection-status ${statusInfo.className}`}>
      <span className="status-indicator">
        {statusInfo.icon} {statusInfo.text}
      </span>
      <Button 
        variant="secondary"
        onClick={onTest}
        disabled={loading}
        className="test-connection-btn"
      >
        Testar Conexão
      </Button>
    </div>
  );
};

export default ConnectionStatus;
