import React, { useState } from "react";
import { useOperacoesContext } from "./contexts";
import { 
  ConnectionStatus, 
  SessionForm, 
  SessionList, 
  SessionSearch 
} from "./components/Session";
import { ErrorMessage, Loading } from "./components/UI";
import "./App.css";

export default function App() {
  const {
    operacoes,
    loading,
    error,
    connectionStatus,
    testarConexao,
    carregarOperacoes,
    criarOperacao,
    atualizarOperacao,
    excluirOperacao,
    buscarPorId,
    limparErro,
  } = useOperacoesContext();

  const [searchResult, setSearchResult] = useState(null);

  // Handler para criar operação
  const handleCriarOperacao = async (dados) => {
    try {
      await criarOperacao(dados);
    } catch (err) {
      // Erro já tratado no contexto
    }
  };

  // Handler para atualizar operação
  const handleAtualizarOperacao = async (id, dados) => {
    try {
      await atualizarOperacao(id, dados);
    } catch (err) {
      // Erro já tratado no contexto
    }
  };

  // Handler para excluir operação
  const handleExcluirOperacao = async (id) => {
    try {
      await excluirOperacao(id);
    } catch (err) {
      // Erro já tratado no contexto
    }
  };

  // Handler para buscar por ID
  const handleBuscarPorId = async (id) => {
    try {
      const resultado = await buscarPorId(id);
      setSearchResult(resultado);
    } catch (err) {
      setSearchResult(null);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Sistema de Operações</h1>
        <p className="app-subtitle">Gerencie suas sessões de trabalho</p>
      </header>

      <main className="app-main">
        <ConnectionStatus 
          status={connectionStatus}
          onTest={testarConexao}
          loading={loading}
        />

        {error && (
          <ErrorMessage 
            message={error} 
            onClose={limparErro}
          />
        )}

        {loading && <Loading message="Processando..." />}

        <SessionSearch 
          onSearch={handleBuscarPorId}
          loading={loading}
          result={searchResult}
        />

        <SessionForm 
          onSubmit={handleCriarOperacao}
          loading={loading}
        />

        <SessionList 
          operacoes={operacoes}
          onUpdate={handleAtualizarOperacao}
          onDelete={handleExcluirOperacao}
          onRefresh={carregarOperacoes}
          loading={loading}
        />
      </main>

      <footer className="app-footer">
        <p>Work Session Tracker © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
