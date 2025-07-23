using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperacoesService.Data;
using OperacoesService.Models;

[ApiController]
[Route("api/[controller]")]
public class OperacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public OperacoesController(AppDbContext context)
    {
        _context = context;
    }

    // GET api/operacoes
    [HttpGet]
    public async Task<IActionResult> Get() =>
        Ok(await _context.Operacoes.ToListAsync());

    // GET api/operacoes/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var operacao = await _context.Operacoes.FindAsync(id);
        if (operacao == null)
            return NotFound();
        return Ok(operacao);
    }

    // POST api/operacoes
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Operacao operacao)
    {
        // Calcular automaticamente o tempo gasto
        operacao.TempoGasto = operacao.HoraFim - operacao.HoraInicio;
        
        _context.Operacoes.Add(operacao);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = operacao.Id }, operacao);
    }

    // PUT api/operacoes/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Operacao operacao)
    {
        if (id != operacao.Id)
            return BadRequest("ID da URL não confere com ID do objeto");

        var operacaoExistente = await _context.Operacoes.FindAsync(id);
        if (operacaoExistente == null)
            return NotFound();

        // Atualizar propriedades
        operacaoExistente.Descricao = operacao.Descricao;
        operacaoExistente.HoraInicio = operacao.HoraInicio;
        operacaoExistente.HoraFim = operacao.HoraFim;
        
        // Recalcular tempo gasto
        operacaoExistente.TempoGasto = operacao.HoraFim - operacao.HoraInicio;

        try
        {
            await _context.SaveChangesAsync();
            return Ok(operacaoExistente);
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict("A operação foi modificada por outro usuário");
        }
    }

    // DELETE api/operacoes/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var operacao = await _context.Operacoes.FindAsync(id);
        if (operacao == null)
            return NotFound();

        _context.Operacoes.Remove(operacao);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}
