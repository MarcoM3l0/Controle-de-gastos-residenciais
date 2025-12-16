using Microsoft.EntityFrameworkCore;
using Residencial.GastosAPI.Context;
using Residencial.GastosAPI.Models;
using Residencial.GastosAPI.Repositories.Interfaces;

namespace Residencial.GastosAPI.Repositories.Concrete;

public class TransacaoRepository : ITransacaoRepository
{
    private readonly AppDbContext _context;
    public TransacaoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Transacao>> GetAllTransacoes()
    {
        return await _context.Transacoes.Include(t => t.Pessoa)
                                        .Include(t => t.Categoria)
                                        .ToListAsync();
    }

    public async Task<Transacao> CreateTransacao(Transacao transacao)
    {
        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();
        return transacao;
    }

}
