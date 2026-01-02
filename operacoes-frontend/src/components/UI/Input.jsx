import React from 'react';
import './Input.css';

/**
 * Componente de input reutilizável
 */
const Input = ({ 
  label, 
  type = 'text', 
  error, 
  className = '',
  containerClassName = '',
  ...props 
}) => {
  return (
    <div className={`input-container ${containerClassName}`}>
      {label && <label className="input-label">{label}</label>}
      <input 
        type={type} 
        className={`input-field ${error ? 'input-error' : ''} ${className}`}
        {...props} 
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
