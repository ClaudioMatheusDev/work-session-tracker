import React, { useState } from 'react';
import './SessionList.css';
import { Card, Button } from '../UI';
import SessionCard from './SessionCard';
import { agruparPorData, calcularTempoTotal } from '../../utils';

/**
 * Lista de sessões/operações agrupadas por data
 */
const SessionList = ({ operacoes, onUpdate, onDelete, onRefresh, loading }) => {
  const [editandoId, setEditandoId] = useState(null);

  const handleUpdate = async (id, dados) => {
    await onUpdate(id, dados);
    setEditandoId(null);
  };

  if (operacoes.length === 0) {
    return (
      <Card title="Todas as Operações (0)">
        <p className="no-data">Nenhuma operação encontrada</p>
      </Card>
    );
  }

  const gruposPorData = agruparPorData(operacoes);

  return (
    <Card 
      title={`Todas as Operações (${operacoes.length})`}
      className="session-list-card"
    >
      <div className="list-header">
        <Button 
          variant="secondary"
          onClick={onRefresh}
          disabled={loading}
          className="refresh-btn"
        >
          🔄 Atualizar
        </Button>
      </div>

      <div className="operacoes-por-dia">
        {gruposPorData.map(({ data, operacoes: operacoesDoDia }) => (
          <div key={data} className="dia-container">
            <div className="dia-header">
              <h3 className="data-titulo">{data}</h3>
              <span className="tempo-total-dia">
                Total: {calcularTempoTotal(operacoesDoDia)}
              </span>
            </div>
            
            <div className="operacoes-do-dia">
              {operacoesDoDia.map((op) => (
                <SessionCard
                  key={op.id}
                  operacao={op}
                  onUpdate={handleUpdate}
                  onDelete={onDelete}
                  loading={loading}
                  isEditing={editandoId === op.id}
                  onEdit={setEditandoId}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SessionList;
