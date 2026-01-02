using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperacoesService.Data;
using OperacoesService.Models;

[ApiController]
[Route("api/[controller]")]
public class OperacoesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<OperacoesController> _logger;

    public OperacoesController(AppDbContext context, ILogger<OperacoesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET api/operacoes
    /// <summary>
    /// Retorna todas as operações com paginação e ordenação
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> Get(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 100,
        [FromQuery] string sortBy = "HoraInicio",
        [FromQuery] bool descending = true)
    {
        try
        {
            var query = _context.Operacoes.AsQueryable();

            // Ordenação
            query = sortBy.ToLower() switch
            {
                "descricao" => descending ? query.OrderByDescending(o => o.Descricao) : query.OrderBy(o => o.Descricao),
                "horafim" => descending ? query.OrderByDescending(o => o.HoraFim) : query.OrderBy(o => o.HoraFim),
                "tempogasto" => descending ? query.OrderByDescending(o => o.TempoGasto) : query.OrderBy(o => o.TempoGasto),
                _ => descending ? query.OrderByDescending(o => o.HoraInicio) : query.OrderBy(o => o.HoraInicio)
            };

            // Paginação
            var totalItems = await query.CountAsync();
            var operacoes = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                data = operacoes,
                pageNumber,
                pageSize,
                totalItems,
                totalPages = (int)Math.Ceiling(totalItems / (double)pageSize)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao buscar operações");
            return StatusCode(500, "Erro interno ao buscar operações");
        }
    }

    // GET api/operacoes/{id}
    /// <summary>
    /// Retorna uma operação específica por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var operacao = await _context.Operacoes.FindAsync(id);
            if (operacao == null)
            {
                _logger.LogWarning("Operação com ID {Id} não encontrada", id);
                return NotFound(new { message = $"Operação com ID {id} não encontrada" });
            }
            return Ok(operacao);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao buscar operação {Id}", id);
            return StatusCode(500, "Erro interno ao buscar operação");
        }
    }

    // POST api/operacoes
    /// <summary>
    /// Cria uma nova operação
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Operacao operacao)
    {
        try
        {
            // Validações
            if (string.IsNullOrWhiteSpace(operacao.Descricao))
                return BadRequest(new { message = "Descrição é obrigatória" });

            if (operacao.HoraFim <= operacao.HoraInicio)
                return BadRequest(new { message = "Hora de fim deve ser posterior à hora de início" });

            // Calcular automaticamente o tempo gasto
            operacao.TempoGasto = operacao.HoraFim - operacao.HoraInicio;
            
            _context.Operacoes.Add(operacao);
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Operação {Id} criada: {Descricao}", operacao.Id, operacao.Descricao);
            
            return CreatedAtAction(nameof(Get), new { id = operacao.Id }, operacao);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao criar operação");
            return StatusCode(500, "Erro interno ao criar operação");
        }
    }

    // PUT api/operacoes/{id}
    /// <summary>
    /// Atualiza uma operação existente
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Operacao operacao)
    {
        try
        {
            if (id != operacao.Id)
                return BadRequest(new { message = "ID da URL não confere com ID do objeto" });

            // Validações
            if (string.IsNullOrWhiteSpace(operacao.Descricao))
                return BadRequest(new { message = "Descrição é obrigatória" });

            if (operacao.HoraFim <= operacao.HoraInicio)
                return BadRequest(new { message = "Hora de fim deve ser posterior à hora de início" });

            var operacaoExistente = await _context.Operacoes.FindAsync(id);
            if (operacaoExistente == null)
            {
                _logger.LogWarning("Tentativa de atualizar operação inexistente: {Id}", id);
                return NotFound(new { message = $"Operação com ID {id} não encontrada" });
            }

            // Atualizar propriedades
            operacaoExistente.Descricao = operacao.Descricao;
            operacaoExistente.HoraInicio = operacao.HoraInicio;
            operacaoExistente.HoraFim = operacao.HoraFim;
            
            // Recalcular tempo gasto
            operacaoExistente.TempoGasto = operacao.HoraFim - operacao.HoraInicio;

            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Operação {Id} atualizada", id);
            
            return Ok(operacaoExistente);
        }
        catch (DbUpdateConcurrencyException ex)
        {
            _logger.LogError(ex, "Conflito de concorrência ao atualizar operação {Id}", id);
            return Conflict(new { message = "A operação foi modificada por outro usuário" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao atualizar operação {Id}", id);
            return StatusCode(500, "Erro interno ao atualizar operação");
        }
    }

    // DELETE api/operacoes/{id}
    /// <summary>
    /// Exclui uma operação
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var operacao = await _context.Operacoes.FindAsync(id);
            if (operacao == null)
            {
                _logger.LogWarning("Tentativa de excluir operação inexistente: {Id}", id);
                return NotFound(new { message = $"Operação com ID {id} não encontrada" });
            }

            _context.Operacoes.Remove(operacao);
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Operação {Id} excluída", id);
            
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao excluir operação {Id}", id);
            return StatusCode(500, "Erro interno ao excluir operação");
        }
    }

    // GET api/operacoes/stats
    /// <summary>
    /// Retorna estatísticas das operações
    /// </summary>
    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        try
        {
            var totalOperacoes = await _context.Operacoes.CountAsync();
            var tempoTotal = await _context.Operacoes.SumAsync(o => o.TempoGasto.TotalHours);
            var mediaHorasPorOperacao = totalOperacoes > 0 ? tempoTotal / totalOperacoes : 0;

            var stats = new
            {
                totalOperacoes,
                tempoTotalHoras = Math.Round(tempoTotal, 2),
                mediaHorasPorOperacao = Math.Round(mediaHorasPorOperacao, 2)
            };

            return Ok(stats);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao buscar estatísticas");
            return StatusCode(500, "Erro interno ao buscar estatísticas");
        }
    }
}
