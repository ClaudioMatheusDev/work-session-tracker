public class Operacao
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public DateTime Inicio { get; set; }
    public DateTime Fim { get; set; }

    public TimeSpan TempoGasto => Fim - Inicio;
}
