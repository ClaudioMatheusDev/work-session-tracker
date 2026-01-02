import React, { useState } from 'react';
import './SessionCard.css';
import { Button, Input } from '../UI';
import { formatarHora, formatarTempo, calcularTempoGasto, formatarDataParaInput } from '../../utils';

/**
 * Card individual de sessão/operação
 */
const SessionCard = ({ operacao, onUpdate, onDelete, loading, isEditing, onEdit }) => {
  const [editDescricao, setEditDescricao] = useState(operacao.descricao);
  const [editHoraInicio, setEditHoraInicio] = useState(formatarDataParaInput(operacao.horaInicio));
  const [editHoraFim, setEditHoraFim] = useState(formatarDataParaInput(operacao.horaFim));

  const handleSave = () => {
    onUpdate(operacao.id, {
      descricao: editDescricao.trim(),
      horaInicio: editHoraInicio,
      horaFim: editHoraFim,
    });
  };

  const handleCancel = () => {
    setEditDescricao(operacao.descricao);
    setEditHoraInicio(formatarDataParaInput(operacao.horaInicio));
    setEditHoraFim(formatarDataParaInput(operacao.horaFim));
    onEdit(null);
  };

  const handleDelete = () => {
    const confirmacao = window.confirm(
      `Tem certeza que deseja excluir a operação "${operacao.descricao}"?\n\nEsta ação não pode ser desfeita.`
    );
    if (confirmacao) {
      onDelete(operacao.id);
    }
  };

  const tempoGasto = operacao.tempoGasto 
    ? formatarTempo(operacao.tempoGasto)
    : calcularTempoGasto(operacao.horaInicio, operacao.horaFim);

  if (isEditing) {
    return (
      <div className="session-card editing">
        <div className="edit-form">
          <Input
            type="text"
            value={editDescricao}
            onChange={(e) => setEditDescricao(e.target.value)}
            placeholder="Descrição"
            disabled={loading}
          />
          <div className="horarios-edit">
            <Input
              type="datetime-local"
              value={editHoraInicio}
              onChange={(e) => setEditHoraInicio(e.target.value)}
              disabled={loading}
            />
            <span className="separador">→</span>
            <Input
              type="datetime-local"
              value={editHoraFim}
              onChange={(e) => setEditHoraFim(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <div className="edit-actions">
          <Button 
            variant="success"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "✅ Salvar"}
          </Button>
          <Button 
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            ❌ Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="session-card">
      <div className="horario-operacao">
        <span className="hora-inicio">{formatarHora(operacao.horaInicio)}</span>
        <span className="separador">→</span>
        <span className="hora-fim">{formatarHora(operacao.horaFim)}</span>
      </div>
      
      <div className="descricao-operacao">
        <span className="nome-operacao">{operacao.descricao}</span>
        <span className="id-operacao">#{operacao.id}</span>
      </div>
      
      <div className="tempo-operacao">
        {tempoGasto}
      </div>
      
      <div className="operacao-actions">
        <button 
          onClick={() => onEdit(operacao.id)}
          disabled={loading}
          className="btn-icon btn-editar"
          title="Editar operação"
        >
          ✏️
        </button>
        <button 
          onClick={handleDelete}
          disabled={loading}
          className="btn-icon btn-excluir"
          title="Excluir operação"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
