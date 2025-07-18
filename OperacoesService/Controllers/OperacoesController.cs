using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class OperacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public OperacoesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get() =>
        Ok(await _context.Operacoes.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Operacao operacao)
    {
        _context.Operacoes.Add(operacao);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = operacao.Id }, operacao);
    }
}
