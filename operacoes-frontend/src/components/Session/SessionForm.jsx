import React, { useState } from 'react';
import './SessionForm.css';
import { Input, Button, Card } from '../UI';
import { validarOperacao } from '../../utils';

/**
 * Formulário para criar nova sessão/operação
 */
const SessionForm = ({ onSubmit, loading }) => {
  const [descricao, setDescricao] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const validacao = validarOperacao(descricao, horaInicio, horaFim);
    
    if (!validacao.valido) {
      const errosObj = {};
      validacao.erros.forEach(erro => {
        if (erro.includes('Descrição')) errosObj.descricao = erro;
        if (erro.includes('início')) errosObj.horaInicio = erro;
        if (erro.includes('fim')) errosObj.horaFim = erro;
      });
      setErrors(errosObj);
      return;
    }

    onSubmit({
      descricao: descricao.trim(),
      horaInicio,
      horaFim,
    });

    // Limpar formulário
    setDescricao('');
    setHoraInicio('');
    setHoraFim('');
  };

  return (
    <Card title="Adicionar Nova Operação" className="session-form-card">
      <form onSubmit={handleSubmit} className="session-form">
        <Input
          type="text"
          label="Descrição"
          placeholder="Descrição da operação"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          error={errors.descricao}
          disabled={loading}
          required
        />

        <div className="datetime-inputs">
          <Input
            type="datetime-local"
            label="Hora de Início"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            error={errors.horaInicio}
            disabled={loading}
            required
          />

          <Input
            type="datetime-local"
            label="Hora de Fim"
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            error={errors.horaFim}
            disabled={loading}
            required
          />
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? 'Adicionando...' : 'Adicionar Operação'}
        </Button>
      </form>
    </Card>
  );
};

export default SessionForm;
