using Microsoft.EntityFrameworkCore;
using OperacoesService.Models;

namespace OperacoesService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Operacao> Operacoes { get; set; } = null!;
    }
}
