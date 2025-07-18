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
}
