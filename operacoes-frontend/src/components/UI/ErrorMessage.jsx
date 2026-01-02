import React from 'react';
import './ErrorMessage.css';

/**
 * Componente de mensagem de erro
 */
const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message-container">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <p className="error-message">{message}</p>
      </div>
      {onClose && (
        <button className="error-close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
