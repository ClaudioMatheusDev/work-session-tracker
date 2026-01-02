/**
 * Utilitários de formatação
 */

/**
 * Formata tempo gasto (TimeSpan ou string) para formato HH:MM:SS
 */
export const formatarTempo = (tempoGasto) => {
  if (!tempoGasto) return "N/A";
  
  // Se tempoGasto for uma string no formato "HH:MM:SS"
  if (typeof tempoGasto === 'string') {
    return tempoGasto;
  }
  
  // Se for um objeto TimeSpan do C# (formato: { days, hours, minutes, seconds, milliseconds })
  if (typeof tempoGasto === 'object') {
    const dias = tempoGasto.days || 0;
    const horas = (tempoGasto.hours || 0) + (dias * 24);
    const minutos = tempoGasto.minutes || 0;
    const segundos = tempoGasto.seconds || 0;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }
  
  return tempoGasto.toString();
};

/**
 * Calcula tempo gasto entre duas datas
 */
export const calcularTempoGasto = (inicio, fim) => {
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

/**
 * Formata data para o formato datetime-local do input
 */
export const formatarDataParaInput = (dataISO) => {
  const date = new Date(dataISO);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Formata data para exibição em português
 */
export const formatarData = (dataISO) => {
  return new Date(dataISO).toLocaleDateString('pt-BR');
};

/**
 * Formata hora para exibição
 */
export const formatarHora = (dataISO) => {
  return new Date(dataISO).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Formata data e hora completa
 */
export const formatarDataHora = (dataISO) => {
  return new Date(dataISO).toLocaleString('pt-BR');
};

/**
 * Calcula tempo total de um array de operações
 */
export const calcularTempoTotal = (operacoes) => {
  let totalMs = 0;
  
  operacoes.forEach(op => {
    const inicio = new Date(op.horaInicio);
    const fim = new Date(op.horaFim);
    totalMs += (fim - inicio);
  });
  
  const horas = Math.floor(totalMs / (1000 * 60 * 60));
  const minutos = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${horas}h ${minutos}min`;
};
