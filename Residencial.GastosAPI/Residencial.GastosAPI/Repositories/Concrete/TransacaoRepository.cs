using Microsoft.EntityFrameworkCore;
using Residencial.GastosAPI.Context;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Repositories.Interfaces;

namespace Residencial.GastosAPI.Repositories.Concrete;

/// <summary>
/// Repositório responsavel pelo acesso aos dados da entidade Transacao.
/// </summary>
public class TransacaoRepository : ITransacaoRepository
{
    private readonly AppDbContext _context;
    public TransacaoRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retorna todas as transações com suas respectivas pessoas e categorias.
    /// </summary>
    public async Task<IEnumerable<Transacao>> GetAllTransacoes()
    {
        return await _context.Transacoes.Include(t => t.Pessoa)
                                        .Include(t => t.Categoria)
                                        .ToListAsync();
    }

    /// <summary>
    /// Cria uma nova transação.
    /// </summary>
    /// <param name="transacao"></param>
    public async Task<Transacao> CreateTransacao(Transacao transacao)
    {
        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();
        return transacao;
    }

}
