import React from 'react';
import './Card.css';

/**
 * Componente de card reutilizável
 */
const Card = ({ children, className = '', title, footer }) => {
  return (
    <div className={`card ${className}`}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
