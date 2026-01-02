/**
 * Utilitários para agrupamento de dados
 */

/**
 * Agrupa operações por data
 */
export const agruparPorData = (operacoes) => {
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
