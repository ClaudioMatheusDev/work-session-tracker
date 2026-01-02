import React from 'react';
import './Loading.css';

/**
 * Componente de loading
 */
const Loading = ({ message = 'Carregando...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;
