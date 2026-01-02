import React from 'react';
import './Button.css';

/**
 * Componente de botão reutilizável
 * @param {Object} props
 * @param {string} props.variant - Variação do botão: 'primary', 'secondary', 'danger', 'success'
 * @param {boolean} props.disabled - Se o botão está desabilitado
 * @param {Function} props.onClick - Função de callback ao clicar
 * @param {string} props.type - Tipo do botão: 'button', 'submit', 'reset'
 * @param {React.ReactNode} props.children - Conteúdo do botão
 */
const Button = ({ 
  variant = 'primary', 
  disabled = false, 
  onClick, 
  type = 'button', 
  children,
  className = '',
  ...rest 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
