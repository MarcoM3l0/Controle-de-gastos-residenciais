using Microsoft.EntityFrameworkCore;
using Residencial.GastosAPI.Models;

namespace Residencial.GastosAPI.Context;

/// <summary>
/// Classe de contexto do Entity Framework Core para a aplicação.
/// Contém as definições das entidades e suas configurações.
/// </summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Transacao> Transacoes { get; set; }

    // Configurações da Fluent API
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Pessoa>(pessoa =>
        {
            pessoa.HasKey(p => p.PessoaId);
            pessoa.Property(p => p.Nome).IsRequired().HasMaxLength(100);
            pessoa.Property(p => p.Idade).IsRequired();

            // Usa o cascade delete para o relacionamento com Transacao
            pessoa.HasMany(p => p.Transacoes)
                  .WithOne(t => t.Pessoa)
                  .HasForeignKey(t => t.PessoaId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Categoria>(categoria =>
        {
            categoria.HasKey(c => c.CategoriaId);
            categoria.Property(c => c.Descricao).IsRequired().HasMaxLength(150);
            categoria.Property(c => c.Finalidade).IsRequired().HasConversion<int>(); 
        });

        modelBuilder.Entity<Transacao>(transacao =>
        {
            transacao.HasKey(t => t.TransacaoId);
            transacao.Property(t => t.Descricao).IsRequired().HasMaxLength(200);
            transacao.Property(t => t.Valor).IsRequired().HasPrecision(18, 2);
            transacao.Property(t => t.Tipo).IsRequired().HasConversion<int>();

            transacao.HasOne(t => t.Categoria).WithMany(c => c.Transacoes).HasForeignKey(transacao => transacao.CategoriaId)
             .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
