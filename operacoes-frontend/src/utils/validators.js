/**
 * Utilitários de validação
 */

/**
 * Valida formulário de operação
 */
export const validarOperacao = (descricao, horaInicio, horaFim) => {
  const erros = [];

  if (!descricao || !descricao.trim()) {
    erros.push("Descrição é obrigatória");
  }

  if (!horaInicio) {
    erros.push("Hora de início é obrigatória");
  }

  if (!horaFim) {
    erros.push("Hora de fim é obrigatória");
  }

  if (horaInicio && horaFim && new Date(horaInicio) >= new Date(horaFim)) {
    erros.push("Hora de fim deve ser posterior à hora de início");
  }

  return {
    valido: erros.length === 0,
    erros
  };
};

/**
 * Valida ID
 */
export const validarId = (id) => {
  if (!id) {
    return { valido: false, erro: "ID é obrigatório" };
  }
  
  const idNumero = parseInt(id);
  if (isNaN(idNumero) || idNumero <= 0) {
    return { valido: false, erro: "ID deve ser um número positivo" };
  }
  
  return { valido: true };
};
