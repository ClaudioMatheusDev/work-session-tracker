// src/App.js
import { useState, useEffect } from "react";

const API_URL = "https://seu-backend.up.railway.app/api/operacoes";

function App() {
  const [descricao, setDescricao] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [operacoes, setOperacoes] = useState([]);

  const fetchOperacoes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setOperacoes(data);
  };

  useEffect(() => {
    fetchOperacoes();
  }, []);

  const salvar = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descricao, inicio, fim }),
    });
    setDescricao("");
    setInicio("");
    setFim("");
    fetchOperacoes();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Operações</h1>
      <input
        placeholder="Descrição"
        className="border p-2 w-full mb-2"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        type="datetime-local"
        className="border p-2 w-full mb-2"
        value={inicio}
        onChange={(e) => setInicio(e.target.value)}
      />
      <input
        type="datetime-local"
        className="border p-2 w-full mb-2"
        value={fim}
        onChange={(e) => setFim(e.target.value)}
      />
      <button onClick={salvar} className="bg-blue-600 text-white px-4 py-2">
        Salvar
      </button>

      <ul className="mt-4">
        {operacoes.map((op) => (
          <li key={op.id} className="border p-2 mb-2">
            <strong>{op.descricao}</strong><br />
            Início: {new Date(op.inicio).toLocaleString()}<br />
            Fim: {new Date(op.fim).toLocaleString()}<br />
            Tempo gasto: {Math.round((new Date(op.fim) - new Date(op.inicio)) / 60000)} minutos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
