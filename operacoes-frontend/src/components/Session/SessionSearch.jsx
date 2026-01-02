import React, { useState } from 'react';
import './SessionSearch.css';
import { Card, Input, Button } from '../UI';
import { validarId } from '../../utils';
import { formatarDataHora, formatarTempo, calcularTempoGasto } from '../../utils';

/**
 * Componente de busca de sessão por ID
 */
const SessionSearch = ({ onSearch, loading, result }) => {
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    
    const validacao = validarId(searchId);
    if (!validacao.valido) {
      setError(validacao.erro);
      return;
    }

    onSearch(searchId);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const tempoGasto = result 
    ? (result.tempoGasto 
        ? formatarTempo(result.tempoGasto)
        : calcularTempoGasto(result.horaInicio, result.horaFim))
    : null;

  return (
    <Card title="Buscar Operação por ID" className="session-search-card">
      <div className="search-form">
        <Input
          type="number"
          placeholder="Digite o ID da operação"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyPress={handleKeyPress}
          error={error}
          min="1"
          disabled={loading}
        />
        <Button 
          variant="primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
      
      {result && (
        <div className="search-result">
          <h3 className="result-title">Resultado da Busca:</h3>
          <div className="result-card">
            <div className="result-row">
              <strong>ID:</strong>
              <span>#{result.id}</span>
            </div>
            <div className="result-row">
              <strong>Descrição:</strong>
              <span>{result.descricao}</span>
            </div>
            <div className="result-row">
              <strong>Início:</strong>
              <span>{formatarDataHora(result.horaInicio)}</span>
            </div>
            <div className="result-row">
              <strong>Fim:</strong>
              <span>{formatarDataHora(result.horaFim)}</span>
            </div>
            <div className="result-row">
              <strong>Tempo Gasto:</strong>
              <span className="tempo-destaque">{tempoGasto}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SessionSearch;
