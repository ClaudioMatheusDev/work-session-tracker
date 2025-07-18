import React, { useEffect, useState } from "react";
import { operacoesService } from "./services/api";
import "./index.css";

export default function App() {
  const [operacoes, setOperacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("checking");

  useEffect(() => {
    testarConexao();
    carregarOperacoes();
  }, []);

  const testarConexao = async () => {
    const result = await operacoesService.testConnection();
    setConnectionStatus(result.success ? "connected" : "disconnected");
    if (!result.success) {
      setError(`Problema de conectividade: ${result.message}`);
    }
  };

  const carregarOperacoes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await operacoesService.getAll();
      setOperacoes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validarFormulario = () => {
    if (!descricao.trim()) {
      setError("Descrição é obrigatória");
      return false;
    }
    if (!horaInicio) {
      setError("Hora de início é obrigatória");
      return false;
    }
    if (!horaFim) {
      setError("Hora de fim é obrigatória");
      return false;
    }
    if (new Date(horaInicio) >= new Date(horaFim)) {
      setError("Hora de fim deve ser posterior à hora de início");
      return false;
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validarFormulario()) {
      return;
    }

    const novaOperacao = {
      descricao: descricao.trim(),
      horaInicio,
      horaFim,
    };

    setLoading(true);
    try {
      const response = await operacoesService.create(novaOperacao);
      setOperacoes([...operacoes, response]);
      setDescricao("");
      setHoraInicio("");
      setHoraFim("");
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const buscarPorId = async () => {
    if (!searchId) {
      setError("Digite um ID para buscar");
      return;
    }

    setLoading(true);
    setError("");
    setSearchResult(null);
    
    try {
      const data = await operacoesService.getById(searchId);
      setSearchResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatarTempo = (tempoGasto) => {
    if (!tempoGasto) return "N/A";
    
    // Se tempoGasto for uma string no formato "HH:MM:SS"
    if (typeof tempoGasto === 'string') {
      return tempoGasto;
    }
    
    // Se for um objeto TimeSpan do C# (formato: { days, hours, minutes, seconds, milliseconds })
    if (typeof tempoGasto === 'object') {
      const dias = tempoGasto.days || 0;
      const horas = (tempoGasto.hours || 0) + (dias * 24); // Converter dias em horas
      const minutos = tempoGasto.minutes || 0;
      const segundos = tempoGasto.seconds || 0;
      return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }
    
    return tempoGasto.toString();
  };

  // Função para exibir tempo gasto (usa o backend ou calcula localmente)
  const exibirTempoGasto = (operacao) => {
    // Se o backend retornou tempoGasto, use-o
    if (operacao.tempoGasto) {
      return formatarTempo(operacao.tempoGasto);
    }
    // Caso contrário, calcule localmente
    return calcularTempoGasto(operacao.horaInicio, operacao.horaFim);
  };

  // Função para calcular o tempo gasto entre horaInicio e horaFim
  const calcularTempoGasto = (inicio, fim) => {
    if (!inicio || !fim) return "N/A";
    const start = new Date(inicio);
    const end = new Date(fim);
    const diffMs = end - start;
    if (diffMs < 0) return "N/A";
    const horas = Math.floor(diffMs / (1000 * 60 * 60));
    const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diffMs % (1000 * 60)) / 1000);
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  // Função para agrupar operações por data
  const agruparPorData = (operacoes) => {
    const grupos = {};
    operacoes.forEach(op => {
      const data = new Date(op.horaInicio).toLocaleDateString('pt-BR');
      if (!grupos[data]) {
        grupos[data] = [];
      }
      grupos[data].push(op);
    });
    
    // Ordenar as datas (mais recentes primeiro)
    const datasOrdenadas = Object.keys(grupos).sort((a, b) => {
      return new Date(b.split('/').reverse().join('-')) - new Date(a.split('/').reverse().join('-'));
    });
    
    return datasOrdenadas.map(data => ({
      data,
      operacoes: grupos[data].sort((a, b) => new Date(a.horaInicio) - new Date(b.horaInicio))
    }));
  };

  // Função para calcular tempo total do dia
  const calcularTempoTotalDia = (operacoesDoDia) => {
    let totalMs = 0;
    operacoesDoDia.forEach(op => {
      const inicio = new Date(op.horaInicio);
      const fim = new Date(op.horaFim);
      totalMs += (fim - inicio);
    });
    
    const horas = Math.floor(totalMs / (1000 * 60 * 60));
    const minutos = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${horas}h ${minutos}min`;
  };

  return (
    <div className="container">
      <h1>Sistema de Operações</h1>
      
      {/* Status da conexão */}
      <div className={`connection-status ${connectionStatus}`}>
        {connectionStatus === "checking" && "🔄 Verificando conexão..."}
        {connectionStatus === "connected" && "🟢 API conectada"}
        {connectionStatus === "disconnected" && "🔴 API desconectada"}
        <button 
          onClick={testarConexao} 
          className="test-connection-btn"
          disabled={loading}
        >
          Testar Conexão
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Carregando...</div>}

      {/* Seção de busca por ID */}
      <div className="search-section">
        <h2>Buscar Operação por ID</h2>
        <div className="search-form">
          <input
            type="number"
            placeholder="Digite o ID da operação"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            min="1"
          />
          <button 
            type="button" 
            onClick={buscarPorId}
            disabled={loading}
          >
            Buscar
          </button>
        </div>
        
        {searchResult && (
          <div className="search-result">
            <h3>Resultado da Busca:</h3>
            <div className="operacao-card">
              <p><strong>ID:</strong> {searchResult.id}</p>
              <p><strong>Descrição:</strong> {searchResult.descricao}</p>
              <p><strong>Início:</strong> {new Date(searchResult.horaInicio).toLocaleString('pt-BR')}</p>
              <p><strong>Fim:</strong> {new Date(searchResult.horaFim).toLocaleString('pt-BR')}</p>
              <p><strong>Tempo Gasto:</strong> {exibirTempoGasto(searchResult)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Formulário para adicionar nova operação */}
      <div className="form-section">
        <h2>Adicionar Nova Operação</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            disabled={loading}
          />
          <label>
            Hora de Início:
            <input
              type="datetime-local"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <label>
            Hora de Fim:
            <input
              type="datetime-local"
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Adicionando...' : 'Adicionar Operação'}
          </button>
        </form>
      </div>

      {/* Lista de todas as operações */}
      <div className="list-section">
        <div className="list-header">
          <h2>Todas as Operações ({operacoes.length})</h2>
          <button 
            type="button" 
            onClick={carregarOperacoes}
            disabled={loading}
            className="refresh-btn"
          >
            🔄 Atualizar
          </button>
        </div>
        
        {operacoes.length === 0 ? (
          <p className="no-data">Nenhuma operação encontrada</p>
        ) : (
          <div className="operacoes-por-dia">
            {agruparPorData(operacoes).map(({ data, operacoes: operacoesDoDia }) => (
              <div key={data} className="dia-container">
                <div className="dia-header">
                  <h3 className="data-titulo">{data}</h3>
                  <span className="tempo-total-dia">
                    Total: {calcularTempoTotalDia(operacoesDoDia)}
                  </span>
                </div>
                
                <div className="operacoes-do-dia">
                  {operacoesDoDia.map((op) => (
                    <div key={op.id} className="operacao-linha">
                      <div className="horario-operacao">
                        <span className="hora-inicio">
                          {new Date(op.horaInicio).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        <span className="separador">→</span>
                        <span className="hora-fim">
                          {new Date(op.horaFim).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      <div className="descricao-operacao">
                        <span className="nome-operacao">{op.descricao}</span>
                        <span className="id-operacao">#{op.id}</span>
                      </div>
                      
                      <div className="tempo-operacao">
                        {exibirTempoGasto(op)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
