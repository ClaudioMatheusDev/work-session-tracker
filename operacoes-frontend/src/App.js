import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

export default function App() {
  const [operacoes, setOperacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");


  const baseURL = "https://work-session-tracker-production.up.railway.app/api/operacoes";

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => setOperacoes(response.data))
      .catch((error) => console.error(error));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const novaOperacao = {
      descricao,
      horaInicio,
      horaFim,
    };

    try {
      const response = await axios.post(baseURL, novaOperacao);
      setOperacoes([...operacoes, response.data]);
      setDescricao("");
      setHoraInicio("");
      setHoraFim("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <h1>Operações</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={horaFim}
          onChange={(e) => setHoraFim(e.target.value)}
          required
        />
        <button type="submit">Adicionar Operação</button>
      </form>

      <ul>
        {operacoes.map((op) => (
          <li key={op.id}>
            <strong>{op.descricao}</strong> -{" "}
            {new Date(op.horaInicio).toLocaleString()} até{" "}
            {new Date(op.horaFim).toLocaleString()} - Tempo gasto:{" "}
            {op.tempoGasto}
          </li>
        ))}
      </ul>
    </div>
  );
}
