namespace OperacoesService.Models
{
    public class Operacao
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = null!;
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFim { get; set; }
        public TimeSpan TempoGasto { get; set; }
    }
}
